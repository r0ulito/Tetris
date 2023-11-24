import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getTokenFromLocalStorage } from "../lib/common";
import RequireAuth from "../lib/auth";

const Account = () => {
    const token = getTokenFromLocalStorage();
    RequireAuth()

    return (
        <section className="account">
            <h2>Votre compte</h2>
            <div className="user">
                <div className="accountData">
                    <article>
                        <h3 className="titleAccount">Information Utilisateur</h3>
                        <Link to="/updateUser">
                            <button className="custom-btn btn btn-green">
                                Modifier mes données
                            </button>
                        </Link>
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
