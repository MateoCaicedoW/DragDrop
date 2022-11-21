import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

let clon;
export default class extends Controller {
  static targets = ["divDragable", "container"]
  static values = { cont: Number }

  connect() {
    if (localStorage.getItem("element") != null) {
      this.containerTarget.innerHTML += localStorage.getItem("element").split(",").join("");
    }
  }

  clonDrag(){
    clon = this.divDragableTarget.cloneNode(true);
    clon.style.position = "absolute";
    clon.attributes.removeNamedItem("data-action");
    clon.classList.remove("relative");
    this.contValue++;
    clon.setAttribute("id", this.contValue);
    clon.addEventListener("mouseout", this.out);

    this.containerTarget.appendChild(clon);
    this.dragElement(clon);
    
  }

  dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
      
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
      
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  out(){
    if (this.divDragableTarget.getBoundingClientRect().x == clon.getBoundingClientRect().x) {
      clon.remove();
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
    localStorage.removeItem("element");
    localStorage.setItem("element", element);
    window.location.reload();
  }
  delete(){
  
    localStorage.removeItem("element");
    window.location.reload();
  }

}