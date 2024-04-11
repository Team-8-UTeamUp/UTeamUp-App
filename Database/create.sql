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
lastName varchar(30)
);

create table admin(
adminId varchar(9) primary key not null,

CONSTRAINT `adminID`
foreign key(adminID) references `user`(`userId`)
ON DELETE CASCADE
ON UPDATE CASCADE
); 

create table formedGroups(
groupId int primary key not null auto_increment,
groupName varchar(20) not null,
groupCompleted bool not null,
groupSizePref int not null,
groupLeader varchar(9) not null
);

create table groupSkills(
groupID int not null,
skill varchar(30) not null,
CONSTRAINT groupSkillPK
	PRIMARY KEY (`groupID`, `skill`),
constraint groupSkillFK
foreign key (groupID) references `formedGroups`(`groupId`)
ON DELETE CASCADE
ON UPDATE CASCADE
);

create table groupLang(
groupID int not null,
languages varchar(15) not null,

CONSTRAINT groupLangPK
	PRIMARY KEY (`groupID`, `languages`),
constraint groupLangFK
foreign key (groupID) references `formedGroups`(`groupId`)
ON DELETE CASCADE
ON UPDATE CASCADE
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
# add leader constraing to group
Alter table formedgroups add CONSTRAINT `GLFK`
	foreign key(groupLeader) references `student`(`studentId`);
    

	


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
select groupName, formedgroups.groupId, user.firstName, user.lastName, student.studentid
from student, formedgroups, user
where student.groupId=formedgroups.groupId and student.studentId=user.userId;


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
