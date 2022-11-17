
import React from "react";


export default class ReviewList extends React.Component {
  constructor(props) {
    super(...arguments);
  
  
  }
  
  render() {

    console.log(this.props);
    return (
     
        <ol class="list-group list-group-numbered">
         {this.props.list.map((item) => {
        return( <li class="list-group-item d-flex justify-content-between align-items-start">
           <img
                    className="rounded-circle ms-1"
                    width="50px"
                    src="../images/img_avatar.png"
                    alt=""
                  />
          <div class="ms-2 me-auto">
            
            <div>Rating :{item.review_rating}</div>
            <div>Comments : {item.review_comments}</div>
            <div class="fw-bold">{item.user_name}</div>
          </div>
         
        </li>
          ) })}
      </ol>
    );
  }
}
