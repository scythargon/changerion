import React, { Component } from 'react';
import { Table, Row, Col, Radio, Button } from 'antd';
import Countdown from 'react-countdown-now';
import { WrappedExchangeForm } from './form.jsx';
import { getIcon, getCookie } from './utils';
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

const countdownRenderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return null;
  } else {
    // Render a countdown
    return <span>Заявка автоматически удалится через <b>{minutes} мин. {seconds} сек.</b></span>;
  }
};

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
    order: null,
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

    const order = this.state.order || (window.order && window.order.status !== 'timeout' && window.order);

    this.setState({
      order,
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

  cancelOrder = () => {
    fetch('/order/', {
      method: 'DELETE',
      mode: 'same-origin',
      credentials: 'include',
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
      }
    })
      .then((response) => {
        console.log(response);
        this.setState({ order: null });
      });
  };

  confirmOrder = () => {
    fetch('/order/', {
      method: 'PUT',
      mode: 'same-origin',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
      }
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ order: data });
      });
  };

  render() {
    const {
      columnsGiveData,
      columnsReceiveData,
      columnsFormData,
      rulesModalVisible,
      reservsModalVisible,
      contactsModalVisible,
      reviewsModalVisible,
      order,
    } = this.state;
    // const order = {
    //   clientWallet: 'dfg',
    //   give: 'BTC',
    //   giveAmount: '1',
    //   number: 151595795265,
    //   ourWallet: '14PYfJnauYY2ugczKU2snKZg3rZV6WjAZz',
    //   receive: 'BCH',
    //   receiveAmount: '5.739763202',
    //   secondsLeft: 600,
    //   status: 'new',
    // };
    return (
      <div>
        { order ? order.status === 'paid' ?
          <div style={{textAlign: 'center'}}>
            <h2>ВЫ УСПЕШНО СОЗДАЛИ ЗАЯВКУ!</h2>
            <h3>Ваша заявка № {order.number}</h3>

            <p>Статус: <b>Заявка в обработке</b></p>

            <p>{window.currencies_data[order.give].comment}</p>

            <p>
              Если у вас возникли сложности или есть вопросы, напишите в нашу &nbsp;
              <a href="mailto:changerion.exchange@gmail.com">службу поддержки</a>
            </p>
            <p>С уважением, администрация сайта!</p>
          </div>
          :
          <div>
            <h2>ДЛЯ ЗАВЕРШЕНИЯ СОЗДАНИЯ ЗАЯВКИ № <u><b>{order.number}</b></u> ВАМ НЕОБХОДИМО:</h2>
            <p className={styles.block}>
              <span className={styles.step}>1</span>
              Войти в свой кошелек.
            </p>
            <p className={styles.block}>
              <span className={styles.step}>2</span>
              Отправить <code>{order.giveAmount}</code> <b>{order.give}</b>
              &nbsp; на кошелек <code>{order.ourWallet}</code>
              <br/>
              Вы получаете <code>{order.receiveAmount}</code> <b>{order.receive}</b> на Ваш кошелек <code>{order.clientWallet}</code>
            </p>
            <p className={`${styles.block} ${styles.last}`}>
              <span className={styles.step}>3</span>
              <b>Обязательно!</b>
              <br/>
              После оплаты обязательно нажать кнопку <b>Я оплатил</b>
            </p>
            <p style={{textAlign: 'center', marginBottom: '30px'}}>
              <Button type="primary" onClick={this.confirmOrder} style={{marginRight: '30px'}}>Я оплатил</Button>
              <Button type="danger" onClick={this.cancelOrder}>Отменить заявку</Button>
            </p>
            <p style={{textAlign: 'center'}}>
              <Countdown
                date={Date.now() + (order.secondsLeft * 1000)}
                renderer={countdownRenderer}
              />
            </p>
          </div>
          :
          <div>
            <Row>
              <Col span={8}>
                <RadioGroup
                  name="give"
                  defaultValue={this.state.selectedGive}
                  onChange={(event) => {
                    this.update({selectedGive: event.target.value, selectedReceive: ''});
                  }}
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
                  onChange={(event) => {
                    this.update({selectedReceive: event.target.value});
                  }}
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
          </div>
        }
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
