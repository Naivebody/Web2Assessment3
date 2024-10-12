/**
 * Category class stores information about the fundraiser category
 * @export
 * @class Category
 */
export class Donation {
  DONATION_ID: number = 0
  GIVER: string = ''
  DATE: Date = new Date()
  AMOUNT: number = 0
  FUNDRAISER_ID: number = 0
  constructor(donationId:number,giver:string,date:Date,amount:number,fundraiserId:number) {
    this.DONATION_ID = donationId;
    this.GIVER = giver;
    this.AMOUNT = amount;
    this.FUNDRAISER_ID = fundraiserId;
    this.DATE = date;
  }
}
