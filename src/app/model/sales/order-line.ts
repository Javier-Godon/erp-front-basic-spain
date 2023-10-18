export class OrderLine {
    constructor(
        public orderLineId: string,
        public orderId: string,
        public itemId: string,
        public uniqueIdentifierId: string,
        public warehouseId: string,
        public retailPrice: number,
        public currencyId: string,
        public units: number,
        public unitsOfMeasure: string
    ) { }
}

