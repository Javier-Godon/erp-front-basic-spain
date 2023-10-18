export class Person {
    constructor(
        public personId: string,
        public isCompany: Boolean,
        public idCardNumber: string,
        public idCardNumberSecondPart: string,
        public nationalInsuranceNumber: string,
        public nationalInsuranceNumberSecondPart: string,
        public taxRegistrationNumber: string,
        public taxRegistrationNumberSecondPart: string,
        public nameLine: string,
        public firstName: string,
        public middleName: string,
        public lastName: string,
        public fathersName: string,
        public mothersName: string,
        public dateOfBirth: any,//date
        public organisationName: string,
        public addressBirth: string,//idAddressBirth
        public currentAddress: string,//idCurrentAddress

    ) { }
}