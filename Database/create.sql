create database if not exists `uteamup` default character set utf8 collate utf8_general_ci;

use uteamup;



create table globalVars(
varName varchar(10) primary key,
varValue int
);
insert into globalVars(varName, varValue) values ("minMembers",4);
insert into globalVars(varName,varValue) values("maxMembers",6);


create table User(
userId varchar(9) unique primary key not null,
firstName varchar(20) ,
lastName varchar(30),
password varchar(15) not null
);

create table admin(
adminId varchar(9) primary key not null,

CONSTRAINT `adminID`
foreign key(adminID) references `user`(`userId`)
ON DELETE CASCADE
ON UPDATE CASCADE
); 

CREATE TABLE formedGroups (
    groupId INT PRIMARY KEY AUTO_INCREMENT,
    groupName VARCHAR(20) NOT NULL DEFAULT 'Teams', -- Default value is an empty string
    groupCompleted BOOL NOT NULL Default False,
    groupSizePref INT NOT NULL,
    groupLeader VARCHAR(9) NOT NULL
);





create table student(
studentId varchar(9) primary key not null,
email varchar(22), 
groupId int Default 0, 
prefGroupSize int,
bio varchar(750) default "",

CONSTRAINT `studentID`
foreign key(studentId) references `user`(`userId`)
ON DELETE CASCADE
ON UPDATE CASCADE
);



	


create table skills(
studentId varchar(9) not null,
skill varchar(30) not null,

CONSTRAINT skillPK
	PRIMARY KEY (`studentId`, `skill`),
constraint `skillStudentID`
foreign key(studentId) references `student`(`studentId`)
ON DELETE CASCADE
ON UPDATE CASCADE
);


create table languages(
studentId varchar(9)  not null,
languages varchar(15) not null,

CONSTRAINT langPK
	PRIMARY KEY (`studentId`, `languages`),
constraint `langStudentID`
foreign key(studentId) references `student`(`studentId`)
ON DELETE CASCADE
ON UPDATE CASCADE
);

create table project(
projectNum int primary key not null,
title varchar(20) not null,
projType varchar(20) not null
);

create table projectPreference(
studentId varchar(9) not null,
projectNum int not null,
projRank int not null,

CONSTRAINT projPrefPK
	PRIMARY KEY (`studentId`, `projectNum`),
CONSTRAINT projPrefStuIDFK
	FOREIGN KEY (`studentId`) REFERENCES `student`(`studentId`)
	ON DELETE CASCADE	
	ON UPDATE CASCADE,
CONSTRAINT projPrefPNumFK
	FOREIGN KEY (`projectNum`) REFERENCES `project`(`projectNum`)
		ON DELETE CASCADE
		ON UPDATE CASCADE      
);

create table groupPreference(
groupId int not null,
projectNum int not null,
projRank int not null,

CONSTRAINT groupPrefPK
	PRIMARY KEY (`groupId`, `projectNum`),
CONSTRAINT groupPrefGIDFK
	FOREIGN KEY (`groupId`) REFERENCES `formedGroups`(`groupId`)
	ON DELETE CASCADE	
	ON UPDATE CASCADE,
CONSTRAINT groupPrefPNumFK
	FOREIGN KEY (`projectNum`) REFERENCES `project`(`projectNum`)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);



create table studentRequestStudent(
senderId varchar(9) not null, 
receiverId varchar(9) not null,

CONSTRAINT SRSPK
	PRIMARY KEY (`senderId`, `receiverId`),
CONSTRAINT SIDFK
	FOREIGN KEY (`senderId`) REFERENCES `student`(`studentId`)
	ON DELETE CASCADE	
	ON UPDATE CASCADE,
CONSTRAINT RIDFK
	FOREIGN KEY (`receiverId`) REFERENCES `student`(`studentId`)
	ON DELETE CASCADE	
	ON UPDATE CASCADE
);

create table studentRequestGroup(
senderId varchar(9) not null, 
receiverId int not null,

CONSTRAINT SRGPK
	PRIMARY KEY (`senderId`, `receiverId`),
CONSTRAINT SRGSIDFK
	FOREIGN KEY (`senderId`) REFERENCES `student`(`studentId`)
	ON DELETE CASCADE	
	ON UPDATE CASCADE,
CONSTRAINT SRGRIDFK
	FOREIGN KEY (`receiverId`) REFERENCES `formedgroups`(`groupId`)
	ON DELETE CASCADE	
	ON UPDATE CASCADE
);

create table groupRequestStudent(
senderId int not null, 
receiverId varchar(9) not null,

CONSTRAINT GRSPK
	PRIMARY KEY (`senderId`, `receiverId`),
CONSTRAINT GRSSIDFK
	FOREIGN KEY (`senderId`) REFERENCES `formedgroups`(`groupId`)
	ON DELETE CASCADE	
	ON UPDATE CASCADE,
CONSTRAINT GRSRIDFK
	FOREIGN KEY (`receiverId`) REFERENCES `student`(`studentId`)
	ON DELETE CASCADE	
	ON UPDATE CASCADE
);




