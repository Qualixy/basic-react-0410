import React, { Component } from 'react'

const showDecorator = (OriginalComponent) =>
  class extends Component {
    state = {
      isShow: false
    }

    toggleShow = () => {
      this.setState({ isShow: !this.state.isShow })
    }

    render() {
      return (
        <OriginalComponent
          {...this.props}
          toggleShow={this.toggleShow}
          isShow={this.state.isShow}
        />
      )
    }
  }

export default showDecorator
