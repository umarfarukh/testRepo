/* 
************************************************
OnBoarding Survey Html 
************************************************
Author: 298589
Date: 2012-Aug-28
Purpose: Dynamic Html page for survey
************************************************
*/
/* json.js */
var JSON; if (!JSON) { JSON = {} } (function () { function f(n) { return n < 10 ? "0" + n : n } if (typeof Date.prototype.toJSON !== "function") { Date.prototype.toJSON = function (key) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) { return this.valueOf() } } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + string + '"' } function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === "object" && typeof value.toJSON === "function") { value = value.toJSON(key) } if (typeof rep === "function") { value = rep.call(holder, key, value) } switch (typeof value) { case "string": return quote(value); case "number": return isFinite(value) ? String(value) : "null"; case "boolean": case "null": return String(value); case "object": if (!value) { return "null" } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === "[object Array]") { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || "null" } v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]"; gap = mind; return v } if (rep && typeof rep === "object") { length = rep.length; for (i = 0; i < length; i += 1) { if (typeof rep[i] === "string") { k = rep[i]; v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v) } } } } else { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v) } } } } v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}"; gap = mind; return v } } if (typeof JSON.stringify !== "function") { JSON.stringify = function (value, replacer, space) { var i; gap = ""; indent = ""; if (typeof space === "number") { for (i = 0; i < space; i += 1) { indent += " " } } else { if (typeof space === "string") { indent = space } } rep = replacer; if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) { throw new Error("JSON.stringify") } return str("", { "": value }) } } if (typeof JSON.parse !== "function") { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === "object") { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v } else { delete value[k] } } } } return reviver.call(holder, key, value) } text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) { j = eval("(" + text + ")"); return typeof reviver === "function" ? walk({ "": j }, "") : j } throw new SyntaxError("JSON.parse") } } } ());
/* Survey.js */
var candidateId = 0, sessionId = 0, surveyType = 0;
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
//Initializing globally processing variables
candidateId = parseInt(qs["cand"]);
sessionId = parseInt(qs["ss"]);
surveyType = parseInt(qs["surveyType"]);

$(document).ready(function () {
    var SurveyData = {};
    var SurveyDesign = {};
    var CandidateSurveyDetail = {};
    Survey.GetSurveyData();
    $('input').customInput();

});

