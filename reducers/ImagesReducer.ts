import {Action, Dispatch} from 'redux';
import {api} from '../api/Api';
import {showToast} from './ToastsReducer';

interface Image {
  readonly id: string;
  readonly url: string;
}
interface ImagesPerCategory {
  readonly isLoading: boolean;
  readonly images?: Image[];
}

const FETCH_IMAGES = 'FETCH_IMAGES';
const IMAGES_FETCHED = 'IMAGES_FETCHED';

interface FetchImagesAction extends Action {
  categoryId: string;
}
interface ImagesFetchedAction extends Action {
  categoryId: string;
  images: Image[];
}

const fetchImages = (categoryId: string): FetchImagesAction => ({
  type: FETCH_IMAGES,
  categoryId,
});

const imagesFetched = (
  categoryId: string,
  images: Image[],
): ImagesFetchedAction => ({
  type: IMAGES_FETCHED,
  categoryId,
  images,
});

export const getImages = (categoryId: string, page: number) => async (
  dispatch: Dispatch,
) => {
  dispatch(fetchImages(categoryId));
  try {
    const response = await api.fetchImages(categoryId, page);
    const images: Image[] = await response.json();
    dispatch(imagesFetched(categoryId, images));
  } catch (error) {
    dispatch(showToast('Network error: Could not load more images.'));
  }
};

export type ImagesState = {
  [id: string]: ImagesPerCategory | undefined;
};

const initialState: ImagesState = {};

export const imagesReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_IMAGES: {
      const {categoryId} = action as FetchImagesAction;
      return {
        ...state,
        [categoryId]: {
          ...state[categoryId],
          isLoading: true,
        },
      };
    }
    case IMAGES_FETCHED: {
      const {categoryId, images} = action as ImagesFetchedAction;
      const imagesForCategory = state[categoryId]?.images;
      return {
        ...state,
        [categoryId]: {
          isLoading: false,
          images: imagesForCategory
            ? [...imagesForCategory, ...images]
            : images,
        },
      };
    }
    default:
      return state;
  }
};
