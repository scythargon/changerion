import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';


export default class RulesModal extends Component {
  static propTypes = {
    visible: PropTypes.boolean.isRequired,
    updateParent: PropTypes.function.isRequired,
  };

  close = () => {
    this.props.updateParent({ rulesModalVisible: false });
  };

  render() {
    return (
      <Modal
        title="Пользовательское соглашение"
        visible={this.props.visible}
        onOk={this.close}
        onCancel={this.close}
        footer={[
          <Button key="submit" type="primary" onClick={this.close}>
            OK
          </Button>,
        ]}
      >
        <p>ПРАВИЛА</p>
        <p>ПРАВИЛА</p>
        <p>ПРАВИЛА</p>
      </Modal>
    );
  }
}
