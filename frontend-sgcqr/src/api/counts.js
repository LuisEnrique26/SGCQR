import axios from "./axios";

export const receiveDataRequest = arrayData => axios.post("/reception/receiveData", arrayData);

export const exportDataRequest = () => axios.get("/reception/exportData", {
    responseType: 'blob'
});
