export class PersonEmailAddress {
    constructor(
        public emailAddressId: string,
        public personId: string,
        public emailAddress: string,
        public notes: string
    ) { }
}