create view groupInfo AS
select groupName, formedgroups.groupId, user.firstName, user.lastName, student.studentid,student.bio,student.email
from student, formedgroups, user
where student.groupId=formedgroups.groupId and student.studentId=user.userId;

create view grouplang as 
SELECT DISTINCT g.groupId, sg.languages
FROM student s
JOIN languages sg ON s.studentId = sg.studentId
JOIN formedGroups g ON s.groupId = g.groupId
order by g.groupId asc;

create view groupskills as 
SELECT DISTINCT g.groupId, sg.skill
FROM student s
JOIN skills sg ON s.studentId = sg.studentId
JOIN formedGroups g ON s.groupId = g.groupId
order by g.groupId asc;

create view individualStudents AS
select studentId, firstName, lastName
from student, user
where studentId=user.userId AND student.groupId=0;

create view UTDProjects as
select projectNum, title
from project
where projType ='UTDProject';

create view CSProjects as
select projectNum, title
from project
where projType = 'CSProject';

create view groupProfile as

SELECT gi.groupId,
       gi.members,
       gi.bios,
       gi.emails,
       gi.totalMembers,
       pp.UTDProjects,
       pp.CSProjects,
       pp.UTDNums,
       pp.CSNums,
       t.languages,
       t.skills,
       t.groupName,
       t.groupSizePref
FROM (
         SELECT groupId,
                GROUP_CONCAT('"',firstName, ' ', lastName,'"') AS members,
                GROUP_CONCAT('"', bio, '"') AS bios,
                COUNT(firstName) AS totalMembers,
                GROUP_CONCAT('"',email,'"') as emails
         FROM groupinfo 
         GROUP BY groupId
     ) AS gi
JOIN (
         SELECT gp.groupId,
                GROUP_CONCAT('"',
                             CASE
                                 WHEN p.projType = 'UTDProject' THEN p.title
                                 ELSE NULL
                                 END ORDER BY gp.projRank SEPARATOR '",') AS UTDProjects,
                GROUP_CONCAT('"',
                             CASE
                                 WHEN p.projType = 'CSProject' THEN p.title
                                 ELSE NULL
                                 END ORDER BY gp.projRank SEPARATOR '",') AS CSProjects,
				group_concat( 
								CASE
                                 WHEN p.projType = 'UTDProject' THEN p.projectNum
                                 ELSE NULL
                                 END ORDER BY gp.projRank SEPARATOR ',') AS UTDNums,
				group_concat(
								CASE
                                 WHEN p.projType = 'CSProject' THEN p.projectNum
                                 ELSE NULL
                                 END ORDER BY gp.projRank SEPARATOR ',') AS CSNums
         FROM grouppreference AS gp
                  JOIN project AS p ON p.projectNum = gp.projectNum
         GROUP BY gp.groupId
     ) AS pp ON gi.groupId = pp.groupId
JOIN (
         SELECT g.groupId,
                g.groupName,
                g.groupSizePref,
                GROUP_CONCAT(DISTINCT CONCAT('"', l.languages, '"')) AS languages,
                GROUP_CONCAT(DISTINCT CONCAT('"', sk.skill, '"')) AS skills
         FROM formedGroups g
                  JOIN grouplang l ON g.groupId = l.groupId
                  JOIN groupskills sk ON g.groupId = sk.groupId
         GROUP BY g.groupId
     ) AS t ON gi.groupId = t.groupId;
     
     
     
create view studentProfile as 
SELECT combined.studentId,
	 combined.UTDProjects,
	 combined.CSProjects,
	 details.languages,
	 details.skills,
	 details.name,
	 details.bio,
	 details.prefGroupSize
FROM (SELECT s.studentId,
		   GROUP_CONCAT('"',
						CASE
							WHEN p.projType = 'UTDProject' THEN p.title
							ELSE NULL
							END ORDER BY s.projRank SEPARATOR '",') AS UTDProjects,
		   GROUP_CONCAT('"',
						CASE
							WHEN p.projType = 'CSProject' THEN p.title
							ELSE NULL
							END ORDER BY s.projRank SEPARATOR '",') AS CSProjects
	FROM projectPreference AS s
			 JOIN
		 project AS p ON p.projectNum = s.projectNum
	GROUP BY s.studentId) AS combined
	   JOIN (SELECT s.studentId,
					GROUP_CONCAT(DISTINCT CONCAT('"', l.languages, '"')) AS languages,
					GROUP_CONCAT(DISTINCT CONCAT('"', sk.skill, '"'))    AS skills,
					CONCAT(u.firstName, ' ', u.lastName)                 AS name,
					s.bio,
					s.prefGroupSize
			 FROM student s
					  JOIN
				  languages l ON s.studentId = l.studentId
					  JOIN
				  skills sk ON s.studentId = sk.studentId
					  JOIN
				  user u ON s.studentId = u.userId
			 GROUP BY s.studentId) AS details
			ON combined.studentId = details.studentId;