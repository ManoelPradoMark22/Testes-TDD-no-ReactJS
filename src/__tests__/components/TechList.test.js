import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// render p/ criar o html fake
// fireEvent podemos escolher um evento especifico para testar

import Techlist from '~/components/TechList';

describe('Techlist component', () => {
  it('should be able to add new tech', () => {
    const { getByText, getByTestId, debug } = render(<Techlist />);

    debug();

    /*getByText vai no componente com o texto em questão! */
    fireEvent.click(getByText('Adicionar'));

    debug();

    /*assim não fica tao bom, pq vai procurar pór qualquer texto do tipo,
    mesmo se nao for um item da nossa lista! 
    expect(getByText('Node.js')).toBeTruthy(); 
    
    entao por isso vamos usar tambem o getByTestId para pegarmos os elementos
    que tenham o id data-testid="tech-list", assim teremos certeza que estamos verificando apenas
    os elementos da nossa lista!*/
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    /*tradução: eu espero, que a minha lista 'tech-list' tenha um elemento que
    esteja escrito 'Node.js' */
  });
});