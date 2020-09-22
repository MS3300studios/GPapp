//buttons
var btnStart = document.getElementById('btnStart');
var btnStop = document.getElementById('btnStop');
var btnReset = document.getElementById('btnReset');
var btnAddDar = document.getElementById('darPlus');
var btnRemoveDar = document.getElementById('darMinus');
//elements
var txtSec = document.getElementById('secs');
var txtMin = document.getElementById('mins');
var txtHr = document.getElementById('hrs');
var darCount = document.getElementById('darCount');
var avgElem = document.getElementById('avg');
var hZeroBeforeSecs = document.getElementById('hBeforeSecs');
var hZeroBeforeMins = document.getElementById('hBeforeMins');
//variables
var avg = 0;
var counter = 0; //seconds since timer started
var secs = 0;    //value is set to 0 when it reaches 60
var mins = counter/60; //value is set to 0 when it reaches 60
var hrs = counter/3600;
var timer = null;
var darczyncy = 0;

function setZeroes(){
    if(secs < 10){
        hZeroBeforeSecs.style.display = "block";
    }
    else if(secs >= 10){
        hZeroBeforeSecs.style.display = "none";
    }
    if(mins < 10){
        hZeroBeforeMins.style.display = "block";
    }
    else if(mins >= 10){
        hZeroBeforeMins.style.display = "none";
    }
}

//runs every second until stopped
function count(){
    btnReset.disabled = true;
    btnStart.disabled = true;
    btnStop.disabled = false;
    
    txtSec.innerHTML = secs;
    txtMin.innerHTML = mins;
    txtHr.innerHTML = hrs;

    setZeroes();

    counter++;

            secs++;
    if(secs == 60){
        secs = 0;

            mins++;
        if(mins == 60){
        mins = 0;

            hrs++;
        }
    }

    
    //count and display the average
    avg = darczyncy/(counter/3600);
    avgElem.innerHTML = avg.toFixed(4);
    
    //after 6hrs the timer stops automatically
    if(counter==21600){
        clearInterval(timer);
        btnStart.disabled = true;
        btnReset.disabled = false;
        btnStop.disabled = true;
    }
    //stop timer event:
    btnStop.onclick = function(){
        clearInterval(timer);
        btnStart.disabled = false;
        btnReset.disabled = false;
        btnStop.disabled = true;
    }
}

btnStart.addEventListener('click', function(){
    timer = setInterval(count, 1000); //1000 = 1 sec
}) 
btnReset.addEventListener('click', function(){
    txtSec.innerHTML = '0';
    txtMin.innerHTML = '0';
    txtHr.innerHTML = '0';
    avgElem.innerHTML = '0';
    darCount.innerHTML = '0';
    counter = 0;
    secs = 0;
    mins = 0;
    hrs = 0;
    darczyncy = 0;
    avg = 0;
    hZeroBeforeSecs.display = 'block';
    hZeroBeforeMins.display = 'block';
})


function updateDar(change){

    if(change == 'add') darczyncy++;
    else if(change == 'remove') darczyncy--;
    
    if(darczyncy>0){
        btnRemoveDar.disabled = false;
    }
    else if(darczyncy == 0){
        btnRemoveDar.disabled = true;
    }

    darCount.innerHTML = darczyncy;
}

btnAddDar.addEventListener('click', function(){
    updateDar('add');
})
btnRemoveDar.addEventListener('click', function(){
    updateDar('remove');
})
