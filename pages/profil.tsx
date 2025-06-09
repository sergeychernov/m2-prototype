import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link'; // Import Link for internal navigation
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import QRCode from 'react-qr-code'; // Import QRCode component
// Предположим, у вас есть SVG-иконка карандаша для редактирования
// Вы можете использовать свою или найти подходящую, например, с Heroicons или Font Awesome
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2 cursor-pointer text-gray-500 hover:text-gray-700" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);

// Предположим, у нас есть функция для загрузки данных пользователя
// В реальном приложении это будет API-запрос
const fetchUserData = async () => {
  // Заглушка: возвращаем данные, похожие на карточку риелтора
  return {
    fullName: 'Мария Олеговна Карасева',
    photoUrl: '/images/realtor-placeholder.jpg', // Убедитесь, что этот файл существует в public/images
    specialization: 'Специалист по вторичной недвижимости и новостройкам',
    analytics: {
      dealsCompleted: 120,
      positiveFeedbackRate: '98%',
      averageDealTime: '30 дней',
      dealsOverTime: [
        { month: 'Янв', deals: 10 },
        { month: 'Фев', deals: 12 },
        { month: 'Мар', deals: 15 },
        { month: 'Апр', deals: 13 },
        { month: 'Май', deals: 18 },
        { month: 'Июн', deals: 20 },
      ],
    },
    contacts: {
      phone: '+7 (9XX) XXX-XX-XX',
      email: 'mariya.karaseva@example.com',
      botAddress: 't.me/mariya_karaseva_bot',
    },
    description: 'Мария — опытный специалист, который поможет вам быстро и выгодно провести сделку с недвижимостью. Её клиенты отмечают высокий профессионализм и внимание к деталям.',
  };
};

interface AnalyticsData {
  dealsCompleted: number | string;
  positiveFeedbackRate: string;
  averageDealTime: string;
  dealsOverTime: Array<{ month: string; deals: number }>;
}

