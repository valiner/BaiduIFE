  var div1 = document.querySelector('.div1');
  var btn = document.querySelector("button");
  var temp = div1;
   var l = div1.getElementsByTagName('*');





 
  btn.onclick = function (argument) {
      var timer,i=getchildernlength(),arr=[];
      timer = setInterval(function () {
           if (i<0) 
            {
                clearInterval(timer);
                removeClass(l);
                console.log(arr);
            }
          // console.log(temp);
          if (temp.children.length==0) 
          {
            removeClass();
            temp.className+='show';
            arr.push(temp);
            temp =temp.parentNode;
            console.log(temp);
            i--;
          }
          else{
            var l = temp.children[0];
            var r = temp.children[1];
            var n = temp;
            
            //根节点
            if (!arr.contains(n))
             {
                arr.push(n);
                removeClass();
                if (n==div1) 
                    {
                    n.className+=' show1';
                    }else{

                n.className+='show';
            }
                i--;
             }
             //左节点没有遍历，就让左节点做Temp
             if (!arr.contains(l))
             {
                 temp = l;
             }
             //右节点
             else if (!arr.contains(r))
             {
                temp =r;
             }
             //回到父节点
             else{
                temp = temp.parentNode;
             }
             
            
        }
          
            },500)

  }
 

Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}

function removeClass (divl) {
        for (var i = 0; i < l.length; i++) {
               l[i].className="";
        }
        div1.className="div1";
    }    


function getchildernlength () {
   
    return l.length;
}