import PropTypes from 'prop-types'
import '../../styles/common/input.css'

function Input({ 
  label,
  name,
  value,
  onChange,
  type = 'text',
  error,
  required = false,
  ...props
}) {
  const handleChange = (e) => {
    console.log('Input onChange:', e.target.name, e.target.value)
    onChange(e)
  }

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label" htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        className={`input ${error ? 'input-error' : ''}`}
        required={required}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool
}

export default Input 