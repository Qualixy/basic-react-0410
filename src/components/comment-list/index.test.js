import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CommentListWithDecorator from '../comment-list'
import articles from '../../fixtures'

Enzyme.configure({ adapter: new Adapter() })

describe('CommentList', () => {
  it('check closed comments by default, opening comments on click and comments rendering', () => {
    const comments = articles[0].comments
    const container = mount(<CommentListWithDecorator comments={comments} />)

    // check closed comments by default
    expect(container.find('.test--comment-list__body').length).toEqual(0)

    // opening comments on click
    container
      .find('.test--comment-list__btn')
      .at(0)
      .simulate('click')
    expect(container.find('.test--comment-list__body').length).toEqual(1)

    // comments rendering after click
    expect(container.find('.test--comment-list__item').length).toEqual(
      comments.length
    )
  })
})
