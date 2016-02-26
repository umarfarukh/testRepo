/* 
************************************************
OnBoarding Page Maker 
************************************************
Author: 260947
Date: 2012-Feb-11
Purpose: Dynamic page creation based on divs
************************************************
*/
/* JQXB.js */
var jQXB = { version: "1.1.20110926", initialized: false, alertOnError: false, compatibilitymode: false, m: { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, datasourcesCollectionOrigValues: new Array(), datasourcesCollection: new Array(), charset: "charset=utf-8", onBeforeUpdateCallBacks: new Array(), onAfterUpdateCallBacks: new Array(), onBeforeDataSourceBindCallBacks: new Array(), onAfterDataSourceBindCallBacks: new Array(), onBeforeTemplateBindCallBacks: new Array(), onAfterTemplateBindCallBacks: new Array(), onTemplateItemBindedCallbacks: new Array(), messageSubscribers: new Array(), internalOnBinding: new Array(), JQXB_DEFAULT_CHANGE_EVENT: "change", JQXB_DATASOURCE_ATTR: "jqxb-datasource", JQXB_DATASOURCE_MEMBER_ATTR: "jqxb-datamember", JQXB_TEMPLATE_ATTR: "jqxb-template", JQXB_OCCURENCY_ATTR: "jqxb-occurency", JQXB_TEMPLATECONTAINER_ATTR: "jqxb-templatecontainer", JQXB_TEMPLATEITEMPREFIX_ATTR: "jqxb-templateitemidprfx", JQXB_TEMPLATEOWNER_ATTR: "jqxb-itemtemplate", JQXB_TEMPLATEITEMDATAMEMBER_ATTR: "jqxb-itemdatamember", JQXB_TEMPLATEITEMDATASOURCE_ATTR: "jqxb-itemdatasource", JQXB_TEMPLATEITEMIDX_ATTR: "jqxb-itemdatasourceidx", JQXB_TEMPLATEITEM_DYNAMIC_ID_ATTR: "jqxb-templateitemdynamicid", JQXB_CHANGEONEVENT_ATTR: "jqxb-changeonevent", JQXB_BINDEDATTRIBUTE_ATTR: "jqxb-bindedattribute", JQXB_LISTSOURCE: "jqxb-listsource", JQXB_LISTVALUE: "jqxb-listvalue", JQXB_LISTTEXT: "jqxb-listtext", JQXB_VALUETRANSFORMATION: "jqxb-transformfunc", JQXB_CALCULATIONFUNC: "jqxb-calculatefunc" }; jQXB.toJSON = function (h, j) { var b, c, d, e, f = /["\\\x00-\x1f\x7f-\x9f]/g, g; switch (typeof h) { case "string": return f.test(h) ? '"' + h.replace(f, function (k) { var l = jQXB.m[k]; if (l) { return l } l = k.charCodeAt(); return "\\u00" + Math.floor(l / 16).toString(16) + (l % 16).toString(16) }) + '"' : '"' + h + '"'; case "number": return isFinite(h) ? String(h) : "null"; case "boolean": case "null": return String(h); case "object": if (!h) { return "null" } if (typeof h.toJSON === "function") { return jQXB.toJSON(h.toJSON()) } b = []; if (typeof h.length === "number" && !(h.propertyIsEnumerable("length"))) { e = h.length; for (c = 0; c < e; c += 1) { b.push(jQXB.toJSON(h[c], j) || "null") } return "[" + b.join(",") + "]" } if (j) { e = j.length; for (c = 0; c < e; c += 1) { d = j[c]; if (typeof d === "string") { g = jQXB.toJSON(h[d], j); if (g) { b.push(jQXB.toJSON(d) + ":" + g) } } } } else { for (d in h) { if (typeof d === "string") { g = jQXB.toJSON(h[d], j); if (g) { b.push(jQXB.toJSON(d) + ":" + g) } } } } return "{" + b.join(",") + "}" } }; jQXB.initialize = function (b, a) { var c = new Array(); if (c) { jQuery("[" + jQXB.JQXB_DATASOURCE_ATTR + "]:not([" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "])").each(function () { if (jQuery(this).attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR) == undefined) { c.push(jQuery(this).attr(jQXB.JQXB_DATASOURCE_ATTR) + " missing " + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + "attribute") } }) } if (jQXB.alertOnError != undefined) { jQXB.alertOnError = a } if (jQXB.initialized) { return jQXB } jQXB.initialized = true; return jQXB.attachChangeEvents() }; jQXB.refreshControls = function (b, c, a) { var d; if (c == undefined) { if (a == undefined) { d = "[" + jQXB.JQXB_DATASOURCE_ATTR + "=" + b + "][" + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + "]" } else { d = "[" + jQXB.JQXB_DATASOURCE_ATTR + "=" + b + "][" + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + "=" + a + "]" } } else { if (a == undefined) { d = "[" + jQXB.JQXB_DATASOURCE_ATTR + "=" + b + "][" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "] [" + jQXB.JQXB_TEMPLATEOWNER_ATTR + "][" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "=" + c + "] [" + jQXB.JQXB_TEMPLATEITEMDATAMEMBER_ATTR + "]" } else { d = "[" + jQXB.JQXB_DATASOURCE_ATTR + "=" + b + "][" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "] [" + jQXB.JQXB_TEMPLATEOWNER_ATTR + "][" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "=" + c + "] [" + jQXB.JQXB_TEMPLATEITEMDATAMEMBER_ATTR + "=" + a + "]" } } jQuery(d).each(function () { jQXB.getmemberValue(jQXB.getDataSource(b), c, jQuery(this).attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR) || jQuery(this).attr(jQXB.JQXB_TEMPLATEITEMDATAMEMBER_ATTR), jQuery(this)) }); return jQXB }; jQXB.attachChangeEvents = function () { jQuery("body").delegate("[" + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + "][" + jQXB.JQXB_DATASOURCE_ATTR + "]", jQXB.JQXB_DEFAULT_CHANGE_EVENT, function () { var a = jQuery(this); var b = jQXB.getValueFromAttrib(a); jQXB.setmemberVarvalue(a.attr(jQXB.JQXB_DATASOURCE_ATTR), null, a.attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), b, a) }); jQuery("body").delegate("[" + jQXB.JQXB_DATASOURCE_ATTR + "][" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "] [" + jQXB.JQXB_TEMPLATEITEMDATAMEMBER_ATTR + "]", jQXB.JQXB_DEFAULT_CHANGE_EVENT, function () { var a = jQuery(this); var c = a.parents("[" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "]").first().attr(jQXB.JQXB_TEMPLATEOWNER_ATTR); var b = a.parents("[" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "]").first().attr(jQXB.JQXB_TEMPLATEITEMIDX_ATTR); var d = jQXB.getValueFromAttrib(a); jQXB.setmemberVarvalue(a.parents("[" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "=" + c + "]").attr(jQXB.JQXB_DATASOURCE_ATTR), b, a.attr(jQXB.JQXB_TEMPLATEITEMDATAMEMBER_ATTR), d, a) }); return jQXB }; jQXB.attachChangeEvent = function (a, e, c, d) { var b = d.attr(jQXB.JQXB_CHANGEONEVENT_ATTR); if (b == undefined) { b = jQXB.JQXB_DEFAULT_CHANGE_EVENT } d.unbind(b, function () { jQXB.setmemberVarvalue(a, e, c, jQXB.getValueFromAttrib(jQuery(this)), jQuery(this)) }); d.bind(b, function () { jQXB.setmemberVarvalue(a, e, c, jQXB.getValueFromAttrib(jQuery(this)), jQuery(this)) }); return jQXB }; jQXB.addOnTemplateItemBoundhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.addOnTemplateItemBoundhnd Error: handler must be a function") } jQXB.addOnEvthnd(jQXB.onTemplateItemBindedCallbacks, a); return jQXB }; jQXB.delOnTemplateItemBoundhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.delOnTemplateItemBoundhnd Error: handler must be a function") } jQXB.delOnEventhdn(jQXB.onTemplateItemBindedCallbacks, a); return jQXB }; jQXB.addOnBeforeUpdatehnd = function (a) { if (typeof (a) != "function") { alert("jQXB.addOnBeforeUpdatehnd   Error: handler must be a function") } jQXB.addOnEvthnd(jQXB.onBeforeUpdateCallBacks, a); return jQXB }; jQXB.delOnBeforeUpdatehnd = function (a) { if (typeof (a) != "function") { alert("jQXB.delOnBeforeUpdatehnd Error: handler must be a function") } jQXB.delOnEventhdn(jQXB.onBeforeUpdateCallBacks, a); return jQXB }; jQXB.addOnAfterUpdatehnd = function (a) { if (typeof (a) != "function") { alert("jQXB.addOnAfterUpdatehnd   Error: handler must be a function") } jQXB.addOnEvthnd(jQXB.onAfterUpdateCallBacks, a); return jQXB }; jQXB.delOnAfterUpdatehnd = function (a) { if (typeof (a) != "function") { alert("jQXB.delOnAfterUpdatehnd Error: handler must be a function") } jQXB.delOnEventhdn(jQXB.onAfterUpdateCallBacks, a); return jQXB }; jQXB.addOnBeforeDataSourceBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.addOnBeforeDataSourceBindhnd Error: handler must be a function") } jQXB.addOnEvthnd(jQXB.onBeforeDataSourceBindCallBacks, a); return jQXB }; jQXB.delOnBeforeDataSourceBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.delOnBeforeDataSourceBindhnd  Error: handler must be a function") } jQXB.delOnEventhdn(jQXB.onBeforeDataSourceBindCallBacks, a); return jQXB }; jQXB.addOnAfterDataSourceBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.addOnAfterDataSourceBindhnd Error: handler must be a function") } jQXB.addOnEvthnd(jQXB.onAfterDataSourceBindCallBacks, a); return jQXB }; jQXB.delOnAfterDataSourceBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.delOnAfterDataSourceBindhnd  Error: handler must be a function") } jQXB.delOnEventhdn(jQXB.onAfterDataSourceBindCallBacks, a); return jQXB }; jQXB.addOnBeforeTemplateBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.addOnAfterTemplateBindhnd  Error: handler must be a function") } jQXB.addOnEvthnd(jQXB.onBeforeTemplateBindCallBacks, a); return jQXB }; jQXB.delOnBeforeTemplateBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.delOnBeforeTemplateBindhnd  Error: handler must be a function") } jQXB.delOnEventhdn(jQXB.onBeforeTemplateBindCallBacks, a); return jQXB }; jQXB.addOnAfterTemplateBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.addOnAfterTemplateBindhnd  Error: handler must be a function") } jQXB.addOnEvthnd(jQXB.onAfterTemplateBindCallBacks, a); return jQXB }; jQXB.delOnAfterTemplateBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.delOnAfterTemplateBindhnd  Error: handler must be a function") } jQXB.delOnEventhdn(jQXB.onAfterTemplateBindCallBacks, a); return jQXB }; jQXB.addOnEvthnd = function (b, a) { for (idx = 0; idx < b.length; idx++) { if (b[idx].toString() == a.toString()) { return } } b.push(a) }; jQXB.delOnEventhdn = function (b, a) { if (typeof (a) != "function") { alert("jQXB.delOnEventhdn Error: handler param must be a function"); return } for (idx = 0; idx < b.length; idx++) { if (b[idx].toString() == a.toString()) { b.splice(idx, 1); break } } }; jQXB.setDataSource = function (c, d, a) { var b = jQXB.datasourcesCollection[c]; if (b == undefined) { b = { datasource: d, autorefresh: a} } else { b.datasource = d } if (a != undefined) { b.autorefresh = a } jQXB.datasourcesCollection[c] = b; jQXB.datasourcesCollectionOrigValues[c] = d; return jQXB }; jQXB.getDataSource = function getDataSource(a) { try { return jQXB.datasourcesCollection[a].datasource } catch (b) { b.arguments = arguments; alert(jQXB.diags.dumpobj(b, "[ERROR]", "->")) } }; jQXB.getDataSourceContainer = function (a) { return jQXB.datasourcesCollection[a] }; jQXB.getDataSourceOrigValue = function (a) { return jQXB.datasourcesCollectionOrigValues[a] }; jQXB.addRowToDataSource = function (b, c, a) { if (!jQXB.utils.isEnumerable(jQXB.getDataSource(b))) { alert(b + "  must be enumerable in order to add object "); return } if (a == undefined) { jQXB.getDataSource(b).push(c) } else { jQXB.getDataSource(b).splice(a, 0, c) } jQXB.bindTemplate(b); jQXB.bindList(b); return jQXB }; jQXB.addObjectToDataSource = function (a, b) { return jQXB.addRowToDataSource(a, b) }; jQXB.deleteRowFromDataSource = function (a, b) { if (!jQXB.utils.isEnumerable(jQXB.getDataSource(a))) { alert(a + "  must be enumerable in order to remove object "); return } jQXB.getDataSource(a).splice(b, 1); jQuery("[" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "][" + jQXB.JQXB_DATASOURCE_ATTR + "=" + a + "] > [" + jQXB.JQXB_TEMPLATE_ATTR + "][" + jQXB.JQXB_TEMPLATEITEMPREFIX_ATTR + "]").each(function () { jQXB.deleteTemplateRow(jQuery(this).attr(jQXB.JQXB_TEMPLATE_ATTR), b) }); return jQXB }; jQXB.deleteObjectFromDataSource = function (a, b) { return jQXB.deleteRowFromDataSource(a, b) }; jQXB.saveJSON = function (d, a, c, b) { return jQXB.postJSON(d, "post", a, c, b) }; jQXB.deleteJSON = function (d, a, c, b) { return jQXB.postJSON(d, "delete", a, c, b) }; jQXB.postJSON = function (e, c, a, d, b) { return jQXB.ajaxCall(e, c, a, d, b) }; jQXB.ajaxCall = function (e, c, a, d, b) { jQuery.ajax({ type: c, traditional: true, url: e, async: false, data: jQXB.toJSON(a), dataType: "json", contentType: "application/json; " + jQXB.charset, success: function (f) { if (d != undefined) { d(f) } }, error: function (f) { if (b != undefined) { if (jQXB.alertOnError) { alert("jQXB.ajaxCall ERROR: url:" + e + " method: " + c) } b(f) } } }); return jQXB }; jQXB.getJSON = function (d, a, c, b) { jQuery.ajax({ type: "get", traditional: true, url: d, async: false, data: a, dataType: "json", contentType: "application/json; " + jQXB.charset, success: function (e) { if (c != undefined) { c(e) } }, error: function (e) { if (b != undefined) { if (jQXB.alertOnError) { alert("jQXB.getJSON ERROR:") } b(e) } } }); return jQXB }; jQXB.deleteTemplateRow = function (f, d) { var a, e, b, c; a = jQuery("[" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "=" + f + "]").first().attr(jQXB.JQXB_DATASOURCE_ATTR); jQuery("[" + jQXB.JQXB_TEMPLATEOWNER_ATTR + "=" + f + "][" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "=" + d + "]").remove(); e = jQuery("[" + jQXB.JQXB_TEMPLATE_ATTR + "=" + f + "][" + jQXB.JQXB_TEMPLATEITEMPREFIX_ATTR + "]").first().attr(jQXB.JQXB_TEMPLATEITEMPREFIX_ATTR); b = 0; jQuery("[" + jQXB.JQXB_TEMPLATEOWNER_ATTR + "=" + f + "][" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "]").each(function () { jQuery(this).attr("id", e + "_" + b).attr(jQXB.JQXB_TEMPLATEITEMIDX_ATTR, b); jQXB.bindElementsTemplates(a, jQuery(this).attr(jQXB.JQXB_TEMPLATEOWNER_ATTR), b, jQuery(this)); b++ }); return jQXB }; jQXB.clearTemplateInstances = function (a) { jQuery("[" + jQXB.JQXB_TEMPLATEOWNER_ATTR + "=" + a + "]").unbind().remove(); return jQXB }; jQXB.doBind = function (b, a) { var c = new Array(); if (b != undefined) { c.push(b) } else { for (var g in jQXB.datasourcesCollection) { c.push(g) } } try { for (var f = 0; f < c.length; f++) { jQXB.bindList(c[f], a); jQXB.bindSingleDataMember(c[f], a); jQXB.bindTemplate(c[f], a) } } catch (d) { d.arguments = arguments; alert(jQXB.diags.dumpobj(d, "ERROR", "->")) } return jQXB }; jQXB.bindList = function (b, a) { jQuery("[" + jQXB.JQXB_LISTSOURCE + "=" + b + "][" + jQXB.JQXB_LISTVALUE + "][" + jQXB.JQXB_LISTTEXT + "]").each(function () { jQXB.utils.filllist(jQuery(this), jQXB.getDataSource(b), jQuery(this).attr(jQXB.JQXB_LISTVALUE), jQuery(this).attr(jQXB.JQXB_LISTTEXT)) }) }; jQXB.bindSingleDataMember = function (b, a) { for (var c = 0; c < jQXB.onBeforeDataSourceBindCallBacks.length; c++) { jQXB.onBeforeDataSourceBindCallBacks[c](b, jQXB.getDataSource(b)) } jQuery("[" + jQXB.JQXB_DATASOURCE_ATTR + "=" + b + "][" + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + "]", a).each(function () { jQXB.bindElement(b, null, jQuery(this).attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), jQuery(this)) }); for (var c = 0; c < jQXB.onAfterDataSourceBindCallBacks.length; c++) { jQXB.onAfterDataSourceBindCallBacks[c](b, jQXB.getDataSource(b)) } return jQXB }; jQXB.bindElement = function (b, e, a, d) { var c = jQXB.getDataSource(b); jQXB.getmemberValue(c, e, a, d); return jQXB }; jQXB.bindTemplate = function (b, a) { jQuery("[" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "][" + jQXB.JQXB_DATASOURCE_ATTR + "=" + b + "]").each(function () { var f, e, c; f = jQXB.getDataSource(b); e = jQuery(this); c = e.attr(jQXB.JQXB_TEMPLATECONTAINER_ATTR); for (var d = 0; d < jQXB.onBeforeTemplateBindCallBacks.length; d++) { jQXB.onBeforeTemplateBindCallBacks[d](b, jQXB.getDataSource(b), c) } for (var d = 0; d < f.length; d++) { jQrySingleItem = jQuery(this).find("[" + jQXB.JQXB_TEMPLATEOWNER_ATTR + "][" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "=" + d + "]"); if (jQrySingleItem.length != 0) { jQuery(this).find("[" + jQXB.JQXB_TEMPLATEOWNER_ATTR + "][" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "=" + d + "]").each(function () { jQXB.bindElementsTemplates(b, c, d, jQuery(this)) }) } else { jQrySingleItem = e.find("[" + jQXB.JQXB_TEMPLATE_ATTR + "=" + c + "]").clone(); id = jQrySingleItem.attr(jQXB.JQXB_TEMPLATEITEMPREFIX_ATTR); id += "_" + d; jQrySingleItem.attr("id", id).removeAttr(jQXB.JQXB_TEMPLATEITEMPREFIX_ATTR).removeAttr(jQXB.JQXB_TEMPLATE_ATTR).attr(jQXB.JQXB_TEMPLATEITEMIDX_ATTR, d).attr(jQXB.JQXB_TEMPLATEOWNER_ATTR, c).show().appendTo(e); jQXB.bindElementsTemplates(b, c, d, jQrySingleItem) } } }); return jQXB }; jQXB.bindElementsTemplates = function (a, e, d, c) { c.find("[" + jQXB.JQXB_TEMPLATEITEMDATAMEMBER_ATTR + "]").each(function () { var g = jQuery(this).attr(jQXB.JQXB_TEMPLATEITEMDATAMEMBER_ATTR); try { var h = jQuery(this).attr(jQXB.JQXB_TEMPLATEITEM_DYNAMIC_ID_ATTR); if (jQuery(this).attr("id") == undefined && h != undefined) { jQuery(this).removeAttr("id"); jQuery(this).removeAttr(jQXB.JQXB_TEMPLATEITEM_DYNAMIC_ID_ATTR).attr("id", h + d) } } catch (f) { } jQXB.bindElement(a, d, g, jQuery(this)) }); for (var b = 0; b < jQXB.onTemplateItemBindedCallbacks.length; b++) { jQXB.onTemplateItemBindedCallbacks[b](a, e, d, jQXB.getDataSource(a)[d], c) } return jQXB }; jQXB.setmemberVarvalue = function (e, l, g, m, h) { var k, j, d; k = g.split("."); d = jQXB.getDataSource(e); if (d === undefined && jQXB.alertOnError) { alert("jQXB.setmemberVarvalue ERROR: no datasource '" + e + "' found. called from " + jQXB.setmemberVarvalue.caller.toString()) } j = jQXB.getMemberByReflection(d, l, k); if (typeof (j) == "function") { return } var a = jQXB.onBeforeUpdateCallBacks.length; for (var f = 0; f < a; f++) { var c = jQXB.onBeforeUpdateCallBacks[f](e, l, j, g, m); if (c == true) { jQXB.getmemberValue(d, l, g, h); return } } jQXB.setMemberValByReflection(d, l, k, m); if (jQXB.getDataSourceContainer(e).autorefresh) { jQXB.refreshControls(e, l, g) } var b = jQXB.onAfterUpdateCallBacks.length; for (var f = 0; f < b; f++) { var c = jQXB.onAfterUpdateCallBacks[f](e, l, jQXB.getMemberByReflection(d, l, k), g, m) } return jQXB }; jQXB.setMemberValByReflection = function (e, c, d, f) { var b; b = (c != null) ? e[c] : e; for (var a = 0; a < d.length - 1; a++) { b = b[d[a]] } b[d[d.length - 1]] = f }; jQXB.getMemberByReflection = function (e, c, d) { var b; b = (c != null) ? e[c] : e; for (var a = 0; a < d.length - 1; a++) { b = b[d[a]] } return b[d[d.length - 1]] }; jQXB.getmemberValue = function (b, f, c, d) { var e; e = jQXB.getMemberByReflection(b, f, c.split(".")); var a = d.attr(jQXB.JQXB_BINDEDATTRIBUTE_ATTR); if (typeof (e) == "function") { e = e(b[f] || b) } var g = d.attr(jQXB.JQXB_VALUETRANSFORMATION); if (g != undefined) { e = jQXB.utils.callFunctionByName(g, window, e) } if (a == undefined) { d.val(e) } else { switch (a) { case "html": d.html(e); break; case "text": d.text(e); break; default: if (jQXB.compatibilitymode) { d.attr(a, e) } else { d.prop(a, e) } break } } e = null; return jQXB }; jQXB.getValueFromAttrib = function (b) { var a = b.attr(jQXB.JQXB_BINDEDATTRIBUTE_ATTR); if (a != undefined) { if (jQXB.compatibilitymode) { elementValue = b.attr(a) } else { elementValue = b.prop(a) } } else { elementValue = b.val() } var c = b.attr(jQXB.JQXB_VALUETRANSFORMATION); if (c != undefined) { elementValue = jQXB.utils.callFunctionByName(c, window, elementValue) } return elementValue }; jQXB.utils = {}; jQXB.utils.filllist = function (d, b, f, e) { if (!jQXB.utils.isEnumerable(b)) { alert("jQXB.utils.filllist: dataItems is not an enumerable type"); return } var a = d.val(); d.find("option").remove(); for (var c = 0; c < b.length; c++) { d.append(jQuery("<option></option>").attr("value", jQXB.getMemberByReflection(b, c, f.split("."))).text(jQXB.getMemberByReflection(b, c, e.split(".")))) } d.val(a) }; jQXB.utils.isEnumerable = function (a) { return a.length != undefined }; jQXB.utils.normalizeMemberPath = function (a) { return a.replace("[").replace("]") }; jQXB.utils.makeObservable = function (c) { var b = {}; for (var a in c) { b.__defineGetter__(a.toString(), function () { return a }); b._defineSetter__(a.toString(), function (d) { a = d }) } }; jQXB.utils.callFunctionByName = function (c, b) { var a = Array.prototype.slice.call(arguments, 2); var f = c.split("."); var d = f.pop(); for (var e = 0; e < f.length; e++) { b = b[f[e]] } return b[d].apply(b, a) }; jQXB.diags = { MAX_DUMP_DEPTH: 10 }; jQXB.diags.dumpobj = function (h, g, c, f) { depth = f || 0; if (depth > jQXB.diags.MAX_DUMP_DEPTH) { return c + g + ": <Maximum Depth Reached>\n" } if (typeof h == "object") { var a = null; var j = c + g + "\n"; c += "\t"; for (var d in h) { try { a = h[d] } catch (b) { a = "<Unable to Evaluate>" } if (typeof a == "object") { j += jQXB.diags.dumpobj(a, d, c, depth + 1) } else { j += c + d + ": " + a + "\n" } } return j } else { return h } }; jQXB.diags.output = function (a) { alert(a) }; jQXBM = { messageSubscribers: new Array(), checkNoSubscriber: false }; jQXBM.subscribeMessage = function (b, a) { b = b || "any"; if (typeof (a) != "function") { alert("jQXBM.subscribeMessage: messagehandler for topic [" + b + "] is not a function"); return } jQXBM.messageSubscribers[b] = jQXBM.messageSubscribers[b] || new Array(); for (idx = 0; idx < jQXBM.messageSubscribers[b].length; idx++) { if (jQXBM.messageSubscribers[b][idx].toString() == a.toString()) { return } } jQXBM.messageSubscribers[b].push(a) }; jQXBM.unsubscribeMessage = function (b, a) { b = b || "any"; if (typeof (a) != "function") { alert("jQXBM.unsubscribeMessage: messagehandler for topic [" + b + "] is not a function"); return } for (idx = 0; idx < jQXBM.messageSubscribers[b].length; idx++) { if (jQXBM.messageSubscribers[b][idx].toString() == a.toString()) { jQXBM.messageSubscribers[b].splice(idx, 1); return } } }; jQXBM.fireMessage = function (d, a, b) { var c; c = jQXBM.messageSubscribers.any; if (c != undefined) { for (i = 0; i < c.length; i++) { c[i](a, b) } } if (d == undefined) { return } c = jQXBM.messageSubscribers[d]; if (c == undefined) { return } for (i = 0; i < c.length; i++) { c[i](a, b) } };
/* JSON.js */
var JSON; if (!JSON) { JSON = {} } (function () { function f(n) { return n < 10 ? "0" + n : n } if (typeof Date.prototype.toJSON !== "function") { Date.prototype.toJSON = function (key) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) { return this.valueOf() } } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + string + '"' } function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === "object" && typeof value.toJSON === "function") { value = value.toJSON(key) } if (typeof rep === "function") { value = rep.call(holder, key, value) } switch (typeof value) { case "string": return quote(value); case "number": return isFinite(value) ? String(value) : "null"; case "boolean": case "null": return String(value); case "object": if (!value) { return "null" } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === "[object Array]") { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || "null" } v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]"; gap = mind; return v } if (rep && typeof rep === "object") { length = rep.length; for (i = 0; i < length; i += 1) { if (typeof rep[i] === "string") { k = rep[i]; v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v) } } } } else { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v) } } } } v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}"; gap = mind; return v } } if (typeof JSON.stringify !== "function") { JSON.stringify = function (value, replacer, space) { var i; gap = ""; indent = ""; if (typeof space === "number") { for (i = 0; i < space; i += 1) { indent += " " } } else { if (typeof space === "string") { indent = space } } rep = replacer; if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) { throw new Error("JSON.stringify") } return str("", { "": value }) } } if (typeof JSON.parse !== "function") { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === "object") { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v } else { delete value[k] } } } } return reviver.call(holder, key, value) } text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) { j = eval("(" + text + ")"); return typeof reviver === "function" ? walk({ "": j }, "") : j } throw new SyntaxError("JSON.parse") } } } ());
/* OBPaging.js */
var TaskPrefillValues = {};
var candidateId = 0, taskId = 0, countryId = 0, sessionId = 0;
var datastring;
var RedirectPage = "Accessblock.aspx";
var PDFFlag;

