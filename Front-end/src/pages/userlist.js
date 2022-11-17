import Dataservice from "../dataservice";
import React from "react";
export default class Userlist extends React.Component {
  constructor() {
    super(...arguments);
    this.dataservice = new Dataservice();
    this.state = {
      userlist: [],
    };
  }
  componentDidMount() {
    this.dataservice
      .getUsers()
      .then((res) => this.setState({ userlist: res.data }));
  }
  render() {
    console.log(this.state.userlist);
    return (
      <div>
        <div className="card-body py-2">
          {this.state.userlist.map((item) => {
            return (
              <div className="d-flex align-items-center border-bottom pb-2 position-relative mb-3">
                <div className="avatar avatar-2xl status-online">
                  <img
                    className="rounded-circle"
                    width="50px"
                    src="../images/img_avatar.png"
                    alt=""
                  />
                </div>
                <div className="flex-1 ms-3">
                  <h6 className="mb-0 fw-semi-bold">
                    <a
                      className="stretched-link text-900"
                      href="pages/user/profile.html"
                    >
                      {item.user_name}
                    </a>
                  </h6>
                  <p className="text-500 fs--2 mb-0">{item.user_emailid}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
