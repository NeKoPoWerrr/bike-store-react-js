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
};