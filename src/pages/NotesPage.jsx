import { useState, useMemo } from 'react'
import NoteList from '../components/notes/NoteList'
import NoteForm from '../components/notes/NoteForm'
import NoteSorter from '../components/notes/NoteSorter'
import Search from '../components/common/Search'
import Modal from '../components/common/Modal'
import Button from '../components/common/Button'
import useNotes from '../hooks/useNotes'
import '../styles/pages/notes-page.css'

// 在组件外部定义 memoized 函数
const filterNotes = (notes, searchTerm, activeCategory) => {
  return notes.filter(note => {
    const matchesCategory = activeCategory === 'all' || note.category === activeCategory
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })
}

const sortNotes = (notes, sortBy) => {
  const [field, order] = sortBy.split('-')
  const compareValue = order === 'desc' ? -1 : 1
  return [...notes].sort((a, b) => 
    a[field] > b[field] ? compareValue : -compareValue
  )
}

function NotesPage({ activeCategory, noteTypes }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('updatedAt-desc')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  
  const { 
    notes, 
    loading, 
    error,
    createNote,
    updateNote,
    deleteNote,
    fetchNotes
  } = useNotes()

  // 在组件中使用 useMemo
  const filteredNotes = useMemo(() => 
    sortNotes(filterNotes(notes, searchTerm, activeCategory), sortBy),
    [notes, searchTerm, activeCategory, sortBy]
  )

  const handleSubmit = async (noteData) => {
    try {
      console.log('Submitting note:', noteData)
      if (editingNote) {
        await updateNote(editingNote.id, noteData)
      } else {
        await createNote(noteData)
      }
      setIsModalOpen(false)
      setEditingNote(null)
      await fetchNotes()
    } catch (err) {
      console.error('Failed to save note:', err)
      alert('保存笔记失败：' + err.message)
    }
  }

  const handleEdit = (note) => {
    setEditingNote(note)
    setIsModalOpen(true)
  }

  const handleDelete = async (note) => {
    if (window.confirm('确定要删除这条笔记吗？')) {
      try {
        await deleteNote(note.id)
      } catch (err) {
        console.error('Failed to delete note:', err)
      }
    }
  }

  if (loading) return <div className="loading">加载中...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="notes-page">
      <div className="notes-header">
        <h1>我的笔记</h1>
        <div className="notes-actions">
          <Search 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="搜索笔记..."
          />
          <NoteSorter 
            value={sortBy}
            onChange={setSortBy}
          />
          <Button onClick={() => setIsModalOpen(true)}>
            新建笔记
          </Button>
        </div>
      </div>

      <NoteList
        notes={filteredNotes}
        noteTypes={noteTypes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingNote(null)
        }}
        title={editingNote ? '编辑笔记' : '新建笔记'}
        footer={
          <>
            <Button 
              variant="secondary" 
              onClick={() => {
                setIsModalOpen(false)
                setEditingNote(null)
              }}
            >
              取消
            </Button>
            <Button 
              onClick={() => {
                const form = document.getElementById('note-form')
                if (form) {
                  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
                }
              }}
            >
              保存
            </Button>
          </>
        }
      >
        <NoteForm
          id="note-form"
          note={editingNote}
          noteTypes={noteTypes}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  )
}

export default NotesPage 