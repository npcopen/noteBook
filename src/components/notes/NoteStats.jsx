import PropTypes from 'prop-types'
import Card from '../common/Card'
import '../../styles/notes/note-stats.css'

function NoteStats({ notes }) {
  const stats = {
    total: notes.length,
    categories: {},
    tags: {},
    wordCount: 0,
    avgWordCount: 0
  }

  // 计算统计数据
  notes.forEach(note => {
    // 统计分类
    stats.categories[note.category] = (stats.categories[note.category] || 0) + 1

    // 统计标签
    note.tags?.forEach(tag => {
      stats.tags[tag] = (stats.tags[tag] || 0) + 1
    })

    // 统计字数
    const words = note.content.trim().split(/\s+/).length
    stats.wordCount += words
  })

  stats.avgWordCount = Math.round(stats.wordCount / (stats.total || 1))

  return (
    <Card className="note-stats" title="笔记统计">
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">笔记总数</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.wordCount}</div>
          <div className="stat-label">总字数</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.avgWordCount}</div>
          <div className="stat-label">平均字数</div>
        </div>
      </div>

      <div className="stat-section">
        <h4>分类统计</h4>
        <div className="stat-tags">
          {Object.entries(stats.categories).map(([category, count]) => (
            <div key={category} className="stat-tag">
              <span className="stat-tag-label">{category}</span>
              <span className="stat-tag-count">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {Object.keys(stats.tags).length > 0 && (
        <div className="stat-section">
          <h4>标签统计</h4>
          <div className="stat-tags">
            {Object.entries(stats.tags).map(([tag, count]) => (
              <div key={tag} className="stat-tag">
                <span className="stat-tag-label">{tag}</span>
                <span className="stat-tag-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

NoteStats.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string)
  })).isRequired
}

export default NoteStats 