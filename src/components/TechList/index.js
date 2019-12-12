import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { Container } from './styles';

export default function TechList() {
  const [newTech, setNewTech] = useState('');

  const dispatch = useDispatch();
  const techs = useSelector(state => state.techs);
  /*como nao vamos criar as configs do redux e sim criar um mock para isso,
  vamos supor que o nosso reducer se chama techs e já é um array com as techs e 
  nao iremos adicionar id nem nada disso */

  function handleAddTech() {
    /*poderia separar essa action em uma função mas por enquanto deixaremos ela aqui dentro */
    dispatch({ type: 'ADD_TECH', payload: { tech: newTech } });

    setNewTech('');
  }

  return (
    <form data-testid="tech-form" onSubmit={handleAddTech}>
      <ul data-testid="tech-list">
        {techs.map(tech => <li key={tech}>{tech}</li>)}
      </ul>
      
      <label htmlFor="tech">Tech</label>
      <input id="tech" value={newTech} onChange={e => setNewTech(e.target.value)}/>

      <button onClick={handleAddTech}>Adicionar</button>
    </form>
  );
}
