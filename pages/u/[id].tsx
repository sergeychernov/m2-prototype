import { useRouter } from 'next/router';
import NoMenuLayout from '../../components/NoMenuLayout'; // Path to new Layout
import Head from 'next/head';

// Пример данных риелтора (в реальном приложении это может приходить с бэкенда)
const realtorData: { [key: string]: any } = {
  'mariya-olegovna-karaseva': {
    fullName: 'Мария Олеговна Карасева',
    photoUrl: '/images/realtor-placeholder.jpg', // Замените на реальный путь к фото
    specialization: 'Специалист по вторичной недвижимости и новостройкам',
    analytics: {
      dealsCompleted: 120,
      positiveFeedbackRate: '98%',
      averageDealTime: '30 дней',
    },
    contacts: {
      phone: '+7 (9XX) XXX-XX-XX',
      email: 'mariya.karaseva@example.com',
      botAddress: 't.me/mariya_karaseva_bot', // Пример адреса бота
    },
  },
  // Можно добавить других риелторов
};

export default function RealtorProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  // Получаем данные риелтора. В реальном приложении здесь может быть запрос к API
  const realtor = typeof id === 'string' ? realtorData[id] : null;

  if (!realtor) {
    // Можно отобразить страницу 404 или сообщение, что риелтор не найден
    return (
      <NoMenuLayout>
        <Head>
          <title>Риелтор не найден</title>
        </Head>
        <div>
          <h1>Риелтор не найден</h1>
          <p>К сожалению, мы не смогли найти информацию по данному адресу.</p>
        </div>
      </NoMenuLayout>
    );
  }

  return (
    <NoMenuLayout>
      <Head>
        <title>Личная карточка: {realtor.fullName}</title>
      </Head>
      <div className="realtor-card">
        <div className="realtor-header">
          <img src={realtor.photoUrl} alt={realtor.fullName} className="realtor-photo" />
          <h1>{realtor.fullName}</h1>
        </div>
        
        <section className="realtor-section">
          <h2>Специализация</h2>
          <p>{realtor.specialization}</p>
        </section>
        
        <section className="realtor-section">
          <h2>Аналитика по сделкам (кратко)</h2>
          <ul>
            <li>Успешных сделок: {realtor.analytics.dealsCompleted}</li>
            <li>Положительные отзывы: {realtor.analytics.positiveFeedbackRate}</li>
            <li>Среднее время сделки: {realtor.analytics.averageDealTime}</li>
          </ul>
          <p>Мария — опытный специалист, который поможет вам быстро и выгодно провести сделку с недвижимостью. Её клиенты отмечают высокий профессионализм и внимание к деталям.</p>
        </section>
        
        <section className="realtor-section">
          <h2>Контакты</h2>
          <p>Телефон: <a href={`tel:${realtor.contacts.phone}`}>{realtor.contacts.phone}</a></p>
          <p>Email: <a href={`mailto:${realtor.contacts.email}`}>{realtor.contacts.email}</a></p>
          <p>Телеграм-бот: <a href={`https://${realtor.contacts.botAddress}`} target="_blank" rel="noopener noreferrer">{realtor.contacts.botAddress}</a></p>
        </section>
      </div>

      <style jsx>{`
        .realtor-card {
          font-family: Arial, sans-serif;
          color: #333;
        }
        .realtor-header {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .realtor-photo {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 30px;
          border: 3px solid #eee;
        }
        .realtor-header h1 {
          font-size: 28px;
          margin: 0;
        }
        .realtor-section {
          margin-bottom: 25px;
        }
        .realtor-section h2 {
          font-size: 20px;
          color: #4B0082; /* Фирменный цвет для заголовков */
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 1px dashed #ddd;
        }
        .realtor-section p, .realtor-section li {
          font-size: 16px;
          line-height: 1.6;
        }
        .realtor-section ul {
          list-style: disc;
          padding-left: 20px;
        }
        .realtor-section a {
          color: #007bff;
          text-decoration: none;
        }
        .realtor-section a:hover {
          text-decoration: underline;
        }
      `}</style>
    </NoMenuLayout>
  );
}

RealtorProfilePage.noLayout = true; // Добавьте эту строку