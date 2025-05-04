import { create } from 'zustand';
import axios from 'axios';
import { BASEURL } from './constants';

const useStore = create((set) => ({
  // State
  data: [], // For storing fetched data
  isLoading: false, // Loading state
  error: null, // Error state

  // GET request
  fetchData: async (apiEndpoint) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(BASEURL + apiEndpoint);
      set({ data: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  // POST request
  postData: async (apiEndpoint, payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${BASEURL}${apiEndpoint}`, payload);
      console.log(response.data);
      set({ isLoading: false });
      // Optionally, you can update data after a successful POST
      // set((state) => ({
      //   data: [...state.data, response.data],
      // }));
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  // UPDATE request
  updateData: async (apiEndpoint, id, payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${BASEURL}${apiEndpoint}/${id}`, payload);
      console.log(response.data);

      // Optionally, update the data state after a successful update
      // set((state) => ({
      //   data: state.data.map((item) =>
      //     item.id === id ? { ...item, ...response.data } : item
      //   ),
      //   isLoading: false,
      // }));

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  // Update Admin
  updateAdmin: async (apiEndpoint, payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${BASEURL}${apiEndpoint}`, payload);
      console.log(response.data);
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },
  // Clear data
  clearData: () => set({ data: [], error: null }),
}));

export default useStore;
