import React, { Component } from 'react';
import { Table, Row, Col, Radio } from 'antd';
import { WrappedNormalLoginForm } from './form.jsx';
import 'antd/dist/antd.less';

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
          give: <Radio value={give}>{give}</Radio>
        };
      });

    const columnsReceiveData = pairs.filter(pair => pair.give === this.state.selectedGive)
      .map((pair, index) => {
        if (!selectedReceive) {
          selectedReceive = pair.receive;
        }
        return {
          key: index,
          receive: <Radio value={pair.receive}>{pair.receive}</Radio>
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
