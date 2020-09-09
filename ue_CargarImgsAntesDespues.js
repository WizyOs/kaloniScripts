	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope SameAccount
	*/
	define(['N/record', 'N/log','N/search','N/file'], function(record,log,search,file) {

   function beforeLoad(context) {
     if(context.type == "view")
     {
        var valfoto1 = null;
        var valfoto2 = null;
        var valfoto3 = null;
        var valfoto4 = null;
        var valfoto5 = null;
        var valfoto6 = null;
        var valfoto7 = null;
        var valfoto8 = null;
        var internalid = null;
        var recordCaseId = context.newRecord.id;
        var objRecord = record.load({type: 'SUPPORTCASE', id: recordCaseId, isDynamic: true}); // , isDynamic: false
        var customForm = objRecord.getValue({fieldId: 'customform'});
       	var custevent82 = objRecord.getValue({fieldId: 'custevent82'});
       	var custevent83 = objRecord.getValue({fieldId: 'custevent83'});
       	var custevent84 = objRecord.getValue({fieldId: 'custevent84'});
       	var custevent85 = objRecord.getValue({fieldId: 'custevent85'});
       	var custevent76 = objRecord.getValue({fieldId: 'custevent76'}); //
       	var custevent77 = objRecord.getValue({fieldId: 'custevent77'});
       	var custevent78 = objRecord.getValue({fieldId: 'custevent78'});
       	var custevent81 = objRecord.getValue({fieldId: 'custevent81'});
        var company = objRecord.getText({fieldId: 'company'});
        var companySplit = company.split(' ');
       	var hg = companySplit[0];

		if(customForm == "14") // INJERTO
        {
          if((custevent82 == "" || custevent82 == null) || (custevent83 == "" || custevent83 == null) || (custevent84 == "" || custevent84 == null) || (custevent85 == "" || custevent85 == null) || (custevent76 == "" || custevent76 == null) || (custevent77 == "" || custevent77 == null) || (custevent78 == "" || custevent78 == null) || (custevent81 == "" || custevent81 == null))
          {
            var cont = 0;
            search.create({
                     type: search.Type.FOLDER,
                     filters: [search.createFilter({name: 'name', operator: search.Operator.IS, values: [hg +'_FOLDER']})],
                     columns: ['internalid', 'name', 'parent']
              }).run().each(function(result){
              		if(cont < 1){
                       internalid = result.getValue({name: 'internalid'});
                       var name = result.getValue({name: 'name'});
                       var parent = result.getText({name: 'parent'});
                       log.debug('Folder (_FOLDER) internalid _ name _ parent: ', internalid + " _ " + name + " _ " + parent);
                    }
              	cont++;
                return true;
              });

              if(internalid != null)
              {
                var internalid2 = null;
                search.create({
                         type: search.Type.FOLDER,
                         filters: [search.createFilter({name: 'name', operator: search.Operator.IS, values: ['INJERTO']}),
                                   search.createFilter({name: 'parent', operator: search.Operator.IS, values: [internalid]})],
                         columns: ['internalid', 'name', 'parent']
                  }).run().each(function(result){
                           internalid2 = result.getValue({name: 'internalid'});
                           var name = result.getValue({name: 'name'});
                           var parent = result.getText({name: 'parent'});
                           log.debug('Folder (INJERTO) internalid _ name _ parent: ', internalid2 + " _ " + name + " _ " + parent);
                    return true;
                  });

                if(internalid2 != null)
                {
                  var procedimientosList = objRecord.getText({fieldId: 'custevent839'});
                  if(procedimientosList == "Primer procedimiento" || procedimientosList == "Segundo procedimiento" || procedimientosList == "Tercer procedimiento")
                  {
                  if(procedimientosList == "Primer procedimiento")
                    procedimientosList = '1 Proc';
                  if(procedimientosList == "Segundo procedimiento")
                    procedimientosList = '2 Proc';
                  if(procedimientosList == "Tercer procedimiento")
                    procedimientosList = '3 Proc';
                  var internalid3 = null;
                  search.create({
                           type: search.Type.FOLDER,
                           filters: [search.createFilter({name: 'name', operator: search.Operator.IS, values: [procedimientosList]}),
                                     search.createFilter({name: 'parent', operator: search.Operator.IS, values: [internalid2]})],
                           columns: ['internalid', 'name', 'parent']
                    }).run().each(function(result){
                             internalid3 = result.getValue({name: 'internalid'});
                             var name = result.getValue({name: 'name'});
                             var parent = result.getText({name: 'parent'});
                             log.debug('Folder (1 Proc) internalid _ name _ parent: ', internalid3 + " _ " + name + " _ " + parent);
                      return true;
                    });

                    if(internalid3 != null)
                    {
                        var internalid4 = null;
                        search.create({
                               type: search.Type.FOLDER,
                               filters: [search.createFilter({name: 'name', operator: search.Operator.IS, values: ['Diseño Sala']}),
                                         search.createFilter({name: 'parent', operator: search.Operator.IS, values: [internalid3]})],
                               columns: ['internalid', 'name', 'parent']
                        }).run().each(function(result){
                                 internalid4 = result.getValue({name: 'internalid'});
                                 var name = result.getValue({name: 'name'});
                                 var parent = result.getText({name: 'parent'});
                                 log.debug('Folder (Diseño Sala) internalid _ name _ parent: ', internalid4 + " _ " + name + " _ " + parent);
                          return true;
                        });

                        if(internalid4 != null)
                        {
                            var cont2 = 1;
                            var filters = [];
                            filters [0] =  search.createFilter({name: 'folder', operator: search.Operator.IS, values: [internalid4]});
                            search.create({type: 'file', filters: filters, columns: ['internalid', 'filetype', 'name', 'folder']
                            }).run().each(function(result){
                                  var fileid = result.getValue({name: 'internalid'});
                                  var nameVal = result.getValue({name: 'name'});
                                  var filetypeVal = result.getValue({name: 'filetype'});
                                  var folderVal = result.getValue({name: 'folder'});
                                  if((filetypeVal == "JPGIMAGE" || filetypeVal == "PNGIMAGE") && folderVal == internalid4)
                                  {
                                    if(valfoto1 == null || valfoto2 == null || valfoto3 == null || valfoto4 == null)
                                    {
                                      if(valfoto1 == null){
                                        valfoto1 = fileid;
                                        log.debug('valfoto1 fileid _ name _ filetype _ folder: ', valfoto1 + " _ " + nameVal + " _ " + filetypeVal + " _ " + folderVal);
                                      }else if(valfoto2 == null){
                                        valfoto2 = fileid;
                                        log.debug('valfoto2 fileid _ name _ filetype _ folder: ', valfoto2 + " _ " + nameVal + " _ " + filetypeVal + " _ " + folderVal);
                                      }else if(valfoto3 == null){
                                        valfoto3 = fileid;
                                        log.debug('valfoto3 fileid _ name _ filetype _ folder: ', valfoto3 + " _ " + nameVal + " _ " + filetypeVal + " _ " + folderVal);
                                      }else if(valfoto4 == null){
                                        valfoto4 = fileid;
                                        log.debug('valfoto4 fileid _ name _ filetype _ folder: ', valfoto4 + " _ " + nameVal + " _ " + filetypeVal + " _ " + folderVal);
                                      }
                                    }
                                    cont2++;
                                  }
                                return true;
                            });
                            log.debug('cont2: ', cont2);

                        }
                        else
                        {
                            log.debug('Folder not found: ', 'No se encontró folder (Diseño Sala)!! ');
                        }

                        var internalid5 = null;
                        search.create({
                               type: search.Type.FOLDER,
                               filters: [search.createFilter({name: 'name', operator: search.Operator.IS, values: ['Fotos Despues Procedimiento']}), // escribir bien
                                         search.createFilter({name: 'parent', operator: search.Operator.IS, values: [internalid3]})],
                               columns: ['internalid', 'name', 'parent']
                        }).run().each(function(result){
                                 internalid5 = result.getValue({name: 'internalid'});
                                 var name = result.getValue({name: 'name'});
                                 var parent = result.getText({name: 'parent'});
                                 log.debug('Folder (Fotos Despues Procedimiento) internalid _ name _ parent: ', internalid5 + " _ " + name + " _ " + parent);
                          return true;
                        });

                        if(internalid5 != null)
                        {
                          var cont3 = 1;
                          var filters = [];
                          filters [0] =  search.createFilter({name: 'folder', operator: search.Operator.IS, values: [internalid5]});
                          search.create({type: 'file', filters: filters, columns: ['internalid', 'filetype', 'name', 'folder']
                          }).run().each(function(result){
                                var fileid = result.getValue({name: 'internalid'});
                                var nameVal = result.getValue({name: 'name'});
                                var filetypeVal = result.getValue({name: 'filetype'});
                                var folderVal = result.getValue({name: 'folder'});
                                if((filetypeVal == "JPGIMAGE" || filetypeVal == "PNGIMAGE") && folderVal == internalid5)
                                {
                                  if(valfoto5 == null || valfoto6 == null || valfoto7 == null || valfoto8 == null)
                                  {
                                    if(valfoto5 == null){
                                      valfoto5 = fileid;
                                      log.debug('valfoto5 fileid _ name _ filetype _ folder: ', valfoto5 + " _ " + nameVal + " _ " + filetypeVal + " _ " + folderVal);
                                    }else if(valfoto6 == null){
                                      valfoto6 = fileid;
                                      log.debug('valfoto6 fileid _ name _ filetype _ folder: ', valfoto6 + " _ " + nameVal + " _ " + filetypeVal + " _ " + folderVal);
                                    }else if(valfoto7 == null){
                                      valfoto7 = fileid;
                                      log.debug('valfoto7 fileid _ name _ filetype _ folder: ', valfoto7 + " _ " + nameVal + " _ " + filetypeVal + " _ " + folderVal);
                                    }else if(valfoto8 == null){
                                      valfoto8 = fileid;
                                      log.debug('valfoto8 fileid _ name _ filetype _ folder: ', valfoto8 + " _ " + nameVal + " _ " + filetypeVal + " _ " + folderVal);
                                    }
                                  }
                                  cont3++;
                                }
                              return true;
                          });
                          log.debug('cont3: ', cont3);

                        }
                        else
                        {
                          log.debug('Folder not found: ', 'No se encontró folder (Fotos Despues Procedimiento)!!');
                        }

                    }
                    else
                    {
                      log.debug('Folder not found: ', 'No se encontró folder (1 Proc, 2 Proc o 3 Proc)!! ');
                    }
                  }
                  else
                  {
                     log.debug('procedimientosList: ', 'No es igual a (Primer procedimiento, Segundo procedimiento o Tercer procedimiento)');
                  }
                }
                else
                {
                  log.debug('Folder not found: ', 'No se encontró folder (INJERTO)!! ');
                }
              }
              else
              {
                log.debug('Folder not found: ', 'No se encontró folder (_FOLDER)!!');
              }

              if(valfoto1 != null || valfoto2 != null || valfoto3 != null || valfoto4 != null || valfoto5 != null || valfoto6 != null || valfoto7 != null || valfoto8 != null)
              {
                 if(valfoto1 != null)
                    objRecord.setValue({fieldId: "custevent82", value: valfoto1});
                 if(valfoto2 != null)
                    objRecord.setValue({fieldId: "custevent83", value: valfoto2});
                 if(valfoto3 != null)
                    objRecord.setValue({fieldId: "custevent84", value: valfoto3});
                 if(valfoto4 != null)
                    objRecord.setValue({fieldId: "custevent85", value: valfoto4});
                 if(valfoto5 != null)
                    objRecord.setValue({fieldId: "custevent76", value: valfoto5});
                 if(valfoto6 != null)
                    objRecord.setValue({fieldId: "custevent77", value: valfoto6});
                 if(valfoto7 != null)
                    objRecord.setValue({fieldId: "custevent78", value: valfoto7});
                 if(valfoto8 != null)
                    objRecord.setValue({fieldId: "custevent81", value: valfoto8});

                 objRecord.save({enableSourcing: false, ignoreMandatoryFields: true});
              }
          }
          else
          {
            log.debug('Log msg: ', 'Los campos de "Diseño en Sala" y "Fotos Despues de Procedimiento" ya están llenos!!');
          }
        }
     }
  }
		return {
        beforeLoad: beforeLoad
		};
});