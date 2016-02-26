
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
candidateId = parseInt(qs["cndid"]);
countryId = parseInt(qs["cntyid"]);
sessionId = parseInt(qs["ssid"]);

$(document).ready(function () {
    $('.overlay').hide();
    $('.error_popup').hide();
    tooltipfun();
});

var welcomePage = angular.module('RAWelcome', []);

//welcomePage.controller('CtrlWelcomePage', function CtrlWelcomePage($scope, $sce) {
welcomePage.controller('CtrlWelcomePage', ["$scope", "$sce", function($scope, $sce) {
    var AssoName = $("#AssoName").val();
    $scope.Name = AssoName;
    $scope.WelcomeMessage = $sce.trustAsHtml('<p>Welcome to Cognizant</p><p>Hope you will enjoy the work with the culture we have</p><p>Have a bright future ahead working with us</p>');
}]);

function citySelection(cityId, cityValue) {
    window.location.href = 'CityInfo.htm?ssid=' + sessionId + '&cndid=' + candidateId + '&cntyid=' + countryId+ '&CityId=' + cityId + '&CityName=' + cityValue;
}

/* Tool tip Starts */
function tooltipfun() {
    $('.s2_mapwrap li span').each(function () {
        $(this).qtip({
            content: {
                text: $(this).parent().children('.info').html()
            },

            show: 'mouseover',
            hide: 'mouseout',
            //hide: 'click',
            style: {
                // name: 'dark',
                //tip: 'bottomLeft' 
                //classes: { tooltip: 'qtip-dark' },
                // border: { width: 0, radius: 0, color: '#ccd6af' },
                // title: { background: '#f7faef', color: '#2e2e2e' },
                // background: '#f7faef',
                // color: '#2e2e2e',
                fontSize: '11px',
                width: { min: 0, max: 350 },
                tip: {
                    corner: 'leftMiddle',
                    size: { width: 24, height: 27 }
                }
            },

            position: {
                my: 'Center Left',
                target: 'mouse',
                corner: {
                    target: 'rightMiddle',
                    tooltip: 'leftMiddle'
                },
                adjust: {
                    screen: true
                },
                viewport: $(window)
            }
        });
    });

    $('.s2_mapwrap span').remove('.info');

}

/* Tool tip Ends */

/*Close error popup*/
function CloseErrorPopup() {
    $('.error_popup').hide();
    $('.overlay').hide();
}