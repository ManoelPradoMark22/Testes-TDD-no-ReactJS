import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
// render p/ criar o html fake
// fireEvent podemos escolher um evento especifico para testar

import Techlist from '~/components/TechList';

describe('Techlist component', () => {
  // cada teste roda em um ambiente isolado, um teste nao influencia no resultado de outro
  // qnd um teste começa renderiza tudo de novo

  beforeEach(() => {
    localStorage.clear();
  })

  it('should be able to add new tech', () => {
    const { getByText, getByTestId, getByLabelText } = render(<Techlist />); //renderiza a TechList
    /*getByLabelText para pegar o input. ele procura pelo id do input relacionado
    com o htmlFor da label em questao e pega este input! */
    /*demonstrando: 
    <label htmlFor="tech">tech</label>
    <input id="tech" onChange={e => e.target.value} />*/
    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });

    /*esse submit, ao contario do change, nao precisa de nenhum parâmetro  */
    fireEvent.submit(getByTestId('tech-form'));

    /*vamos usar tambem o getByTestId para pegarmos os elementos
    que tenham o id data-testid="tech-list", assim teremos certeza que estamos verificando apenas
    os elementos da nossa lista!*/
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    /*tradução: eu espero, que a minha lista 'tech-list' tenha um elemento que
    esteja escrito 'Node.js' */

    expect(getByLabelText('Tech')).toHaveValue('');
    /*esperamos que o nosso input de tecnologia esteja vazio após adicionarmos 
    uma tech */
  });

  it ('should store techs in storage', () => {
    /*aqui usaremos let ao invés de const, pq precisaremos REDEFINIR essas variáveis*/
    let { getByText, getByTestId, getByLabelText } = render(<Techlist />); //renderiza a TechList

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('tech-form'));

    /*limpa todo o html gerado até então, para podermos renderizar ela do zero em seguida*/
    cleanup();

    /*agr nao precisamos mais colocar o let pq ela foi definida acima, só precisamos
    colocar parênteses por volta */
    ({ getByText, getByTestId, getByLabelText } = render(<Techlist />)); //renderiza a TechList

    /*esperamos que a funcao setItem esteja sendo chamada com o array de tecnologias contendo 'Node.js' apenas */
    expect(localStorage.setItem).toHaveBeenCalledWith('techs', JSON.stringify(['Node.js']));
    /*mesmo depois de remontarmos tudo do zero, esperamos que ainda tenha a tech Node.js */
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
  });
});