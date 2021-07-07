/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Star from "@material-ui/icons/Star";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import CustomersPage from "@/views/Customers/Customers.js"
import CategoryPage from "@/views/Category/Category.js"
import ProductsPage from "@/views/Products/Products.js"
import StorePage from "@/views/Store/Store.js"
import BrandsPage from "@/views/Brands/Brands.js";
import DashboardPage from "@/views/Dashboard/Dashboard.js";
import UserProfile from "@/views/UserProfile/UserProfile.js";
import TableList from "@/views/TableList/TableList.js";
import Typography from "@/views/Typography/Typography.js";
import Icons from "@/views/Icons/Icons.js";
import Maps from "@/views/Maps/Maps.js";
import NotificationsPage from "@/views/Notifications/Notifications.js";
import UpgradeToPro from "@/views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "@/views/RTLPage/RTLPage.js";


const dashboardRoutes = [
  {
    path: "/customers",
    name: "Customers",
    rtlName: "顧客",
    icon: Star,
    component: CustomersPage,
    layout: "/admin"
  },
  {
    path: "/brands",
    name: "Brand",
    rtlName: "品牌",
    icon: Star,
    component: BrandsPage,
    layout: "/admin"
  },
  {
    path: "/category",
    name:"Category",
    rtlName:"種類",
    icon: Star,
    component: CategoryPage,
    layout:"/admin"
  },
  {
    path: "/products",
    name:"Product",
    rtlName:"產品",
    icon: Star,
    component: ProductsPage,
    layout:"/admin"
  },
  {
    path: "/store",
    name:"Store",
    rtlName:"店面",
    icon: Star,
    component: StorePage,
    layout:"/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl"
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  },
];

export default dashboardRoutes;
