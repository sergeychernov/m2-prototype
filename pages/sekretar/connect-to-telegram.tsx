import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'; // <--- Добавьте этот импорт

export default function ConnectToTelegram() {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter(); // <--- Инициализируйте useRouter

  const checkToken = () => {
    const t = token.trim();
    if (!t) {
      setStatus('⚠️ Пожалуйста, введите токен.');
      return;
    }
    if (t.startsWith('123')) {
      setStatus('✅ Токен действителен!');
    } else {
      setStatus('❌ Ошибка: неверный токен.');
    }
  };

  const connectBot = () => {
    const t = token.trim();
    if (!t) {
      setStatus('⚠️ Пожалуйста, введите токен.');
      return;
    }
    setStatus('🔗 Бот успешно подключён!');
    // Добавляем задержку перед переходом, чтобы пользователь успел увидеть статус
    setTimeout(() => {
      router.push('/telegram'); // <--- Переход на страницу /telegram
    }, 1000); // Задержка в 1 секунду (1000 миллисекунд)
  };

  return (
    <>
      <Head>
        <title>Подключение Telegram-бота</title>
      </Head>
      <div className="container">
        <h1>Подключение Telegram-бота</h1>
        <p>
          Создайте своего Telegram-бота в{' '}
          <a href="https://t.me/BotFather" target="_blank" rel="noreferrer">
            @BotFather
          </a>{' '}
          и получите токен. Вставьте токен ниже, чтобы подключить бота к нашему сервису.
        </p>
        <label htmlFor="token">Введите токен бота:</label>
        <input
          type="text"
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Введите токен, полученный от BotFather"
        />
        <button className="btn" onClick={checkToken}>
          Проверить токен
        </button>
        <button className="btn" onClick={connectBot}>
          Подключить бота
        </button>
        <div id="status" className="status">
          {status}
        </div>
        <p className="note">
          После подключения бот начнёт обрабатывать входящие запросы клиентов в Telegram. Вы всегда сможете изменить настройки позже.
        </p>
      </div>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #fff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          text-align: center;
          color: #333;
        }
        p {
          color: #555;
        }
        label {
          display: block;
          margin-top: 20px;
          font-weight: bold;
        }
        input[type='text'] {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border-radius: 4px;
          border: 1px solid #ccc;
          font-size: 16px;
        }
        .btn {
          display: inline-block;
          margin-top: 20px;
          padding: 12px 20px;
          font-size: 16px;
          color: #fff;
          background-color: #4caf50;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          text-align: center;
          margin-right: 10px;
        }
        .btn:hover {
          background-color: #45a049;
        }
        .note {
          margin-top: 20px;
          font-size: 14px;
          color: #777;
          text-align: center;
        }
        .status {
          margin-top: 15px;
          font-weight: bold;
          text-align: center;
        }
      `}</style>
    </>
  );
}
