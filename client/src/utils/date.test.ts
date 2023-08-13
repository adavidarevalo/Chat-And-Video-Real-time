import { dateHandler } from './date';

describe('dateHandler', () => {
  it('should return "Now" for a few seconds ago', () => {
    expect(dateHandler(new Date().toISOString())).toBe('Now');
  });

  it('should return "1 min" for a minute ago', () => {
    const now = new Date();
    const aMinuteAgo = new Date(now.getTime() - 60000).toISOString();
    expect(dateHandler(aMinuteAgo)).toBe('1 min');
  });

  it('should return formatted HH:mm for hours ago', () => {
    const now = new Date();
    const anHourAgo = new Date(now.getTime() - 3600000).toISOString();
    const anHourAgoResult = new Date(now.getTime() - 60 * 60 * 1000); // Resta una hora (3600000 milisegundos)

    const formattedTime = anHourAgoResult.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    expect(dateHandler(anHourAgo)).toBe(formattedTime);
  });
  it('should return "Yesterday" for a day ago', () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 86400000).toISOString();
    expect(dateHandler(yesterday)).toBe('Yesterday');
  });

  it('should return formatted day name for days ago', () => {
    const sixDaysAgo = new Date(1691887059174 - 518400000).toISOString();
    expect(dateHandler(sixDaysAgo)).toBe('Sunday');
  });
});
