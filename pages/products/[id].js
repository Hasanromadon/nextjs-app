import { ApiError } from '../../lib/api';
import Image from 'next/image';
import { getProduct, getProducts } from '../../lib/products';
import Page from '../../components/page';

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
        <Page title='Product Detail'>
            <div className='flex flex-col lg:flex-row'>
                <Image 
                    src={product.pictureUrl}
                    width={640}
                    height={480}
                    alt=''/>
                    <div className='flex-1 lg:ml-4'>
                    <p className='text-sm' >{product.description}</p>
                    <p className='text-xl font-bold'>$ {product.price}</p>
                    </div>
            </div>
        </Page>
    )


};


export default ProductPage;