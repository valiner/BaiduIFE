
var input = document.getElementById('num');
var leftadd = document.getElementById('leftadd');
var rightadd = document.getElementById('rightadd');
var leftdetele = document.getElementById('leftdetele');
var rightdetele = document.getElementById('rightdetele');
var display = document.getElementById('display');
var arr =[];


init();
function init () {
    rightadd.onclick = function (argument) {
         arr.push(input.value);
         renderChart();
    }

    leftadd.onclick = function  (argument) {
         arr.unshift(input.value);
         renderChart();
    }

    leftdetele.onclick =function (argument) {
        arr.shift();
        renderChart();
       
    }
    rightdetele.onclick = function (argument) {
        arr.pop();
         renderChart();
    }
}

function renderChart (argument) {
    display.innerHTML="";
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
             var div = document.createElement("div");
             div.setAttribute("data-num",i);
             div.innerHTML=arr[i];
             display.appendChild(div);
             div.onclick =function (argument) {
                 arr.splice(this.dataset.num,1);
                 renderChart();
             }

         };
}