import './index.scss';

import { forEach, reduce } from 'ramda';

import { Graph } from 'rickshaw';

import { qs, crElement, randInt } from 'javascripts/tools/helpers';

import { loop } from 'javascripts/tools/templateTools';
import { scheme, achivmentBase, infoItemBase, traiderBase, checkbox, btnTempl, profitBlock } from './scheme';

import { genUserData } from './genData';

export class TradersGraph extends HTMLElement {
  constructor() {
        super();
        this.users = [];

        this.userInfo = crElement('div', ['user-info']);
        this.traiders = crElement('div', ['traiders']);
        this.usersInfoItems = crElement('div', ['info-items']);
        this.achivmentsWrap = crElement('div', ['achivments']);
  }

  getUsers() {
    for(let i = 1; i <= 6; i++) {
      this.users.push({...genUserData().data});
    }
  }

  updateGraphData(data) {
    console.warn(data)
  }

  prepandGraph() {
    const wrap = loop(scheme);
    const mainInfoWrap = qs('.main-info', wrap);
    const wigetWrap = mainInfoWrap.parentNode;

    const user = data => {
      
      const bl = loop(traiderBase(data.id));
      bl.addEventListener('click', 
          () => { this.updateGraphData(data) });
      this.traiders.appendChild(bl);
    }

    forEach(user, this.users);

    
    // for (let i = 0; i < 6; i++) {
    //   const el = loop(traiderBase());
    //   this.traiders.appendChild(el)
    // }

    // user-info ^ main-info
    
    // for (let i = 0; i < 3; i++) {
    //   const el = loop(infoItemBase);
    //   this.usersInfoItems.appendChild(el)
    // }

    // user-info ^ main-info
    
    // for (let i = 0; i < 3; i++) {
    //   const el = loop(achivmentBase(
    //     require(`images/l16/gr_ico${i+1}.svg`), 
    //     'blah'
    //     ));
    //   this.achivmentsWrap.appendChild(el)
    // }

    wigetWrap.prepend(this.traiders);
    this.achivmentsWrap.appendChild(loop(checkbox));
    this.userInfo.appendChild(this.usersInfoItems);
    this.userInfo.appendChild(this.achivmentsWrap)
    mainInfoWrap.prepend(this.userInfo);
    mainInfoWrap.appendChild(loop(btnTempl));

    wrap.appendChild(mainInfoWrap);
    return wrap;
  }

  graphInit() {
    const data = []
    // const gradient = crElement('svg', false, {
    //   xmlns: 'http://www.w3.org/2000/svg',
    //   version: '1.1',
    //   width: '0',
    //   height: '0',
    // });
    // gradient.innerHTML = `
    //   <defs>
    //     <linearGradient spreadMethod="pad" id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
    //       <stop offset="0%" style="stop-color:rgb(185, 215, 251);stop-opacity:1;" /></stop>
    //       <stop offset="100%" style="stop-color:rgb(255, 255, 255);stop-opacity:0;" /></stop>
    //     </linearGradient>
    //   </defs>`;
    //   console.warn(this.innerHTML)
    // this.appendChild(gradient);
    const graph = new Graph({
      element: this.querySelector('#graph'),
      renderer: 'area',
      stroke: true,
      preserve: true,
      interpolation: 'basis',
      tension: 1,
      strokeWidth: 2,
      padding: { top: 0.01, right: 0.165, bottom: 0, left: 0 },
      min: 100,
      max: 10000,
      series: [
        {
          data: data,
          color: 'blue'
        }
      ],
    });
    var yAxis = new Graph.Axis.Y( {
      graph: graph,
      tickValues: [0,1000,2000,3000,4000,5000,6000,7000,8000,9000,1000],
      tickFormat: x => `$${x}`,
    } );
    
    yAxis.render();
    graph.onUpdate(() => {
      data.length == 11 && data.shift();
      // console.warn(data)
      data.push({x: new Date().getTime(), y: randInt(1000, 6000)});
    })

    graph.render();
    
    setInterval(() => {
      graph.update();
    },300)
    
  }

  connectedCallback() {
    this.getUsers();
    console.warn(this.users);
    this.appendChild(this.prepandGraph())
    this.graphInit();
  }
}

customElements.define('ui-graph', TradersGraph);
