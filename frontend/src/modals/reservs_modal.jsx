import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

import { getIcon } from '../utils';

import styles from './styles.less';


const reservesIconStyle = {
  height: '20px',
  float: 'left',
  marginLeft: '20px'
};

export default class ReservsModal extends Component {
  static propTypes = {
    visible: PropTypes.boolean.isRequired,
    updateParent: PropTypes.function.isRequired,
  };

  close = () => {
    this.props.updateParent({ reservsModalVisible: false });
  };

  render() {
    return (
      <Modal
        width={600}
        title="Резервы нашего обменника"
        visible={this.props.visible}
        onOk={this.close}
        onCancel={this.close}
        footer={[
          <Button key="submit" type="primary" onClick={this.close}>
            OK
          </Button>,
        ]}
      >
        <p>Мы поддерживаем суммарный баланс наших кошельков на уровне не менее <b>50BTC</b>, а баланс каждого кошелька - не менее эквивалента <b>5BTC</b>.</p>
        <p>Если на момент вашего перевода в нашем кошельке с нужной валютой не окажется необходимой суммы, мы оперативно пополним его и отправим вам!</p>
        <table className={styles.table}>
          <tbody>
            <tr><td>{getIcon('BTC', reservesIconStyle)} BTC</td><td className={styles.centered}>16</td></tr>
            <tr><td>{getIcon('ETH', reservesIconStyle)} ETH</td><td className={styles.centered}>48</td></tr>
            <tr><td>{getIcon('XRP', reservesIconStyle)} XRP</td><td className={styles.centered}>41648</td></tr>
            <tr><td>{getIcon('ETC', reservesIconStyle)} ETC</td><td className={styles.centered}>1774</td></tr>
            <tr><td>{getIcon('BCH', reservesIconStyle)} BCH</td><td className={styles.centered}>32</td></tr>
            <tr><td>{getIcon('LTC', reservesIconStyle)} LTC</td><td className={styles.centered}>287</td></tr>
            <tr><td>{getIcon('XMR', reservesIconStyle)} XMR</td><td className={styles.centered}>156</td></tr>

            <tr><td>{getIcon('DOGE', reservesIconStyle)} DOGE</td><td className={styles.centered}>7045454</td></tr>
            <tr><td>{getIcon('DASH', reservesIconStyle)} DASH</td><td className={styles.centered}>65</td></tr>
            <tr><td>{getIcon('WAVES', reservesIconStyle)} WAVES</td><td className={styles.centered}>5739</td></tr>
            <tr><td>{getIcon('ZEC', reservesIconStyle)} ZEC</td><td className={styles.centered}>113</td></tr>
            <tr><td>{getIcon('USDT', reservesIconStyle)} USDT</td><td className={styles.centered}>47313</td></tr>

            <tr><td>{getIcon('KICK', reservesIconStyle)} KICK</td><td className={styles.centered}>646731</td></tr>
          </tbody>
        </table>
      </Modal>
    );
  }
}
