import PropTypes from 'prop-types'
import '../../styles/common/modal.css'

function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  width = '600px'
}) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal" 
        style={{ width }} 
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{title}</h3>
          <button 
            type="button" 
            className="modal-close" 
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          {footer}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  width: PropTypes.string
}

export default Modal 