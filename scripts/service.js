"use strict";
export default class Service {
  /**
   * to update browser localStorage
   * @param {Object} data - note object
   * @param {number} data.id - note id
   * @param {string} data.head - note heading
   * @param {string} data.body - note body
   * @param {string} data.color - note color
   */
  addNotes(data) {
    let modData = this.getAllNotes();
    if ( !Array.isArray(data)) {
      data = [data];
    } 
    if (!modData) {
      modData = [];
      modData = [...modData, ...data];
    } else {
      modData = [...modData, ...data];
    }
    localStorage.setItem("notes", JSON.stringify(modData));
  }

  /**
   * update notes
   * @param {Object} data - note object
   * @param {number} data.id - note id
   * @param {string} data.head - note heading
   * @param {string} data.body - note body
   * @param {string} data.color - note color
   */
  updateNotes({...data}) {
    data.id = parseInt(data.id);
    const index = this.getAllNotes().findIndex( el => el.id === data.id);
    let modData = this.getAllNotes();
    modData[index] = data;
    localStorage.setItem("notes", JSON.stringify(modData));
  }

  
  /**
   * delete notes
   * @param {Object} data - note object
   * @param {number} data.id - note id
   * @param {string} data.head - note heading
   * @param {string} data.body - note body
   * @param {string} data.color - note color
   */
  deleteNotes({...data}) {
    data.id = parseInt(data.id);
    const index = this.getAllNotes().findIndex( el => el.id === data.id);
    let modData = this.getAllNotes();
    modData.splice(index,1)
    localStorage.setItem("notes", JSON.stringify(modData));
  }
  
  /**
   * to get browser localStorage
   */
  getAllNotes() {
    return JSON.parse(localStorage.getItem("notes"));
  }

  /**
   * to update browser localStorage
   * @param {number} uid - unique id
   */
  updateUID(uid) {
    localStorage.setItem("uid", JSON.stringify(uid));
  }

  /**
   * to new Unique Id
   */
  getUID() {
    return JSON.parse(localStorage.getItem("uid"));
  }
}
