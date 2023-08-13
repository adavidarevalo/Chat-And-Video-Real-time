import { getFileType } from './file';

describe('getFileType', () => {
  it('should return "TXT" for "text/plain"', () => {
    expect(getFileType('text/plain')).toBe('TXT');
  });

  it('should return "PDF" for "application/pdf"', () => {
    expect(getFileType('application/pdf')).toBe('PDF');
  });

  it('should return "DOCX" for "application/vnd.openxmlformats-officedocument.wordprocessingml.document"', () => {
    expect(getFileType('application/vnd.openxmlformats-officedocument.wordprocessingml.document')).toBe('DOCX');
  });

  it('should return "IMAGE" for unknown type', () => {
    expect(getFileType('unknown/type')).toBe('IMAGE');
  });
});
