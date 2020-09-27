import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {Color} from '../helpers/Color';

const FullScreenSafeAreaView = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  justify-content: center;
`;

export const LoadingScreen: React.FC = () => (
  <FullScreenSafeAreaView>
    <ActivityIndicator size="large" color={Color.Blue} />
  </FullScreenSafeAreaView>
);
