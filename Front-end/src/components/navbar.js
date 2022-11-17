import React from "react";
import Cookies from "universal-cookie/cjs/Cookies";
export default class Navbar extends React.Component{
  constructor() {
    super(...arguments);
    this.reviewCookies = new Cookies();
    let vuser = this.reviewCookies.get("reviewuser");
    this.state = {
      user:vuser
    };
    
  }
  capitalize=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  logout=(e)=>{
    e.preventDefault();
    this.reviewCookies.remove("reviewuser",{path: "/",domain: "localhost"} );
    window.location.href="/"; 
   
    
  }
    render(){
      let show = false;

      if (this.state.user !== undefined)
      {
         if ( this.state.user.user_category =="admin")
         {
            show = true;
         }
      }
        return(
          <div>
            <nav className="navbar navbar-expand-lg bg-light rounded" aria-label="Eleventh navbar example">
              <div className="container-fluid">

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-center" id="navbarsExample09">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="signup">Signup</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="movie">Movie</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="review">Review</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="topreview">TopReview</a>
                    </li>
                    {show && <li className="nav-item">
                      <a className="nav-link" href="userlist">Userlist</a>
                    </li>}
                  </ul>
                </div>
              </div>
              {this.state.user !== undefined &&
              <form class="d-flex" role="search">
                <span className="navbar-text pb-0 me-2"><h4>{this.capitalize(this.state.user.user_name)}</h4> </span>   
                <button className="cancelbtn me-3 align-items-center px-4" type="submit" onClick={this.logout}>logout</button>
              </form>
         }
            </nav>
           

            {this.props.children}
          </div>
  );
    }
}