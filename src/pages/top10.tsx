import { GetStaticProps } from 'next';
import { Title } from '../styles/pages/Home';

interface IProdutsProps {
  id: string;
  title: string;
}

interface IHomeProps {
  products: IProdutsProps[];
}

export default function Top10({products}: IHomeProps) {

  return (
    <div>
      <Title>Static</Title>
      <Title>TOP 10</Title>
      <ul>
        {products.map((product: IProdutsProps) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
          </li>
        ))}
      </ul>

    </div>
  )
}

export const getStaticProps: GetStaticProps<IHomeProps> = async (context) => {
  const response = await fetch('http://localhost:3005/products');
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 5,  
  }
}