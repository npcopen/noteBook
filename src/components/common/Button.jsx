import PropTypes from 'prop-types'
import '../../styles/common/button.css'

function Button({ children, variant = 'primary', size = 'medium', onClick, type = 'button' }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
}

export default Button 