import { useState, ReactNode } from 'react';
import Menu from './Menu';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [open, setOpen] = useState(false); // Оставляем open для полного открытия/скрытия текста

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="layout">
      {/* Кнопка Menu удалена */}
      <div
        className={`overlay ${open ? 'show' : ''}`}
        onClick={toggleMenu}
      />
      {/* Добавляем класс collapsed по умолчанию, убираем его, когда open === true */}
      {/* Добавляем onClick сюда */}
      <div className={`side-menu ${open ? 'open' : 'collapsed'}`} onClick={toggleMenu}>
        <Menu />
      </div>
      <main className="content">{children}</main>
    </div>
  );
}
