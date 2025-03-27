export interface IItemInfo {
  company: string;
  department: string;
  tenderNumber: string;
  tenderType: string;
  tenderScope: string;
  category: string;
  title: string;
  description: string;
  technicalPreBidQualification: string;
  technicalWeightage: string;
  commercialWeightage: string;
}

export interface IKeyDate {
  prePublishDate: string | Date;
  publishDate: string | Date;
  tenderSaleCloseDate: string | Date;
  clarificationStartDate: string | Date;
  clarificationEndDate: string | Date;
  revisionPublishmentDate: string | Date;
  bidSubmissionEndDate: string | Date;
  bidOpenDate: string | Date;
}

export interface ITenderFeeDetails {
  documentFee: string;
  feePayableAt: string;
  EMD: string;
  edmPayableAt: string;
  tenderLocation: string;
  tenderValue: string;
}

export interface ITenderSupportDocument {
  documentName: string;
  documentPurpose: string;
  document: Blob | File | string;
}

export interface IVenderDocRequirement {
  name: string;
  type: string;
  purpose: string;
}

export interface ITenderPreQualification {
  title: string;
  description: string;
  score: string;
}

export interface ITenderCard {
  id: string;
  title: string;
  status: string;
  tender_number: string;
  bid_submission_end_date: string;
  doc_fee: string;
  emd: string;
  department: string;
  type: string;
  scope: string;
  category: string;
  location: string;
}
