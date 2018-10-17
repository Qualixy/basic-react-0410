import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import CommentList from '../comment-list'
import './style.css'

class Index extends PureComponent {
  state = {
    error: null
  }

  componentDidCatch(error) {
    this.setState({ error })
  }

  render() {
    const { article, isOpen, useTransition } = this.props
    return (
      <div>
        <h3>
          {article.title}
          <button onClick={this.handleClick} className="test--article__btn">
            {isOpen ? 'close' : 'open'}
          </button>
        </h3>
        {useTransition ? (
          <CSSTransition
            transitionName="article"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {this.body}
          </CSSTransition>
        ) : (
          this.body
        )}
      </div>
    )
  }

  handleClick = () => this.props.toggleOpen(this.props.article.id)

  get body() {
    const { isOpen, article } = this.props
    if (!isOpen) return null
    if (this.state.error) return <h3>Error</h3>

    return (
      <section className="test--article__body">
        {article.text}
        <CommentList comments={article.comments} />
      </section>
    )
  }
}

Index.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func,
  useTransition: PropTypes.bool
}

export default Index
