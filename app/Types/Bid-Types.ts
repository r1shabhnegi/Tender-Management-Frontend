export interface IBidCard {
  id: string;
  dd_number: string;
  dd_date: string;
  bank_number: string;
  bank_branch: string;
  created_at: string;
  technical_score: number;
  financial_score: number;
  total_score: number;
  status: string;
  business_name: string;
  business_classification: string;
}
