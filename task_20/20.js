

var insert = document.getElementById('insert');
var textarea = document.getElementById('textarea');
var qurey = document.getElementById('qurey');
var text = document.getElementById('text');
var div = document.getElementById('dispaly');

init();

function init (argument) {
    var s;
     insert.onclick = function  (argument) {
          var str = textarea.value;
          s =str.split(/[,.，\n、" "]/);
          for (var i = 0; i < s.length; i++) {
                 var divchild = document.createElement('div');
                 divchild.innerHTML=s[i];
                 div.appendChild(divchild);

          };

     }
     qurey.onclick = function (argument) {
         for (var i = 0; i < s.length; i++) {
              if (s[i].indexOf(text.value)!=-1)
              {
                var divchilds = div.children;
                console.log(divchilds[i]);
                if (div.children) 
                {   
                    var HTML ="";
                    var strarr = divchilds[i].innerHTML.split(text.value);
                    for (var j = 0; j < strarr.length; j++) {
                        HTML+=strarr[j];
                        if (j!=strarr.length-1) 
                          {
                              HTML+='<span>'+text.value+'</span>';
                          }
                      
                    }
                    divchilds[i].innerHTML=HTML;
                   
                }
              }
         }
     }
}