/*
  接口链接类
*/
var APIs = {
  // 搜索
  toSearch: function(word) {
    return 'https://www.so.com/s?ie=utf-8&fr=none&src=360sou_newhome&q=' + word
  },
  // 提示框
  toGetMark: function(word) {
    return 'https://sug.so.360.cn/suggest?callback=buildMarkBox\
    &encodein=utf-8&encodeout=utf-8&format=json&fields=word&word=' + word;
  },
  // 天气
  weatherAPI: 'https://open.onebox.so.com/Dataapi?callback=buildWeather\
  &query=%E5%A4%A9%E6%B0%94&type=weather&ip=101.206.170.35&src=soindex&d=pc\
  &url=weather&_=' + new Date().getDate(),
  // 天气图片
  weatherImg: {
    getL: function(num) { // 主图
      return 'https://p.ssl.qhimg.com/dm/60_60_/d/inn/3716a4d4/1-'+ num +'.png';
    },
    getS: function(num) { // 小图
      return 'https://p.ssl.qhimg.com/d/inn/9371c065/weather/bg-w/1-'+ num +'.png';
    }
  },
  skinImgs: [{
    wd: '谭凯',
    s: 'https://p.ssl.qhimg.com/dm/256_146_/t01acb27ef01dc52ab1.png',
    l: 'https://p.ssl.qhimg.com/t01acb27ef01dc52ab1.png',
  },{
    wd: '苏诗丁',
    s: 'https://p.ssl.qhimg.com/dm/256_146_/t01d3b68a59eec70e5e.png',
    l: 'https://p.ssl.qhimg.com/t01d3b68a59eec70e5e.png',
  },{
    wd: '儿童360',
    s: 'https://p.ssl.qhimg.com/dm/256_146_/t019a6241d8bfd3439e.png',
    l: 'https://p.ssl.qhimg.com/t019a6241d8bfd3439e.png',
  },{
    wd: '360手机f4',
    s: 'https://p.ssl.qhimg.com/dm/256_146_/t01dca0cccc3c19888f.png',
    l: 'https://p.ssl.qhimg.com/t01dca0cccc3c19888f.png',
  },{
    wd: '极速前进',
    s: 'https://p.ssl.qhimg.com/dm/256_146_/t01962038a128e18923.png',
    l: 'https://p.ssl.qhimg.com/t01962038a128e18923.png',
  },{
    wd: '密国',
    s: 'https://p.ssl.qhimg.com/dm/256_146_/t0126b49d1692482850.png',
    l: 'https://p.ssl.qhimg.com/t0126b49d1692482850.png',
  }]
}
// 请求天气
Tools.jsonp(APIs.weatherAPI);