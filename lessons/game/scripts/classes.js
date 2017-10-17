class character {

    constructor (name, role, weapon) {
        this.name = name;
        this.health = role.health;
        this.ad = role.ad;
        this.role = role.role;
        this.weapon = weapon;
        this.armor = role.armor;
        this.penetration = role.penetration;
        this.blockChance = role.blockChance;
        this.crit = role.crit;
        this.enemyList = [];
    }


    enemy(enemys) {
        const newlist = enemys.filter( (x) => this != x )
        Object.assign(this.enemyList, newlist); 
    }


    changeWeapon(weapon) {
        this.weapon = weapon;
        console.log(this.weapon);
    }

    attack() {
        let i;
        this.enemyList.length < 2 ? i = 0 : i = Math.floor(Math.random() * this.enemyList.length);
        console.log(this.enemyList.length, i);
        let currentEnemy = this.enemyList[i];
        let dmg = ((this.ad + this.penetration*1.5) * this.crit) - currentEnemy.armor,
            currentEnemyHealth = currentEnemy.health;

        let resultOfAttack = currentEnemyHealth - dmg;
        this.enemyList[i].health = resultOfAttack;

        console.log(this.name + ' hit ' + this.enemyList[i].name + ' with a ' + this.weapon + ' and deal ' + dmg);
    }

}

var preset = {

  'mage': {
    role: "mage",
    health: 100,
    ad: 5,
    weapon: "staff",
    armor: 3,
    penetration: 0,
    blockChance: 0,
    crit: 15,
  },
  'warrior': {
    role: "warrior",
    health: 100,
    ad: 5,
    weapon: "BF Sword",
    armor: 3,
    penetration: 0,
    blockChance: 0,
    crit: 15,
  },
  'roge': {
    role: "roge",
    health: 100,
    ad: 5,
    weapon: "double knife",
    armor: 3,
    penetration: 0,
    blockChance: 0,
    crit: 15,
  },
  'paladin': {
    role: "paladin",
    health: 100,
    ad: 5,
    weapon: "SS - Shield and Sword",
    armor: 3,
    penetration: 0,
    blockChance: 0,
    crit: 15,
  }

}
