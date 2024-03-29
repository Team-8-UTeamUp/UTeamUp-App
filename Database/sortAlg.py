import pandas as pd
import numpy as np
import math
import json
from sklearn.cluster import KMeans
from sqlalchemy import create_engine, text
from io import StringIO


""" Main functions to call"""

def sortRemainingStudents( data, min, max):
    # add sql call, change later to read json

    # get all students that aren't in a group
    df = pd.read_json(StringIO(data))
    # pivot and inverse the values
    test = pd.pivot(df, index='studentId', columns='projectNum', values='projRank').fillna(0)
    n = test[test.columns].apply(lambda x: x.map({5: 1, 4: 2, 3: 3, 2: 4, 1: 5, 0: 0}))

    # apply kmeans
    n = pd.DataFrame(n)

    ## X is only being used since there are 450+ students in database currently
    x = pd.DataFrame(n.values[0:20], index=n.index[:20], columns=n.columns)
    groups = {}
    groupSize = []
    index = 0
    avg = math.floor((min+ max)/2)

    while x.index.shape[0] > max:
        numCluseter = math.floor(x.index.shape[0] / avg)
        kclustering = KMeans(n_clusters=avg, random_state=5)
        kclustering.fit(x)
        x['Kmeanslabels'] = kclustering.labels_
        for cluster in x['Kmeanslabels'].unique():
            if x[x['Kmeanslabels'] == cluster].shape[0] >= min:
                if x[x['Kmeanslabels'] == cluster].shape[0] >= max:
                    membersID = x[x['Kmeanslabels'] == cluster][:max].index.tolist()
                else:
                    membersID = x[x['Kmeanslabels'] == cluster][:min].index.tolist()

                groups[index] = {'members': membersID}
                groupSize.append(len(membersID))
                index -= 1
                x.drop(index=membersID, inplace=True)
        x.drop(['Kmeanslabels'], axis=1, inplace=True)

    if x.index.shape[0] != 0:
        if x.index.shape[0] >= min:
            groups[index] = {'members': x.index.tolist()}
            groupSize.append(len(membersID))
            x.drop(x.index, inplace=True)

    return groups


def studentToStudentsMatches(studentId, projectJson, skillJson):
    """ Show a specific student a list of other students that match their preferences"""

    # get all students that aren't in a group
    df = pd.read_json(StringIO(projectJson))

    # create DF that have specific columns
    allStudentDF = pd.pivot(df, index='studentId', columns='projectNum', values='projRank').fillna(0)
    indvStudentDF = pd.DataFrame(allStudentDF.loc[studentId])
    indvStudentDF = pd.DataFrame(indvStudentDF.loc[~(indvStudentDF == 0).all(axis=1)])
    allStudentDF = allStudentDF.drop([studentId])

    # ensure there are other students to compare too
    if allStudentDF.shape[0] == 0:
        return []
    # get the list of matches
    projMatches = ProjMatch(indvStudentDF, allStudentDF)

    # use only top 20 % of matches if there are more than 100 matches
    if len(projMatches) > 100:
        indexes = round(len(projMatches) * .2)
        projMatches = Convert(list(projMatches.items())[:indexes])

    # using sublist from above, sort based on # of different skills
    dfs = pd.read_json(StringIO(skillJson))
    # value of 1/0, has/doesn't have skill
    dfs['value'] = 1
    dfs = pd.pivot(dfs, index='studentId', columns='skill', values='value').fillna(0)

    # return sorted list based on proj pref and skills
    possibleMatches = studentSkillMatch(studentId, dfs, projMatches)
    return list(possibleMatches.keys())

