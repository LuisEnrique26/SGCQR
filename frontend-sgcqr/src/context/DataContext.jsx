import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { receiveDataRequest } from "../api/counts";

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext);

    if (!context) {
        throw new Error("useData must be within an DataProvider");
    }
    return context;
}

export const DataProvider = ({ children }) => {
    const [submitedData, setSubmitedData] = useState(null);
    const navigate = useNavigate();

    
    const handleSubmit = async (data) => {
        try {
            await receiveDataRequest(data);
            setSubmitedData(data);
            navigate('/result');
        } catch (error) {
            console.log("Error al enviar lista \n", error.response);
        }
    };

    // const exportData = async () => {
    //     try {
    //         const r = await exportDataRequest();
    //         setExportDataResponse(r.data);
    //         console.log(r.data);
    //     } catch (error) {
    //         console.log("Error al exportar", error);
    //     }
    // }
    
    return (
        <DataContext.Provider value={{
            handleSubmit,
            submitedData,
            setSubmitedData
        }}>
            { children }
        </DataContext.Provider>
    );
}
