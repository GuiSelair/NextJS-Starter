import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/Home';

interface IProdutsProps {
  id: string;
  title: string;
}

interface IHomeProps {
  recommendedProducts: IProdutsProps[];
}

export default function Home({recommendedProducts}: IHomeProps) {

  return (
    <div>
      <Title>Hello World</Title>
      <ul>
        {recommendedProducts.map((product: IProdutsProps) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
          </li>
        ))}
      </ul>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch('http://localhost:3005/recommended');
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}