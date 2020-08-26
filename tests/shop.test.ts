import {updateQuality} from "../src/shop";

describe("The update item function", () => {
   describe("updates the sell in property", () => {
       it("keeping constant for legendary items", () => {
           // arrange
           const items = [
               { name: "Sulfuras, Hand of Ragnaros", sellIn: 10, quality: 20 },
           ];
           
           // act
           const updatedItems = updateQuality(items);
           
           // assert
           expect(updatedItems[0].sellIn).toBe(10);
       })
       
       it("decreases value by one for regular items", () => {
           const items = [{ name: "Regular Item", sellIn: 10, quality: 20 }];
           const updatedItems = updateQuality(items);
           expect(updatedItems[0].sellIn).toBe(9);
       })
       
       it("still decreases by one if negative", () => {
           const items = [{ name: "Regular Item", sellIn: 0, quality: 20 }];
           const updatedItems = updateQuality(items);
           expect(updatedItems[0].sellIn).toBe(-1);
       })
   })
    
    describe("updates the quality", () => {
        describe("of regular items", () => {
            it("by decreasing it by 1", () => {
                const items = [{ name: "Regular Item", sellIn: 10, quality: 20 }];
                const updatedItems = updateQuality(items);
                expect(updatedItems[0].quality).toBe(19);
            });

            it("doesn't decrease below zero", () => {
                const items = [{ name: "Regular Item", sellIn: 10, quality: 0 }];
                const updatedItems = updateQuality(items);
                expect(updatedItems[0].quality).toBe(0);
            });
        });
        
        describe("of legendary items", () => {
            it("doesn't change", () => {
                const items = [{ name: "Sulfuras, Hand of Ragnaros", sellIn: 10, quality: 20 }];
                const updatedItems = updateQuality(items);
                expect(updatedItems[0].quality).toBe(20);
            })
        })

        describe("of backstage passes", () => {
            it("by increasing it by 1 if sellIn is more than 11", () => {
                const items = [{name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 11, quality: 20}];
                const updatedItems = updateQuality(items);
                expect(updatedItems[0].quality).toBe(21);
            })

            it("by increasing it by 2 if 10 or less days before concert", () => {
                const items = [{ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 20}];
                const updatedItems = updateQuality(items);
                expect(updatedItems[0].quality).toBe(22);
            });
            it("by increasing it by 3 if 5 or less days before concert", () => {
                const items = [{ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 20}];
                const updatedItems = updateQuality(items);
                expect(updatedItems[0].quality).toBe(23);
            });

            it("the quality does not go above 50", () => {
                const items = [{ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 50}];
                const updatedItems = updateQuality(items);
                expect(updatedItems[0].quality).toBe(50);
            });

            it("the quality is 0 when it expires", () => {
                const items = [{ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 0, quality: 50}];
                const updatedItems = updateQuality(items);
                expect(updatedItems[0].quality).toBe(0);
            });

        })
        describe ("of Aged Brie", () => {
            it("by increasing the quality by 1 up to 50", () => {
                const items = [{name: "Aged Brie", sellIn: 20, quality: 20}];
                const updatedItems = updateQuality(items);
                expect(updatedItems[0].quality).toBe(21);
            });

            it("quality does not go above 50", () => {
                const items = [{name: "Aged Brie", sellIn: 20, quality: 50}];
                const updatedItems = updateQuality(items);
                expect(updatedItems[0].quality).toBe(50);
            });

            it("if expired add 2 up to 50", () => {
                const items = [{name: "Aged Brie", sellIn: 0, quality: 20}];
                const updatedItems = updateQuality(items);
                expect(updatedItems[0].quality).toBe(22);
            });

        })

    })

});