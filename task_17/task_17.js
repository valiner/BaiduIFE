/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

var  radio = document.getElementsByName('gra-time');
var  option = document.getElementById('city-select');
var  wrap = document.getElementById('aqi-chart-wrap');
var colorselect = ["#234","#977","#683"];



// 获取chardata的长度
function getLength (data) {
       var index = 0;
        for(var key in data)
        {
          index++;
        }
        return index;
}


//获得month的数据
function getMonth () {
  var monthdata = {};
  var arr=['一','二','三'];
  var arrmax=[31,29,31];
  arrindex=0;
  var index =0;
  var sum =0;
  for(var key in charData)
  {
      sum+=charData[key];
      index++;
      if (index>=arrmax[arrindex])
       {
         monthdata['第'+arr[arrindex]+'个月']=sum/arrmax[arrindex];
         arrindex++;
         index=0;
         sum=0;
       }
  }
  return monthdata;
     
}
//获得week的数据
function getweekdata () {
    //2016.1.1是星期五 index=4;
  var index = 4;
  var arr=['一','二','三'];
  var arrmax=[31,29,31];
  var arrindex=0;
  arrmax[0]+=index;
  var weekdata = {};
  var sum = 0;
  var weeks = 1;
  //记住每个月的第一天星期几
  var duandian = index;
      for(var key in charData)
      {
          sum+=charData[key];
          index++;

        //每个月最后一周
        if(index>=arrmax[arrindex])
        {
          //如果最后一天时星期天
                if (index%7==0) 
                  {
                      weekdata['2016第'+arr[arrindex]+'月第'+weeks+'周']=sum/7;
                  }
                  else{
                    weekdata['2016第'+arr[arrindex]+'月第'+weeks+'周']=sum/(index%7);
                  }
                
                    weeks=1;
                    duandian=index=index%7;
                    arrindex++;
                    arrmax[arrindex]+=index;
                    sum = 0;
        }
        //周日时
         else if (index%7==0) 
                {
                  //第一周
                  if (index==7) 
                    {
                      weekdata['2016第'+arr[arrindex]+'月第'+weeks+'周']=sum/(index-duandian);
                    }
                    else{
                    weekdata['2016第'+arr[arrindex]+'月第'+weeks+'周']=sum/7;
                   
                }
                 weeks++;
                sum = 0;
                   
                }
      }
      return weekdata;
}
/**
 * 渲染图表
 */
