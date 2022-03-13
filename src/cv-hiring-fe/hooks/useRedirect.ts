import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../store/hook";

export enum RoleEnum {
  ADMIN = "admin",
  HR = "hr",
  USER = "user",
}

interface IRedirectRules {
  route: {
    path: string;
  };
  only?: RoleEnum[];
}
export const RedirectRules: IRedirectRules[] = [
  {
    route: { path: "/quan-tri/tuyen-dung/them-moi" },
    only: [RoleEnum.HR],
  },
  { route: { path: "/quan-tri" }, only: [RoleEnum.HR, RoleEnum.ADMIN] },
  {
    route: { path: "/ca-nhan" },
    only: [RoleEnum.HR, RoleEnum.ADMIN, RoleEnum.USER],
  },
  {
    route: { path: "/viec-lam/nganh-nghe" },
    only: [RoleEnum.ADMIN],
  },
  {
    route: { path: "/viec-lam/ung-tuyen" },
    only: [RoleEnum.USER],
  },
];

export const useRedirect = () => {
  const userLoggedIn = useAppSelector((state) => state.user);
  const role = userLoggedIn.user?.role.name as RoleEnum;
  const { pathname } = useRouter();
  const [shouldRedirect, setShoudRedirect] = useState(false);

  useEffect(() => {
    const routeWithRule = RedirectRules.find((rule) =>
      pathname.includes(rule.route.path)
    );

    const shoudRedirect =
      routeWithRule?.only && routeWithRule.only?.indexOf(role) == -1;
    console.log(
      routeWithRule,
      routeWithRule?.only?.indexOf(role),
      shoudRedirect
    );
    if (shoudRedirect) {
      setShoudRedirect(true);
    } else {
      setShoudRedirect(false);
    }
  }, [pathname, role]);

  return shouldRedirect;
};
