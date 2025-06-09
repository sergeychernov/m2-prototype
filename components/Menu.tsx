import Link from 'next/link';

interface Item {
  title: string;
  slug: string;
  icon: string;
}

const popular: Item[] = [
  { title: 'Секретарь', slug: '/sekretar', icon: '🤖' },
  { title: 'Ипотека', slug: '/ipoteka', icon: '💰' },
  { title: 'Сделка', slug: '/sdelka', icon: '📝' },
  { title: 'Защита сделки', slug: '/zashchita-sdelki', icon: '🛡️' },
  { title: 'Проверка недвижимости', slug: '/proverka-nedvizhimosti', icon: '🏢' },
];

const highCommission: Item[] = [
  { title: 'Свой дом', slug: '/svoy-dom', icon: '🏡' },
  { title: 'M2Pro Новостройки', slug: '/m2pro-novostroyki', icon: '🏗️' },
];

const bottom: Item[] = [
  { title: 'Помощь', slug: '/pomoshch', icon: '❓' },
  { title: 'Обучение', slug: '/obuchenie', icon: '📚' },
  { title: 'Профиль', slug: '/profil', icon: '👤' },
  { title: 'Выход', slug: '/vyhod', icon: '🚪' },
];

export default function Menu() {
  return (
    <nav className="menu">
      <div className="menu-header">
        <Link href="/" className="menu-logo">M2pro</Link>
        <div className="menu-user">m2pro-an1@lk-test.ru · Партнёр</div>
      </div>
      
      <ul className="menu-top">
        <li className="menu-item">
          <Link href="/" className="menu-link">
            <span className="menu-icon">🏠</span>
            <span>Главная</span>
          </Link>
        </li>
        
        <li className="menu-section-title">Популярные сервисы</li>
        {popular.map((item) => (
          <li key={item.slug} className="menu-item">
            <Link href={item.slug} className="menu-link">
              <span className="menu-icon">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
        
        <li className="menu-section-title">С высокой комиссией</li>
        {highCommission.map((item) => (
          <li key={item.slug} className="menu-item">
            <Link href={item.slug} className="menu-link">
              <span className="menu-icon">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      
      <ul className="menu-bottom">
        {bottom.map((item) => (
          <li key={item.slug} className="menu-item">
            <Link href={item.slug} className="menu-link">
              <span className="menu-icon">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      
      <style jsx>{`
        .menu {
          width: 100%; 
          height: 100%; /* Изменено с 100vh на 100% для корректного заполнения .side-menu */
          background: #fff;
          display: flex;
          flex-direction: column;
          /* padding: 16px 0; - этот padding теперь управляется .side-menu */
          box-sizing: border-box;
        }
        
        .menu-header {
          /* padding: 0 24px 24px; - этот padding теперь управляется .side-menu.open */
          /* padding в collapsed состоянии будет 0 0 24px из globals.css */
        }
        
        .menu-logo {
          font-size: 24px;
          font-weight: bold;
          color: #4B0082;
          text-decoration: none;
          margin-bottom: 8px;
          display: block;
        }
        
        .menu-user {
          font-size: 14px;
          color: #666;
        }
        
        .menu-top {
          flex: 1;
          list-style: none;
          padding: 0;
          margin: 0;
          overflow-y: auto; /* Добавляем скролл, если пунктов много */
        }
        
        .menu-bottom {
          list-style: none;
          padding: 0;
          margin: 0;
          border-top: 1px solid #eee;
          /* padding-top: 16px; - этот padding теперь управляется .side-menu.open / .collapsed */
        }
        
        .menu-section-title {
          font-size: 12px;
          color: #666;
          padding: 16px 24px 8px; /* Этот padding будет работать только в .open состоянии */
          text-transform: uppercase;
        }
        
        .menu-item {
          margin: 2px 0; /* Уменьшаем вертикальный margin, например, до 2px */
        }
        
        .menu-link {
          display: flex;
          align-items: flex-start; 
          padding: 8px 24px; /* Этот padding будет работать только в .open состоянии */
          color: #333;
          text-decoration: none;
          font-size: 14px;
          transition: background-color 0.2s;
        }
        
        .menu-link:hover {
          background-color: #f5f5f5;
        }
        
        .menu-icon {
          margin-right: 12px; /* Этот margin будет работать только в .open состоянии */
          font-size: 20px;
          width: 24px;
          text-align: center;
        }
      `}</style>
    </nav>
  );
}
