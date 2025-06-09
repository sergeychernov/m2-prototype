import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/Layout';

// Определяем тип для Component, чтобы TypeScript знал о свойстве noLayout
type ComponentWithNoLayout = AppProps['Component'] & {
  noLayout?: boolean;
};

type CustomAppProps = AppProps & {
  Component: ComponentWithNoLayout;
};

export default function MyApp({ Component, pageProps }: CustomAppProps) {
  if (Component.noLayout) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
