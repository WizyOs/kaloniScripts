/* function userEventBeforeSubmit(){
    var id_event = nlapiGetRecordId();
    var id = nlapiGetUser();
    var length = nlapiGetLineItemCount('attendee');

    if(id_event) {
        var promise = new Promise(function(resolve, reject){
            resolve(nlapiLoadRecord('calendarevent', id_event))
        })
        return promise.then(function(val){
            var event = val
            var date = event.fields.startdate
            var starttime = event.fields.starttime
            var endtime = event.fields.endtime
            console.log(date)
            if(date == nlapiGetFieldValue('startdate') && starttime == nlapiGetFieldValue('starttime') && endtime == nlapiGetFieldValue('endtime')){

                return true;

            }
            nlapiLogExecution('DEBUG', 'function sendEmail(): ', 'if line 94');
            return sendEmail()
        })
    } else {
        nlapiLogExecution('DEBUG', 'function sendEmail(): ', 'else line 97');
        return sendEmail()
    }

    function sendEmail() {
        var title = title = '🗓 Kaloni | ' + nlapiGetFieldValue('custevent79');;
        if(nlapiGetContext().subsidiary  != '6') {
            return true;
        }
        if(nlapiGetFieldValue('custevent70') == '15'){
            return true;
        }

        var message = nlapiGetFieldValue('message') ? nlapiGetFieldValue('message') : 'Message';


        var infProce='';
        if(nlapiGetFieldValue('custevent70') == '1'||nlapiGetFieldValue('custevent70') == '2'){
            infProce+= '<p style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #346094; font-weight: bold;">Equipo médico de procedimiento</p>';
            infProce+= '<p style="font-size: 15px; font-family: Helvetica, Arial, sans-serif;  font-weight: bold;"><b>-Enfermeria</b></p>';
            infProce+= '<p style="font-size: 15px; font-family: Helvetica, Arial, sans-serif;  font-weight: bold;"><b>-Médico</b></p>';
            infProce+= '<p style="font-size: 15px; font-family: Helvetica, Arial, sans-serif;  font-weight: bold;"><b>-Sala Procedimiento</b></p></br>';
            var countSA =nlapiGetLineItemCount('resource');
            var urlLocatio="#";
            if(countSA!="0"){
                for (var i = 1; i <= countSA; i++) {

                    var objResourse=nlapiGetLineItemValue('resource', 'resource', i);

                    if(objResourse=='113'){
                        //Can cun
                        urlLocatio="https://www.google.com/maps/place/Av.+Sayil+MZ+5+LT+2A+SM+6,+Zona+Hotelera,+77500+Canc%C3%BAn,+Q.R.,+M%C3%A9xico/@21.1487325,-86.8211587,303m/data=!3m1!1e3!4m13!1m7!3m6!1s0x8f4c295797c8e73d:0xe69446a8bec2ad47!2sAv.+Sayil+MZ+5+LT+2A+SM+6,+Zona+Hotelera,+77500+Canc%C3%BAn,+Q.R.,+M%C3%A9xico!3b1!8m2!3d21.1489723!4d-86.8203532!3m4!1s0x8f4c295797c8e73d:0xe69446a8bec2ad47!8m2!3d21.1489723!4d-86.8203532";

                    }

                    if(objResourse=='115'){
                        //chihuahua
                        urlLocatio="https://www.google.com.mx/maps/place/Kaloni+Chihuahua/@28.6632907,-106.131237,17z/data=!3m1!4b1!4m5!3m4!1s0x86ea42f3d7598d65:0x5c48caaecb79c7c3!8m2!3d28.663286!4d-106.129043";

                    }
                    if(objResourse=='85'){
                        //guadalajara
                        urlLocatio="https://www.google.com.mx/maps/place/Kaloni+Guadalajara/@20.7097187,-103.4142111,17.02z/data=!4m8!1m2!2m1!1sKaloni+Guadalajara!3m4!1s0x8428af029486d7cd:0xe2edf41d5152bbb1!8m2!3d20.709042!4d-103.413869";

                    }
                    if(objResourse=='83'){
                        //moterrey
                        urlLocatio="https://www.google.com.mx/maps/place/Kaloni+Monterrey/@25.6563658,-100.367843,17z/data=!3m1!4b1!4m5!3m4!1s0x8662bdee8eb6b863:0x352ca11c7c2dc840!8m2!3d25.656361!4d-100.365649";

                    }
                    if(objResourse=='143'){
                        //satelite
                        urlLocatio="https://www.google.com.mx/maps/place/Kaloni+Sat%C3%A9lite/@19.513208,-99.235372,17z/data=!3m1!4b1!4m5!3m4!1s0x85d202d7da1b98d3:0x3acfe835f352bc3d!8m2!3d19.513203!4d-99.233178";

                    }
                    if(objResourse=='81'){
                        //santa fe
                        urlLocatio="https://www.google.com.mx/maps/place/Kaloni+Science+Center/@19.3618403,-99.2802661,18.33z/data=!4m15!1m9!4m8!1m0!1m6!1m2!1s0x85d200cc180a8e53:0xb0abc3656acb8474!2sKaloni+Science+Center,+Av.+Vasco+de+Quiroga+3900,+Lomas+de+Santa+Fe,+Contadero,+05300+Ciudad+de+M%C3%A9xico,+CDMX!2m2!1d-99.279089!2d19.360818!3m4!1s0x85d200cc180a8e53:0xb0abc3656acb8474!8m2!3d19.360818!4d-99.279089";

                    }
                    if(objResourse=='82'){
                        //tijuana
                        urlLocatio="https://www.google.com.mx/maps/place/Kaloni+Tijuana/@32.5210885,-117.010048,17z/data=!3m1!4b1!4m5!3m4!1s0x80d9486abc7f725d:0xb390a60ec6bb3a6e!8m2!3d32.521084!4d-117.007854";

                    }
                    if(objResourse=='84'){
                        //veracruz
                        urlLocatio="https://www.google.com.mx/maps/place/Kaloni+Cl%C3%ADnica+Veracruz/@19.1598744,-96.1080673,17z/data=!3m1!4b1!4m5!3m4!1s0x85c340de6e82cbef:0x67b7520c313d161c!8m2!3d19.1598693!4d-96.1058733";

                    }
                    if(objResourse=='118'){
                        //puebla
                        urlLocatio="https://www.google.com.mx/maps/place/Kaloni+Puebla/@18.9959491,-98.281204,17z/data=!3m1!4b1!4m5!3m4!1s0x85cfb871245c659d:0xa44b57ab61a2295e!8m2!3d18.995944!4d-98.27901";

                    }

                    infProce+= '<div><a href="'+urlLocatio+'" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; background-color: green; border-top: 12px solid green; border-bottom: 12px solid green; border-right: 18px solid green; border-left: 18px solid green; display: inline-block; margin:5px;">Ver ubicación en google map´s</a></div>';
                }
            }

        }else if(nlapiGetFieldValue('custevent70') == '12'){

            var urlLocatioVal="";
            infProce='';
            if(nlapiGetFieldValue('custevent2')=='35'){
                //Can cun
                urlLocatioVal="https://www.google.com/maps/place/Av.+Sayil+MZ+5+LT+2A+SM+6,+Zona+Hotelera,+77500+Canc%C3%BAn,+Q.R.,+M%C3%A9xico/@21.1487325,-86.8211587,303m/data=!3m1!1e3!4m13!1m7!3m6!1s0x8f4c295797c8e73d:0xe69446a8bec2ad47!2sAv.+Sayil+MZ+5+LT+2A+SM+6,+Zona+Hotelera,+77500+Canc%C3%BAn,+Q.R.,+M%C3%A9xico!3b1!8m2!3d21.1489723!4d-86.8203532!3m4!1s0x8f4c295797c8e73d:0xe69446a8bec2ad47!8m2!3d21.1489723!4d-86.8203532";

            }

            if(nlapiGetFieldValue('custevent2')=='36'){
                //chihuahua
                urlLocatioVal="https://www.google.com.mx/maps/place/Kaloni+Chihuahua/@28.6632907,-106.131237,17z/data=!3m1!4b1!4m5!3m4!1s0x86ea42f3d7598d65:0x5c48caaecb79c7c3!8m2!3d28.663286!4d-106.129043";

            }
            if(nlapiGetFieldValue('custevent2')=='23'){
                //guadalajara
                urlLocatioVal="https://www.google.com.mx/maps/place/Kaloni+Guadalajara/@20.7097187,-103.4142111,17.02z/data=!4m8!1m2!2m1!1sKaloni+Guadalajara!3m4!1s0x8428af029486d7cd:0xe2edf41d5152bbb1!8m2!3d20.709042!4d-103.413869";

            }
            if(nlapiGetFieldValue('custevent2')=='24'){
                //moterrey
                urlLocatioVal="https://www.google.com.mx/maps/place/Kaloni+Monterrey/@25.6563658,-100.367843,17z/data=!3m1!4b1!4m5!3m4!1s0x8662bdee8eb6b863:0x352ca11c7c2dc840!8m2!3d25.656361!4d-100.365649";

            }
            if(nlapiGetFieldValue('custevent2')=='26'){
                //satelite
                urlLocatioVal="https://www.google.com.mx/maps/place/Kaloni+Sat%C3%A9lite/@19.513208,-99.235372,17z/data=!3m1!4b1!4m5!3m4!1s0x85d202d7da1b98d3:0x3acfe835f352bc3d!8m2!3d19.513203!4d-99.233178";

            }
            if(nlapiGetFieldValue('custevent2')=='21'){
                //santa fe
                urlLocatioVal="https://www.google.com.mx/maps/place/Kaloni+Science+Center/@19.3618403,-99.2802661,18.33z/data=!4m15!1m9!4m8!1m0!1m6!1m2!1s0x85d200cc180a8e53:0xb0abc3656acb8474!2sKaloni+Science+Center,+Av.+Vasco+de+Quiroga+3900,+Lomas+de+Santa+Fe,+Contadero,+05300+Ciudad+de+M%C3%A9xico,+CDMX!2m2!1d-99.279089!2d19.360818!3m4!1s0x85d200cc180a8e53:0xb0abc3656acb8474!8m2!3d19.360818!4d-99.279089";

            }
            if(nlapiGetFieldValue('custevent2')=='27'){
                //tijuana
                urlLocatioVal="https://www.google.com.mx/maps/place/Kaloni+Tijuana/@32.5210885,-117.010048,17z/data=!3m1!4b1!4m5!3m4!1s0x80d9486abc7f725d:0xb390a60ec6bb3a6e!8m2!3d32.521084!4d-117.007854";

            }
            if(nlapiGetFieldValue('custevent2')=='28'){
                //veracruz
                urlLocatioVal="https://www.google.com.mx/maps/place/Kaloni+Cl%C3%ADnica+Veracruz/@19.1598744,-96.1080673,17z/data=!3m1!4b1!4m5!3m4!1s0x85c340de6e82cbef:0x67b7520c313d161c!8m2!3d19.1598693!4d-96.1058733";

            }
            if(nlapiGetFieldValue('custevent2')=='37'){
                //puebla
                urlLocatioVal="https://www.google.com.mx/maps/place/Kaloni+Puebla/@18.9959491,-98.281204,17z/data=!3m1!4b1!4m5!3m4!1s0x85cfb871245c659d:0xa44b57ab61a2295e!8m2!3d18.995944!4d-98.27901";

            }
            if(nlapiGetFieldValue('custevent2')=='22'){
                //altavista
                urlLocatioVal="https://www.google.com.mx/maps/place/Kaloni+Altavista/@19.348965,-99.2003647,17z/data=!3m1!4b1!4m5!3m4!1s0x85d2001b207b134d:0x362ae12d944ac07c!8m2!3d19.348965!4d-99.198176";

            }
            if(nlapiGetFieldValue('custevent2')=='25'){
                //polanco
                urlLocatioVal="https://www.google.com.mx/maps/place/Kaloni+Polanco/@19.4356245,-99.1982809,17z/data=!3m1!4b1!4m5!3m4!1s0x85d20203f9f6721b:0x207c6402eadffb41!8m2!3d19.4356245!4d-99.1960922";

            }


            infProce+= '<div><a href="'+urlLocatioVal+'" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; background-color: green; border-top: 12px solid green; border-bottom: 12px solid green; border-right: 18px solid green; border-left: 18px solid green; display: inline-block; margin:5px;">Ver ubicación en google map´s</a></div>';
        }
        /*

        133=can cun
        115= chihuahua
        85= guadalajara
        83= moterrey
        143= satelite
        81= santa fe
        82=tijuana
        84=veracruz
        118= puebla
          */
        /*

        22 ALTA VISTA
        35 cancun
        36 chihuahua
        23=gudalajara
        24=moterrey
        25=polanco
        37=puebla
        21=santa fe
        26=satelite
        27 =tijuana
        28=veracruz

          */

        /*var links = [
            { title: 'google', name: 'Google Calendar' },
            { title: 'outlookonline', name: 'Outlook Online' },
            { title: 'yahoo', name: 'Yahoo! Calendar' },
            { title: 'outlook', name: 'Outlook' },
            { title: 'ical', name: 'iCalendar' },
        ]
        var name = nlapiGetContext().name
        var email = nlapiGetContext().email

        var dateStart = nlapiGetFieldValue('startDate').split("/")
        var dateEnd = nlapiGetFieldValue('endDate').split("/")
        var hourStart = nlapiGetFieldValue('starttime').split(":")
        var minutesStart = hourStart[1].split(' ');
        var hoursEnd = nlapiGetFieldValue('endtime').split(":")
        var minutesEnd = hoursEnd[1].split(' ');

        var timeStart = minutesStart[1] == 'pm' && hourStart[0] < 12 ? parseInt(hourStart[0]) + 12 : hourStart[0]
        var starDate = dateStart[2] + '-' + dateStart[1] + '-' + dateStart[0] + ' ' + timeStart + ':' + minutesStart[0]
        var suc_bto = nlapiGetFieldText('custevent2');

        var timeEnd = minutesEnd[1] == 'pm' && hoursEnd[0] < 12 ? parseInt(hoursEnd[0]) + 12 : hoursEnd[0]
        var endDate = dateEnd[2] + '-' + dateEnd[1] + '-' + dateEnd[0] + ' ' + timeEnd + ':' + minutesEnd[0]

        var item = ''
        links.forEach(function(link) {
            item+= '<a id="fl_ical" href="https://addtocalendar.com/atc/' +
                link.title + '?f=m&e[0][date_start]='+
                encodeURIComponent(starDate) +'&e[0][date_end]='+
                encodeURIComponent(endDate) +'&e[0][timezone]=America%2FMexico_City&e[0][title]='+
                encodeURIComponent(title) +'&e[0][description]='+
                encodeURIComponent(message)+'&e[0][location]='+
                encodeURIComponent(title)+ '&e[0][organizer]='+
                encodeURIComponent(name) +'&e[0][organizer_email]='+
                encodeURIComponent(email) +'&e[0][privacy]=public" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; background-color: #346094; border-top: 12px solid #346094; border-bottom: 12px solid #346094; border-right: 18px solid #346094; border-left: 18px solid #346094; display: inline-block; margin:5px;">' + link.name + '</a>'
        })

        var body = '<div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">'+
            '<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" valign="top" class="bgBody" >'+
            '<tr>'+
            '<td style="text-align: justify;">'+
            message +
            '</td>'+
            '</tr>' +
            '    <tr><td height="1" style="border-bottom:1px solid #DAE0E4">&nbsp;</td></tr>'+
            '<tr>'+
            '<td style="text-align: center;">'+
            '  <p style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #346094; font-weight: bold;">Detalles de su cita</p>'+
            '  <p align="left" style="font-size: 15px; font-family: Helvetica, Arial, sans-serif; color: #00000f; font-weight: bold;">Sucursal: ' + suc_bto + '</p>'+
            '  <p align="left" style="font-size: 15px; font-family: Helvetica, Arial, sans-serif; color: #00000f; font-weight: bold;">Fecha y hora: ' + starDate + '</p>'+
            '</td>'+
            '</tr>'+
            '<tr><td height="1" style="border-bottom:1px solid #DAE0E4">&nbsp;</td></tr>'+
            '<tr>'+
            '<td style="text-align: center;">'+
            '  <p style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #346094; font-weight: bold;">Seleccione una opción para ver su cita:</p>'+
            item +
            '</td>'+
            '</tr>'+
            '<tr>'+
            '<td style="text-align:center">'+
            infProce +
            '</td>'+
            '</tr>'+


            '<tr><td height="54" style="border-bottom:1px solid #DAE0E4">&nbsp;</td></tr>'+
            '<tr><td height="28"></td></tr>'+
            '<tr>'+
            '<td valign="top" align="center">'+
            '<div class="contentEditableContainer contentTextEditable">'+
            '<div class="contentEditable" style="color:#A8B0B6; font-size:15px;line-height: 16px;font-family: Helvetica, Arial, sans-serif;">' +
            '<p>Confirmación de citas Kaloni</p>'+
            '</div>'+
            '</div>'+
            '</td>'+
            '</tr>'+
            '<tr>'+
            '<td valign="top" align="center">'+
            '<div class="contentEditableContainer contentTextEditable">'+
            '<div class="contentEditable" style="color:#A8B0B6; font-size:13px;line-height: 15px;">'+
            '<img src="http://soportekaloni.com/wp-content/uploads/2017/06/logo-1.png" alt="">' +
            '</div> ' +
            '</div> ' +
            '</td> ' +
            '</tr> ' +
            '</table> ' +
            '</div>'
        for (var i = 1; i <= length; i++) {
            var attendee = nlapiGetLineItemValue('attendee', 'attendee', i)

            if (id != attendee) {
                try {
                    var namecustom = nlapiLoadRecord('Customer', attendee);
                    if(namecustom){

                        nlapiSendEmail(id, attendee, title, body, null, null)

                    }

                } catch (e) {

                    var break_Defaul ="";
                }

            }
        }
        return true;
    }
} */


