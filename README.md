# Quick start

### The requirement of this application

Database: Postgresql, runs on localhost port 5432 with a database named "comp9900".
Frontend: React/Redux
Backend: Python3

NLP Process: Spacy library and statistical model "en_core_web_sm". For detail, see
setup NLP part.


## Step 1: Setup database ##

This application uses Postgresql as database to manage and store data. Make sure you have a 
Postgresql server running on localhost:5432 and createdb, dropdb, psql commands could be used.

1. On your own machine:

```bash
$ createdb comp9900
$ psql comp9900
comp9900=# \i init.sql
comp9900=# \q
```

Once you finish using this application, run the following command to drop whole database.

```bash
$ dropdb comp9900
```


## Step 2: Setup & run the backend server ##

This application uses Python3 as running environment and Flask as framework.
There are 2 ways to setup server, run the following command.

1. On your own machine, in virtualenv:

```bash
# create a sandbox for the backend
$ python3 virtualenv -p /usr/bin/python3 env
# enter sandbox
$ source env/bin/activate
# set up sandbox
$ pip install -r requirements.txt
```

2. You can just install the necessary packages. This risks breaking other application which uses other versions of these packages

```bash
# install require library
$ pip3 install -r requirements.txt
```

### run the server

After you finish all setup part, you can use following command to start the backend server

```bash
$ python3 backend.py
```

### Setup NLP library part (Optional) ###

This application use Spacy as the NLP library to do the recommendation job.
Once you setup server, Spacy has already been insatlled in your computer.
Run the following command to finish setup nlp library.

1. On your own machine:

```bash
$ python3 -m spacy download en_core_web_sm
```

2. On your own machine, in virtualenv:

```bash
$ python -m spacy download en_core_web_sm
```

## Step 3: run the app ##

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Initial users:
<pre>
-- username        --password
  employer1         123456
  instructor1       123456
  candidate1        123456
</pre>



