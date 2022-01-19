import { useState } from 'react';
import Page from '../components/page';
import Input from '../components/input';
import Field from '../components/Field';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import { useSignIn} from '../hooks/users';

export default function SignInPage(){

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword]  = useState('');
    const {signIn, signInError, signInLoading} = useSignIn();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valid = await signIn(email, password);
        if(valid) {
            router.push('/');
        }
    };
    
    return ( 
        <Page title='Sign page'>
            <form onSubmit={handleSubmit}>
                <Field label='Email'> 
                    <Input type='email' value={email} onChange={(event)=> setEmail(event.target.value)}/>
                </Field>
                <Field label='Password'>
                    <Input type='password' value={password} onChange={(event)=> setPassword(event.target.value)} />
                </Field>
                {signInError && <p className='text-red-700 text-sm'>Invalid credential</p>}
                {signInLoading ? <p>Loading...</p> : <Button>Sign in</Button>}
                
            </form>
        </Page>
    )
}