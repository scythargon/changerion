import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';


export default class ReviewsModal extends Component {
  static propTypes = {
    visible: PropTypes.boolean.isRequired,
    updateParent: PropTypes.function.isRequired,
  };

  close = () => {
    this.props.updateParent({ reviewsModalVisible: false });
  };

  render() {
    return (
      <Modal
        title="Отзывы наших пользователей"
        visible={this.props.visible}
        onOk={this.close}
        onCancel={this.close}
        footer={[
          <Button key="submit" type="primary" onClick={this.close}>
            OK
          </Button>,
        ]}
      >
        <p>ОТЗЫВЫ</p>
        <p>ОТЗЫВЫ</p>
        <p>ОТЗЫВЫ</p>
      </Modal>
    );
  }
}
