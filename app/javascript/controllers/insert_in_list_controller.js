import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="insert-in-list"
export default class extends Controller {
  static targets = ["items", "form"]
  static values = { position: String }

  connect() {
    // console.log("my controller", this.element)
    // console.log("my form",this.itemsTarget)
    // console.log("my target", this.formTarget)
  }

  send(event) {
    // console.log(event)
    event.preventDefault()
    const url = this.formTarget.action
    // console.log(this.formTarget.action)
    const options = {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(this.formTarget)
    }
    fetch(url, options)
      .then(response => response.json())
      .then((data) => {
        // console.log(data)
        // console.log("review", data.inserted_item)
        // console.log("form", data.form)
        if (data.inserted_item) {
          this.itemsTarget.insertAdjacentHTML(this.positionValue, data.inserted_item)
        }
        this.formTarget.outerHTML = data.form
      })
  }
}
