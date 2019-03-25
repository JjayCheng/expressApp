/*
  工具类
*/
var Tools = {
  // 渐变动画
  fadein: function(el, spend, cb) {
    var style = el.style;
    spend = spend ? spend : 0.1;
    style.opacity = 0;
    style.display = 'block';
    var v = 0;
    var tar = 1;
    var timer = setInterval(function() {
      if(v < tar) {
        v += spend;
        style.opacity = v;
      } else {
        clearInterval(timer);
        cb && cb();
      }
    }, 12);
  },
  fadeout: function(el, spend, cb) {
    var style = el.style;
    spend = spend ? spend : 0.1;
    style.opacity = 1;
    style.display = 'block';
    var v = 1;
    var tar = 0;
    var timer = setInterval(function() {
      if(v > tar) {
        v -= spend;
        style.opacity = v;
      } else {
        style.opacity = 0;
        style.display = 'none';
        clearInterval(timer);
        cb && cb();
      }
    }, 12)
  },
  // jsonp 工具
  jsonp: function(url) { 
    var script = document.createElement('script');
    script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(script); 
  },
  // 数字日期转换
  changeDate: function(time, tar) {
    var times = time.split(tar || '-');
    return times[1] + '月' + times[2] + '日';
  },
  // 获得现在文字时间
  getStrTime: function() {
    var time = new Date().getHours();
    return time < 24 ? (time < 19 ? (time < 10 ? 'dawn' : 'day') : 'night') : 'night';
  },
  // dom 模版渲染
  template: function(el, data){
    var strObj = new String(el.innerHTML).replace(/b-/g,""); // 解除 b- 关键字, 用于绑定图片
    var res = '';
    var strObj1 = strObj.split('${');
    for(var i = 0, l = strObj1.length; i < l; i ++ ){ // 拆分html, 绑定模版字符
      var strs = strObj1[i].split('}');
      var key = strs[0];
      var val;
      if(/[.\[\]]/.test(key)) { // 解析内部对象表达式 '.'
        var keys = key.split('.');
        var trueKey = data;
        for(var ii = 0, ll = keys.length; ii < ll; ii ++) { // 拆分对象表达式
          var keys2 = keys[ii];
          if(/[\[\]]/.test(keys2)) { // 解析内部对象表达式 '[]'
            var keys3 = keys2.split('[');
            trueKey = trueKey[keys3[0]][keys3[1].replace(']','')];
          } else {
            trueKey = trueKey[keys2];
          }
        }
        val = trueKey;
      } else {
        val = key && data[key];
      }
      if(i === 0) {
        res += key;
        continue;
      }
      res += val + strs[1];
    }
    el.innerHTML = res;
  }
}