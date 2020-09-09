/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
define(["N/email", "N/record", "N/file", "N/log", "N/runtime"], function (
  email, record, file, log, runtime) {

  /**
   * 
   * @param {object} context 
   */
  function beforeLoad(context) {

  }

  /**
   * 
   * @param {object} context 
   */
  function beforeSubmit(context) {

  }

  /**
   * 
   * @param {object} context 
   */
  function afterSubmit(context) {

    /**
    * //TODO: GET CONTEXT, CONVERT CONTEXT IN JSON OBJECT, LOAD CUSTOMER OBJECT AND GET IST VALUES
    */
    var json_contexto = JSON.stringify(context);
    var obj_contexto = JSON.parse(json_contexto);

    //VARIABLES: CONTEXT JSON OBJECT GLOBAL ON NEWRECORD CONTEXT -> ALWAYS EXIST
    var recordType = obj_contexto.newRecord.type;
    var user = obj_contexto.newRecord.fields.nluser;
    var prefixVal = obj_contexto.newRecord.fields.custevent70;
    var company = obj_contexto.newRecord.company;

    //VARIABLES: GLOBAL AFTERSUBMIT
    var obj_customer = "";
    var value_customer_subsidiary = "";
    var id_Customer = "";
    var attendee1 = '';
    var attendee2 = '';

    //ACTION: DEFINE CUSTOMER ID
    if (company == undefined) {
      try {
        attendee1 = obj_contexto.newRecord.sublists.attendee["line 1"].attendeetype || undefined;
      } catch (error) {
        attendee1 = undefined;
        log.error('error at1', 'Error de atendee1: ' + error);
      }
      try {
        attendee2 = obj_contexto.newRecord.sublists.attendee["line 2"].attendeetype || undefined;
      } catch (error) {
        attendee2 = undefined;
        log.error('error at2', 'Error de atendee2: ' + error);
      }

      log.audit('Show attendies and company', "Company " + company + " user " + user + " attendee1 " + attendee1 + " attendee2 " + attendee2);

      if (attendee1 == 'custjob' && attendee1 != undefined) {
        id_Customer = obj_contexto.newRecord.sublists.attendee["line 1"].attendee;
      } else if (attendee2 == 'custjob' && attendee2 != undefined) {
        id_Customer = obj_contexto.newRecord.sublists.attendee["line 2"].attendee;
      }
    } else {
      id_Customer = company;
    }

    //VARIABLES: LOAD CUSTOMER OBJECT
    //var id_Customer = obj_contexto.newRecord.fields.company;
    //ACTION: TRY TO LOAD CUSTOMER OBJECT ONLY TO GET SUBSIDIARY
    try {
      obj_customer = record.load({ type: "customer", id: id_Customer });
      //VARIABLES: VALUES CUSTOMER OBJECT
      value_customer_subsidiary = obj_customer.getValue({
        fieldId: "subsidiary"
      }); // CUSTOMER SUBSIDIARY
    } catch (error) {
      log.error(
        "Error load customer", "Error: " + error + " attendee " + id_Customer + " company " + company + " user " + user + " attendee1 " + attendee1 + " attendee2 " + attendee2
        + ' id evento: ' + context.newRecord.id);
    }


    /**
     *  //ACTION: PROCESS ON CREATE CONTEXT
     */
    if (context.type == "edit") {

      //VARIABLES: BOOLEANS OF VALIDATION
      var bool_change = false;
      //VARIABLES: VALUES OF OBJECT CONTEXT NEWRECORD
      var oldRecord_id_resource = obj_contexto.oldRecord.sublists.resource["line 1"].resource; // Id Sucursal del recurso
      var oldRecord_text_calendarevent_detailCancellation = obj_contexto.oldRecord.fields.custevent1;
      var oldRecord_text_calendarevent_starttime = obj_contexto.oldRecord.fields.starttime;
      var oldRecord_text_calendarevent_endtime = obj_contexto.oldRecord.fields.endtime;
      var oldRecord_text_calendarevent_startdate = obj_contexto.oldRecord.fields.startdate;

      //VARIABLES: VALUES OF OBJECT CONTEXT OLDRECORD
      var newRecord_id_resource = obj_contexto.newRecord.sublists.resource["line 1"].resource; // Id Sucursal del recurso
      var newRecord_text_calendarevent_detailCancellation = obj_contexto.newRecord.fields.custevent1;
      var newRecord_text_calendarevent_starttime = obj_contexto.newRecord.fields.starttime;
      var newRecord_text_calendarevent_endtime = obj_contexto.newRecord.fields.endtime;
      var newRecord_text_calendarevent_startdate = obj_contexto.newRecord.fields.startdate;


      //ACTION: COMPARE OLD VALUES VS NEW VALUES TO CHECK IF UPDATE RECORD
      if (oldRecord_id_resource != newRecord_id_resource || oldRecord_text_calendarevent_startdate != newRecord_text_calendarevent_startdate || oldRecord_text_calendarevent_starttime != newRecord_text_calendarevent_starttime || oldRecord_text_calendarevent_endtime != newRecord_text_calendarevent_endtime) {
        bool_change = true;
      }
      //log.debug('DEBUG edit old new VALS', oldRecord_id_resource + newRecord_id_resource + oldRecord_text_calendarevent_startdate + newRecord_text_calendarevent_startdate + oldRecord_text_calendarevent_starttime + newRecord_text_calendarevent_starttime + oldRecord_text_calendarevent_endtime + newRecord_text_calendarevent_endtime);

      /**
       * //TODO: SEND MAIL ONLY IF RECORDTYPE IS CALENDAREVENT AND PREFIX VAL IS 1 OR 2 OR 12 AND SUBSIDIARY IS 19 OR 6
       *
       * PREFIXES
       * 1 = PRO
       * 2 = PRO-SA
       * 12 = VAL
       *
       * SUBSIDIARIES
       * 19 = ALBYA
       * 6 = MEXICO
       *
       */
      //ACTION: IF RECORTYPE IS CALENDAREVENT
      if (recordType == "calendarevent" && bool_change == true) {
        //ACTION: IF PREFIX 1(PRO) OR 2(PRO-SA) OR 12(VAL) OR 8(REV)
        if (prefixVal == "1" || prefixVal == "2" || prefixVal == "12" || prefixVal == "8") {
          //ACTION: IF SUBSIDIARY IS 19 (ALBYA) OR 6 (MEXICO) CALL FUNCTION sendEmail()
          if (value_customer_subsidiary == 19 || value_customer_subsidiary == 6) {
            sendEmail(context, id_Customer, value_customer_subsidiary);
          }
        }
      }
    }


    /**
     * //ACTION: PROCESS ON CREATE CONTEXT
     */
    if (context.type == "create") {
      /**
       * //TODO: SEND MAIL ONLY IF RECORDTYPE IS CALENDAREVENT AND PREFIX VAL IS 1 OR 2 OR 12 AND SUBSIDIARY IS 19 OR 6
       *
       * PREFIXES
       * 1 = PRO
       * 2 = PRO-SA
       * 12 = VAL
       *
       * SUBSIDIARIES
       * 19 = ALBYA
       * 6 = MEXICO
       *
       */
      //ACTION: IF RECORTYPE IS CALENDAREVENT
      if (recordType == "calendarevent") {
        //ACTION: IF PREFIX 1(PRO) OR 2(PRO-SA) OR 12(VAL) OR 8(REV)
        if (prefixVal == "1" || prefixVal == "2" || prefixVal == "12" || prefixVal == "8") {
          //ACTION: IF SUBSIDIARY IS 19 (ALBYA) OR 6 (MEXICO) CALL FUNCTION sendEmail()
          if (value_customer_subsidiary == 19 || value_customer_subsidiary == 6) {
            sendEmail(context, id_Customer, value_customer_subsidiary);
          }
        }
      }
    }
    //log.debug('Values afterSubmit', 'recordType ' + recordType + ' typeof ' + typeof recordType + ' prefijo: ' + prefixVal + ' typeof ' + typeof prefixVal);
  }


  /**
   * ********************** *
   *                        *
   * SUPPORT FUNCTIONS AREA *
   *                        *
   * ************************
   */
  /** 
   * //FUNCTION: sendEmail(obj_contexto, id_subsidiary)
   * @param {object} context CONTEXT OBJECT
   * @param {int} id_customer ID CUSTOMER
   * @param {int} id_subsidiary ID CUSTOMER SUBSIDIARY
  */
  function sendEmail(context, id_Customer, id_subsidiary) {
    /**
     * //TODO: GET CONTEXT, CONVERT CONTEXT IN JSON OBJECT, LOAD CALENDAREVENT OBJECT, LOAD CUSTOMER OBJECT
     */
    //VARIABLES: CONTEXT JSON OBJECT
    var json_contexto = JSON.stringify(context);
    var obj_contexto = JSON.parse(json_contexto);

    //VARIABLES: GLOBALES
    var obj_customer = '';
    var obj_calendarevent = '';
    var text_customer_email = '';
    var bool_existRecurso = false;
    var complemento_sucursal = '';


    //VARIABLES: VALUES OF OBJECT CONTEXT BASE FIELDS
    var id_CalendarEvent = obj_contexto.newRecord.id;
    var type_CalendarEvent = obj_contexto.newRecord.type;
    var id_user = obj_contexto.newRecord.fields.nluser;
    var text_resource = obj_contexto.newRecord.sublists.resource["line 1"].location; // Nombre Sucursal del recurso
    text_resource = text_resource.replace(" KHG", "");
    var id_resource = obj_contexto.newRecord.sublists.resource["line 1"].resource; // Id Sucursal del recurso
    var text_calendarevent_starttime = obj_contexto.newRecord.fields.starttime;
    var text_calendarevent_endtime = obj_contexto.newRecord.fields.endtime;
    var text_calendarevent_startdate = obj_contexto.newRecord.fields.startdate;
    var value_calendarevent_prefix = obj_contexto.newRecord.fields.custevent70;
    var text_calendarevent_timezone = obj_contexto.newRecord.fields.timezone;
    var text_calendarevent_subject = obj_contexto.newRecord.fields.custevent79;

    log.debug('Tipo de dato', typeof id_resource + ' id del recurso ' + id_resource);
    //VARIABLES: TESTING
    //var recipientEmail = ['rdominguez@kaloni.com', 'osvaldogigo@gmail.com'];
    //var subject = 'Test | New Mail';

    /**
     * //TODO: LOAD CALENDAREVENT AND CUSTOMER OBJECTS
     */
    //VARIABLES: LOAD CUSTOMER OBJECT
    try {
      obj_customer = record.load({ type: "customer", id: id_Customer });
      //VARIABLES: VALUES CUSTOMER OBJECT
      var value_customer_subsidiary = obj_customer.getValue({
        fieldId: "subsidiary"
      });
      text_customer_email = obj_customer.getText({
        fieldId: "email"
      });
    } catch (error) {
      log.error("Error load customer", "Error: " + error);
    }
    /*     //VARIABLES: LOAD CALENDAREVENT OBJECT
        try {
          obj_calendarevent = record.load({
            type: "calendarevent",
            id: id_CalendarEvent
          });
          //VARIABLES: VALUES CALENDAREVENT OBJECT
          var value_calendarevent_sucursal = obj_calendarevent.getValue({
            fieldId: "custevent2"
          });
          var text_calendarevent_sucursal = obj_calendarevent.getText({
            fieldId: "custevent2"
          });
          var text_calendarevent_starttime = obj_calendarevent.getText({
            fieldId: "starttime"
          });
          var text_calendarevent_endtime = obj_calendarevent.getText({
            fieldId: "endtime"
          });
          var text_calendarevent_startdate = obj_calendarevent.getText({
            fieldId: "startdate"
          });
          var value_calendarevent_prefix = obj_calendarevent.getValue({
            fieldId: "custevent70"
          });
          var text_calendarevent_timezone = obj_calendarevent.getText({
            fieldId: "timezone"
          });
          var text_calendarevent_subject = obj_calendarevent.getText({
            fieldId: "custevent79"
          });
          text_calendarevent_sucursal = text_resource.replace(" KHG","");
        } catch (error) {
          log.error("Error load calendarevent", "Error: " + error);
        } */


    /**
     * //TODO: CREATE GLOBAL VARIABLES
     */
    var image_logo = "";
    var image_map = "";
    var url_mapGoogle_place = "";
    var url_mapGoogle_drive = "";
    var url_mapWaze_drive = "";
    var sucursal_address = "";
    var sucursal_phone_text = "";
    var sucursal_phone_value = "";
    var color_id_bodytable = "";
    var color_h1 = "";
    var color_h2 = "";
    var color_h3 = "";
    var color_h4 = "";
    var color_id_preheader = "";
    var color_preheader_textcontent = "";
    var color_preheader_a = "";
    var color_id_header = "";
    var color_header_textcontent = "";
    var color_header_a = "";
    var color_id_body = "";
    var color_body_p = "";
    var color_id_footer = "";
    var color_footer_p = "";
    var color_footer_a = "";
    var color_id_footermap = "";
    var color_footermap_p = "";
    var color_id_templatefooter = "";
    var color_templatefooter_p = "";
    var color_templatefooter_a = "";
    var color_button = "";
    var color_divider = "";
    var color_ = "";
    //VARIABLES: SET URL's TO CALENDAR APP's
    var arr_launch_appCalendars = [];
    var preDate = text_calendarevent_startdate.split("/");
    var date = preDate[2] + "-" + preDate[1] + "-" + preDate[0];
    var startDate = date + "%20" + timeFormat(text_calendarevent_starttime);
    var endDate = date + "%20" + timeFormat(text_calendarevent_endtime);
    var timeZone = text_calendarevent_timezone.substr(
      text_calendarevent_timezone.indexOf("/", 0),
      text_calendarevent_timezone.length
    );
    var subject = "";
    var recipientEmail = [text_customer_email];
    if (id_resource === '229' || id_resource === '224' || id_resource === '231' || id_resource === '232' || id_resource === '224' || id_resource === '236' || id_resource === '240' || id_resource === '231' || id_resource === '234' || id_resource === '238' || id_resource === '232' || id_resource === '235' || id_resource === '239') {
      subject = "🗓 Albya | " + text_calendarevent_subject;
    } else if (id_resource === '88' || id_resource === '112' || id_resource === '113' || id_resource === '114' || id_resource === '115' || id_resource === '97' || id_resource === '85' || id_resource === '93' || id_resource === '83' || id_resource === '106' || id_resource === '117' || id_resource === '118' || id_resource === '86' || id_resource === '81' || id_resource === '105' || id_resource === '143' || id_resource === '91' || id_resource === '82' || id_resource === '96' || id_resource === '84') {
      subject = "🗓 Kaloni | " + text_calendarevent_subject;
    }
    var description = "";
    var location = "";
    var link = "";
    var appCalendars = [
      { title: "google", name: "Google Calendar" },
      { title: "outlookonline", name: "Outlook Online" },
      { title: "yahoo", name: "Yahoo! Calendar" },
      { title: "outlook", name: "Outlook" },
      { title: "ical", name: "iCalendar" }
    ];

    //log.debug('DEBUG array app calendars', arr_launch_appCalendars);
    //log.debug("DEBUG", startDate + " " + endDate);

    /**
     * //TODO: OBJECTS TO LOAD IMAGES, ICONS AND LOGOS IMAGES
     */
    //VARIABLES: URL BASE TO NETSUITE APP
    var urlBase = "https://3559763.app.netsuite.com/";
    //VARIABLES: LOGOS
    var logo_kaloni = file.load({ id: 5522139 });
    var logo_albya = file.load({ id: 5522141 });
    //VARIABLES: ICONS
    var icon_calendar_google = file.load({ id: 5519274 });
    var icon_calendar_outlook = file.load({ id: 5519286 });
    var icon_calendar_yahoo = file.load({ id: 5519287 });
    var icon_calendar_outlookOffice = file.load({ id: 5519281 });
    var icon_calendar_iCalendar = file.load({ id: 5519280 });
    var icon_link_facebook = file.load({ id: 5519289 });
    var icon_link_twitter = file.load({ id: 5519290 });
    var icon_link_website = file.load({ id: 5519310 });
    //VARIABLES: IMAGES MAPS KALONI
    var images_map_Kaloni_Altavista = file.load({ id: 5530170 });
    var images_map_Kaloni_Cancun = file.load({ id: 5530171 });
    var images_map_Kaloni_Chihuahua = file.load({ id: 5530172 });
    var images_map_Kaloni_Guadalajara = file.load({ id: 5530173 });
    var images_map_Kaloni_Monterrey = file.load({ id: 5530174 });
    var images_map_Kaloni_Polanco = file.load({ id: 5530175 });
    var images_map_Kaloni_Puebla = file.load({ id: 5530176 });
    var images_map_Kaloni_SantaFe = file.load({ id: 5530177 });
    var images_map_Kaloni_Satelite = file.load({ id: 5530178 });
    var images_map_Kaloni_Tijuana = file.load({ id: 5530180 });
    var images_map_Kaloni_Veracruz = file.load({ id: 5530181 });
    //VARIABLES: IMAGES MAPS ALBYA
    var images_map_Albya_Polanco = file.load({ id: 5576667 });
    var images_map_Albya_GuadalajaraChiu = file.load({ id: 6176387 });
    var images_map_Albya_Chihuahua = file.load({ id: 6325462 });
    var images_map_Albya_Cancun = file.load({ id: 6325448 });

    /**
     * //TODO: VALIDATIONS AND SETTING GLOBAL VARIABLES
     */
    //ACTION: IF SUBSIDIARY IS 19 (ALBYA)
    if (id_resource === '229' || id_resource === '233' || id_resource === '237' || id_resource === '224' || id_resource === '236' || id_resource === '240' || id_resource === '231' || id_resource === '234' || id_resource === '238' || id_resource === '232' || id_resource === '235' || id_resource === '239') {
      image_logo = urlBase + logo_albya.url;
      color_id_bodytable = "#ecf0f9";
      color_h1 = "#0b2363";
      color_h2 = "#0b2363";
      color_h3 = "#f3736c";
      color_h4 = "#f3736c";
      color_id_preheader = "#ffffff";
      color_preheader_textcontent = "#737c85";
      color_preheader_a = "#327fc6";
      color_id_header = "#ffffff";
      color_header_textcontent = "#b42c2c";
      color_header_a = "#ffffff";
      color_id_body = "#ffffff";
      color_body_p = "#0f145b";
      color_body_a = "#0f145b";
      color_id_footer = "";
      color_footer_p = "#0f145b";
      color_footer_a = "#6dc6dd";
      color_id_footermap = "#0b2363";
      color_footermap_p = "#6dc6dd";
      color_id_templatefooter = "#ffffff";
      color_templatefooter_p = "#244175";
      color_templatefooter_a = "#327fc6";
      color_button = "#0f145b";
      color_divider = "";

      if (id_resource === '229' || id_resource === '233' || id_resource === '237') {
        //Polanco Albya
        image_map = urlBase + images_map_Albya_Polanco.url;
        sucursal_address =
          "Anatole France 145, Polanco, Polanco III Secc, Miguel Hidalgo, 11550 Ciudad de México, CDMX";
        sucursal_phone_text = "(55) 5555 - 5555";
        sucursal_phone_text = "55555555";
        url_mapGoogle_place =
          "https://www.google.com.mx/maps/place/Anatole+France+145,+Polanco,+Polanco+III+Secc,+Miguel+Hidalgo,+11550+Ciudad+de+M%C3%A9xico,+CDMX/@19.4331961,-99.199514,17z/data=!3m1!4b1!4m5!3m4!1s0x85d20203b32482db:0xbc4de48443fef7aa!8m2!3d19.4331911!4d-99.1973253";
        url_mapGoogle_drive =
          "https://www.google.com.mx/maps/dir//Anatole+France+145,+Polanco,+Polanco+III+Secc,+Miguel+Hidalgo,+11550+Ciudad+de+M%C3%A9xico,+CDMX/@19.4331961,-99.199514,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x85d20203b32482db:0xbc4de48443fef7aa!2m2!1d-99.1973253!2d19.4331911";
        url_mapWaze_drive =
          "https://www.waze.com/es-419/livemap/directions?utm_campaign=waze_website&utm_source=waze_website&to=ll.19.4331911%2C-99.1973253";
        complemento_sucursal = 'Polanco';
        bool_existRecurso = true;
      } else if (id_resource === '224' || id_resource === '236' || id_resource === '240') {
        //Guadalajara Chiu Albya
        image_map = urlBase + images_map_Albya_GuadalajaraChiu.url;
        sucursal_address =
          "Av. Acueducto 6075A, Puerta de Hierro, 45116 Zapopan, Jal.";
        sucursal_phone_text = "(55) 5555 - 5555";
        sucursal_phone_text = "55555555";
        url_mapGoogle_place =
          "https://www.google.com.mx/maps/place/Corporativo+Diamante/@20.7235825,-103.4205858,17z/data=!4m12!1m6!3m5!1s0x8428af11c3d54b2d:0xa857916af16c85d4!2sCorporativo+Diamante!8m2!3d20.7235775!4d-103.4183971!3m4!1s0x8428af11c3d54b2d:0xa857916af16c85d4!8m2!3d20.7235775!4d-103.4183971";
        url_mapGoogle_drive =
          "https://www.google.com.mx/maps/dir//Corporativo+Diamante,+Av.+Acueducto+6075A,+Puerta+de+Hierro,+45116+Zapopan,+Jal./@20.7235825,-103.4205858,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8428af11c3d54b2d:0xa857916af16c85d4!2m2!1d-103.4183971!2d20.7235775";
        url_mapWaze_drive =
          "https://www.waze.com/es-419/livemap/directions/mexico/jalisco/zapopan/corporativo-diamante?place=ChIJLUvVwxGvKIQR1IVs8WqRV6g";
          complemento_sucursal = 'Guadalajara';
        bool_existRecurso = true;
      } else if (id_resource === '231' || id_resource === '234' || id_resource === '238') {
        //Cancún (Albya)
        image_map = urlBase + images_map_Albya_Cancun.url;
        sucursal_address =
          "Av. Sayil 30, 7, 77503 Cancún, Q.R.";
        sucursal_phone_text = "(55) 5555 - 5555";
        sucursal_phone_text = "55555555";
        url_mapGoogle_place =
          "https://www.google.com/maps/place/Corporativo+Malec%C3%B3n+Am%C3%A9ricas/@21.1454539,-86.8233471,17z/data=!4m12!1m6!3m5!1s0x8f4c2bfd7c7b0907:0x6eee094d03b0fb5c!2sCorporativo+Malec%C3%B3n+Am%C3%A9ricas!8m2!3d21.1460278!4d-86.8221354!3m4!1s0x8f4c2bfd7c7b0907:0x6eee094d03b0fb5c!8m2!3d21.1460278!4d-86.8221354";
        url_mapGoogle_drive =
          "https://www.google.com/maps/dir//Corporativo+Malec%C3%B3n+Am%C3%A9ricas,+Av.+Sayil+30,+7,+77503+Canc%C3%BAn,+Q.R./@21.1454539,-86.8233471,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8f4c2bfd7c7b0907:0x6eee094d03b0fb5c!2m2!1d-86.8221354!2d21.1460278";
        url_mapWaze_drive =
          "https://www.waze.com/es-419/livemap/directions?to=ll.21.1498654%2C-86.8223331";
          complemento_sucursal = 'Cancún';
        bool_existRecurso = true;
      } else if (id_resource === '232' || id_resource === '235' || id_resource === '239') {
        //Chihuahua (Albya)
        image_map = urlBase + images_map_Albya_Chihuahua.url;
        sucursal_address =
          "Calle Ramírez Calderón 600, San Felipe I Etapa, 31203 Chihuahua, Chih.";
        sucursal_phone_text = "(55) 5555 - 5555";
        sucursal_phone_text = "55555555";
        url_mapGoogle_place =
          "https://www.google.com.mx/maps/place/Corporativo+San+Felipe/@28.6439172,-106.0917375,16.5z/data=!4m5!3m4!1s0x86ea434bc1377eb7:0x45bea7c4030b783d!8m2!3d28.6443765!4d-106.0897303";
        url_mapGoogle_drive =
          "https://www.google.com.mx/maps/dir//Corporativo+San+Felipe,+Calle+Ram%C3%ADrez+Calder%C3%B3n+600,+San+Felipe+I+Etapa,+31203+Chihuahua,+Chih./@28.6439172,-106.0917375,16.5z/data=!4m8!4m7!1m0!1m5!1m1!1s0x86ea434bc1377eb7:0x45bea7c4030b783d!2m2!1d-106.0897303!2d28.6443765";
        url_mapWaze_drive =
          "https://www.waze.com/es-419/livemap/directions?to=ll.28.6443765%2C-106.0897303";
          complemento_sucursal = 'Chihuahua';
        bool_existRecurso = true;
      }

      if (id_subsidiary == 19){
        text_resource = complemento_sucursal;
      } else {
        text_resource = text_resource;
      }

      //ACTION: ELSE IF SUBSIDIARY IS 6 (MEXICO)
    } else if (id_resource === '88' || id_resource === '112' || id_resource === '113' || id_resource === '114' || id_resource === '115' || id_resource === '97' || id_resource === '85' || id_resource === '93' || id_resource === '83' || id_resource === '106' || id_resource === '117' || id_resource === '118' || id_resource === '86' || id_resource === '81' || id_resource === '105' || id_resource === '143' || id_resource === '91' || id_resource === '82' || id_resource === '96' || id_resource === '84') {
      image_logo = urlBase + logo_kaloni.url;
      color_id_bodytable = "#ebf4fd";
      color_h1 = "#0b2363";
      color_h2 = "#0b2363";
      color_h3 = "#65708c";
      color_h4 = "#c47777";
      color_id_preheader = "#ffffff";
      color_preheader_textcontent = "#737c85";
      color_preheader_a = "#327fc6";
      color_id_header = "#0b2363";
      color_header_textcontent = "#b42c2c";
      color_header_a = "#2b6b7a";
      color_id_body = "#d6e8fa";
      color_body_p = "#0b2363";
      color_body_a = "#0b2363";
      color_id_footer = "";
      color_footer_p = "#0b2363";
      color_footer_a = "#6dc6dd";
      color_id_footermap = "#0b2363";
      color_footermap_p = "#6dc6dd";
      color_id_templatefooter = "#d6e8fa";
      color_templatefooter_p = "#244175";
      color_templatefooter_a = "#6dc6dd";
      color_button = "#244175";
      color_divider = "#244175";

      if (id_resource === '88') { // 88 Valoracion Altavista
        //Altavista KHG
        image_map = urlBase + images_map_Kaloni_Altavista.url;
        sucursal_address =
          "Altavista No. 160, Col. San Angel-Inn, Alcaldía Álvaro Obregón, Ciudad de México C.P. 01000.";
        sucursal_phone_text = "(55) 5550 - 3001";
        sucursal_phone_value = "5555503001";
        url_mapGoogle_place =
          "https://www.google.com.mx/maps/place/Kaloni+Altavista/@19.348965,-99.2003647,17z/data=!3m1!4b1!4m5!3m4!1s0x85d2001b207b134d:0x362ae12d944ac07c!8m2!3d19.348965!4d-99.198176";
        url_mapGoogle_drive =
          "https://www.google.com.mx/maps/dir//Kaloni+Altavista+%E2%80%A2+Hair+%7C+Skin+%7C+Body,+Col,+Av.+Altavista+160,+San+%C3%81ngel,+01060+Ciudad+de+M%C3%A9xico,+CDMX/@19.3490999,-99.1992451,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x85d2001b207b134d:0x362ae12d944ac07c!2m2!1d-99.1970564!2d19.3490999";
        url_mapWaze_drive =
          "https://www.waze.com/es-419/livemap/directions?to=place.ChIJTRN7IBsA0oURfMBKlC3hKjY";
        bool_existRecurso = true;
      }
      if (id_resource === '112' || id_resource === '113') { // Valoraciones Can-Cun | Procedimientos Sala 1 Can-Cún
        //Can-Cun KHG
        image_map = urlBase + images_map_Kaloni_Cancun.url;
        sucursal_address =
          "Plaza Azuna Av. Sayil esquina con Av. Savignac Malecón Tajamar, Locales 306, 307 y 308 Cancún, Quintana Roo C.P. 77500.";
        sucursal_phone_text = "(998) 500 - 2030";
        sucursal_phone_value = "9985002030";
        url_mapGoogle_place =
          "https://www.google.com/maps/place/Av.+Sayil+MZ+5+LT+2A+SM+6,+Zona+Hotelera,+77500+Canc%C3%BAn,+Q.R./@21.1487325,-86.8211587,18z/data=!4m13!1m7!3m6!1s0x8f4c295797c8e73d:0xe69446a8bec2ad47!2sAv.+Sayil+MZ+5+LT+2A+SM+6,+Zona+Hotelera,+77500+Canc%C3%BAn,+Q.R.!3b1!8m2!3d21.1489723!4d-86.8203532!3m4!1s0x8f4c295797c8e73d:0xe69446a8bec2ad47!8m2!3d21.1489723!4d-86.8203532";
        url_mapGoogle_drive =
          "https://www.google.com/maps/dir//Av.+Sayil+MZ+5+LT+2A+SM+6,+Zona+Hotelera,+77500+Canc%C3%BAn,+Q.R./@21.1487325,-86.8211587,18z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8f4c295797c8e73d:0xe69446a8bec2ad47!2m2!1d-86.820269!2d21.1487279";
        url_mapWaze_drive =
          "https://www.waze.com/es-419/livemap/directions?to=place.ChIJLcxjDVcpTI8RrlqUcKP2XG4";
        bool_existRecurso = true;
      }
      if (id_resource === '114' || id_resource === '115') { // Valoraciones Chihuahua KHG | Procedimientos Sala 1 CHiH KHG
        //Chihuahua KHG
        image_map = urlBase + images_map_Kaloni_Chihuahua.url;
        sucursal_address =
          "Edificio Vetro Plaza Distrito Uno Calle Vía Trentino No. 5710 Local 106 Sector 49 Chihuahua, Chihuahua C.P. 31115.";
        sucursal_phone_text = "(614) 350-0170";
        sucursal_phone_value = "6143500170";
        url_mapGoogle_place =
          "https://www.google.com.mx/maps/place/Kaloni+Chihuahua/@28.6632907,-106.131237,17z/data=!3m1!4b1!4m5!3m4!1s0x86ea42f3d7598d65:0x5c48caaecb79c7c3!8m2!3d28.663286!4d-106.129043";
        url_mapGoogle_drive =
          "https://www.google.com.mx/maps/dir//Kaloni+Chihuahua+%E2%80%A2+Hair+%7C+Skin+%7C+Body,+Av.+Perif%C3%A9rico+de+la+Juventud+Plaza+Distrito+1,+V%C3%ADa+Trentino+%23+5710,+31110+Chihuahua,+Chih./@28.663124,-106.1307187,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x86ea42f3d7598d65:0x5c48caaecb79c7c3!2m2!1d-106.12853!2d28.663124";
        url_mapWaze_drive =
          "https://www.waze.com/es-419/livemap/directions?to=place.ChIJZY1Z1_NC6oYRw8d5y67KSFw";
        bool_existRecurso = true;
      }
      if (id_resource === '97' || id_resource === '85') { // Valoraciones Guadalajara KHG | Procedimientos Sala 1 GDL KHG
        //Guadalajara KHG
        image_map = urlBase + images_map_Kaloni_Guadalajara.url;
        sucursal_address =
          "Condominio Centro Médico Puerta de Hierro, Torre Médica C, Boulevard Puerta de Hierro No. 5150, Consultorios 403C, 404C y 405C, Zapopan, Jalisco, C.P. 45640.";
        sucursal_phone_text = "(33) 1493 – 0650";
        sucursal_phone_value = "3314930650";
        url_mapGoogle_place =
          "https://www.google.com.mx/maps/place/Kaloni+Guadalajara/@20.7097187,-103.4142111,17.02z/data=!4m8!1m2!2m1!1sKaloni+Guadalajara!3m4!1s0x8428af029486d7cd:0xe2edf41d5152bbb1!8m2!3d20.709042!4d-103.413869";
        url_mapGoogle_drive =
          "https://www.google.com.mx/maps/dir//Kaloni+Guadalajara+%E2%80%A2+Hair+%7C+Skin+%7C+Body,+Blvrd+Puerta+de+Hierro+5150,+Puerta+de+Hierro,+45116+Zapopan,+Jal./@20.7097187,-103.4142111,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8428af029486d7cd:0xe2edf41d5152bbb1!2m2!1d-103.4141477!2d20.7089143";
        url_mapWaze_drive =
          "https://www.waze.com/es-419/livemap/directions?to=place.ChIJzdeGlAKvKIQRsbtSUR307eI";
        bool_existRecurso = true;
      }
      if (id_resource === '93' || id_resource === '83') { // Valoración Monterrey KHG | Procedimientos Sala 1 MTY KHG
        //Monterrey KHG
        image_map = urlBase + images_map_Kaloni_Monterrey.url;
        sucursal_address =
          "Calzada del Valle No. 201 Oriente Local A, Col. Del Valle, San Pedro Garza García, Nuevo León C.P. 66220.";
        sucursal_phone_text = "(81) 1454 – 0256";
        sucursal_phone_value = "8114540256";
        url_mapGoogle_place =
          "https://www.google.com.mx/maps/place/Kaloni+Monterrey/@25.6563658,-100.367843,17z/data=!3m1!4b1!4m5!3m4!1s0x8662bdee8eb6b863:0x352ca11c7c2dc840!8m2!3d25.656361!4d-100.365649";
        url_mapGoogle_drive =
          "https://www.google.com.mx/maps/dir//Kaloni+Monterrey+%E2%80%A2+Hair+%7C+Skin+%7C+Body,+Fraccionamento,+Calz.+del+Valle+Alberto+Santos+201,+Del+Valle,+66220+San+Pedro+Garza+Garc%C3%ADa,+N.L./@25.656361,-100.3678377,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8662bdee8eb6b863:0x352ca11c7c2dc840!2m2!1d-100.365649!2d25.656361";
        url_mapWaze_drive =
          "https://www.waze.com/es-419/livemap/directions?to=place.ChIJY7i2ju69YoYRQMgtfByhLDU";
        bool_existRecurso = true;
      }
      if (id_resource === '106') { // Valoraciones Polanco Homero
        //Polanco KHG
        image_map = urlBase + images_map_Kaloni_Polanco.url;
        sucursal_address =
          "Anatole France 145, Polanco, Polanco III Secc, Miguel Hidalgo, 11550 Ciudad de México, CDMX";
        sucursal_phone_text = "(55) 1204 - 5300";
        sucursal_phone_value = "5512045300";
        url_mapGoogle_place =
          "https://www.google.com.mx/maps/place/Kaloni+Polanco+%E2%80%A2+Hair+%7C+Skin+%7C+Body/@19.4356245,-99.1982809,17z/data=!3m1!4b1!4m5!3m4!1s0x85d20203f9f6721b:0x207c6402eadffb41!8m2!3d19.4356245!4d-99.1960922";
        url_mapGoogle_drive =
          "https://www.google.com.mx/maps/dir//Kaloni+Polanco+%E2%80%A2+Hair+%7C+Skin+%7C+Body,+Av.+Homero+No.+908,+Polanco,+Polanco+III+Secc,+Miguel+Hidalgo,+11550+Ciudad+de+M%C3%A9xico,+CDMX/@19.4356245,-99.1982809,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x85d20203f9f6721b:0x207c6402eadffb41!2m2!1d-99.1960922!2d19.4356245";
        url_mapWaze_drive =
          "https://www.waze.com/es-419/livemap/directions?to=place.ChIJG3L2-QMC0oURQfvf6gJkfCA";
        bool_existRecurso = true;
      }
      if (id_resource === '117' || id_resource === '118') { // Valoraciones Puebla KHG | Procedimientos Sala 1 Pue khg
        //Puebla KHG
        image_map = urlBase + images_map_Kaloni_Puebla.url;
        sucursal_address =
          "La Plaza Sonata Towers Boulevard Europa No. 17 Int. L2N1 Zona Comercial Fracc. Residencial Lomas de Angelópolis San Andrés Cholula, Puebla C.P. 72830.";
        sucursal_phone_text = "(55) 1204 - 5300";
        sucursal_phone_value = "5512045300";
        url_mapGoogle_place =
          "https://www.google.com.mx/maps/place/Kaloni+Puebla/@18.9959491,-98.281204,17z/data=!3m1!4b1!4m5!3m4!1s0x85cfb871245c659d:0xa44b57ab61a2295e!8m2!3d18.995944!4d-98.27901";
        url_mapGoogle_drive =
          "https://www.google.com.mx/maps/dir//Kaloni+Puebla+%E2%80%A2+Hair+%7C+Skin+%7C+Body,+La+Plaza+Sonata+Towers+Boulevard+Europa+No.+17+Int.+L2N1+Zona+Comercial+Fracc.+Residencial+Lomas+de+Angel%C3%B3polis+San+Andr%C3%A9s+Cholula,+72830+Puebla,+Pue./@18.9953153,-98.2810553,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x85cfb871245c659d:0xa44b57ab61a2295e!2m2!1d-98.2788666!2d18.9953153";
        url_mapWaze_drive =
          "https://www.waze.com/es-419/livemap/directions?to=place.ChIJnWVcJHG4z4URXimiYatXS6Q";
        bool_existRecurso = true;
      }
      if (id_resource === '86' || id_resource === '81') { // Valoración SFE 1 KHG | Procedimientos Sala 1 SFE KHG
        //Santa Fe KHG
        image_map = urlBase + images_map_Kaloni_SantaFe.url;
        sucursal_address =
          "Av. Vasco de Quiroga No. 3900 Int. 401 Torre B Piso 4, Col. Santa Fe, Cuajimalpa, Ciudad de México C.P. 05348.";
        sucursal_phone_text = "(55) 5022 – 1056";
        sucursal_phone_value = "5550221056";
        url_mapGoogle_place =
          "https://www.google.com.mx/maps/place/Kaloni+Science+Center/@19.3618403,-99.2802661,18.33z/data=!4m15!1m9!4m8!1m0!1m6!1m2!1s0x85d200cc180a8e53:0xb0abc3656acb8474!2sKaloni+Science+Center,+Av.+Vasco+de+Quiroga+3900,+Lomas+de+Santa+Fe,+Contadero,+05300+Ciudad+de+M%C3%A9xico,+CDMX!2m2!1d-99.279089!2d19.360818!3m4!1s0x85d200cc180a8e53:0xb0abc3656acb8474!8m2!3d19.360818!4d-99.279089";
        url_mapGoogle_drive =
          "https://www.google.com.mx/maps/dir//Kaloni+Santa+Fe+%E2%80%A2+Hair+%7C+Skin+%7C+Body,+Avenida+Vasco+de+Quiroga+3900+Torre+B+piso+4,+Santa+Fe,+Cuajimalpa+de+Morelos,+05348+CDMX/@19.3618403,-99.2802661,18z/data=!4m8!4m7!1m0!1m5!1m1!1s0x85d20734ab8f2cd1:0xdb5f40d57f261023!2m2!1d-99.2787432!2d19.3610198";
        url_mapWaze_drive =
          "https://www.waze.com/es-419/livemap/directions?to=place.ChIJ0SyPqzQH0oURIxAmf9VAX9s";
        bool_existRecurso = true;
      }
      if (id_resource === '105' || id_resource === '143') { // Valoraciones Satelite KHG | Procedimientos
        //Satelite KHG
        image_map = urlBase + images_map_Kaloni_Satelite.url;
        sucursal_address =
          "Pafnuncio Padilla No. 10, Cd. Satélite, Naucalpan de Juárez, Estado de México C.P. 53100.";
        sucursal_phone_text = "(55) 1204-5302";
        sucursal_phone_value = 5512045302;
        url_mapGoogle_place =
          "https://www.google.com.mx/maps/place/Kaloni+Sat%C3%A9lite/@19.513208,-99.235372,17z/data=!3m1!4b1!4m5!3m4!1s0x85d202d7da1b98d3:0x3acfe835f352bc3d!8m2!3d19.513203!4d-99.233178";
        url_mapGoogle_drive =
          "https://www.google.com.mx/maps/dir//Kaloni+Sat%C3%A9lite+%E2%80%A2+Hair+%7C+Skin+%7C+Body,+Pafnuncio+Padilla+10,+Cd.+Sat%C3%A9lite,+53100+Naucalpan+de+Ju%C3%A1rez,+M%C3%A9x./@19.513203,-99.2353667,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x85d202d7da1b98d3:0x3acfe835f352bc3d!2m2!1d-99.233178!2d19.513203";
        url_mapWaze_drive =
          "https://www.waze.com/es-419/livemap/directions?to=place.ChIJ05gb2tcC0oURPbxS8zXozzo";
        bool_existRecurso = true;
      }
      if (id_resource === '91' || id_resource === '82') { // Valoración Tijuana KHG | Procedimientos Sala 1 Tijuana KHG
        //Tijuana KHG
        image_map = urlBase + images_map_Kaloni_Tijuana.url;
        sucursal_address =
          "Edificio Vía Corporativo Zona Urbana Rio, Misión de San Javier No. 10643 Interior 101, Tijuana, Baja California C.P. 22010.";
        sucursal_phone_text = "(664) 231-0156";
        sucursal_phone_value = 6642310156;
        url_mapGoogle_place =
          "https://www.google.com.mx/maps/place/Kaloni+Tijuana/@32.5210885,-117.010048,17z/data=!3m1!4b1!4m5!3m4!1s0x80d9486abc7f725d:0xb390a60ec6bb3a6e!8m2!3d32.521084!4d-117.007854";
        url_mapGoogle_drive =
          "https://www.google.com.mx/maps/dir//Kaloni+Tijuana+%E2%80%A2+Hair+%7C+Skin+%7C+Body,+Edificio+V%C3%ADa+Corporativo,+Misi%C3%B3n+de+San+Javier+10643,+Zona+Urbana+Rio+Tijuana,+22010+Tijuana,+B.C./@32.5212736,-117.0097348,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x80d9486abc7f725d:0xb390a60ec6bb3a6e!2m2!1d-117.0075461!2d32.5212736";
        url_mapWaze_drive =
          "https://www.waze.com/es-419/livemap/directions?to=place.ChIJXXJ_vGpI2YARbjq7xg6mkLM";
        bool_existRecurso = true;
      }
      if (id_resource === '96' || id_resource === '84') { // Valoraciones Veracruz KHG | Procedimientos Sala 1 VER KHG
        //Veracruz KHG
        image_map = urlBase + images_map_Kaloni_Veracruz.url;
        sucursal_address =
          "Av. Juan Pablo II No. 390 PB Local 1 y 2 Fraccionamiento Costa de Oro, Boca del Río, Veracruz C.P. 94300.";
        sucursal_phone_text = "(22) 9273 – 1400";
        sucursal_phone_value = 2292731400;
        url_mapGoogle_place =
          "https://www.google.com.mx/maps/place/Kaloni+Cl%C3%ADnica+Veracruz/@19.1598744,-96.1080673,17z/data=!3m1!4b1!4m5!3m4!1s0x85c340de6e82cbef:0x67b7520c313d161c!8m2!3d19.1598693!4d-96.1058733";
        url_mapGoogle_drive =
          "https://www.google.com.mx/maps/dir//Kaloni+Veracruz+Hair+%7C+Skin+%7C+Body,+Av.+Juan+Pablo+II+No.+390+Fraccionamiento+Costa+de+Oro+PB+Local+1+y+2+Fraccionamiento,+Costa+de+Oro,+94300+Ver./@19.1598693,-96.108062,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x85c340de6e82cbef:0x67b7520c313d161c!2m2!1d-96.1058733!2d19.1598693";
        url_mapWaze_drive =
          "https://www.waze.com/es-419/livemap/directions?to=place.ChIJ78uCbt5Aw4URHBY9MQxSt2c";
        bool_existRecurso = true;
      }
    }

    if (bool_existRecurso == true) {

      //ACTION: Generate the url links to add calendars to apps trought array
      appCalendars.forEach(function (elements) {
        link = "http://addtocalendar.com/atc/";
        link += elements.title;
        link +=
          "?utz=60&uln=en&vjs=1.5&e[0][date_start]=" +
          encodeURIComponent(startDate);
        link += "&e[0][date_end]=" + encodeURIComponent(endDate);
        link += "&e[0][timezone]=America" + encodeURIComponent(timeZone);
        link += "&e[0][title]=" + encodeURIComponent(subject);
        link += "&e[0][description]=" + encodeURIComponent(description);
        link += "&e[0][location]=" + encodeURIComponent(location);

        arr_launch_appCalendars.push(link);
      });

      var body =
        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">' +
        '<html xmlns="http://www.w3.org/1999/xhtml">' +
        "<head>" +
        "<!-- NAME: 1:2 COLUMN -->" +
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        "<title>Confirmación de citas </title>" +
        '<style type="text/css">' +
        "body," +
        "#bodyTable," +
        "#bodyCell {" +
        "height: 100% !important;" +
        "margin: 0;" +
        "padding: 0;" +
        "width: 100% !important;" +
        "}" +
        "table {" +
        "border-collapse: collapse;" +
        "}" +
        "img," +
        "a img {" +
        "border: 0;" +
        "outline: none;" +
        "text-decoration: none;" +
        "}" +
        "h1," +
        "h2," +
        "h3," +
        "h4," +
        "h5," +
        "h6 {" +
        "margin: 0;" +
        "padding: 0;" +
        "}" +
        "p {" +
        "margin: 1em 0;" +
        "padding: 0;" +
        "}" +
        "a {" +
        "word-wrap: break-word;" +
        "text-decoration: none;" +
        "}" +
        ".ReadMsgBody {" +
        "width: 100%;" +
        "}" +
        ".ExternalClass {" +
        "width: 100%;" +
        "}" +
        ".ExternalClass," +
        ".ExternalClass p," +
        ".ExternalClass span," +
        ".ExternalClass font," +
        ".ExternalClass td," +
        ".ExternalClass div {" +
        "line-height: 100%;" +
        "}" +
        "table," +
        "td {" +
        "mso-table-lspace: 0pt;" +
        "mso-table-rspace: 0pt;" +
        "}" +
        "#outlook a {" +
        "padding: 0;" +
        "}" +
        "img {" +
        "-ms-interpolation-mode: bicubic;" +
        "}" +
        "body," +
        "table," +
        "td," +
        "p," +
        "a," +
        "li," +
        "blockquote {" +
        "-ms-text-size-adjust: 100%;" +
        "-webkit-text-size-adjust: 100%;" +
        "}" +
        "#bodyCell {" +
        "padding: 20px;" +
        "border-top: 0;" +
        "}" +
        ".Image {" +
        "vertical-align: bottom;" +
        "}" +
        ".TextContent img {" +
        "height: auto !important;" +
        "}" +
        "/*" +
        "@tab Page" +
        "@section background style" +
        "@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding." +
        "*/" +
        "body," +
        "#bodyTable {" +
        "/*@editable*/" +
        "background-color: " +
        color_id_bodytable +
        ";" +
        "}" +
        "/*" +
        "@tab Page" +
        "@section background style" +
        "@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding." +
        "*/" +
        "#bodyCell {" +
        "/*@editable*/" +
        "border-top: 0;" +
        "}" +
        "/*" +
        "@tab Page" +
        "@section email border" +
        "@tip Set the border for your email." +
        "*/" +
        "#templateContainer {" +
        "/*@editable*/" +
        "border: 0;" +
        "}" +
        "/*" +
        "@tab Page" +
        "@section heading 1" +
        "@tip Set the styling for all first-level headings in your emails. These should be the largest of your headings." +
        "@style heading 1" +
        "*/" +
        "h1 {" +
        "/*@editable*/" +
        "color: " +
        color_h1 +
        " !important;" +
        "display: block;" +
        "/*@editable*/" +
        "font-family: Helvetica;" +
        "/*@editable*/" +
        "font-size: 40px;" +
        "/*@editable*/" +
        "font-style: normal;" +
        "/*@editable*/" +
        "font-weight: bold;" +
        "/*@editable*/" +
        "line-height: 125%;" +
        "/*@editable*/" +
        "letter-spacing: -1px;" +
        "margin: 0;" +
        "/*@editable*/" +
        "text-align: left;" +
        "}" +
        "/*" +
        "@tab Page" +
        "@section heading 2" +
        "@tip Set the styling for all second-level headings in your emails." +
        "@style heading 2" +
        "*/" +
        "h2 {" +
        "/*@editable*/" +
        "color: " +
        color_h2 +
        " !important;" +
        "display: block;" +
        "/*@editable*/" +
        "font-family: Helvetica;" +
        "/*@editable*/" +
        "font-size: 36px;" +
        "/*@editable*/" +
        "font-style: normal;" +
        "/*@editable*/" +
        "font-weight: bold;" +
        "/*@editable*/" +
        "line-height: 125%;" +
        "/*@editable*/" +
        "letter-spacing: -.75px;" +
        "margin: 0;" +
        "/*@editable*/" +
        "text-align: left;" +
        "}" +
        "/*" +
        "@tab Page" +
        "@section heading 3" +
        "@tip Set the styling for all third-level headings in your emails." +
        "@style heading 3" +
        "*/" +
        "h3 {" +
        "/*@editable*/" +
        "color: " +
        color_h3 +
        " !important;" +
        "display: block;" +
        "/*@editable*/" +
        "font-family: Helvetica;" +
        "/*@editable*/" +
        "font-size: 26px;" +
        "/*@editable*/" +
        "font-style: normal;" +
        "/*@editable*/" +
        "font-weight: bold;" +
        "/*@editable*/" +
        "line-height: 125%;" +
        "/*@editable*/" +
        "letter-spacing: -.5px;" +
        "margin: 0;" +
        "/*@editable*/" +
        "text-align: center;" +
        "}" +
        "/*" +
        "@tab Page" +
        "@section heading 4" +
        "@tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings." +
        "@style heading 4" +
        "*/" +
        "h4 {" +
        "/*@editable*/" +
        "color: " +
        color_h4 +
        " !important;" +
        "display: block;" +
        "/*@editable*/" +
        "font-family: Helvetica;" +
        "/*@editable*/" +
        "font-size: 16px;" +
        "/*@editable*/" +
        "font-style: normal;" +
        "/*@editable*/" +
        "font-weight: bold;" +
        "/*@editable*/" +
        "line-height: 125%;" +
        "/*@editable*/" +
        "letter-spacing: normal;" +
        "margin: 0;" +
        "/*@editable*/" +
        "text-align: left;" +
        "}" +
        "/*" +
        "@tab Preheader" +
        "@section preheader style" +
        "@tip Set the background color and borders for your email's preheader area." +
        "*/" +
        "#templatePreheader {" +
        "/*@editable*/" +
        "background-color: " +
        color_id_preheader +
        ";" +
        "/*@editable*/" +
        "border-top: 0;" +
        "/*@editable*/" +
        "border-bottom: 0;" +
        "}" +
        "/*" +
        "@tab Preheader" +
        "@section preheader text" +
        "@tip Set the styling for your email's preheader text. Choose a size and color that is easy to read." +
        "*/" +
        ".preheaderContainer .TextContent," +
        ".preheaderContainer .TextContent p {" +
        "/*@editable*/" +
        "color: " +
        color_preheader_textcontent +
        ";" +
        "/*@editable*/" +
        "font-family: Helvetica;" +
        "/*@editable*/" +
        "font-size: 11px;" +
        "/*@editable*/" +
        "line-height: 125%;" +
        "/*@editable*/" +
        "text-align: left;" +
        "}" +
        "/*" +
        "@tab Preheader" +
        "@section preheader link" +
        "@tip Set the styling for your email's header links. Choose a color that helps them stand out from your text." +
        "*/" +
        ".preheaderContainer .TextContent a {" +
        "/*@editable*/" +
        "color: " +
        color_preheader_a +
        ";" +
        "/*@editable*/" +
        "font-weight: normal;" +
        "/*@editable*/" +
        "text-decoration: underline;" +
        "}" +
        "/*" +
        "@tab Header" +
        "@section header style" +
        "@tip Set the background color and borders for your email's header area." +
        "*/" +
        "#templateHeader {" +
        "/*@editable*/" +
        "background-color: " +
        color_id_header +
        ";" +
        "/*@editable*/" +
        "border-top: 0;" +
        "/*@editable*/" +
        "border-bottom: 0;" +
        "}" +
        "/*" +
        "@tab Header" +
        "@section header text" +
        "@tip Set the styling for your email's header text. Choose a size and color that is easy to read." +
        "*/" +
        ".headerContainer .TextContent," +
        ".headerContainer .TextContent p {" +
        "/*@editable*/" +
        "color: " +
        color_header_textcontent +
        ";" +
        "/*@editable*/" +
        "font-family: Helvetica;" +
        "/*@editable*/" +
        "font-size: 15px;" +
        "/*@editable*/" +
        "line-height: 150%;" +
        "/*@editable*/" +
        "text-align: left;" +
        "}" +
        "/*" +
        "@tab Header" +
        "@section header link" +
        "@tip Set the styling for your email's header links. Choose a color that helps them stand out from your text." +
        "*/" +
        ".headerContainer .TextContent a {" +
        "/*@editable*/" +
        "color: " +
        color_header_a +
        ";" +
        "/*@editable*/" +
        "font-weight: normal;" +
        "/*@editable*/" +
        "text-decoration: underline;" +
        "}" +
        "/*" +
        "@tab Body" +
        "@section body style" +
        "@tip Set the background color and borders for your email's body area." +
        "*/" +
        "#templateBody {" +
        "/*@editable*/" +
        "background-color: " +
        color_id_body +
        ";" +
        "/*@editable*/" +
        "border-top: 0;" +
        "/*@editable*/" +
        "border-bottom: 0;" +
        "}" +
        "/*" +
        "@tab Body" +
        "@section body text" +
        "@tip Set the styling for your email's body text. Choose a size and color that is easy to read." +
        "*/" +
        ".bodyContainer .TextContent," +
        ".bodyContainer .TextContent p {" +
        "/*@editable*/" +
        "color: " +
        color_body_p +
        ";" +
        "/*@editable*/" +
        "font-family: Helvetica;" +
        "/*@editable*/" +
        "font-size: 20px;" +
        "/*@editable*/" +
        "line-height: 150%;" +
        "/*@editable*/" +
        "text-align: left;" +
        "}" +
        "/*" +
        "@tab Body" +
        "@section body text" +
        "@tip Set the styling for your email's body text. Choose a size and color that is easy to read." +
        "*/" +
        ".bodyContainer .TextContentFooterMap," +
        ".bodyContainer .TextContentFooterMap p {" +
        "/*@editable*/" +
        "color: " +
        color_id_footermap +
        ";" +
        "/*@editable*/" +
        "font-family: Helvetica;" +
        "/*@editable*/" +
        "font-size: 16px;" +
        "/*@editable*/" +
        "line-height: 150%;" +
        "/*@editable*/" +
        "text-align: center;" +
        "}" +
        "/*" +
        "@tab Body" +
        "@section body link" +
        "@tip Set the styling for your email's body links. Choose a color that helps them stand out from your text." +
        "*/" +
        ".bodyContainer .TextContent a {" +
        "/*@editable*/" +
        "color: " +
        color_body_a +
        ";" +
        "/*@editable*/" +
        "font-weight: normal;" +
        "/*@editable*/" +
        "text-decoration: underline;" +
        "}" +
        "/*" +
        "@tab Columns" +
        "@section column style" +
        "@tip Set the background color and borders for your email's columns area." +
        "*/" +
        "#templateColumns {" +
        "/*@editable*/" +
        "background-color: #ffffff;" +
        "/*@editable*/" +
        "border-top: 15px none #d85656;" +
        "/*@editable*/" +
        "border-bottom: 15px none #e94c4c;" +
        "}" +
        "/*" +
        "@tab Columns" +
        "@section left column text" +
        "@tip Set the styling for your email's left column text. Choose a size and color that is easy to read." +
        "*/" +
        ".leftColumnContainer .TextContent," +
        ".leftColumnContainer .TextContent p {" +
        "/*@editable*/" +
        "color: #244175;" +
        "/*@editable*/" +
        "font-family: Helvetica;" +
        "/*@editable*/" +
        "font-size: 15px;" +
        "/*@editable*/" +
        "line-height: 100%;" +
        "/*@editable*/" +
        "text-align: left;" +
        "}" +
        "/*" +
        "@tab Columns" +
        "@section left column link" +
        "@tip Set the styling for your email's left column links. Choose a color that helps them stand out from your text." +
        "*/" +
        ".leftColumnContainer .TextContent a {" +
        "/*@editable*/" +
        "color: #6DC6DD;" +
        "/*@editable*/" +
        "font-weight: normal;" +
        "/*@editable*/" +
        "text-decoration: underline;" +
        "}" +
        "/*" +
        "@tab Columns" +
        "@section right column text" +
        "@tip Set the styling for your email's right column text. Choose a size and color that is easy to read." +
        "*/" +
        ".rightColumnContainer .TextContent," +
        ".rightColumnContainer .TextContent p {" +
        "/*@editable*/" +
        "color:#244175;" +
        "/*@editable*/" +
        "font-family: Helvetica;" +
        "/*@editable*/" +
        "font-size: 15px;" +
        "/*@editable*/" +
        "line-height: 150%;" +
        "/*@editable*/" +
        "text-align: left;" +
        "}" +
        "/*" +
        "@tab Columns" +
        "@section right column link" +
        "@tip Set the styling for your email's right column links. Choose a color that helps them stand out from your text." +
        "*/" +
        ".rightColumnContainer .TextContent a {" +
        "/*@editable*/" +
        "color: #6DC6DD;" +
        "/*@editable*/" +
        "font-weight: normal;" +
        "/*@editable*/" +
        "text-decoration: underline;" +
        "}" +
        "/*" +
        "@tab Footer" +
        "@section footer style" +
        "@tip Set the background color and borders for your email's footer area." +
        "*/" +
        "#templateFooter {" +
        "/*@editable*/" +
        "background-color: #d6e8fa;" +
        "/*@editable*/" +
        "border-top: 0;" +
        "/*@editable*/" +
        "border-bottom: 0;" +
        "}" +
        "/*" +
        "@tab Footer" +
        "@section footer text" +
        "@tip Set the styling for your email's footer text. Choose a size and color that is easy to read." +
        "*/" +
        ".footerContainer .TextContent," +
        ".footerContainer .TextContent p {" +
        "/*@editable*/" +
        "color: #244175;" +
        "/*@editable*/" +
        "font-family: Helvetica;" +
        "/*@editable*/" +
        "font-size: 11px;" +
        "/*@editable*/" +
        "line-height: 125%;" +
        "/*@editable*/" +
        "text-align: center;" +
        "}" +
        "/*" +
        "@tab Footer" +
        "@section footer link" +
        "@tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text." +
        "*/" +
        ".footerContainer .TextContent a {" +
        "/*@editable*/" +
        "color: #6DC6DD;" +
        "/*@editable*/" +
        "font-weight: normal;" +
        "/*@editable*/" +
        "text-decoration: underline;" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "body," +
        "table," +
        "td," +
        "p," +
        "a," +
        "li," +
        "blockquote {" +
        "-webkit-text-size-adjust: none !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "body {" +
        "width: 100% !important;" +
        "min-width: 100% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "td[id=bodyCell] {" +
        "padding: 10px !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "table[class=TextContentContainer] {" +
        "width: 100% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "table[class=BoxedTextContentContainer] {" +
        "width: 100% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "table[class=mcpreview-image-uploader] {" +
        "width: 100% !important;" +
        "display: none !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "img[class=Image] {" +
        "width: 90% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "table[class=ImageGroupContentContainer] {" +
        "width: 100% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "td[class=ImageGroupContent] {" +
        "padding: 9px !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "td[class=ImageGroupBlockInner] {" +
        "padding-bottom: 0 !important;" +
        "padding-top: 0 !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "tbody[class=ImageGroupBlockOuter] {" +
        "padding-bottom: 9px !important;" +
        "padding-top: 9px !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "table[class=CaptionTopContent]," +
        "table[class=CaptionBottomContent] {" +
        "width: 100% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "table[class=CaptionLeftTextContentContainer]," +
        "table[class=CaptionRightTextContentContainer]," +
        "table[class=CaptionLeftImageContentContainer]," +
        "table[class=CaptionRightImageContentContainer]," +
        "table[class=ImageCardLeftTextContentContainer]," +
        "table[class=ImageCardRightTextContentContainer] {" +
        "width: 100% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "td[class=ImageCardLeftImageContent]," +
        "td[class=ImageCardRightImageContent] {" +
        "padding-right: 18px !important;" +
        "padding-left: 18px !important;" +
        "padding-bottom: 0 !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "td[class=ImageCardBottomImageContent] {" +
        "padding-bottom: 9px !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "td[class=ImageCardTopImageContent] {" +
        "padding-top: 18px !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "table[class=CaptionLeftContentOuter] td[class=TextContent]," +
        "table[class=CaptionRightContentOuter] td[class=TextContent] {" +
        "padding-top: 9px !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "td[class=CaptionBlockInner] table[class=CaptionTopContent]:last-child td[class=TextContent] {" +
        "padding-top: 18px !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "td[class=BoxedTextContentColumn] {" +
        "padding-left: 18px !important;" +
        "padding-right: 18px !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "td[class=columnsContainer] {" +
        "display: block !important;" +
        "max-width: 600px !important;" +
        "width: 100% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "td[class=TextContent] {" +
        "padding-right: 18px !important;" +
        "padding-left: 18px !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "/*" +
        "@tab Mobile Styles" +
        "@section template width" +
        "@tip Make the template fluid for portrait or landscape view adaptability. If a fluid layout doesn't work for you, set the width to 300px instead." +
        "*/" +
        "table[id=templateContainer]," +
        "table[id=templatePreheader]," +
        "table[id=templateHeader]," +
        "table[id=templateColumns]," +
        "table[class=templateColumn]," +
        "table[id=templateBody]," +
        "table[id=templateFooter] {" +
        "/*@tab Mobile Styles" +
        "@section template width" +
        "@tip Make the template fluid for portrait or landscape view adaptability. If a fluid layout doesn't work for you, set the width to 300px instead.*/" +
        "max-width: 600px !important;" +
        "/*@editable*/" +
        "width: 100% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "/*" +
        "@tab Mobile Styles" +
        "@section heading 1" +
        "@tip Make the first-level headings larger in size for better readability on small screens." +
        "*/" +
        "h1 {" +
        "/*@editable*/" +
        "font-size: 24px !important;" +
        "/*@editable*/" +
        "line-height: 125% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "/*" +
        "@tab Mobile Styles" +
        "@section heading 2" +
        "@tip Make the second-level headings larger in size for better readability on small screens." +
        "*/" +
        "h2 {" +
        "/*@editable*/" +
        "font-size: 20px !important;" +
        "/*@editable*/" +
        "line-height: 125% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "/*" +
        "@tab Mobile Styles" +
        "@section heading 3" +
        "@tip Make the third-level headings larger in size for better readability on small screens." +
        "*/" +
        "h3 {" +
        "/*@editable*/" +
        "font-size: 18px !important;" +
        "/*@editable*/" +
        "line-height: 125% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "/*" +
        "@tab Mobile Styles" +
        "@section heading 4" +
        "@tip Make the fourth-level headings larger in size for better readability on small screens." +
        "*/" +
        "h4 {" +
        "/*@editable*/" +
        "font-size: 16px !important;" +
        "/*@editable*/" +
        "line-height: 125% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "/*" +
        "@tab Mobile Styles" +
        "@section Boxed Text" +
        "@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "*/" +
        "table[class=BoxedTextContentContainer] td[class=TextContent]," +
        "td[class=BoxedTextContentContainer] td[class=TextContent] p {" +
        "/*@editable*/" +
        "font-size: 18px !important;" +
        "/*@editable*/" +
        "line-height: 125% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "/*" +
        "@tab Mobile Styles" +
        "@section Preheader Visibility" +
        "@tip Set the visibility of the email's preheader on small screens. You can hide it to save space." +
        "*/" +
        "table[id=templatePreheader] {" +
        "/*@editable*/" +
        "display: block !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "/*" +
        "@tab Mobile Styles" +
        "@section Preheader Text" +
        "@tip Make the preheader text larger in size for better readability on small screens." +
        "*/" +
        "td[class=preheaderContainer] td[class=TextContent]," +
        "td[class=preheaderContainer] td[class=TextContent] p {" +
        "/*@editable*/" +
        "font-size: 14px !important;" +
        "/*@editable*/" +
        "line-height: 115% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "/*" +
        "@tab Mobile Styles" +
        "@section Header Text" +
        "@tip Make the header text larger in size for better readability on small screens." +
        "*/" +
        "td[class=headerContainer] td[class=TextContent]," +
        "td[class=headerContainer] td[class=TextContent] p {" +
        "/*@editable*/" +
        "font-size: 18px !important;" +
        "/*@editable*/" +
        "line-height: 125% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "/*" +
        "@tab Mobile Styles" +
        "@section Body Text" +
        "@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "*/" +
        "td[class=bodyContainer] td[class=TextContent]," +
        "td[class=bodyContainer] td[class=TextContent] p {" +
        "/*@editable*/" +
        "font-size: 18px !important;" +
        "/*@editable*/" +
        "line-height: 125% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "/*" +
        "@tab Mobile Styles" +
        "@section Left Column Text" +
        "@tip Make the left column text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "*/" +
        "td[class=leftColumnContainer] td[class=TextContent]," +
        "td[class=leftColumnContainer] td[class=TextContent] p {" +
        "/*@editable*/" +
        "font-size: 18px !important;" +
        "/*@editable*/" +
        "line-height: 125% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "/*" +
        "@tab Mobile Styles" +
        "@section Right Column Text" +
        "@tip Make the right column text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "*/" +
        "td[class=rightColumnContainer] td[class=TextContent]," +
        "td[class=rightColumnContainer] td[class=TextContent] p {" +
        "/*@editable*/" +
        "font-size: 18px !important;" +
        "/*@editable*/" +
        "line-height: 125% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "/*" +
        "@tab Mobile Styles" +
        "@section footer text" +
        "@tip Make the body content text larger in size for better readability on small screens." +
        "*/" +
        "td[class=footerContainer] td[class=TextContent]," +
        "td[class=footerContainer] td[class=TextContent] p {" +
        "/*@editable*/" +
        "font-size: 14px !important;" +
        "/*@editable*/" +
        "line-height: 115% !important;" +
        "}" +
        "}" +
        "@media only screen and (max-width: 480px) {" +
        "td[class=footerContainer] a[class=utilityLink] {" +
        "display: block !important;" +
        "}" +
        "}" +
        "</style>" +
        "</head>" +
        '<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">' +
        "<center>" +
        '<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
        "<tr>" +
        '<td align="center" valign="top" id="bodyCell">' +
        "<!-- BEGIN TEMPLATE // -->" +
        '<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer">' +
        "<tr>" +
        '<td align="center" valign="top">' +
        "<!-- BEGIN PREHEADER // -->" +
        /*                 '<table border="0" cellpadding="0" cellspacing="0" width="600" id="templatePreheader">' +
                                  '<tr>' +
                                  '<td valign="top" class="preheaderContainer" style="padding-top:9px;">' +
                                  '<table border="0" cellpadding="0" cellspacing="0" width="100%"' +
                                  'class="TextBlock">' +
                                  '<tbody class="TextBlockOuter">' +
                                  '<tr>' +
                                  '<td valign="top" class="TextBlockInner">' +
                                  '<table align="left" border="0" cellpadding="0"' +
                                  'cellspacing="0" width="366"' +
                                  'class="TextContentContainer">' +
                                  '<tbody>' +
                                  '<tr>' +
                                  '<td valign="top" class="TextContent"' +
                                  'style="padding: 9px 0px 9px 18px; font-weight: normal; line-height: 100%;">' +
                                  '<div style="text-align: center;"><span' +
                                  'style="color:737c85"></span></div>' +
                                  '</td>' +
                                  '</tr>' +
                                  '</tbody>' +
                                  '</table>' +
                                  '<table align="right" border="0" cellpadding="0"' +
                                  'cellspacing="0" width="197"' +
                                  'class="TextContentContainer">' +
                                  '<tbody>' +
                                  '<tr>' +
                                  '<td valign="top" class="TextContent"' +
                                  'style="padding: 9px 18px 9px 0px; font-weight: normal; line-height: 100%;">' +
                                  '<div style="text-align: center;"><a href=""' +
                                  'target="_blank"><span' +
                                  'style="color:737c85">View this email in your browser</span></a>' +
                                  '</div>' +
                                  '</td>' +
                                  '</tr>' +
                                  '</tbody>' +
                                  '</table>' +
                                  '</td>' +
                                  '</tr>' +
                                  '</tbody>' +
                                  '</table>' +
                                  '</td>' +
                                  '</tr>' +
                                  '</table>' + */
        "<!-- // END PREHEADER -->" +
        "</td>" +
        "</tr>" +
        "<tr>" +
        '<td align="center" valign="top">' +
        "<!-- BEGIN HEADER // -->" +
        '<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">' +
        "<tr>" +
        '<td valign="top" class="headerContainer">' +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%"' +
        'class="DividerBlock" style="background-color: #FFFFFF;">' +
        '<tbody class="DividerBlockOuter">' +
        "<tr>" +
        '<td class="DividerBlockInner" style="padding: 3px 18px;">' +
        '<table class="DividerContent" border="0" cellpadding="0"' +
        'cellspacing="0" width="100%"' +
        'style="border-top-width: 1px;border-top-style: none;border-top-color: #999999;">' +
        "<tbody>" +
        "<tr>" +
        "<td>" +
        "<span></span>" +
        "</td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "</td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%"' +
        'class="ImageBlock">' +
        '<tbody class="ImageBlockOuter">' +
        "<tr>" +
        '<td valign="top" style="padding:0px" class="ImageBlockInner">' +
        '<table align="left" width="100%" border="0" cellpadding="0"' +
        'cellspacing="0" class="ImageContentContainer">' +
        "<tbody>" +
        "<tr>" +
        '<td class="ImageContent" valign="top"' +
        'style="padding-right: 0px; padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
        '<img align="center" alt="Kaloni"' +
        'src="' +
        image_logo +
        '"' +
        'width="420"' +
        'style="max-width:1200px; padding-bottom: 0; display: inline !important; vertical-align: bottom;"' +
        'class="Image">' +
        "</td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "</td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "</td>" +
        "</tr>" +
        "</table>" +
        "<!-- // END HEADER -->" +
        "</td>" +
        "</tr>" +
        "<tr>" +
        '<td align="center" valign="top">' +
        "<!-- BEGIN BODY // -->" +
        '<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">' +
        "<tr>" +
        '<td valign="top" class="bodyContainer">' +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%"' +
        'class="TextBlock">' +
        '<tbody class="TextBlockOuter">' +
        "<tr>" +
        '<td valign="top" class="TextBlockInner">' +
        '<table align="left" border="0" cellpadding="0"' +
        'cellspacing="0" width="600"' +
        'class="TextContentContainer">' +
        "<tbody>" +
        "<tr>" +
        '<td valign="top" class="TextContent"' +
        "style=\"padding: 9px 18px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-weight: normal; line-height: 100%;\">" +
        '<h1 class="null" style="text-align: center"><span' +
        'style="font-family:arial,helvetica neue,helvetica,sans-serif"><span' +
        'style="font-size:26px">Detalles de su cita&nbsp;</span></span>' +
        "</h1>" +
        "<p>Sucursal: <b>" +
        text_resource + 
        "</b><br />" +
        "Día de su cita: <b>" +
        formatProfessionalDate(text_calendarevent_startdate) +
        "</b><br />" +
        "Hora de su cita: <b>" +
        text_calendarevent_starttime +
        "</b><br />" +
        'Teléfono de atención: <a href="tel:' +
        sucursal_phone_value +
        '" title="Si lo desea puede llamar para reagendar"><b>☏ ' +
        sucursal_phone_text +
        "</a></b><br />" +
        "</p>" +
        "</td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "</td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        '<table align="left" border="0" cellpadding="0" cellspacing="0" width="600"' +
        'class="TextContentContainer">' +
        "<tbody>" +
        "<tr>" +
        '<td valign="top" class="TextContent"' +
        "style=\"text-align: center; padding: 9px 18px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-weight: normal; line-height: 100%;\">" +
        "<h3>Guarde su cita en el calendario de su preferencia</h3>" +
        "</td>" +
        "</tr>" +
        "<tr>" +
        '<table align="center" border="0" cellpadding="0" cellspacing="0"' +
        'width="100%" style="table-layout: fixed;">' +
        "<tbody>" +
        "<tr>" +
        '<td width="20%" style="padding-right:6px;" align="center"><a href="' +
        arr_launch_appCalendars[0] +
        '"><img width="64px"' +
        'src="' +
        urlBase +
        icon_calendar_google.url +
        '" alt="">' +
        '<figcaption align="center">' +
        "<br/>Google<br/> calendar" +
        '</figcaption align="center">' +
        "</a></td>" +
        '<td width="20%" style="padding-right:6px;" align="center"><a href="' +
        arr_launch_appCalendars[1] +
        '"><img width="64px"' +
        'src="' +
        urlBase +
        icon_calendar_outlook.url +
        '" alt="">' +
        '<figcaption align="center">' +
        "<br/>Outlook<br/> calendar" +
        "</figcaption>" +
        "</a></td>" +
        '<td width="20%" style="padding-right:6px;" align="center"><a href="' +
        arr_launch_appCalendars[2] +
        '"><img width="64px"' +
        'src="' +
        urlBase +
        icon_calendar_yahoo.url +
        '" alt="">' +
        '<figcaption align="center">' +
        "<br/>Yahoo!<br/> calendar" +
        "</figcaption>" +
        "</a></td>" +
        '<td width="20%" style="padding-right:6px;" align="center"><a href="' +
        arr_launch_appCalendars[3] +
        '"><img width="64px"' +
        'src="' +
        urlBase +
        icon_calendar_outlookOffice.url +
        '"' +
        'alt="">' +
        '<figcaption align="center">' +
        "Outlook</figcaption>" +
        "</a></td>" +
        '<td width="20%" style="padding-right:6px;" align="center"><a href="' +
        arr_launch_appCalendars[4] +
        '"><img width="64px"' +
        'src="' +
        urlBase +
        icon_calendar_iCalendar.url +
        '"' +
        'alt="">' +
        '<figcaption align="center">' +
        "iCalendar</figcaption>" +
        "</a></td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "<br />" +
        '<table align="left" border="0" cellpadding="0" cellspacing="0"' +
        'width="600" class="TextContentContainer">' +
        "<tbody>" +
        "<tr>" +
        '<td valign="top" class="TextContent"' +
        "style=\"text-align: center; padding: 9px 18px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-weight: normal; line-height: 100%;\">" +
        "<h3>Ubicación</h3>" +
        "</td>" +
        "</tr>" +
        "<tr>" +
        '<td align="center">' +
        //FIXME: IFRAME GOOGLE MAPS
        /* '<iframe' +
                  'src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7528.422303483307!2d-99.28069564816288!3d19.36000778651693!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdb5f40d57f261023!2sKaloni%20Santa%20Fe%20%E2%80%A2%20Hair%20%7C%20Skin%20%7C%20Body!5e0!3m2!1ses!2smx!4v1581450269887!5m2!1ses!2smx"' +
                  'width="520" height="360" frameborder="0"' +
                  'style="border:0;"' +
                  'allowfullscreen=" frameborder=" 0"></iframe>' + */
        //FIXME: IMAGE GOOGLE MAPS
        '<a href="' +
        url_mapGoogle_place +
        '">' +
        '<img src="' +
        image_map +
        '"></img>' +
        "</a>" +
        "</td>" +
        "</tr>" +
        "<tr>" +
        '<td align="center">' +
        "<table>" +
        "<tbody>" +
        "<tr>" +
        '<td width="50%">' +
        '<div style="text-align: center;">' +
        '<a href="' +
        url_mapGoogle_drive +
        '" style="background-color:#244175;border-radius:4px;color:#ffffff;display:inline-block;font-family:Helvetica, Arial, sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:140px;height: 50px;-webkit-text-size-adjust:none;">Google Drive</a>' +
        "</div>" +
        "</td>" +
        '<td width="50%">' +
        '<div style="text-align: center;">' +
        '<a href="' +
        url_mapWaze_drive +
        '" style="background-color:#244175;border-radius:4px;color:#ffffff;display:inline-block;font-family:Helvetica, Arial, sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:140px;height: 50px;-webkit-text-size-adjust:none;">Waze Drive</a>' +
        "</div>" +
        "</td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "</td>" +
        "</tr>" +
        "<tr>" +
        '<td align="center">' +
        '<p class="TextContentFooterMap"' +
        'style="width: 60%">' +
        sucursal_address +
        "</p>" +
        "</td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "</td>" +
        "</tr>" +
        "</table>" +
        "<!-- // END BODY -->" +
        "</td>" +
        "</tr>" +
        "</table>" +
        "<!-- // END TEMPLATE -->" +
        "</td>" +
        "</tr>" +
        "</table>" +
        "</center>" +
        "</body>" +
        "</html>";

      /*     if (bool_existRecurso) {
            bodyMail = body;
          } else {
            bodyMail = '';
          } */

      bodyMail = body;

      try {
        email.send({
          author: id_user,
          recipients: recipientEmail,
          subject: subject,
          body: bodyMail,
          relatedRecords: {
            entityId: id_Customer,
          }
        });
        log.audit("Send Mail", "Send Mail to: " + recipientEmail);
      } catch (error) {
        log.error(
          "Send Mail Erro",
          "Send Mail to: " + recipientEmail + " Error: " + error
        );
      }
    }
  }

  /**
   *
   * @param {string} date DATE IN FORMAT DD/MM/YYYY
   */
  function formatProfessionalDate(date) {
    var dateFormated = "";
    var meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre"
    ];

    if (date == null || date == "") {
      return dateFormated;
    } else {
      try {
        var arr_date = date.split("/");
        var dia = arr_date[0];
        var mes = arr_date[1];
        var anio = arr_date[2];
        mes = parseInt(mes);
        dateFormated = dia + " de " + meses[mes - 1] + " de " + anio;
      } catch (error) {
        log.error("Error function formatProfessionalDate: " + error);
      }
      return dateFormated;
    }
  }

  function timeFormat(time) {
    var timeFormat = "";
    var separator = "%3A";
    var dospuntos = time.indexOf(":");
    var espacio = time.indexOf(" ");

    var horas = time.substr(0, dospuntos);
    var minutos = time.substr(dospuntos + 1, 2);
    var segundos = "00";
    var horas24 = time.substr(espacio + 1, time.length);

    if (horas24 == "pm" && horas != 12) {
      horas = parseInt(horas) + 12;
    }

    timeFormat = horas + separator + minutos + separator + segundos;

    return timeFormat;
  }

  return {
    //beforeLoad: beforeLoad,
    //beforeSubmit: beforeSubmit,
    afterSubmit: afterSubmit
  };
});

// Use to send values of context
/*       if (user == 302850) {
        try {
          email.send({
            author: 302850,
            recipients: 'rdominguez@kaloni.com',
            subject: context,
            body: json_contexto,
          });
          log.debug("Send Mail", "Send Mail to: " + 'osvaldo_21_1@hotmail.com');
        } catch (error) {
          log.debug(
            "Send Mail Erro",
            "Send Mail to: " + 'osvaldo_21_1@hotmail.com' + " Error: " + error
          );
        }
      } */