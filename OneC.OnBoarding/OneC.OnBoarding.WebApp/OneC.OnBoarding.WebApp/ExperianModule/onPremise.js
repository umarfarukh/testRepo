/*
* OnDemand.js
*/

/*********************************************************************************************************************************************************************
* Name          : Address
* Description   : Get the addresses from the form.
*
* Public Methods
*   getSearchStrings        - returns an array of strings ready to be sent to qas, a value of false means the address should not be processed.
*   getSearchCountries      - returns an array of countries corresponding to the search strings.
*   getOriginalAddresses    - returns an array of original addresses corresponding to the search strings.
*   storeCleanedAddress     - stores a cleaned address.
*   returnCleanAddresses    - returns cleaned addresses to the webpage.
*********************************************************************************************************************************************************************/
function Address() {
    // Private variables.
    var ids = QAS_Variables.ADDRESS_FIELD_IDS;
    var cIds = QAS_Variables.COUNTRY_FIELD_IDS;
    var addresses = [];
    var uniqueAddresses = [];
    var uniqueTracker = new Array(ids.length);
    var searchStrings = [];
    var searchCountries = [];
    var cleanedAddresses = [];
    var cList = QAS_Variables.DATA_SETS;
    var addCList = QAS_Variables.ADD_DATA_SETS;
    var i, j, cIndex;
    var cityIndex = [];

    /*********************************************************************************************
    * Private methods.
    *********************************************************************************************/
    // Retrieve address values from the forms and returns array.
    // This method is dependent on QAS_Variables (qasConfig.js).
    var getAddresses = function () {
        // Loop through forms.
        for (i = 0; i < ids.length; i++) {
            // Variable to temporarily store an address form.
            var tempAddress = [];

            // Loop through fields in form.
            for (j = 0; j < ids[i].length; j++) {
                var fieldValue = "";
                var $currentField = $('#' + ids[i][j]);

                if (QAS_Variables.IGNORE_RETENTION_ON_CITY && checkKeyExistByValue(QAS_Variables.CITY_FIELD_IDS, $currentField.attr("id"))) {
                    // Check to prevent empty city string prepend with "@"
                    cityIndex.push(j);
                }

                fieldValue = $currentField.val();

                // If this field is undefined and display errors is on, display an error, otherwise this will be handled later.
                if (fieldValue === undefined) {
                    if (QAS_Variables.DISPLAY_ERRORS) {
                        alert("ID '" + ids[i][j] + "' is undefined");
                    }
                } else {
                    // Trim whitespace.
                    fieldValue = fieldValue.replace(/^\s+|\s+$/g, "");
                }

                // Push the value into the temporary variable.
                tempAddress.push(fieldValue);
            }

            // Get the country from the form.
            var c3 = $('#' + cIds[i]).val();

            // If the country is empty or undefined, use the default country.
            if ((c3 === "") || (c3 === undefined)) {
                c3 = QAS_Variables.DEFAULT_DATA;
            }

            // Convert to QAS country codes.
            for (cIndex = 0; cIndex < QAS_Variables.COUNTRY_MAP.length; cIndex++) {
                if (c3.toLowerCase() === QAS_Variables.COUNTRY_MAP[cIndex][0].toString().toLowerCase()) {
                    c3 = QAS_Variables.COUNTRY_MAP[cIndex][1].toString();
                }
            }

            // Push country into the temporary variable.
            tempAddress.push(c3);

            // Push temporary address into array of addresses.
            addresses.push(tempAddress);
        }
    };

    // Check whether the key exist or not by value.
    var checkKeyExistByValue = function (array, value) {
        for (var item in array) {
            if (array.hasOwnProperty(item)) {
                if (array[item] === value) return true;
            }
        }

        return false;
    };

    // Determine which forms contains unique addresses.
    var getUnique = function () {
        var isUnique = true;
        var j = 0;

        // Loop through addresses.
        for (i = 0; i < addresses.length; i++) {
            // Assume address is unique, point uniqueTracker to where address will be added in uniqueAddresses, and set isUnique to true.
            uniqueTracker[i] = uniqueAddresses.length;
            isUnique = true;
            j = 0;

            /*
            Loop through unique addresses until the current address either matches a unique
            address or no more unique addresses are left, in which case the address is unique
            and is added to the unique address list - if this is the first address it will
            be unique by default.
            */
            while (isUnique && (j < uniqueAddresses.length)) {
                if (addresses[i].toString().toLowerCase() === uniqueAddresses[j].toString().toLowerCase()) {
                    isUnique = false;
                    uniqueTracker[i] = j;
                }
                j++;
            }

            if (isUnique) {
                uniqueAddresses.push(addresses[i]);
            }
        }
    };

    // Check if an address should be cleaned.
    var cleanCheck = function (address, country) {
        var addNotEmpty = false;
        var j = 0, k = 0;

        // If an address is empty or has an undefined field, then false will be returned.
        while (j < address.length) {
            if (address[j] !== "") {
                addNotEmpty = true;
            }

            if (address[j] === undefined) {
                return false;
            }
            j++;
        }

        // If the country is not in the list, return false.
        if (addNotEmpty) {
            for (k = 0; k < cList.length; k++) {
                if (country === cList[k]) {
                    return true;
                }
            }

            for (k = 0; k < addCList.length; k++) {
                if (country === addCList[k]) {
                    return true;
                }
            }
        }

        return false;
    };

    // Build the SearchString array from the unique addresses.
    var buildSearchStrings = function () {
        var addresses = prependCharIntoAddresses("@", uniqueAddresses);

        for (i = 0; i < addresses.length; i++) {
            searchCountries.push(addresses[i].pop());

            if (cleanCheck(addresses[i], searchCountries[i])) {
                searchStrings.push(addresses[i].join("|"));
            } else {
                searchStrings.push(false);
            }
        }
    };

    // Prepend alias.
    var prependCharIntoAddresses = function (chr, addresses) {
        var results = $.extend(true, [], addresses);

        for (i = 0; i < results.length; i++) {
            var cityIndex = getIndexForCity(i);
            var tempAdd = results[i];
            if (tempAdd[cityIndex] != "") {
                tempAdd[cityIndex] = chr + tempAdd[cityIndex];
            }
        }

        return results;
    };

    // Get index for city.
    var getIndexForCity = function (val) {
        var index = -1;

        $.each(uniqueTracker, function (i, v) {
            if (val == v) {
                index = i;
                return false;
            }
        });

        return cityIndex[index];
    };

    // Return cleansed address.
    var returnAddresses = function () {
        for (i = 0; i < ids.length; i++) {
            // If edit is clicked, not all addresses will have been validated, only update validated addresses in this case.
            if (cleanedAddresses[uniqueTracker[i]] !== undefined) {
                for (j = 0; j < ids[i].length; j++) {
                    $('#' + ids[i][j]).val(decodeURIComponent(cleanedAddresses[uniqueTracker[i]][j]));
                }
            }
        }
    };

    /*********************************************************************************************
    * Public methods.
    *********************************************************************************************/
    /*********************************************************************************************
    * Method name   : getUniqueTracker
    * Description   : Get the unique tracker.
    *********************************************************************************************/
    this.getUniqueTracker = function () {
        return uniqueTracker;
    };
    /*********************************************************************************************
    * Method name   : getSearchStrings
    * Description   : Get the search strings.
    *********************************************************************************************/
    this.getSearchStrings = function () {
        return searchStrings;
    };

    /*********************************************************************************************
    * Method name   : getSearchCountries
    * Description   : Get the search countries.
    *********************************************************************************************/
    this.getSearchCountries = function () {
        return searchCountries;
    };

    /*********************************************************************************************
    * Method name   : getOriginalAddresses
    * Description   : Get the original addresses. (Only unique addresses is returned.)
    *********************************************************************************************/
    this.getOriginalAddresses = function () {
        return uniqueAddresses;
    };

    /*********************************************************************************************
    * Method name   : storeCleanedAddress
    * Description   : Store cleaned address.
    *********************************************************************************************/
    this.storeCleanedAddress = function (cleanAddress) {
        cleanedAddresses.push(cleanAddress);
    };

    /*********************************************************************************************
    * Method name   : returnCleanAddresses
    * Description   : Return clean addresses.
    *********************************************************************************************/
    this.returnCleanAddresses = function () {
        returnAddresses();
    };

    // Constructor.
    getAddresses();
    getUnique();
    buildSearchStrings();
}; // End of Address class.

