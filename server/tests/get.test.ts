import { getCategory, getSubcategory } from '../services/get_information';
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

describe('getSubategory', () => {
  it('should return subcategories', async () => {
    const mockResolvedValue = [
      { id: 1, name: 'Horror' },
      { id: 2, name: 'Sci-Fi' },
      { id: 3, name: 'Comedy' },
    ];

    const queryDatabaseMock = jest.spyOn(db, 'queryDatabase');
    queryDatabaseMock.mockResolvedValue(mockResolvedValue);
    
    const result = await getSubcategory('1');

    expect(result).toEqual([
      { id: 1, name: 'Horror' },
      { id: 2, name: 'Sci-Fi' },
      { id: 3, name: 'Comedy' },
    ]);

    queryDatabaseMock.mockRestore();
  });

  it('should handle an error', async () => {
    const queryDatabaseMock = jest.spyOn(db, 'queryDatabase');

    queryDatabaseMock.mockRejectedValue(new Error('PostGreSQL Error'))

    await expect(getSubcategory('1')).rejects.toThrow('PostGreSQL Error');
  })
});

