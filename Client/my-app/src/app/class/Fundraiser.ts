/**
 * Fundraiser class stores the information about the specific fundraiser and its attributes
 * @export
 * @class Fundraiser
 */
export class Fundraiser {
  fundraiserID: number =0;
  organizer: string = '';
  caption: string = '';
  target_funding: number =0;
  current_funding: number =0;
  city: string = '';
  active: number = 0;
  categoryID: number = 0;
  categoryName: string = '';

  cunstructor(fundraiserID: number,
              organizer: string,
              caption: string,
              target_funding: number,
              current_funding: number,
              city: string,
              active: number,
              categoryID: number,
              categoryName: string) {
    this.fundraiserID = fundraiserID;
    this.organizer = organizer;
    this.caption = caption;
    this.target_funding = target_funding;
    this.city = city;
    this.active = active;
    this.categoryID = categoryID;
    this.current_funding = current_funding;
    this.categoryName = categoryName;
  }
}
