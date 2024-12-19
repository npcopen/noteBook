import PropTypes from 'prop-types'
import Card from '../common/Card'
import Button from '../common/Button'
import '../../styles/notes/note-list.css'

/**
 * 笔记列表组件
 * 负责展示笔记卡片列表
 * 
 * @param {Object[]} notes - 笔记数组
 * @param {Object[]} noteTypes - 笔记类型数组
 * @param {Function} onEdit - 编辑笔记的回调函数
 * @param {Function} onDelete - 删除笔记的回调函数
 */
function NoteList({ notes, noteTypes = [], onEdit, onDelete }) {
  // 创建笔记类型值到名称和颜色的映射对象
  const typeMap = Object.fromEntries(
    noteTypes.map(type => [type.value, { name: type.name, color: type.color }])
  )

  // 空列表状态
  if (notes.length === 0) {
    return (
      <div className="empty-notes">
        <p>暂无笔记</p>
      </div>
    )
  }

  return (
    <div className="note-list">
      {notes.map(note => (
        <Card 
          key={note.id}
          className="note-card"
          title={note.title}
          extra={
            <div className="note-actions">
              <Button size="small" variant="secondary" onClick={() => onEdit(note)}>
                编辑
              </Button>
              <Button size="small" variant="outline" onClick={() => onDelete(note)}>
                删除
              </Button>
            </div>
          }
        >
          {/* 笔记内容 */}
          <p className="note-content">{note.content}</p>
          
          {/* 笔记元信息：分类和标签 */}
          <div className="note-meta">
            <span 
              className="note-category"
              style={{ 
                backgroundColor: typeMap[note.category]?.color || '#999',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: '4px'
              }}
            >
              {typeMap[note.category]?.name || note.category}
            </span>
            {note.tags && note.tags.length > 0 && (
              <div className="note-tags">
                {note.tags.map(tag => (
                  <span key={tag} className="note-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* 笔记底部：更新时间 */}
          <div className="note-footer">
            <span className="note-date">
              {new Date(note.updatedAt).toLocaleString()}
            </span>
          </div>
        </Card>
      ))}
    </div>
  )
}

// 属性类型定义
NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    updatedAt: PropTypes.string.isRequired
  })).isRequired,
  noteTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default NoteList 