import React, { Component } from 'react'
import Article from './article'
import PropTypes from 'prop-types'
import accordionDecorator from '../decorators/accordion'

export class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    openItemId: PropTypes.string,
    toggleOpenItem: PropTypes.func,
    useTransition: PropTypes.bool
  }

  render() {
    return <ul>{this.items}</ul>
  }

  get items() {
    const {
      articles,
      openItemId,
      toggleOpenItem,
      useTransition = true
    } = this.props
    return articles.map((article) => (
      <li key={article.id} className="test--article-list__item">
        <Article
          article={article}
          isOpen={openItemId === article.id}
          toggleOpen={toggleOpenItem}
          useTransition={useTransition}
        />
      </li>
    ))
  }

  componentDidMount() {
    const { fetchData } = this.props
    fetchData && fetchData()
  }
}

const ArticleListWithAccordion = accordionDecorator(ArticleList)

export default ArticleListWithAccordion
