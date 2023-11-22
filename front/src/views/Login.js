import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Gérer la logique de connexion ici
        // Rediriger vers une page après la connexion
    }

    return (
        <section className='login'>
            <div className='login-container'>
                <article>
                    <form>
                        <label>Email:</label>
                        <input type="email" />
                        <label>Mot de passe:</label>
                        <input type="password" />
                        <button className="custom-btn btn btn-green" type="button" onClick={handleLogin}>Se connecter</button>
                    </form>
                </article>
                <article className='changePage'>
                    <p>Pas encore de compte ?</p>
                    <Link to="/Register">
                        <button className="custom-btn btn btn-green">S'inscrire</button>
                    </Link>
                </article>
            </div>
        </section>
    );
}

export default LoginPage;