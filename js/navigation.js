"use strict";

function displayContentBasedOnURLParameters() {

    //Careful with input here . . . comes from URL so can contain any characters, so we want to sanitize it before using.

    var path = window.location.pathname;

    var url = window.location.href;

    var action;

    if (url.indexOf('#') != -1) {
        action = sanitizeAlphanumeric(url.substring(url.indexOf('#') + 1).toLowerCase());
        //navigation back to home page, clear topic

    } else if (url.indexOf('/p/') != -1) {
        var postid = sanitizeAlphanumeric(url.substr(url.indexOf('/p/') + 3, 10).toLowerCase());
        showThread(sanitizeAlphanumeric(postid), sanitizeAlphanumeric(postid), 'thread');
        return;
    } else if (url.indexOf('/m/') != -1) {
        var pagingidHOSTILE = sanitizeAlphanumeric(url.substring(url.indexOf('/m/') + 3).toLowerCase());
        showMemberPagingID(pagingidHOSTILE);
        return;
    } else if (url.indexOf('/t/') != -1) {
        var topicnameHOSTILE = sanitizeAlphanumeric(url.substring(url.indexOf('/t/') + 3).toLowerCase());
        showTopic(0,numbers.results,topicnameHOSTILE);
        return;
    } else {
        setTopic("");
        action = "";
    }

    if (action.startsWith("show")) {
        setOrder('orderselector', getParameterByName("order"));
        setOrder('contentselector', getParameterByName("content"));
        setOrder('filterselector', getParameterByName("filter"));

        showPostsNew(
            sanitizeAlphanumeric(getParameterByName("order")),
            sanitizeAlphanumeric(getParameterByName("content")),
            getParameterByName("topicname"), //HOSTILE
            sanitizeAlphanumeric(getParameterByName("filter")),
            Number(getParameterByName("start")),
            Number(getParameterByName("limit")),
            sanitizeAlphanumeric(getParameterByName("qaddress"))
        );
        setTopic(getParameterByName("topicname"));
    } else if (action.startsWith("memberposts")) {
        showMemberPosts(Number(getParameterByName("start")), Number(getParameterByName("limit")), sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("notifications")) {
        showNotifications(Number(getParameterByName("start")), Number(getParameterByName("limit")), sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("member")) {
        showMember(sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("followers")) {
        showFollowers(sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("following")) {
        showFollowing(sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("blockers")) {
        showBlockers(sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("blocking")) {
        showBlocking(sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("ratings")) {
        showRatings(sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("bootstrap")) {
        showBootstrap(sanitizeAlphanumeric(pubkey));
    } else if (action.startsWith("posts")) {
        showPosts(Number(getParameterByName("start")), Number(getParameterByName("limit")), sanitizeAlphanumeric(getParameterByName("type")));
    } else if (action.startsWith("feed")) {
        showFeed(Number(getParameterByName("start")), Number(getParameterByName("limit")), sanitizeAlphanumeric(getParameterByName("type")));
    } else if (action.startsWith("comments")) {
        showComments(Number(getParameterByName("start")), Number(getParameterByName("limit")), sanitizeAlphanumeric(getParameterByName("type")));
    } else if (action.startsWith("trustgraph")) {
        showTrustGraph(sanitizeAlphanumeric(getParameterByName("member")), sanitizeAlphanumeric(getParameterByName("target")));
    } else if (action.startsWith("topiclist")) {
        showTopicList();
    } else if (action.startsWith("topic")) {
        //Warning - topicname may contain special characters
        showTopic(Number(getParameterByName("start")), Number(getParameterByName("limit")), getParameterByName("topicname"), sanitizeAlphanumeric(getParameterByName("type")));
    } else if (action.startsWith("article")) {
        showThread(sanitizeAlphanumeric(getParameterByName("root")), sanitizeAlphanumeric(getParameterByName("post")), 'article');
    } else if (action.startsWith("thread")) {
        showThread(sanitizeAlphanumeric(getParameterByName("root")), sanitizeAlphanumeric(getParameterByName("post")), 'thread');
    } else if (action.startsWith("settings")) {
        showSettings();
    } else if (action.startsWith("messages")) {
        showMessages();
    }
    else if (action.startsWith("new")) {
        showNewPost();
    } else if (action.startsWith("map")) {
        showMap(sanitizeAlphanumeric(getParameterByName("geohash")), sanitizeAlphanumeric(getParameterByName("post")));
    } else if (action.startsWith("myfeed")) {
        showMyFeed();
    } else if (action.startsWith("tools")) {
        showTools();
    } else if (action.startsWith("login")) {
        if (pubkey == "" || pubkey == null || pubkey == undefined) {
            showLogin();
        } else {
            showPosts(0, numbers.results, 'all');
        }
    } else {
        showPosts(0, numbers.results, 'all');
    }
}

function hideAll() {
    switchToRegularMode();
    document.getElementById('feed').style.display = "none";
    document.getElementById('posts').style.display = "none";
    document.getElementById('comments').style.display = "none";
    document.getElementById('thread').style.display = "none";
    document.getElementById('memberposts').style.display = "none";
    document.getElementById('notifications').style.display = "none";
    //remove the content too, so that we don't get conflicting ids
    document.getElementById('feed').innerHTML = "";
    document.getElementById('posts').innerHTML = "";
    document.getElementById('comments').innerHTML = "";
    document.getElementById('thread').innerHTML = "";
    document.getElementById('memberposts').innerHTML = "";
    document.getElementById('notifications').innerHTML = "";

    document.getElementById('settingsanchor').style.display = "none";
    document.getElementById('loginbox').style.display = "none";
    document.getElementById('followers').style.display = "none";
    document.getElementById('following').style.display = "none";
    document.getElementById('blockers').style.display = "none";
    document.getElementById('blocking').style.display = "none";
    document.getElementById('member').style.display = "none";
    document.getElementById('newpost').style.display = "none";
    document.getElementById('anchorratings').style.display = "none";
    document.getElementById('map').style.display = "none";
    document.getElementById('trustgraph').style.display = "none";
    document.getElementById('bootstrap').style.display = "none";
    document.getElementById('community').style.display = "none";
    document.getElementById('topiclistanchor').style.display = "none";
    document.getElementById('toolsanchor').style.display = "none";
    document.getElementById('messagesanchor').style.display = "none";
    document.getElementById('topicmeta').style.display = "none";
    
}

function show(theDiv) {
    hideAll();
    document.getElementById(theDiv).style.display = "block";
}

function showOnly(theDiv) {
    document.getElementById(theDiv).style.display = "block";
}

function hide(theDiv) {
    document.getElementById(theDiv).style.display = "none";
}

function showTools() {
    show('toolsanchor');
}

function showLogin() {
    show("loginbox");
}

function showMap(geohash, posttrxid) {
    show("map");
    getAndPopulateMap(geohash, posttrxid);
    document.getElementById('map').style.display = "block";
}

function hideMap() {
    //show("map");
    //getAndPopulateMap();
    document.getElementById('map').style.display = "none";
}

function showRatings(qaddress) {
    show('anchorratings');
    getAndPopulateRatings(qaddress);
    document.getElementById('anchorratings').style.display = "block";
}

function showBootstrap(qaddress) {
    show("bootstrap");
    getAndPopulateBootstrap(qaddress);
}

function showNewPost() {
    show("newpost");
    document.getElementById('memorandumpreview').innerHTML = "";
    let topicNameHOSTILE = getCurrentTopicHOSTILE();
    //document.getElementById('memotopic').value = topicNameHOSTILE;
    document.getElementById('memorandumtopic').value = topicNameHOSTILE;
    if (topicNameHOSTILE != "") {
        document.getElementById('memorandumtopicarea').style.display = "block";
        document.getElementById('memorandumtopicbutton').style.display = "none";
    } else {
        document.getElementById('memorandumtopicarea').style.display = "none";
        document.getElementById('memorandumtopicbutton').style.display = "block";
    }
    //Do calculations on maxlengths for topics and titles
    topictitleChanged("memorandum");
    //topictitleChanged("memo");
    //document.getElementById('newpostbutton').style.display = "block";

    //Markdown editor doesn't seem to work well on Android
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    if (!isAndroid) {
        initMarkdownEditor();
    }
}


function showNotifications(start, limit) {

    if (pubkey == "" || pubkey == null || pubkey == undefined) {
        showPosts(0, numbers.results, 'all');
        return;
    }

    getAndPopulateNotifications(start, limit, "notifications", pubkey);

}

function showSettings() {
    //Need to be logged in
    if (pubkey == "" || pubkey == null || pubkey == undefined) {
        showPosts(0, numbers.results, 'all');
        return;
    }
    hideAll();
    getAndPopulateSettings();
    //getAndPopulate(0, numbers.results, 'memberposts', pubkey);
    document.getElementById('settingsanchor').style.display = "block";
    document.getElementById('settingsfollow').style.display = "block";
}

function showMember(qaddress) {
    getAndPopulateMember(qaddress);
    getAndPopulateNew('new', 'all', '', '', 0, numbers.results, 'memberposts', qaddress);
    //getAndPopulate(0, numbers.results, 'memberposts', qaddress);
    document.getElementById('member').style.display = "block";
    document.getElementById('memberfollow').style.display = "block";
    document.getElementById('memberblock').style.display = "block";
    document.getElementById('community').style.display = "block";
    document.getElementById('anchorratings').style.display = "block";
    document.getElementById('trustgraph').style.display = "block";
}

//deprecated - now on member page
function showTrustGraph(member, target) {
    show("trustgraph");
    getAndPopulateTrustGraph(member, target);
}

function showMemberPosts(start, limit, qaddress) {
    //getAndPopulate(start, limit, 'memberposts', qaddress);
    getAndPopulateNew('new', 'all', '', '', start, limit, 'memberposts', qaddress);
}

function showMessages(start, limit) {
    show("messagesanchor");
    getAndPopulateMessages(start, limit);
}

//These three should be refactored away
function showFeed(start, limit, type) {
    showPFC(start, limit, 'posts', pubkey, type);
}
function showPosts(start, limit, type) {
    showPFC(start, limit, 'posts', pubkey, type);
}
function showComments(start, limit, type) {
    showPFC(start, limit, 'replies', pubkey, type);
}

function showPFC(start, limit, page, pubkey, type) {
    //getAndPopulate(start, limit, page, pubkey, type, getCurrentTopicHOSTILE());
    showPostsNew('hot', page, getCurrentTopicHOSTILE(), 'everyone', start, limit)
}

function showMyFeed() {
    setTopic('');
    getAndPopulateNew('new', 'posts', 'myfeed', 'myfeed', 0, numbers.results, 'posts', '');
}

function showPostsNew(order, content, topicnameHOSTILE, filter, start, limit, qaddress) {
    getAndPopulateNew(order, content, topicnameHOSTILE, filter, start, limit, 'posts', qaddress);
}


//Topics
function showTopic(start, limit, topicnameHOSTILE, type) {
    //Warning, topicname may contain hostile characters
    setTopic(topicnameHOSTILE);
    if (type == "") type = "new";
    getAndPopulateNew(type, 'posts', topicnameHOSTILE, 'everyone', start, limit, 'posts', '');
    //getAndPopulate(start, limit, 'posts', pubkey, type, topicNameHOSTILE);
}

function getCurrentTopicHOSTILE() {
    var selector = document.getElementById('topicselector');
    var topicNameHOSTILE = selector.options[selector.selectedIndex].value;
    return topicNameHOSTILE;
}

function showTopicList() {
    setTopic("");
    getAndPopulateTopicList(true);
}

function resetScroll() {
    scrollhistory = [];
}

function postsSelectorChanged() {

    //Reset scroll history
    resetScroll();

    //get value from the 4 drop downs
    var selector;

    //orderselector
    selector = document.getElementById('orderselector');
    var order = selector.options[selector.selectedIndex].value;

    //contentselector
    selector = document.getElementById('contentselector');
    var content = selector.options[selector.selectedIndex].value;

    //topicselector
    selector = document.getElementById('topicselector');
    var topicNameHOSTILE = selector.options[selector.selectedIndex].value;

    //filterselector
    selector = document.getElementById('filterselector');
    var filter = selector.options[selector.selectedIndex].value;

    //These two statements may trigger page load twice on firefox but not on other browsers

    //set the document location without triggering the back/forward function
    suspendPageReload = true;
    document.location.hash = "#show?order=" + order + "&content=" + content + "&topicname=" + encodeURIComponent(topicNameHOSTILE) + "&filter=" + filter + "&start=0&limit=" + Number(numbers.results);
    setTimeout(function () { suspendPageReload = false; }, 1000);

    //show the posts
    displayContentBasedOnURLParameters();
}

/*function exitTopic(){
    //currentTopic = "";
    //document.getElementById('memotopic').value = "";
    //document.getElementById('memorandumtopic').value = "";
    enterTopic("");    
}*/
function setOrder(selectorvalue, order) {
    var selector = document.getElementById(selectorvalue);
    for (var i = 0; i < selector.length; i++) {
        if (selector.options[i].value == order) {
            selector.selectedIndex = i;
        }
    }
}


function setTopic(topicNameHOSTILE) {
    //Warning, topicname may contain hostile characters
    var selector = document.getElementById('topicselector');

    if (topicNameHOSTILE == null || topicNameHOSTILE == "") {
        selector.selectedIndex = 0;
        hide("topicmeta");
        return;
    }

    if (topicNameHOSTILE.toLowerCase() == "myfeed" || topicNameHOSTILE.toLowerCase() == "mytopics") {
        hide("topicmeta");
    } else {
        showOnly("topicmeta");
        getAndPopulateTopic(topicNameHOSTILE);
    }

    selector.selectedIndex = 1;
    selector.options[selector.selectedIndex].value = topicNameHOSTILE;
    selector.options[selector.selectedIndex].text = capitalizeFirstLetter(topicNameHOSTILE.substring(0, 13));
}


function showThread(roottxid, txid, articleStyle) {
    getAndPopulateThread(roottxid, txid, 'thread');
    if (articleStyle == "article") {
        switchToArticleMode();
    }
}

function showFollowers(qaddress) {
    getAndPopulateFollowers(qaddress);
}

function showFollowing(qaddress) {
    getAndPopulateFollowing(qaddress);
}

function showBlockers(qaddress) {
    getAndPopulateBlockers(qaddress);
}

function showBlocking(qaddress) {
    getAndPopulateBlocking(qaddress);
}


//suspend back/forward detection for map panning
var suspendPageReload = false;

var detectBackOrForward = function (onBack, onForward) {
    //Note, sometimes onForward is being called even though it a regular navigation click event
    //Set the suspendPageReload to true before changing the href to stop this from happening
    let hashHistory = [window.location.hash];
    let historyLength = window.history.length;

    return function () {

        var hash = window.location.hash, length = window.history.length;
        if (hashHistory.length && historyLength == length) {
            if (hashHistory[hashHistory.length - 2] == hash) {
                hashHistory = hashHistory.slice(0, -1);
                if (!suspendPageReload) onBack();
            } else {
                hashHistory.push(hash);
                if (!suspendPageReload) onForward();
            }
        } else {
            hashHistory.push(hash);
            historyLength = length;
        }
        return true;
    }
};

var followOrBackFlag = false;
var backforwardfunction = detectBackOrForward(
    function () { followOrBackFlag = true; displayContentBasedOnURLParameters(); },
    function () { followOrBackFlag = true; displayContentBasedOnURLParameters(); /*This doesn't seem to work accurately if history is over 50*/ }
)

window.onhashchange = backforwardfunction;

var scrollhistory = [];

//record the scroll position
document.addEventListener("click", function () {
    scrollhistory[window.location.hash] = window.scrollY;
    //alert("document capture click");
}, true)
