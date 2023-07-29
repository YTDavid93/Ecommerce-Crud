import { createRouter, createWebHistory } from 'vue-router'
 
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/productpage',
    name: 'productpage',
    component: () => import('../Products/ProductPage.vue')
  },
  {
    path: '/addproduct',
    name: 'addproduct',
    component: () => import('../Products/AddProduct.vue')
  },
  {
    path: '/productpage/edit/:id',
    name: 'productEdit',
    component: () => import('../Products/AddProduct.vue')
  },
  {
    path: '/brandpage',
    name: 'brandpage',
    component: () => import('../Brands/BrandPage.vue')
  },
  {
    path: '/addbrand',
    name: 'addbrand',
    component: () => import('../Brands/AddBrand.vue')
  },
  {
    path: '/brandpage/edit/:id',
    name: 'brandEdit',
    component: () => import('../Brands/AddBrand.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