/*********************************************************************************************************************************************************************
* Name          : Clean
* Description   : Clean the address.
*
* Parameters
*   searchString    - searchString to clean.
*   country_3       - country of the searchString.
*   ajaxErr         - ajax error function.
*
* Public Properties
*   result      - cleaned result from proweb, either a picklist, or a cleaned address
*   verifylevel - match type from the cleaning process
*   dpv         - dpv information
*   country     - country of cleaned address
*
* Public Methods
*   search                  - main search, to be used to process an address
*   searchPremisesPartial   - reprocesses a premises partial address
*   searchStreetPartial     - reprocesses a street partial address
*   searchDPVPartial        - reprocesses an address that failed dpv
*   formatAddress           - get a formatted address
*   refineAddress           - refine on a picklist
*********************************************************************************************************************************************************************/
function Clean(searchString, country_3, ajaxErr) {
    // Private variables.
    var me = this;
    var m_ajaxErr = ajaxErr;
    var m_ajaxTimeout = QAS_Variables.TIMEOUT;
    var partialAddress = "";
    var m_callback, k;
    var origSearchString = searchString;
    var prevXml = null;

    /*********************************************************************************************
    * Private methods.
    *********************************************************************************************/
    // Choose which proxy to use based on country.
    var chooseProxy = function (country) {
        for (k = 0; k < QAS_Variables.ADD_DATA_SETS.length; k++) {
            if (country === QAS_Variables.ADD_DATA_SETS[k]) {
                return QAS_Variables.ADD_PROXY_PATH;
            }
        }

        return QAS_Variables.PROXY_PATH;
    };

    var proxyToUse = chooseProxy(country_3);

    // Strip postcodes from strings based on country
    // used to strip the postcode out of premises and street
    // partial addresses prior to address being re-submitted.
    var stripPostCode = function (str) {
        switch (me.country) {
            case "AUS":
                str = str.replace(/\d{4}$/, "");
                break;
            case "DEU":
                str = str.replace(/\d{5}-\d{5}$/, "");
                break;
            case "DNK":
                str = str.replace(/\s\d{4}\s/, " ");
                break;
            case "FRA":
                str = str.replace(/\s\d{5}\s/, " ");
                break;
            case "GBR":
                str = str.replace(/\w{1,2}\d{1,2}\w?\s\d\w{2}$/, "");
                break;
            case "LUX":
                str = str.replace(/\s\d{4}\s/, "");
                break;
            case "NLD":
                str = str.replace(/\s\d{4}\s\w{2}\s/, " ");
                break;
            case "NZL":
                str = str.replace(/\d{4}$/, "");
                break;
            case "SGP":
                str = str.replace(/\d{6}$/, "");
                break;
            case "USA":
                str = str.replace(/-\d{4}$/, "");
                break;
        }

        return str;
    };

    // Append each line from the returned xml to result.
    var saveAddress = function () {
        me.result.push($(this).text());
    };

    // Build array of picklist items from the returned xml.
    var savePickList = function () {
        ////try-catch here

        var partialText = $(this).find("partialtext").text();
        var addressText = $(this).find("addresstext").text();
        var postCode = $(this).find("postcode").text();
        var moniker = decodeURIComponent($(this).find("moniker").text());
        var fulladdress = $(this).find("fulladdress").text();

        me.result.push(
            {
                "partialText": partialText,
                "addressText": addressText,
                "postCode": postCode,
                "moniker": moniker,
                "fulladdress": fulladdress
            }
        );
    };

    // Get a partial address within a picklist that is not a full address.
    // This is used to append building or apt info, and research on the resulting address.
    var getPartialAddress = function () {
        var i;

        for (i = 0; i < me.result.length; i++) {
            if (me.result[i].fulladdress.toString().toLowerCase() === "false") {
                return me.result[i].partialText;
            }
        }
        return null;
    };

    var isDiffResult = function (xml) {
        if (!prevXml) return true; // If this is the first search, consider different.

        var $prevMons = $("moniker", prevXml) || [];
        var $currMons = $("moniker", xml) || [];
        var result = true;

        if ($prevMons.length == $currMons.length) {
            $currMons.each(function (i) {
                var $curr = $(this);
                if ($prevMons.filter(
                        function () {
                            return $curr.text() == $(this).text();
                        }).length < 1) {
                    result = true;
                    return false;
                }
                result = false;
            });
        }

        return result;
    }

    // Process result from ajax call.
    var saveResult = function (xml) {
        // Get verifylevel and dpv status.
        if ($(xml).find("verifylevel").text() != "Undetermined") {
            me.verifylevel = $(xml).find("verifylevel").text();
        }
        me.dpv = $(xml).find("dpvstatus").text();
        me.error = decodeURIComponent($(xml).find("error").text());
        me.FullMoniker = decodeURIComponent($(xml).find("fullmoniker").text());

        if (me.error !== "" && QAS_Variables.DISPLAY_ERRORS) {
            m_ajaxErr(xml, me.error, "Error");
            return;
        }
        // If a premisesPartial is searched on and a premisesPartial is returned,
        // keep old result, so as not to retain the incorrectly entered premise info.
        if (isDiffResult(xml)) {
            // Re-initialize this.result.
            me.result = [];
            me.missingsubprem = false;

            // Save each line of the address if result is 'Verified' or 'InteractionRequired'.
            if ((me.verifylevel === "Verified")) {
                $(xml).find("line").each(saveAddress);
                me.missingsubprem = $(xml).find("missingsubprem").text();
                //alert user that the address was verified
                alert("Your address has been verified!");
            } else {
                // alert user that the address was not verified
                alert("Your address cannot be verified. Please use the Modify button to update your address details.");
            }
        }
        prevXml = xml;
        m_callback();
    };

    // Send ajax request to proweb.
    var ajaxCall = function (parameters) {
        // URL Encode request params        
        for (p in parameters) {
            parameters[p] = encodeURIComponent(parameters[p]);
        }

        // your ajax request here
        $.ajax({
            type: "POST",
            url: proxyToUse,
            async: true,
            data: parameters,
            dataType: "xml",
            success: saveResult,
            timeout: m_ajaxTimeout,
            error: m_ajaxErr
        });
    };

    // Build up ajax parameters for verification search, and call ajax search.
    var doSearch = function (address, c3) {
        var ajaxParams = {
            "action": "search",
            "addlayout": QAS_Variables.QAS_LAYOUT,
            "country": c3,
            "searchstring": address
        };

        // Pass in valid err param
        ajaxCall(ajaxParams);
    };

    // Build up ajax parameters for format, and call ajax.
    var doFormat = function (moniker) {
        var ajaxParams = {
            "action": "GetFormattedAddress",
            "addlayout": QAS_Variables.QAS_LAYOUT,
            "moniker": moniker
        };

        // Pass in valid err param.
        ajaxCall(ajaxParams);
    };

    // Build up ajax parameters for refine, and call ajax.
    var doRefine = function (moniker, aptNo) {
        var ajaxParams = {
            "action": "refine",
            "addlayout": QAS_Variables.QAS_LAYOUT,
            "moniker": moniker,
            "refinetext": aptNo
        };

        ajaxCall(ajaxParams);
    };

    var getPicklistMoniker = function (refineVal) {
        var mon = null;
        var rValue = refineVal.toUpperCase();

        if (prevXml && rValue) {
            var $addresses = $("addresstext", prevXml) || [];
            var $mons = $("moniker", prevXml) || [];
            var matchedMonikers = [];
            var alphaRefineValMatches = rValue.match(/[a-zA-Z]+/);
            var numRefineValMatches = rValue.match(/[0-9]+/);
            var alphaRefineVal = alphaRefineValMatches ? alphaRefineValMatches[0].toUpperCase().charCodeAt(0) : null;
            var numericRefineVal = numRefineValMatches ? Number(numRefineValMatches[0]) : null;

            if ($addresses.length != $mons.length)
                throw new Error("Mismatched number of monikers and addresses.");

            $addresses.each(function (i) {
                var decodedAdd = decodeURIComponent($(this).text());
                var numericalMatches = decodedAdd.match(/([0-9]+) \.\.\. ([0-9]+)/g);
                var alphaMatches = decodedAdd.match(/([a-zA-Z]+) \.\.\. ([a-zA-Z]+)/g);
                var hasOddEven = decodedAdd.match(/(\[odd\]|\[even\])/g) || false;
                var isOdd = decodedAdd.match(/\[odd\]/g) || false;

                $(numericalMatches).each(function () {
                    var range = this.split(" ... ");

                    if (!hasOddEven ||
                       ((!isOdd && (numericRefineVal % 2 == 0)) || (isOdd && (numericRefineVal % 2 != 0)))) {
                        if (numericRefineVal >= Number(range[0]) &&
                            numericRefineVal <= Number(range[1])) {
                            matchedMonikers.push($mons.eq(i).text());
                        }
                    }
                });

                $(alphaMatches).each(function () {
                    var range = this.split(" ... ");

                    if (alphaRefineVal >= (range[0]).toUpperCase().charCodeAt(0) &&
                        alphaRefineVal <= (range[1]).toUpperCase().charCodeAt(0)) {
                        matchedMonikers.push($mons.eq(i).text());
                    }
                });

                var strippedAdd = decodedAdd.replace(/([0-9]+) \.\.\. ([0-9]+)/g, "");
                numericalMatches = strippedAdd.match(/\b([0-9]+)\b/g);

                $(numericalMatches).each(function () {
                    if (numericRefineVal == Number(this)) {
                        matchedMonikers.push($mons.eq(i).text());
                    }
                });
            });

            if (matchedMonikers.length == 1) {
                mon = decodeURIComponent(matchedMonikers[0]);
            } else if (matchedMonikers.length > 1) {
                mon = this.moniker || me.FullMoniker;
            }
        }

        return mon;
    }

    /*********************************************************************************************
    * Public.
    *********************************************************************************************/
    // Public variables.
    this.result = [];
    this.verifylevel = "";
    //Fix to allow refinement if there is a range within the Multiple list items   		
    this.canrefine = "";
    this.dpv = "";
    this.error = "";
    this.missingsubprem = false;
    this.moniker = null;
    this.country = country_3;

    /*********************************************************************************************
    * Method name   : search
    * Description   : Search for the address.
    * Parameter
    *   callback    : Function to call after the search is done.
    *********************************************************************************************/
    this.search = function (callback) {
        m_callback = callback;
        doSearch(origSearchString, me.country);
    };

    /*********************************************************************************************
    * Method name   : searchPremisesPartial
    * Description   : Search for the Premise Partial.
    * Parameter
    *   aptNo       : Apartment number.
    *   callback    : Function to call after the search is done.
    *********************************************************************************************/
    this.searchPremisesPartial = function (aptNo, callback) {
        m_callback = callback;

        if (proxyToUse == QAS_Variables.ADD_PROXY_PATH) {
            //strip the +4 from a partial address and append the apt to the end of the first line
            var noPost = stripPostCode(decodeURIComponent(partialAddress));
            var aptAddress = noPost.replace(/,/, " # " + aptNo + ",");

            //process address
            doSearch(aptAddress, me.country);
        }
        else {
            var mon = getPicklistMoniker(aptNo);

            if (mon) {
                doRefine(mon, aptNo);
            } else {
                m_callback();
                alert(QAS_PROMPTS.refineValueInvalidRange);
            }
        }
    };

    /*********************************************************************************************
    * Method name   : searchStreetPartial
    * Description   : Search for the Street Partial address.
    * Parameter
    *   buildingNo  : Building number.
    *   callback    : Function to call after the search is done.
    *********************************************************************************************/
    this.searchStreetPartial = function (buildingNo, callback) {
        m_callback = callback;

        if (proxyToUse == QAS_Variables.ADD_PROXY_PATH) {
            //strip the +4 from a partial address and append the building number to the start of the first line
            var noPost = stripPostCode(decodeURIComponent(partialAddress));
            var buildAddress = buildingNo + " " + noPost;

            //process address
            doSearch(buildAddress, me.country);
        }
        else {
            var mon = getPicklistMoniker(buildingNo);

            if (mon) {
                doRefine(mon, buildingNo);
            } else {
                m_callback();
                alert(QAS_PROMPTS.refineValueInvalidRange);
            }
        }
    };

    /*********************************************************************************************
    * Method name   : searchDPVPartial
    * Description   : Search for the DPV Partial address.
    * Parameter
    *   buildingNo  : Building number.
    *   callback    : Function to call after the search is done.
    *********************************************************************************************/
    this.searchDPVPartial = function (buildingNo, callback) {
        m_callback = callback;

        // Replace old building number with new building number to original address.
        var wholeAddress = me.result.join("|");
        wholeAddress = wholeAddress.replace(/\|?\d+\w*\s/, "|" + buildingNo + " ");

        //process address
        doSearch(wholeAddress, me.country);
    };

    /*********************************************************************************************
    * Method name   : formatAddress
    * Description   : Format the address.
    * Parameter
    *   moniker     : QAS address moniker.
    *   callback    : Function to call after the search is done.
    *********************************************************************************************/
    this.formatAddress = function (moniker, callback) {
        m_callback = callback;

        // Format on the moniker
        doFormat(moniker);
    };

    /*********************************************************************************************
    * Method name   : refineAddress
    * Description   : Refine the address.
    * Parameter
    *   moniker     : QAS address moniker.
    *   callback    : Function to call after the search is done.
    *********************************************************************************************/
    this.refineAddress = function (moniker, callback) {
        m_callback = callback;

        // For Address Doctor, call the doformat as no refine available for AD
        if (proxyToUse == QAS_Variables.ADD_PROXY_PATH) {
            // Format on the moniker
            doFormat(moniker);
        }
        else {
            // Refine on the moniker
            doRefine(moniker, "");
        }
    };
}; // End of Clean class.

