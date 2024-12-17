import PropTypes from 'prop-types'
import Select from '../common/Select'
import '../../styles/notes/note-sorter.css'

const sortOptions = [
  { value: 'updatedAt-desc', label: '最近更新' },
  { value: 'updatedAt-asc', label: '最早更新' },
  { value: 'title-asc', label: '标题 A-Z' },
  { value: 'title-desc', label: '标题 Z-A' }
]

function NoteSorter({ value, onChange }) {
  return (
    <div className="note-sorter">
      <Select
        value={value}
        onChange={onChange}
        options={sortOptions}
        placeholder="排序方式"
      />
    </div>
  )
}

NoteSorter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default NoteSorter 