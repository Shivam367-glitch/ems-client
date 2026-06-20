import axios from "axios"

const API = axios.create({ baseURL:import.meta.env.VITE_BASE_URL });


export const createEvent = (data) => {
  return API.post("/", data);
};


export const getAllEvents = ({ status="All",page=1,search=""}) => { 

  return API.get(`/?status=${status}&search=${search}&page=${Number(page)}`);
};


export const getEventById = (id) => {
  return API.get(`/${id}`);
};

export const updateEvent = (id, data) => {
  return API.put(`/${id}`, data);
};

export const deleteEvent = (id) => {
  return API.delete(`/${id}`);
};