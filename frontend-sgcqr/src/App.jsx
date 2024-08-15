import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScanFormPage from "./pages/ScanFormPage";
import HomePage from "./pages/HomePage";
import { DataProvider } from "./context/DataContext";
import Sidebar from "./components/Sidebar";
import ResultPage from "./pages/ResultPage";

function App() {
    return (
        <BrowserRouter>
            <DataProvider>
                <Sidebar>
                    <Routes>
                        <Route path="/scan-form" element={<ScanFormPage />} />
                        <Route path="/result" element={<ResultPage />} />
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </Sidebar>
            </DataProvider>
        </BrowserRouter>
    );
}

export default App;
