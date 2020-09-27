import {Action, Dispatch} from 'redux';
import {api} from '../api/Api';
import {showToast} from './ToastsReducer';

const START_FETCH_CATEGORIES = 'START_FETCH_CATEGORIES';
const CATEGORIES_FETCHED = 'CATEGORIES_FETCHED';

interface Category {
  readonly id: string;
  readonly name: string;
}

interface CategoriesFetchedAction extends Action {
  categories: Category[];
}

const startFetchCategories = (): Action => ({type: START_FETCH_CATEGORIES});
const categoriesFetched = (
  categories: Category[],
): CategoriesFetchedAction => ({
  type: CATEGORIES_FETCHED,
  categories: categories,
});

export const fetchCategories = () => async (dispatch: Dispatch) => {
  dispatch(startFetchCategories());
  try {
    const response = await api.fetchCategories();
    const categories = await response.json();
    dispatch(categoriesFetched(categories));
  } catch (error) {
    dispatch(showToast('Network error: Could not load categories.'));
  }
};

export interface CategoriesState {
  readonly isLoading: boolean;
  readonly categories: Category[];
}

const initialState: CategoriesState = {
  isLoading: false,
  categories: [],
};

export const categoriesReducer = (
  state = initialState,
  action: Action,
): CategoriesState => {
  switch (action.type) {
    case START_FETCH_CATEGORIES:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_FETCHED: {
      const {categories} = action as CategoriesFetchedAction;
      return {
        ...state,
        isLoading: false,
        categories: categories.map((category) => ({
          ...category,
          name: category.name.toUpperCase(),
        })),
      };
    }
    default:
      return state;
  }
};
