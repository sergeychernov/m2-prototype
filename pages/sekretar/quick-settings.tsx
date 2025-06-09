import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function QuickSettings() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    sellers: false,
    buyers: false
  });

  const toggleDependentCheckboxes = () => {
    const dependentCheckboxesContainer = document.getElementById('dependentCheckboxesContainer');
    if (dependentCheckboxesContainer) {
      dependentCheckboxesContainer.style.display = settings.buyers ? 'block' : 'none';
    }
  };

  useEffect(() => {
    toggleDependentCheckboxes();
  }, [settings.buyers]);

  const handleAddObject = () => {
    console.log('Кнопка "добавить новый объект" нажата');
    alert('Открывается форма добавления нового объекта...');
  };

  const handleImport = () => {
    console.log('Кнопка "Импортировать объекты из Avito/Cian" нажата');
    alert('Запускается импорт объектов...');
  };

  const saveSettings = () => {
    console.log('Сохранённые настройки:', settings);
    router.push('/profil'); // Changed from '/telegram' to '/profil'
  };

  return (
    <>
      <Head>
        <title>Быстрая настройка бота</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="container">
        <h1>Быстрая настройка бота</h1>
        <p>Выберите сценарии, которые нужны вашему боту. Вы всегда сможете изменить их позже.</p>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              id="sellers"
              checked={settings.sellers}
              onChange={(e) => setSettings(prev => ({ ...prev, sellers: e.target.checked }))}
            />
            Ищу продавцов (автоматический сбор лидов на продажу)
          </label>
          <label>
            <input
              type="checkbox"
              id="buyers"
              checked={settings.buyers}
              onChange={(e) => setSettings(prev => ({ ...prev, buyers: e.target.checked }))}
            />
            Ищу покупателей (автоматический приём запросов)
          </label>
          <div id="dependentCheckboxesContainer" style={{ marginLeft: '20px', display: 'none' }}>
            <button
              className="btn"
              style={{ marginTop: '10px', backgroundColor: '#007bff', color: 'white' }}
              onClick={handleAddObject}
            >
              добавить новый объект
            </button>
            <button
              className="btn"
              style={{ marginTop: '10px', backgroundColor: '#4CAF50' }}
              onClick={handleImport}
            >
              Импортировать объекты из Avito/Cian
            </button>
          </div>
        </div>

        <button className="btn" onClick={saveSettings}>Сохранить настройки</button>

        <p className="note">
          После сохранения настройки сразу вступят в силу, и бот начнёт помогать вам работать с клиентами.
        </p>
      </div>

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #fff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 {
          text-align: center;
          color: #333;
        }
        p {
          color: #555;
          text-align: center;
        }
        .checkbox-group {
          margin-top: 20px;
        }
        label {
          display: block;
          margin-bottom: 10px;
          font-size: 16px;
          cursor: pointer;
        }
        input[type="checkbox"] {
          margin-right: 10px;
          transform: scale(1.2);
        }
        .btn {
          display: block;
          width: 100%;
          margin-top: 30px;
          padding: 12px;
          font-size: 16px;
          color: #fff;
          background-color: #4CAF50;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          text-align: center;
        }
        .btn:hover {
          background-color: #45A049;
        }
        .note {
          margin-top: 20px;
          font-size: 14px;
          color: #777;
          text-align: center;
        }
      `}</style>

      <style jsx global>{`
        body {
          font-family: Arial, sans-serif;
          background-color: #f7f9fb;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
}