import { fetchJson } from './api';

const CMS_URL = `${process.env.CMS_URL}/products`;

export async function getProduct(id){
    const product = await fetchJson(`${CMS_URL}/${id}`);
    return stripProducts(product);
}
export async function getProducts(){
    const products = await fetchJson(CMS_URL);
    return products.map(stripProducts);
}

function stripProducts(product){
    return {
        id: product.id,
        title: product.title,
        description: product.description
    }
};
