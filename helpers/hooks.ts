import {useSelector as reduxUseSelector} from 'react-redux';

import {StoreState} from '../reducers/Store';

export const useSelector = <T>(selector: (state: StoreState) => T): T =>
  reduxUseSelector(selector);
