import PropTypes from 'prop-types'
import '../../styles/common/search.css'

function Search({ value, onChange, placeholder = '搜索...' }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <span className="search-icon">🔍</span>
    </div>
  )
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

export default Search 