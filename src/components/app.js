import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import Select from 'react-select'
import ArticleList from './article-list'
import ArticleChart from './articles-chart'
import UserForm from './user-form'
import articles from '../fixtures'
import Filter from './filter'

class App extends Component {
  state = {
    selected: null
  }
  render() {
    return (
      <div>
        <UserForm />
        <Select
          options={this.options}
          value={this.state.selected}
          onChange={this.handleSelectionChange}
          isMulti
        />
        <Filter />
        <ArticleList articles={articles} ref={this.setArticleListRef} />
        <ArticleChart articles={articles} />
      </div>
    )
  }

  handleSelectionChange = (selected) => this.setState({ selected })

  get options() {
    return articles.map((article) => ({
      label: article.title,
      value: article.id
    }))
  }

  setArticleListRef = (ref) => {
    console.log('---', 'article list ref', ref, findDOMNode(ref))
  }
}

export default App