/*********************************************************************************************************************************************************************
* Name          : Business
* Description   : Business logic class. The public methods of this class are used to process a cleaned address, prompt for interaction if necessary,
*                 handle interaction, and pass address back to main.
*
* Parameters
*   callback    - Callback function to call after completing the interaction.
*   clean       - Clean class with the cleaned address.
*   orig        - Original address.
*   interface   - Interface class.
*
* Public Properties
*   result      - cleaned result from proweb, either a picklist, or a cleaned address
*   verifylevel - match type from the cleaning process
*   dpv         - dpv information
*   country     - country of cleaned address
*
* Public Methods
*   search                  - main search, to be used to process an address
*   searchPremisesPartial   - reprocesses a premises partial address
*   searchStreetPartial     - reprocesses a street partial address
*   searchDPVPartial        - reprocesses an address that failed dpv
*   formatAddress           - get a formatted address
*   refineAddress           - refine on a picklist
*********************************************************************************************************************************************************************/
function Business(callback, clean, orig, inter) {
    // Private variables.
    var me = this;
    var m_callback = callback;
    var m_clean = clean;
    var m_orig = orig;
    var m_inter = inter;
    var count = 0;

    // Used for double street partials and double premise partials.
    var previousMatch = "";

    /*********************************************************************************************
    * Private methods.
    *********************************************************************************************/
    var aptCheck = function (lvrLine) {
        var isApt = "";

        // Check if address should have apt.
        isApt = m_clean.result[lvrLine];

        // If address should have apt, check if it already does have an apt.
        if (isApt) {
            // Search on wholeaddress as address line 1 is unknown.
            var wholeAddress = m_clean.result.join("|");
            if (wholeAddress.search(/\|?\d+\s*-\s*\d+/) !== -1) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };

    /*********************************************************************************************
    * Public.
    *********************************************************************************************/
    /*********************************************************************************************
    * Method name   : noInteraction
    * Description   : Handle addresses with no end-user interaction.
    *********************************************************************************************/
    this.noInteraction = function () {
        if ((m_clean.verifylevel === "Verified") || (me.verifylevel === "VerifiedStreet") || (me.verifylevel === "VerifiedPlace") || (m_clean.verifylevel === "InteractionRequired")) {
            m_callback();
        } else {
            me.useOriginal();
        }
    };

    /*********************************************************************************************
    * Method name   : processResult
    * Description   : Process results.
    *********************************************************************************************/
    this.processResult = function () {
        count++;

        // Handle address based on verifylevel.
        switch (m_clean.verifylevel) {
            case "Verified":
            case "VerifiedStreet":
                // If address is USA, then check DPV status.
                if (m_clean.country === "USA") {
                    if (clean.dpv === "DPVNotConfirmed") {
                        m_inter.setInterReq(m_clean.result, m_orig, QAS_PROMPTS.DPVNotConfirmed, me.acceptInter, me.useOriginal);
                        m_inter.display();
                    } else if (clean.dpv === "DPVConfirmedMissingSec") {
                        // If dpv is missing secondary, treat address as an Interaction Required.
                        m_inter.setInterReq(m_clean.result, m_orig, QAS_PROMPTS.InteractionRequired, me.acceptInter, me.useOriginal);
                        m_inter.display();
                    } else {
                        // Otherwise, dpv was passed or not set. Accept the address.
                        m_callback();
                    }
//                }
//                // If address is Canadian, check to see if there should be an apartment.
//                else if (m_clean.country === "CAN") {
//                    // If there should be an apt and the address currently doesn't have one, prompt for an apt.
//                    if (!aptCheck(QAS_Variables.LVR - 1)) {
//                        m_inter.setAptAppend(m_orig, QAS_PROMPTS.AptAppend, me.appendApt, m_callback, me.useOriginal);
//                        m_inter.display();
//                    } else {
//                        // Otherwise, apartment was already entered, or address doesn't need an apt.
//                        m_callback();
//                    }
                } else {
                    // All other countries, accept verified address.
                    m_callback();
                } break;
            case "VerifiedPlace":
            case "InteractionRequired":
                break;
            case "PremisesPartial":
                break;
            case "StreetPartial":
                break;
            case "Multiple":
                break;
            case "None":
                break;
        }
    };

    /*********************************************************************************************
    * Method name   : acceptInter
    * Description   : Accept interaction address.
    *********************************************************************************************/
    this.acceptInter = function () {
        m_callback();
    };

    /*********************************************************************************************
    * Method name   : acceptMoniker
    * Description   : Get formatted address associated with moniker and accept it.
    *********************************************************************************************/
    this.acceptMoniker = function (moniker) {
        m_clean.formatAddress(moniker, m_callback);
    };

    /*********************************************************************************************
    * Method name   : refineApt
    * Description   : Clean a "PremisesPartial" address and process it.
    *********************************************************************************************/
    this.refineApt = function () {
        var aptNo = $('#QAS_RefineText').val();
        m_clean.searchPremisesPartial(aptNo, me.processResult);
    };

    /*********************************************************************************************
    * Method name   : refineBuild
    * Description   : Clean a "StreetPartial" address and process it.
    *********************************************************************************************/
    this.refineBuild = function () {
        var buildNo = $('#QAS_RefineText').val();
        m_clean.searchStreetPartial(buildNo, me.processResult);
    };

    /*********************************************************************************************
    * Method name   : refineDPV
    * Description   : Clean an address that failed dpv and process it.
    *********************************************************************************************/
    this.refineDPV = function () {
        var buildNo = $('#QAS_RefineText').val();
        m_clean.searchDPVPartial(buildNo, me.processResult);
    };

    /*********************************************************************************************
    * Method name   : appendApt
    * Description   : Append apt to address and accept it.
    *********************************************************************************************/
    this.appendApt = function () {
        var aptNo = $('#QAS_RefineText').val();
        var aptIndex = 0;
        var aptLine = false;

        // Find address line one and add apt to it.
        while ((!aptLine) && (aptIndex < m_clean.result.length)) {
            if (decodeURIComponent(m_clean.result[aptIndex]).search(/^\d+\s/) !== -1) {
                aptLine = true;
                m_clean.result[aptIndex] = aptNo + "-" + m_clean.result[aptIndex];
            }
            aptIndex++;
        }
        m_callback();
    };

    /*********************************************************************************************
    * Method name   : refineMult
    * Description   : Refine on multiple address and process the result.
    *********************************************************************************************/
    this.refineMult = function (moniker) {
        m_clean.refineAddress(moniker, me.processResult);
    };

    /*********************************************************************************************
    * Method name   : useOriginal
    * Description   : Accept orignally entered address.
    *********************************************************************************************/
    this.useOriginal = function () {
        m_clean.result = m_orig;
        m_callback();
    };
}; // End of Business class.

/********************************************************************************************************************************************************************
* Name          : Interface
* Description   : Display dialog to user.
*
* Parameters
*   editCall                - Callback function for "Edit" button.
*   dataOverrideCallback    - Callback function for "AcceptOriginal" button.
*   formPosition            - Position of the address in the form.
*
* Public Methods
*   waitOpen        - Open waiting dialog.
*   waitClose       - Close waiting dialog.
*   display		    - Display interaction dialog.
*   setInterReq     - Set dialog to handle the required address.
*   setPartial	    - Set dialog to handle the "PremisePartial" and "StreetPartial" addresses.
*   setDPVPartial   - Set dialog to handle the addresses that failed the DPV.
*   setAptAppend	- Set dialog to handle the addresses missing apartment information.
*   setMultiple	    - Set dialog to handle multiple addresses.
*   setNone 	    - Set dialog to handle addresses with "None" verify level.
*********************************************************************************************************************************************************************/
function Interface(editCall, dataOverrideCallback, formPosition) {
    /*********************************************************************************************
    * Private.
    *********************************************************************************************/
    // Private variables.
    var m_editCall = editCall;
    var m_pickList;
    var m_orig;
    var m_message;
    var m_pickHtml = "";
    var m_formPosition = formPosition;

    // Check whether "dataOverrideCallback" is valid or not.
    var checkDataOverrideCallback = function () {
        if (typeof dataOverrideCallback == "undefined") {
            return function () { return false; };
        }

        if (typeof dataOverrideCallback != "function") {
            throw new Error("dataOverrideCallback is not a function.");
        }

        return dataOverrideCallback;
    };
    var m_dataOverrideCallback = checkDataOverrideCallback();

    // Create a picklist.
    var buildPick = function () {
        var i;
        // Reinitialize.
        m_pickHtml = "";

        for (i = 0; i < m_pickList.length; i++) {
            if (m_pickList[i].fulladdress.toString().toLowerCase() === "true") {
                m_pickHtml += "<tr><td NOWRAP><a href='#' class='QAS_StepIn' moniker='" + m_pickList[i].moniker + "'>" + decodeURIComponent(m_pickList[i].addressText) + "</a></td><td NOWRAP><a href='#' class='QAS_StepIn' moniker='" + m_pickList[i].moniker + "'>" + decodeURIComponent(m_pickList[i].postCode) + "</a></td></tr>";
            } else {
                m_pickHtml += "<tr><td NOWRAP>" + decodeURIComponent(m_pickList[i].addressText) + "</td><td NOWRAP>" + decodeURIComponent(m_pickList[i].postCode) + "</td></tr>";
            }
        }
    };

    // Create a picklist for multiple address, all items must be clickable.
    var buildMultPick = function () {
        var i;
        // Reinitialize.
        m_pickHtml = "";

        for (i = 0; i < m_pickList.length; i++) {
            if (m_pickList[i].fulladdress.toString().toLowerCase() === "true") {
                m_pickHtml += "<tr><td NOWRAP><a href='#' class='QAS_StepIn' moniker='" + m_pickList[i].moniker + "'>" + decodeURIComponent(m_pickList[i].addressText) + "</a></td><td NOWRAP><a href='#' class='QAS_StepIn' moniker='" + m_pickList[i].moniker + "'>" + decodeURIComponent(m_pickList[i].postCode) + "</a></td></tr>";
            } else {
                m_pickHtml += "<tr><td NOWRAP><a href='#' class='QAS_Refine' moniker='" + m_pickList[i].moniker + "'>" + decodeURIComponent(m_pickList[i].addressText) + "</a></td><td NOWRAP><a href='#' class='QAS_Refine' moniker='" + m_pickList[i].moniker + "'>" + decodeURIComponent(m_pickList[i].postCode) + "</a></td></tr>";
            }
        }
    };

    // Build display of original address and button to click.
    var buildRightSide = function (callback) {
        var origHtml = "";
        var i;

        for (i = 0; i < m_orig.length; i++) {
            origHtml += "<tr><td>" + decodeURIComponent(m_orig[i]) + "</td></tr>";
        }

        $(".QAS_RightDetails").html(
            "<div class='QAS_RightSidePrompt'>" +
                "<div class='QAS_RightSidePromptText'>" +
                  QAS_PROMPTS.RightSide.prompt +
                "<span class='QAS_EditLink'>[<a href='#' id='QAS_Edit'>" + QAS_PROMPTS.RightSide.edit + "</a>]</span>" +
                "</div>" +
                "<table>" +
                origHtml +
                "</table>" +
                "<div class='QAS_DeliverableWarning'>" +
                QAS_PROMPTS.RightSide.warning +
                "</div>"
        );

        $('#QAS_AcceptOriginal').button();

        // Assign onclick for accepting original address.
        $('#QAS_AcceptOriginal').click(
            function () {
                $('#QAS_Dialog').dialog('close');
                m_dataOverrideCallback(m_formPosition);
                callback();
            }
        );

        // Assign onclick for edit button.
        $('#QAS_Edit').click(
            function () {
                $('#QAS_Dialog').dialog('close');
                m_editCall();
            }
        );
    };

    // Load div tags to page and set modal dialogs.
    var load = function () {
        // Remove the dialog if it already exists.
        $("#QAS_Dialog").remove();
        $("#QAS_Wait").remove();

        // Add div tag to page.
        $(document.body).append(
            "<div id='QAS_Dialog' title='" + QAS_PROMPTS.title + "'>" +
                "  <div class='QAS_Header ui-state-highlight'></div>" +
                "  <div class='QAS_Prompt'>" +
                "    <div class='QAS_PromptText'></div>" +
                "    <div class='QAS_Input'></div>" +
                "    <div class='QAS_PromptData'></div>" +
                "  </div>" +
                "  <div class='QAS_RightDetails'></div>" +
                "  <div class='QAS_Picklist'>" +
                "    <div class='QAS_MultPick'></div>" +
                "    <div class='QAS_ShowPick'></div>" +
                "    <div class='QAS_Pick'></div>" +
                "  </div>" +
                "</div>" +
                "<div id='QAS_Wait' title = '" + QAS_PROMPTS.waitMessage + "'></div>"
        );

        // Add jqueryui modal dialog to div tag, for user interaction.
        $("#QAS_Dialog").dialog({
            modal: true,
            // height: 450,  ////causes issues with IE
            width: 850,
            autoOpen: false,
            closeOnEscape: false,
            resizable: false,
            draggable: false
        });

        // Add jqueryui modal dialog to div tag, for waiting dialog.
        $("#QAS_Wait").dialog({
            modal: true,
            height: 100,
            width: 200,
            autoOpen: false,
            closeOnEscape: false,
            resizable: false,
            draggable: false
        });

        // Add slide toggle to show pick list.
        $(".QAS_ShowPick").click(function () {
            $(".QAS_Pick").slideToggle("slow");
        });

        // Re-center popup when window is resized.
        $(window).resize(function () {
            $("#QAS_Dialog").dialog("option", "position", 'center');
        });
    };

    /*********************************************************************************************
    * Public.
    *********************************************************************************************/
    /*********************************************************************************************
    * Method Name   : waitOpen
    * Description   : Open waiting dialog.
    *********************************************************************************************/
    this.waitOpen = function () {
        $('#QAS_Wait').dialog('open');
        // Remove close button from top right of dialog.
        $('.ui-dialog-titlebar-close').css('display', 'none');
        $(".ui-dialog-content").hide();
    };

    /*********************************************************************************************
    * Method Name   : waitClose
    * Description   : Close waiting dialog.
    *********************************************************************************************/
    this.waitClose = function () {
        $('#QAS_Wait').dialog('close');
    };

    /*********************************************************************************************
    * Method Name   : waitClose
    * Description   : Display interaction dialog.
    *********************************************************************************************/
    this.display = function () {
        window.scroll(0, 0);

        $('#QAS_Dialog').dialog('open');

        // Remove close button from top right of dialog
        $('.ui-dialog-titlebar-close').css('display', 'none');

        // Remove the default focus from interaction required button(so that it is not highlighted as if mouse is hovering on it)
        $('#QAS_RefineBtn').blur();
        $('.QAS_Header').focus();
    };

    /*********************************************************************************************
    * Method Name   : setInterReq
    * Description   : Set dialog to handle the required address.
    *
    * Parameters
    *   cleaned         - Cleaned address.
    *   orig            - Original address.
    *   message         - Messages to display.
    *   acceptCallback  - Callback function when "Refine" button is clicked.
    *   origCallback    - Callback function when "AcceptOriginal" button is clicked.
    *                     (inside buildRightSide function).
    *********************************************************************************************/
    this.setInterReq = function (cleaned, orig, message, acceptCallback, origCallback) {
        m_orig = orig;
        m_message = message;

        var cleanedHtml = "", i;

        // Build right side of dialog.
        buildRightSide(origCallback);

        // Build cleansed address to show to end-user.
        for (i = 0; i < QAS_Variables.DISPLAY_LINES; i++) {
            cleanedHtml += "<tr><td>" + decodeURIComponent(cleaned[i]) + "</td></tr>";
        }

        // Display proper messages.
        $(".QAS_Header").html(message.header);
        $(".QAS_PromptText").html(message.prompt);
        $(".QAS_PromptData").html(
            "<br /><br />" +
                "<table>" +
                    cleanedHtml +
                "</table>"
        );
        $(".QAS_Input").html("<input type='button' id='QAS_RefineBtn' value='" + message.button + "' />");
        $(".QAS_MultPick").html("");
        $(".QAS_ShowPick").html("");
        $(".QAS_Pick").html("");

        // Hide multipick list.
        $(".QAS_MultPick").hide();

        // Add jqueryui button.
        $('#QAS_RefineBtn').button();

        // Add onclick event to the button.
        $('#QAS_RefineBtn').click(
            function () {
                $('#QAS_Dialog').dialog('close');
                acceptCallback();
            }
        );
    };

    /*********************************************************************************************
    * Method Name   : setPartial
    * Description   : Set dialog to handle the "PremisePartial" and "StreetPartial" addresses.
    *
    * Parameters
    *   pickList        - Picklist of the searched address.
    *   orig            - Original address.
    *   message         - Messages to display.
    *   refineCallback  - Callback function when "Refine" button is clicked.
    *   monikerCallback - Callback function when "Picklist" is selected.
    *   origCallback    - Callback function when "AcceptOriginal" button is clicked.
    *                     (inside buildRightSide function).
    *********************************************************************************************/
    this.setPartial = function (pickList, orig, message, refineCallback, monikerCallback, origCallback) {
        m_pickList = pickList;
        m_orig = orig;
        m_message = message;

        // Build picklist to display and right side of dialog.
        buildPick();
        buildRightSide(origCallback);

        // Display proper messages and picklist.
        $(".QAS_Header").html(message.header);
        $(".QAS_PromptText").html(message.prompt);
        $(".QAS_PromptData").html("");
        $(".QAS_Input").html(
            "<input type='text' id='QAS_RefineText' />" +
                "<input type='button' id='QAS_RefineBtn' value='" + message.button + "' />"
        );
        $(".QAS_MultPick").html("");
        $(".QAS_ShowPick").html("<a href='#'>" + message.showPicklist + "</a>");
        $(".QAS_Pick").html(
            "<table>" +
                m_pickHtml +
                "</table>"
        );

        $(".QAS_MultPick").hide();

        // Add jqueryui button.
        $('#QAS_RefineBtn').button();

        // Add onclick event to the button.
        $('#QAS_RefineBtn').click(
            function () {
                if ($('#QAS_RefineText').val() === "") {
                    // If no value was entered in field, display error message.
                    alert("No value entered");
                } else {
                    $('#QAS_Dialog').dialog('close');
                    refineCallback();
                }
            }
        );

        // Add onclick event to any full addresses in the picklist.
        $('.QAS_StepIn').click(
            function () {
                $('#QAS_Dialog').dialog('close');
                var mon = $(this).attr('moniker');
                monikerCallback(mon);
            }
        );
    };

    /*********************************************************************************************
    * Method Name   : setDPVPartial
    * Description   : Set dialog to handle the addresses that failed the DPV.
    *
    * Parameters
    *   orig            - Original address.
    *   message         - Messages to display.
    *   refineCallback  - Callback function when "Refine" button is clicked.
    *   origCallback    - Callback function when "AcceptOriginal" button is clicked.
    *                     (inside buildRightSide function).
    *********************************************************************************************/
    this.setDPVPartial = function (orig, message, refineCallback, origCallback) {
        m_orig = orig;
        m_message = message;

        // Build right side of dialog.
        buildRightSide(origCallback);

        // Display proper messages.
        $(".QAS_Header").html(message.header);
        $(".QAS_PromptText").html(message.prompt);
        $(".QAS_PromptData").html("");
        $(".QAS_Input").html(
            "<input type='text' id='QAS_RefineText' />" +
                "<input type='button' id='QAS_RefineBtn' value='" + message.button + "' />"
        );
        $(".QAS_MultPick").html("");

        $(".QAS_MultPick").hide();

        // Add jqueryui button.
        $('#QAS_RefineBtn').button();

        // Add onclick event to the button.
        $('#QAS_RefineBtn').click(
            function () {
                if ($('#QAS_RefineText').val() === "") {
                    // If no value was entered in field, display error message.
                    alert("No value entered");
                } else {
                    $('#QAS_Dialog').dialog('close');
                    refineCallback();
                }
            }
        );
    };

    /*********************************************************************************************
    * Method Name   : setAptAppend
    * Description   : Set dialog to handle the addresses missing apartment information.
    *
    * Parameters
    *   orig            - Original address.
    *   message         - Messages to display.
    *   refineCallback  - Callback function when "Refine" button is clicked.
    *   noAptCallback   - Callback function when "NoApt" button is clicked.
    *   origCallback    - Callback function when "AcceptOriginal" button is clicked.
    *                     (inside buildRightSide function).
    *********************************************************************************************/
    this.setAptAppend = function (orig, message, refineCallback, noAptCallback, origCallback) {
        m_orig = orig;
        m_message = message;

        // Build right side of dialog.
        buildRightSide(origCallback);

        // Display proper messages.
        $(".QAS_Header").html(message.header);
        $(".QAS_PromptText").html(message.prompt);
        $(".QAS_PromptData").html("");
        $(".QAS_Input").html(
            "<input type='text' id='QAS_RefineText' />" +
                "<input type='button' id='QAS_RefineBtn' value='" + message.button + "' />" +
                "<br />" +
                "<input type='button' id='QAS_NoApt' value='" + message.noApt + "' />"
        );
        $(".QAS_MultPick").html("");

        $(".QAS_MultPick").hide();

        // Add jqueryui button.
        $('#QAS_RefineBtn').button();
        $('#QAS_NoApt').button();

        // Add onclick event to the button.
        $('#QAS_RefineBtn').click(
            function () {
                if ($('#QAS_RefineText').val() === "") {
                    // If no value was entered in field, display error message.
                    alert("No value entered");
                } else {
                    $('#QAS_Dialog').dialog('close');
                    refineCallback();
                }
            }
        );

        // Add onclick event to button, in order to accept cleaned address as is, with no apt.
        $('#QAS_NoApt').click(
            function () {
                $('#QAS_Dialog').dialog('close');
                noAptCallback();
            }
        );
    };

    /*********************************************************************************************
    * Method Name   : setMultiple
    * Description   : Set dialog to handle multiple addresses.
    *
    * Parameters
    *   pickList        - Picklist of the searched address.
    *   orig            - Original address.
    *   message         - Messages to display.
    *   formatCallback  - Callback function when "StepIn" button is clicked.
    *   refineCallback  - Callback function when "Refine" button is clicked.
    *   origCallback    - Callback function when "AcceptOriginal" button is clicked.
    *                     (inside buildRightSide function).
    *********************************************************************************************/
    this.setMultiple = function (pickList, orig, message, formatCallback, refineCallback, origCallback) {
        m_pickList = pickList;
        m_orig = orig;
        m_message = message;

        // Build picklist to display and right side of dialog.
        buildMultPick();
        buildRightSide(origCallback);

        // Display proper messages and picklist.
        $(".QAS_Header").html(message.header);
        $(".QAS_PromptText").html(message.prompt);
        $(".QAS_PromptData").html("");
        $(".QAS_Input").html("");
        $(".QAS_MultPick").html(
            "<table>" +
                m_pickHtml +
                "</table>"
        );
        $(".QAS_ShowPick").html("");
        $(".QAS_Pick").html("");

        $(".QAS_MultPick").show();

        // Step into any full address.
        $('.QAS_StepIn').click(
            function () {
                $('#QAS_Dialog').dialog('close');
                var mon = $(this).attr('moniker');
                refineCallback(mon);
            }
        );

        // Refine on non-full address.
        $('.QAS_Refine').click(
            function () {
                $('#QAS_Dialog').dialog('close');
                var mon = $(this).attr('moniker');
                refineCallback(mon);
            }
        );
    };

    /*********************************************************************************************
    * Method Name   : setNone
    * Description   : Set dialog to handle addresses with "None" verify level.
    *
    * Parameters
    *   orig            - Original address.
    *   message         - Messages to display.
    *   origCallback    - Callback function when "AcceptOriginal" button is clicked.
    *                     (inside buildRightSide function).
    *********************************************************************************************/
    this.setNone = function (orig, message, origCallback) {
        m_orig = orig;
        m_message = message;

        buildRightSide(origCallback);

        $(".QAS_Header").html(message.header);
        $(".QAS_Prompt").remove();
        $(".QAS_Input").remove();
        $(".QAS_MultPick").html("");
        $(".QAS_ShowPick").remove();
        $(".QAS_Pick").remove();
        $('.QAS_RightDetails').css('float', 'left');

        $(".QAS_MultPick").hide();
    };

    // Constructor
    load();
}; // End of Interface class.

/********************************************************************************************************************************************************************
* Name          : Main
* Description   : Class to call for address verification.
*
* Public Methods
*   process     - instantiate Interface and Clean, perform clean and sent result to Business.
*   next        - store cleaned address, move on to next address.
*   finish      - put cleaned addresses in form, submit form.
*   ajaxError   - handle any errors during the ajax call to proweb.
*********************************************************************************************************************************************************************/
function Main(clickEvent, buttonID) {
    // Private Variables
    var me = this;
    var m_click = clickEvent;
    var m_button = buttonID;
    var inter, clean;

    // Get the address from the forms.
    var add = new Address();
    var strings = add.getSearchStrings();
    var countries = add.getSearchCountries();
    var orig = add.getOriginalAddresses();
    var uniqueTracker = add.getUniqueTracker();

    // Keep track of address to be processed (the 'next' method controls this).
    var procIndex = 0;

    /*********************************************************************************************
    * Public.
    *********************************************************************************************/
    // Gets or sets the dataOverride function.
    this.dataOverrideCallback;
    this.timeoutCallback;

    /*********************************************************************************************
    * Method Name   : process
    * Description   : Process an address - Part 1.
    *********************************************************************************************/
    this.process = function () {
        var formPosition = getKeysByValue(uniqueTracker, procIndex);

        // Instantiate Interface to handle all user interaction.
        inter = new Interface(me.returnEarly, me.dataOverrideCallback, formPosition);

        // Instantiate Clean, to process address.
        clean = new Clean(strings[procIndex], countries[procIndex], me.ajaxError);

        // If string isn't false process it (false string means it is either an empty address or the country isn't specified in DATA_SETS).
        if (strings[procIndex]) {
            // Open the waiting widget, clean address, close waiting widget.
            inter.waitOpen();
            clean.search(me.process2);
        } else {
            // If string is false use original address.
            clean.result = orig[procIndex];
            me.next();
        }
    };

    /*********************************************************************************************
    * Method Name   : process2
    * Description   : Process an address - Part 2 (after callback from ajax call).
    *********************************************************************************************/
    this.process2 = function () {
        inter.waitClose();

        // Instantiate a new Business object and process the cleaned result.
        var business = new Business(me.next, clean, orig[procIndex], inter);

        // Call appropriate business function to process address depending on whether end-user interaction is allowed.
        if (!QAS_Variables.ADDRESS_USEDIALOG) {
            business.noInteraction();
        } else {
            business.processResult();
        }
    };

    /*********************************************************************************************
    * Method Name   : next
    * Description   : This is called to store an address and increment the "procIndex" so that if
    *                 another address exists, it will be cleaned.
    *********************************************************************************************/
    this.next = function () {
        // Add match type.
        clean.result.push(clean.verifylevel);

        // Store cleaned address.
        add.storeCleanedAddress(clean.result);

        // Increase "procIndex" to point to the next address.
        procIndex++;

        // If another address exists, process it, otherwise move to end.
        if (procIndex < strings.length) {
            me.process();
        } else {
            me.finish();
        }
    };

    /*********************************************************************************************
    * Method Name   : finish
    * Description   : Returns cleaned addresses to webpage. Calls submit functions if any exist.
    *********************************************************************************************/
    this.finish = function () {
        // Return cleaned addresses.
        add.returnCleanAddresses();

        // If an onclick event exists, call it.
        if (m_click !== null) {
            m_click();
        }

        // If a submit button exists, click it.
        if (m_button !== "") {
            $('#' + m_button).closest("form").submit();
        }
    };

    /*********************************************************************************************
    * Method Name   : returnEarly
    * Description   : Used for clicks on the "Edit" button to return any addresses already cleaned.
    *********************************************************************************************/
    this.returnEarly = function () {
        // Return cleaned addresses.
        add.returnCleanAddresses();
    };

    /*********************************************************************************************
    * Method Name   : ajaxError
    * Description   : Handle all ajax errors.
    *********************************************************************************************/
    this.ajaxError = function (xml, text, msg) {
        if (text === "timeout") {
            // Set match type to timeout.
            clean.verifylevel = "Timeout";
            text = "Timeout";

            // Trigger 'timeout' callback function if configured.
            if (typeof me.timeoutCallback != "undefined") {
                if (typeof me.timeoutCallback != "function") {
                    throw new Error("Address's 'timeoutCallback' is not a function.");
                }

                me.timeoutCallback();
            }
        }
        // Set match type to error.
        else {
            clean.verifylevel = "Error";
        }

        // If display errors is set, then display the error.
        if (QAS_Variables.DISPLAY_ERRORS) {
            text = text || "";
            var message = (text.length > 255) ? text.substr(0, 255) : text;
            alert(message + "\n Error with AJAX call. Check to make sure the service is configured and running correctly.");
        }

        // Close the waiting widget.
        inter.waitClose();

        // Set result to the original address entered.
        clean.result = orig[procIndex];

        // Move onto next record.
        me.next();
    };
    /*********************************************************************************************
    * Private.
    *********************************************************************************************/
    // Gets the keys of an array based on the value.
    var getKeysByValue = function (array, value) {
        var returnKeys = new Array();

        for (var item in array) {
            if (array.hasOwnProperty(item)) {
                if (array[item] === value) {
                    returnKeys.push(item);
                }
            }
        }

        return returnKeys;
    };
}; // End of Main class.