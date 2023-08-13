import { bytesToMB } from './bytes_to_mb';

describe('bytesToMB function', () => {
  it('converts bytes to megabytes correctly', () => {
    expect(bytesToMB(1048576)).toBe(1);
    expect(bytesToMB(2097152)).toBe(2);
    expect(bytesToMB(524288)).toBe(0.5);
  });
});
