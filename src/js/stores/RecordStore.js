import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import $ from 'jquery';

class RecordStore extends EventEmitter {
  constructor() {
    super();
    this.records = this.getAll();
  }

  saveRecord() {
    var text = sessionStorage.getItem("storedJSON");
    var recordsData = JSON.parse(text);
    var largestId = 0;
    var i;
    
    // Find largest ID in the sessionStorage and increments it
    // to give a unique ID to the new appointment
    for (i=0; i < recordsData.length; i++) {
      var recordId = recordsData[i].id;
      if (recordId > largestId) {
        largestId = recordId;
      }
    }

    // Creates new object of the appointment to save
    var idToSave = largestId + 1;
    var titleToSave = $('#title')[0].value;
    var descToSave = $('#description')[0].value;
    var startToSave = $('#startTime')[0].value;
    var endToSave = $('#endTime')[0].value;
    var newRecordToSave = {
      id: idToSave,
      title: titleToSave,
      description: descToSave,
      startTime: startToSave,
      endTime: endToSave
    }

    // Grabs current sessionStorage value and copies it
    // then adds new appointment to the end
    var newSessionItem = $.extend([], recordsData);
    newSessionItem.push(newRecordToSave);

    // Replaces old sessionStorage value with new one
    var newSessionText = JSON.stringify(newSessionItem);
    sessionStorage.setItem("storedJSON", newSessionText);

    // After saving, redirects to the new appointment's details page
    var newPath = '#/record/' + idToSave;
    history.pushState(null, null, newPath);
    location.reload();
  }

  updateRecord(id) {
    // Deletes old appointment from sessionStorage in preparation
    // to add the updated appointment
    this.deleteRecord(id);

    // Grabs stored sessionStorage value
    var text = sessionStorage.getItem("storedJSON");
    var recordsData = JSON.parse(text);

    // Creates new appointment to replace deleted appointment
    var idToSave = id;
    var titleToSave = $('#title')[0].value;
    var descToSave = $('#description')[0].value;
    var startToSave = $('#startTime')[0].value;
    var endToSave = $('#endTime')[0].value;
    var newRecordToSave = {
      id: idToSave,
      title: titleToSave,
      description: descToSave,
      startTime: startToSave,
      endTime: endToSave
    }

    // Replaces old sessionStorage value with new one
    var newSessionItem = $.extend([], recordsData);
    newSessionItem.push(newRecordToSave);
    var newSessionText = JSON.stringify(newSessionItem);
    sessionStorage.setItem("storedJSON", newSessionText);

    // Refreshes page to update title
    location.reload();
  }

  deleteRecord(id) {
    // Returns new array after filtering out the appointment to be deleted
    var newRecords = this.records.filter(function(el) {
      return el.id !== id;
    });

    // Replaces old sessionStorage with new value
    var dataClean = JSON.stringify(newRecords);
    sessionStorage.setItem("storedJSON", dataClean);
  }

  getAll() {
    // If there is no sessionStorage, fetches JSON file and loads it
    // into sessionStorage
    if(sessionStorage.length === 0) {
      var data;
      $.ajax({
        url: './js/appointments.json',
        dataType: 'json',
        async: false,
        data: data,
        success: function(data) {
          var dataToStore = [];
          var index;
          for(index = 0; index <data.length; ++index) {
            dataToStore.push({id:index, ...data[index]});
          }

          var dataClean = JSON.stringify(dataToStore);
          sessionStorage.setItem("storedJSON", dataClean);
        }
      });
    }

    // Reads sessionStorage and loads it into an object
    var text = sessionStorage.getItem("storedJSON");
    this.records = JSON.parse(text);
    
    // Sorts the appointments by the start time
    function sortByStartTime(a, b) {
      var aStartTime = a.startTime.toLowerCase();
      var bStartTime = b.startTime.toLowerCase();
      return ((aStartTime < bStartTime) ? -1 : ((aStartTime > bStartTime) ? 1 : 0));
    }
    this.records.sort(sortByStartTime);

    return this.records;
  }

  handleActions(action) {

    // Handles the actions on the page
    switch(action.type) {
      case "SAVE_RECORD": {
        // If an appointment exists, update it
        // Otherwise create new appointment
        if(action.id !== ''){
          this.updateRecord(action.id);
        } else {
          this.saveRecord();
        }
        break;
      }
      case "DELETE_RECORD": {
        this.deleteRecord(action.id);
        break;
      }
      default: {
        break;
      }
    }
  }
}

const recordStore = new RecordStore;
dispatcher.register(recordStore.handleActions.bind(recordStore));

export default recordStore;