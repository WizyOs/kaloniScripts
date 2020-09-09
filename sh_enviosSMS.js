/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */

define(["N/ui/serverWidget", "N/crypto", "N/https", "N/runtime", "N/encode", "N/url", 'N/email', 'N/log', 'N/search', 'N/record'],
    function (ui, crypto, https, runtime, encode, urlMod, email, log, search, record) {
        function execute(context) {
          try
          {
            var count = 0;
            var url = "https://api.messagemedia.com/v1/messages";
            var headers = {"Accept": "application/json", "Content-type": "application/json", "Authorization": "Basic TFpTZVBFc1dEZHFNM2NNOWtOZ0M6QURSb3BtN0pJT3RsNGs1M1ZyTFRIam5TOUoxN1oy"};
            var mySearch = search.load({id: 'customsearch2706'}); // busquedatest25
            var myPagedData = mySearch.runPaged({"pageSize": 1000});

            myPagedData.pageRanges.forEach(function(pageRange){
                var myPage = myPagedData.fetch({index: pageRange.index});
                myPage.data.forEach(function(result){
                    log.debug('Each result: ', result);
                    var id = result.id;
                    var entityid = result.getValue({name: 'entityid'});
                    var altname = result.getValue({name: 'altname'});
                    var phone = result.getValue({name: 'phone'});
                    log.debug('Each phone: ', phone);
                    var numberPattern = /\d+/g;
					var newValPhone = phone.match(numberPattern).join('');
                    if(newValPhone.length == 10)
                    {
                      log.debug('Each newValPhone: ', newValPhone);
                      var bodyRequest = '{"messages":[{"content":"MessageMedia Test", "destination_number":"+52'+newValPhone+'", "format":"SMS"}]}';
                      var responseReenvio = https.request({method:https.Method.POST, url:url, headers:headers, body:bodyRequest});
                      var responseReenvioBody = JSON.parse(responseReenvio.body);
                      log.debug('responseReenvioBody: ', responseReenvioBody);
                      count++;
                    }
                });
            });
    	   log.debug('count: ', count);

          }catch(e){
            log.debug('Exception: ', e);
            //return e.toString();
          }
        }

        return {
            execute: execute
        };
    });