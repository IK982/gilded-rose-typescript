interface Item {
    name: string;
    quality: number;
    sellIn: number;
}

const isLegendary = (item: Item): boolean => {
    return item.name === 'Sulfuras, Hand of Ragnaros';
}

const isAgedBrie = (item: Item): boolean => {
    return item.name === 'Aged Brie';
}

const isBackstagePass = (item: Item): boolean => {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
}

const getUpdatedSellIn = (item: Item): number => {
    if (isLegendary(item)) {
        return item.sellIn;
    }
    return item.sellIn - 1;
}

const isRegularItem = (item: Item): boolean => {
    return !isLegendary(item) && !isAgedBrie(item) && !isBackstagePass(item)
}

const getUpdatedRegularItemQuality = (item: Item): number => {
    if (item.quality > 0) {
        return item.quality - 1;
    }
    return 0;
}

const getUpdatedQuality = (item: Item): number => {
    if (isRegularItem(item)) {
        return getUpdatedRegularItemQuality(item);
    }
    
    if (isLegendary(item)) {
        return item.quality;
    }
    
    if (item.quality < 50) {
        item.quality = item.quality + 1;
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11) {
                if (item.quality < 50) {
                    item.quality = item.quality + 1;
                }
            }
            if (item.sellIn < 6) {
                if (item.quality < 50) {
                    item.quality = item.quality + 1;
                }
            }
        }
    }
    return item.quality;
}

export const updateQuality = (items: Item[]): Item[] => {
    items.forEach((item: Item) => {
        item.quality = getUpdatedQuality(item);
        item.sellIn = getUpdatedSellIn(item);
        if (item.sellIn < 0) {
            if (item.name != 'Aged Brie') {
                if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
                    if (item.quality > 0) {
                        if (item.name != 'Sulfuras, Hand of Ragnaros') {
                            item.quality = item.quality - 1;
                        }
                    }
                } else {
                    item.quality = item.quality - item.quality;
                }
            } else {
                if (item.quality < 50) {
                    item.quality = item.quality + 1;
                }
            }
        }
    });

    return items;
}