class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items) {
    this.items = items;
  }

  getQuality(item) {
    switch (item.name) {
      case 'Aged Brie':
        return item.sellIn < 0 ? 2 : 1;
      case 'Backstage passes to a TAFKAL80ETC concert':
        if (item.sellIn < 0) return -999;
        if (item.sellIn <= 5) return 3;
        if (item.sellIn <= 10) return 2;
        return 1;
      case 'Sulfuras, Hand of Ragnaros':
        return 0;
      default:
        return item.sellIn < 0 ? -2 : -1;
    }
  }

  getSellIn(item) {
    switch (item.name) {
      case 'Sulfuras, Hand of Ragnaros':
        return 0;
      default:
        return -1;
    }
  }

  isLocked(item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  isConjured(item) {
    return item.name.toLowerCase().includes('conjured');
  }

  updateStockValues(item) {
    item.sellIn += this.getSellIn(item);
    item.quality += this.getQuality(item) * (this.isConjured(item) ? 2 : 1);

    if (this.isLocked(item) === false) {
      if (item.quality < 0) item.quality = 0;
      if (item.quality > 50) item.quality = 50;
    }

    return item;
  }

  updateQuality() {
    this.items = this.items.map((item) => this.updateStockValues(item));
    return this.items;
  }
}

export { Item, Shop };
