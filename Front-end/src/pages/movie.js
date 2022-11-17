import "bootstrap/dist/css/bootstrap.min.css";
//import '../css/login.css'
import React from "react";
import Dataservice from "../dataservice";
import Cookies from "universal-cookie/cjs/Cookies";
import MovieList from "../components/movielist";
export default class Movie extends React.Component {
  constructor() {
    super(...arguments);
    this.dataservice = new Dataservice();
    this.reviewCookies = new Cookies();
    let vuser = this.reviewCookies.get("reviewuser");
    this.state = {
      movie_id:0,
      movie_title: "",
      movie_year: 0,
      movie_language: "",
      movie_genre: "HORROR",
      movie_publish: false,
      user:vuser,
      movielist:[]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getMovies = this.getMovies.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(target);
    this.setState({
      [name]: value,
    });
  }
  onSubmit() {
    console.log(this.state.movie_id);
    if(this.state.movie_id === 0)
    {
      
        this.dataservice.postMovie(this.state).then(async(res) => {console.log(res);
          let list = await this.getMovies();
          this.setState({movielist:list.data});
        });
    }
    else{
        this.dataservice.updateMovie(this.state).then(async(res) => {console.log(res);
        let list = await this.getMovies();
        this.setState({movielist:list.data});
        });
    }

  }
  onCancel() {
    document.getElementById("movie_form").reset();
  }
  async getMovies(){
   
      let list = await this.dataservice.getMovie();
      console.log(list);
      return list;
  
    
  }
  async  componentDidMount(){
    let list = await this.getMovies();
    this.setState({movielist:list.data});
    
  }
  setUpdateData =(data)=> {
    let publish=false;
  
    if (data.movie_publish=="true")
    {
      publish= true
    }
    this.setState({ movie_title:data.movie_title,
                    movie_year:data.movie_year,
                    movie_language:data.movie_language,
                    movie_genre:data.movie_genre,
                    movie_publish:publish,
                    movie_id:data.movie_id
      });


  }
  render() {
    let show = false;
      console.log(this.state.user);
      if (this.state.user !== undefined)
      {
         if ( this.state.user.user_category=="admin")
         {
            show = true;
         }
      }
    return (
      <div className="container-fluid bg-custom-image">
   

      <form class=" d-flex flex-column " id="movie_form">
        <div class=" px-3 pt-5 pb-2 d-flex align-items-center justify-content-center">
          <div class="col-4">
            <div class="col-lg-12 d-flex flex-row px-2 py-1 align-items-center border-bottom border-primary shadow-custom bg-white">
              <p class="h5 ps-4 fw-bold mt-2">MOVIES</p>
              <button
                type="submit"
                className="savebtn m-3 ms-auto align-items-center px-4"
                onClick={this.onSubmit}
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
                <div class="px-2 pt-1">
                  <div class="title-border-radius fw-bold py-1 mb-1 ps-3 text-white custom-bg-colour">
                    Movies details
                  </div>
                </div>
                {(this.state.user.user_category === "admin")&&
                <div class="form-check align-items-center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={this.state.movie_publish}
                    id="movie_publish"
                    name="movie_publish"
                     onChange={this.handleInputChange}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Publish
                  </label>
                </div>}
                <div class="row p-2">
                  <div class="col-xs-12 col-md-12">
                    <div class="py-1">
                      <label className="form-label h6">Movie name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="movie_title"
                        name="movie_title"
                        value={this.state.movie_title}
                        required
                        onChange={this.handleInputChange}
                      />
                    </div>

                    <div class="py-1">
                      <label className="form-label h6">Year of release</label>
                      <input
                        type="number"
                        className="form-control"
                        id="movie_year"
                        name="movie_year"
                        value ={this.state.movie_year}
                        required
                        onChange={this.handleInputChange}
                      />
                    </div>

                    <div class="py-1">
                      <label className="form-label h6">Language</label>
                      <input
                        type="text"
                        className="form-control"
                        id="movie_language"
                        name="movie_language"
                        value={this.state.movie_language}
                        required
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div class="py-1">
                    <label className="form-label h6">Genre</label>
                    <select
                      className="form-select"
                      id="movie_genre"
                      name="movie_genre"
                      onChange={this.handleInputChange}
                      value={this.state.movie_genre}
                    >
                      <option value="horror">Horror</option>
                      <option value="action">Action</option>
                      <option value="comedy">Comedy</option>
                      <option value="drama">Drama</option>
                      <option value="fantasy">Fantasy</option>
                      <option value="mystery">Mystery</option>
                      <option value="romance">Romance</option>
                      <option value="thriller">Thriller</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {show &&
      <MovieList list={this.state.movielist} setData={this.setUpdateData}/>
  }
      </div>
    );
  }
}
