/**

 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount

 */

define(['N/record','N/log', 'N/file', 'N/email', 'N/search', 'N/ui/serverWidget', 'N/format'],

function(record,log,file,email,search,serverWidget,format) {

    function get(context)
  	{
        try
        {
          var dateMx = new Date();
          var mxDate = format.format({value: dateMx, type: format.Type.DATETIME, timezone: format.Timezone.AMERICA_MEXICO_CITY}); // 28/8/2019 11:28:52 am
          log.debug('mxDate: ', mxDate);
          var mxDate_Split = mxDate.split('/');
          var dia_Mx = ('0' + mxDate_Split[0]).slice(-2);
          var mes_Mx = ('0' + mxDate_Split[1]).slice(-2);
          var anio_Mx = mxDate_Split[2].substring(0, 4);
          log.debug('dia_Mx: ', dia_Mx);
          var savedS = '';
          if(dia_Mx != null && dia_Mx != '' && parseInt(dia_Mx) >= 5)
            savedS = 'customsearch6901'; // Seguimiento Valoraciones Global
          else
            savedS = 'customsearch7310'; // Seguimiento Valoraciones Global Mes Pasado

          var result_Segui_Valora_Global = get_saved_search_customer(savedS);
          log.debug('result_Segui_Valora_Global: ', result_Segui_Valora_Global);
          return JSON.stringify(result_Segui_Valora_Global);
        }catch(e){
          log.debug('Exception 2: ', e);
          return false;
        }
    }

    function post(context)
    {
        try
        {
          var dateMx = new Date();
          var mxDate = format.format({value: dateMx, type: format.Type.DATETIME, timezone: format.Timezone.AMERICA_MEXICO_CITY}); // 28/8/2019 11:28:52 am
          log.debug('mxDate: ', mxDate);
          var mxDate_Split = mxDate.split('/');
          var dia_Mx = ('0' + mxDate_Split[0]).slice(-2);
          var mes_Mx = ('0' + mxDate_Split[1]).slice(-2);
          var anio_Mx = mxDate_Split[2].substring(0, 4);
          log.debug('dia_Mx: ', dia_Mx);
          var savedS = 'customsearch6901';
          dia_Mx = parseInt(dia_Mx);
          //log.debug('vals', 'tipo ' + typeof parseInt(dia_Mx) + ' ' + parseInt(dia_Mx));
/*           if(dia_Mx != null && dia_Mx != '' && dia_Mx >= 5) {
            savedS = 'customsearch6901'; // Seguimiento Valoraciones Global
          } else {
            savedS = 'customsearch7310'; // Seguimiento Valoraciones Global Mes Pasado
          } */

          var result_Segui_Valora_Global = get_saved_search_customer(savedS);
          log.debug('result_Segui_Valora_Global: ', result_Segui_Valora_Global);
          return result_Segui_Valora_Global;
        }catch(e){
          log.debug('Exception 2: ', e);
          return false;
        }
    }
  
        function get_saved_search_customer(idSearch)
        {
          try
          {
      		  var obj_Segui_Valora_Global = '{"segui_Valora_Global":[]}';
        	  obj_Segui_Valora_Global = JSON.parse(obj_Segui_Valora_Global);
              var totalValora = 0;
              var mySearch = search.load({id:idSearch});
              var myPagedData = mySearch.runPaged({"pageSize": 1000});

              myPagedData.pageRanges.forEach(function(pageRange){
                  var myPage = myPagedData.fetch({index: pageRange.index});
                  myPage.data.forEach(function(result){
                      //log.debug('result: ', result);
                      var id = result.id;
                      //log.debug('id: ', id);
                      var entityid = result.getValue({name: 'entityid'});
                      //log.debug('entityid: ', entityid);
                      var altname = result.getValue({name: 'altname'});
                      //log.debug('altname: ', altname);
                      var sucursal = result.getText({name: 'custevent2', join: 'case'});
                      //log.debug('sucursal: ', sucursal);
                      var subsidiary = result.getText({name: 'subsidiary'});
                      //log.debug('subsidiary: ', subsidiary);
                      var img1_microcamara = result.getText({name: 'custevent333', join: 'case'});
                      //log.debug('img1_microcamara: ', img1_microcamara);
                      var img1_valoracion = result.getText({name: 'custevent313', join: 'case'});
                      //log.debug('img1_valoracion: ', img1_valoracion);
                      var firma_conformidad = result.getValue({name: 'custevent320', join: 'case'});
                      //log.debug('firma_conformidad: ', firma_conformidad);
                      var motivo_procedimiento = result.getText({name: 'custevent323', join: 'case'});
                      //log.debug('motivo_procedimiento: ', motivo_procedimiento);
                      var consultor_que_valoro = result.getText({name: 'custevent322', join: 'case'});
                      //log.debug('consultor_que_valoro: ', consultor_que_valoro);
                      
                      // if(subsidiary =="Hair Clinical Professional S.C. : Mexico"){
                      //   obj_Segui_Valora_Global['segui_Valora_Global'].push({id: id, entityid: entityid, altname: altname, sucursal: sucursal, subsidiary: subsidiary, img1_microcamara: img1_microcamara, img1_valoracion: img1_valoracion, firma_conformidad: firma_conformidad, motivo_procedimiento: motivo_procedimiento, consultor_que_valoro: consultor_que_valoro});
                      // }

                      obj_Segui_Valora_Global['segui_Valora_Global'].push({id: id, entityid: entityid, altname: altname, sucursal: sucursal, subsidiary: subsidiary, img1_microcamara: img1_microcamara, img1_valoracion: img1_valoracion, firma_conformidad: firma_conformidad, motivo_procedimiento: motivo_procedimiento, consultor_que_valoro: consultor_que_valoro});
                   
                      /*var column_1 = result.columns[1];
                      var column_2 = result.columns[2];*/
                      totalValora++;
                  });
              });
              log.debug('Total valoraciones: ', totalValora);
              return obj_Segui_Valora_Global;
           }catch(e){
              log.debug('Exception: ', e);
              return false;
          }
        }
  

    return {
        get: get,
      	post: post
    };
});
