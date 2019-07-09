export class ttSlot extends HTMLElement {
  constructor() {
    super();

  }

  connectedCallback() {
    this.innerHTML = "im slot!"
  }
}

customElements.define('tt-slot', ttSlot);
