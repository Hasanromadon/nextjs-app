import { useState } from 'react';
import Page from '../components/page';
import Input from '../components/input';
import Field from '../components/Field';
import Button from '../components/Button';
import { fetchJson } from '../lib/api';
export default function SignInPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword]  = useState('');
    const [status, setStatus] = useState({loading: false, error: false});

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setStatus({loading: true, error: false});
            console.log(JSON.stringify({indetifier: email, password}));
     
             const response = await fetchJson('http://localhost:1337/auth/local', {
                 method: 'POST',
                 headers: {'Content-Type': 'application/json'},
                 body: JSON.stringify({identifier: email, password})
             });
             setStatus({loading: false, error: false});
        }catch(error){
            setStatus({loading: false, error: true});
        }

    }


    return ( 
        <Page title='Sign page'>
            <form onSubmit={handleSubmit}>
                <Field label='Email'> 
                    <Input type='email' value={email} onChange={(event)=> setEmail(event.target.value)}/>
                </Field>
                <Field label='Password'>
                    <Input type='password' value={password} onChange={(event)=> setPassword(event.target.value)} />
                </Field>
                {status.error && <p className='text-red-700 text-sm'>Invalid credential</p>}
                {status.loading ? <p>Loading...</p> : <Button>Sign in</Button>}
                
            </form>
        </Page>
    )
}