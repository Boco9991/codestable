import axiosInstance from '../utils/axios';

// API call to fetch data
export const fetchData = async () => {
  try {
    const response = await axiosInstance.get('sifre');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to fetch columns
export const fetchColumns = async () => {
  try {
    const response = await axiosInstance.get('kolone');
    return response.data;
  } catch (error) {
    throw error;
  }
};
