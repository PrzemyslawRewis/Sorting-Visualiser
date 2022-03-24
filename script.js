

window.onload = function(){
    el = document.getElementById("homepage").style = "block";
}

var canvas;

function zmienArtykul(e){
    var element = document.getElementsByClassName("articleContent");
    for(var i = 0; i<element.length; i++)
        element[i].style = "display : none;";
    switch(e.id){
        case "Home":
            document.getElementById("homepage").style = "block";
            break;
        case "Bubblesort":
            document.getElementById("bombel").style = "block";
            canvas=document.getElementById("SymulacjaBubble");
            generujDaneDoSymulacji();
            break;
        case "Selectionsort":
            document.getElementById("select").style = "block";
            canvas=document.getElementById("SymulacjaSelect");
            generujDaneDoSymulacji();
            break;
        case "WebWorker":
            document.getElementById("Worker").style = "block"; 
            wykorzystajinnerHTML();     
            break;
    }
}

var tablica = Array(71);
tablica.fill(0,0,71); 
function generujDaneDoSymulacji(){    
                    
    for(var i=0; i<tablica.length; i++)
    {
        tablica[i]=Math.floor(Math.random()*500+1);
    }                   
    rysujSymulacje(tablica, 0,);
                    
}

        
function rysujSymulacje(tab, color) {
    
    var z=canvas.getContext('2d');
    var width = 16;
    var currX = 10;
    z.clearRect(0, 0, canvas.width, canvas.height);	
        for(var i = 0; i < tab.length; i++){
            if(i == color){
                z.fillStyle = 'red';
            }
            else if(color ==96){
                z.fillStyle='#39ff14';
            }
            else{
                z.fillStyle = 'cyan';
            }
            var h = tab[i];
            z.font = '10px serif';
            z.fillText(tab[i], currX, canvas.height - (h + 16) );
            z.fillRect(currX, canvas.height - (h+12), width, h);
            z.fillText(i+1, currX, canvas.height - (2) );
            currX += width + 2;
        }
}

function shuffle() {
    tablica.sort((a, b) => 0.5 - Math.random());
    rysujSymulacje(tablica, 0);
      
}

Array.prototype.swap=function (x,y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
}

        
function* sortowanieBabelkowe(tab) { 
    var swapped;
    do{
        swapped = false;
        for (var i = 0; i < tab.length - 1; i++) {
            if (tab[i] > tab[i + 1]) {
                tab.swap(i,i + 1);
                swapped = true;
                rysujSymulacje(tab, i);
                yield swapped;
            }
        }
    }while (swapped);
    rysujSymulacje(tab,96);
}
                    
        
function* selectSort(tab){
    var min;
    var i = 0;
    do{
        min = i;
        for (j=i+1; j < tab.length; j++){
            if (tab[j] < tab[min]){
                min = j;
                } 
        }
        if (i != min){
            tab.swap(i,min)
        } 
        rysujSymulacje(tab, i);
        i++;
        yield i; 
    }while(i < tab.length);
    rysujSymulacje(tab,96);
}
        
        
function babelkowe(){
    canvas = document.getElementById('SymulacjaBubble');
    var sort = sortowanieBabelkowe(tablica);
    function anim(){
        requestAnimationFrame(anim);
        sort.next(); // wywolanie nastepnej iteracji bubblesort
    }
    setTimeout(anim(tablica), 15000);
}
        
function select(){
    canvas = document.getElementById('SymulacjaSelect');
    var sort = selectSort(tablica);
    function anim(ar){
        requestAnimationFrame(anim);
        sort.next(); 
    }
    setTimeout(anim(tablica), 30000);
}
function wykorzystajinnerHTML(){
    document.getElementById("TrescArtykulu").innerHTML="Test technologii WebWorker będzie polegał na pomiarze czasu sortowania\
    10000 elementowej tablicy liczb dla obu algorytmów.";
    

}
if (typeof(Worker)==="undefined") {
    alert("Twoja przeglądarka nie obsługuje technologii WebWorker.");
}
  


function bubbleSortNoWebWorker(){
    var tablica_testowa = Array(10000);
    for (var i = 10000; i >= 0; i--) {
        tablica_testowa.push(i);
    };
    function test1(ar)
    {
        var swapped;
        do {
            swapped = false;
            for (var i=0; i < ar.length-1; i++) {
                if (ar[i] > ar[i+1]) {
                    ar.swap(i,i+1);
                    
                    swapped = true;
                }
            }
        } while (swapped);
    }
    var start = new Date().getTime();
    test1(tablica_testowa);
    var stop = new Date().getTime();
    var czas = stop-start;
    document.getElementById("t3").innerHTML =czas+"ms";
    
}


  
function selectSortNoWebWorker(){
    var a = Array(10000);
    for (var i = 10000; i >= 0; i--) {
        a.push(i);
    };
    let n = a.length;
    function test4(a){
        for(let i = 0; i < n; i++) {
            let min = i;
            for(let j = i+1; j < n; j++){
                    if(a[j] < a[min]) {
                        min=j; 
                    }
            }
            if (min != i) {
                let tmp = a[i]; 
                a[i] = a[min];
                a[min] = tmp;      
            }
        }

    }
    
    var start = new Date().getTime();
    test4(a);
    var stop = new Date().getTime();
    var czas = stop-start;
    document.getElementById("t1").innerHTML =czas+"ms";
}
function selectSortWebWorker(e){

    myWorker=new Worker("workerSelect.js");
    myWorker.onmessage = function(e) {
        var x = e.data;
        document.getElementById("t2").innerHTML=x+"ms";
    }
    myWorker.postMessage("start");
}

function bubbleSortWebWorker(e){
     
    myWorker=new Worker("workerBubble.js");
    myWorker.onmessage = function(e) {
        var x = e.data;
        document.getElementById("t4").innerHTML=x+"ms";
    }
    myWorker.postMessage("start");
    
      
}

function TEST(){
    selectSortNoWebWorker();
    bubbleSortNoWebWorker();
    selectSortWebWorker();
    bubbleSortWebWorker();
    //TODO:  przesłać do pascala sprawdzić walidacje dokonczyc TIproj.xml
    document.getElementById("Obserwacje").innerHTML="Dla większości przeprowadzonych testów\
    oba algorytmy posortowały tablicę szybciej bez WebWorkera. Należy zauważyć jednak, że korzystanie z technologii WebWorker spowodowało znaczne zwiększenie\
    responsywności zarówno strony jak i przeglądarki.";

}


        
        

