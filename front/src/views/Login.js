import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { storeTokenInLocalStorage } from '../lib/common';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

    const userLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8180/login',
                data: {
                    email: email,
                    password
                },
                header: {
                    'Content-Type': 'application/json'
                }
            });
            if (response) {
                storeTokenInLocalStorage(response.data);
            }
        }
        catch (err) {
            setErrorMessage(err.response.data.message);
        };
    }

    return (
        <section className='login'>
            <div>
                <form onSubmit={userLogin}>
                    <h2>Connexion</h2>
                    <div>
                        <label htmlFor="email">Mail</label>
                        <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe</label>
                        <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                    <button className="custom-btn btn btn-green">Connecter</button>
                </form>
                <article className='changePage'>
                    <p>Pas encore de compte ?</p>
                    <Link to="/register">
                        <button className="custom-btn btn btn-green">S'inscrire</button>
                    </Link>
                </article>
            </div>
        </section>
    );
}

export default LoginPage;