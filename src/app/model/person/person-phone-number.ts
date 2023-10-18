export class PersonPhoneNumber {
    constructor(
        public phoneNumberId: string,
        public personId: string,
        public phoneNumber: string,
        public notes: string
    ) { }
}