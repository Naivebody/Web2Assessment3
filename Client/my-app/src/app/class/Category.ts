/**
 * Category class stores information about the fundraiser category
 * @export
 * @class Category
 */
export class Category {
  categoryID: number = 0
  name : string = ''
  constructor(categoryID: number , name: string) {
    this.categoryID = categoryID;
    this.name = name;
  }
}
