/**

    * @NApiVersion 2.x  
    * @NScriptType Restlet
    * @NModuleScope SameAccount

    */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
  function doGet(params) {}

  function doPost(params) {

    var searchCliente = "customsearch7851";
    var searchEvento = "customsearch7854";
    var searchEmpleado = "customsearch7904";

    var arr_objResult = [];

    var searchGhost = search.load({
      id: searchEvento
    });

    var pageData_searchGhost = searchGhost.runPaged({
      pageSize: 100
    });

    pageData_searchGhost.pageRanges.forEach(function (pageRange) {
      page = pageData_searchGhost.fetch({
        index: pageRange.index
      });
      page.data.forEach(function (result) {
        obj_result = JSON.parse(JSON.stringify(result));

        arr_objResult.push(obj_result);

      })
    });

    objResult = JSON.parse(JSON.stringify(arr_objResult));

    return {
      "searchResult": objResult
    }
  }

  return {
    post: doPost
  };
});