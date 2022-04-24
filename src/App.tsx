import React, {useCallback, useState} from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

import Admin from './admin/Admin';
import Game from './game/Game';
import Login from './login/Login';

import NotFound from "./NotFound";
import Nav from './Nav';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handelLogin = useCallback(
    (username: string, password: string) =>
      setLoggedIn(username === 'user' && password === 'password'),
    []
  );

  const handelLogout = useCallback(()=> setLoggedIn(false), []);


  return (
    <BrowserRouter>
      {loggedIn && <Nav onLogout={handelLogout}/>}
      <Routes>
        <Route path="/" element={<Login onLogin={handelLogin} error={''}/>}/>
        {//<Route path="/" element={<Navigate replace to="/Login"/>}/>
        }
        <Route path="/admin" element={<Admin />} />
        <Route path="/game" element={<Game title="Supertrumpf" />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}