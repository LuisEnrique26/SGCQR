import { useContext, createContext, useState } from "react";
import { exportDataRequest, receiveDataRequest } from "../api/counts";

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext);

    if (!context) {
        throw new Error("useData must be within an DataProvider");
    }
    return context;
}

export const DataProvider = ({ children }) => {
    const [exportDataResponse, setExportDataResponse] = useState(null);
    
    const handleSubmit = async (data) => {
        try {
            const res = await receiveDataRequest(data);
            console.log(res.data);
        } catch (error) {
            console.log("Error al enviar lista \n", error.response);
        }
    };

    const exportData = async () => {
        try {
            const r = await exportDataRequest();
            setExportDataResponse(r.data);
            console.log(r.data);
        } catch (error) {
            console.log("Error al exportar", error);
        }
    }
    
    return (
        <DataContext.Provider value={{
            handleSubmit,
            exportData,
            exportDataResponse
        }}>
            { children }
        </DataContext.Provider>
    );
}
