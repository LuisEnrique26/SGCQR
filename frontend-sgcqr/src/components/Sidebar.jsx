import { CgMenu, CgHome, CgPushDown, CgPushUp } from "react-icons/cg";
import "./../styles/Sidebar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => {
        setIsOpen(!isOpen);
        console.log("change");
    };

    return (
        <div className="mainContainer">
            <aside
                style={{
                    width: isOpen ? "350px" : "50px",
                }}
            >
                <div className="topSection">
                    <p
                        style={{
                            display: isOpen ? "block" : "none",
                            padding: isOpen ? "1rem" : "0rem",
                        }}
                    >
                        TRANSPORTACIONES RENO
                    </p>
                    <a
                        className="menuIcon"
                        onClick={toggle}
                        style={{
                            padding: isOpen ? "1rem" : "1rem 0",
                            fontSize: isOpen ? "40px" : "35px",
                        }}
                    >
                        <CgMenu />
                    </a>
                </div>
                <Link to={"/"} className="link">
                    <CgHome />
                    <p
                        style={{
                            display: isOpen ? "block" : "none",
                        }}
                    >
                        Inicio
                    </p>
                </Link>
                <hr />
                <Link to={"/scan-form"} className="link">
                    <CgPushDown />
                    <p
                        style={{
                            display: isOpen ? "block" : "none",
                        }}
                    >
                        Recepción
                    </p>
                </Link>
                <hr />
                <Link to={"/"} className="link">
                    <CgPushUp />
                    <p
                        style={{
                            display: isOpen ? "block" : "none",
                        }}
                    >
                        Envío
                    </p>
                </Link>
            </aside>
            <main>{children}</main>
        </div>
    );
}

export default Sidebar;
