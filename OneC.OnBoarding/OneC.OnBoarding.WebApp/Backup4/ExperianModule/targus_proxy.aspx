<%@ Page Language="C#" Debug="true" %>

<%@ Import Namespace="System" %>
<%=""%>
<%
    string username = "";
    string password = "";
    string serviceId = "";
    int transactionId = 0;
    int serviceKeyId = 1;
    string serviceUrl = "http://webapp.targusinfo.com/ws-getdata/query.asmx";

    // Get the parameters from POST.
    string elementId = !string.IsNullOrEmpty(Request.Params["eid"]) ? Uri.EscapeDataString(Request.Params["eid"]) : "0"; // Default to 0 as this is an int.
    string phoneNumber = !string.IsNullOrEmpty(Request.Params["phone"]) ? Uri.EscapeDataString(Request.Params["phone"]) : string.Empty;
    string jsonpCallback = !string.IsNullOrEmpty(Request.Params["jsonpCallback"]) ? Uri.EscapeDataString(Request.Params["jsonpCallback"]) : string.Empty;

    // Set the response content type.
    Response.ContentType = "application/json";
    // Determine whether it is JSONP.
    if (!string.IsNullOrEmpty(jsonpCallback))
    {
        Response.ContentType = "application/javascript";
    }

    try
    {
        // Set the credentials.
        OriginationType credentials = new OriginationType();
        credentials.username = username;
        credentials.password = password;

        // Set the element id.
        int eid = 0;
        int.TryParse(elementId, out eid);
        int[] elements = new int[1] { eid };

        // Set the ServiceKey. Contains the phone number and service key id.
        ServiceKeyType serviceKey = new ServiceKeyType();
        serviceKey.id = serviceKeyId;
        serviceKey.value = phoneNumber;
        ServiceKeyType[] serviceKeys = new ServiceKeyType[1] { serviceKey };

        // Query to Targus service.
        using (Client client = new Client(serviceUrl))
        {
            Targus targus = new Targus(client);
            TargusResponse targusResponse = targus.Query(credentials, serviceId, transactionId, elements, serviceKeys);

            if (targusResponse != null)
            {
                string response = TargusHelper.SerializeToJson(targusResponse, jsonpCallback);
                Response.Write(response);
            }
        };
    }
    catch (InvalidOperationException ex)
    {
        // Return the json/jsonp response.
        TargusResponse response = TargusHelper.CreateErrorResponseObject(elementId, phoneNumber, ex.Message);
        Response.Write(TargusHelper.SerializeToJson(response, jsonpCallback));
    }
    catch (Exception ex)
    {
        TargusResponse response = TargusHelper.CreateErrorResponseObject(elementId, phoneNumber, ex.Message);
        Response.Write(TargusHelper.SerializeToJson(response, jsonpCallback));
    }
%>