import axios from 'axios'

import CustomError from '../errorHandle/customError';
import { SUCCESS_CODE } from './apiResponseCode';

const API_URL = "http://localhost:8082";

const baseRequest = axios.create({
  baseURL: `${API_URL}`
});

const getBaseAuthRequest = () => {
  return axios.create({
    baseURL: `${API_URL}`,
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
}

const apiWrapper = async(request) => {
  const res = await request();

  const { code } = res.data?.code;
  if (code !== undefined && code !== SUCCESS_CODE) {
    const error = new CustomError({ code });
    throw error;
  }

  return res.data;
}

export { baseRequest, apiWrapper, getBaseAuthRequest };