import { serverUser } from './server-user';

describe('serverUser', () => {
  it('should work', () => {
    expect(serverUser()).toEqual('server-user');
  });
});
