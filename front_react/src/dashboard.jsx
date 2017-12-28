import React, { Component } from 'react';
import { Table, Row, Col, Radio } from 'antd';
import { WrappedNormalLoginForm } from './form.jsx';

import LogoETH from '../assets/img/icons/ETH.svg';
import LogoBTC from '../assets/img/icons/BTC.svg';
import LogoBCH from '../assets/img/icons/BCH.svg';
import LogoDASH from '../assets/img/icons/DASH.svg';
import LogoETC from '../assets/img/icons/ETC.svg';
import LogoLTC from '../assets/img/icons/LTC.svg';
import LogoZEC from '../assets/img/icons/ZEC.svg';
import LogoXRP from '../assets/img/icons/XRP.svg';
import LogoXMR from '../assets/img/icons/XMR.svg';
import LogoDOGE from '../assets/img/icons/DOGE.svg';
import LogoWAVES from '../assets/img/icons/WAVES.svg';
import LogoKICK from '../assets/img/icons/KICK.svg';
import LogoUSDT from '../assets/img/icons/USDT.svg';

import 'antd/dist/antd.less';
import styles from './styles.less'; // Failed to make it work with .scss

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
  title: 'Самые низкие цены!',
  dataIndex: 'form',
}];

function getIcon(currencyName) {
  let LogoComponent = null;
  switch (currencyName) {
    case 'ETH':
      LogoComponent = LogoETH;
      break;

    case 'BTC':
      LogoComponent = LogoBTC;
      break;

    case 'DASH':
      LogoComponent = LogoDASH;
      break;

    case 'ETC':
      LogoComponent = LogoETC;
      break;

    case 'LTC':
      LogoComponent = LogoLTC;
      break;

    case 'ZEC':
      LogoComponent = LogoZEC;
      break;

    case 'XRP':
      LogoComponent = LogoXRP;
      break;

    case 'XMR':
      LogoComponent = LogoXMR;
      break;

    case 'DOGE':
      LogoComponent = LogoDOGE;
      break;

    case 'WAVES':
      LogoComponent = LogoWAVES;
      break;

    case 'KICK':
      LogoComponent = LogoKICK;
      break;

    case 'USDT':
      LogoComponent = LogoUSDT;
      break;

    case 'BCH':
      LogoComponent = LogoBCH;
      break;

    default:
      return '';
  }
  return <LogoComponent className={styles.svgLogo} />;
}

export default class Dashboard extends Component {

  state = {
    selectedGive: 'BTC',
    selectedReceive: '',
    columnsGiveData: [],
    columnsReceiveData: [],
    columnsFormData: []
  };

  componentDidMount() {
    this.calcColumns();
  }

  calcColumns() {
    let { selectedGive, selectedReceive } = this.state;
    const columnsGiveData = pairs.map(pair => pair.give)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((give, index) => {
        return {
          key: index,
          give: <Radio value={give}>{getIcon(give)}{give}</Radio>
        };
      });

    const columnsReceiveData = pairs.filter(pair => pair.give === this.state.selectedGive)
      .map((pair, index) => {
        if (!selectedReceive) {
          selectedReceive = pair.receive;
        }
        return {
          key: index,
          receive: <Radio value={pair.receive}>{getIcon(pair.receive)}{pair.receive}</Radio>
        };
      });
    const columnsFormData = this.getColumnsFormData(selectedGive, selectedReceive);
    this.setState({
      columnsGiveData,
      columnsReceiveData,
      columnsFormData,
      selectedReceive
    });
  }

  update(args) {
    this.setState(args, _ => { this.calcColumns(); });
  }

  getColumnsFormData(selectedGive, selectedReceive) {
    let result = '';

    if (!selectedGive || !selectedReceive) {
      result = 'Пожалуйста, выберите направление обмена';
    } else {
      result = <WrappedNormalLoginForm/>;
    }

    return [{
      key: 1,
      form: result,
    }];
  }

  render() {
    const { columnsGiveData, columnsReceiveData, columnsFormData } = this.state;
    return (
      <div>
        {/*{ pairs.map(pair => <div>{pair.give} to {pair.receive}</div>) }*/}

        <Row>
          <Col span={8}>
            <RadioGroup
              name="give"
              defaultValue={this.state.selectedGive}
              onChange={(event) => { this.update({ selectedGive: event.target.value, selectedReceive: '' }); }}
            >
              <Table
                className={'radio-table'}
                columns={columnsGive}
                dataSource={columnsGiveData}
                pagination={false}
                bordered
              />
            </RadioGroup>
          </Col>
          <Col span={8}>
            <Table
              columns={columnsForm}
              dataSource={columnsFormData}
              pagination={false}
              bordered
            />
          </Col>
          <Col span={8}>
            <RadioGroup
              name="receive"
              value={this.state.selectedReceive}
              onChange={(event) => { this.update({ selectedReceive: event.target.value }); }}
            >
              <Table
                className={'radio-table'}
                columns={columnsReceive}
                dataSource={columnsReceiveData}
                pagination={false}
                bordered
              />
            </RadioGroup>
          </Col>
        </Row>
      </div>
    );
  }
}
