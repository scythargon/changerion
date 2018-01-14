import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
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

Big.prototype.format = function() {
  return this.toFixed(30).toString().replace(/.?0+$/, '');
};

const getCookie = function(name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop().split(';').shift();
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
    } else if (newPair.give !== oldPair.give && this.state.receiveAmount) {
      const giveAmount = (new Big(this.state.receiveAmount)).div(this.getCourse(newPair)).format();
      this.props.form.setFieldsValue({ giveAmount });
      this.setState({ giveAmount });
    } else if (newPair.receive !== oldPair.receive && this.state.giveAmount) {
      const receiveAmount = (new Big(this.state.giveAmount)).times(this.getCourse(newPair)).format();
      this.props.form.setFieldsValue({ receiveAmount});
      this.setState({ receiveAmount });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.ratesId = window.ratesId;
        values.give = this.props.pair.give;
        values.receive = this.props.pair.receive;
        console.log('Received values of form: ', values);
        fetch('/order/', {
          method: 'POST',
          mode: 'same-origin',
          credentials: 'include',
          body: JSON.stringify(values),
          headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
          .then(response => response.json())
          .then((data) => {
            console.log(data);
          });
      }
    });
  };

  getReceiveValue(value) {
    return (new Big(value)).times(this.getCourse()).format();
  }

  getGiveValue(value) {
    return (new Big(value)).div(this.getCourse()).format();
  }

  onGiveChange = (e) => {
    const { value } = e.target;
    const reg = /^(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value) && parseFloat(value) >= this.getMinDeposit()) || value === '') {
      if (value === this.state.giveAmount) {
        return;
      }

      const receiveAmount = value === '' ? '' : this.getReceiveValue(value);
      this.setState({ giveAmount: value, receiveAmount });
      this.props.form.setFieldsValue({ giveAmount: value, receiveAmount});
    } else {
      this.setState({ giveAmount: '', receiveAmount: '' });
      this.props.form.setFieldsValue({ giveAmount: '', receiveAmount: '' });
    }
  };

  onReceiveChange = (e) => {
    const { value } = e.target;
    const reg = /^(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    let ok = false;
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      if (value === this.state.receiveAmount) {
        return;
      }
      const giveAmount = value === '' ? '' : this.getGiveValue(value);
      if (giveAmount >= this.getMinDeposit()) {
        ok = true;
        this.setState({ giveAmount, receiveAmount: value });
        this.props.form.setFieldsValue({ giveAmount, receiveAmount: value });
      }
    }
    if (!ok) {
      this.setState({ giveAmount: '', receiveAmount: '' });
      this.props.form.setFieldsValue({ giveAmount: '', receiveAmount: '' });
    }
  };

  getCourse(pair = this.props.pair) {
    return new Big(window.courses[`${pair.give}_${pair.receive}`]);
  }

  getMinDeposit() {
    return window.currencies_data[this.props.pair.give].minimal_deposit_amount;
  }

  render() {
    const { pair } = this.props;
    const { getFieldDecorator } = this.props.form;
    const minDeposit = this.getMinDeposit();
    const course = this.getCourse().format();
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
              onBlur={this.onGiveChange}
              prefix={getIcon(pair.give, inputIconStyle)}
              placeholder={`min: ${minDeposit} ${pair.give}`}
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
              onBlur={this.onReceiveChange}
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
