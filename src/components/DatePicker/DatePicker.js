import React, { Component } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.css'
import moment from 'moment'

export default (props) => (
  <ReactDatePicker {...props}/>
)
