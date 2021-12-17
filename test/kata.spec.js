import { Shop, Item } from '../src/originalCode';

it("Should return the expected results", () => {
    // Original items
    const storeItems = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)
    ];
    // Results that should be returned
    const expectedResult = [
      new Item("+5 Dexterity Vest", 9, 19),
      new Item("Aged Brie", 1, 1),
      new Item("Elixir of the Mongoose", 4, 6),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 14, 21)
    ];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it("Once the sell by date has passed, quality degrades twice as fast", () => {
    const storeItems = [new Item("+5 Dexterity Vest", 0, 4)];
    const expectedResult = [new Item("+5 Dexterity Vest", -1, 2)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it("The quality of an item is never negative", () => {
    const storeItems = [new Item("+5 Dexterity Vest", 10, 0)];
    const expectedResult = [new Item("+5 Dexterity Vest", 9, 0)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it("Aged Brie actually increases in Quality the older it gets", () => {
    const storeItems = [new Item("Aged Brie", 1, 0)];
    const expectedResult = [new Item("Aged Brie", 0, 1)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it("The quality of an item is never more than 50", () => {
    const storeItems = [new Item("Aged Brie", 1, 50)];
    const expectedResult = [new Item("Aged Brie", 0, 50)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it("Sulfuras never has to be sold or decreases in Quality", () => {
    const storeItems = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
    const expectedResult = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();
    
    expect(items).toStrictEqual(expectedResult);
  });