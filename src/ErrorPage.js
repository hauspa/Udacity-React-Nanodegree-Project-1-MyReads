import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = (props) => (
  <div>
    <br></br>
    <h1 style={{ textAlign: 'center' }}>Page not found. Sorry!</h1>

    <br></br>
    <div style={{ textAlign: 'center' }}>
      <Link to='/'><button type='text' style={{ backgroundColor: 'lightgreen', padding: 20 + 'px', fontSize: 20 + 'px', cursor: 'pointer' }}>Go back to main page.</button></Link>
    </div>
  </div>
)

export default ErrorPage
