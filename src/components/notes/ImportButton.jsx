import { useRef } from 'react'
import PropTypes from 'prop-types'
import Button from '../common/Button'
import '../../styles/notes/import-button.css'

function ImportButton({ onImport }) {
  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      await onImport(file)
      // 清除文件选择，以便可以重复导入同一个文件
      e.target.value = ''
    } catch (error) {
      console.error('Import failed:', error)
      alert(error.message)
    }
  }

  return (
    <div className="import-button">
      <Button 
        variant="secondary"
        onClick={handleClick}
      >
        导入笔记
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.md,.txt"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}

ImportButton.propTypes = {
  onImport: PropTypes.func.isRequired
}

export default ImportButton 