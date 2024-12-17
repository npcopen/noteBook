import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../common/Button'
import '../../styles/notes/export-button.css'

const exportFormats = [
  { value: 'json', label: 'JSON' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'txt', label: 'Text' }
]

function ExportButton({ onExport }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="export-button">
      <Button 
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
      >
        导出笔记
      </Button>
      {isOpen && (
        <div className="export-dropdown">
          {exportFormats.map(format => (
            <button
              key={format.value}
              className="export-option"
              onClick={() => {
                onExport(format.value)
                setIsOpen(false)
              }}
            >
              {format.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

ExportButton.propTypes = {
  onExport: PropTypes.func.isRequired
}

export default ExportButton 