import PropTypes from 'prop-types';
import "./../styles/Button.scss";

function Button({ propFunction, title, bg, hoverColor }) {
    return (
        <button
            onClick={propFunction}
            style={{
                background: `${bg}`
            }}
            onMouseEnter={(e) => e.target.style.background = hoverColor}
            onMouseLeave={(e) => e.target.style.background = bg}
        >
            { title }
        </button>
    )
}

Button.propTypes = {
    propFunction: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    bg: PropTypes.string.isRequired,
    hoverColor: PropTypes.string.isRequired
};


export default Button;
