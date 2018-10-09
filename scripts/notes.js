import  Common  from "./common.js";
import  Placement  from "./placement.js";
import Service from "./service.js";

const placement = new Placement();
const common = new Common();
const service = new Service();
export default class Notes {
  /**
   * create the todo element and retuns a node of the type <li>
   * @param object
   */
  createNote(obj) {
    /* crate a div with class 'note' */
    const note = this.createElement( "div",[
        { type: "className", handler: "note" },
        { type: "dataset", data: 'id', handler: obj.id },
        { type: "dataset", data: 'head', handler: obj.head },
        { type: "dataset", data: 'body', handler: obj.body },
        { type: "dataset", data: 'color', handler: obj.color }
      ]
    );
    const wrapper = this.createElement('div', [{ type: 'className', handler: 'action-wrapper' }]);
    wrapper.append(
      this.createElement('span', [{ type: 'className', handler: 'color-select' }],[{ type: 'onclick', handler: 'setColorPalette' }]),
      this.createElement('span', [{ type: 'className', handler: 'edit-note' }],[{ type: 'onclick', handler: 'editNote' }]),
      this.createElement('span', [{ type: 'className', handler: 'delete-note' }],[{ type: 'onclick', handler: 'deleteNote' }]),
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
        !data ? temp[type] = handler : temp[type][data] = handler;
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
   * cleck event on note click
   */
  editNote() {
    console.log(this.dataset);
  }

  /**
   * cleck event on note click
   */
  deleteNote() {
    common.notesContainer.removeChild(this.parentNode.parentNode);
    placement.adjust(16);
    service.deleteNotes(this.parentNode.parentNode)
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
