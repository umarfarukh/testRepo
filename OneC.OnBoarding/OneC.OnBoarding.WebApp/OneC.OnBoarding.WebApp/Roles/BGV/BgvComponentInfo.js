/* 
************************************************
OnBoarding BGV Component helper
************************************************
Author: 249510
Date: 2014-AUG-20
Purpose: Methods related to BGV Candidate Qualifications
************************************************
*/
/* JQXB.js */
var prevemp, curremp;
var jQXB = { version: "1.1.20110926", initialized: false, alertOnError: false, compatibilitymode: false, m: { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, datasourcesCollectionOrigValues: new Array(), datasourcesCollection: new Array(), charset: "charset=utf-8", onBeforeUpdateCallBacks: new Array(), onAfterUpdateCallBacks: new Array(), onBeforeDataSourceBindCallBacks: new Array(), onAfterDataSourceBindCallBacks: new Array(), onBeforeTemplateBindCallBacks: new Array(), onAfterTemplateBindCallBacks: new Array(), onTemplateItemBindedCallbacks: new Array(), messageSubscribers: new Array(), internalOnBinding: new Array(), JQXB_DEFAULT_CHANGE_EVENT: "change", JQXB_DATASOURCE_ATTR: "jqxb-datasource", JQXB_DATASOURCE_MEMBER_ATTR: "jqxb-datamember", JQXB_TEMPLATE_ATTR: "jqxb-template", JQXB_OCCURENCY_ATTR: "jqxb-occurency", JQXB_TEMPLATECONTAINER_ATTR: "jqxb-templatecontainer", JQXB_TEMPLATEITEMPREFIX_ATTR: "jqxb-templateitemidprfx", JQXB_TEMPLATEOWNER_ATTR: "jqxb-itemtemplate", JQXB_TEMPLATEITEMDATAMEMBER_ATTR: "jqxb-itemdatamember", JQXB_TEMPLATEITEMDATASOURCE_ATTR: "jqxb-itemdatasource", JQXB_TEMPLATEITEMIDX_ATTR: "jqxb-itemdatasourceidx", JQXB_TEMPLATEITEM_DYNAMIC_ID_ATTR: "jqxb-templateitemdynamicid", JQXB_CHANGEONEVENT_ATTR: "jqxb-changeonevent", JQXB_BINDEDATTRIBUTE_ATTR: "jqxb-bindedattribute", JQXB_LISTSOURCE: "jqxb-listsource", JQXB_LISTVALUE: "jqxb-listvalue", JQXB_LISTTEXT: "jqxb-listtext", JQXB_VALUETRANSFORMATION: "jqxb-transformfunc", JQXB_CALCULATIONFUNC: "jqxb-calculatefunc" }; jQXB.toJSON = function (h, j) { var b, c, d, e, f = /["\\\x00-\x1f\x7f-\x9f]/g, g; switch (typeof h) { case "string": return f.test(h) ? '"' + h.replace(f, function (k) { var l = jQXB.m[k]; if (l) { return l } l = k.charCodeAt(); return "\\u00" + Math.floor(l / 16).toString(16) + (l % 16).toString(16) }) + '"' : '"' + h + '"'; case "number": return isFinite(h) ? String(h) : "null"; case "boolean": case "null": return String(h); case "object": if (!h) { return "null" } if (typeof h.toJSON === "function") { return jQXB.toJSON(h.toJSON()) } b = []; if (typeof h.length === "number" && !(h.propertyIsEnumerable("length"))) { e = h.length; for (c = 0; c < e; c += 1) { b.push(jQXB.toJSON(h[c], j) || "null") } return "[" + b.join(",") + "]" } if (j) { e = j.length; for (c = 0; c < e; c += 1) { d = j[c]; if (typeof d === "string") { g = jQXB.toJSON(h[d], j); if (g) { b.push(jQXB.toJSON(d) + ":" + g) } } } } else { for (d in h) { if (typeof d === "string") { g = jQXB.toJSON(h[d], j); if (g) { b.push(jQXB.toJSON(d) + ":" + g) } } } } return "{" + b.join(",") + "}" } }; jQXB.initialize = function (b, a) { var c = new Array(); if (c) { jQuery("[" + jQXB.JQXB_DATASOURCE_ATTR + "]:not([" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "])").each(function () { if (jQuery(this).attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR) == undefined) { c.push(jQuery(this).attr(jQXB.JQXB_DATASOURCE_ATTR) + " missing " + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + "attribute") } }) } if (jQXB.alertOnError != undefined) { jQXB.alertOnError = a } if (jQXB.initialized) { return jQXB } jQXB.initialized = true; return jQXB.attachChangeEvents() }; jQXB.refreshControls = function (b, c, a) { var d; if (c == undefined) { if (a == undefined) { d = "[" + jQXB.JQXB_DATASOURCE_ATTR + "=" + b + "][" + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + "]" } else { d = "[" + jQXB.JQXB_DATASOURCE_ATTR + "=" + b + "][" + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + "=" + a + "]" } } else { if (a == undefined) { d = "[" + jQXB.JQXB_DATASOURCE_ATTR + "=" + b + "][" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "] [" + jQXB.JQXB_TEMPLATEOWNER_ATTR + "][" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "=" + c + "] [" + jQXB.JQXB_TEMPLATEITEMDATAMEMBER_ATTR + "]" } else { d = "[" + jQXB.JQXB_DATASOURCE_ATTR + "=" + b + "][" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "] [" + jQXB.JQXB_TEMPLATEOWNER_ATTR + "][" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "=" + c + "] [" + jQXB.JQXB_TEMPLATEITEMDATAMEMBER_ATTR + "=" + a + "]" } } jQuery(d).each(function () { jQXB.getmemberValue(jQXB.getDataSource(b), c, jQuery(this).attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR) || jQuery(this).attr(jQXB.JQXB_TEMPLATEITEMDATAMEMBER_ATTR), jQuery(this)) }); return jQXB }; jQXB.attachChangeEvents = function () { jQuery("body").delegate("[" + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + "][" + jQXB.JQXB_DATASOURCE_ATTR + "]", jQXB.JQXB_DEFAULT_CHANGE_EVENT, function () { var a = jQuery(this); var b = jQXB.getValueFromAttrib(a); jQXB.setmemberVarvalue(a.attr(jQXB.JQXB_DATASOURCE_ATTR), null, a.attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), b, a) }); jQuery("body").delegate("[" + jQXB.JQXB_DATASOURCE_ATTR + "][" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "] [" + jQXB.JQXB_TEMPLATEITEMDATAMEMBER_ATTR + "]", jQXB.JQXB_DEFAULT_CHANGE_EVENT, function () { var a = jQuery(this); var c = a.parents("[" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "]").first().attr(jQXB.JQXB_TEMPLATEOWNER_ATTR); var b = a.parents("[" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "]").first().attr(jQXB.JQXB_TEMPLATEITEMIDX_ATTR); var d = jQXB.getValueFromAttrib(a); jQXB.setmemberVarvalue(a.parents("[" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "=" + c + "]").attr(jQXB.JQXB_DATASOURCE_ATTR), b, a.attr(jQXB.JQXB_TEMPLATEITEMDATAMEMBER_ATTR), d, a) }); return jQXB }; jQXB.attachChangeEvent = function (a, e, c, d) { var b = d.attr(jQXB.JQXB_CHANGEONEVENT_ATTR); if (b == undefined) { b = jQXB.JQXB_DEFAULT_CHANGE_EVENT } d.unbind(b, function () { jQXB.setmemberVarvalue(a, e, c, jQXB.getValueFromAttrib(jQuery(this)), jQuery(this)) }); d.bind(b, function () { jQXB.setmemberVarvalue(a, e, c, jQXB.getValueFromAttrib(jQuery(this)), jQuery(this)) }); return jQXB }; jQXB.addOnTemplateItemBoundhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.addOnTemplateItemBoundhnd Error: handler must be a function") } jQXB.addOnEvthnd(jQXB.onTemplateItemBindedCallbacks, a); return jQXB }; jQXB.delOnTemplateItemBoundhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.delOnTemplateItemBoundhnd Error: handler must be a function") } jQXB.delOnEventhdn(jQXB.onTemplateItemBindedCallbacks, a); return jQXB }; jQXB.addOnBeforeUpdatehnd = function (a) { if (typeof (a) != "function") { alert("jQXB.addOnBeforeUpdatehnd   Error: handler must be a function") } jQXB.addOnEvthnd(jQXB.onBeforeUpdateCallBacks, a); return jQXB }; jQXB.delOnBeforeUpdatehnd = function (a) { if (typeof (a) != "function") { alert("jQXB.delOnBeforeUpdatehnd Error: handler must be a function") } jQXB.delOnEventhdn(jQXB.onBeforeUpdateCallBacks, a); return jQXB }; jQXB.addOnAfterUpdatehnd = function (a) { if (typeof (a) != "function") { alert("jQXB.addOnAfterUpdatehnd   Error: handler must be a function") } jQXB.addOnEvthnd(jQXB.onAfterUpdateCallBacks, a); return jQXB }; jQXB.delOnAfterUpdatehnd = function (a) { if (typeof (a) != "function") { alert("jQXB.delOnAfterUpdatehnd Error: handler must be a function") } jQXB.delOnEventhdn(jQXB.onAfterUpdateCallBacks, a); return jQXB }; jQXB.addOnBeforeDataSourceBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.addOnBeforeDataSourceBindhnd Error: handler must be a function") } jQXB.addOnEvthnd(jQXB.onBeforeDataSourceBindCallBacks, a); return jQXB }; jQXB.delOnBeforeDataSourceBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.delOnBeforeDataSourceBindhnd  Error: handler must be a function") } jQXB.delOnEventhdn(jQXB.onBeforeDataSourceBindCallBacks, a); return jQXB }; jQXB.addOnAfterDataSourceBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.addOnAfterDataSourceBindhnd Error: handler must be a function") } jQXB.addOnEvthnd(jQXB.onAfterDataSourceBindCallBacks, a); return jQXB }; jQXB.delOnAfterDataSourceBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.delOnAfterDataSourceBindhnd  Error: handler must be a function") } jQXB.delOnEventhdn(jQXB.onAfterDataSourceBindCallBacks, a); return jQXB }; jQXB.addOnBeforeTemplateBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.addOnAfterTemplateBindhnd  Error: handler must be a function") } jQXB.addOnEvthnd(jQXB.onBeforeTemplateBindCallBacks, a); return jQXB }; jQXB.delOnBeforeTemplateBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.delOnBeforeTemplateBindhnd  Error: handler must be a function") } jQXB.delOnEventhdn(jQXB.onBeforeTemplateBindCallBacks, a); return jQXB }; jQXB.addOnAfterTemplateBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.addOnAfterTemplateBindhnd  Error: handler must be a function") } jQXB.addOnEvthnd(jQXB.onAfterTemplateBindCallBacks, a); return jQXB }; jQXB.delOnAfterTemplateBindhnd = function (a) { if (typeof (a) != "function") { alert("jQXB.delOnAfterTemplateBindhnd  Error: handler must be a function") } jQXB.delOnEventhdn(jQXB.onAfterTemplateBindCallBacks, a); return jQXB }; jQXB.addOnEvthnd = function (b, a) { for (idx = 0; idx < b.length; idx++) { if (b[idx].toString() == a.toString()) { return } } b.push(a) }; jQXB.delOnEventhdn = function (b, a) { if (typeof (a) != "function") { alert("jQXB.delOnEventhdn Error: handler param must be a function"); return } for (idx = 0; idx < b.length; idx++) { if (b[idx].toString() == a.toString()) { b.splice(idx, 1); break } } }; jQXB.setDataSource = function (c, d, a) { var b = jQXB.datasourcesCollection[c]; if (b == undefined) { b = { datasource: d, autorefresh: a} } else { b.datasource = d } if (a != undefined) { b.autorefresh = a } jQXB.datasourcesCollection[c] = b; jQXB.datasourcesCollectionOrigValues[c] = d; return jQXB }; jQXB.getDataSource = function getDataSource(a) { try { return jQXB.datasourcesCollection[a].datasource } catch (b) { b.arguments = arguments; alert(jQXB.diags.dumpobj(b, "[ERROR]", "->")) } }; jQXB.getDataSourceContainer = function (a) { return jQXB.datasourcesCollection[a] }; jQXB.getDataSourceOrigValue = function (a) { return jQXB.datasourcesCollectionOrigValues[a] }; jQXB.addRowToDataSource = function (b, c, a) { if (!jQXB.utils.isEnumerable(jQXB.getDataSource(b))) { alert(b + "  must be enumerable in order to add object "); return } if (a == undefined) { jQXB.getDataSource(b).push(c) } else { jQXB.getDataSource(b).splice(a, 0, c) } jQXB.bindTemplate(b); jQXB.bindList(b); return jQXB }; jQXB.addObjectToDataSource = function (a, b) { return jQXB.addRowToDataSource(a, b) }; jQXB.deleteRowFromDataSource = function (a, b) { if (!jQXB.utils.isEnumerable(jQXB.getDataSource(a))) { alert(a + "  must be enumerable in order to remove object "); return } jQXB.getDataSource(a).splice(b, 1); jQuery("[" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "][" + jQXB.JQXB_DATASOURCE_ATTR + "=" + a + "] > [" + jQXB.JQXB_TEMPLATE_ATTR + "][" + jQXB.JQXB_TEMPLATEITEMPREFIX_ATTR + "]").each(function () { jQXB.deleteTemplateRow(jQuery(this).attr(jQXB.JQXB_TEMPLATE_ATTR), b) }); return jQXB }; jQXB.deleteObjectFromDataSource = function (a, b) { return jQXB.deleteRowFromDataSource(a, b) }; jQXB.saveJSON = function (d, a, c, b) { return jQXB.postJSON(d, "post", a, c, b) }; jQXB.deleteJSON = function (d, a, c, b) { return jQXB.postJSON(d, "delete", a, c, b) }; jQXB.postJSON = function (e, c, a, d, b) { return jQXB.ajaxCall(e, c, a, d, b) }; jQXB.ajaxCall = function (e, c, a, d, b) { jQuery.ajax({ type: c, traditional: true, url: e, async: false, data: jQXB.toJSON(a), dataType: "json", contentType: "application/json; " + jQXB.charset, success: function (f) { if (d != undefined) { d(f) } }, error: function (f) { if (b != undefined) { if (jQXB.alertOnError) { alert("jQXB.ajaxCall ERROR: url:" + e + " method: " + c) } b(f) } } }); return jQXB }; jQXB.getJSON = function (d, a, c, b) { jQuery.ajax({ type: "get", traditional: true, url: d, async: false, data: a, dataType: "json", contentType: "application/json; " + jQXB.charset, success: function (e) { if (c != undefined) { c(e) } }, error: function (e) { if (b != undefined) { if (jQXB.alertOnError) { alert("jQXB.getJSON ERROR:") } b(e) } } }); return jQXB }; jQXB.deleteTemplateRow = function (f, d) { var a, e, b, c; a = jQuery("[" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "=" + f + "]").first().attr(jQXB.JQXB_DATASOURCE_ATTR); jQuery("[" + jQXB.JQXB_TEMPLATEOWNER_ATTR + "=" + f + "][" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "=" + d + "]").remove(); e = jQuery("[" + jQXB.JQXB_TEMPLATE_ATTR + "=" + f + "][" + jQXB.JQXB_TEMPLATEITEMPREFIX_ATTR + "]").first().attr(jQXB.JQXB_TEMPLATEITEMPREFIX_ATTR); b = 0; jQuery("[" + jQXB.JQXB_TEMPLATEOWNER_ATTR + "=" + f + "][" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "]").each(function () { jQuery(this).attr("id", e + "_" + b).attr(jQXB.JQXB_TEMPLATEITEMIDX_ATTR, b); jQXB.bindElementsTemplates(a, jQuery(this).attr(jQXB.JQXB_TEMPLATEOWNER_ATTR), b, jQuery(this)); b++ }); return jQXB }; jQXB.clearTemplateInstances = function (a) { jQuery("[" + jQXB.JQXB_TEMPLATEOWNER_ATTR + "=" + a + "]").unbind().remove(); return jQXB }; jQXB.doBind = function (b, a) { var c = new Array(); if (b != undefined) { c.push(b) } else { for (var g in jQXB.datasourcesCollection) { c.push(g) } } try { for (var f = 0; f < c.length; f++) { jQXB.bindList(c[f], a); jQXB.bindSingleDataMember(c[f], a); jQXB.bindTemplate(c[f], a) } } catch (d) { d.arguments = arguments; alert(jQXB.diags.dumpobj(d, "ERROR", "->")) } return jQXB }; jQXB.bindList = function (b, a) { jQuery("[" + jQXB.JQXB_LISTSOURCE + "=" + b + "][" + jQXB.JQXB_LISTVALUE + "][" + jQXB.JQXB_LISTTEXT + "]").each(function () { jQXB.utils.filllist(jQuery(this), jQXB.getDataSource(b), jQuery(this).attr(jQXB.JQXB_LISTVALUE), jQuery(this).attr(jQXB.JQXB_LISTTEXT)) }) }; jQXB.bindSingleDataMember = function (b, a) { for (var c = 0; c < jQXB.onBeforeDataSourceBindCallBacks.length; c++) { jQXB.onBeforeDataSourceBindCallBacks[c](b, jQXB.getDataSource(b)) } jQuery("[" + jQXB.JQXB_DATASOURCE_ATTR + "=" + b + "][" + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + "]", a).each(function () { jQXB.bindElement(b, null, jQuery(this).attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), jQuery(this)) }); for (var c = 0; c < jQXB.onAfterDataSourceBindCallBacks.length; c++) { jQXB.onAfterDataSourceBindCallBacks[c](b, jQXB.getDataSource(b)) } return jQXB }; jQXB.bindElement = function (b, e, a, d) { var c = jQXB.getDataSource(b); jQXB.getmemberValue(c, e, a, d); return jQXB }; jQXB.bindTemplate = function (b, a) { jQuery("[" + jQXB.JQXB_TEMPLATECONTAINER_ATTR + "][" + jQXB.JQXB_DATASOURCE_ATTR + "=" + b + "]").each(function () { var f, e, c; f = jQXB.getDataSource(b); e = jQuery(this); c = e.attr(jQXB.JQXB_TEMPLATECONTAINER_ATTR); for (var d = 0; d < jQXB.onBeforeTemplateBindCallBacks.length; d++) { jQXB.onBeforeTemplateBindCallBacks[d](b, jQXB.getDataSource(b), c) } for (var d = 0; d < f.length; d++) { jQrySingleItem = jQuery(this).find("[" + jQXB.JQXB_TEMPLATEOWNER_ATTR + "][" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "=" + d + "]"); if (jQrySingleItem.length != 0) { jQuery(this).find("[" + jQXB.JQXB_TEMPLATEOWNER_ATTR + "][" + jQXB.JQXB_TEMPLATEITEMIDX_ATTR + "=" + d + "]").each(function () { jQXB.bindElementsTemplates(b, c, d, jQuery(this)) }) } else { jQrySingleItem = e.find("[" + jQXB.JQXB_TEMPLATE_ATTR + "=" + c + "]").clone(); id = jQrySingleItem.attr(jQXB.JQXB_TEMPLATEITEMPREFIX_ATTR); id += "_" + d; jQrySingleItem.attr("id", id).removeAttr(jQXB.JQXB_TEMPLATEITEMPREFIX_ATTR).removeAttr(jQXB.JQXB_TEMPLATE_ATTR).attr(jQXB.JQXB_TEMPLATEITEMIDX_ATTR, d).attr(jQXB.JQXB_TEMPLATEOWNER_ATTR, c).show().appendTo(e); jQXB.bindElementsTemplates(b, c, d, jQrySingleItem) } } }); return jQXB }; jQXB.bindElementsTemplates = function (a, e, d, c) { c.find("[" + jQXB.JQXB_TEMPLATEITEMDATAMEMBER_ATTR + "]").each(function () { var g = jQuery(this).attr(jQXB.JQXB_TEMPLATEITEMDATAMEMBER_ATTR); try { var h = jQuery(this).attr(jQXB.JQXB_TEMPLATEITEM_DYNAMIC_ID_ATTR); if (jQuery(this).attr("id") == undefined && h != undefined) { jQuery(this).removeAttr("id"); jQuery(this).removeAttr(jQXB.JQXB_TEMPLATEITEM_DYNAMIC_ID_ATTR).attr("id", h + d) } } catch (f) { } jQXB.bindElement(a, d, g, jQuery(this)) }); for (var b = 0; b < jQXB.onTemplateItemBindedCallbacks.length; b++) { jQXB.onTemplateItemBindedCallbacks[b](a, e, d, jQXB.getDataSource(a)[d], c) } return jQXB }; jQXB.setmemberVarvalue = function (e, l, g, m, h) { var k, j, d; k = g.split("."); d = jQXB.getDataSource(e); if (d === undefined && jQXB.alertOnError) { alert("jQXB.setmemberVarvalue ERROR: no datasource '" + e + "' found. called from " + jQXB.setmemberVarvalue.caller.toString()) } j = jQXB.getMemberByReflection(d, l, k); if (typeof (j) == "function") { return } var a = jQXB.onBeforeUpdateCallBacks.length; for (var f = 0; f < a; f++) { var c = jQXB.onBeforeUpdateCallBacks[f](e, l, j, g, m); if (c == true) { jQXB.getmemberValue(d, l, g, h); return } } jQXB.setMemberValByReflection(d, l, k, m); if (jQXB.getDataSourceContainer(e).autorefresh) { jQXB.refreshControls(e, l, g) } var b = jQXB.onAfterUpdateCallBacks.length; for (var f = 0; f < b; f++) { var c = jQXB.onAfterUpdateCallBacks[f](e, l, jQXB.getMemberByReflection(d, l, k), g, m) } return jQXB }; jQXB.setMemberValByReflection = function (e, c, d, f) { var b; b = (c != null) ? e[c] : e; for (var a = 0; a < d.length - 1; a++) { b = b[d[a]] } b[d[d.length - 1]] = f }; jQXB.getMemberByReflection = function (e, c, d) { var b; b = (c != null) ? e[c] : e; for (var a = 0; a < d.length - 1; a++) { b = b[d[a]] } return b[d[d.length - 1]] }; jQXB.getmemberValue = function (b, f, c, d) { var e; e = jQXB.getMemberByReflection(b, f, c.split(".")); var a = d.attr(jQXB.JQXB_BINDEDATTRIBUTE_ATTR); if (typeof (e) == "function") { e = e(b[f] || b) } var g = d.attr(jQXB.JQXB_VALUETRANSFORMATION); if (g != undefined) { e = jQXB.utils.callFunctionByName(g, window, e) } if (a == undefined) { d.val(e) } else { switch (a) { case "html": d.html(e); break; case "text": d.text(e); break; default: if (jQXB.compatibilitymode) { d.attr(a, e) } else { d.prop(a, e) } break } } e = null; return jQXB }; jQXB.getValueFromAttrib = function (b) { var a = b.attr(jQXB.JQXB_BINDEDATTRIBUTE_ATTR); if (a != undefined) { if (jQXB.compatibilitymode) { elementValue = b.attr(a) } else { elementValue = b.prop(a) } } else { elementValue = b.val() } var c = b.attr(jQXB.JQXB_VALUETRANSFORMATION); if (c != undefined) { elementValue = jQXB.utils.callFunctionByName(c, window, elementValue) } return elementValue }; jQXB.utils = {}; jQXB.utils.filllist = function (d, b, f, e) { if (!jQXB.utils.isEnumerable(b)) { alert("jQXB.utils.filllist: dataItems is not an enumerable type"); return } var a = d.val(); d.find("option").remove(); for (var c = 0; c < b.length; c++) { d.append(jQuery("<option></option>").attr("value", jQXB.getMemberByReflection(b, c, f.split("."))).text(jQXB.getMemberByReflection(b, c, e.split(".")))) } d.val(a) }; jQXB.utils.isEnumerable = function (a) { return a.length != undefined }; jQXB.utils.normalizeMemberPath = function (a) { return a.replace("[").replace("]") }; jQXB.utils.makeObservable = function (c) { var b = {}; for (var a in c) { b.__defineGetter__(a.toString(), function () { return a }); b._defineSetter__(a.toString(), function (d) { a = d }) } }; jQXB.utils.callFunctionByName = function (c, b) { var a = Array.prototype.slice.call(arguments, 2); var f = c.split("."); var d = f.pop(); for (var e = 0; e < f.length; e++) { b = b[f[e]] } return b[d].apply(b, a) }; jQXB.diags = { MAX_DUMP_DEPTH: 10 }; jQXB.diags.dumpobj = function (h, g, c, f) { depth = f || 0; if (depth > jQXB.diags.MAX_DUMP_DEPTH) { return c + g + ": <Maximum Depth Reached>\n" } if (typeof h == "object") { var a = null; var j = c + g + "\n"; c += "\t"; for (var d in h) { try { a = h[d] } catch (b) { a = "<Unable to Evaluate>" } if (typeof a == "object") { j += jQXB.diags.dumpobj(a, d, c, depth + 1) } else { j += c + d + ": " + a + "\n" } } return j } else { return h } }; jQXB.diags.output = function (a) { alert(a) }; jQXBM = { messageSubscribers: new Array(), checkNoSubscriber: false }; jQXBM.subscribeMessage = function (b, a) { b = b || "any"; if (typeof (a) != "function") { alert("jQXBM.subscribeMessage: messagehandler for topic [" + b + "] is not a function"); return } jQXBM.messageSubscribers[b] = jQXBM.messageSubscribers[b] || new Array(); for (idx = 0; idx < jQXBM.messageSubscribers[b].length; idx++) { if (jQXBM.messageSubscribers[b][idx].toString() == a.toString()) { return } } jQXBM.messageSubscribers[b].push(a) }; jQXBM.unsubscribeMessage = function (b, a) { b = b || "any"; if (typeof (a) != "function") { alert("jQXBM.unsubscribeMessage: messagehandler for topic [" + b + "] is not a function"); return } for (idx = 0; idx < jQXBM.messageSubscribers[b].length; idx++) { if (jQXBM.messageSubscribers[b][idx].toString() == a.toString()) { jQXBM.messageSubscribers[b].splice(idx, 1); return } } }; jQXBM.fireMessage = function (d, a, b) { var c; c = jQXBM.messageSubscribers.any; if (c != undefined) { for (i = 0; i < c.length; i++) { c[i](a, b) } } if (d == undefined) { return } c = jQXBM.messageSubscribers[d]; if (c == undefined) { return } for (i = 0; i < c.length; i++) { c[i](a, b) } };
/* JSON.js */
var JSON; if (!JSON) { JSON = {} } (function () { function f(n) { return n < 10 ? "0" + n : n } if (typeof Date.prototype.toJSON !== "function") { Date.prototype.toJSON = function (key) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) { return this.valueOf() } } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + string + '"' } function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === "object" && typeof value.toJSON === "function") { value = value.toJSON(key) } if (typeof rep === "function") { value = rep.call(holder, key, value) } switch (typeof value) { case "string": return quote(value); case "number": return isFinite(value) ? String(value) : "null"; case "boolean": case "null": return String(value); case "object": if (!value) { return "null" } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === "[object Array]") { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || "null" } v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]"; gap = mind; return v } if (rep && typeof rep === "object") { length = rep.length; for (i = 0; i < length; i += 1) { if (typeof rep[i] === "string") { k = rep[i]; v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v) } } } } else { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v) } } } } v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}"; gap = mind; return v } } if (typeof JSON.stringify !== "function") { JSON.stringify = function (value, replacer, space) { var i; gap = ""; indent = ""; if (typeof space === "number") { for (i = 0; i < space; i += 1) { indent += " " } } else { if (typeof space === "string") { indent = space } } rep = replacer; if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) { throw new Error("JSON.stringify") } return str("", { "": value }) } } if (typeof JSON.parse !== "function") { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === "object") { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v } else { delete value[k] } } } } return reviver.call(holder, key, value) } text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) { j = eval("(" + text + ")"); return typeof reviver === "function" ? walk({ "": j }, "") : j } throw new SyntaxError("JSON.parse") } } } ());
/* Alerts.js */
(function (a) { a.alerts = { verticalOffset: -75, horizontalOffset: 0, repositionOnResize: true, overlayOpacity: 0.7, overlayColor: "#000000", Color: "#FF9", bckgrdPopupColor: "#ffffff", draggable: false, okButton: "&nbsp;OK&nbsp;", cancelButton: "&nbsp;Cancel&nbsp;", dialogClass: null, Info: function (b) { a.alerts._show1("Information", b, null, "info", function (c) { }) }, Mandatory: function (b) { a.alerts._show1("Mandatory Fields", b, null, "info", function (c) { }) }, Warning: function (b) { a.alerts._show1("Warning", b, null, "warning", function (c) { }) }, Success: function (b) { a.alerts._show1("Success", b, null, "success", function (c) { }) }, Error: function (b) { a.alerts._show1("Error", b, null, "error", function (c) { }) }, Confirm: function (b) { a.alerts._show1("Confirmation", b, null, "confirm", function (c) { }) }, Prompt: function (b, c) { a.alerts._show1("Prompt", b, c, "prompt", function (d) { }) }, Message: function (b) { a.alerts._show1("Message", b, null, "message", function (c) { }) }, SubmitSuccess: function (b) { a.alerts._show1("Success", b, null, "success", function (c) { window.close() }) }, _show1: function (g, d, i, h, b) { a.alerts._hide(); a.alerts._overlay("show"); if (g == "Message") { a("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:300px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } else { a("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:150px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } if (a.alerts.dialogClass) { a("#popup_container").addClass(a.alerts.dialogClass) } var f = (a.browser.msie && parseInt(a.browser.version) <= 6) ? "absolute" : "fixed"; if (g == "Message") { a("#popup_container").css({ width: 700, height: "auto", position: f, zIndex: 99999, padding: 0, margin: 50, left: 400, background: a.alerts.bckgrdPopupColor }) } else { a("#popup_container").css({ width: 450, height: 300, position: f, zIndex: 99999, padding: 0, margin: 50, left: 400, background: a.alerts.bckgrdPopupColor }) } a("#popup_title").text(g); a("#popup_content").addClass(h); a("#popup_message").text(d); a("#popup_message").html(a("#popup_message").text().replace(/\n/g, "<br />")); a("#popup_container").css({ minWidth: a("#popup_container").outerWidth(), maxWidth: a("#popup_container").outerWidth() }); a.alerts._reposition(); a.alerts._maintainPosition(true); switch (h) { case "info": case "warning": case "success": case "error": case "message": a("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold; position:relative;" class="popup_Button" value="' + a.alerts.okButton + '" id="popup_ok" /></div>'); a("#popup_ok").click(function () { a.alerts._hide(); b(true) }); a("#popup_ok").focus().keypress(function (j) { if (j.keyCode == 13 || j.keyCode == 27) { a("#popup_ok").trigger("click") } }); break; case "confirm": a("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + a.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + a.alerts.cancelButton + '" id="popup_cancel" /></div>'); a("#popup_ok").click(function () { a.alerts._hide(); if (b) { b(true) } }); a("#popup_cancel").click(function () { a.alerts._hide(); if (b) { b(false) } }); a("#popup_ok").focus(); a("#popup_ok, #popup_cancel").keypress(function (j) { if (j.keyCode == 13) { a("#popup_ok").trigger("click") } if (j.keyCode == 27) { a("#popup_cancel").trigger("click") } }); break; case "prompt": a("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color:Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + a.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button" value="' + a.alerts.cancelButton + '" id="popup_cancel" /></div>'); a("#popup_prompt").width(a("#popup_message").width()); a("#popup_ok").click(function () { var e = a("#popup_prompt").val(); a.alerts._hide(); if (b) { b(e) } }); a("#popup_cancel").click(function () { a.alerts._hide(); if (b) { b(null) } }); a("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (j) { if (j.keyCode == 13) { a("#popup_ok").trigger("click") } if (j.keyCode == 27) { a("#popup_cancel").trigger("click") } }); if (i) { a("#popup_prompt").val(i) } a("#popup_prompt").focus().select(); break } if (a.alerts.draggable) { try { a("#popup_container").draggable({ handle: a("#popup_title") }); a("#popup_title").css({ cursor: "move", font: 15 }) } catch (c) { } } }, _hide: function () { a("#popup_container").remove(); a.alerts._overlay("hide"); a.alerts._maintainPosition(false) }, _overlay: function (b) { switch (b) { case "show": a.alerts._overlay("hide"); a("BODY").append('<div id="popup_overlay"></div>'); a("#popup_overlay").css({ position: "absolute", zIndex: 99998, top: "0px", left: "0px", width: "100%", height: a(window).height() - 100 + "px", background: a.alerts.overlayColor, opacity: a.alerts.overlayOpacity }); break; case "hide": a("#popup_overlay").remove(); break } }, _reposition: function () { var c = ((a(window).height() / 2) - (a("#popup_container").outerHeight() / 2)) + a.alerts.verticalOffset; var b = ((a(window).width() / 2) - (a("#popup_container").outerWidth() / 2)) + a.alerts.horizontalOffset; if (c < 0) { c = 0 } if (b < 0) { b = 0 } if (a.browser.msie && parseInt(a.browser.version) <= 6) { c = c + a(window).scrollTop() } a("#popup_container").css({ top: c + "px", left: b + "px" }); a("#popup_overlay").height(a(document).height()) }, _maintainPosition: function (b) { if (a.alerts.repositionOnResize) { switch (b) { case true: a(window).bind("resize", function () { a.alerts._reposition() }); break; case false: a(window).unbind("resize"); break } } } }, MsgboxInfo = function (b) { a.alerts.Info(b) }, MsgboxWarning = function (b) { a.alerts.Warning(b) }, MsgboxSuccess = function (b) { a.alerts.Success(b) }, MsgboxError = function (b) { a.alerts.Error(b) }, MsgboxConfirm = function (b) { a.alerts.Confirm(b) }, MsgboxPrompt = function (b, c) { a.alerts.Prompt(b, c) }, MsgboxAlert = function (i, h, f, d, b) { var g = 2; try { if (f != 0) { a.ajax({ type: "POST", url: "../../../../FormsService.aspx/GetMessage", data: "{'sessionId':" + i.toString() + ",'messageType':'" + g + "','messageId':" + f.toString() + ",'messageCode':'" + d + "', 'customMessageOnDBFail':'" + b + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (k) { var l = k.d.DisplayMessage.toString(); var m = k.d.DisplayType.toString(); var e = l.toString(); var j = m.toString(); if (f == 39) { j = "9" } switch (j) { case "1": a.alerts.Success(e); break; case "2": a.alerts.Error(e); break; case "3": a.alerts.Warning(e); break; case "4": a.alerts.Info(e); break; case "5": a.alerts.Prompt(e); break; case "6": a.alerts.Confirm(e); break; case "7": a.alerts.Mandatory(e); break; case "8": a.alerts.Message(e); break; case "9": a.alerts.SubmitSuccess(e); break; default: a.alerts.Info(e) } }, error: function (k, e, j) { a.alerts.Error(k.status + " - " + k.responseText) } }) } else { if (f == 0) { switch (h) { case 1: a.alerts.Success(b); break; case 2: a.alerts.Error(b); break; case 3: a.alerts.Warning(b); break; case 4: a.alerts.Info(b); break; case 5: a.alerts.Prompt(b); break; case 6: a.alerts.Confirm(b); break; case 7: a.alerts.Mandatory(b); break; default: a.alerts.Info(b) } } } } catch (c) { alert(c) } }, MsgboxAlertDashboard = function (i, h, f, d, b) { var g = 2; try { if (f != 0) { a.ajax({ type: "POST", url: "../../FormsService.aspx/GetMessage", data: "{'sessionId':" + i.toString() + ",'messageType':'" + g + "','messageId':" + f.toString() + ",'messageCode':'" + d + "', 'customMessageOnDBFail':'" + b + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (k) { var l = k.d.DisplayMessage.toString(); var m = k.d.DisplayType.toString(); var e = l.toString(); var j = m.toString(); switch (j) { case "1": a.alerts.Success(e); break; case "2": a.alerts.Error(e); break; case "3": a.alerts.Warning(e); break; case "4": a.alerts.Info(e); break; case "5": a.alerts.Prompt(e); break; case "6": a.alerts.Confirm(e); break; case "7": a.alerts.Mandatory(e); break; default: a.alerts.Info(e) } }, error: function (k, e, j) { a.alerts.Error(k.status + " - " + k.responseText) } }) } else { if (f == 0) { switch (h) { case 1: a.alerts.Success(b); break; case 2: a.alerts.Error(b); break; case 3: a.alerts.Warning(b); break; case 4: a.alerts.Info(b); break; case 5: a.alerts.Prompt(b); break; case 6: a.alerts.Confirm(b); break; case 7: a.alerts.Mandatory(b); break; default: a.alerts.Info(b) } } } } catch (c) { alert(c) } } })(jQuery);

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

candidateId = parseInt(qs["cand"]);
sessionId = parseInt(qs["ss"]);
countryId = parseInt(qs["cntry"]);
roleGroupId = parseInt(qs["rgid"]);
var $date, $CurrMonth, $CurrentYr, $datePickerHTML;
var bgvPId = 3; /*BGV Page Id*/
$.ajaxSetup({ type: 'post', cache: false, dataType: "json", async: false, contentType: 'application/json; charset=utf-8' });
(function (e) { $.compare = function (e, t) { var n = "{"; n += "'candidateId' :" + e; n += ",'pageId' :" + t; n += "}"; $.ajax({ type: "post", dataType: "json", async: false, contentType: "application/json; charset=utf-8", url: "../../BGVService.aspx/GetCompareData", data: n, cache: false, success: function (e) { $(JSON.parse(e.d).Compare).each(function (e, t) { $('[jqxb-datamember="' + t.Parameter + '"]').parent().append('<label class="compare" style="color:red;font-weight:bold;float:right;">' + t.Value + "</label>") }) } }) } })(jQuery)
var candidateDetail = {
    urlPath: '../../', /*This variable is used for Ajax calls */
    imgPath: '../../Images/', /* This variable is used for images*/
    returnData: {}, /* This is used to capture the Ajax return data*/
    template: {}, /*This is used to capture the template of the component*/
    bindData: {},
    typechks: {},
    docChecks: {},
    docChecksArr: [],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    monthDayObj: { 0: 31, 1: 28, 2: 31, 3: 30, 4: 31, 5: 30, 6: 31, 7: 31, 8: 30, 9: 31, 10: 30, 11: 31 },
    yrStart: 1900,
    docData: {},
    runnerLimit: 13,
    dropDown: {},
    jQXBComp: {},
    suspectChks: [],
    compListTemplate: {}, /*This is used to capture the template of component*/
    utiltiesRef: {}, /*This variable is used to fetch the mode of utilities data*/
    autocompleteReset: 0, /*This variable is used or reset if no options are available*/
    verificationObject: {},
    COMP_ATTR_DATASOURCE: "CompDetails",
    COMP_ATTR_DATAMEMBER: "CompDetail",
    TYPE_ATTR_DATASOURCE: "CompList",
    DOC_ATTR_DATASOURCE: "DocList",
    compArr: [],
    Intialize: function () {
        candidateDetail.Process(true);
        candidateDetail.GetComponentTemplate();
        $.when(candidateDetail.GetComponentData(1, '', 0)).promise().done(function (ret) {
            if (ret == true) {
                candidateDetail.ComponentRoleGroupConfiguration();
            }
        });
        candidateDetail.Process(false);
    },
    GetComponentData: function (mode, code, rnId) { /*This method is used to get the component data*/
        var returnStatus = false;
        var inputData = "{";
        inputData += "'candidateId':" + candidateId.toString() + ",";
        inputData += "'mode':" + mode + ",";
        inputData += "'code':'" + code + "',";
        inputData += "'comRunnerId':'" + rnId + "'";
        inputData += "}";
        $.ajax({ url: candidateDetail.urlPath + 'BGVService.aspx/GetComponentData', data: inputData, success: function (msg) {
            candidateDetail.returnData = msg.d;
            candidateDetail.returnData = JSON.parse(candidateDetail.returnData); //.replace(/null/g, ''));
            candidateDetail.compListTemplate = JSON.stringify(candidateDetail.returnData.CompList[0]);
            candidateDetail.utiltiesRef = candidateDetail.returnData.Utilities[0];
            returnStatus = true;
        }, error: function (xhr, status, textRemarks) {
            alert("Error " + xhr.status + " " + textRemarks);
        }
        });
        return returnStatus;
    },
    GetComponentTemplate: function () { /*This method is used to get the template from JSON*/
        $.ajax({
            type: 'get',
            url: 'TemplateContainer.json',
            success: function (data) {
                candidateDetail.template = data.QUA;
            }
        });
    },
    ComponentRoleGroupConfiguration: function () { /*This method is used to configure based on role group*/
        candidateDetail.template = candidateDetail.template[(roleGroupId == 2 ? 2 : 6)];
//        if (roleGroupId != 2) {
//            $('#Exp_info_div').empty();
//        }
        if (roleGroupId == 2) {
            candidateDetail.DrawComponentConfiguration();  
        }
        $('#Exp_info_div').show();
        $('#rel_Exp').text(candidateDetail.utiltiesRef.RelevantExperience);
        $('#total_Exp').text(candidateDetail.utiltiesRef.TotalExperience);
        candidateDetail.DrawComponentHTML();
        candidateDetail.CreateJsonTags();
        candidateDetail.GetDropDownData(candidateDetail.utiltiesRef);
        candidateDetail.BindComponentData(0);
        candidateDetail.CreateOthersTextField();
        candidateDetail.CreateDateComparisonField();
        candidateDetail.ReSizeContainer();
    },
    CreateJsonTags: function () {
        candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER] = candidateDetail.returnData.CompDetail;
    },
    DrawComponentConfiguration: function () {
        var html = "";
        $(candidateDetail.returnData.ComponentList).each(function (i, val) {
            html += '<li class="items"><input type="checkbox" class="chkConfig" id="' + val.Code + '_' + val.BuId + '_' + val.TypeGroup + '_' + val.CompDetailId + '_' + i + '" ' + jQXB.JQXB_DATASOURCE_ATTR + '="' + candidateDetail.TYPE_ATTR_DATASOURCE + '" ' + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + '="' + val.Code + '" ' + jQXB.JQXB_BINDEDATTRIBUTE_ATTR + ' ="checked"/>&nbsp;<label>' + val.CompDesc + '</label>';
            if ($.trim(val.Code) == 'EMPPR') {
            prevemp = val.Code + '_' + val.BuId + '_' + val.TypeGroup + '_' + val.CompDetailId + '_' + i ;
                html += '&nbsp;<img id="add_PrevEmp" src="' + candidateDetail.imgPath + 'add_linkicon.png" style="vertical-align:middle;cursor:pointer;" />';
            }
             if ($.trim(val.Code) == 'EMPCR') {
            curremp = val.Code + '_' + val.BuId + '_' + val.TypeGroup + '_' + val.CompDetailId + '_' + i ;
                   }
            html += '</li>';
            candidateDetail.typechks[val.Code] = false;
        });
        $('#div_componentList').empty().append('<ul class="ul-chkConfig">' + html + '</ul>');
    },
   DrawComponentHTML: function () {
        var html = "";
        $(candidateDetail.returnData.CompDetail).each(function (i, val) {
            if (val.Code == "EMPPR" && val.ComponentRunnerId == 0) {
                $('#EMPPR_0').hide();
            }
            html += candidateDetail.DesignComponentHTML(i, val, 0);
            
            candidateDetail.verificationObject[i] = { 'Verification': [val.IsMismatchIdentifiedFrom, val.IsMismatchIdentifiedTo, val.IsOverLapIdentified, val.IsGapIdentified] };
        });
        var list = {};
        list["chk"] = candidateDetail.suspectChks;
        $('#div_componentContianer').empty().append(html);
        $('label#EMPPR_0').hide();
        candidateDetail.ReSizeContainer();
        candidateDetail.CheckSuspectComponent();
        $.each(candidateDetail.verificationObject, function (i, val) {
            candidateDetail.DrawVeficationContainer('subContainerDiv_' + i, val.Verification);
        });
    },
    DesignComponentHTML: function (i, val, fnMode) {
        var strHTML = "", html = "", dataFiled = "";
        //if (roleGroupId == 2) {
            strHTML += '<div>';
            strHTML += '<ul class="doc_head"><li style="width:5%;"></li><li>Document Name</li><li>Mandatory</li><li>Remarks</li></ul><ul class="doc_list">';
            candidateDetail.GetDocumentListData(2, val.Code, val.ComponentRunnerId);
            $(candidateDetail.docData.DocList).each(function (j, doc) {
                strHTML += '<li class="chkboxWidth"><input type="checkbox" class="IsDefault docChk ' + (doc.CustomType == 2 ? "customChk" : "") + '" id="IsDefault' + i + j + '"  ' + jQXB.JQXB_DATASOURCE_ATTR + '="' + candidateDetail.DOC_ATTR_DATASOURCE + '" ' + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + '="DOM_' + i + '_' + j + '.IsDefault" ' + jQXB.JQXB_BINDEDATTRIBUTE_ATTR + '="checked"/></li>';
                strHTML += '<li><label for="IsDefault' + i + j + '"  ' + jQXB.JQXB_DATASOURCE_ATTR + '="' + candidateDetail.DOC_ATTR_DATASOURCE + '">' + doc.DocName + '</label></li>';
                strHTML += '<li><input type="checkbox" class="IsMandatory docChk" ref="IsDefault' + i + j + '"  ' + jQXB.JQXB_DATASOURCE_ATTR + '="' + candidateDetail.DOC_ATTR_DATASOURCE + '" ' + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + '="DOM_' + i + '_' + j + '.IsMandatory" ' + jQXB.JQXB_BINDEDATTRIBUTE_ATTR + '="checked"/></li>';
                strHTML += '<li><input type="text" class="txtbox"   ' + jQXB.JQXB_DATASOURCE_ATTR + '="' + candidateDetail.DOC_ATTR_DATASOURCE + '" ' + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + '="DOM_' + i + '_' + j + '.Remarks"/></li>';
                candidateDetail.docChecks['DOM_' + i + '_' + j] = { "IsDefault": doc.IsDefault, "IsMandatory": doc.IsMandatory, "Remarks": doc.Remarks, "DocMatrixId": doc.DocMatrixId, "CompDetailId": val.CompDetailId, "CompRunnerId": val.ComponentRunnerId, "DocumentValue": doc.DocumentValue };
                if (doc.IsDefault && doc.CustomType == 2) {
                    dataFiled += candidateDetail.CustomTypeTag('', '', doc.DocName, doc.IsMandatory, "DOM_" + i + '_' + j + ".DocumentValue", 0);
                }
            });
            strHTML += '</ul></div>';
       // }
        if ($.isEmptyObject(candidateDetail.template))
            candidateDetail.GetComponentTemplate();
        html += candidateDetail.template[val.BuId][val.Code];
        html = html.replace(/@JQComId@/g, i).replace(/@DocList@/g, strHTML).replace('@className@', 'DIV' + val.Code + ' ' + val.Code + '_' + val.ComponentRunnerId).replace('@bottomPanel@', dataFiled).replace('@delete@', val.Code + '_' + val.ComponentRunnerId).replace(/@rnId@/g, (val.ComponentRunnerId == 0 ? '' : val.ComponentRunnerId));
        //        html += "<div class='verficationBox'/>";
        candidateDetail.typechks[val.Code] = true;
        if (val.SuspectStatus == 1 || val.SuspectStatus == 2 || val.SuspectStatus == 3) {
            candidateDetail.suspectChks[i] = { "Status": val.SuspectStatus, "id": val.Code + '_' + val.ComponentRunnerId, "jQXBArrId": i };
        }
        return html;
    },
    DrawVeficationContainer: function (obj, verArr) {
        if (verArr[0]) {
            $('.verfication_info').hide();
            $('[ref =' + obj + ']').show();
            $('[ref =' + obj + ']').find('.misMatchFrom').show();
            $('[ref =' + obj + ']').find('.misMatchFrom').next().show();
        }
        if (verArr[1]) {
            $('.verfication_info').hide();
            $('[ref =' + obj + ']').show();
            $('[ref =' + obj + ']').find('.misMatchTo').show();
            $('[ref =' + obj + ']').find('.misMatchTo').next().show();
        }
        if (verArr[2]) {
            $('.verfication_info').hide();
            $('[ref =' + obj + ']').show();
            $('[ref =' + obj + ']').find('.overLapVer').show();
            if (!$('[ref =' + obj + ']').find('.verfication_info').is(':visible'))
                $('[ref =' + obj + ']').find('.overLapVer').next().show();
        }
        if (verArr[3]) {
            $('.verfication_info').hide();
            $('[ref =' + obj + ']').show();
            $('[ref =' + obj + ']').find('.gapVer').show();
            if (!$('[ref =' + obj + ']').find('.verfication_info').is(':visible'))
                $('[ref =' + obj + ']').find('.gapVer').next().show();
        }

    },
    ReSizeContainer: function () { /*This function is used to resize the container*/
        $('#div_componentContianer').resize(function () {
            $('.subContainer').each(function (i) {
                var $obj = $(this), $leftPanel = $(this).find('.leftPanel'), $rightPanel = $obj.find('.rightPanel'), $leftPanelHeight = $leftPanel.height(), $bottomPanel = $obj.find('.bottompanel');
                $rightPanel.height($leftPanelHeight);
                if ($bottomPanel.find('ul').children().length != 0) {
                    $bottomPanel.css('display', 'inline-block').find('ul').height(($bottomPanel.find('ul').children().length / 2) * 44);
                }
                $rightPanel.find('div ul:last').height($leftPanelHeight - 35).css('overflow-y', 'scroll');
                $obj.height($leftPanelHeight + $bottomPanel.height() + 52);
                $obj.attr('order-id', i);
            })
        }).resize();
    },
    CheckSuspectComponent: function () { /*This function is used to draw suspect*/
        $(candidateDetail.suspectChks).each(function (i, val) {
            if (val != undefined) {
                candidateDetail.DrawSuspectComponent(val);
                $('.' + val["id"] + ' .leftPanel').find('.mandatory').each(function () {
                    $(this).removeClass('mandatory');
                });
            }
        });
    },
    DrawSuspectComponent: function (obj) {
        var $leftContainer = "", $bottomContainer = "", $this = "", $bottomOverLay = obj["id"] + '-btPanel', $leftOverLay = obj["id"] + '-ltPanel';
        $this = $('.' + obj["id"]);
        $leftContainer = $this.find('.leftPanel');
        $bottomContainer = $this.find('.bottompanel');
        $('.' + $leftOverLay).remove();
        $leftContainer.closest('.leftPanel').find('.autoComplete').attr('disabled',true);
        $('.' + $bottomOverLay).remove();
        $('.' + obj["id"] + 'ContentWrapper').remove();
        var $backgroundOverLayLeftPanel = $('<div class="overLay ' + $leftOverLay + '"/>');
        var $backgroundOverLayBottomPanel = $('<div class="overLay ' + $bottomOverLay + '"/>');
        $leftContainer.prepend($backgroundOverLayLeftPanel);
        $bottomContainer.prepend($backgroundOverLayBottomPanel);
        $(".overLay").css({
            opacity: 0.7,
            display: 'inline-block',
            position: 'absolute'
        });
        var $popupData = $('<div class="' + obj["id"] + 'ContentWrapper" style="z-index:999999;" />').html(candidateDetail.GetSuspectTemplate(obj["Status"], obj["id"], obj["jQXBArrId"]));
        $leftContainer.prepend($popupData);
        $('.' + obj["id"] + 'ContentWrapper').css({
            height: $leftContainer.height(),
            position: "absolute"
        })
        $("." + $leftOverLay).css({
            width: $leftContainer.width(),
            height: $leftContainer.height()
        });
        $("." + $bottomOverLay).css({
            width: $bottomContainer.width(),
            height: $bottomContainer.height()
        });
        //     candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.COMP_ATTR_DATAMEMBER + '.' + obj.jQXBArrId + '.SuspectStatus', obj.Status, false);
    },
    GetSuspectTemplate: function (status, Class, jQXBArrId) {
        var popupContent = '';
        popupContent += '';
        popupContent += '<table align="center" border="0" cellspacing="0" cellpadding="0" style="position:absolute;*margin-left:-50px;margin-left:50px;margin-top:20px;padding-left:10px;background-color:white;">';
        popupContent += '<tr><td colspan=3><div><div style="height: 35px; background-image: url(../../Images/important.gif); background-repeat: no-repeat; background-color: white;width:35px; float: left;"></div><div style="font-size: 14px; font-weight: bold; width: 300px; line-height: 35px;">Suspect component found</div></div></td></tr>'
        popupContent += '<tr style="height:3px;"></tr>';
        if (status == 1) {
            /* Found suspect and show Request controls */
            popupContent += '<tr><td colspan=3>Click on <strong>Queue Email Request</strong> and proceed checking other components by saving the page.<br /> To send a consolidated email to recruiter navigate to Document upload & verification tab and click on <strong>Request document</strong>.<br /> To submit and proceed further please <strong>Cancel Suspect Status</strong> or <strong>Unlock Suspect Status</strong></td></tr>';
            popupContent += '<tr><td colspan=1></td><td align="left"><input type="button" class="repeater setsuspect"  source="' + jQXBArrId + '.SuspectStatus" ref="' + Class + '" value="Queue Email Request" SStatus="2" style="width:auto;padding:4px;"></td>';
            popupContent += '<td align="left"><input type="button" class="repeater setsuspect" value="Cancel"  SStatus="5" source="' + jQXBArrId + '.SuspectStatus" ref="' + Class + '"  style="width:auto;padding:4px;"></td></tr>';

        }
        if (status == 4) {
            /* Raise suspect and lock controls */
            popupContent += '<tr><td colspan=3>Additional information requested by <strong ' + jQXB.JQXB_DATASOURCE_ATTR + '="' + candidateDetail.COMP_ATTR_DATASOURCE + '" ' + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + '="' + candidateDetail.COMP_ATTR_DATAMEMBER + '.' + jQXBArrId + '.SuspectRaisedBy" ' + jQXB.JQXB_BINDEDATTRIBUTE_ATTR + '="text"></strong></td></tr>';
            popupContent += '<tr><td colspan=3>To send a consolidated email to recruiter navigate to Document upload & verification tab and click on <strong>Request document</strong>.<br /> To submit and proceed further please <strong>Cancel Suspect Status</strong> or <strong>Unlock Suspect Status</strong></td></tr>';
            popupContent += '<tr><td colspan=3 align="center"><input type="button" class="repeater setsuspect"  source="' + jQXBArrId + '.SuspectStatus"  SStatus="4" ref="' + Class + '" value="Unlock"></td></tr>';
        }

        popupContent += '<tr style="height:10px;"></tr></table>';
        return popupContent;
    },
    GetDocumentListData: function (mode, code, rnId) {
        var data = "{";
        data += "'candidateId' :" + candidateId.toString() + ",";
        data += "'mode' :" + mode + ",";
        data += "'code':'" + code + "',";
        data += "'comRunnerId':'" + rnId + "'";
        data += "}";
        try {
            $.ajax({
                url: candidateDetail.urlPath + 'BGVService.aspx/GetComponentData',
                data: data,
                success: function (msg) {
                    candidateDetail.docData = JSON.parse(msg.d);
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error " + xhr.status + " " + textRemarks);
                }
            });
        }
        catch (e) {
            candidateDetail.ErrorTrace(e);
        }
    },
    GetMaster: function (masterCode, dataSourceList) {
        var data = "{";
        data += "'sessionId':" + sessionId.toString() + ",";
        data += "'parentCode':'" + masterCode + "'";
        data += "}";
        $.ajax({
            url: candidateDetail.urlPath + "FormsService.aspx/GetMaster",
            data: data,
            success: function (msg) {
                jQXB.setDataSource(dataSourceList, msg.d).doBind(dataSourceList);
            },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
    },
    /* Function to Get Geography master */
    GetGeographyMaster: function (mode, parentId, dataSourceList) {
        var data = "{";
        data += "'mode':" + mode.toString() + ",";
        data += "'candidateId':" + candidateId + ",";
        data += "'parentcode':" + parentId.toString();
        data += "}";
        $.ajax({
            url: candidateDetail.urlPath + "FormsService.aspx/GetGeographyMaster",
            data: data,
            success: function (msg) {
                jQXB.setDataSource(dataSourceList, msg.d).doBind(dataSourceList);
            },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
    },
    GetDropDownData: function (data) {
        candidateDetail.GetMaster(data.ModeofEducation, 'ModeofEducation');
        candidateDetail.GetMaster(data.EmpTypeList, 'EmpTypeList');
        candidateDetail.GetGeographyMaster(data.DegreeList, 0, 'DegreeList');
    },
    BindComponentData: function (fnMode) {
        try {
            if (fnMode == 0) { /*This is initialization*/
                jQXB.setDataSource(candidateDetail.TYPE_ATTR_DATASOURCE, candidateDetail.typechks).doBind(candidateDetail.TYPE_ATTR_DATASOURCE);
            }
            jQXB.setDataSource(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.bindData).doBind(candidateDetail.COMP_ATTR_DATASOURCE);
            jQXB.setDataSource(candidateDetail.DOC_ATTR_DATASOURCE, candidateDetail.docChecks).doBind(candidateDetail.DOC_ATTR_DATASOURCE);
        }
        catch (e) {
            candidateDetail.ErrorTrace(e);
        }
    },
    RearrangeComponents: function () {
        $('.chkConfig').filter(':checked').each(function (i) {
            var obj = $(this);
            var id = ('.DIV' + obj.attr('id').split('_')[0]);
            $(id).each(function () {
                $(this).attr('order-id', i);
               var clearHTML = $(this).next().detach()[0].outerHTML;
                var verficationHTML = $(this).next().detach()[0].outerHTML;
                var html = $(this).detach()[0].outerHTML;
                $('#div_componentContianer').append(html + clearHTML + verficationHTML);
            });
        });
    },
    SelectComponent: function (obj) {
        if (obj.is(':checked')) {
            var selElm = obj.attr('id').split('_'), currObj = {};
            currObj = JSON.parse(candidateDetail.compListTemplate);
            currObj.BuId = selElm[1];
            currObj.CompDetailId = selElm[3]
            currObj.TypeGroup = selElm[2]
            currObj.IsActive = true;
            currObj.Code = selElm[0];
            var containerArrPos = $('.subContainer').length;
            var PreEmpLen = $('.PE').length;
            candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][containerArrPos] = currObj;
            var html = candidateDetail.DesignComponentHTML(containerArrPos, currObj, 1);
            $('#div_componentContianer').append(html);
            if (PreEmpLen == 0) {
                $('.delete').hide();
            }
            candidateDetail.ReSizeContainer();
           candidateDetail.RearrangeComponents();
            candidateDetail.GetDropDownData(candidateDetail.utiltiesRef);
            candidateDetail.BindComponentData();
            $('.DIV' + selElm[0]).focus();
        } else {
            $('.DIV' + obj.attr('id').split('_')[0]).each(function (i, val) {
                //     var memberArrIndex = $(val).find('input[type="text"]').attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR).split('.')[1];
                var memberArrIndex = $(val).attr('id').split('_')[1];
                candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.COMP_ATTR_DATAMEMBER + '.' + memberArrIndex + '.IsActive', false, true);
                $(val).remove();
            });
            $(candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER]).each(function (i, val) {
                if (val.Code == obj.attr('id').split('_')[0])
                    candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][i] = "";
                    ////$('#total_Exp').val("");
                   //// if(($('#EMPPR_5_2_13_5')[0].checked == false) && ( $('#EMPCR_5_2_12_6')[0].checked == false))
                    if(($('#'+prevemp+'')[0].checked == false) && ($('#'+curremp+'')[0].checked == false))
                    {
                    $('#total_Exp').text(0);
                    }
                   //// else if(($('#EMPPR_5_2_13_5')[0].checked == false) || ( $('#EMPCR_5_2_12_6')[0].checked == false))
                   else if(($('#'+prevemp+'')[0].checked == true ) || ($('#'+curremp+'')[0].checked == true))
                    {
                    candidateDetail.CalculateTotalExp();
                    }
//                    if( $('#EMPCR_5_2_12_6')[0].checked == false)
//                    {
//                    $('#total_Exp').text(0);
//                    }
            });
        }
    },
    CreateRunnerComponent: function (obj) {
        var selElm = obj.attr('id').split('_'), currObj = {};
        currObj = JSON.parse(candidateDetail.compListTemplate);
        currObj.BuId = selElm[1];
        currObj.CompDetailId = selElm[3]
        currObj.TypeGroup = selElm[2]
        currObj.IsActive = true;
        currObj.Code = selElm[0];
        currObj.ComponentRunnerId = $('.DIV' + selElm[0]).length;
        var containerArrPos = $('.subContainer').length;
        candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][containerArrPos] = currObj;
        var html = candidateDetail.DesignComponentHTML(containerArrPos, currObj, 1);
        $('#div_componentContianer').append(html);
        candidateDetail.ReSizeContainer();
        candidateDetail.RearrangeComponents();
        candidateDetail.GetDropDownData(candidateDetail.utiltiesRef);
        candidateDetail.BindComponentData();
        $('.DIV' + selElm[0]).focus();
    },
    ErrorTrace: function (e) {
        alert(e);
    },
    SetDataMemberVal: function (dataSource, dataMember, value, bindRequire) {
        jQXB.setmemberVarvalue(dataSource, null, dataMember, value, null);
        if (bindRequire)
            jQXB.doBind(dataSource);
    },
    ReplaceTagVal: function (tagName, Key, Value) {
        return tagName[Key] = Value;
    },
    AutoComplete: function (obj, e) {
        if ($(obj).val().length > 2) {
            $.ajax({
                url: candidateDetail.urlPath + "BGVService.aspx/AutoSearch",
                data: "{'value':'" + $(obj).val() + "','type':" + candidateDetail.bindData.CompDetail[$(obj).attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR).split('.')[1]].TypeGroup + "}",
                success: function (data) {
                    candidateDetail.AutoCompleteContainer(obj, data.d, e);
                }
            })
        } else {
            $('ul#ui-auto-complete').remove();

        }
    },
    AutoCompleteContainer: function (obj, data, e) {
       $('ul#ui-auto-complete').remove();
        var $position = $(obj).position();
        if (data.length != 0) {
            var auto = $(data).map(function (i, val) { 
            return '<li id="' + val.ItemId + '" class="' + (i == 0 ? 'li_select' : '') + '" s-chk="' + val.SChk + '">' + val.ItemVal + '</li>'; 
            }).get().join('');
            $(obj).after('<ul id="ui-auto-complete">' + auto + '</ul>');
            // 
            candidateDetail.autocompleteReset = 0;
        } else {
            candidateDetail.autocompleteReset = 1;
            $(obj).after('<ul id="ui-auto-complete">No options</ul>');
            $(obj).closest('div.subContainer').find('.autoComplete').val('') ;
        }
        $('#ui-auto-complete').css({
            'margin-left': $position.left + 'px',
            'top': $position.top + 25 + 'px'
        }).fadeIn("fast");
        $('ul#ui-auto-complete').mouseleave(function() { $(obj).closest('div.subContainer').find('.autoComplete').val('')});
    },
    SaveCompData: function (mode) {
         var retStatus = false;
        candidateDetail.Process(true);
        jQXB.doBind(candidateDetail.COMP_ATTR_DATASOURCE);
        jQXB.doBind(candidateDetail.DOC_ATTR_DATASOURCE);
        jQXB.doBind(candidateDetail.TYPE_ATTR_DATASOURCE);
        var compData = {};
        compData["CompDetail"] = $.grep(jQXB.getDataSource(candidateDetail.COMP_ATTR_DATASOURCE).CompDetail, function (i, val) { return i != "" });
        docData = jQXB.getDataSource(candidateDetail.DOC_ATTR_DATASOURCE);
        compData = (JSON.stringify(compData).toString()).replace(/\\n/g, " ").replace(/\\/g, "\\\\").replace(/'/g, "\\\'");
        docData = (JSON.stringify(docData).toString()).replace(/\\n/g, " ").replace(/\\/g, "\\\\").replace(/'/g, "\\\'");
        var data = "{";
        data += "'candidateId':" + candidateId + ",";
        data += "'compData':'" + compData + "',";
        data += "'docData':'" + docData + "',";
        data += "'compConfig':'" + JSON.stringify(jQXB.getDataSource(candidateDetail.TYPE_ATTR_DATASOURCE)).toString() + "',";
        data += "'mode':" + mode + ",";
        data += "'totalExp':" + ($.trim($('#total_Exp').text()));
        data += "}";
        try {
            $.ajax({
                url: candidateDetail.urlPath + 'BGVService.aspx/SaveComponentData', 
                data: data,
                success: function (msg) {
                    //    candidateDetail.docData = JSON.parse(msg.d);
                    candidateDetail.Intialize();
                    candidateDetail.Process(false);
                    retStatus = true;
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error " + xhr.status + " " + textRemarks);
                    retStatus = false;
                }
            });
        }
        catch (e) { }
        return retStatus
    },
    DatePicker: function (cDate, cMon, cYr, yrStart) {
        var monthRange = (cMon == 2 && cYr % 4 == 0) ? 29 : candidateDetail.monthDayObj[cMon - 1];
        var $yr = "", $mon = "", $day = "", $dateTD = "", $dateTH = "";
        //        $(candidateDetail.monthNamesShort).each(function (i, val) {
        //            if (cMon == i + 1) {
        //                $mon += '<option id="mon_' + i + '" selected="selected">' + (roleGroupId == 2 ? val : i + 1) + ' </option>';
        //                if (cYr == $CurrentYr)
        //                    return false;
        //            }
        //            else {
        //                $mon += '<option id="mon_' + i + '">' + (roleGroupId == 2 ? val : i + 1) + ' </option>';
        //                if (i == $CurrMonth)
        //                    return false;
        //            }
        //        });
        for (var i = 0; i < 12; i++) {
            if (cMon == i + 1)
                $mon += '<option value="' + (i + 1) + '" selected="selected">' + (roleGroupId == 2 ? candidateDetail.monthNamesShort[i] : i + 1) + ' </option>';
            else
                $mon += '<option value="' + (i + 1) + '">' + (roleGroupId == 2 ? candidateDetail.monthNamesShort[i] : i + 1) + ' </option>';
            if (cYr == $CurrentYr && i + 1 == $CurrMonth)
                break;
        };

        for (; yrStart <= $CurrentYr; yrStart++) {
            if (cYr == yrStart)
                $yr += '<option value="' + yrStart + '" selected="selected" >' + yrStart + '</option>';
            else
                $yr += '<option value="' + yrStart + '">' + yrStart + '</option>'
        };
        //        if (roleGroupId != 2) {
        //            for (var d = 1; d <= monthRange; d++) {
        //                if (cDate == d) {
        //                    $day += '<option id="yr_' + d + '" selected="selected" >' + d + ' </option>';
        //                    if (cYr == $CurrentYr && cMon == $CurrMonth && d == cDate)
        //                        break;
        //                }
        //                else
        //                    $day += '<option id="yr_' + d + '">' + d + ' </option>'
        //            };
        //            $dateTD = '<td><select>' + $day + '</select></td>';
        //            $dateTH = '<th>Day</th>';
        //        }

        var $datePicker = '<table class="ui-date_picker" cellpadding="0" cellspacing="0" width="100%" >';
        $datePicker += '<thead><tr class="ui-border"><th>Month</th>' + $dateTH + '<th>Year</th></tr></thead>';
        $datePicker += '<tr class="ui-border"><td><select>' + $mon + '</select>' + $dateTD + '</td><td><select>' + $yr + '</select></td></tr>';
        if (roleGroupId == 2) {
            $datePicker += '<tr class="ui-btn"><td><button class="ui-cancel">Cancel</button>&nbsp;&nbsp;</td><td><button class="ui-done">Done</button></td></tr>';
        }
        $datePicker += '</tbody></table>';
        if (roleGroupId != 2) {
            $datePicker += '<tr><table width="100%" class="ui-calendar" cellpadding="0" cellspacing="0">';
            $datePicker += '<thead><tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></thead><tbody>'
            for (var i = 0; i < 6; i++) {
                $datePicker += '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
            }
            $datePicker += '</tbody></table></tr>';
        }
        return $datePicker
    },
    CalculateCalender: function ($Date, $Mon, $year) { // manual datepicker for NH
        var startDate = new Date($year, $Mon, 1, 0, 0, 0, 0, 0);
        var $StartDate = startDate.getDay(), $StartDat = 1;
        $StartDate = ($StartDate == 0 ? 7 : $StartDate);
        candidateDetail.monthDayObj[1] = ($year % 4 == 0 ? 29 : 28);
        $('table.ui-calendar tbody tr td').empty();
        for (; $StartDat <= candidateDetail.monthDayObj[$Mon]; $StartDat++) {
            $('table.ui-calendar tbody tr td').eq($StartDate).text($StartDat);
            ++$StartDate;
            if ($StartDate == $date.getDate() + 1 && $CurrMonth == $Mon + 1 && $CurrentYr == $year)
                break;
        }
    },
    CustomTypeTag: function (JQCurrElm, cloneDiv, docName, manChk, dataMember, mode) { // To draw customtype datafields
        if (mode == 0) {
            var cusHtml = "";
            var manHtml = (manChk == true) ? '<span class="mandatoryLabel">*</span>' : '';
            if((manChk == true) && (roleGroupId == 6 || roleGroupId == 1))
            {cusHtml += '<li><label for="' + docName.replace(/\W/g, '_')+'_'+dataMember.split('.')[0].replace('DOM_','').replace('_','') + '">' + manHtml + '&nbsp;' + docName + '</label><input type="text" class="txtbox onlyAlphanumeric mandatory" maxlength="45" title="Employee id" id="' + docName.replace(/\W/g, '_')+'_'+dataMember.split('.')[0].replace('DOM_','').replace('_','') + '" jqxb-datasource="' + candidateDetail.DOC_ATTR_DATASOURCE + '" jqxb-datamember="' + dataMember + '"/></li>';}
            else {cusHtml += '<li><label for="' + docName.replace(/\W/g, '_')+'_'+dataMember.split('.')[0].replace('DOM_','').replace('_','') + '">' + manHtml + '&nbsp;' + docName + '</label><input type="text" class="txtbox onlyAlphanumeric"  maxlength="45"  title="Employee id" id="' + docName.replace(/\W/g, '_')+'_'+dataMember.split('.')[0].replace('DOM_','').replace('_','') + '" jqxb-datasource="' + candidateDetail.DOC_ATTR_DATASOURCE + '" jqxb-datamember="' + dataMember + '"/></li>';}
            return cusHtml;
        } else {
            var dataMember = JQCurrElm.attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR).split('.');
            var selCustomTag =  '_'+dataMember[0].replace('DOM_','').replace('_','');
            dataMember[1] = "Remarks";
            var a = {}; a[[dataMember[1]]] = "";
            dataMember = dataMember.join('.');
            if (JQCurrElm.is(':checked')) {
                html = "";
                var manHtml = (manChk == true) ? '<span class="mandatoryLabel">*</span>' : '';
                manHtml += '&nbsp;' + docName;
                if ($('label[for="' + docName.replace(/\W/g, '_')+selCustomTag + '"]').length == 0) {
                    html += '<li><label for="' + docName.replace(/\W/g, '_')+selCustomTag + '">' + manHtml + '</label>' + $('[jqxb-datamember="' + dataMember + '"]')[0].outerHTML + '</li>';
                    $(html).appendTo(cloneDiv);
                } else {
                    $('label[for="' + docName.replace(/\W/g, '_')+selCustomTag + '"]').html(manHtml);
                }
            } else {
                $('label[for=' + docName.replace(/\W/g, '_')+selCustomTag + ']').parent().remove();
                if (JQCurrElm.closest('div.subContainer').find('.bottompanel').find('ul').children().length == 0) {
                    JQCurrElm.closest('div.subContainer').find('.bottompanel').find('ul').height(0);
                }
            }

            if (JQCurrElm.closest('div.subContainer').find('.bottompanel').find('ul').children().length % 2 != 0 && JQCurrElm.closest('div.subContainer').find('.bottompanel').find('ul').children().length != 0) {
                //                $(window).resize(function () {
                //                    JQCurrElm.closest('div.subContainer').each(function () {
                //                        var $obj = $(this), $bottomPanel = $obj.find('.bottompanel');
                //                        // $obj.height($obj.height()+22);
                //                        $bottomPanel.find('ul').height(($bottomPanel.find('ul').children().length / 2) * 44);
                //                        $leftPanel = $obj.find('.leftPanel'), $leftPanelHeight = $leftPanel.height();
                //                        $obj.height($leftPanelHeight + $bottomPanel.height() + 52);
                //                        return false;
                //                    })
                //                }).resize();
                candidateDetail.ReSizeContainer();
            }
        }
    },
    DeleteComponentData: function (arrId, deletedComponentId) {
        candidateDetail.Process(true);
        //dataMember = dataMember.split('.');
        candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][arrId] = "";
        //   candidateDetail.bindData[dataMember[0]] = $.grep(candidateDetail.bindData[dataMember[0]], function (v, i) { return v != '' });
        //  candidateDetail.RearrangeRunnerId(deletedComponentId);
        candidateDetail.DeleteDocumentData($('.' + deletedComponentId).find('.rightPanel ul li:last input[type="text"]').attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), deletedComponentId.split('_'));

    },
    DeleteDocumentData: function (dataMember, deletedComponentId) {
        dataMember = dataMember.split('.')[0].split('_');
        for (var i = 0; i <= dataMember[2]; i++) {
            //candidateDetail.docChecks.remove('DOM_' + deletedComponentId[1] + '_' + i);            
            candidateDetail.docChecks['DOM_' + deletedComponentId[1] + '_' + i] = "";
        };
        $('.' + deletedComponentId.join('_')).next().remove();
        $('.' + deletedComponentId.join('_')).next().remove();
        $('.' + deletedComponentId.join('_')).remove();
        candidateDetail.ChangeRunnerId(dataMember, deletedComponentId);
    },
    ChangeRunnerId: function (dataMember, deletedComponentId) {
        try {
            var runnerId = deletedComponentId[1];
            $('.DIV' + deletedComponentId[0]).each(function (i, val) {
                var obj = $(this);
                if (i >= deletedComponentId[1]) {
                    var newClass = deletedComponentId[0] + '_' + runnerId;
                    $('#' + deletedComponentId[0] + '_' + (i + 1)).attr('id', newClass);
                    candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, 'CompDetail.' + i + '.ComponentRunnerId', runnerId, true);
                    for (var j = 0; j <= dataMember[2]; j++) {
                        candidateDetail.SetDataMemberVal(candidateDetail.DOC_ATTR_DATASOURCE, 'DOM_' + i + '_' + j + '.CompRunnerId', runnerId, true);
                    }
                    obj.removeClass(deletedComponentId[0] + '_' + (i + 1)).addClass(newClass);
                    runnerId++;
                    var headerTxt = obj.find('.header span').text();
                    obj.find('.header span').text(headerTxt.substr(0, headerTxt.length - 2) + ' ' + i);
                }
            });
            candidateDetail.BindComponentData();
            candidateDetail.Process(false);
        }
        catch (e) {
            candidateDetail.ErrorTrace(e);
        }
    },
    Process: function (mode) {
        if (mode) {
            var spinnerHTML = '<a id="spinner" style="position:absolute;z-index:99999;top:300px;left:400px;display:block;"><img src="' + candidateDetail.imgPath + 'spinner_1.gif" /></a>';
            $('body').append(spinnerHTML);
        } else {
            $('body #spinner').remove();
        }
    },
    SetIsDefaultValue: function (obj) { /* This function is used to set the default checks */
        var id = obj.attr('id');
        $('input[ref="' + id + '"]').attr('checked', false);
        candidateDetail.SetDataMemberVal(candidateDetail.DOC_ATTR_DATASOURCE, $('input[ref=' + id + ']').attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), false, false);
        if (obj.hasClass('customChk')) {
            candidateDetail.CustomTypeTag(obj, obj.closest('div.rightPanel').next().show().find('ul'), $('label[for="' + id + '"]').text(), $('input[ref="' + id + '"]').is(':checked'));
        }
    },
    SetIsMandatoryValue: function (obj) { /* This function is used to set the mandatory checks */
        var ref = obj.attr('ref');
        candidateDetail.SetDataMemberVal(candidateDetail.DOC_ATTR_DATASOURCE, $('#' + ref).attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), true, false);
        $('#' + ref).attr('checked', true);
        if ($('#' + ref).hasClass('customChk')) {
            candidateDetail.CustomTypeTag($('#' + ref), $('#' + ref).closest('div.rightPanel').next().show().find('ul'), $('label[for="' + ref + '"]').text(), obj.is(':checked'));
        }
    },
    CreateOthersTextField: function () {
        $('.autoComplete').each(function () {
            var obj = $(this), val = "";
            if (roleGroupId == 2)
                val = obj.val();
            else
                val = obj.text();
            if ($.trim(val.toLowerCase()) == "others") {
                obj.siblings('.otherTxt').show().addClass('mandatory');
                obj.parent().addClass('compare');
            }
            if (obj.parent().next().find('select.empType').length != 0) {
                candidateDetail.EmployementType(obj.parent().next().find('select.empType'));
            }
            if (obj.parent().parent().find('select.specType').length != 0) {
                candidateDetail.SpecializationType(obj.parent().parent().find('select.specType'));
            }
        });
    },
    SetAutocompleteVal: function (e, obj, fnMode) {
        if (fnMode == 0) {
          var keyCode = e.which || e.keyCode;
            if ((keyCode == 38 || keyCode == 40) && ($('#ui-auto-complete').length != 0)) {
                var index = $('#ui-auto-complete li.li_select').index();
                if (keyCode == 40) { index += 1; } else { index -= 1; }
                if (index != -1 && index != $('#ui-auto-complete li').length) {
                    $('#ui-auto-complete li').removeClass('li_select');
                    $('#ui-auto-complete li:eq(' + index + ')').addClass('li_select');
                }
                $('#ui-auto-complete').scrollTop(index * 25);
            }
            else if (keyCode == 13 && $('#ui-auto-complete li.li_select').length != 0) {
                candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.COMP_ATTR_DATAMEMBER + '.' + $(obj).attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR).split('.')[1] + '.InstitutionId', $('#ui-auto-complete li.li_select').attr('id'), false);
                candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, $(obj).attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), $('#ui-auto-complete li.li_select').text(), false);
                $(obj).val($('#ui-auto-complete li.li_select').text());
                var sChk = $('#ui-auto-complete li.li_select').attr('s-chk');
                if (sChk == 1 || sChk == 2 || sChk == 3) {
                    var container = $(obj).closest('.subContainer');
                    var arrId = container.attr('id').split('_')[1];
                    candidateDetail.suspectChks[arrId] = { "Status": sChk, "id": container.attr('class').split(' ')[2], "jQXBArrId": arrId };
                    candidateDetail.DrawSuspectComponent(candidateDetail.suspectChks[arrId]);
                    candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.COMP_ATTR_DATAMEMBER + '.' + candidateDetail.suspectChks[arrId]["jQXBArrId"] + '.SuspectStatus', candidateDetail.suspectChks[arrId]["Status"], false);
                }
                $('ul#ui-auto-complete').remove();
                if ($.trim($(obj).val().toLowerCase()) == "others") {
                    $(obj).siblings('.otherTxt').show().addClass('mandatory');
                    $(obj).parent().addClass('compare');
                } else {
                    $(obj).siblings('.otherTxt').hide().removeClass('mandatory');
                    $(obj).parent().removeClass('compare');
                    if ($(obj).siblings('.otherTxt').attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR) != undefined) {
                        candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, $(obj).siblings('.otherTxt').attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), "", true);
                    }
                }
            }
            else if (keyCode == 13 && $('#ui-auto-complete li.li_select').length == 0) {
                candidateDetail.ResetAutocompleteTxtField($(obj));
            }
            else {
                candidateDetail.AutoComplete(obj, e);
            }
        }
        if (fnMode == 1) {
            var JqCurElm = $(obj), JqCurDataMemberArr = "", JqCurDataMember = "";
            JqCurDataMemberArr = JqCurElm.closest('.subContainer').find('input.autoComplete').attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR).split('.');
            JqCurDataMemberArr[2] = 'InstitutionId';
            JqCurDataMember = JqCurDataMemberArr.join('.');
            JqCurElm.parent().parent().find('input.autoComplete').val(JqCurElm.text());
            candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, JqCurElm.closest('.subContainer').find('input.autoComplete').attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), JqCurElm.text(), false);
            candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, JqCurDataMember, JqCurElm.attr('id'), false);
            var sChk = JqCurElm.attr('s-chk');
            if (sChk == 1 || sChk == 2 || sChk == 3) {
                var container = $(obj).closest('.subContainer');
                //                var arrId = container.find('input').eq(0).attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR).split('.')[1];
                var arrId = container.attr('id').split('_')[1];
                candidateDetail.suspectChks[arrId] = { "Status": sChk, "id": container.attr('class').split(' ')[2], "jQXBArrId": arrId };
                candidateDetail.DrawSuspectComponent(candidateDetail.suspectChks[arrId]);
                candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.COMP_ATTR_DATAMEMBER + '.' + candidateDetail.suspectChks[arrId]["jQXBArrId"] + '.SuspectStatus', candidateDetail.suspectChks[arrId]["Status"], false);
            }
            if ($.trim($(obj).text().toLowerCase()) == "others") {
                $('ul#ui-auto-complete').siblings('.otherTxt').show().addClass('mandatory');
                $('ul#ui-auto-complete').parent().addClass('compare');
            } else {
                $('ul#ui-auto-complete').siblings('.otherTxt').hide().removeClass('mandatory');
                $('ul#ui-auto-complete').parent().removeClass('compare');
                if ($(obj).siblings('.otherTxt').attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR) != undefined) {
                    candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, $(obj).siblings('.otherTxt').attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), "", true);
                }
            }
            $('ul#ui-auto-complete').remove();
        }
    },
    ResetAutocompleteTxtField: function (obj) {
        if (candidateDetail.autocompleteReset == 1) {
            obj.val('');
            candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, obj.attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), '', false);
            candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.COMP_ATTR_DATAMEMBER + '.' + obj.attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR).split('.')[1] + '.InstitutionId', 0, false);
            obj.siblings('.otherTxt').hide().removeClass('mandatory');
            obj.parent().removeClass('compare');
            candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, obj.siblings('.otherTxt').attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), "", true);
            $('ul#ui-auto-complete').remove();
        }
    },
    EmployementType: function (obj) {
        if (parseInt($(obj).children('option:selected').val()) == 1 || $(obj).children('option:selected').val() == undefined) {
            $(obj).parent().next().hide().find('input[type="text"]').removeClass('mandatory');
            candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, $(obj).parent().next().find('input').attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), "", true);
        } else {
            $(obj).parent().next().show().find('input[type="text"]').addClass('mandatory');
        }
    },
    SpecializationType: function (obj) {
        if ($(obj).children('option:selected').val() == "OTH") {
            $(obj).parent().next().show().find('input[type="text"]').addClass('mandatory');

        } else {
            $(obj).parent().next().hide().find('input[type="text"]').removeClass('mandatory');
            candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, $(obj).parent().next().find('input').attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), "", true);
        }
    },
    CalculateTotalExp: function () {
        var totalExpTxt = 0;
        $('.calcDate').map(function () {
            var obj = $(this), toField = obj.attr('alt'), toVal = $.trim(obj.val()).replace(' ', ' 01, '); toDate = new Date(toVal);
            var fromField = $('input[ref=' + toField + ']'), fromVal = $.trim(fromField.val()).replace(' ', ' 01, '), fromDate = new Date(fromVal);
            if (toVal != "" && toVal != undefined && fromVal != "" && fromVal != undefined)
                totalExpTxt += (toDate.getFullYear() - fromDate.getFullYear()) * 12 + (toDate.getMonth() - (fromDate.getMonth() - 1))
            return totalExpTxt = (totalExpTxt <= 0 ? 0 : totalExpTxt);
        }).get();
        $('#total_Exp').text(totalExpTxt);
    },
    CalculateTotalExpNh: function () {
        var totalExpTxt = 0;
        $('.calcDateNh').map(function () {
            var obj = $(this), toField = obj.attr('alt'), toVal = $.trim(obj.val()); toDate = new Date(toVal);
            var fromField = $('input[ref=' + toField + ']'), fromVal = $.trim(fromField.val()), fromDate = new Date(fromVal);
            if (toVal != "" && toVal != undefined && fromVal != "" && fromVal != undefined)
                totalExpTxt += (toDate.getFullYear() - fromDate.getFullYear()) * 12 + (toDate.getMonth() - (fromDate.getMonth() - 1))
            return totalExpTxt = (totalExpTxt <= 0 ? 0 : totalExpTxt);
        }).get();
        $('#total_Exp').text(totalExpTxt);
    },
    TrackGap: function (dataMember) {
        var member = dataMember.split('.');
        if (member[2].toLowerCase().indexOf('from') > -1) {
            var data = candidateDetail.bindData.CompDetail[member[1]];
            if (data.ComponentRunnerId > 0 && data.TypeGroup == 2) {
                alert();
            }
        }
    },
    InformationBar: function (fnMode, msgContent, msgHeader) {
        $(".uploadContentWrapper").remove();
        $('.popUpOverLay').remove();
        // end
        var windowHeight = $(document).height();
        var windowWidth = $(document).width();
        var $backgroundOverLay = $('<div class="overLay popUpOverLay"/>');
        var windowLeft = (windowWidth / 3) + 'px';
        var windowTop = 50 + 'px';
        $('body').prepend($backgroundOverLay);
        $(".popUpOverLay").css({
            opacity: 0.7,
            display: 'inline-block',
            position: 'absolute',
            height: windowHeight - 20,
            width: windowWidth - 10
        });
        $(".popUpOverLay").hide(0).delay(200).fadeIn();
        var $popupContent = '<div id="popup_container1" style="position:relative;width:450px;vertical-align:middle;font-size:1.1em;margin-top:10px;" >';
        $popupContent += '<div id="pop_heading" style="height:30px;line-height:30px;background:#22506f;color:white;border-top-right-radius:8px;border-top-left-radius:8px;text-align:left;padding-left:10px">' + msgHeader + '</div>'
        $popupContent += '<div id="pop_comment" style="background:white;border:2px solid #22506f;border-bottom-right-radius:8px;border-bottom-left-radius:8px;padding-left:10px;padding-top:15px;line-height:1.2em;min-height:150px;max-height:250px;overflow-y:scroll;"><p>' + msgContent + '</p></div>';
        // if (alertType == 0) {
        $popupContent += '<input  value="Ok" type="button" class="action_btn" style="background:#efefef;color:#22506f;height:20px;font-weight:bold;cursor:pointer;text-align:center;border-radius:2px;margin-right:5px;float:left;padding-left:4px;padding-right:4px;margin-bottom:10px;margin-left:40%;"/>';
        //  }
        //$popupContent += '<input  value="Cancel" type="button"  returnVal="0" name="Cancel" class="action_btn" style="background:#22506f;color:white;height:20px;cursor:pointer;text-align:center;border-radius:2px;padding-left:4px;padding-right:4px;margin-bottom:10px;"/>';
        $popupContent += '</div>';
        var $popupData = $('<div class="uploadContentWrapper" style="z-index:999999;display:none;position:absolute;top:' + windowTop + ';left:' + windowLeft + '" />').html($popupContent);
        $('body').prepend($popupData);
        $('.uploadContentWrapper').hide(0).delay(200).fadeIn();
        return false;
    },
    ValidataComponentData: function () {
        var retStatus = false;
        var compData = {};
        compData["CompDetail"] = $.grep(jQXB.getDataSource(candidateDetail.COMP_ATTR_DATASOURCE).CompDetail, function (i, val) { return i != "" });
        compData = JSON.stringify(compData).toString();
        compData = compData.replace(/\\n/g, " ");
        compData = compData.replace(/\\/g, "\\\\");
        compData = compData.replace(/'/g, "\\\'");
        var data = "{";
        data += "'candidateId':" + candidateId + ",";
        data += "'compData':'" + compData + "',";
        data += "'totalExp':" + ($.trim($('#total_Exp').text()));
        data += "}";
        // candidateDetail.SaveCompData(1);
        try {
            $.ajax({
                url: candidateDetail.urlPath + 'BGVService.aspx/ValidateComponentData',
                data: data,
                success: function (msg) {
                    //    candidateDetail.docData = JSON.parse(msg.d);
                    if (msg.d.length != 0) {
                        msg.d = '<ul><li>' + (msg.d).join('</li><li>') + '</li></ul>';
                        candidateDetail.InformationBar(0, msg.d, 'Information');
                    } else {
                        retStatus = candidateDetail.SaveCompData(2);
                        alert('Information Submitted successfully');
                    }
                    candidateDetail.Process(false);
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error " + xhr.status + " " + textRemarks);
                }
            });
        }
        catch (e) { }

        if (retStatus)
            parent.proceedToUrl();
    },
    MisMatchDateRangeFrom: function (obj, arrIndex, hrDate, canDate, msg) {
        var m = candidateDetail.DateDiff(canDate, '01 ' + hrDate), message = "", misMatchFrom = false;
        if (m > 3 || m < -3) {
            var data = candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][arrIndex];
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").find('.verfication_info').hide();
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").show();
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").find('.misMatchFrom').show().next().show(1000); 
            var divId = obj.closest(".subContainer").attr("id");
            divId = divId.split('_');
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").find('.mandMF').attr('id','MM_'+divId[1]+'_From');
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").find('.mandMF').attr('title','mismatch detail for From date');
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").find('.mandMF').addClass('mandatory');
            if (data["IsMismatchIdentifiedFrom"] == null || !data["IsMismatchIdentifiedFrom"] || data["IsMismatchIdentifiedFrom"] == true)
                message = "There is a mismatch identified in" + msg;
            misMatchFrom = true;
        } else {
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").find('.mandMF').removeClass('mandatory');
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").find('.misMatchFrom').hide().next().hide(0);
        }
        candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.COMP_ATTR_DATAMEMBER + '.' + arrIndex + '.IsMismatchIdentifiedFrom', misMatchFrom, false);
        candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.COMP_ATTR_DATAMEMBER + '.' + arrIndex + '.MismatchQueryFrom', message, true);
    },
    MisMatchDateRangeTo: function (obj, arrIndex, hrDate, canDate, msg) {
        var m = candidateDetail.DateDiff(canDate, '01 ' + hrDate), message = "", misMatchTo = false;
        if (m > 3 || m < -3) {
            var data = candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][arrIndex];
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").find('.verfication_info').hide();
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").show();
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").find('.misMatchTo').show().next().show(1000);
            var divId = obj.closest(".subContainer").attr("id");
            divId = divId.split('_');
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").find('.mandMT').attr('id','MM_'+divId[1]+'_To');
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").find('.mandMT').attr('title','mismatch detail for To date');
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").find('.mandMT').addClass('mandatory');
            if (data["IsMismatchIdentifiedTo"] == null || !data["IsMismatchIdentifiedTo"] || data["IsMismatchIdentifiedTo"] == true)
                message = "There is a mismatch identified in" + msg;
            misMatchTo = true;
        } else {
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").find('.mandMT').removeClass('mandatory');
            $("[ref='" + obj.closest(".subContainer").attr("id") + "']").find('.misMatchTo').hide().next().hide(0);
        }
        candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.COMP_ATTR_DATAMEMBER + '.' + arrIndex + '.IsMismatchIdentifiedTo', misMatchTo, false);
        candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.COMP_ATTR_DATAMEMBER + '.' + arrIndex + '.MismatchQueryTo', message, true);
    },
    GapMatchDateRange: function (obj, arrIndex, msg, isChk) {
        if (isChk) {
            $("[ref='subContainerDiv_" + arrIndex + "']").find('.verfication_info').hide();
            $("[ref='subContainerDiv_" + arrIndex + "']").show();
            $("[ref='subContainerDiv_" + arrIndex + "']").find('.gapVer').show().next().show(1000);
            var divId = 'subContainerDiv_'+ arrIndex; 
            divId = divId.split('_');
            $("[ref='subContainerDiv_" + arrIndex + "']").find('.mandGp').attr('id','Gp_'+divId[1]);
            $("[ref='subContainerDiv_" + arrIndex + "']").find('.mandGp').attr('title','Gap detail');
            $("[ref='subContainerDiv_" + arrIndex + "']").find('.mandGp').addClass('mandatory');
        } else {
            $("[ref='subContainerDiv_" + arrIndex + "']").find('.mandGp').removeClass('mandatory');
            $("[ref='subContainerDiv_" + arrIndex + "']").find('.gapVer').hide().next().hide(0);
        }
        candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.COMP_ATTR_DATAMEMBER + '.' + arrIndex + '.IsGapIdentified', isChk, false);
        candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.COMP_ATTR_DATAMEMBER + '.' + arrIndex + '.GapQuery', msg, true);
    },
    OverLapMatchDateRange: function (obj, arrIndex, msg, isChk) {
        if (isChk) {
            $("[ref='subContainerDiv_" + arrIndex + "']").find('.verfication_info').hide();
            $("[ref='subContainerDiv_" + arrIndex + "']").show();
            $("[ref='subContainerDiv_" + arrIndex + "']").find('.overLapVer').show().next().show(1000);
            var divId = 'subContainerDiv_'+ arrIndex; 
            divId = divId.split('_');
            $("[ref='subContainerDiv_" + arrIndex + "']").find('.mandOL').attr('id','OL_'+divId[1]);
            $("[ref='subContainerDiv_" + arrIndex + "']").find('.mandOL').attr('title','Overlap detail');
            $("[ref='subContainerDiv_" + arrIndex + "']").find('.mandOL').addClass('mandatory');
        } else {
            $("[ref='subContainerDiv_" + arrIndex + "']").find('.mandOL').removeClass('mandatory');
            $("[ref='subContainerDiv_" + arrIndex + "']").find('.overLapVer').hide().next().hide(0);
        }
        candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.COMP_ATTR_DATAMEMBER + '.' + arrIndex + '.IsOverLapIdentified', isChk, false);
        candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.COMP_ATTR_DATAMEMBER + '.' + arrIndex + '.OverLapQuery', msg, true);
    },
    getCurrentDate: function () {
        var d = new Date();
        var strDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
        return strDate;
    },
    ComponentVerification: function (obj, dataMember) {
        var jQXBMember = dataMember.split('.'), prevData = '', nextData = '', arrIndex = parseInt(jQXBMember[1]);
        var dataVal = candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER];
        var data = dataVal[arrIndex];
        var lastComponent= $(dataVal).get(-1);
        //dataVal.[dataVal.length-1]; dataVal.last() 
        if (jQXBMember[2].toLowerCase().indexOf('from') > -1) {
            candidateDetail.MisMatchDateRangeFrom(obj, arrIndex, data.HFrom, data.CFrom, ' from date');

            if (jQXBMember[1] < candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER].length)
                var arrLen = dataVal.length;

            if (arrIndex > 0) {
                $(dataVal).each(function (i, j) {
                    if ((candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][arrIndex - (i + 1)].MOD == "0") || (candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][arrIndex - (i + 1)].MOD == "3")) {// when there is no MOD (10th or 12th) or else when mode is full time
                        prevData = candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][arrIndex - (i + 1)];
                        return false;
                    }
                });
            }
            if (arrLen > (arrIndex + 1)) {
                $(dataVal).each(function (i, j) {
                    if ((candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][arrIndex + (i + 1)].MOD == "0") || (candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][arrIndex + (i + 1)].MOD == "3")) {// when there is no MOD (10th or 12th) or else when mode is full time
                        nextData = candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][arrIndex + (i + 1)];
                        return false;
                    }
                });
            }