export default function ProfilPage() {
  // Состояния для хранения данных (не для редактирования напрямую)
  const [userData, setUserData] = useState<any>(null); // Используем any для упрощения, лучше определить полный тип
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUserData();
        setUserData(data);
        setError(null);
      } catch (err) {
        console.error("Ошибка загрузки данных профиля:", err);
        setError('Не удалось загрузить данные профиля.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Функции-заглушки для обработки клика по иконке редактирования
  const handleEdit = (section: string, field?: string) => {
    alert(`Редактирование раздела: ${section}` + (field ? `, поле: ${field}` : ''));
    // Здесь будет логика открытия модального окна или перехода на страницу редактирования
  };

  if (isLoading) {
    return <div>Загрузка данных профиля...</div>;
  }

  if (error || !userData) {
    return <div>Ошибка: {error || 'Данные профиля не загружены.'}</div>;
  }

  const { fullName, photoUrl, specialization, analytics, contacts, description } = userData;
  const analyticsData = analytics as AnalyticsData; // Приведение типа для analytics
  const localTelegramLink = "/telegram"; // Define the local link

  return (
    <>
      <Head>
        <title>Профиль пользователя</title>
      </Head>
      <div className="profile-view-card">
        <h1>Профиль пользователя</h1>

        <section className="profile-section-view">
          <div className="section-header">
            <h2>Основная информация</h2>
            <span onClick={() => handleEdit('Основная информация')}><EditIcon /></span>
          </div>
          <div className="profile-header-view compact-main-info">
            {photoUrl && <img src={photoUrl} alt={fullName} className="profile-photo-view-compact" />}
            <div className="info-block">
              <p><strong>Полное имя:</strong> {fullName}</p>
              <p><strong>Специализация:</strong> {specialization}</p>
            </div>
          </div>
        </section>

        <section className="profile-section-view">
          <div className="section-header">
            <h2>Описание</h2>
            <span onClick={() => handleEdit('Описание')}><EditIcon /></span>
          </div>
          <p>{description}</p>
        </section>
        
        <section className="profile-section-view">
           {/* Аналитика остается нередактируемой, как и раньше */}
          <h2>Аналитика по сделкам</h2>
          <div className="analytics-summary compact-analytics-summary">
            <p><strong>Успешных сделок:</strong> {analyticsData.dealsCompleted}</p>
            <p><strong>Положительные отзывы:</strong> {analyticsData.positiveFeedbackRate}</p>
            <p><strong>Среднее время сделки:</strong> {analyticsData.averageDealTime}</p>
          </div>
          <div className="charts-container">
            {analyticsData.dealsOverTime && analyticsData.dealsOverTime.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={analyticsData.dealsOverTime}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="deals" stroke="#8884d8" activeDot={{ r: 8 }} name="Сделки" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p>Нет данных для отображения графика.</p>
            )}
          </div>
        </section>

        <section className="profile-section-view">
          <div className="section-header">
            <h2>Контакты</h2>
            <span onClick={() => handleEdit('Контакты')}><EditIcon /></span>
          </div>
          <div className="contacts-layout">
            <div className="contacts-main">
              <p><strong>Телефон:</strong> {contacts.phone} <span onClick={() => handleEdit('Контакты', 'phone')}><EditIcon /></span></p>
              <p><strong>Email:</strong> {contacts.email} <span onClick={() => handleEdit('Контакты', 'email')}><EditIcon /></span></p>
              <p className="personal-site-link">
                <strong>Сайт-визитка:</strong> 
                <Link href="/u/mariya-olegovna-karaseva" legacyBehavior>
                  <a>{`/u/mariya-olegovna-karaseva`}</a>
                </Link>
              </p>
              <p className="business-card-link">
                <a href="/path/to/your/business-card-layout.pdf" download>
                  Скачать макет визитки для типографии
                </a>
              </p>
            </div>
            <div className="contacts-telegram">
              {contacts.botAddress && (
                <>
                  <div className="telegram-link-container">
                    <p>
                      <strong>Телеграм-бот:</strong> 
                      <Link href={localTelegramLink} legacyBehavior>
                        <a target="_blank" rel="noopener noreferrer">{contacts.botAddress}</a>
                      </Link>
                      {' '}
                      <span onClick={() => handleEdit('Контакты', 'botAddress')}><EditIcon /></span>
                    </p>
                  </div>
                  <div className="qr-code-container">
                    <p className="qr-code-label">QR-код для Телеграм-бота:</p>
                    <QRCode value={contacts.botAddress} size={128} level="H" />
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

      </div>

      <style jsx>{`
        .profile-view-card {
          font-family: Arial, sans-serif;
          color: #333;
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
        }
        .profile-view-card h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }
        .profile-section-view {
          margin-bottom: 25px;
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        .profile-section-view h2 {
          font-size: 20px;
          color: #4B0082;
          margin: 0; /* Убираем стандартный margin у h2 */
        }
        .profile-header-view {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        .profile-photo-view {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 25px;
          border: 3px solid #eee;
        }

        /* Styles for compact main information section */
        .compact-main-info {
          align-items: flex-start; /* Align items to the top */
          margin-bottom: 10px; /* Reduced bottom margin */
        }
        .profile-photo-view-compact {
          width: 80px; /* Reduced photo size */
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 15px; /* Reduced margin */
          border: 2px solid #eee;
        }
        .info-block p {
          margin-bottom: 4px; /* Reduced space between name and specialization */
        }
        .info-block p:last-child {
          margin-bottom: 0;
        }

        .profile-section-view p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 8px;
        }
        .profile-section-view p strong {
          color: #555;
        }
        .analytics-summary p {
          margin: 5px 0;
        }

        /* Styles for compact analytics summary */
        .compact-analytics-summary {
          display: flex;
          flex-wrap: wrap; /* Allow items to wrap to the next line on smaller screens */
          justify-content: space-between; /* Distribute space between items */
          gap: 10px; /* Space between items */
          margin-bottom: 20px; /* Space before the chart */
        }
        .compact-analytics-summary p {
          margin: 0; /* Remove default paragraph margin */
          font-size: 15px; /* Slightly smaller font for compactness */
        }

        .charts-container {
          margin-top: 20px;
        }

        .contacts-layout {
          display: flex;
          justify-content: space-between;
          gap: 20px; /* Расстояние между колонками */
        }

        .contacts-main {
          flex: 2; /* Основная колонка занимает больше места */
        }

        .contacts-telegram {
          flex: 1; /* Колонка телеграма занимает меньше места */
          display: flex;
          flex-direction: column;
          align-items: center; /* Центрируем содержимое колонки телеграма */
        }
        
        .contact-telegram-section { /* Этот класс больше не используется для общей компоновки, но может остаться для стилизации дочерних элементов, если нужно */
          /* display: flex; */ /* Удалено или закомментировано */
          /* align-items: flex-start; */ /* Удалено или закомментировано */
          /* gap: 20px; */ /* Удалено или закомментировано */
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .telegram-link-container {
          /* flex-grow: 1; */ /* Может не требоваться или быть изменено */
          text-align: center; /* Центрируем ссылку на телеграм-бот */
          margin-bottom: 10px; /* Добавляем отступ снизу */
        }
        .qr-code-container {
          text-align: center; /* Center QR code and its label */
        }
        .qr-code-label {
          font-size: 0.9em;
          color: #555;
          margin-bottom: 5px;
        }

        .business-card-link {
          margin-top: 15px;
        }

        .business-card-link a {
          color: #007bff;
          text-decoration: none;
        }

        .business-card-link a:hover {
          text-decoration: underline;
        }

        .personal-site-link {
          margin-top: 10px;
        }

        .personal-site-link a {
          color: #007bff;
          text-decoration: none;
        }

        .personal-site-link a:hover {
          text-decoration: underline;
        }

        .chart-placeholder {
          border: 1px dashed #ccc;
          padding: 20px;
          text-align: center;
          background-color: #fff;
          min-height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* Стили для иконки редактирования уже встроены в компонент EditIcon, 
           но можно добавить общие стили для span, если нужно */
        .section-header span,
        .profile-section-view p span {
            display: inline-flex; /* Для корректного отображения иконки */
            align-items: center;
        }
      `}</style>
    </>
  );
}
