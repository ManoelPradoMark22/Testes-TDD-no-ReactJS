import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// render p/ criar o html fake
// fireEvent podemos escolher um evento especifico para testar

import Techlist from '~/components/TechList';

describe('Techlist component', () => {
  it('should be able to add new tech', () => {
    const { getByText, getByTestId, getByLabelText } = render(<Techlist />);
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
});