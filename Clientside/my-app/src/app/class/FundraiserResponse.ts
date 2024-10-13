/**
 * FundraiserResponse interface stores the information about the specific fundraiser and its attributes
 */
export interface FundraiserResponse {
  FUNDRAISER_ID: number;
  ORGANIZER: string;
  CAPTION: string;
  TARGET_FUNDING: number;
  CURRENT_FUNDING: number;
  CITY: string;
  ACTIVE: number;
  CATEGORY_ID: number;
  NAME: string;
}
