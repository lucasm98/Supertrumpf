import React, { FormEvent, useRef, useState, useEffect, useCallback } from 'react';
import update from "immutability-helper";

import './Login.scss';

interface Props {
  onLogin: (username: string, password: string) => void;
  error: string;
}

export default function Login({error, onLogin}: Props){
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [localError, setLocalError] = useState('');

  useEffect(()=> {
    username.current!.focus();
  });

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let error = 'Bitte Benutzername und Passwort angeben.';
    if(username.current!.value && username.current!.value) {
      error = '';
      onLogin( username.current!.value, password.current!.value );
    }
    setLocalError(prevState => update(prevState, {$set: error}));
  }, []);

  return(
    <form onSubmit={handleSubmit} className="login">
      {(error !== '' || localError !== '') && (
        <div className="error">
          {error} {localError}
        </div>
      )}
      <div>
        <label htmlFor="">Benutzername:</label>
        <input type="text" id="username" ref={username}/>
      </div>
      <div>
        <label htmlFor="">Passwort:</label>
        <input type="password" id="password" ref={password}/>
      </div>
      <button type="submit">Anmelden</button>
    </form>
  );

}