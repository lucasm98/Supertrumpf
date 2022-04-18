import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Admin from './admin/Admin';
import Game from './game/Game';
import Login from './login/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/"  element={<Login onLogin={(username, userpassword) => {}} error="" />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/game" element={<Game title="Supertrunpf" />} />
      </Routes>
    </BrowserRouter>
  );
}