import {Action} from 'redux';

const SHOW_TOAST = 'SHOW_TOAST';
const HIDE_TOAST = 'HIDE_TOAST';

interface ShowToastAction extends Action {
  message: string;
}

export const showToast = (message: string): ShowToastAction => ({
  type: SHOW_TOAST,
  message,
});

export const hideToast = (): Action => ({type: HIDE_TOAST});

export type ToastsState = string[];

export const toastsReducer = (state: string[] = [], action: Action) => {
  switch (action.type) {
    case SHOW_TOAST: {
      const {message} = action as ShowToastAction;
      return [...state, message];
    }
    case HIDE_TOAST: {
      return state.slice(1);
    }
    default:
      return state;
  }
};
