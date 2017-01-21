import React from "react";
import * as RecordActions from "../actions/RecordActions";
import { Link } from "react-router";
import $ from "jquery";

export default class Record extends React.Component {


  render() {
    const { params } = this.props;
    const { record } = params;

    // Reads the sessionStorage and retrieves appropriate appointment
    var text = sessionStorage.getItem("storedJSON");
    var recordsData = JSON.parse(text);
    var getRecord = $.grep(recordsData, function(e){ return e.id == record; });
    var recordData = getRecord[0];
    
    // Sets the heading of the page appropriately if an appointment exists already
    var recordTitle = record ? ("Appointment Details for " + recordData.title) : "New Appointment";

    // If it's a new appointment, hide the delete button and initialize an empty object
    if(!recordData) {
      $('#deleteButton').hide();
      recordData = {
        id: '',
        title: '',
        description: '',
        startTime: '',
        endTime: ''
      }
    };

    // Renders the appointment data and assigns default values to inputs
    return (
      <div className="form-group">
        <h1>{recordTitle}</h1>
        <Link to="/"><button>Appointment List</button></Link><br /><br />
        <label for="title">Title:</label>
        <input className="form-control" id="title" defaultValue={recordData.title} />
        <label for="description">Description:</label>
        <textarea className="form-control" rows="5" id="description" defaultValue={recordData.description}/>
        <label for="startTime">Start Time:</label>
        <input className="form-control" id="startTime" defaultValue={recordData.startTime} />
        <label for="endTime">End Time</label>
        <input className="form-control" id="endTime" defaultValue={recordData.endTime} />
        <Link><button id='saveButton' onClick={() => {RecordActions.saveRecord(recordData.id)}}>Save Appointment</button></Link>
        <Link to='/'><button id='deleteButton' onClick={() => {RecordActions.deleteRecord(recordData.id)}}>Delete Appointment</button></Link>
      </div>
    );
  }
}