var Survey = {
    SurveyType: '',
    SurveyStatus: '',
    SurveyData: '',
    SurveyDesign: '',
    CandidateSurveyDetail: '',
    QclassificationType: '',
    Index: 1,
    OptionType: '',
    SaveDataVal: new Array(),
    MandatoryCheck: new Array(),
    SaveData: '',
    SelectedAnsCount: 0,
    totalPages: '',
    PageId: 1,
    PopUpStatus: 0,
    /* Function to get data */
    GetSurveyData: function () {
        try {
            var data = "{";
            data += "candidateId:'" + candidateId + "',";
            if (surveyType != NaN) {
                data += "surveyType:'" + surveyType + "',";
            }
            else {
                data += "surveyType:'" + 0 + "',";
            }
            data += "spmode:0";
            data += "}";

            $.ajax({
                type: 'post',
                url: "../../../../FormsService.aspx/GetSurveyData",
                data: data,
                dataType: "json",
                async: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    Survey.DesignHtml(msg.d);
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error " + xhr.status + " " + textRemarks);
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
    /* Function to bind data to html */
    DesignHtml: function (dataSource) {
        Survey.SurveyType = JSON.parse(dataSource).SurveyType;
        Survey.SurveyStatus = JSON.parse(dataSource).SurveyStatus;
        Survey.SurveyData = JSON.parse(dataSource).SurveyDataXml;
        Survey.SurveyDesign = JSON.parse(dataSource).SurveyDesignXml;
        Survey.CandidateSurveyDetail = JSON.parse(dataSource).CandidateSurveyDetailXml;
        SurveyData = JSON.parse(Survey.SurveyData);
        SurveyDesign = JSON.parse(Survey.SurveyDesign);
        CandidateSurveyDetail = JSON.parse(Survey.CandidateSurveyDetail);
        /* Survey Title */
        $('#SurveyType').append(SurveyDesign.Survey.SurveyName);
        $('#SurveyTitle').text(SurveyData.SurveyDetail.SurveyTitle);
        try {
            $.each(SurveyData.SurveyDetail.QAClassification, function (Que, ClassificationData) {
                if (ClassificationData != null || ClassificationData != undefined) {
                    var data = '';
                    if (ClassificationData.QAType == 1) {
                        if (ClassificationData.QASet.length == undefined) {
                            data += '<table cellspacing="0" cellpadding="0" class="Order page_' + ClassificationData.QASet.QPageId + '" style="width: 100%;*width:98%;" quesOrder="' + ClassificationData.QASet.QOrder + '" pageOrder="' + ClassificationData.QASet.QPageId + '">';
                            data += '<thead><tr><th class="" scope="col" style="float:left;padding-left:12px;"><b><p class="blue_font index" style="float:left;width:35px;">';
                            if (ClassificationData.QASet.QA.length == undefined) {
                                if (ClassificationData.QASet.QA.Question.QHeader == null) {
                                    if (ClassificationData.QASet.QMandatory != null || ClassificationData.QASet.QMandatory != undefined) {
                                        data += '*';
                                    }
                                    data += '</p><p class="QA_header" style="margin-left:4px;">' + ClassificationData.QASet.QAClassifyHeader + '</p></b></th></tr>';
                                    data += '<tr><th>&nbsp;</th>';
                                    $.each(ClassificationData.QASet.QA.Answer, function (Ans, AnsData) {
                                        data += '<th scope="col" style="width:16%"><b>' + AnsData.ADescription + '</b></th>';
                                    });
                                    data += '</tr><tbody>';
                                }
                                if (ClassificationData.QASet.QMandatory != undefined || ClassificationData.QASet.QMandatory != null) {
                                    data += '<tr class="textMandatory saveTask" pageOrder="' + ClassificationData.QASet.QPageId + '">';
                                } else {
                                    data += '<tr class="saveTask" pageOrder="' + ClassificationData.QASet.QPageId + '">';
                                }
                                data += '<td><p class="width360">' + ClassificationData.QASet.QA.Question.Qdescription + '</p></td>';
                                $.each(ClassificationData.QASet.QA.Answer, function (Ans, AnsData) {
                                    data += '<td align="center"><input label="' + AnsData.ADescription + '" type="' + AnsData.AType + '" title="' + AnsData.AHint + '"  name="QA_' + ClassificationData.QASet.QA.Question.QId + '_A001" id="QA_' + ClassificationData.QASet.QA.Question.QId + '_' + AnsData.AId + '"/></td>';
                                });
                            }
                            else {
                                $.each(ClassificationData.QASet.QA, function (QAS, QAData) {
                                    if (QAData.Question.QHeader == null) {
                                        if (ClassificationData.QASet.QMandatory != null || ClassificationData.QASet.QMandatory != undefined) {
                                            data += '*';
                                        }
                                        data += '</p><p class="QA_header" style="margin-left:4px;">' + ClassificationData.QASet.QAClassifyHeader + '</p></b></th></tr>';
                                        data += '<tr><th>&nbsp;</th>';
                                        $.each(QAData.Answer, function (Ans, AnsData) {
                                            data += '<th scope="col" style="width:16%"><b>' + AnsData.ADescription + '</b></th>';
                                        });
                                        data += '</tr><tbody>';
                                    }
                                    if (ClassificationData.QASet.QMandatory != undefined || ClassificationData.QASet.QMandatory != null) {
                                        data += '<tr class="textMandatory saveTask" pageOrder="' + ClassificationData.QASet.QPageId + '">';
                                    } else {
                                        data += '<tr class="saveTask" pageOrder="' + ClassificationData.QASet.QPageId + '">';
                                    }
                                    data += '<td><p class="width360">' + QAData.Question.Qdescription + '</p></td>';
                                    $.each(QAData.Answer, function (Ans, AnsData) {
                                        data += '<td align="center"><input label="' + AnsData.ADescription + '" type="' + AnsData.AType + '" title="' + AnsData.AHint + '"  name="QA_' + QAData.Question.QId + '_A001" id="QA_' + QAData.Question.QId + '_' + AnsData.AId + '"/></td>';
                                    });
                                });
                            }
                            data += "</tbody></table>";
                        } else {
                            $.each(ClassificationData.QASet, function (QAS, QASetData) {
                                data += '<table cellspacing="0" cellpadding="0" class="Order page_' + QASetData.QPageId + '" style="width: 100%;*width:98%;" quesOrder="' + QASetData.QOrder + '" pageOrder="' + QASetData.QPageId + '">';
                                data += '<thead>';
                                if (QASetData.QA.length == undefined) {
                                    if (QASetData.QA.Question.QHeader == null) {                                  
                                        data += '<tr></tr><tr><th>&nbsp;</th>';
                                        $.each(QASetData.QA.Answer, function (Ans, AnsData) {
                                            data += '<th scope="col" style="width:16%"><b>' + AnsData.ADescription + '</b></th>';
                                        });
                                        data += '</tr><tbody>';
                                    }
                                    if (QASetData.QMandatory != undefined || QASetData.QMandatory != null) {
                                        data += '<tr class="textMandatory saveTask" pageOrder="' + QASetData.QPageId + '">';
                                    } else {
                                        data += '<tr class="saveTask" pageOrder="' + QASetData.QPageId + '">';
                                    }
                                    data += '<td><p class="blue_font index" style="float:left;width:20px;padding-bottom:5%;">' + ((QASetData.QMandatory != null || QASetData.QMandatory != undefined)?'*':'') + '</p><p class="width360">' + QASetData.QA.Question.Qdescription + '</p></td>';
                                    $.each(QASetData.QA.Answer, function (Ans, AnsData) {
                                        data += '<td align="center"><input label="' + AnsData.ADescription + '" type="' + AnsData.AType + '" title="' + AnsData.AHint + '"  name="QA_' + QASetData.QA.Question.QId + '_Ans" id="QA_' + QASetData.QA.Question.QId + '_' + AnsData.AId + '"/></td>';
                                    });
                                }
                                else {
                                    $.each(QASetData.QA, function (QAS, QAData) {
                                        if (QAData.Question.QHeader == null) {
                                            if (QASetData.QMandatory != null || QASetData.QMandatory != undefined) {
                                                data += '*';
                                            }
                                            data += '</p><p class="QA_header" style="margin-left:4px;">' + QASetData.QAClassifyHeader + '</p></b></th></tr>';
                                            data += '<tr><th>&nbsp;</th>';
                                            $.each(QAData.Answer, function (Ans, AnsData) {
                                                data += '<th scope="col" style="width:16%"><b>' + AnsData.ADescription + '</b></th>';
                                            });
                                            data += '</tr><tbody>';
                                        }
                                        if (QASetData.QMandatory != undefined || QASetData.QMandatory != null) {
                                            data += '<tr class="textMandatory saveTask" pageOrder="' + QASetData.QPageId + '">';
                                        } else {
                                            data += '<tr class="saveTask" pageOrder="' + QASetData.QPageId + '">';
                                        }
                                        data += '<td><p class="width360">' + QAData.Question.Qdescription + '</p></td>';
                                        $.each(QAData.Answer, function (Ans, AnsData) {
                                            data += '<td align="center"><input label="' + AnsData.ADescription + '" type="' + AnsData.AType + '" title="' + AnsData.AHint + '"  name="QA_' + QAData.Question.QId + '_Ans" id="QA_' + QAData.Question.QId + '_' + AnsData.AId + '"/></td>';
                                        });
                                    });
                                }
                                data += "</tbody></table>";
                            });
                        }
                    } else if (ClassificationData.QAType == 2 || ClassificationData.QAType == 3) {
                        if (ClassificationData.QASet.QA.length == undefined) {
                            if (ClassificationData.QASet.QA.Question.QMandatory != undefined || ClassificationData.QASet.QA.Question.QMandatory != null) {
                                data += '<div class="textMandatory saveTask Order page_' + ClassificationData.QASet.QA.Question.QPageId + '" id="QA_' + ClassificationData.QASet.QA.Question.QId + '" quesOrder="' + ClassificationData.QASet.QA.Question.QOrder + '" pageOrder="' + ClassificationData.QASet.QA.Question.QPageId + '" chooseOptions="' + ClassificationData.QASet.QA.Question.QChoose + '" validationMessage="' + ClassificationData.QASet.QA.Question.QMessage + '">';
                                data += '<p class="quest flft mtop20 mleft20 ie7width"><span class="blue_font index">*</span>&nbsp;';
                            } else {
                                data += '<div class="saveTask Order page_' + ClassificationData.QASet.QA.Question.QPageId + '" id="QA_' + ClassificationData.QASet.QA.Question.QId + '" quesOrder="' + ClassificationData.QASet.QA.Question.QOrder + '" pageOrder="' + ClassificationData.QASet.QA.Question.QPageId + '" chooseOptions="' + ClassificationData.QASet.QA.Question.QChoose + '" validationMessage="' + ClassificationData.QASet.QA.Question.QMessage + '">';
                                data += '<p class="quest flft mtop20 mleft20 ie7width"><span class="blue_font index"></span>&nbsp;';
                            }
                            data += '' + ClassificationData.QASet.QA.Question.Qdescription + '</p><div class="clear"></div><div class="mtop10 mleft25 flft ie7width">';
                            $.each(ClassificationData.QASet.QA.Answer, function (Ans, AnsData) {
                                if (ClassificationData.QAType == 3) {
                                    data += ' <div class="flft ieflft"><div class="custom-checkbox">';
                                }
                                if ((AnsData.ADescription).toLowerCase() == 'comment') {
                                    data += '<div class="mtop mleft"><span class="quest">Others (please specify)</span><div><input type="text" label="' + AnsData.ADescription + '" class="txtbx" title="' + AnsData.AHint + '"  name="QA_' + ClassificationData.QASet.QA.Question.QId + '_A001" id="QA_' + ClassificationData.QASet.QA.Question.QId + '_' + AnsData.AId + '" optionType="' + AnsData.ARules + '"/></div></div>';
                                }
                                else if (AnsData.ARules != null) {
                                    data += '<input label="' + AnsData.ADescription + '" type="' + AnsData.AType + '" title="' + AnsData.AHint + '"  name="QA_' + ClassificationData.QASet.QA.Question.QId + '_A001" id="QA_' + ClassificationData.QASet.QA.Question.QId + '_' + AnsData.AId + '" optionType="' + AnsData.ARules + '"/>';
                                    if (ClassificationData.QAType == 2) {
                                        data += '<label for="QA_' + ClassificationData.QASet.QA.Question.QId + '_' + AnsData.AId + '"  class="label_select">' + AnsData.ADescription + '</label>';
                                        data += '<input  for="QA_' + ClassificationData.QASet.QA.Question.QId + '_' + AnsData.AId + '" label="feedback" type="text" class="txtbx" name="QA_' + ClassificationData.QASet.QA.Question.QId + '_A001" id="QA_' + ClassificationData.QASet.QA.Question.QId + '_' + AnsData.AId + '_feedback" disabled/>';
                                    } else {
                                        data += '<label for="QA_' + ClassificationData.QASet.QA.Question.QId + '_' + AnsData.AId + '"  >' + AnsData.ADescription + '</label>';
                                        data += '<div><input  for="QA_' + ClassificationData.QASet.QA.Question.QId + '_' + AnsData.AId + '" label="feedback" type="text" class="txtbx" name="QA_' + ClassificationData.QASet.QA.Question.QId + '_A001" id="QA_' + ClassificationData.QASet.QA.Question.QId + '_' + AnsData.AId + '_feedback" style="margin-left:150px;" disabled/></div>';
                                    }
                                }
                                else {
                                    data += '<input label="' + AnsData.ADescription + '" type="' + AnsData.AType + '" title="' + AnsData.AHint + '"  name="QA_' + ClassificationData.QASet.QA.Question.QId + '_A001" id="QA_' + ClassificationData.QASet.QA.Question.QId + '_' + AnsData.AId + '" optionType="' + AnsData.ARules + '"/>';
                                    if (ClassificationData.QAType == 2) {
                                        data += '<label for="QA_' + ClassificationData.QASet.QA.Question.QId + '_' + AnsData.AId + '"  class="label_select">' + AnsData.ADescription + '</label>';
                                    } else {
                                        data += '<label for="QA_' + ClassificationData.QASet.QA.Question.QId + '_' + AnsData.AId + '" >' + AnsData.ADescription + '</label>';
                                    }
                                }
                                if (ClassificationData.QAType == 2 && (ClassificationData.QASet.QA.Question.QType).toLowerCase() == 'other') {
                                    data += '<br/>';
                                }
                                if (ClassificationData.QAType == 3) {
                                    data += '</div></div><div class="clear"></div>';
                                }
                            });
                            data += '</div></div>';

                        } else {
                            $.each(ClassificationData.QASet.QA, function (QAS, QAData) {
                                if (QAData.Question.QMandatory != undefined || QAData.Question.QMandatory != null) {
                                    data += '<div class="textMandatory saveTask Order page_' + QAData.Question.QPageId + '" id="QA_' + QAData.Question.QId + '" quesOrder="' + QAData.Question.QOrder + '" pageOrder="' + QAData.Question.QPageId + '" chooseOptions="' + QAData.Question.QChoose + '" validationMessage="' + QAData.Question.QMessage + '">';
                                    data += '<p class="quest flft mtop20 mleft20 ie7width"><span class="blue_font index">*</span>&nbsp;';
                                } else {
                                    data += '<div class="saveTask Order page_' + QAData.Question.QPageId + '" id="QA_' + QAData.Question.QId + '" quesOrder="' + QAData.Question.QOrder + '" pageOrder="' + QAData.Question.QPageId + '" chooseOptions="' + QAData.Question.QChoose + '" validationMessage="' + QAData.Question.QMessage + '">';
                                    data += '<p class="quest flft mtop20 mleft20 ie7width"><span class="blue_font index"></span>&nbsp;';
                                }
                                data += '' + QAData.Question.Qdescription + '</p><div class="clear"></div><div class="mtop10 mleft25 flft ie7width">';
                                $.each(QAData.Answer, function (Ans, AnsData) {
                                    if (ClassificationData.QAType == 3) {
                                        data += ' <div class="flft ieflft"><div class="custom-checkbox">';
                                    }
                                    if ((AnsData.ADescription).toLowerCase() == 'comment') {
                                        data += '<div class="mtop mleft"><span class="quest">Others (please specify)</span><div><input type="text" label="' + AnsData.ADescription + '" class="txtbx" title="' + AnsData.AHint + '"  name="QA_' + QAData.Question.QId + '_A001" id="QA_' + QAData.Question.QId + '_' + AnsData.AId + '" optionType="' + AnsData.ARules + '"/></div></div>';
                                    }
                                    else if (AnsData.ARules != null) {
                                        data += '<input label="' + AnsData.ADescription + '" type="' + AnsData.AType + '" title="' + AnsData.AHint + '"  name="QA_' + QAData.Question.QId + '_A001" id="QA_' + QAData.Question.QId + '_' + AnsData.AId + '" optionType="' + AnsData.ARules + '"/>';
                                        if (ClassificationData.QAType == 2) {
                                            data += '<label for="QA_' + QAData.Question.QId + '_' + AnsData.AId + '"  class="label_select">' + AnsData.ADescription + '</label>';
                                            data += '<input  for="QA_' + QAData.Question.QId + '_' + AnsData.AId + '" label="feedback" type="text" class="txtbx" name="QA_' + QAData.Question.QId + '_A001" id="QA_' + QAData.Question.QId + '_' + AnsData.AId + '_feedback" disabled/>';
                                        } else {
                                            data += '<label for="QA_' + QAData.Question.QId + '_' + AnsData.AId + '">' + AnsData.ADescription + '</label>';
                                            data += '<div><input  for="QA_' + QAData.Question.QId + '_' + AnsData.AId + '" label="feedback" type="text" class="txtbx" name="QA_' + QAData.Question.QId + '_A001" id="QA_' + QAData.Question.QId + '_' + AnsData.AId + '_feedback" style="margin-left:150px;" disabled/></div>';
                                        }
                                    }
                                    else {
                                        data += '<input label="' + AnsData.ADescription + '" type="' + AnsData.AType + '" title="' + AnsData.AHint + '"  name="QA_' + QAData.Question.QId + '_A001" id="QA_' + QAData.Question.QId + '_' + AnsData.AId + '" optionType="' + AnsData.ARules + '"/>';
                                        if (ClassificationData.QAType == 2) {
                                            data += '<label for="QA_' + QAData.Question.QId + '_' + AnsData.AId + '"  class="label_select">' + AnsData.ADescription + '</label>';
                                        } else {
                                            data += '<label for="QA_' + QAData.Question.QId + '_' + AnsData.AId + '">' + AnsData.ADescription + '</label>';
                                        }
                                    }
                                    if (ClassificationData.QAType == 2 && (QAData.Question.QType).toLowerCase() == 'other') {
                                        data += '<br/>';
                                    }
                                    if (ClassificationData.QAType == 3) {
                                        data += '</div></div><div class="clear"></div>';
                                    }
                                });
                                data += '</div></div>';

                            });
                        }
                    } else if (ClassificationData.QAType == 4) {
                        if (ClassificationData.QASet.QA.length == undefined) {
                            if (ClassificationData.QASet.QA.Question.QMandatory != undefined || ClassificationData.QASet.QA.Question.QMandatory != null) {
                                data += '<div class="textMandatory Order page_' + ClassificationData.QASet.QA.Question.QPageId + '" quesOrder="' + ClassificationData.QASet.QA.Question.QOrder + '" pageOrder="' + ClassificationData.QASet.QA.Question.QPageId + '">';
                                data += ' <div class="quest flft mtop20 mleft20 ie7width"><p class="blue_font flft index">*</p>';
                            } else {
                                data += '<div class="Order page_' + ClassificationData.QASet.QA.Question.QPageId + '" quesOrder="' + ClassificationData.QASet.QA.Question.QOrder + '" pageOrder="' + ClassificationData.QASet.QA.Question.QPageId + '">';
                                data += ' <div class="quest flft mtop20 mleft20 ie7width"><p class="blue_font flft index"></p>';
                            }
                            data += '<p class="flft quest_tag">' + ClassificationData.QASet.QA.Question.Qdescription + '</p></div><div class="clear"></div>';
                            data += '<div class="txt_area mtop mleft20 flft padding39"><textarea class="txtarea" label="' + ClassificationData.QASet.QA.Answer.ADescription + '"  title="' + ClassificationData.QASet.QA.Answer.AHint + '"  name="QA_' + ClassificationData.QASet.QA.Question.QId + '_A001" id="QA_' + ClassificationData.QASet.QA.Question.QId + '_' + ClassificationData.QASet.QA.Answer.AId + '" />';
                            data += '<div class="clear"></div></div></div>';
                        } else {
                            $.each(ClassificationData.QASet.QA, function (QAS, QAData) {
                                if (QAData.Question.QMandatory != undefined || QAData.Question.QMandatory != null) {
                                    data += '<div class="textMandatory Order page_' + QAData.Question.QPageId + '" quesOrder="' + QAData.Question.QOrder + '" pageOrder="' + QAData.Question.QPageId + '">';
                                    data += ' <div class="quest flft mtop20 mleft20 ie7width"><p class="blue_font flft index">*</p>';
                                } else {
                                    data += '<div class="Order page_' + QAData.Question.QPageId + '" quesOrder="' + QAData.Question.QOrder + '" pageOrder="' + QAData.Question.QPageId + '">';
                                    data += ' <div class="quest flft mtop20 mleft20 ie7width"><p class="blue_font flft index"></p>';
                                }
                                data += '<p class="flft quest_tag">' + QAData.Question.Qdescription + '</p></div><div class="clear"></div>';
                                data += '<div class="txt_area mtop mleft20 flft padding39"><textarea class="txtarea" label="' + QAData.Answer.ADescription + '"  title="' + QAData.Answer.AHint + '"  name="QA_' + QAData.Question.QId + '_A001" id="QA_' + QAData.Question.QId + '_' + QAData.Answer.AId + '" />';
                                data += '<div class="clear"></div></div></div>';
                            });
                        }
                    }
                    $('.tab_content').append(data);
                }
            });
            var m = 1, k;
            $('.tab_content').find('.Order').each(function () {
                k = 1;
                $('.Order').each(function (i) {
                    if ($(this).attr('pageOrder') == m) {
                        $('.Order').each(function (i) {
                            if ($(this).attr('pageOrder') == m && $(this).attr('quesOrder') == k) {
                                var htmlData = $(this).detach();
                                htmlData.appendTo('.tab_content');
                                $(this).find('.index').text($(this).find('.index').text() + ' ' + Survey.Index + '.');
                                k++; Survey.Index++;
                                Survey.totalPages = m;
                            }
                        });
                    }
                });
                m++;
            });
            if (CandidateSurveyDetail != null && CandidateSurveyDetail != undefined) {
                Survey.BindSavedData(CandidateSurveyDetail);
            } else {
                Survey.SurveyStatus = 0;
                Survey.ProgressBar();
            }
            Survey.Pagination(Survey.PageId);
        } catch (e) { }
    },
    BindSavedData: function (CandidateSurveyDetail) {
        try {
            if (CandidateSurveyDetail.CandidateSurveyDetail.QASet != undefined) {
                $.each(CandidateSurveyDetail.CandidateSurveyDetail.QASet, function (CS, CSData) {
                    if (CandidateSurveyDetail.CandidateSurveyDetail.QASet.length == undefined) {
                        if (CSData.ASet.A.AText != undefined && (CSData.ASet.A.AText).toLowerCase() == 'textarea') {
                            $('#QA_' + CSData.QId + '_' + CSData.ASet.A.AId).val(CSData.ASet.A.AValue);
                        } else {
                            if (CSData.ASet.A.AText != undefined && (CSData.ASet.A.AText).toLowerCase() == 'comment') {
                                $('#QA_' + CSData.QId + '_' + CSData.ASet.A.AId).val(CSData.ASet.A.AOther);
                            } else if (CSData.ASet.A.AText != undefined && (CSData.ASet.A.AText).toLowerCase() == 'feedback') {
                                $('#QA_' + CSData.QId + '_' + CSData.ASet.A.AId).attr('checked', true);
                                $('#QA_' + CSData.QId + '_' + CSData.ASet.A.AId + '_feedback').val(CSData.ASet.A.AOther).attr('disabled', false);
                            } else if (CSData.ASet.A.length != undefined) {
                                $.each(CSData.ASet.A, function (i, ASData) {
                                    if ((ASData.AText).toLowerCase() == 'comment') {
                                        $('#QA_' + CSData.QId + '_' + ASData.AId).val(ASData.AOther);
                                    } else if ((ASData.AText).toLowerCase() == 'feedback') {
                                        $('#QA_' + CSData.QId + '_' + ASData.AId).attr('checked', true);
                                        $('#QA_' + CSData.QId + '_' + ASData.AId + '_feedback').val(ASData.AOther).attr('disabled', false);
                                    }
                                    else {
                                        $('#QA_' + CSData.QId + '_' + ASData.AId).attr('checked', true);
                                        Survey.OptionType = $('#QA_' + CSData.QId + '_' + ASData.AId).attr('optionType');
                                        if ((Survey.OptionType) != undefined && (Survey.OptionType).toLowerCase() == 'feedback') {
                                            $('#QA_' + CSData.QId + '_' + ASData.AId + '_feedback').attr('disabled', false);
                                        }
                                    }
                                });
                            } else {
                                $('#QA_' + CSData.QId + '_' + CSData.ASet.A.AId).attr('checked', true);
                                Survey.OptionType = $('#QA_' + CSData.QId + '_' + CSData.ASet.A.AId).attr('optionType');
                                if ((Survey.OptionType) != undefined && (Survey.OptionType).toLowerCase() == 'feedback') {
                                    $('#QA_' + CSData.QId + '_' + CSData.ASet.A.AId + '_feedback').attr('disabled', false);
                                }
                            }
                        }
                    } else {
                        $.each(CSData.QA.ASet, function (AS, ASet) {
                            if (CSData.QA.ASet.A.length == undefined) {
                                if (ASet.AText != undefined && (ASet.AText).toLowerCase() == 'textarea') {
                                    $('#QA_' + CSData.QA.QId + '_' + ASet.AId).val(ASet.AValue);
                                } else {
                                    if (ASet.AOther != undefined) {
                                        if (ASet.AText != undefined && (ASet.AText).toLowerCase() == 'comment') {
                                            $('#QA_' + CSData.QA.QId + '_' + ASet.AId).val(ASet.AOther);
                                        } else if (ASet.AText != undefined && (ASet.AText).toLowerCase() == 'feedback') {
                                            $('#QA_' + CSData.QA.QId + '_' + ASet.AId).attr('checked', true);
                                            $('#QA_' + CSData.QA.QId + '_' + ASet.AId + '_feedback').val(ASet.AOther).attr('disabled', false);
                                        }
                                    } else {
                                        $('#QA_' + CSData.QA.QId + '_' + ASet.AId).attr('checked', true);
                                        Survey.OptionType = $('#QA_' + CSData.QA.QId + '_' + ASet.AId).attr('optionType');
                                        if ((Survey.OptionType) != undefined && (Survey.OptionType).toLowerCase() == 'feedback') {
                                            $('#QA_' + CSData.QA.QId + '_' + ASet.AId + '_feedback').attr('disabled', false);
                                        }
                                    }
                                }
                            } else {
                                $.each(ASet, function (A, Ans) {
                                    if (Ans.AOther == undefined) {
                                        $('#QA_' + CSData.QA.QId + '_' + Ans.AId).attr('checked', true);
                                        Survey.OptionType = $('#QA_' + CSData.QA.QId + '_' + Ans.AId).attr('optionType');
                                        if ((Survey.OptionType) != undefined && (Survey.OptionType).toLowerCase() == 'feedback') {
                                            $('#QA_' + CSData.QA.QId + '_' + Ans.AId + '_feedback').attr('disabled', false);
                                        }
                                    }
                                    else {
                                        if (Ans.AText != undefined && (Ans.AText).toLowerCase() == 'comment') {
                                            $('#QA_' + CSData.QA.QId + '_' + Ans.AId).val(Ans.AOther);
                                        } else if (Ans.AText != undefined && (Ans.AText).toLowerCase() == 'feedback') {
                                            $('#QA_' + CSData.QA.QId + '_' + Ans.AId).attr('checked', true);
                                            $('#QA_' + CSData.QA.QId + '_' + Ans.AId + '_feedback').val(Ans.AOther).attr('disabled', false);
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
            Survey.ProgressBar();
        } catch (e) {
            alert("Error: " + e);
        }
    },
    SaveSurveyData: function (status) {
        Survey.SaveDataVal.length = 0;
        var index = 0, val, index;
        try {
            $('.saveTask').each(function (i) {
                var k = 0;
                SaveData = new Array();
                var id = $(this).find('input').attr('id');
                var name = $(this).find('input').attr('name');
                var idS = id.split('_');
                $('input[name="' + name + '"]').each(function () {
                    var inputType = $(this).attr('type');
                    var feedback = $(this).attr('optionType');
                    var label = $(this).attr('label');
                    var inputId = $(this).attr('id');
                    var inputIdS = inputId.split('_');
                    val = $(this).val();
                    text = $(this).attr('label');
                    if (val != '' && inputType.toLowerCase() == 'text') {
                        SaveData[k] = { "AId": inputIdS[2], "AValue": 1, "AText": text, "AOther": val };
                        k++;
                    }
                    else if ($('#' + inputId).is(':checked') == true) {
                        if (feedback == undefined) {
                            SaveData[k] = { "AId": inputIdS[2], "AValue": 1, "AText": text };
                            k++;

                        } else {
                            if (feedback.toLowerCase() == 'feedback' && val == '') {
                                SaveData[k] = { "AId": inputIdS[2], "AValue": 1, "AText": text, "AOther": "" };
                                k++;
                            } else if (label.toLowerCase() == 'comment' && val == '') {
                            } else {
                                SaveData[k] = { "AId": inputIdS[2], "AValue": 1, "AText": text };
                                k++;
                            }
                        }
                    }
                });
                if (SaveData.length != 0) {
                    Survey.SaveDataVal[i] = { "QA": { "QId": idS[1], "ASet": { "A": SaveData}} };
                    index = i + 1;
                }
            });
            $('textarea').each(function () {
                var id = $(this).attr('id');
                var idS = id.split('_');
                var val = $(this).val();
                if (val != '' && val != null) {
                    Survey.SaveDataVal[index] = { "QA": { "QId": idS[1], "ASet": { "A": { "AId": idS[2], "AValue": val, "AText": "textarea"}}} };
                    index++;
                }
            });
            Survey.SaveDataVal = $.grep(Survey.SaveDataVal, function (i) {
                return i;
            });
            Survey.SaveData = { "CandidateSurveyDetail": { "SurveyId": JSON.parse(Survey.SurveyDesign).Survey.SurveyId, "CandidateId": candidateId, "QASet": Survey.SaveDataVal} };

            var saveData = JSON.stringify(Survey.SaveData).toString();
            saveData = saveData.replace(/\\n/g, " ");
            saveData = saveData.replace(/\\/g, "\\\\");
            saveData = saveData.replace(/'/g, "\\\'")
            var data = "{";
            data += "'sessionId':'" + sessionId + "',";
            data += "'candidateId':'" + candidateId + "',";
            data += "'surveyType':'" + Survey.SurveyType + "',";
            data += "'surveyData':'" + saveData + "',";
            data += "'surveyStatus':'" + status + "'";
            data += "}";
            $.ajax({
                type: "post",
                async: false,
                url: "../../../../FormsService.aspx/SaveSurveyData",
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) { },
                error: function (xhr, status, textRemarks) {
                    alert("Error " + xhr.status + " " + textRemarks);
                    return false;
                }
            });
            Survey.ProgressBar();
        } catch (e) { }
    },
    ProgressBar: function () {
        $('.Order').find('input:last').each(function (i) {
            var tagName = $(this).attr('name');
            if ($('input[name="' + tagName + '"]').is(':checked') == true) {
                Survey.SelectedAnsCount++;
            }
        });
        $('textarea').each(function () {
            if ($(this).val().length != 0) {
                Survey.SelectedAnsCount++;
            }
        });
        Survey.TotalQueCount = ($('.Order').index() + 1);
        Survey.TotalAnsQues = (Survey.SelectedAnsCount / Survey.TotalQueCount);
        $('.fontclr').text((Survey.TotalAnsQues * 100).toFixed(0) + '% Completed');
        $('.status').css('width', (Survey.TotalAnsQues * 100).toFixed(0) + '%');
        Survey.SelectedAnsCount = 0;
    },
    Mandatory: function () {
        var indexRef, Refvariable = 0;
        $('.textMandatory').each(function (i) {
            var inputName = $(this).find('input').attr('name');
            var textareaName = $(this).find('textarea').attr('id');
            if (inputName != undefined && textareaName == undefined) {
                if ($('input[name="' + inputName + '"]').is(':checked') == false) {
                    Survey.PageId = $(this).attr('pageOrder');
                    Survey.Pagination($(this).attr('pageOrder'));
                    indexRef = $(this).offset();
                    $('.tab_content').scrollTop(indexRef.top - 50)
                    Refvariable = 1;
                    closeItImage(0);
                    MsgboxAlert(sessionId, 0, 0, null, 'Please select mandatory questions');
                    $('#popup_ok').attr('onclick', 'closeItImage(1);');
                    return false;
                } else {
                    Refvariable = 0;
                    return true;
                }
            }
            else if (inputName == undefined && textareaName != undefined) {
                if ($('#' + textareaName).val().length == 0) {
                    Survey.PageId = $(this).attr('pageOrder');
                    Survey.Pagination($(this).attr('pageOrder'));
                    indexRef = $(this).offset();
                    $('.tab_content').scrollTop(indexRef.top - 50)
                    Refvariable = 1;
                    closeItImage(0);
                    MsgboxAlert(sessionId, 0, 0, null, 'Please enter the values for mandatory fields');
                    $('#popup_ok').attr('onclick', 'closeItImage(1);');
                    return false;
                } else {
                    Refvariable = 0;
                    return true;
                }
            }

        });
        if (Refvariable == 0) {
            Survey.SaveSurveyData(2);
            MsgboxAlert(sessionId, 1, 0, null, 'Thanks for completing the survey.');
            $('#popup_ok').attr('onclick', 'window.parent.surveydisablePopup(2)');
        }
    },
    Pagination: function (PageId) {
        $('.tab_content').children().hide();
        $('.page_' + PageId).show();
        if (Survey.totalPages == 1) {
            $('.dis_btn').hide();
            $('#submit').show();
        } else if (PageId < Survey.totalPages) {
            $('.dis_btn').show();
            $('#submit').hide();
        }
        $('.tab_content').scrollTop(0);
        if (Survey.PageId == 1) {
            $('.prev').hide();
            if (Survey.totalPages != 1) {
                $('.nxt').show();
            }
        } else if (Survey.PageId == Survey.totalPages) {
            $('.prev').show();
            $('.nxt').hide();
        } else {
            $('.prev').show();
            $('.nxt ').show();
        }
    },
    Next: function () {
        if (Survey.PageId < Survey.totalPages) {
            Survey.PageId++;
            Survey.Pagination(Survey.PageId);
            Survey.SaveSurveyData(1);
            if (Survey.PageId == Survey.totalPages) {
                $('#submit').show();
                // $('#save').hide();
            }
        }

    },
    Prev: function () {
        if (Survey.PageId > 1) {
            Survey.PageId--;
            Survey.Pagination(Survey.PageId);
            Survey.SaveSurveyData(1);
            $('#submit').hide();
            $('#save').show();
        }
    }
}
$('input[type="checkbox"]').live("click", function () {
    var id = $(this).attr('id');
    var checkboxName = $(this).attr('name');
    var checkedItems = $('input[name="' + checkboxName + '"]:checked').length;
    var idSplit = id.split('_');
    var chosseItems = $('#QA_' + idSplit[1]).attr('chooseOptions');
    var validationMessage = $('#QA_' + idSplit[1]).attr('validationMessage');
    if (checkedItems > chosseItems) {
        $('#' + id).attr('checked', false);
   // $('input[name="' + checkboxName + '"]:not(:checked)').attr('disabled', true);
    closeItImage(0);
    MsgboxAlert(sessionId, 3, 0, null, validationMessage);
    $('#popup_ok').attr('onclick', 'closeItImage(1);');
} 
$('input[name="' + checkboxName + '"]').each(function () {
    var type = $(this).attr('optionType');
    if (type == null) {
        return true;
    } else {
        if ($('#' + id).is(':checked') == true) {
            $('#' + id + '_feedback').attr('disabled', false);
            
        } else {
            $('#' + id + '_feedback').attr('disabled', true).val('');
        }
    }
});
$('input').customInput();
});


function closeItImage(visible) {
    if (visible == 0) {
        window.frameElement.parentNode.childNodes[0].style.visibility = 'hidden';
    } else if (visible == 1) {
        window.frameElement.parentNode.childNodes[0].style.visibility = 'visible';
    }

}

/*customInput.js*/
jQuery.fn.customInput = function () { $(this).each(function (b) { if ($(this).is("[type=checkbox]")) { var c = $(this); var e = $("label[for=" + c.attr("id") + "]"); var d = (c.is("[type=checkbox]")) ? "checkbox" : "radio"; $('<div class="custom-' + d + '"></div>').insertBefore(c).append(c, e); var a = $("input[name=" + c.attr("name") + "]"); e.hover(function () { $(this).addClass("hover"); if (d == "checkbox" && c.is(":checked")) { $(this).addClass("checkedHover") } }, function () { $(this).removeClass("hover checkedHover") }); c.bind("updateState", function () { if (c.is(":checked")) { if (c.is(":radio")) { a.each(function () { $("label[for=" + $(this).attr("id") + "]").removeClass("checked") }) } e.addClass("checked") } else { e.removeClass("checked checkedHover checkedFocus") } }).trigger("updateState").click(function () { $(this).trigger("updateState") }).focus(function () { e.addClass("focus"); if (d == "checkbox" && c.is(":checked")) { $(this).addClass("checkedFocus") } }).blur(function () { e.removeClass("focus checkedFocus") }) } }) };

/* Alerts.js */
(function (a) { a.alerts = { verticalOffset: -75, horizontalOffset: 0, repositionOnResize: true, overlayOpacity: 0.7, overlayColor: "#000000", Color: "#FF9", bckgrdPopupColor: "#ffffff", draggable: false, okButton: "&nbsp;OK&nbsp;", cancelButton: "&nbsp;Cancel&nbsp;", dialogClass: null, Info: function (b) { a.alerts._show1("Information", b, null, "info", function (c) { }) }, Mandatory: function (b) { a.alerts._show1("Mandatory Fields", b, null, "info", function (c) { }) }, Warning: function (b) { a.alerts._show1("Warning", b, null, "warning", function (c) { }) }, Success: function (b) { a.alerts._show1("Success", b, null, "success", function (c) { }) }, Error: function (b) { a.alerts._show1("Error", b, null, "error", function (c) { }) }, Confirm: function (b) { a.alerts._show1("Confirmation", b, null, "confirm", function (c) { }) }, Prompt: function (b, c) { a.alerts._show1("Prompt", b, c, "prompt", function (d) { }) }, Message: function (b) { a.alerts._show1("Message", b, null, "message", function (c) { }) }, SubmitSuccess: function (b) { a.alerts._show1("Success", b, null, "success", function (c) { window.close() }) }, _show1: function (g, d, i, h, b) { a.alerts._hide(); a.alerts._overlay("show"); if (g == "Message") { a("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:300px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } else { a("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:150px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } if (a.alerts.dialogClass) { a("#popup_container").addClass(a.alerts.dialogClass) } var f = (a.browser.msie && parseInt(a.browser.version) <= 6) ? "absolute" : "fixed"; if (g == "Message") { a("#popup_container").css({ width: 700, height: "auto", position: f, zIndex: 99999, padding: 0, margin: 50, left: 400, background: a.alerts.bckgrdPopupColor }) } else { a("#popup_container").css({ width: 450, height: 300, position: f, zIndex: 99999, padding: 0, margin: 50, left: 400, background: a.alerts.bckgrdPopupColor }) } a("#popup_title").text(g); a("#popup_content").addClass(h); a("#popup_message").text(d); a("#popup_message").html(a("#popup_message").text().replace(/\n/g, "<br />")); a("#popup_container").css({ minWidth: a("#popup_container").outerWidth(), maxWidth: a("#popup_container").outerWidth() }); a.alerts._reposition(); a.alerts._maintainPosition(true); switch (h) { case "info": case "warning": case "success": case "error": case "message": a("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold; position:relative;" class="popup_Button" value="' + a.alerts.okButton + '" id="popup_ok" /></div>'); a("#popup_ok").click(function () { a.alerts._hide(); b(true) }); a("#popup_ok").focus().keypress(function (j) { if (j.keyCode == 13 || j.keyCode == 27) { a("#popup_ok").trigger("click") } }); break; case "confirm": a("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + a.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + a.alerts.cancelButton + '" id="popup_cancel" /></div>'); a("#popup_ok").click(function () { a.alerts._hide(); if (b) { b(true) } }); a("#popup_cancel").click(function () { a.alerts._hide(); if (b) { b(false) } }); a("#popup_ok").focus(); a("#popup_ok, #popup_cancel").keypress(function (j) { if (j.keyCode == 13) { a("#popup_ok").trigger("click") } if (j.keyCode == 27) { a("#popup_cancel").trigger("click") } }); break; case "prompt": a("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color:Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + a.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button" value="' + a.alerts.cancelButton + '" id="popup_cancel" /></div>'); a("#popup_prompt").width(a("#popup_message").width()); a("#popup_ok").click(function () { var e = a("#popup_prompt").val(); a.alerts._hide(); if (b) { b(e) } }); a("#popup_cancel").click(function () { a.alerts._hide(); if (b) { b(null) } }); a("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (j) { if (j.keyCode == 13) { a("#popup_ok").trigger("click") } if (j.keyCode == 27) { a("#popup_cancel").trigger("click") } }); if (i) { a("#popup_prompt").val(i) } a("#popup_prompt").focus().select(); break } if (a.alerts.draggable) { try { a("#popup_container").draggable({ handle: a("#popup_title") }); a("#popup_title").css({ cursor: "move", font: 15 }) } catch (c) { } } }, _hide: function () { a("#popup_container").remove(); a.alerts._overlay("hide"); a.alerts._maintainPosition(false) }, _overlay: function (b) { switch (b) { case "show": a.alerts._overlay("hide"); a("BODY").append('<div id="popup_overlay"></div>'); a("#popup_overlay").css({ position: "absolute", zIndex: 99998, top: "0px", left: "0px", width: "100%", height: a(window).height() - 100 + "px", background: a.alerts.overlayColor, opacity: a.alerts.overlayOpacity }); break; case "hide": a("#popup_overlay").remove(); break } }, _reposition: function () { var c = ((a(window).height() / 2) - (a("#popup_container").outerHeight() / 2)) + a.alerts.verticalOffset; var b = ((a(window).width() / 2) - (a("#popup_container").outerWidth() / 2)) + a.alerts.horizontalOffset; if (c < 0) { c = 0 } if (b < 0) { b = 0 } if (a.browser.msie && parseInt(a.browser.version) <= 6) { c = c + a(window).scrollTop() } a("#popup_container").css({ top: c + "px", left: b + "px" }); a("#popup_overlay").height(a(document).height()) }, _maintainPosition: function (b) { if (a.alerts.repositionOnResize) { switch (b) { case true: a(window).bind("resize", function () { a.alerts._reposition() }); break; case false: a(window).unbind("resize"); break } } } }, MsgboxInfo = function (b) { a.alerts.Info(b) }, MsgboxWarning = function (b) { a.alerts.Warning(b) }, MsgboxSuccess = function (b) { a.alerts.Success(b) }, MsgboxError = function (b) { a.alerts.Error(b) }, MsgboxConfirm = function (b) { a.alerts.Confirm(b) }, MsgboxPrompt = function (b, c) { a.alerts.Prompt(b, c) }, MsgboxAlert = function (i, h, f, d, b) { var g = 2; try { if (f != 0) { a.ajax({ type: "POST", url: "../../../../FormsService.aspx/GetMessage", data: "{'sessionId':" + i.toString() + ",'messageType':'" + g + "','messageId':" + f.toString() + ",'messageCode':'" + d + "', 'customMessageOnDBFail':'" + b + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (k) { var l = k.d.DisplayMessage.toString(); var m = k.d.DisplayType.toString(); var e = l.toString(); var j = m.toString(); if (f == 39) { j = "9" } switch (j) { case "1": a.alerts.Success(e); break; case "2": a.alerts.Error(e); break; case "3": a.alerts.Warning(e); break; case "4": a.alerts.Info(e); break; case "5": a.alerts.Prompt(e); break; case "6": a.alerts.Confirm(e); break; case "7": a.alerts.Mandatory(e); break; case "8": a.alerts.Message(e); break; case "9": a.alerts.SubmitSuccess(e); break; default: a.alerts.Info(e) } }, error: function (k, e, j) { a.alerts.Error(k.status + " - " + k.responseText) } }) } else { if (f == 0) { switch (h) { case 1: a.alerts.Success(b); break; case 2: a.alerts.Error(b); break; case 3: a.alerts.Warning(b); break; case 4: a.alerts.Info(b); break; case 5: a.alerts.Prompt(b); break; case 6: a.alerts.Confirm(b); break; case 7: a.alerts.Mandatory(b); break; default: a.alerts.Info(b) } } } } catch (c) { alert(c) } }, MsgboxAlertDashboard = function (i, h, f, d, b) { var g = 2; try { if (f != 0) { a.ajax({ type: "POST", url: "../../FormsService.aspx/GetMessage", data: "{'sessionId':" + i.toString() + ",'messageType':'" + g + "','messageId':" + f.toString() + ",'messageCode':'" + d + "', 'customMessageOnDBFail':'" + b + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (k) { var l = k.d.DisplayMessage.toString(); var m = k.d.DisplayType.toString(); var e = l.toString(); var j = m.toString(); switch (j) { case "1": a.alerts.Success(e); break; case "2": a.alerts.Error(e); break; case "3": a.alerts.Warning(e); break; case "4": a.alerts.Info(e); break; case "5": a.alerts.Prompt(e); break; case "6": a.alerts.Confirm(e); break; case "7": a.alerts.Mandatory(e); break; default: a.alerts.Info(e) } }, error: function (k, e, j) { a.alerts.Error(k.status + " - " + k.responseText) } }) } else { if (f == 0) { switch (h) { case 1: a.alerts.Success(b); break; case 2: a.alerts.Error(b); break; case 3: a.alerts.Warning(b); break; case 4: a.alerts.Info(b); break; case 5: a.alerts.Prompt(b); break; case 6: a.alerts.Confirm(b); break; case 7: a.alerts.Mandatory(b); break; default: a.alerts.Info(b) } } } } catch (c) { alert(c) } } })(jQuery);