def studentToGroupsMatch(studentId, studentJson, groupJson):
    """ Show a specific student the list of groups that match their preferences"""
    df = pd.read_json(StringIO(studentJson))
    # pivot data frame to show rank values for each project columns
    studentDF = pd.pivot(df, index='studentId', columns='projectNum', values='projRank').fillna(0)
    # transform df to vertical format
    studentDF = pd.DataFrame(studentDF.loc[studentId])
    df = pd.read_json(StringIO(groupJson))
    groupsDF = pd.pivot(df, index='groupId',columns='projectNum', values='projRank').fillna(0)

    if groupsDF.shape[0] == 0:
        return []

    possibleMatches = ProjMatch(studentDF, groupsDF)

    # return list of IDs in order of highest to lowest match score
    return list(possibleMatches.keys())


def groupToStudentsMatch(groupId, groupJson, studentJson):
    """ Show specific group a list of possible students that match their preferences"""
    df = pd.read_json(StringIO(groupJson))
    # switch data frame to show rank values in each project columns
    groupDF = pd.pivot(df, index='groupId', columns='projectNum', values='projRank')
    # transform pd to list format
    groupDF = pd.DataFrame(groupDF.loc[groupId])
    df = pd.read_json(StringIO(studentJson))
    studentDF = pd.pivot(df, index='studentId',columns='projectNum', values='projRank').fillna(0)

    if studentDF.shape[0] == 0:
        return []

    possibleMatches = ProjMatch(groupDF, studentDF)

    return list(possibleMatches.keys())

"""Helper Functions"""
def ProjMatch(mainDF,compareDF):
    """  Return dictionary with highest to lowest match and total
        MainDF = ID we are checking for
        compareDF = all possible matches to check
    """

    mainDF = pd.DataFrame(mainDF.loc[~(mainDF == 0).all(axis=1)])
    compIndex = compareDF.index
    if(mainDF.columns[0] in compIndex):
            compareDF.drop(mainDF.columns[0])
    # have an empty dictionary to store ID and values for all possible matches
    Dict = {}
    # max value to give the highest ranked item, the highest value
    max = mainDF.values.max()

    # check each possible index
    for index in compIndex:
        # create a dataframe for specific index and delete any row with 0 value
        projPreference = pd.DataFrame(compareDF.loc[index])
        projPreference = pd.DataFrame(projPreference.loc[~(projPreference == 0).all(axis=1)])
        total = 0
        # check if the values in new DF are located in MainDF
        for num in projPreference.index:
            if (num in mainDF.index):
                # get the average of the 2 values
                # since they are numbered 1-n, we make 1=n, 2=n-2, ect. to give more value to higher ranks
                total += math.floor(
                    ((max - mainDF.loc[num].values[0] + 1) + (max - projPreference.loc[num].values[0] + 1)) / 2)

        if total > 0:
            Dict[f'{index}'] = total

    # sort from highest to lowest total
    sorted_matches = sorted(Dict.items(), key=lambda x: x[1], reverse=True)

    return Convert(sorted_matches)


def studentSkillMatch(ID, DF, orderedDict):
    """ Return a dictionary with updated totals based on diff skills """
    # check to see if the ID has skills, if not create a row with all 0
    if ID not in DF.index:
        DF.loc[ID] = np.zeros(len(DF.columns))

    # create DF for main student
    studentSkill = pd.DataFrame(DF.loc[ID])
    studentSkill = pd.DataFrame(studentSkill.loc[~(studentSkill == 0).all(axis=1)])

    # check skills for students in a given dictionary
    for student in orderedDict:
        # make sure student is not part of a group
        if student in DF.index:
            skillList = pd.DataFrame(DF.loc[student])
            skillList = pd.DataFrame(skillList.loc[~(skillList == 0).all(axis=1)])
            # get the number of different skills, multiply .15, so it doesn't over power the project preferences
            totalDiff = len(set(skillList.index) - set(studentSkill.index))
            totalDiff = totalDiff * .15
            # add skill total to total in given dict
            orderedDict[student] += totalDiff

    # resort the matches from highest to lowest total
    sorted_matches = sorted(orderedDict.items(), key=lambda x: x[1], reverse=True)
    return Convert(sorted_matches)

def Convert(list):
    h = {k:v for k,v in list}
    return h


