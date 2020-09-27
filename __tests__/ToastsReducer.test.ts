import {hideToast, showToast, toastsReducer} from '../reducers/ToastsReducer';

describe('action creators', () => {
  it('should create show toast action', () => {
    expect(showToast('test message')).toEqual({
      type: 'SHOW_TOAST',
      message: 'test message',
    });
  });

  it('should create hide toast action', () => {
    expect(hideToast()).toEqual({type: 'HIDE_TOAST'});
  });
});

describe('reducer', () => {
  it('should correctly initialize the state', () => {
    expect(toastsReducer(undefined, {type: ''})).toEqual([]);
  });

  it('should handle add toast action', () => {
    expect(
      toastsReducer([], {type: 'SHOW_TOAST', message: 'test message'}),
    ).toEqual(['test message']);

    expect(
      toastsReducer(['test message'], {
        type: 'SHOW_TOAST',
        message: 'another message',
      }),
    ).toEqual(['test message', 'another message']);
  });

  it('should handle hide toast action', () => {
    expect(
      toastsReducer(['test message', 'another message'], {type: 'HIDE_TOAST'}),
    ).toEqual(['another message']);
  });
});
