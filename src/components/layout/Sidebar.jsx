import PropTypes from 'prop-types'
import Button from '../common/Button'
import '../../styles/layout/sidebar.css'

function Sidebar({ 
  activeCategory, 
  onCategoryChange, 
  noteTypes,
  onManageTypes,
  loading 
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>笔记本</h1>
      </div>
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
          {loading ? (
            <li className="loading-text">加载中...</li>
          ) : (
            noteTypes.map(type => (
              <li key={type.value}>
                <button
                  className={`category-item ${activeCategory === type.value ? 'active' : ''}`}
                  onClick={() => onCategoryChange(type.value)}
                >
                  {type.name}
                </button>
              </li>
            ))
          )}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <Button 
          variant="secondary" 
          onClick={onManageTypes}
          className="manage-types-btn"
        >
          管理笔记类型
        </Button>
      </div>
    </aside>
  )
}

Sidebar.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  noteTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  onManageTypes: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

export default Sidebar 