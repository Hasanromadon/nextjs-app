import { ApiError } from '../../lib/api';
import Head from 'next/head';
import Title from '../../components/Title';
import { getProduct, getProducts } from '../../lib/products';

export async function getStaticPaths() {
    const products = await getProducts();
    return {
        paths: products.map(product => ({
            params: {id : product.id.toString()}
        })),
        fallback: 'blocking'
    }
}

export async function getStaticProps({params: {id}}) {
    try {
    const product = await getProduct(id);
        return {
            props: {product},
            revalidate: parseInt(process.env.REVALIDATE_SECONDS), 
        }
    } catch(error){
       if (error instanceof ApiError && error.status === 404) {
           return { notFound: true}
       };
       throw error;
    }
}

function ProductPage({product}) {
    return(
        <>
        <Head>
            <title>Next - Shop Product detail</title>
        </Head>

        <main className='px-6 py-4'>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
        </main>

        </>
    )


};


export default ProductPage;