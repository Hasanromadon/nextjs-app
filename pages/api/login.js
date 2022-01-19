import { fetchJson } from '../../lib/api';
import cookie from 'cookie';
const {CMS_URL} = process.env;

async function handleLogin(req, res) {
    try {
        if(req.method !== 'POST') {
            res.status(405).end(); //not allowed
            return;
        };
        const {email, password} = req.body;
        
        const {jwt, user} = await fetchJson(`${CMS_URL}/auth/local`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({identifier: email, password})
        })    
        res.status(200)
        .setHeader('Set-Cookie', cookie.serialize('jwt', jwt, {path: '/api',
         httpOnly: true,})) 
        .json({
            id: user.id,
            name: user.username
        })
    } catch(err) {  
        res.status(401);
        throw err;
    }
    

};

export default handleLogin;