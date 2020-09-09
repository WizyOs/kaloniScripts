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
  function afterSubmit(context) {
    log.debug("objContext", context);
    /**
     * //TODO: GET CONTEXT, CONVERT CONTEXT IN JSON OBJECT, LOAD CUSTOMER OBJECT AND GET IST VALUES
     */
    var json_contexto = JSON.stringify(context);
    var obj_contexto = JSON.parse(json_contexto);

    //VARIABLES: CONTEXT JSON OBJECT GLOBAL ON NEWRECORD CONTEXT -> ALWAYS EXIST
    var typeContext = obj_contexto.type;
    var typeCustomer = obj_contexto.newRecord.type;
    var idCustomer = obj_contexto.newRecord.id;
    var idSubsidiary = obj_contexto.newRecord.fields.subsidiary;
    var emailCustomer = obj_contexto.newRecord.fields.email;

    /**
     * //ACTION: PROCESS ON CREATE CONTEXT
     */
    if (typeContext == "create") {
      log.debug("objContext", obj_contexto);
      log.debug("idSubsidiary", idSubsidiary);
      //log.debug("params to send", "idCustomer " + idCustomer + " emailCustomer " + emailCustomer );

      /**
       * //TODO: SEND MAIL CREATE
       *
       * SUCURSALES
       * 58 = ??
       * SUBSIDIARIES
       * 21 = INSTITUTO KALONI
       * */
      //ACTION: IF RECORTYPE IS LEAD
      if (typeCustomer == "lead" && idSubsidiary == 21) {
        sendEmail(idCustomer, emailCustomer);
      }
    }
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
  function sendEmail(idCustomer, emailCustomer) {

    var body = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">' +
      '<html>' +
      '<head>' +
      '<META http-equiv="Content-Type" content="text/html; charset=utf-8">' +
      '</head>' +
      '<body>' +
      '<div marginwidth="0" marginheight="0">' +
      '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background:#f2f2f2">' +
      '<tr>' +
      '<td align="center" valign="top">' +
      '<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f2f2f2">' +
      '<tr>' +
      '<td align="center" valign="top">' +
      '<table width="800" border="0" align="center" cellpadding="0" cellspacing="0">' +
      '<tr>' +
      '<td align="center" valign="top" bgcolor="#f2f2f2">' +
      '<table width="600" border="0" align="center" cellpadding="0"' +
      'cellspacing="0">' +
      '<tr>' +
      '<td height="10" align="center" valign="top"' +
      'style="font-size:10px;line-height:10px"> </td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
      '<tr>' +
      '<td align="center" valign="top">' +
      '<table width="800" border="0" align="center" cellpadding="0" cellspacing="0">' +
      '<tr>' +
      '<td align="center" valign="top" bgcolor="#FFFFFF">' +
      '<table width="600" border="0" align="center" cellpadding="0"' +
      'cellspacing="0">' +
      '<tr>' +
      '<td height="15" align="center" valign="top"' +
      'style="font-size:15px;line-height:15px"> </td>' +
      '</tr>' +
      '<tr>' +
      '<td align="center" valign="top">' +
      '<table width="100%" border="0" align="center" cellpadding="0"' +
      'cellspacing="0">' +
      '<tr>' +
      '<td width="50%" align="left" valign="top">' +
      '<table width="100%" border="0" align="left"' +
      'cellpadding="0" cellspacing="0">' +
      '<tr>' +
      '<td height="5" align="center" valign="top"' +
      'style="font-size:5px;line-height:5px">' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td align="center" valign="top"' +
      'style="font-family:Open Sans,sans-serif,Verdana;font-size:13px;font-weight:bold;color:#0b2363">' +
      //'<a href="' + img_bg_6630889 + '"' +
      '<a href="https://3559763.app.netsuite.com/core/media/media.nl?id=6630889&amp;c=3559763&amp;h=ddc89d5233cd7f19222b&amp;mv=ka7bmqg8&amp;_xt=.html&amp;fcts=20200514150505&amp;whence="' +
      'style="text-decoration:none;color:#0b2363;font-weight:500"' +
      'target="_blank"> ¿Problemas con las ' +
      'imágenes? Ver en línea </a></td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td height="15" align="center" valign="top"' +
      'style="font-size:15px;line-height:15px"> </td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">' +
      '<tr>' +
      '<td align="center" valign="top">' +
      '<table width="800" border="0" align="center" cellpadding="0" cellspacing="0">' +
      '<tr>' +
      '<td align="center" valign="top" bgcolor="#FFFFFF"><img' +
      //'src="' + img_bg_6630743 + '"' +
      'src="https://3559763.app.netsuite.com/c.3559763/Mailings 2020/01 Mexico/01 Temporales/Instituto Kaloni/img/Backgraund1.jpg"' +
      'width="800" height="167" alt="Instituto Kaloni"' +
      'style="display:block;width:100%!important;height:auto!important"' +
      'href="https://institutokaloni.com/"></td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
      '<tr>' +
      '<td align="center" valign="top">' +
      '<table width="800" border="0" align="center" cellpadding="0" cellspacing="0">' +
      '<tr>' +
      '<td align="center" valign="top" bgcolor="#FFFFFF">' +
      '<table width="600" height="auto" border="0" align="center" cellpadding="0"' +
      'cellspacing="0">' +
      '<tr>' +
      '<td width="100%" align="right" valign="middle">' +
      '<table width="100%" border="0" align="center" cellpadding="0"' +
      'cellspacing="0">' +
      '<tr>' +
      '<td align="left" valign="top">' +
      '<table width="100%" border="0" align="center"' +
      'cellpadding="0" cellspacing="0">' +
      '<tr>' +
      '<td height="50" align="center" valign="top">' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td align="center" valign="top"' +
      'style="font-family:Open Sans,sans-serif,Verdana;font-size:16px;font-weight:normal;color:#0b2363;line-height:24px;font-weight:500">' +
      '<span>Gracias por tu interés.</span>' +
      '<br><br>' +
      'Hemos recibido tus datos correctamente, ' +
      'uno de nuestros ejecutivos te ' +
      'contactará en las próximas horas.' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td height="50" align="left" valign="top">' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td height="1px" width="100%"' +
      'bgcolor="#eeeeee"' +
      'style="font-size:1px;line-height:1px;background-color:rgb(238,238,238)">' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td align="left" valign="top"> </td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">' +
      '<tr>' +
      '<td align="center" valign="top">' +
      '<table width="800" border="0" align="center" cellpadding="0" cellspacing="0">' +
      '<tr>' +
      '<td align="center" valign="top" bgcolor="#fff">' +
      '<table width="100%" border="0" align="center" cellpadding="0"' +
      'cellspacing="0">' +
      '<tr>' +
      '<td align="center" valign="top">' +
      '<table width="100%" border="0" align="left" cellpadding="0"' +
      'cellspacing="0">' +
      '<tr>' +
      '<td width="300" align="left" valign="top">' +
      '<table width="250" border="0" align="center"' +
      'cellpadding="0" cellspacing="0">' +
      '<tr>' +
      '<td>' +
      '<table width="100%" border="0"' +
      'align="left" cellpadding="0"' +
      'cellspacing="0">' +
      '<tr>' +
      '<td height="20" align="right"' +
      'valign="top"' +
      'style="font-size:20px;line-height:20px">' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td height="10" align="center"' +
      'valign="top"' +
      'style="font-size:10px;line-height:10px">' +
      '<table border="0"' +
      'cellspacing="0"' +
      'cellpadding="0">' +
      '<tr>' +
      '<td align="center"' +
      'valign="top">' +
      //'<img src="' + img_bg_6630103 + '"' +
      '<img src="https://3559763.app.netsuite.com/c.3559763/Mailings%202020/01%20Mexico/01%20Temporales/Instituto%20Kaloni/img/Logo-Head.png"' +
      'width="70%"' +
      'height="auto"' +
      'alt=""' +
      'href="https://institutokaloni.com/">' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td height="10" align="left"' +
      'valign="top"' +
      'style="font-size:10px;line-height:10px">' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td align="left" valign="top"' +
      'style="font-family:Open Sans,sans-serif,Verdana;font-size:12px;font-weight:normal;color:#333;line-height:20px">' +
      'Has recibido este correo ' +
      'porque tus datos están ' +
      'registrados en nuestra ' +
      'página web, K-Center o ' +
      'página de Facebook.</td>' +
      '</tr>' +
      '<tr>' +
      '<td height="10" align="right"' +
      'valign="top"> </td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td height="10" align="right" valign="top"' +
      'style="font-size:10px;line-height:10px">' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '<td width="300" align="center" valign="top"' +
      'bgcolor="#ffffff">' +
      '<table width="250" border="0" align="center"' +
      'cellpadding="0" cellspacing="0">' +
      '<tr>' +
      '<td height="20" align="right" valign="top"' +
      'style="font-size:20px;line-height:20px">' +
      '</td>' +
      '</tr>' +
      '<td align="center" valign="top">' +
      '<table width="100" border="0" align="center"' +
      'cellpadding="0" cellspacing="0">' +
      '<tr>' +
      '<td align="left" valign="middle"><a' +
      'href="https://www.facebook.com/InstitutoKaloni/"' +
      'style="border-style:none!important;border:0!important"' +
      'target="_blank"><img' +
      //'src="' + img_bg_3981775 + '"' +
      'src="https://3559763.app.netsuite.com/c.3559763/Mailings 2020/01 Mexico/02 Mailings Call-Center/img_Gral/Icons/Social-Icons/logo-facebook.png"' +
      'width="25" height="auto"' +
      'alt="Facebook"></a></td>' +
      '' +
      '<td align="left" valign="middle"><a' +
      'href="https://www.instagram.com/instituto.kaloni/"' +
      'style="border-style:none!important;border:0!important"' +
      'target="_blank"><img' +
      //'src="' + img_bg_3981778 + '"' +
      'src="https://3559763.app.netsuite.com/c.3559763/Mailings 2020/01 Mexico/02 Mailings Call-Center/img_Gral/Icons/Social-Icons/logo-Instagram.png"' +
      'width="25" height="auto"' +
      'alt="Instagram"></a>' +
      '</td>' +
      '<td align="left" valign="middle"><a' +
      'href="https://www.linkedin.com/company/instituto-kaloni/"' +
      'style="border-style:none!important;border:0!important"' +
      'target="_blank"><img' +
      //'src="' + img_bg_6630104 + '"' +
      'src="https://3559763.app.netsuite.com/c.3559763/Mailings 2020/01 Mexico/01 Temporales/Instituto Kaloni/img/linkedin1.png"' +
      'width="25" height="auto"' +
      'alt="Youtube"></a></td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '<tr>' +
      '<td height="30" align="right" valign="top"' +
      'style="font-size:30px;line-height:30px">' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td align="left" valign="top"' +
      'style="font-family:Open Sans,sans-serif,Verdana;font-size:13px;font-weight:normal;color:#333;line-height:20px">' +
      'Kaloni. Avenida Vasco de Quiroga 3900, ' +
      'Torre B piso 4, Santa Fe, CDMX</td>' +
      '</tr>' +
      '<tr>' +
      '<td height="25" align="right" valign="top"' +
      'style="font-size:25px;line-height:25px">' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td height="10" align="right" valign="top">' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">' +
      '<tr>' +
      '<td align="center" valign="top">' +
      '<table width="800" border="0" align="center" cellpadding="0" cellspacing="0">' +
      '<tr>' +
      '<td align="center" valign="top" bgcolor="#F2F2F2">' +
      '<table width="600" border="0" align="center" cellpadding="0"' +
      'cellspacing="0">' +
      '<tr>' +
      '<td height="30" align="center" valign="top"' +
      'style="font-size:30px;line-height:30px"> </td>' +
      '</tr>' +
      '<tr>' +
      '<td align="center" valign="top">' +
      '<table width="100%" border="0" align="left" cellpadding="0"' +
      'cellspacing="0">' +
      '<tr>' +
      '<td width="300" align="center" valign="top">' +
      '<table border="0" align="center" cellpadding="0"' +
      'cellspacing="0">' +
      '<tr>' +
      '<td align="center" valign="top"' +
      'style="font-family:Open Sans,sans-serif,Verdana;font-size:14px;color:#666;font-weight:normal;text-align:center">' +
      '© Copyright 2020 Instituto Kaloni </td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td height="30" align="center" valign="top"' +
      'style="font-size:30px;line-height:30px"> </td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</div>' +
      '</body>' +
      '</html>';

    bodyMail = body;

    try {
      email.send({
        author: 1220715,
        recipients: emailCustomer,
        subject: "Confirmación de envío",
        body: bodyMail,
        relatedRecords: {
          entityId: idCustomer,
        }
      });
      log.audit("Send Mail", "Send Mail to: " + emailCustomer);
    } catch (error) {
      log.error(
        "Send Mail Erro",
        "Send Mail to: " + emailCustomer + " Error: " + error
      );
    }
  }

  return {
    afterSubmit: afterSubmit
  };
})