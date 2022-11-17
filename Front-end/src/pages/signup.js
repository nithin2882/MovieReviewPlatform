import "bootstrap/dist/css/bootstrap.min.css";
//import '../css/login.css'
import React from "react";
import Dataservice from "../dataservice";
export default class Signup extends React.Component {
  constructor() {
    super(...arguments);
    this.dataservice = new Dataservice();
  
    this.state = {
      user_name: "",
      user_emailid: "",
      user_password: "",
      user_category: "viewer",
    };
    this.handleInputChange=this.handleInputChange.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
   console.log(target)
    this.setState({
      [name]: value,
    });
  }
  onSubmit(){
    this.dataservice
    .postUsers(this.state)
    .then((res) => console.log(res));
  }
  render() {
    console.log("state",this.state)
    return (
      <div className="container-fluid bg-custom-image">
      <form className=" h-100 d-flex align-items-end justify-content-center py-5">
        <div class="custom-color-1 col-5 p-5 custom-border custom-shadow ">
          <div className="">
            <label className="form-label h6">User name</label>
            <div class="input-group mb-2">
              <span class="input-group-text" id="basic-addon1">
                <i class="custom-color-2 fa fa-user" aria-hidden="true"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                name="user_name"
                id="user_name"
                required
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="">
            <label className="form-label h6">Email id</label>
            <div class="input-group mb-2">
              <span class="input-group-text" id="basic-addon1">
                <i class="custom-color-2 fa fa-user" aria-hidden="true"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Email id"
                aria-label="Email id"
                name="user_emailid"
                id="user_emailid"
                required
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="">
            <label className="form-label h6">Password</label>

            <div class="input-group mb-2">
              <span class="input-group-text" id="basic-addon1">
                <i class="custom-color-2 fa fa-key" aria-hidden="true"></i>
              </span>
              <input
                type="password"
                className="form-control"
                name="user_password"
                id="user_password"
                placeholder="Password"
                aria-label="Password"
                required
                onChange={this.handleInputChange}
              />
            </div>
          </div>
 
          <button type="submit" className="loginbtn mt-3 " onClick={this.onSubmit}>
            <p class="my-1 h6">SIGNUP</p>
          </button>

          <button className="btn btn-sm btn-outline-secondary float-end mt-1">
            CANCEL
          </button>
        </div>
      </form>
      </div>
    );
  }
}
