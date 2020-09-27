import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import styled from 'styled-components/native';
import {Color} from '../helpers/Color';
import {useSelector} from '../helpers/hooks';
import {useDispatch} from 'react-redux';
import {hideToast} from '../reducers/ToastsReducer';

const Container = styled(View)`
  flex-direction: row;
  position: absolute;
  bottom: 100px;
  width: 100%;
  height: 64px;
`;

const ToastContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  margin-horizontal: 24px;
  background-color: ${Color.Blue};
  border-radius: 12px;
  padding-horizontal: 16px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${Color.White};
`;

const Message = styled(Text)`
  flex-shrink: 1;
  color: ${Color.White};
  font-size: 18px;
`;

const CloseButton = styled(TouchableHighlight)`
  width: 50px;
  height: 20px;
  background-color: ${Color.White};
  border-radius: 10px;
  margin-left: 8px;
  align-items: center;
  justify-content: center;
`;

const CloseTitle = styled(Text)`
  font-size: 14px;
  color: ${Color.Blue};
`;

export const ToastHandler: React.FC = () => {
  const toasts = useSelector((state) => state.toastsState);
  const dispatch = useDispatch();

  if (!toasts.length) {
    return null;
  }
  const closeToast = () => dispatch(hideToast());

  return (
    <Container>
      <ToastContainer>
        <Message numberOfLines={2}>{toasts[0]}</Message>
        <CloseButton onPress={closeToast} underlayColor={Color.LightGray}>
          <CloseTitle>Close</CloseTitle>
        </CloseButton>
      </ToastContainer>
    </Container>
  );
};
