
import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Dataservice from "../dataservice";
export default class Topreviews extends React.Component {
    constructor() {
        super(...arguments);
        this.dataservice = new Dataservice();
    this.state = {
        list:[]
    }
}
  
   onRowSelect = (e) => {
    console.log("selection",e.data);
    this.props.setData(e.data);
   }
   async componentDidMount(){
    let vlist = await this.dataservice.gettopreviews();
    this.setState({list:vlist.data})
   }
  render() {

    
    
    return (
        <div className="container bg-light">
            {this.state.list.length>0 &&
             <DataTable value={this.state.list} responsiveLayout="scroll" selectionMode="single"  onRowSelect={this.onRowSelect} >
                <Column field="movie_rating" header="MovieRating" sortable></Column>
                    <Column field="movie_title" header="Movie" sortable></Column>
                    <Column field="movie_year" header="Year" sortable></Column>
                    <Column field="movie_language" header="Language" sortable></Column>
                    <Column field="movie_genre" header="Genre" sortable></Column>
                    <Column field="movie_publish" header="Publish" sortable></Column>
                    <Column field="review_category" header="UserCategory" sortable></Column>
                    <Column field="user_name" header="Name" sortable></Column>
                    <Column field="review_rating" header="Rating" sortable></Column>
                    <Column field="review_comments" header="Comments" sortable></Column>
                </DataTable>
            }      
        </div>
        
    );
  }
}
