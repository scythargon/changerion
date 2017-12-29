import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';
import { getIcon } from './utils';
import styles from './styles.less';

const FormItem = Form.Item;

const inputIconStyle = {
  fillOpacity: 0.5,
  height: '20px',
  position: 'absolute',
  top: '-10px',
  left: '-7px',
};

class ExchangeForm extends React.Component {

  state = {
    giveAmount: '',
    receiveAmount: ''
  };

  static propTypes = {
    pair: PropTypes.object.isRequired,
    updateParent: PropTypes.function.isRequired,
    form: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const newPair = nextProps.pair;
    const oldPair = this.props.pair;

    if (newPair.give !== oldPair.give &&
      newPair.receive !== oldPair.receive) {
      this.props.form.setFieldsValue({ giveAmount: '', receiveAmount: '' });
      this.setState({ giveAmount: '', receiveAmount: '' });
    } else if (newPair.give !== oldPair.give) {
      const giveAmount = this.state.receiveAmount / this.getCourse(newPair);
      this.props.form.setFieldsValue({ giveAmount });
      this.setState({ giveAmount });
    } else if (newPair.receive !== oldPair.receive) {
      const receiveAmount = this.state.giveAmount * this.getCourse(newPair);
      this.props.form.setFieldsValue({ receiveAmount});
      this.setState({ receiveAmount });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  onGiveChange = (e) => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      const receiveAmount = value * this.getCourse();
      this.setState({ giveAmount: value, receiveAmount });
      this.props.form.setFieldsValue({ giveAmount: value, receiveAmount: receiveAmount });
    }
  };

  onReceiveChange = (e) => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      const giveAmount = value / this.getCourse();
      this.setState({ giveAmount: giveAmount, receiveAmount: value });
      this.props.form.setFieldsValue({ giveAmount: giveAmount, receiveAmount: value });
    }
  };

  getCourse(pair = this.props.pair) {
    return window.courses[`${pair.give}_${pair.receive}`];
  }

  render() {
    const { pair } = this.props;
    const { getFieldDecorator } = this.props.form;
    const giveCurrencyInfo = window.currencies_data[pair.give];
    const course = this.getCourse();
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem key="giveAmount">
          <span className={styles.courseHeader}>1 { pair.give } ≈ { course } { pair.receive }</span>

          Отдаете сумму
          {getFieldDecorator('giveAmount', {
            rules: [{ required: true, message: 'Обязательное поле' }],
          })(
            <Input
              key="input"
              onChange={this.onGiveChange}
              prefix={getIcon(pair.give, inputIconStyle)}
              placeholder={giveCurrencyInfo.minimal_deposit_amount}
            />
          )}
        </FormItem>
        <FormItem key="receiveAmount">
          Получаете сумму
          {getFieldDecorator('receiveAmount', {
            rules: [{ required: true, message: 'Обязательное поле' }],
          })(
            <Input
              key="input"
              onChange={this.onReceiveChange}
              prefix={getIcon(pair.receive, inputIconStyle)}
              placeholder="0"
            />
          )}
        </FormItem>
        <FormItem key="email">
          Ваш E-mail адрес
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Обязательное поле' }],
          })(
            <Input
              key="input"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Например: name@mail.ru"
            />
          )}
        </FormItem>
        <FormItem key="wallet">
          Кошелек для получения
          {getFieldDecorator('wallet', {
            rules: [{ required: true, message: 'Обязательное поле' }],
          })(
            <Input
              key="input"
              prefix={<Icon type="wallet" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Например: 42jytrdfvhyt456yh2343rgry6h56h4h46y"
            />
          )}
        </FormItem>
        <FormItem style={{ textAlign: 'center' }} key="submit">
          <span style={{ fontSize: '12px', wordBreak: 'break-word', lineHeight: 1.6, display: 'block', padding: '8px' }}>
            Нажимая кнопку «Обменять», я соглашаюсь с <a onClick={e => { e.preventDefault(); this.props.updateParent({ rulesModalVisible: true }); }}>правилами обмена</a>
          </span>
          <Button type="primary" htmlType="submit" className="login-form-button" size="large">
            <b>ОБМЕНЯТЬ</b>
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export const WrappedExchangeForm = Form.create()(ExchangeForm);
