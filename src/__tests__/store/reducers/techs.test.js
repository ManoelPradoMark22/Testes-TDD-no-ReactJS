import reducer, { INITIAL_STATE } from '~/store/modules/techs/reducer';
import * as Techs from '~/store/modules/techs/actions'; //importar todas as actions

describe('Techs reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  /*should be able to add new techs
  aqui no teste de reducers podemos colocar o type da action diretamente como
  o nome do teste.
  Lembre-se que o nosso reducer é uma função que recebe um estado, uma action e 
  devolve um estado alterado! então é isso que iremos testar!
  Dai para cada action que o reducer OUVIR, criamos um novo teste aqui!
  toda action que gera uma alteração no reducer, precisa vir aqui no teste tb
  ou seja, praticamente toda action gera um teste.*/
  it('ADD_TECH', () => {
    const state = reducer(INITIAL_STATE, Techs.addTech('Node.js'));

    /*esperamos que o nosso state seja estritamente igual a um array contendo 'Node.js'*/
    expect(state).toStrictEqual(['Node.js']);
  });
});