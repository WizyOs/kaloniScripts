function sendEmail_case()
{
    var emailTempId = 116; // internal id of the email template created
    var emailTemp = nlapiLoadRecord('emailtemplate',emailTempId);
    var emailSubj = emailTemp.getFieldValue('subject');
    nlapiLogExecution('ERROR', 'emailSubj: ', emailSubj);
    //var emailBody = emailTemp.getFieldValue('content');
	var cambiar="nameCustomer";


var emailBody = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
'<html xmlns:v="urn:schemas-microsoft-com:vml">'+
'    <head>'+
''+
'    <!-- Define Charset -->'+
'    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
''+
'    <!-- Responsive Meta Tag -->'+
'    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />'+
'    <meta name="viewport" content="width=600,initial-scale = 2.3,user-scalable=no">'+
'    <link href=\'https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700\' rel="stylesheet">'+
'    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">'+
'	<link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">'+
'    <title>¡hoy es un día muy especial!</title>'+
'    <style type="text/css">'+
'body {'+
'	width: 100%;'+
'	background-color: #ffffff;'+
'	margin: 0;'+
'	padding: 0;'+
'	-webkit-font-smoothing: antialiased;'+
'	mso-margin-top-alt: 0px;'+
'	mso-margin-bottom-alt: 0px;'+
'	mso-padding-alt: 0px 0px 0px 0px;'+
'}'+
'p,  h1,  h2,  h3,  h4 {'+
'	margin-top: 0;'+
'	margin-bottom: 0;'+
'	padding-top: 0;'+
'	padding-bottom: 0;'+
'}'+
'span.preheader {'+
'	display: none;'+
'	font-size: 1px;'+
'}'+
'html {'+
'	width: 100%;'+
'}'+
'table {'+
'	font-size: 14px;'+
'	border: 0;'+
'}'+
'gradiente {'+
'	/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ff7670+0,eec95c+100*/'+
'	background: #d7e4f6;'+
'	/* Old browsers */'+
'	background: -moz-linear-gradient(top, #ffffff 0%, #d7e4f6 100%);'+
'	/* FF3.6-15 */'+
'	background: -webkit-linear-gradient(top, #ffffff 0%, #d7e4f6 100%);'+
'	/* Chrome10-25,Safari5.1-6 */'+
'	background: linear-gradient(to bottom, #ffffff 0%, #d7e4f6 100%);'+
'     /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */'+
'    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#ffffff\', endColorstr=\'#d7e4f6\', GradientType=0);'+
'/* IE6-9 */'+
'}'+
'.sombra-01 {'+
'	-webkit-box-shadow: 0px 0px 6px 1px rgba(204, 204, 204, 1);'+
'	-moz-box-shadow: 0px 0px 6px 1px rgba(204, 204, 204, 1);'+
'	box-shadow: 0px 0px 6px 1px rgba(204, 204, 204, 1);'+
'}'+
'.circle {'+
'	border-radius: 50%;'+
'	width: 100px;'+
'	height: 100px;'+
'}'+
'.circle-60 {'+
'	border-radius: 50%;'+
'	width: 60px;'+
'	height: 60px;'+
'}'+
'.hide_img {'+
'	display: none !important;'+
'}'+
''+
'/* ----------- responsivity ----------- */'+
''+
'@media only screen and (max-width: 796px) {'+
'body[yahoo] .hide-800 {'+
'	display: none !important;'+
'}'+
'body[yahoo] .hide_img {'+
'	display:block !important;'+
'}'+
'body[yahoo] .container800 {'+
'	width: 100% !important;'+
'}'+
'body[yahoo] .container780 {'+
'	width: 600px !important;'+
'}'+
'	body[yahoo] .container7801 img{'+
'	width: 400px !important;'+
'}'+
'body[yahoo] .container800_img {'+
'	width: 50% !important;'+
'}'+
'body[yahoo] .section800_img img {'+
'	width: 100% !important;'+
'	height: auto !important;'+
'}'+
'body[yahoo] .half-container800 {'+
'	width: 49% !important;'+
'}'+
'/* ====== divider ====== */'+
'body[yahoo] .divider img {'+
'	width: 50% !important;'+
'}'+
'}'+
''+
'/* ----------- responsivity ----------- */'+
''+
'@media only screen and (max-width: 640px) {'+
'/*------ top header ------ */'+
'body[yahoo] .main-header {'+
'	font-size: 20px !important;'+
'}'+
'body[yahoo] .main-section-header {'+
'	font-size: 28px !important;'+
'}'+
'body[yahoo] .show {'+
'	display: block !important;'+
'}'+
'body[yahoo] .hide {'+
'	display: none !important;'+
'}'+
'body[yahoo] .align-center {'+
'	text-align: center !important;'+
'}'+
'/*----- main image -------*/'+
'body[yahoo] .main-img img {'+
'	width: 440px !important;'+
'	height: auto !important;'+
'}'+
'/* ====== divider ====== */'+
'body[yahoo] .divider img {'+
'	width: 340px !important;'+
'}'+
'/*-------- container --------*/'+
'body[yahoo] .container590 {'+
'	width: 440px !important;'+
'}'+
'body[yahoo] .container590-center {'+
'	width: 280px !important;'+
'	text-align: center !important;'+
'}'+
'body[yahoo] .container580 {'+
'	width: 400px !important;'+
'}'+
'body[yahoo] .container500 {'+
'	width: 320px !important;'+
'}'+
'body[yahoo] .container400 {'+
'	width: 290px !important;'+
'}'+
'body[yahoo] .container800 {'+
'	width: 440px !important;'+
'}'+
'body[yahoo] .container780 {'+
'	width: 440px !important;'+
'}'+
'body[yahoo] .container800_img {'+
'	width: 100% !important;'+
'	text-align: center !important;'+
'}'+
'body[yahoo] .section800_img img {'+
'	width: 100% !important;'+
'}'+
'body[yahoo] .half-container {'+
'	width: 200px !important;'+
'}'+
'body[yahoo] .main-button {'+
'	width: 200px !important;'+
'}'+
'/*-------- secions ----------*/'+
'body[yahoo] .container590 {'+
'	width: 440px !important;'+
'}'+
'body[yahoo] .section-img img {'+
'	width: 320px !important;'+
'	height: auto !important;'+
'}'+
'body[yahoo] .team-img img {'+
'	width: 100% !important;'+
'	height: auto !important;'+
'}'+
'}'+
''+
'@media only screen and (max-width: 479px) {'+
'/*------ top header ------ */'+
'body[yahoo] .main-header {'+
'	font-size: 20px !important;'+
'}'+
'body[yahoo] .main-section-header {'+
'	font-size: 24px !important;'+
'}'+
'/* ====== divider ====== */'+
'body[yahoo] .main-img img {'+
'	width: 280px !important;'+
'}'+
'body[yahoo] .divider img {'+
'	width: 280px !important;'+
'}'+
'/*-------- container --------*/'+
'body[yahoo] .container590 {'+
'	width: 280px !important;'+
'}'+
'body[yahoo] .container590-center {'+
'	width: 280px !important;'+
'	text-align: center;'+
'}'+
'body[yahoo] .container580 {'+
'	width: 260px !important;'+
'}'+
'body[yahoo] .container500 {'+
'	width: 280px !important;'+
'}'+
'body[yahoo] .container400 {'+
'	width: 260px !important;'+
'}'+
'body[yahoo] .container800 {'+
'	width: 100% !important;'+
'}'+
'body[yahoo] .container780 {'+
'	width: 280px !important;'+
'}'+
'body[yahoo] .container800_img {'+
'	width: 100% !important;'+
'	height: auto !important;'+
'}'+
'body[yahoo] .section800_img img {'+
'	width: 100% !important;'+
'	height: auto !important;'+
'}'+
'body[yahoo] .half-container800 {'+
'	width: 100% !important;'+
'}'+
'body[yahoo] .half-container {'+
'	width: 130px !important;'+
'}'+
'body[yahoo] .container500 {'+
'	width: 280px !important;'+
'}'+
'/*-------- secions ----------*/'+
'body[yahoo] .container590 {'+
'	width: 280px !important;'+
'}'+
'body[yahoo] .section-img img {'+
'	width: 280px !important;'+
'	height: auto !important;'+
'}'+
'}'+
'</style>'+
'    </head>'+
'    <body yahoo="fix" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="background: linear-gradient(#ffffff, #d7e4f6)">'+
''+
'<!-- ======= main section ======= -->'+
'<table border="0" width="100%" cellpadding="0" cellspacing="0">'+
'	'+
'      <tr>'+
'    <td height="25" style="font-size: 25px; line-height: 25px;"> </td>'+
'  </tr>'+
'	'+
'        <tr>'+
'        <td align="center">'+
'      <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">'+
'    <tr>'+
'          <td><table border="0" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'              <tr>'+
'              <td height="5" style="font-size: 5px; line-height: 5px;"> </td>'+
'            </tr>'+
'              <tr>'+
'              <td align="center"><table border="0" cellpadding="0" cellspacing="0" align="center">'+
'                  <tr>'+
'                  <td align="center" style="color: #ffffff; font-size: 14px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 24px;"><div style=" line-height: 24px;"> <a href="https://3559763.app.netsuite.com/core/media/media.nl?id=2239597&c=3559763&h=ce0bc7f2f25a1161940c&mv=jy6flog0&_xt=.html&fcts=20190716161200&whence=" style="color: #244175; text-decoration: none;">¿Problemas con las imágenes? Ver en línea</a> </div></td>'+
'                </tr>'+
'                </table></td>'+
'            </tr>'+
'            </table></td>'+
'            '+
'		<td class="hide" class="align-center">'+
'          <table border="0" width="135" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="hide">'+
'        <tr>'+
'              <td><table border="0" align="left" width="35" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590 hide">'+
'                  <tr>'+
'                  <td width="10" height="10" style="font-size:10px; line-height: 10px;"> </td>'+
'                </tr>'+
'                </table></td>'+
'            </tr>'+
'      </table>'+
'          </td>'+
'        '+
'      <td class="hide" class="align-center">'+
'    <table border="0" width="100" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'          <tr>'+
'        <td><table border="0" width="100" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'            <tr>'+
'              <td align="left" style="color: #f2d221; font-size: 14px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 20px;" class="align-center"><!-- ======= section subtitle ====== -->'+
'                '+
'                <table border="0" width="70" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'                  <tr>'+
'                    <td align="left"><table border="0" align="left" cellpadding="0" cellspacing="0" class="container590">'+
'                        '+
'						<tr>'+
'                          <td align="center"><table border="0" align="center" width="130" cellpadding="0" cellspacing="0" style="/*background-image: url(https://system.na2.netsuite.com/core/media/media.nl?id=726035&c=3559763&h=c952804928bf7f1ef5d6&whence=)*/" border-radius: "30px;">'+
'                              <tr>'+
'                                <td height="8" style="font-size: 8px; line-height: 8px;"> </td>'+
'                              </tr>'+
'                              <tr>'+
'                                <td align="left"><table align="center" border="0" cellpadding="0" cellspacing="0">'+
'                                    <tr>'+
'                                      <td align="center" style="color: #000; font-size: 14px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 16px;"><!-- ======= main section button ======= -->'+
'                                        '+
'                                        <div style="line-height: 26px;"> <a href="https://kaloni.mx/injerto-capilar.html" style="color: #244175; text-decoration: none; align: center;">Soluciones Kaloni</a> </div></td>'+
'                                    </tr>'+
'                                  </table></td>'+
'                              </tr>'+
'							  '+
'                              <tr>'+
'                                <td height="8" style="font-size: 8px; line-height:8px;"> </td>'+
'                              </tr>'+
'                            </table></td>'+
'                        </tr>'+
'						'+
'                      </table></td>'+
'                  </tr>'+
'                </table>'+
'				'+
'				</td>'+
'            </tr>'+
'          </table></td>'+
'      </tr>'+
'        </table>'+
'		  </td>'+
'		  '+
'      </tr>'+
'  </table>'+
'      </td></tr>'+
'		 </table>'+
'	'+
'   <tr>'+
'    <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'   </tr>'+
'     <!-- ======= Logotipo ======= -->'+
'      <tr>'+
'    <td height="5" style="font-size: 5px; line-height: 5px;">  '+
'      <!-- ======= Logotipo ======= -->'+
'      '+
'      <table border="0" width="100%" cellpadding="0" cellspacing="0">'+
'        <tr> '+
'          <!-- ======= divider  ======= -->'+
'          <td align="center" class="divider"><a href="#"><img width="800" border="0" style="display: block; width: 352px; height: auto;" src="https://3559763.app.netsuite.com/core/media/media.nl?id=2208156&c=3559763&h=c10fcb13a1692139fcd2&fcts=20190703150133&whence=" alt="Logo Kaloni"/></a></td>'+
'        </tr>'+
'      </table></td>'+
'  </tr>'+
'      <!-- ======= end divider y de logo ======= --> '+
'      '+
'      <!-- ========== Texto de bienvenida ========== -->'+
'    <td align="center"><table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">'+
'        <tr>'+
'          <td height="50" style="font-size: 10px; line-height: 10px;"> </td>'+
'        </tr>'+
'        <tr>'+
'          <td align="center" style="color: #30497B; font-size: 36px; font-family: \'Poppins\', Calibri, sans-serif; font-weight: 700; line-height: 30px;" class="main-section-header">'+
'           <!-- ======= section text ====== -->'+
'            <div style="line-height: 30px; text-transform: uppercase;"> '+cambiar+' </div>'+
'            <div style="line-height: 30px; text-transform: uppercase;"> ¡hoy es un día muy especial! </div></td>'+
'        </tr>'+
'        <tr>'+
'          <td height="15" style="font-size: 15px; line-height: 15px;"> </td>'+
'        </tr>'+
'        <tr>'+
'          <td align="center"><table align="center" width="300" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFB740" style="border-radius: 5px;">'+
'              <tr>'+
'                <td height="3" style="font-size: 3px; line-height: 3px;"></td>'+
'              </tr>'+
'            </table></td>'+
'        </tr>'+
'        <tr>'+
'          <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'        </tr>'+
'      </table></td>'+
'	<!-- ========== Terimna el Texto de bienvenida ========== --> '+
'  </tr>'+
'    </table>'+
'<!-- ======= end section ======= --> '+
''+
'<!-- ======= features section ======= -->'+
'<table border="0" width="100%" cellpadding="0" cellspacing="0">'+
'      <tr>'+
'    <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'  </tr>'+
'      <tr align="center">'+
'    <td align="center"><table border="0" align="center" width="780" cellpadding="0" cellspacing="0" class="container780">'+
'        <tr>'+
'          <td align="center">'+
''+
'            <!-- SECCION DE DESCUENTO -->'+
'            '+
'            <table border="0" width="780" align="center" cellpadding="0" cellspacing="0" class="container780">'+
'              <tr>'+
'                <td height="40" style="font-size: 40px; line-height: 40px;"> </td>'+
'              </tr>'+
'              <tr>'+
'                <td><table border="0" width="380" align="left" cellpadding="0" cellspacing="0" class="container780 hide-800">'+
'                    <tr>'+
'                      <td align="center"><a href="https://kaloni.mx/" style="text-decoration: none;"> <img src="https://3559763.app.netsuite.com/core/media/media.nl?id=2238894&c=3559763&h=a38be830def63e7bf37e&fcts=20190716113418&whence=" alt="Regalos" style="width: 300"> </a></td>'+
'                    </tr>'+
'					'+
'					<tr>'+
'                <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'              </tr>'+
'					'+
'					<tr>'+
'                      <td align="center" style="color: #30497b; font-size: 12px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 24px;font-weight: 300;">'+
'                       '+
'                       <!-- ======= section text ====== -->'+
'                        '+
'                       <div style="line-height: 20px; text-align: center; width: 75%;"> *Aplican restricciones. Válido durante el mes de tu cumpleaños, al presentar tu identificación oficial.</div>'+
'						'+
'					  </td>'+
'                    </tr>'+
'						'+
'                  </table>'+
'                  '+
'					<table border="0" width="300" height="auto" align="center" cellpadding="0" cellspacing="0" class="container780 hide_img" style="align-content: center;">'+
'                    <tr align="center">'+
'                      <td align="center" class="container800_img"><a href="#" style="text-decoration: none;text-align: center;"> <img src="https://3559763.app.netsuite.com/core/media/media.nl?id=2238903&c=3559763&h=f58b063e644f6e71243c&fcts=20190716114030&whence=" style="width: 100%; height: auto;"> </a></td>'+
'                    </tr>'+
'                    <td width="10"> </td>'+
'                  </table>'+
'					'+
'                  <table border="0" width="300" align="left" cellpadding="0" cellspacing="0" class="container780">'+
'                    <tr>'+
'                      <td width="10" class="hide-800"> </td>'+
'                      <td align="center" style="color: #30497b; font-size: 16px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 24px;font-weight: 400">'+
'                       '+
'                       <!-- ======= section text ====== -->'+
'                        '+
'                       <div style="line-height: 24px; text-align: justify;"> Te consentimos en este mes de tu cumpleaños.</div>'+
'						'+
'					  </td>'+
'                    </tr>'+
'                    '+
'                   <tr>'+
'                      <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'                    </tr>'+
'					  '+
'					  <tr class="hide-800"> '+
'                      <td height="20" style="font-size: 20px; line-height: 20px;"> </td>'+
'                    </tr>'+
'                    '+
'                    <tr>'+
'                      <td width="10" class="hide-800"> </td>'+
'                      <td align="center" style="color: #ff9740; font-size: 16px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 24px;font-weight: 400;"><!-- ======= section text ====== -->'+
'                        '+
'                        <div style="line-height: 24px; text-align: justify;">  En la compra de un Kit Kaloni Complete® te regalamos una sesión de mesoterapia para nutrir y estimular el crecimiento de tu cabello. Además, te otorgamos un <b>10% de descuento</b> en cualquiera de nuestros servicios de Kaloni*.</div></td>'+
'                    </tr>'+
'					  '+
'                    <tr>'+
'                      <td height="50" style="font-size: 50px; line-height: 50px;"> </td>'+
'                    </tr>'+
'                    '+
'                    <tr>'+
'                      <td width="10" class="hide-800"> </td>'+
'                      <td align="center" style="color: #30497b; font-size: 22px; font-family: \'Helvetica\', Calibri, sans-serif;line-height: 24px;font-weight: 600"><!-- ======= section text ====== -->'+
'                        '+
'                        <div style="line-height: 24px; text-align: center;"> ¡Muchas felicidades! </div></td>'+
'                    </tr>'+
'                    '+
'                  </table>'+
'                  </td>'+
'              </tr>'+
'				'+
'				<tr>'+
'                <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'              </tr>'+
'				'+
'            </table>'+
'         </td>'+
'        </tr>'+
'      </table></td>'+
'  </tr>'+
'    </table>'+
'            '+
'            <!-- FIN DE SECCION DESCUENTO -->'+
'            <!-- SECCION DE DESCUENTO -->'+
''+
''+
'<!-- ======= Imagen de pie de página ======= -->'+
'<table border="0" width="100%" cellpadding="0" cellspacing="0">'+
'      <table border="0" width="100%" align="center" cellpadding="0" cellspacing="0">'+
'                    <tr>'+
'                      <td align="center"><a href="#" style="text-decoration: none;"> <img src="https://system.na2.netsuite.com/core/media/media.nl?id=1781281&c=3559763&h=6744f1371a6994cb2f22&whence=" style="width:100%" alt="Footer imagen de Regalos"> </a></td>'+
'                    </tr>'+
'	</table>'+
'</table>'+
'<!-- ======= Termina Imagen de pie de página ======= -->'+
''+
'</body>'+
'</html>';
  
var emailBody2 = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
'<html xmlns:v="urn:schemas-microsoft-com:vml">'+
'    <head>'+
''+
'    <!-- Define Charset -->'+
'    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
''+
'    <!-- Responsive Meta Tag -->'+
'    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />'+
'    <meta name="viewport" content="width=600,initial-scale = 2.3,user-scalable=no">'+
'    <link href=\'https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700\' rel="stylesheet">'+
'    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">'+
'	<link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">'+
'    <title>¡hoy es un día muy especial!</title>'+
'    <style type="text/css">'+
'body {'+
'	width: 100%;'+
'	background-color: #ffffff;'+
'	margin: 0;'+
'	padding: 0;'+
'	-webkit-font-smoothing: antialiased;'+
'	mso-margin-top-alt: 0px;'+
'	mso-margin-bottom-alt: 0px;'+
'	mso-padding-alt: 0px 0px 0px 0px;'+
'}'+
'p,  h1,  h2,  h3,  h4 {'+
'	margin-top: 0;'+
'	margin-bottom: 0;'+
'	padding-top: 0;'+
'	padding-bottom: 0;'+
'}'+
'span.preheader {'+
'	display: none;'+
'	font-size: 1px;'+
'}'+
'html {'+
'	width: 100%;'+
'}'+
'table {'+
'	font-size: 14px;'+
'	border: 0;'+
'}'+
'gradiente {'+
'	/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ff7670+0,eec95c+100*/'+
'	background: #d7e4f6;'+
'	/* Old browsers */'+
'	background: -moz-linear-gradient(top, #ffffff 0%, #d7e4f6 100%);'+
'	/* FF3.6-15 */'+
'	background: -webkit-linear-gradient(top, #ffffff 0%, #d7e4f6 100%);'+
'	/* Chrome10-25,Safari5.1-6 */'+
'	background: linear-gradient(to bottom, #ffffff 0%, #d7e4f6 100%);'+
'     /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */'+
'    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#ffffff\', endColorstr=\'#d7e4f6\', GradientType=0);'+
'/* IE6-9 */'+
'}'+
'.sombra-01 {'+
'	-webkit-box-shadow: 0px 0px 6px 1px rgba(204, 204, 204, 1);'+
'	-moz-box-shadow: 0px 0px 6px 1px rgba(204, 204, 204, 1);'+
'	box-shadow: 0px 0px 6px 1px rgba(204, 204, 204, 1);'+
'}'+
'.circle {'+
'	border-radius: 50%;'+
'	width: 100px;'+
'	height: 100px;'+
'}'+
'.circle-60 {'+
'	border-radius: 50%;'+
'	width: 60px;'+
'	height: 60px;'+
'}'+
'.hide_img {'+
'	display: none !important;'+
'}'+
''+
'/* ----------- responsivity ----------- */'+
''+
'@media only screen and (max-width: 796px) {'+
'body[yahoo] .hide-800 {'+
'	display: none !important;'+
'}'+
'body[yahoo] .hide_img {'+
'	display:block !important;'+
'}'+
'body[yahoo] .container800 {'+
'	width: 100% !important;'+
'}'+
'body[yahoo] .container780 {'+
'	width: 600px !important;'+
'}'+
'	body[yahoo] .container7801 img{'+
'	width: 400px !important;'+
'}'+
'body[yahoo] .container800_img {'+
'	width: 50% !important;'+
'}'+
'body[yahoo] .section800_img img {'+
'	width: 100% !important;'+
'	height: auto !important;'+
'}'+
'body[yahoo] .half-container800 {'+
'	width: 49% !important;'+
'}'+
'/* ====== divider ====== */'+
'body[yahoo] .divider img {'+
'	width: 50% !important;'+
'}'+
'}'+
''+
'/* ----------- responsivity ----------- */'+
''+
'@media only screen and (max-width: 640px) {'+
'/*------ top header ------ */'+
'body[yahoo] .main-header {'+
'	font-size: 20px !important;'+
'}'+
'body[yahoo] .main-section-header {'+
'	font-size: 28px !important;'+
'}'+
'body[yahoo] .show {'+
'	display: block !important;'+
'}'+
'body[yahoo] .hide {'+
'	display: none !important;'+
'}'+
'body[yahoo] .align-center {'+
'	text-align: center !important;'+
'}'+
'/*----- main image -------*/'+
'body[yahoo] .main-img img {'+
'	width: 440px !important;'+
'	height: auto !important;'+
'}'+
'/* ====== divider ====== */'+
'body[yahoo] .divider img {'+
'	width: 340px !important;'+
'}'+
'/*-------- container --------*/'+
'body[yahoo] .container590 {'+
'	width: 440px !important;'+
'}'+
'body[yahoo] .container590-center {'+
'	width: 280px !important;'+
'	text-align: center !important;'+
'}'+
'body[yahoo] .container580 {'+
'	width: 400px !important;'+
'}'+
'body[yahoo] .container500 {'+
'	width: 320px !important;'+
'}'+
'body[yahoo] .container400 {'+
'	width: 290px !important;'+
'}'+
'body[yahoo] .container800 {'+
'	width: 440px !important;'+
'}'+
'body[yahoo] .container780 {'+
'	width: 440px !important;'+
'}'+
'body[yahoo] .container800_img {'+
'	width: 100% !important;'+
'	text-align: center !important;'+
'}'+
'body[yahoo] .section800_img img {'+
'	width: 100% !important;'+
'}'+
'body[yahoo] .half-container {'+
'	width: 200px !important;'+
'}'+
'body[yahoo] .main-button {'+
'	width: 200px !important;'+
'}'+
'/*-------- secions ----------*/'+
'body[yahoo] .container590 {'+
'	width: 440px !important;'+
'}'+
'body[yahoo] .section-img img {'+
'	width: 320px !important;'+
'	height: auto !important;'+
'}'+
'body[yahoo] .team-img img {'+
'	width: 100% !important;'+
'	height: auto !important;'+
'}'+
'}'+
''+
'@media only screen and (max-width: 479px) {'+
'/*------ top header ------ */'+
'body[yahoo] .main-header {'+
'	font-size: 20px !important;'+
'}'+
'body[yahoo] .main-section-header {'+
'	font-size: 24px !important;'+
'}'+
'/* ====== divider ====== */'+
'body[yahoo] .main-img img {'+
'	width: 280px !important;'+
'}'+
'body[yahoo] .divider img {'+
'	width: 280px !important;'+
'}'+
'/*-------- container --------*/'+
'body[yahoo] .container590 {'+
'	width: 280px !important;'+
'}'+
'body[yahoo] .container590-center {'+
'	width: 280px !important;'+
'	text-align: center;'+
'}'+
'body[yahoo] .container580 {'+
'	width: 260px !important;'+
'}'+
'body[yahoo] .container500 {'+
'	width: 280px !important;'+
'}'+
'body[yahoo] .container400 {'+
'	width: 260px !important;'+
'}'+
'body[yahoo] .container800 {'+
'	width: 100% !important;'+
'}'+
'body[yahoo] .container780 {'+
'	width: 280px !important;'+
'}'+
'body[yahoo] .container800_img {'+
'	width: 100% !important;'+
'	height: auto !important;'+
'}'+
'body[yahoo] .section800_img img {'+
'	width: 100% !important;'+
'	height: auto !important;'+
'}'+
'body[yahoo] .half-container800 {'+
'	width: 100% !important;'+
'}'+
'body[yahoo] .half-container {'+
'	width: 130px !important;'+
'}'+
'body[yahoo] .container500 {'+
'	width: 280px !important;'+
'}'+
'/*-------- secions ----------*/'+
'body[yahoo] .container590 {'+
'	width: 280px !important;'+
'}'+
'body[yahoo] .section-img img {'+
'	width: 280px !important;'+
'	height: auto !important;'+
'}'+
'}'+
'</style>'+
'    </head>'+
'    <body yahoo="fix" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="background: linear-gradient(#ffffff, #d7e4f6)">'+
''+
'<!-- ======= main section ======= -->'+
'<table border="0" width="100%" cellpadding="0" cellspacing="0">'+
'	'+
'      <tr>'+
'    <td height="25" style="font-size: 25px; line-height: 25px;"> </td>'+
'  </tr>'+
'	'+
'        <tr>'+
'        <td align="center">'+
'      <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">'+
'    <tr>'+
'          <td><table border="0" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'              <tr>'+
'              <td height="5" style="font-size: 5px; line-height: 5px;"> </td>'+
'            </tr>'+
'              <tr>'+
'              <td align="center"><table border="0" cellpadding="0" cellspacing="0" align="center">'+
'                  <tr>'+
'                  <td align="center" style="color: #ffffff; font-size: 14px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 24px;"><div style=" line-height: 24px;"> <a href="https://3559763.app.netsuite.com/core/media/media.nl?id=2239597&c=3559763&h=ce0bc7f2f25a1161940c&mv=jy6flog0&_xt=.html&fcts=20190716161200&whence=" style="color: #244175; text-decoration: none;">¿Problemas con las imágenes? Ver en línea</a> </div></td>'+
'                </tr>'+
'                </table></td>'+
'            </tr>'+
'            </table></td>'+
'            '+
'		<td class="hide" class="align-center">'+
'          <table border="0" width="135" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="hide">'+
'        <tr>'+
'              <td><table border="0" align="left" width="35" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590 hide">'+
'                  <tr>'+
'                  <td width="10" height="10" style="font-size:10px; line-height: 10px;"> </td>'+
'                </tr>'+
'                </table></td>'+
'            </tr>'+
'      </table>'+
'          </td>'+
'        '+
'      <td class="hide" class="align-center">'+
'    <table border="0" width="100" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'          <tr>'+
'        <td><table border="0" width="100" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'            <tr>'+
'              <td align="left" style="color: #f2d221; font-size: 14px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 20px;" class="align-center"><!-- ======= section subtitle ====== -->'+
'                '+
'                <table border="0" width="70" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">'+
'                  <tr>'+
'                    <td align="left"><table border="0" align="left" cellpadding="0" cellspacing="0" class="container590">'+
'                        '+
'						<tr>'+
'                          <td align="center"><table border="0" align="center" width="130" cellpadding="0" cellspacing="0" style="/*background-image: url(https://system.na2.netsuite.com/core/media/media.nl?id=726035&c=3559763&h=c952804928bf7f1ef5d6&whence=)*/" border-radius: "30px;">'+
'                              <tr>'+
'                                <td height="8" style="font-size: 8px; line-height: 8px;"> </td>'+
'                              </tr>'+
'                              <tr>'+
'                                <td align="left"><table align="center" border="0" cellpadding="0" cellspacing="0">'+
'                                    <tr>'+
'                                      <td align="center" style="color: #000; font-size: 14px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 16px;"><!-- ======= main section button ======= -->'+
'                                        '+
'                                        <div style="line-height: 26px;"> <a href="https://kaloni.mx/injerto-capilar.html" style="color: #244175; text-decoration: none; align: center;">Soluciones Kaloni</a> </div></td>'+
'                                    </tr>'+
'                                  </table></td>'+
'                              </tr>'+
'							  '+
'                              <tr>'+
'                                <td height="8" style="font-size: 8px; line-height:8px;"> </td>'+
'                              </tr>'+
'                            </table></td>'+
'                        </tr>'+
'						'+
'                      </table></td>'+
'                  </tr>'+
'                </table>'+
'				'+
'				</td>'+
'            </tr>'+
'          </table></td>'+
'      </tr>'+
'        </table>'+
'		  </td>'+
'		  '+
'      </tr>'+
'  </table>'+
'      </td></tr>'+
'		 </table>'+
'	'+
'   <tr>'+
'    <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'   </tr>'+
'     <!-- ======= Logotipo ======= -->'+
'      <tr>'+
'    <td height="5" style="font-size: 5px; line-height: 5px;">  '+
'      <!-- ======= Logotipo ======= -->'+
'      '+
'      <table border="0" width="100%" cellpadding="0" cellspacing="0">'+
'        <tr> '+
'          <!-- ======= divider  ======= -->'+
'          <td align="center" class="divider"><a href="#"><img width="800" border="0" style="display: block; width: 352px; height: auto;" src="https://3559763.app.netsuite.com/core/media/media.nl?id=2208156&c=3559763&h=c10fcb13a1692139fcd2&fcts=20190703150133&whence=" alt="Logo Kaloni"/></a></td>'+
'        </tr>'+
'      </table></td>'+
'  </tr>'+
'      <!-- ======= end divider y de logo ======= --> '+
'      '+
'      <!-- ========== Texto de bienvenida ========== -->'+
'    <td align="center"><table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">'+
'        <tr>'+
'          <td height="50" style="font-size: 10px; line-height: 10px;"> </td>'+
'        </tr>'+
'        <tr>'+
'          <td align="center" style="color: #30497B; font-size: 36px; font-family: \'Poppins\', Calibri, sans-serif; font-weight: 700; line-height: 30px;" class="main-section-header">'+
'           <!-- ======= section text ====== -->'+
'            <div style="line-height: 30px; text-transform: uppercase;"> '+cambiar+' </div>'+
'            <div style="line-height: 30px; text-transform: uppercase;"> ¡hoy es un día muy especial! </div></td>'+
'        </tr>'+
'        <tr>'+
'          <td height="15" style="font-size: 15px; line-height: 15px;"> </td>'+
'        </tr>'+
'        <tr>'+
'          <td align="center"><table align="center" width="300" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFB740" style="border-radius: 5px;">'+
'              <tr>'+
'                <td height="3" style="font-size: 3px; line-height: 3px;"></td>'+
'              </tr>'+
'            </table></td>'+
'        </tr>'+
'        <tr>'+
'          <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'        </tr>'+
'      </table></td>'+
'	<!-- ========== Terimna el Texto de bienvenida ========== --> '+
'  </tr>'+
'    </table>'+
'<!-- ======= end section ======= --> '+
''+
'<!-- ======= features section ======= -->'+
'<table border="0" width="100%" cellpadding="0" cellspacing="0">'+
'      <tr>'+
'    <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'  </tr>'+
'      <tr align="center">'+
'    <td align="center"><table border="0" align="center" width="780" cellpadding="0" cellspacing="0" class="container780">'+
'        <tr>'+
'          <td align="center">'+
''+
'            <!-- SECCION DE DESCUENTO -->'+
'            '+
'            <table border="0" width="780" align="center" cellpadding="0" cellspacing="0" class="container780">'+
'              <tr>'+
'                <td height="40" style="font-size: 40px; line-height: 40px;"> </td>'+
'              </tr>'+
'              <tr>'+
'                <td><table border="0" width="380" align="left" cellpadding="0" cellspacing="0" class="container780 hide-800">'+
'                    <tr>'+
'                      <td align="center"><a href="https://kaloni.mx/" style="text-decoration: none;"> <img src="https://3559763.app.netsuite.com/core/media/media.nl?id=2238894&c=3559763&h=a38be830def63e7bf37e&fcts=20190716113418&whence=" alt="Regalos" style="width: 300"> </a></td>'+
'                    </tr>'+
'					'+
'					<tr>'+
'                <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'              </tr>'+
'					'+
'					<tr>'+
'                      <td align="center" style="color: #30497b; font-size: 12px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 24px;font-weight: 300;">'+
'                       '+
'                       <!-- ======= section text ====== -->'+
'                        '+
'                       <div style="line-height: 20px; text-align: center; width: 75%;"> *Aplican restricciones. Válido durante el mes de tu cumpleaños, al presentar tu identificación oficial.</div>'+
'						'+
'					  </td>'+
'                    </tr>'+
'						'+
'                  </table>'+
'                  '+
'					<table border="0" width="300" height="auto" align="center" cellpadding="0" cellspacing="0" class="container780 hide_img" style="align-content: center;">'+
'                    <tr align="center">'+
'                      <td align="center" class="container800_img"><a href="#" style="text-decoration: none;text-align: center;"> <img src="https://3559763.app.netsuite.com/core/media/media.nl?id=2238903&c=3559763&h=f58b063e644f6e71243c&fcts=20190716114030&whence=" style="width: 100%; height: auto;"> </a></td>'+
'                    </tr>'+
'                    <td width="10"> </td>'+
'                  </table>'+
'					'+
'                  <table border="0" width="300" align="left" cellpadding="0" cellspacing="0" class="container780">'+
'                    <tr>'+
'                      <td width="10" class="hide-800"> </td>'+
'                      <td align="center" style="color: #30497b; font-size: 16px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 24px;font-weight: 400">'+
'                       '+
'                       <!-- ======= section text ====== -->'+
'                        '+
'                       <div style="line-height: 24px; text-align: justify;"> Te consentimos en este mes de tu cumpleaños.</div>'+
'						'+
'					  </td>'+
'                    </tr>'+
'                    '+
'                   <tr>'+
'                      <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'                    </tr>'+
'					  '+
'					  <tr class="hide-800"> '+
'                      <td height="20" style="font-size: 20px; line-height: 20px;"> </td>'+
'                    </tr>'+
'                    '+
'                    <tr>'+
'                      <td width="10" class="hide-800"> </td>'+
'                      <td align="center" style="color: #ff9740; font-size: 16px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 24px;font-weight: 400;"><!-- ======= section text ====== -->'+
'                        '+
'                        <div style="line-height: 24px; text-align: justify;">  En la compra de un Kit Kaloni Complete® te otorgamos un <b>10% de descuento</b>.</div></td>'+
'                    </tr>'+
'					  '+
'                    <tr>'+
'                      <td height="50" style="font-size: 50px; line-height: 50px;"> </td>'+
'                    </tr>'+
'                    '+
'                    <tr>'+
'                      <td width="10" class="hide-800"> </td>'+
'                      <td align="center" style="color: #30497b; font-size: 22px; font-family: \'Helvetica\', Calibri, sans-serif;line-height: 24px;font-weight: 600"><!-- ======= section text ====== -->'+
'                        '+
'                        <div style="line-height: 24px; text-align: center;"> ¡Muchas felicidades! </div></td>'+
'                    </tr>'+
'                    '+
'                  </table>'+
'                  </td>'+
'              </tr>'+
'				'+
'				<tr>'+
'                <td height="10" style="font-size: 10px; line-height: 10px;"> </td>'+
'              </tr>'+
'				'+
'            </table>'+
'         </td>'+
'        </tr>'+
'      </table></td>'+
'  </tr>'+
'    </table>'+
'            '+
'            <!-- FIN DE SECCION DESCUENTO -->'+
'            <!-- SECCION DE DESCUENTO -->'+
''+
''+
'<!-- ======= Imagen de pie de página ======= -->'+
'<table border="0" width="100%" cellpadding="0" cellspacing="0">'+
'      <table border="0" width="100%" align="center" cellpadding="0" cellspacing="0">'+
'                    <tr>'+
'                      <td align="center"><a href="#" style="text-decoration: none;"> <img src="https://system.na2.netsuite.com/core/media/media.nl?id=1781281&c=3559763&h=6744f1371a6994cb2f22&whence=" style="width:100%" alt="Footer imagen de Regalos"> </a></td>'+
'                    </tr>'+
'	</table>'+
'</table>'+
'<!-- ======= Termina Imagen de pie de página ======= -->'+
''+
'</body>'+
'</html>';

    nlapiLogExecution('ERROR', 'emailBody: ', emailBody);
    var renderer = nlapiCreateTemplateRenderer();
    renderer.setTemplate(emailSubj);
    var renderSubj = renderer.renderToString();
    renderer.setTemplate(emailBody);
    var renderBody = renderer.renderToString();

  	//renderBody = renderBody.replace(cambiar,"Daniela Avila");
  	//nlapiSendEmail("198528", "acolin@kaloni.com",renderSubj, renderBody , null, null, null, null,true,null, null);
  	//nlapiSendEmail("198528", "bgarcia@kaloni.com",renderSubj, renderBody , null, null, null, null,true,null, null);

    // Saved Search: Script Cliente Cumpleaños = customsearch932
    // Saved Search: Envio cumpleaños = customsearch7293
    var revresults = nlapiSearchRecord('supportcase','customsearch7293');
    for(var i in revresults)
    {
        var result1 = revresults[i];
        var jsonString = JSON.stringify(result1);
        nlapiLogExecution('ERROR', 'jsonString: ', jsonString);

        var column1 = result1.getAllColumns();
        //var internalId_Cliente = result1.id;
        //nlapiLogExecution('ERROR', 'internalId_Cliente: ', internalId_Cliente);
        var idCliente = result1.getValue(column1[0]);
        var cliente = result1.getText(column1[0]);
        var clienteSplit = cliente.split(" ");
        var hgVal = clienteSplit[0];
        cliente = cliente.replace(hgVal, "");
      	cliente = cliente.trim();
        nlapiLogExecution('ERROR', 'cliente: ', cliente);

        var email = result1.getValue(column1[1]);
        nlapiLogExecution('ERROR', 'email: ', email);
      	var sucId = result1.getValue(column1[2]);
        var verific=email.indexOf("kaloni") > -1;

        if(verific == false && email !="")
        {
            renderBody = renderBody.replace(cambiar,cliente);
            try
            {
                nlapiSendEmail("198528", email, renderSubj, renderBody , null, null, null, null, true,null, null); // email
                nlapiLogExecution('ERROR', 'send email: ', 'ok');
                cambiar=cliente;
            }catch(e){
                cambiar=cliente;
                var break_Defaul ="";
            }
        }

    }
}
