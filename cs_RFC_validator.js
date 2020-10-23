	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope SameAccount
	*/

define(['N/currentRecord', 'N/log', 'N/ui/dialog'],
    function (currentRecord, log, dialog) {
        var record = currentRecord.get();

        function pageInit(context) { // {"currentRecord":{"id":"","type":"invoice","isDynamic":true},"mode":"copy or create or edit"}
            log.debug('Contexto en cambio',context);
        }

        function fieldChanged(context) {
            
            //if (context.currentRecord.type === 'invoice') {
                log.debug("",record.getValue('customform'));
                if (context.fieldId == 'custbody_cfdi_rfc') {
                    var rfc_text = record.getText('custbody_cfdi_rfc');
                    var rfc_validate = validarInput(rfc_text);
                    log.debug('Contexto', rfc_validate);
    
                    var options = {
                        title: "Validador de RFC",
                        message: "El RFC capturado no cumple los requisitos de validación. " +
                                "Por favor revisa nuevamente el RFC del cliente. " +
                                "Si el RFC es exactamente igual al de la cédula entregada por el cliente omite esta alerta."
                    };
    
                    if (!rfc_validate) {
                        dialog.alert(options);
                    }
                }
            //}
        }

        return {
            pageInit: pageInit,
            fieldChanged: fieldChanged
        };

        //Función para validar un RFC
        // Devuelve el RFC sin espacios ni guiones si es correcto
        // Devuelve false si es inválido
        // (debe estar en mayúsculas, guiones y espacios intermedios opcionales)
        function rfcValido(rfc, aceptarGenerico /*= true*/ ) {
            var re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
            var validado = rfc.match(re);

            if (!validado) //Coincide con el formato general del regex?
                return false;

            //Separar el dígito verificador del resto del RFC
            var digitoVerificador = validado.pop(),
                rfcSinDigito = validado.slice(1).join(''),
                len = rfcSinDigito.length,

                //Obtener el digito esperado
                diccionario = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
                indice = len + 1;
            var suma,
                digitoEsperado;

            if (len == 12) suma = 0
            else suma = 481; //Ajuste para persona moral

            for (var i = 0; i < len; i++)
                suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
            digitoEsperado = 11 - suma % 11;
            if (digitoEsperado == 11) digitoEsperado = 0;
            else if (digitoEsperado == 10) digitoEsperado = "A";

            //El dígito verificador coincide con el esperado?
            // o es un RFC Genérico (ventas a público general)?
            if ((digitoVerificador != digitoEsperado) &&
                (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000"))
                return false;
            else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000")
                return false;
            return rfcSinDigito + digitoVerificador;
        }


        //Handler para el evento cuando cambia el input
        // -Lleva la RFC a mayúsculas para validarlo
        // -Elimina los espacios que pueda tener antes o después
        function validarInput(rfcValue) {
            var rfc = rfcValue.trim().toUpperCase(),
                //resultado = document.getElementById("resultado"),
                valido;

            var rfcCorrecto = rfcValido(rfc, true); // ⬅️ Acá se comprueba

            if (rfcCorrecto) {
                valido = true;
                //valido = "Válido";
                //resultado.classList.add("ok");
            } else {
                valido = false;
                //valido = "No válido"
                //resultado.classList.remove("ok");
            }

            return valido;

            /*             resultado.innerText = "RFC: " + rfc +
                            "\nResultado: " + rfcCorrecto +
                            "\nFormato: " + valido; */
        }
    });