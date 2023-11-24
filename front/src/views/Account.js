import { Link } from "react-router-dom";
import RequireAuth from "../lib/auth";

const Account = () => {
    RequireAuth()

    return (
        <section className="account">
            <h2>Votre compte</h2>
            <div className="user">
                <div className="accountData">
                    <article>
                        <h3 className="titleAccount">Information Utilisateur</h3>
                        <button className="custom-btn btn btn-green">
                            Modifier mes données
                        </button>
                    </article>
                    <article>
                        <h3>Partie Solo</h3>
                        <Link to="/Tetris">
                            <button className="custom-btn btn btn-green">Jouer</button>
                        </Link>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default Account;
