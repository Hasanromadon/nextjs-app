import Head from 'next/head';
import Link from 'next/link';
import Title from '../components/Title';
import { getProducts } from '../lib/products';

export async function getStaticProps(){
  // menggunakan strategy get Static Props yang direvalidate
  try {
    const products = await getProducts();
    console.log(products);
    return {
      props: {products},
      revalidate: parseInt(process.env.REVALIDATE_SECONDS), 
    }
  }catch(error){
    return {notFound: true}
  }

}


export default function HomePage({products}) {
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className='px-6 py-4'>
       <Title>Home Page</Title>
       <ul>
         {products.map(product => (
           <li key={product.id}>
           <Link href={`products/${product.id}`}>
                <a >{product.title}</a>
           </Link>
           </li>
         ))}
       </ul>
      </main>
    </>

  )
}
