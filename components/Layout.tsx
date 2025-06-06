import { useState, ReactNode } from 'react';
import Menu from './Menu';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="layout">
      <button className="menu-button" onClick={toggleMenu}>
        Menu
      </button>
      <div
        className={`overlay ${open ? 'show' : ''}`}
        onClick={toggleMenu}
      />
      <div className={`side-menu ${open ? 'open' : ''}`}>
        <Menu />
      </div>
      <main className="content">{children}</main>
    </div>
  );
}
