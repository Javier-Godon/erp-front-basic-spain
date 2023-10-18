export class ShipmentOrderLine {
    public constructor(
        public shipmentOrderLineId: string,
        public shipmentOrderId: String, //Falta en los modelos
        public itemId: string,
        public uniqueIdentifier: string,
        public requestedUnits: number,
        public shippedUnits: number,
        public unitsOfMeasure: string,
        public lineClosed: boolean,
        public discrepancyReason: string,
        public notes: string,
        public personId: string
    ) { }
} 