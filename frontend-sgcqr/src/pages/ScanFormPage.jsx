import { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import "./../styles/ScanForm.scss";
import Table from "../components/Table";
import Button from "../components/Button";
import { CgChevronRight, CgChevronLeft, CgMathEqual } from "react-icons/cg";

function ScanFormPage() {
    const { handleSubmit } = useData();
    const [data, setData] = useState([]);
    const [text, setText] = useState("");
    const [message, setMessage] = useState([""]);
    const [classMessage, setClassMessage] = useState("messagesUn");
    const [count, setCount] = useState(0);

    const parseString = (inputString) => {
        const cargaMatch = inputString.match(/c'(\d{2}-\d{4})/);
        const zonaMatch =
            inputString.match(/z' (\d+)/) || inputString.match(/z'(\d+)/);
        const damaMatch = inputString.match(/d'(\d+)/);
        const pedidoMatch = inputString.match(/p'(\d+)/);
        const cajasMatch = inputString.match(/cajas\s*([\d']+)/);

        if (
            !cargaMatch &&
            !zonaMatch &&
            !damaMatch &&
            !pedidoMatch &&
            !cajasMatch
        ) {
            return null;
        }

        const parsedObject = {
            carga: cargaMatch ? cargaMatch[1] : "",
            zona: zonaMatch ? zonaMatch[1] : "",
            dama: damaMatch ? damaMatch[1] : "",
            pedido: pedidoMatch ? pedidoMatch[1] : "",
            caja: cajasMatch ? cajasMatch[1] : "",
        };

        return parsedObject;
    };

    const handleInputQR = (e) => {
        const value = e.target.value;

        if (e.key === "Enter") {
            if (value !== "") {
                const parssedObject = parseString(value);
                if (parssedObject !== null) {
                    const changeAp = parssedObject.caja.replace("'", "-");
                    parssedObject.caja = changeAp;
                    setData((prevData) => [...prevData, parssedObject]);
                    setClassMessage("messagesUn");
                    return setText("");
                }
                setText("");
                setClassMessage("messages");
                return setMessage(["Código inválido"]);
            }
            return setText("");
        }
    };

    const handleInputCount = (e) => {
        const n = e.target.value;

        if (e.key === "Enter") {
            setCount(n);
        }
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleDelete = () => {
        setData([]);
        setText("");
        setCount(0);
    };

    useEffect(() => {
        if (hasDuplicateObjects(data)) {
            removeLastItem();
            setText("");
            setMessage(["Código Duplicado"]);
            setClassMessage("messages");
            return;
        }
    }, [data]);

    useEffect(() => {
        if (message.length > 0) {
            const timer = setTimeout(() => {
                setMessage([]);
                setClassMessage("messagesUn");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    class ObjectComparer {
        static isEqual(obj1, obj2) {
            return ObjectComparer.deepEqual(obj1, obj2);
        }

        static deepEqual(obj1, obj2) {
            if (obj1 === obj2) {
                return true;
            }

            if (
                obj1 == null ||
                typeof obj1 !== "object" ||
                obj2 == null ||
                typeof obj2 !== "object"
            ) {
                return false;
            }

            let keys1 = Object.keys(obj1);
            let keys2 = Object.keys(obj2);

            if (keys1.length !== keys2.length) {
                return false;
            }

            for (let key of keys1) {
                if (
                    !keys2.includes(key) ||
                    !ObjectComparer.deepEqual(obj1[key], obj2[key])
                ) {
                    return false;
                }
            }
            return true;
        }
    }

    const hasDuplicateObjects = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (ObjectComparer.isEqual(arr[i], arr[j])) {
                    return true;
                }
            }
        }
        return false;
    };

    const removeLastItem = () => {
        setData((prevItems) => prevItems.slice(0, -1));
    };

    // const handleExportData = () => {
    //     try {
    //         exportData();
    //         const blob = new Blob([exportDataResponse], { type: 'blob' });

    //         const url = window.URL.createObjectURL(blob);

    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', 'registros_recepcion.xlsx');
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     } catch (error) {
    //         console.error('Error descargando el archivo', error);
    //     }
    // };

    return (
        <section className="scanFormContainer">
            <div className="card">
                <div className={classMessage}>
                    {message.map((message, i) => (
                        <h3 key={i}>{message}</h3>
                    ))}
                </div>

                <h1 htmlFor="boxNumber">Código QR</h1>
                <input
                    className="inputQR"
                    name="boxNumber"
                    id="boxNumber"
                    autoFocus
                    onKeyDown={handleInputQR}
                    value={text}
                    onChange={handleChange}
                />
                <div className="buttons">
                    <Button
                        bg={"rgba(0, 62, 228, 1)"}
                        title={"Terminar Conteo"}
                        propFunction={() => handleSubmit(data)}
                        hoverColor={"rgba(8, 42, 131, 1)"}
                    />
                    {/* <Button
                        bg={"rgba(44, 199, 26, 1)"}
                        title={"Exportar"}
                        propFunction={() => handleExportData()}
                        hoverColor={"rgba(33, 175, 16, 1)"}
                    /> */}
                    <Button
                        bg={"rgba(230, 16, 16, 1)"}
                        title={"Borrar Lista"}
                        propFunction={handleDelete}
                        hoverColor={"rgba(181, 10, 10, 1)"}
                    />
                </div>
            </div>

            <div className="card">
                <div className="card">
                    <h3>Cajas a Completar</h3>
                    <input
                        type="number"
                        className="inputQR"
                        onKeyDown={handleInputCount}
                    />
                </div>
                <div className="comparer">
                    <div className="aspect">
                        <h2>Escaneadas</h2>
                        <p className="count">{data.length}</p>
                    </div>
                    <i className="count">
                        {data.length < count ? (
                            <CgChevronLeft />
                        ) : data.length > count ? (
                            <CgChevronRight />
                        ) : (
                            <CgMathEqual />
                        )}
                    </i>
                    <div className="aspect">
                        <h2>A completar</h2>
                        <p className="count">{count}</p>
                    </div>
                </div>
            </div>

            <div className="tableSection card">
                <h1 htmlFor="">Cajas Escaneadas</h1>
                <Table params={data} />
            </div>
        </section>
    );
}

export default ScanFormPage;
