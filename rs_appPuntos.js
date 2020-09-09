/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
*/

define(['N/record','N/search','N/format','N/url', 'N/https'],

    function(record,search,format,url, https) {

        function _post(context) {
            var recObj1 = [];
            var obj = JSON.parse(context);
          	var response = null;

            if (obj.hasOwnProperty("param1"))
            {
                var valparam = obj.param1;
                if(valparam != '')
                {
                  //log.debug('Parametro: ', valparam);
                  var script = 'customscript1105';
                  var deployment = 'customdeploy1';
                  var parameters = "&hgToFind="+valparam;
                  try {
                      var suiteletURL = url.resolveScript({scriptId:script, deploymentId: deployment, returnExternalUrl:true}); //
                      var myRequest = {};
                      myRequest.headers = {};
                      myRequest.headers["User-Agent"] = "Mozilla/5.0";
                      myRequest.url = suiteletURL
                      var myResponse = https.get(myRequest);

                      log.debug('Resp: ', myResponse);
                      response = https.post({url:suiteletURL, body:parameters});
                      //log.debug(response);
                  }
                  catch(e) {
                     // log.debug(e.toString());
                  }
               }
            }
            return response;
        }

        function _get(context) {

        }

        return {
            get: _get,
            post: _post
        };

    });