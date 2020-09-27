import React, {useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import styled from 'styled-components';
import {Color} from '../helpers/Color';

const Container = styled(View)`
  width: 100%;
  height: 300px;
  margin-bottom: 4px;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const LoadingIndicator = styled(ActivityIndicator)`
  position: absolute;
`;

interface ImageLoaderProps {
  url: string;
}

export const ImageLoader: React.FC<ImageLoaderProps> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const onLoad = () => setIsLoading(false);

  return (
    <Container>
      <StyledImage source={{uri: props.url}} onLoad={onLoad} />
      {isLoading ? <LoadingIndicator color={Color.Blue} /> : null}
    </Container>
  );
};
