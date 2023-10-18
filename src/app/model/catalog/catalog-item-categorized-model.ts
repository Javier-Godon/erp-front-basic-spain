import { stringify } from "querystring";

export class CatalogItemCategorized {
    constructor(
        public itemCategorizedId: string,
        public itemId: string,
        public categoryLeafId: string
    ) { }
}