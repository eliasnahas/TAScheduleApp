import React from "react";
import { Link } from "react-router";
import * as RecordActions from "../actions/RecordActions";

export default class Record extends React.Component {
  deleteButton(id) {
    RecordActions.deleteRecord(id);
    location.reload();

  }

  render() {
    const params = this.props;
    const { id, title, description, startTime, endTime } =  params;
    return (
      <tr>
        <td>{title}</td>
        <td>{description}</td>
        <td>{startTime}</td>
        <td>{endTime}</td>
        <td>
          <Link to={`record/${id}`}><button>Edit</button></Link>
          <Link><button id='deleteButton' onClick={() => {this.deleteButton(id)}}>Delete</button></Link>
        </td>
      </tr>
    );
  }
}