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
        width={620}
        visible={this.props.visible}
        onOk={this.close}
        onCancel={this.close}
        footer={[
          <Button key="submit" type="primary" onClick={this.close}>
            OK
          </Button>,
        ]}
      >
        <p>Уважаемые клиенты, мы с радостью проконсультируем Вас по любым вопросам.</p>

        <p>Для этого вам стоит выбрать любой удобный способ связи:</p>

        <p>Вы можете написать нам на <a href="mailto:changerion.exchange@gmail.com">электронную почту</a></p>

      </Modal>
    );
  }
}
