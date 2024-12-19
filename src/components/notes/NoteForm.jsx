import { useState } from 'react'
import PropTypes from 'prop-types'
import Input from '../common/Input'
import Select from '../common/Select'
import TagSelect from '../common/TagSelect'
import '../../styles/notes/note-form.css'

const categoryOptions = [
  { value: 'work', label: '工作' },
  { value: 'study', label: '学习' },
  { value: 'life', label: '生活' },
  { value: 'other', label: '其他' }
]

const tagSuggestions = ['重要', '待办', '已完成', '个人', '项目', '会议']

function NoteForm({ id, note, onSubmit, noteTypes = [] }) {
  const [formData, setFormData] = useState({
    title: note?.title || '',
    content: note?.content || '',
    category: note?.category || '',
    tags: note?.tags || []
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleTagsChange = (tags) => {
    setFormData(prev => ({
      ...prev,
      tags
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)

    // 表单验证
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = '请输入标题'
    }
    if (!formData.content.trim()) {
      newErrors.content = '请输入内容'
    }
    if (!formData.category) {
      newErrors.category = '请选择分类'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await onSubmit({
        ...formData,
        updatedAt: new Date().toISOString()
      })
    } catch (error) {
      console.error('Submit error:', error)
      setErrors({ submit: error.message })
    }
  }

  return (
    <form 
      id={id} 
      onSubmit={handleSubmit} 
      className="note-form"
      noValidate
    >
      <Input
        label="标题"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />
      <Select
        label="分类"
        name="category"
        value={formData.category}
        onChange={handleChange}
        error={errors.category}
        required
      >
        <option value="">请选择分类</option>
        {noteTypes?.map(type => (
          <option key={type.id} value={type.value}>
            {type.name}
            {type.description && ` (${type.description})`}
          </option>
        ))}
      </Select>
      <div className="form-group">
        <label className="input-label">标签</label>
        <TagSelect
          value={formData.tags}
          onChange={handleTagsChange}
          suggestions={tagSuggestions}
        />
      </div>
      <div className="form-group">
        <label className="input-label">
          内容
          <span className="required">*</span>
        </label>
        <textarea
          name="content"
          className={`textarea ${errors.content ? 'input-error' : ''}`}
          value={formData.content}
          onChange={handleChange}
          rows={6}
          required
        />
        {errors.content && (
          <span className="error-message">{errors.content}</span>
        )}
      </div>
    </form>
  )
}

NoteForm.propTypes = {
  id: PropTypes.string,
  note: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    updatedAt: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired,
  noteTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string
  }))
}

export default NoteForm 