import axios from 'axios';
// Base URL for API - you can change this to your backend URL
const baseURL = 'http://localhost:8080/api';
// Create axios instance
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});
// Add request interceptor
api.interceptors.request.use(config => {
  // You can add auth token here if needed
  return config;
}, error => {
  return Promise.reject(error);
});
// Add response interceptor
api.interceptors.response.use(response => {
  return response;
}, error => {
  // Handle global error responses
  const message = error.response?.data?.message || 'An unexpected error occurred';
  console.error('API Error:', message);
  return Promise.reject(error);
});