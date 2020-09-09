	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope SameAccount
	*/
define(['N/record', 'N/search'], function(record,search) {

    function afterSubmit(context)
  	{
        var currentRecord = context.newRecord;
        var prefijo = currentRecord.getValue({fieldId: 'custevent70'});

        // Condition that will run the codes only on Creation.
        if((prefijo == "12") && (context.type == 'create'))
        {
            var companyId = currentRecord.getValue({fieldId: 'company'});
            var cliente = record.load({type: 'customer', id: companyId});
            var subsidiary = cliente.getValue({fieldId: 'subsidiary'});
          	var subsidiaryText = cliente.getText({fieldId: 'subsidiary'});
          	log.error('subsidiaryText: ', subsidiaryText);
            if(subsidiary == "6") // México
            {
              var sucursal = cliente.getValue({fieldId: 'custentity25'});
              var boolSuc = false;

			  // searchid=-2030 (saved search: Locations)
              var mySearch = search.load({id: "-2030"});
              var myPagedData = mySearch.runPaged({"pageSize": 30});
              myPagedData.pageRanges.forEach(function(pageRange){
                  var myPage = myPagedData.fetch({index: pageRange.index});
                  myPage.data.forEach(function(result){
                    var jsonString = JSON.stringify(result);
                    var obj = JSON.parse(jsonString);
      				if (obj.hasOwnProperty("id"))
                    {
                      var sucursalId_Search = obj.id;
                      if(sucursal === sucursalId_Search)
                      {
                        boolSuc = true;
                        var name_Search = result.getValue({name: 'name'});

                        // search folder name
                        search.create({
                            type: search.Type.FOLDER,
                            filters: [search.createFilter({name: 'name', operator: search.Operator.IS, values: [name_Search +"_HAIR"]})],
                            columns: ['internalid']
                        }).run().each(function(result){
                            customerid = result.getValue({name: 'internalid'});
                        });
                      }
                    }
                  });
              });

              if(boolSuc == false)
                 log.error('Sucursal no encontrada!!: ', 'Sucursal No. ' + sucursal + 'no esta registrada en la lista "Locations"');
            }

        }
    }

    return {
        afterSubmit: afterSubmit
    }
});