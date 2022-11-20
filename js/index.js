import { Application } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"
window.Stimulus = Application.start()

import dragController from "./controller/drag_controller.js"


Stimulus.register("drag", dragController)
