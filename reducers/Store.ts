import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {categoriesReducer, CategoriesState} from './CategoriesReducer';
import {imagesReducer, ImagesState} from './ImagesReducer';
import {toastsReducer, ToastsState} from './ToastsReducer';

export interface StoreState {
  readonly categoriesState: CategoriesState;
  readonly imagesState: ImagesState;
  readonly toastsState: ToastsState;
}

export const rootReducer = combineReducers({
  categoriesState: categoriesReducer,
  imagesState: imagesReducer,
  toastsState: toastsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
