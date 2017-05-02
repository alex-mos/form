import React, { Component } from 'react'

const NoteListItem = (props) => {
  return (
    <li>
      <h3>{ props.note.title }</h3>
      <div>{ props.note.content }</div>
      <hr />
    </li>
  )
}

export default NoteListItem
