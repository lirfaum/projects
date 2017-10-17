'use strict';


var randBlockChance = Math.floor(Math.random() * 5 + 1);
console.log(randBlockChance);

var init_btn = document.getElementById("ch_create_init").addEventListener("click", playersInit);

function playersInit() {

    console.log('/* collect all players data */');

    var playersNumber = document.getElementsByClassName("player");
        console.log(playersNumber.length)
    var player = [],
        player_name,
        role,
        weapon; 

    for (var i = 0; i < playersNumber.length; i++) {

        player_name = document.getElementsByClassName("players_name")[i].value;
        role = document.getElementsByClassName("player")[i].getElementsByTagName("select")[0].value;
        weapon = document.getElementsByClassName("player")[i].getElementsByTagName("select")[1].value;

        console.log(player_name, role, weapon);

        player[i] = new character(player_name, preset[role], weapon);

    }
    window.players = player;
    
    for (var i = 0; i < players.length; i++) {
        players[i].enemy(players);
        console.log(players[i].enemyList)
    }
}
