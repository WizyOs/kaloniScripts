/**

    * @NApiVersion 2.x  
    * @NScriptType Restlet
    * @NModuleScope SameAccount

    */

   define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
    function doGet(params) {}
 
    function doPost(params) {
 
       var objJson, searchResult_LocationsByService;
       var response = [],
          arr_objResult = [];
       if (typeof params === "object") {
          objJson = params;
       } else {
          objJson = JSON.parse(params);
       }
       log.debug("params", objJson);
 
       var param_itemid = objJson.itemid;
 
       var searchCreate_Branches_Albya = search.create({
          "type": search.Type.ITEM,
          "filters": [{
                "name": "subsidiary",
                "operator": "is",
                "values": [
                   "19"
                ],
                "isor": false,
                "isnot": false,
                "leftparens": 0,
                "rightparens": 0
             },
             {
                "name": "itemid",
                "operator": "is",
                "values": [
                   param_itemid
                ],
                "isor": false,
                "isnot": false,
                "leftparens": 0,
                "rightparens": 0
             }
          ],
          "columns": [{
                "name": "internalid",
                "label": "internalid",
                "type": "text",
                "sort": "NONE"
             },
             {
                "name": "displayname",
                "label": "internalid",
                "type": "text",
                "sort": "NONE"
             },
             {
                "name": "custitem6",
                "label": "internalid",
                "type": "text",
                "sort": "NONE"
             }
          ]
       });
 
       var search_ghost = searchCreate_Branches_Albya.run().getRange({
          start: 0,
          end: 1
       });
 
       var objJSON_BranchesByService = JSON.parse(JSON.stringify(search_ghost));
 
       var searchResult_BranchesByService = objJSON_BranchesByService[0].values.custitem6;
 
       for (var key in searchResult_BranchesByService) {
          var nameBranch = searchResult_BranchesByService[key].text;
 
          var searchCreate_LocationsByServices = search.create({
             "type": search.Type.LOCATION,
             "filters": [{
                "name": "name",
                "operator": "is",
                "values": [
                   nameBranch
                ],
                "isor": false,
                "isnot": false,
                "leftparens": 0,
                "rightparens": 0
             }],
             "columns": [{
                   "name": "name",
                   "label": "name",
                   "type": "text",
                   "sort": "NONE"
                },
                {
                   "name": "city",
                   "label": "city",
                   "type": "text",
                   "sort": "NONE"
                },
                {
                   "name": "state",
                   "label": "state",
                   "type": "text",
                   "sort": "NONE"
                },
                {
                   "name": "country",
                   "label": "country",
                   "type": "text",
                   "sort": "NONE"
                },
                {
                   "name": "phone",
                   "label": "phone",
                   "type": "text",
                   "sort": "NONE"
                },
                {
                   "name": "address",
                   "join": "address",
                   "label": "Dirección",
                   "type": "text",
                   "sort": "NONE"
                }
             ]
          });
 
          searchResult_LocationsByService = searchCreate_LocationsByServices.run().getRange({
             start: 0,
             end: 1
          });
 
          var objJson_LocationsByService = JSON.parse(JSON.stringify(searchResult_LocationsByService));
 
          response.push({
             "branchName": objJson_LocationsByService[0].values.name,
             "branchCity": objJson_LocationsByService[0].values.city,
             "branchState": objJson_LocationsByService[0].values.state,
             "branchCountry": objJson_LocationsByService[0].values.country,
             "branchPhone": objJson_LocationsByService[0].values.phone,
             "branchAddress": objJson_LocationsByService[0].values["address.address"]
          });
       }
 
       var search_ghost = search.load({
          "id": "customsearch8027"
       });
 
       return response;
    }
 
    return {
       post: doPost
    };
 });