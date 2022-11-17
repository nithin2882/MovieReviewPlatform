import "bootstrap/dist/css/bootstrap.min.css";
//import '../css/login.css'
import React from "react";
import Dataservice from "../dataservice";
import Cookies from "universal-cookie";
export default class Login extends React.Component {
  constructor() {
    super(...arguments);
    this.dataservice = new Dataservice();
    this.reviewCookies=new Cookies();
    this.state = {
      user_name: "",
      user_password: "",
    };
    this.handleInputChange=this.handleInputChange.bind(this);
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
  onSubmit(e){
    e.preventDefault();
     this.dataservice
     .postLogin(this.state)
     .then((res) => {console.log(res) 
      if(res.data.length>0) {
        this.reviewCookies.set("reviewuser",res.data[0],{path: "/",domain: "localhost"});
        window.location.href="/review"
      }
      else{
        alert("INVALID USER OR PASSWORD")
      }
    });
   

  }

  render() {
    return (
      <div className="container-fluid bg-custom-image">
      <form className="d-flex align-items-end justify-content-center py-5" >

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
                id="user_name"
                name="user_name"
                onChange={this.handleInputChange}
                required
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
                id="user_password"
                name="user_password"
                placeholder="Password"
                aria-label="Password"
                onChange={this.handleInputChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="loginbtn mt-3" onClick={this.onSubmit}>
            <p class="my-1 h6">LOGIN</p>
          </button>

          <div class="pt-3 text-muted text-end ">Don't have an account?</div>

          <a href="/signup"className="btn btn-sm btn-outline-secondary float-end mt-1">
            SIGN UP
          </a>
        </div>
      </form>
      </div>
    );
  }
}
