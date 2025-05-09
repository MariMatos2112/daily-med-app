const name = 'Aspirin';
const id = 'abc123';

const dailyMedResults = {
  data: {
    data: [
      {
        setid: id,
        title: name,
        published_date: '2023-01-01',
        spl_version: 1,
      },
    ],
  },
};

const searchResult = [{ id, title: name }];
const newDrug = searchResult[0];
const drug = { id, name };

export const Mocked = {
  id,
  name,
  newDrug,
  drug,
  searchResult,
  dailyMedResults,
};

export const mockDrugRepository = {
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};
