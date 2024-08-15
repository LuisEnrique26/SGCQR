import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/ResultPage.scss";
import { useData } from "../context/DataContext";
import Button from "../components/Button";

function ResultPage() {
    const { submitedData, setSubmitedData } = useData();
    const data = submitedData;
    const [arrMultipleBoxes, setArrMultipleBoxes] = useState([]);
    const [multiplePedidos, setMultiplePedidos] = useState([]);
    const navigate = useNavigate();

    const checkMultipleBoxes = () => {
        const newArr = data.filter((item) => item.caja !== "1-1");
        setArrMultipleBoxes(newArr);
    };

    const validatePedidos = () => {
        const groupedByPedido = arrMultipleBoxes.reduce((acc, obj) => {
            if (!acc[obj.pedido]) {
                acc[obj.pedido] = [];
            }
            acc[obj.pedido].push(obj);
            return acc;
        }, {});

        const validationResults = Object.keys(groupedByPedido).map((pedido) => {
            const items = groupedByPedido[pedido];
            const nCajas = parseInt(items[0].caja.substr(-1));
            const completo = items.length === nCajas;

            return {
                pedido,
                items,
                completo,
            };
        });

        setMultiplePedidos(validationResults);
    };

    const handleExit = () => {
        setArrMultipleBoxes([]);
        setMultiplePedidos([]);
        setSubmitedData(null);
        navigate("/");
    };

    useEffect(() => {
        checkMultipleBoxes();
    }, []);

    useEffect(() => {
        if (arrMultipleBoxes.length > 0) {
            validatePedidos();
        }
    }, [arrMultipleBoxes]);

    return (
        <div className="resultPageContainer">
            <div className="missingSection card">
                <h1>Cajas Múltiples</h1>
                {multiplePedidos.map((pedido, index) => (
                    <div
                        className={
                            pedido.completo
                                ? "cardMissing complete"
                                : "cardMissing missing"
                        }
                        key={index}
                    >
                        <p>
                            Pedido: {pedido.pedido} {" --> "}{" "}
                            {pedido.completo ? "Completo" : "Incompleto"}
                        </p>
                        <ul>
                            {pedido.items.map((item, idx) => (
                                <li key={idx}>
                                    Zona: {item.zona}, Dama: {item.dama}, Caja:{" "}
                                    <b>{item.caja}</b>
                                </li>
                            ))}
                        </ul>
                        <br />
                    </div>
                ))}
            </div>
            <div className="card">
                <Button
                    bg={"rgba(230, 16, 16, 1)"}
                    title={"Salir"}
                    propFunction={() => handleExit()}
                    hoverColor={"rgba(181, 10, 10, 1)"}
                />
            </div>
        </div>
    );
}

export default ResultPage;
