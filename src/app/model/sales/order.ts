export class Order {
    constructor(
        public orderId: string,
        public clientId: string,
        public dateOfOrder: any,//date,
        public personId: string
    ) { }
} 