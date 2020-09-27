import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from '../helpers/hooks';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {ImagesScreen} from './ImagesScreen';
import {LoadingScreen} from './LoadingScreen';
import {fetchCategories} from '../reducers/CategoriesReducer';
import {Color} from '../helpers/Color';

const StackNavigation = createStackNavigator();
const DrawerNavigation = createDrawerNavigator();

export const DrawerNavigationScreen: React.FC = () => {
  const isLoadingCategories = useSelector(
    (state) => state.categoriesState.isLoading,
  );
  const categories = useSelector((state) => state.categoriesState.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  if (isLoadingCategories) {
    return <LoadingScreen />;
  }
  return categories.length > 0 ? (
    <DrawerNavigation.Navigator
      initialRouteName={categories[0].name}
      drawerContentOptions={{
        activeBackgroundColor: Color.BlueLight,
        activeTintColor: Color.LightGray,
      }}>
      {categories.sort().map((category) => (
        <DrawerNavigation.Screen
          key={category.id}
          name={category.name}
          component={ScreenStack(ImagesScreen, category.name)}
        />
      ))}
    </DrawerNavigation.Navigator>
  ) : null;
};

const ScreenStack = <T extends object>(
  Component: React.ComponentType<T>,
  name: string,
) => () => (
  <StackNavigation.Navigator>
    <StackNavigation.Screen
      name={name}
      component={Component}
      options={() => ({
        title: name,
        headerTintColor: Color.BlueLight,
      })}
    />
  </StackNavigation.Navigator>
);
