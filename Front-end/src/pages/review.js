import "bootstrap/dist/css/bootstrap.min.css";
//import '../css/login.css'
import React from "react";
import Dataservice from "../dataservice";
import Cookies from "universal-cookie/cjs/Cookies";
import ReviewList  from "../components/reviewlist";
export default class Review extends React.Component {
  constructor() {
    super(...arguments);
    this.dataservice = new Dataservice();
    this.reviewCookies = new Cookies();
    let user = this.reviewCookies.get("reviewuser");
    this.state = {
      movielist: [],
      movie_id: 0,
      user_id: user.user_id,
      user_category: user.user_category,
      review_rating: 0,
      review_comments: "",
      reviewlist:[]
    };
    this.handleInputChange=this.handleInputChange.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
    this.getUserReviews = this.getUserReviews.bind(this); 
  }
  componentDidMount() {
    this.dataservice
      .getPublishedMovies()
      .then((res) => this.setState({ movielist: res.data }));
       

  }
  async getUserReviews(movie_id){
    let list = await this.dataservice.getMovieBasedReview({"movie_id":movie_id});
    console.log(list);
    return list;

  }
  async handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
     if(name =='movie_id' && value > 0)
    {
      let list =  await this.getUserReviews(value);
      this.setState({
        [name]: value,
        reviewlist :list.data
      });
    }
    else{
    this.setState({
      [name]: value,
      
    });
  }
  }
  onSubmit(e){
    e.preventDefault();
    this.dataservice
    .postReview(this.state)
    .then(async(res) => {
                           console.log(res);
                           let list = await this.getUserReviews(this.state.movie_id);
                           this.setState({reviewlist:list.data});
                          });
  }
  onCancel(){
   document.getElementById("review_form").reset();
  }
  render() {
    return (
     <div className="container-fluid bg-custom-image">
      <form class="d-flex flex-column " id="review_form">
        <div class=" px-3 pt-5 pb-2 d-flex align-items-center justify-content-center">
          <div class="col-4">
            <div class="col-lg-12 d-flex flex-row px-2 py-1 align-items-center border-bottom border-primary shadow-custom bg-white">
              <p class="h5 ps-4 fw-bold mt-2">REVIEW</p>
              <button onClick={this.onSubmit}
                type="submit"
                className="savebtn m-3 ms-auto align-items-center px-4"
              >
                Save
              </button>
              <button className="cancelbtn me-3 align-items-center px-4">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div class=" flex-grow-1 px-3 pt-1 pb-5 d-flex align-items-center justify-content-center">
          <div class="col-4 bg-white shadow-custom h-100 overflow-auto">
            <div class="row p-1 mx-3 m-3 d-flex align-items-center justify-content-center">
              <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 px-1 py-1">
                <div >
                  <label className="form-label h6">Movie</label>
                  <select className="form-select" id="movie_id" name="movie_id" onChange={this.handleInputChange}>
                  <option value="0"> Movie</option>
                    {this.state.movielist.map((item) => {
                      return (
                        <option value={item.movie_id}>
                          {item.movie_title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div class="row p-2">
                  <div class="col-xs-12 col-md-12">
                    <div class="py-1">
                      <label className="form-label h6">Rating</label>
                      <input
                        type="number"
                        className="form-control"
                        id="review_rating"
                        name="review_rating"
                        onChange={this.handleInputChange}
                        min="1"
                        max="10"
                      />
                    </div>

                    <div class="py-1">
                      <label className="form-label h6">Comments</label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="review_comments"
                        name="review_comments" 
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ReviewList list={this.state.reviewlist}/>
      
      </div>
    );
  }
}
