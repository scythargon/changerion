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

  static propTypes = {
    pair: PropTypes.object.isRequired
  };


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { pair } = this.props;
    const giveCurrencyInfo = window.currencies_data[pair.give];
    const course = window.courses[`${pair.give}_${pair.receive}`];
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem key="give_amount">
          <span className={styles.courseHeader}>1 { pair.give } ≈ { course } { pair.receive }</span>

          Отдаете сумму
          {getFieldDecorator('give_amount', {
            rules: [{ required: true, message: 'Обязательное поле' }],
          })(
            <Input key="input" prefix={getIcon(pair.give, inputIconStyle)} placeholder={giveCurrencyInfo.minimal_deposit_amount} />
          )}
        </FormItem>
        <FormItem key="receive_amount">
          Получаете сумму
          {getFieldDecorator('receive_amount', {
            rules: [{ required: true, message: 'Обязательное поле' }],
          })(
            <Input key="input" prefix={getIcon(pair.receive, inputIconStyle)} placeholder="0" />
          )}
        </FormItem>
        <FormItem key="email">
          Ваш E-mail адрес
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Обязательное поле' }],
          })(
            <Input key="input" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Например: name@mail.ru" />
          )}
        </FormItem>
        <FormItem key="wallet">
          Кошелек для получения
          {getFieldDecorator('wallet', {
            rules: [{ required: true, message: 'Обязательное поле' }],
          })(
            <Input key="input" prefix={<Icon type="wallet" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Например: 42jytrdfvhyt456yh2343rgry6h56h4h46y" />
          )}
        </FormItem>
        <FormItem style={{ textAlign: 'center' }} key="submit">
          <span style={{ fontSize: '12px', wordBreak: 'break-word', lineHeight: 1.6, display: 'block', padding: '8px' }}>
            Нажимая кнопку «Обменять», я соглашаюсь с <a href="">правилами обмена</a>
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
