import React, { PureComponent } from 'react'

class Comment extends PureComponent {
  render() {
    return <div>{this.body}</div>
  }

  get body() {
    return (
      <div>
        <h5>Пользователь: {this.props.comment.user}</h5>
        <section>{this.props.comment.text}</section>
      </div>
    )
  }
}

export default Comment
