import PropTypes from 'prop-types'
import '../../styles/common/card.css'

function Card({ children, title, extra, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {(title || extra) && (
        <div className="card-header">
          {title && <div className="card-title">{title}</div>}
          {extra && <div className="card-extra">{extra}</div>}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  extra: PropTypes.node,
  className: PropTypes.string
}

export default Card 