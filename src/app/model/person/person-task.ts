export class PersonTask {
    constructor(
        public personTaskId: String,
        public requestId: String,
        public personId: String,
        public messageId: String,
        public done: any, //date
        public orchestratorProcessId: String,
        public doneBy: String

    ) { }
}