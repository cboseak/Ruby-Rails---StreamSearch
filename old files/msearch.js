            /*global gbbase*//*global gbkey*//*global dbkey*//*global amzLogo*//*global itunesLogo*//*global vuduLogo*//*global gpLogo*//*global mgoLogo*//*global netflixLogo*/
            /*global huluLogo*//*global flixsterLogo*//*global youtubeLogo*//*global cinemaNowLogo*//*global sonyLogo*//*global crackleLogo*//*global xboxLogo*/
    var movieImageUrl = "";
    var movieName = "";
    var movieDesc = "";
    var availableTags = [];
    var freeTable = document.createElement('table');
    var paidTable = document.createElement('table');
    var freeSourceList = [];
    var paidSourceList = [];
    var num = Math.round(100000 * Math.random());

    //$( "#movieInput" ).autocomplete({source: availableTags});
    
    var callbackMethod = "allflicks_" + num;
    window[callbackMethod] = function (dataSrc) {
            //window.alert("sdfsdf");
        };


    var movieId;
    document.addEventListener('DOMContentLoaded', function (event) {
           //add listeners when content is loaded
           document.getElementById('sub').addEventListener('click',getMovieInfo);
           document.getElementById('topSub').addEventListener('click',getMovieInfo);
           document.getElementById('movieInput').addEventListener('input',movieAutoComplete);
           document.getElementById('movieInputTop').addEventListener('input',movieAutoCompleteTop);
    });
    
    function movieAutoComplete(event){
        var incompleteSearch = document.getElementById("movieInput").value;
        document.getElementById('movieInputTop').value = incompleteSearch;
        var url = "https://api.themoviedb.org/3/search/movie?api_key="+ dbkey+"&query=" + incompleteSearch;
        var response = getRequest(url);
        availableTags = [];
        for(var cat in response){
            if(cat == "results"){
                for(var movie in response[cat]){
            
                    for(var title in response[cat][movie]){
                        if(title == "title"){
                            availableTags.push(response[cat][movie]["title"]);
                            $( "#movieInput" ).autocomplete({source: availableTags, select: function(e) {document.getElementById('movieInputTop').value = e.item.index }});
                        }
                    }
                    
                }
            }
        }
    }
        function movieAutoCompleteTop(event){
        var incompleteSearch = document.getElementById("movieInputTop").value;
        document.getElementById("movieInput").value = incompleteSearch;
        var url = "https://api.themoviedb.org/3/search/movie?api_key="+ dbkey+"&query=" + incompleteSearch;
        var response = getRequest(url);
        availableTags = [];
        for(var cat in response){
            if(cat == "results"){
                for(var movie in response[cat]){
            
                    for(var title in response[cat][movie]){
                        if(title == "title"){
                            availableTags.push(response[cat][movie]["title"]);
                            $( "#movieInputTop" ).autocomplete({source: availableTags});
                        }
                    }
                    
                }
            }
        }
    }
    function getMovieInfo(event){
        resetAll();
        event.preventDefault();
        var url = gbbase + gbkey + "/movie/" + getGuideboxId();
        var response = getRequest(url);
        //document.getElementById("firstLoad").innerHTML = "";
        movieImageUrl = response["poster_120x171"];
        movieName = response["title"];
        movieDesc = response["overview"];
        //console.log(response);
        createInfoArea();


        for(var attribute in response){
            switch(attribute){
                case "free_android_sources":
                case "free_ios_sources":
                case "free_web_sources":
                    for(var source in response[attribute]){
                        if($.inArray(response[attribute][source]["source"],freeSourceList) == -1){
                            freeSourceList.push(response[attribute][source]["source"]);
                        }
                    }
                    
                case "purchase_android_sources":
                case "purchase_ios_sources":
                case "purchase_web_sources":
                    for(var source in response[attribute]){
                        if($.inArray(response[attribute][source]["source"],paidSourceList) == -1){
                            paidSourceList.push(response[attribute][source]["source"]);
                        }
                    }
            }
        }
        for(var src in freeSourceList){
            //console.log(freeSourceList[src]);
            addToSourceList(freeSourceList[src],"Free")  
        };
        for(var src in paidSourceList){
            //console.log(paidSourceList[src]);
            addToSourceList(paidSourceList[src],"Paid")  
        };
        var result = nfSearch(document.getElementById('movieInputTop').value);
        if(result.includes("yes") == true){
            addToSourceList("netflix", "Free");
        }
        if(freeTable.childElementCount > 0){
            var tableHead = document.createElement('p');
            tableHead.innerHTML = "<h3>Subscription Streaming Sources</h3>";
            document.getElementById('sources').appendChild(tableHead);
            document.getElementById('sources').appendChild(freeTable);            
        }
        if(paidTable.childElementCount > 0){
            var tableHead = document.createElement('p');
            tableHead.innerHTML = "<h3>Rental Streaming Sources</h3>"; 
            document.getElementById('sources').appendChild(tableHead);          
            document.getElementById('sources').appendChild(paidTable);            
        }

    }
    
    function getGuideboxId(){
        var url = gbbase + gbkey + "/search/movie/id/themoviedb/" + getMovieId();
        var response = getRequest(url);
        return response["id"];
    }
    
    function getMovieId(){
        var movie = document.getElementById("movieInputTop").value;
        var url = "https://api.themoviedb.org/3/search/movie?api_key="+ dbkey+"&query=" + movie;
        var response = getRequest(url);     
        
            for(var cat in response){
            if(cat == "results"){
                for(var movie in response[cat]){
                    for(var title in response[cat][movie]){
                        if(title == "id"){
                           return response[cat][movie][title];
                        }
                    }
                    
                }
            }
        }
    };
    
    function getSourceList(){
        var url = gbbase + gbkey + "/sources/subscription/all";
        var response = getRequest(url);
    };
    
    function getMovieSources(){
        var url = gbbase + gbkey + "/movie/" + movieId;
        var response = getRequest(url);
    };

    function createInfoArea(){


        var table = document.createElement('table');
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell2.style.padding = "10px";
        cell2.style.verticalAlign = "top";
        cell1.innerHTML = "<td><img src=\"" + movieImageUrl + "\"></img></td>";
        cell2.innerHTML = "<h3>"+ movieName +"</h3><p>" + movieDesc + "</p>";
        document.getElementById('movieInfo').appendChild(table);
    }

    function addToSourceList(source,cost){
        //console.log(cost);
        var logo;
        switch(source){
            case "itunes":
                logo = itunesLogo;
                source = "Itunes";
                break;
            case "amazon_buy":
                logo = amzLogo;
                source = "Amazon";
                break;
            case "vudu":
                logo = vuduLogo;
                source = "VUDU"
                break;
            case "google_play":
                logo = gpLogo;
                source = "Google Play Store";
                break;
            case "cinemanow":
                logo = cinemaNowLogo;
                source = "CinemaNow";
                break;
            case "youtube_purchase":
                logo = youtubeLogo;
                source = "Youtube Purchase";
                break;
            case "sony":
                logo = sonyLogo;
                source = "Sony";
                break;
            case "flixster":
                logo = flixsterLogo;
                source = "Flixster";
                break;
            case "crackle":
                logo = crackleLogo;
                source = "Crackle";
                break;
            case "xbox":
                logo = xboxLogo;
                source = "XBOX Video";
                break;
            case "mgo":
                logo = mgoLogo;
                source = "M GO";
                break;
            case "netflix":
                logo = netflixLogo;
                source = "Netflix";
                break;
        }
        
        if(cost == "Free"){
            freeTable.classList.add("table");
            var row = freeTable.insertRow(0);
            var logoCell = row.insertCell(0);

            var sourceName = row.insertCell(1);
            var freeOrPaid = row.insertCell(2);
            logoCell.style.width = "20%";
            sourceName.style.width = "50%";
            freeOrPaid.style.width = "30%";
            logoCell.innerHTML = "<td><img  style=\"width:32px;height:32px;\" src=\"" + logo + "\"></img></td>";
            sourceName.innerHTML = "<td class=\"sourceClass\"><p><b>" + source + "</b></p></td>";
            freeOrPaid.innerHTML = "<td class=\"sourceClass\"><p><b>" + cost + "</b></p></td>"; 
        }
        else if(cost == "Paid"){
            paidTable.classList.add("table");
            
            var row = paidTable.insertRow(0);
            var logoCell = row.insertCell(0);
            var sourceName = row.insertCell(1);
            var freeOrPaid = row.insertCell(2);
            logoCell.style.width = "20%";
            sourceName.style.width = "50%";
            freeOrPaid.style.width = "30%";
            logoCell.innerHTML = "<td class=\"sourceClass\"><img  style=\"width:32px;height:32px;\" src=\"" + logo + "\"></img></td>";
            sourceName.innerHTML = "<td class=\"sourceClass\"><p><b>" + source + "</b></p></td>";
            freeOrPaid.innerHTML = "<td class=\"sourceClass\"><p><b>" + cost + "</b></p></td>";            
        }
    }

    function getRequest(urlToUse){
        event.preventDefault();
        var request = new XMLHttpRequest();
        request.open('GET', urlToUse,false);
        request.send(null);
        var response = JSON.parse(request.responseText);
        return response;   
    };
    
    function getRawRequest(urlToUse){
        event.preventDefault();
        var request = new XMLHttpRequest();
        request.open('GET', urlToUse,false);
        request.send(null);
        return request.responseText;
    }
    
    function nfSearch(title){

        var url = "https://streamr-cboseak1.c9users.io/search/gl?title=" +"{"+ title + "}";
        event.preventDefault();
        var request = new XMLHttpRequest();
        request.open('GET', url,false);
        
        request.send(null);
        //window.alert(request.responseText);
        return request.responseText;
       
    }
    
    function resetAll(){
        clearDomObject("sources");
        clearDomObject("movieInfo");
        //clearDomObject("firstLoad");
        freeSourceList = [];
        paidSourceList = [];
        freeTable.innerHTML = "";
        paidTable.innerHTML = "";
    }
    
    function clearDomObject(object){
        console.log("Clearing: " + object);
        var myNode = document.getElementById(object);
        myNode.innerHTML = "";
        
    }
    
