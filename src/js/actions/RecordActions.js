import dispatcher from "../dispatcher";

export function saveRecord(id) {
  dispatcher.dispatch({
    type: "SAVE_RECORD",
    id
  })
}

export function deleteRecord(id) {
  dispatcher.dispatch({
    type: "DELETE_RECORD",
    id
  })
}