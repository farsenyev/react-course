import { downloadCsv, convertToCsv } from '../app/csv/CsvCreate';
import { IPeople } from '../app/interfaces/people.interface';

const people: IPeople = {
  id: '1',
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  eye_color: 'blue',
  films: ['some-url'],
  gender: 'male',
  hair_color: 'blond',
  height: '172',
  homeworld: 'some-url',
  mass: '77',
  skin_color: 'fair',
  created: 'some-date',
  edited: 'some-date',
  species: ['some-url'],
  starships: ['some-url'],
  url: 'some-url',
  vehicles: ['some-url'],
};

describe('CSV Creation Tests', () => {
  it('converts data to CSV format correctly', () => {
    const testData = [people];
    const csv = convertToCsv(testData);
    expect(csv).toContain(
      'id;name;birth_year;eye_color;films;gender;hair_color;height;homeworld;mass;skin_color;created;edited;species;starships;url;vehicles',
    );
    expect(csv).toContain(
      '"1";"Luke Skywalker";"19BBY";"blue";"some-url";"male";"blond";"172";"some-url";"77";"fair";"some-date";"some-date";"some-url";"some-url";"some-url";"some-url"',
    );
  });

  it('downloads CSV file', () => {
    const testData = [people];
    const blob = downloadCsv(testData);
    expect(blob.type).toBe('text/csv;charset=utf-8;');
  });
});
