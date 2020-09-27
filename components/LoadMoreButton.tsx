import React from 'react';
import {View, TouchableHighlight, Text} from 'react-native';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import {Color} from '../helpers/Color';

const Container = styled(View)`
  width: 100%;
  padding-horizontal: 16px;
  padding-vertical: 4px;
  background-color: ${Color.White};

  shadow-color: ${Color.Black};
  shadow-offset: 0px -2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 4;
`;

const Button = styled(TouchableHighlight)`
  width: 100%;
  height: 44px;
  background-color: ${Color.BlueLight};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const Title = styled(Text)`
  font-size: 20px;
  color: ${Color.White};
`;

interface LoadMoreButtonProps {
  isLoading: boolean;
  onPress: () => void;
}

const noop = () => {};

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = (props) => (
  <Container>
    <Button
      onPress={!props.isLoading ? props.onPress : noop}
      underlayColor={Color.Blue}>
      {props.isLoading ? (
        <ActivityIndicator color={Color.White} />
      ) : (
        <Title>Load more</Title>
      )}
    </Button>
  </Container>
);
