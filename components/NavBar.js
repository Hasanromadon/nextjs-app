import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchJson } from '../lib/api';
import { useQuery } from 'react-query';
import { useSignOut, useUser } from '../hooks/users';


export default function NavBar() {
    const user = useUser();
    const signOut = useSignOut()
    // const [user, setUser] = useState();
    // useEffect(()=> {
    //     (async ()=> {
    //         try {
    //             const user = await fetchJson('/api/user');
    //             setUser(user);
    //         } catch(err){

    //         }
    //     })();
    // }, []);
    


    return (
        <nav className='px-2 py-1 text-sm mx-auto lg:container'>
            <ul className='flex gap-2'>
                <li className='text-lg font-extrabold'>
                    <Link href="/"><a>Next Shop</a></Link>
                </li>
                <li role='separator' className='flex-1' />
                {
                    user ? 
                    <>
                        <li>
                           {user.name}
                        </li>
                        <li>
                        <Link href="/cart"><a>Cart</a></Link>
                        </li>
                        <li>
                           <button onClick={signOut}>Sign Out</button>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <Link href="/sign-in"><a>Sign in</a></Link>
                        </li>
                    </>
                }

            </ul>
        </nav>
    )
}
