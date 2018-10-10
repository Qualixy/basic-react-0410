import React, { Component } from 'react'
import Comment from './comment'
import showDecorator from '../decorators/show-decorator'

class CommentList extends Component {
  render() {
    const { toggleShow, isShow } = this.props
    const show = isShow ? 'hide' : 'show'
    return (
      <div>
        <h4>Комментарии</h4>
        <button onClick={toggleShow}>{show}</button>
        <ul>{this.items}</ul>
      </div>
    )
  }

  get items() {
    const { comments, isShow } = this.props

    if (!isShow) {
      return null
    }
    return comments.map((comment) => (
      <li key={comment.id}>
        <Comment comment={comment} />
      </li>
    ))
  }
}

export default showDecorator(CommentList)
