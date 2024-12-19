import PropTypes from 'prop-types'
import Select from '../common/Select'
import '../../styles/notes/note-sorter.css'

const sortOptions = [
  { value: 'updatedAt-desc', label: '最近更新' },
  { value: 'updatedAt-asc', label: '最早更新' },
  { value: 'title-asc', label: '标题 A-Z' },
  { value: 'title-desc', label: '标题 Z-A' }
]

function NoteSorter({ value = 'updatedAt-desc', onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="note-sorter">
      <Select
        name="sort"
        value={value}
        onChange={handleChange}
        label="排序方式"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  )
}

NoteSorter.propTypes = {
  value: PropTypes.oneOf(sortOptions.map(opt => opt.value)),
  onChange: PropTypes.func.isRequired
}

// 导出排序选项供其他组件使用
export { sortOptions }

export default NoteSorter 