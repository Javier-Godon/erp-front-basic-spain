export class ShipmentOrder {
    public constructor(
        public shipmentOrderId: string,
        public orderId: string, 
        public warehouseId: string,
        public receptionDate: string,
        public lastDeliveryDate: any,
        public cancellationDate: any
    ) { }
} 