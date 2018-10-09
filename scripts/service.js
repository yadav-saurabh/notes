"use strict";
export default class Service {
  /**
   * to update browser localStorage
   * @param {Object} data - note object
   * @param {number} data.id - note id
   * @param {string} data.headig - note heading
   * @param {string} data.body - note body
   * @param {string} data.color - note color
   * @param {Array} data.labels - note labels
   */
  updateNotes(data) {
    console.log(data);
    // localStorage.setItem("notes", JSON.stringify(data));
  }

  /**
   * to get browser localStorage
   */
  getAllNotes() {
    return JSON.parse(localStorage.getItem("notes"));
  }

  /**
   * get note object
   * @param {number} id
   */
  getNoteById(id) {
    const todo = this.getTodos().find((obj) => obj.id === id);
    return todo;
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
