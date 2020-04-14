import './index.scss'

import { fromEvent, combineLatest, from } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { keys } from 'ramda';

import { getUrlParams, crElement } from 'javascripts/tools/helpers';
import { getLocale } from 'javascripts/tools/get-locale.js';
import { InputRange } from 'javascripts/components/input-range';

function calcProfitWeekMonth(a, b, c) {
  const f = a * ( Math.pow(1+0.5/b, b*c) ) - a;
  const summ = f.toFixed(0);

  return {
    ['week']: parseInt(summ).toLocaleString(getLocale()),
    ['month']: parseInt(summ * 4).toLocaleString(getLocale()),
  };
}

export class Calc extends HTMLElement {
  constructor(theme) {
      super();
      this.locale = i18n.locale;
      this.translates = JSON.parse(i18n.calc);
      this.params = this.attributes;
      this.urlsParams = getUrlParams();
      this.theme = theme == 'dark' || !!this.params.dark ? 'dark' : 'light';
      this.calculationOutWeek = crElement('span', ['summ'], {name: 'out'});
      this.calculationOutMonth = crElement('span', ['summ', 'month'], {name: 'out'});
      this.allInputs$;
  }

  getOutLink() {
    return (this.urlsParams.l) ? `${location.origin}/${this.locale}/promo/${this.urlsParams.l}?${location.search}`: `${location.origin}/${this.locale}?${location.search}`;
  }

  createInputBlock(name) {
    const inputRangeData = this.translates.inputs[name];
    const inputOptions = {
      name: name,
      label: inputRangeData.title,
      currency: inputRangeData.value,
      desc: inputRangeData.desc,
      max: inputRangeData.max,
      min: inputRangeData.min,
      step: inputRangeData.step,
    }

    return new InputRange(inputOptions);
  }

  createMainGrid() {
    const container = crElement('div', ['calc-container']);
    const left = this.paramsContainer();
    const right = this.outContainer();

    container.appendChild(left);
    container.appendChild(right);

    return container;
  }

  paramsContainer() {
    const leftContainer = crElement('div', ['calc-params']);

    const inputs = keys(this.translates.inputs).map(inputName => {
      const input = this.createInputBlock(inputName);

      leftContainer.appendChild(input);
      return fromEvent(input, 'input').pipe(
        startWith({ target: { value: input.value } }),
      );
    });

    this.initCalculation(inputs);

    return leftContainer;
  }

  outContainer() {
    const rightContainer = crElement('div', ['calc-out']);
    const earnBlock = crElement('div', ['earning'], {name: 'earn'});
    const earnTitle = crElement('h4', ['earning-title']);
    const subTitle = [ crElement('h5', ['sub-title']), crElement('h5', ['sub-title'])];
    const outButton = this.outButton();

    earnTitle.innerText = this.translates.out;
    outButton.innerText = i18n.start_btn;
    earnBlock.appendChild(earnTitle);
    subTitle[0].innerText = this.translates.per_week;
    earnBlock.appendChild(subTitle[0]);
    earnBlock.appendChild(this.calculationOutWeek);
    subTitle[1].innerText = this.translates.per_month;
    earnBlock.appendChild(subTitle[1]);
    earnBlock.appendChild(this.calculationOutMonth);

    rightContainer.appendChild(earnBlock);
    rightContainer.appendChild(outButton);

    return rightContainer;
  }

  outButton() {
    return !!this.attributes.inner ? crElement('button', ['btn']) : crElement('a', ['btn'], { href: this.getOutLink(), target: '_blank' });
  }

  initCalculation(inputs) {
    this.allInputs$ = combineLatest(...inputs);
    this.allInputs$.pipe(
      map(events => events.map(e => parseInt(e.target.value)))
    ).subscribe(values => {
      const postCalcData = calcProfitWeekMonth(...values);
      this.calculationOutWeek.innerText = `${this.translates.currency} ${postCalcData.week}`;
      this.calculationOutMonth.innerText = `${this.translates.currency} ${postCalcData.month}`;
    });
  }

  connectedCallback() {
    !!this.params.logo && this.appendChild(crElement('ui-logo', false, { theme: 'dark', }));

    this.appendChild(this.createMainGrid());
  }
}

customElements.define('ui-calc', Calc);
