export type WorkCategory = {
  id: string;
  name: string;
};
export type Province = {
  id: string;
  name: string;
};
export type Company = {
  id: int;
  slug: string;
  name: string;
  description: string;
  amount_employee: string;
  website: string;
  fanpage: string;
  address: string;
  gg_map: string;
  logo: string;
  banner: string;
  amount_job_hiring: number;
};
export type WorkJob = {
  id: int;
  slug: string;
  name: string;
  description: string;
  benefit: string;
  requirement: string;
  requirement_exp: string;
  requirement_gender: string;
  amount_hiring: number;
  amount_apply: number;
  address_work: string;
  salary: string;
  type: string;
  is_open: number;
  expired_date: string;
  updated_at: string;
  province: Province;
  company: Company;
  work_category: WorkCategory;
};
type PaginatorInfo = {
  count: number;
  currentPage: number;
  firstItem: number;
  hasMorePages: boolean;
  lastItem: number;
  lastPage: number;
  perPage: number;
  total: number;
};
