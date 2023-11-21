import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const handleRegister = () => {
    // Gérer la logique d'inscription ici
    // Rediriger vers une page après l'inscription
  }

  return (
    <section className='login'>
        <div className='login-container'>
            <article>
                <form>
                    <label>Pseudo:</label>
                    <input type="email" />
                    <label>Email:</label>
                    <input type="email" />
                    <label>Mot de passe:</label>
                    <input type="password" />
                    <button className="custom-btn btn btn-green" type="button" onClick={handleRegister}>s'inscrire</button>
                </form>
            </article>
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