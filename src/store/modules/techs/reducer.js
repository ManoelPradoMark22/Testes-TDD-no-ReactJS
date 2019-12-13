import produce from 'immer';

export const INITIAL_STATE = [];

export default function techs(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_TECH':
        //o draft é um array
        draft.push(action.payload.tech);
        break;
      default: 
    }
  });
}