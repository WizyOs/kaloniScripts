	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
	define(['N/record', 'N/log','N/search','N/file'], function(record,log,search,file) {

   function beforeLoad(context) {
     if(context.type == "view")
     {
        var valfoto1 = null;
        var valfoto2 = null;
        var valfoto3 = null;
        var valfoto4 = null;
        var internalid = null;
        var recordCaseId = context.newRecord.id;
        var objRecord = record.load({type: 'SUPPORTCASE', id: recordCaseId}); // , isDynamic: false
        var customForm = objRecord.getValue({fieldId: 'customform'});
       	var custevent313 = objRecord.getValue({fieldId: 'custevent313'});
       	var custevent314 = objRecord.getValue({fieldId: 'custevent314'});
       	var custevent315 = objRecord.getValue({fieldId: 'custevent315'});
       	var custevent316 = objRecord.getValue({fieldId: 'custevent316'});
        var company = objRecord.getText({fieldId: 'company'});
        var companySplit = company.split(' ');
       	var hg = companySplit[0];

		if(customForm == "135") // Diagnostico
        {
          if((custevent313 == "" || custevent313 == null) || (custevent314 == "" || custevent314 == null) || (custevent315 == "" || custevent315 == null) || (custevent316 == "" || custevent316 == null))
          {
            search.create({
                     type: search.Type.FOLDER,
                     filters: [search.createFilter({name: 'name', operator: search.Operator.IS, values: [hg +'_FOLDER']})], // search.createFilter({name: 'internalid', operator: search.Operator.IS, values: ['1039537']})
                     columns: ['internalid', 'name']
              }).run().each(function(result){
                     internalid = result.getValue({name: 'internalid'});
                     var name = result.getValue({name: 'name'});
                     log.debug('Folder internalid _ name: ', internalid + " _ " + name);
                    return true;
              });

            if(internalid != null)
            {
              var cont = 1;
              var filters = [];
              filters [0] =  search.createFilter({name: 'folder', operator: search.Operator.IS, values: [internalid]});

              search.create({
                     type: 'file',
                     filters: filters,
                     columns: ['internalid', 'filetype', 'name', 'folder']
              }).run().each(function(result){
                    var fileid = result.getValue({name: 'internalid'});
                    var nameVal = result.getValue({name: 'name'});
                    var filetypeVal = result.getValue({name: 'filetype'});
                    var folderVal = result.getValue({name: 'folder'});
                    if((filetypeVal == "JPGIMAGE" || filetypeVal == "PNGIMAGE") && folderVal == internalid)
                    {
                      if(valfoto1 == null || valfoto2 == null || valfoto3 == null || valfoto4 == null)
                      {
                        if(valfoto1 == null){
                          valfoto1 = fileid;
                          log.debug('valfoto1 fileid _ name _ filetype: ', valfoto1 + " _ " + nameVal + " _ " + filetypeVal + " _ " + folderVal);
                        }else if(valfoto2 == null){
                          valfoto2 = fileid;
                          log.debug('valfoto2 fileid _ name _ filetype: ', valfoto2 + " _ " + nameVal + " _ " + filetypeVal + " _ " + folderVal);
                        }else if(valfoto3 == null){
                          valfoto3 = fileid;
                          log.debug('valfoto3 fileid _ name _ filetype: ', valfoto3 + " _ " + nameVal + " _ " + filetypeVal + " _ " + folderVal);
                        }else if(valfoto4 == null){
                          valfoto4 = fileid;
                          log.debug('valfoto4 fileid _ name _ filetype: ', valfoto4 + " _ " + nameVal + " _ " + filetypeVal + " _ " + folderVal);
                        }
                      }
                      cont++;
                    }
                  return true;
              });
              log.debug('cont: ', cont);
            }
            else
            {
              log.debug('Folder not found: ', 'No se encontró folder!! ');
            }
            if(valfoto1 != null || valfoto2 != null || valfoto3 != null || valfoto4 != null)
            {
               if(valfoto1 != null)
                  objRecord.setValue({fieldId: "custevent313", value: valfoto1});
               if(valfoto2 != null)
                  objRecord.setValue({fieldId: "custevent314", value: valfoto2});
               if(valfoto3 != null)
                  objRecord.setValue({fieldId: "custevent315", value: valfoto3});
               if(valfoto4 != null)
                  objRecord.setValue({fieldId: "custevent316", value: valfoto4});

               objRecord.save({enableSourcing: false, ignoreMandatoryFields: true});
            }
          }
          else
          {
            log.debug('Log msg: ', 'Los campos IMAGEN VALORACIÓN ya están llenos!!');
          }
        }
     }
  }
		return {
        beforeLoad: beforeLoad
		};
});