var OBUtils = {
    OBQueryString: (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('='); if (p.length != 2) continue; b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        } return b;
    })(window.location.search.substr(1).split('&'))
};

//Initializing globally processing variables
candidateId = OBUtils.OBQueryString.cndid;
countryId = OBUtils.OBQueryString.cntyid;
sessionId = OBUtils.OBQueryString.ssid;

var CityId = 0;
var cityName = '';
cityName = OBUtils.OBQueryString.CityName;
$(document).ready(function () {
    $('div .cityName').text(cityName);
    $("#txtSearch").bind("focus", function (e) {
        var thisObj = $(this);
        if (thisObj.val() == "Search here") {
            thisObj.val('');
        }
    });
    $("#txtSearch").bind("blur", function (e) {
        var thisObj = $(this);
        if (thisObj.val() == "") {
            thisObj.val('Search here');
        }
    });
});

function changeCity()
{
   window.location.href = 'HomePage.htm?ssid=' + sessionId + '&cndid=' + candidateId + '&cntyid=' + countryId ;
}

var myApp = angular.module('RelocationApp', []);

myApp.controller('CtrlCityInfo', ["$scope", "$sce", function ($scope, $sce) {
    CityId = parseInt(OBUtils.OBQueryString["CityId"]);
    switch (CityId) {
        case 1: //Hyderabad

            $scope.WriteUpInfo = [
            /* 298015 Old data
            { FieldName: 'Information', FieldValue: 'Royal and  romantic are just a few terms to describe Hyderabad, but one has to be present here to truly experience this historic city.' },
            { FieldName: '', FieldValue: 'Also known as the City of Pearls, Hyderabad is the capital of Andhra Pradesh, the largest city in the state as well as the sixth largest city in India. Founded in 1591 by Muhammad Quli Qutb Shah, today a major hub for the information technology industry. In fact, Hyderabad has earned the title of "Cyberabad" these days.' },
            { FieldName: '', FieldValue: 'To the modern tourist, Hyderabad offers excitement and excellent entertainment that includes heritage, Nature, wildlife, cultural and shopping sites. ' },
            { FieldName: '', FieldValue: 'The hospitality at Hyderabad is unmatched and the laid-back "Nawabi" style of living is totally relaxing. The range of yummy foods, the availability of various types of accommodation, the plethora of places to visit, affordable shopping options offering pearls, gems, handicrafts, fabrics, garments, branded merchandise and the different colors of culture & festivals make Hyderabad one of the most memorable tourist destinations.' }
            */
            /* 298015 New data */
                            {FieldName: 'Information', FieldValue: 'Hyderabad, once a rich princely state ruled by Nizams, is now a bustling metro that combines an old world charm with a hi-tech culture. The Nizam rule legacy includes the old Charminar Mosque, the pride of the city, and the Falaknuma Palace, now a Taj hotel, as well as a cuisine which includes the now famous biriyani.' },
                            { FieldName: '', FieldValue: 'Hyderabad was historically known as a pearl and diamond trading centre, and it continues to be known as the City of Pearls. Many of the city\'s traditional bazaars, including Laad Bazaar, Begum Bazaar and Sultan Bazaar, have remained open for centuries. The city has attracted people particularly from northern India and this has enriched the city\'s culture. Right from Mughals to the Nizams, all rulers of this erstwhile princely State have encouraged the growth literature and art.' },
                            { FieldName: '', FieldValue: 'One of the largest cities of India, Hyderabad (Pop: 6.8 million) is indeed a city of contrasts: The old trading center and maze of bazaars, jostles with the glass and concrete structures of new economy corporates in the IT and Bio-technology. Hyderabad also boasts of a large film industry, locally known as \'Tollywood\', tranquil lakesides, trendy bars and restaurants, all backed by a friendly, out-going and hospitable local population. Today, several Fortune 500 companies are based here.' }
                            ];

            $scope.ClimateInfo = [
                            { FieldName: 'Information', FieldValue: 'Hyderabad’s weather varies with the seasons. Winters are mostly cold to very cold, ranging between a maximum of 22 degrees to a minimum of 12 degrees. And winters are the most pleasant of all seasons in Hyderabad. Summers are generally hot and are marked by hot air during the daytime and the temperatures range between a maximum of 45 degrees to a minimum of 27 degrees. Due to the southwest monsoon, Hyderabad’s average annual rainfall is around 90 cm.' },
                            ];

            $scope.SeasonInfo = [
                            { FieldName: 'Information', FieldValue: 'The best season to visit Hyderabad is November to February.' }
                            ];

            $scope.AccomodationInfo = [
                            { FieldName: 'Information', FieldValue: 'The nearest residential areas to our office in Gachibowli  include Gachibowli, Madhapur, Jubilee Hills, Miyapur, Kondapur, Kothaguda, Banjara hills, Masabtank, Mehdipatnam, Towlichowki, Langarhouse, Punjagutta, Somajiguda, etc. Here you can easily find flats, guesthouses, hostels, paying guest accommodation, individual houses on rent. Paying guest accommodation would range from Rs.3500/- to Rs.6000/- inclusive of meals for 2 times a day. You can also rent a flat and stay on a sharing basis along with other colleagues & friends.' },
                            { FieldName: 'Hotels/Restaurants', FieldValue: '' }
                            ];

            $scope.HotelServices = [
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Sahib Sultan</b>, Banjara Hills<br/>Indian cuisine<br/>040 66683337, 040 66570000') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Flavors of China</b>, Hi Tech city<br/>Chinese<br/>040 40101040') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Mast Kalandhar</b>, Hi Tech city<br/>North Indian, known for Veg<br/>08064576364, 08064576162') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Ginger Court</b>, Madhapur<br/>European, North Indian, Chinese<br/>040 2313731, 23113732') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Deccan House</b>, Hi Tech City<br/>Hyderabadi, fast food, Mughal<br/>040 40058333') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Banne Nawab\'s</b>, Toli Chowki<br/>Hyderabadi, Mughal<br/>040 64584228') }
                            ];

            $scope.LanguageInfo = [
                            { FieldName: 'Local Lingo', FieldValue: 'Hyderabad comprises predominantly Telugu and Urdu (particularly Deccani-Urdu) speaking people. English is widely understood in many parts of the city.' }
                            ];

            $scope.AirTravelInfo = [
                            { FieldName: 'More Info', FieldValue: 'Hyderabad\'s new Rajiv Gandhi International Airport, opened in 2008, is a busy centre. Hyderabad is connected to almost all the major cities of India. Most of the public and private air carriers in India and some of the major multinational carriers use this as major hub. The airport is about 22 Km from the city, connected well by road. The airport\'s special bus service , besides the AP State Transport Corporation, both offer bus connectivity to major destinations in the city.' }
                            ];

            $scope.AirServiceProviders = [
                            ];

            $scope.TrainTravelInfo = [
                            { FieldName: 'More Info', FieldValue: 'Secundarabad railway station is the largest station and the headquarters for South Central Railway. Other major railway stations in Hyderabad are Deccan, Kachiguda and Begumpet stations, which connect with all the major towns and cities in India.' }
                            ];

            $scope.TrainServiceProviders = [
                            ];

            $scope.RoadTravelInfo = [
                            { FieldName: 'More Info', FieldValue: 'Hyderabad sits on the junction of major national highways that connects the  city with other Northern States and to neighboring States too. The AP State Road Transport Corporation (APSRTC) provides reliable and inexpensive bus connectivity to all other cities and towns within Andhra Pradesh and Telangana regions as well as the surrounding States.' }
                            ];

            $scope.RoadServiceProviders = [
                            ];

            $scope.SeaTravelInfo = [
                            ];

            $scope.SeaServiceProviders = [
                            ];

            $scope.Offices = [
            /* 298015 Old data
            { FieldName: 'Gachibouli', FieldValue: $sce.trustAsHtml('DLF Cybercity-SEZ, <br/> Phase-I,II,III, Plot No: 129,130,131,132,<br/> APHB Colony, Gachibowli') },
            { FieldName: '', FieldValue: $sce.trustAsHtml('Plot No. 24,25,26, Financial District,<br/> Nanakramguda, Hyderabad.') },
            { FieldName: 'Madhapur', FieldValue: $sce.trustAsHtml('Raheja, Mindspace, Building No: 20,<br/>  M/s.,Sundew Properties Pvt Ltd., - SEZ,<br/>  3rd and 4th, office Levels,Building 20, Madhapur Village, <br/>Serilingampally Mandal, Hyderabad.') },
            { FieldName: '', FieldValue: $sce.trustAsHtml('Plot No. H-01A, Surve No 34(P), and 38(P)-SEZ, <br/>HiTech City, Behind Dell Office Madhapur, Hyderabad') },
            { FieldName: '', FieldValue: $sce.trustAsHtml('The "V", Plot No. 17 Software Units Layout, 8th Floor Vega Building') },
            { FieldName: 'Ameerpet', FieldValue: $sce.trustAsHtml('Unit No 2, 505 - 520, 4th , 5th floors &601 Block,<br/> Swarnajayanthi Commercial Complex, Ameerpet, Hyderabad - 500 038') }
            */
            /* 298015 New data */
                            {FieldName: 'ISC – I', FieldValue: $sce.trustAsHtml('Cognizant Technology Services Pvt. Ltd.,<br/>Plot No. 24,25,26, Financial District,<br/> Nanakramguda, Hyderabad.') },
                            { FieldName: 'ISC – II', FieldValue: $sce.trustAsHtml('Cognizant Technology Services Pvt. Ltd.,,<br/>Plot H-01A, Phoenix Infocity Pvt. Ltd.(SEZ),<br/>Survey No 30(P), 34(P), 35(P) and 38(P),<br/>Hitech City-2, Hyderabad') },
                            { FieldName: 'HYD DLF Phase 1', FieldValue: $sce.trustAsHtml('Cognizant Technology Solutions India Pvt Ltd.,<br/>DLF  Bulding , block – 1, plot # 129 to 132,<br/>APHB colony,<br/>Gachibowli,Hyderabad') },
                            { FieldName: 'HYD DLF Phase 2', FieldValue: $sce.trustAsHtml('Cognizant Technology Solutions India Pvt Ltd.,<br/>DLF  Bulding , block – 2, plot # 129 to 132,<br/>APHB colony,<br/>Gachibowli,Hyderabad') },
                            { FieldName: 'HYD DLF Phase 3', FieldValue: $sce.trustAsHtml('Cognizant Technology Solutions India Pvt Ltd.,<br/>DLF  Bulding , block – 3, plot # 129 to 132,<br/>APHB colony,<br/>Gachibowli,Hyderabad') },
                            { FieldName: 'Raheja Block 20', FieldValue: $sce.trustAsHtml('Cognizant Technology Solutions India Pvt Ltd.,<br/>Raheja IT Park (Hyderabad) Pvt. Ltd,<br/>Building No: 20, 8th Floor, Survey No. 64,<br/>APIIC Software Layout,Next to VSNL,<br/>Hitech City, Madhapur,Hyderabad') },
                            { FieldName: 'CoreLogic - Ameerpet', FieldValue: $sce.trustAsHtml('CoreLogic Global Services Private Limited,<br/>A Cognizant Company Unit No 2, 505 - 520,<br/>Swarna Jayanthi Commercial Complex, Ameerpet,<br/>SR Nagar Post, Hyderabad') },
                            { FieldName: 'EDR VBIT', FieldValue: $sce.trustAsHtml('Excellence Data Research Pvt. Ltd,<br/>The "V", Plot No. 17, Vega block, 08th floor,<br/>Software Units Layout, Madhapur,<br/>Ranga Reddy District, Hyderabad') }
                            ];

            $scope.TrainingCenters = [
                            { FieldName: 'DLF-Gachibowli', FieldValue: $sce.trustAsHtml('DLF Cybercity-SEZ,<br/>Phase-I,II,III, Plot No: 129,130,131,132,<br/>APHB Colony, Gachibowli') },
                            { FieldName: 'Raheja IT Park', FieldValue: $sce.trustAsHtml('Raheja, Mindspace, Building No: 20,<br/>M/s.,Sundew Properties Pvt Ltd., - SEZ,<br/>3rd and 4th, office Levels,Building 20, Madhapur Village,<br/>Serilingampally Mandal, Hyderabad.') }
                            ];

            $scope.TransportModesHeader = [];
            $scope.TransportModes = [];

            $scope.TransportModesAvailable = [
                            { FieldName: 'Auto rickshaws', FieldValue: 'One of the easiest mediums of transport in Hyderabad is an auto rickshaw which can connect, almost, any two places in Hyderabad.' },
                            { FieldName: 'Taxis', FieldValue: 'The following are the prominent cab service providers:' },
                            { FieldName: '', FieldValue: 'Dot Cabs - 040 2424 2424' },
                            { FieldName: '', FieldValue: 'Orange Cabs - 040  6631 5555' },
                            { FieldName: '', FieldValue: 'Yellow Cabs - 040 4646 4646' },
                            { FieldName: '', FieldValue: 'Meru Cabs - 040 44224422' },
                            { FieldName: 'MMTS', FieldValue: 'MMTS is a local train system in Hyderabad with 84 services a day covering 27 stations. MMTS has first class, general class, and special ladies compartments. (http://www.mmtstraintimings.in)' }
                            ];

            //            $scope.CognizantTransportService = [];
            $scope.CTransportService = [
              { FieldName: 'Location Type', FieldValue: $sce.trustAsHtml('Metro') },
              { FieldName: 'Transport radius in KM', FieldValue: $sce.trustAsHtml('35') },
              { FieldName: 'City centre', FieldValue: $sce.trustAsHtml('State assembly') },
              { FieldName: 'Serviceable areas', FieldValue: $sce.trustAsHtml('All areas within 35 km and before the Non serviceable areas.') },
              { FieldName: 'Non serviceable areas', FieldValue: $sce.trustAsHtml('Shamshabad, Bahadurpalli, Beeramguda Kaman, After BHEL Main Gate, Dundigal, Ghatkesar, Singapore City, Thumkunta, Gandimisamma, Isnapur, Kandlakoya, Kompally, Medchal Patancherru,Sangareddy, Shamirpet, Shapur, MB Darga, Bachupally, Balaji Nagar - Yapral, Yeddumailaram, Shadnagar, Kowkoor, Shankerpally, Pochampally & Hakimpet') },
              { FieldName: 'City Transport Infra to be leveraged', FieldValue: $sce.trustAsHtml('Public/Pvt Buses, MMTS operational till midnight from early morning.') }
              ];

            $scope.TouristHeader = [
            //298015 tourist spots with desc
                            {name: 'Category', addInfo: 'Place Name', desc: 'More Info' }
                            ];

            $scope.TouristSpots = [
                            { name: 'Art, Culture and Historical Interest', distance: 'Golconda Fort', Description: 'Situated 11 km from Hyderabad, this Fort is encircled by a 11-km-long outer wall. The region is universally famous for the mines that have produced the world\'s most famous and coveted gems, including The Hope Diamond, Idol\'s Eye, The Koh-i-Noor and Darya-i-Noor.' },
                            { name: 'Art, Culture and Historical Interest', distance: 'Charminar', Description: 'A living piece of Islamic architecture, built in the 16th Century monument, whose literal meaning is Four Towers, it is listed among the most recognized structures of India.' },
                            { name: 'Art, Culture and Historical Interest', distance: 'Purani Haveli', Description: 'A 200 year old palace of the Nizam, this also houses the Nizam’s Museum. A unique feature of this palace is the world\'s longest wardrobe, built in two levels with a hand-cranked wooden lift(elevator) in place. This occupies the entire length of one wing of the palace.' },
                            { name: 'Art, Culture and Historical Interest', distance: 'Salar Jung Museum', Description: 'On Salar Jung Road, is this huge collection of art and artefacts, and the biggest one man collections of antiques in the world.' },
                            { name: 'Science and contemporary subjects', distance: 'Nehru Zoo', Description: 'One of the best maintained zoological parks in the region, this Park at Bahadurpura, can be a real educative visit.' },
                            { name: 'Science and contemporary subjects', distance: 'Birla Planetarium ', Description: 'This facility in Hill Fort can be an enjoyable experience for youngsters.' },
                            { name: 'Must visits', distance: 'Birla Mandir', Description: '' },
                            { name: 'Must visits', distance: 'Ramoji Film City', Description: '' },
                            { name: 'Must visits', distance: 'Hussain Sagar and other lakes', Description: '' }
                            ];

            $scope.OtherTouristSpots = [
            /*298015 - see touristSpots tab
            { FieldName: 'Places to Visit in Hyderabad', FieldValue: '• Charminar' },
            { FieldName: '', FieldValue: '• Mecca Masjid' },
            { FieldName: '', FieldValue: '• Birla Planetarium' },
            { FieldName: '', FieldValue: '• Falaknuma Palace' },
            { FieldName: '', FieldValue: '• Golconda Fort' },
            { FieldName: '', FieldValue: '• Salar Jung Museum' },
            { FieldName: '', FieldValue: '• State Archaeological Museum' },
            { FieldName: '', FieldValue: '• Hussain Sagar Lake' },
            { FieldName: '', FieldValue: '• Birla Mandir' },
            { FieldName: '', FieldValue: '• Jama Masjid' },
            { FieldName: '', FieldValue: '• Chote Hazrat Ki Dargah' },
            { FieldName: '', FieldValue: '• Nehru Zoological Park' },
            { FieldName: '', FieldValue: '• Ramoji film city' },
            { FieldName: '', FieldValue: '• Qutub Shahi Tombs' },
            { FieldName: '', FieldValue: '• Paigah Tombs' }
            */
                            ];

            $scope.OtherPlaces = [
            /*start 298015 */
                            {FieldName: 'Malls in Hyderabad', FieldValue: '• Reliance Mart' },
                            { FieldName: '', FieldValue: '• South India Shopping' },
                            { FieldName: '', FieldValue: '• Brand Factory' },
                            { FieldName: '', FieldValue: '• GVK One' },
                            { FieldName: '', FieldValue: '• Inorbit mall' },
                            { FieldName: '', FieldValue: '• Hyderabad Central' },
                            { FieldName: '', FieldValue: '• The Chennai Shopping' },
                            { FieldName: '', FieldValue: '• Shoppers Stop' },
                            { FieldName: '', FieldValue: '• City Centre' },
            /*end 298015*/
                            {FieldName: 'Cinema Halls', FieldValue: '• Prasad Multiplex, Nuckless Road 040 39895050, 23448888' },
                            { FieldName: '', FieldValue: '• PVR Cinima Panjagutta 040 66621115, 66621116' },
                            { FieldName: '', FieldValue: '• Cinimax, Banjara Hills 040 44565555, 44565559' },
                            { FieldName: '', FieldValue: '• Big Cinema Ameerpet 040 39894040, 30581470' },
                            { FieldName: '', FieldValue: '• GVK Inox, Banjara Hills 040 67494949' },
                            { FieldName: '', FieldValue: '• Cine Planet Multiplex 040 39895050' }
            /* 298015 - deleted as per new content
            ,{ FieldName: '', FieldValue: '• Reliance Mart' },
            { FieldName: '', FieldValue: '• South India Shopping' },
            { FieldName: '', FieldValue: '• Pantaloons Stor' },
            { FieldName: '', FieldValue: '• Kalanikethan Wedding' },
            { FieldName: '', FieldValue: '• CMR Shopping' },
            { FieldName: '', FieldValue: '• The Chennai Shopping' },
            { FieldName: '', FieldValue: '• South India Shopping' },
            { FieldName: '', FieldValue: '• Woman’S World' },
            { FieldName: '', FieldValue: '• The Chennai Shopping' },
            { FieldName: '', FieldValue: '• Padmavathi Shopping' },
            { FieldName: '', FieldValue: '• RKS Grand Shopping' },
            { FieldName: '', FieldValue: '• Megamart' },
            { FieldName: '', FieldValue: '• City' },
            { FieldName: '', FieldValue: '• Shangrila Plaza' },
            { FieldName: '', FieldValue: '• Bonsai Mpm' },
            { FieldName: '', FieldValue: '• Maheshwari Retailing' },
            { FieldName: '', FieldValue: '• R.K. Digital Shopping' },
            { FieldName: '', FieldValue: '• Saravana Shopping' },
            { FieldName: '', FieldValue: '• National Shopping Centre' },
            { FieldName: '', FieldValue: '• Big Bansals' },
            { FieldName: '', FieldValue: '• Pegasus Shopping' },
            { FieldName: '', FieldValue: '• Western Shopping Centre' },
            { FieldName: '', FieldValue: '• City Center' },
            { FieldName: '', FieldValue: '• Serena Shopping' }
            */
                            ];

            $scope.ImpServices = [// done
                            {FieldName: 'Police', FieldValue: '100 ' },
                            { FieldName: 'Ambulance,Fire,Accident & Trauma', FieldValue: '108' },
                            { FieldName: 'Child helpline ', FieldValue: '1098' }
            /*298015 - deleted -repeating data
            ,{ FieldName: 'Cab Services', FieldValue: ' ' },
            { FieldName: ' ', FieldValue: 'Cell Cabs...23242526' },
            { FieldName: ' ', FieldValue: 'City Cabs...66316000, 66316001' },
            { FieldName: ' ', FieldValue: 'Dot Cabs...24242424' },
            { FieldName: ' ', FieldValue: 'Easy Cabs...43434343' },
            { FieldName: ' ', FieldValue: 'Fast Track...28889999, 27602760' },
            { FieldName: ' ', FieldValue: 'Hyderabad Cabs...23303324, 32455055' },
            { FieldName: ' ', FieldValue: 'Orange Cabs...66315555' },
            { FieldName: ' ', FieldValue: 'Yellow Cabs...44004400         ' },
            { FieldName: ' ', FieldValue: 'Meru Cabs...44224422' },
            { FieldName: ' ', FieldValue: '*STD Code of Hyderabad is 040' }
            */
                            ];
            $scope.AdditionalSvcTabs = [
                            { Id: 'ai1', Name: 'Hospitals' },
                            { Id: 'ai2', Name: 'Useful links' },
                            { Id: 'ai3', Name: 'Educational Institutes' }
                            ];

            $scope.AdditionalSvcTabsDetails = [
                            { Id: 'ai1', Details: [
                                                { FieldName: 'List of hospitals', FieldValue: '', FieldLink: $sce.trustAsHtml('<a href="http://www.hellohyderabad.com/Yellow-Pages/Medical/Hospitals" runat="server" style="color:blue;" target="_blank">http://www.hellohyderabad.com/Yellow-Pages/Medical/Hospitals/</a>') },
                                                { FieldName: 'Govt. Hospitals', FieldValue: 'Asian institute of Gastroentology - 23378888 ', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Cancer Hospital - 23318422', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'CDR Hospital (Hyderguda) - 23221221 ', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Durgabai Deshmukh Hospital - 27617801 ', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Govt. Chest Hospital - 23814421 / 22', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Osmania Gen, Hospital - 24600122', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'ESI, Erragadda -23700531', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'ENT, Koti - 24740245', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Golconda Hospital - 23513776', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Govt. Maternity Hosp. Koti - 24653647', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'King Koti Hospital - 24756085', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Mental Hospital, E’ gadda -  23813231', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Military Hospital, Sec’bad -  27792580', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'MNJ Cancer Hospital - 23318422', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'NIMS, Panjagutta - 23396552 / 23320332', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Railway Hospital, Sec’bad - 27001134', FieldLink: '' },
                                /* 298015 - deleted as per new content
                                { FieldName: '', FieldValue: 'SD Eye Hosp.Mehdipatnam - 23317274' },
                                { FieldName: '', FieldValue: 'State TB Centre, Erragadda -  23811797' },
                                */
                                                {FieldName: 'Private Hospitals', FieldValue: 'Andhra Mahila Sabha -27617801', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Apollo Hospital Jubilee Hills - 23607777', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Care Hospital - 24735465 - 70', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Care Hospital B’Hills - 23309162', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Chandramati Hospital- 23814628 / 23707060', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Fernandez Hospital - 24756997', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Genesis Hospital - 23222142', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Heritage Medical Centre - 23379202 / 23736468', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'Kamineni Wockhardt Hospital 66924444  ', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'KIMS - 27725105', FieldLink: '' },
                                                { FieldName: '', FieldValue: 'L.V.Prasad Eye Institute - 30612100 ', FieldLink: '' }
                                /* 298015 - deleted in new content
                                { FieldName: '', FieldValue: 'Matrika Hospital - 23404038 / 23410301' },
                                { FieldName: '', FieldValue: 'Mahaveer Hospital -23393134' },
                                { FieldName: '', FieldValue: 'Mediciti, Adarshnagar - 23231111' },
                                { FieldName: '', FieldValue: 'Medwin, Nampally - 23202902 ' },
                                { FieldName: '', FieldValue: 'Medinova  - 23311122 / 23311133 ' },
                                { FieldName: '', FieldValue: 'Nature Cure, Balkampet -23731786' },
                                { FieldName: '', FieldValue: 'Princess Esra.Purani Haveli - 24524416' },
                                { FieldName: '', FieldValue: 'Sagarlal Memorial Hospital - 27616456' },
                                { FieldName: '', FieldValue: 'St. Theresa’s Erragadda - 23701013' },
                                { FieldName: '', FieldValue: 'Usha Mullapudi Cardiac Centre -23090609' },
                                { FieldName: '', FieldValue: 'Vijay Marie- 23307350 / 23315055' },
                                { FieldName: '', FieldValue: 'Yasoda Hospital Somajiguda- 23319999' },
                                { FieldName: '24/7 pharmacies', FieldValue: 'http://www.hellohyderabad.com/Yellow-Pages/Medical/24Hour' }
                                */
                                                ]
                            },
                            { Id: 'ai2', Details: [
                                                { FieldName: 'More on Hyderabad', FieldValue: '', FieldLink: $sce.trustAsHtml('• <a href="http://www.fullhyderabad.com" runat="server" style="color:blue;" target="_blank">http://www.fullhyderabad.com</a>') },
                                                { FieldName: '', FieldValue: '', FieldLink: $sce.trustAsHtml('• <a href="http://www.justdial.com/hyderabad" runat="server" style="color:blue;" target="_blank">http://www.justdial.com/hyderabad</a>') },
                                                { FieldName: 'Govt.of India', FieldValue: '', FieldLink: $sce.trustAsHtml('• <a href="http://www.goidirectory.nic.in" runat="server" style="color:blue;" target="_blank">http://www.goidirectory.nic.in</a>') },
                                                { FieldName: 'Airways', FieldValue: '', FieldLink: $sce.trustAsHtml('• <a href="http://www.hyderabad.aero/flight-timetable.aspx" runat="server" style="color:blue;" target="_blank">http://www.hyderabad.aero/flight-timetable.aspx</a>') },
                                                { FieldName: 'Railways', FieldValue: '', FieldLink: $sce.trustAsHtml('• <a href="http://www.indianrail.gov.in" runat="server" style="color:blue;" target="_blank">http://www.indianrail.gov.in</a>') }
                                /*298015 as per New Content
                                ,{ FieldName: 'Note', FieldValue: '(Please note: While we try and provide you the most accurate information as possible, Cognizant is not responsible for any changes in the data, external URL links and/or telephone numbers provided in this document. We would request you to individually authenticate the same.)' },
                                { FieldName: 'Property Dealers', FieldValue: 'http://hyderabad.olx.in/' },
                                { FieldName: '', FieldValue: 'http://www.99acres.com/' }
                                */
                                                ]
                            },
            /*298015 - new tab educational institutes - as per new content*/
                            {Id: 'ai3', Details: [
                                                { FieldName: 'Colleges', FieldValue: '•	Osmania University', FieldLink: '' },
                                                { FieldName: '', FieldValue: '• Jawaharlal Nehru Technological University', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	University of Hyderabad', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Maulana Azad National Urdu University', FieldLink: '' },
                                                { FieldName: '', FieldValue: '• National Academy of Legal Studies and Research (NALSAR)', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	English and Foreign Languages University', FieldLink: '' },
                                                { FieldName: 'Vocational and Business Schools', FieldValue: '• National Academy of Construction', FieldLink: '' },
                                                { FieldName: '', FieldValue: '• NIFT Hyderabad', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Indian School of Business', FieldLink: '' },
                                                { FieldName: 'Technical Education', FieldValue: '• BITS Pilani, Hyderabad Campus', FieldLink: '' },
                                                { FieldName: '', FieldValue: '• IIIT Hyderabad', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Centre for Development of Advanced Computing, Hyderabad (CDAC)', FieldLink: '' },
                                                { FieldName: 'Schools', FieldValue: '• Living Bridge Montessori School (Suncity)[1]', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Taraporewalas Montessori House of Children, Lakdi ka pul', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Los Ninos Montessori, Kapadia lane, Somajiguda', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Medha Montessori School, Near NMDC Masab Tank', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Pebble Creek High Montessori School, A. S. Rao Nagar', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Slate The School', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Sreenidhi International School', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Vidyaranya High School', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	NASR School For Girls', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	St Ann\'s Convent High School', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Delhi Public School', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Bharatiya Vidya Bhavan\'s Vidyashram (Jubilee Hills)', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Oakridge International School (Gachibowli)', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Gowtham Model School', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Chinmaya Vidyalaya', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Hyderabad Public School (Begumpet)', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	DAV Public School', FieldLink: '' }
                                                ]
                        }
                            ];

            $scope.OtherServices = [ // done
            /*298015 - repeating data
            { FieldName: 'List of hospitals', FieldValue: 'http://www.hellohyderabad.com/Yellow-Pages/Medical/Hospitals/' },
            { FieldName: 'GOVT. HOSPITALS', FieldValue: 'Asian institute of Gastroentology - 23378888 ' },
            { FieldName: '', FieldValue: 'Cancer Hospital - 23318422' },
            { FieldName: '', FieldValue: 'CDR Hospital (Hyderguda) - 23221221 ' },
            { FieldName: '', FieldValue: 'Durgabai Deshmukh Hospital - 27617801 ' },
            { FieldName: '', FieldValue: 'Govt. Chest Hospital - 23814421 / 22' },
            { FieldName: '', FieldValue: 'Osmania Gen, Hospital - 24600122' },
            { FieldName: '', FieldValue: 'ESI, Erragadda -23700531' },
            { FieldName: '', FieldValue: 'ENT, Koti - 24740245' },
            { FieldName: '', FieldValue: 'Golconda Hospital - 23513776' },
            { FieldName: '', FieldValue: 'Govt. Maternity Hosp. Koti - 24653647' },
            { FieldName: '', FieldValue: 'King Koti Hospital - 24756085' },
            { FieldName: '', FieldValue: 'Mental Hospital, E’ gadda -  23813231' },
            { FieldName: '', FieldValue: 'Military Hospital, Sec’bad -  27792580' },
            { FieldName: '', FieldValue: 'MNJ Cancer Hospital - 23318422' },
            { FieldName: '', FieldValue: 'NIMS, Panjagutta - 23396552 / 23320332' },
            { FieldName: '', FieldValue: 'Railway Hospital, Sec’bad - 27001134' },
            { FieldName: '', FieldValue: 'SD Eye Hosp.Mehdipatnam - 23317274' },
            { FieldName: '', FieldValue: 'State TB Centre, Erragadda -  23811797' },
            { FieldName: 'PRIVATE HOSPITALS', FieldValue: 'Andhra Mahila Sabha -27617801' },
            { FieldName: '', FieldValue: 'Apollo Hospital Jubilee Hills - 23607777' },
            { FieldName: '', FieldValue: 'Care Hospital - 24735465 - 70' },
            { FieldName: '', FieldValue: 'Care Hospital B’Hills - 23309162' },
            { FieldName: '', FieldValue: 'Chandramati Hospital- 23814628 / 23707060' },
            { FieldName: '', FieldValue: 'Fernandez Hospital - 24756997' },
            { FieldName: '', FieldValue: 'Genesis Hospital - 23222142' },
            { FieldName: '', FieldValue: 'Heritage Medical Centre - 23379202 / 23736468' },
            { FieldName: '', FieldValue: 'Kamineni Wockhardt Hospital 66924444  ' },
            { FieldName: '', FieldValue: 'KIMS - 27725105' },
            { FieldName: '', FieldValue: 'L.V.Prasad Eye Institute - 30612100 ' },
            { FieldName: '', FieldValue: 'Matrika Hospital - 23404038 / 23410301' },
            { FieldName: '', FieldValue: 'Mahaveer Hospital -23393134' },
            { FieldName: '', FieldValue: 'Mediciti, Adarshnagar - 23231111' },
            { FieldName: '', FieldValue: 'Medwin, Nampally - 23202902 ' },
            { FieldName: '', FieldValue: 'Medinova  - 23311122 / 23311133 ' },
            { FieldName: '', FieldValue: 'Nature Cure, Balkampet -23731786' },
            { FieldName: '', FieldValue: 'Princess Esra.Purani Haveli - 24524416' },
            { FieldName: '', FieldValue: 'Sagarlal Memorial Hospital - 27616456' },
            { FieldName: '', FieldValue: 'St. Theresa’s Erragadda - 23701013' },
            { FieldName: '', FieldValue: 'Usha Mullapudi Cardiac Centre -23090609' },
            { FieldName: '', FieldValue: 'Vijay Marie- 23307350 / 23315055' },
            { FieldName: '', FieldValue: 'Yasoda Hospital Somajiguda- 23319999' },
            { FieldName: '24/7 pharmacies', FieldValue: 'http://www.hellohyderabad.com/Yellow-Pages/Medical/24Hour' },
            { FieldName: 'Restaurants', FieldValue: 'http://www.hellohyderabad.com/Yellow-Pages/Food-Restaurant' },
            { FieldName: 'More on Hyderabad', FieldValue: 'http://www.fullhyderabad.com/ , http://www.justdial.com/hyderabad' },
            { FieldName: 'Govt.of India', FieldValue: 'http://www.goidirectory.nic.in' },
            { FieldName: 'Airways', FieldValue: 'http://www.hyderabad.aero/flight-timetable.aspx' },
            { FieldName: 'Railways', FieldValue: 'http://www.indianrail.gov.in' },
            { FieldValue: '(Please note: While we try and provide you the most accurate information as possible, Cognizant is not responsible for any changes in the data, external URL links and/or telephone numbers provided in this document. We would request you to individually authenticate the same.)' }
            */
                            ];



            $scope.WriteUpInfoHide = $scope.WriteUpInfo.length == 0 ? true : false;
            $scope.ClimateInfoHide = $scope.ClimateInfo.length == 0 ? true : false;
            $scope.SeasonInfoHide = $scope.SeasonInfo.length == 0 ? true : false;
            $scope.AboutCityHide = $scope.WriteUpInfoHide && $scope.ClimateInfoHide && $scope.SeasonInfoHide;
            $scope.AccomodationHide = $scope.AccomodationInfo.length == 0 && $scope.HotelServices.length == 0 ? true : false;
            $scope.LanguageInfoHide = $scope.LanguageInfo.length == 0 ? true : false;
            $scope.SettlingDownHide = $scope.AccomodationHide && $scope.LanguageInfoHide;
            $scope.ByAirHide = $scope.AirTravelInfo.length == 0 && $scope.AirServiceProviders.length == 0 ? true : false;
            $scope.ByTrainHide = $scope.TrainTravelInfo.length == 0 && $scope.TrainServiceProviders.length == 0 ? true : false;
            $scope.ByRoadHide = $scope.RoadTravelInfo.length == 0 && $scope.RoadServiceProviders.length == 0 ? true : false;
            $scope.BySeaHide = $scope.SeaTravelInfo.length == 0 && $scope.SeaServiceProviders.length == 0 ? true : false;
            $scope.ReachingThereHide = $scope.ByAirHide && $scope.ByTrainHide && $scope.ByRoadHide && $scope.BySeaHide;
            $scope.OfficesHide = $scope.Offices.length == 0 ? true : false;
            $scope.TrainingCentersHide = $scope.TrainingCenters.length == 0 ? true : false;
            $scope.CognizantInCityHide = $scope.OfficesHide && $scope.TrainingCentersHide;
            $scope.TransportModesAvailableHide = $scope.TransportModesAvailable.length == 0 ? true : false;
            $scope.TransportModesHeaderHide = $scope.TransportModesHeader.length == 0 ? true : false;
            $scope.TransportModesHide = ($scope.TransportModes.length == 0 ? true : false) && $scope.TransportModesAvailableHide && $scope.TransportModesHeaderHide;
            $scope.CTransportServiceHide = $scope.CTransportService.length == 0 ? true : false;
            $scope.TravelWithinHide = $scope.TransportModesHide && $scope.CTransportServiceHide;
            $scope.TouristPlacesHide = $scope.TouristSpots.length == 0 && $scope.OtherTouristSpots.length == 0 ? true : false;
            $scope.OtherPlacessHide = $scope.OtherPlaces.length == 0 ? true : false;
            $scope.EntertainmentHide = $scope.TouristPlacesHide && $scope.OtherPlacessHide;
            $scope.ImpSvcHide = $scope.ImpServices.length == 0 ? true : false;
            $scope.ImpNosSrvcsHide = $scope.ImpSvcHide;
            $scope.AdditionalInfoHide = $scope.AdditionalSvcTabs.length == 0 ? true : false;
            break;
        //-------------------------------------------------hyderabad end                                                          
        //-------------------------------------------------Chennai start                                                          
        case 2:
            $scope.WriteUpInfo = [
                            { FieldName: 'Information', FieldValue: 'The vibrant city of Chennai is currently home to over 4.7 million people. Its metropolitan area is 4th largest in India with a population of 8.9 million.' },
                            { FieldName: '', FieldValue: 'Often called the cultural capital of India, Chennai  is actually younger that its image. In just over 350 years, Chennai has blossomed from a fishing hamlet to a British township (Madras) and on to a charming city that has a large heart and is very welcoming. It is city that has embraced modern technology and the traditional arts and crafts, making its outlook and population truly cosmopolitan.' },
                            { FieldName: '', FieldValue: 'In 1639 Francis Day and Andrew Cogan, agents for the English East India Company, acquired a strip of land on lease from the Vijayanagar King. They built the Fort St.George, which remains of the city’s important landmark and serves as the Government Secretariat today. From this came the other British settlements. The localities nearby, such as Triplicane, Purasawalkam, Egmore and Chetput slowly merged with the new development, to form Chennapatnam, as Chennai was known. The city was called Madras and in 1996 was renamed Chennai.' },
                            { FieldName: '', FieldValue: 'The metro, a gateway to South India, Chennai is a busy place, but one that is surprisingly green too. Chennai lies at the heart of the Hindu south, but is also an important centre for Christianity. The basilica of San Thome (St. Thomas) is one of only three in the world built over the tomb of an apostle. Whilst the performing arts are cherished and nurtured in this city, Chennai-ites (a tongue-twister locals cope with admirably) equally enjoy a meal at one of the many pizza outlets and a night out at the cinema.' },
                            { FieldName: '', FieldValue: 'Chennai is also a politically and economically influential part of India. It is also an important educational / academic center with an abundance of universities, colleges, an IIT and several research institutions.' }
                            ];

            $scope.ClimateInfo = [
                            { FieldName: 'Information', FieldValue: 'Chennai weather is hot and humid as it lies close to the tropics and is also on the coast. November to February are relatively pleasant months for Chennai. The hottest months, of course are April - July though the sea-breeze, as it is locally called, can make the hottest days bearable during evenings. During these months, the day temperature can go up from 38 degrees C to 42 degrees C. The city gets most of its seasonal rainfall from the north-east monsoon winds, from Mid-October to Mid – December, and the rest during June – August.' },
                            { FieldName: 'Best time to visit', FieldValue: 'December - February' }
                            ];

            $scope.SeasonInfo = [
                            ];

            $scope.AccomodationInfo = [
                            { FieldName: 'Information', FieldValue: 'Chennai is a place where one can find accommodation to suit everybody’s budget. It is advisable to be careful when seeking the services of brokers, as they are known to take undue advantage of new comers to Chennai. It is habitual to pay 5-10 months’ rent as advance. Please take the advice of your seniors before fixing accommodation and food.' }
                            ];

            $scope.HotelServices = [
                            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">PG/ Hostels in Chennai</b>') },
                            { desc: $sce.trustAsHtml('• <a href="http://rentals.sulekha.com/paying-guests-in-chennai" target="_blank" type="text/html" style="color:blue;">http://rentals.sulekha.com/paying-guests-in-chennai</a>') },
                            { desc: $sce.trustAsHtml('• <a href="http://www.justdial.com/Chennai/Hostels" target="_blank" type="text/html" style="color:blue;">http://www.justdial.com/Chennai/Hostels</a>') },
                            { desc: $sce.trustAsHtml('• <a href="http://www.hostelsinchennai.com/" target="_blank" type="text/html" style="color:blue;">http://www.hostelsinchennai.com/</a>') },

                            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f; margin-left:-200px; margin-bottom:-12px;">Restaurants</b>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Hotel Saravana Bhavan</b><br/>Indian Vegetarian<br/>Has a chain of restaurants across Chennai and its suburbs.<br/>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Barbecue Nation, T. Nagar</b><br/>North Indian and Continental<br/>Ph: 044 – 6060 0000 / 044 64530160<br/>') },

                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Mainland China</b><br/>Chinese / Continental<br/>Ph: 044 2828 8312<br/>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Copper Chimney , Radhakrishnan Salai </b><br/>North Indian/Continenetal<br/>Ph: 044 43577775<br/>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Kumarakom Restaurant</b><br/>Kerala /South Indian</br>Velachery Vijaya Nagar Exten<br/>Ph: 044 420222777<br/>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">The Holy Smoke</b><br/>Multi cuisine <br/>Thoraipakkam<br/>Ph: 044 - 64506902<br/>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Amaravathi Restaurant</b><br/>Andhra cuisine <br/>Cathedral Road, and Karapakkam <br/>Ph: •	044 2811 6416, 044 24500811<br/>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Dhaba Express </b><br/>Punjabi, Multi Cuisine <br/>Sarojini St., T Nagar<br/>Ph: 044 64549911<br/>') },

                            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f; margin-left:-200px; margin-bottom:-12px;">You can also look up at</b>') },
                            { desc: $sce.trustAsHtml('<a href="http://www.zomato.com/chennai" runat="server" target="_blank" style="color:blue;">http://www.zomato.com/chennai</a>') }

            /*298015commented old data
            ,
            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Hotels in Chennai</b>') },
            { desc: $sce.trustAsHtml('• <a href="http://www.tripadvisor.in/Hotels-g304556-Chennai_Madras_Tamil_Nadu-Hotels.html" target="_blank" type="text/html" style="color:blue;">www.tripadvisor.in/Hotels-g304556-Chennai_Madras_Tamil_Nadu-Hotels.html</a>') },
            { desc: $sce.trustAsHtml('• <a href="http://www.makemytrip.com/hotels/chennai-hotels.html" target="_blank" type="text/html" style="color:blue;">http://www.makemytrip.com/hotels/chennai-hotels.html</a>') },
            { desc: $sce.trustAsHtml('• <a href="http://www.yatra.com/hotels/hotels-in-chennai" target="_blank" type="text/html" style="color:blue;">http://www.yatra.com/hotels/hotels-in-chennai</a>') }
            */
                            ];


            $scope.LanguageInfo = [
                            { FieldName: 'Official language', FieldValue: 'Tamil' },
                            { FieldName: 'More info', FieldValue: 'A good number of people in Chennai can communicate in English. Telugu is spoken by a significant minority in the city.' }
                            ];

            $scope.AirTravelInfo = [
                            { FieldName: 'Information', FieldValue: 'Chennai’s Meenambakkam airport (about 10 KM to the south on NH4), is an national and international hub that connects the metro with most parts of India and other countries. Chennai has direct flights to most of the globally renowned destinations and so has booking and assistance offices of all the national and international carriers. The airport is not too far from the city and well-connected by bus and rail. Prepaid cab services are also available in both the domestic and international terminals.' }
                            ];

            $scope.AirServiceProviders = [
                            ];

            $scope.TrainTravelInfo = [
                            { FieldName: 'Information', FieldValue: 'The city has two main railway terminals – Central Railway station that connects to almost all the States across India; and Chennai Egmore from where one can reach almost all the towns within Tamil Nadu. As both the stations are located in the busy business district of the city, they are well connected by cab, car, buses or local EMU services.' },
                            { FieldName: '', FieldValue: 'Chennai also has a network of local EMU trains that connects the central business district with the southern suburbs, northern suburbs, and also an elevated MRTS. Work is on to create a large underground / surface Metro corridor. ' }
                            ];

            $scope.TrainServiceProviders = [
                            ];

            $scope.RoadTravelInfo = [
                            { FieldName: 'Information', FieldValue: 'The Central Mofussil Bus Terminal (CMBT) at Koyambedu in the city’s western fringe is a vast hub of bus services. One of the largest terminals of its kind in Asia, the CMBT serves as a connecting point for travelers to all other parts of Tamil Nadu and  the neighboring States. Travelers have a choice of taking State-owned or private (omni) buses, though the private operators charge higher.' }
                            ];

            $scope.RoadServiceProviders = [
                            ];

            $scope.SeaTravelInfo = [
                            ];

            $scope.SeaServiceProviders = [
                            ];

            $scope.Offices = [
                            { FieldName: 'TCO Office', FieldValue: $sce.trustAsHtml('5/535, Old Mahabalipuram Road,<br/>Okkiam Thoraipakkam, Chennai, Tamil Nadu - 600 096') },
                            { FieldName: 'NVL Office', FieldValue: $sce.trustAsHtml('63/1&2, Old Mahabalipuram,<br/>Navalur, Chennai, Tamil Nadu - 602103') },
                            { FieldName: 'Siruseri Office - SEZ', FieldValue: $sce.trustAsHtml('B-40,41,42,44 Siruseri Sipcot IT Park - SEZ,Padur Post, Siruseri,<br/> Kancheepuram Dt.,Chennai, Tamil Nadu - 603103') },
                            { FieldName: 'Siruseri Office – STP', FieldValue: $sce.trustAsHtml('Plot No H-4, Sipcot IT Park, Old Mahabalipuram Road,<br/>Siruseri, Chennai, Tamil Nadu - 603103') },
                            { FieldName: 'MEPZ', FieldValue: $sce.trustAsHtml('MEPZ - Special Economic Zone,Plot No A-15, 16, 17, (Part) B-20, C-10 & C-1 and D-2,<br/>National Highways, 45, Tambaram, GST Road,<br/>Chennai, Tamil Nadu - 600045') },
                            { FieldName: 'DLF Office', FieldValue: $sce.trustAsHtml('DLF-SEZ Block 9, G- 3rd Floor,10th & 11 th Floor 1/124, Mount Ponnamalee High Road,<br/>Manapakkam, Chennai, Tamil Nadu – 600116') },
                            { FieldName: 'CCO', FieldValue: $sce.trustAsHtml('Menon Eternity,, 6th, 7th and 8th Floors,165, St Mary s Road,<br/>Alwarpet, Chennai, Tamil Nadu - 600018') },
                            { FieldName: 'CRC', FieldValue: $sce.trustAsHtml('Carr Tower, Ramanujan IT SEZ, Taramani,<br/>Rajiv Gandhi Salai (OMR), Chennai, Tamil Nadu - 600113') },
                            { FieldName: 'ASV Suntech Park', FieldValue: $sce.trustAsHtml('ASV, Suntech Park, 148, Rajiv Gandhi Salai (OMR),<br/>Mettukuppam, Chennai, Tamil Nadu - 600096') }

            /*298015 - commented old data
            ,
            { FieldName: 'GMR Office', FieldValue: $sce.trustAsHtml('5/639 Old Mahabalipuram Road,<br/>Kandanchavadi, Chennai, Tamil Nadu - 600096') },
            { FieldName: 'Pallikaranai Office', FieldValue: $sce.trustAsHtml('56/3A, Pallikaranai Village, Thoraipakkam Pallavaram 20, 0 Feet Road,<br/>Pallikaranai, Chennai, Tamil Nadu - 600100') },                            
            { FieldName: 'Tidal Park', FieldValue: $sce.trustAsHtml('Tidel Park, Block C,4, Canal Bank Road,<br/>Taramani, Chennai, Tamil Nadu - 600113') },
            { FieldName: 'PRN Office', FieldValue: $sce.trustAsHtml('No. 1, Veeranam Road, Perungudi Bye Pass,<br/>Perungudi, Chennai, Tamil Nadu - 600096') }
            */
                            ];

            $scope.TrainingCenters = [
                            { FieldName: 'ASV Suntech Park', FieldValue: $sce.trustAsHtml('ASV, Suntech Park, 148, Rajiv Gandhi Salai (OMR),<br/>Mettukuppam, Chennai, Tamil Nadu - 600096') },
                            { FieldName: 'Siruseri Office – STP', FieldValue: $sce.trustAsHtml('Plot No H-4, Sipcot IT Park, Old Mahabalipuram Road,<br/>Siruseri, Chennai, Tamil Nadu - 603103') }
                            ];

            $scope.TransportModesHeader = [];
            $scope.TransportModes = [];

            $scope.TransportModesAvailable = [
            /*298015- commented old data
            { FieldName: 'How to reach MEPZ', FieldValue: 'You can reach Cognizant MEPZ Campus by the following modes of transport:' },
            { FieldName: '•	By Bus:', FieldValue: 'Bus Stop: Tambaram Sanitorium Bus Stop (http://my.metrocommute.in/Chennai/Using-Buses-or-Trains/Connecting/Tambaram%20Sanatorium)' },
            { FieldName: '•	By Local Trains:', FieldValue: 'Tambaram Sanitorium Station' },                            
            */
                            {FieldName: 'Some Important Tips', FieldValue: '1. Autos are available on share basis.' },
                            { FieldName: '', FieldValue: '2. Be prepared to pay extra during rains.' },
                            { FieldName: '', FieldValue: '3. Feel free to approach the traffic policeman and police officers close by. They provide accurate information about bus routes, auto fares etc.' }
                            ];

            $scope.CTransportService = [
              { FieldName: 'Location Type', FieldValue: $sce.trustAsHtml('Super Metro') },
              { FieldName: 'Transport radius in KM', FieldValue: $sce.trustAsHtml('35') },
              { FieldName: 'City centre', FieldValue: $sce.trustAsHtml('Guindy Kathipara Junction') },
              { FieldName: 'Serviceable areas', FieldValue: $sce.trustAsHtml('Maraimalai Nagar, RedHills, Thiruninravur,  Ennore,  Sriperumbudur,  Padappai,   Kelambakkam,  Kovalam') },
              { FieldName: 'Non serviceable areas', FieldValue: $sce.trustAsHtml('All locations beyond areas Maraimalai Nagar, RedHills, Thiruninravur,  Ennore,  Sriperumbudur,  Padappai,   Kelambakkam,  Kovalam') }
              ];

            $scope.TouristHeader = [
                                { name: 'Category', addInfo: 'Place', desc: 'More Info' }
                                ];
            $scope.TouristSpots = [
                                { name: 'Arts & Culture', distance: 'Kapaleeswarar Temple (Mylapore), Parthasarathy Temple (Triplicane)', Description: 'Both these temples represent the best of south Indian architecture dating back several centuries.' },
                                { name: 'Arts & Culture', distance: 'Santhome Church and San Thome Basilica ', Description: 'San Thome Basilica is a Roman Catholic (Latin Rite) minor basilica in Santhome, Chennai. It was built in the 16th century by Portuguese explorers, over the tomb of St Thomas, an apostle of Jesus. In 1893, it was rebuilt as a church with the status of a cathedral by the British. The British version still stands today. It was designed in Neo-Gothic style, favoured by British architects in the late 19th century.' },
                                { name: 'Arts & Culture', distance: 'Mahabalipuram / Mamallapuram', Description: 'A UNESCO World Heritage site, it is home to rock carvings that represent the best of Pallava architecture, around 1200 years old.(about 55 km south of Chennai along the coast)' },
                                { name: 'Museums', distance: 'Government Museum, Pantheon Road. Egmore', Description: 'Houses a variety of archeological, zoological and historical artefacts. It also has an enviable Bronze collection from the Chola period. Nearby is also the National Art Gallery.' },
                                { name: 'Museums', distance: 'Cholamandalam Artists Village, Injambakkam ', Description: 'A serene commune of artists comprising a display of works of upcoming and established artists, painters and sculptors from South India. The village houses an art gallery, museum and an amphitheater. (on East Coast Road on way to Mamallapuram.)' },
                                { name: 'Zoological garden', distance: 'Aringnar Anna Zoological Park, Vandalur', Description: 'A verdant 600 hectare park that houses a variety flora and fauna (20 Km from the city)' },
                                { name: 'Zoological garden', distance: 'Crocodlile Bank, near Mamallapuram', Description: 'The Madras Crocodile Bank Trust and Center for Herpetology is one of the largest reptile zoos in India. ' },
                                { name: 'Miscellaneous ', distance: 'Express Avenue Mall (Anna Salai)', Description: 'A vast shopping Mall, that includes a multi-screen cineplex.' },
                                { name: 'Miscellaneous ', distance: 'Phoenix City Mall, Velachery', Description: 'A must see and visit place for the younger generation.' },
                                { name: 'Miscellaneous ', distance: 'Anna Centenary Library, Kotturpuram', Description: 'One of the largest such library facilities in the country.' }
                                ];

            $scope.OtherTouristSpots = [
            /*298015-commented old data
            { FieldName: 'Food & Nightlife', FieldValue: '•	http://chennaifoodguide.in/' },
            { FieldName: '', FieldValue: '•	http://www.zomato.com/chennai' },
            { FieldName: 'Beauty & Fitness', FieldValue: '•	http://lifestyle.sulekha.com/beauty-fitness_in_chennai' },
            { FieldName: '', FieldValue: '•	http://www.thecityguide.in/Chennai/Z/A/Beauty-Fitness' },
            { FieldName: 'Movies', FieldValue: '• http://in.bookmyshow.com/regions/chennai/CHEN' },
            { FieldName: '', FieldValue: '•	http://www.spicinemas.in/' },
            { FieldName: 'Know your city', FieldValue: '• http://www.tamilnadutourism.org/places/citiestowns/chennai.aspx' },
            { FieldName: '', FieldValue: '•	http://www.mapsofchennai.com' },
            { FieldName: '', FieldValue: '•	http://timescity.com/chennai/' }
            */
                            ];

            $scope.OtherPlaces = [

                            ];

            $scope.ImpServices = [
                            { FieldName: 'Police', FieldValue: '100' },
                            { FieldName: 'Traffic Police', FieldValue: '103' },
                            { FieldName: 'Ambulance', FieldValue: '108' },
                            { FieldName: 'Fire Control', FieldValue: '101' },
                            { FieldName: 'Ambulance of Fire Services Dept', FieldValue: '102' },
                            { FieldName: 'Child Line', FieldValue: '1098' },
                            { FieldName: 'Women Help Line', FieldValue: '1091' },
                            { FieldName: 'Lions Blood Bank', FieldValue: '28415959' },
                            { FieldName: 'Apollo Ambulance', FieldValue: '1066' },
                            { FieldName: 'St. Johns Ambulance Association', FieldValue: '28194630' },
                            { FieldName: 'Chennai Corporation Complaints', FieldValue: '1913' },
                            { FieldName: 'Tourist Enquiry', FieldValue: '1913' },
                            { FieldName: 'Tourism Office, Govt. of TamilNadu', FieldValue: '25368538' },
                            { FieldName: 'Tourism Office, Govt. of India ', FieldValue: '28460285' },
                            { FieldName: 'Railways Reservation Enquiry', FieldValue: '132' },
                            { FieldName: 'Automated Reservation Query', FieldValue: '139' },
            /*298015-commented old data                            
            { FieldName: '', FieldValue: '•	CHENNAI MOORE MARKET COMPLEX' },
            { FieldName: '', FieldValue: '  - Reservation Enquiry BG & MG	132' },
            { FieldName: '', FieldValue: '  - Automated Reservation Enquiry	139' },
            { FieldName: '', FieldValue: '  - Asst Commercial Manager	    25353816' },
            { FieldName: '', FieldValue: '•	CHENNAI EGMORE' },
            { FieldName: '', FieldValue: '  - General Enquiry           	135' },
            { FieldName: '', FieldValue: '  - Reservation Enquiry BG & MG	134' },
            { FieldName: '', FieldValue: '  - Station Manager       	    28254533' },
            { FieldName: '', FieldValue: '  - Station Master           	    28251579' },
            */
                            {FieldName: 'Call Taxi Services', FieldValue: '• NTL Call Taxi	044 3000 3000' },
                            { FieldName: '', FieldValue: '•	Million Dots	044-45459999, +(91)-9500005568' },
                            { FieldName: '', FieldValue: '•	Fast Track 	044 6000 6000' }

                            ];

            $scope.AdditionalSvcTabs = [
                            { Id: 'ai1', Name: 'Health Services' },
                            { Id: 'ai2', Name: 'Educational Institutes' },
                            { Id: 'ai3', Name: 'Useful Links' },
                            { Id: 'ai4', Name: 'Entertainment' }
                            ];

            $scope.AdditionalSvcTabsDetails = [
                            { Id: 'ai1', Details: [
                                { FieldName: 'Trauma Care Consortium', FieldValue: '28150700', FieldLink: '' },
                                { FieldName: 'Government General Hospital', FieldValue: '25305000', FieldLink: '' },
                                { FieldName: 'Government Kilpauk Hospital', FieldValue: '28364951', FieldLink: '' },
                                { FieldName: 'Government Royapettah Hospital', FieldValue: '28483051', FieldLink: '' },
                                { FieldName: 'Government Stanley Hospital', FieldValue: '25281347', FieldLink: '' },
                                { FieldName: 'Govt. Hospital for Women & Children', FieldValue: '28191982', FieldLink: '' },
                                { FieldName: 'Govt. Kasturba Hospital for Women', FieldValue: '28545449', FieldLink: '' },
                                { FieldName: 'Institute of Child Health & Hospital', FieldValue: '28191135', FieldLink: '' },
                                { FieldName: 'Child Trust Hospital', FieldValue: '42001800', FieldLink: '' },
                                { FieldName: 'Voluntary Health Service', FieldValue: '22541972', FieldLink: '' }
                                ]
                            },
                            { Id: 'ai2', Details: [
                                { FieldName: 'Schools', FieldValue: '•	Padma Seshadri Bala Bhavan – (1) K.K. Nagar (2) T. Nagar; (3) Siruseri, OMR.', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	P. S. Senior Secondary School, Mylapore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	DAV Senior Secondary School, Royapettah', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	DAV Senior Secondary School for Girls, Mogappair', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Vidya Mandir, Mylapore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Bala Vidya Mandir, Adyar', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Sri Sankara Senior Secondary School, Adyar', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	The School, Krishnamurthi Foundation of India, Adyar', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Chettinad Vidyashram, R.A. Puram.', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	SBOA – Anna Nagar.', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Kendriya Vidyalaya – IIT Madras.', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Kendriya Vidyalaya – CLRI, Adyar.', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Don Bosco – Egmore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Holy Angels Convent – T. Nagar', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Church Park Convent, Thousand lights.', FieldLink: '' },
                                { FieldName: 'Colleges', FieldValue: '•	Indian Institute of Technology- Madras.', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Indian Institute of Information Technology, Vandalur.', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	College of Engineering, Anna University, Chennai', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Madras Instt of Technology, Chromepet,', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	SSN College of Engineering, Kalavakkam, OMR.', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	St. Joseph’s College of Engineering, Sholinganallur', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Velammal Engineering College, Red Hills.', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Sri Sairam Engineering College, West Tambaram', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	SRM University, Kattankulathur and Ramapuram.', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	BSA Rahman University, Vandalur', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Satyabhama University, Sholinganallur.', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	University of Madras, Chepauk', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Loyola College, Nungambakkam', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Stella Maris College for Women', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Madras Christian College, Tambaram', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Women’s Christian College, Nungambakkam', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	MOP Vaishnav College for Women, Nungambakkam', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Ethiraj College for Women, Egmore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	D G Vaishnav College, Arumbakkam', FieldLink: '' }
                               ]
                            },
                            { Id: 'ai3', Details: [
                                { FieldName: 'More on Chennai', FieldValue: '', FieldLink: $sce.trustAsHtml('• <a href="http://chennaionline.com" runat="server" style="color:blue;" target="_blank">http://chennaionline.com</a>') },
                                { FieldName: '', FieldValue: '', FieldLink: $sce.trustAsHtml('• <a href="http://www.tripadvisor.in/Tourism-g304556-Chennai_Madras_Tamil_Nadu-Vacations.html" runat="server" style="color:blue;" target="_blank">http://www.tripadvisor.in/Tourism-g304556-Chennai_Madras_Tamil_Nadu-Vacations.html</a>') }
                                /*298015-commented old data
                                ,
                                { FieldName: 'Govt.of India ', FieldValue: 'http://www.goidirectory.nic.in' },
                                { FieldName: 'Airways', FieldValue: 'http://www.madrastimes.com/flight_timings.htm' },
                                { FieldName: 'Railways', FieldValue: 'http://www.indianrail.gov.in' },
                                { FieldName: 'Schools & Hospitals', FieldValue: '•	http://www.chennai.tn.nic.in/schools.htm' },
                                { FieldName: '', FieldValue: '•	http://www.southindia.com/a.html' }                                
                                */
                                ]
                            },
                            { Id: 'ai4', Details: [
                                { FieldName: 'Entertainment', FieldValue: '• Abhirami Cinemas, Kilpauk	044-26431022', FieldLink: '' },
                                { FieldName: '', FieldValue: '• AGS Cinemas, Navalur, OMR	044-43447770', FieldLink: '' },
                                { FieldName: '', FieldValue: '• AGS Cinemas, Villivakkam	044 43447777', FieldLink: '' },
                                { FieldName: '', FieldValue: '• Devi Cinemas, Anna Salai 	044-42082255', FieldLink: '' },
                                { FieldName: '', FieldValue: '• Inox Cinemas, Citi Centre, Mylapore	044-42658888', FieldLink: '' },
                                { FieldName: '', FieldValue: '• Inox Leisure , Virugambakkam	044 33663366', FieldLink: '' },
                                { FieldName: '', FieldValue: '• Mayaajaal Cinemas, Kanathur, East Coast road	044 27472860', FieldLink: '' },
                                { FieldName: '', FieldValue: '• PVR Cinemas, Aminjikarai, 	+91-8800900009', FieldLink: '' },
                                { FieldName: '', FieldValue: '• Sathyam Cinemas 	044 4224 4224', FieldLink: '' },
                                { FieldName: '', FieldValue: '• S2 Cinemas , Thiruvamiyur 	044 4224 4224', FieldLink: '' },
                                { FieldName: '', FieldValue: '• Woodlands Cinemas, Royapettah 	044 28483481', FieldLink: '' },
                                { FieldName: 'More info', FieldValue: '', FieldLink: $sce.trustAsHtml('• <a href="http://in.bookmyshow.com/regions/chennai/CHEN" runat="server" style="color:blue;" target="_blank">http://in.bookmyshow.com/regions/chennai/CHEN</a>') }
                               ]
                            }
                            ];

            $scope.WriteUpInfoHide = $scope.WriteUpInfo.length == 0 ? true : false;
            $scope.ClimateInfoHide = $scope.ClimateInfo.length == 0 ? true : false;
            $scope.SeasonInfoHide = $scope.SeasonInfo.length == 0 ? true : false;
            $scope.AboutCityHide = $scope.WriteUpInfoHide && $scope.ClimateInfoHide && $scope.SeasonInfoHide;
            $scope.AccomodationHide = $scope.AccomodationInfo.length == 0 && $scope.HotelServices.length == 0 ? true : false;
            $scope.LanguageInfoHide = $scope.LanguageInfo.length == 0 ? true : false;
            $scope.SettlingDownHide = $scope.AccomodationHide && $scope.LanguageInfoHide;
            $scope.ByAirHide = $scope.AirTravelInfo.length == 0 && $scope.AirServiceProviders.length == 0 ? true : false;
            $scope.ByTrainHide = $scope.TrainTravelInfo.length == 0 && $scope.TrainServiceProviders.length == 0 ? true : false;
            $scope.ByRoadHide = $scope.RoadTravelInfo.length == 0 && $scope.RoadServiceProviders.length == 0 ? true : false;
            $scope.BySeaHide = $scope.SeaTravelInfo.length == 0 && $scope.SeaServiceProviders.length == 0 ? true : false;
            $scope.ReachingThereHide = $scope.ByAirHide && $scope.ByTrainHide && $scope.ByRoadHide && $scope.BySeaHide;
            $scope.OfficesHide = $scope.Offices.length == 0 ? true : false;
            $scope.TrainingCentersHide = $scope.TrainingCenters.length == 0 ? true : false;
            $scope.CognizantInCityHide = $scope.OfficesHide && $scope.TrainingCentersHide;
            $scope.TransportModesAvailableHide = $scope.TransportModesAvailable.length == 0 ? true : false;
            $scope.TransportModesHeaderHide = $scope.TransportModesHeader.length == 0 ? true : false;
            $scope.TransportModesHide = ($scope.TransportModes.length == 0 ? true : false) && $scope.TransportModesAvailableHide && $scope.TransportModesHeaderHide;
            $scope.CTransportServiceHide = $scope.CTransportService.length == 0 ? true : false;
            $scope.TravelWithinHide = $scope.TransportModesHide && $scope.CTransportServiceHide;
            $scope.TouristPlacesHide = $scope.TouristSpots.length == 0 && $scope.OtherTouristSpots.length == 0 ? true : false;
            $scope.OtherPlacessHide = $scope.OtherPlaces.length == 0 ? true : false;
            $scope.EntertainmentHide = $scope.TouristPlacesHide && $scope.OtherPlacessHide;
            $scope.ImpSvcHide = $scope.ImpServices.length == 0 ? true : false;
            $scope.ImpNosSrvcsHide = $scope.ImpSvcHide;
            $scope.AdditionalInfoHide = $scope.AdditionalSvcTabs.length == 0 ? true : false;
            break;
        //-------------------------------------------------Chennai end                                                           
        //-------------------------------------------------Coimbatore start                                                         
        case 3:
            $scope.WriteUpInfo = [
                            { FieldName: 'Information', FieldValue: 'Coimbatore also known as Kovai, is Tamil Nadu’s second largest city after Chennai. It is one of the fastest growing Tier-II cities in India and a major textile, industrial, commercial, educational, IT, healthcare and manufacturing hub of Tamil Nadu. Other important industries include software services.' },
                            { FieldName: '', FieldValue: 'Coimbatore has been ranked 4th among Indian cities in investment climate by CII and ranked 17th among the top global outsourcing cities by Tholons a leading full-service Strategic Advisory firm for Global Outsourcing and Research. Coimbatore is the fourth largest metropolis in South India. Coimbatore city is administrative capital of Coimbatore district.' }
                            ];

            $scope.ClimateInfo = [
                            { FieldName: 'Best time to visit', FieldValue: 'The best time to visit the place is from September to March' },
                            { FieldName: 'Minimum Temperature', FieldValue: '15 °C' },
                            { FieldName: 'Maximum Temperature', FieldValue: '45 °C' },
                            { FieldName: 'More Info', FieldValue: 'The temperature in Coimbatore is very moderate all through the year.' }
                            ];

            $scope.SeasonInfo = [
                            { FieldName: 'Information', FieldValue: 'Winters (December to February) are not very cold with the minimum temperature rarely touching 15 °c and maximum never crossing 33 °c' },
                            { FieldName: '', FieldValue: 'Summers (March to May) are about 40 °c but a light cool wind blows through the city, and makes the season pleasant. Travelers for trade frequently visit during this season.' },
                            { FieldName: '', FieldValue: 'Monsoons (June to August) are strong here due to the presence of the mountain pass. Tourists preferably avoid rainy days.' }
                            ];

            $scope.AccomodationInfo = [
                            { FieldName: 'Information', FieldValue: 'Coimbatore is a place where one can find accommodation suiting everybody’s budget. It is advisable to be careful when seeking the services of brokers, as they are known to take undue advantage of new comers to Coimbatore. It is habitual to pay 5-10 months rent as advance.  Please take the advice of your seniors before fixing accommodation and food.' }
            /*298015 - commented hotels as per new doc*/
            /*
            ,{ FieldName: 'Hotels', FieldValue: '' }
            */
                            ];

            $scope.HotelServices = [
            /*298015 - commented hotels as per new doc*/
            /*
            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">The Residency</b><br/>Phone No : +91 42222 41414; Fax No : +91 42222 43838;<br/>Guest Help Line (24 x 7) : +91 97877 77770<br/><a href="http://www.theresidency.com" target="_blank" type="text/html" style="color:blue;">http://www.theresidency.com</a>') },
            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Hotel Le Meridian</b><br/>Reservations Ph- +91-422-4254343 / 4034343, Fx- +91-422-2364444<br/>Email: salesco@lemeridien-coimbatore.com,<br/>Website: <a href="http://www.slideshare.net/lemcbe/le-meridien-coimbatore" target="_blank" type="text/html" style="color:blue;">http://www.slideshare.net/lemcbe/le-meridien-coimbatore</a>') },
            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Park Inn</b><br/>Phone No : +91 - 422 - 828282, Fax -+91 - 422 - 828384') },
            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Hotel Mangala International</b><br/>Phone : 91-422- 2232012, 2232013, 2232014, 2232016. Fax: 91-422-2231184<br/>E-mail: mangala123@vsnl.net,<br/>Website: <a href="http://www.hotelmangalainternational.in" target="_blank" type="text/html" style="color:blue;">http://www.hotelmangalainternational.in</a>') },
            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Hotel Alankar Grandé</b><br/>Phone: +91 - 422 - 4378888 Fax :+91 - 422 - 4313200<br/>E-mail: hotelalankar@alankar.co.in,<br/> Website: <a href="http://www.alankargrande.com" target="_blank" type="text/html" style="color:blue;">http://www.alankargrande.com</a>') },
            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Hotel Heritage Inn</b><br/>Phone : - +91-422-231451 Fax: +91-422-233223<br/>Website: <a href="http://www.hotelheritageinn.in" target="_blank" type="text/html" style="color:blue;">http://www.hotelheritageinn.in</a>') },
            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Crown Plaza</b><br/>Guest Help Line (24 x 7) : +91 97877 77770<br/>E-mail: crownplazacbe@gmail.com') },
            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Hotel Vijai Paradise</b><br/>Phone: 0422-2452222(5 lines)Mobile: 98432 40302<br/>Guest Help Line (24 x 7) : +91 97877 77770<br/>E-mail: info@hotelvijaiparadise.com,<br/>Website: <a href="http://www.hotelvijaiparadise.com" target="_blank" type="text/html" style="color:blue;">http://www.hotelvijaiparadise.com</a>') },
            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Legend’s Inn</b><br/>Phone: 4350000, 4355555<br/>E-mail : legends_inn@yahoo.com') },
            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Hotel CAG Pride</b><br/>Phone : 91 422 4317777, 2527777,Fax: 91 422 2521763<br/>E-mail: reservations@cagpride.com,<br/>Website : <a href="http://www.cagpride.com" target="_blank" type="text/html" style="color:blue;">http://www.cagpride.com</a>') },
            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Sri Aarvee Hotels</b><br/>Phone : +91-422-493677<br/>E-mail: geegee@md4.vsnl.net.in,<br/> Website: <a href="http://www.aarveehotel.net" target="_blank" type="text/html" style="color:blue;">http://www.aarveehotel.net</a>') },
            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Hotel Tamilnadu</b><br/>Phone :+91-422-302176(9lines)<br/>E-mail: tourism@kovai.tn.nic.in') }
            */
                            ];


            $scope.LanguageInfo = [
                            { FieldName: 'Local Lingo', FieldValue: 'The official Language is Tamil, but English is understood by a good minority, as also a smattering of Malayalam and Hindi.' }
                            ];

            $scope.AirTravelInfo = [
                            { FieldName: 'Airport distance from center of city', FieldValue: '12 km' },
                            { FieldName: 'Connected Cities', FieldValue: 'Delhi, Mumbai, Bangalore, Chennai, Kozhikode(Calicut)' },
                            { FieldName: 'Connected Countries', FieldValue: 'Sharjah(UAE)' },
                            { FieldName: 'More Info', FieldValue: 'From the airport, you can either hire a taxi or take an auto rickshaw to the main city.' }
                            ];

            $scope.AirServiceProviders = [
            /*298015 - commented as per new doc
            { name: 'Indian Airlines', tel: '+ 91- 422- 2399833./1800 1801 407 (Toll Free)', site: 'http://www.airindia.com' },
            { name: 'Jet Airways', tel: '+ 91 - 422 - 2243465/70', site: 'http://www.jetairways.com' },
            { name: 'Paramount', tel: '+ 91 - 422 - 3256822/833', site: 'http://www.paramountairways.com' },
            { name: 'Jet Lite', tel: '+ 91 422 2575336/337, 1800-3030-2020 (Toll Free)', site: 'http://www.jetlite.com' },
            { name: 'Kingfisher Airlines', tel: '1800 - 1800 - 101 (Toll Free)', site: 'http://www.flykingfisher.com' },
            { name: 'Air Arabia', tel: '+ 91- 422 4351950/1/2', site: 'http://www.airarabia.com' },
            { name: 'Spice Jet', tel: '+ 91 - 9871803333/18001803333', site: 'http://www.spicejet.com' },
            { name: 'SilkAir', tel: '+ 91- 422 4370271/81 ', site: 'http://www.silkair.com' },
            { name: 'indigo', tel: '(0)99 10 38 38 38 or Toll free 1 800 180 38 38', site: 'http://www.goindigo.in' },
            { name: 'Singapore Airlines', tel: '+91 44 45921921, 44 45921901 ', site: 'http://www.singaporeair.com' },
            */
                            ];

            $scope.TrainTravelInfo = [
                            { FieldName: 'Information', FieldValue: 'There are two railway stations in the Coimbatore city, Coimbatore Junction and Coimbatore North Railway Station, of which the Coimbatore Junction is the main one.' }
                            ];

            $scope.TrainServiceProviders = [
                            ];

            $scope.RoadTravelInfo = [
                            { FieldName: 'Information', FieldValue: 'Coimbatore is a place that is easily accessible by road. The State Transport Corporation and a lot of private operators operate regular bus services between Coimbatore and all the major cities of Tamil Nadu and also the states of Kerala and Karnataka. If you want to drive down to the city, keep in mind that NH47 is the main highway that connects it with the rest of India.' }
                            ];

            $scope.RoadServiceProviders = [
                            ];

            $scope.SeaTravelInfo = [
                            ];

            $scope.SeaServiceProviders = [
                            ];

            $scope.Offices = [
                            { FieldName: 'Mountain View Campus', FieldValue: $sce.trustAsHtml('STPI IT Park, Kumaraguru college of technology campus,<br/>Saravanampatti, Coimbatore-641006') },
                            { FieldName: 'Mountain Midst Campus ', FieldValue: $sce.trustAsHtml('Mountain Mist Campus, # 363, STPI ,Unit - 1,KG Campus,<br/>Saravanampatti, Coimbatore-641035') },
                            { FieldName: 'CCC Campus', FieldValue: $sce.trustAsHtml('C3-CHIL Special Economic Zone ,Keeranatham Village,<br/>Saravanampatti Via, Coimbatore-641035') },
                            { FieldName: 'KCT Tech park', FieldValue: $sce.trustAsHtml('KCT Tech Park, 2nd Floor, C2 Academy, Thudiyalur Road,<br/>Saravanampatti Via, Coimbatore-641035') }
                            ];

            $scope.TrainingCenters = [
                            { FieldName: 'KCT Tech Park', FieldValue: $sce.trustAsHtml('KCT Tech Park, 2nd Floor, C2 Academy, Thudiyalur Road,<br/>Saravanampatti Via, Coimbatore-641035') }
                            ];

            $scope.TransportModesHeader = [];
            $scope.TransportModes = [];

            $scope.TransportModesAvailable = [
                            { FieldName: 'How to reach there', FieldValue: '(Reach Saravanampatti from anywhere and it’s a five minute drive to KCT. Local taxi and auto will be able to help.)' },
                            { FieldName: '', FieldValue: '•	By Bus ' },
                            { FieldName: '', FieldValue: '•	By personal transport' },
                            { FieldName: '', FieldValue: '•	By Auto rickshaw' },
                            { FieldName: 'Some Important Tips', FieldValue: ' 1.    While hiring an auto it is advisable to seek the advice of your host or a local about the approximate charges for the place. It is better to fix a flat rate with the auto rickshaw driver as most autos do not run on meters.' },
                            { FieldName: '', FieldValue: '2.    Be prepared to pay extra during rains.' },
                            { FieldName: '', FieldValue: '3.	Feel free to approach the traffic policeman and police officers close by. They provide accurate information about bus routes, auto fares etc. Besides, auto drivers tend to be reasonable when the police is introduced as an arbitrator.' }
                            ];

            $scope.CTransportService = [
              { FieldName: 'Location Type', FieldValue: $sce.trustAsHtml('Tier II') },
              { FieldName: 'Transport radius in KM', FieldValue: $sce.trustAsHtml('20') },
              { FieldName: 'City centre', FieldValue: $sce.trustAsHtml('Gandhipuram') },
              { FieldName: 'Serviceable areas', FieldValue: $sce.trustAsHtml('Kuniamuthur, Podanur, Sundarapuram, Ondipudur, Chinniampalayam, Kovilpalayam, Perur, Periyanaickenpalayam, Navavoor pirivu . These are the end points in the main approach roads in Coimbatore that are covered for general shift operations with nodal points.Also we have boundary marked covering aforesaid extreme end points as in the map for example, SB Colony, Race course, Ramanathapuram, Peelamedu, Sivanananda colony etc') },
              { FieldName: 'Non serviceable areas', FieldValue: $sce.trustAsHtml('All locations beyond areas Kuniamuthur, Podanur, Sundarapuram, Ondipudur, Chinniampalayam, Kovilpalayam, Perur, Periyanaickenpalayam, Navavoor pirivu on the arterial roads and out side of the boundary area.') },
              { FieldName: 'Cognizant Transport Infra to be leveraged', FieldValue: $sce.trustAsHtml('Optimized transport solutions for Regular transport registered users of IT, IT ES including 24 X 7 and production support are in practice in Coimbatore , hence separate transport for 24x7 & production support is not applicable Home pickup is applicable for Early Bird Shift & Night shift. Home drop is applicable for Afternoon shift and Night shift within the covered area.') }
              ];

            $scope.TouristHeader = [
                            { name: 'Place Name', addInfo: 'Distance', desc: 'Famous for ' }
            ];

            $scope.TouristSpots = [
                            { name: 'Ooty, Tamilnadu ', distance: '72 kms', Description: 'Trekking, Hill Stations, Lakes, Falls, Gardens, Tea Estates, Churches,  Wildlife' },
                            { name: 'Coonoor, Tamilnadu', distance: '54 kms', Description: 'Hill Stations, Falls, Gardens, Golf, Forts' },
                            { name: 'Anaimalai, Tamilnadu', distance: '56 kms', Description: 'Hill Stations, Wildlife, Trekking' },
                            { name: 'Masinagudi, Tamilnadu', distance: '100 kms', Description: 'Hill Station, Scenic' },
                            { name: 'Isha Yoga Centre, Tamilnadu', distance: '30 kms', Description: 'Pilgrim,Meditation' },
                            { name: 'Kodaikanal, Tamilnadu', distance: '180 Kms', Description: 'Hill Stations, Falls, Trekking' },
                            { name: 'Valparai, Tamilnadu', distance: '106 Kms', Description: 'Hill Stations, Falls, Trekking, Tea estates' }
                            ];

            $scope.OtherTouristSpots = [
                            { FieldName: 'Amusement parks', FieldValue: '•	Black Thunder is a Water Theme Park located near Mettupalayam, 40 km north of Coimbatore city.' },
                            { FieldName: '', FieldValue: '•	 Kovai Kondattam is an amusement park located at Siruvani main road,Kalampalyam.' },
                            { FieldName: '', FieldValue: '•	 Maharaja Theme Park is a theme park with multiplex situated at Neelampur , Avanashi main Road.' },
                            { FieldName: 'History and Culture', FieldValue: '•	Forest College Museum - Gass Forest Museum showcases the flora and fauna of the region and stuffed animals' },
                            { FieldName: '', FieldValue: '•	 G.D Naidu Industrial Museum - The G.D.Naidu museum and industrial exhibition in Coimbatore contains an impressive collection of various electrical/electronic/scientific devices and gadgets that has been in existence since very early years to the recent times. In fact, one visit to this museum would make you familiar with the different types of film cameras, projection TV’s, ball point pens, floppy disks, calculators, type writers, PA systems, printers, and many many more devices that were used right from 1930\'s/40\'s till today' },
                            { FieldName: '', FieldValue: '•	 Marudhamalai temple - A temple dedicated to Lord Muruga in the outskirts.' },
                            { FieldName: 'Cinemas', FieldValue: '•	The Cinemas, Brookefields Plaza, Near Railway Station, 422-6473804, 6473808' },
                            { FieldName: '', FieldValue: '•	 Big Cinemas, Race Course road, 093 44 003119' },
                            { FieldName: '', FieldValue: '•	 Central Cinemas, RS Puram, (91)-9786066809' },

                            ];

            $scope.OtherPlaces = [
                            { FieldName: 'Brookefields Mall', FieldValue: 'Krishnasamy Road, RS Puram, Coimbatore, Tamil Nadu 641001. Phone: 0422 254 9696' },
                            { FieldName: 'Fun Republic Mall', FieldValue: 'Peelamedu, Coimbatore, TN 641004. Phone: 0422 451 8414 ' }
                            ];

            $scope.ImpServices = [
                            { FieldName: 'Ambulance', FieldValue: '• C.M.C. Hospital 2301394 / 2301395 / 96' },
                            { FieldName: '', FieldValue: '•	Coimbatore Kidney centre	2314487' },
                            { FieldName: '', FieldValue: '•	G.Kuppusamy Naidu Hospital 	2210516 / 2211000 ' },
                            { FieldName: '', FieldValue: '•	K .G . Mobile Ambulance	155' },
                            { FieldName: '', FieldValue: '•	Kongunad Hospitals P Ltd 	2494363' },
                            { FieldName: '', FieldValue: '•	P S G Hospital	98423 57017' },
                            { FieldName: '', FieldValue: '•	Sri Ramakrishna Hospital	2210075' },
                            { FieldName: 'Eye Banks', FieldValue: '• Aravind Eye Bank 	4360400' },
                            { FieldName: '', FieldValue: '•	K G Eye Bank 	1082' },
                            { FieldName: 'Blood Banks', FieldValue: '• Biomedical Lab	2552297' },
                            { FieldName: '', FieldValue: '•	CMC Hospital	2300871' },
                            { FieldName: '24 Hour Pharmacies', FieldValue: '• Alagu Pharmacy 	2552495' },
                            { FieldName: '', FieldValue: '•	KMCH	2627784 - 90' },
                            { FieldName: 'Fire Services', FieldValue: '• Coimbatore Main	2300101' },
                            { FieldName: 'Government Hospitals', FieldValue: '•	Coimbatore CMC Hospital	(0422)2301393' },
                            { FieldName: '', FieldValue: '•	Mettupalayam	(04254)222027' },
                            { FieldName: '', FieldValue: '•	Pollachi	(04259)229322' },
                            { FieldName: '', FieldValue: '•	Udumalpet	(04252)223065' },
                            { FieldName: '', FieldValue: '•	Palladam	253077' }
                            ];

            $scope.AdditionalSvcTabs = [
                            { Id: 'ai1', Name: 'Taxi Services' },
                            { Id: 'ai2', Name: 'Educational Institutes' }
                            ];

            $scope.AdditionalSvcTabsDetails = [
                            { Id: 'ai1', Details: [
                                { FieldName: 'Friends Call Taxi', FieldValue: '0422 2523030', FieldLink: '' },
                                { FieldName: 'No.1 Kovai Call Taxi', FieldValue: '0422 2474646', FieldLink: '' },
                                { FieldName: 'Fast Track', FieldValue: '0422 2888999', FieldLink: '' },
                                { FieldName: 'City Call Taxi', FieldValue: '0422 2230666', FieldLink: '' },
                                { FieldName: 'Taxi Taxi', FieldValue: '0422 4050607', FieldLink: '' }
                                ]
                            },
                            { Id: 'ai2', Details: [
                                { FieldName: 'Schools', FieldValue: '•	R K V CBSE Secondary School, Idayarpalayam, Coimbatore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Air Force School, Red Fields', FieldLink: '' },
                                { FieldName: '', FieldValue: '• Kendriya Vidyalaya Air Force Station Sulur, kangyampalyam, 641401', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Chetan Kaushik Primary School,Sulur', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Gedee Public School, Eachanari, Coimbatore', FieldLink: '' },
                                { FieldName: 'Colleges', FieldValue: '• Government Arts College, Coimbatore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Kongunadu Arts and Science College', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Sri Krishna Arts and Science College', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Dr G R Damodaran College of Science', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Dr.N.G.P. Arts and Science College, Coimbatore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Dr. SNS Rajalakshmi College of Arts and Science, Coimbatore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Sri Ramakrishna College of Arts and Science for Women', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Sree Narayana Guru College', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Shri Nehru Maha Vidyalaya College of Arts & Science (SNMV CAS)', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	CBM College of Arts and Science', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	PSG College of Arts and Science', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Nirmala College for Women', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Sri Ramakrishna Mission Vidyalaya College of Arts And Science', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	SNR SONS college,Nava india,Coimbatore', FieldLink: '' },
                                { FieldName: '', FieldValue: '', FieldLink: $sce.trustAsHtml('• <a href="http://www.sankara.ac.in" runat="server" style="color:blue;" target="_blank">Sankara College of Science and Commerce</a>') },
                                { FieldName: 'Engineering colleges', FieldValue: '•	Amrita School of Engineering (ASE), Coimbatore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Coimbatore Institute of Technology (CIT), Coimbatore ', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Dr.N.G.P. Institute of Technology (DrNGPIT), Coimbatore ', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Government College of Technology, Coimbatore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	KGiSL Institute of Technology (KITE), Coimbatore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	KGiSL Institute of Information Management, Coimbatore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Kumaraguru College of Technology, Coimbatore ', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	PSG College of Technology, Coimbatore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Sri Krishna College of Engineering & Technology, Coimbatore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Sri Ramakrishna Institute of Technology, Coimbatore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Sri Shakthi Institute of Engineering and Technology, Coimbatore', FieldLink: '' },
                                { FieldName: '', FieldValue: '•	Sri Ramakrishna Engineering College, Coimbatore', FieldLink: '' }
                                /*298015 - commented as it is not in new reqmnt doc
                                ,
                                { FieldName: 'Medical colleges', FieldValue: '•	Coimbatore Medical College ' },
                                { FieldName: '', FieldValue: '•	PSG Medical College' },
                                { FieldName: 'Universities/research institutions', FieldValue: '•	Amrita Vishwa Vidyapeetham-Deemed University' },
                                { FieldName: '', FieldValue: '•	Anna University of Technology, Coimbatore' },
                                { FieldName: '', FieldValue: '•	Avinashilingam University' },
                                { FieldName: '', FieldValue: '•	Bharathiar University' },
                                { FieldName: '', FieldValue: '•	Central Institute for Cotton Research' },
                                { FieldName: '', FieldValue: '•	Indian Institute of Research and Management ' },
                                { FieldName: '', FieldValue: '•	Cotton Research Institute ' },
                                { FieldName: '', FieldValue: '•	Institute of Forest Genetics and Tree Breeding (IFGTB) ' },
                                { FieldName: '', FieldValue: '•	Karpagam University' },
                                { FieldName: '', FieldValue: '•	Karunya University' },
                                { FieldName: '', FieldValue: '•	Salim Ali Centre for Ornithology and Natural History ' },
                                { FieldName: '', FieldValue: '•	Sardar Vallabhbhai Patel International School of Textiles and Management ' },
                                { FieldName: '', FieldValue: '•	South India Textile Research (SITRA) ' },
                                { FieldName: '', FieldValue: '•	Sugarcane Breeding Research Institute ' },
                                { FieldName: '', FieldValue: '•	Tamil Nadu Agricultural University ' }
                                */
                                ]
                            }
                            ];

            $scope.WriteUpInfoHide = $scope.WriteUpInfo.length == 0 ? true : false;
            $scope.ClimateInfoHide = $scope.ClimateInfo.length == 0 ? true : false;
            $scope.SeasonInfoHide = $scope.SeasonInfo.length == 0 ? true : false;
            $scope.AboutCityHide = $scope.WriteUpInfoHide && $scope.ClimateInfoHide && $scope.SeasonInfoHide;
            $scope.AccomodationHide = $scope.AccomodationInfo.length == 0 && $scope.HotelServices.length == 0 ? true : false;
            $scope.LanguageInfoHide = $scope.LanguageInfo.length == 0 ? true : false;
            $scope.SettlingDownHide = $scope.AccomodationHide && $scope.LanguageInfoHide;
            $scope.ByAirHide = $scope.AirTravelInfo.length == 0 && $scope.AirServiceProviders.length == 0 ? true : false;
            $scope.ByTrainHide = $scope.TrainTravelInfo.length == 0 && $scope.TrainServiceProviders.length == 0 ? true : false;
            $scope.ByRoadHide = $scope.RoadTravelInfo.length == 0 && $scope.RoadServiceProviders.length == 0 ? true : false;
            $scope.BySeaHide = $scope.SeaTravelInfo.length == 0 && $scope.SeaServiceProviders.length == 0 ? true : false;
            $scope.ReachingThereHide = $scope.ByAirHide && $scope.ByTrainHide && $scope.ByRoadHide && $scope.BySeaHide;
            $scope.OfficesHide = $scope.Offices.length == 0 ? true : false;
            $scope.TrainingCentersHide = $scope.TrainingCenters.length == 0 ? true : false;
            $scope.CognizantInCityHide = $scope.OfficesHide && $scope.TrainingCentersHide;
            $scope.TransportModesAvailableHide = $scope.TransportModesAvailable.length == 0 ? true : false;
            $scope.TransportModesHeaderHide = $scope.TransportModesHeader.length == 0 ? true : false;
            $scope.TransportModesHide = ($scope.TransportModes.length == 0 ? true : false) && $scope.TransportModesAvailableHide && $scope.TransportModesHeaderHide;
            $scope.CTransportServiceHide = $scope.CTransportService.length == 0 ? true : false;
            $scope.TravelWithinHide = $scope.TransportModesHide && $scope.CTransportServiceHide;
            $scope.TouristPlacesHide = $scope.TouristSpots.length == 0 && $scope.OtherTouristSpots.length == 0 ? true : false;
            $scope.OtherPlacessHide = $scope.OtherPlaces.length == 0 ? true : false;
            $scope.EntertainmentHide = $scope.TouristPlacesHide && $scope.OtherPlacessHide;
            $scope.ImpSvcHide = $scope.ImpServices.length == 0 ? true : false;
            $scope.ImpNosSrvcsHide = $scope.ImpSvcHide;
            $scope.AdditionalInfoHide = $scope.AdditionalSvcTabs.length == 0 ? true : false;
            break;
        //-------------------------------------------------Coimbatore end                                                          
        //-------------------------------------------------Kochi starts                                                            
        case 4:

            $scope.WriteUpInfo = [
                            { FieldName: 'Information', FieldValue: 'Known as the “Queen of the Arabian Sea”, Kochi  is the commercial capital of Kerala and referred to as the “Gateway to Kerala”. This growing city has an international airport and a busy port.' },
                            { FieldName: '', FieldValue: 'Perhaps that\'s why we find Kochi has been drawing traders and explorers for over 600 years. The result, the city has an interesting cosmopolitan mix – sights that combine giant fishing nets in the traditional fishing harbor, a 400-year-old synagogue, ancient mosques, Portuguese houses, remnants of Dutch and Arab culture, and the crumbling remains of the British Raj – all grafted into the serene Malabar coast.' },
                            { FieldName: '', FieldValue: 'August to February is the tourist season and Kochi often called by the name Ernakulam, ranks first in the total number of international and domestic tourist arrivals in Kerala, India.' }
                            ];

            $scope.ClimateInfo = [
                            { FieldName: 'Information', FieldValue: 'Kochi is moderately hot and humid round the year, while the south-west monsoon brings heavy showers between June and September. The north-west monsoon brings light rainfall during October-December. December to February are comparatively cooler months. The average annual rainfall is about 330cm, most of which is contributed by the south-west monsoon. During the summer, March-June, the temperature hits a usual high of 35°C while the mild winter high is 25°C.' }
                            ];

            $scope.SeasonInfo = [
                                { FieldName: 'Monsoon season', FieldValue: 'June - September (heavy rains)' },
                                { FieldName: 'Mild winter', FieldValue: 'October - February (cool, dry with occasional rain)' },
                                { FieldName: 'Summer', FieldValue: 'March - May (hot and humid)' }
                            ];

            $scope.AccomodationInfo = [
                             ];

            $scope.HotelServices = [
                                { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f; margin-left:-200px; margin-bottom:-12px;">Restaurants</b>') },
                                { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Dal Roti</b><br/>Address : /293 Lily St<br/>Phone No: +91 9746459244') },
                                { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Grand Pavilion</b><br/>Address : M G Road | Grand Hotel, Kochi<br/>Phone No: 484 4114646') },
                                { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Oy’s Restaurant</b><br/>Address : Burgher Street, 1/390, Fort Nagar<br/>Fort Kochi, Kochi<br/>Phone No: 0484 319 9661') },
                                { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Kashi Art Café </b><br/>Address : Burgar Street, Fort Nagar, Fort Kochi, Kochi<br/>Phone No: 0484 221 5769') },
                                { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Itty’s Café and Restaurant</b><br/>Address : G-290, Main Avenue, Panampilly Nagar, Kochi') },
                                { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Hotel Malabar Plaza</b><br/>Address : Vazhakala, Kakkanad, Kochi<br/>Phone No: 04844069911') },
                                { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">Flavours Unlimited </b><br/>Address : Thykoottathil Building, 1st Floor, Civil Line Road, Vazhakkala, Kochi<br/>Phone No: 04844035670 9288060259 9895891478') }
                            ];

            $scope.LanguageInfo = [
                            { FieldName: 'Local Lingo', FieldValue: ': Malayalam' },
                            { FieldName: 'State language', FieldValue: 'Malayalam' },
                            { FieldName: '', FieldValue: 'English is widely understood. Hindi and Tamil are used occasionally.' }
                            ];

            $scope.AirTravelInfo = [{ FieldName: 'Air ', FieldValue: 'International Air Port is at Nedumbassery, near Aluva, about 33 km from Ernakulam, Kochi. '}];

            $scope.AirServiceProviders = [];

            $scope.TrainTravelInfo = [{ FieldName: 'Rail ', FieldValue: 'The nearest station is at Ernakulam about 10km from Mattancheri. Kochi has 3 stations, Ernakulam Junction, Ernakulam Town and Cochin Harbour Terminus. Trains from the Northern cities/Southern parts of India stop at Ernakulam Junction. '}];

            $scope.TrainServiceProviders = [];

            $scope.RoadTravelInfo = [
                                     { FieldName: 'Road ', FieldValue: 'KSRTC Central Bus station, near Ernakulam Junction is a busy hub that connects other cities/towns in Kerala and other States using Express and Fast services. Long distance buses from other States are also available here. Private bus operations also help provide a network of services other towns. They operate from High Court Junction, Railway Station and Kaloor junction. ' },
                                     { FieldName: '', FieldValue: 'Enquiry phone : 2352033, 2372033' }
                                    ];


            $scope.RoadServiceProviders = [];

            $scope.SeaTravelInfo = [{ FieldName: 'Boats and Ships ', FieldValue: 'Kochi’s 48 km coastline, famous for its backwaters, is connected by frequent bus and boat services to Mattancherry, 10 km from Ernakulam town. Boat services start from Main Jetty near Subash Park, Ernakulam.'}];

            $scope.SeaServiceProviders = [];

            $scope.Offices = [
                            { FieldName: 'Office 1 ', FieldValue: $sce.trustAsHtml('Cognizant Technology Solutions India Private Limited, Plot No 1, Cochin Special Economic Zone, Seaport Airport Road,  3rd Floor, Muthoot Technopolis, Kakkanad, Cochin – 682037') },
                            { FieldName: 'Office 2', FieldValue: $sce.trustAsHtml('Cognizant Technology Solutions India Private Limited, Athulya Building SEZ - F3, Infopark, Kakkanad,  Kakkanad, Kochi-682030') }
                            ];

            $scope.TrainingCenters = [
                            ];

            $scope.TransportModesHeader = [{ FieldName: 'Call Taxi', FieldValue: 'Phone No'}];

            $scope.TransportModes = [
                                   { FieldName: 'Kerala CAB.Com', FieldValue: '9847810101' },
                                   { FieldName: 'YELLOW CABS', FieldValue: '(0484) 6060200 / 9747160200' },
                                   { FieldName: 'Yathra Travels', FieldValue: '(0484) 2314778 / 9961110999' },
                                   { FieldName: 'Kerala Tours and Travels', FieldValue: '9995905205' },
                                   { FieldName: 'Sree Ganesh Kerala Travels', FieldValue: '9497685544' },
                                   { FieldName: 'GOODWAY TRAVELS', FieldValue: '9847456614' }
                                   ];

            $scope.TransportModesAvailable = [];

            $scope.CTransportService = [
              { FieldName: 'Location Type', FieldValue: $sce.trustAsHtml('Tier II') },
              { FieldName: 'Transport radius in KM', FieldValue: $sce.trustAsHtml('25') },
              { FieldName: 'Serviceable areas', FieldValue: $sce.trustAsHtml('Angamaly, eddapaly, Kaloor, Medical Trust, Thrivankulam, Kolencherry, Perumbavoor') },
              { FieldName: 'Non serviceable areas', FieldValue: $sce.trustAsHtml('All locations beyond areas Angamaly, eddapaly, Kaloor, Medical Trust, Thrivankulam, Kolencherry, Perumbavoor') },
              { FieldName: 'Cognizant Transport Infra to be leveraged', FieldValue: $sce.trustAsHtml('Currently 24x7 operation not there in Kochi ') }
              ];

            $scope.TouristHeader = [
                            { name: 'Places to visit', addInfo: 'Details', desc: 'Famous for ' }
            ];

            $scope.TouristSpots = [
                            { name: 'Amusement Parks', distance: 'Wonderla', Description: 'South India’s largest amusement park' },
                            { name: '', distance: 'Silver Storm', Description: '' },
                            { name: '', distance: 'Dream World', Description: '' },
                            { name: 'Beaches', distance: 'Fortkochi', Description: 'Famous for Chinese fishing nets' },
                            { name: '', distance: 'Cherai', Description: '35 km away from Cochin with coastline of 15 kms' },
                            { name: '', distance: 'Munambam(Muziris Golden Beach)', Description: 'River periyar joins the Arabian Sea' },
                            { name: '', distance: 'Kuzhupilly', Description: '35 kms from kochi -filled with golden sands ' },
                            { name: 'Water Falls', distance: 'Athirapally', Description: '60 km from Kochi' },
                            { name: '', distance: 'Thomankutthu', Description: '' },
                            { name: '', distance: 'Vazhachal', Description: '' },
                            { name: 'Shopping Malls', distance: 'Lulu Mall', Description: '' },
                            { name: '', distance: 'Oberon Mall', Description: '' },
                            { name: '', distance: 'Gold Souk', Description: '' },
                            { name: '', distance: 'Abad Nucleus', Description: '' },
                            { name: 'Cinemas', distance: 'PVR - Lulu Mall', Description: '0484 - 4113222' },
                            { name: '', distance: 'Q-cinemas - Gold Souk', Description: '0484- 4066333' },
                            { name: '', distance: 'Cinemax - Oberon Mall', Description: '0484- 4113222' },
                            { name: '', distance: 'Saritha Savitha Sangeetha', Description: '0484 236 6183' },
                            { name: '', distance: 'Shenoys', Description: '0484 - 2353233' },
                            { name: '', distance: 'Sreedhar', Description: '0484-2352529 / 0484-4025226 ' },
                            { name: '', distance: 'Padma', Description: '0484-2354233' },
                            { name: 'Tourist Places', distance: 'Bolghatty Palace & Island ', Description: 'Palace  built by the Dutch in 1744 ' },
                            { name: '', distance: 'Backwaters of Kochi', Description: 'Lagoons and lakes lying parallel to the Arabian Sea coast' },
                            { name: '', distance: 'Hill Palace', Description: 'Largest archaeological museum in Kerala' },
                            { name: '', distance: 'Mattancherry Palace', Description: 'Built by the Portuguese in 1555 AD. The glory of the palace rests on the large number of murals, executed in the best traditions of Hindu temple art, which are religious, decorative and stylised.' },
                            { name: '', distance: 'Jewish Synagogue', Description: 'Oldest synagogue in the Commonwealth ' },
                            { name: '', distance: 'Willingdon Island', Description: 'Man-made island named after Lord Willingdon' },
                            { name: '', distance: 'Bhoothathankettu Dam', Description: 'A dam and tourist site 50 km away from the Kochi' },
                            { name: '', distance: 'Santa Cruz Cathedral Basilica', Description: 'Built originally by the Portuguese in in 1558 and elevated to a Cathedral by Pope Paul IV in 1558.' },
                            { name: '', distance: 'Mangalavanam Bird Sanctuary', Description: 'Ecologically sensitive area, home to many exotic & rare birds' },
                            { name: '', distance: 'Museum of Kerala History', Description: 'Life size statues  paintings depicting Kerala history' }
                           ];

            $scope.OtherTouristSpots = [];

            $scope.OtherPlaces = [];

            $scope.ImpServices = [
                            { FieldName: 'Airlines (Counter at Airport)', FieldValue: 'Cochin International Airport - +91-484-2610115.' },
                            { FieldName: '', FieldValue: 'Air India City: 2351295(2610040 airport)' },
                            { FieldName: '', FieldValue: 'Indian Airlines: 2371141(2610041 airport)' },
                            { FieldName: '', FieldValue: 'Jet airways: 2382275(2610038 airport)' },
                            { FieldName: '', FieldValue: 'Airlines Enquiries (Airport): 2610115/6' },

                            { FieldName: 'Blood Banks', FieldValue: 'IMA Voluntary Blood Bank Kochi +91-484-2354886. ' },
                            { FieldName: '', FieldValue: 'Blood Bank Voluntary ISBT Kochi +91-484-2361809.' },
                            { FieldName: '', FieldValue: 'Amrita Institute of Medical Sciences and Research Centre(+91-484-2339095)' },

                            { FieldName: 'Electricity Services', FieldValue: 'Kaloor - +91-48-42341923 ' },
                            { FieldName: '', FieldValue: 'Vyttila - +91-484-2304785 ' },
                            { FieldName: '', FieldValue: 'Willingdon Island +91-484-2668164 ' },
                            { FieldName: '', FieldValue: 'Fort - +91-484-2217298 ' },

                            { FieldName: 'Fire Services', FieldValue: 'Port - +91-484-2666555' },
                            { FieldName: '', FieldValue: 'Naval Base - +91-484-2666851' },
                            { FieldName: '', FieldValue: 'Club Road - +91-484-2355101 ' },
                            { FieldName: '', FieldValue: 'Mattanchery- +91-484-2255554 ' },
                            { FieldName: '', FieldValue: 'Gandhi Nagar - +91-484- 2205550, 101 ' },

                            { FieldName: 'Gas Services', FieldValue: 'Surya Agencies, Opposite Municipal Bus Stand, Hospital Road, Tripunithura, Kochi-Ernakulam, Kerala.Phone: +91-484-2784895. ' },
                            { FieldName: '', FieldValue: 'Lakshmi Agencies JJ Centre, Poonithura, Kochi-Ernakulam, Kerala.Phone: +91-484-2302943, 2304223, 2301515.' },

                            { FieldName: '24 Hour Services', FieldValue: 'Accident Care - +91-484- 98460 99900, 98460 07740.' },

                            { FieldName: 'Police', FieldValue: 'Control Room - 100, +91-484-2371178 ' },
                            { FieldName: '', FieldValue: 'Harbour - +91-484-2666005' },
                            { FieldName: '', FieldValue: 'City Traffic - +91-484-2394218' },
                            { FieldName: '', FieldValue: 'Central - +91-484-2394500' },
                            { FieldName: '', FieldValue: 'Railway - +91-484-2369259' },

                            { FieldName: 'Railways', FieldValue: 'South : 2376430/131,132' },
                            { FieldName: '', FieldValue: 'North:2395198' },
                            { FieldName: '', FieldValue: 'Thripunithura : 2777375' },
                            { FieldName: '', FieldValue: 'Reservations: 2375431' },
                            { FieldName: '', FieldValue: 'Cochin Harbour Terminus - +91-484-2666050 ' },


                            { FieldName: 'Telecommunication', FieldValue: 'Commercial Enquiry (Central) - +91-484-2202297 ' },
                            { FieldName: '', FieldValue: 'Commercial Enquiry (Urban) - +91-484-2316050' },
                            { FieldName: '', FieldValue: 'Idea (Escotel): 9847012345' },
                            { FieldName: '', FieldValue: 'Airtel: 9895012345' },
                            { FieldName: '', FieldValue: 'Reliance: 0484 3044444' },
                            { FieldName: '', FieldValue: 'CellOne: 2376149' },
                            { FieldName: '', FieldValue: 'Vodafone: 98460 98460' },

                            { FieldName: 'Tourist Information Centers', FieldValue: 'Sports Lakshwadeep Tourism - +91-484-2668387 ' },
                            { FieldName: '', FieldValue: 'India Tourism Office - +91-484-2668352' },
                            { FieldName: '', FieldValue: 'KTDC - Ernakulam - +91-484-2353534' },

                            { FieldName: 'Water Supply', FieldValue: 'Erunakulam Sub Division - +91-484-2372830 ' },
                            { FieldName: '', FieldValue: 'Control Room (Complaints) - +91-484-2361369l ' },
                            { FieldName: '', FieldValue: 'Drainage - +91-484-2369710 ' },

                            { FieldName: 'Hospitals', FieldValue: 'Amrita Institute of Medical Sciences & Research Centre: 2801234/2802100' },
                            { FieldName: '', FieldValue: 'Ernakulam Medical Centre, N.H. Palrivattom: 2807101 ¦ 106' },
                            { FieldName: '', FieldValue: 'Sunrise Hospital, Kakkanad:2428913-16 (4 lines)' },
                            { FieldName: '', FieldValue: 'PVS Memorial Hospital, Kaloor: 2345451/52/2345471' },
                            { FieldName: '', FieldValue: 'Lissie Hospital: 2401006/2402308' },
                            { FieldName: '', FieldValue: 'Medical Trust Hospital, M.G. Road: 2358002 ¦ 2358008' },
                            { FieldName: '', FieldValue: 'Lourdes Hospital: 4123456/4125555' },
                            { FieldName: '', FieldValue: 'Lakeshore hospital & Research Centre - 2701032, 2701033, 9847312301' },
                            { FieldName: '', FieldValue: 'General Hospital, Hospital Road: 2361251' },
                            { FieldName: '', FieldValue: 'Government Hospital: 2224444' },
                            { FieldName: '', FieldValue: 'Maharaja’s Hospital, Karuvelippady: 2224561' },
                            { FieldName: '', FieldValue: 'Womens and Children’s Hospital, Mattancherry. 2224511' },
                            { FieldName: '', FieldValue: 'Central Hospital, Kadavanthra: 2310005' },
                            { FieldName: '', FieldValue: 'City Hospital, M.G. Road: 2361809' },
                            { FieldName: '', FieldValue: 'Co-Operative Medical College, Kalamassery : 2411460' },
                            { FieldName: '', FieldValue: 'Cochin Hospital, M.G. Road:2378980' },
                            { FieldName: '', FieldValue: 'Cochin Mental Health Centre:2317790' },
                            { FieldName: '', FieldValue: 'Indira Gandhi Co-op Hospital, Gandhi Nagar:2206734/ 2204110' },
                            { FieldName: '', FieldValue: 'Lakshmi Hospital: 2382111' },
                            { FieldName: '', FieldValue: 'Sudheendra Hospital: 2354139' }

            /*commented below part as per new data 298015*/
            /*
            ,{ FieldName: 'Ambulance Services', FieldValue: 'Abhayam, Thripunithura: 2778980, 2779899' },
            { FieldName: '', FieldValue: 'Asraya, Poonithura 9447457676/9895855684' },
            { FieldName: '', FieldValue: 'General Hospital, Hospital Rd: 2361251/2381768' },
            { FieldName: '', FieldValue: 'Amrita Institute of Medical Science and Research : 2802111,2802060' },
            { FieldName: '', FieldValue: 'Anugraha Ambulance: 98471 21133' },
            { FieldName: '', FieldValue: 'Krishna Nursing Home: 2368250/2368230' },
            { FieldName: '', FieldValue: 'Ashir Bhavan, Kacheripady: 2395972' },
            { FieldName: '', FieldValue: 'Cortina Hospital, Chellanam: 2249809,2249841' },
            { FieldName: '', FieldValue: 'Dhanwanthari Service Society, C\o General Hospital: 2364815' },
            { FieldName: '', FieldValue: 'Doctors Diagnostice Centre.M.G. Rd: 2364041' },
            { FieldName: '', FieldValue: 'Ernakulam Medical Centre, N.H. Palarivattom: 2807101 -106' },
            { FieldName: '', FieldValue: 'Gautham Hospital, Panayampally: 2210512' },
            { FieldName: '', FieldValue: 'Indira Gandhi Co-op Hospital, Gandhi Nagar: 2206734/2204110' },
            { FieldName: '', FieldValue: 'Lakshmi Centre: 2382114' },
            { FieldName: '', FieldValue: 'Sudheendra Hospital: 2354139' },
            { FieldName: '', FieldValue: 'Lourdes Hospital: 4123456/4125555' },
            { FieldName: '', FieldValue: 'Maharajas Hospital: 2224561' },
            { FieldName: '', FieldValue: 'Medical Trust Hospital, M.G. Road: 2358002' },
            { FieldName: '', FieldValue: 'Ojus Clinic and Nursing Home,Mullassery Canal Road: 2370303' },
            { FieldName: '', FieldValue: 'PNVM Hospital: 2390097, 2396393' },
            { FieldName: '', FieldValue: 'PVS Memorial Hospital: 2345451' },
            { FieldName: '', FieldValue: 'Rotary Club of Cochin East, Kadavanthra: 98470-60077' },
            { FieldName: '', FieldValue: 'SakthiMedical Centre, Market Canal Rd: 2353783' },
            { FieldName: '', FieldValue: 'Specialist’s Hospital, Town Railway Station Road: 2395066' },
            { FieldName: '', FieldValue: 'Welcare Hospital: 4091111,2307897' },
            { FieldName: '', FieldValue: 'Sunrise Hospital, Kakkanad:2428913-16 (4 lines)' }
            */
                            ];
            $scope.AdditionalSvcTabs = [
                                { Id: 'ai1', Name: 'Schools' },
                                { Id: 'ai2', Name: 'Colleges' },
                                { Id: 'ai3', Name: 'More info' }
                            ];
            $scope.AdditionalSvcTabsDetails = [
                                                { Id: 'ai1', Details: [
                                                    { FieldName: 'Schools', FieldValue: '• Cardinal Higher Secondary School School, Kakkanadu', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Rajagiri Christu Jayanthi Public School, Kakkanadu', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	The Mar Thoma Public School, Edachira, Kakkanadu', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	SBOA Senior Secondary School, Chitoor Road', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Assisi Vidyaniketan Public School at Kakkanadu', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Radcliffe School, Thoppumpady', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Global Public School, Thiruvaniyur', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Bhavans Varuna Vidyalaya School, Thrikkakara', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Bhavans Vidya Mandir, Girinagar', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Rajagiri Public School, Kalamassery', FieldLink: '' }
                                                  ]
                                                },
                                                { Id: 'ai2', Details: [
                                                    { FieldName: 'Colleges ', FieldValue: '• Adi Shankara Institute of Engineering and Technology', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Christ Knowledge City', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Federal Institute of Science And Technology', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Ilahia College of Engineering Tech., Mulavoor, Moovattupuzha, Ernakulam.', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Ilahia School of Science And Technology, Pezhakkapilly.P.O,Muvattupuzha', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	K M E A Engineering College, Edathala, Alwaye.', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Mar Baselios Institute of Technology and Science', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Matha College of Technology, Manakappadi, North Pravur, Ernakulam', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Rajagiri School of Engineering & Technology, Kakkanad, Ernakulam', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	SCMS School of Engineering and Technology', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	SNM Institute of Management and Technology', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Sree Narayana Guru Institute of Science and Techno', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Sree Narayana Gurukulam College of Engineering, Kolencherry', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Sree Narayana Mangalam Institute of Management & Technology, Maliankara', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Vijnan Institute of Science and Technology, Ernakulam', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Viswajyothi College of Engineering and Technology', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Cochin University College of Engineering Kuttanad', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Cochin College, Cochin', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Government College Manimalakunnu', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	M. E. S. College, Nedumkandam', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Maharaja\'s college, Ernakulam', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	MES College Marampally, Aluva', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Nirmala College, Muvattupuzha', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	S.N.M College,Maliyankara,Moothakunnam', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Sacred Hearts college, Tevara', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	St. Albert\'s college, Ernakulam', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Govt. Arts college,Tripunithura-682031', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	St.Teresa\'s college, Ernakulam', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	St.Thomas College , Kozhencheri', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Union Christian College, Aluva', FieldLink: '' }
                                                  ]
                                                },
                                                { Id: 'ai3', Details: [
                                                    { FieldName: 'Additional Info', FieldValue: '', FieldLink: $sce.trustAsHtml('• <a href="http://www.keralatourism.org/kochi" runat="server" style="color:blue;" target="_blank">http://www.keralatourism.org/kochi</a>') }
                                                  ]
                                                },
                                            ];

            $scope.WriteUpInfoHide = $scope.WriteUpInfo.length == 0 ? true : false;
            $scope.ClimateInfoHide = $scope.ClimateInfo.length == 0 ? true : false;
            $scope.SeasonInfoHide = $scope.SeasonInfo.length == 0 ? true : false;
            $scope.AboutCityHide = $scope.WriteUpInfoHide && $scope.ClimateInfoHide && $scope.SeasonInfoHide;
            $scope.AccomodationHide = $scope.AccomodationInfo.length == 0 && $scope.HotelServices.length == 0 ? true : false;
            $scope.LanguageInfoHide = $scope.LanguageInfo.length == 0 ? true : false;
            $scope.SettlingDownHide = $scope.AccomodationHide && $scope.LanguageInfoHide;
            $scope.ByAirHide = $scope.AirTravelInfo.length == 0 && $scope.AirServiceProviders.length == 0 ? true : false;
            $scope.ByTrainHide = $scope.TrainTravelInfo.length == 0 && $scope.TrainServiceProviders.length == 0 ? true : false;
            $scope.ByRoadHide = $scope.RoadTravelInfo.length == 0 && $scope.RoadServiceProviders.length == 0 ? true : false;
            $scope.BySeaHide = $scope.SeaTravelInfo.length == 0 && $scope.SeaServiceProviders.length == 0 ? true : false;
            $scope.ReachingThereHide = $scope.ByAirHide && $scope.ByTrainHide && $scope.ByRoadHide && $scope.BySeaHide;
            $scope.OfficesHide = $scope.Offices.length == 0 ? true : false;
            $scope.TrainingCentersHide = $scope.TrainingCenters.length == 0 ? true : false;
            $scope.CognizantInCityHide = $scope.OfficesHide && $scope.TrainingCentersHide;
            $scope.TransportModesAvailableHide = $scope.TransportModesAvailable.length == 0 ? true : false;
            $scope.TransportModesHeaderHide = $scope.TransportModesHeader.length == 0 ? true : false;
            $scope.TransportModesHide = ($scope.TransportModes.length == 0 ? true : false) && $scope.TransportModesAvailableHide && $scope.TransportModesHeaderHide;
            $scope.CTransportServiceHide = $scope.CTransportService.length == 0 ? true : false;
            $scope.TravelWithinHide = $scope.TransportModesHide && $scope.CTransportServiceHide;

            $scope.TouristPlacesHide = $scope.TouristSpots.length == 0 && $scope.OtherTouristSpots.length == 0 ? true : false;
            $scope.OtherPlacessHide = $scope.OtherPlaces.length == 0 ? true : false;
            $scope.EntertainmentHide = $scope.TouristPlacesHide && $scope.OtherPlacessHide;
            $scope.ImpSvcHide = $scope.ImpServices.length == 0 ? true : false;
            $scope.ImpNosSrvcsHide = $scope.ImpSvcHide;
            $scope.AdditionalInfoHide = $scope.AdditionalSvcTabs.length == 0 ? true : false;

            break;
        //-------------------------------------------------Kochi end                                                         

        //-------------------------------------------------kolkata starts                                                                 
        case 5:

            $scope.WriteUpInfo = [
            /*298015 - updated content*/
                            {FieldName: 'Information', FieldValue: 'Kolkata or Calcutta (City of Joy) is the capital of the Indian state of West Bengal. Located on the east bank of the Hooghly river, it is the principal commercial, cultural, and educational center of East India, while the Port of Kolkata is India\'s oldest operating port as well as its sole major riverine port. As of 2011, Kolkata with 4.5 million residents confronts substantial urban pollution, traffic congestion, poverty, overpopulation, and other logistic and socio-economic problems.' },
                            { FieldName: '', FieldValue: 'Under the East India Company and later under the British Raj, Kolkata served as the capital of India until 1911, when its perceived geographical disadvantages, combined with growing nationalism in Bengal, led to a shift of the capital to New Delhi. As a nucleus of the 19th and early 20th century Bengal Renaissance and a religiously and ethnically diverse center of culture in Bengal and India, Kolkata has established local traditions in drama, art, film, theatre, and literature that have gained wide audiences. Though home to major cricketing venues and franchises, Kolkata differs from other Indian cities by giving importance to football and other sports.' }
                            ];

            $scope.ClimateInfo = [
                            { FieldName: 'Minimum Temperature', FieldValue: '9 °C' },
                            { FieldName: 'Maximum Temperature', FieldValue: '40 °C' },
                            { FieldName: 'Average Temperature', FieldValue: '26.8 °C' }
                            ];

            $scope.SeasonInfo = [
                            { FieldName: 'Information', FieldValue: 'Kolkata is subject to a tropical wet-and-dry climate and the annual mean temperature is 26.8°C (80.2°f); monthly mean temperatures are 19–30°c (66–86°f). Summers (March–June) are hot and humid, with temperatures in the low 30°c; during dry spells, maximum temperatures often exceed 40°c (104°f) in May and June.  Winter lasts for only about two-and-a-half months, with seasonal lows dipping to 9–11°c (48–52°f) in December and January. May is the hottest month, with daily temperatures ranging from 27–37°c (81–99°f); January, the coldest month, has temperatures varying from 12–23°c (54–73°f).' },
                            { FieldName: '', FieldValue: 'Rains brought by the Bay of Bengal branch of the south-west summer monsoon lash Kolkata between June and September, supplying it with most of its annual rainfall of 1,582 mm (62 in). The highest monthly rainfall total, 306 mm (12 in), occurs in August. The city receives 2,528 hours of sunshine per year, with maximum sunlight exposure occurring in March.' }
                            ];

            $scope.AccomodationInfo = [
                            { FieldName: 'Information', FieldValue: 'Kolkata is a place where one can find accommodation suiting everybody’s budget. It is advisable to be careful when seeking the services of brokers, as they can take undue advantage of new comers to Kolkata. It is habitual to pay 5-10 months rent as advance.  Please take the advice of your seniors before fixing accommodation and food.' }
                            ];

            $scope.HotelServices = [
                            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f; margin-left:-200px; margin-bottom:-12px;">Restaurants</b>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Banana Leaf</b><br/>Vegetarian cuisine<br/>73 & 75 Rash Behari Avenue, Kolkata 700026, India <br/>Ph: 24641960<br/>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Arsalan</b><br/>Mughal dish specialities <br/>191, Park Street, (7 Point Crossing), Kolkata 700017, India,<br/>Ph: +91 33 22848556<br/>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Bhojohori Manna</b><br/>Bengali dishes specialist<br/>18/1A, Hindustan Road, Ballygunge, Near South Calcutta Nursing Home |<br/>EM Bypass, Sarat Bose Road, Near Deshopriya Park, Kolkata 700029,<br/>Ph: 24663941<br/>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Mainland China</b><br/>Chinese restaurant and special occasion dining<br/>Uniworth House, 3A, Gurusaday Road, Ballygunge | Ballygunge, Kolkata 700016,<br/>Ph: 22837964<br/>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">The Blue Poppy</b><br/>Chinese food<br/>Sikkim House, 1st Floor, 4/1 Middleton St. | Midleton Row, Park Street, Kolkata<br/>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Oh Calcutta</b><br/>Upscale Indian with authentic Bengali food<br/>3rd Floor, Silver Arcade, 5, JBS Haldane Avenue, EM Bypass, Kolkata 700105,<br/>Ph: 33-22517036-0<br/>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Shiraaz Golden Restaurant</b><br/>Indian, Chicken and Kebab<br/>56, Near Mallick Bazar, A.J.C. Bose Road | Park Street, Park Circus, Circus Avenue, Kolkata700017<br/>Ph: 033 22805006<br/>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Rajdhani</b><br/>Indian Vegetarian – great Gujarati and Rajasthani Thali<br/>Mani Square Mall | EM Bypass, Near Appollo Hospital, Kolkata, India<br/>Ph: 033 – 23202828 / 39<br/>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Tamarind</b><br/>Indian, including south India dishes<br/>177, Opposite Deshapriya Park, Sarat Bose Road, Rash Behari Avenue, Kolkata 700029<br/>Ph: 033  66245204<br/>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Cream Center</b><br/>Innovative Indian Vegetarian dishes<br/>1 Allenby Road, Kolkata 700 020, India<br/>Ph: 33- 4071 6000<br/>') },
                            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f; margin-left:-200px; margin-bottom:-12px;">More info</b>') },
                            { desc: $sce.trustAsHtml('<a href="http://www.tripadvisor.in/Restaurants-g304558-Kolkata_Calcutta_West_Bengal.html" runat="server" style="color:blue;" target="_blank">http://www.tripadvisor.in/Restaurants-g304558-Kolkata_Calcutta_West_Bengal.html</a>') },
                            ];

            $scope.LanguageInfo = [
                            { FieldName: 'Local Lingo', FieldValue: 'Bengali, the official State language, is the dominant tongue in Kolkata. English is also used, particularly among white collar workers. Hindi and Urdu are spoken by a sizeable minority.' }
                            ];

            $scope.AirTravelInfo = [
                            { FieldName: 'Information', FieldValue: 'Netaji Subhas Chandra Bose International Airport, formerly known as Dum Dum airport, is about 17 km from the city and serves as the hub for the eastern region. Almost all national carriers – private and publicly owned – operate regular and frequent services to Kolkata. Several international carriers also serve this metropolis. The airport is connected to all major metros and several towns and cities across the country, especially in all North and North Eastern States.' }
                            ];

            $scope.AirServiceProviders = [
                            { name: 'Airport (General Inquiry)', tel: '140', site: '' },
                            { name: 'Airport (Reservation Inquiry)', tel: '141', site: '' },
                            { name: 'Airport (Flight Arrival)', tel: '142', site: '' },
                            { name: 'Airport (Flight Departure)', tel: '143', site: '' },
                            { name: 'Airline Info', tel: '-', site: 'http://www.mapsofindia.com/flight-schedule/' }
                            ];

            $scope.TrainTravelInfo = [
                            { FieldName: 'Information', FieldValue: 'Kolkata is well-connected to the rest of India by extensive railway network of the Indian railways. Two divisions of the Indian railways – the Eastern Railway and the South Eastern Railway are headquartered in the city. The two major railway stations of the city are at Howrah and Sealdah.' },
                            { FieldName: 'About Metro', FieldValue: 'Kolkata was the first city in South Asia to have an underground Metro rail system (started 1984). The line begins at Noapara in the north and continues south through Park Street, Esplanade in the heart of the city till the southern end in New Garia.' }
                            ];

            $scope.TrainServiceProviders = [
                            { name: 'Eastern Railways Reservation', tel: '136, 137, 138', site: '' },
                            { name: 'Reservation (South Eastern)', tel: '22480257', site: '' },
                            { name: 'General Manager (Eastern Railway)', tel: '22207596', site: '' },
                            { name: 'Assistant Commercial Manager (Fairlie)', tel: '22202201', site: '' },
                            { name: 'General Manager (S.E. Railway)', tel: '24393532', site: '' },
                            { name: 'Assistant Commercial Manager of S.E. Railway(Reservation)', tel: '22489494', site: '' },
                            { name: 'Indian Railways', tel: '-', site: 'http://www.indianrail.gov.in' }
                            ];

            $scope.RoadTravelInfo = [
                            { FieldName: 'Information', FieldValue: 'Kolkata is perhaps the only city in India that boasts of a fully functional road transport network that combines, metro buses, trams, taxis and a local railway system.' }
                            ];

            $scope.RoadServiceProviders = [
                            ];

            $scope.SeaTravelInfo = [
                            { FieldName: 'Boat/Ferry', FieldValue: 'The twin cities of Howrah and Kolkata are also connected through ferry services.' }
                            ];

            $scope.SeaServiceProviders = [
                            ];

            $scope.Offices = [
                            { FieldName: '• Bantala or GTP', FieldValue: $sce.trustAsHtml('Cognizant Technology Solutions <br/> Plot- 27, Kolkata IT Park, SEZ, <br/> Mouza: Gangapur, J.L.NO.35, GP: Taradah, <br/>PS: Kolkata leather Complex, <br/>Dist: South 24 Paraganas') },
                            { FieldName: '• TCPX', FieldValue: $sce.trustAsHtml('Cognizant Technology Solutions <br/>Plot No, GN 34/3, Sector V, Techno Complex Building, <br/>Salt Lake Electronics Complex') },
                            { FieldName: '•	BIPL', FieldValue: $sce.trustAsHtml('&nbsp;') },
                            { FieldName: '•	Unitech', FieldValue: $sce.trustAsHtml('&nbsp;') },
                            { FieldName: '• Technopolis', FieldValue: $sce.trustAsHtml('&nbsp;') },
                            { FieldName: '•	CIC', FieldValue: $sce.trustAsHtml('&nbsp;') }
                            ];

            $scope.TrainingCenters = [
                            { FieldName: '• Bantala or GTP', FieldValue: $sce.trustAsHtml('Cognizant Technology Solutions <br/> Plot- 27, Kolkata IT Park, SEZ, <br/> Mouza: Gangapur, J.L.NO.35, GP: Taradah, <br/>PS: Kolkata leather Complex, <br/>Dist: South 24 Paraganas') },
                            { FieldName: '• TCPX', FieldValue: $sce.trustAsHtml('Cognizant Technology Solutions <br/>Plot No, GN 34/3, Sector V, Techno Complex Building, <br/>Salt Lake Electronics Complex') }
                            ];

            $scope.TransportModesAvailable = [
                            { FieldName: 'How to reach there', FieldValue: '' },
                            { FieldName: 'By Bus:', FieldValue: 'Route for nodal bus routes:' },
                            { FieldName: 'Tollygunge to Sector V:', FieldValue: '•	V 1 (AC V series bus) Tollygunge - Airport via Rashbehari, Gariahat, Ruby Hospital, V.I.P Bazar, Science City, Chingrighata, E.M. Bypass, Ultadanga, Baguiati, Haldirams' },
                            { FieldName: '', FieldValue: '•	V 9 (AC V series bus) Tollygunge - New Town via Prince Anwar Shah Road, Jadavpur P.S., Kalikapur, Ruby Hospital, Chingrighata, Nicco Park, Sector V' },
                            { FieldName: '', FieldValue: '•	C8A (CTC Bus) Tollygunge - Airport Gate No. 1 via Sector-V, New Town, Haldiram' },
                            { FieldName: 'Ruby to Sector V:', FieldValue: '•	V 9 (AC V series bus) Tollygunge - New Town via Prince Anwar Shah Road, Jadavpur P.S., Kalikapur, Ruby Hospital, Chingrighata, Nicco Park, Sector V' },
                            { FieldName: '', FieldValue: '•	AS 3 (AS Series) New Town - Garia Station via Dhalai Bridge, Patuli, Hiland Park, Ruby Hospital, Science City, Chingrighata, Nicco Park, Sector V, College More, Technopolis.' },
                            { FieldName: 'Behala to Sector V:', FieldValue: '•	VS 4 Parnasree (AC VS Series) - SDF Unitech via Taratala, Chetla, Rashbehari Avenue, Gariahat, Ruby Hospital, Science City, Chingrighata, Nicco Park, Sector V, College More, Technopolis, DLF, Narkelbagan' },
                            { FieldName: '', FieldValue: '•	W 3 (WBSTC) Joka - Technopolis via - Taratala, Rashbehari, Ballygunge, Ruby Hospital, Science City, Nicco Park, College More' },
                            { FieldName: 'Santragachi to Sector V:', FieldValue: '•	MB 3 Airport - Santragachi via Rajarhat, New Town, SDF, Karunamoyee, Chingrighata, Park Circus, Vidyasagar Setu' },
                            { FieldName: '', FieldValue: '•	MB 4 Barasat - Santragachi via Madhyamgram, Airport Gate No. 1, Rajarhat, New Town, SDF, Karunamoyee, Chingrighata, Science City, Topsia, Park Circus, Minto Park, Rabindra Sadan, Vidyasagar Setu' },
                            { FieldName: 'Park Circus to Sector V:', FieldValue: '•	MH 3 (AC Bus) Exide - SDF Unitech via DLF,Technopolis, College More, Sector 5, Nicco Park , Karunamayee, Beliaghata, Chingrighata, Science City, Topsia, Bridge No.4, Park Circus, Minto Park' },
                            { FieldName: 'Airport to Sector V:', FieldValue: '•	VS 3 Parnasree - Airport Sector V, College More, Technopolis, DLF, Narkelbagan, Akanksha, City Centre II, Haldiram, Airport' },
                            { FieldName: '', FieldValue: '•	MB 3 Airport - Santragachi via Rajarhat, New Town, SDF' },
                            { FieldName: 'By autorickshaw:', FieldValue: '•	Karunamoyee to Sector V' },
                            { FieldName: '', FieldValue: '•	Chingrihata to Sector V' },
                            { FieldName: 'Some Important Tips', FieldValue: '1.	Autos are available on share basis.' },
                            { FieldName: '', FieldValue: '2.	Be prepared to pay extra during rains' },
                            { FieldName: '', FieldValue: '3.	Feel free to approach the traffic policeman and police officers close by. They provide accurate information about bus routes, auto fares etc. Besides, taxi drivers tend to be reasonable when the police is introduced as an arbitrator.' },
                            { FieldName: '', FieldValue: '' }
                            ];

            $scope.TransportModesHeader = [];
            $scope.TransportModes = [];

            $scope.CTransportService = [
              { FieldName: 'Location Type', FieldValue: $sce.trustAsHtml('Super metro') },
              { FieldName: 'Transport radius in KM', FieldValue: $sce.trustAsHtml('35') },
              { FieldName: 'City centre', FieldValue: $sce.trustAsHtml('Esplanade') },
              { FieldName: 'Serviceable areas', FieldValue: $sce.trustAsHtml('Ishapore, Palta,  Barrackpore, Titagarh, Khardah,Sodepur, Agarpara, Belgharia, Nimta, Dumdum, Baranagar, Ultadanga, Barasat, Madhyamgram, New barrackpore, Birati, Dumdum , Cantonment, Maheshtala, Budgebudge, Kabardanga, Sonarpur, Garia till Boral only, Diamond Park(Joka), Behala, Thakurpukur, Joka, Shibpur,Shalimar, Santragachi, Uttarpara, Liluah, Amta') },
              { FieldName: 'Non serviceable areas', FieldValue: $sce.trustAsHtml('Beyond Ichapore,Beyond Barasat,Beyond Joka,Beyond Budgebudge,Beyond Kabardanga,Beyond Sonarpur,Beyond Uttarpara,Beyond Liluah,Beyond Amta,Beyond Baksara,Beyond Santragachi.') },
              { FieldName: 'Cognizant Transport Infra to be leveraged', FieldValue: $sce.trustAsHtml('Login and logouts aligned to bus transport timings are supported by Bus Transport.24x7 transport is not available between 1am- 4am due to safety and security reasons') },
              { FieldName: 'City Transport Infra to be leveraged', FieldValue: $sce.trustAsHtml('Use of hubs from Metro rail stations and suburban local trains till a certain time.') }
              ];

            $scope.TouristHeader = [
                                { name: 'Category', addInfo: 'Place', desc: 'More Info' }
                                ];
            $scope.TouristSpots = [
                                { name: 'Art, Culture and Historical Interest', distance: 'Victoria Memorial, 1, Queens Way', Description: 'A museum of contemporary history and art' },
                                { name: 'Art, Culture and Historical Interest', distance: 'Belur Math, Belur Road', Description: 'Headquarters of the Ramakrishna order.' },
                                { name: 'Art, Culture and Historical Interest', distance: 'Jorasanko Thakur Bari', Description: 'Museum dedicated to Guru Rabindranath Tagore' },
                                { name: 'Science and contemporary subjects', distance: 'Science City', Description: 'A must see for children and adults.' },
                                { name: 'Science and contemporary subjects', distance: 'Birla Industrial and Technology museum ', Description: 'Public science museum' },
                                { name: 'Must visits', distance: 'National Library', Description: 'A free public library which is a vast treasure house of knowledge. At Alipore, the library is accessible by all modes of transport.' },
                                { name: 'Must visits', distance: 'Metro Rail', Description: 'An experience of its own, travelling in the underground network.' }
                                ];

            $scope.OtherTouristSpots = [
                            ];

            $scope.OtherPlaces = [
                                { FieldName: 'Cinemas & Entertainment', FieldValue: '• Inox Cinemas, Jodhpur Park | 33-24225265' },
                                { FieldName: '', FieldValue: '• Inox Cinemas, Lala Lajpat Rai, Sarani | 33-22836671, 23584499' },
                                { FieldName: '', FieldValue: '• Broadway Multiplex | 33-44341212, +(91)-9830760060' },
                                { FieldName: '', FieldValue: '• Priya Cinema Hall, Deshapriya Park | 33-24641313, 24196139, 24634240' },
                                { FieldName: '', FieldValue: '• Inox, Salt Lake City | 33-23581017, 23584499' }
                            ];

            $scope.ImpServices = [
                            { FieldName: 'Police', FieldValue: '• Control Room 100' },
                            { FieldName: '', FieldValue: '• Lalbazar Control Room 22155000-01, 22350230' },
                            { FieldName: '', FieldValue: '• West Bengal Police 22215486, 22215415' },

                            { FieldName: 'Fire service', FieldValue: '101' },

                            { FieldName: 'Kolkata Blood Bank', FieldValue: '• Central Blood bank 23510619' },
                            { FieldName: '', FieldValue: '• The Hemophilia Society 24163739' },
                            { FieldName: '', FieldValue: '• Lifecare Medical Services 22444940' },
                            { FieldName: '', FieldValue: '• Bhoruka Blood Bank 22449619' },

                            { FieldName: 'Emergency Ambulances:', FieldValue: '• Dhanwantary 24495594' },
                            { FieldName: '', FieldValue: '• Healthcare 24150600' },
                            { FieldName: '', FieldValue: '• Lifecare Medical Services 24754628' },
                            { FieldName: '', FieldValue: '• The Relief Medical services 24754169' },

                            { FieldName: 'Power Control Room:', FieldValue: '• CESC Fault reporting 22373161' },
                            { FieldName: '', FieldValue: '• CESC South  Kolkata 24663161' },
                            { FieldName: '', FieldValue: '• CESC North  Kolkata 25568606' },
                            { FieldName: '', FieldValue: '• WBSEB Control Room 23591896' },

                            { FieldName: 'Call Taxi Services', FieldValue: '• Mega Cab	033 41414141' }

                            ];

            $scope.AdditionalSvcTabs = [
                            { Id: 'ai1', Name: 'Hospital Information' },
                            { Id: 'ai2', Name: 'Colleges' },
                            { Id: 'ai3', Name: 'Schools' },
                            { Id: 'ai4', Name: 'Useful Links' }
                            ];

            $scope.AdditionalSvcTabsDetails = [
                            { Id: 'ai1', Details: [
                                                    { FieldName: 'Hospital info', FieldValue: '• Calcutta Medical College: 22414904, 22414901', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• S.S.K.M. Hospital (P.G.): 22236026, 22236242', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• R.G. Kar Medical College & Hospital: 25557656, 25557676', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• Medicare Clinic Pvt Ltd:26381778, 26389237', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• Wellesley Clinic: 22174991', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• Peerless Hospital: 24622462, 24622394', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• R.K.M. Seva Pratisthan (Sishu Mangal): 24753638, 24753636', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• Woodland: 24567076, 24567079', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• Calcutta Hospital and Medical Research: 24791805, 24567700', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• Belle View Nursing Home: 22472321, 22477473', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• Kothari Medical Centre & Research Institute: 24792561, 24567050', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• B.M.Birla Heart Research Centre: 24567001, 24567005', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• N.R.S. Medical College and Hospital: 22443217, 22443212', FieldLink: '' }
                                                    ]
                            },
                            { Id: 'ai2', Details: [
                                                    { FieldName: 'Colleges', FieldValue: '• Government College of Engineering and Ceramic Technology, Kolkata', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Heritage Institute of Technology, Kolkata', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	BP Poddar Institute of Management and Technology , Kolkata	  ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	West Bengal University of Animal and Fishery Sciences, Kolkata	  ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	St. Thomas College of Engineering and Technology, Kolkata	  ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Future Institute of Engineering and Management, Kolkata	 ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Calcutta Institute of Engineering and Management, Kolkata	 ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Bengal Institute of Technology, Kolkata	 ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Institute of Jute Technology, Kolkata	 ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Dr. Sudhir Chandra Sur Degree Engineering College, Kolkata	  ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	St. Mary\'s Technical Campus Kolkata	  ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Pailan College of Management and Technology, Kolkata', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Asutosh College', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Presidency College Kolkata', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Jadavpur University', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Lady Brabourne College', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	St Xaviers College Kolkata', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Ramkrishna Mission Vidyamandira', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Scottish Church College', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Gokhale Memorial Girls College', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Bethune College', FieldLink: '' }
                                                    ]
                            },
                            { Id: 'ai3', Details: [
                                                    { FieldName: 'Schools', FieldValue: '•	Don Bosco Park Circus | Dargah Road ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Don Bosco High School | Liluah ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	La Martiniere for Boys | Loudon Street ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Assembly of God Church School | Park Street ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Modern High School | Syed Amir Ali Avenue ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	The Heritage School | Anandapur ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Shri Shikshayatan | Lord Sinha Road ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Delhi Public School New Town | New Town ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Loreto Convent | Convent Road ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Patha Bhavan | Ballygunge Place', FieldLink: '' }
                                                    ]
                            },
                            { Id: 'ai4', Details: [
                                                    { FieldName: 'More info on Kolkata', FieldValue: '', FieldLink: $sce.trustAsHtml('•	<a href="http://www.tripadvisor.in/Attractions-g304558-Activities-Kolkata_Calcutta_West_Bengal.html" runat="server" style="color:blue;" target="_blank">http://www.tripadvisor.in/Attractions-g304558-Activities-Kolkata_Calcutta_West_Bengal.html</a>') },
                                                    { FieldName: '', FieldValue: '', FieldLink: $sce.trustAsHtml('•	<a href="http://www.justdial.com/Kolkata" runat="server" style="color:blue;" target="_blank">http://www.justdial.com/Kolkata</a>') },
                                                    { FieldName: '', FieldValue: '', FieldLink: $sce.trustAsHtml('•	<a href="http://www.calcuttaweb.com/" runat="server" style="color:blue;" target="_blank">http://www.calcuttaweb.com/</a>') },
                                                    { FieldName: '', FieldValue: '', FieldLink: $sce.trustAsHtml('•	<a href="http://www.justdial.com/Kolkata" runat="server" style="color:blue;" target="_blank">http://www.justdial.com/Kolkata</a>') }
                                                    ]
                            }
                            ];

            $scope.WriteUpInfoHide = $scope.WriteUpInfo.length == 0 ? true : false;
            $scope.ClimateInfoHide = $scope.ClimateInfo.length == 0 ? true : false;
            $scope.SeasonInfoHide = $scope.SeasonInfo.length == 0 ? true : false;
            $scope.AboutCityHide = $scope.WriteUpInfoHide && $scope.ClimateInfoHide && $scope.SeasonInfoHide;
            $scope.AccomodationHide = $scope.AccomodationInfo.length == 0 && $scope.HotelServices.length == 0 ? true : false;
            $scope.LanguageInfoHide = $scope.LanguageInfo.length == 0 ? true : false;
            $scope.SettlingDownHide = $scope.AccomodationHide && $scope.LanguageInfoHide;
            $scope.ByAirHide = $scope.AirTravelInfo.length == 0 && $scope.AirServiceProviders.length == 0 ? true : false;
            $scope.ByTrainHide = $scope.TrainTravelInfo.length == 0 && $scope.TrainServiceProviders.length == 0 ? true : false;
            $scope.ByRoadHide = $scope.RoadTravelInfo.length == 0 && $scope.RoadServiceProviders.length == 0 ? true : false;
            $scope.BySeaHide = $scope.SeaTravelInfo.length == 0 && $scope.SeaServiceProviders.length == 0 ? true : false;
            $scope.ReachingThereHide = $scope.ByAirHide && $scope.ByTrainHide && $scope.ByRoadHide && $scope.BySeaHide;
            $scope.OfficesHide = $scope.Offices.length == 0 ? true : false;
            $scope.TrainingCentersHide = $scope.TrainingCenters.length == 0 ? true : false;
            $scope.CognizantInCityHide = $scope.OfficesHide && $scope.TrainingCentersHide;
            $scope.TransportModesAvailableHide = $scope.TransportModesAvailable.length == 0 ? true : false;
            $scope.TransportModesHeaderHide = $scope.TransportModesHeader.length == 0 ? true : false;
            $scope.TransportModesHide = ($scope.TransportModes.length == 0 ? true : false) && $scope.TransportModesAvailableHide && $scope.TransportModesHeaderHide;
            $scope.CTransportServiceHide = $scope.CTransportService.length == 0 ? true : false;
            $scope.TravelWithinHide = $scope.TransportModesHide && $scope.CTransportServiceHide;

            $scope.TouristPlacesHide = $scope.TouristSpots.length == 0 && $scope.OtherTouristSpots.length == 0 ? true : false;
            $scope.OtherPlacessHide = $scope.OtherPlaces.length == 0 ? true : false;
            $scope.EntertainmentHide = $scope.TouristPlacesHide && $scope.OtherPlacessHide;
            $scope.ImpSvcHide = $scope.ImpServices.length == 0 ? true : false;
            $scope.ImpNosSrvcsHide = $scope.ImpSvcHide;
            $scope.AdditionalInfoHide = $scope.AdditionalSvcTabs.length == 0 ? true : false;
            $scope.OtherServicesHide = $scope.OtherServices == 0 ? true : false;

            break;
        // ------------------------------------------------kolkata ends                                                         
        // ------------------------------------------------Pune starts                                                         
        case 6:
            $scope.WriteUpInfo = [
                            { FieldName: 'Information', FieldValue: 'Not far from Mumbai, but close enough to the Western Ghats, Pune (Pop: 6.2 million) is known for its cultural and academic institutions. It is also a preferred destination for automobile manufacturers, IT service providers,  while the city is also known for its lush surroundings, imposing hills, green valleys, clear rivers, and a relaxed pace of life.' },
                            { FieldName: '', FieldValue: 'Pune is known to have existed as a town since 847 AD. It was the first capital of the Maratha Empire under Chhatrapati Shivaji Raje Bhosale.  Pune was the largest military camp for the British forces during the Raj and the architecture in the cantonment area is very evocative of the era.' },
                            { FieldName: '', FieldValue: 'The Army\'s Southern Command, is headquartered in Pune cantonment. The city is home to the IAF (Indian Air Force). The National Defence Academy (NDA) is an integrated military training center that provides education up to graduation and joint training for cadets of the Army, the Navy and the Air Force.' },
                            { FieldName: '', FieldValue: 'The growth in the education and IT sectors has led to an influx of skilled labor and white-collar professionals from across India. Consequently, people here balance their traditional simplicity and cultural roots with the fast pace of modern life, and the city boasts an active nightlife.' }
                            ];

            $scope.ClimateInfo = [
                            { FieldName: 'Information', FieldValue: 'Pune has a tropical wet and dry climate with average temperatures ranging from 20 to 28 °C. Hottest months here are from March to May. Winter begins in November lasting till January when the daytime temperature hovers around 28 °c while night temperature is below 10 °c. It receives its seasonal rainfall from south-west monsoon winds that last from June mostly extending to October with moderate rainfall and temperatures ranging from 22 to 28 °c.' }
                            ];

            $scope.SeasonInfo = [];

            $scope.AccomodationInfo = [
                            { FieldName: 'Information', FieldValue: 'If one is looking for accommodation in Pune, then the place has no dearth of hotels, hostels and rented flats available as to suit varied budgets.' }
                            ];

            $scope.HotelServices = [
                            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f; margin-left:-200px;">PG/Guest Houses in Pune</b>') },
                            { desc: $sce.trustAsHtml('• <a href="http://www.punestay.com/pg-accomodation-pune.html" target="_blank" type="text/html" style="color:blue;">http://www.punestay.com/pg-accomodation-pune.html</a>') },
                            { desc: $sce.trustAsHtml('• <a href="http://in.easyroommate.com/maharashtra/pune-flatshare/listings/l" target="_blank" type="text/html" style="color:blue;">http://in.easyroommate.com/maharashtra/pune-flatshare/listings/l</a>') },
                            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f; margin-left:-200px; margin-bottom:-12px;">Hotels in Pune</b>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Blue Nile Restaurant</b><br/>Indian, Afghani and Fast Food<br/>4, Bund Garden Road, Opp Pune Club') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Shreya’s Restaurant</b><br/>Indian – Gujarati, Rajasthani<br/>020 2553 2023') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Ramkrishna</b><br/>South Indian<br/>6, Moledina Road, Opposite Westend Theatre,<br/>Camp Area,<br/>020 26363936, 020 26363937') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Taareef</b><br/>Fish and Kebab<br/>Tara Hospitality Management Echelon Belding.<br/>Sus Link Road,Baner<br/>020 25883232, 020 25883322') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">George Restaurant</b><br/>Briyani and Kebabs<br/>East Street, Lane No 2436, Thimayya Road,<br/>Camp, Near Saraswati College.<br/>020 26131626') },
                            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f; margin-left:-200px; margin-bottom:-12px;">More info</b>') },
                            { desc: $sce.trustAsHtml('<a href="http://www.tripadvisor.in/Restaurants-g297654-Pune_Maharashtra.html" runat="server" style="color:blue;" target="_blank">http://www.tripadvisor.in/Restaurants-g297654-Pune_Maharashtra.html</a>') },
                            ];

            $scope.LanguageInfo = [
                            { FieldName: 'Local Lingo', FieldValue: 'Official language in Pune is Marathi since the city has a predominantly Marathi-speaking population and the form of Marathi spoken in Pune is held as the standard form of the language. Hindi, Gujarati and English are also understood and spoken widely. English can be used in many parts of Pune.' }
                            ];

            $scope.AirTravelInfo = [
                            { FieldName: 'Information', FieldValue: 'Pune Airport is located approximately 10km north-east of the city, and it handles both domestic and international flights. Almost all the national carriers including private providers connect to Pune. And Mumbai airport is only 199km away. Pre-paid taxi and autorickshaw services to and from airport are available. Coach services to various key locations in Pune and private car rental services are also available. PMPML buses operating to Viman Nagar terminate at the airport.' },
                            { FieldName: 'Important Contacts', FieldValue: '' },
                            { FieldName: '', FieldValue: '• AirPort Authority Of India(Duty Officer)  26685201' },
                            { FieldName: '', FieldValue: '• General Enquiry   140' },
                            { FieldName: '', FieldValue: '• Booking	141' },
                            { FieldName: '', FieldValue: '• Arrival	142' },
                            { FieldName: '', FieldValue: '• Departure	143' },
                            { FieldName: '', FieldValue: '• Airport	26689433' },
                            { FieldName: '', FieldValue: '• Air India	26128190' }
                            ];
            $scope.AirServiceProviders = [];
            $scope.TrainTravelInfo = [
                            { FieldName: 'Information', FieldValue: 'Pune Railway station connects the city with most of the major cities of India. The city also has Local EMU services that connects that connects to Pimpri industrial area' },
                            { FieldName: 'Important Contacts', FieldValue: '' },
                            { FieldName: '', FieldValue: '• General Enquiry	131' },
                            { FieldName: '', FieldValue: '• Booking	132' },
                            { FieldName: '', FieldValue: '• Arrival / Departure	133' },
                            { FieldName: '', FieldValue: '• Enquiry	26126575' }
                            ];
            $scope.TrainServiceProviders = [];
            $scope.RoadTravelInfo = [
                            { FieldName: 'Information', FieldValue: 'Public buses within the city and its suburbs are operated by the Pune Mahanagar Parivahan Mahamandal Limited (PMPML). The Maharashtra State Road Transport Corporation runs buses from its main stations in Shivajinagar, Pune station and Swargate to all major cities and towns in Maharashtra and neighboring states. Private companies run buses to major cities throughout India. Pune is well-connected to other cities by Indian highways and state highways. National Highway 4 (NH 4) connects it to Mumbai, Bangalore and Kolhapur. NH 9 to Hyderabad, and NH 50 to Nashik. State highways connect it to Ahmednagar, Aurangabad, and Alandi.' },
                            { FieldName: '', FieldValue: 'The Mumbai-Pune Expressway, India\'s first six-lane high-speed expressway, built in 2002, has reduced travel time between Pune and Mumbai to almost two hours.' }
                            ];
            $scope.RoadServiceProviders = [];
            $scope.SeaTravelInfo = [];
            $scope.SeaServiceProviders = [];

            $scope.Offices = [
                            { FieldName: 'Global Delivery Center', FieldValue: $sce.trustAsHtml('Plot #26, Rajiv Gandhi Infotech Park,<br/>MIDC, Hinjewadi,<br/>Pune – 411057<br/>Ph: +91 20 2293 1100,+91 20 5652 1100') }
                            , { FieldName: 'ICC Tech and Trade Towers', FieldValue: $sce.trustAsHtml('Senapati Bapat Road,<br/>Pune-411016<br/>Ph: +91 020 30245000') }
                            ];

            $scope.TrainingCenters = [
                           { FieldName: 'Global Delivery Center', FieldValue: $sce.trustAsHtml('Plot #26, Rajiv Gandhi Infotech Park,<br/>MIDC, Hinjewadi,<br/>Pune – 411057,<br/>Ph: +91 20 2293 1100,+91 20 5652 1100') }
                            ];

            $scope.TransportModesAvailable = [];
            $scope.TransportModesHeader = [];
            $scope.TransportModes = [];
            $scope.CTransportService = [
              { FieldName: 'Location Type', FieldValue: $sce.trustAsHtml('Metro') },
              { FieldName: 'Transport radius in KM', FieldValue: $sce.trustAsHtml('25') },
              { FieldName: 'City centre', FieldValue: $sce.trustAsHtml('Pune University') },
              { FieldName: 'Serviceable areas', FieldValue: $sce.trustAsHtml('Hadapsar, Wagholi, Katraj Junction,  Phursungi, Kondhwa,Moshi Chowk, Dighi,  Dehu Road, Khadakwasla.') },
              { FieldName: 'Non serviceable areas', FieldValue: $sce.trustAsHtml('Lonikand, Shindewadi, Shewalwadi, Somatane Phata, Kuruli, Khanapur, Alandi, Wadki, Yevlewadi.') },
              { FieldName: 'City Transport Infra to be leveraged', FieldValue: $sce.trustAsHtml('PMPML Buses') }
              ];

            $scope.TouristHeader = [
                                { name: 'Category', addInfo: 'Place', desc: 'More Info' }
                                ];
            $scope.TouristSpots = [
                                { name: 'Palace', distance: 'Agha Khan Palace', Description: 'Known for its architecture, history (as Mahatma Gandhi was detained here), and lush green gardens' },
                                { name: 'Palace', distance: 'Lal Mahal palace', Description: 'In the year 1643 AD, Shivaji\'s Father Sahaji Bhonsale, famously known as Dadaji, established Lal Mahal for his wife Jijabai and son. Shivaji stayed here for several years until he captured his first fort. Lal Mahal in Pune is made of red bricks.' },
                                { name: 'Museum', distance: 'National Film Archives Museum', Description: 'Holds the largest collection of films in Asia. ' },
                                { name: 'Zoo', distance: 'Katraj Snake Park ', Description: 'Famous conservation park boasting a vast collection of snakes, reptiles, birds and turtles' },
                                { name: 'WaterPark    ', distance: 'Splash Mountain Water Park', Description: 'A large water amusement park' }
                                ];
            $scope.OtherTouristSpots = [];
            $scope.OtherPlaces = [];


            $scope.ImpServices = [
                            { FieldName: 'Emergency / Control Room', FieldValue: '100' },
                            { FieldName: 'Exchange', FieldValue: '26122202 , 25532041' },
                            { FieldName: 'High Way Traffic Police Enquiry', FieldValue: '25819301' },

                            { FieldName: 'Fire Brigade', FieldValue: '101' },
                            { FieldName: 'Ambulance', FieldValue: '102' },
                            { FieldName: 'Pune Heart Brigade', FieldValue: '105' },

                            { FieldName: 'Mumbai Pune Taxi Stand', FieldValue: '26135784' },
                            { FieldName: 'Pune Mumbai Taxi Stand', FieldValue: '26129657' },
                            { FieldName: 'M T D C ( Tourist Information )', FieldValue: '26126867 , 26128169' },
                            { FieldName: 'Pune Municipal Corporation', FieldValue: '25532521' },
                            { FieldName: 'PimpriChinchwad Municipal', FieldValue: '27477777' },

                            { FieldName: 'Blood Banks', FieldValue: '• Harati hospital 2437 5182' },
                            { FieldName: '', FieldValue: '•	Jahangir hospital 2605 0550' },
                            { FieldName: '', FieldValue: '•	Dindayal memorial hospital 2665 2497' },
                            { FieldName: '', FieldValue: '•	Jankalyan 2444 9527' },

                            { FieldName: 'Call Taxi Services', FieldValue: '• Travel time, 020 66000000' },
                            { FieldName: '', FieldValue: '• Wings Radio Cabs, 020 40100100' },
                            { FieldName: '', FieldValue: '• T Cabs, 020-67286728' }
                            ];


            $scope.AdditionalSvcTabs = [
                            { Id: 'ai1', Name: 'Useful Links' },
                            { Id: 'ai2', Name: 'Hospitals' },
                            { Id: 'ai3', Name: 'Schools' },
                            { Id: 'ai4', Name: 'Colleges' }
                            ];

            $scope.AdditionalSvcTabsDetails = [
                            { Id: 'ai1', Details: [
                                                    { FieldName: 'More Information', FieldValue: '', FieldLink: $sce.trustAsHtml('<a href="http://www.virtualpune.com/" runat="server" style="color:blue;" target="_blank">http://www.virtualpune.com/</a>') },
                                                    { FieldName: 'Vacations', FieldValue: '', FieldLink: $sce.trustAsHtml('<a href="http://www.tripadvisor.in/Tourism-g297654-Pune_Maharashtra-Vacations.html" runat="server" style="color:blue;" target="_blank">http://www.tripadvisor.in/Tourism-g297654-Pune_Maharashtra-Vacations.html</a>') },
                                                    { FieldName: 'Govt. of India', FieldValue: '', FieldLink: $sce.trustAsHtml('<a href="http://www.goidirectory.nic.in" runat="server" style="color:blue;" target="_blank">http://www.goidirectory.nic.in</a>') },
                                                    { FieldName: 'Airways', FieldValue: '', FieldLink: $sce.trustAsHtml('<a href="http://www.flightstats.com/go/FlightSchedules/schedules.do" runat="server" style="color:blue;" target="_blank">http://www.flightstats.com/go/FlightSchedules/schedules.do</a>') },
                                                    { FieldName: 'Railways', FieldValue: '', FieldLink: $sce.trustAsHtml('<a href="http://www.indianrail.gov.in/inet_metro_trns.html" runat="server" style="color:blue;" target="_blank">http://www.indianrail.gov.in/inet_metro_trns.html</a>') },
                                                    { FieldName: '', FieldValue: '', FieldLink: $sce.trustAsHtml('<p style="width: 100%; text-align: justify; margin-top: 40px; margin-left: 0px;">(Please note: While we try and provide you the most accurate information as possible, Cognizant is not responsible for any changes in the data, external URL links and/or telephone numbers provided in this document. We would request you to individually authenticate the same.)</p>') }
                                                  ]
                            },
                            { Id: 'ai2', Details: [
                                                    { FieldName: 'Hospital Telephone no.s', FieldValue: '• Sasoon hospital 2612 8000', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• Jahangir hospital	2612 2551', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• Ruby hall clinic	2612 3391', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• Poona hospital	2433 1606', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• KEM hospital	2612 5600', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• Sancheti hospital	2553 3334', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• Hardikar hospital	2553 5326', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '• Dinanath Mangeshkar hospital	2544 8585', FieldLink: '' }
                                                  ]
                            },
                            { Id: 'ai3', Details: [
                                                    { FieldName: 'Schools', FieldValue: '• Air Force School Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	GIIS Chinchwad', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Lexicon International School', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Vikhe Patil Memorial School, Lohegaon', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Orchid School', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Millennium National School', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	RIMS International School', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	City International School', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Podar International School', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	DAV Public School', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Suyog Kider Brook Higher', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Pawar Public School Hinjewadi', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Army School, Khadki', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Billabong International School', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Orbis School', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Jnana Prabodhini Prashala School', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Vikhe Patil Memorial School, SB Road', FieldLink: '' }
                                                  ]
                            },
                            { Id: 'ai4', Details: [
                                                    { FieldName: 'Colleges ', FieldValue: '• Bharati Vidyapeeth, Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Symbiosis Institute of Technology', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	College of Engineering, Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Maharashtra Institute of Technology', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Smt. Kashibai Navale College of Engineering, Vadgaon', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Sinhgad Institute of Technology and Science, Narhe', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	PE Society\'s Modern College of Engineering', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Pune Vidhyarthi Griha\'s College of Engineering and Technology', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	MIT Academy of Engineering, Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Vidya Pratishthan\'s College of Engineering', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Sinhgad Academy of Engineering, Kondhwa', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Modern Education Society\'s College of Engineering', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	All India Shri Shivaji Memorial Society\'s College of Engineering', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Pimpri Chichwad College of Engineering', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	MIT College of Engineering  ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Pune Institute of Computer Technology', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	DY Patil College of Engineering ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Saraswati Education Society’s Group of Institutions- Faculty of Engineering ', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	SVPM\'s College of Engineering, Pune	', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Marathwada Mitra Mandal\'s College of Engineering, Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Vishwakarma Institute of Information Technology, Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Pad. Dr. DY Patil Institute of Engineering, Management and Research', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Padmashree Dr. DY Patil Institute of Engineering and Technology', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Jayawantrao Sawant College of Engineering, Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	A.B.M.S. Parishad\'s Shri Shahu Mandir Mahavidyalaya - Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Abasaheb Garware College of Arts & Science - Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Abeda Inamdar College For Girls - Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Abhinav Kala Mahavidyalaya - Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Acharya Atre Development Trust\'s College of Arts - Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Adarsha Comprehensive College of Education & Research - Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Agricultural Development Trust\'s Shardabai Pawar Mahila College - Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	All India Shri Shivaji Memorial Society - Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Anantrao Thopte College - Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Annasaheb Magar College Hadapsar - Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Annasaheb Waghire College of Arts, Science & Commerce - Pune', FieldLink: '' },
                                                    { FieldName: '', FieldValue: '•	Tuljaram Chaturchand College - Pune', FieldLink: '' }
                                                  ]
                            }
                            ];

            $scope.OtherServices = [
                            ];


            $scope.WriteUpInfoHide = $scope.WriteUpInfo.length == 0 ? true : false;
            $scope.ClimateInfoHide = $scope.ClimateInfo.length == 0 ? true : false;
            $scope.SeasonInfoHide = $scope.SeasonInfo.length == 0 ? true : false;
            $scope.AboutCityHide = $scope.WriteUpInfoHide && $scope.ClimateInfoHide && $scope.SeasonInfoHide;
            $scope.AccomodationHide = $scope.AccomodationInfo.length == 0 && $scope.HotelServices.length == 0 ? true : false;
            $scope.LanguageInfoHide = $scope.LanguageInfo.length == 0 ? true : false;
            $scope.SettlingDownHide = $scope.AccomodationHide && $scope.LanguageInfoHide;
            $scope.ByAirHide = $scope.AirTravelInfo.length == 0 && $scope.AirServiceProviders.length == 0 ? true : false;
            $scope.ByTrainHide = $scope.TrainTravelInfo.length == 0 && $scope.TrainServiceProviders.length == 0 ? true : false;
            $scope.ByRoadHide = $scope.RoadTravelInfo.length == 0 && $scope.RoadServiceProviders.length == 0 ? true : false;
            $scope.BySeaHide = $scope.SeaTravelInfo.length == 0 && $scope.SeaServiceProviders.length == 0 ? true : false;
            $scope.ReachingThereHide = $scope.ByAirHide && $scope.ByTrainHide && $scope.ByRoadHide && $scope.BySeaHide;
            $scope.OfficesHide = $scope.Offices.length == 0 ? true : false;
            $scope.TrainingCentersHide = $scope.TrainingCenters.length == 0 ? true : false;
            $scope.CognizantInCityHide = $scope.OfficesHide && $scope.TrainingCentersHide;
            $scope.TransportModesAvailableHide = $scope.TransportModesAvailable.length == 0 ? true : false;
            $scope.TransportModesHeaderHide = $scope.TransportModesHeader.length == 0 ? true : false;
            $scope.TransportModesHide = ($scope.TransportModes.length == 0 ? true : false) && $scope.TransportModesAvailableHide && $scope.TransportModesHeaderHide;
            //            $scope.TransportModesHide = $scope.TransportModes.length==0  && $scope.TransportModesHeaderHide.length ==0 && $scope.TransportModesAvailableHide.length==0 ? true : false;
            $scope.CTransportServiceHide = $scope.CTransportService.length == 0 ? true : false;
            $scope.TravelWithinHide = $scope.TransportModesHide && $scope.CTransportServiceHide;
            $scope.TouristPlacesHide = $scope.TouristSpots.length == 0 && $scope.OtherTouristSpots.length == 0 ? true : false;
            $scope.OtherPlacessHide = $scope.OtherPlaces.length == 0 ? true : false;
            $scope.EntertainmentHide = $scope.TouristPlacesHide && $scope.OtherPlacessHide;
            $scope.ImpSvcHide = $scope.ImpServices.length == 0 ? true : false;
            $scope.ImpNosSrvcsHide = $scope.ImpSvcHide;
            $scope.AdditionalInfoHide = $scope.AdditionalSvcTabs.length == 0 ? true : false;
            $scope.OtherServicesHide = $scope.OtherServices == 0 ? true : false;
            break;
        //-------------------------------------------------Pune ends                 
        //------------------------------------------Bengaluru starts               
        case 7:

            $scope.WriteUpInfo = [
                            { FieldName: 'Information', FieldValue: 'India\'s answer to Silicon Valley, this Garden City of India, is the capital of the State of Karnataka and is today known for its cosmopolitan atmosphere, having emerged the biggest Information Technology center in the region. Bangalore (Pop: About 6.8 million) is also home to some of India’s premier scientific establishments.' },
                            { FieldName: '', FieldValue: 'Though history records the existence of the settlement, the British took control of the Mysore Kingdom in 1831 and slowly moved their administrative capital to this town from Mysore, and developed the city with rail and road network and beautified the entire landscape with several parks / gardens.  The first city to get electricity in India, the city with the most places of worship of all faiths, and embracing a very contemporary culture, it is the city with the highest number of pubs in India, and breweries in the world! From majestic monuments to malls, entertainment arcades to lush gardens with 200-year-old flora, game reserves and safari parks, pubs, restaurants and discotheques, Bangalore offers something for everyone.' },
                            { FieldName: '', FieldValue: 'While the green cover seems to be coming down in this Garden city, the traditional Mysore Royal culture can still be seen and experienced here. Not surprisingly today, the green cosmopolitan city has attracted modern corporates  and multinationals to set up base here.' }
                            ];

            $scope.ClimateInfo = [
                            { FieldName: 'Information', FieldValue: 'Mostly moderate throughout the year, occasional heat waves can make things uncomfortable in the summer. However, the summer heat is moderated by fairly frequent thunderstorms. The coolest month is December with an average low temperature of 15.4 °C and the hottest month is April with an average high temperature of 32.8 °C. Summer temperatures seldom exceed 34–35 °C (<100 °F), Bangalore receives rainfall from both the northeast and the southwest monsoons and the wettest months are September, October and August, in that order. ' },
                            ];

            $scope.SeasonInfo = [
                            ];

            $scope.AccomodationInfo = [
                            { FieldName: 'Information', FieldValue: 'Being a cosmopolitan city, finding a suitable accommodation in Bangalore is an easy task. However, it is always advisable to be careful when seeking the services of brokers, as they are known to take undue advantage of new comers to Bangalore. It is habitual to pay a specific amount as deposit for renting a house and we know it takes some skill to negotiate the amount! Please take the advice of your seniors before fixing accommodation and food.' }
                            ];

            $scope.HotelServices = [
                            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f; margin-left:-200px; margin-bottom:-12px;">Restaurants</b>') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Adiga’s</b><br/>Veg chain across Bangalore<br/>Enquiries +91 8880008000') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Barbeque Nation</b><br/>Ascenda’s Park Square Mall<br/>Continental, Mediterranean,<br/>+91 9900080401') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Time Traveller</b><br/>New Electronic City<br/>Indian Vegetarian <br/>080-40400400') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Egg Factory,</b><br/>St Mark’s Road and JP Nagar<br/>Café, Continental<br/>080 41289056') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Mainland China</b><br/>Indira Nagar<br/>Chinese,<br/>80 2227 7722, +91 90 2224 5864.') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Sahib Sind Sultan</b><br/>Koramangala<br/>Kebab and Moghul<br/>+91 80 2206 7878') },
                            { desc: $sce.trustAsHtml('• <b style="font-weight:bold; color:#3f3f3f;">Sues Food Place</b><br/>Indira Nagar<br/>American, Indian<br/>080 25252494, +91 9886139201') }
                            ];

            $scope.LanguageInfo = [
                            { FieldName: 'Local Lingo', FieldValue: 'State Language : Kannada' },
                            { FieldName: '', FieldValue: 'English is widely understood. Hindi and Tamil and to an extent Telugu, are used by a significant minority.' }
                            ];

            $scope.AirTravelInfo = [
                            { FieldName: 'More Info', FieldValue: 'Bangalore’s Devanahalli airport, situated about 40 km from the main business district and about 30 km from the Bangalore railway station, and inaugurated in 2008, is a fairly busy airport. It is connected to most of the important international and national cities. Bangalore Metropolitan Transport Corporation’s bus and prepaid taxi services are available for passengers to reach the city.' }
                            ];

            $scope.AirServiceProviders = [
                            ];

            $scope.TrainTravelInfo = [
                            { FieldName: 'More Info', FieldValue: 'The city has two major railway terminals - the Bangalore City station, situated in the heart of the city, and Yeshwantpur Junction located on NH-4 (Tumkur Road). A few (mostly long-distance) trains arrive and depart from here. Two smaller railway terminals are Bangalore East and Bangalore Cantonment. Of late Krishnarajapuram (KJM) has become an important stop owing to the proximity of IT companies, and the ring road passing close to the station and well connected by buses to major parts. ' }
                            ];

            $scope.TrainServiceProviders = [
                            ];

            $scope.RoadTravelInfo = [
                            { FieldName: 'More Info', FieldValue: 'The Majestic (Kempa Gowda) bus terminal near the City railway station is the hub that connects Bangalore with all other parts of Karnataka and nearby States. Both government run and private luxury buses are available to suit one’s budget. Within the City, the BMTC operates buses, the main hub again in Kempa Gowda terminal.' }
                            ];

            $scope.RoadServiceProviders = [
                            ];

            $scope.SeaTravelInfo = [
                            ];

            $scope.SeaServiceProviders = [
                            ];

            $scope.Offices = [
                            { FieldName: 'BTPLV', FieldValue: $sce.trustAsHtml('Cognizant Global Services Private Limited,<br/>5th Floor, Block A, Lakeview,Bagmane Technology park,<br/>C.V.Raman Nagar, Byrasandra, Bangalore-93') },
                            { FieldName: 'BTP', FieldValue: $sce.trustAsHtml('Bagmane Tech Park,<br/>65/2-1,aAdjacent to LRDE, Byrasandra,<br/>C.V Raman nagar,Bangalore-93') },
                            { FieldName: 'MBP - G4', FieldValue: $sce.trustAsHtml('G-4 aspen,Manyatha Embassy Tech Pack<br/>Rachenahalli, Near Nagawara circle<br/>Bangalore-17') },
                            { FieldName: 'MBP - F2', FieldValue: $sce.trustAsHtml('F2 mahagany,Manyatha Embassy Tech Pack<br/>Rachenahalli, Near Nagawara circle<br/>Bangalore-17') },
                            { FieldName: 'GVC', FieldValue: $sce.trustAsHtml('Cognizant Technology Solutions Pvt Ltd<br/># 45, Golf View Campus,, N.A.L. Wind Tunnel Road,<br/>BBMP Ward No. 73, Murugeshpalya, Bangalore-17') },
                            { FieldName: 'MBP - F3', FieldValue: $sce.trustAsHtml('F3 Palm Phase 1<br/>Manyata Embassy Business Park<br/>Bangalore-17') },
                            { FieldName: '', FieldValue: $sce.trustAsHtml('<br/><br/>') },
                            { FieldName: '', FieldValue: $sce.trustAsHtml('<br/><br/>') },
                            { FieldName: '', FieldValue: $sce.trustAsHtml('<br/><br/>') },
                            { FieldName: '', FieldValue: $sce.trustAsHtml('<br/><br/>') },
                            { FieldName: '', FieldValue: $sce.trustAsHtml('<br/><br/>') }
                            ];

            $scope.TrainingCenters = [
                            ];

            $scope.TransportModesHeader = [];
            $scope.TransportModes = [];

            $scope.TransportModesAvailable = [
                            { FieldName: 'Taxis', FieldValue: 'The following are the prominent cab service providers:' },
                            { FieldName: '', FieldValue: 'Fast Track - 080 2888 9999' },
                            { FieldName: '', FieldValue: 'Easy Cabs - 080 43434343' },
                            { FieldName: '', FieldValue: 'Radio Taxis - 080 2332 0152' },
                            { FieldName: '', FieldValue: 'Meru Cabs - 080 4422 4422' }
                            ];

            $scope.CTransportService = [
              { FieldName: 'Location Type', FieldValue: $sce.trustAsHtml('Metro') },
              { FieldName: 'Transport Radius in KM', FieldValue: $sce.trustAsHtml('35') },
              { FieldName: 'City centre', FieldValue: $sce.trustAsHtml('Central Bus stand (Majestic)') },
              { FieldName: 'Serviceable areas', FieldValue: $sce.trustAsHtml('West – Kengeri Satellite Town. South – Huskur Gate. North – Rajankunte. East – Hoskote. ') },
              { FieldName: 'Non serviceable areas', FieldValue: $sce.trustAsHtml('Bhoothnahalli, Bidadi, Hebbagodi, Talaghattapura, Attibelle, Chandapura, Chunchgatta, Chikka Tirupathy, Arishinkunte') }
              ];

            $scope.TouristHeader = [
            //298015 tourist spots with desc
                            {name: 'Category', addInfo: 'Place Name', desc: 'More Info' }
                            ];

            $scope.TouristSpots = [
                            { name: 'Art', distance: 'Vidhana Soudha', Description: 'Neo Dravidian style imposing structure that houses the state Legislature.  The sprawling building and its surroundings occupy 60 acres. Sri Hanumanthaiya, who was Chief Minister from 1951 to 1956, will be long remembered in the annals of the History of the State for his administration and achievements and building this imposing edifice. He wanted "Vidhana Soudha" to symbolize the legislative sovereignty of the people like the capital in Washington or The House of Commons in London.' },
                            { name: 'Historical Interest', distance: 'Tipu Sultan Palace', Description: 'Built in 1790, as a summer retreat this structure is made mainly of wood. (0pen all days of the week).' },
                            { name: 'Culture', distance: 'Bull Temple', Description: 'Basavangudi . The Bull temple and other temples around the premises are said to be 100 - 400 years old. A massive monolith of a bull image is the highlight, approximately 15 feet tall and 20 feet in width.' },
                            { name: 'Museums', distance: 'The Heritage Center and Aerospace Museum', Description: 'India’s first aerospace museum that offers a glimpse of India’s aeronautical history. Exhibits include life-size models of aircraft, and a flight simulator.' },
                            { name: 'Museums', distance: 'National Gallery of Modern Art, Palace Road', Description: 'It showcases modern Indian art and houses paintings by Raja Ravi Verma, Jamini Roy, Amrita Sher-Gil, Rabindranath Tagore and a large number of Modern and Contemporary artists.' },
                            { name: 'Museums', distance: 'Visvewaraya Industrial and Science Museum', Description: 'It is not a \'museum\' in its classical sense, because it has interactive exhibits unlike stationary models of a museum. It is more of a "Science Centre". This is the only museum in the world other than the Smithsonian Institutions in the US, to have a full scale replica[2] of the 1903 flyer of Wright brothers.' },
                            { name: 'Attractions', distance: 'Lal Bagh', Description: 'A 240 Acre botanical garden is a big attraction in the city. The park has some rare species of plants brought from Persia, Afghanistan and France. The Lal Bagh Rock, one of the oldest rock formations on earth, dating back to 3,000 million years, is another attraction that attracts the crowds' },
                            { name: 'Attractions', distance: 'Bannerghatta National Zoo', Description: '22km south of Bangalore. Butterfly Park, Zoo and Safari are the main attractions. You can find everything from avifauna to panthers in the Bannerghatta National Park . The 25,000 acre park is home to panthers, lions, tigers and a large variety of birds.' },
                            { name: 'Attractions', distance: 'Ulsoor Lake', Description: 'A water body in the City center with boating facility' },
                            { name: 'Attractions', distance: 'Hebbal lake, Bellary Road', Description: 'A large water body north of Bangalore, bird watching.' }
            /*298015
            ,
            { name: 'Cinemas', distance: 'PVR Cinemas', Description: '' },
            { name: 'Cinemas', distance: 'PVR Cinemas', Description: 'Phoenix Mall (91)-8800900009' },
            { name: 'Cinemas', distance: 'PVR Cinemas', Description: 'Forum Mall, Koramangala, +(91)-80-22067885' },
            { name: 'Cinemas', distance: 'Inox', Description: 'Forum Mall, +91 9379196173' },
            { name: 'Cinemas', distance: 'Inox', Description: 'Jaya Nagar +(91)-80-41128888 ' },
            { name: 'Cinemas', distance: 'Inox', Description: 'MG Road 80-41128888 ' },
            { name: 'Cinemas', distance: 'Cinemax Cinemas', Description: 'Doddenekundi. ORR, +80-49192800' }
            */
                            ];

            $scope.OtherTouristSpots = [

                            ];

            $scope.OtherPlaces = [
                            { FieldName: 'Cinemas', FieldValue: '• PVR Cinemas, Malleswaram West (91)-8800900009' },
                            { FieldName: '', FieldValue: '•	PVR Cinemas, Forum Mall, Koramangala, +(91)-80-22067885' },
                            { FieldName: '', FieldValue: '•	PVR Cinemas, Phoenix Mall (91)-8800900009' },
                            { FieldName: '', FieldValue: '•	Inox, Forum Mall, +91 9379196173' },
                            { FieldName: '', FieldValue: '•	Inox, Jaya Nagar +(91)-80-41128888' },
                            { FieldName: '', FieldValue: '•	Inox, MG Road 80-41128888' },
                            { FieldName: '', FieldValue: '•	Cinemax Cinemas, Doddenekundi. ORR, +80-49192800' }
                            ];

            $scope.ImpServices = [
                            { FieldName: 'Accident', FieldValue: '103 ' },
                            { FieldName: 'Children', FieldValue: '1098' },
                            { FieldName: 'Emergency Help [Operation Sanjeevini]', FieldValue: '1062' },
                            { FieldName: 'HIV/AIDS', FieldValue: '1097' },
                            { FieldName: 'Kidney', FieldValue: '25204000' },
                            { FieldName: 'LPG (Gas) Leakage', FieldValue: '23349011' },
                            { FieldName: 'Snake Rescuer', FieldValue: 'Anees Ahmed: 99454-00002 / MK Mukund: 93413-24672' },
                            { FieldName: 'Senior Citizens', FieldValue: '1090' },
                            { FieldName: 'Women', FieldValue: '1099' },
                            { FieldName: 'Police', FieldValue: 'Deputy Commissioner of Police (Traffic); East: 25588566; West: 23592771; ' },
                            { FieldName: 'Police Commissioner', FieldValue: '22260707 / 22256242' },
                            { FieldName: 'Fire ', FieldValue: '101' },
                            { FieldName: '', FieldValue: 'Central Fire Control Room & Ambulance -2942999 / 2251780' },
                            { FieldName: 'Railways', FieldValue: '•	City Railway Station: 22874544' },
                            { FieldName: '', FieldValue: '•	Enquiries: 131' },
                            { FieldName: '', FieldValue: '•	Reservation Enquiries: 132 / 1361' }
                            ];
            $scope.AdditionalSvcTabs = [
                            { Id: 'ai1', Name: 'Hospitals' },
                            { Id: 'ai2', Name: 'Educational Institutes' },
                            { Id: 'ai3', Name: 'Useful links' },
                            ];

            $scope.AdditionalSvcTabsDetails = [
                            { Id: 'ai1', Details: [
                                                { FieldName: 'Hospitals', FieldValue: '• Dr. Venkataramana’s Comprehensive Trauma Consortium: 1062', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Heritage Hospital: 34025466', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Hosmat: 2559 3796 / 2559 3796', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Narayana Hrudayalaya (For heart/cardiac problems) : 7835000-18', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Mallya Hopital: 22277979', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Manipal Hospital: 2526 6977', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Sagar Apollo: 26536700-713', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Fortis Cardiac Line: 22268888(ambulance 105711)', FieldLink: '' },
                                                { FieldName: 'Blood Banks', FieldValue: '• Bangalore Baptist Hospital 23330322 / 23330323', FieldLink: '' },
                                                { FieldName: '', FieldValue: '• Bangalore Children\'s Hospital & Research Centre 28600252 / 28600552', FieldLink: '' },
                                                { FieldName: '', FieldValue: '• Bhagwan Mahaveer Jain Hospital 22207640 / 22207649', FieldLink: '' },
                                                { FieldName: '', FieldValue: '• Bhagwan Mahaveer Jain Hospital 22207640 / 22207649', FieldLink: '' },
                                                { FieldName: '', FieldValue: '• Dr. Shivaji Rao\'s Blood Bank 22224044', FieldLink: '' },
                                                { FieldName: '', FieldValue: '• Karnataka Red Cross Blood Bank ( Voluntary ) 22268435', FieldLink: '' },
                                                { FieldName: '', FieldValue: '• Lions Blood Bank ( Voluntary ) 22266807', FieldLink: '' },
                                                { FieldName: '', FieldValue: '• Jeeva Voluntary Blood Bank & Diagnotic Centre 26500736', FieldLink: '' },
                                                { FieldName: 'Oxygen – For Home and Hospitals', FieldValue: '• Laxmi Service Trust: 26645595' },
                                                { FieldName: '', FieldValue: '• Vanitha Oxygen Service: 23123107', FieldLink: '' },
                                                { FieldName: '', FieldValue: '• Lifeline Medical Service: 25212852', FieldLink: '' },
                                                { FieldName: '', FieldValue: '• Bangalore Medical Gases and Equipments: 25614111', FieldLink: '' }
                                                ]
                            },

                            { Id: 'ai2', Details: [
                                                { FieldName: 'Schools', FieldValue: '•	Bishop Cotton Boys School, St Mark’s Road ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Bishop Cotton Girls School, St Mark’s Road ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Bangalore International School , Kothanur ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	BEL Vidyalaya, Jalahalli Doddabommasandra, ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Bangalore Public School HAL 2nd Stage, Indira Nagar', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	The Delhi Public School at Bangalore South, North and East', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Baldwin Girls School, Richmond Road', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	JSS Public School – Bhanasankari and HBR layout', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Sherwood High Basavanpura, Bannerghatta Road', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Geethanjali Vidhyalaya, Kaggadasapura, CV Raman Nagar', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	BGS International – Bangalore South ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Jain International Residential School, Kanakapura Road', FieldLink: '' },
                                                { FieldName: 'Colleges (Engineering)', FieldValue: '• Indian Institute of Science ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	BMS College of Engineering', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	R.V College of Engineering ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Bangalore Instt of Technology ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	UVCE ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	MS Ramaiah Instt of Technology ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Dayanand Sagar College of Engineering  ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	RNS Instt of Technology ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	BNM Instt of Technology ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	JSS Instt of Tech Education', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	BMS Inss of Tech ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Sir M Visveswaraya Instt of Tech ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	PES Instt of Technology ', FieldLink: '' },
                                                { FieldName: 'College (Arts / Science)', FieldValue: '•	Acharya Pathashala College of Arts & Science, Narasimharaja Colony ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Al-Ameen Arts, Science & Commerce College, Hosur Road ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Baldwin Methodist College, Hosur Road ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Bangalore City College, Ganga Nagar  ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Bhagwan Bhuddha First Grade Arts & Commerce College, Nagarbhavi Main Road ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Garden City College of Science and Management Studies, Virgo Nagar  ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Goutham College of Science, Manjunath Nagar  ', FieldLink: '' },
                                                { FieldName: '', FieldValue: '•	Govt R C College of Commerce, Race course Road  ', FieldLink: '' }
                                                ]
                            },
                            { Id: 'ai3', Details: [
                                                { FieldName: 'Additional Information ', FieldValue: '', FieldLink: $sce.trustAsHtml('• <a href="http://wikitravel.org/en/Bangalore" runat="server" style="color:blue;" target="_blank">http://wikitravel.org/en/Bangalore</a>') }
                                                ]
                            }
                            ];

            $scope.OtherServices = [
                            ];



            $scope.WriteUpInfoHide = $scope.WriteUpInfo.length == 0 ? true : false;
            $scope.ClimateInfoHide = $scope.ClimateInfo.length == 0 ? true : false;
            $scope.SeasonInfoHide = $scope.SeasonInfo.length == 0 ? true : false;
            $scope.AboutCityHide = $scope.WriteUpInfoHide && $scope.ClimateInfoHide && $scope.SeasonInfoHide;
            $scope.AccomodationHide = $scope.AccomodationInfo.length == 0 && $scope.HotelServices.length == 0 ? true : false;
            $scope.LanguageInfoHide = $scope.LanguageInfo.length == 0 ? true : false;
            $scope.SettlingDownHide = $scope.AccomodationHide && $scope.LanguageInfoHide;
            $scope.ByAirHide = $scope.AirTravelInfo.length == 0 && $scope.AirServiceProviders.length == 0 ? true : false;
            $scope.ByTrainHide = $scope.TrainTravelInfo.length == 0 && $scope.TrainServiceProviders.length == 0 ? true : false;
            $scope.ByRoadHide = $scope.RoadTravelInfo.length == 0 && $scope.RoadServiceProviders.length == 0 ? true : false;
            $scope.BySeaHide = $scope.SeaTravelInfo.length == 0 && $scope.SeaServiceProviders.length == 0 ? true : false;
            $scope.ReachingThereHide = $scope.ByAirHide && $scope.ByTrainHide && $scope.ByRoadHide && $scope.BySeaHide;
            $scope.OfficesHide = $scope.Offices.length == 0 ? true : false;
            $scope.TrainingCentersHide = $scope.TrainingCenters.length == 0 ? true : false;
            $scope.CognizantInCityHide = $scope.OfficesHide && $scope.TrainingCentersHide;
            $scope.TransportModesAvailableHide = $scope.TransportModesAvailable.length == 0 ? true : false;
            $scope.TransportModesHeaderHide = $scope.TransportModesHeader.length == 0 ? true : false;
            $scope.TransportModesHide = ($scope.TransportModes.length == 0 ? true : false) && $scope.TransportModesAvailableHide && $scope.TransportModesHeaderHide;
            $scope.CTransportServiceHide = $scope.CTransportService.length == 0 ? true : false;
            $scope.TravelWithinHide = $scope.TransportModesHide && $scope.CTransportServiceHide;
            $scope.TouristPlacesHide = $scope.TouristSpots.length == 0 && $scope.OtherTouristSpots.length == 0 ? true : false;
            $scope.OtherPlacessHide = $scope.OtherPlaces.length == 0 ? true : false;
            $scope.EntertainmentHide = $scope.TouristPlacesHide && $scope.OtherPlacessHide;
            $scope.ImpSvcHide = $scope.ImpServices.length == 0 ? true : false;
            $scope.ImpNosSrvcsHide = $scope.ImpSvcHide;
            $scope.AdditionalInfoHide = $scope.AdditionalSvcTabs.length == 0 ? true : false;
            break;
        //-------------------------------------------------Bengaluru end                                                      
        //-------------------------------------------------default start                                                            
        default:
            $scope.WelcomeMessage = [
                            { FieldName: 'MessagePara1', FieldValue: 'Welcome to Cognizant' },
                            { FieldName: '', FieldValue: 'Hope you will enjoy the work with the culture we have' },
                            { FieldName: '', FieldValue: 'Have a bright future ahead working with us' }
                            ];

            $scope.WriteUpInfo = [
                            { FieldName: 'Information', FieldValue: 'Coimbatore also known as Kovai, is the second largest Metropolitan city and urban agglomeration after Chennai in the Indian state of Tamil Nadu. Coimbatore is the ‘Textile Capital’ of Tamil Nadu.' },
                            { FieldName: '', FieldValue: 'It is one of the fastest growing Tier-II cities in India and a major textile, industrial, commercial, educational, IT, healthcare and manufacturing hub of Tamil Nadu. Other important industries include software services.' },
                            { FieldName: '', FieldValue: 'It is the capital city in the Kongu Nadu region and is often been referred to as the Manchester of South India. The city is located on the banks of the Noyyal river surrounded by the Western Ghats and is administered by the Coimbatore Municipal Corporation. Coimbatore has been ranked 4th among Indian cities in investment climate by CII and ranked 17th among the top global outsourcing cities by Tholons. Coimbatore is the fourth largest metropolis in South India. Coimbatore city is administrative capital of Coimbatore district.' }
                            ];

            $scope.ClimateInfo = [
                            { FieldName: 'Year Temperature', FieldValue: '35 °C' },
                            { FieldName: 'Best time to visit', FieldValue: 'Sep to March' },
                            { FieldName: 'Minimum Temperature', FieldValue: '15 °C' },
                            { FieldName: 'Maximum Temperature', FieldValue: '45 °C' },
                            { FieldName: 'Average Temperature', FieldValue: '30 °C' },
                            { FieldName: 'More Info', FieldValue: 'The temperature in Coimbatore is very moderate all through the year. However, the best time to visit the place is from September to March.' },
                            { FieldName: '', FieldValue: 'Winters (December to February) are not very cold with the minimum temperature rarely touching 15 °c and maximum never crossing 33 °c.' }
                            ];

            $scope.SeasonInfo = [
                            { FieldName: 'Information', FieldValue: 'Summers (March to May) are bit hot touching about 40 °c but the light cool wind flows through the city, makes the season pleasant. Travelers for trade frequently visit during this season.' },
                            { FieldName: '', FieldValue: 'Winters (December to February) are not very cold with the minimum temperature rarely touching 15 °c and maximum never crossing 33 °c. ' },
                            { FieldName: '', FieldValue: 'Monsoons (June to August) are strong here due to the presence of mountain pass. Tourists preferably avoid rainy days.' }

                            ];

            $scope.AccomodationInfo = [
                            { FieldName: 'Information', FieldValue: 'Coimbatore is a place where one can find accommodation facilities suiting everybody’s budget. It is advisable to be careful when seeking the services of brokers, as they are known to take undue advantage of new comers to Coimbatore.' },
                            { FieldName: '', FieldValue: 'It is habitual to pay 5-10 months rent as advance.  Please take the advice of your seniors before fixing accommodation and food' },
                            { FieldName: 'Hotels', FieldValue: '' }
                            ];

            $scope.HotelServices = [
                            { desc: $sce.trustAsHtml('<b style="font-weight:bold; color:#3f3f3f;">The Residency</b><br/>Phone No : +91 42222 41414; Fax No : +91 42222 43838;<br/>Guest Help Line (24 x 7) : +91 97877 77770<br/><a href="http://www.theresidency.com" target="_blank" type="text/html" style="color:blue;">http://www.theresidency.com</a>') }
                            ];


            $scope.LanguageInfo = [
                            { FieldName: 'Local Lingo', FieldValue: 'Tamil and English are the two languages used almost universally in Coimbatore. The rising number of North Indians in the city has also ensured the rising popularity of Hindi among the populace. Even though a good knowledge of English should be enough to go about the city there are a few common words and phrases you may need to interact with people.' }
                            ];

            $scope.AirTravelInfo = [
                            { FieldName: 'Airport distance from center of city', FieldValue: '12 km' },
                            { FieldName: 'Connected Cities', FieldValue: 'Delhi, Mumbai, Bangalore, Chennai, Kozhikode(Calicut)' },
                            { FieldName: 'Connected Countries', FieldValue: 'Sharjah(UAE)' },
                            { FieldName: 'More Info', FieldValue: 'Coimbatore Airport is situated at a distance of 12 km from the heart of the city and is well connected with the key cities of India, such as Delhi, Mumbai, Bangalore, Chennai and Kozhikode (Calicut). An international flight, to Sharjah (UAE), also operates from here. From the airport, you can either hire a taxi or take an auto rickshaw to the main city' }
                            ];

            $scope.AirServiceProviders = [
                            { name: 'Indian Airlines', tel: '+ 91- 422- 2399833./1800 1801 407 (Toll Free)', site: 'http://www.indian-airlines.nic.in' },
                            { name: 'Jet Airways', tel: '+ 91 - 422 - 2243465/70', site: 'http://www.jetairways.com' },
                            { name: 'Kingfisher Airlines', tel: '1800 - 1800 - 101 (Toll Free)', site: 'http://www.flykingfisher.com' }
                            ];

            $scope.TrainTravelInfo = [
                            { FieldName: 'Station distance from center of city', FieldValue: '15 km' },
                            { FieldName: 'Connected Cities', FieldValue: 'Delhi, Mumbai, Bangalore, Chennai, Kozhikode(Calicut)' },
                            { FieldName: 'More Info', FieldValue: 'There are two railway stations in the Coimbatore city, Coimbatore Junction and Coimbatore North Railway Station, of which the latter is the main one. ' },
                            { FieldName: '', FieldValue: 'Many important trains pass through the city, like Trivandrum New Delhi Kerala Express, Trivandrum-Nizamuddin Express, Coimbatore-Nizamuddin Kongu Express (Delhi bound), Kanyakumari-Bangalore Express, Bangalore-Coimbatore Intercity Express (Bangalore bound), Chennai- Coimbatore Cheran Express, Chennai-Coimbatore Kovai Express, Chennai-Coimbatore Intercity Express (Chennai bound) etc. ' }
                            ];

            $scope.TrainServiceProviders = [
                            { name: 'Indian Railways', tel: '+ 91- 422- 2399833./1800 1801 407 (Toll Free)', site: 'http://www.airindia.com' },
                            { name: 'Jet Airways', tel: '+ 91 - 422 - 2243465/70', site: 'http://www.jetairways.com' },
                            { name: 'Kingfisher Airlines', tel: '1800 - 1800 - 101 (Toll Free)', site: 'http://www.flykingfisher.com' }
                            ];

            $scope.RoadTravelInfo = [
                            { FieldName: 'Bus stop distance from center of city', FieldValue: '25 km' },
                            { FieldName: 'More Info', FieldValue: 'Coimbatore is a place that is easily accessible by road. The State Transport Corporation and a lot of private operators operate regular bus services between Coimbatore and all the major cities of Tamil Nadu and also the states of Kerala and Karnataka. If you want to drive down to the city, keep in mind that NH47 is the main highway that connects it with the rest of India.' }
                            ];

            $scope.RoadServiceProviders = [
                            ];

            $scope.SeaTravelInfo = [
                            { FieldName: 'Port distance from center of city', FieldValue: '70 km' },
                            { FieldName: 'More Info', FieldValue: 'Coimbatore is a place that is easily accessible by road. The State Transport Corporation and a lot of private operators operate regular bus services between Coimbatore and all the major cities of Tamil Nadu and also the states of Kerala and Karnataka. If you want to drive down to the city, keep in mind that NH47 is the main highway that connects it with the rest of India.' }
                            ];

            $scope.SeaServiceProviders = [
                            ];

            $scope.Offices = [
                            { FieldName: 'Mountain View Campus', FieldValue: $sce.trustAsHtml('Inside Kumaraguru College, Saravanampatti') },
                            { FieldName: 'Mountain Midst Campus ', FieldValue: $sce.trustAsHtml('(Inside KGISL, Saravanampatti') },
                            { FieldName: 'CCC Campus ', FieldValue: $sce.trustAsHtml('SEZ, Keeranatham Village, Saravanampatti') }
                            ];

            $scope.TrainingCenters = [
                            { FieldName: 'KCT Tech Park', FieldValue: $sce.trustAsHtml('Saravanampatti') },
                            { FieldName: 'How to reach there', FieldValue: $sce.trustAsHtml('Reach Saravanampatti from anywhere and it’s a five minute drive to KCT. Local taxi and auto will be able to help') },
                            { FieldName: 'Some Important Tips', FieldValue: $sce.trustAsHtml('1.	While hiring an auto it is advisable to seek the advice of your host or a local about the approximate charges for the place. It is better to fix a flat rate with the auto rickshaw driver as most autos do not run on meters') },
                            { FieldName: '', FieldValue: $sce.trustAsHtml('2. Be prepared to pay extra during rains') },
                            { FieldName: '', FieldValue: $sce.trustAsHtml('3. Feel free to approach the traffic policeman and police officers close by. They provide accurate information about bus routes, auto fares etc. Besides, auto drivers tend to be reasonable when the police is introduced as an arbitrator') }
                            ];

            $scope.TransportModes = [];
            $scope.TransportModesHeader = [];

            $scope.TransportModesAvailable = [
                            { FieldName: 'By Bus ', FieldValue: '' },
                            { FieldName: 'By personal transport', FieldValue: '' },
                            { FieldName: 'By Auto rickshaw', FieldValue: '' }
                            ];

            $scope.CTransportService = [
              { FieldName: 'Location Type', FieldValue: $sce.trustAsHtml('Tier 2') },
              { FieldName: 'Transport radius in KM', FieldValue: $sce.trustAsHtml('20') },
              { FieldName: 'City centre', FieldValue: $sce.trustAsHtml('Gandhipuram') },
              { FieldName: 'Serviceable areas', FieldValue: $sce.trustAsHtml('Kuniamuthur, Podanur, Sundarapuram, Ondipudur, Chinniampalayam, Kovilpalayam, Perur, Periyanaickenpalayam, Navavoor pirivu . These are the end points in the main approach roads in Coimbatore that are covered for general shift operations with nodal points.Also we have boundary marked covering aforesaid extreme end points as in the map for example, SB Colony, Race course, Ramanathapuram, Peelamedu, Sivanananda colony etc') },
              { FieldName: 'Non serviceable areas', FieldValue: $sce.trustAsHtml('All locations beyond areas Kuniamuthur, Podanur, Sundarapuram, Ondipudur, Chinniampalayam, Kovilpalayam, Perur, Periyanaickenpalayam, Navavoor pirivu . These are the end points in the main approach roads in Coimbatore that are covered for general shift operations with nodal points.Also we have boundary marked covering aforesaid extreme end points as in the map for example, SB Colony, Race course, Ramanathapuram, Peelamedu, Sivanananda colony') },
              { FieldName: 'Cognizant Transport Infra to be leveraged', FieldValue: $sce.trustAsHtml('Optimized transport solutions for Regular transport registered users of IT, IT ES including 24 X 7 and production support are in practice in Coimbatore , hence separate transport for 24x7 & production support is not applicable Home pickup is applicable for Early Bird Shift & Night shift. Home drop is applicable for Afternoon shift and Night shift within the covered area.') }
              ];

            $scope.TouristSpots = [
                            { name: 'Ooty, Tamilnadu ', distance: '72 kms', Description: 'Trekking, Hill Stations, Lakes, Falls, Gardens, Tea Estates, Churches,  Wildlife' },
                            { name: 'Coonoor, Tamilnadu', distance: '54 kms', Description: 'Hill Stations, Falls, Gardens, Golf, Forts' },
                            { name: 'Anaimalai, Tamilnadu', distance: '56 kms', Description: 'Hill Stations, Wildlife, Trekking' },
                            { name: 'Masinagudi, Tamilnadu', distance: '100 kms', Description: 'Hill Station, Scenic' },
                            { name: 'Isha Yoga Centre, Tamilnadu', distance: '30 kms', Description: 'Pilgrim,Meditation' },
                            { name: 'Kodaikanal, Tamilnadu', distance: '180 Kms', Description: 'Hill Stations, Falls, Trekking' },
                            { name: 'Valparai, Tamilnadu', distance: '106 Kms', Description: 'Hill Stations, Falls, Trekking, Tea estates' }
                            ];

            $scope.OtherTouristSpots = [
                            { FieldName: 'Amusement parks', FieldValue: '•	Black Thunder is a Water Theme Park located near Mettupalayam, 40 km north of Coimbatore city. The park is spread over 65 acres and offers over 49 rides. It is located 40 km from Coimbatore on the Ooty main Road, The park is surrounded by natural beauty of the Nilgiris hills' },
                            { FieldName: '', FieldValue: '•	Black Thunder is a Water Theme Park located near Mettupalayam, 40 km north of Coimbatore city. The park is spread over 65 acres and offers over 49 rides. It is located 40 km from Coimbatore on the Ooty main Road, The park is surrounded by natural beauty of the Nilgiris hills' },
                            { FieldName: '', FieldValue: '•	Maharaja Theme Park is a theme park with multiplex situated at Neelampur , Avanashi main Road.' }
                            ];

            $scope.OtherPlaces = [
                            { FieldName: 'Brookefields Mall', FieldValue: 'Krishnasamy Road, RS Puram, Coimbatore, Tamil Nadu 641001. Phone: 0422 254 9696' },
                            { FieldName: 'Fun Republic Mall', FieldValue: 'Peelamedu, Coimbatore, TN 641004. Phone: 0422 451 8414 ' }
                            ];

            $scope.ImpServices = [
                            { FieldName: 'Call Taxi Services', FieldValue: '• Friends Call Taxi	0422 2523030' },
                            { FieldName: '', FieldValue: '•	No.1 Kovai Call Taxi	0422 2474646' },
                            { FieldName: '', FieldValue: '•	Fast Track	0422 2888999' },
                            { FieldName: '', FieldValue: '•	City Call Taxi	0422 2230666' },
                            { FieldName: '', FieldValue: '•	Taxi Taxi	0422 4050607' },
                            { FieldName: 'Hospitals', FieldValue: '• Ashwin Hospital, Alamu nagar, Sathy Road, 0422 2524400' },
                            { FieldName: '', FieldValue: '•	G Kuppuswamy Naidu Memorial Hospital, Papanaickenpalayam, 0422 - 2211000' },
                            { FieldName: '', FieldValue: '•	Ganga Hospital, Ram Nagar, 0422- 2235052' },
                            { FieldName: '', FieldValue: '•	KMCH (Kovai Medical Center and Hospital), Peelamedu, 0422 2627784, 4323800' },
                            { FieldName: '', FieldValue: '•	P S G Hospitals, Peelamedu, 0422 2572121' }
                            ];

            $scope.OtherServices = [
                            { FieldName: 'Blood Banks', FieldValue: '• IMA Voluntary Blood Bank Kochi +91-484-2354886' },
                            { FieldName: '', FieldValue: '•	Blood Bank Voluntary ISBT Kochi +91-484-2361809' },
                            { FieldName: '', FieldValue: '•	Amrita Institute of Medical Sciences and Research Centre(+91-484-2339095)' },
                            { FieldName: 'Electricity Services', FieldValue: '•	Kaloor - +91-48-42341923 ' },
                            { FieldName: '', FieldValue: '•	Vyttila - +91-484-2304785' },
                            { FieldName: '', FieldValue: '• Willingdon Island +91-484-2668164' },
                            { FieldName: '', FieldValue: '•	Fort - +91-484-2217298' },
                            { FieldName: 'Fire Services', FieldValue: '• Port - +91-484-2666555' },
                            { FieldName: '', FieldValue: '•	Naval Base - +91-484-2666851' },
                            { FieldName: '', FieldValue: '•	Club Road - +91-484-2355101' },
                            { FieldName: '', FieldValue: '•	Mattanchery- +91-484-2255554 ' },
                            { FieldName: '', FieldValue: '• Gandhi Nagar - +91-484- 2205550, 101 ' },
                            { FieldName: 'Gas Services', FieldValue: '•	Surya Agencies, Opposite Municipal Bus Stand, Hospital Road, Tripunithura, Kochi-Ernakulam, Kerala.Phone: +91-484-2784895. =' },
                            { FieldName: '', FieldValue: '•	Lakshmi Agencies JJ Centre, Poonithura, Kochi-Ernakulam, Kerala.Phone: +91-484-2302943, 2304223, 2301515.' },
                            { FieldName: '24 Hour Services', FieldValue: '• Accident Care - +91-484- 98460 99900, 98460 07740.' },
                            { FieldName: 'Police', FieldValue: '• Control Room - 100, +91-484- 2371178' },
                            { FieldName: '', FieldValue: '•	Harbour - +91-484-2666005' },
                            { FieldName: '', FieldValue: '•	City Traffic - +91-484-2394218' },
                            { FieldName: '', FieldValue: '• Central - +91-484-2394500' },
                            { FieldName: '', FieldValue: '• Railway - +91-484-2369259' },
                            { FieldName: 'Railways', FieldValue: '• South : 2376430/131,132' },
                            { FieldName: '', FieldValue: '•	North:2395198' },
                            { FieldName: '', FieldValue: '•	Thripunithura : 2777375' },
                            { FieldName: '', FieldValue: '• Reservations: 2375431' },
                            { FieldName: '', FieldValue: '• Cochin Harbour Terminus - +91-484-2666050' },
                            { FieldName: 'Telecommunication', FieldValue: '• Commercial Enquiry (Central) - +91-484-2202297' },
                            { FieldName: '', FieldValue: '•	Commercial Enquiry (Urban) - +91-484-2316050' },
                            { FieldName: '', FieldValue: '• Idea (Escotel): 9847012345' },
                            { FieldName: '', FieldValue: '•	Airtel: 9895012345' },
                            { FieldName: '', FieldValue: '•	Reliance: 0484 3044444' },
                            { FieldName: '', FieldValue: '• CellOne: 2376149' },
                            { FieldName: '', FieldValue: '•	Vodafone: 98460 98460' },
                            { FieldName: 'Tourist Information Centers', FieldValue: '• Sports Lakshwadeep Tourism - +91-484-2668387' },
                            { FieldName: '', FieldValue: '•	India Tourism Office - +91-484-2668352 ' },
                            { FieldName: '', FieldValue: '•	KTDC - Ernakulam - +91-484-2353534' },
                            { FieldName: 'Water Supply', FieldValue: '•	Erunakulam Sub Division - +91-484-2372830 ' },
                            { FieldName: '', FieldValue: '• Control Room (Complaints) - +91-484-2361369l ' },
                            { FieldName: '', FieldValue: '• Drainage - +91-484-2369710' }
                            ];

            $scope.WriteUpInfoHide = $scope.WriteUpInfo.length == 0 ? true : false;
            $scope.ClimateInfoHide = $scope.ClimateInfo.length == 0 ? true : false;
            $scope.SeasonInfoHide = $scope.SeasonInfo.length == 0 ? true : false;
            $scope.AboutCityHide = $scope.WriteUpInfoHide && $scope.ClimateInfoHide && $scope.SeasonInfoHide;
            $scope.AccomodationHide = $scope.AccomodationInfo.length == 0 && $scope.HotelServices.length == 0 ? true : false;
            $scope.LanguageInfoHide = $scope.LanguageInfo.length == 0 ? true : false;
            $scope.SettlingDownHide = $scope.AccomodationHide && $scope.LanguageInfoHide;
            $scope.ByAirHide = $scope.AirTravelInfo.length == 0 && $scope.AirServiceProviders.length == 0 ? true : false;
            $scope.ByTrainHide = $scope.TrainTravelInfo.length == 0 && $scope.TrainServiceProviders.length == 0 ? true : false;
            $scope.ByRoadHide = $scope.RoadTravelInfo.length == 0 && $scope.RoadServiceProviders.length == 0 ? true : false;
            $scope.BySeaHide = $scope.SeaTravelInfo.length == 0 && $scope.SeaServiceProviders.length == 0 ? true : false;
            $scope.ReachingThereHide = $scope.ByAirHide && $scope.ByTrainHide && $scope.ByRoadHide && $scope.BySeaHide;
            $scope.OfficesHide = $scope.Offices.length == 0 ? true : false;
            $scope.TrainingCentersHide = $scope.TrainingCenters.length == 0 ? true : false;
            $scope.CognizantInCityHide = $scope.OfficesHide && $scope.TrainingCentersHide;
            $scope.TransportModesAvailableHide = $scope.TransportModesAvailable.length == 0 ? true : false;
            $scope.TransportModesHeaderHide = $scope.TransportModesHeader.length == 0 ? true : false;
            $scope.TransportModesHide = ($scope.TransportModes.length == 0 ? true : false) && $scope.TransportModesAvailableHide && $scope.TransportModesHeaderHide;
            $scope.CTransportServiceHide = $scope.CTransportService.length == 0 ? true : false;
            $scope.TravelWithinHide = $scope.TransportModesHide && $scope.CTransportServiceHide;
            $scope.TouristPlacesHide = $scope.TouristSpots.length == 0 && $scope.OtherTouristSpots.length == 0 ? true : false;
            $scope.OtherPlacessHide = $scope.OtherPlaces.length == 0 ? true : false;
            $scope.EntertainmentHide = $scope.TouristPlacesHide && $scope.OtherPlacessHide;
            $scope.ImpSvcHide = $scope.ImpServices.length == 0 ? true : false;
            $scope.ImpNosSrvcsHide = $scope.ImpSvcHide;
            $scope.AdditionalInfoHide = $scope.AdditionalSvcTabs.length == 0 ? true : false;

            break;
        //-------------------------------------------------default end                                                            
    }
} ]);