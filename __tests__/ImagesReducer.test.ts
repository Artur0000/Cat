import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {getImages, imagesReducer} from '../reducers/ImagesReducer';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => fetchMock.restore());
  it('should create get images async action', async () => {
    fetchMock.mock(
      'https://api.thecatapi.com/v1/images/search?category_ids=5&limit=10&page=0',
      {
        body: [
          {
            id: 'SMuZx-bFM',
            url: 'https://cdn2.thecatapi.com/images/SMuZx-bFM.jpg',
          },
        ],
      },
    );
    const expectedActions = [
      {
        type: 'FETCH_IMAGES',
        categoryId: '5',
      },
      {
        type: 'IMAGES_FETCHED',
        categoryId: '5',
        images: [
          {
            id: 'SMuZx-bFM',
            url: 'https://cdn2.thecatapi.com/images/SMuZx-bFM.jpg',
          },
        ],
      },
    ];
    const store = mockStore([]);
    await store.dispatch(getImages('5', 0));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('reducer', () => {
  it('should correctly initialize the state', () => {
    expect(imagesReducer(undefined, {type: ''})).toEqual({});
  });

  it('should handle fetch images action', () => {
    expect(imagesReducer({}, {type: 'FETCH_IMAGES', categoryId: '5'})).toEqual({
      '5': {
        isLoading: true,
      },
    });
  });

  it('should handle images fetched action', () => {
    expect(
      imagesReducer(
        {
          '5': {
            isLoading: true,
          },
        },
        {
          type: 'IMAGES_FETCHED',
          categoryId: '5',
          images: [
            {
              id: 'SMuZx-bFM',
              url: 'https://cdn2.thecatapi.com/images/SMuZx-bFM.jpg',
            },
          ],
        },
      ),
    ).toEqual({
      '5': {
        isLoading: false,
        images: [
          {
            id: 'SMuZx-bFM',
            url: 'https://cdn2.thecatapi.com/images/SMuZx-bFM.jpg',
          },
        ],
      },
    });
  });
});
