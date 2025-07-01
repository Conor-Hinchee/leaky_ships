import { flag } from 'flags/next';

export const testFlag = flag({
  key: 'test-flag',
  decide() {
    // Flag is off by default - change to 'return true;' to turn it on
    return true;
  },
});
