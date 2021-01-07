import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';


interface IProdutsProps {
    id: string;
    title: string;
  }
  
interface IHomeProps {
    products: IProdutsProps[];
}

export default function Category({products}: IHomeProps){
    const router = useRouter();

    if (router.isFallback){
        return ( 
            <p>Carregando...</p>
        )
    }

    return (
        <>
        <h1>{router.query.slug}</h1>
        <ul>
        {products.map((product: IProdutsProps) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
          </li>
        ))}
      </ul>
      </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`http://localhost:3005/categories`);
    const categories = await response.json();

    const paths = categories.map(category => {
        return {
            params: {
                slug: category.id,
            }
        }
    });

    return{
        paths,
        fallback: true,
    }
};

export const getStaticProps: GetStaticProps<IHomeProps> = async (context) => {
    const {slug} = context.params;

    const response = await fetch(`http://localhost:3005/products?category_id=${slug}`);
    const products = await response.json();


    return {
        props: {
            products,
        },
        revalidate: 5,
    }
};