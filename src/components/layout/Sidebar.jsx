import PropTypes from 'prop-types'
import Button from '../common/Button'
import '../../styles/layout/sidebar.css'

function Sidebar({ 
  activeCategory, 
  onCategoryChange, 
  noteTypes = [], 
  onManageTypes,
  loading 
}) {
  return (
    <nav className="sidebar-nav">
      <ul className="category-list">
        <li>
          <button 
            className={`category-item ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => onCategoryChange('all')}
          >
            全部笔记
          </button>
        </li>
        {noteTypes.map(type => (
          <li key={type.id}>
            <button
              className={`category-item ${activeCategory === type.value ? 'active' : ''}`}
              onClick={() => onCategoryChange(type.value)}
              style={{
                backgroundColor: type.color,
                color: '#fff',
                border: 'none',
                opacity: activeCategory === type.value ? 1 : 0.8
              }}
            >
              {type.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <Button 
          variant="secondary" 
          onClick={onManageTypes}
          disabled={loading}
          block
        >
          管理分类
        </Button>
      </div>
    </nav>
  )
}

Sidebar.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  noteTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  })),
  onManageTypes: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

export default Sidebar 