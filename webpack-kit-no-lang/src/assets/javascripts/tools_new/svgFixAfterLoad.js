import { qsa } from 'javascripts/tools/helpers';
import { forEach } from 'ramda';

const fills = qsa('[fill^="url"]');
const strokes = qsa('[stroke^="url"]');
const filters = qsa('[filter^="url"]');

const params = location.search.length;
const fix = (el, attr) => el.setAttribute(attr, el.getAttribute(attr).replace('#', `${location.search}#`));

!!params && svgFixInit();

function svgFixInit(){
  forEach(el=>fix(el,'fill'), fills);
  forEach(el=>fix(el,'filter'), filters);
  forEach(el=>fix(el,'stroke'), strokes);
};
