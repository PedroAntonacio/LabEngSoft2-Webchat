import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users, user }) => (
  <div className="textContainer">
    <div>
      <h1>Realtime Webchat App <span role="img" aria-label="emoji">💬</span></h1>
      <h2>PCS3853 - Laboratório de Engenharia de Software II<br></br>
      Pedro Orii Antonacio - nUSP 10333504</h2>
      <p> - Tecnologias Utilizadas: Node.js, Socket.io (websockets), React<br></br>
       - Próximos Passos: implementar banco de dados, login e autenticação</p>
    </div>
    {
      users
        ? (
          <div>
            <h1>Usuários online nesta Sala:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => {
                  if(name === user){
                  return (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                    &nbsp;[Você]
                  </div>
                  
                  )}
                else {
                  return (
                    <div key={name} className="activeItem">
                      {name}
                      <img alt="Online Icon" src={onlineIcon}/>
                    </div>
                  )}
              
              }
                )}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;