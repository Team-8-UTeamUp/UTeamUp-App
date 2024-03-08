import csv
import os
import names
import string
import random

import mysql.connector


def randomStudent():
    randIDNumber = random.randint(200000, 300000)
    randFirst = names.get_first_name()
    randLast = names.get_last_name()
    randMiddle = random.choice(string.ascii_uppercase)

    UTDID = randFirst[0] + randMiddle + randLast[0] + str(randIDNumber)

    email = UTDID + "@utdallas.edu"

    groupSizePref = random.randint(4, 6)
    randUser = {"userId":UTDID, "firstName": randFirst, "lastName": randLast }
    randStudent = {"studentId":UTDID, "email": email, "prefGroupSize": groupSizePref}

    return randUser, randStudent

def skillsList(userId):
    skills = ["Front-End", "Back-End", "Full-Stack",
              "Database", "Machine Learning",
              "Artificial Intelligence", "Virtual Reality",
              "Mobile Dev", "Other"]
    numSkills = random.randint(0, len(skills))

    randSkill =random.sample(skills, numSkills)

    return [{"studentId": userId, "skill": randSkill[i]} for i in range(numSkills)]


def languageList(userId):
    languages = ["Java", "C++", "Python",
                 "HTML", "CSS", "SQL", "JavaScript",
                 "NodeJs", "Other"
                 ]
    numLangs = random.randint(0, len(languages))

    level = ["beg", "int", "adv"]

    randLang = random.sample(languages, numLangs)
    randLevel = [random.choice(level) for l in range(numLangs)]
    randLangDict = [{"studentId": userId, "languages": randLang[i], "expLevel": randLevel[i]} for i in range(numLangs)]

    return randLangDict

def projectPrefList(userId, numChoices=5, numUTD=20, numCS=6):

    utdList = random.sample(range(1, numUTD), numChoices)
    cspList = random.sample(range(numUTD +1, numCS + numUTD), numChoices)

    projectList = [{'studentId':userId, 'projectNum':utdList[i], 'rank':i+1} for i in range(len(utdList))]
    projectList += [{'studentId':userId, 'projectNum':cspList[i], 'rank':i+1} for i in range(len(cspList))]
    return projectList

def createDataSet(numStudents, numProjectPrefs=5, numUTDProjects=21, numCSProjects=6):
    usersSet = []
    studentsSet = []
    languageSet = []
    skillSet = []
    projPrefSet = []
    for i in range(numStudents):
        userInfo, studentInfo = randomStudent()
        usersSet.append(userInfo)
        studentsSet.append(studentInfo)
        skillSet += skillsList(userInfo['userId'])
        languageSet += languageList(userInfo['userId'])
        projPrefSet +=projectPrefList(userInfo['userId'],numProjectPrefs, numUTDProjects, numCSProjects)

    return usersSet, studentsSet, languageSet, skillSet, projPrefSet
def writeToCSV(fileName, fields, data):
    with open(fileName, 'a', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fields, )

        if os.stat(fileName).st_size == 0:
            writer.writeheader()

        writer.writerows(data)

if __name__ == "__main__":
    # write data to database
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="password123!",
        database="uteamup"
    )

    mycursor = mydb.cursor()
    #'''
    """ Run once to create Project database"""
    sql = sql = "INSERT into project(projectNum, title, projType) values(%s, %s, %s)"
    for i in range(21):
     val = (i + 1, f'Project {i + 1}', "UTDProject")
     mycursor.execute(sql, val)

    sql = "INSERT into project(projectNum, title, projType) values(%s, %s, %s)"
    for i in range(21, 27):
     val = (i + 1, f'Project {i + 1}', "CSProject")
     mycursor.execute(sql, val)

    mydb.commit()
    #'''
    """ Run every time you want to generate new student data"""
    # used to be able to regenerate code
    random.seed(42)
    users, students, languages, skills, projPrefs = createDataSet(500, 5, 21,6)

    # write all data to csv files
    writeToCSV("user.csv", list(users[0].keys()), users)
    writeToCSV('student.csv', list(students[0].keys()), students)
    if(len(skills) >=1):
        writeToCSV('skills.csv',list(skills[0].keys()),skills)
    if(len(languages) >=1):
        writeToCSV('languages.csv',list(languages[0].keys()),languages)
    writeToCSV("projectPreferences.csv", list(projPrefs[0].keys()), projPrefs)



    sql = "INSERT into user(userId, firstName, lastName) values(%s, %s, %s)"
    for account in users:
        val = (account['userId'], account['firstName'], account['lastName'])
        mycursor.execute(sql, val)

    mydb.commit()

    sql = "INSERT into student(studentId, email, prefGroupSize) values(%s, %s, %s)"
    for person in students:
        val = (person['studentId'], person['email'], person['prefGroupSize'])
        mycursor.execute(sql, val)

    mydb.commit()

    sql = "INSERT into skills(studentId, skill) values(%s, %s)"
    for skill in skills:
        val = (skill['studentId'], skill['skill'])
        mycursor.execute(sql, val)

    mydb.commit()

    sql = "INSERT into languages(studentId, languages, expLevel) values(%s, %s, %s)"
    for lang in languages:
        val = (lang['studentId'], lang['languages'], lang['expLevel'])
        mycursor.execute(sql, val)
    mydb.commit()

    sql = "INSERT into projectPreference(studentId, projectNum, projRank) values(%s, %s, %s)"
    for proj in projPrefs:
        val = (proj['studentId'], proj['projectNum'], proj['rank'])
        mycursor.execute(sql, val)

    mydb.commit()


