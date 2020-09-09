/**

  * @NApiVersion 2.x  
  * @NScriptType Restlet
  * @NModuleScope SameAccount

  */

 define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
  function doGet(params) {
    //var nuevo = new URL(params);
    //var objNuevo = nuevo.searchParams;

    //var nuevoParametro = objNuevo.parametro;
    var objJson;

    if (typeof params === "object") {
      objJson = params;
    } else {
      objJson = JSON.parse(params);
    }
    //custentity286
    log.debug("params", objJson);

    var objTest = {
      "id": objJson.id,
      "Nombre": objJson.nombre,
      "Direccion": objJson.direccion,
      "Edad": objJson.edad
      ,
      "nuevoParametro": params.parametro
    }

    return objTest;
    //return params;
  }
  function doPost(params) {
    var objJson;

    if (typeof params === "object") {
      objJson = params;
    } else {
      objJson = JSON.parse(params);
    }
    //custentity286
    log.debug("params", objJson);

    // validar si existe

    var objSearch = search.create({ type: search.Type.CUSTOMER, filters: [{ name: "email", operator: "is", values: [objJson.correo] }] });
    var objSearch2 = search.load({ id:"customsearch7872" });
	var result2 = objSearch2.run().getRange({start:0,end:1000});
    var nuevo2 = {
      "result": result2,
      "busqueda": objSearch2
    }
    return nuevo2;
    var resultSearch = objSearch.run().getRange({ start: 0, end: 1 });
    
    if (resultSearch.length === 0) {
      //Cliente nuevo
      var objClientNew = record.create({
        type: record.Type.CUSTOMER,
        isDynamic: true
      });

      objClientNew.setValue({ fieldId: "firstname", value: objJson.nombre });
      objClientNew.setValue({ fieldId: "lastname", value: objJson.apellido });
      objClientNew.setValue({ fieldId: "email", value: objJson.correo });
      objClientNew.setValue({ fieldId: "custentity286", value: objJson.cp });
      try {
        var idCliente = objClientNew.save();
        var regreso = {
          "Cliente": idCliente,
          "status": "ok"
        }
        return regreso;
      }
      catch (err) {
        return { "err": err }
      }

    } else {
      
      var internalBusqueda = JSON.parse(JSON.stringify(resultSearch));
      var internalId = internalBusqueda[0].values.internalId[0].value;
      //Editar Cliente 
      var objClient = record.load({
        id: internalId,
        type: record.Type.CUSTOMER,
        isDynamic: true
      });
      objClient.setValue({ fieldId: "custentity286", value: objJson.cp });
      try {
        objClient.save();
        var regreso = {
          "Cliente": objClient.getValue({ fieldId: "custentity286" }),
          "status": "ok"
        }
        return regreso;
      }
      catch (err) {
        return { "err": err }
      }

    }

  }

  return {
    get: doGet,
    post: doPost
  };
});