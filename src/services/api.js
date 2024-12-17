const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function fetchNotes() {
  try {
    console.log('Fetching notes from:', `${API_BASE_URL}/notes`)
    const response = await fetch(`${API_BASE_URL}/notes`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log('Fetched notes successfully:', data)
    return data
  } catch (error) {
    console.error('Error fetching notes:', error)
    throw error
  }
}

export async function createNote(note) {
  try {
    console.log('Creating note:', note)
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...note,
        id: Date.now().toString(), // 确保有唯一ID
        updatedAt: new Date().toISOString()
      })
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to create note: ${errorText}`)
    }
    
    const data = await response.json()
    console.log('Note created successfully:', data)
    return data
  } catch (error) {
    console.error('Error creating note:', error)
    throw error
  }
}

export async function updateNote(id, note) {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note)
  })
  if (!response.ok) {
    throw new Error('Failed to update note')
  }
  return response.json()
}

export async function deleteNote(id) {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error('Failed to delete note')
  }
  return true
}

export async function fetchNoteTypes() {
  const response = await fetch(`${API_BASE_URL}/noteTypes`)
  if (!response.ok) {
    throw new Error('Failed to fetch note types')
  }
  return response.json()
}

export async function createNoteType(noteType) {
  const response = await fetch(`${API_BASE_URL}/noteTypes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(noteType)
  })
  if (!response.ok) {
    throw new Error('Failed to create note type')
  }
  return response.json()
}

export async function updateNoteType(id, noteType) {
  const response = await fetch(`${API_BASE_URL}/noteTypes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(noteType)
  })
  if (!response.ok) {
    throw new Error('Failed to update note type')
  }
  return response.json()
}

export async function deleteNoteType(id) {
  const response = await fetch(`${API_BASE_URL}/noteTypes/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error('Failed to delete note type')
  }
  return true
} 