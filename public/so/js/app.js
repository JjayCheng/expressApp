/* 
  主体js
*/ 
var buildMarkBox, buildWeather; // 用于jsonp

(function() {
  var word = ''; // 记录搜索输入框的值

  // 移入移出 绑定事件
  function MbsInit(){
    var moreBtns = document.getElementsByClassName('moreBtn');
    for(var i = 0, l = moreBtns.length; i < l; i++) {
      var btn = moreBtns[i],
      attr = btn.classList[1];
      btn.onmouseenter = (function(attr) { // 鼠标移入更多按键
        var fadein = this.Tools.fadein;
        var fadeout = this.Tools.fadeout;
        var timer = 0,
        unlock = true;
        var spend = 0.1;
        return function() {
          var list = document.getElementsByClassName(attr+'L')[0];
          list.style.top = 40 + 'px';
          list.style.left = this.offsetLeft - this.offsetWidth / 2 + 'px';
          clearTimeout(timer);
          unlock && fadein(list, spend);
          unlock = false;
          this.onmouseleave = function(e) { // 鼠标移出更多按键， 定时消失
            unlock = false;
            timer = setTimeout(function() {
              fadeout(list, spend, function(){
                unlock = true
              });
            }, 200);
          }
          list.onmouseenter = function() { // 当鼠标移入列表时。 取消列表消失
            unlock = false;
            clearTimeout(timer);
          }
          list.onmouseleave = function() { // 当鼠标移出列表时。 列表消失
            timer = setTimeout(function() {
              fadeout(list, spend, function(){
                unlock = true
              });
            }, 200);
          }
        }
      }(attr));
    }
  }
  // 搜索框事件
  function searchInit(){
    var searchInput = document.getElementById('search-input'),
        searchBtn = document.getElementById('search-btn'),
        markBox = document.getElementById('markBox');
    searchInput.onkeyup = function(e) {
      word = this.value;
      Tools.jsonp(APIs.toGetMark(word));
      e.keyCode === 13 && search();
    }
    searchInput.onfocus = function() { // 搜索框位置校准
      var mBS = markBox.style;
      mBS.top = this.offsetTop + this.offsetHeight + 'px';
      mBS.left = this.offsetLeft + 'px';
    }
    markBox.onclick = function(e) {
      search(e, e.toElement.innerText);
    };
    searchBtn.onclick = search;
  }
  // 网页搜索动作
  function search(e, text){
    if(text) {
      word = text;
      document.getElementById('search-input').value = word;
    }
    if(!word) {
      return;
    }
    window.open(APIs.toSearch(word));
  }
  // 换肤盒子
  function skinInit(){
    var ct = document.getElementById('skinCt');
    var imgBox = ct.getElementsByClassName('imgsCt')[0];
    var skinImgs = this.APIs.skinImgs;
    for(var i = 0, l = skinImgs.length; i < l; i ++){
      var img = document.createElement('div'),
      skinImg = skinImgs[i];
      img.className = 'imgBox';
      img['data-i'] = i;
      img.onclick = function() {
        document.getElementsByTagName('body')[0].style.background = 
        'url(' + skinImgs[this['data-i']].l + ')';
      }
      img.innerHTML = '<img src="'+skinImg.s+'" alt="" srcset="">\
        <div class="told">'+skinImg.wd+'</div>';
      imgBox.appendChild(img);
    }
    document.getElementById('skinBtn1').onclick = function(){
      Tools.fadein(ct, 0.05);
    }
    document.getElementById('skinBtn0').onclick = function(){
      Tools.fadeout(ct, 0.05);
    }
    ct.getElementsByClassName('bottom')[0].onclick = function(){
      Tools.fadeout(ct, 0.05);
    }
  }
  // 生成搜索提示框
  buildMarkBox = function(data){
    var ct = document.getElementById('markBox');
    ct.innerHTML = '';
    ct.style.display = 'block';
    var keys = data.result;
    if( keys == null || keys.length === 0) {
      ct.style.display = 'none';
    } else {
      var l = keys.length;
      for(var i = 0; i < l; i++) {
        if(i === 10) break;
        var word = keys[i].word;
        var li = document.createElement('div');
        li.setAttribute('class', 'markBox-item');
        li.innerText = word;
        ct.appendChild(li);
      }
    }
  }
  // 生成天气
  buildWeather = function(data){
    // 工具
    var weatherImgAPI = APIs.weatherImg,
      changeDate = Tools.changeDate;

    // 获取数据
    var weathers = data.weather.slice(0,4);
    var pm25 = data.pm25.pm25;
    var area = data.area[data.area.length - 1][0];
    var succWeather = data.realtime.weather,
      time = Tools.getStrTime(),
      info = weathers[0].info,
      infoNow = info[time];
    var btm = [];
    for(var i = 1, l = weathers.length; i < l; i++){
      var weather = weathers[i],
      info = weather.info,
      infoNow = info[time];
      btm.push({
        time: i<=2?(i===1?  '明天' : '后天') : changeDate(weather.date),
        img: weatherImgAPI.getS(infoNow[0]),
        wea: infoNow[1],
        tem: info['night'][2]+'~'+info['day'][2]+'℃'
      });
    }

    var ct = document.getElementById('weatherCt');
    var textCt = document.getElementById('weatherText');
    var template = Tools.template;
    template(ct, {
      nowDate: changeDate(weathers[0].date),
      area: area,
      imgL: weatherImgAPI.getL(infoNow[0]),
      tem: info['night'][2] + '~' + info['day'][2] + '℃',
      wea: infoNow[1],
      wind: infoNow[4] + ' ' + infoNow[3],
      btm: btm
    });
    template(textCt, {
      text: area + ':' + succWeather.info + succWeather.temperature + '℃',
      qua: pm25.quality,
      curPm: pm25.curPm
    });
  }
  MbsInit();
  searchInit();
  skinInit();

  window.onkeyup = function(e) { // 全局回车事件
    e.keyCode === 13 && search();
  }
}());