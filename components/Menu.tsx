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
    <nav>
      <ul className="menu-top">
        <li className="menu-item">
          <Link href="/">Главная<span className="menu-icon">🏠</span></Link>
        </li>
        <li className="menu-section-title">Популярные сервисы</li>
        {popular.map((item) => (
          <li key={item.slug} className="menu-item">
            <Link href={item.slug}>
              {item.title}
              <span className="menu-icon">{item.icon}</span>
            </Link>
          </li>
        ))}
        <li className="menu-section-title">С высокой комиссией</li>
        {highCommission.map((item) => (
          <li key={item.slug} className="menu-item">
            <Link href={item.slug}>
              {item.title}
              <span className="menu-icon">{item.icon}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="menu-bottom">
        {bottom.map((item) => (
          <li key={item.slug} className="menu-item">
            <Link href={item.slug}>
              {item.title}
              <span className="menu-icon">{item.icon}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
