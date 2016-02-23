// JScript File

function Browseris() {
    var agt = navigator.userAgent.toLowerCase();
    this.osver = 1.0;
    if (agt) {
        var stOSVer = agt.substring(agt.indexOf("windows ") + 11);
        this.osver = parseFloat(stOSVer);
    }
    this.major = parseInt(navigator.appVersion);
    this.nav = ((agt.indexOf('mozilla') != -1) && ((agt.indexOf('spoofer') == -1) && (agt.indexOf('compatible') == -1)));
    this.nav2 = (this.nav && (this.major == 2));
    this.nav3 = (this.nav && (this.major == 3));
    this.nav4 = (this.nav && (this.major == 4));
    this.nav6 = this.nav && (this.major == 5);
    this.nav6up = this.nav && (this.major >= 5);
    this.nav7up = false;
    if (this.nav6up) {
        var navIdx = agt.indexOf("netscape/");
        if (navIdx >= 0)
            this.nav7up = parseInt(agt.substring(navIdx + 9)) >= 7;
    }
    this.ie = (agt.indexOf("msie") != -1);
    this.aol = this.ie && agt.indexOf(" aol ") != -1;
    if (this.ie) {
        var stIEVer = agt.substring(agt.indexOf("msie ") + 5);
        this.iever = parseInt(stIEVer);
        this.verIEFull = parseFloat(stIEVer);
    }
    else
        this.iever = 0;
    this.ie3 = (this.ie && (this.major == 2));
    this.ie4 = (this.ie && (this.major == 4));
    this.ie4up = this.ie && (this.major >= 4);
    this.ie5up = this.ie && (this.iever >= 5);
    this.ie55up = this.ie && (this.verIEFull >= 5.5);
    this.ie6up = this.ie && (this.iever >= 6);
    this.win16 = ((agt.indexOf("win16") != -1)
               || (agt.indexOf("16bit") != -1) || (agt.indexOf("windows 3.1") != -1)
               || (agt.indexOf("windows 16-bit") != -1));
    this.win31 = (agt.indexOf("windows 3.1") != -1) || (agt.indexOf("win16") != -1) ||
                 (agt.indexOf("windows 16-bit") != -1);
    this.win98 = ((agt.indexOf("win98") != -1) || (agt.indexOf("windows 98") != -1));
    this.win95 = ((agt.indexOf("win95") != -1) || (agt.indexOf("windows 95") != -1));
    this.winnt = ((agt.indexOf("winnt") != -1) || (agt.indexOf("windows nt") != -1));
    this.win32 = this.win95 || this.winnt || this.win98 ||
                 ((this.major >= 4) && (navigator.platform == "Win32")) ||
                 (agt.indexOf("win32") != -1) || (agt.indexOf("32bit") != -1);
    this.os2 = (agt.indexOf("os/2") != -1)
                 || (navigator.appVersion.indexOf("OS/2") != -1)
                 || (agt.indexOf("ibm-webexplorer") != -1);
    this.mac = (agt.indexOf("mac") != -1);
    this.mac68k = this.mac && ((agt.indexOf("68k") != -1) ||
                               (agt.indexOf("68000") != -1));
    this.macppc = this.mac && ((agt.indexOf("ppc") != -1) ||
                               (agt.indexOf("powerpc") != -1));
    this.w3c = this.nav6up;
}
var browseris = new Browseris();

var SPEEDIMNControlObj = null;
var bSPEEDIMNControlInited = false;
var SPEEDIMNDictionaryObj = null;
var bSPEEDIMNSorted = false;
var bSPEEDIMNOnloadAttached = false;
var SPEEDIMNOrigScrollFunc = null;
var bSPEEDIMNInScrollFunc = false;
var SPEEDIMNSortableObj = null;
var SPEEDIMNHeaderObj = null;
var SPEEDIMNNameDictionaryObj = null;
var SPEEDIMNShowOfflineObj = null;
var name = null;
function EnsureSPEEDIMNControl() {
    if (!bSPEEDIMNControlInited) {
        if (browseris.ie5up && browseris.win32) {
            SPEEDIMNControlObj = new ActiveXObject("Name.NameCtrl.1")
        }
        bSPEEDIMNControlInited = true;
        if (SPEEDIMNControlObj) {
            SPEEDIMNControlObj.OnStatusChange = SPEEDIMNOnStatusChange;
        }
    }
    return SPEEDIMNControlObj;
}

