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
  work_jobs: WorkJob[];
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
  requirement_age: string;
  amount_hiring: number;
  amount_apply: number;
  address_work: string;
  salary: string;
  type: string;
  is_open: number;
  expired_date: string;
  updated_at: string;
  created_at: string;
  province: Province;
  company: Company;
  work_category: WorkCategory;
  work_applies: WorkApply[];
};
export type PaginatorInfo = {
  count: number;
  currentPage: number;
  firstItem: number;
  hasMorePages: boolean;
  lastItem: number;
  lastPage: number;
  perPage: number;
  total: number;
};
export type WorkApply = {
  id: int;
  user: User;
  work_job: WorkJob;
  cv_url: !string;
  status: string;
  letter: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
};
export type User = {
  id: number;
  lastname: string;
  firstname: string;
  address: string;
  email: string;
  phone: string;
  birthday: string;
  created_at: string;
  gender: 0 | 1;
  avatar: string;
  updated_at: string;
  role: Role;
};
export type Role = {
  id: number;
  name: string;
  users: User[];
};
