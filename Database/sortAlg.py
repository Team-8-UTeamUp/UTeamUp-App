import pandas as pd
import numpy as np
import math
import sys
import json
from sklearn.cluster import KMeans
from sqlalchemy import create_engine, text
from io import StringIO


""" Main functions to call"""

def sortRemainingStudents( studentJson, groupJson,membersJson, min, max):
    # add sql call, change later to read json

    # get all students that aren't in a group
    df = pd.DataFrame.from_dict(studentJson)
    # pivot and inverse the values
    studentData = pd.pivot(df, index='studentId', columns='projectNum', values='projRank').fillna(0)
    studentData = studentData[studentData.columns].apply(lambda x: x.map({5: 1, 4: 2, 3: 3, 2: 4, 1: 5, 0: 0}))

    studentData = pd.DataFrame(studentData)

    df = pd.DataFrame.from_dict(groupJson)
    # pivot and inverse the values
    groupData = pd.pivot(df, index='groupId', columns='projectNum', values='projRank').fillna(0)
    groupData = groupData[groupData.columns].apply(lambda x: x.map({5: 1, 4: 2, 3: 3, 2: 4, 1: 5, 0: 0}))



    groupMembers = pd.DataFrame.from_dict(membersJson)
    groupMembers.set_index('groupId', inplace=True)
    ## X is only being used since there are 450+ students in database currently
    x = pd.DataFrame(studentData.values[0:40], index=studentData.index[:40], columns=studentData.columns)
    avg = math.floor((min + max) / 2)

    # use existing groups
    existGroups = {}
    if(groupData.index.shape[0] > 0 ):
        x = pd.concat([x, groupData]).fillna(0)
        # use existing groups
        existGroups, x, groupMembers = addToExistingGroups(x, groupMembers, min, max, avg)

    # create new groups
    indvStudents = x[~x.index.isin(groupMembers.index)]
    newGroups = {}
    groupSize = []
    if indvStudents.index.shape[0] > 0:
        newGroups, groupSize = createGroups(indvStudents,min, max, avg)

    groups = {"addMembers":existGroups, "createGroups":newGroups}

    return groups


def studentToStudentsMatches(studentId, projectData, skillData):
    """ Show a specific student a list of other students that match their preferences"""

    # get all students that aren't in a group
    df = pd.DataFrame.from_dict(projectData)

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
    dfs = pd.DataFrame.from_dict(skillData)
    # value of 1/0, has/doesn't have skill
    dfs['value'] = 1
    dfs = pd.pivot(dfs, index='studentId', columns='skill', values='value').fillna(0)

    # return sorted list based on proj pref and skills
    possibleMatches = studentSkillMatch(studentId, dfs, projMatches)
    return list(possibleMatches.keys())

def studentToGroupsMatch(studentId, studentData, groupData):
    """ Show a specific student the list of groups that match their preferences"""
    df = pd.DataFrame.from_dict(studentData)
    # pivot data frame to show rank values for each project columns
    studentDF = pd.pivot(df, index='studentId', columns='projectNum', values='projRank').fillna(0)
    # transform df to vertical format
    studentDF = pd.DataFrame(studentDF.loc[studentId])
    df = pd.DataFrame.from_dict(groupData)
    groupsDF = pd.pivot(df, index='groupId',columns='projectNum', values='projRank').fillna(0)

    if groupsDF.shape[0] == 0:
        return []

    possibleMatches = ProjMatch(studentDF, groupsDF)

    # return list of IDs in order of highest to lowest match score
    return [int(k) for k in possibleMatches.keys()]


def groupToStudentsMatch(groupId, groupData, studentData):
    """ Show specific group a list of possible students that match their preferences"""
    df = pd.DataFrame.from_dict(groupData)
    # switch data frame to show rank values in each project columns
    groupDF = pd.pivot(df, index='groupId', columns='projectNum', values='projRank')
    # transform pd to list format
    groupDF = pd.DataFrame(groupDF.loc[groupId])
    df = pd.DataFrame.from_dict(studentData)
    studentDF = pd.pivot(df, index='studentId',columns='projectNum', values='projRank').fillna(0)

    if studentDF.shape[0] == 0:
        return []

    possibleMatches = ProjMatch(groupDF, studentDF)

    if len(possibleMatches) > 100:
        indexes = round(len(possibleMatches) * .2)
        possibleMatches = Convert(list(possibleMatches.items())[:indexes])

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

