  var div1 = document.querySelector('.div1');
  var btn = document.querySelector("button");
  var temp = div1;
  var l = div1.getElementsByTagName('*');



btn.onclick = function (argument) {
   var timer,num=getchildernlength(),arr=[],arrend=[];
  
   var x = num;
   arr.push(temp);
   timer = setInterval(function() {
      while(x==num){
          if (num<=0) 
            {
                num--;
                clearInterval(timer);
                 removeClass();
                var t = arr.pop();
                arrend.push(t);
                console.log(arrend);
                console.log("over");
                
            }
     
            var top = arr[arr.length-1];
            if (top.children.length!=0) 
            {
                for (var i = 0; i < top.children.length; i++) {
                        var flag = arrend.contains(top.children[i]);
                        if (!flag) 
                        {
                          arr.push(top.children[i]);
                          removeClass();
          
                         if (top.children[i]==div1) 
                        {
                       top.children[i].className+=' show1';
                        }
                    else{

                       top.children[i].className+='show';
                       }

                          num--;                         
                          break;
                        }
                }
                //所有的子节点都被标记
                if (flag) 
                {
      
                   var h = arr.pop();
                   arrend.push(h);
                   
                }
                // arr.push(top);
                
            }
            //没有子节点时
            else{
             
              var t = arr.pop();
                arrend.push(t);
              
               }
          
      
      }
      x--;
   },500)
}


 
  // btn.onclick = function (argument) {
  //     var timer,i=getchildernlength(),arr=[];
  //     //X设置锁定每500MS更新一次
  //     var x=i;
  //     timer = setInterval(function () {
  //       while(i==x){

  //          if (i<0) 
  //           {
  //               i--;
  //               clearInterval(timer);
  //               removeClass(l);
  //               console.log(321);
  //           }
  //         // console.log(temp);
  //         if (temp.children.length==0) 
  //         {
  //           removeClass();
  //           temp.className+='show';
  //           arr.push(temp);
  //           temp =temp.parentNode;
  //           console.log(temp);
  //           i--;
  //         }
  //         else{
  //           var l = temp.children[0];
  //           var r = temp.children[1];
  //           var n = temp;
            
  //           //根节点
  //           if (!arr.contains(n))
  //            {
  //               arr.push(n);
  //               removeClass();
  //               if (n==div1) 
  //                   {
  //                   n.className+=' show1';
  //                   }else{

  //               n.className+='show';
  //           }
  //               i--;
  //            }
  //            //左节点没有遍历，就让左节点做Temp
  //            if (!arr.contains(l))
  //            {
  //                temp = l;
  //            }
  //            //右节点
  //            else if (!arr.contains(r))
  //            {
  //               temp =r;
  //            }
  //            //回到父节点
  //            else{
  //               temp = temp.parentNode;
  //            }
             
            
  //       }
  //         } 
  //         x--;
  //           },500)

  // }
 

Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}

function removeClass () {
        for (var i = 0; i < l.length; i++) {
               l[i].className="";
        }
        div1.className="div1";
    }    


function getchildernlength () {  
    return l.length;
}