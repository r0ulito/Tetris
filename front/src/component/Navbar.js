import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";

const Navbar = () => {
    return (
        <div>
            <header>
                <title> Tetris </title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Tetris online" />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
                />
                <link rel="icon" href={images.logo} />
            </header>
            <BrowserRouter>
                <header className="header">
                    <h1>Tetris</h1>
                    <div className="headerComputer">
                        <ul className="menu">
                            {renderAuthLinks()}
                        </ul>
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<main className="notFound"><h1>404 NOT FOUND</h1></main>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Navbar;
