export class Price {
    constructor(
        public currencyIso3: string,
        public wholePrice: number,
        public decimalPrice: number
    ){}
}