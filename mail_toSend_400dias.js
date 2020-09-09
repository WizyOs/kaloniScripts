/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */

define(["N/ui/serverWidget", "N/crypto", "N/https", "N/runtime", "N/encode", "N/url", 'N/email', 'N/log', 'N/search', 'N/record'],
    function (ui, crypto, https, runtime, encode, urlMod, email, log, search, record) {
        function execute(context) {
          
// var body_mail = Procedimiento16_MX2020.html
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
'<title>Felicidades: has llegado a la meta</title>'+
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
'gradiente {'+
'    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ff7670+0,eec95c+100 */'+
'    background: #ff7670;'+
'    /* Old browsers */'+
'    background: -moz-linear-gradient(top, #ff7670 0%, #eec95c 100%);'+
'    /* FF3.6-15 */'+
'    background: -webkit-linear-gradient(top, #ff7670 0%, #eec95c 100%);'+
'    /* Chrome10-25,Safari5.1-6 */'+
'    background: linear-gradient(to bottom, #ff7670 0%, #eec95c 100%);'+
'            /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */'+
'            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#ff7670\', endColorstr=\'#eec95c\', GradientType=0);'+
'/* IE6-9 */'+
'}'+
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
'/* ----------- responsivity ----------- */'+
'        '+
'@media only screen and (max-width: 796px) {'+
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
'<!-- ======= ENVÍO 400 DESPUÉS DEL PROCEDIMIENTO ======= -->'+
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
'                  <td align="center" style="color: #ffffff; font-size: 14px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 24px;"><div style=" line-height: 24px;"> <a href="https://3559763.app.netsuite.com/core/media/media.nl?id=3983084&c=3559763&h=816af01b4035a3c4e16e&mv=k3fc8txk&_xt=.html&fcts=20191125200629&whence=" style="color: #ffffff; text-decoration: none;">¿Problemas con las imágenes? Ver en línea</a> </div></td>'+
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
'                            <td align="center" class="section800_img"><a href="#" style=" border-style: none !important; border: 0 !important;"><img src="https://3559763.app.netsuite.com/core/media/media.nl?id=3983083&c=3559763&h=2f73f12c70f057f020ad&fcts=20191125200541&whence=" style="display: block;" width="100%" border="0" alt="¡Felicidades!" /></a></td>'+
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
'<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="FFFFFF">'+
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
'                <td align="left" style="color: #456cb3; font-size: 36px; font-family: \'Poppins\', Calibri, sans-serif; font-weight: 700;" class="main-section-header text-space"><div style="line-height: 40px; text-transform: uppercase;"> No hay fecha que no llegue ni plazo que no se cumpla. </div></td>'+
'              </tr>'+
'				'+
'				<tr><td height="5" style="font-size: 5px; line-height: 5px;"></td></tr>'+
'				'+
'			  <tr><td><div style="color: #456cb3;font-size: 15px; font-family: \'Helvetica\', Calibri, sans-serif; font-weight: 500;line-height: 22px">'+
'				  '+
'				 Has llegado a la meta. Finalmente puedes ver al 100% los resultados de tus implantes capilares.'+
'				  '+
'				  </div></td></tr>'+
'				'+
'				<tr><td height="13" style="font-size: 13px; line-height: 13px;"></td></tr>'+
'				'+
'				<table align="left" width="100" border="0" cellpadding="0" cellspacing="0" bgcolor="#456cb3" style="border-radius: 5px;">'+
'              <tr><td height="4" style="font-size: 4px; line-height: 4px;"></td></tr>'+
'            </table>'+
'            </table>'+
'            '+
'            '+
'            <!-- FIN SALUDO --> '+
'                        '+
'		 <!-- TEXTO 01 -->'+
'                '+
'                <table border="0" width="780" align="center" cellpadding="0" cellspacing="0" class="container780">'+
'                  <tr>'+
'                    <td height="20" style="font-size: 20px; line-height: 20px;"> </td>'+
'                  </tr>'+
'                  <tr>'+
'                    <td height="40" style="color: #333333; font-size: 15px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 25px;"> '+
'					Porque sabemos que la vida es mejor con cabello, en Kaloni nos preocupamos por tu bienestar y satisfacción.'+
'					</td>'+
'                  </tr>'+
'				  <tr><td height="20" style="font-size: 20px; line-height: 20px;"> </td></tr>'+
'                </table>'+
''+
'              <!-- FIN TEXTOS --> '+
'		'+
'		<!-- Boton de TEXTO completo -->'+
'			  '+
'                <table border="0" width="780" align="center" cellpadding="0" cellspacing="0" class="container780">'+
'                  <tr>'+
'                    <td height="20" style="font-size: 20px; line-height: 20px;"> </td>'+
'                  </tr>'+
'					'+
'				<table border="0" width="430" align="center" cellpadding="0" cellspacing="0" class="container590" bgcolor="#456CB3">'+
'				  <tr><td height="10" style="font-size:10px; line-height: 10px;"> </td></tr>'+
'                  <tr><td height="10" style="font-size:10px; line-height: 10px;"> </td>'+
'                    <td height="40" style="color: #fff; font-size: 15px; font-family: \'Helvetica\', Calibri, sans-serif; line-height: 22px;text-align: center;font-weight:800; "> '+
'					TE ESPERAMOS EN LA CLÍNICA PARA ENTREGAR <br>'+
'					TU CERTIFICADO DE ALTA DE MICROINJERTO '+
'					</td><td height="10" style="font-size:10px; line-height: 10px;"> </td>'+
'                  </tr>'+
'				  <tr><td height="10" style="font-size:10px; line-height: 10px;"> </td></tr>'+
'				</table>'+
'					'+
'                </table>'+
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
'							        						Teléfono'+
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
'                        <div  class="container590 container590-center"style="line-height: 25px;text-align: left;width: 280px;"> Has recibido este correo porque tus datos están registrados en nuestra página web, K-Center o página de Facebook. </div>'+
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

            var result = get_saved_search('customsearch7103', body_mail); // Disparo mailing 400D
            log.debug('result: ', result);
        }

        function get_saved_search(idSearch, body_m)
        {
          try
          {
            var count = 0;
            log.debug('idSearch: ', idSearch);
            var mySearch = search.load({id: idSearch});
            var myPagedData = mySearch.runPaged({"pageSize": 1000});

            myPagedData.pageRanges.forEach(function(pageRange){
                var myPage = myPagedData.fetch({index: pageRange.index});
                myPage.data.forEach(function(result){
					var parseJSONval = JSON.parse(JSON.stringify(result));
                    var correo = parseJSONval.values["attendeeCustomer.email"];
					if(correo != "" && correo != null)
                    {
                      var customerId = "";
                      //var email = "";
                      search.create({
                            type: search.Type.CUSTOMER,
                            filters: [search.createFilter({name: 'email', operator: search.Operator.IS, values: [correo]})],
                            columns: ['internalid', 'email']
                      }).run().each(function(result){
                          //var jsonString = JSON.stringify(result);	var obj = JSON.parse(jsonString);
                          customerId = result.getValue({name: 'internalid'});
                          log.debug('customerId: ', customerId);
                          /*email = result.getValue({name: 'email'});
                          log.debug('email: ', email);*/
                          return true;
                      });

                      //var fieldLookUp = search.lookupFields({type: search.Type.CUSTOMER, id: customerId, columns: ['custentity386']});
                      var objRecord = record.load({type: record.Type.CUSTOMER, id: customerId, isDynamic: true});
                      var noVolverAcontactar = objRecord.getValue({fieldId: 'custentity386'});
                      log.debug('noVolverAcontactar: ', noVolverAcontactar);
                      if(noVolverAcontactar == false)
                      {
                        var ccRecip = ['ajuarez@kaloni.com'];
                        email.send({author: 198528, recipients:correo, subject:'Felicidades: has llegado a la meta', body:body_m}); // 103204 198528 , cc: ccRecip
                        log.debug('Disparo mailing 400D to: ', correo);
                      }
                    }
                    count++;
                });
            });
          	return true;
          }catch(e){
            log.debug('Exception: ', e);
            return false;
          }
        }

        return {
            execute: execute
        };
    });