//            if(lastComponent != '' && lastComponent != undefined){
//            if((candidateDetail.DateDiff(lastComponent.CTo, candidateDetail.getCurrentDate()) < -6)){
//            candidateDetail.GapMatchDateRange(obj, arrIndex - 1, 'There is gap identified between ' + lastComponent.CTo + ' and ' + candidateDetail.getCurrentDate() + ' date.Please provide the address during this period of stay of last five years', true);
//            }
//            }

            if (prevData != '' && prevData != undefined) {
                if ((candidateDetail.DateDiff(prevData.CTo, data.CFrom) < -6) && (candidateDetail.LastFiveYearsCal(candidateDetail.getCurrentDate(), prevData.CTo) < 61)) {
                    if ((prevData.MOD == "2") || (data.MOD == "2")) { // parttime 
                        candidateDetail.GapMatchDateRange(obj, arrIndex - 1, '', false);
                    }
                    else {
                        candidateDetail.GapMatchDateRange(obj, arrIndex - 1, 'There is gap identified between ' + prevData.CTo + ' and ' + data.CFrom + ' date.Please provide the address during this period of stay of last five years', true);
                    }
                } else {
                    candidateDetail.GapMatchDateRange(obj, arrIndex - 1, '', false);
                }
                if (candidateDetail.DateDiff(prevData.CTo, data.CFrom, true) > 15) {
                    if ((prevData.MOD == "2") || (data.MOD == "2")) {// parttime 
                        candidateDetail.OverLapMatchDateRange(obj, arrIndex - 1, '', false);
                    }
                    else {
                        candidateDetail.OverLapMatchDateRange(obj, arrIndex - 1, 'There is over lap identified between ' + prevData.CTo + ' and ' + data.CFrom + ' date  for more than 15 days', true);
                    }
                } else {
                    candidateDetail.OverLapMatchDateRange(obj, arrIndex - 1, '', false);
                }
            }

            if (nextData != '' && nextData != undefined) {
                if ((candidateDetail.DateDiff(data.CTo, nextData.CFrom) < -6) && (candidateDetail.LastFiveYearsCal(candidateDetail.getCurrentDate(), data.CTo) < 61)) {
                    if ((data.MOD == "2") || (nextData.MOD == "2")) { // parttime 
                        candidateDetail.GapMatchDateRange(obj, arrIndex, '', false);
                    }
                    else {
                        candidateDetail.GapMatchDateRange(obj, arrIndex, 'There is gap identified between ' + nextData.CFrom + ' and ' + data.CTo + ' date.Please provide the address during this period of stay of last five years', true);
                    }
                } else {
                    candidateDetail.GapMatchDateRange(obj, arrIndex, '', false);
                }
                if (candidateDetail.DateDiff(data.CTo, nextData.CFrom, true) > 15) {
                    if ((nextData.MOD == "2") || (data.MOD == "2")) {// parttime 
                        candidateDetail.OverLapMatchDateRange(obj, arrIndex, '', false);
                    }
                    else {
                        candidateDetail.OverLapMatchDateRange(obj, arrIndex, 'There is over lap identified between ' + nextData.CFrom + ' and ' + data.CTo + ' date  for more than 15 days', true);
                    }
                } else {
                    candidateDetail.OverLapMatchDateRange(obj, arrIndex, '', false);
                }
            }
        }
        /*while changing the TO date*/
        if (jQXBMember[2].toLowerCase().indexOf('to') > -1) {
            candidateDetail.MisMatchDateRangeTo(obj, arrIndex, data.HTo, data.CTo, ' to date');
            if (jQXBMember[1] < candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER].length)
                var arrLen = dataVal.length;
            if (arrLen > (arrIndex + 1)) {
                $(dataVal).each(function (i, j) {
                    if ((candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][arrIndex + (i + 1)].MOD == "0") || (candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][arrIndex + (i + 1)].MOD == "3")) {
                        nextData = candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][arrIndex + (i + 1)];
                        return false;
                    }
                });
            }
            if (arrIndex > 0) {
                $(dataVal).each(function (i, j) {
                    if ((candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][arrIndex - (i + 1)].MOD == "0") || (candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][arrIndex - (i + 1)].MOD == "3")) {
                        prevData = candidateDetail.bindData[candidateDetail.COMP_ATTR_DATAMEMBER][arrIndex - (i + 1)];
                        return false;
                    }
                });
            }

         /// --------------- STARTS added gap between last component to till date-------------------------
              if(lastComponent != '' && lastComponent != undefined ){
            if((candidateDetail.DateDiff(lastComponent.CTo, candidateDetail.getCurrentDate()) < -6)  && (candidateDetail.LastFiveYearsCal(candidateDetail.getCurrentDate(), data.CTo) < 61)){
            if ((prevData.MOD == "2") || (data.MOD == "2")) { // parttime 
                        candidateDetail.GapMatchDateRange(obj, arrIndex, '', false);
                    }
            else{           
            candidateDetail.GapMatchDateRange(obj, arrIndex, 'There is gap identified between ' + lastComponent.CTo + ' and ' + candidateDetail.getCurrentDate() + ' date.Please provide the address during this period of stay of last five years', true);
            }
            }
            else{
            candidateDetail.GapMatchDateRange(obj, arrIndex, '', false);
            }
            }
              /// ---------------ENDS added gap between last component to till date-------------------------
            if (nextData != '' && nextData != undefined) {
                if ((candidateDetail.DateDiff(nextData.CFrom, data.CTo) > 6) && (candidateDetail.LastFiveYearsCal(candidateDetail.getCurrentDate(), data.CTo) < 61)) {
                    if ((nextData.MOD == "2") || (data.MOD == "2")) {// parttime 
                        candidateDetail.GapMatchDateRange(obj, arrIndex, '', false);
                    }
                    else {
                        candidateDetail.GapMatchDateRange(obj, arrIndex, 'There is gap identified between ' + nextData.CFrom + ' and ' + data.CTo + ' date.Please provide the address during this period of stay of last five years', true);
                    }
                } else {
                    candidateDetail.GapMatchDateRange(obj, arrIndex, '', false);
                }
                if (candidateDetail.DateDiff(nextData.CFrom, data.CTo, true) < -15) {
                    if ((nextData.MOD == "2") || (data.MOD == "2")) {// parttime 
                        candidateDetail.OverLapMatchDateRange(obj, arrIndex, '', false);
                    }
                    else {
                        candidateDetail.OverLapMatchDateRange(obj, arrIndex, 'There is over lap identified between ' + nextData.CFrom + ' and ' + data.CTo + ' date  for more than 15 days', true);
                    }
                } else {
                    candidateDetail.OverLapMatchDateRange(obj, arrIndex, '', false);
                }
            }

            if (prevData != '' && prevData != undefined) {
                if ((candidateDetail.DateDiff(prevData.CTo, data.CFrom) < -6) && (candidateDetail.LastFiveYearsCal(candidateDetail.getCurrentDate(), prevData.CTo) < 61)) {
                    if ((prevData.MOD == "2") || (data.MOD == "2")) {// parttime 
                        candidateDetail.GapMatchDateRange(obj, arrIndex - 1, '', false);
                    }
                    else {
                        candidateDetail.GapMatchDateRange(obj, arrIndex - 1, 'There is gap identified between ' + prevData.CTo + ' and ' + data.CFrom + ' date.Please provide the address during this period of stay of last five years', true);
                    }
                } else {
                    candidateDetail.GapMatchDateRange(obj, arrIndex - 1, '', false);
                }
                if (candidateDetail.DateDiff(prevData.CTo, data.CFrom, true) > 15) {
                    if ((prevData.MOD == "2") || (data.MOD == "2")) {// parttime 
                        candidateDetail.OverLapMatchDateRange(obj, arrIndex - 1, '', false);
                    }
                    else {
                        candidateDetail.OverLapMatchDateRange(obj, arrIndex - 1, 'There is over lap identified between ' + prevData.CTo + ' and ' + data.CFrom + ' date for more than 15 days', true);
                    }
                } else {
                    candidateDetail.OverLapMatchDateRange(obj, arrIndex - 1, '', false);
                }
            }
        }
    },
    DateDiff: function (toVal, fromVal, outputInDays) {
        var diffRangeInMonths = 0;
        var toDate = new Date(toVal);
        var fromDate = new Date(fromVal);
        toDate.setHours(12, 0, 0);
        fromDate.setHours(12, 0, 0);
        var ds = toDate - fromDate;
        diffRangeInMonths = (toDate.getFullYear() - fromDate.getFullYear()) * 12 + ((toDate.getMonth() + 1) - (fromDate.getMonth() + 1))
        if (outputInDays) {
            return Math.round(ds / 8.64e7); // 8.64e7 -- Mirco seconds per day
        } else {
            return diffRangeInMonths;
        }
    },
    ModeofEducationType: function (obj) {
        var dataMember = $(obj).closest('.subContainer').find('.datepicker:first').attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR);
        var object = $(obj).closest('.subContainer').find('.datepicker:first');
        var jQXBMember = dataMember.split('.'), prevData = '', nextData = '', arrIndex = parseInt(jQXBMember[1]);

        if (parseInt($(obj).children('option:selected').val()) == 3) {
            candidateDetail.ComponentVerification(object, dataMember);
        }
        else {
            candidateDetail.OverLapMatchDateRange(object, arrIndex - 1, '', false);
            candidateDetail.OverLapMatchDateRange(object, arrIndex, '', false);
            candidateDetail.GapMatchDateRange(object, arrIndex - 1, '', false);
            candidateDetail.GapMatchDateRange(object, arrIndex, '', false);
            candidateDetail.ComponentVerification(object, dataMember);
        }
    },
    CreateDateComparisonField: function () {
        $('.dateComp').each(function () {
            var obj = $(this), val = "";
            if (roleGroupId == 2)
                val = obj.text();
            if ($.trim(val) != "") {
                obj.parent().addClass('compare');
                obj.show();
            }
            else {
                obj.parent().removeClass('compare');
                obj.hide();
            }
        });
    },
    LastFiveYearsCal: function (toVal, fromVal, outputInDays) {
        var diffRangeInYears = 0;
        var toDate = new Date(toVal);
        var fromDate = new Date(fromVal);
        toDate.setHours(12, 0, 0);
        fromDate.setHours(12, 0, 0);
        var ds = toDate - fromDate;
        diffRangeInYears = (toDate.getFullYear() - fromDate.getFullYear()) * 12
        if (outputInDays) {
            return Math.round(ds / 8.64e7); // 8.64e7 -- Mirco seconds per day
        } else {
            return diffRangeInYears;
        }
    },

     SaveVerificationData: function (mode, DataMember, comments) {
        var retStatus = false;
        var currDataMem = DataMember.split('.');
        DataMember = currDataMem[2].replace('Query','');
        candidateDetail.Process(true);
        jQXB.doBind(candidateDetail.COMP_ATTR_DATASOURCE);
        jQXB.doBind(candidateDetail.DOC_ATTR_DATASOURCE);
        jQXB.doBind(candidateDetail.TYPE_ATTR_DATASOURCE);
        currObj = JSON.stringify(jQXB.getDataSource(candidateDetail.COMP_ATTR_DATASOURCE).CompDetail[currDataMem[1]]).toString();
        currObj = currObj.replace(/\\n/g, " ").replace(/\\/g, "\\\\").replace(/'/g, "\\\'");
        var data = "{";
        data += "'candidateId':" + candidateId + ",";
        data += "'verifyType':'" + DataMember + "',";
        data += "'compoObj':'" +currObj +"',";
        data += "'mode':" + mode +",";
        data += "'comments':'" + comments +"'";
        data += "}";        
        try {
            $.ajax({
                url: candidateDetail.urlPath + 'BGVService.aspx/SaveVerificationData', 
                data: data,
                success: function (msg) {
                    candidateDetail.Intialize();
                    candidateDetail.Process(false);
                    retStatus = true;
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error " + xhr.status + " " + textRemarks);
                    retStatus = false;
                }
            });
        }
        catch (e) { }
        return retStatus
    },

    VerificationData: function(val)
    {
      var datamember = $(val).closest('.verfication_info').find('label:not(".ver_txt")').attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR);
      var feedbackComments = $(val).parent().find('.comments').val();
      if($(val).val() == 'Agree')
      {
        var confirmation = window.confirm('Are you sure , you want to proceed with the information?');
          if (confirmation) {
          var DM = datamember.split('.')[2];
          candidateDetail.SaveVerificationData(1,datamember,feedbackComments);
          alert("Information Saved");   
          }
      }
      if($(val).val() == 'Dis-agree')
      {
        var confirmation = window.confirm('Are you sure , you want to Disagree?');
          if (confirmation) {
           var DM = candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, datamember.replace('Query', 'Status'), 0, true);
          candidateDetail.SaveVerificationData(2, datamember,feedbackComments);
          alert("Information Saved");   
          }
      }
       parent.loadSelf();
   }
}
$(document).ready(function () {
    jQXB.initialize();
    candidateDetail.Intialize();
    //$.pageNotifications('Qualification Information Instructions');
    $date = new Date(candidateDetail.utiltiesRef.CurrentDate); $CurrMonth = $date.getMonth() + 1; $CurrentYr = $date.getFullYear();
    $datePickerHTML = candidateDetail.DatePicker($date.getDate(), $CurrMonth, $CurrentYr, candidateDetail.yrStart);
    $('span.txtbox').hover(function (e) {
        this.t = this.title;
        this.title = this.innerText;
    }, function (e) {
        this.title = this.t;
    });
    //$.compare(candidateId, 402);
    $('body').on('click', '.chkConfig', function () {
        candidateDetail.SelectComponent($(this));
    }).on('click', 'input[value="Save"]', function () {
        candidateDetail.SaveCompData(1);
        alert('Information saved successfully!!!');
        parent.loadSelf();
    }).on('click', '.docChk', function () {
        var JQCurrElm = $(this);
        if (JQCurrElm.hasClass('IsMandatory')) {
            candidateDetail.SetIsMandatoryValue(JQCurrElm);
        }
        if (JQCurrElm.hasClass('IsDefault')) {
            candidateDetail.SetIsDefaultValue(JQCurrElm);
        }

    }).on('keyup', 'input.autoComplete', function (e) {
        candidateDetail.SetAutocompleteVal(e, this, 0);
    }).on('click', 'input.autoComplete', function (e) {
        candidateDetail.SetAutocompleteVal(e, this, 0);
    }).on('click', 'ul#ui-auto-complete li', function (e) {
        candidateDetail.SetAutocompleteVal(e, this, 1);
    }).on('mouseleave', 'ul#ui-auto-complete', function () { candidateDetail.ResetAutocompleteTxtField($(this).prev()); $('ul#ui-auto-complete').remove(); 
    }).on('click', 'input.datepicker', function () {
        if ($(this).val().length > 0 && roleGroupId != 2) {
            var dateArr = $(this).val().split('/');
            datePick(this, $('.date_container').length, dateArr[1], dateArr[0], dateArr[2]);
        } else {  
        if($(this).val().length != 0)
            {
                var dateArr = $(this).val().split(' ');
                var month = ["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

                  for(i = 0; i < month.length; i++) {
                        if(dateArr[0] == month[i])
                        {
                            dateArr[0] = i + 1;
                            break;
                        }
                  }
                  datePick(this, $('.date_container').length, $date.getDate(), dateArr[0], dateArr[2]);
            }
        else{
            datePick(this, $('.date_container').length, $date.getDate(), $CurrMonth, $CurrentYr);
            }           
            ////datePick(this, $('.date_container').length, $date.getDate(), $CurrMonth, $CurrentYr);
        }
    }).on('click', 'button.ui-cancel', function () {
        datePick("", 0);
    }).on('click', 'button.ui-done,.ui-calendar tbody tr td', function (e) {
        var txt = $('option:selected', '.ui-date_picker tbody tr').map(function (i, val) { return $(this).text() }).get();
        if (roleGroupId == 2) {
            txt = txt.join(' ');
        } else {
            txt = txt.join('/' + $(this).text() + '/');
        }
        //  txt = (roleGroupId == 2 ? txt : txt.replace(/\W/g, '/'));
        // $('.date_container').prev().val(txt);
        candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, $('.date_container').prev().attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR), txt, true);
        //jQXB.setmemberVarvalue(candidateDetail.COMP_ATTR_DATASOURCE, null, $('.date_container').prev().attr('jqxb-datamember'), txt, null);
        if ($('.date_container').prev().hasClass('calcDate') || $('.date_container').prev().hasClass('fromDate')) {
            candidateDetail.CalculateTotalExp();
        }
        if ($('.date_container').prev().hasClass('calcDateNh') || $('.date_container').prev().hasClass('fromDateNh')) {
            candidateDetail.CalculateTotalExpNh();
        }
        $('.date_container').prev().change();
        if (roleGroupId != 2) {
            //candidateDetail.TrackGap($('.date_container').prev().attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR));
            candidateDetail.ComponentVerification($('.date_container').prev(), $('.date_container').prev().attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR));
        }
        datePick("", 0);
    }).on('click', 'ul.ul-chkConfig li label', function () {
        var JQCurrElm = $(this);
        $('.DIV' + JQCurrElm.prev().attr('id').split('_')[0]).focus();
    }).on('click', 'img#add_PrevEmp', function () {
        var JQSiblingsElm = $(this).siblings('input.chkConfig');
        if (JQSiblingsElm.is(':checked')) {
            if ($('.DIV' + JQSiblingsElm.attr('id').split('_')[0]).length <= candidateDetail.runnerLimit) {
                candidateDetail.CreateRunnerComponent(JQSiblingsElm);
            }
        }
    }).on('click', '.delete', function () {
        var obj = $(this).attr('id');
        candidateDetail.DeleteComponentData($(this).closest('.subContainer').attr('id').split('_')[1], obj);
         candidateDetail.CalculateTotalExp();

    }).on('click', '.setsuspect', function () {
        var obj = $(this);
        candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, 'CompDetail.' + obj.attr('source'), obj.attr('SStatus'));
        if (obj.attr('SStatus') == 5 || obj.attr('SStatus') == 4) {
            obj.closest('.subContainer').find('.overLay').remove();
            obj.closest('.subContainer').find('.autoComplete').attr('disabled',false);
            obj.closest('.subContainer').find('.' + obj.attr('ref') + 'ContentWrapper').remove();
//            if (obj.attr('SStatus') == 5) {
//                $('#' + $("[" + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + "='" + candidateDetail.COMP_ATTR_DATAMEMBER + "." + arr.jQXBArrId + ".InstitutionName']").closest('.subContainer').attr('id') + ' .leftPanel').find('span.mandatoryLabel').each(function () {
//                    $('#' + $(this).parent().attr('for')).addClass('mandatory');
//                });
//            }
        }
        if (obj.attr('SStatus') == 2) {
            var arr = candidateDetail.suspectChks[$(this).closest('.subContainer').find('input[type="text"]').eq(0).attr(jQXB.JQXB_DATASOURCE_MEMBER_ATTR).split('.')[1]];
            arr["Status"] = 2;
            candidateDetail.DrawSuspectComponent(candidateDetail.suspectChks[$(this).closest('.subContainer').attr('id').split('_')[1]]);
            candidateDetail.SetDataMemberVal(candidateDetail.COMP_ATTR_DATASOURCE, candidateDetail.COMP_ATTR_DATAMEMBER + '.' + arr.jQXBArrId + '.SuspectStatus', arr.Status, false);
            $('#' + $("[" + jQXB.JQXB_DATASOURCE_MEMBER_ATTR + "='" + candidateDetail.COMP_ATTR_DATAMEMBER + "." + arr.jQXBArrId + ".InstitutionName']").closest('.subContainer').attr('id') + ' .leftPanel').find('.mandatory').each(function () {
                $(this).removeClass('mandatory');
            });
        }
    }).on('change', '.empType', function () {
        var obj = this;
        candidateDetail.EmployementType(obj);
    }).on('change', '.ui-date_picker tbody .ui-border', function () {
        var obj = $('option:selected', this);
        if (obj.last().text() == $CurrentYr && obj.first().val() == $CurrMonth) {
            $datePickerHTML = candidateDetail.DatePicker($date.getDate(), $CurrMonth, $CurrentYr, candidateDetail.yrStart);
            datePick($('.date_container').siblings('.datepicker'), 0, $date.getDate(), $CurrMonth, $CurrentYr);
        } else {
            var date = 1;
            if (roleGroupId != 2) { date = obj.eq(1).text(); };
            $datePickerHTML = candidateDetail.DatePicker(date, obj.first().val(), obj.last().text(), candidateDetail.yrStart);
            datePick($('.date_container').siblings('.datepicker'), 0, date, obj.first().val(), obj.last().text());
            // datePick($('.ui-date_picker').parent(), 0);
        }
        //  $('.ui-date_picker').parent().click();

        $('.date_container').show();
    }).on('click', '.action_btn', function () {
        $(".uploadContentWrapper").remove();
        $('.popUpOverLay').remove();
    }).on('click', 'input[value="Submit"]', function () {
        validate.ValidateSubmit();
        if (!validate.errors) {
            candidateDetail.ValidataComponentData();
            //alert("Information submitted successfully");
        }
    }).on('click', 'input[value="Agree"],input[value="Dis-agree"]', function () {
        candidateDetail.VerificationData(this);
    }).on('change', '.MOE', function () {
        if (roleGroupId == 6 || roleGroupId == 1)
            candidateDetail.ModeofEducationType(this);
    }).on('change', '.specType', function () {
        var obj = this;
        candidateDetail.SpecializationType(obj);
    });
    $('.verify').on({
        'click': function () {
            $('.verfication_info').hide();
            $(this).next().toggle(2000);
        }
    })
    $('body').on('keypress', '.datepicker', function (e) { e.preventDefault(); });
    $('body').on('paste', '.datepicker', function (e) { e.preventDefault(); });
    $(document).click(function (e) { var event = $(e.target); if (!event.is('input') && !event.is('select') && !event.is('option')) { $('ul#ui-auto-complete').remove(); datePick("", 0); } });
    delete $date, $CurrMonth, $date.getMonth(), $CurrentYr = $date.getFullYear();
    //    var l = {};
    //    $('.subContainer').each(function (i) {
    //        var obj = $(this);
    //        l[obj.attr('id')] = obj.find('.datepicker').map(function (i, input) { return $(input).val(); }).get();
    //    });
    //marquee.call($('.notification_bar p'));
});

