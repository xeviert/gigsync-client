import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Resources",
  },
  {
    id: uniqueId(),
    title: "Artists",
    icon: IconTypography,
    href: "/utilities/artists",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  {
    navlabel: true,
    subheader: "Utilities",
  },
  {
    id: uniqueId(),
    title: "Create Event",
    icon: IconAperture,
    href: "/event-create",
  },
  {
    id: uniqueId(),
    title: "My Events",
    icon: IconMoodHappy,
    href: "/my-events",
  },
  {
    id: uniqueId(),
    title: "Financials",
    icon: IconCopy,
    href: "/utilities/financials",
  },
];

export default Menuitems;
