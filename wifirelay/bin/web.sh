#!/bin/sh

gunicorn runserver:app --workers 4
