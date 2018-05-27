import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

directory = os.path.dirname(os.path.realpath(__file__))

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///%s/database.sql' % directory
db = SQLAlchemy(app)

from wifirelay.models import *
from wifirelay.resources import *
