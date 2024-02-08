import {ACCOUNT_TYPE} from "../utils/constants"

export const sidebarLinks = [
    {
        id:1,
        name: "My Profile",
        path: "/dashboard/my-profile",
        icon: "CgProfile"
    },
    {
        id:2,
        name: "Buyed Content",
        path: "/dashboard/buyed-content",
        icon: "BiPurchaseTag"
    },
    {
        id:3,
        name: "Add Content",
        path: "/dashboard/add-content",
        type: ACCOUNT_TYPE.ARTIST,
        icon: "IoMdAddCircleOutline"
    },
    {
        id:4,
        name: "My Content",
        path: "/dashboard/my-content",
        type: ACCOUNT_TYPE.ARTIST,
        icon: "VscVm"
    },
    {
        id:5,
        name: "Cart",
        path: "/dashboard/cart",
        icon: "IoCartOutline"
    },
    {
        id:6,
        name: "Dashboard",
        path: "/dashboard/artist",
        type: ACCOUNT_TYPE.ARTIST,
        icon: "RxDashboard"
    },

]