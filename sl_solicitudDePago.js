/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/record', 'N/log', 'N/render', 'N/xml', 'N/runtime', 'N/config'],

    function (record, log, render, xmlMod, runtime, config) {

        function onRequest(context) {
            /*var configRecObj = config.load({ type: config.Type.USER_PREFERENCES });
            var interfaceLanguage = configRecObj.getValue({ fieldId: 'LANGUAGE' });
            log.debug('Interface Language', interfaceLanguage);*/
            /*var numLines = cliente.getLineCount({sublistId: 'addressbook'});
            log.debug('numLines: ', numLines);
            var label = cliente.getSublistValue({sublistId: "addressbook", fieldId: "label", line: 1});
            log.debug('label: ', label);
            var id = cliente.getSublistValue({sublistId: "addressbook", fieldId: "id", line: 1});
            log.debug('id: ', id);
            var isresidential = cliente.getSublistValue({sublistId: "addressbook", fieldId: "isresidential", line: 1});
            log.debug('isresidential: ', isresidential);
            var addrtext = cliente.getSublistValue({sublistId: "addressbook", fieldId: "addrtext", line: 1});
            log.debug('addrtext: ', addrtext);*/

            try
            {
			  var userObj = runtime.getCurrentUser();
              log.debug('userObj: ', userObj);

              var recId = context.request.parameters.recId;
              var purchaseorder = record.load({type: 'purchaseorder', id: recId}); // '650722'
              var location = purchaseorder.getValue({fieldId: 'location'});
              var locationText = purchaseorder.getText({fieldId: 'location'});
              var fecha = new Date();
              fecha = ('0' + fecha.getDate()).slice(-2) + "-" + ('0' + (fecha.getMonth() + 1)).slice(-2) + "-" + fecha.getFullYear();
              var empresaQuePaga = "KALONI HOLDING GROUP";

              var vendorId = purchaseorder.getValue({fieldId: 'entity'});
              var vendor = record.load({ type: 'vendor', id: vendorId, isDynamic: true});
              var fechaDePago = "";
              var tipoDePago = "";
              var chequeAnombreDe = vendor.getValue({fieldId: 'companyname'});
              var banco = "";
              var cuenta = vendor.getValue({fieldId: 'accountnumber'});
              var cuentaClave = "";
              var montoApagar = purchaseorder.getValue({fieldId: 'total'});
              var moneda = purchaseorder.getText({fieldId: 'currency'});
              var comentarios = "";
              var nota = "NOTA: ANEXAR COMPROBANTES DE PAGO";
              var imageBack = getImageBackGround(location);
              
              var employee = purchaseorder.getText({fieldId: 'employee'});
              var prN = purchaseorder.getText({fieldId: 'custbody142'}); // PRIMER NIVEL
              var seN = purchaseorder.getText({fieldId: 'custbody143'}); // SEGUNDO NIVEL
              var teN = purchaseorder.getText({fieldId: 'custbody144'}); // TERCER NIVEL
              var cuN = purchaseorder.getText({fieldId: 'custbody145'}); // CUARTO NIVEL
              
              //var renal = checado(purchaseorder.getValue({fieldId: 'custevent232'}));

              //var label_edadPaciente = purchaseorder.getField({ fieldId: 'custevent332' }).label;
              //var label_nombrePaciente = cliente.getField({ fieldId: 'altname' }).label;
              var trSp = '<tr><td></td></tr>';

              var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
              xml += '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n';
              xml += '<pdf>\n';
              xml += '<body background-image="' + xmlMod.escape({xmlText: imageBack}) + '" >';
              xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">SOLICITUD DE PAGO</p>';

              xml += "<table style=\"width:100%;font-size:13px; font-family:'Aria', sans-serif\">";
              xml += '<tr>';
              xml += '<td style=\"border: 2px solid black;\">UNIDAD DE NEGOCIO:</td>';
              xml += '<td style=\"font-weight:bold;border: 2px solid black;\">' + locationText + '</td>';
              xml += '<td style=\"width: 10px;\"></td>';
              xml += '<td style=\"border: 2px solid black;\">FECHA DE SOLICITUD:</td>';
              xml += '<td style=\"font-weight:bold;border: 2px solid black;\">' + fecha + '</td>';
              xml += '</tr>';
              xml += trSp;
              xml += '<tr>';
              xml += '<td style=\"border: 2px solid black;\">EMPRESA QUE PAGA:</td>';
              xml += '<td style=\"font-weight:bold;border: 2px solid black;\">' + empresaQuePaga + '</td>';
              xml += '<td style=\"width: 10px;\"></td>';
              xml += '<td style=\"border: 2px solid black;\">FECHA DE PAGO:</td>';
              xml += '<td style=\"font-weight:bold;border: 2px solid black;\">' + fechaDePago + '</td>';
              xml += '</tr>';
              xml += '</table>';

              xml += '<p></p>';
              xml += "<table style=\"width:100%;font-size:13px; font-family:'Aria', sans-serif\">";
              xml += '<tr>';
              xml += '<td align=\"right\">TIPO DE PAGO:</td>';
              xml += '<td style=\"border: 2px solid black;\"></td>';
              xml += '<td align=\"right\">CHEQUE</td>';
              xml += '<td style=\"border: 2px solid black;\"></td>';
              xml += '<td align=\"right\">TRANSFERENCIA</td>';
              xml += '<td style=\"border: 2px solid black;\"></td>';
              xml += '<td align=\"right\">EFECTIVO</td>';
              xml += '<td style=\"border: 2px solid black;\"></td>';
              xml += '</tr>';
              xml += '</table>';

              xml += '<p></p>';
              xml += "<table style=\"width:100%;font-size:13px; font-family:'Aria', sans-serif\">";
              xml += '<tr>';
              xml += '<td align=\"right\">CHEQUE A NOMBRE DE:</td>';
              xml += '<td colspan=\"3\" style=\"border: 2px solid black;font-weight:bold;\">' + chequeAnombreDe + '</td>';
              xml += '</tr>';
              xml += trSp;
              xml += '<tr>';
              xml += '<td align=\"right\">BANCO:</td>';
              xml += '<td style=\"border: 2px solid black;font-weight:bold;\">' + banco + '</td>';
              xml += '<td align=\"right\">CUENTA:</td>';
              xml += '<td width=\"30%\" style=\"border: 2px solid black;font-weight:bold;\">' + cuenta + '</td>';
              xml += '</tr>';
              xml += trSp;
              xml += '<tr>';
              xml += '<td align=\"right\">CUENTA CLABE:</td>';
              xml += '<td colspan=\"3\" style=\"border: 2px solid black;font-weight:bold;\">' + cuentaClave + '</td>';
              xml += '</tr>';
              xml += trSp;
              xml += '<tr>';
              xml += '<td align=\"center\" style=\"border: 2px solid black;\">MONTO A PAGAR:</td>';
              xml += '<td align=\"center\" style=\"border: 2px solid black;font-weight:bold;\">' + montoApagar + '</td>';
              xml += '<td align=\"center\" colspan=\"2\" style=\"border: 2px solid black;font-weight:bold;\">' + moneda + '</td>';
              xml += '</tr>';
              xml += trSp;
              xml += '<tr>';
              xml += '<td colspan=\"4\" style=\"border: 2px solid black;font-weight:bold;\"></td>';
              xml += '</tr>';
              xml += '<tr>';
              xml += '<td colspan=\"4\" style=\"border: 2px solid black;\"><div style=\"height: 50px;\"></div></td>';
              xml += '</tr>';
              xml += trSp;
              xml += '<tr>';
              xml += '<td align=\"center\" colspan=\"4\">'+nota+'</td>'; // style=\"height:50px;\"  height=\"50px\"   rowspan=\"4\"
              xml += '</tr>';
              xml += '</table>';

              xml += '<p></p><p></p>';
              xml += "<table style=\"width:100%;font-size:12px; font-family:'Aria', sans-serif\">";
              xml += '<tr>';
              xml += '<td><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>' + employee + '</b><br />____________________<br />SOLICITA</p></td>';
              xml += '</tr>';
              xml += '</table>';
              
              xml += '<p></p><p></p>';
              xml += "<table style=\"width:100%;font-size:12px; font-family:'Aria', sans-serif\">";
              xml += '<tr>';
              xml += '<td><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>' + prN + '</b><br />____________________<br />AUTORIZA</p></td>';
              xml += '<td><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>' + seN + '</b><br />____________________<br />AUTORIZA</p></td>';
              xml += '<td><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>' + teN + '</b><br />____________________<br />AUTORIZA</p></td>';
              xml += '<td><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b>' + cuN + '</b><br />____________________<br />AUTORIZA</p></td>';
              xml += '</tr>';
              xml += '</table>';
              
              xml += '<p></p>';
              xml += "<table style=\"width:100%;font-size:12px; font-family:'Aria', sans-serif\">";
              xml += '<tr>';
              xml += '<td><p style="align:center;font-family:Aria, sans-serif; font-size:12px;"><b></b><br />____________________<br />RECIBE</p></td>';
              xml += '</tr>';
              xml += '</table>';

            /*
              xml += '<p></p><p></p>';
              xml += '<p style="align:center"><img src="' + avisoPrivacidadbase64 + '" width="100" height="100" /></p>';
              xml += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br/>FIRMA DEL PACIENTE</b></p>';
              xml += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>' + altname + '</b></p>';
              xml += '<div style=\"page-break-after: always;\"></div>';
              xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p>';

              xml += '<p style="align:center"><img src="' + contratoServiciobase64 + '" width="100" height="100" /></p>';
              xml += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br />FIRMA DEL PACIENTE<br />' + altname + '</b></p>';*/

              xml += '</body></pdf>';
            }catch(e){
              log.debug('Exception: ', e);
            }
            context.response.renderPdf({ xmlString: xml});
        }

        function getImageBackGround(sucursal) {
            var imageBack = "";
            
            if (sucursal != "22" && sucursal != "35" && sucursal != "36" && sucursal != "23" && sucursal != "24" && sucursal != "25" && sucursal != "37" && sucursal != "21" && sucursal != "26" && sucursal != "27" && sucursal != "28") {
                if (sucursal == "52") {
                    imageBack = "https://3559763.app.netsuite.com/core/media/media.nl?id=4035765&c=3559763&h=8491baae9096be2877bf";
                } else {
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
                }
            }
            else {
                if (sucursal == "22") // Altavista KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5";
                if (sucursal == "35") // Can-Cun KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
                if (sucursal == "36") // Chihuahua KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa";
                if (sucursal == "23") // Guadalajara KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773";
                if (sucursal == "24") // Monterrey KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2";
                if (sucursal == "25") // Polanco KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7";
                if (sucursal == "37") // Puebla KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2";
                if (sucursal == "21") // Santa FE KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d";
                if (sucursal == "26") // Satelite KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4";
                if (sucursal == "27") // Tijuana KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7";
                if (sucursal == "28") // Veracruz KHG
                    imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20";
            }
            return imageBack;
        }

        function sucursalReal(sucursalText) {
            var sucSinModif = sucursalText;
            var largoSucursal_base = sucursalText.length;
            largoSucursal_menosKHG = largoSucursal_base - 4;
        
            var validateKHG  = sucursalText.slice(largoSucursal_menosKHG, largoSucursal_base);
        
            if (validateKHG == ' KHG') {
                var sucursalFinal = sucursalText.slice(0, largoSucursal_menosKHG);
                return sucursalFinal;
            } else {
                return sucSinModif;
            }
        }

        function checado(checks) {
            var check = "";
            if (checks == true) {
                //var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
                var pathCheck = "https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054";
                var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
                check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathCheck }) + "\" />";
                check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNull }) + "\" />";
            } else if (checks == false) {
                //var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
                var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
                var pathRemove = "https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c";
                check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNull }) + "\" />";
                check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathRemove }) + "\"/>";                
            } else if (checks == "SI") {
                //var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
                var pathCheck = "https://system.na2.netsuite.com/core/media/media.nl?id=2365455&c=3559763&h=88dcdca9734f9f4cf054";
                var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
                check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathCheck }) + "\" />";
                check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNull }) + "\" />";
            } else if (checks == "NO") {
                //var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
                var pathNull = "https://system.na2.netsuite.com/core/media/media.nl?id=2366779&c=3559763&h=6d6688562fadbc981b7f";
                var pathRemove = "https://system.na2.netsuite.com/core/media/media.nl?id=2365456&c=3559763&h=a4eccd8ad92cb076b85c";
                check = "<img style=\"display:inline;margin-right: 3px;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathNull }) + "\" />";
                check += "<img style=\"display:inline;\" height=\"13px\" width=\"13px\" src=\"" + xmlMod.escape({ xmlText: pathRemove }) + "\"/>";                
            }
            return check;
        }

                /**
         * Funcion que retorna la los años enteros transcurridos entre dos fechas
         * @param {string} fechaAntigua - se ingresa la fecha inicial desde la que se quiere calcular, por ejemplo: una fecha de nacimiento  
         * @param {string} fechaReciente - se ingresa la fecha final relativa al calculo, por ejemplo: la fecha actual
         */
        function calcYearInt(fechaAntigua, fechaReciente) {
            var edad = 0;
            var separador = '';
            var fR = fechaReciente.length;
            var fA = fechaAntigua.length;

            //extraer dia, mes y año del caso analizado
            separador = fechaReciente.search('/');
            var diaCaso = fechaReciente.substring(0, separador);
            fechaReciente = fechaReciente.substring(separador + 1, fR);
            fR = fechaReciente.length;
            separador = fechaReciente.search('/');
            var mesCaso = fechaReciente.substring(0, separador);
            fechaReciente = fechaReciente.substring(separador + 1, fR);
            var anioCaso = fechaReciente.substring(0, 4);

            //extraer dia, mes y año de la fecha de nacimiento del paciente
            separador = fechaAntigua.search('/');
            var diaNac = fechaAntigua.substring(0, separador);
            fechaAntigua = fechaAntigua.substring(separador + 1, fA);
            fA = fechaAntigua.length;
            separador = fechaAntigua.search('/');
            var mesNac = fechaAntigua.substring(0, separador);
            fechaAntigua = fechaAntigua.substring(separador + 1, fA);
            var anioNac = fechaAntigua.substring(0, 4);

            //calculo de las variables para obtener los días transcurridos entre ambas fechas
            var calcAnio = (parseInt(anioCaso) - parseInt(anioNac)) * 365.25;
            var calcMes = (parseInt(mesCaso) - parseInt(mesNac)) * 30;
            var calcDia = (parseInt(diaCaso) - parseInt(diaNac)) * 1;
            var calcEdad = (calcAnio + calcMes + calcDia) / 365.25;

            //redondeo al entero proximo menor para obtener los años actuales entero entre las dos fechas
            //y no cambia a menos que la fecha reciente cumpla un año entero relativo a la fecha antigua
            edad = Math.floor(calcEdad);

            edad = (isNaN(edad) == true) ? "" : edad;

            return edad;
        }



        return {
            onRequest: onRequest
        };

    });
