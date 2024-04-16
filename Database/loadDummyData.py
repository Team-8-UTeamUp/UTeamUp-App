import pandas as pd
from sqlalchemy import create_engine,text


def  csvToSql(csvFile,table, db):
    df = pd.read_csv(csvFile)
    df.set_index(df.columns[0], inplace=True)
    df.to_sql(table, db, if_exists='append')


if __name__ == "__main__":
    engine = create_engine(f'mysql+mysqlconnector://root:password@localhost/uteamup')
    db = engine.connect()


    csvToSql('user.csv', 'user', db)
    csvToSql('admin.csv', 'admin', db)
    csvToSql('student.csv', 'student', db)
    csvToSql('languages.csv', 'languages', db)
    csvToSql('skills.csv', 'skills', db)
    csvToSql('projects.csv', 'project', db)
    csvToSql('projectPreferences.csv', 'projectpreference',db)
    csvToSql('formedGroups.csv', 'formedgroups', db)
    csvToSql('grouppreference.csv','grouppreference',db)
    csvToSql('GroupRequestStudent.csv','grouprequeststudent',db)
    csvToSql('StudentRequestGroup.csv','studentrequestgroup',db)
    csvToSql('StudentRequestStudent.csv','studentrequeststudent',db)




