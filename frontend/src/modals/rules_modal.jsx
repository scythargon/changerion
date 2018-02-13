import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import styles from './styles.less';


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
        <h2 className={styles.centered}>Соглашение на использование сервиса Changerion.com</h2>
        <h2 className={styles.centered}><br/>1. Общие положения</h2>
        <p>1.1. Соглашение устанавливает порядок оказания Обменником услуг в сфере обмена криптовалют.
          <br/>1.2. Под Обменником понимается интернет-ресурс под названием Changerion.com.
          <br/>1.3. Клиент – физическое лицо либо организация, совершающий обмен через Changerion.com.
          <br/>1.4. В дальнейшем, если Клиент и Обменник упоминаются совместно, то они именуются Сторонами.
          <br/>1.5. Стороны согласны, что данное Соглашение регулирует взаимоотношения между ними в вопросах, касающихся обмена криптовалют. Юридическая сила данного электронного Соглашения не уступает письменному документу.
          <br/>1.6. Данное Соглашение играет роль публичной оферты. Ее акцепт совершается через подачу Клиентом заявки на совершение обменной операции через Обменник Changerion.com.
          <br/>
          <br/>
        </p>
        <h2 className={styles.centered}>2. Предмет Соглашения</h2>
        <p>2.1. Обменник Changerion.com оказывает услуги, обозначенные в главе №4 Соглашения, а Клиент соблюдает стандарты, оговоренные в главе № 9 Соглашения. Порядок оказания услуг устанавливается внутренним Регламентом Обменника. Положения Регламента установлены в главе №5 Соглашения.
          <br/>2.2. Клиент должен оплатить услуги Обменника в соответствии с условиями, оговоренными Соглашением.
          <br/>
          <br/>
        </p>
        <h2 className={styles.centered}>3. Взаимные обязательства Сторон</h2>
        <p>
          <br/>3.1. Обменник Changerion.com обязан:
          <br/>
          <br/>3.1.1. Совершать обмен криптовалют Биткоин, Лайткон, Риппл, Эфир, Даш, Монеро и других, поддерживаемых обменником в данный момент.
          <br/>3.1.2. Обеспечивать Клиенту информационную, а также техническую поддержку в ходе выполнения транзакции, используя возможности онлайн-ресурса Changerion.com.
          <br/>3.1.3. Гарантировать защиту сведений касательно выполненных транзакций, в том числе, личные данные Клиента, время осуществления денежного перевода, их размер. Данные сведения доступны Клиенту, совершившему транзакции. Если операция выполнялась через анонимную систему платежей, то сведения о ней попадают в разряд конфиденциальных и не подлежат разглашению.
          <br/>3.1.4. Не допускать передачи информации о совершенных операциях третьим лицам. Под это правило не подпадают такие случаи:
          <br/>• Если суд, юрисдикция которого распространяется на место расположения Обменника, принял соответствующее решение, вступившее в законную силу;
          <br/>• При получении официального запроса от правоохранительных или налоговых структур, которые действуют в месте нахождения Обменника;
          <br/>• Если имеет место обращение от администрации систем платежей – партнеров Обменника.
          <br/>3.1.5. Проводить операции с учетом персональной скидки Клиента.
          <br/>3.1.6. Перечислять деньги Клиенту либо третьему лицу не позднее суток после предъявления претензии относительно нарушений, связанных с несоблюдением стандартов, оговоренных в пунктах 3.2.5, 5.4, 5.5 или 5.6 действующего Соглашения.
          <br/>
          <br/>3.2. Обязанности Клиента:
          <br/>
          <br/>3.2.1. Предоставлять корректные реквизиты и личную информацию для выполнения платежа.
          <br/>3.2.2. Обозначать актуальный адрес электронной почты в глобальной сети.
          <br/>3.2.3. Обеспечивать получение сообщений от Changerion.com. Решить проблему доступа к глобальной сети при помощи компьютерного оборудования или другого устройства. Обеспечивать безопасное соединение с Обменником при помощи надежных антивирусных программ.
          <br/>3.2.4. Выполнять положения Соглашения.
          <br/>3.2.5. Уведомлять представителей и технический персонал Changerion.com о возникновении ситуаций, когда денежный перевод не был выполнен в полном объеме либо частично также о случаях, оговоренных пунктах 5.4.—5.6. действующего Соглашения. Уведомление должно быть отправлено на протяжении месяца после совершения транзакции. В противном случае спорные платежи поступят в распоряжение Changerion.com.
          <br/>3.2.6. Выполнять требования нормативных актов, регулирующих порядок выполнения обмена.
          <br/>3.2.7. Воздерживаться от использования систем для неправомерного увеличения трафика.
          <br/>
          <br/>3.3. Обменник Changerion.com имеет право:
          <br/>
          <br/>3.3.1. Прекращать временно деятельность на время проведения модернизации или для удаления неисправностей, возникающих в работе обменного ресурса.
          <br/>3.3.2. Остановить процесс осуществления денежного перевода до выяснения обстоятельств, если подана жалоба относительно совершения мошенничества или имеется официальный запрос от компетентных органов.
          <br/>3.3.3. Формировать систему скидок.
          <br/>3.3.4. Определять размер комиссионных за совершение обмена в конкретном направлении.
          <br/>3.3.5. Отказать в обслуживании Клиенту без объяснения мотивации;
          <br/>3.3.6. Если транзакция не прошла в результате ошибки, то Обменник вправе запросить от Клиента дополнительные сведения (к примеру, скриншот электронного кошелька) через почту или телефон.
          <br/>3.3.7. Прекратить беседу с Клиентом, который некорректно себя ведет с сотрудниками Обменника, задает посторонние вопросы или отказывается предоставить необходимые сведения.
          <br/>3.3.8. Заблокировать денежный перевод при наступлении обстоятельств, обозначенных в пунктах 5.4.—5.6. Соглашения либо Регламента.
          <br/>3.3.9. При необходимости заблокировать операцию и заморозить средства на счете пользователя до идентификации личности и установления истинности данных, зафиксированных в системе Клиентом.
          <br/>
          <br/>3.4. В случае, если клиент каким либо образом получил незаконное обогащение на нашем и другом стороннем сервисе по обмену валют и он есть в общей базе обменников по подобным случаям, обменный сервис может задержать выполнение заявки до выяснение причин и возмещения убытков понесенных нашим либо другим обменным сервисом от этого пользователя.</p>
        <h2 className={styles.centered}>4. Перечень услуг</h2>
        <p>4.1. Онлайн-площадка Changerion.com выполняет обмен криптовалют Биткоин, Лайткон, Риппл, Эфир, Даш, Монеро. С полным перечнем криптовалют можно ознакомиться на информационном ресурсе онлайн-сервиса обмена Changerion.com.
          <br/>4.2. Обменник не проверяет законность происхождения средств, используемых для осуществления обменных операций.
          <br/>
          <br/>
        </p>
        <h2 className={styles.centered}>5. Регламент обменных операций</h2>
        <p>5.1. Сотрудники Changerion.com выполняют перевод только по факту получения от Клиента средств для совершения платежа.
          <br/>5.2. Обмен считается завершенным после перечисления средств на предоставленные Клиентом реквизиты.
          <br/>5.3. Клиент не вправе отменить начатый перевод и не может возвратить уже отправленные деньги.
          <br/>5.4. Если Клиент осуществил платеж, величина которого не совпадает с суммой, обозначенной в заявке, администрация Обменника вправе приостановить транзакцию. Операция будет возобновлена после обращения Клиента на основании пункта 3.2.5 Соглашения. При этом Обменник выполнит перевод фактически полученных средств по курсу, установленному на начало транзакции.
          <br/>5.5. При обозначении некорректных реквизитов Changerion.com прекращает транзакцию. Деньги возвращаются Клиенту после его обращения на основании пункта 3.2.5. При этом Обменник удерживает с указанной суммы комиссию и штраф — 2% от перевода.
          <br/>5.6. Если оплата счета прошла с постороннего аккаунта или были изменены примечания к платежу, Обменник блокирует транзакцию. Возврат средств провидится по факту обращения Клиента на основании пункта 3.2.5. с вычетом комиссии и штрафа в размере 1% от перевода.
          <br/>5.7. Если в обменнике проводится обмен на криптовалюту Биткоин, то прохождение транзакции пользователю в сети Биткоин завистит от загруженность самой сети Биткоин. Прохождение транзакции в сети Биткоин может занимать от 15 минут до нескольких суток. Changerion.com не несет ответственность за скорость прохождения транзакций в сети Биткоин и никаким образом не может влиять на них.
          <br/>5.8 Клиенту необходимо произвести оплату по заявке в течении 20 минут, во избежании пересчета заявки по нынешнему курсу или ее удаления.
        </p>
        <h2 className={styles.centered}>6. Гарантии и ответственность Сторон</h2>
        <p>6.1. <a title="Обменник криптовалют" href="/">Обменник Changerion.com</a> не отвечает за последствия некорректной эксплуатации ресурса и за ошибки, допущенные Клиентом при оформлении заявки. Операция не подлежит отмене, а деньги возврату, даже если Клиент обозначил неверные платежные реквизиты.
          <br/>6.2. Обменник не отвечает за ущерб от невозможности эксплуатации Клиентом оборудования в целом или его составляющих.
          <br/>6.3.Changerion.com не отвечает за задержку платежа из-за действия финансовых учреждений или электронных систем платежей.
          <br/>6.4. Обменник не отвечает за убытки либо неполучение дохода, если они возникли в результате ошибочных представлений Клиентом касательно тарифов либо прибыльности транзакций.
          <br/>6.5. Сервис Changerion.com не отвечает за финансовые потери, возникшие из-за задержек перевода.
          <br/>6.6. Клиент подтверждает, что у него есть законные основания для распоряжения деньгами, используемых для совершения транзакции.
          <br/>6.7. Клиент дает согласие на возмещение ущерба третьим лицам, если причиной его возникновение стала эксплуатация ресурса.
          <br/>
          <br/>
        </p>
        <h2 className={styles.centered}>7. Изменения условий Соглашения</h2>
        <p>7.1. Администрация Обменника вправе редактировать данное Соглашение в любое время. Изменения приобретают силу после их обнародования на официальном сайте Changerion.com.
          <br/>
          <br/>
        </p>
        <h2 className={styles.centered}>8. Форс-мажор</h2>
        <p>8.1. Стороны не несут ответственности за невыполнение или ненадлежащее выполнение условий Соглашения, если причиной этого стали обстоятельства непреодолимой силы. К ним причисляют войну, стихийные бедствия, пожар, бунт, решение властей, теракт, массовые непорядки. Кроме того, к ним относится сбой в работе энергосети, отсутствие доступа к глобальной сети или к другим системам.
          <br/>
          <br/>
        </p>
        <h2 className={styles.centered}>9. Условия выполнения обмена</h2>
        <p>9.1. Администрация запрещает использовать Обменник для мошеннических либо других незаконных операций. За попытку совершения обмена с использованием средств сомнительного происхождения, Клиент будет отвечать согласно законам той страны, в юрисдикции которой была совершена транзакция.
          <br/>9.2. Обменный ресурс Changerion.com может передавать сведения о платежах, незаконность которых установлена, правоохранительных структурам, администрации системы платежей, а также потерпевшему, по его требованию.
          <br/>9.3. Обмен выполняется только по факту вывода Клиентом средств с принадлежащего ему виртуального кошелька. При этом он несет личную ответственность за законность источников их поступления.
          <br/>9.4. Обменник не отвечает за переводы, совершенные для Клиента третьими лицами.
          <br/>9.5. Если Клиент нажал на кнопку «я согласен с правилами обмена», он безоговорочно принимает условия Соглашения.
        </p>

      </Modal>
    );
  }
}