function renderChart() {
    //获取当前城市
      initAqiChartData();
      console.log(charData);
      if (pageState.nowGraTime=="day") 
        {   
        //清空之前的div
        wrap.innerHTML="";
        //创造显示DAY的DIV，单数用于做图标，双数用来做显示数据
        for (var i = 0; i < getLength(charData)*2; i++) {         
                 var div = document.createElement('div');
                 div.style.display="none";
                 wrap.appendChild(div);          
          }

          var div = wrap.children; 
          //样式化DIV
          for (var i = 0; i < getLength(charData)*2; i++) {  
                //用来记住下一个DIV
                div[i].index = i     
                div[i].style.width = "6.5px";
                var left = i*6.5+9;
                div[i].style.left = left+"px";
                var index1 = 0;
                //单数的DIV显示图形
                 if (i%2==0) 
                 {
                      div[i].style.display="block";
                      for(var key in charData){
                      if (index1==i/2) 
                        {
                          //取得每一天的数据
                          var height = charData[key];
                        }
                       index1++;
                      }
                     div[i].style.backgroundColor =colorselect[i%3];
                     div[i].style.height = height+"px";
                     //鼠标悬停时，下一个DIV显示
                     div[i].onmouseover = function () {
                           div[this.index+1].style.display="block";   
                     }
                      //鼠标离开时，下一个DIV隐藏
                    div[i].onmouseout = function () {
                           div[this.index+1].style.display="none";
                           
                     }
                 }
                   else{
                    //用作显示数据的DIV
                    div[i].style.width="100px";
                    div[i].style.height="28px";
                    div[i].style.left = i*6.5-35+"px";
                    div[i].style.border = "1px solid #FA8072";
                      for(var key in charData){
                      if (index1==(i-1)/2) 
                        {
                          var height = parseInt(charData[key]);
                           div[i].innerHTML=key+":"+height;
                        }
                       index1++;
                      }

                    div[i].style.bottom= height+"px";
                 }
                 }       
          }
            
      
        if (pageState.nowGraTime=="week") 
        {
            //获取每一周的平均值
          var weekdata = getweekdata();
          wrap.innerHTML="";
          var l = parseInt(getLength(charData)*2/6);
           //创造显示DAY的DIV，单数用于做图标，双数用来做显示数据
             for (var i = 0; i < l; i++) {         
                 var div = document.createElement('div');
                 div.style.display="none";
                 wrap.appendChild(div);          
                 }
            var div = wrap.children;
            for (var i = 0; i < l; i++) {
                var index1 = 0;     
                div[i].index = i;
                 div[i].style.width = "38px";
                 var left = i*38+46;
                 div[i].style.left = left+"px";
                 if (i%2==0) 
                 {     
                    div[i].style.display="block";
                          for(var key in weekdata){
                      if (index1==i/2) 
                        {
                          var height = weekdata[key];
                        }
                       index1++;
                      }
                     div[i].style.backgroundColor =colorselect[i%3];
                     div[i].style.height = height+"px";
                     div[i].onmouseover=function () {
                            div[this.index+1].style.display="block";
                            
                     }
                       div[i].onmouseout=function () {
                            div[this.index+1].style.display="none";
                            
                     }
                 }
                 else{
                    div[i].style.width="130px";
                    div[i].style.height="28px";
                    div[i].style.left = i*38-25+"px";
                    div[i].style.border = "1px solid #FA8072";
                      for(var key in  weekdata){
                      if (index1==(i-1)/2) 
                        {
                          var height = parseInt(weekdata[key]);
                          div[i].innerHTML=key+":"+height;
                        }
                       index1++;
                      }
                    div[i].style.bottom= height+"px";
                 }
                 }
        }

        if (pageState.nowGraTime=="month") 
        {
          var monthdata = getMonth();
            console.log(monthdata);

             wrap.innerHTML="";
          var l = parseInt(getLength(charData)/30*2);
          console.log(l);
            console.log(l);
             for (var i = 0; i < l; i++) {         
                 var div = document.createElement('div');
                 div.style.display="none";
                 wrap.appendChild(div);          
          }
         var div = wrap.children;
         for (var i = 0; i < l; i++) {
                var index1 = 0;
                div[i].index = i;
                 div[i].style.width = "200px";
                 var left = i*200+6;
                 div[i].style.left = left+"px";

                 if (i%2==0) 
                 {
                      
                        div[i].style.display="block";
                          for(var key in monthdata){
                      if (index1==i/2) 
                        {
                          var height = monthdata[key];
                        }
                       index1++;
                      }
                     div[i].style.backgroundColor =colorselect[i%3];
                     div[i].style.height = height+"px";
                     div[i].onmouseover = function  () {
                          div[this.index+1].style.display="block";
                     }
                    div[i].onmouseout = function  () {
                          div[this.index+1].style.display="none";
                     }


                 }
                 else{
                    div[i].style.width="80px";
                    div[i].style.height="28px";
                    // div[i].style.display="none";
                    div[i].style.left = i*200-120+"px";
                    div[i].style.border = "1px solid #789"
                      for(var key in  monthdata){
                      if (index1==(i-1)/2) 
                        {
                          var height = parseInt(monthdata[key]);
                          div[i].innerHTML=key+':'+height;
                         }
                       index1++;
                      }

                    div[i].style.bottom= height+"px";

                 }
                 }
        }
     



}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {

  // 处理好的数据存到 chartData 中
        charData = aqiSourceData[pageState.nowSelectCity];
  
  
  
}


/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
   for (var i = 0; i < radio.length; i++) {
          if (radio[i].checked == true) {
              if (radio[i].value==pageState.nowGraTime) {
                  // console.log("没有变化Radio")
              }
              //发生变化
              else{
                 // 设置对应数据
                pageState.nowGraTime = radio[i].value;
                // console.log("变化Radio")
                   // 调用图表渲染函数
                renderChart();
              }
          };
   };
  console.log("123");
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  
  for (var i = 0; i < option.length; i++) {
          if (option[i].selected==true) 
            {
              if (option[i].text==pageState.nowSelectCity)
               {
                  // console.log("op没变");
               }
               //OP改变了
               else{  
                  // 设置对应数据
                   // console.log(option[i]);
                   pageState.nowSelectCity = option[i].text;
                   renderChart();
                   

               }
            };
  };



  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radio = document.getElementById('form-gra-time');
  radio.onclick=function  (argument) {
      graTimeChange();
  }

}


/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  renderChart();

}

init();