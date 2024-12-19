import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import useNoteTypes from '../../hooks/useNoteTypes'
import NoteTypeManager from '../notes/NoteTypeManager'
import Modal from '../common/Modal'
import Button from '../common/Button'

/**
 * 主布局组件
 */
function MainLayout() {
  // 当前选中的笔记分类
  const [activeCategory, setActiveCategory] = useState('all')
  // 控制笔记类型管理器模态框的显示状态
  const [isTypeManagerOpen, setIsTypeManagerOpen] = useState(false)

  // 使用自定义 Hook 获取笔记类型相关的状态和方法
  const { 
    noteTypes,          // 笔记类型列表
    loading: typesLoading,  // 加载状态
    error: typesError,      // 错误信息
    createNoteType,     // 创建笔记类型的方法
    updateNoteType,     // 更新笔记类型的方法
    deleteNoteType      // 删除笔记类型的方法
  } = useNoteTypes()

  /**
   * 打开笔记类型管理器
   */
  const handleManageTypes = () => {
    setIsTypeManagerOpen(true)
  }

  // 加载状态显示
  if (typesLoading) {
    return <div className="loading">加载中...</div>
  }

  // 错误状态显示
  if (typesError) {
    return (
      <div className="error-message">
        加载笔记类型失败: {typesError}
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <div className="content-wrapper">
        {/* 侧边栏：显示笔记分类 */}
        <Sidebar 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          noteTypes={noteTypes || []}  // 提供默认空数组
          onManageTypes={handleManageTypes}
          loading={typesLoading}
        />
        {/* 主要内容区域 */}
        <MainContent>
          <Outlet context={{ activeCategory, noteTypes: noteTypes || [] }} />
        </MainContent>
      </div>

      {/* 笔记类型管理器模态框 */}
      <Modal
        isOpen={isTypeManagerOpen}
        onClose={() => setIsTypeManagerOpen(false)}
        title="笔记类型管理"
        width="800px"
        footer={
          <Button variant="secondary" onClick={() => setIsTypeManagerOpen(false)}>
            关闭
          </Button>
        }
      >
        <NoteTypeManager
          noteTypes={noteTypes}
          onCreateType={createNoteType}
          onUpdateType={updateNoteType}
          onDeleteType={deleteNoteType}
        />
      </Modal>
    </div>
  )
}

export default MainLayout 