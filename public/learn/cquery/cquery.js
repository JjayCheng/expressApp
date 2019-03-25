
(function(global) {

  function selecter(name) {
    var dom = [],
      oDom,
      sName = new String(name),
      nameL = sName.length;
    if(name !== '' || name !== undefined) {
      switch(sName[0]) {
        case '.':
          oDom = document.getElementsByClassName(sName.substring(1,nameL));
          for(key in oDom){
            key >= 0 && dom.push(oDom[key]);
          }
        break;

        case '#':
          oDom = document.getElementById(sName.substring(1,nameL));
          dom.push(oDom);
        break;

        default: 
          oDom = document.getElementsByTagName(name);
          for(key in oDom){
            key >= 0 && dom.push(oDom[key]);
          }
        break;
      }
    }
    return dom;
    
  }

  var Cquery = function(el) {
    return new Cquery.fn.init(el);
  }
  Cquery.fn = Cquery.prototype = {
    init: function(el) {
      var dom = typeof el === 'string'? selecter(el) : Object.prototype.toString.call(el) === '[object Array]' ? el : [el];
      for(i in dom){
        dom.hasOwnProperty(i) && (this[i] = dom[i]);
      }
      this.length = dom.length;
      return this;
    },
    getElements: function(cb) {
      for(var i = 0, l = this.length; i < l; i ++) {
        cb && cb(this[i]);
      }
      return this;
    },
    // 样式修改
    css: function(cssObj, value) {
      if(value) {
        var type = cssObj;
        cssObj = {};
        cssObj[type] = value;
      }
      this.getElements(function(el) {
        for( cssKey in cssObj) {
          if(cssObj.hasOwnProperty(cssKey)) {
            el.style[cssKey] = cssObj[cssKey]
          }
        }
      });
      return this;
    },
    addClass: function(className) {
      this.getElements(function(el) {
        el.className += ' ' + className;
      });
      return this;
    },
    removeClass: function(className) {
      this.getElements(function(el) {
        el.className = this[i].className.replace(new RegExp("(\\s|^)"+ className +"(\\s|$)"), '');
      })
      return this;
    },
    // dom树操作
    children: function() {
      var ret_children = [];
      this.getElements(function(el) {
        var children = el.children;
        for(var j = 0,jl = children.length; j < jl; j++) {
          ret_children.push(children[j])
        }
      });
      return new Cquery.fn.init(ret_children);
    },
    parent: function() {
      var els = [];
      this.getElements(function(el) {
        els.push(el.parentNode);
      });
      return new Cquery.fn.init(els.distinct()); 
    },
    eq: function(index) {
      return new Cquery.fn.init(this[index - 1]);
    }
  }
  Cquery.fn.init.prototype = Cquery.fn;
  Cquery.fn.init.prototype.splice = Array.prototype.splice;
  global.$c = global.Cquery = Cquery;

  // 工具类
  Array.prototype.distinct = function(){
    var arr = this,
     result = [],
     i,
     j,
     len = arr.length;
    for(i = 0; i < len; i++){
     for(j = i + 1; j < len; j++){
      if(arr[i] === arr[j]){
       j = ++i;
      }
     }
     result.push(arr[i]);
    }
    return result;
  }

}(window))