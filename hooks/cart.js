import { useQuery } from 'react-query';
import { fetchJson } from '../lib/api';

const USER_QUERY_KEY = 'cart'

export function useCart(){
    const query = useQuery(USER_QUERY_KEY , async ()=> {
        try {
            return await fetchJson('/api/cart');
        } catch(err){
            return undefined;
        }
    }, {
        cacheTime: Infinity,
        staleTime: 30_000 //ms
    })
    return query.data;

};