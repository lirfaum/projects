import { fromEvent } from 'rxjs';

import './index.scss';

import { ttApp } from './app.js';

const options = {};

const mapSetting$ = fromEvent(document.querySelector('input[name="map"]'), 'input');
const previewBlock = document.querySelector('.preview');

mapSetting$.subscribe(event => buildPreview(event.target.value));

function buildPreview(value) {
  previewBlock.innerHTML = '';
  const prevSlotSample = '<div class="slot"></div>';
  const row = document.createElement('div');
  row.classList.add('row');

  for(let i = 1; i <= value; i++) {
    row.innerHTML += prevSlotSample;
  }

  for(let i = 1; i <= value; i++) {
    previewBlock.innerHTML += row.outerHTML;
  }
}

const startBtn = document.querySelector('.settings [name="start"]');

startBtn.addEventListener('click', initGame);

function initGame() {
  const playersSetting = document.querySelectorAll('[name="player"]');
  options['players'] = {};

  for(let i = 0; i < playersSetting.length; i++) {
    const playerSetup = playersSetting[i];

    const name = playerSetup.querySelector('[name="playerName"]').value;
    const symbol = playerSetup.querySelector('[name="symbol"]').value;
    const color = playerSetup.querySelector('[name="color"]').value;


    options['players'][`player${i}`] = {
      'name': !!name ? name : `Player${i}`,
      'symbol': !!symbol ? name : `&#987${i};`,
      'color': color,
    };
  }

  options['map'] = document.querySelector('input[name="map"]').value;

  const game = new ttApp(options);

  document.querySelector('.settings').classList.add('hide');
  document.querySelector('.preview').classList.add('hide');
  document.querySelector('.wrapper').appendChild(game);
}