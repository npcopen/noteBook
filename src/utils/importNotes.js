export const importNotes = async (file) => {
  try {
    const text = await file.text()
    let notes

    if (file.name.endsWith('.json')) {
      notes = JSON.parse(text)
    } else if (file.name.endsWith('.md')) {
      notes = parseMdToNotes(text)
    } else if (file.name.endsWith('.txt')) {
      notes = parseTxtToNotes(text)
    } else {
      throw new Error('不支持的文件格式')
    }

    return notes
  } catch (error) {
    throw new Error(`导入失败: ${error.message}`)
  }
}

const parseMdToNotes = (text) => {
  const notes = []
  const sections = text.split('## ')
  
  sections.forEach(section => {
    if (!section.trim()) return
    
    const lines = section.split('\n')
    const title = lines[0].trim()
    const content = lines.slice(1).join('\n').trim()
    
    if (title && content) {
      notes.push({
        title,
        content,
        category: 'imported',
        tags: ['imported'],
        updatedAt: new Date().toISOString()
      })
    }
  })
  
  return notes
}

const parseTxtToNotes = (text) => {
  const notes = []
  const sections = text.split('\n\n')
  
  sections.forEach(section => {
    const lines = section.trim().split('\n')
    if (lines.length >= 2) {
      notes.push({
        title: lines[0],
        content: lines.slice(1).join('\n'),
        category: 'imported',
        tags: ['imported'],
        updatedAt: new Date().toISOString()
      })
    }
  })
  
  return notes
} 