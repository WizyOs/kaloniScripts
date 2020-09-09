/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */

define(['N/record','N/search','N/format'],

function(record,search,format) {

    function _get(context) {
    }

    function _post(context)
    {
      var result = null;
      var obj = JSON.parse(context);
      log.error('obj: ', obj);

      if (obj.hasOwnProperty("param1"))
      {
         var idSearch = null;
         var valparam = obj.param1;
         if (valparam === 'test_sfe')
         {
            // Saved search = TEST SFE
            idSearch = "customsearch2107";
            result = get_saved_search(idSearch);
         }
         else if(valparam === 'test_sat')
         {
            // Saved search = TEST SAT
            idSearch = "customsearch2259";
            result = get_saved_search(idSearch);
         }
         else if(valparam === 'test_alt')
         {
            // Saved search = TEST ALT 
            idSearch = "customsearch2258";
            result = get_saved_search(idSearch);
         }
         else if(valparam === 'test_pol')
         {
            // Saved search = TEST POL
            idSearch = "customsearch2257";
            result = get_saved_search(idSearch);
         }
         else if(valparam === 'test_mty')
         {
            // Saved search = TEST MTY
            idSearch = "customsearch2256";
            result = get_saved_search(idSearch);
         }
         else if(valparam === 'test_tij')
         {
            // Saved search = TEST TIJ
            idSearch = "customsearch2264";
            result = get_saved_search(idSearch);
         }
         else if(valparam === 'test_ver')
         {
            // Saved search = TEST VER
            idSearch = "customsearch2260";
            result = get_saved_search(idSearch);
         }
         else if(valparam === 'test_gdl')
         {
            // Saved search = TEST GDL
            idSearch = "customsearch2263";
            result = get_saved_search(idSearch);
         }
         else if(valparam === 'test_pue')
         {
            // Saved search = TEST PUE
            idSearch = "customsearch2261";
            result = get_saved_search(idSearch);
         }
         else if(valparam === 'test_chih')
         {
            // Saved search = TEST CHIH 
            idSearch = "customsearch2265";
            result = get_saved_search(idSearch);
         }
         else if(valparam === 'test_can')
         {
            // Saved search = TEST CAN 
            idSearch = "customsearch2262";
            result = get_saved_search(idSearch);
         }
         else if(valparam === 'test_std')
         {
            // Saved search = TEST STD 
            idSearch = "customsearch4396";
            result = get_saved_search(idSearch);
         }
         else if(valparam === 'test_madrid')
         {
            // Saved search = TEST MADRID
            idSearch = "customsearch4584";
            result = get_saved_search(idSearch);
         }
         else if(valparam === 'test_velazquez')
         {
            // Saved search = TEST VELAZQUEZ
            idSearch = "customsearch4585";
            result = get_saved_search(idSearch);
         }
         else if(valparam === 'test_bog')
         {
            // Saved search = TEST BOG
            idSearch = "customsearch2394";
            result = get_saved_search(idSearch);
         }
         else if(valparam === 'test_mede')
         {
            // Saved search = TEST MEDE
            idSearch = "customsearch3783";
            result = get_saved_search(idSearch);
         }
      }
      else if(obj.hasOwnProperty("email"))
      {
       	if(obj.custentity155 == "true")
           obj['custentity155'] = "T";
      	else
           obj['custentity155'] = "F";

		var customerid = searchCustomer(obj.email); // dalcantara25@outlook.com
        if(customerid != null && customerid != "")
        {
			result = record.submitFields({
	        type: record.Type.CUSTOMER,
	        id: customerid,
	        values:{
              		firstname: obj.firstname,
              		lastname: obj.lastname,
              		comments: obj.comments,
              		category: parseInt(obj.category),
              		custentity132: parseInt(obj.custentity132),
              		custentity137: parseInt(obj.custentity137),
              		custentity25: parseInt(obj.custentity25),
              		custentity138: obj.custentity138, // ""
              		custentity30: parseInt(obj.custentity30),
              		custentity131: parseInt(obj.custentity131),
              		custentity143: parseInt(obj.custentity143),
              		custentity313: parseInt(obj.custentity313),
              		custentity133: obj.custentity133, // ""
              		custentity134: obj.custentity134, // ""
              		custentity135: obj.custentity135, // ""
              		custentity136: obj.custentity136, // ""
              		custentity139: obj.custentity139, // ""
              		custentity144: parseInt(obj.custentity144),
              		custentity38: parseInt(obj.custentity38),
              		leadsource: parseInt(obj.leadsource),
	        	    subsidiary: parseInt(obj.subsidiary),
              		globalsubscriptionstatus: parseInt(obj.globalsubscriptionstatus),
              		custentity142: parseInt(obj.custentity142),
              		currency: parseInt(obj.currency),
	        	    custentity155: obj.custentity155, // true
              		custentity156: obj.custentity156, // T
              		phone: obj.phone,
              		entitystatus: parseInt(obj.entitystatus),
	        	    custentity336: parseInt(obj.custentity336),
              		custentity337: parseInt(obj.custentity337),
	        	    custentity338: parseInt(obj.custentity338)
	        },
	        options:{enableSourcing: false, ignoreMandatoryFields : false}
	        });
          	/*if(obj.horaInicioEvento != "" && obj.horaInicioEvento != null)
            {
              var horaIni = obj.horaInicioEvento;
              var horaIniArray = horaIni.split('T');
              var horaInicio = horaIniArray[1];
              obj['horaInicioEvento'] = horaInicio;
            }
			if(obj.horaFinEvento != "" && obj.horaFinEvento != null)
            {
              var horaFin = obj.horaFinEvento;
              var horaFinArray = horaFin.split('T');
              var horaFinal = horaFinArray[1];
              obj['horaFinEvento'] = horaFinal;
            }*/
            var newEventRecord = record.create({type: 'calendarevent', isDynamic: true});
            newEventRecord.setValue({fieldId: 'custevent2', value: obj.custevent2Evento});
            newEventRecord.setValue({fieldId: 'custevent79', value: obj.custevent79Evento});
            newEventRecord.setValue({fieldId: 'custevent70', value: obj.custevent70Evento});
            newEventRecord.setValue({fieldId: 'startdate', value: new Date(obj.fechaEvento)});
            var d = new Date();
            var formattedDateString = format.format({
                value: d,
                type: format.Type.DATETIMETZ
            });
          	//log.error('formattedDateString: ', formattedDateString);
          	//var time1 = format.format({value: new Date(), type: format.Type.TIMEOFDAY});
          	//var time1 = format.format({value: "1:00:33 am", type: format.Type.TIMEOFDAY});
          	//log.error('obj.horaInicioEvento: ', obj.horaInicioEvento);
          	var da = new Date('2019-07-09 12:00:00.000');
            newEventRecord.setValue({fieldId: 'starttime', value: "18:30:00:00"}); // ignoreFieldChange : true  2019-07-08T13:00:00.000-07:00
            newEventRecord.setValue({fieldId: 'endtime', value: "11:00 pm"});
            newEventRecord.setValue({fieldId: 'organizer', value: obj.organizerEvento});
            newEventRecord.setValue({fieldId: 'company', value: customerid});
            var newEventRecordId = newEventRecord.save({enableSourcing: true, ignoreMandatoryFields: true});
            log.error('result: ', 'Customer Record (' + result + ') Updated Successfully...');
        }
        else
        {
          var newCustomerRecord = record.create({type: record.Type.CUSTOMER, isDynamic: true});
          newCustomerRecord.setValue({fieldId: 'firstname', value: obj.firstname});
          newCustomerRecord.setValue({fieldId: 'lastname', value: obj.lastname});
          newCustomerRecord.setValue({fieldId: 'email', value: obj.email});
          var newCustomerRecordId = newCustomerRecord.save({enableSourcing: false, ignoreMandatoryFields: true});

          if(newCustomerRecordId != null)
          {
			result = record.submitFields({
	        type: record.Type.CUSTOMER,
	        id: newCustomerRecordId,
	        values:{
              		comments: obj.comments,
              		category: parseInt(obj.category),
              		custentity132: parseInt(obj.custentity132),
              		custentity137: parseInt(obj.custentity137),
              		custentity25: parseInt(obj.custentity25),
              		custentity138: obj.custentity138, // ""
              		custentity30: parseInt(obj.custentity30),
              		custentity131: parseInt(obj.custentity131),
              		custentity143: parseInt(obj.custentity143),
              		custentity313: parseInt(obj.custentity313),
              		custentity133: obj.custentity133, // ""
              		custentity134: obj.custentity134, // ""
              		custentity135: obj.custentity135, // ""
              		custentity136: obj.custentity136, // ""
              		custentity139: obj.custentity139, // ""
              		custentity144: parseInt(obj.custentity144),
              		custentity38: parseInt(obj.custentity38),
              		leadsource: parseInt(obj.leadsource),
	        	    subsidiary: parseInt(obj.subsidiary),
              		globalsubscriptionstatus: parseInt(obj.globalsubscriptionstatus),
              		custentity142: parseInt(obj.custentity142),
              		currency: parseInt(obj.currency),
	        	    custentity155: obj.custentity155, // true
              		custentity156: obj.custentity156, // T
              		phone: obj.phone,
              		entitystatus: parseInt(obj.entitystatus),
	        	    custentity336: parseInt(obj.custentity336),
              		custentity337: parseInt(obj.custentity337),
	        	    custentity338: parseInt(obj.custentity338)
	        },
	        options:{enableSourcing: false, ignoreMandatoryFields : false}
	        });
            log.error('result: ', 'Customer Record (' + result + ') Created Successfully...');
          }
        }
      }

      if(result == null)
        log.error('Response null: ', 'El parametro recibido "param1" no es valido!!');

        var objRes = JSON.parse(result);
        //log.error('objRes: ', objRes);
        return objRes;
    }

    function get_saved_search(idSearch)
    {
        var recObj1 = [];
        var count = 0;
        log.error('idSearch: ', idSearch);
        var mySearch = search.load({id: idSearch});
        var myPagedData = mySearch.runPaged({"pageSize": 1000});

        myPagedData.pageRanges.forEach(function(pageRange){
            var myPage = myPagedData.fetch({index: pageRange.index});
            myPage.data.forEach(function(result){
                var status = result.getText({name: 'status'});
                var prefijoEvento = result.getText({name: 'custevent70'});
                var startdate = result.getValue({name: 'startdate'});
                var starttime = result.getValue({name: 'starttime'});
                if(status === "Confirmed")
                {
                  var jsonVal = '{"status":"'+status+'","prefijoEvento":"'+prefijoEvento+'","startdate":"'+startdate+'","starttime":"'+starttime+'"}';
                  recObj1.push(jsonVal);
                  count++;
                }
            });
        });
      var res = JSON.stringify(recObj1);
      return res;
    }

    function searchCustomer(authorEmail)
    {
		var customerid = null;
      	var cont = 0;
		search.create({
	           type: search.Type.CUSTOMER,
	     	   filters: [search.createFilter({name: 'email', operator: search.Operator.IS, values: [authorEmail]})],
	           columns: ['internalid']
	    }).run().each(function(result){
          	if(cont == 0)
	           customerid = result.getValue({name: 'internalid'});
          	cont++;
	        //return true;
	    });
      	log.error('cont: ', cont);
      	return customerid;
    }

    return {
        get: _get,
        post: _post
    };

});