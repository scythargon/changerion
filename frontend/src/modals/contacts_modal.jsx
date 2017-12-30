import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';


export default class ContactsModal extends Component {
  static propTypes = {
    visible: PropTypes.boolean.isRequired,
    updateParent: PropTypes.function.isRequired,
  };

  close = () => {
    this.props.updateParent({ contactsModalVisible: false });
  };

  render() {
    return (
      <Modal
        title="Центр поддержки пользователей"
        visible={this.props.visible}
        onOk={this.close}
        onCancel={this.close}
        footer={[
          <Button key="submit" type="primary" onClick={this.close}>
            OK
          </Button>,
        ]}
      >
        <p>КОНТАКТЫ</p>
        <p>КОНТАКТЫ</p>
        <p>КОНТАКТЫ</p>
      </Modal>
    );
  }
}
