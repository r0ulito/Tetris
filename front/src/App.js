import { NavLink, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import TetrisView from './views/TetrisView';
import './assets/css/globals.scss';
import Account from './views/Account';

const App = () => {

  return (
    <div>
      <header>
        <title> Tetris </title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content='Tetris online' />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css'
        />
      </header>
      <BrowserRouter>
        <header className='header'>
          <NavLink to={`/`} className="logo-link">
            <h1>Tetris</h1>
          </NavLink>
        </header>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/Account' element={<Account />} />
          <Route path='/tetris' element={<TetrisView />} />
          <Route
            path='*'
            element={
              <main className='notFound'>
                <h1>404 NOT FOUND</h1>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
