import Head from 'next/head';
import Title from '../components/Title';
import NavBar from './NavBar';

export default function Page({title, children}) {
    return (
        <>
        <Head>
          <title>{title} - Next Shop</title>
        </Head>
        <NavBar/>
        <main className='px-6 py-4 lg:container'>
         <Title>{title}</Title>
        {children}
        </main>
      </>
    )
}
