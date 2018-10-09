export default class Notes {
  /**
   * create the todo element and retuns a node of the type <li>
   * @param object
   */
  createNote(obj) {
    /* crate a div with class 'note' */
    const note = this.createElement(
      "div",
      [
        { type: "className", handler: "note" },
        { type: "dataset", data: 'id', handler: obj.id },
        { type: "dataset", data: 'head', handler: obj.head },
        { type: "dataset", data: 'body', handler: obj.body },
        { type: "dataset", data: 'color', handler: obj.color }
      ],
      [{ type: "onclick", handler: "noteClick" }]
    );
    note.append(
      this.createElement("div", [
        { type: "className", handler: "note-heading" },
        { type: "innerHTML", handler: obj.head }
      ]),
      this.createElement("div", [
        { type: "className", handler: "note-body" },
        { type: "innerHTML", handler: obj.body }
      ])
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
  noteClick() {
    console.log(this.dataset);
  }
}
