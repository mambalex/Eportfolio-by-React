# The requirement of this application

Database: Postgresql, runs on localhost port 5432 with a database named "comp9900".
For the details of setting up database, please follow the database setup part

Server: Python3. For more details, see setup server part.

NLP Process: Spacy library and statistical model "en_core_web_sm". For detail, see
setup NLP part.

# Setup

### Setup Server  ###

This application uses Python3 as running environment and Flask as framework.
To setup server, run the following command.

1. On your own machine:

```bash
# install require library
$ pip3 install -r requirements.txt
```

2. On your own machine, in virtualenv:

```bash
# create a sandbox for the backend
$ python3 virtualenv -p /usr/bin/python3 env
# enter sandbox
$ source env/bin/activate
# set up sandbox
$ pip install -r requirements.txt
```


### Setup database ###

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


### Setup NLP library part ###

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


# Start application

After you finish all setup part, you can use following command to start this
application. 
This application will run on localhost:5000, makesure no other service or 
application running on port 5000.

1. On your own machine:

```bash
$ python3 backend.py
```


And now server is running on localhost:5000.
