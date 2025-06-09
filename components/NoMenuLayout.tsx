import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function NoMenuLayout({ children }: Props) {
  return (
    <div className="layout-no-menu">
      <main className="content-no-menu">{children}</main>
      <style jsx>{`
        .layout-no-menu {
          /* Стили для вашего layout без меню, если нужны */
          padding: 20px;
        }
        .content-no-menu {
          max-width: 900px; /* Например, или другая ширина для контента карточки */
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}