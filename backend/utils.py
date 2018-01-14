import csv
from decimal import Decimal

from .models import Rate


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


def get_rates():
    """Get rates from the DB, add our fee and yield them as dictionaries."""
    current_rates = Rate.objects.last()
    rates_values = []
    for pair_name, amount in current_rates.data.items():
        give, receive = pair_name.split('_')
        amount = Decimal(amount) * Decimal("0.93")
        rates_values.append({
            'give': give,
            'receive': receive,
            'amount': format(amount, 'f')
        })

    return current_rates, rates_values
