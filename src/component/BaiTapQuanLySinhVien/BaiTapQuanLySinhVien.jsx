import React, { Component } from 'react'
import InfoForm from './InfoForm'
import StudentManagement from './StudentManagement'

export default class BaiTapQuanLySinhVien extends Component {
  render() {
    return (
        <div className="w-75 mx-auto mt-5">
            <InfoForm />
            <StudentManagement/>
                
            </div>
    )
  }
}
