"use strict";

import Common from "./common.js";
import Placement from "./placement.js";
import Service from "./service.js";

const placement = new Placement();
const common = new Common();
const service = new Service();
export default class Notes {

  /* to bind to this */
  constructor() {
    this.updateCurrentNote = this.updateCurrentNote.bind(this);
    this.editNote = this.editNote.bind(this);
  }
  
  /**
   * create the todo element and retuns a node of the type <li>
   * @param object
   */
  createNote(obj) {
    /* crate a div with class 'note' */
    const note = this.createElement("div", [
      { type: "className", handler: "note" },
      { type: "dataset", data: "id", handler: obj.id },
      { type: "dataset", data: "head", handler: obj.head },
      { type: "dataset", data: "body", handler: obj.body },
      { type: "dataset", data: "color", handler: obj.color }
    ]);
    const wrapper = this.createElement("div", [{ type: "className", handler: "action-wrapper" }]);
    wrapper.append(
      this.createElement("span",[{ type: "className", handler: "color-select" }],[{ type: "onclick", handler: "setColorPalette" }]),
      this.createElement("span",[{ type: "className", handler: "edit-note" }],[{ type: "onclick", handler: "editNote" }]),
      this.createElement("span",[{ type: "className", handler: "delete-note" }],[{ type: "onclick", handler: "deleteNote" }])
    );
    note.append(
      this.createElement("div", [{ type: "className", handler: "note-heading" },{ type: "innerHTML", handler: obj.head }]),
      this.createElement("div", [{ type: "className", handler: "note-body" },{ type: "innerHTML", handler: obj.body }]),
      wrapper
    );

    return note;
  }

  /**
   * dynamically create elements
   * @param elementName
   * @param options
   * @param events
   */
  createElement(elementName, options, events) {
    const temp = document.createElement(elementName);
    /* if element has options */
    if (!!options) {
      options.forEach(({ type, handler, data }) => {
        !data ? (temp[type] = handler) : (temp[type][data] = handler);
      });
    }
    /* if element has events */
    if (!!events) {
      events.forEach(({ type, handler }) => {
        temp[type] = this[handler];
      });
    }
    return temp;
  }

  /**
   * click event on note to edit
   */
  editNote(e) {
    const data = e.target.parentNode.parentNode.dataset;
    common.showModal();
    common.editNoteHead.value = data.head;
    common.editNoteBody.value = data.body;
    common.updateNote.onclick = () => this.updateCurrentNote(data);
  }

  /**
   * update current note
   * @param {*} data 
   */
  updateCurrentNote(data) {
    const notes = common.notes;
    let index;
    for (let i = 0; i < notes.length; i++) {
      if(notes[i].dataset.id === data.id) {
        index = i;
        break;
      }
    }
    notes[index].dataset.head = common.editNoteHead.value;
    notes[index].dataset.body = common.editNoteBody.value;
    const head = notes[index].getElementsByClassName('note-heading')[0];
    const body = notes[index].getElementsByClassName('note-body')[0];
    head.innerHTML = common.editNoteHead.value;
    body.innerHTML = common.editNoteBody.value;
    service.updateNotes(notes[index].dataset);
    placement.adjust(16);
    common.closeModal();
  }

  /**
   * click event on note to delete
   */
  deleteNote() {
    common.notesContainer.removeChild(this.parentNode.parentNode);
    service.deleteNotes(this.parentNode.parentNode);
    placement.adjust(16);
  }

  /**
   * set the color palette
   */
  setColorPalette() {
    setTimeout(() => {
      common.togglePalette();
    }, 100);
    this.appendChild(common.colorPalette);
    common.setColorPalette(this.parentNode.parentNode);
    service.updateNotes(this.parentNode.parentNode.dataset);
  }
}
