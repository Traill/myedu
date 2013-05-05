Trailhead
=========

Introduction
------------

Trailhead aims to make it easier to browse scientific articles or similar 
collections of textual information. The code consists of a user interface 
written in *html* and *javascript* and a backend written in *scala*. The 
backend is split into two separate parts:

-  web: Takes care of requests from the frontend
-  paper: Takes care of parsing and analyzing text documents

Setup for testing
-----------------

For Trailhead to work you must have an instance of 
[http://mongodb.org](mongoDB) running in the background and 
[http://scala-sbt.org](sbt) installed on your system. Once you've installed 
these, clone the repository:
```sh
git clone https://github.com/Traill/myedu.git
```
Next step is parse a set of documents and add their information to the 
database. To do so, run
```sh
sbt console
```
Once sbt has compiled the project and opened the console you type the 
following:
```scala
import paper._
val a = Analyzer.initialize("myeducs").parse.link.save
```
In the last command the following things happen:
-  *initialize("myeducs")* specifies the location of the documents relative the 
   the resources folder
-  *parse* takes each document and parses it
-  *link* goes through the documents and calculates the similarity between each 
   one
-  *save* saves the documents to the database

Now that the database is set up, all that is left to do is to write *exit* to 
exit the console, and type sbt run from the command line. Trailhead should now 
be running on http://localhost:8080

The Analyzer
------------
Todo
