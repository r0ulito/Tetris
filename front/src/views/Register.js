import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getTokenFromLocalStorage } from '../lib/common';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const token = getTokenFromLocalStorage();
    const navigate = useNavigate();

    const redirect = () => {
        if (token) {
            return navigate(`/account`)
        }
    }

    useEffect(() => {
        redirect()
    }, []);
    
    const userRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8180/signup',
                data: {
                    username,
                    email,
                    password,
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response)
        }
        catch (err) {
            setErrorMessage(err.response.data.message);
        }
    };

    return (
        <section className='register'>
            <div>
                <form onSubmit={userRegister}>
                    <h2>Inscription</h2>
                    <div>
                        <label htmlFor="username">Votre Pseudo</label>
                        <input id="username" name="username" type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email">Mail</label>
                        <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe</label>
                        <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                    <button type="submit" className="custom-btn btn btn-green">Inscription</button>
                </form>
                <article className='changePage'>
                    <p>Déjà un compte ?</p>
                    <Link to="/">
                        <button className="custom-btn btn btn-green">Se Connecter</button>
                    </Link>
                </article>

            </div>

        </section>
    );
}

export default Register;