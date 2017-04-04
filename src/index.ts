
export interface ItemBuckets<Item> { [key: string]: Item[]; }

export interface LabelMap<Label> { [key: string]: Label; }

export interface Grouping<Item, Label> {
  items: Item[];
  labels: Label[];
  keyToItems: ItemBuckets<Item>;
  keyToLabel: LabelMap<Label>;
}

export function group<Item, Label>(
  items: Item[],
  by: (item: Item) => Label,
  on: (label: Label) => string,
): Grouping<Item, Label> {
  const labels: Label[] = [];
  const keyToItems: ItemBuckets<Item> = {};
  const keyToLabel: LabelMap<Label> = {};

  for (const item of items) {
    const label = by(item);
    const key = on(label);

    if (!(key in keyToLabel)) {
      keyToLabel[key] = label;
      labels.push(label);
    }

    if (!(key in keyToItems)) {
      keyToItems[key] = [];
    }

    keyToItems[key].push(item);
  }

  return {items, labels, keyToItems, keyToLabel};
}
