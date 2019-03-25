var search = new Vue({
    el: '#search-area',
    data: function () {
        return {
            word: '',
            selects: [],
            selected_i: -1
        }
    },
    created: function () {

    },
    methods: {
        searchWord: function (e) {
            this.gotoSearch();
        },
        gotoSearch: function (word) {
            window.open(API.search + (word || this.word));
        },
        loadSelects: function (e) {
            var keyCode = e.keyCode;
            var max = this.selects.length - 1;
            if (this.word) {
                if (keyCode === 40) { // xia
                    this.selected_i >= max ? (this.selected_i = 0) : this.selected_i++
                } else if (keyCode === 38) { //shang
                    this.selected_i <= 0 ? (this.selected_i = max) : this.selected_i--
                } else if (keyCode === 13) {
                    this.selected_i > -1 ? this.gotoSearch(this.selects[this.selected_i]) : this.gotoSearch();
                } else {
                    var script = document.createElement('script');
                    script.src = API.search_selects + this.word;
                    document.body.appendChild(script);
                    this.selected_i = -1;
                }
            } else {
                this.selects = [];
            }
        },
        bindSelects: function (data) {
            this.selects = data.s.slice(0, 5);
        },
        selectWord: function (e) {
            var word = e.target.innerText;
            if (word) {
                this.gotoSearch(word);
            }
        }
    },

});
var links = new Vue({
    el: '#links-area',
    data: function () {
        return {
            readyAddLink: {
                title: '',
                url: '',
                show: false
            },
            readyChangeLink: {
                title: '',
                url: '',
                top: '',
                left: '',
                index: -1,
                show: false,
            },
            linkContrlList: {
                top: '0px',
                left: '0px',
                show: false,
                index: -1
            },
            links: [
                {
                    title: '虎牙',
                    url: 'http://www.huya.com/'
                }
            ]
        }
    },
    created: function () {
        var local = window.localStorage;
        if (local.links) {
            this.links = JSON.parse(local.links);
        } else {
            local.links = '[]';
            this.link = [];
        }
    },
    watch: {
        links: {
            handler: function () {
                window.localStorage.links = JSON.stringify(this.links);
            },
            deep: true
        }
    },
    methods: {
        open: function (url) {
            window.open(url);
        },
        showMenu: function (e, i) {
            var linkContrlList = this.linkContrlList,
                readyChangeLink = this.readyChangeLink; // 预加载位置
            e.cancelBubble = true
            e.returnValue = false;
            linkContrlList.show = !linkContrlList.show;
            linkContrlList.top = '-27px';
            readyChangeLink.top = '-149px';
            readyChangeLink.left = linkContrlList.left = e.clientX - 100 + 'px';
            linkContrlList.index = i;
            this.clearAllLayer('linkContrlList');
            return false;
        },
        addLink: function () {
            var ready = this.readyAddLink,
                title = ready.title,
                url = ready.url;
            if (!title || !url) {
                alert('moust input something!');
                return;
            }
            this.links.push({
                title: title,
                url: url
            });
            this.clearAllLayer();
        },
        removeLink: function () {
            var i = this.linkContrlList.index;
            if (i > -1) {
                this.links.splice(i, 1);
            }
            this.clearAllLayer();
        },
        openChangeLayer: function () {
            var readyChangeLink = this.readyChangeLink;
            var i = this.linkContrlList.index;
            readyChangeLink.title = this.links[i].title;
            readyChangeLink.url = this.links[i].url;
            readyChangeLink.show = !readyChangeLink.show;
            readyChangeLink.index = i;
            this.clearAllLayer('readyChangeLink');
        },
        openAddLayer: function (e) {
            e.cancelBubble = true
            e.returnValue = false;
            var readyAddLink = this.readyAddLink;
            readyAddLink.show = !readyAddLink.show;
            this.clearAllLayer('readyAddLink');
        },
        changeLink: function () {
            var readyChangeLink = this.readyChangeLink,
                i = readyChangeLink.index;
            if (i > -1) {
                var link = this.links[i];
                link.url = readyChangeLink.url;
                link.title = readyChangeLink.title;
                this.clearAllLayer();
            }
        },
        scroll: function (e) {
            this.$refs['links-scroll'].scrollLeft += (e.wheelDelta === 120 ? true : false) ? -20 : 20;
        },
        clearAllLayer: function (out) { // out 为排除项
            if (out != 'readyAddLink') {
                this.readyAddLink = {
                    title: '',
                    url: '',
                    show: false
                }
            }
            if (out != 'readyChangeLink') {
                if (out === 'linkContrlList') {
                    return;
                }
                this.readyChangeLink = {
                    title: '',
                    url: '',
                    top: '',
                    left: '',
                    index: -1,
                    show: false,
                }
            }
            if (out != 'linkContrlList') {
                if (out === 'readyChangeLink') {
                    return;
                }
                this.linkContrlList = {
                    top: '0px',
                    left: '0px',
                    show: false,
                    index: -1
                }
            }
        }
    }
})