import React, { Component } from "react";
import { connect } from "react-redux";
class InfoForm extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }
  state = {
    value: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
    errors: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
  };
  handleChange = (event) => {
    // console.log(event.target.name);
    // console.log(event.target.value);

    const { name, value } = event.target;
    this.setState({
      value: {
        ...this.state.value,
        [name]: value,
      },
    });
  };

  handleSubmit = (event) => {
    // console.log(event)
    event.preventDefault();

    const isValid = event.target.checkValidity();
    console.log(isValid);
    if (!isValid) {
      return;
    }

    if (this.props.selectedStudent) {
      this.props.dispatch({
        type: "UPDATE_STUDENT",
        payload: this.state.value,
      })
    } else {
      this.props.dispatch({
        type: "ADD_STUDENT",
        payload: this.state.value,
      });
    }
  
  };

  handleOnBlur = (event) => {
    let message = "";
    const { validationMessage, name, validity, title, minLength, maxLength } =
      event.target;
    const { valueMissing, tooShort, tooLong, patternMismatch } = validity;
    // console.log(event);
    // console.log(validationMessage);
    console.log(patternMismatch);

    if (valueMissing) {
      message = `${title} is require`;
    }

    if (tooShort || tooLong) {
      message = `${title} from ${minLength}-${maxLength} character`;
    }

    if (patternMismatch) {
      message = `${title} is invalid partern`;
    }
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: message,
      },
    });
  };
  static getDerivedStateFromProps(nextProps, currentState) {

    console.log({
      nextProps: JSON.parse(JSON.stringify(nextProps)),
      currentState: JSON.parse(JSON.stringify(currentState))
    })
    if (nextProps.selectedStudent && currentState.value.maSV !== nextProps.selectedStudent.maSV) {
      currentState.value = nextProps.selectedStudent
    }


    return currentState
  }
  render() {
    const { maSV = "", hoTen = "", soDienThoai = "", email = "", } =
      this.state.value || {};

    return (
      <div className="card p-0">
        <div className="card-header bg-dark text-white font-weight-bold text-left">
          THÔNG TIN SINH VIÊN
        </div>
        <div className="card-body">
          <form ref={this.formRef} noValidate onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-6 text-left">
                <div className="form-group">
                  <label>Mã SV</label>
                  <input
                    // value={this.props.selectedStudent?.maSV}
                    value={maSV}
                    title="Mã SV"
                    required
                    minLength={2}
                    maxLength={5}
                    onBlur={this.handleOnBlur}
                    name="maSV"
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger">{this.state.errors.maSV}</span>
                </div>
              </div>
              <div className="col-6 text-left">
                <div className="form-group">
                  <label>Họ tên</label>
                  <input
                    value={hoTen}
                    title="Họ Tên"
                    required
                    onBlur={this.handleOnBlur}
                    name="hoTen"
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger">{this.state.errors.hoTen}</span>
                </div>
              </div>
              <div className="col-6 text-left">
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    value={soDienThoai}
                    title="Số điện thoại"
                    required
                    onBlur={this.handleOnBlur}
                    name="soDienThoai"
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger">
                    {this.state.errors.soDienThoai}
                  </span>
                </div>
              </div>
              <div className="col-6 text-left">
                <div className="form-group">
                  <label>Email </label>
                  <input
                    value={email}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Email"
                    required
                    onBlur={this.handleOnBlur}
                    name="email"
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                  />
                  <span className="text-danger">{this.state.errors.email}</span>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted text-left">
              {/* button không định nghĩa type mặc định type là submit */}
              <button
                disabled={!this.formRef.current?.checkValidity()}
                className="btn bg-success text-white mr-2 "
              >
                THÊM SINH VIÊN
              </button>
              <button type="reset" className="btn btn-outline-dark">
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    selectedStudent: state.studentReducer.selectedStudent,
  };
};

export default connect(mapStateToProps)(InfoForm);
