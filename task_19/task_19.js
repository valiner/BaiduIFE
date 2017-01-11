
var input = document.getElementById('num');
var leftadd = document.getElementById('leftadd');
var rightadd = document.getElementById('rightadd');
var leftdetele = document.getElementById('leftdetele');
var rightdetele = document.getElementById('rightdetele');
var display = document.getElementById('display');
var arr =[];


init();
function init () {
    // rightadd.onclick = function (argument) {
    //      arr.push(input.value);
    //      renderChart();
    // }

    // leftadd.onclick = function  (argument) {
    //      arr.unshift(input.value);
    //      renderChart();
    // }

    // leftdetele.onclick =function (argument) {
    //     arr.shift();
    //     renderChart();
       
    // }
    // rightdetele.onclick = function (argument) {
    //     arr.pop();
    //      renderChart();
    // }
    document.getElementById('btns').onclick = function (event) {
         if (input.value<1||input.value>100) 
         {
            //提示用户输入错误
            alert('请输入1-100的数字');
            
         }
         else{
             var tag = event.target;
             switch(tag.id)
             {
                case 'leftadd':
                     arr.unshift(input.value);
                     renderChart();
                    break;
                case 'rightadd':
                     arr.push(input.value);
                     renderChart();
                    break;    
                case 'leftdetele':
                    arr.shift();
                    renderChart();
                    break;    
                case 'rightdetele':
                     arr.pop();
                     renderChart();
                    break;     
                case 'maopao':
                 
                    var temp = 0;
                    for (var i = 0; i < arr.length-1; i++) {
                           for (var j = 0; j < arr.length-i-1; j++) {
                                   if (parseInt(arr[j])>parseInt(arr[j+1]))
                                    {
                                     temp = arr[j];
                                     arr[j] = arr[j+1];
                                     arr[j+1] = temp;
                                      renderChart();

                                    }

                           };
                    }
                    console.log(arr);
                    break;


             }
         }
    }
}



function renderChart (argument) {

    display.innerHTML="";

    for (var i = 0; i < arr.length; i++) {
             var div = document.createElement("div");
             div.setAttribute("data-num",i);
             div.style.height=arr[i]+"px";
             display.appendChild(div);
             div.onclick =function (argument) {
                 arr.splice(this.dataset.num,1);
                 renderChart();
             }

         }
}