function Dateformat(formatDate){
    var dd = formatDate.getDate();
    var mm = formatDate.getMonth()+1;
    var yyyy = formatDate.getFullYear();
    formatDate = dd+'/'+mm+'/'+yyyy; // change the format depending on the date format preferences set on your account
    return formatDate;
}




function afterSubmitUE(type){
    if(type == 'edit')
    {
        nlapiLogExecution('DEBUG', 'type: ', type);
        var id_event = nlapiGetRecordId();
        var id = nlapiGetUser();
        var length = nlapiGetLineItemCount('attendee');
        var status_post_procedimiento = nlapiGetFieldValue('custevent1180');
        nlapiLogExecution('DEBUG', 'status_post_procedimiento: ', status_post_procedimiento);
        //var ver=true;
        if(status_post_procedimiento != "ok")
        {
			var prefijoVal = nlapiGetFieldValue('custevent70');
          	nlapiLogExecution('DEBUG', 'prefijoVal: ', prefijoVal);
          	if(prefijoVal == '1' || prefijoVal == '2') // PRO = 1 y default = 2
            {
				var detalleCanc = nlapiGetFieldValue('custevent1');
              	nlapiLogExecution('DEBUG', 'detalleCanc: ', detalleCanc);
              	if(detalleCanc == '4') // Detalle de cancelación (Realizada (Sí se presentó) = 4)
                {
				  var dates = new Date();
                  var date24=nlapiAddDays(dates,1);
                  var date10=nlapiAddDays(dates,10);
                  var date1month= nlapiAddMonths(dates, 1);
                  var date3month=nlapiAddMonths(dates, 3);
                  var date6month=nlapiAddMonths(dates, 6);
                  var date9month=nlapiAddMonths(dates, 9);
                  var date12month=nlapiAddMonths(dates, 12);
                  var date14month=nlapiAddMonths(dates, 14);

                  var format24=Dateformat(date24);
                  var format10=Dateformat(date10);
                  var format1m=Dateformat(date1month);
                  var format3m=Dateformat(date3month);
                  var format6m=Dateformat(date6month);
                  var format9m=Dateformat(date9month);
                  var format12m=Dateformat(date12month);
                  var format14m=Dateformat(date14month);

  //var base64Encoded = encode.convert({string: id_event, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
  //var ID = 'CASE-' + id_event;
  //var key = 'eb7cb21aa6fb33d3b1ff14bbe7db4962';
  //var encrypted = nlapiencrypt(id_event,'aes',key);
                  //console.log('idevento: ' + id_event);
                  nlapiLogExecution('DEBUG', 'idevento: ', id_event);
                  var calif = 'https://efactory-kaloni.com/survey_kaloni/index.php?id=' + id_event;
                  var change="<div><table style='border: 1px solid rgb(8, 50, 78);background-color: rgb(121, 117, 117);width: 100%;text-align: left;border-collapse: collapse;text-align: center;'><tbody><tr style='border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'><td style='background: #3498db;margin-top: 20px !important;background-image: -webkit-linear-gradient(top,#3498db, #2980b9);background-image: -moz-linear-gradient(top, #3498db, #2980b9);background-image: -ms-linear-gradient(top, #3498db, #2980b9);background-image: -o-linear-gradient(top, #3498db, #2980b9);                    background-image: linear-gradient(to bottom, #3498db, #2980b9);border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>L 24 Horas</td><td style='background: #3498db;margin-top: 20px !important;background-image: -webkit-linear-gradient(top,#3498db, #2980b9);background-image: -moz-linear-gradient(top, #3498db, #2980b9);background-image: -ms-linear-gradient(top, #3498db, #2980b9);background-image: -o-linear-gradient(top, #3498db, #2980b9);                    background-image: linear-gradient(to bottom, #3498db, #2980b9);border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>10 D&iacute;as</td><td style='background: #3498db;margin-top: 20px !important;background-image: -webkit-linear-gradient(top,#3498db, #2980b9);background-image: -moz-linear-gradient(top, #3498db, #2980b9);background-image: -ms-linear-gradient(top, #3498db, #2980b9);background-image: -o-linear-gradient(top, #3498db, #2980b9);                    background-image: linear-gradient(to bottom, #3498db, #2980b9);border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>1 Mes</td><td style='background: #3498db;margin-top: 20px !important;background-image: -webkit-linear-gradient(top,#3498db, #2980b9);background-image: -moz-linear-gradient(top, #3498db, #2980b9);background-image: -ms-linear-gradient(top, #3498db, #2980b9);background-image: -o-linear-gradient(top, #3498db, #2980b9);                    background-image: linear-gradient(to bottom, #3498db, #2980b9);border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>3 Meses</td><td style='background: #3498db;margin-top: 20px !important;background-image: -webkit-linear-gradient(top,#3498db, #2980b9);background-image: -moz-linear-gradient(top, #3498db, #2980b9);background-image: -ms-linear-gradient(top, #3498db, #2980b9);background-image: -o-linear-gradient(top, #3498db, #2980b9);                    background-image: linear-gradient(to bottom, #3498db, #2980b9);border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>6 Meses</td><td style='background: #3498db;margin-top: 20px !important;background-image: -webkit-linear-gradient(top,#3498db, #2980b9);background-image: -moz-linear-gradient(top, #3498db, #2980b9);background-image: -ms-linear-gradient(top, #3498db, #2980b9);background-image: -o-linear-gradient(top, #3498db, #2980b9);                    background-image: linear-gradient(to bottom, #3498db, #2980b9);border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>9 Meses</td><td style='background: #3498db;margin-top: 20px !important;background-image: -webkit-linear-gradient(top,#3498db, #2980b9);background-image: -moz-linear-gradient(top, #3498db, #2980b9);background-image: -ms-linear-gradient(top, #3498db, #2980b9);background-image: -o-linear-gradient(top, #3498db, #2980b9);                    background-image: linear-gradient(to bottom, #3498db, #2980b9);border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>12 Meses</td><td style='background: #3498db;margin-top: 20px !important;background-image: -webkit-linear-gradient(top,#3498db, #2980b9);background-image: -moz-linear-gradient(top, #3498db, #2980b9);background-image: -ms-linear-gradient(top, #3498db, #2980b9);background-image: -o-linear-gradient(top, #3498db, #2980b9);                    background-image: linear-gradient(to bottom, #3498db, #2980b9);border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>14 Meses</td></tr><tr style='border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'><td style='border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>"+format24+"</td><td style='border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>"+format10+"</td><td style='border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>"+format1m+"</td><td style='border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>"+format3m+"</td><td style='border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>"+format6m+"</td><td style='border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>"+format9m+"</td><td style='border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>"+format12m+"</td><td style='border: 1px solid rgb(36, 35, 35);padding: 3px 2px;color: #fff;font-weight: 800;'>"+format14m+"</td></tr></tbody></table></div><br/><center><div style='line-height: 26px;font-weight: 700;'><font style='color: rgb(255, 255, 255); text-decoration: none; vertical-align: inherit;'><font style='vertical-align: inherit;'><a href="+calif+" style='background: #3498db; margin-top: 20px !important; background-image: -webkit-linear-gradient(top, #3498db, #2980b9); background-image: -moz-linear-gradient(top, #3498db, #2980b9); background-image: -ms-linear-gradient(top, #3498db, #2980b9); background-image: -o-linear-gradient(top, #3498db, #2980b9); background-image: linear-gradient(to bottom, #3498db, #2980b9); -webkit-border-radius: 28; -moz-border-radius: 28; border-radius: 28px; font-family: Arial; color: #ffffff; font-size: 20px; padding: 5px 10px 5px 10px;            text-decoration: none;' target='_blank' href="+calif+">Encuesta de Satisfacción</a></font></font></div></center><br /><br />";
                  var identific="<div>64594574</div>";

                  var emailTempId = 392; // internal id of the email template created
                  var emailTemp = nlapiLoadRecord('emailtemplate',emailTempId);
                  var emailSubj = emailTemp.getFieldValue('subject');
                  var emailBody = emailTemp.getFieldValue('content');

var body_mail = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
'<html xmlns:v="urn:schemas-microsoft-com:vml">'+
'<head>'+
''+
'<!-- Define Charset -->'+
'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
''+
'<!-- Responsive Meta Tag -->'+
'<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />'+
'<meta name="viewport" content="width=600,initial-scale = 2.3,user-scalable=no">'+
'<link href=\'https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700\' rel="stylesheet">'+
'<link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">'+
'<title>Recordatorio cita para lavado de injerto</title>'+
'<style type="text/css">'+
'body {'+
'    width: 100%;'+
'    background-color: #ffffff;'+
'    margin: 0;'+
'    padding: 0;'+
'    -webkit-font-smoothing: antialiased;'+
'    mso-margin-top-alt: 0px;'+
'    mso-margin-bottom-alt: 0px;'+
'    mso-padding-alt: 0px 0px 0px 0px;'+
'}'+
'p, h1, h2, h3, h4 {'+
'    margin-top: 0;'+
'    margin-bottom: 0;'+
'    padding-top: 0;'+
'    padding-bottom: 0;'+
'}'+
'span.preheader {'+
'    display: none;'+
'    font-size: 1px;'+
'}'+
'html {'+
'    width: 100%;'+
'}'+
'table {'+
'    font-size: 14px;'+
'    border: 0;'+
'}'+
'a {'+
'	border-style: none !important;'+
'	border: 0 !important;'+
'	text-decoration: none;'+
'	color: #456CB3;'+
'	}'+
''+
'.sombra-01 {'+
'    -webkit-box-shadow: 0px 0px 6px 1px rgba(204,204,204,1);'+
'    -moz-box-shadow: 0px 0px 6px 1px rgba(204,204,204,1);'+
'    box-shadow: 0px 0px 6px 1px rgba(204,204,204,1);'+
'}'+
'.circle {'+
'    border-radius: 50%;'+
'    width: 100px;'+
'    height: 100px;'+
'}'+
'.circle-60 {'+
'    border-radius: 50%;'+
'    width: 15px;'+
'    height: 15px;'+
'}'+
''+
''+
'a.button3{'+
'display:inline-block;'+
'padding:0.3em 1.2em;'+
'margin:0 0.3em 0.3em 0;'+
'border-radius:2em;'+
'box-sizing: border-box;'+
'text-decoration:none;'+
'font-family:\'Roboto\',sans-serif;'+
'font-weight:300;'+
'color:#FFFFFF;'+
'background-color:#4eb5f1;'+
'text-align:center;'+
'transition: all 0.2s;'+
'}'+
'a.button3:hover{'+
'background-color:#4095c6;'+
'}'+
'/*@media all and (max-width:30em){'+
' a.button3{'+
'display:block;'+
'margin:0.2em auto;'+
' }'+
'}*/'+
''+
''+
'/* ----------- responsivity ----------- */'+
'        '+
'@media only screen and (max-width: 796px) {'+
'  a.button3{'+
'display:inline-block;'+
'padding:0.3em 1.2em;'+
'margin:0 0.3em 0.3em 0;'+
'border-radius:2em;'+
'box-sizing: border-box;'+
'text-decoration:none;'+
'font-family:\'Roboto\',sans-serif;'+
'font-weight:300;'+
'color:#FFFFFF;'+
'background-color:#4eb5f1;'+
'text-align:center;'+
'transition: all 0.2s;'+
'}'+
'a.button3:hover{'+
'background-color:#4095c6;'+
'}'+
''+
'body[yahoo] .Medium-container590 {'+
'    width: 180px !important;'+
'}'+
'body[yahoo] .hide-800 {'+
'    display: none !important;'+
'}'+
'body[yahoo] .container800 {'+
'    width: 100% !important;'+
'}'+
'body[yahoo] .container780 {'+
'    width: 600px !important;'+
'}'+
'body[yahoo] .Bullets {'+
'    width: 500px !important;'+
'}'+
'body[yahoo] .container800_img {'+
'    width: 50% !important;'+
'}'+
'body[yahoo] .section800_img img {'+
'    width: 100% !important;'+
'    height: auto !important;'+
'}'+
'body[yahoo] .half-container800 {'+
'    width: 49% !important;'+
'}'+
'body[yahoo] .Medium-container800 {'+
'    width: 90% !important;'+
'}'+
'/* ====== divider ====== */'+
'body[yahoo] .divider img {'+
'    width: 30% !important;'+
'}'+
'}'+
''+
'/* ----------- responsivity ----------- */'+
'        '+
'@media only screen and (max-width: 640px) {'+
'  a.button3{'+
'display:inline-block;'+
'padding:0.3em 1.2em;'+
'margin:0 0.3em 0.3em 0;'+
'border-radius:2em;'+
'box-sizing: border-box;'+
'text-decoration:none;'+
'font-family:\'Roboto\',sans-serif;'+
'font-weight:300;'+
'color:#FFFFFF;'+
'background-color:#4eb5f1;'+
'text-align:center;'+
'transition: all 0.2s;'+
'}'+
'a.button3:hover{'+
'background-color:#4095c6;'+
'}'+
'/*------ top header ------ */'+
'body[yahoo] .main-header {'+
'    font-size: 20px !important;'+
'}'+
'body[yahoo] .main-section-header {'+
'    font-size: 28px !important;'+
'}'+
'body[yahoo] .show {'+
'    display: block !important;'+
'}'+
'body[yahoo] .hide {'+
'    display: none !important;'+
'}'+
'body[yahoo] .align-center {'+
'    text-align: center !important;'+
'}'+
'/*----- main image -------*/'+
'body[yahoo] .main-img img {'+
'    width: 440px !important;'+
'    height: auto !important;'+
'}'+
'/* ====== divider ====== */'+
'body[yahoo] .divider img {'+
'    width: 250px !important;'+
'}'+
'/*-------- container --------*/'+
'body[yahoo] .container590 {'+
'    width: 440px !important;'+
'}'+
'body[yahoo] .container590-center {'+
'    width: 280px !important;'+
'    text-align: center !important;'+
'}'+
'body[yahoo] .container580 {'+
'    width: 400px !important;'+
'}'+
'body[yahoo] .container500 {'+
'    width: 320px !important;'+
'}'+
'body[yahoo] .container400 {'+
'    width: 290px !important;'+
'}'+
'body[yahoo] .container800 {'+
'    width: 440px !important;'+
'}'+
'body[yahoo] .container780 {'+
'    width: 440px !important;'+
'}'+
'body[yahoo] .Bullets {'+
'    width: 400px !important;'+
'}'+
'body[yahoo] .container800_img {'+
'    width: 100% !important;'+
'}'+
'body[yahoo] .section800_img img {'+
'    width: 100% !important;'+
'}'+
'body[yahoo] .section800_img1 img {'+
'    width: 60% !important;'+
'    height: auto !important;'+
'}'+
'body[yahoo] .half-container {'+
'    width: 200px !important;'+
'}'+
'body[yahoo] .Medium-container800 {'+
'    width: 80% !important;'+
'}'+
'body[yahoo] .main-button {'+
'    width: 200px !important;'+
'}'+
'/*-------- secions ----------*/'+
'body[yahoo] .container590 {'+
'    width: 440px !important;'+
'}'+
'body[yahoo] .section-img img {'+
'    width: 320px !important;'+
'    height: auto !important;'+
'}'+
'body[yahoo] .team-img img {'+
'    width: 100% !important;'+
'    height: auto !important;'+
'}'+
'body[yahoo] .text-space div{'+
'    line-height: 33px !important;'+
'}'+
'}'+
''+
'@media only screen and (max-width: 479px) {'+
'  a.button3{'+
'display:inline-block;'+
'padding:0.3em 1.2em;'+
'margin:0 0.3em 0.3em 0;'+
'border-radius:2em;'+
'box-sizing: border-box;'+
'text-decoration:none;'+
'font-family:\'Roboto\',sans-serif;'+
'font-weight:300;'+
'color:#FFFFFF;'+
'background-color:#4eb5f1;'+
'text-align:center;'+
'transition: all 0.2s;'+
'}'+
'a.button3:hover{'+
'background-color:#4095c6;'+
'}'+
'/*------ top header ------ */'+
'body[yahoo] .main-header {'+
'    font-size: 20px !important;'+
'}'+
'body[yahoo] .main-section-header {'+
'    font-size: 24px !important;'+
'}'+
'/* ====== divider ====== */'+
'body[yahoo] .main-img img {'+
'    width: 280px !important;'+
'}'+
'body[yahoo] .divider img {'+
'    width: 220px !important;'+
'}'+
'/*-------- container --------*/'+
'body[yahoo] .container590 {'+
'    width: 280px !important;'+
'}'+
'body[yahoo] .container590-center {'+
'    width: 280px !important;'+
'    text-align: center;'+
'}'+
'body[yahoo] .container580 {'+
'    width: 260px !important;'+
'}'+
'body[yahoo] .container500 {'+
'    width: 280px !important;'+
'}'+
'body[yahoo] .container400 {'+
'    width: 260px !important;'+
'}'+
'body[yahoo] .container800 {'+
'    width: 100% !important;'+
'}'+
'body[yahoo] .container780 {'+
'    width: 280px !important;'+
'}'+
'body[yahoo] .Bullets {'+
'    width: 240px !important;'+
'}'+
'body[yahoo] .container800_img {'+
'    width: 100% !important;'+
'}'+
'body[yahoo] .Medium-container800 {'+
'    width: 95% !important;'+
'}'+
'body[yahoo] .section800_img img {'+
'    width: 100% !important;'+
'    height: auto !important;'+
'}'+
'body[yahoo] .section800_img1 img {'+
'    width: 50% !important;'+
'    height: auto !important;'+
'}'+
'body[yahoo] .half-container800 {'+
'    width: 100% !important;'+
'}'+
'body[yahoo] .half-container {'+
'    width: 130px !important;'+
'}'+
'body[yahoo] .container500 {'+
'    width: 280px !important;'+
'}'+
'/*-------- secions ----------*/'+
'body[yahoo] .container590 {'+
'    width: 280px !important;'+
'}'+
'body[yahoo] .section-img img {'+
'    width: 280px !important;'+
'    height: auto !important;'+
'}'+
'body[yahoo] .text-space div{'+
'    line-height: 30px !important;'+
'}'+
'	'+
'}'+
'</style>'+
'</head>'+
''+
'<body yahoo="fix" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">'+
''+
'<!-- ======= ENVÍO AL SALIR DEL PROCEDIMIENTO  ======= -->'+
'<!-- ======= main section ======= -->'+
''+
'<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#001E66">'+
'  <tr>'+
'    <tr>'+
'    <td height="20" style="font-size: 20px; line-height: 20px;"> </td>'+
'  </tr>'+
'  <td align="center">'+
'  <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">'+
'    <tr>'+
'      <td><table border="0" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'          <tr>'+
'            <td height="5" style="font-size: 5px; line-height: 5px;"> </td>'+
'          </tr>'+
'          <tr>'+
'            <td align="center"><table border="0" cellpadding="0" cellspacing="0" align="center">'+
'                <tr>'+
'                  <td align="center" style="color: #ffffff; font-size: 14px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 24px;"><div style=" line-height: 24px;"> <a href="https://3559763.app.netsuite.com/core/media/media.nl?id=3981791&c=3559763&h=bc196b7b823b6e761f2e&mv=k3f89m2g&_xt=.html&fcts=20191125181507&whence=" style="color: #ffffff; text-decoration: none;">¿Problemas con las imágenes? Ver en línea</a> </div></td>'+
'                </tr>'+
'              </table></td>'+
'          </tr>'+
'        </table></td>'+
'      <td class="hide" class="align-center">'+
'      <table border="0" width="135" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="hide">'+
'        <tr>'+
'          <td><table border="0" align="left" width="35" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590 hide">'+
'              <tr>'+
'                <td width="10" height="10" style="font-size:10px; line-height: 10px;"> </td>'+
'              </tr>'+
'            </table></td>'+
'        </tr>'+
'      </table>'+
'    </td>'+
'    '+
'    <td class="hide" class="align-center">'+
'    '+
'    <table border="0" width="100" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'      <tr>'+
'        <td><table border="0" width="100" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'            <tr>'+
'              <td align="left" style="color: #f2d221; font-size: 14px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 20px;" class="align-center"><!-- ======= section subtitle ====== -->'+
'                '+
'                <table border="0" width="70" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'                  <tr>'+
'                    <td align="left"><table border="0" align="left" cellpadding="0" cellspacing="0" class="container590">'+
'                        <tr>'+
'                          <td align="center"><table border="0" align="center" width="130" cellpadding="0" cellspacing="0">'+
'                              <tr>'+
'                                <td height="8" style="font-size: 8px; line-height: 8px;"> </td>'+
'                              </tr>'+
'                              <tr>'+
'                                <td align="left"><table align="center" border="0" cellpadding="0" cellspacing="0">'+
'                                    <tr>'+
'                                      <td align="center" style="color: #000; font-size: 14px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 16px;"><!-- ======= main section button ======= -->'+
'                                        '+
'                                        <div style="line-height: 26px;"> <a href="https://kaloni.mx/injerto-capilar.html" style="color: #ffffff; text-decoration: none; align: center;">Soluciones Kaloni</a> </div></td>'+
'                                    </tr>'+
'                                  </table></td>'+
'                              </tr>'+
'                              <tr>'+
'                                <td height="8" style="font-size: 8px; line-height:8px;"> </td>'+
'                              </tr>'+
'                            </table></td>'+
'                        </tr>'+
'                      </table></td>'+
'                  </tr>'+
'                </table></td>'+
'            </tr>'+
'          </table></td>'+
'      </tr>'+
'    </table>'+
'    </tr>'+
'  </table>'+
'  </td>'+
'  '+
'  </tr>'+
'  '+
'  <tr>'+
'    <td><table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#001E66">'+
'        <tr>'+
'          <td height="35" style="font-size: 35px; line-height: 35px;"> </td>'+
'        </tr>'+
'        <tr> '+
'          <!-- ======= divider  ======= -->'+
'          <td align="center" class="divider"><img width="800" border="0" style="display: block; width: 230px; height: auto;" src="https://3559763.app.netsuite.com/core/media/media.nl?id=3981681&c=3559763&h=d76fb5ede3ce230551a4&fcts=20191125175924&whence=" alt="Logo Kaloni" /></td>'+
'        </tr>'+
'      </table></td>'+
'  </tr>'+
'	'+
'  <tr cellspacing="0" bgcolor="#0b2363" height="auto" style="background-image: url(https://3559763.app.netsuite.com/core/media/media.nl?id=3981042&c=3559763&h=90ab409d1cc1074e86b9&fcts=20191125173308&whence=); background-size: cover; background-position: bottom center; background-repeat: no-repeat;" background="https://3559763.app.netsuite.com/core/media/media.nl?id=3981042&c=3559763&h=90ab409d1cc1074e86b9&fcts=20191125173308&whence=">'+
'    <td align="center">'+
'		<table border="0" align="center" width="800" cellpadding="0" cellspacing="0" class="Medium-container800">'+
'        <tr>'+
'          <td><table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="Medium-container800">'+
'              <tr><td height="15" style="font-size: 15px; line-height: 15px;"> </td></tr>'+
'			  '+
'              <tr>'+
'                <td><table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" class="container800">'+
'                    <tr>'+
'                      <td align="center"><table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" class="section800">'+
'                          <tr><td height="20" class="hide" style="font-size: 20px; line-height: 20px;"> </td></tr>'+
'						  '+
'                          <tr>'+
'                            <td align="center" class="section800_img"><a href="#" style=" border-style: none !important; border: 0 !important;"><img src="https://3559763.app.netsuite.com/core/media/media.nl?id=3981421&c=3559763&h=6b8df6a2e65fadcdb47e&fcts=20191125174841&whence=" style="display: block;" width="100%" border="0" alt="Siéntete tranquilo con el respaldo médico que te brinda kaloni" /></a></td>'+
'                          </tr>'+
'						 '+
'						  <tr><td height="100" class="hide" style="font-size: 5px; line-height: 5px;"> </td> </tr>'+
'						  '+
'                        </table></td>'+
'                    </tr>'+
'                  </table></td>'+
'              </tr>'+
'			  '+
'            </table></td>'+
'        </tr>'+
'      </table>'+
'	  </td>'+
'  </tr>'+
'	'+
'</table>'+
'</tr>'+
''+
'<!-- ======= end section ======= --> '+
''+
'<!-- ======= features section ======= -->'+
''+
'<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#FFF">'+
'  <tr>'+
'    <td height="20" style="font-size: 10px; line-height: 10px;"> </td>'+
'  </tr>'+
'  <tr align="center">'+
'    <td align="center"><table border="0" align="center" width="780" cellpadding="0" cellspacing="0" class="container780">'+
'        <tr>'+
'          <td align="center"><!-- SALUDO -->'+
'            '+
'            <table border="0" width="780" align="center" cellpadding="0" cellspacing="0" class="container780">'+
'              <tr>'+
'                <td align="left" style="color: #456cb3; font-size: 36px; font-family: \'Poppins\', Calibri, sans-serif; font-weight: 700;" class="main-section-header text-space"><div style="line-height: 40px; text-transform: uppercase;"> Felicidades por este gran paso que acabas de dar.</div></td>'+
'              </tr>'+
'				'+
'				<tr><td height="5" style="font-size: 5px; line-height: 5px;"></td></tr>'+
'				'+
'			  <tr><td><div style="color: #456cb3;font-size: 15px; font-family: \'Helvetica\', Calibri, sans-serif; font-weight: 500;line-height: 22px"> Ahora ya estás en este camino hacia tu objetivo: Recuperar densidad capilar en las zonas afectadas por la alopecia. </div></td></tr>'+
'				'+
'				<tr><td height="10" style="font-size: 10px; line-height: 10px;"></td></tr>'+
'				'+
'				<table align="left" width="100" border="0" cellpadding="0" cellspacing="0" bgcolor="#456cb3" style="border-radius: 5px;">'+
'              <tr><td height="4" style="font-size: 4px; line-height: 4px;"></td></tr>'+
'            </table>'+
'            </table>'+
'            '+
'            '+
'            <!-- FIN SALUDO --> '+
'            '+
'            <!-- TEXTO -->'+
'            '+
'            <table border="0" width="780" align="center" cellpadding="0" cellspacing="0" class="container780">'+
'              <tr>'+
'                <td height="20" style="font-size: 10px; line-height: 10px;"> </td>'+
'              </tr>'+
'              <tr>'+
'                <td align="center" style="color: #333333; font-size: 15px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 28px;"><!-- ======= section text ====== -->'+
'                  '+
'                  <div style="line-height: 28px; text-align: justify;"> Es importante que sigas algunas indicaciones:   </div></td>'+
'              </tr>'+
'            </table>'+
'            '+
'            <!-- FIN TEXTO --> '+
'            '+
'            <!-- TEXTOS en Bulets -->'+
'            '+
'            <table border="0" width="100%" cellpadding="0" cellspacing="0">'+
'              <tr>'+
'                <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'              </tr>'+
'              <tr align="center">'+
'                <td align="center"><table border="0" align="center" width="780" cellpadding="0" cellspacing="0" class="container780">'+
'                    <tr>'+
'                      <td align="center" style="color: #cccccc; font-size: 13px; font-family: \'Poppins\', Calibri, sans-serif; letter-spacing: 2px; line-height: 24px;" class="align-center"><!-- ======= section subtitle ====== -->'+
'                        '+
'                        <div style="line-height: 24px;"> </div></td>'+
'                    </tr>'+
'                    <tr>'+
'                      <td height="20" style="font-size: 20px; line-height: 20px;"> </td>'+
'                    </tr>'+
'                    <tr>'+
'                      <td align="center"><!--Tabla de Bulet 1 y 2-->'+
'                        '+
'                        <table border="0" width="780" align="center" cellpadding="0" cellspacing="0" class="container780">'+
'                          <tr>'+
'                            <td align="center" style="color: #333; font-size: 16px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 24px;"><!--Bulet 1-->'+
'                              '+
'                              <table border="0" width="50%" align="left" cellpadding="0" cellspacing="0" class="container780">'+
'                                <tr>'+
'                                  <td align="left"><table border="0" width="40" align="left" cellpadding="0" cellspacing="0">'+
'                                      <tr>'+
'                                      <tr>'+
'                                        <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'                                      </tr>'+
'                                      <td align="center"><div class="circle-60" style="background-color: #456cb3;font-family: \'Poppins\', Calibri, sans-serif; font-size: 50px; font-weight: 700; line-height: 55px; text-align: center;"> </div></td>'+
'                                      </tr>'+
'                                    </table>'+
'                                    <table border="0" width="300" align="left" cellpadding="0" cellspacing="0" class="Bullets">'+
'                                      <tr>'+
'                                        <td width="10"> </td>'+
'                                        <td><div style="line-height: 20px; text-align: left; font-size: 14px;"> No olvides tomar los medicamentos recetados en la clínica. </div></td>'+
'                                      </tr>'+
'                                      <tr>'+
'                                        <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'                                      </tr>'+
'                                    </table></td>'+
'                                </tr>'+
'                              </table>'+
'                              '+
'                              <!--Bulet 2-->'+
'                              '+
'                              <table border="0" width="50%" align="right" cellpadding="0" cellspacing="0" class="container780">'+
'                                <tr>'+
'                                  <td align="left"><table border="0" width="40" align="left" cellpadding="0" cellspacing="0">'+
'                                      <tr>'+
'                                      <tr>'+
'                                        <td height="5" style="font-size: 5px; line-height: 5px;"> </td>'+
'                                      </tr>'+
'                                      <td align="center"><div class="circle-60" style="background-color: #456cb3; color: #FFF; font-family: \'Poppins\', Calibri, sans-serif; font-size: 80px; font-weight: 700; line-height: 55px; text-align: center;"> </div></td>'+
'                                      </tr>'+
'                                    </table>'+
'                                    <table border="0" width="300" align="left" cellpadding="0" cellspacing="0" class="Bullets">'+
'                                      <tr>'+
'                                        <td width="10"> </td>'+
'                                        <td><div style="line-height: 20px; text-align: left; font-size: 14px;"> Evita cualquier fricción sobre la zona injertada.</div></td>'+
'                                      </tr>'+
'                                      <tr>'+
'                                        <td height="20" style="font-size: 10px; line-height: 10px;"> </td>'+
'                                      </tr>'+
'                                    </table></td>'+
'                                </tr>'+
'                              </table></td>'+
'                          </tr>'+
'                        </table>'+
'                        '+
'                        <!--Fin de Tabla de Bulet 1 y 2--> '+
'                        <!-- Espacio -->'+
'                        '+
'                        <table border="0" width="780" align="center" cellpadding="0" cellspacing="0" class="container780">'+
'                          <tr class="hide-800">'+
'                            <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'                          </tr>'+
'                        </table>'+
'                        '+
'                        <!--Tabla de Bulet 3 y 4-->'+
'                        '+
'                        <table border="0" width="780" align="center" cellpadding="0" cellspacing="0" class="container780">'+
'                          <tr>'+
'                            <td align="center" style="color: #333; font-size: 16px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 24px;"><!--Bulet 3-->'+
'                              '+
'                              <table border="0" width="50%" align="left" cellpadding="0" cellspacing="0" class="container780">'+
'                                <tr>'+
'                                  <td align="left"><table border="0" width="40" align="left" cellpadding="0" cellspacing="0">'+
'                                      <tr>'+
'                                        <td height="5" style="font-size: 5px; line-height: 5px;"> </td>'+
'                                      </tr>'+
'                                      <tr>'+
'                                        <td align="center"><div class="circle-60" style="background-color: #456cb3; color: #FFF; font-family: \'Poppins\', Calibri, sans-serif; font-size: 80px; font-weight: 700; line-height: 55px; text-align: center;"> </div></td>'+
'                                      </tr>'+
'                                    </table>'+
'                                    <table border="0" width="300" align="left" cellpadding="0" cellspacing="0" class="Bullets">'+
'                                      <tr>'+
'                                        <td width="10"> </td>'+
'                                        <td><div style="line-height: 20px; text-align: left; font-size: 14px;"> No te expongas al sol.</div></td>'+
'                                      </tr>'+
'                                      <tr>'+
'                                        <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'                                      </tr>'+
'                                    </table></td>'+
'                                </tr>'+
'                              </table>'+
'                              '+
'                              <!--Bulet 4-->'+
'                              '+
'                              <table border="0" width="50%" align="right" cellpadding="0" cellspacing="0" class="container780">'+
'                                <tr>'+
'                                  <td align="left"><table border="0" width="40" align="left" cellpadding="0" cellspacing="0">'+
'                                      <tr>'+
'                                        <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'                                      </tr>'+
'                                      <tr>'+
'                                        <td align="center"><div class="circle-60" style="background-color: #456cb3; color: #FFF; font-family: \'Poppins\', Calibri, sans-serif; font-size: 80px; font-weight: 700; line-height: 55px; text-align: center;"> </div></td>'+
'                                      </tr>'+
'                                    </table>'+
'                                    <table border="0" width="300" align="left" cellpadding="0" cellspacing="0" class="Bullets">'+
'                                      <tr>'+
'                                        <td width="10"> </td>'+
'                                        <td><div style="line-height: 20px; text-align: left; font-size: 14px;"> Evita inclinar la cabeza. Cuida tu postura para leer, dormir o ver tu teléfono. </div></td>'+
'                                      </tr>'+
'                                      <tr>'+
'                                        <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'                                      </tr>'+
'                                    </table></td>'+
'                                </tr>'+
'                              </table></td>'+
'                          </tr>'+
'                        </table>'+
'                        '+
'                        <!--Fin de la Tabla de Bulet 3 y 4--> '+
'                        '+
'                        <!-- Espacio -->'+
'                        '+
'                        <table border="0" width="780" align="center" cellpadding="0" cellspacing="0" class="container780">'+
'                          <tr class="hide-800">'+
'                            <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'                          </tr>'+
'                        </table>'+
'                        '+
'                        <!--Tabla de bullet Bulet 5 y 6-->'+
'                        '+
'                        <table border="0" width="780" align="center" cellpadding="0" cellspacing="0" class="container780">'+
'                          <tr>'+
'                            <td align="center" style="color: #333; font-size: 16px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 24px;"><!--Bulet 5-->'+
'                              '+
'                              <table border="0" width="50%" align="left" cellpadding="0" cellspacing="0" class="container780">'+
'                                <tr>'+
'                                  <td align="left"><table border="0" width="40" align="left" cellpadding="0" cellspacing="0">'+
'                                      <tr>'+
'                                        <td height="5" style="font-size: 5px; line-height: 5px;"> </td>'+
'                                      </tr>'+
'                                      <tr>'+
'                                        <td align="center"><div class="circle-60" style="background-color: #456cb3; color: #FFF; font-family: \'Poppins\', Calibri, sans-serif; font-size: 80px; font-weight: 700; line-height: 55px; text-align: center;"> </div></td>'+
'                                      </tr>'+
'                                    </table>'+
'                                    '+
'                                    <!--Bulet 6-->'+
'                                    '+
'                                    <table border="0" width="300" align="left" cellpadding="0" cellspacing="0" class="Bullets">'+
'                                      <tr>'+
'                                        <td width="10"> </td>'+
'                                        <td><div style="line-height: 20px; text-align: left; font-size: 14px;"> Evita el consumo de alcohol y tabaco. </div></td>'+
'                                      </tr>'+
'                                      <tr>'+
'                                        <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'                                      </tr>'+
'                                    </table></td>'+
'                                </tr>'+
'                              </table>'+
'                              '+
'                              <!--Bulet 7 y 8-->'+
'                              '+
'                              </td>'+
'                          </tr>'+
'                        </table>'+
'                        '+
'                        <!--Tabla de bullet Bulet 5 y 6--> '+
'                        '+
'                        <!-- Espacio -->'+
'                        '+
'                        <table border="0" width="780" align="center" cellpadding="0" cellspacing="0" class="container780">'+
'                          <tr class="hide-800">'+
'                            <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'                          </tr>'+
'                        </table>'+
''+
'			</td></tr></table></td></tr>'+
'            </table>'+
'            <!-- FIN de los Bulets --> '+
''+
'            <!-- TEXTO 01 -->'+
'                '+
'                <table border="0" width="780" align="center" cellpadding="0" cellspacing="0" class="container780">'+
'                  <tr>'+
'                    <td height="20" style="font-size: 20px; line-height: 20px;"> </td>'+
'                  </tr>'+
'                  <tr>'+
'                    <td height="40" style="color: #333333; font-size: 15px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 28px;"> Los cuidados que mantengas durante los primeros días, y en especial durante las primeras 24 horas, son cruciales para obtener los resultados deseados. Para saber más sobre estos cuidados, te recomendamos <a href="https://kaloni.mx/blog/injerto-capilar/injerto-capilar-24-horas/" style="font-weight: 800;" >visitar nuestro blog.</a>'+
'					<br><br>'+
'					<span style="color: #456CB3; font-family: \'Helvetica\', Calibri, sans-serif; font-weight: 800;line-height: 22px">No olvides agendar tu cita de 24 horas para que el personal de la clínica realice el lavado de la zona injertada.</span> '+
'					<br><br><a href="'+calif+'" style="font-weight: 800;" class="button3">Encuesta de Satisfacción</a><br><br>'+
'					Cualquier duda o inquietud que tengas, contáctanos por teléfono, whatsApp o a través de nuestras redes sociales.'+
'					</td>'+
'                  </tr>'+
'                </table>'+
'                '+
'              <!-- FIN TEXTO 01 --> '+
'            '+
'            </td>'+
'        </tr>'+
'      </table></td>'+
'  </tr>'+
'</table>'+
''+
'<!-- ======= end section ======= --> '+
''+
'<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff">'+
'		'+
'		<tr><td height="20" style="font-size: 20px; line-height: 20px;"> </td></tr>'+
'				'+
'		<tr>'+
'			<td align="center">'+
'				<table border="0" align="center" width="640" cellpadding="0" cellspacing="0" class="container590">'+
'				'+
'					<tr><td height="20" style="font-size: 20px; line-height: 20px;"> </td></tr>'+
'					'+
'					<tr>'+
'						<td align="center" class="no-bg">'+
'							<table border="0" width="500" align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'								<tr>'+
'									<td>'+
'										<a href="tel:5550221056" style=" border-style: none !important; display: block; border: 0 !important;text-decoration: none;">'+
'										<table border="0" width="180" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'											<tr>'+
'												<!-- ======= image ======= -->'+
'												<td align="center">'+
'													<img src="https://3559763.app.netsuite.com/core/media/media.nl?id=3981726&c=3559763&h=a2aeb60ccfea691042e1&fcts=20191125180343&whence=" style="display: block;" width="70" border="0" alt="" />'+
'												</td>'+
'											</tr>'+
'											'+
'											<tr><td height="15" style="font-size: 15px; line-height: 15px;"> </td></tr>'+
'											'+
'											<tr>'+
'												<td align="center" style="color: #000000; font-size: 16px; font-family: \'Poppins\', Calibri, sans-serif; font-weight: 700; line-height: 24px; text-transform: uppercase;">'+
'													<!-- ======= section text ====== -->'+
'													'+
'													<div style="line-height: 23px">'+
'							        					'+
'														Teléfono'+
'							        					'+
'													</div>'+
'						        				</td>	'+
'											</tr>'+
'											'+
'											'+
'											<a href="tel:5550221056" style=" border-style: none !important; display: block; border: 0 !important;text-decoration: none;">'+
'											<tr>'+
'												<td align="center" style="color: #30497B; font-size: 16px; font-family: \'Poppins\', Calibri, sans-serif; font-weight: 700; line-height: 24px; text-transform: uppercase;">'+
'													<!-- ======= section subtitle ====== -->'+
'													<div style="line-height: 24px;">'+
'													'+
'														'+
'								        				(55) 5022 - 1056'+
'														'+
'													</div>'+
'						        				</td>'+
'											</tr>'+
'											</a>'+
'											'+
'											<tr><td height="10" style="font-size: 10px; line-height: 10px;"> </td></tr>'+
'											'+
'											</table></a>'+
'										'+
'										<table border="0" width="2" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'											<tr><td width="2" height="40" style="font-size: 40px; line-height: 40px;"></td></tr>'+
'										</table>'+
'				                		'+
'				                		<a href="https://api.whatsapp.com/send?phone=525566086038&text=Hola%20Kaloni" style=" text-decoration: none; align: center;">'+
'											'+
'											<table border="0" width="180" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'											<!-- ======= image ======= -->'+
'											<tr>'+
'												<a href="https://api.whatsapp.com/send?phone=525566086038&text=Hola%20Kaloni" style=" text-decoration: none; align: center;">'+
'												<td align="center">'+
'													<img src="https://3559763.app.netsuite.com/core/media/media.nl?id=3981727&c=3559763&h=a637c80cbbbc9f44a49f&fcts=20191125180355&whence=" style="display: block;" width="60" border="0" alt="Correo:xxx@kaloni.com" />'+
'												</td>'+
'												</a>'+
'											</tr>'+
'											'+
'											<tr><td height="15" style="font-size: 15px; line-height: 15px;"> </td></tr>'+
'											'+
'											<tr>'+
'												'+
'												<td align="center" style="color: #000000; font-size: 16px; font-family: \'Poppins\', Calibri, sans-serif; font-weight: 700; line-height: 24px; text-transform: uppercase;">'+
'													<!-- ======= text ====== -->'+
'													<a href="https://api.whatsapp.com/send?phone=525566086038&text=Hola%20Kaloni" style="color: #000000; text-decoration: none; align: center;">'+
'													<div style="line-height: 23px">'+
'							        					'+
'							        						WhatsApp'+
'							        					'+
'													</div>'+
'													</a>'+
'						        				</td>	'+
'											</tr>'+
'											'+
'											'+
'											'+
'											<tr>'+
'												<td align="center" style="color: #30497B; font-size: 16px; font-family: \'Poppins\', Calibri, sans-serif; font-weight: 700; line-height: 24px;">'+
'													<!-- ======= section subtitle ====== -->'+
'													<a href="https://api.whatsapp.com/send?phone=525566086038&text=Hola%20Kaloni" style="color: #244175; text-decoration: none; align: center;">'+
'													<div style="line-height: 24px;">'+
'											'+
'					        					 (55) 6608 - 6038'+
'											'+
'										            </div>'+
'													</a>'+
'						        				</td>'+
'											</tr>'+
'											'+
'											<tr><td height="10" style="font-size: 10px; line-height: 10px;"> </td></tr>'+
'										</table>'+
'										</a>'+
'										'+
'									</td>'+
'								</tr>'+
'							</table>					'+
'						</td>'+
'					</tr>'+
'					'+
'					<tr><td height="30" style="font-size: 30px; line-height: 30px;"> </td></tr>'+
'					<table border="0" width="780" align="center" cellpadding="0" cellspacing="0" class="container780">'+
'              <tr>'+
'                <td height="40" style="color: #456CB3; font-size: 15px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 28px;text-align: center;font-weight:800;"> El tiempo a tu favor</div></td>'+
'              </tr>'+
'            </table>'+
'					'+
'				</table>'+
'				'+
'			</td>'+
'		</tr>'+
'		'+
'		<tr><td height="30" style="font-size: 30px; line-height: 30px;"> </td></tr>'+
'		'+
'	</table>'+
''+
'<!-- ======= links and socials ======= -->'+
'<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">'+
'  <tr>'+
'    <td height="30" style="font-size: 30px; line-height: 30px;"> </td>'+
'  </tr>'+
'  <tr>'+
'    <td align="center"><table border="0" align="center" width="740" cellpadding="0" cellspacing="0" class="container780">'+
'        <tr>'+
'          <td><!-- Logotipo Footer -->'+
'            '+
'            <table border="0" width="300" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="align-center container590">'+
'              <tr>'+
'                <td><table border="0" width="200" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590 container590-center">'+
'                    <tr>'+
'                      <td align="left"><table border="0" cellpadding="0" cellspacing="0" align="left" class="container590">'+
'                          <tr> '+
'                            <!-- ======= logo ======= -->'+
'                            <td align="center" class="align-center"><a href="https://kaloni.mx/index.html"><img width="60" border="0" style="width: 160px;" src="https://3559763.app.netsuite.com/core/media/media.nl?id=3981692&c=3559763&h=5d0c1375f8e99af681f3&fcts=20191125180002&whence=" alt="Logo-Hairrestoration" alt="Logo-Hairrestoration" /></a></td>'+
'                          </tr>'+
'                        </table></td>'+
'                    </tr>'+
'                    <tr>'+
'                      <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'                    </tr>'+
'                    <tr>'+
'                      <td align="left" style="color: #5C5D60; font-size: 14px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 25px;" class="text_color align-center"><!-- ======= section subtitle ====== -->'+
'                        '+
'                        <div class="container590 container590-center"style="line-height: 25px;text-align: left;width: 280px;"> '+
'							Has recibido este correo porque tus datos están registrados en nuestra página web, K-Center o página de Facebook.'+
'						</div>'+
'                    </tr>'+
'                  </table>'+
'                  <table border="0" width="2" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'                    <tr>'+
'                      <td width="2" height="10" style="font-size: 40px; line-height: 40px;"></td>'+
'                    </tr>'+
'                  </table></td>'+
'              </tr>'+
'            </table>'+
'            '+
'            <!-- End Logotipo Footer --> '+
'            '+
'            <!-- Agenda tu cita -->'+
'            '+
'            <table border="0" width="2" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590 container590-center">'+
'              <tr class="hide-800">'+
'                <td width="2" height="40" style="font-size: 40px; line-height: 40px;"></td>'+
'              </tr>'+
'            </table>'+
'            <table border="0" width="120" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590 align-center">'+
'              <tr>'+
'                <td><table border="0" width="100" align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'                    <tr>'+
'                      <td align="left" style="color: #f2d221; font-size: 14px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 20px;" class="align-center"><!-- ======= section subtitle ====== -->'+
'                        '+
'                        <table border="0" width="70" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'                          <tr>'+
'                            <td align="left"><table border="0" align="center" cellpadding="0" cellspacing="0" class="container590">'+
'                              </table></td>'+
'                          </tr>'+
'                        </table></td>'+
'                    </tr>'+
'                  </table></td>'+
'              </tr>'+
'              <tr class="hide-600">'+
'                <td width="2" height="10" style="font-size: 10px; line-height: 10px;"></td>'+
'              </tr>'+
'              <tr>'+
'                <td width="2" height="10" style="font-size: 10px; line-height: 10px;"></td>'+
'              </tr>'+
'              <!-- Social Media -->'+
'              <tr align="center">'+
'                <td align="center"><table border="0" align="center" cellpadding="0" cellspacing="0">'+
'                    <tr> '+
'                      <!-- Facebook -->'+
'                      <td><a href="https://www.facebook.com/KaloniMx/" style="border-style: none !important; border: 0 !important;" class="editable_img"><img width="25" border="0" style="display: block; width: auto;" src="https://3559763.app.netsuite.com/core/media/media.nl?id=3981775&c=3559763&h=5317375b219730a73cf5&fcts=20191125180541&whence=" alt="Facebook" /></a></td>'+
'                      <!-- end Facebook -->'+
'                      <td> </td>'+
'                      '+
'                      <!-- Instagram -->'+
'                      <td><a href="https://www.instagram.com/kalonimx/?hl=es-la" style="border-style: none !important; border: 0 !important;" class="editable_img"><img width="25" border="0" style="display: block; width: auto;" src="https://3559763.app.netsuite.com/core/media/media.nl?id=3981778&c=3559763&h=d15ca645ac66fc1110c1&fcts=20191125180546&whence=" alt="Twitter" /></a></td>'+
'                      <!-- end Twitter -->'+
'                      <td> </td>'+
'                      '+
'                      <!-- YouTube -->'+
'                      <td><a href="https://www.youtube.com/user/KaloniHairChannel" style="border-style: none !important; border: 0 !important;" class="editable_img"><img width="25" border="0" style="display: block; width: auto;" src="https://3559763.app.netsuite.com/core/media/media.nl?id=3981780&c=3559763&h=713a8875222a4199ae35&fcts=20191125180553&whence=" alt="Youtobe" /></a></td>'+
'                      <!-- end YouTube --> '+
'                    </tr>'+
'                  </table></td>'+
'              </tr>'+
'              <!-- end Social Media -->'+
'              <tr>'+
'                <td width="2" height="20" style="font-size: 20px; line-height: 20px;"></td>'+
'              </tr>'+
'            </table>'+
'            '+
'            <!-- End agenda tu cita --> '+
'            '+
'            <!-- Legal -->'+
'            '+
'            <table border="0" width="160" align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'              <tr>'+
'                <td><table border="0" width="250" align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590 Medium-container590">'+
'                    <tr>'+
'                      <td align="left" style="color: #456cb3; font-size: 22px; font-family: Poppins, Calibri, sans-serif; font-weight: 200; line-height: 30px;font-weight: 500;" class="align-center"><!-- ======= section text ====== -->'+
'                        '+
'                        <div class="edit_text" style="line-height: 30px"> LEGAL </div></td>'+
'                    </tr>'+
'                    <tr>'+
'                      <td height="15" style="font-size: 15px; line-height: 15px;"> </td>'+
'                    </tr>'+
'                    <tr>'+
'                      <td align="left" style="color: #5C5D60; font-size: 14px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 20px;" class="align-center"><!-- ======= section subtitle ====== -->'+
'                        '+
'                        <div><a href="https://kaloni.mx/legal.html" style="color: #5C5D60; text-decoration: none;"> Aviso de privacidad</a></div>'+
'                        <div><a href="https://kaloni.mx/legal.html#descargo" style="color: #5C5D60; text-decoration: none;"> Descargo de responsabilidad médica</a></div>'+
'                        <div><a href="https://kaloni.mx/legal.html#metodos" style="color: #5C5D60; text-decoration: none;"> Métodos de pago</a></div></td>'+
'                    </tr>'+
'                    <tr>'+
'                      <td height="15" style="font-size: 15px; line-height: 15px;"> </td>'+
'                    </tr>'+
'                  </table>'+
'                  <table border="0" width="2" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'                    <tr class="hide-800">'+
'                      <td width="30" height="10" style="font-size: 10px; line-height: 10px;"></td>'+
'                    </tr>'+
'                  </table></td>'+
'              </tr>'+
'            </table>'+
'            '+
'            <!-- end Legal --></td>'+
'        </tr>'+
'        <tr>'+
'          <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'        </tr>'+
'        <tr>'+
'          <td align="center" style="color: #aaaaaa; font-size: 14px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 24px;" class="align-center"><div class="edit_text" style="line-height: 24px;">Copyright KALONI 2019. Todos los derechos reservados.</div></td>'+
'        </tr>'+
'        <tr>'+
'          <td height="20" style="font-size: 20px; line-height: 20px;"> </td>'+
'        </tr>'+
'      </table></td>'+
'  </tr>'+
'</table>'+
'<!-- ======= end section ======= -->'+
''+
'</body>'+
'</html>';

                  for (var i = 1; i <= length; i++) {
                      var attendee2 = nlapiGetLineItemValue('attendee', 'attendee', i)

                      if (id != attendee2) {
                          try {
                              emailBody = emailBody.replace(identific,change);
                              var client = nlapiLoadRecord('Customer', attendee2);

                              if(client){

                                  //nlapiSendEmail("198528",attendee2,emailSubj, emailBody , null, null, null, null,true,null, null);
                                  nlapiSendEmail("198528",attendee2,'Recordatorio cita para lavado de injerto', body_mail , null, null, null, null,true,null, null); 
                                  nlapiLogExecution('DEBUG', 'afterSubmitUE function: ', 'Envio de mail con plantilla Recordatorio cita para lavado de injerto, con link de encuesta a: ' + attendee2);
                                  // attendee2 'acolin@kaloni.com,afigueroa@kaloni.com'
                                  nlapiSubmitField("calendarevent", id_event, "custevent1180", "ok");

                                  identific=change;
                              }
                              identific=change;

                          } catch (e) {

                              identific=change;
                              var break_Defaul ="";
                          }

                      }
                  }
                  //return true;
                }
            }
       	}
        nlapiLogExecution('DEBUG', 'afterSubmitUE function - edit: ', 'Fin');
        return true;
     }
}