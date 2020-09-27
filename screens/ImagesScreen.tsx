import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {FlatList, SafeAreaView} from 'react-native';
import {getImages} from '../reducers/ImagesReducer';
import {useSelector} from '../helpers/hooks';
import {ImageLoader} from '../components/ImageLoader';
import {LoadMoreButton} from '../components/LoadMoreButton';

export const ImagesScreen: React.FC = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const categories = useSelector((state) => state.categoriesState.categories);
  const categoryId = categories.find((category) => category.name === route.name)
    ?.id;
  const currentImagesState = useSelector((state) =>
    categoryId ? state.imagesState[categoryId] : undefined,
  );

  const isLoading = currentImagesState?.isLoading ?? false;
  const images = currentImagesState?.images ?? [];
  const imagesLength = images?.length ?? 0;

  useEffect(() => {
    loadImagesNextPage();
  }, []);

  const loadImagesNextPage = () => {
    if (categoryId) {
      dispatch(getImages(categoryId, imagesLength));
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={images}
        renderItem={({item}) => <ImageLoader url={item.url} />}
        keyExtractor={(item, index) => `${item.id}_${index}`}
      />
      <LoadMoreButton isLoading={isLoading} onPress={loadImagesNextPage} />
    </SafeAreaView>
  );
};
