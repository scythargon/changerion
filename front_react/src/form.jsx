import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class ExchangeForm extends React.Component {
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
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem key="give_amount">
          Отдаете сумму
          {getFieldDecorator('give_amount', {
            rules: [{ required: true, message: 'Обязательное поле' }],
          })(
            <Input key="input" prefix={<Icon type="pay-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="min: 100 BTC" />
          )}
        </FormItem>
        <FormItem key="receive_amount">
          Получаете сумму
          {getFieldDecorator('receive_amount', {
            rules: [{ required: true, message: 'Обязательное поле' }],
          })(
            <Input key="input" prefix={<Icon type="pay-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="0" />
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
