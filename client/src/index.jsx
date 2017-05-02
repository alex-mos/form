import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Form from './components/form'
import NoteList from './components/note_list'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: []
    }

    let promise = fetch('http://localhost:8000/notes', {
      method: 'GET'
    }).then(response => {
        return response.json()
    }).then((json) => {
      console.log(json)
      this.setState({ notes: json })
    })
  }

  render() {
    return (
      <div>
        <Form />
        <br />
        <NoteList notes={ this.state.notes } />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
