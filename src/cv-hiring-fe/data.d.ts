export type WorkCategory = {
  id: string;
  name: string;
  workJob: WorkJob[];
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
  avgReview: number;
  logo: string;
  banner: string;
  amount_job_hiring: number;
  work_jobs: WorkJob[];
  user?: User;
};
export type Review = {
  title: string;
  rating: number;
  review: string;
  author: User;
  created_at: string;
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
  expired_date_hiring: string;
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
  id: number;
  user: User;
  work_job: WorkJob;
  cv_url: !string;
  status: number;
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
  coin: number;
  birthday: string;
  created_at: string;
  gender: "male" | "female";
  avatar: string;
  updated_at: string;
  role: Role;
  company?: Company;
};
export type Role = {
  id: number;
  name: string;
  users: User[];
};
export type Setting = {
  id: number;
  title_web: string;
  description: string;
  logo_url: string;
  fb_url: string;
  youtube_url: string;
  phone_contact: string;
  price_job: number;
};
