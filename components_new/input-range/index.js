import './index.scss'

import { qs, crElement } from 'javascripts/tools/helpers';

export class InputRange extends HTMLElement {
  // constructor(name, label = '', currency = '', description = '', min = 0, max = 100, step = 1) {
  constructor(options) {
      super();
      this.params = this.attributes;
      this.name = options.name || '';
      this.label = options.label || '';
      this.description = options.description || ''
      this.currency = options.currency || '';
      this.min = options.min || 1;
      this.max = options.max || 100;
      this.step = options.step || 1;
      this.value = this.max / 3;
      this.input = crElement('input', ['calc-range'], 
        { type: 'range', 
          min: `${this.min}`, 
          max: `${this.max}`,
          name: `${this.name}`,
          step: `${this.step}`,
          value: `${this.name == 'deposit' ? this.max / 100 * 2 : this.value}`, // to destroy!
        });
  }

  resolver() {
    const inputContainer = crElement('div', ['input-container'], {name: this.name});

    const titlesContainer = crElement('div', ['flex-container-btw']);
    const titleDescLabel = crElement('div', ['input-title']);
    const outValueLabel = crElement('div', ['input-value'], { name: 'currentValue' });

    const labelsContainer = crElement('div', ['flex-container-btw']);
    const minValueContainer = crElement('div', ['input-label']);
    const maxValueContainer = crElement('div', ['input-label']);

    titleDescLabel.innerHTML = `${this.label}<span>${this.description}</span>`;
    outValueLabel.innerText = this.getValue(this.input.value, this.currency);
    minValueContainer.innerText = this.getValue(this.min, this.currency);
    maxValueContainer.innerText = this.getValue(this.max, this.currency);

    titlesContainer.appendChild(titleDescLabel);
    titlesContainer.appendChild(outValueLabel);

    labelsContainer.appendChild(minValueContainer);
    labelsContainer.appendChild(maxValueContainer);

    inputContainer.appendChild(titlesContainer);
    inputContainer.appendChild(this.input);
    inputContainer.appendChild(labelsContainer);

    this.addEventTriggers(qs('[name="currentValue"]', titlesContainer));

    return inputContainer;
  }

  getValue(value, currency) {
    return this.isForMoneyInput() ? `${currency} ${value}` : `${value} ${currency}`;
  }

  isForMoneyInput() {
    return ['money', 'deposit', 'income'].indexOf(this.name) >= 0;
  }

  addEventTriggers(currentOut) {
    this.input.addEventListener('input', event => {
      const input = event.target;

      let val = input.value;
      let percent = Math.floor(val/input.max*100);
      let backgroundSize = val / this.step * (input.offsetWidth / (this.max / this.step));

      input.setAttribute('data-ratio', checkInputRatio(percent));

      if (input.max < 10) backgroundSize = backgroundSize - 30;
      if (val == this.min) backgroundSize = 0;
      if (val == this.max) backgroundSize = input.offsetWidth;

      currentOut.innerText = this.getValue(val, this.currency);

      this.input.setAttribute('style', `background-size:${backgroundSize.toFixed(0)}px 100%`);
    });
  }

  connectedCallback() {
    this.appendChild(this.resolver());
  }
}

function checkInputRatio(currPercent) {
  switch(true) {
    case (currPercent < 50) :
      return 'middle';
    case (currPercent >= 50):
      return 'high';
    default: 
     return '';
  }
}

customElements.define('ui-input-range', InputRange);
 