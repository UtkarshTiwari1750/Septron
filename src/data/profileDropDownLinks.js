import { ACCOUNT_TYPE } from "../utils/constants";

export const ProfileDropDownLinks =[
    {
        title: "My Profile",
        path:"/dashboard/my-profile",
        icon: "CgProfile"
    },
    {
        title: "Dashboard",
        path: "/dashboard/artist",
        type: ACCOUNT_TYPE.ARTIST,
        icon: "RxDashboard"
    },
    {
        title: "Add Content",
        path: "/dashboard/add-content",
        type: ACCOUNT_TYPE.ARTIST,
        icon: "IoMdAddCircleOutline"
    },
    {
        title: "My Content",
        path: "/dashboard/my-content",
        type: ACCOUNT_TYPE.ARTIST,
        icon: "VscVm"
    },
    {
        title: "Cart",
        path: "/dashboard/cart",
        icon: "IoCartOutline"
    },
    {
        title: "Buyed Content",
        path: "/dashboard/buyed-content",
        icon: "BiPurchaseTag"
    },
    {
        title: "Setting",
        path: "/dashboard/settings",
        icon: 'VscSettingsGear'
    },
];