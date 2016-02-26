<?xml version="1.0" encoding="utf-8" ?>

<%@ Page Language="C#" AutoEventWireup="true" ContentType="text/xml" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="com.qas.proweb" %>
<proweb>



<!--fix intellisense "__o not declared" bug-->
<%=""%>
<%
    String URL = "http://ctsintbmvpexp:2021/proweb.wsdl";

    // Get search information from post.
    String country = (Request.Params["country"] != null) ? System.Uri.UnescapeDataString(Request.Params["country"]) : string.Empty;
    String action = (Request.Params["action"] != null) ? System.Uri.UnescapeDataString(Request.Params["action"]) : string.Empty;
    String addlayout = (Request.Params["addlayout"] != null) ? System.Uri.UnescapeDataString(Request.Params["addlayout"]) : string.Empty;

    String searchstring = (Request.Params["searchstring"] != null) ? System.Uri.UnescapeDataString(Request.Params["searchstring"]) : string.Empty;

    String moniker = (Request.Params["moniker"] != null) ? System.Uri.UnescapeDataString(Request.Params["moniker"]) : string.Empty;
    String refineText = (Request.Params["refineText"] != null) ? System.Uri.UnescapeDataString(Request.Params["refineText"]) : string.Empty;
	
    try
    {
        // Setup qas engine.
        QuickAddress qAddress = new QuickAddress(URL);
        qAddress.Engine = QuickAddress.EngineTypes.Verification;
        qAddress.Flatten = true;

        // Search for address.
        if (action == "search")
        {
            // Send address to QAS
            SearchResult result = qAddress.Search(country, searchstring, PromptSet.Types.Default, addlayout);

        %>
            <verifylevel><%=result.VerifyLevel.ToString()%></verifylevel>
        <%
            
            //check for verification flags

            List<int> VerifyFlags = new List<int> { };
            VerifyFlags.Add(Convert.ToInt32(result.BldgFirmNameChanged));
            VerifyFlags.Add(Convert.ToInt32(result.CityAliasMatched));
            VerifyFlags.Add(Convert.ToInt32(result.CityNameChanged));
            VerifyFlags.Add(Convert.ToInt32(result.PostCodeCorrected));
            VerifyFlags.Add(Convert.ToInt32(result.PrimaryNumberChanged));
            VerifyFlags.Add(Convert.ToInt32(result.StateProvinceChanged));
            VerifyFlags.Add(Convert.ToInt32(result.StreetCorrected));

            bool changes = VerifyFlags.Any(c => c == 1);

            // For Verified and InteractionRequired addresses get the result.
            

                if ((result.VerifyLevel == SearchResult.VerificationLevels.Verified) || (result.VerifyLevel == SearchResult.VerificationLevels.InteractionRequired))
                {
                
            %>
                <dpvstatus><%=result.Address.DPVStatus.ToString()%></dpvstatus>
                <address>
            <%
                    foreach (AddressLine line in result.Address.AddressLines)
                    {
                %>
                    <line><%=System.Uri.EscapeDataString(line.Line)%></line>
                <%
                    }
            %>
                </address>

            <%
                }
                else
                {
            %>
                <picklist>
                <fullmoniker><%=System.Uri.EscapeDataString(result.Picklist.Moniker)%></fullmoniker>
            <%
                    foreach (PicklistItem item in result.Picklist.Items)
                    {
                %>
                    <picklistitem>
                        <partialtext><%=System.Uri.EscapeDataString(item.PartialAddress)%></partialtext>
                        <addresstext><%=System.Uri.EscapeDataString(item.Text)%></addresstext>
                        <postcode><%=System.Uri.EscapeDataString(item.Postcode)%></postcode>
                        <moniker><%=System.Uri.EscapeDataString(item.Moniker)%></moniker>
                        <fulladdress><%=item.IsFullAddress.ToString()%></fulladdress>
                    </picklistitem>
                <%
                    }
        %>
                </picklist>
        <%
                }
                //if there were any changes, change match type to unmatched
                if (changes == true)
                    {
                        %>
                        <verifylevel>None</verifylevel>
                        <%
                    }
            }
        
        else if (action == "GetFormattedAddress")
        {
            FormattedAddress formatResult = qAddress.GetFormattedAddress(moniker, addlayout);
        %>
            <verifylevel>Verified</verifylevel>
            <dpvstatus><%=formatResult.DPVStatus.ToString()%></dpvstatus>
            <address>
        <%
            foreach (AddressLine line in formatResult.AddressLines)
            {
                %>
                <line><%=System.Uri.EscapeDataString(line.Line)%></line>
                <%
            }
        %>
            </address>
        <%
        }
        else if (action == "refine")
        {
            Picklist pickList = qAddress.Refine(moniker, refineText);

            // Occasionally, the picklist's item will be null. This is to prevent it.
            if (pickList.Items != null)
            {
                if ((pickList.Items.Length == 1) && (pickList.Items[0].IsFullAddress == true))
                {
                    FormattedAddress formatResult = qAddress.GetFormattedAddress(pickList.Items[0].Moniker, addlayout);
                %>
                    <verifylevel>Verified</verifylevel>
                    <dpvstatus><%=formatResult.DPVStatus.ToString()%></dpvstatus>
                    <address>
                <%
                    foreach (AddressLine line in formatResult.AddressLines)
                    {
                    %>
                        <line><%=System.Uri.EscapeDataString(line.Line)%></line>
                    <%
                    }
            %>
                </address>
            <%
                }
                else
                {
                    bool isAllPickListItemFullAddress = true;
                    foreach (PicklistItem item in pickList.Items)
                    {
                        if (!item.IsFullAddress)
                        {
                            isAllPickListItemFullAddress = false;
                            break;
                        }
                    }
                    if (pickList.Items.Length > 1 && isAllPickListItemFullAddress)
                    {
                    %>
                        <verifylevel>Multiple</verifylevel>
                        <picklist>
                        <fullmoniker><%=System.Uri.EscapeDataString(pickList.Moniker)%></fullmoniker>
                    <%
                        foreach (PicklistItem item in pickList.Items)
                        {
                        %>
                            <picklistitem>
                            <partialtext><%=System.Uri.EscapeDataString(item.PartialAddress)%></partialtext>
                            <addresstext><%=System.Uri.EscapeDataString(item.Text)%></addresstext>
                            <postcode><%=System.Uri.EscapeDataString(item.Postcode)%></postcode>
                            <moniker><%=System.Uri.EscapeDataString(item.Moniker)%></moniker>
                            <fulladdress><%=item.IsFullAddress.ToString()%></fulladdress>
                            </picklistitem>
                        <%
                        }
                    %>
                        </picklist>
                    <%
                    }
                    else if (pickList.Items.Length >= 1 && !isAllPickListItemFullAddress)
                    {
                    %>
                        <verifylevel>Undetermined</verifylevel>
                        <picklist>
                        <fullmoniker><%=System.Uri.EscapeDataString(pickList.Moniker)%></fullmoniker>
                    <%
                        foreach (PicklistItem item in pickList.Items)
                        {
                        %>
                            <picklistitem>
                            <partialtext><%=System.Uri.EscapeDataString(item.PartialAddress)%></partialtext>
                            <addresstext><%=System.Uri.EscapeDataString(item.Text)%></addresstext>
                            <postcode><%=System.Uri.EscapeDataString(item.Postcode)%></postcode>
                            <moniker><%=System.Uri.EscapeDataString(item.Moniker)%></moniker>
                            <fulladdress><%=item.IsFullAddress.ToString()%></fulladdress>
                            </picklistitem>
                        <%
                        }
                    %>
                        </picklist>
                    <%
                    }
                }
            }
            else
            {
                %>
                <verifylevel>None</verifylevel>
                <%
            }
        }
    }
    catch (System.Exception ex)
    {
        %>
        <error><![CDATA[<%=System.Uri.EscapeDataString(ex.Message)%>]]></error>
        <%
    }
    %>
</proweb>