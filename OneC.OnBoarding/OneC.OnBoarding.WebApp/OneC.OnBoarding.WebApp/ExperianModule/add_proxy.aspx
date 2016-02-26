<?xml version="1.0" encoding="utf-8" ?>

<%@ Page Language="C#" Debug="true" AutoEventWireup="true" ContentType="text/xml" %>

<%@ Import Namespace="com.qas.additionaldata" %>
<proweb>
<!--fix intellisense "__o not declared" bug-->
<%=""%>

<%
    String proxy = "";
    String proxyUser = "";
    String proxyPassword = "";
    String proxyDomain = "";
    String addUser = "";
    String addPassword = "";

    // Get search information from POST.
    String country = (Request.Params["country"] != null) ? System.Uri.UnescapeDataString(Request.Params["country"]) : string.Empty;
    String action = (Request.Params["action"] != null) ? System.Uri.UnescapeDataString(Request.Params["action"]) : string.Empty;
    String searchstring = (Request.Params["searchstring"] != null) ? System.Uri.UnescapeDataString(Request.Params["searchstring"]) : string.Empty;
    String moniker = (Request.Params["moniker"] != null) ? System.Uri.UnescapeDataString(Request.Params["moniker"]) : string.Empty;
    String refineText = (Request.Params["refineText"] != null) ? System.Uri.UnescapeDataString(Request.Params["refineText"]) : string.Empty;

    try
    {
        ADService searchService = new ADService(proxy, proxyUser, proxyPassword, proxyDomain, addUser, addPassword);

        // Search for address.
        if (action == "search")
        {
            ADSearchResult result = searchService.ADValidate(searchstring, country);

            %>
            <verifylevel><%=result.VerificationLevelText%></verifylevel>
            <%
            if (result.VerificationLevel == (int)ADSearchResult.VerificationLevels.Verified ||
                result.VerificationLevel == (int)ADSearchResult.VerificationLevels.InteractionRequired ||
                result.VerificationLevel == (int)ADSearchResult.VerificationLevels.VerifiedPlace ||
                result.VerificationLevel == (int)ADSearchResult.VerificationLevels.VerifiedStreet)
            {
                %>
                <dpvstatus>DPVNotConfigured</dpvstatus>
                <address>
                <%
                foreach (String line in result.Address.AddressLines)
                {
                    if (line != null)
                    {
                        %><line><%=System.Uri.EscapeDataString(line) %></line><%
                    }
                    else
                    {
                        %><line></line><%
                    }
                }
                %>
                </address>
                <%
            }
            else if (result.Picklist != null)
            {
                %>
                <picklist>
                <fullmoniker><%=System.Uri.EscapeDataString(result.Picklist.fullPicklistMoniker)%></fullmoniker>
                <%
                for (int i = 0; i < result.Picklist.numberOfEntries(); i++)
                {
                    PicklistEntryType item = result.Picklist.getPicklistEntry(i);
                    %>
                    <picklistitem>
                        <partialtext><%=System.Uri.EscapeDataString(item.PartialAddress)%></partialtext>
                        <addresstext><%=System.Uri.EscapeDataString(item.Picklist)%></addresstext>
                        <postcode><%=System.Uri.EscapeDataString(item.Postcode)%></postcode>
                        <moniker><%=System.Uri.EscapeDataString(item.Moniker)%></moniker>
                        <fulladdress><%=item.FullAddress.ToString()%></fulladdress>
                    </picklistitem>
                    <%
                }
                %>
                </picklist>
                <%
            }
        }
        else if (action == "GetFormattedAddress")
        {

            addFormattedAddress formatResult = searchService.GetFormattedAddress(moniker);

            %>
            <verifylevel>Verified</verifylevel>
            <dpvstatus>DPVNotConfigured</dpvstatus>
            <address>
            <%
            foreach (String line in formatResult.AddressLines)
            {
                if (line != null)
                {
                    %><line><%=System.Uri.EscapeDataString(line) %></line><%
                }
                else
                {
                    %><line></line><%
                }
            }
            %>
            </address>
            <%
        }
    }
    catch (Exception ex)
    {
        %><error><![CDATA[<%=System.Uri.EscapeDataString(ex.Message)%>]]></error><%
    }

     %>
</proweb>
