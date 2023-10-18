export class DeliveryLine {
    public constructor(
        deliveryLineId: string,
        deliveryId: string,
        itemId: string,
        uniqueIdentifier: string,
        deliveredUnits: number,
        unitsOfMeasure: string,
        lineClosed: boolean,
        retailPrice: number,
        currency: string
    ) { }
}