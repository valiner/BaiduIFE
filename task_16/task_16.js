/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var flat = false;
var datatr = ["城市","空气质量","操作"];

   var city = document.getElementById('aqi-city-input');
    var value1 = document.getElementById('aqi-value-input');
      var table = document.getElementById('aqi-table');

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
 
    //验证！！
    aqiData[city.value]=value1.value;
    console.log(aqiData);


} 


/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  
    if (!flat) 
        {
            var tr = document.createElement('tr');
            for (var i = 0; i <3; i++) {
                 var td = document.createElement('td');
                  td.innerHTML=datatr[i];
                  tr.appendChild(td);
            };
            table.appendChild(tr);
            flat = true;

        }
   

            var tr1 = document.createElement('tr');
            for (var i = 0; i <3; i++) {
                 var td1 = document.createElement('td');
                 if (i==2) {
                    var btn = document.createElement('button');
                    btn.innerHTML='删除';
                    td1.appendChild(btn);
                    tr1.appendChild(td1);
                 }
            
                 else if(i==0){
                    td1.innerHTML=city.value;
                    tr1.appendChild(td1);
                        
                 }
                 else{
                    td1.innerHTML=value1.value;
                    tr1.appendChild(td1);
                 }
                 
            };
            table.appendChild(tr1);

        

            // console.log('123131');
        
   

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
 
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(index) {
     console.log(index);
        var tr1 =table.getElementsByTagName('tr');
        table.removeChild(tr1[index+1]);
  
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  var btn = document.getElementById('add-btn');
  btn.onclick = addBtnHandle;

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  table.onclick = function (ev) {
        var ev = ev||window.event;
        var target = ev.target||ev.srcElement;
        if (target.nodeName.toLowerCase()=="button") 
            {   
                var tr = table.getElementsByTagName('button');
             
                var index=0;
                 for(var i=0;i<tr.length;i++)
                   {
                    if(tr[i]==target)
                    index=i;
                   }
                    delBtnHandle(index);
                    
            };
        }
}

init();