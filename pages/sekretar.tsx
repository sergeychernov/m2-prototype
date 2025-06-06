export default function Sekretar() {
  return (
    <div>
      <h1>Секретарь</h1>
      <p>
        Наш бот помогает вам быстро запустить автоматизацию общения с клиентами.
        Вы больше не потеряете клиентов! У вас появится дополнительное время,
        которое вы сможете потратить на себя или на другие рабочие задачи!
        Выберите подходящий тариф и начните прямо сейчас!
      </p>
      <div className="tariff-cards">
        <div className="tariff-card inactive">
          <h2>Старт</h2>
          <p className="price">999₽ в месяц</p>
          <ul>
            <li>Telegram</li>
            <li>Базовые типовые сценарии</li>
            <li>Интеграция с CRM</li>
            <li>Базовая аналитика</li>
          </ul>
        </div>
        <div className="tariff-card inactive">
          <h2>Про</h2>
          <p className="price">1999₽ в месяц</p>
          <ul>
            <li>Включает все предыдущие пункты</li>
            <li>WhatsApp</li>
            <li>AI ответы</li>
            <li>Перехват диалога</li>
          </ul>
        </div>
        <div className="tariff-card">
          <h2>Макси</h2>
          <p className="price">2999₽ в месяц</p>
          <p className="note">Первый месяц бесплатно</p>
          <ul>
            <li>Включает все предыдущие пункты</li>
            <li>VK</li>
            <li>Запись на показы</li>
            <li>Расширенная аналитика</li>
            <li>Сайт-визитка</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
