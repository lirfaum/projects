import { ttSlot } from './slot';

export class ttApp extends HTMLElement {
  constructor() {
    super();
  }

  defultSetting() {

  }

  connectedCallback() {
    this.innerHTML = "hi bratishka! Start the game!"
  }
}

customElements.define('tt-game', ttApp);
