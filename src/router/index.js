import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from "../views/User";
import Cart from "../views/Cart";
import Category from "../views/Category";
import Login from "../views/Login";
import ProductList from "../views/ProductList";
import ProductDetail from "../views/ProductDetail";
import CreateOrder from "../views/CreateOrder";
import Order from "../views/Order";
import Address from "../views/Address";
import AddressEdit from "../views/AddressEdit";
import OrderDetail from "../views/OrderDetail";
import Setting from "../views/Setting";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      index: 1
    }
  },
  {
    path:'/user',
    component: User,
    meta: {
      index: 1
    }
  },
  {
    path: '/setting',
    component: Setting,
    meta: {
      index: 2
    }
  },
  {
    path:'/addressEdit',
    component: AddressEdit,
    meta: {
      index:3
    }
  },
  {
    path: '/orderDetail',
    component: OrderDetail,
    meta: {
      index: 3
    }
  },
  {
    path: '/address',
    component: Address,
    meta: {
      index: 2
    }
  },
  {
    path:'/cart',
    component: Cart,
    meta: {
      index: 1
    }
  },
  {
    path:'/createOrder',
    component: CreateOrder,
    meta: {
      index: 2
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      index: 2
    }
  },
  {
    path:'/category',
    component: Category,
    meta: {
      index: 1
    }
  },
  {
    path:'/product/:id',
    component: ProductDetail,
    name:'product',
    meta: {
      index: 3
    }
  },
  {
    path: '/productList',
    component: ProductList,
    meta: {
      index: 2
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      index: 19
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      index: 2
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
