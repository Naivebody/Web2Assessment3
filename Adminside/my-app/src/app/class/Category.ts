/**
 * Category class stores information about the fundraiser category
 * @export
 * @class Category
 */
export class Category {
  CATEGORY_ID: number = 0
  NAME : string = ''
  constructor(categoryID: number , name: string) {
    this.CATEGORY_ID = categoryID;
    this.NAME = name;
  }
}
