import React, {useCallback, useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {useNavigate} from "react-router-dom";

import Admin from './admin/components/Admin';
import Game from './game/Game';
import Login from './login/Login';

import NotFound from "./NotFound";
import Nav from './Nav';

import {Provider} from 'react-redux';

let configureStore: Function;

if(process.env.NODE_ENV === 'development'){
  configureStore = require('./store/configureStore.dev').configureStore;
} else {
  configureStore = require('./store/configureStore.prod').configureStoreProd;
}
const store = configureStore();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  const handelLogin = useCallback(
    (username: string, password: string) => {
      setLoggedIn(username === 'user' && password === 'password');
      navigate("/Game");
    },
    [navigate]
  );

  const handelLogout = useCallback(()=> {
    setLoggedIn(false);
  }, []);

  const styles = {
    marginTop: '64px',
  } as const;

  return (
    <Provider store={store}>
      {loggedIn && <Nav onLogout={handelLogout}/>}
      <div style={styles}>
        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/game" /> : <Login onLogin={handelLogin} error={''}/>}/>
          <Route path="/admin/edit/:cardId" element={loggedIn ? <Admin /> : <Navigate to="/"/>} />
          <Route path="/admin/*" element={loggedIn ? <Admin /> : <Navigate to="/"/>} />
          <Route path="/game" element={loggedIn ? <Game title="Supertrumpf" /> : <Navigate to="/"/>} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </div>
    </Provider>
  );
}