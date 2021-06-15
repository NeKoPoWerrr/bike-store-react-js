import { baseRequest, apiWrapper, getBaseAuthRequest } from './base/request';
import { objectToQueryParams } from './utils';

// Login
const apiCustomerLogin = (data) => apiWrapper(() => {
  return baseRequest.post(`/customerLogin`, data);
})

// Brand
const apiCreateBrand = (data) => apiWrapper(() => {
  return getBaseAuthRequest().post(`/brand/create`, data);
})

const apiDeleteBrand = (brandId) => apiWrapper(() => {
  return getBaseAuthRequest().post(`/brand/delete/${brandId}`);
})

const apiUpdateBrand = (brandId, data) => apiWrapper(() => {
  return getBaseAuthRequest().post(`/brand/update/${brandId}`, data);
})

const apiGetBrandById = (brandId) => apiWrapper(() => {
  return getBaseAuthRequest().get(`/brand/${brandId}`);
})

const apiFindBrands = (data) => apiWrapper(() => {
  let query = objectToQueryParams(data);
  return getBaseAuthRequest().get(`/brands${query}`);
})

// Product
const apiCreateProduct = (data) => apiWrapper(() => {
  return getBaseAuthRequest().post(`/product/create`, data);
})

const apiDeleteProduct = (productId) => apiWrapper(() => {
  return getBaseAuthRequest().post(`/product/delete/${productId}`);
})

const apiUpdateProduct = (productId, data) => apiWrapper(() => {
  return getBaseAuthRequest().post(`/product/update/${productId}`, data);
})

const apiGetProductById = (productId) => apiWrapper(() => {
  return getBaseAuthRequest().get(`/product/${productId}`);
})

const apiFindProducts = (data) => apiWrapper(() => {
  let query = objectToQueryParams(data);
  return getBaseAuthRequest().get(`/products${query}`);
})

//categories
const apiCreateCategory = (data) => apiWrapper(() => {
  return getBaseAuthRequest().post(`/category/create`, data);
})

const apiDeleteCategory = (categoryId) => apiWrapper(() => {
  return getBaseAuthRequest().post(`/category/delete/${categoryId}`);
})

const apiUpdateCategory = (categoryId, data) => apiWrapper(() => {
  return getBaseAuthRequest().post(`/category/update/${categoryId}`, data);
})

const apiGetCategoryById = (categoryId) => apiWrapper(() => {
  return getBaseAuthRequest().get(`/category/${categoryId}`);
})

const apiFindCategory = (data) => apiWrapper(() => {
  let query = objectToQueryParams(data);
  return getBaseAuthRequest().get(`/categories${query}`);
})

//Customers
const apiUpdateCustomer = (customerId, data) => apiWrapper(() => {
  return getBaseAuthRequest().post(`/customer/update/${customerId}`, data);
})

const apiGetCustomerById = (customerId) => apiWrapper(() => {
  return getBaseAuthRequest().get(`/customer/${customerId}`);
})

const apiFindCustomers = (data) => apiWrapper(() => {
  let query = objectToQueryParams(data);
  return getBaseAuthRequest().get(`/customers${query}`);
})

//Store
const apiUpdateStore = (customerId, data) => apiWrapper(() => {
  return getBaseAuthRequest().post(`/store/update/${customerId}`, data);
})

const apiGetStoreById = (customerId) => apiWrapper(() => {
  return getBaseAuthRequest().get(`/store/${customerId}`);
})

const apiFindStore = (data) => apiWrapper(() => {
  let query = objectToQueryParams(data);
  return getBaseAuthRequest().get(`/stores${query}`);
})

//Staff
// const apiUpdateStore = (customerId, data) => apiWrapper(() => {
//   return getBaseAuthRequest().post(`/staff/update/${customerId}`, data);
// })

// const apiGetStoreById = (customerId) => apiWrapper(() => {
//   return getBaseAuthRequest().get(`/staff/${customerId}`);
// })

// const apiFindStore = (data) => apiWrapper(() => {
//   let query = objectToQueryParams(data);
//   return getBaseAuthRequest().get(`/staffs${query}`);
// })

export default {
  // Login
  apiCustomerLogin,

  // Brand
  apiCreateBrand,
  apiDeleteBrand,
  apiUpdateBrand,
  apiGetBrandById,
  apiFindBrands,

  // Product
  apiCreateProduct,
  apiDeleteProduct,
  apiUpdateProduct,
  apiGetProductById,
  apiFindProducts,

  //Category
  apiCreateCategory,
  apiDeleteCategory,
  apiUpdateCategory,
  apiGetCategoryById,
  apiFindCategory,
  
  //Customers
  apiUpdateCustomer,
  apiFindCustomers,
  apiGetCustomerById,

  //Store
  apiUpdateStore,
  apiFindStore,
  apiGetStoreById,
};