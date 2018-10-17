import React from 'react'
import PropTypes from 'prop-types'

function Index({ comment }) {
  return (
    <div>
      {comment.text} <b>by {comment.user}</b>
    </div>
  )
}

Index.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.string
  }).isRequired
}

export default Index
