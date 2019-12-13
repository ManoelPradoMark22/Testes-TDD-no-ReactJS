import { runSaga } from 'redux-saga';
import { getTechsSuccess } from '~/store/modules/techs/actions';
import { getTechs } from '~/store/modules/techs/sagas';

describe('Techs saga', () => {
  it ('should be able to fetch techs', async () => {
    const dispatch = jest.fn();

    /* ao passar os seguintes métodos em options (primeiro param) no runSaga, 
    podemos sobreescrevê-los:
    - dispatch-> SIMULA O PUT! 
    toda vez que o saga chamar o método put, vai disparar o 
    dispatch acima que sobreescrevemos, ao invés do próprio put do saga! 
    O que possibilita verificarmos se o método foi chamado, ao fazermos o expect
    - getState-> SIMULA O SELECT!
    toda vez que tivermos, dentro do saga, uma operação, por exemplo,
    yield select ...(p/ selecionar algo do estado), esse mét getState, ao preencher
    aqui nos options do runSaga, podemos sobreescrever o que ele vai retornar
    - entre outros......*/
    /*passamos o saga como segundo param.
    como o nosso saga é um generator, iremos transformá-lo em uma promisse usando
    o mét toPromisse(), para somente executar isso quando o saga terminar
    de executar por competo*/
    await runSaga({ dispatch }, getTechs).toPromise();

    /*esperamos que quando o saga chamar (qnd ele for disparado, depois de ele 
      finalizar), a minha action getTechsSuccess tenha sido chamada com o array
      contendo 'Node.js'*/
    expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(['Node.js']));
  });
});