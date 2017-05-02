import React, { Component } from 'react'
import NoteListItem from './note_list_item'

const NoteList = (props) => {
  const notes = props.notes.map(note => <NoteListItem note={ note } />)

  return (
    <ul>
      Total notes: { props.notes.length }
      { notes }
    </ul>
  )
}

export default NoteList
