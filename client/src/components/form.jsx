import React, { Component } from 'react'

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      content: ''
    }
  }

  render() {
    return (
      <form action="/" method="POST">
        <input onChange={ event => this.setState({ title: event.target.value }) }/>
        <br />
        <textarea rows="8" cols="80" onChange={ event => this.setState({ content: event.target.value }) }></textarea>
        <br />
        <button onClick={ this.formSubmit }>Сохранить</button>
        <br /><br />
        <div>
          preview:
          <h2>{ this.state.title }</h2>
          <p>{ this.state.content }</p>
        </div>
      </form>
    )
  }

  formSubmit = (e) => {
    e.preventDefault()

    let formData = new FormData()
    formData.append('title', this.state.title)
    formData.append('content', this.state.content)

    fetch('http://localhost:8000/',
    {
      method: "POST",
      body: formData
    })
    .then(function(res){ console.log('success') })
    .catch(function(err){ console.log('error') })
  }
}

export default Form
