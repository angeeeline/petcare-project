
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/pets';

// CREATE: Add a new pet
export const createPet = (pet) => {
  return axios.post(API_BASE, pet);
};

// READ: Get all pets
export const getPets = () => {
  return axios.get(API_BASE);
};

// READ: Get one pet by ID
export const getPetById = (id) => {
  return axios.get(`${API_BASE}/${id}`);
};

// UPDATE: Update an existing pet by ID
export const updatePet = (id, updatedPet) => {
  return axios.put(`${API_BASE}/${id}`, updatedPet);
};

// DELETE: Remove an pet by ID
export const deletePet = (id) => {
  return axios.delete(`${API_BASE}/${id}`);
};
