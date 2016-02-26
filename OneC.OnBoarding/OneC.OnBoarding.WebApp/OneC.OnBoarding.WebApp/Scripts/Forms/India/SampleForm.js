var pageXml = "<xml>" +
                    "<FormTitle>Sample Form</FormTitle>" +
                    "<TotalNoOfPages>3</TotalNoOfPages>" +
                    "<PageHtmlSource>AppForm.htm</PageHtmlSource>" +
                    "<PageDetails>" +
                    "<Page><Id>1</Id><RequireSignature>0</RequireSignature><SignatureNote></SignatureNote></Page>" +
                    "<Page><Id>2</Id><RequireSignature>1</RequireSignature><SignatureNote></SignatureNote></Page>" +
                    "<Page><Id>3</Id><RequireSignature>1</RequireSignature><SignatureNote></SignatureNote></Page>" +
                    "</PageDetails>" +
                    "</xml>";

var signatureXML = '<?xml version="1.0"?>' +
                    '<PageSignatureContainer xmlns:xs__i="http://www.w3.org/2001/XMLSchema-instance" xmlns:__xsd="http://www.w3.org/2001/XMLSchema">' +
                    '<TaskId>2</TaskId>' +
                    '<SignatureData>' +
                    '<PageSignature><TaskPageId>2</TaskPageId><SignerName></SignerName><SignatureStatus>0</SignatureStatus><SignTS>0001-01-01T00:00:00</SignTS></PageSignature>' +
                    '<PageSignature><TaskPageId>3</TaskPageId><SignerName>Siva</SignerName><SignatureStatus>1</SignatureStatus><SignTS>2012-01-01T15:20:00</SignTS></PageSignature>' +
                    '</SignatureData>' +
                    '</PageSignatureContainer>';
//Preparing form
$().ready(function () {
    jQXB.initialize();
    jQXB.compatibilitymode = false;

    OBPager.InitializePageSettings(pageXml);
    OBPager.InitializeSignatureSettings(signatureXML);
    OBPager.SetPageContainer('#PageContent');
    OBPager.InitializePage();
});







/* Make this statement in end of script - as data loading and other predata filling works has to be completed */
//Display default page on load
$().ready(function () { OBPager.ShowPage(1); });