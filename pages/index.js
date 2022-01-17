import Head from 'next/head';
import ProductCard from '../components/productCard';
import Title from '../components/Title';
import { getProducts } from '../lib/products';
import Page from '../components/page';
export async function getStaticProps(){
  // menggunakan strategy get Static Props yang direvalidate
  console.log(parseInt(process.env.REVALIDATE_SECONDS));
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
    <Page title='Homepage'>
       <ul className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
         {products.map(product => (
           <li key={product.id}>
             <ProductCard product={product}/>
           </li>
         ))}
       </ul>
      </Page>
  )
}
