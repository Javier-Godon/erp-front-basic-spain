export class PersonAddress {
    constructor(
        public addressId: string,
        public countryId: string,
        public administrativeArea: string,
        public administrativeAreaIso: string,
        public locality: string,
        public dependentLocality: string,
        public postalCode: string,
        public street: string,
        public streetNumber: Number,
        public streetType: string,
        public premise: string,
        public subPremise: string,
        public department: string,
        public floor: string,
        public letter: string,
        public stairs: string,
        public decimalDegreesLatitude: string,
        public decimalDegreesLongitude: string
    ){}
}