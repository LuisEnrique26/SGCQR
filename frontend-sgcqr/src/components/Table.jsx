import PropTypes from "prop-types";
import "./../styles/Table.scss";

function Table({ params }) {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Campaña</td>
                        <td>Zona</td>
                        <td>Dama</td>
                        <td>Pedido</td>
                        <td>Caja</td>
                    </tr>
                </thead>
                <tbody>
                    {params.map((r, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{r.carga}</td>
                            <td>{r.zona}</td>
                            <td>{r.dama}</td>
                            <td>{r.pedido}</td>
                            <td>{r.caja}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Table.propTypes = {
    params: PropTypes.arrayOf(
        PropTypes.shape({
            carga: PropTypes.string.isRequired,
            zona: PropTypes.string.isRequired,
            dama: PropTypes.string.isRequired,
            pedido: PropTypes.string.isRequired,
            caja: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Table;
