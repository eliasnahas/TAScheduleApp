import React from "react";
import Record from "../components/Record";
import * as RecordActions from "../actions/RecordActions";
import RecordStore from "../stores/RecordStore";
import { Link } from "react-router";

export default class List extends React.Component {
  constructor() {
    super();
    this.getRecords = this.getRecords.bind(this);
    this.state = {
      records: RecordStore.getAll(),
    };
  }

  componentWillMount() {
    RecordStore.on("change", this.getRecords);
  }

  componentWillUnmount() {
    RecordStore.removeListener("change", this.getRecords);
  }

  getRecords() {
    this.setState({
      records: RecordStore.getAll(),
    });
  }

  createRecord() {
    RecordActions.createRecord(Date.now());
  }

  reloadRecords() {
    RecordActions.reloadRecords();
  }

  // Loads a table of all appointments if they exist or prompts to make
  // a new appointment if none do
  render() {
    const { records } = this.state;
    if (records && (records.length != 0)) {
      const RecordList = records.map((record) => {
        return <Record key={record.id} {...record}/>;
      });

      return (
        <div className='table-responsive'>
          <h1>Appointments</h1>
          <Link to="record"><button>Create New Appointment</button></Link>
          <table className='table-hover table'>
            <thead>
              <tr>
                <th width='15%'>Title</th>
                <th width='30%'>Description</th>
                <th width='20%'>Start Time</th>
                <th width='20%'>End Time</th>
                <th width='15%'></th>
              </tr>
            </thead>
            <tbody>
              {RecordList}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className='table-responsive'>
          <h1>Appointments</h1>
          <Link to="record"><button>Create New Appointment</button></Link><br />
          There are no appointments. Please create a new one.
        </div>
      )
    }
  }
}