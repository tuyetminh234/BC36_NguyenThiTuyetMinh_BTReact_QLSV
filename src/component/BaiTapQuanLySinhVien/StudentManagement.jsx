import React, { Component } from 'react'
import { connect } from "react-redux"
class StudentManagement extends Component {

    state = {
        keyword: ""
    }

    renderContent = () => {
        const filteredData = this.props.studentList.filter(ele => {
            return ele.hoTen.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1
        })

        return filteredData.map((element, idx) => {
            return (
                <tr key={element.maSV} className ='bg-light' >
                    <td>{element.maSV}</td>
                    <td>{element.hoTen}</td>
                    <td>{element.soDienThoai}</td>
                    <td>{element.email}</td>
                    
                    <td>
                        <button onClick={()=> this.setSelectedStudent(element)} className="btn btn-info mr-2">EDIT</button>
                        <button onClick={()=> this.deleteStudent(element)} className="btn btn-danger">DELETE</button>
                    </td>
                </tr>

            )
        })
    }

    setSelectedStudent = (student) => {
        this.props.dispatch({
            type: "SET_SELECTED_STUDENT",
            payload: student,
        })
    }

    deleteStudent = (student) => {
        this.props.dispatch({
            type: "DELETE_STUDENT",
            payload: student,
        })
    }
    render() {
        return (
            <div className="card p-0 mt-3">
                <div className="card-header font-weight-bold">STUDENT MANAGEMENT</div>
                <div className="row mt-4 px-3 ">
                    <div className="col-4">
                        <div className="form-group mb-0">
                            <input
                                type="text"
                                placeholder="Search by full name..."
                                className="form-control"
                                onChange={(event)=> this.setState({keyword: event.target.value})}
                            />
                        </div>
                    </div>
                    <div className="col-3 ml-auto">
                        <div className="form-group mb-0">
                            <select className="form-control">
                                <option>All</option>
                                <option>Client</option>
                                <option>Admin</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Mã SV</th>
                                <th>Họ tên</th>
                                <th>Điện thoại</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.renderContent()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        studentList: state.studentReducer.studentList,
    }
}
export default connect(mapStateToProps)(StudentManagement)