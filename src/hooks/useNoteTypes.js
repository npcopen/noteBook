import { useState, useEffect } from 'react'
import * as api from '../services/api'

/**
 * 笔记类型管理的自定义 Hook
 * 提供笔记类型的 CRUD 操作和状态管理
 * 
 * @returns {Object} 包含笔记类型状态和操作方法的对象
 */
function useNoteTypes() {
  // 笔记类型列表状态
  const [noteTypes, setNoteTypes] = useState([])
  // 加载状态
  const [loading, setLoading] = useState(true)
  // 错误状态
  const [error, setError] = useState(null)

  // 组件挂载时获取笔记类型列表
  useEffect(() => {
    fetchNoteTypes()
  }, [])

  /**
   * 获取所有笔记类型
   */
  const fetchNoteTypes = async () => {
    try {
      setLoading(true)
      const data = await api.fetchNoteTypes()
      setNoteTypes(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /**
   * 创建新的笔记类型
   * @param {Object} noteType - 笔记类型数据
   * @returns {Promise<Object>} 创建的笔记类型对象
   */
  const createNoteType = async (noteType) => {
    try {
      setLoading(true)
      const newNoteType = await api.createNoteType({
        ...noteType,
        // 将名称转换为小写并替换空格为连字符作为值
        value: noteType.name.toLowerCase().replace(/\s+/g, '-')
      })
      setNoteTypes(prev => [...prev, newNoteType])
      return newNoteType
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * 更新笔记类型
   * @param {string} id - 笔记类型ID
   * @param {Object} noteType - 更新的笔记类型数据
   * @returns {Promise<Object>} 更新后的笔记类型对象
   */
  const updateNoteType = async (id, noteType) => {
    try {
      setLoading(true)
      const updatedNoteType = await api.updateNoteType(id, {
        ...noteType,
        value: noteType.name.toLowerCase().replace(/\s+/g, '-')
      })
      setNoteTypes(prev => prev.map(type => 
        type.id === id ? updatedNoteType : type
      ))
      return updatedNoteType
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * 删除笔记类型
   * @param {string} id - 要删除的笔记类型ID
   */
  const deleteNoteType = async (id) => {
    try {
      setLoading(true)
      await api.deleteNoteType(id)
      setNoteTypes(prev => prev.filter(type => type.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    noteTypes,           // 笔记类型列表
    loading,            // 加载状态
    error,             // 错误信息
    createNoteType,    // 创建笔记类型方法
    updateNoteType,    // 更新笔记类型方法
    deleteNoteType,    // 删除笔记类型方法
    refreshNoteTypes: fetchNoteTypes  // 刷新笔记类型列表方法
  }
}

export default useNoteTypes 