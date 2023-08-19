import { bytesToMB } from './bytes_to_mb';

describe('bytesToMB', () => {
  it('convert bytes to MB correctly', () => {
    expect(bytesToMB(1048576)).toBe('1.00');
    expect(bytesToMB(2097152)).toBe('2.00');
    expect(bytesToMB(3145728)).toBe('3.00');
    expect(bytesToMB(1572864)).toBe('1.50');
  });

  it('Handle decimals correctly', () => {
    expect(bytesToMB(536870912)).toBe('512.00');
    expect(bytesToMB(1073741824)).toBe('1024.00');
  });

  it('correctly handle zero value', () => {
    expect(bytesToMB(0)).toBe('0.00');
  });
});
