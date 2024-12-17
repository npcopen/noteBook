import { useState, useEffect } from 'react'
import * as api from '../services/api'

function useNotes() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 获取所有笔记
  const fetchNotes = async () => {
    try {
      setLoading(true)
      const data = await api.fetchNotes()
      setNotes(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 初始加载笔记
  useEffect(() => {
    fetchNotes()
  }, [])

  // 创建笔记
  const createNote = async (noteData) => {
    try {
      console.log('Creating note with data:', noteData)
      setLoading(true)
      const { id, ...noteWithoutId } = noteData
      const newNote = await api.createNote(noteWithoutId)
      console.log('Note created:', newNote)
      setNotes(prev => [newNote, ...prev])
      return newNote
    } catch (err) {
      console.error('Create note error:', err)
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 更新笔记
  const updateNote = async (id, noteData) => {
    try {
      setLoading(true)
      const updatedNote = await api.updateNote(id, {
        ...noteData,
        updatedAt: new Date().toISOString()
      })
      setNotes(prev => prev.map(note => 
        note.id === id ? updatedNote : note
      ))
      return updatedNote
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 删除笔记
  const deleteNote = async (id) => {
    try {
      setLoading(true)
      await api.deleteNote(id)
      setNotes(prev => prev.filter(note => note.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    fetchNotes
  }
}

export default useNotes 