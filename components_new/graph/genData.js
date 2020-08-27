import { randInt } from 'javascripts/tools/helpers';

const types = [ 'beginner', 'exp', 'profi' ];

// generation registration date
// Новичок  - Дата регистрации: от 01.08.2019 до 3.09.2019
// Опытный - Дата регистрации: от 01.05.2019 до 15.06.2019
// Профи - Дата регистрации: от 01.06.2017 до 3.04.2019
const userRegDateSetup = {
  'beginner': [new Date('08 01 2019'), new Date('09 03 2019')],
  'exp': [new Date('05 01 2019'), new Date('06 15 2019')],
  'profi': [new Date('06 01 2019'), new Date('03 04 2019')]
}

export const genDate = type => getRandomDate(userRegDateSetup[type]);

const getRandomDate = datesArr => new Date(randInt(datesArr[0].getTime(), datesArr[1].getTime()));


// Новичок от 500$ до 1500$
// Опытный от 1500$ до 2000$
// Профи от 2500$ до 4000$

const userProfit = {
  'beginner': [ 500, 1500 ],
  'exp': [ 1500, 2000 ],
  'profi': [ 2500, 4000 ]
}

const genProfit = type => randInt(userProfit[type][0],  userProfit[type][1]);

// Новичок - Первый депозит: от 30 до 300
// Опытный - Первый депозит: от 300 до 1000
// Профи - Первый депозит: от 1000 

const userDeposit = {
  'beginner': [ 30, 300 ],
  'exp': [ 301, 1000 ],
  'profi': [ 1001, 2000 ]
}

const genFirstDep = type => randInt(userDeposit[type][0],  userDeposit[type][1]);


// achivments
const userAchivments = {
  'beginner': [ 'achiv1', 'achiv2', 'achiv3' ],
  'exp': [ 'achiv1', 'achiv3', 'achiv4', 'achiv5', 'achiv6', 'achiv7' ],
  'profi': [ 'achiv7', 'achiv8', 'achiv9', 'achiv10', 'achiv11', 'achiv12', 'achiv13', 'achiv14', 'achiv15', 'achiv16', 'achiv17' ],
}
const getAchivText = achiv => i18n.common.tradersGraph.achivments[achiv];
const genAchivments = type => {
  const res = [];
  const achivList = userAchivments[type];
  for (let i = 0; i < randInt(1,3); i++) {
    res.push(getAchivText(achivList[randInt(0,achivList.length - 1)]));
  }
  return res;
}


export const genUserData = () => {
  const type  = (() => types[randInt(0,2)])()
  return {
    data: {
      'type': type,
      'id': `*${randInt(3000, 8674)}`,
      'regDate': genDate(type),
      'dep': genFirstDep(type),
      'achivments': genAchivments(type),
      'profit': genProfit(type),
    }
  }
}

