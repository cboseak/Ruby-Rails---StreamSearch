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
           document.getElementById('movieInput').addEventListener('input',movieAutoComplete);
    });
    
    function movieAutoComplete(event){
        var incompleteSearch = document.getElementById("movieInput").value;
        var url = "https://api.themoviedb.org/3/search/movie?api_key="+ dbkey+"&query=" + incompleteSearch;
        var response = getRequest(url);
        availableTags = [];
        for(var cat in response){
            if(cat == "results"){
                for(var movie in response[cat]){
            
                    for(var title in response[cat][movie]){
                        if(title == "title"){
                            /*
                            var listItem = document.createElement('li');         
                            var textnode = document.createTextNode("<a href=\"index.html\">"+response[cat][movie][title]+"<br /><span>"+response[cat][movie][title]+"</span></a>");        
                            listItem.appendChild(textnode);                              // Append the text to <li>
                            document.getElementById("titleAuto").appendChild(listItem);  */ 
                            availableTags.push();
                            $( "#movieInput" ).autocomplete({source: availableTags});
                        }
                    }
                    
                }
            }
        }
    }
    function getMovieInfo(){
        resetAll();
        var url = gbbase + gbkey + "/movie/" + getGuideboxId();
        var response = getRequest(url);
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
        var result = nfSearch(document.getElementById('movieInput').value);
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
        var movie = document.getElementById("movieInput").value;
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
    

         