function SPEEDIMNGetStatusImage(state, showoffline) {

    var img = "presence_16-unknown.png";
    switch (state) {
        case 0:
            img = "presence_16-online.png";
            break;
        case 1:
            img = "presence_16-off.png";
            break;
        case 2:
            img = "presence_16-away.png";
            break;
        case 3:
            img = "presence_16-busy.png";
            break;
        case 4:
            img = "presence_16-away.png";
            break;
        case 5:
            img = "presence_16-away.png";
            break;
        case 6:
            img = "presence_16-away.png";
            break;
        case 7:
            img = "presence_16-busy.png";
            break;
        case 8:
            img = "presence_16-away.png";
            break;
        case 9:
            img = "presence_16-dnd.png";
            break;
        case 10:
            img = "presence_16-busy.png";
            break;
        case 11:
            img = "presence_16-online.png";
            break;
        case 12:
            img = "presence_16-off.png";
            break;
        case 13:
            img = "presence_16-away.png";
            break;
        case 14:
            img = "presence_16-busy.png";
            break;
        case 15:
            img = "presence_16-dnd.png";
            break;
        case 16:
            img = "presence_16-idle-online.png";
            break;
        case 17:
            img = "presence_16-idle-online.png";
            break;
        case 18:
            img = "presence_16-block.png";
            break;
        case 19:
            img = "presence_16-idle-busy.png";
            break;
        case 20:
            img = "presence_16-idle-busy.png";
            break;
        default:
            img = "presence_16-unknown.png";
            break;
    }
    return img;
}
function SPEEDIMNGetHeaderImage() {
    return "imnhdr.gif";
}
function SPEEDIMNIsOnlineState(state) {
    if (state == -1) {
        return false;
    }
    return true;
}
function SPEEDIMNSortList(j, oldState, state) {
    var objTable = null;
    var objRow = null;
    if (SPEEDIMNSortableObj && SPEEDIMNSortableObj[j]) {
        objRow = document.getElementById(j);
        while (objRow && !(objRow.tagName == "TR" &&
               typeof (objRow.Sortable) != "undefined")) {
            objRow = objRow.parentNode;
        }
        objTable = objRow;
        while (objTable && objTable.tagName != "TABLE") {
            objTable = objTable.parentNode;
        }
        if (objTable != null && objRow != null) {
            if (objTable.rows[1].style.display == "none") {
                for (i = 1; i < 4; i++) {
                    objTable.rows[i].style.display = "block";
                }
            }
            if (!SPEEDIMNIsOnlineState(oldState) && SPEEDIMNIsOnlineState(state)) {
                objTable.rows[2].style.display = "none";
                i = 3;
                while (objTable.rows[i].id != "Offline" && objTable.rows[i].innerText < objRow.innerText)
                    i++;
                objTable.moveRow(objRow.rowIndex, i);
                if (objTable.rows[objTable.rows.length - 3].id == "Offline") {
                    objTable.rows[objTable.rows.length - 2].style.display = "block";
                }
            }
            else if (SPEEDIMNIsOnlineState(oldState) && !SPEEDIMNIsOnlineState(state)) {
                if (objRow.rowIndex == 3 &&
                	objTable.rows[objRow.rowIndex + 1].id == "Offline") {
                    objTable.rows[2].style.display = "block";
                }
                if (objTable.rows[objTable.rows.length - 3].id == "Offline") {
                    objTable.rows[objTable.rows.length - 2].style.display = "none";
                }
                i = objTable.rows.length - 2;
                while (objTable.rows[i - 1].id != "Offline" && objTable.rows[i].innerText > objRow.innerText)
                    i--;
                objTable.moveRow(objRow.rowIndex, i);
            }
        }
    }
}
function SPEEDIMNOnStatusChange(name, state, id) {
    if (SPEEDIMNDictionaryObj) {
        var img = SPEEDIMNGetStatusImage(state, SPEEDIMNSortableObj[id] ||
                                    SPEEDIMNShowOfflineObj[id]);
        if (SPEEDIMNDictionaryObj[id] != state) {
            if (bSPEEDIMNSorted)
                SPEEDIMNSortList(id, SPEEDIMNDictionaryObj[id], state);
            SPEEDIMNUpdateImage(id, img);
            SPEEDIMNDictionaryObj[id] = state;
        }
    }
}
function SPEEDIMNUpdateImage(id, img) {
    var obj = document.images(id);
    if (obj) {

        var oldImg = obj.src;       
        var index = oldImg.lastIndexOf("/");
        var newImg = oldImg.slice(0, index + 1);
        newImg += img;
        if (img == "presence_16-online.png")
            obj.title = "Available";
        if (img == "presence_16-off.png")
            obj.title = "Offline";
        if (img == "presence_16-away.png")
            obj.title = "Away";
        if (img == "presence_16-busy.png")
            obj.title = "Busy";
        if (img == "presence_16-dnd.png")
            obj.title = "Do not disturb";
        if (img == "presence_16-block.png")
            obj.title = "Block";
        if (img == "presence_16-idle-busy.png")
            obj.title = "Idle Busy";
        if (img == "presence_16-idle-online.png")
            obj.title = "Idle Online";
        if (img == "presence_16-unknown.png")
            obj.title = "Unknown";
        if (oldImg != newImg) 
            obj.src = newImg;         
        if (obj.altbase) {
            obj.alt = obj.altbase;
        }
    }
}
function SPEEDIMNHandleAccelerator() {
    if (SPEEDIMNControlObj) {
        if (event.altKey && event.shiftKey &&
            event.keyCode == 121) {
            SPEEDIMNControlObj.DoAccelerator();
        }
    }
}
function SPEEDIMNGetOOUILocation(obj) {
    var objRet = new Object;
    var objSpan = obj;
    var objOOUI = obj;
    var oouiX = 0, oouiY = 0, objDX = 0;
    var fRtl = document.dir == "rtl";
    while (objSpan && objSpan.tagName != "SPAN" && objSpan.tagName != "TABLE") {
        objSpan = objSpan.parentNode;
    }
    if (objSpan) {
        var collNodes = objSpan.tagName == "TABLE" ?
                       objSpan.rows(0).cells(0).childNodes :
                       objSpan.childNodes;
        var i;
        for (i = 0; i < collNodes.length; ++i) {
            if (collNodes.item(i).tagName == "IMG" && collNodes.item(i).id) {
                objOOUI = collNodes.item(i);
                break;
            }
        }
    }
    obj = objOOUI;
    var oldObj;
    while (obj) {
        if (fRtl) {
            if (obj.scrollWidth >= obj.clientWidth + obj.scrollLeft)
                objDX = obj.scrollWidth - obj.clientWidth - obj.scrollLeft;
            else
                objDX = obj.clientWidth + obj.scrollLeft - obj.scrollWidth;
            oouiX += obj.offsetLeft + objDX;
        }
        else
            oouiX += obj.offsetLeft - obj.scrollLeft;
        oouiY += obj.offsetTop - obj.scrollTop;
        oldObj = obj;
        obj = obj.offsetParent;
    }

    if (oldObj.scrollTop == 0) {
        oouiY -= (document.documentElement && document.documentElement.scrollTop) ?
  document.documentElement.scrollTop : 0;
    }

    if (oldObj.scrollLeft == 0) {
        oouiX -= (document.documentElement && document.documentElement.scrollLeft) ?
  document.documentElement.scrollLeft : 0;
    }

    try {
        obj = window.frameElement;
        while (obj) {
            if (fRtl) {
                if (obj.scrollWidth >= obj.clientWidth + obj.scrollLeft)
                    objDX = obj.scrollWidth - obj.clientWidth - obj.scrollLeft;
                else
                    objDX = obj.clientWidth + obj.scrollLeft - obj.scrollWidth;
                oouiX += obj.offsetLeft + objDX;
            }
            else
                oouiX += obj.offsetLeft - obj.scrollLeft;
            oouiY += obj.offsetTop - obj.scrollTop;
            obj = obj.offsetParent;
        }
    } catch (e) {
    };
    objRet.objSpan = objSpan;
    objRet.objOOUI = objOOUI;
    objRet.oouiX = oouiX;
    objRet.oouiY = oouiY;
    if (fRtl)
        objRet.oouiX += objOOUI.offsetWidth;
    return objRet;
}
function SPEEDIMNShowOOUIMouse() {
    SPEEDIMNShowOOUI(0);
}
function SPEEDIMNShowOOUIKyb() {
    SPEEDIMNShowOOUI(1);
}
function SPEEDIMNShowOOUI(inputType) {
    if (browseris.ie5up && browseris.win32) {
        var obj = window.event.srcElement;
        var objSpan = obj;
        var objOOUI = obj;
        var oouiX = 0, oouiY = 0;
        if (EnsureSPEEDIMNControl() && SPEEDIMNNameDictionaryObj) {
            var objRet = SPEEDIMNGetOOUILocation(obj);
            objSpan = objRet.objSpan;
            objOOUI = objRet.objOOUI;
            oouiX = objRet.oouiX;
            oouiY = objRet.oouiY;
            var name = SPEEDIMNNameDictionaryObj[objOOUI.id];
            if (objSpan)
                objSpan.onkeydown = SPEEDIMNHandleAccelerator;
            SPEEDIMNControlObj.ShowOOUI(name, inputType, oouiX, oouiY);
        }
    }
}
function SPEEDIMNHideOOUI() {
    if (SPEEDIMNControlObj) {
        SPEEDIMNControlObj.HideOOUI();
        return false;
    }
    return true;
}
function SPEEDIMNScroll() {
    if (!bSPEEDIMNInScrollFunc) {
        bSPEEDIMNInScrollFunc = true;
        SPEEDIMNHideOOUI();
    }
    bSPEEDIMNInScrollFunc = false;
    return SPEEDIMNOrigScrollFunc ? SPEEDIMNOrigScrollFunc() : true;
}
function SPEEDIMNRC() {
    name = $("#ccEmailId")[0].value;
    //name = document.getElementById('ccEmailId').innerHTML;
    elem = document.getElementById('imgCommunicatorStatus');
    if (name == null || name == '')
        return;
    if (browseris.ie5up && browseris.win32) {
        //var obj = window.event.srcElement;
        if (EnsureSPEEDIMNControl() == null)
            return;
        var obj = elem;
        var objSpan = obj;
        var id = obj.id;
        var fFirst = false;
        if (!SPEEDIMNDictionaryObj) {
            SPEEDIMNDictionaryObj = new Object();
            SPEEDIMNNameDictionaryObj = new Object();
            SPEEDIMNSortableObj = new Object();
            SPEEDIMNShowOfflineObj = new Object();
            if (!SPEEDIMNOrigScrollFunc) {
                SPEEDIMNOrigScrollFunc = window.onscroll;
                window.onscroll = SPEEDIMNScroll;
            }
        }
        if (SPEEDIMNDictionaryObj) {
            if (!SPEEDIMNNameDictionaryObj[id]) {
                SPEEDIMNNameDictionaryObj[id] = name;
                fFirst = true;
            }
            if (typeof (SPEEDIMNDictionaryObj[id]) == "undefined") {
                SPEEDIMNDictionaryObj[id] = 1;
            }
            if (!SPEEDIMNSortableObj[id] &&
                (typeof (obj.Sortable) != "undefined")) {
                SPEEDIMNSortableObj[id] = obj.Sortable;
                if (!bSPEEDIMNOnloadAttached) {
                    //&& SPEEDIMNControlObj.PresenceEnabled
                    if (EnsureSPEEDIMNControl())
                        window.attachEvent("onload", SPEEDIMNSortTable);
                    bSPEEDIMNOnloadAttached = true;
                }
            }
            if (!SPEEDIMNShowOfflineObj[id] &&
                (typeof (obj.ShowOfflinePawn) != "undefined")) {
                SPEEDIMNShowOfflineObj[id] = obj.ShowOfflinePawn;
            }
            //&& SPEEDIMNControlObj.PresenceEnabled
            if (EnsureSPEEDIMNControl()) {
                var state = -1;
                var img;
                state = SPEEDIMNControlObj.GetStatus(name, id);
                if (SPEEDIMNIsOnlineState(state) || SPEEDIMNSortableObj[id] ||
                    SPEEDIMNShowOfflineObj[id]) {
                    img = SPEEDIMNGetStatusImage(state, SPEEDIMNSortableObj[id] ||
                                            SPEEDIMNShowOfflineObj[id]);
                    SPEEDIMNUpdateImage(id, img);
                    SPEEDIMNDictionaryObj[id] = state;
                }
            }
        }
        if (1 == 1)//modified for SPEED
        {
            var objRet = SPEEDIMNGetOOUILocation(obj);
            objSpan = objRet.objSpan;
            if (objSpan) {
                objSpan.onmouseover = SPEEDIMNShowOOUIMouse;
                objSpan.onfocusin = SPEEDIMNShowOOUIKyb;
                objSpan.onmouseout = SPEEDIMNHideOOUI;
                objSpan.onfocusout = SPEEDIMNHideOOUI;
            }
        }
    }
}
function SPEEDIMNSortTable() {
    var id;
    for (id in SPEEDIMNDictionaryObj) {
        SPEEDIMNSortList(id, 1, SPEEDIMNDictionaryObj[id]);
    }
    bIMNSorted = true;
}
function SPEEDIMNRegisterHeader() {
    if (browseris.ie5up && browseris.win32) {
        var obj = window.event.srcElement;
        if (!SPEEDIMNHeaderObj) {
            SPEEDIMNHeaderObj = new Object();
        }
        if (SPEEDIMNHeaderObj) {
            var id = obj.id;
            if (!SPEEDIMNHeaderObj[id]) {
                SPEEDIMNHeaderObj[id] = id;
                var img;
                img = SPEEDIMNGetHeaderImage();
                SPEEDIMNUpdateImage(id, img);
            }
        }
    }
}

//FOR COMMUNICATING THROUGH COMMUNICATOR

var ForCommunicator = "";
var obj;
function OpenCommunicatorTileView() {
    var obj = $("#ccEmailId")[0].value;
    //var obj = document.getElementById('ccEmailId').innerHTML;
    if (obj != null && obj != undefined && obj != '' && obj != 'Not Available') {
        var left = (screen.width / 2) - (200 / 2);
        var top = (screen.height / 2) - (200 / 2);
        ForCommunicator = window.open('sip:' + obj, '', 'toolbar=no,location=yes,directories=no,status=no,scrollbars=no,resizable=yes,width=50,height=50,visible=none,top=' + top + ', left=' + left);
        if (navigator.appName == "Netscape") {
            var t = setTimeout('CloseForCommunicatorTileWindow()', 10);
        }
        else {
            var t = setTimeout('CloseForCommunicatorTileWindow()', 10);
            //            var t = setTimeout('CloseForCommunicatorTileWindow()', 40);
        }
    }
}

function CloseForCommunicatorTileWindow() {

    if (ForCommunicator != null) {
        ForCommunicator.close();
        ForCommunicator = null;
    }
}
