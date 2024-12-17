import { createContext, useContext, useReducer } from 'react'

const NotesContext = createContext()

const initialState = {
  notes: [],
  categories: [],
  loading: false,
  error: null
}

function notesReducer(state, action) {
  switch (action.type) {
    case 'SET_NOTES':
      return { ...state, notes: action.payload }
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] }
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(note => 
          note.id === action.payload.id ? action.payload : note
        )
      }
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload)
      }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export function NotesProvider({ children }) {
  const [state, dispatch] = useReducer(notesReducer, initialState)

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  return useContext(NotesContext)
} 