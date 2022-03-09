import { RoleEnum } from "./../data.d";
interface IRedirectRules {
  route: {
    path: string;
  };
  only?: RoleEnum[];
}
export const RedirectRules: IRedirectRules[] = [
  { route: { path: "/" } },
  { route: { path: "/quan-tri" }, only: [RoleEnum.HR, RoleEnum.ADMIN] },
];

export const useRedirect = () => {};