def addToExistingGroups(x, groupMembers,min, max, avg):
    groups = {}
    while groupMembers['totalMembers'].min() < min and x[~x.index.isin(groupMembers.index)].shape[0] > 0:
        numClusters = math.ceil(x.index.shape[0] / avg)
        kclustering = KMeans(n_clusters=numClusters, random_state=5)
        kclustering.fit(x)
        x['Kmeanslabels'] = kclustering.labels_
        temp = pd.DataFrame(x[~x.index.isin(groupMembers.index)])
        for index in groupMembers.index:
            cluster = x.loc[index]['Kmeanslabels']
            currMembers = groupMembers.loc[index].values[0]
            clusterSize = temp[temp['Kmeanslabels'] == cluster].shape[0]
            if clusterSize + currMembers > max:
                addMax = max - currMembers
                membersID = temp[temp['Kmeanslabels'] == cluster][:addMax].index.tolist()
            else:
                membersID = temp[temp['Kmeanslabels'] == cluster].index.tolist()

            groupMembers.loc[index] = currMembers + len(membersID)
            if(len(membersID) > 0):
                if index in groups.keys():
                    groups[index]['members'].append(membersID)
                else:
                    groups[index] = {'members': membersID}

            temp.drop(index=membersID, inplace=True)
            x.drop(index=membersID, inplace=True)
            if groupMembers.loc[index].values[0] == max:
                x.drop([index], inplace=True)
                groupMembers.drop([index], inplace=True)
        x.drop(['Kmeanslabels'], axis=1, inplace=True)

    return groups, x, groupMembers

def createGroups(x, min, max, avg):
    groups ={}
    index = 0
    groupSize = []
    while x.index.shape[0] > max:
        numClusters = math.ceil(x.index.shape[0] / avg)
        kclustering = KMeans(n_clusters=numClusters, random_state=5)
        kclustering.fit(x)
        x['Kmeanslabels'] = kclustering.labels_
        for cluster in x['Kmeanslabels'].unique():
            if x[x['Kmeanslabels'] == cluster].shape[0] >= min:
                if x[x['Kmeanslabels'] == cluster].shape[0] >= max:
                    membersID = x[x['Kmeanslabels'] == cluster][:max].index.tolist()
                else:
                    membersID = x[x['Kmeanslabels'] == cluster].index.tolist()

                groups[index] = {'members': membersID}
                groupSize.append(len(membersID))
                index += 1
                x.drop(index=membersID, inplace=True)
        x.drop(['Kmeanslabels'], axis=1, inplace=True)

    while x.index.shape[0] != 0:
        if x.index.shape[0] >= min:
            groups[index] = {'members': x.index.tolist()}
            groupSize.append(len(x.index.tolist()))
            x.drop(x.index, inplace=True)
        else:
            minIndex = pd.Series(groupSize).idxmin()
            if (groupSize[minIndex] < max):
                minIndex = pd.Series(groupSize).idxmin()
                groups[minIndex]['members'].append(x.index[0])
                groupSize[minIndex] += 1
                x.drop(x.index[0], inplace=True)
            else:
                groups[index] = {'members': [x.index[0]]}
                groupSize.append(1)
                index += 1
                x.drop(x.index[0], inplace=True)

    return groups, groupSize
def Convert(list):
    h = {k:v for k,v in list}
    return h

if __name__ == "__main__":
    # run with node.js
    inputs = input()
    params = json.loads(inputs)
    algType = params['algType']

    match algType:
        case "s2s":
            studentId = params['studentId']
            projectData = params['projData']
            skillData = params['skillData']
            listOfStudents = studentToStudentsMatches(studentId, projectData, skillData)
            result = {'matches': listOfStudents}
            print(json.dumps(result))
        case "s2g":
            studentId = params['studentId']
            studentData = params['studentData']
            groupData = params['groupData']
            listOfGroups = studentToGroupsMatch(studentId, studentData, groupData)
            result = {"matches": listOfGroups}
            print(json.dumps(result))

        case "g2s":
            groupId = params['groupId']
            groupData = params['groupData']
            studentData = params['studentData']
            groupListofStudents = groupToStudentsMatch(groupId, groupData, studentData)
            result = {"matches": groupListofStudents}
            print(json.dumps(result))
        case "rs":
            studentData = params['studentData']
            groupData = params['groupData']
            membersData = params['memberData']
            min = params['min']
            max = params['max']
            remainingGroups = sortRemainingStudents(studentData, groupData, membersData, min, max)
            result = {"matches": remainingGroups}
            print(json.dumps(result))










