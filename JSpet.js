/// <reference path="jquery.mobile-1.4.5/jquery.mobile-1.4.5.js" />
/// <reference path="index.html" />
/// <reference path="jquery-1.8.0.js" />
var sead;
var maxPetHealth = 0;
var maxPetHygiene = 1;
var maxPetHunger = 2;
var maxPetFun = 3;
var petHealth;
var petHygiene;
var petHunger;
var petFun;
var petAge = 0;
var petHappines = 0;
var MaxHappines;
var petMaxBars = new Array (4);
var LastTick;
var Tick = 500;
var Max ;
var Con;
var con_H, con_W;
var scring_H, scring_W;
var alive = 1;
var tombstone = '<img src="Aset/png/tombstone.png" id="Pet"/>';
var egg = '<img src="Aset/png/egg.png" id="Pet"/>';
var age = '<div class="Text" id="Age">' + petAge + '</div>';
var Actions = new Array(4);
Actions[maxPetHealth] = '<img src="Aset/gif/nidel.gif" id="Simbel"/>';
Actions[maxPetHygiene] = '<img src="Aset/gif/mop.gif"  id="Simbel"/>';
Actions[maxPetHunger] = '<img src="Aset/gif/apple.gif" id="Simbel"/>';
Actions[maxPetFun] = '<img src="Aset/gif/boll.gif" id="Simbel"/>';
var pet = new Array(3);
var petSteg;
var i = 0;
var ButtonSize;
var SimbelSize;
var petNames = ['Rattata','Bulbasaur','Charmander', 'Squirtle', 'Caterpie', 'Weedle', 'Pidgey', 'Pichu', 'Cleffa', 'Igglybuff'];
var petVocabelri = new Array(5);
petVocabelri[maxPetHealth] = "I'm sick";
petVocabelri[maxPetHygiene] = "It's stinks in here";
petVocabelri[maxPetHunger] = "I'm hungry";
petVocabelri[maxPetFun] = "I'm bored";
petVocabelri[4] = "I'm happy";
var Name = 'Name';
var folder;

function varToStr() {
    var data = new Array(sead, maxPetHealth, petHealth, maxPetHygiene, petHygiene, maxPetHunger, petHunger, maxPetFun, petFun, petAge, petHappines, MaxHappines, petMaxBars[0], petMaxBars[1], petMaxBars[2], petMaxBars[3], LastTick, Tick, Max, Con, con_H, con_W, scring_H, scring_W, alive, tombstone, egg, age, pet[petSteg], petSteg, i, ButtonSize, SimbelSize, Name);
    var data2 = new Array('sead\n', 'maxPetHealth\n', ' petHealth\n', 'maxPetHygiene\n', ' petHygiene\n', 'maxPetHunger\n', ' petHunger\n', ' maxPetFun\n', ' petFun\n', ' petAge\n', ' petHappines\n', ' MaxHappines\n', ' petMaxBars\n', ' \n', '\n', '\n', 'LastTick\n', ' Tick\n', ' Max\n', ' Con\n', ' con_H\n', ' con_W\n', ' scring_H\n', ' scring_W\n', ' alive\n', ' tombstone\n', ' egg\n', ' age\n', ' pet\n', ' petSteg\n', ' i\n', ' ButtonSize\n', ' SimbelSize\n', ' img\n', 'Name');
    var str = "";
    for (var a = 0; a <= data.length; a++)
    {
      str +=( data[a] + ' : ' + data2[a] )
    }
    return str;
}

function seadGenaretor() {
    sead = Math.random();
    sead *= 10000000;
    sead = Math.round(sead);
    localStorage.sead = sead;
}
function setMax() {
    Max = 0;
    for (i = 0; i < petMaxBars.length; i++) {
        if ((sead % 10)<5)
            petMaxBars[i] = Math.round( 10 - (sead % 10));
        else 
            petMaxBars[i] = Math.round((sead % 10));
        sead /= 10;
        
        Max += petMaxBars[i];
    }
    Max /= i;
    folder = Math.floor((sead % 10));
    sead /= 10;
    for (var i = 1; i <= 3; i++) {
        pet[i - 1] = '<img src=pokemon/' + folder + '/' + i + '.png id="Pet">';
    }
    i = 0;
}

