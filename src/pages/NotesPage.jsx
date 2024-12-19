import { useState, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom';
import NoteList from '../components/notes/NoteList'
import NoteForm from '../components/notes/NoteForm'
import NoteSorter from '../components/notes/NoteSorter'
import Search from '../components/common/Search'
import Modal from '../components/common/Modal'
import Button from '../components/common/Button'
import useNotes from '../hooks/useNotes'
import '../styles/pages/notes-page.css'
import { PlusIcon } from '../components/icons'

function NotesPage() {
  const { activeCategory, noteTypes } = useOutletContext();
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
  const filteredNotes = useMemo(() => {
    let filtered = notes;
    
    // 按分类筛选
    if (activeCategory !== 'all') {
      filtered = filtered.filter(note => note.category === activeCategory);
    }
    
    // 按搜索词筛选
    if (searchTerm) {
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // 排序
    return [...filtered].sort((a, b) => {
      const [field, order] = sortBy.split('-');
      const compareValue = order === 'desc' ? -1 : 1;
      return a[field] > b[field] ? compareValue : -compareValue;
    });
  }, [notes, activeCategory, searchTerm, sortBy]);

  const handleSubmit = async (noteData) => {
    try {
      if (editingNote) {
        await updateNote(editingNote.id, noteData);
      } else {
        await createNote(noteData);
      }
      setIsModalOpen(false);
      setEditingNote(null);
      await fetchNotes(); // 重新获取笔记列表
    } catch (err) {
      console.error('Failed to save note:', err);
      alert('保存笔记失败：' + err.message);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleDelete = async (note) => {
    if (window.confirm('确定要删除这条笔记吗？')) {
      try {
        await deleteNote(note.id);
        await fetchNotes(); // 重新获取笔记列表
      } catch (err) {
        console.error('Failed to delete note:', err);
        alert('删除笔记失败：' + err.message);
      }
    }
  };

  if (loading) return <div className="loading">加载中...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="notes-page">
      <div className="notes-header">
        <div className="notes-title">
          <h1>我的笔记</h1>
          <Button 
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            icon={<PlusIcon />}
          >
            新建笔记
          </Button>
        </div>
        <div className="notes-filters">
          <Search 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="搜索笔记..."
          />
          <NoteSorter 
            value={sortBy}
            onChange={setSortBy}
          />
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
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        title={editingNote ? '编辑笔记' : '新建笔记'}
        footer={
          <>
            <Button 
              variant="secondary" 
              onClick={() => {
                setIsModalOpen(false);
                setEditingNote(null);
              }}
            >
              取消
            </Button>
            <Button 
              onClick={() => {
                const form = document.getElementById('note-form');
                if (form) {
                  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
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
  );
}

export default NotesPage; 