/*
    JavaScript autoComplete v1.0.4
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/JavaScript-autoComplete
    License: http://www.opensource.org/licenses/mit-license.php
*/

var autoComplete = (function(){
    // "use strict";
    function autoComplete(options){
        if (!document.querySelector) return;

        // helpers
        function hasClass(el, className){ return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className); }

        function addEvent(el, type, handler){
            if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
        }
        function removeEvent(el, type, handler){
            // if (el.removeEventListener) not working in IE11
            if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
        }
        function live(elClass, event, cb, context){
            addEvent(context || document, event, function(e){
                var found, el = e.target || e.srcElement;
                while (el && !(found = hasClass(el, elClass))) el = el.parentElement;
                if (found) cb.call(el, e);
            });
        }

        var o = {
            selector: 0,
            source: 0,
            minChars: 3,
            delay: 150,
            offsetLeft: 0,
            offsetTop: 1,
            cache: 1,
            menuClass: '',
            renderItem: function (item, search){
                // escape special characters
                search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
                return '<div class="autocomplete-suggestion" data-val="' + item + '">' + item.replace(re, "<b>$1</b>") + '</div>';
            },
            onSelect: function(e, term, item){}
        };
        for (var k in options) { if (options.hasOwnProperty(k)) o[k] = options[k]; }

        // init
        var elems = typeof o.selector == 'object' ? [o.selector] : document.querySelectorAll(o.selector);
        for (var i=0; i<elems.length; i++) {
            var that = elems[i];

            // create suggestions container "sc"
            that.sc = document.createElement('div');
            that.sc.className = 'autocomplete-suggestions '+o.menuClass;

            that.autocompleteAttr = that.getAttribute('autocomplete');
            that.setAttribute('autocomplete', 'off');
            that.cache = {};
            that.last_val = '';

            that.updateSC = function(resize, next){
                var rect = that.getBoundingClientRect();
                that.sc.style.left = Math.round(rect.left + (window.pageXOffset || document.documentElement.scrollLeft) + o.offsetLeft) + 'px';
                that.sc.style.top = Math.round(rect.bottom + (window.pageYOffset || document.documentElement.scrollTop) + o.offsetTop) + 'px';
                that.sc.style.width = Math.round(rect.right - rect.left) + 'px'; // outerWidth
                if (!resize) {
                    that.sc.style.display = 'block';
                    if (!that.sc.maxHeight) { that.sc.maxHeight = parseInt((window.getComputedStyle ? getComputedStyle(that.sc, null) : that.sc.currentStyle).maxHeight); }
                    if (!that.sc.suggestionHeight) that.sc.suggestionHeight = that.sc.querySelector('.autocomplete-suggestion').offsetHeight;
                    if (that.sc.suggestionHeight)
                        if (!next) that.sc.scrollTop = 0;
                        else {
                            var scrTop = that.sc.scrollTop, selTop = next.getBoundingClientRect().top - that.sc.getBoundingClientRect().top;
                            if (selTop + that.sc.suggestionHeight - that.sc.maxHeight > 0)
                                that.sc.scrollTop = selTop + that.sc.suggestionHeight + scrTop - that.sc.maxHeight;
                            else if (selTop < 0)
                                that.sc.scrollTop = selTop + scrTop;
                        }
                }
            }
            addEvent(window, 'resize', that.updateSC);
            document.body.appendChild(that.sc);

            live('autocomplete-suggestion', 'mouseleave', function(e){
                var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                if (sel) setTimeout(function(){ sel.className = sel.className.replace('selected', ''); }, 20);
            }, that.sc);

            live('autocomplete-suggestion', 'mouseover', function(e){
                var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                if (sel) sel.className = sel.className.replace('selected', '');
                this.className += ' selected';
            }, that.sc);

            live('autocomplete-suggestion', 'mousedown', function(e){
                if (hasClass(this, 'autocomplete-suggestion')) { // else outside click
                    var v = this.getAttribute('data-val');
                    that.value = v;
                    o.onSelect(e, v, this);
                    that.sc.style.display = 'none';
                }
            }, that.sc);

            that.blurHandler = function(){
                try { var over_sb = document.querySelector('.autocomplete-suggestions:hover'); } catch(e){ var over_sb = 0; }
                if (!over_sb) {
                    that.last_val = that.value;
                    that.sc.style.display = 'none';
                    setTimeout(function(){ that.sc.style.display = 'none'; }, 350); // hide suggestions on fast input
                } else if (that !== document.activeElement) setTimeout(function(){ that.focus(); }, 20);
            };
            addEvent(that, 'blur', that.blurHandler);

            var suggest = function(data){
                var val = that.value;
                that.cache[val] = data;
                if (data.length && val.length >= o.minChars) {
                    var s = '';
                    for (var i=0;i<data.length;i++) s += o.renderItem(data[i], val);
                    that.sc.innerHTML = s;
                    that.updateSC(0);
                }
                else
                    that.sc.style.display = 'none';
            }

            that.keydownHandler = function(e){
                var key = window.event ? e.keyCode : e.which;
                // down (40), up (38)
                if ((key == 40 || key == 38) && that.sc.innerHTML) {
                    var next, sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                    if (!sel) {
                        next = (key == 40) ? that.sc.querySelector('.autocomplete-suggestion') : that.sc.childNodes[that.sc.childNodes.length - 1]; // first : last
                        next.className += ' selected';
                        that.value = next.getAttribute('data-val');
                    } else {
                        next = (key == 40) ? sel.nextSibling : sel.previousSibling;
                        if (next) {
                            sel.className = sel.className.replace('selected', '');
                            next.className += ' selected';
                            that.value = next.getAttribute('data-val');
                        }
                        else { sel.className = sel.className.replace('selected', ''); that.value = that.last_val; next = 0; }
                    }
                    that.updateSC(0, next);
                    return false;
                }
                // esc
                else if (key == 27) { that.value = that.last_val; that.sc.style.display = 'none'; }
                // enter
                else if (key == 13 || key == 9) {
                    var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                    if (sel && that.sc.style.display != 'none') { o.onSelect(e, sel.getAttribute('data-val'), sel); setTimeout(function(){ that.sc.style.display = 'none'; }, 20); }
                }
            };
            addEvent(that, 'keydown', that.keydownHandler);

            that.keyupHandler = function(e){
                var key = window.event ? e.keyCode : e.which;
                if (!key || (key < 35 || key > 40) && key != 13 && key != 27) {
                    var val = that.value;
                    if (val.length >= o.minChars) {
                        if (val != that.last_val) {
                            that.last_val = val;
                            clearTimeout(that.timer);
                            if (o.cache) {
                                if (val in that.cache) { suggest(that.cache[val]); return; }
                                // no requests if previous suggestions were empty
                                for (var i=1; i<val.length-o.minChars; i++) {
                                    var part = val.slice(0, val.length-i);
                                    if (part in that.cache && !that.cache[part].length) { suggest([]); return; }
                                }
                            }
                            that.timer = setTimeout(function(){ o.source(val, suggest) }, o.delay);
                        }
                    } else {
                        that.last_val = val;
                        that.sc.style.display = 'none';
                    }
                }
            };
            addEvent(that, 'keyup', that.keyupHandler);

            that.focusHandler = function(e){
                that.last_val = '\n';
                that.keyupHandler(e)
            };
            if (!o.minChars) addEvent(that, 'focus', that.focusHandler);
        }

        // public destroy method
        this.destroy = function(){
            for (var i=0; i<elems.length; i++) {
                var that = elems[i];
                removeEvent(window, 'resize', that.updateSC);
                removeEvent(that, 'blur', that.blurHandler);
                removeEvent(that, 'focus', that.focusHandler);
                removeEvent(that, 'keydown', that.keydownHandler);
                removeEvent(that, 'keyup', that.keyupHandler);
                if (that.autocompleteAttr)
                    that.setAttribute('autocomplete', that.autocompleteAttr);
                else
                    that.removeAttribute('autocomplete');
                document.body.removeChild(that.sc);
                that = null;
            }
        };
    }
    return autoComplete;
})();

(function(){
    if (typeof define === 'function' && define.amd)
        define('autoComplete', function () { return autoComplete; });
    else if (typeof module !== 'undefined' && module.exports)
        module.exports = autoComplete;
    else
        window.autoComplete = autoComplete;
})();

         