
(function() {
  Element.prototype.template = function(data) {
    var rObj = {};
    var el = rObj.el = this;
    var oldHTML = el.innerHTML;
    getData(data, function(key, data) {
      rObj[key] = data;
      watch(rObj, key, function() {
        el.innerHTML = oldHTML;
        template(el, rObj);
      });
    });
    template(el, rObj);
    console.log(rObj);
    return rObj;
  }
  function getData(data, cb) {
    for(var key in data) {
      if(data.isPrototypeOf(key)) {
        break;
      }
      cb && cb(key, data[key]);
    }
    return true;
  }
  function watch(obj, prop, callback){
    if(prop in obj){
      var old = obj[prop];
      Object.defineProperty(obj,prop, {
        enumerable: true,
        configurable: true,
        set: function(val) {
          var o=old;old=val;
          callback(val,o,obj);
        },
        get:function(){
          return old;
        }
      });
    } else {
      throw new Error("no such property: " + pro);
    }
  }
  function template(el, data){ // dom 模版渲染
    var strObj = new String(el.innerHTML);
    strObj = strObj.replace("b-","");
    var res = '';
    var strObj1 = strObj.split('${');
    for(var i = 0, l = strObj1.length; i < l; i ++ ){
      var strs = strObj1[i].split('}');
      var key = strs[0];
      var val;
      if(/[.\[\]]/.test(key)) {
        var keys = key.split('.');
        var trueKey = data;
        for(var ii = 0, ll = keys.length; ii < ll; ii ++) {
          var keys2 = keys[ii];
          if(/[\[\]]/.test(keys2)) {
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
}());