function main() {
    setScreen();
    load();
    setMax();
    //setCon();
    for (var a = 0; a < localStorage.length; a++) {
        if (isNaN(localStorage.getItem(localStorage.key(a)))) {
            if (localStorage.key(a) != "Name") {
            newEgg();  
            return;
            }

        }   
    }
    
        if (alive == 1) {
            if (petAge != 0) {
                $('#petName').replaceWith('<div class="Text" id="petName">' + Name + '</div>');                
                ketchUp();
            }
            else {
                newEgg();
            }   
        }
        else {
            $('#petName').replaceWith('<div class="Text" id="petName">' + Name + '</div>');
            $("#Age").replaceWith('<div class="Text" id="Age">' + petAge + '</div>');
            death();
        }
}
function setScreen()
{
     scring_W = window.innerWidth;
     scring_H = window.innerHeight;
     con_H = scring_H - (scring_H / 3);
     con_W = scring_W - (scring_W / 3);
     ButtonSize = scring_W / 7;
     $('#MainScrin').css({ width: scring_W, height: (scring_H - (scring_H / 4)) });
     $('#Play').css({ width: ButtonSize });
     $('#Heal').css({ width: ButtonSize });
     $('#Clean').css({ width: ButtonSize });
     $('#Fide').css({ width: ButtonSize });
    //קפתורים
    $('#Play').click(function () { play() });
    $('#Heal').click(function () { heal() });
    $('#Clean').click(function () { clean() });
    $('#Fide').click(function () { feed() });
    $('#take').click(function () { Take() });
    
    //setCon();
}

function ketchUp() {
    var d = new Date();
    var t = d.getTime();
    for (var a = LastTick; a <= t; a += Tick) {
        borsTick(LastTick);
    }
    steg();
    showeMods();
    $("#Pet").replaceWith(pet[petSteg]);
    time();
}

function save() {
        localStorage.Health = petHealth;
        localStorage.Hygiene = petHygiene;
        localStorage.Hunger = petHunger;
        localStorage.Fun = petFun;
        localStorage.Age = petAge;        
        localStorage.time = LastTick;
        localStorage.alive = alive;
        localStorage.petSteg = petSteg;
        localStorage.Name = Name;
    }
function load() {
            petHealth = parseInt( localStorage.Health);
            petHygiene = parseInt( localStorage.Hygiene);
            petHunger = parseInt( localStorage.Hunger);
            petFun = parseInt( localStorage.Fun);
            petAge = parseInt( localStorage.Age);
            sead = parseInt( localStorage.sead);
            LastTick = parseInt( localStorage.time);
            alive = parseInt(localStorage.alive);
            petSteg = parseInt(localStorage.petSteg)
            Name = localStorage.Name;
    }

