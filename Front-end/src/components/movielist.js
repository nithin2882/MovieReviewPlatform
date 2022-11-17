
import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default class MovieList extends React.Component {
  constructor(props) {
    super(...arguments);    
  
  }
   onRowSelect = (e) => {
    console.log("selection",e.data);
    this.props.setData(e.data);
   }
  render() {

    
    
    return (
        <div className="container bg-light">
            {this.props.list.length>0 &&
             <DataTable value={this.props.list} responsiveLayout="scroll" selectionMode="single"  onRowSelect={this.onRowSelect} >
                    <Column field="movie_title" header="Movie"></Column>
                    <Column field="movie_year" header="Year"></Column>
                    <Column field="movie_language" header="Language"></Column>
                    <Column field="movie_genre" header="Genre"></Column>
                    <Column field="movie_publish" header="Publish"></Column>
                </DataTable>
            }      
        </div>
        
    );
  }
}
