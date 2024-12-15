import axiosInstance from '../utils/axios';

// API call to fetch data
export const fetchData = async () => {
  try {
    const response = await axiosInstance.get('sifre');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// API call to fetch columns
export const fetchColumns = async (visibleColumns: string[]) => {
  try {
    const response = await axiosInstance.get('kolone');
    return response.data.map((item: string) => {
      return { key: item, isVisible: visibleColumns.includes(item) };
    });
  } catch (error) {
    console.error('Error fetching columns:', error);
    throw error;
  }
};