function Take() {
    var arr = new Array(petHealth, petHygiene, petHunger, petFun);
    var num = 0;
    for (var c = 1; c < arr.length; c++) {
        if (arr[num] > arr[c]) {
            num = c;
        }
    }
    if (arr[num] >= petMaxBars[num] - (petMaxBars[num] / 4) ) {
        num = petVocabelri.length-1;
    }
    alert(petVocabelri[num]);
}
function heal() {
        if (petFun > 1) {
            petHealth = petMaxBars[maxPetHealth];
            petFun--;
            show(maxPetHealth);
            save();
        }
    }
    function clean() {
        petHygiene = petMaxBars[maxPetHygiene];
        show(maxPetHygiene);
        save();
    }
    function play() {
        if (petHunger > 1) {
            petFun = petMaxBars[maxPetFun];
            petHunger--;
            show(maxPetFun);
            save();
        }
    }
    function feed() {
        if (petHygiene > 1) {
            petHunger = petMaxBars[maxPetHunger];
            petHygiene--;
            show(maxPetHunger);
            save();
        }
    }

    function borsTick(tick) {
        var d = new Date();
        var t = d.getTime();
        if ((t - tick) >= (10000)) {
            petAge++;
            if (petFun > 0)
                petFun--;
            if (petHunger > 0)
                petHunger--;
            if (petHygiene > 0)
                petHygiene--;
            if (petHealth > 0)
                petHealth -= ((petMaxBars[maxPetHygiene] - petHygiene) + (petMaxBars[maxPetHunger] - petHunger) + (petMaxBars[maxPetFun] - petFun)) / 8;
            LastTick = t;
           
            steg();
            showeMods();
        }
        $("#Pet").replaceWith(pet[petSteg]);
    }

    function steg() {
        if (petAge < 11)
            petSteg = 0;
        else if (petAge < 21)
            petSteg = 1;
        else if (petAge < 31)
            petSteg = 2;
    }
    
    function time() {
        borsTick(LastTick);
        showeMods();
        $('#Age').replaceWith('<div class="Text" id="Age">' + petAge + '</div>');
        if (petHealth <= 0){
            death();
            return;
        }
        save();
        setTimeout(time, Tick);
    }
    function showeMods() {
        petHappines = ((petFun + petHealth + petHunger + petHygiene) / 4);
        if (petHealth <= 0){
            $("#Mode").replaceWith('<img src="Aset/png/mods/0.png" width="'+ButtonSize+'" id="Mode" />');
            return;
        }
        if (petHappines > (Max - (Max / 6) * 1)) {
            $("#Mode").replaceWith('<img src="Aset/png/mods/99.96.png" width="' + ButtonSize +'" id="Mode" />');
            return;
        }
        else if (petHappines > (Max - (Max / 6) * 2)) {
            $("#Mode").replaceWith('<img src="Aset/png/mods/83.3.png" width="' + ButtonSize +'" id="Mode" />');
            return;
        }
        else if (petHappines > (Max - (Max / 6) * 3)) {
            $("#Mode").replaceWith('<img src="Aset/png/mods/66.64.png"  width="' + ButtonSize +'"id="Mode"/>');
            return;
        }
        else if (petHappines > (Max - (Max / 6) * 4) ) {
            $("#Mode").replaceWith('<img src="Aset/png/mods/49.98.png" width="' + ButtonSize +'" id="Mode"/>');
            return;
        }
        else if (petHappines > (Max - (Max / 6) * 5) ) {
            $("#Mode").replaceWith('<img src="Aset/png/mods/33.32.png" width="' + ButtonSize +'" id="Mode"/>');
            return;
        }
        else {
            $("#Mode").replaceWith('<img src="Aset/png/mods/16.66.png" width="' + ButtonSize +'" id="Mode"/>');
            return;
        }
    }

    function show(id) {
        $('#Simbel').replaceWith(Actions[id]);
        setTimeout(function () { $('#Simbel').replaceWith('<div id="Simbel"></div>'); }, 3000);
    }

    function newEgg() {
        var d = new Date();
        LastTick = d.getTime();
        seadGenaretor();
        setMax();
        alive = 1;
        petAge = 0;
        petHealth = petMaxBars[maxPetHealth];
        petHunger = petMaxBars[maxPetHunger];
        petFun = petMaxBars[maxPetFun];
        petHygiene = petMaxBars[maxPetHygiene];
        $("#Pet").replaceWith(egg);
        $("#Age").replaceWith('<div class="Text" id="Age">' + petAge + '</div>');
        save();
        showeMods();
        $("#Pet").on("click", hach);
    }
    function hach() {
        petSteg = 0;
        $("#Pet").replaceWith(pet[petSteg]);
        $("#Pet").on("click", null);
        petAge = 1;
        $("#Age").replaceWith('<div class="Text" id="Age">' + petAge + '</div>');
        GiveName();
        save();
        time();
    }
    function death() {
        alive = 0;
        save();
        showeMods();
        $("#Pet").replaceWith(tombstone);
        $("#Pet").on("click", newEgg);
    }
    function GiveName() {
        Name = prompt("Enter yor PET name", petNames[folder]);
        $('#petName').replaceWith('<div class="Text" id="petName">' + Name + '</div>');
    }