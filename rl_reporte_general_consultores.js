/**

 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount

 */

define(['N/record', 'N/log', 'N/file', 'N/email', 'N/search', 'N/ui/serverWidget', 'N/format'],

    function (record, log, file, email, search, serverWidget, format) {

        function post(context) {
            try {

                var resultados = [];
                var search1 = 'customsearch8230'; // Valoraciones efectivas Consultor
                var search2 = 'customsearch8178'; // Cierres Consultor 
                var search3 = 'customsearch8207'; // Ventas Consultores
                var empty = [];
                var resultsArray = [];
                var resultItem ;
                var param_filter_date = "1/1/2018";
                
               var  filters=  [
                  {
                    name: "date",
                    operator: "within",
                    values: [param_filter_date],
                    isor: false,
                    isnot: false,
                    leftparens: 0,
                    rightparens: 0
                  }
                ]
                try {
                    var searchGhost1 = search.load({
                        id: search1
                    });
                    //log.debug('Search Ghost', searchGhost);

                    var searchResult_Ghots1 = searchGhost1.run().getRange({
                        start: 0,
                        end: 1000
                    });
                    searchResult_Ghots1 = JSON.parse(JSON.stringify(searchResult_Ghots1));
                    resultados.push(searchResult_Ghots1);
                    log.debug('resultados', resultados);
                }
                catch (e) {
                    log.debug('Valoraciones efectivas Consultor', e);
                    resultados.push(empty);
                }

                try {

                    var searchGhost2 = search.load({
                        id: search2
                    });
                    //log.debug('Search Ghost', searchGhost);

                    var searchResult_Ghots2 = searchGhost2.run().getRange({
                        start: 0,
                        end: 1000
                    });
                    searchResult_Ghots2 = JSON.parse(JSON.stringify(searchResult_Ghots2));
                    resultados.push(searchResult_Ghots2);
                }
                catch (e) {
                    log.debug('Cierres Consultor', e);
                    resultados.push(empty);
                }
                var searchGhost3 = search.load({
                    id: search3
                });
                try {
                    var searchResult_Ghots3 = searchGhost3.run().getRange({
                        start: 0,
                        end: 1000
                    });
                    searchResult_Ghots3 = JSON.parse(JSON.stringify(searchResult_Ghots3));
                    resultados.push(searchResult_Ghots3);
                }
                catch (e) {
                    log.debug(' Ventas Consultores', e);
                    resultados.push(empty);
                }

                // log.debug('resultados', resultados);
                // log.debug('resultados.length', resultados.length);

                resultados = JSON.parse(JSON.stringify(resultados));
                return resultados;
            } catch (e) {
                log.debug('Exception 2: ', e);
                return false;
            }
        }


        return {
            post: post
        };
    });
