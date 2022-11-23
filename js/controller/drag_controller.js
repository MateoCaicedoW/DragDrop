import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = ["divDraggable", "container"]

  connect() {
    if (localStorage.getItem("element") != null) {
      this.containerTarget.innerHTML += localStorage.getItem("element").split(",").join("");
    }
  }

  clonDrag(){
    let clon = this.divDraggableTarget.cloneNode(true);
    clon.style.position = "absolute";
    clon.attributes.removeNamedItem("data-action");
    clon.classList.remove("relative");

    clon.addEventListener("mouseout", () => {
      if (this.divDraggableTarget.getBoundingClientRect().x == clon.getBoundingClientRect().x) {
        clon.remove();
      }
    });

    this.containerTarget.appendChild(clon);
    this.dragElement(clon);
    
  }

  dragElement(HTMLElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    HTMLElement.onmousedown = dragMouseDown;
    
    function dragMouseDown(e){
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;

      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
    
    const elementDrag = (e) => {
      e.preventDefault();
      // calculate the new cursor position:      
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // set the element's new position:
      HTMLElement.style.top = (HTMLElement.offsetTop - pos2) + "px";
      HTMLElement.style.left = (HTMLElement.offsetLeft - pos1) + "px";
    }
  
    const closeDragElement = () => {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  save(){
    let elements = this.containerTarget.children;
    let element = []

    for (let i = 0; i < elements.length; i++) {
      if (i != 0) {
        element.push(elements[i].outerHTML);
      }
    }

    localStorage.setItem("element", element);
    window.location.reload();
  }

  delete(){
    localStorage.removeItem("element");
    window.location.reload();
  }

}