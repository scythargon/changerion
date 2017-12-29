#!/usr/bin/env python3

import requests
import json
from decimal import Decimal
import redis as redis_engine


pairs_text = """BTC/BCH
BTC/DASH
BTC/ETH
BTC/ETC
BTC/LTC
BTC/ZEC
BTC/XRP
BTC/XMR
BTC/DOGE
BTC/WAVES
BTC/KICK
BTC/USDT
ETH/BCH
ETH/LTC
ETH/KICK
ETH/USDT"""

currency_names = {
    'BTC': 'Bitcoin',
    'DASH': 'Dash',
    'ETH': 'Ethereum',
    'ETC': 'Ethereum Classic',
    'LTC': 'Litecoint',
    'ZEC': 'ZCash',
    'XRP': 'Ripple',
    'XMR': 'Monero',
    'DOGE': 'Dogecoin',
    'WAVES': 'Waves',
    'KICK': 'KickCoin',
    'USDT': 'Tether',
    'BCH': 'Bitcoin Cash',
}

cookies = {
    'lang': 'ru',
}

headers = {
    'Pragma': 'no-cache',
    'Origin': 'https://exmo.me',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.8,ru;q=0.6,de;q=0.4',
    'X-Compress': 'null',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/537.36',
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept': 'application/json, text/plain, */*',
    'Cache-Control': 'no-cache',
    'Referer': 'https://exmo.me/ru/exchange',
}


def get_course(give, receive):
    data = json.dumps({'amount': 0,
     'balance': 0,
     'balance2': 0,
     'csrf_token': '',
     'currencyGive': give,
     'currencyReceive': receive,
     'quantity': 0})

    response = requests.post('https://exmo.me/ctrl/calculateOffer/approximately', headers=headers, cookies=cookies, data=data)
    will_get_for_one = json.loads(response.text)['data']['best']
    print(will_get_for_one)
    will_get_for_one = Decimal(will_get_for_one)
    return will_get_for_one


class Pair():
    def __init__(self, give, receive, amount=0):
        self.give = give
        self.receive = receive
        self.amount = amount

    def __repr__(self):
        return f'{self.give} => {self.amount} {self.receive}'

redis = redis_engine.StrictRedis(host="redis", port=6379, db=1, charset="utf-8", decode_responses=True)

pairs=[]
for p in pairs_text.split():
    give,receive = p.split('/')
    p1 = Pair(give, receive, get_course(give, receive))
    print(p1)
    pairs.append(p1)
    p2 = Pair(receive, give, get_course(receive, give))
    print(p2)
    pairs.append(p2)

for p in pairs:
    redis.set(f'{p.give}_{p.receive}', p.amount)
