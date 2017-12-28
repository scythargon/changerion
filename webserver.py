#!/usr/bin/env python3
import json
from flask import Flask, render_template, send_from_directory, request
import redis as redis_engine
import jinja2



redis = redis_engine.StrictRedis(host="localhost", port=6379, db=0, charset="utf-8", decode_responses=True)

react_front = './front_react/build/'

app = Flask(__name__, static_url_path="/static", static_folder=react_front)

my_loader = jinja2.ChoiceLoader([
        app.jinja_loader,
        jinja2.FileSystemLoader(['./']),
    ])

app.jinja_loader = my_loader


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(port=8080, host='0.0.0.0', debug=True)
