import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../common/Button'
import Input from '../common/Input'
import Modal from '../common/Modal'
import '../../styles/notes/note-type-manager.css'

function NoteTypeManager({ 
  noteTypes, 
  onCreateType, 
  onUpdateType, 
  onDeleteType 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentType, setCurrentType] = useState(null)
  const [formData, setFormData] = useState({ name: '', description: '' })
  const [error, setError] = useState('')

  const handleCreate = () => {
    setCurrentType(null)
    setFormData({ name: '', description: '' })
    setError('')
    setIsModalOpen(true)
  }

  const handleEdit = (type) => {
    setCurrentType(type)
    setFormData({
      name: type.name,
      description: type.description || ''
    })
    setError('')
    setIsModalOpen(true)
  }

  const handleDelete = (type) => {
    setCurrentType(type)
    setIsDeleteModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setError('请输入类型名称')
      return
    }

    try {
      if (currentType) {
        await onUpdateType(currentType.id, formData)
      } else {
        await onCreateType(formData)
      }
      setIsModalOpen(false)
      setFormData({ name: '', description: '' })
    } catch (err) {
      setError(err.message)
    }
  }

  const handleConfirmDelete = async () => {
    try {
      await onDeleteType(currentType.id)
      setIsDeleteModalOpen(false)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="note-type-manager">
      <div className="note-type-header">
        <h3>笔记类型管理</h3>
        <Button onClick={handleCreate}>新建类型</Button>
      </div>
      <div className="note-type-list">
        {noteTypes.map(type => (
          <div key={type.id} className="note-type-item">
            <div className="note-type-content">
              <span className="note-type-name">{type.name}</span>
              {type.description && (
                <span className="note-type-description">{type.description}</span>
              )}
            </div>
            <div className="note-type-actions">
              <Button size="small" variant="secondary" onClick={() => handleEdit(type)}>
                编辑
              </Button>
              <Button size="small" variant="outline" onClick={() => handleDelete(type)}>
                删除
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentType ? '编辑笔记类型' : '新建笔记类型'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSubmit}>
              确定
            </Button>
          </>
        }
      >
        <form className="note-type-form" onSubmit={handleSubmit}>
          <Input
            label="类型名称"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            error={error}
            required
          />
          <Input
            label="类型描述"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="删除笔记类型"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              取消
            </Button>
            <Button variant="outline" onClick={handleConfirmDelete}>
              确认删除
            </Button>
          </>
        }
      >
        <p>确定要删除笔记类型 "{currentType?.name}" 吗？此操作不可恢复。</p>
        <p className="delete-warning">注意：删除笔记类型可能会影响已经使用该类型的笔记。</p>
      </Modal>
    </div>
  )
}

NoteTypeManager.propTypes = {
  noteTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string
  })).isRequired,
  onCreateType: PropTypes.func.isRequired,
  onUpdateType: PropTypes.func.isRequired,
  onDeleteType: PropTypes.func.isRequired
}

export default NoteTypeManager 