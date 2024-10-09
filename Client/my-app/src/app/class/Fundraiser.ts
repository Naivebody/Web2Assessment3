import {FundraiserResponse} from './FundraiserResponse';

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


  constructor(data : FundraiserResponse) {
    this.fundraiserID = data.FUNDRAISER_ID
    this.organizer = data.ORGANIZER
    this.caption = data.CAPTION
    this.target_funding = data.TARGET_FUNDING
    this.current_funding = data.CURRENT_FUNDING
    this.city = data.CITY
    this.active = data.ACTIVE
    this.categoryID= data.CATEGORY_ID
    this.categoryName = data.NAME
  }
}
