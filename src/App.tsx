import React, {useCallback, useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {useNavigate} from "react-router-dom";

import Admin from './admin/Admin';
import Game from './game/Game';
import Login from './login/Login';

import NotFound from "./NotFound";
import Nav from './Nav';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handelLogin = useCallback(
    (username: string, password: string) => {
      setLoggedIn(username === 'user' && password === 'password');
      navigate("/Game");
    },
    []
  );

  const handelLogout = useCallback(()=> setLoggedIn(false), []);


  return (
    <>
      {loggedIn && <Nav onLogout={handelLogout}/>}
      <Routes>
        <Route path="/" element={<Login onLogin={handelLogin} error={''}/>}/>
        <Route path="/admin" element={loggedIn? <Admin /> : <Navigate to="/"/>} />
        <Route path="/game" element={loggedIn? <Game title="Supertrumpf" /> : <Navigate to="/"/>} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  );
}