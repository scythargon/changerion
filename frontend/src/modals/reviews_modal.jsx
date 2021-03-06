import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

const reviews = {
  'Mt': 'Все очень быстро пришло. Отличная работа.',
  'артем': 'все хорошо можно юзать, биток на риппл',
  'lyubov': 'Супер! обмен оперативно за 3 минуты!!!',
  'егор': 'сервисом давно пользуюсь, отличный сервис всё устраивает',
  'Олег': 'Обмен ETH-BTC. Моментальный обмен. Молодцы. Так держать.',
  'Наталья': 'Спасибо. Быстрый перевод.Супер.',
  'Дарья': 'Спасибо за отличную, быструю работу! Минуты не прошло как деньги пришли в кошелек, что очень удивило))) благодарю!',
  'Ирина': 'Эфир на Биток очень быстро поменяли.Отлично! Спасибо!',
  'Сергей': 'Благодарю за очередной обмен битка на кик. Всё супер!',
  'Наталья': 'Очень грамотные специалисты.Помогли правильно сформировать заявку на перевод криптовалюты.Для новичка рекомендую всем очень очень.Спасибо.',
  'Сергей': 'Благодарю за очередной очень быстрый обмен битка на эфир! Вы лучшие!',
  'Денис': 'Все очень хорошо работает! Быстро переводит!',
  'Игорь': 'Супер обменник!!! Перевод моментальный, рекомендую.',
  'Владислав': 'Купил биткойн, прилител мега быстро для него. Минут 5-10. Супер обменник, спасибо!!!',
  'Кирилл': 'В очередной раз спасибо обменнику за оперативную работу! Доги в Риппл за 10 мин!!!',
  'паша': 'менял биткоин кеш на лайткоин пришли в течении 3 минут шустро работают молодцы',
  'Алекс': 'Все быстро и четко, отличный сервис. Благодарю. Процветания сервису',
  'Ольга': 'Первый раз пользуюсь обменником. Спасибо огромное! Перевод получила очень быстро. Рекомендую!!!!!!!',
  'Ирина': 'Огромное спасибо! Перевели все быстро! Мой любимый обменник!',
  'Михаил': 'Спасибо!!! 2эф получил мгновенно! Рекомендую Всем!!!!!!!!!!!!!',
  'Виктор': 'Не первый раз пользуюсь этим сервисом - нравится, всё стабильно, надежно и оперативно! Рекомендую этот сервис. Спасибо, так держать!',
  'Владимир': 'Спасибо. Воспользовался этим сервисом впервые, оперативно получил ответы на вопросы из службы поддержки, обмен произошёл быстро, рекомендую!',
  'Валентина': 'Пользовалась первый раз.Быстро и оперативно! Благодарю!',
  'Дмитрий': 'первый раз пополнял за 10 минут все удачно перевелось',
  'Леонид': 'Не первый раз пользуюсь услугами данного сервиса. Очень доволен. Курс лучший. Если возникают проблемы, служба поддержки отвечает быстро. Вообщем всем рекомендую. Оценка 7 из 5',
  'Василий': '!0 минут - и монеты у меня в кошельке! Менял эфир на эфир классик. Спасибо!',
  'Сергей': 'Не перестаю удивляться скорости обмена! Очередной обмен битка на зек прошел практически мгновенно! От души благодарю вас за отличную работу! Желаю вам успехов! А всем просто рекомендую данный сервис.',
};

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

        <h3>Последние оставленные отзывы: </h3>
        <p></p>

        {Object.entries(reviews).map(([key, value]) => {
          return (
            <p>
              <b>{key}:</b> {value}
            </p>
          );


        })}

      </Modal>
    );
  }
}
