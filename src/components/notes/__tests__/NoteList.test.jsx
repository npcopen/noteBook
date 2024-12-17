import { render, screen, fireEvent } from '@testing-library/react'
import NoteList from '../NoteList'

describe('NoteList', () => {
  const mockNotes = [
    {
      id: '1',
      title: '测试笔记',
      content: '测试内容',
      category: 'work',
      tags: ['test'],
      updatedAt: new Date().toISOString()
    }
  ]

  it('renders empty state when no notes', () => {
    render(<NoteList notes={[]} onEdit={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('暂无笔记')).toBeInTheDocument()
  })

  it('renders notes correctly', () => {
    render(<NoteList notes={mockNotes} onEdit={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('测试笔记')).toBeInTheDocument()
  })
}) 