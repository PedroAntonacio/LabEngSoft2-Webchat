import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

export default function SignIn() {

  const urlParams = new URLSearchParams(window.location.search);

  const nome = urlParams.has('nome') ? urlParams.get('nome') : '';
  const sala = urlParams.get('sala') ? urlParams.get('sala') : '';

  const [name, setName] = useState(nome);
  const [room, setRoom] = useState(sala);

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="title">Realtime Webchat App <span role="img" aria-label="emoji">💬</span></h1>
        <p className="text">
          PCS3853 - Laboratório de Engenharia de Software II<br></br>
          Pedro Orii Antonacio - nUSP 10333504
        </p>
        <h1 className="heading">Entre no chat</h1>
        <div>
          <input placeholder="Nome" defaultValue={nome} className="joinInput" type="text" onChange={(event) => setName(event.target.value.toLowerCase())} />
        </div>
        <div>
          <input placeholder="Sala" defaultValue={sala} className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value.toLowerCase())} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Entrar</button>
        </Link>
      </div>
    </div>
  );
}
