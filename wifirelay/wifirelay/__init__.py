import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

directory = os.path.dirname(os.path.realpath(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///%s/database.sql' % directory
db = SQLAlchemy(app)

from wifirelay.models import *
from wifirelay.resources import *
