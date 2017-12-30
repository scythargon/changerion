import React, { Component } from 'react';
import { Table, Row, Col, Radio, Button } from 'antd';
import { WrappedExchangeForm } from './form.jsx';
import { getIcon } from './utils';
import { RulesModal, ReservsModal, ContactsModal, ReviewsModal } from './modals';

import 'antd/dist/antd.less';

import styles from './styles.less';

const RadioGroup = Radio.Group;

const pairsData = [
  ['BTC', 'BCH'],
  ['BTC', 'DASH'],
  ['BTC', 'ETH'],
  ['BTC', 'ETC'],
  ['BTC', 'LTC'],
  ['BTC', 'ZEC'],
  ['BTC', 'XRP'],
  ['BTC', 'XMR'],
  ['BTC', 'DOGE'],
  ['BTC', 'WAVES'],
  ['BTC', 'KICK'],
  ['BTC', 'USDT'],
  ['ETH', 'BCH'],
  ['ETH', 'LTC'],
  ['ETH', 'KICK'],
  ['ETH', 'USDT'],
  ['BCH', 'BTC'],
  ['DASH', 'BTC'],
  ['ETH', 'BTC'],
  ['ETC', 'BTC'],
  ['LTC', 'BTC'],
  ['ZEC', 'BTC'],
  ['XRP', 'BTC'],
  ['XMR', 'BTC'],
  ['DOGE', 'BTC'],
  ['WAVES', 'BTC'],
  ['KICK', 'BTC'],
  ['USDT', 'BTC'],
  ['BCH', 'ETH'],
  ['LTC', 'ETH'],
  ['KICK', 'ETH'],
  ['USDT', 'ETH'],
];

const currencyNames = {
  BTC: 'Bitcoin',
  DASH: 'Dash',
  ETH: 'Ethereum',
  ETC: 'Ethereum Classic',
  LTC: 'Litecoint',
  ZEC: 'ZCash',
  XRP: 'Ripple',
  XMR: 'Monero',
  DOGE: 'Dogecoin',
  WAVES: 'Waves',
  KICK: 'KickCoin',
  USDT: 'Tether',
  BCH: 'Bitcoin Cash',
};


class Pair {
  constructor(give, receive) {
    this.give = give;
    this.receive = receive;
  }
}


const pairs = pairsData.map(pair => new Pair(pair[0], pair[1]));

const columnsGive = [{
  title: 'Вы отдаете',
  dataIndex: 'give',
}];

const columnsReceive = [{
  title: 'Вы получаете',
  dataIndex: 'receive',
}];

const columnsForm = [{
  title: 'Самые выгодные цены!',
  dataIndex: 'form',
}];

function findPair(give, receive) {
  return pairs.find(pair => pair.give === give && pair.receive === receive);
}

export default class Dashboard extends Component {

  state = {
    selectedGive: 'BTC',
    selectedReceive: '',
    selectedPair: null,
    columnsGiveData: [],
    columnsReceiveData: [],
    columnsFormData: [],
    rulesModalVisible: false,
    reservsModalVisible: false,
    contactsModalVisible: false,
    reviewsModalVisible: false,
  };

  componentDidMount() {
    this.calcColumns();
  }

  calcColumns() {
    const { selectedGive } = this.state;
    let { selectedReceive, selectedPair } = this.state;

    const columnsGiveData = pairs.map(pair => pair.give)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((give, index) => {
        return {
          key: index,
          give: <Radio value={give}>{getIcon(give)}{currencyNames[give]} <span className={styles.minorSpan}>({give})</span></Radio>
        };
      });

    const columnsReceiveData = pairs.filter(pair => pair.give === this.state.selectedGive)
      .map((pair, index) => {
        if (!selectedReceive) {
          selectedReceive = pair.receive;
        }
        return {
          key: index,
          receive: <Radio value={pair.receive}>{getIcon(pair.receive)}{currencyNames[pair.receive]} <span className={styles.minorSpan}>({pair.receive})</span></Radio>
        };
      });

    selectedPair = findPair(selectedGive, selectedReceive);
    const columnsFormData = this.getColumnsFormData(selectedPair);

    this.setState({
      columnsGiveData,
      columnsReceiveData,
      columnsFormData,
      selectedReceive,
      selectedPair,
    });
  }

  update = (args) => {
    this.setState(args, () => { this.calcColumns(); });
  };

  getColumnsFormData(selectedPair) {
    return [{
      key: 1,
      form: <WrappedExchangeForm pair={selectedPair} updateParent={this.update} />,
    }];
  }

  render() {
    const {
      columnsGiveData,
      columnsReceiveData,
      columnsFormData,
      rulesModalVisible,
      reservsModalVisible,
      contactsModalVisible,
      reviewsModalVisible
    } = this.state;
    return (
      <div>
        <Row>
          <Col span={8}>
            <RadioGroup
              name="give"
              defaultValue={this.state.selectedGive}
              onChange={(event) => { this.update({ selectedGive: event.target.value, selectedReceive: '' }); }}
            >
              <Table
                className="radio-table"
                columns={columnsGive}
                dataSource={columnsGiveData}
                pagination={false}
                bordered
              />
            </RadioGroup>
          </Col>
          <Col span={8}>
            <Table
              className="form-table"
              columns={columnsForm}
              dataSource={columnsFormData}
              pagination={false}
            />
          </Col>
          <Col span={8}>
            <RadioGroup
              name="receive"
              value={this.state.selectedReceive}
              onChange={(event) => { this.update({ selectedReceive: event.target.value }); }}
            >
              <Table
                className="radio-table"
                columns={columnsReceive}
                dataSource={columnsReceiveData}
                pagination={false}
                bordered
              />
            </RadioGroup>
          </Col>
        </Row>
        <div className={styles.footer}>
          <a onClick={(e) => { e.preventDefault(); this.update({ reviewsModalVisible: true }); }}>Отзывы</a>
          <a onClick={(e) => { e.preventDefault(); this.update({ rulesModalVisible: true }); }}>Правила</a>
          <a onClick={(e) => { e.preventDefault(); this.update({ reservsModalVisible: true }); }}>Резервы</a>
          <a onClick={(e) => { e.preventDefault(); this.update({ contactsModalVisible: true }); }}>Контакты</a>
        </div>
        <ReviewsModal visible={reviewsModalVisible} updateParent={this.update} />
        <RulesModal visible={rulesModalVisible} updateParent={this.update} />
        <ReservsModal visible={reservsModalVisible} updateParent={this.update} />
        <ContactsModal visible={contactsModalVisible} updateParent={this.update} />
      </div>
    );
  }
}
