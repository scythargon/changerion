#!/usr/bin/env python3

import json
import csv

import redis as redis_engine
import jinja2

from flask import Flask, render_template, send_from_directory, request


redis = redis_engine.StrictRedis(host="redis", port=6379, db=1, charset="utf-8", decode_responses=True)

react_front = './front_react/build/'

app = Flask(__name__, static_url_path="/static", static_folder=react_front)

my_loader = jinja2.ChoiceLoader([
        app.jinja_loader,
        jinja2.FileSystemLoader(['./']),
    ])

app.jinja_loader = my_loader


# currency_names = set('BTC', 'DASH', 'ETH', 'ETC', 'LTC', 'ZEC', 'XRP', 'XMR', 'DOGE', 'WAVES', 'KICK', 'USDT', 'BCH')

class Currency():
    def __init__(self, code, wallet_address, minimal_deposit_amount, fee, comment):
        self.code = code
        self.wallet_address = wallet_address
        self.minimal_deposit_amount = minimal_deposit_amount
        self.fee = fee
        self.comment = comment

    def __repr__(self):
        return f'<Currency: {self.code}>'

    def to_dict(self):
        return {
            # 'code': self.code,
            'wallet_address': self.wallet_address,
            'minimal_deposit_amount': self.minimal_deposit_amount,
            'fee': self.fee,
            'comment': self.comment,
        }


def load_currencies_info():
    currencies = []
    with open('wallets.csv', newline='\n') as csvfile:
        reader = csv.DictReader(csvfile, delimiter='|', quotechar='"')
        for row in reader:
            currency = Currency(
                row['code'],
                row['wallet_address'],
                row['minimal_deposit_amount'],
                row['fee'],
                row['comment'],
            )
            currencies.append(currency)
    return currencies


def get_courses():
    keys = redis.keys('*')
    for key in keys:
        amount = redis.get(key)
        give, receive = key.split('_')
        yield {
            'give': give,
            'receive': receive,
            'amount': float(amount) * 0.93
        }


@app.route('/')
def index():
    currencies = load_currencies_info()
    courses = get_courses()
    # currencies = [c.to_dict() for c in load_currencies_info()]
    return render_template('index.html', **locals())


if __name__ == '__main__':
    app.run(port=8080, host='0.0.0.0', debug=True)
