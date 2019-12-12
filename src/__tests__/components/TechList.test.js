import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import { addTech } from '~/store/modules/techs/actions';
import Techlist from '~/components/TechList';

jest.mock('react-redux');

describe('Techlist component', () => {
  /*testar se, dado um estado do meu redux, está ou não renderizando a lista corretamente!
  quando o componente chamar o useSelector, vai retornar o array de techs no local
  como se fosse um estado do redux! E sem as configurações do redux!
  Só precisamos testar se a action foi disparada, e isso é tudo o que o componente
  precisa testar! não precisamos testar, por exemplo, se a action vai fazer alguma alteração
  no reducer etc . Isso vai ser responsabilidade dos testes que faremos dentro dos reducers*/

  it('should render tech list', () => {
    /*estamos dando ao useSelector uma nova funcionalidade atraves do mock */
    useSelector.mockImplementation(cb => cb({
      techs: ['Node.js', 'ReactJS']
    }));

    const { getByTestId, getByText } = render(<Techlist />);

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));
  });

  it('should be able to add new tech', () => {
    const { getByTestId, getByLabelText } = render(<Techlist />);

    const dispatch = jest.fn(); //uma função do jest "MOCKADA"!

    /*toda vez que o useDispatch for chamado, vamos alterar o retorno q ele vai 
    dar pra gente, ou seja, queremos que retorne a função dispatch que criamos acima.
    então poderemos monitorar essa função dispatch no expect adiante*/
    useDispatch.mockReturnValue(dispatch);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } }); 
    fireEvent.submit(getByTestId('tech-form'));

    console.log(dispatch.mock.calls);

    /*esperamos que o dispatch seja chamado com o conteúdo em questão */
    expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'));
  });
});