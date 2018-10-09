"use strict";
import Placement from "./placement.js";
import Common from "./common.js";
import Services from "./service.js";
import Notes from "./notes.js";

const notes = new Notes();
const placement = new Placement();
const service = new Services();
const common = new Common();

class App {
  /**
   * constructor initialize the app and ades some events
   */
  constructor() {

    /* to initilize the data for the first time run*/ 
    this.init();

    /* add click event to add a note  */
    common.addNotesBtn.onclick = () => this.addNote();
    
    /* add click event on select palette icon  */
    this.colorSelector = document.getElementById("color-selector");
    this.colorSelector.onclick = () => this.setColorPalette();
  }

  /**
   * initial the app with previous data
   * if first time run then init data with default values
   */
  init() {
    let data = service.getAllNotes();
    if(!data || data.length === 0) {
      data = common.initialData();
      service.updateUID(4);
      service.addNotes(data);
    } else {
      data = service.getAllNotes();
    }
    if ( data.length > 0  ) {
      data.forEach(element => {
        common.notesContainer.insertBefore( notes.createNote(element), common.notesContainer.firstChild );
        placement.adjust(16);
      });
    }
  }

  /**
   * add a new note
   */
  addNote() {
    const head = common.addNotesHead;
    const body = common.addNotesBody;
    if (!!head.value.trim() && !!body.value.trim()) {
      const data = {
        id: service.getUID(),
        head: head.value,
        body: body.value,
        color: common.addNoteWrapper.dataset.color
      };
      service.addNotes(data);
      service.updateUID( service.getUID() + 1 );
      common.notesContainer.insertBefore( notes.createNote(data), common.notesContainer.firstChild );
      placement.adjust(16);
      head.value = '';
      body.value = '';
      common.addNoteWrapper.dataset.color= '';
    } else {
      alert("please provide value of head and body for the note");
    }
  }

  /**
   * set color Palette for color icon
   */
  setColorPalette() {
    this.colorSelector.appendChild(common.colorPalette);
    setTimeout(() => {
      common.togglePalette();
    }, 100);
    common.setColorPalette(common.addNoteWrapper);
  }
}

const app = new App();
