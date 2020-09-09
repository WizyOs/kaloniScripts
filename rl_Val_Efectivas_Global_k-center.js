/**

 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount

 */

define(['N/record', 'N/log', 'N/file', 'N/email', 'N/search', 'N/ui/serverWidget', 'N/format', 'N/https', 'N/url'],

  function (record, log, file, email, search, serverWidget, format, https, url) {

    function doGet(params) {
      var jsonResponse = {};
      var prefix = '';
      var idPrefix = 0;
      //strJson = JSON.stringify(params);
      //objJson = JSON.parse(strJson);

      var searchLoad = search.load({ id: 'customsearch1381_2_2_2_2_2_3_3_5' });

      var arr_data = [];

      var data_searchPrefix = searchLoad.runPaged({ "pageSize": 1000 });
      data_searchPrefix.pageRanges.forEach(function (pageRange) {
        var dataPage = data_searchPrefix.fetch({ index: pageRange.index });
        dataPage.data.forEach(function (result) {
          var internalid = result.getValue({ name: 'internalid' });
          var sucursal = result.getText({ name: 'custevent2' });
          var organizer = result.getText({ name: 'organizer' });
          var prefix = result.getText({ name: 'custevent70' });
          var startdate = result.getValue({ name: 'startdate' });
          prefix = prefix.substring(0, 3);
          arr_data.push({ "internalid": internalid, "sucursal": sucursal, "organizer": organizer, "startdate": startdate });
        });
      });

      //log.debug('Array Data', arr_data);
      jsonResponse = arr_data;

      return jsonResponse;
    }

    function doPost(params) {
      var jsonResponse = {};
      var prefix = '';
      var idPrefix = 0;
      //strJson = JSON.stringify(params);
      //objJson = JSON.parse(strJson);

      var searchLoad = search.load({ id: 'customsearch1381_2_2_2_2_2_3_3_5' });

      var arr_data = [];

      var data_searchPrefix = searchLoad.runPaged({ "pageSize": 1000 });
      data_searchPrefix.pageRanges.forEach(function (pageRange) {
        var dataPage = data_searchPrefix.fetch({ index: pageRange.index });
        dataPage.data.forEach(function (result) {
          var internalid = result.getValue({ name: 'internalid' });
          var sucursal = result.getText({ name: 'custevent2' });
          var organizer = result.getText({ name: 'organizer' });
          var prefix = result.getText({ name: 'custevent70' });
          var startdate = result.getValue({ name: 'startdate' });
          prefix = prefix.substring(0, 3);

          if (prefix == 'VAL') {
            arr_data.push({ "internalid": internalid, "sucursal": sucursal, "organizer": organizer, "startdate": startdate });
          }

        });
      });

      log.debug('Array Data', arr_data);
      jsonResponse = arr_data;

      return jsonResponse;
    }

    return {
      get: doGet,
      post: doPost
    };
  });