import App from '../App';

describe('App', () => {
  it('starts with out crashing', () => {
    expect(App()).not.toBeNull();
  });
});
