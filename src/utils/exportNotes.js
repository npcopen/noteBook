export const exportNotes = (notes, format) => {
  let content
  let filename
  let type

  switch (format) {
    case 'json':
      content = JSON.stringify(notes, null, 2)
      type = 'application/json'
      filename = 'notes.json'
      break
    case 'markdown':
      content = notesToMarkdown(notes)
      type = 'text/markdown'
      filename = 'notes.md'
      break
    case 'txt':
      content = notesToText(notes)
      type = 'text/plain'
      filename = 'notes.txt'
      break
    default:
      throw new Error('不支持的导出格式')
  }

  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const notesToMarkdown = (notes) => {
  return notes.map(note => {
    let md = `## ${note.title}\n\n`
    md += `${note.content}\n\n`
    if (note.tags?.length) {
      md += `标签: ${note.tags.join(', ')}\n`
    }
    md += `分类: ${note.category}\n`
    md += `更新时间: ${new Date(note.updatedAt).toLocaleString()}\n\n---\n\n`
    return md
  }).join('')
}

const notesToText = (notes) => {
  return notes.map(note => {
    let txt = `${note.title}\n`
    txt += `${note.content}\n\n`
    if (note.tags?.length) {
      txt += `标签: ${note.tags.join(', ')}\n`
    }
    txt += `分类: ${note.category}\n`
    txt += `更新时间: ${new Date(note.updatedAt).toLocaleString()}\n\n`
    return txt
  }).join('---\n\n')
} 