import { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/common/password-input.css';

function PasswordInput({ 
  value, 
  onChange, 
  placeholder = "请输入密码", 
  disabled = false,
  name = "password",
  required = false
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input-wrapper">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        required={required}
        className="password-input"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="password-toggle-btn"
        disabled={disabled}
      >
        {showPassword ? '隐藏' : '显示'}
      </button>
    </div>
  );
}

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  required: PropTypes.bool
};

export default PasswordInput; 