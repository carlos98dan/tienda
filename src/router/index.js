import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/product/ProductView.vue'
import FormProduct from '../views/product/FormProduct.vue'
import ClientView from '../views/client/ClientView.vue'
import FormClient from '../views/client/FormClient.vue'
import FormSale from '@/views/sale/FormSale.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/form-product',
      name: 'form-product',
      component: FormProduct,
    },
    {
      path: '/client',
      name: 'client',
      component: ClientView,
    },
    {
      path: '/form-client',
      name: 'form-client',
      component: FormClient,
    },
    {
      path: '/form-sale',
      name: 'form-sale',
      component: FormSale,
    },
  ],
})

export default router
