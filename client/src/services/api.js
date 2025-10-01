import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const cardAPI = {
  getAllCards: async () => {
    const response = await api.get('/cards');
    return response.data;
  },

  getCardById: async (id) => {
    const response = await api.get(`/cards/${id}`);
    return response.data;
  },

  createCard: async (cardData) => {
    const response = await api.post('/cards', cardData);
    return response.data;
  },

  updateCard: async (id, cardData) => {
    const response = await api.patch(`/cards/${id}`, cardData);
    return response.data;
  },

  deleteCard: async (id) => {
    await api.delete(`/cards/${id}`);
  },
};

export default api;
