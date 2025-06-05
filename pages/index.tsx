import { GetStaticProps } from 'next';

interface Props {
  message: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      message: 'Hello from Static Site Generation!'
    }
  };
};

export default function Home({ message }: Props) {
  return (
    <div>
      <h1>{message}</h1>
      <p>Страница сгенерирована статически.</p>
    </div>
  );
}
