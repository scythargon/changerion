import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';


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
        <p>РЕЗЕРВЫ</p>
        <p>РЕЗЕРВЫ</p>
        <p>РЕЗЕРВЫ</p>
      </Modal>
    );
  }
}