//Variable which holds list of parameters passed in query string in array object
var qs = (function (a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

/* Function to convert string to XML - Cross browser compatibility checked */
/* Issue #1 - Worked for bug in ie9: While creating XML from string, an unspecified error occured through window.DOMParser */
var OBParseXML = function (data) {
    var xml;
    try {
        if ($.browser.msie) {
            xml = new ActiveXObject("Microsoft.XMLDOM");
            xml.async = "false";
            xml.loadXML(data);
        }
        else {
            xml = $.parseXML(data);
        }
    }
    catch (e) {
        xml = undefined;
    }
    if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
        jQuery.error("Invalid XML: " + data);
    }
    return xml;
};

//Initializing globally processing variables
candidateId = parseInt(qs["cand"]);
taskId = parseInt(qs["task"]);
countryId = parseInt(qs["cntry"]);
sessionId = parseInt(qs["ss"]);
openMode = 0;
if (parseInt(qs["opmde"]) != null) {
    openMode = parseInt(qs["opmde"]);
}

function RedirectOnSessionInvalid() {
    window.location.href = "../../../../" + RedirectPage + "?BlockId=10"; // Session invalid
    return;
};

function RedirectOnSessionExpire() {
    window.location.href = "../../../../" + RedirectPage + "?SSId=" + sessionId.toString() + "&BlockId=7"; // Session expired
    return;
};

function RedirectOnUnAuthorizedAccess() {
    window.location.href = "../../../../" + RedirectPage + "?SSId=" + sessionId.toString() + "&BlockId=6"; // Unauthorized access
    return;
};

function RedirectOnAccessDenied() {
    window.location.href = "../../../../" + RedirectPage + "?SSId=" + sessionId.toString() + "&BlockId=0"; // Unauthorized access
    return;
};

function RedirectOnError(message) {
    window.location.href = "../../../../" + RedirectPage + "?SSId=" + sessionId.toString() + "&Message=" + message.toString(); // Unauthorized access
    return;
};

function RedirectOnOfferAccept(status, skipSurvey) {
    if (status == 1) {
        if (isNaN(skipSurvey) || skipSurvey == null || skipSurvey == undefined)
            skipSurvey = 0;
        window.location.href = "../../NHDashBoard.aspx?skpsrvy=" + skipSurvey; //On Accept Redirect
        return;
    }
    else if (status == 0) {
        parent.close();
        return true;
    }
    else {
        window.location.href = "../../../../" + RedirectPage + "?SSId=" + sessionId.toString() + "&BlockId=48"; // Block on Reject
        return;
    }
};

function DateFmt() {
    this.dateMarkers = {
        //      d: ['getDate', function (v) { return ("0" + v).substr(-2, 2) } ],--Previous code
        d: ['getDate', function (v) { return (v) } ], //New code
        m: ['getMonth', function (v) { return ("0" + (v + 1)).substr(-2, 2) } ],
        n: ['getMonth', function (v) {
            var mthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return mthNames[v];
        } ],
        w: ['getDay', function (v) {
            var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return dayNames[v];
        } ],
        y: ['getFullYear'],
        H: ['getHours', function (v) { return (v) } ],
        //  M: ['getMinutes', function (v) { return ("0" + v).substr(-2, 2) } ],--previous code
        M: ['getMinutes', function (v) { if (v > 10) { return (v) } else { return ("0" + v) } } ], // New code
        S: ['getSeconds', function (v) { return ("0" + v).substr(-2, 2) } ],
        i: ['toISOString', null]
    };

    this.format = function (date, fmt) { var dateMarkers = this.dateMarkers; var dateTxt = fmt.replace(/%(.)/g, function (m, p) { var rv = date[(dateMarkers[p])[0]](); if (dateMarkers[p][1] != null) { rv = dateMarkers[p][1](rv) } return rv; }); return dateTxt; }
}



//Initializing OBpagination
$().ready(function () {
    var checkValidPage = true;
    var FormDetails = {};

    //Checking here for whether the session id is available
    if (sessionId == null || sessionId == 0 || sessionId == "" || sessionId == NaN) {
        RedirectOnSessionInvalid();
        return false;
    }
    else //If session id is available
    {
        var isSessionActive = true; //ActiveSession(sessionId);
        //Checking here for active session
        if (!isSessionActive) {
            RedirectOnSessionExpire();
            return;
        }
        else //If session is active
        {
            //Whether the page is valid for this candidat2
            if (checkValidPage) {
                jQXB.initialize();
                jQXB.compatibilitymode = false;

                if (OBPager.InitializeTaskSettings(candidateId, taskId, countryId, sessionId) == true) {
                    if (OBPager.GetTaskData() == true) {
                        OBPager.InitializePageSettings(OBPager.taskDesignXml);
                        OBPager.SetPageContainer('#PageContent');
                        OBPager.InitializePage();

                        //Making Json ready to serve for js page
                        TaskPrefillValues = JSON.parse(OBPager.strTaskPrefillValues);
                        FormDetails = JSON.parse(OBPager.strFormDetails);
                        jQXB.setDataSource(OBPager.taskContentDSName, FormDetails, true).doBind(OBPager.taskContentDSName);
                        // Disable if the associate id is generated OR disable if open from dashboard

                        if (OBPager.taskStatusFlag == 2 || OBPager.IsTaskLocked == 1 || openMode == 1) {
                            $('input').attr('disabled', " true");
                            $('select').attr("disabled", "true");
                            $('textarea').attr("disabled", "true");
                        }
                        // 312539 ER process confirmation button enable to HRSS only for NA
                        if (countryId == 1 || countryId == 2) {
                            if (taskId == 235 || taskId == 18 || taskId == 28 || taskId == 746) {
                                if (OBPager.taskSubmittedFlag == 1 && openMode == 1) {
                                    $('#btnConfirmTask').show();
                                    $('input').attr('disabled', false);
                                    $('select').attr("disabled", false);
                                    $('textarea').attr("disabled", false);
                                    //$('input[name="NJ"]').attr('disabled',true)
                                    //$('#Teaneck_radio').attr("disabled", "disabled");
                                    //$('#Phoenix_radio').attr("disable", "disabled");

                                }
                            }
                            if (taskId == 744) {
                                if (OBPager.taskSubmittedFlag == 0 || OBPager.taskSubmittedFlag == 1 && openMode == 1) {
                                    $('input').attr('disabled', false);
                                    $('select').attr("disabled", false);
                                    $('textarea').attr("disabled", false);
                                }
                            }
                            if (taskId == 720 || taskId == 721) {
                                if (openMode == 1) {
                                    //                                    $('#btnConfirmTask').show();
                                    $('input').attr('disabled', false);

                                    $('select').attr("disabled", false);
                                    $('textarea').attr("disabled", false);
                                }

                                else { }
                            }

                        }
                        if (OBPager.taskSubmittedFlag == 1 && (OBPager.isPDFEnable == 1 || OBPager.isPDFEnable.toString() == 'NaN')) {
                            $('#previewForm').show();
                            $('#printerForm').show();
                            $('#pdfForm').show();
                        }

                        else {
                            $('#previewForm').hide();
                            $('#printerForm').hide();
                            $('#pdfForm').hide();
                        }
                    }
                    else {
                        RedirectOnError("Could not access");
                        return false;
                    }
                }
                else {
                    RedirectOnUnAuthorizedAccess();
                    return false;
                }
            }
            else {
                RedirectOnAccessDenied();
                return false;
            }
        }
    }
});

var ActiveSession = function (sessionId) {
    var isActive = false;
    if (sessionId > 0) {
        try {
            $.ajax({
                type: 'post',
                url: "../../../../FormsService.aspx/IsServiceActive",
                data: "{'sessionId':" + sessionId + "}",
                dataType: "json",
                async: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    isActive = msg.d;
                },
                error: function (xhr, status, textRemarks) {
                    isActive = false;
                    //LogError(sessionId, xhr.status.toString(), textRemarks.toString());
                }
            });
        }
        catch (e) {
            isActive = false;
        }
    }
    else {
        isActive = false;
    }
    return isActive;
};

