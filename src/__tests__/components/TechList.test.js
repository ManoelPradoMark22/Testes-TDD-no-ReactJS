import React from 'react';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';

import Techlist from '~/components/TechList';

jest.mock('react-redux');

describe('Techlist component', () => {
  /*testar se, dado um estado do meu redux, está ou não renderizando a lista corretamente!
  quando o componente chamar o useSelector, vai retornar o array de techs no local
  como se fosse um estado do redux! E sem as configurações do redux!*/
  it('should render tech list', () => {
    /*estamos dando ao useSelector uma nova funcionalidade atraves do mock */
    useSelector.mockImplementation(cb => cb({
      techs: ['Node.js', 'ReactJS']
    }));

    const { getByTestId, getByText, debug } = render(<Techlist />);

    debug();

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));
  });
});