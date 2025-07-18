import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/appointments';

// CREATE: Add a new appointment
export const createAppointment = (appointment) => {
  return axios.post(API_BASE, appointment);
};

// READ: Get all appointments
export const getAppointments = () => {
  return axios.get(API_BASE);
};

// READ: Get one appointment by ID
export const getAppointmentById = (id) => {
  return axios.get(`${API_BASE}/${id}`);
};

// READ: Get appointments by owner ID ✅
export const getAppointmentsByOwnerId = (ownerId) => {
  return axios.get(`${API_BASE}/owner/${ownerId}`);
};

// UPDATE: Update an existing appointment by ID
/*export const updateAppointment = (id, updatedAppointment) => {
  return axios.put(`${API_BASE}/${id}`, updatedAppointment);
};*/

// DELETE: Remove an appointment by ID
export const deleteAppointment = (id) => {
  return axios.delete(`${API_BASE}/${id}`);
};

export const updateAppointment = async (id, data) => {
  const res = await axios.put(`http://localhost:8080/api/appointments/${id}`, data);
  return res.data;
};

// PATCH: Update status of an appointment
export const updateAppointmentStatus = async (id, status) => {
  const res = await axios.patch(`${API_BASE}/${id}/status`, { status });
  return res.data;
};



