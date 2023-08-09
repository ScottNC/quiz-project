import { getCategory } from '../services/get_information';
import * as db from '../db';

jest.mock('../db');

describe('getCategory', () => {
  it('should return categories', async () => {
    const mockResolvedValue = [
      { id: 1, name: 'Film' },
      { id: 2, name: 'Science' },
      { id: 3, name: 'Geography' },
    ];

    const queryDatabaseMock = jest.spyOn(db, 'queryDatabase');
    queryDatabaseMock.mockResolvedValue(mockResolvedValue);
    
    const result = await getCategory();

    expect(result).toEqual([
      { id: 1, name: 'Film' },
      { id: 2, name: 'Science' },
      { id: 3, name: 'Geography' },
    ]);

    queryDatabaseMock.mockRestore();
  });

  it('should handle an error', async () => {
    const queryDatabaseMock = jest.spyOn(db, 'queryDatabase');

    queryDatabaseMock.mockRejectedValue(new Error('PostGreSQL Error'))

    await expect(getCategory()).rejects.toThrow('PostGreSQL Error');
  })
});
