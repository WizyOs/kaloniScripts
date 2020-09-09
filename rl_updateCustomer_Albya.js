/**

  * @NApiVersion 2.x  
  * @NScriptType Restlet
  * @NModuleScope SameAccount

  */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
    function doGet(params) {}

    function doPost(params) {
        log.debug("params", params);

        var objJson = JSON.parse(params);
        var param_idCustomer = objJson.idCustomer;
        var param_custentity25 = objJson.suc;
        var param_altname = objJson.altname;
        var param_custentity234 = objJson.curp;
        var param_defaultaddress = objJson.address;
        var param_custentity_sexo = objJson.gender;
        var param_mobilephone = objJson.mobilephone;

        var objaltname = param_altname.split(' ');
        var param_firstname = objaltname[0];
        var param_secondname = "";
        for (var n in objaltname) {
            var largo = objaltname.length;
            var nCount = parseInt(n);

            if (largo > 2 && nCount > 0 && (nCount + 1) < largo) {
                param_secondname += (objaltname[n] + " ");
            } else if ((nCount + 1) == largo) {
                param_secondname += objaltname[n];
            }
            //log.debug("for", n + " " + largo + " o " + objaltname[n]);
        }

        //log.debug('nombre', "objaltname " + objaltname + ' ' + param_firstname + ' ' + param_secondname);

        try {
            //FIXME:Actualiza los datos del lead existente y lo pasa a customero

            // ACTUALIZACION DE DATOS LEAD A CUSTOMERO
            objRecord_updateCustomer = record.load({ // Carga objeto CUSTOMER
                type: record.Type.CUSTOMER,
                id: param_idCustomer,
                isDynamic: true
            });
            objRecord_updateCustomer.setText({ // Set CELULAR
                fieldId: 'firstname',
                text: param_firstname
            });
            objRecord_updateCustomer.setText({ // Set CELULAR
                fieldId: 'lastname',
                text: param_secondname
            });
            objRecord_updateCustomer.setText({ // Set CELULAR
                fieldId: 'mobilephone',
                text: param_mobilephone
            });
            objRecord_updateCustomer.setValue({ // Set Subsidiaria a Albya
                fieldId: "subsidiary",
                value: "19"
            });
            objRecord_updateCustomer.setValue({ // Set PAIS a Mexico
                fieldId: "custentity137",
                value: "1"
            });
            objRecord_updateCustomer.setValue({ // Set Tipo de cliente a Customero
                fieldId: "entitystatus",
                value: "26"
            });
            objRecord_updateCustomer.setText({ // Set Sucursal
                fieldId: "custentity25",
                text: param_custentity25
            });
            objRecord_updateCustomer.setText({ // Set CURPP
                fieldId: "custentity234",
                text: param_custentity234
            });
            objRecord_updateCustomer.setText({ // Set Direccion
                fieldId: "defaultaddress",
                text: param_defaultaddress
            });
            objRecord_updateCustomer.setValue({ // Set Genero
                fieldId: "custentity_sexo",
                value: param_custentity_sexo
            });

            objRecord_SaveCustomer_id = objRecord_updateCustomer.save({
                enableSourcing: false,
                ignoreMandatoryFields: true
            });
            return {
                idCustomer: objRecord_SaveCustomer_id,
                success: "OK"
            }
        } catch (error) {
            return {
                upCustomer: "No Update " + error
            }
        }
    }

    return {
        get: doGet,
        post: doPost
    }
});
