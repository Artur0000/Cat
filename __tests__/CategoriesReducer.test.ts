import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  categoriesReducer,
  fetchCategories,
} from '../reducers/CategoriesReducer';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => fetchMock.restore());

  it('should create fetch categories async action', async () => {
    fetchMock.mock('https://api.thecatapi.com/v1/categories', {
      body: [
        {id: 1, name: 'boxes'},
        {id: 2, name: 'clothes'},
      ],
    });

    const expectedActions = [
      {type: 'START_FETCH_CATEGORIES'},
      {
        type: 'CATEGORIES_FETCHED',
        categories: [
          {id: 1, name: 'boxes'},
          {id: 2, name: 'clothes'},
        ],
      },
    ];

    const store = mockStore([]);

    await store.dispatch(fetchCategories());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('reducer', () => {
  const initialState = {
    isLoading: false,
    categories: [],
  };

  it('should correctly initialize the state', () => {
    expect(categoriesReducer(undefined, {type: ''})).toEqual(initialState);
  });

  it('should handle start fetch categories', () => {
    expect(
      categoriesReducer(initialState, {type: 'START_FETCH_CATEGORIES'}),
    ).toEqual({
      isLoading: true,
      categories: [],
    });
  });

  it('should handle categories fetched', () => {
    expect(
      categoriesReducer(
        {
          isLoading: true,
          categories: [],
        },
        {
          type: 'CATEGORIES_FETCHED',
          categories: [
            {id: 1, name: 'boxes'},
            {id: 2, name: 'clothes'},
          ],
        },
      ),
    ).toEqual({
      isLoading: false,
      categories: [
        {id: 1, name: 'BOXES'},
        {id: 2, name: 'CLOTHES'},
      ],
    });
  });
});
