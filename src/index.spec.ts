import {expect} from 'chai';

import {group} from './';

describe('group', () => {
  interface Person {
    name: string;
    house: House;
  }

  interface House {
    name: string;
  }

  const judgement: House = {name: 'judgement'};
  const exile: House = {name: 'exile'};
  const devils: House = {name: 'devils'};
  const winter: House = {name: 'winter'};
  const wolves: House = {name: 'wolves'};

  const vosik = {name: 'Vosik', house: devils};
  const taniks = {name: 'Taniks', house: exile};
  const variks = {name: 'Variks', house: judgement};
  const aksis = {name: 'Aksis', house: devils};
  const draksis = {name: 'Draksis', house: winter};
  const aksor = {name: 'Aksor', house: winter};
  const skolas = {name: 'Skolas', house: wolves};
  const kovik = {name: 'Kovik', house: devils};
  const keksis = {name: 'Keksis', house: exile};
  const riksis = {name: 'Riksis', house: devils};

  const people: Person[] = [
    vosik, taniks, variks, aksis, draksis, aksor, skolas, kovik, keksis, riksis,
  ];

  const grouping = group(
    people,
    person => person.house,
    house => house.name,
  );

  it('preserves `items`', () => {
    expect(grouping.items).to.eql(people);
  });

  it('builds `labels` in order of `items`', () => {
    expect(grouping.labels).to.eql([
      devils, exile, judgement, winter, wolves,
    ]);
  });

  it('builds `keyToItems` buckets', () => {
    expect(grouping.keyToItems).to.eql({
      devils: [vosik, aksis, kovik, riksis],
      exile: [taniks, keksis],
      judgement: [variks],
      winter: [draksis, aksor],
      wolves: [skolas],
    });
  });

  it('builds a `keyToLabel` map', () => {
    expect(grouping.keyToLabel).to.eql({
      devils, exile, judgement, winter, wolves,
    });
  });
});
