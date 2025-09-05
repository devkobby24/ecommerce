import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '../context/CartContext';

const API_BASE_URL = 'https://fakestoreapi.com';

// Fetch all products
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Fetch single product
export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<Product> => {
      if (!id) throw new Error('Product ID is required');
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Fetch categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<string[]> => {
      const response = await axios.get(`${API_BASE_URL}/products/categories`);
      return response.data;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

// Fetch products by category
export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: async (): Promise<Product[]> => {
      const response = await axios.get(`${API_BASE_URL}/products/category/${category}`);
      return response.data;
    },
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