if __name__ == "__main__":
    """ Connect to database using sqlalchemy since this is what pandas uses"""
    engine = create_engine(f'mysql+mysqlconnector://root:password123!@localhost/uteamup')
    db = engine.connect()
    projTypes = ['UTDProject', 'CSProject']

    """ example of function calls in use """

    # student to student matches
    sql = "SELECT p.studentId, projectNum, projRank FROM projectpreference as p, individualstudents as s where  s.studentId=p.studentId;"
    data = db.execute(text(sql))
    dict = {'studentId': [], 'projectNum': [], 'projRank': []}
    for line in data.all():
        dict['studentId'].append(line[0])
        dict['projectNum'].append(line[1])
        dict['projRank'].append(line[2])
    projectJson = json.dumps(dict)


    sql = "select k.studentId, k.skill from skills k, individualstudents s where s.studentId=k.studentId;"
    data = db.execute(text(sql))
    dict = {'studentId': [], 'skill': []}
    for line in data.all():
        dict['studentId'].append(line[0])
        dict['skill'].append(line[1])
    skillJson = json.dumps(dict)

    listOfStudents = studentToStudentsMatches('AAE297154', projectJson, skillJson)
    print(f' Student matches for student AAE297154:\n {listOfStudents}')

    # student to group matches
    studentId = 'AAE297154'
    sql = f"SELECT p.studentId, projectNum, projRank FROM projectpreference as p where  p.studentId='{studentId}';"
    data = db.execute(text(sql))
    dict = {'studentId': [], 'projectNum': [], 'projRank': []}
    for line in data.all():
        dict['studentId'].append(line[0])
        dict['projectNum'].append(line[1])
        dict['projRank'].append(line[2])
    studentJson = json.dumps(dict)

    sql = "SELECT p.groupId, projectNum, projRank FROM uteamup.grouppreference as p, formedgroups as f where f.groupId=p.groupId and groupCompleted=0;"
    data = db.execute(text(sql))
    dict = {'groupId': [], 'projectNum': [], 'projRank': []}
    for line in data.all():
        dict['groupId'].append(line[0])
        dict['projectNum'].append(line[1])
        dict['projRank'].append(line[2])
    groupJson = json.dumps(dict)
    listOfGroups = studentToGroupsMatch(studentId, studentJson, groupJson)
    print(f'group matches for student {studentId}: \n {listOfGroups}')

    # group to student matches
    groupId = 10
    sql = f"SELECT p.groupId, projectNum, projRank FROM uteamup.grouppreference as p where p.groupId='{groupId}';"
    data = db.execute(text(sql))
    dict = {'groupId': [], 'projectNum': [], 'projRank': []}
    for line in data.all():
        dict['groupId'].append(line[0])
        dict['projectNum'].append(line[1])
        dict['projRank'].append(line[2])
    groupJson = json.dumps(dict)
    sql = "SELECT p.studentId, projectNum, projRank FROM projectpreference as p, individualstudents as s where  s.studentId=p.studentId;"
    data = db.execute(text(sql))
    dict = {'studentId': [], 'projectNum': [], 'projRank': []}
    for line in data.all():
        dict['studentId'].append(line[0])
        dict['projectNum'].append(line[1])
        dict['projRank'].append(line[2])
    studentJson = json.dumps(dict)
    groupListofStudents = groupToStudentsMatch(groupId, groupJson, studentJson)
    print(f'Student matches for group {groupId}:\n {groupListofStudents}')


    # remaining students grouping
    sql = "SELECT p.studentId, projectNum, projRank FROM projectpreference as p, individualstudents as s where  s.studentId=p.studentId;"
    data = db.execute(text(sql))
    dict = {'studentId': [], 'projectNum': [], 'projRank': []}
    for line in data.all():
        dict['studentId'].append(line[0])
        dict['projectNum'].append(line[1])
        dict['projRank'].append(line[2])
    jsonData = json.dumps(dict)
    remainingGroups = sortRemainingStudents(jsonData,4,6)
    print(remainingGroups)









