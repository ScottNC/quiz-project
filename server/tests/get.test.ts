import { getCategory } from '../services/get_information';
import * as db from '../db'; // Import the entire module for mocking

jest.mock('../db');

describe('getCategory', () => {
  it('should return categories', async () => {
    const mockResolvedValue = [
      { id: 1, name: 'Film' },
      { id: 2, name: 'Science' },
      { id: 3, name: 'Geography' },
    ];

    // Mock the queryDatabase function using jest.spyOn
    const queryDatabaseMock = jest.spyOn(db, 'queryDatabase');
    queryDatabaseMock.mockResolvedValue(mockResolvedValue);
    
    const result = await getCategory();

    expect(result).toEqual([
      { id: 1, name: 'Film' },
      { id: 2, name: 'Science' },
      { id: 3, name: 'Geography' },
    ]);

    // Restore the original implementation of queryDatabase after the test
    queryDatabaseMock.mockRestore();
  });
});
