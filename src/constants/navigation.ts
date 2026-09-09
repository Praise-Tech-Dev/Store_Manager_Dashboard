import Dashboard from "../assets/icons/sidebar/dashboard.svg"
import Products from "../assets/icons/sidebar/products.svg"
import Users from "../assets/icons/sidebar/users.svg"
import Orders from "../assets/icons/sidebar/orders.svg"


export const navigation = [
    {
      name: "Statistics",
      path: "/dashboard",
      icon: Dashboard,
    },
    {
      name: "Products",
      path: "/products",
      icon: Products,
    },
    {
      name: "Users",
      path: "/users",
      icon: Users,
    },
    {
      name: "Order",
      path: "/orders",
      icon: Orders,
    },
  ] as const;
