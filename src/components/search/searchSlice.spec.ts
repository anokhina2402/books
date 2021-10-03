import searchReducer, {
  SearchState,
} from './searchSlice';

describe('search reducer', () => {
  const initialState: SearchState = {
    q: "",
    category: "all",
    sort: "relevance",
    startIndex: 0,
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(searchReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

});
