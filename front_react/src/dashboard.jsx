import React, { Component } from 'react';

import { Table, Row, Col } from 'antd';
import 'antd/dist/antd.less';


const pairsData = [
  ['BTC', 'ETH'],
  ['BTC', 'KICK']
];


class Pair {
  constructor(give, receive) {
    this.give = give;
    this.receive = receive;
  }
}


const pairs = pairsData.map(pair => new Pair(pair[0], pair[1]));

const columnsGive = [{
  title: 'Give',
  dataIndex: 'give',
  // render: text => <a href="#">{text}</a>,
}];

const columnsReceive = [{
  title: 'Receive',
  dataIndex: 'give',
  // render: text => <a href="#">{text}</a>,
}];

const data = [{
  key: '1',
  give: 'BTC',
}, {
  key: '2',
  give: 'ETH',
}];

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        { pairs.map(pair => <div>{pair.give} to {pair.receive}</div>) }

        <Row>
          <Col span={12}>
            <Table
              columns={columnsGive}
              dataSource={data}
              pagination={false}
              bordered
            />
          </Col>
          <Col span={12}>
            <Table
              columns={columnsReceive}
              dataSource={data}
              pagination={false}
              bordered
            />
          </Col>
        </Row>
      </div>
    );
  }
}
