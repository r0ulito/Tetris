import React from 'react';
const LoginPage = () => {

  const handleLogin = () => {
    // Gérer la logique de connexion ici
    // Rediriger vers une page après la connexion
  }

  return (
    <div>
      <h2>Se connecter</h2>
      <form>
        <label>Email:</label>
        <input type="email" />
        <br />
        <label>Mot de passe:</label>
        <input type="password" />
        <br />
        <button type="button" onClick={handleLogin}>Se connecter</button>
      </form>
    </div>
  );
}

export default LoginPage;