var LogError = function (sessionId, errorId, errorMessage, errParams) {
    if (sessionId == 'undefined')
        sessionId = 0;
    if (errorMessage != "") {
        //var data = "{'sessionId':" + sessionId + ",'errId':'" + errorId + "','errMsg':'" + errorMessage + "'}";
        var data = "{";
        data += "'sessionId':" + sessionId.toString() + ",";
        data += "'errId':" + errorId.toString() + ",";
        data += "'errMsg':'" + errorMessage.toString() + "'";
        data += "}";
        try {
            $.ajax({
                type: 'post',
                url: "../../../../FormsService.aspx/LogError",
                data: data,
                dataType: "json",
                async: true,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) { },
                error: function (xhr, status, textRemarks) {
                    alert(status + ' : ' + textRemarks);
                }
            });
        }
        catch (e) { }
    }
};

var OBPager = {
    /* Global declarations related to page design */
    totalNoOfPages: 0,
    formTitle: '',
    formHtmlSource: '',
    pageSettingsXML: '',
    pageContainer: '',
    pgDOM: {},
    signatureDOM: {},
    currentPage: 0,
    errorDOM: {},

    /* Global declarations for page data */
    taskDesignXml: '',
    strFormDetails: '',
    strTaskPrefillValues: '',
    strSignaturedetails: '',
    taskStatusFlag: '', /* -1 - Not yet saved; 0- Saved; 1- Submitted; 2- Locked */
    taskSubmittedFlag: '',
    pgCountRequiredSign: 0,
    strResetSignatureDetails: '',
    isPDFEnable: '',
    paginationOrder: '',
    authenticationKey: '',
    AuthenticationKeyFlag: '',
    IsResetRequired: 0,
    IsSaveRequired: 0,
    IsSubmitRequired: 0,

    candidateId: 0, //Candidate id of currently logged in user
    candidateName: '', //Name of the candidate
    taskContentDSName: '', // Actual data source name of the data which needs to be saved as task content
    taskId: 0, // Current unique task id
    taskErrorFlag: 0, // Global error flag which must be checked before saving the task content to DB  {0: no error, 1: error}
    countryId: 0, // country id of candidate's work location
    sessionId: 0,
    taskContentRootElementName: '', // Root element of xml tag 
    ValidationStatus: '',
    ValidationMessage: '',
    ValidationSet: '',
    taskTitle: '',
    resetFlag: 0,
    displayPageCount: 1,
    coverageAmount: '',
    coveragetype: 3,
    IsTaskLocked: '',
    SignEffectiveDate: '',
    IsBgvInitiated: '',


    /* Initializing images */
    GLOBAL_IMAGES_PATH: '',

    /* Page navigation images */
    IMAGE_LEFT_SCROLL: '',
    IMAGE_RIGHT_SCROLL: '',
    IMAGE_SHADOW: '',

    /* Initializing images for pending, completion, not signed, signed and error */
    IMAGE_YET_TO_START: '',
    IMAGE_STARTED: '',
    IMAGE_YET_TO_SIGN: '',
    IMAGE_SIGNATURE_REQUIRED: '',
    IMAGE_ERROR_IN_PAGE: '',
    IMAGE_COMPLETED: '',
    IMAGE_ACTIVE_PAGE: '',
    IMAGE_INACTIVE_PAGE: '',

    /* Control images */
    IMAGE_PREVIEW: '',
    IMAGE_PRINT: '',
    IMAGE_PDF: '',

    IMAGE_PAGE_SIGNED: '',
    PDFFlag: 0,

    InitializeImages: function () {
        GLOBAL_IMAGES_PATH = '../../../../Images/';

        IMAGE_LEFT_SCROLL = 'formleftscroll.png';
        IMAGE_RIGHT_SCROLL = 'formrightscroll.png';
        IMAGE_SHADOW = 'shadow.png';
        IMAGE_CLOSE = 'error.png';

        IMAGE_YET_TO_START = 'formgreyball.png';
        IMAGE_STARTED = '';
        IMAGE_YET_TO_SIGN = 'formredball.png';
        IMAGE_SIGNATURE_REQUIRED = 'formpen.png';
        IMAGE_ERROR_IN_PAGE = 'formredball.png';
        IMAGE_COMPLETED = '';
        IMAGE_ACTIVE_PAGE = 'formblueball.png';
        IMAGE_INACTIVE_PAGE = 'formgreyball.png';

        IMAGE_PREVIEW = 'formpreview.png';
        IMAGE_PRINT = 'formprinter.png';
        IMAGE_PDF = 'formpdf.png';

        IMAGE_PAGE_SIGNED = 'tick-icon.png';
    },

    InitializePageSettings: function (settingsXML) {
        OBPager.pageSettingsXML = settingsXML;
        OBPager.InitializeImages();
    },

    InitializeTaskSettings: function (candidateId, taskId, countryId, sessionId) {
        if (candidateId != "" && taskId != null && taskId != 0 && countryId != null && countryId != 0 && sessionId != null && sessionId != 0) {
            OBPager.candidateId = candidateId;
            OBPager.taskContentDSName = 'FormDetails';
            OBPager.taskId = taskId;
            OBPager.taskErrorFlag = 0;
            OBPager.countryId = countryId;
            OBPager.sessionId = sessionId;
            return true;
        }
        else {
            alert('Could not initialize task settings');
            return false;
        }
    },

    InitializeSignatureSettings: function (signatureXML) {
        if (signatureXML != null)
            OBPager.signatureDOM = OBParseXML(signatureXML); /* creating xml DOM object for signature XML */
    },

    SetPageContainer: function (container) {
        OBPager.pageContainer = $(container);
    },

    InitializePage: function () {
        OBPager.pgDOM = OBParseXML(OBPager.pageSettingsXML); /* creating xml DOM object */
        if (JSON.parse(OBPager.strTaskPrefillValues).PrefillValues.Set1.IsMigratedCandidate == 3) {
            OBPager.formTitle = $(OBPager.pgDOM).find('FormTitleForACE').text(); /* Getting form name  for ismigrated*/
        }
        else {
            OBPager.formTitle = $(OBPager.pgDOM).find('FormTitle').text(); /* Getting form name */
        }
        OBPager.totalNoOfPages = parseInt($(OBPager.pgDOM).find('TotalNoOfPages').text()); /* Initializing total no of pages */
        OBPager.formHtmlSource = $(OBPager.pgDOM).find('PageHtmlSource').text();    /* Getting HTML page source */
        OBPager.isPDFEnable = parseInt($(OBPager.pgDOM).find('IsPDFEnable').text()); /* Getting pdf flag to enable or disable PDF icons*/
        OBPager.paginationOrder = parseInt($(OBPager.pgDOM).find('PaginationOrder').text());
        OBPager.AuthenticationKeyFlag = parseInt($(OBPager.pgDOM).find('authenticationKey').text());


        if (OBPager.totalNoOfPages > 0)
            OBPager.currentPage = 1;

        var pageDetails = ''; /* Preparing contents of page details */

        /* Header and pagination part */
        pageDetails += '<div class="headerF"></div>';  /* adding header image */
        pageDetails += '<div class="navF">';
        pageDetails += '<p>' + OBPager.formTitle + '</p>';

        if (OBPager.totalNoOfPages > 1) {
            pageDetails += '<img src="' + GLOBAL_IMAGES_PATH + IMAGE_LEFT_SCROLL + '" id="leftscrollForm" alt="LeftScroll" title="Previous" onclick="OBPager.MovePrevious(); return false;" />'; // adding < arrow for previous button
            pageDetails += '<ul>';
        }

        var pageId = "";
        var requireSignature = 0;

        $(OBPager.pgDOM).find("Page").each(function () {
            pageId = $(this).find('Id').text();
            requireSignature = parseInt($(this).find('RequireSignature').text());
            signatureNote = $(this).find('SignatureNote').text();
            signaturePageText = $(this).find('SignaturePageText').text();

            if (requireSignature == 1) {
                OBPager.pgCountRequiredSign += 1;

                if (OBPager.totalNoOfPages > 1) {
                    pageDetails += '<li id="page_' + pageId + '" class="SignPage" onclick="OBPager.ShowPage(' + pageId + '); return false;"><a href="#" title="Page ' + pageId + '">';
                    pageDetails += '<img src="' + GLOBAL_IMAGES_PATH + IMAGE_SIGNATURE_REQUIRED + '" class="signatureForm" alt="Signature" title="Signature Required"/><img class="StatusImage" src="' + GLOBAL_IMAGES_PATH + IMAGE_INACTIVE_PAGE + '" alt="Page ' + pageId + '" id="StatusImage_' + pageId + '"/><p class="StatusPageNumber" id="StatusPageNumber_' + pageId + '">' + pageId + '</p>';
                }
                if (OBPager.signatureDOM != null) {
                    $(OBPager.signatureDOM).find('PageSignatureContainer').find('SignatureData').find('PageSignature').each(function () {
                        signaturePageId = 0;
                        signaturePageId = $(this).find('SignaturePageId').text();

                        if (signaturePageId == pageId) {

                            signatureStatus = $(this).find('SignatureStatus').text();
                            signerName = $(this).find('SignerName').text();
                            signatureTS = OBPager.getTSToUTCDate($(this).find('SignatureTS').text());

                            if (signatureTS == NaN)
                                signatureTS = "";

                            var signDetailHtml = '';

                            signDetailHtml += '<div class="authenticationCheck" id="KeyContainer_' + signaturePageId + '">';
                            if (signatureStatus == 1) {
                                signDetailHtml += OBPager.GetSignBarHtml(1, signerName, signatureTS, signaturePageId, signatureNote, signaturePageText); // '<span class="pageHighlight"><img src="' + GLOBAL_IMAGES_PATH + IMAGE_PAGE_SIGNED + '" style="height:15px; width:18px; float:left;" title="Signed" alt="tick" />&nbsp;This page has been signed by ' + signerName + ' on ' + signatureTS.toLocaleString() + '</span>';
                            }
                            else {
                                signDetailHtml += OBPager.GetSignBarHtml(0, null, null, signaturePageId, signatureNote, signaturePageText);
                            }
                            signDetailHtml += '</div>';
                            $("#Sign_PageId_" + signaturePageId).append(signDetailHtml);
                        }
                    });
                }
                else {
                    alert('Error: Signature info not available');
                }
            }
            else {
                if (OBPager.totalNoOfPages > 1) {
                    pageDetails += '<li id="page_' + pageId + '" class="pageNormal" onclick="OBPager.ShowPage(' + pageId + '); return false;"><a href="#" title="Page ' + pageId + '">';
                    pageDetails += '<img class="StatusImage" src="' + GLOBAL_IMAGES_PATH + IMAGE_INACTIVE_PAGE + '" alt="Page ' + pageId + '" id="StatusImage_' + pageId + '"/><p class="StatusPageNumber" id="StatusPageNumber_' + pageId + '">' + pageId + '</p>';
                }
            }
            if (OBPager.totalNoOfPages > 1) {
                pageDetails += '</a></li>';
            }
        });
        if (OBPager.totalNoOfPages > 1) {
            pageDetails += '</ul>';
            pageDetails += '<img src="' + GLOBAL_IMAGES_PATH + IMAGE_RIGHT_SCROLL + '" id="rightscrollForm" alt="RightScroll" title="Next" onclick="OBPager.MoveNext(); return false;"/>';  // adding > arrow for next button
        }

        pageDetails += '<img src="' + GLOBAL_IMAGES_PATH + IMAGE_PREVIEW + '" id="previewForm" onclick="PDFPop(0);" alt="Preview" title="Preview"/>';
        pageDetails += '<img src="' + GLOBAL_IMAGES_PATH + IMAGE_PRINT + '" id="printerForm" alt="Print" onclick="PrintPDF();" title="Print"/>';
        pageDetails += '<img src="' + GLOBAL_IMAGES_PATH + IMAGE_PDF + '" id="pdfForm"  alt="PDF" onclick="PDFPop(1);"  title="PDF"/>';

        pageDetails += '<img src="' + GLOBAL_IMAGES_PATH + IMAGE_SHADOW + '" alt="divider" style="height:6px; width:98%; float:left;"/>';
        pageDetails += '</div>';

        /* adding header content with pagination controls */
        $('#headerContent').append(pageDetails);

        /* Preparing footer content */
        pageDetails = "";
        /*Inclusion of Text in NA Forms-312020_20140604*/
        if ((JSON.parse(OBPager.strTaskPrefillValues).PrefillValues.Set1.CanShowEditMsg != 0) && (countryId == 1 || countryId == 2) && openMode != 1) {
            pageDetails = '<br><marquee class="edit_msg" behaviour=alternate scrolldelay=150><span id="pleasetxt">IMPORTANT: </span><span>If you need to make any modifications, please edit the information in the personal data form and resubmit the form for the changes to reflect in all subsequent forms.Then, don’t forget to go back into this form and click ‘submit’ once the changes have been correctly reflected.  </span></marquee>';
        }
        pageDetails += '<div class="footerF">';

        /*added 312539 ER process: candidate submitted ER from we enable Confirm button HRSS for NA only */
        if (countryId == 1 || countryId == 2) {
            if (taskId == 235 || taskId == 18 || taskId == 28 || taskId == 746) {


                if (OBPager.taskSubmittedFlag == 1 && openMode == 1) {
                    pageDetails += '<input type="button" class="btnImg" id="btnConfirmTask" onclick="SaveTaskData(3); return;" value="Confirm" title="ConfirmERProcess"/>';
                }
                else
                    if (OBPager.taskSubmittedFlag == 0 && openMode == 1) {
                        pageDetails += '<input type="button" class="btnImg" id="btnConfirmTask" onclick="SaveTaskData(3); return;" value="Confirm" title="ConfirmERProcess"/>';
                    }

            }
            else if (taskId == 720 || taskId == 721) {
                if (OBPager.taskSubmittedFlag == 0 && openMode == 1) {
                    if (OBPager.IsResetRequired == 1)
                        pageDetails += '<input type="button" class="btnImg" id="btnResetTask" onclick="ResetTaskData(); return;" value="Reset" title="Reset"/>';

                    if (OBPager.IsSaveRequired == 1)
                        pageDetails += '<input type="button" class="btnImg" id="btnSaveTask" onclick="SaveTaskData(0); return;" value="Save" title="Save"/>';

                    //                        if (OBPager.IsSubmitRequired == 1)
                    //                            pageDetails += '<input type="button" class="btnImg" id="btnSubmitTask" onclick="SaveTaskData(1); return SaveTaskData(3);" value="Submit" title="Submit"/>';
                    //                    
                }
                //                    if (OBPager.taskStatusFlag == 1 && openMode == 1) {
                //                        if (OBPager.IsSubmitRequired == 0)
                //                            pageDetails += '<input type="button" class="btnImg" id="btnSubmitTask" onclick="SaveTaskData(3); return;" value="Submit" title="Submit"/>';
                //                    }
            }
            else if (taskId == 744) {

                if (OBPager.taskSubmittedFlag == 0 && openMode == 1) {
                    if (OBPager.IsResetRequired == 1)
                        pageDetails += '<input type="button" class="btnImg" id="btnResetTask" onclick="ResetTaskData(); return;" value="Reset" title="Reset"/>';

                    if (OBPager.IsSaveRequired == 1)
                        pageDetails += '<input type="button" class="btnImg" id="btnSaveTask" onclick="SaveTaskData(0); return;" value="Save" title="Save"/>';

                    pageDetails += '<input type="button" class="btnImg" id="btnSubmitTask" onclick="SaveTaskData(1); return;" value="Submit" title="Submit"/>';
                }
                else
                    if (OBPager.taskSubmittedFlag == 1 && openMode == 1) {
                        pageDetails += '<input type="button" class="btnImg" id="btnSubmitTask" onclick="SaveTaskData(1); return;" value="Submit" title="Submit"/>';
                    }
            }
        }

        /* Hide if the task is submitted */
        if (OBPager.taskSubmittedFlag != 1 && openMode != 1) {
            if (OBPager.IsResetRequired == 1)
                pageDetails += '<input type="button" class="btnImg" id="btnResetTask" onclick="ResetTaskData(); return;" value="Reset" title="Reset"/>';

            if (OBPager.IsSaveRequired == 1)
                pageDetails += '<input type="button" class="btnImg" id="btnSaveTask" onclick="SaveTaskData(0); return;" value="Save" title="Save"/>';
        }

        if (OBPager.taskStatusFlag != 2 && openMode != 1) {
            if (OBPager.IsSubmitRequired == 1)
                pageDetails += '<input type="button" class="btnImg" id="btnSubmitTask" onclick="SaveTaskData(1); return;" value="Submit" title="Submit"/>';
        }

        pageDetails += '</div>';
        $('#footerContent').append(pageDetails);    /*adding footer content with controls*/
        if ((JSON.parse(OBPager.strTaskPrefillValues).PrefillValues.Set1.CanShowEditMsg != 0) && (countryId == 1 || countryId == 2)) {
            $('.footerF .btnImg').css({ "margin-top": "25px" });
        }
        pageDetails = '';
        pageDetails += '<div id="divPDFLoader">';
        pageDetails += '<div id="pdfHeader">';
        pageDetails += '<div id="pdfHeaderText"></div>';
        pageDetails += '<div id="pdfHeaderClose" onclick="ClosePDFViewer();"></div>';
        pageDetails += '</div>';
        pageDetails += '<iframe id="ifPDFViewer" allowtransparency="false" frameborder="no" scrolling="auto"></iframe>';
        pageDetails += '</div>';
        $('#baseContent').append(pageDetails);

        //        $('.pagesContainer').find('.pageData').each(function (i) {
        //            var objThis = $(this);
        //            objThis.attr('id', 'pageData_'+i);
        //        });

        $('.authenticationF').hide(); /*hiding all signature blocks for first time*/
    },

    ShowPage: function (pageNum) {
        if (OBPager.paginationOrder == 1) {
            if (pageNum == 1 || (pageNum <= OBPager.displayPageCount)) {
                OBPager.pageContainer.children().css('display', 'none');
                OBPager.pageContainer.children().slice(pageNum - 1, pageNum).css('display', 'block');
                OBPager.BindPaginationstyles(pageNum);
            }
            else {
                if (OBPager.pageContainer.children().slice(pageNum - 2, pageNum - 1).is(':visible')) {
                    OBPager.pageContainer.children().css('display', 'none');
                    OBPager.pageContainer.children().slice(pageNum - 1, pageNum).css('display', 'block');
                    OBPager.BindPaginationstyles(pageNum);
                    if (pageNum > OBPager.displayPageCount) {
                        OBPager.displayPageCount = pageNum;
                    }
                }
            }
        }
        else {
            OBPager.pageContainer.children().css('display', 'none');
            OBPager.pageContainer.children().slice(pageNum - 1, pageNum).css('display', 'block');
            OBPager.BindPaginationstyles(pageNum);
        }
    },

    BindPaginationstyles: function (pageNum) {
        /* Change status image */
        $('.StatusImage').attr('src', GLOBAL_IMAGES_PATH + IMAGE_INACTIVE_PAGE);
        $('#StatusImage_' + pageNum).attr('src', GLOBAL_IMAGES_PATH + IMAGE_ACTIVE_PAGE);

        /* Changing color of page number based on status */
        $('.StatusPageNumber').css({ "color": "#4A4A4A" });
        $('#StatusPageNumber_' + pageNum).css({ "color": "#1f69ba" });
        OBPager.currentPage = pageNum;
    },

    MovePrevious: function () {
        if (OBPager.currentPage > 0)
            OBPager.currentPage = OBPager.currentPage - 1;
        else if (OBPager.currentPage <= 0)
            OBPager.currentPage = 1;

        if (OBPager.currentPage <= 0)
            if (OBPager.totalNoOfPages > 0)
                OBPager.currentPage = 1;

        OBPager.ShowPage(OBPager.currentPage);
    },

    MoveNext: function () {
        if (OBPager.currentPage < OBPager.totalNoOfPages)
            OBPager.currentPage = OBPager.currentPage + 1;
        else if (OBPager.currentPage >= OBPager.totalNoOfPages)
            OBPager.currentPage = OBPager.totalNoOfPages;

        OBPager.ShowPage(OBPager.currentPage);
    },

    /*Function which gets triggered on CheckBox click event in Signature Block */
    DoSignatureCheck: function (controlId) {

        var pageId = controlId.replace('ChkSign_PageId_', ''); //OBPager.currentPage;
        if ($("#" + controlId).is(':checked') && ($("#KeyContent_PageId_" + pageId).is(':hidden'))) {
            OBPager.ToggleSignBar(1, pageId);
        }
        else {
            OBPager.SetSignStatus(0, "");
            OBPager.ToggleSignBar(0, pageId);
        }
    },

    ToggleSignBar: function (status, pageId) {
        if (status == 1)/*show*/
        {
            $("#KeyContainer_" + pageId).animate({ marginTop: '-70' }, { duration: 150, queue: false });
            $("#KeyContent_PageId_" + pageId).animate({ marginTop: '22', height: 'toggle' }, { duration: 150, queue: false });
        }
        else if (status == 0) /*hide*/
        {
            $("#KeyContainer_" + pageId).css('top', '592px'); /*Changed from 635 to 592px - by 207953*/
            $("#KeyContainer_" + pageId).animate({ marginTop: '0' }, { duration: 300, queue: false });
            $("#KeyContent_PageId_" + pageId).css('z-index', '0');
            $("#KeyContent_PageId_" + pageId).animate({ marginTop: '0', height: 'toggle' }, { duration: 300, queue: false });
            $("#KeyContent_PageId_" + pageId).css('display', 'none');
        }
    },

    /* Function to return HTML string for the signature bar */
    GetSignBarHtml: function (status, signee, signTS, signPageId, signNote, signaturePageText) {

        var retHtml = '';
        if (status == 1) {
            var replacedSignPageText = '';

            if (signaturePageText == undefined || signaturePageText == null || signaturePageText == "") {
                $(OBPager.pgDOM).find("Page").each(function () {
                    if (signPageId == $(this).find('Id').text()) {
                        signaturePageText = $(this).find('SignaturePageText').text();
                    }
                });
            }

            replacedSignPageText = signaturePageText.replace("$$SIGNEE$$", signee);
            replacedSignPageText = replacedSignPageText.replace("$$SIGNTS$$", signTS);
            replacedSignPageText = replacedSignPageText.replace("$$DATEOFJOINING$$", OBPager.SignEffectiveDate);

            retHtml = '<span class="pageHighlight"><img src="' + GLOBAL_IMAGES_PATH + IMAGE_PAGE_SIGNED + '" style="height:15px; width:18px; float:left;" title="Signed" alt="tick" />&nbsp;' + replacedSignPageText + '</span>';
        }
        else if (status == 0) {
            retHtml += '<input type="checkbox" class="authenticationCheckBox" style="padding:5px 0 0 5px;" id="ChkSign_PageId_' + signPageId + '" onclick="OBPager.DoSignatureCheck(\'ChkSign_PageId_' + signPageId + '\');return;" /> ';
            if (signNote == 'undefined' || signNote == null || signNote == "")
                retHtml += '<span class="pageHighlight">I understand that the information cited here is to the best of my knowledge and I authorize the same.</span>';
            else
                retHtml += '<span class="pageHighlight">' + signNote + '</span>';
            retHtml += '<div class="authenticationF" id="KeyContent_PageId_' + signPageId + '">';
            retHtml += '<p class="pageSignatureNote" />';
            retHtml += '<p class="noteF">';
            retHtml += '<sup>*</sup> Please refer to the welcome mailer (sent to your email address) for the authentication key</p>';
            retHtml += '<label for="authentication_key"><p class="keyF">Authentication Key</p></label>';
            if (OBPager.AuthenticationKeyFlag == 0) {
                retHtml += '<input type="text" class="cntrlAuthenticationKey" id="InputKey_Cntrl_In_' + signPageId + '" />';
            }
            else {
                retHtml += '<input type="text" class="cntrlAuthenticationKey" Value="' + OBPager.authenticationKey + '" id="InputKey_Cntrl_In_' + signPageId + '" />';

            }
            retHtml += '<input type="button" class="cntrlAuthenticationImage" id="BtnSign_PageId_' + signPageId + '" onclick="OBPager.SignPage(\'InputKey_Cntrl_In_' + signPageId + '\'); return;" value="Sign" />';
            retHtml += '<input type="button" class="cntrlAuthenticationImage" id="BtnForgot_PageId_' + signPageId + '" onclick="OBPager.ForgotKey(\'BtnForgot_PageId_' + signPageId + '\')" value="Forgot Key" />';
            retHtml += '<p class="noteF sup" id="ForgotKeyMessage_PageId_' + signPageId + '"></p>';
            retHtml += '</div>';
        }
        return retHtml;
    },

    /************************************************/
    /*              OB Paging Util Services         */
    /************************************************/

    /* Function which gets xml in string format from DOM object */
    getXmlStringFromDOM: function (xmlDOM) {
        var xmlString = '';
        var objXMLSerializer;

        if ($.browser.msie) {
            try {
                xmlString = xmlDOM.xml;
            }
            catch (e) {
                MsgboxAlert(sessionId, 2, 0, null, 'DOM not available');
            }
        }
        else {
            try {
                xmlString = (new XMLSerializer()).serializeToString(xmlDOM);
            }
            catch (e) { alert('Error : xmlSerialiser not available'); }
        }
        return xmlString;
    },

    /* Function to convert XML Timestamp data type to Javascript date */
    getTSToUTCDate: function (xmlDate) {
        var dt = new Date();
        var dtS = xmlDate.slice(xmlDate.indexOf('T') + 1, xmlDate.indexOf('.'))
        var TimeArray = dtS.split(":");
        dt.setUTCHours(TimeArray[0], TimeArray[1], TimeArray[2]);
        dtS = xmlDate.slice(0, xmlDate.indexOf('T'))
        TimeArray = dtS.split("-");
        dt.setUTCFullYear(TimeArray[0], (TimeArray[1] - 1), TimeArray[2]);
        return (new DateFmt()).format(dt, "%n %d %y %H:%M");
    },

    RedirectOnOfferStatus: function (status, skipSurvey) {
        RedirectOnOfferAccept(status, skipSurvey);
    },
    /* Function to convert Javascript date to XML Timestamp data type */
    getUTCDateToTS: function () {
        var now = new Date();
        var zone = '', temp = -now.getTimezoneOffset() / 60 * 100;
        if (temp >= 0) zone += "+";
        zone += (Math.abs(temp) < 100 ? "00" : (Math.abs(temp) < 1000 ? "0" : "")) + temp;
        /* "2009-6-4T14:7:32+10:00" */
        return (now.getUTCFullYear() + "-" + (now.getUTCMonth() + 1) + "-" + now.getUTCDate() + "T" + now.getUTCHours() + ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds());
    },

    /************************************************/
    /*              OB Paging Data Services         */
    /************************************************/

    /* Function to bind data to DS */
    BindData: function (dataSource, dataSourceName, boolParseJSON) {
        if (boolParseJSON == true) {
            var objDataSource = JSON.parse(dataSource);
            jQXB.setDataSource(dataSourceName, objDataSource).doBind(dataSourceName);

            if (dataSourceName == 'DataXML') {
                /* Setting design XML */
                if (OBPager.taskDesignXml == '')
                    OBPager.taskDesignXml = objDataSource.TaskDesignXML;
                /* Setting task data XML */
                if (OBPager.strFormDetails == '')
                    OBPager.strFormDetails = objDataSource.TaskDataXML;
                /* Setting prefill values XML */
                if (OBPager.strTaskPrefillValues == '')
                    OBPager.strTaskPrefillValues = objDataSource.TaskPrefillValues;

                /* Setting current task status */
                if (OBPager.taskStatusFlag == '')
                    OBPager.taskStatusFlag = objDataSource.TaskStatus;

                if (OBPager.taskSubmittedFlag == '')
                    OBPager.taskSubmittedFlag = objDataSource.IsTaskSubmitted;

                if (objDataSource.LastViewPageInex != 1)
                    OBPager.displayPageCount = objDataSource.LastViewPageInex;

                if (OBPager.authenticationKey == '')
                    OBPager.authenticationKey = objDataSource.SignatureKey;

                if (OBPager.candidateName == '')
                    OBPager.candidateName = objDataSource.CandidateName;



                if (OBPager.IsTaskLocked == '')
                    OBPager.IsTaskLocked = objDataSource.IsTaskLocked;

                OBPager.IsResetRequired = objDataSource.IsResetRequired;
                OBPager.IsSaveRequired = objDataSource.IsSaveRequired;
                OBPager.IsSubmitRequired = objDataSource.IsSubmitRequired;
                OBPager.SignEffectiveDate = objDataSource.SignEffectiveDate;
                OBPager.IsBgvInitiated = objDataSource.IsBgvInitiated;

                /* Setting signature details XML */
                if (OBPager.strSignaturedetails == '') {
                    if (objDataSource.TaskSignatureXML != null && objDataSource.TaskSignatureXML != undefined)
                        OBPager.InitializeSignatureSettings(objDataSource.TaskSignatureXML);
                    OBPager.strResetSignatureDetails = objDataSource.TaskSignatureXML;
                }

                if (OBPager.taskTitle == '')
                    OBPager.taskTitle = objDataSource.TaskTitle;
            }

            if (dataSourceName == 'ValidationXML') {
                OBPager.ValidationStatus = objDataSource.ValidationStatus;
                OBPager.ValidationSet = objDataSource.ValidationMessage;
            }
        }
        else { jQXB.setDataSource(dataSourceName, dataSource).doBind(dataSourceName); }
    },

    /* Function to get the task related data from DB */
    GetTaskData: function () {
        if (OBPager.candidateId.toString() == "") {
            alert('Candidate Id not found');
            return false;
        }
        if (OBPager.taskId.toString() == "") {
            alert('Task Id not found');
            return false;
        }

        try {
            var data = "{";
            data += "'sessionId':" + OBPager.sessionId.toString() + ",";
            data += "'candidateId':" + OBPager.candidateId.toString() + ",";
            data += "'taskId':" + OBPager.taskId.toString() + ",";
            data += "'countryId':" + OBPager.countryId.toString();
            data += "}";

            $.ajax({
                type: 'post',
                url: "../../../../FormsService.aspx/GetTaskData",
                data: data,
                dataType: "json",
                async: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    OBPager.BindData(msg.d, "DataXML", true);
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error : " + xhr.status + " " + textRemarks);
                    return false;
                }
            });
            return true;
        }
        catch (e) {
            alert(e.Message);
            return false;
        }
    },

    /* Function to save /submit the task content */
    SaveTaskData: function (saveMode) {
        var retTaskStatus = 0;
        var isTaskSignedOnAllPage = false;
        try {
            if (OBPager.taskErrorFlag != 0) {
                MsgboxAlert(sessionId, 2, 0, null, 'Task saving failed due to validation');
                return false;
            }
            else {
                /* If form is getting submitted then check all validations */
                if (saveMode == 1) {
                    isTaskSignedOnAllPage = OBPager.CheckSignOnAllPage();
                    if (isTaskSignedOnAllPage == false) {
                        return false;
                    }
                }

                var taskdata = JSON.stringify(jQXB.getDataSource(OBPager.taskContentDSName)).toString();
                taskdata = taskdata.replace(/\\n/g, " ");
                taskdata = taskdata.replace(/\\/g, "\\\\");
                taskdata = taskdata.replace(/'/g, "\\\'")
                var signData = '';

                if ($(OBPager.signatureDOM) != null) {
                    signData = OBPager.getXmlStringFromDOM(OBPager.signatureDOM);
                    signData = signData.replace(/'/g, "\\\'");
                    OBPager.strResetSignatureDetails = OBPager.getXmlStringFromDOM(OBPager.signatureDOM);
                }

                var data = "{";
                data += "'sessionId':" + OBPager.sessionId.toString() + ",";
                data += "'candidateId':" + OBPager.candidateId.toString() + ",";
                data += "'taskId':" + OBPager.taskId.toString() + ",";
                data += "'taskData':'" + taskdata + "',";
                data += "'signatureData':'" + signData + "',";
                data += "'lastViewPage':" + OBPager.displayPageCount.toString() + ",";
                data += "'saveMode':'" + saveMode + "'";
                data += "}";

                $.ajax({
                    type: "post",
                    async: false,
                    url: "../../../../FormsService.aspx/SaveTaskData",
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        retTaskStatus = msg.d;
                    },
                    error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
                });
            }
        }
        catch (e) {
            MsgboxAlert(sessionId, 2, 0, null, e.Message);
        }
        if (retTaskStatus == 1) {
            OBPager.strFormDetails = taskdata;
            if (saveMode == 1) {
                $('#btnResetTask').css('visibility', 'hidden'); // Hide Reset button 
                $('#btnSaveTask').css('visibility', 'hidden'); // Hide Save button 
                if (saveMode == 1 && (OBPager.isPDFEnable == 1 || OBPager.isPDFEnable.toString() == 'NaN')) {
                    $('#previewForm').show();
                    $('#printerForm').show();
                    $('#pdfForm').show();
                }
            }
            if (saveMode == 0) {
                OBPager.taskStatusFlag = 0;
                if (countryId == 1 || countryId == 2) {
                    MsgboxAlert(sessionId, 1, 213, 'FORM_SAVE_SUCCESS_NA', 'Please remember to submit the form for the changes to get reflected in the system after saving the details <br> Form saved successfully!!!');
                }
                else {
                    MsgboxAlert(sessionId, 1, 41, 'FORM_SAVE_SUCCESS', 'Form saved successfully!!!');
                }
            }
            else if (saveMode == 1 && TaskPrefillValues.PrefillValues.Set1.CandidateGroup != 2) {
                if (OBPager.PDFFlag == 0) {
                    MsgboxAlert(sessionId, 1, 39, 'FORM_SUBMIT_SUCCESS', 'Form submitted successfully!!!');
                }

                else if (OBPager.PDFFlag == 1) {
                    alert("Form submitted successfully!!");
                }
                OBPager.taskStatusFlag = 1;
                OBPager.taskSubmittedFlag = 1;
            }
            return true;
        }
        else {
            if (saveMode == 0)
                MsgboxAlert(sessionId, 2, 42, 'FORM_SAVE_FAILED', 'Form saving failed!!!');
            else if (saveMode == 1)
                if (OBPager.PDFFlag == 0) {
                    MsgboxAlert(sessionId, 2, 40, 'FORM_SUBMIT_FAILED', 'Form submission failed!!!');
                }
                else if (OBPager.PDFFlag == 1) {
                    alert("Form submission failed!!!");
                }
            return false;
        }
    },

    /* Function to check the signature before submit */
    CheckSignOnAllPage: function () {
        var retStatus = true;
        //OBPager.InitializeSignatureSettings(OBPager.strResetSignatureDetails);
        if (OBPager.pgCountRequiredSign > 0) {
            if (OBPager.signatureDOM != null) {
                $(OBPager.pgDOM).find("Page").each(function () {
                    pageId = $(this).find('Id').text();
                    requireSignature = parseInt($(this).find('RequireSignature').text());

                    if (retStatus != false) {
                        $(OBPager.signatureDOM).find('PageSignatureContainer').find('SignatureData').find('PageSignature').each(function () {
                            PageSignature = $(this);
                            signaturePageId = 0;
                            signaturePageId = PageSignature.find('SignaturePageId').text();

                            if (signaturePageId == pageId) {
                                if (requireSignature == 1) {
                                    if (PageSignature.find('SignatureStatus').text() != "1") {
                                        retStatus = false;
                                        OBPager.ShowPage(parseInt(signaturePageId));
                                        MsgboxAlert(sessionId, 2, 0, null, 'Page # ' + signaturePageId + ' must be signed before submitting this task');
                                    }
                                }
                            }
                        });
                    }
                });
            }
        }
        return retStatus;
    },

    /* Function to update the signature status in XML DOM */
    SetSignStatus: function (signatureStatus, signee) {
        if (OBPager.signatureDOM != null) {
            $(OBPager.signatureDOM).find('PageSignatureContainer').find('SignatureData').find('PageSignature').each(function () {
                PageSignature = $(this);
                signaturePageId = 0;
                signaturePageId = PageSignature.find('SignaturePageId').text();

                if (signaturePageId == OBPager.currentPage) {
                    if (signatureStatus == 1) {
                        PageSignature.find('SignerName').text(signee);
                        PageSignature.find('SignatureStatus').text(signatureStatus);
                        var signTS = OBPager.getUTCDateToTS();
                        var signUTC = OBPager.getTSToUTCDate(signTS);
                        PageSignature.find('SignatureTS').text(signTS);
                        $("#KeyContainer_" + signaturePageId.toString()).html(OBPager.GetSignBarHtml(1, signee, signUTC, signaturePageId));
                        OBPager.ToggleSignBar(0, signaturePageId);
                    }
                    else {
                        PageSignature.find('SignerName').text("");
                        PageSignature.find('SignatureStatus').text(signatureStatus);
                        PageSignature.find('SignatureTS').text("");
                    }
                }
            });
            return true;
        }
        else {
            alert("Error: Could not update signature information");
            return false;
        }
    },

    /* Function which gets called when signing a page */
    SignPage: function (cntrolId) {
        var key = $('#' + cntrolId).val();
        var signee = OBPager.candidateName;
        try {
            if (OBPager.ValidateAuthenticationKey(signee, key) == true) {
                MsgboxAlert(sessionId, 1, 37, 'FORM_SIGN_SUCCESS', 'Form signed successfully');
                return true;
            }
            else {
                OBPager.SetSignStatus(0, signee);
                MsgboxAlert(sessionId, 2, 38, 'FORM_SIGN_FAILURE', 'Form signing failed');
                return false;
            }
        }
        catch (e) {
            MsgboxAlert(sessionId, 2, 38, 'FORM_SIGN_FAILURE', e.Message);
            return false;
        }
    },

    /* Function to validate authentication key */
    ValidateAuthenticationKey: function (signee, key) {
        var retStatus = false;
        var data = "{";
        data += "'sessionId':" + OBPager.sessionId.toString() + ",";
        data += "'candidateId':" + OBPager.candidateId.toString() + ",";
        data += "'taskId':" + OBPager.taskId.toString() + ",";
        data += "'signPageId':" + OBPager.currentPage.toString() + ",";
        data += "'authenticationKey':'" + key + "'";
        data += "}";

        $.ajax({
            type: "post",
            async: false,
            url: "../../../../FormsService.aspx/ValidateAuthenticationKey",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d == 1) {
                    OBPager.SetSignStatus(1, signee);
                    retStatus = true;
                } else { retStatus = false; }
            },
            error: function (xhr, status, textRemarks) {
                alert("Error " + xhr.status + " " + textRemarks);
                retStatus = false;
            }
        });
        return retStatus;
    },

    /* Function to reset content of task as in OnLoad/ Last saved stage */
    ResetTaskContent: function () {
        FormDetails = JSON.parse(OBPager.strFormDetails);
        jQXB.setDataSource(OBPager.taskContentDSName, FormDetails, true).doBind(OBPager.taskContentDSName);
        OBPager.InitializeSignatureSettings(OBPager.strResetSignatureDetails);
        var pageId = "";
        var requireSignature = 0;
        OBPager.resetFlag = 1;
        validate.ValidateSubmit();

        $(OBPager.pgDOM).find("Page").each(function () {
            pageId = $(this).find('Id').text();
            requireSignature = parseInt($(this).find('RequireSignature').text());
            signatureNote = $(this).find('SignatureNote').text();
            signaturePageText = $(this).find('SignaturePageText').text();

            if (requireSignature == 1) {
                OBPager.pgCountRequiredSign += 1;
                if (OBPager.signatureDOM != null) {
                    $(OBPager.signatureDOM).find('PageSignatureContainer').find('SignatureData').find('PageSignature').each(function () {
                        signaturePageId = 0;
                        signaturePageId = $(this).find('SignaturePageId').text();
                        if (signaturePageId <= pageId) {
                            if (signaturePageId == pageId) {
                                signatureStatus = $(this).find('SignatureStatus').text();
                                signerName = $(this).find('SignerName').text();
                                signatureTS = OBPager.getTSToUTCDate($(this).find('SignatureTS').text());
                                if (signatureTS == NaN)
                                    signatureTS = "";

                                var signDetailHtml = '';
                                $("#Sign_PageId_" + signaturePageId).html('');
                                signDetailHtml += '<div class="authenticationCheck" id="KeyContainer_' + signaturePageId + '">';
                                if (signatureStatus == 1) {
                                    signDetailHtml += OBPager.GetSignBarHtml(1, signerName, signatureTS, signaturePageId, signatureNote, signaturePageText); // '<span class="pageHighlight"><img src="' + GLOBAL_IMAGES_PATH + IMAGE_PAGE_SIGNED + '" style="height:15px; width:18px; float:left;" title="Signed" alt="tick" />&nbsp;This page has been signed by ' + signerName + ' on ' + signatureTS.toLocaleString() + '</span>';
                                }
                                else {
                                    signDetailHtml += OBPager.GetSignBarHtml(0, null, null, signaturePageId, signatureNote, signaturePageText);
                                }
                                signDetailHtml += '</div>';
                                $("#Sign_PageId_" + signaturePageId).append(signDetailHtml);

                                if (signatureStatus == 0)
                                    OBPager.ToggleSignBar(signatureStatus, signaturePageId);
                            }
                        }
                    });
                }
                else {
                    alert('Error: Signature info not available');
                }
            }
        });
    },

    /* Function to validate the task content */
    ValidateTaskData: function (actionmode) {
        var taskdata = JSON.stringify(jQXB.getDataSource(OBPager.taskContentDSName)).toString();
        taskdata = taskdata.replace(/\\n/g, " ");
        taskdata = taskdata.replace(/\\/g, "\\\\");
        taskdata = taskdata.replace(/'/g, "\\\'\\\'");
        OBPager.ValidationMessage = '';
        var data = "{";
        data += "'sessionId':" + OBPager.sessionId.toString() + ",";
        data += "'candidateId':" + OBPager.candidateId.toString() + ",";
        data += "'taskId':" + OBPager.taskId.toString() + ",";
        data += "'taskData':'" + taskdata + "',";
        data += "'saveMode':'" + actionmode + "'";
        data += "}";

        $.ajax({
            type: "post",
            async: false,
            url: "../../../../FormsService.aspx/ValidateTaskContent",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                OBPager.BindData(msg.d, "ValidationXML", true);
            },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); return false; }
        });

        if (OBPager.ValidationStatus == 0) {
            OBPager.errorDOM = OBParseXML(OBPager.ValidationSet);
            if (OBPager.errorDOM != null) {
                $(OBPager.errorDOM).find('ValidationSet').find('ValidationError').each(function () {
                    OBPager.ValidationMessage = OBPager.ValidationMessage + $(this).find('ValidationMessage').text();
                });
            }
            return false;
        }
        else {
            return true;
        }
    },

    /* Function to set member value manually */
    /* Param 1: dataMember = Exact data member name to which the value needs to be changed */
    /* Param 2: childLevel = Level of child to which the member belongs */
    /* Param 3: value = Value which needs to be updated */
    /* Param 4: doDataBind = Do data refresh is required */
    /* Param 5: index = Index value of child node - must be used in repeated child node items */
    SetTaskContentMemberValue: function (dataMember, childLevel, value, doDataBind, index) {
        var member = dataMember.split(".");
        if (childLevel == null) {
            jQXB.setmemberVarvalue(OBPager.taskContentDSName, member[0], member[1], value);
        }
        else {
            var memberList = '';
            for (var idx = 0; idx < member.length; idx++) {
                memberList = memberList + '.' + member[idx];
            }
            memberList = memberList.substring(1, memberList.length);
            jQXB.setmemberVarvalue(OBPager.taskContentDSName, null, memberList, value);
        }
        if (doDataBind == true)
            jQXB.doBind(OBPager.taskContentDSName);
    },

    /* Function to get master data from DB */
    GetMaster: function (masterCode, dataSourceName) {
        var data = "{";
        data += "'sessionId':" + OBPager.sessionId.toString() + ",";
        data += "'parentCode':'" + masterCode + "'";
        data += "}";

        $.ajax({
            type: "post",
            url: "../../../../FormsService.aspx/GetMaster",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) { OBPager.BindData(msg.d, dataSourceName, false); },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
    },

    /* Function to Get Geography master */
    GetGeographyMaster: function (mode, parentId, dataSourceName, asyncMode) {
        var data = "{";
        data += "'mode':" + mode.toString() + ",";
        data += "'candidateId':" + OBPager.candidateId + ",";
        data += "'parentcode':" + parentId.toString();

        data += "}";
        if (asyncMode == null)
            asyncMode = false;
        $.ajax({
            type: "post",
            url: "../../../../FormsService.aspx/GetGeographyMaster",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: asyncMode,
            success: function (msg) { OBPager.BindData(msg.d, dataSourceName, false); },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
    },


    /* Function to reset the Authentication key(forgot key)  and send mail to the Candidate*/
    ForgotKey: function (cntrolId) {
        var retMailStatus = 0;
        var key = $('#' + cntrolId);
        var data = "{";
        data += "'sessionId':" + OBPager.sessionId.toString() + ",";
        data += "'countryId':" + OBPager.countryId.toString() + ",";
        data += "'candidateId':" + OBPager.candidateId.toString();
        data += "}";

        $.ajax({
            type: "post",
            url: "../../../../FormsService.aspx/ResetAuthenticationKey",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                retMailStatus = msg.d;
            },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });

        if (retMailStatus == 1) {
            MsgboxAlert(sessionId, 1, 203, 'FORGOTKEY_SUCCESS_MAIL', 'Authentication key has been mailed to you!');
        }
        else {
            MsgboxAlert(sessionId, 1, 204, 'FORGOTKEY_MAIL_FAILURE', 'Process failed!!');
        }
    },

    /* Method to get the employers details of the candidate  */
    GetEmployersDetails: function () {

        var data = "{";
        data += "'sessionId':" + OBPager.sessionId.toString() + ",";
        data += "'candidateId':" + OBPager.candidateId.toString() + ",";
        data += "'taskId':" + OBPager.taskId.toString() + ",";
        data += "'countryId':" + OBPager.countryId.toString();
        data += "}";

        $.ajax({
            type: "post",
            url: "../../../../FormsService.aspx/GetEmployersDetails",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                BaseData = JSON.parse(msg.d);
                resetEmployerDS = BaseData;
            },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
    },

    /* Bind Training Dates */
    BindTrainingDates: function (dataSourceName) {
        datastring = "{";
        datastring += "'sessionId':" + sessionId.toString() + ",";
        datastring += "'candidateId':" + candidateId.toString() + ",";
        datastring += "'countryId':" + countryId.toString();

        datastring += "}";
        $.ajax({
            type: "POST",
            url: "../../../../FormsService.aspx/BindTrainingDates",
            data: datastring,
            contentType: "application/json; charset=utf-8",

            dataType: "json",
            async: false,
            success: function (msg) {
                OBPager.BindData(msg.d, dataSourceName, false);
            },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
    },

    GetMedicalTopupCoverage: function (dataSourceName) {
        var data = "{";
        data += "'sessionId':" + OBPager.sessionId.toString() + ",";
        data += "'candidateId':'" + candidateId.toString() + "'";
        data += "}";

        $.ajax({
            type: "post",
            url: "../../../../FormsService.aspx/GetMedicalTopUpCoverage",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) { OBPager.BindData(msg.d, dataSourceName, false); },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
    }
};

//**********Removed by Bala(207953)-- Handled in Task specific js file
//function RegisterCancel(Mode) {
//    Selected indexChange
//    var dataString;
//    if (document.getElementById('TrainingId').value == -1) {
//        alert("Please select the Training Date!");
//    }
//    else {
//        var conf = true; ;

//        var datasave = JSON.stringify(jQXB.getDataSource(OBPager.taskContentDSName)).toString();
//        var datastring = "{";
//        datastring += "'TrainingId':" + $("#TrainingId").val() + ",";
//        datastring += "'candidateId':" + candidateId.toString() + ",";
//        datastring += "'Mode':" + Mode + ",";
//        datastring += "'datasave':'" + datasave + "',";
//        datastring += "'taskid':" + OBPager.taskId.toString() + ",";
//        datastring += "'sessionId':" + sessionId.toString() + ",";

//        datastring += "'countryId':" + OBPager.countryId;
//        datastring += "}";
//        if (Mode == 2) {
//            conf = confirm("Do you want to cancel your registration? You will need to come back and re-register yourself");
//        }
//        if (conf == true) {
//            $.ajax({
//                type: "POST",
//                url: "../../../../FormsService.aspx/RegisterCancelTrainingDetails",
//                data: datastring,
//                contentType: "application/json; charset=utf-8",
//                dataType: "json",
//                async: false,
//                success: function (msg) {
//                    if (msg.d[0].Value == 1) {
//                        if (Mode == 1) {

//                            if (document.getElementById("btnRegister").value == "Register") {

//                                if (JSON.parse(OBPager.strTaskPrefillValues).PrefillValues.Set2.Score >= 50) {
//                                    dataString = '{NotificationMasterId:' + 23 + ',NotificationMappingId:' + 26 + ',candidateId:' + OBPager.candidateId.toString() + ',countryID:' + "'" + OBPager.countryId + "'" + '}';
//                                    $.MailSend(dataString);
//                                    dataString = '{NotificationMasterId:' + 40 + ',NotificationMappingId:' + 24 + ',candidateId:' + OBPager.candidateId.toString() + ',countryID:' + "'" + OBPager.countryId + "'" + '}';
//                                    $.MailSend(dataString);
//                               }

//                                if (JSON.parse(OBPager.strTaskPrefillValues).PrefillValues.Set2.Score < 50) {
//                                    dataString = '{NotificationMasterId:' + 90 + ',NotificationMappingId:' + 26 + ',candidateId:' + OBPager.candidateId.toString() + ',countryID:' + "'" + OBPager.countryId + "'" + '}';
//                                    $.MailSend(dataString);
//                                    dataString = '{NotificationMasterId:' + 40 + ',NotificationMappingId:' + 24 + ',candidateId:' + OBPager.candidateId.toString() + ',countryID:' + "'" + OBPager.countryId + "'" + '}';
//                                    $.MailSend(dataString);
//                                }
//                            }

//                            if (document.getElementById("btnRegister").value == "Modify Registration") {

//                          if (JSON.parse(OBPager.strTaskPrefillValues).PrefillValues.Set2.Score >= 50)
//                           {
//                                dataString = '{NotificationMasterId:' + 24 + ',NotificationMappingId:' + 27 + ',candidateId:' + OBPager.candidateId.toString() + ',countryID:' + "'" + OBPager.countryId + "'" + '}';
//                                $.MailSend(dataString);
//                            }

//                        if (JSON.parse(OBPager.strTaskPrefillValues).PrefillValues.Set2.Score < 50)
//                        {

//                     dataString = '{NotificationMasterId:' + 91 + ',NotificationMappingId:' + 40 + ',candidateId:' + OBPager.candidateId.toString() + ',countryID:' + "'" + OBPager.countryId + "'" + '}';
//                       $.MailSend(dataString);
//                        }

//                       }

//                        else if (Mode == 2) {
//                            dataString = '{NotificationMasterId:' + 25 + ',NotificationMappingId:' + 28 + ',candidateId:' + OBPager.candidateId.toString() + ',countryID:' + "'" + OBPager.countryId + "'" + '}';
//                            $.MailSend(dataString);
//                        }
//                        /* Disabling after 3rd attempt */
//                        if (msg.d[1].Value == 1) {
//                            document.getElementById('TrainingId').disabled = true;
//                            document.getElementById('Pg_1_text_State').disabled = true;
//                            document.getElementById('Pg_1_text_StartTime').disabled = true;
//                            document.getElementById('Pg_1_text_EndTime').disabled = true;
//                            document.getElementById("btnRegister").style.display = 'none';
//                            document.getElementById("btnCancel").style.display = 'none';
//                             document.getElementById("note").innerText = "Note*:You have modified the date twice,and will not be able to change it further.Please contact your Recruiter/Induction Manager for any further information/changes."
//                            $("#note").text("Note*:You have modified the date twice,and will not be able to change it further.Please contact your Recruiter/Induction Manager for any further information/changes.");
//                        }
//                        else {
//                            if (Mode == 2) {
//                                document.getElementById("btnRegister").value = "Register";
//                                document.getElementById("btnCancel").style.display = 'none';
//                                document.getElementById('TrainingId').value = -1;
//                                document.getElementById('Pg_1_text_State').value = "";
//                                document.getElementById('Pg_1_text_StartTime').value = "";
//                                document.getElementById('Pg_1_text_EndTime').value = "";
//                            }
//                            else {
//                                document.getElementById("btnRegister").style.display = 'block';
//                                document.getElementById("btnCancel").style.display = 'block';
//                                document.getElementById("btnRegister").value = "Modify Registration";
//                                document.getElementById("btnCancel").value = "Cancel Registration";
//                                document.getElementById("newhireinduction").style.display = 'none';
//                            }
//                            alert("Updated Sucessfully!");
//                        }
//                    }
//                    else {
//                        alert("Registration Failed");
//                    }
//                },
//                error: function (xhr) {
//                    alert("Failed to Register Training Details");
//                }
//            });

//        }
//    }
//}

$.MailSend = function (dataString) {
    $.ajax({
        type: "POST",
        url: "../../../../FormsService.aspx/SendMail",
        data: dataString,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        },
        error: function (xhr) { alert('Mail Not Sent'); }
    });
}
/*Function to print the form */
function PrintPDF() { if (OBPager.taskSubmittedFlag == 1) { print(); } else { return false; } }

/*Function to generate the PDF to download and to preview the pdf */
function PDFPop(pdfOption) {
    if (OBPager.taskSubmittedFlag == 1) {
        var popUpUrl = "";
        popUpUrl = '../../../../FormPDF.aspx?sessionId=' + OBPager.sessionId.toString() + '&&candidateId=' + OBPager.candidateId.toString() + '&&taskId=' + OBPager.taskId.toString() + '&&pdfFileName=' + OBPager.taskTitle.toString() + ' &&pdfOption=' + pdfOption;
        document.getElementById("ifPDFViewer").src = popUpUrl;
        if (pdfOption == 0) {
            $("#divPDFLoader").attr('z-index', '100');
            $("#divPDFLoader").show();
        }
    }
    else {
        return false;
    }
}

function ClosePDFViewer() {
    document.getElementById("ifPDFViewer").src = '';
    $("#divPDFLoader").hide();
}

/*Function to disable the popup window */
window.onbeforeunload = closeIt;
function closeIt() {
    if (window.parent.opener != null) {
        window.parent.opener.disablePopup();
    }
    window.close();
    if (openMode != 1) {
        if (window.opener != null) {
            window.opener.updateWithNewData();
        }
    }
}

function disablePopup() {
    //disables popup only if it is enabled
    $("#overLay").hide();
    $(".popupContactwrapper").hide();
    if (openMode != 1) {
        popupStatus = 0;
    }

}


/* Alerts.js */
(function (b) { b.alerts = { verticalOffset: -75, horizontalOffset: 0, repositionOnResize: true, overlayOpacity: 0.7, overlayColor: "#000000", Color: "#FF9", bckgrdPopupColor: "#ffffff", draggable: false, okButton: "&nbsp;OK&nbsp;", cancelButton: "&nbsp;Cancel&nbsp;", dialogClass: null, Info: function (a) { b.alerts._show1("Information", a, null, "info", function (d) { }) }, Mandatory: function (a) { b.alerts._show1("Mandatory Fields", a, null, "info", function (d) { }) }, Warning: function (a) { b.alerts._show1("Warning", a, null, "warning", function (d) { }) }, Success: function (a) { b.alerts._show1("Success", a, null, "success", function (d) { }) }, Error: function (a) { b.alerts._show1("Error", a, null, "error", function (d) { }) }, Confirm: function (a, d) { b.alerts._show1("Confirmation", a, null, "confirm", d) }, Prompt: function (a, d) { b.alerts._show1("Prompt", a, d, "prompt", function (c) { }) }, Message: function (a) { b.alerts._show1("Message", a, null, "message", function (d) { }) }, SubmitSuccess: function (a) { b.alerts._show1("Success", a, null, "success", function (d) { window.close() }) }, _show1: function (k, m, e, j, a) { b.alerts._hide(); b.alerts._overlay("show"); if (k == "Message") { b("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:300px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } else { b("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:150px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } if (b.alerts.dialogClass) { b("#popup_container").addClass(b.alerts.dialogClass) } var l = b.browser.msie && parseInt(b.browser.version) <= 6 ? "absolute" : "fixed"; if (k == "Message") { b("#popup_container").css({ width: 700, height: "auto", position: l, zIndex: 99999, padding: 0, margin: 50, left: 400, background: b.alerts.bckgrdPopupColor }) } else { b("#popup_container").css({ width: 450, height: 300, position: l, zIndex: 99999, padding: 0, margin: 50, left: 400, background: b.alerts.bckgrdPopupColor }) } b("#popup_title").text(k); b("#popup_content").addClass(j); b("#popup_message").text(m); b("#popup_message").html(b("#popup_message").text().replace(/\n/g, "<br />")); b("#popup_container").css({ minWidth: b("#popup_container").outerWidth(), maxWidth: b("#popup_container").outerWidth() }); b.alerts._reposition(); b.alerts._maintainPosition(true); switch (j) { case "info": case "warning": case "success": case "error": case "message": b("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold; position:relative;" class="popup_Button" value="' + b.alerts.okButton + '" id="popup_ok" /></div>'); b("#popup_ok").click(function () { b.alerts._hide(); a(true) }); b("#popup_ok").focus().keypress(function (c) { if (c.keyCode == 13 || c.keyCode == 27) { b("#popup_ok").trigger("click") } }); break; case "confirm": b("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + b.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + b.alerts.cancelButton + '" id="popup_cancel" /></div>'); b("#popup_ok").click(function () { b.alerts._hide(); if (a) { a(true) } }); b("#popup_cancel").click(function () { b.alerts._hide(); if (a) { a(false) } }); b("#popup_ok").focus(); b("#popup_ok, #popup_cancel").keypress(function (c) { if (c.keyCode == 13) { b("#popup_ok").trigger("click") } if (c.keyCode == 27) { b("#popup_cancel").trigger("click") } }); break; case "prompt": b("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color:Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + b.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button" value="' + b.alerts.cancelButton + '" id="popup_cancel" /></div>'); b("#popup_prompt").width(b("#popup_message").width()); b("#popup_ok").click(function () { var c = b("#popup_prompt").val(); b.alerts._hide(); if (a) { a(c) } }); b("#popup_cancel").click(function () { b.alerts._hide(); if (a) { a(null) } }); b("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (c) { if (c.keyCode == 13) { b("#popup_ok").trigger("click") } if (c.keyCode == 27) { b("#popup_cancel").trigger("click") } }); if (e) { b("#popup_prompt").val(e) } b("#popup_prompt").focus().select(); break } if (b.alerts.draggable) { try { b("#popup_container").draggable({ handle: b("#popup_title") }); b("#popup_title").css({ cursor: "move", font: 15 }) } catch (n) { } } }, _hide: function () { b("#popup_container").remove(); b.alerts._overlay("hide"); b.alerts._maintainPosition(false) }, _overlay: function (a) { switch (a) { case "show": b.alerts._overlay("hide"); b("BODY").append('<div id="popup_overlay"></div>'); b("#popup_overlay").css({ position: "absolute", zIndex: 99998, top: "0px", left: "0px", width: "100%", height: b(window).height() - 100 + "px", background: b.alerts.overlayColor, opacity: b.alerts.overlayOpacity }); break; case "hide": b("#popup_overlay").remove(); break } }, _reposition: function () { var d = b(window).height() / 2 - b("#popup_container").outerHeight() / 2 + b.alerts.verticalOffset; var a = b(window).width() / 2 - b("#popup_container").outerWidth() / 2 + b.alerts.horizontalOffset; if (d < 0) { d = 0 } if (a < 0) { a = 0 } if (b.browser.msie && parseInt(b.browser.version) <= 6) { d = d + b(window).scrollTop() } b("#popup_container").css({ top: d + "px", left: a + "px" }); b("#popup_overlay").height(b(document).height()) }, _maintainPosition: function (a) { if (b.alerts.repositionOnResize) { switch (a) { case true: b(window).bind("resize", function () { b.alerts._reposition() }); break; case false: b(window).unbind("resize"); break } } } }, MsgboxInfo = function (a) { b.alerts.Info(a) }, MsgboxWarning = function (a) { b.alerts.Warning(a) }, MsgboxSuccess = function (a) { b.alerts.Success(a) }, MsgboxError = function (a) { b.alerts.Error(a) }, MsgboxConfirm = function (e, j, l, n, a, o) { var k = 2; try { if (l != 0) { b.ajax({ type: "POST", url: "../../../../FormsService.aspx/GetMessage", data: "{'sessionId':" + e.toString() + ",'messageType':'" + k + "','messageId':" + l.toString() + ",'messageCode':'" + n + "', 'customMessageOnDBFail':'" + a + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (f) { var d = f.d.DisplayMessage.toString(); var c = f.d.DisplayType.toString(); var h = d.toString(); var g = c.toString(); if (l == 39) { g = "9" } switch (g) { case "6": b.alerts.Confirm(h, o); break; default: b.alerts.Info(h) } }, error: function (c, f, d) { b.alerts.Error(c.status + " - " + c.responseText) } }) } else { if (l == 0) { switch (j) { case 6: b.alerts.Confirm(a, o); break; default: b.alerts.Info(a) } } } } catch (m) { alert(m) } }, MsgboxPrompt = function (a, d) { b.alerts.Prompt(a, d) }, MsgboxAlert = function (e, j, l, m, a) { var k = 2; try { if (l != 0) { b.ajax({ type: "POST", url: "../../../../FormsService.aspx/GetMessage", data: "{'sessionId':" + e.toString() + ",'messageType':'" + k + "','messageId':" + l.toString() + ",'messageCode':'" + m + "', 'customMessageOnDBFail':'" + a + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (f) { var d = f.d.DisplayMessage.toString(); var c = f.d.DisplayType.toString(); var h = d.toString(); var g = c.toString(); if (l == 39) { g = "9" } switch (g) { case "1": b.alerts.Success(h); break; case "2": b.alerts.Error(h); break; case "3": b.alerts.Warning(h); break; case "4": b.alerts.Info(h); break; case "5": b.alerts.Prompt(h); break; case "6": b.alerts.Confirm(h); break; case "7": b.alerts.Mandatory(h); break; case "8": b.alerts.Message(h); break; case "9": b.alerts.SubmitSuccess(h); break; default: b.alerts.Info(h) } }, error: function (c, f, d) { b.alerts.Error(c.status + " - " + c.responseText) } }) } else { if (l == 0) { switch (j) { case 1: b.alerts.Success(a); break; case 2: b.alerts.Error(a); break; case 3: b.alerts.Warning(a); break; case 4: b.alerts.Info(a); break; case 5: b.alerts.Prompt(a); break; case 6: b.alerts.Confirm(a); break; case 7: b.alerts.Mandatory(a); break; default: b.alerts.Info(a) } } } } catch (n) { alert(n) } }, MsgboxAlertDashboard = function (e, j, l, m, a) { var k = 2; try { if (l != 0) { b.ajax({ type: "POST", url: "../../FormsService.aspx/GetMessage", data: "{'sessionId':" + e.toString() + ",'messageType':'" + k + "','messageId':" + l.toString() + ",'messageCode':'" + m + "', 'customMessageOnDBFail':'" + a + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (f) { var d = f.d.DisplayMessage.toString(); var c = f.d.DisplayType.toString(); var h = d.toString(); var g = c.toString(); switch (g) { case "1": b.alerts.Success(h); break; case "2": b.alerts.Error(h); break; case "3": b.alerts.Warning(h); break; case "4": b.alerts.Info(h); break; case "5": b.alerts.Prompt(h); break; case "6": b.alerts.Confirm(h); break; case "7": b.alerts.Mandatory(h); break; default: b.alerts.Info(h) } }, error: function (c, f, d) { b.alerts.Error(c.status + " - " + c.responseText) } }) } else { if (l == 0) { switch (j) { case 1: b.alerts.Success(a); break; case 2: b.alerts.Error(a); break; case 3: b.alerts.Warning(a); break; case 4: b.alerts.Info(a); break; case 5: b.alerts.Prompt(a); break; case 6: b.alerts.Confirm(a); break; case 7: b.alerts.Mandatory(a); break; default: b.alerts.Info(a) } } } } catch (n) { alert(n) } } })(jQuery);