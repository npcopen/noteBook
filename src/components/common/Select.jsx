import PropTypes from 'prop-types'
import '../../styles/components/common/select.css'

function Select({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  required,
  children
}) {
  return (
    <div className="form-group">
      {label && (
        <label className="select-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`select-input ${error ? 'select-error' : ''}`}
        required={required}
      >
        <option value="">请选择</option>
        {children}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node
}

export default Select 