import { useState } from 'react'
import PropTypes from 'prop-types'
import '../../styles/common/tag-select.css'

function TagSelect({ value = [], onChange, suggestions = [] }) {
  const [inputValue, setInputValue] = useState('')
  const [isInputVisible, setIsInputVisible] = useState(false)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      const newTag = inputValue.trim()
      if (!value.includes(newTag)) {
        onChange([...value, newTag])
      }
      setInputValue('')
      setIsInputVisible(false)
    } else if (e.key === 'Escape') {
      setInputValue('')
      setIsInputVisible(false)
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    onChange(value.filter(tag => tag !== tagToRemove))
  }

  const handleSuggestionClick = (tag) => {
    if (!value.includes(tag)) {
      onChange([...value, tag])
    }
    setIsInputVisible(false)
  }

  return (
    <div className="tag-select">
      <div className="tag-list">
        {value.map(tag => (
          <span key={tag} className="tag">
            {tag}
            <button
              type="button"
              className="tag-remove"
              onClick={() => handleRemoveTag(tag)}
            >
              ×
            </button>
          </span>
        ))}
        {isInputVisible ? (
          <input
            type="text"
            className="tag-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="输入标签..."
          />
        ) : (
          <button
            type="button"
            className="add-tag-btn"
            onClick={() => setIsInputVisible(true)}
          >
            + 添加标签
          </button>
        )}
      </div>
      {isInputVisible && suggestions.length > 0 && (
        <div className="tag-suggestions">
          {suggestions
            .filter(tag => !value.includes(tag))
            .map(tag => (
              <button
                key={tag}
                type="button"
                className="tag-suggestion"
                onClick={() => handleSuggestionClick(tag)}
              >
                {tag}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}

TagSelect.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string)
}

export default TagSelect 