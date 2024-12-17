import PropTypes from 'prop-types'
import Card from '../common/Card'
import '../../styles/notes/tag-filter.css'

function TagFilter({ tags, selectedTags, onChange }) {
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter(t => t !== tag))
    } else {
      onChange([...selectedTags, tag])
    }
  }

  return (
    <Card className="tag-filter" title="标签筛选">
      <div className="filter-tags">
        {Object.entries(tags).map(([tag, count]) => (
          <button
            key={tag}
            className={`filter-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            <span className="filter-tag-label">{tag}</span>
            <span className="filter-tag-count">{count}</span>
          </button>
        ))}
      </div>
      {selectedTags.length > 0 && (
        <button
          className="clear-tags"
          onClick={() => onChange([])}
        >
          清除筛选
        </button>
      )}
    </Card>
  )
}

TagFilter.propTypes = {
  tags: PropTypes.objectOf(PropTypes.number).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
}

export default TagFilter 