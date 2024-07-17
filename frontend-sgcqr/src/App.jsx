import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScanFormPage from "./pages/ScanFormPage";
import HomePage from "./pages/HomePage";
import { DataProvider } from "./context/DataContext";
import Sidebar from "./components/Sidebar";

function App() {
    return (
        <DataProvider>
            <BrowserRouter>
            <Sidebar>
                <Routes>
                    <Route path="/scan-form" element={<ScanFormPage />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Sidebar>
            </BrowserRouter>
        </DataProvider>
    );
}

export default App;
