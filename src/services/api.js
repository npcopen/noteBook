const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// 获取当前用户ID
const getCurrentUserId = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return fetch(`${API_BASE_URL}/user_tokens?token=${token}`)
    .then(res => res.json())
    .then(tokens => tokens[0]?.user_id || null);
}

export async function fetchNotes() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }

    console.log('Fetching notes from:', `${API_BASE_URL}/notes?user_id=${userId}`);
    const response = await fetch(`${API_BASE_URL}/notes?user_id=${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched notes successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
}

export async function createNote(note) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }

    console.log('Creating note:', note);
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...note,
        user_id: userId,
        id: Date.now().toString(),
        updatedAt: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create note: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Note created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
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
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/noteTypes?user_id=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch note types')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching note types:', error);
    throw error;
  }
}

export async function createNoteType(noteType) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/noteTypes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...noteType,
        user_id: userId,
        created_at: new Date().toISOString()
      })
    })
    if (!response.ok) {
      throw new Error('Failed to create note type')
    }
    return response.json()
  } catch (error) {
    console.error('Error creating note type:', error);
    throw error;
  }
}

export async function updateNoteType(id, noteType) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }
  
    // 验证笔记类型是否属于当前用户
    const checkResponse = await fetch(`${API_BASE_URL}/noteTypes/${id}`);
    if (!checkResponse.ok) {
      throw new Error('Failed to fetch note type');
    }
    const existingNoteType = await checkResponse.json();
    if (existingNoteType.user_id !== userId) {
      throw new Error('Unauthorized to update this note type');
    }
  
    const response = await fetch(`${API_BASE_URL}/noteTypes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...noteType,
        user_id: userId,
        created_at: existingNoteType.created_at
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update note type');
    }
    return response.json();
  } catch (error) {
    console.error('Error updating note type:', error);
    throw error;
  }
}

export async function deleteNoteType(id) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }
  
    // 验证笔记类型是否属于当前用户
    const checkResponse = await fetch(`${API_BASE_URL}/noteTypes/${id}`);
    if (!checkResponse.ok) {
      throw new Error('Failed to fetch note type');
    }
    const noteType = await checkResponse.json();
    if (noteType.user_id !== userId) {
      throw new Error('Unauthorized to delete this note type');
    }
  
    const response = await fetch(`${API_BASE_URL}/noteTypes/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Failed to delete note type')
    }
    return true
  } catch (error) {
    console.error('Error deleting note type:', error);
    throw error;
  }
} 