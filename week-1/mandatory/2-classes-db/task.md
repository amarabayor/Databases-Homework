# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql
drop table if exists mentors, students, topics, classes, attendance cascade;
CREATE TABLE mentors (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(30) NOT NULL,
  email     VARCHAR(120) NOT NULL,
  address   VARCHAR(120),
  favourite_programming VARCHAR(50),
  years_in_glasgow  integer  
);
INSERT INTO mentors(name, email, address, favourite_programming, years_in_glasgow) values
	('flaminia ','flaminia@migracode.org','Carrer del Rec 27, Barcelona','Javascript',20),
	('Angelo Zarate','angenlo@migracode.org','Carrer del Rec 27, Barcelona','React',1),
	('Chalie Cobo','j.cobo@mail.com','Carrer del Rec 27, Barcelona','JavaScript',5),
	('Henriette','Henriette@migracode.org','Carrer del Rec 27, Barcelona','JavaScript',10),
	('William Gome','gome@migracode.org','Carrer del Rec 27, Barcelona',' HTML5 and CSS5',10);
CREATE TABLE students (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(30) NOT NULL,
  address   VARCHAR(80) not NULL,
  graduation_date date
 );
INSERT INTO students(name, address, graduation_date) VALUES ('Amara Bayor','Carrer del Rec 27, Barcelona', Now());
INSERT INTO students(name, address) VALUES ('John Smith','Carrer del Rec 27, Barcelona');
INSERT INTO students(name, address, graduation_date) VALUES ('Physio Bipasha','Carrer del Rec 27 Barcelona',Now());
INSERT INTO students(name, address, graduation_date) VALUES ('Aleksey Andrushchenko','Carrer del Rec 27 Barcelona',Now());
INSERT INTO students(name, address, graduation_date) VALUES ('Ali raza Ashraf','Carrer del Rec 27 Barcelona',Now());
INSERT INTO students(name, address) VALUES ('Anudeep Ayilalath','Carrer del Rec 27 Barcelona');
INSERT INTO students(name, address, graduation_date) VALUES ('Ramin','Carrer del Rec 27, Barcelona',Now());
INSERT INTO students(name, address, graduation_date) VALUES ('Diana Dashkovska','Carrer del Rec 27 Barcelona',Now());
INSERT INTO students(name, address, graduation_date) VALUES ('Thony Nava','Carrer del Rec 27 Barcelona',Now());
INSERT INTO students(name, address) VALUES ('Nour Salameh','Carrer del Rec 27 Barcelona');
create table topics (
	name varchar(30) primary key
);
insert into topics (name) values
	('Javascript'),
	('Node'),
	('Databases'),
    ('React'),
   ('HTML5_CSS5');
create table classes (
	id serial primary key,
	mentor serial references mentors(id),
	topic varchar(30) references topics(name),
	date date not null,
	location varchar(30) not null
);
INSERT INTO classes(mentor, topic, date, location ) VALUES (2,'Node','11/9/2020','online');
INSERT INTO classes(mentor, topic, date, location ) VALUES (1,'Javascript','01/06/2020','online');
INSERT INTO classes(mentor, topic, date, location ) VALUES (3,'Databases','09/10/2020','online');
INSERT INTO classes(mentor, topic, date, location ) VALUES (4,'React','03/08/2020','online');
INSERT INTO classes(mentor, topic, date, location ) VALUES (5,'HTML5_CSS5',Now(),'oline');
create table attendance (
	id serial primary key,
	student serial references students(id),
	class serial references classes(id)
);
insert into attendance (student, class) values
	(1, (select id from classes where topic = 'Node' and date = '11/09/2020')),
	(2, (select id from classes where topic = 'Databases' and date = '09/10/2020'));

SELECT * FROM mentors WHERE years_in_glasgow < 5;
SELECT * FROM mentors where favourite_programming = 'Javascript';
select * from students where graduation_date is not null;
select * from classes where date < '01/06/2020';
select * from students where id in (
	select student from attendance where class = (
		select id from classes where topic = 'Databases' and extract(day from date) = extract(day from now())
	)
);


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)
2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.

3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).
4. Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.
5. Insert 10 students in the `students` table.
6. Verify that the data you created for mentors and students are correctly stored in their respective tables (hint: use a `select` SQL statement).
7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - A class is taught at a specific date and at a specific location

8. Insert a few classes in the `classes` table
9. We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.
10. Answer the following questions using a `select` SQL statement:
    - Retrieve all the mentors who lived more than 5 years in Glasgow
    - Retrieve all the mentors whose favourite language is Javascript
    - Retrieve all the students who are CYF graduates
    - Retrieve all the classes taught before June this year
    - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).