var datePick = function (elm, i, date, month, yr) {
    $('.date_container').remove();
    if (i == 0 && elm != "") {
        var $position = $(elm).position();
        $(elm).after("<div class='date_container'>" + candidateDetail.DatePicker(date, month, yr, candidateDetail.yrStart) + "</div>");
        $('.date_container').css({
            'margin-left': $position.left + 'px',
            'top': $position.top + 25 + 'px',
            'width': '160px',
            'position': 'absolute',
            'z-index': 999999
        }).fadeIn("fast");
    }
    if (roleGroupId != 2)
        candidateDetail.CalculateCalender(date, month - 1, yr);
}

//function getOuterHTML(object) {
//var element;
//if (!object) return null;
//element = document.createElement("div");
//element.appendChild(object.cloneNode(true));
//return element.innerHTML;
//}

//$(function () {
//    var marquee = $(".notification_bar")//, marqueeLen = marquee.text().length;
//    marquee.css({ "overflow": "hidden", "width": "100%" });

//    // wrap "My Text" with a span (IE doesn't like divs inline-block)
//    marquee.wrapInner("<span>");
//    marquee.find("span").css({ "width": "50%", "display": "inline-block", "text-align": "center" });
//    marquee.append(marquee.find("span").clone()); // now there are two spans with "My Text"

//    marquee.wrapInner("<div>");
//    marquee.find("div").css("width", '200%');

//    var reset = function () {
//        $(this).css("margin-left", "0%");
//        $(this).animate({ "margin-left": "-100%" }, 10000, 'linear', reset);
//    };

//    reset.call(marquee.find("div"));

//});