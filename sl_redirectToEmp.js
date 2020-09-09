/**
 * Suitelet that changes the PO Form Type
 */
	// *********************************************************************************************************
function actualizarPDFEmpleado(valid, valfol, water, logo, noImage){
  	try
    {
	var empRecord = nlapiLoadRecord('employee', valid);
	var employeeField = empRecord.getFieldValue('entityid');
  	var supervisorField = empRecord.getFieldText('supervisor');
  	var titleField = empRecord.getFieldValue('title');

  	var imagefile = '';
  	var urlImage = '';
    var image_url1 = '';
    var extImg = '';
  	var imageField = empRecord.getFieldValue('image');
  	if(imageField !== '' && imageField !== null){
      imagefile = nlapiLoadFile(imageField);
      urlImage = imagefile.getURL(); // https://system.na2.netsuite.com
      image_url1 = imagefile.getValue();
      var typeImg = imagefile.getType();
      var subs = typeImg.substr(0,3);
      if(subs === 'png')
      	extImg = subs;
      if(subs === 'JPG' || subs === 'JPE')
      	extImg = 'jpg';
      var first = urlImage.substr(0,1);
      if(first === '/')
        urlImage = 'https://system.na2.netsuite.com' + urlImage;
    }
  	else{
      urlImage = noImage;
    }

  	// Email | Phone | Address
	var emailField = empRecord.getFieldValue('email');
  	var phoneField = empRecord.getFieldValue('phone');
  	var mobilephoneField = empRecord.getFieldValue('mobilephone');
  	var defaultaddressField = empRecord.getFieldValue('defaultaddress');
  	var custentity325Field = empRecord.getFieldValue('custentity325');

  	// Classification
  	var pais = empRecord.getFieldText('subsidiary');
  	var locationField = empRecord.getFieldText('location');
    var departmentField = empRecord.getFieldText('department');

  	// Human Resources
  	var birthdateField = empRecord.getFieldValue('birthdate');
  	var hiredateField = empRecord.getFieldValue('hiredate');
  	var custentity148Field = empRecord.getFieldValue('custentity148');
  	var socialsecuritynumberField = empRecord.getFieldValue('socialsecuritynumber');
  	var titleField = empRecord.getFieldValue('title');
  	var custentity324Field = empRecord.getFieldValue('custentity324');
    var custentity342Check = empRecord.getFieldValue('custentity342');
    var custentity340Field = empRecord.getFieldValue('custentity340');
    var custentity341Field = empRecord.getFieldValue('custentity341');
    var custentity343Field = empRecord.getFieldText('custentity343');
    var custentity346Check = empRecord.getFieldValue('custentity346');
    var custentity344Check = empRecord.getFieldValue('custentity344');
    var custentity345Check = empRecord.getFieldValue('custentity345');
    var custentity347Field = empRecord.getFieldValue('custentity347');
    var custentity350Field = empRecord.getFieldText('custentity350');
    var custentity351Field = empRecord.getFieldText('custentity351');
    var firmaEmpBase64 = empRecord.getFieldValue('custentity396');
    var firmaEmp1 = '<img src=\"#\" width=\"100\" height=\"100\"></img>';
    if(firmaEmpBase64 != null && firmaEmpBase64 != "")
    {
      var firmaEmp1Replace = firmaEmpBase64.replace("ok_data:image/png;base64,", "");
      firmaEmp1 = '<img src=\"data:image/png;base64,'+nlapiEscapeXML(firmaEmp1Replace)+'\" width=\"100\" height=\"100\"></img>';
    }

  	// Vacaciones
  	var custentity320Field = empRecord.getFieldValue('custentity320');
  	var custentity321Field = empRecord.getFieldValue('custentity321');
  	var custentity322Field = empRecord.getFieldValue('custentity322');
  	var custentity323Field = empRecord.getFieldValue('custentity323');

  	// Access
  	var giveaccessCheck = empRecord.getFieldValue('giveaccess');

  	// Periféricos
  	var custentity326Check = empRecord.getFieldValue('custentity326');
  	var custentity328Check = empRecord.getFieldValue('custentity328');
  	var custentity327Field = empRecord.getFieldText('custentity327');
    var custentity339Check =  empRecord.getFieldValue('custentity339');

	var valFecha = getFecha();
        	// create file
            if (valfol != null && valfol !== '') {
				              	var xml = '<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n<pdf>\n<body background-image=\"'+nlapiEscapeXML(water)+'\" >\n'; // font-size=\"12\"
              	xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"20px\" align=\"center\">EXPEDIENTE EMPLEADO</p>\n";
           		xml += "<table border=\"1\" style=\"width:100%; font-family:'Aria', sans-serif\">";
           		xml += '<tr><td align=\"center\" colspan=\"3\" color=\"#FFFFFF\" background-color=\"#346094\"><b>Datos Generales</b></td></tr>';
              	if(imageField !== '' && imageField !== null){
                  //nlapiLogExecution('ERROR', 'image_url1', image_url1);
                  var img1 = '<img src=\"data:image/'+extImg+';base64,'+nlapiEscapeXML(image_url1)+'\" width=\"100\" height=\"100\"></img>';
                  xml += '<tr><td>'+img1+'</td>';
                  //nlapiLogExecution('ERROR', 'img1', img1);
                }
              	else{
                  //nlapiLogExecution('ERROR', 'urlImage', urlImage);
                  var img2 = '<img src=\"'+nlapiEscapeXML(urlImage)+'\" width=\"100\" height=\"100\"></img>';
                  xml += '<tr><td>'+img2+'</td>';
                  //nlapiLogExecution('ERROR', 'img2', img2);
                }
           		xml += '<td><b>Nombre: </b>'+employeeField+'<br/><b>Sucursal: </b>'+locationField+'<br/><b>Fecha de entrada: </b>'+hiredateField+'<br/>';
           		xml += '<b>Email: </b>'+emailField+'<br/><b>Empresa: </b>'+pais+'<br/><b>Edad: </b>'+custentity148Field+'</td>';
           		xml += '<td><b>Departamento: </b>'+departmentField+'<br/><b>Supervisor: </b>'+supervisorField+'<br/><b>Rol: </b>'+titleField+'<br/>';
              	xml += '<b>Fecha de Nacimiento: </b>'+birthdateField+'<br/><b>NSS: </b>'+socialsecuritynumberField+'<br/><b>Acceso: </b>'+giveaccessCheck+'</td></tr></table>';
              	xml += '<p></p>';
           		xml += "<table border=\"1\" style=\"width:100%; font-family:'Aria', sans-serif\">";
           		xml += '<tr><td align=\"center\" colspan=\"4\" color=\"#FFFFFF\" background-color=\"#346094\"><b>Dirección y Complementos</b></td></tr>';
           		xml += '<tr><td colspan=\"4\"><b>Dirección: </b>'+defaultaddressField+'</td></tr>';
           		xml += '<tr><td><b>Teléfono celular: </b>'+mobilephoneField+'</td><td><b>Ext: </b>'+custentity325Field+'</td><td><b>Estado civil: </b>'+custentity351Field+'</td><td><b>Género: </b>'+custentity350Field+'</td></tr></table>';
           		xml += '<p></p>';
              	xml += "<table border=\"1\" style=\"width:100%; font-family:'Aria', sans-serif\">";
				xml += '<tr><td align=\"center\" colspan=\"9\" color=\"#FFFFFF\" background-color=\"#346094\"><b>Nivel Académico</b></td></tr>';
              	xml += '<tr><td align=\"right\">'+checado(custentity346Check)+'</td><td><b>Español</b></td><td align=\"right\">'+checado(custentity342Check)+'</td><td><b>Inglés</b></td><td align=\"right\">'+checado(custentity344Check)+'</td><td><b>Portugués</b></td><td align=\"right\">'+checado(custentity345Check)+'</td><td><b>Alemán</b></td><td><b>Educación: </b>'+custentity343Field+'</td></tr></table>';
           		xml += '<p></p>';
				xml += "<table border=\"1\" style=\"width:100%; font-family:'Aria', sans-serif\">";
				xml += '<tr><td align=\"center\" colspan=\"3\" color=\"#FFFFFF\" background-color=\"#346094\"><b>Vacaciones</b></td></tr>';
           		xml += '<tr><td><b>Correspondientes: </b>'+custentity320Field+'</td><td><b>Usados: </b>'+custentity321Field+'</td>';
           		xml += '<td><b>Restantes: </b>'+custentity322Field+'</td></tr>';
           		xml += '<tr><td colspan=\"3\"><b>Comentarios: </b>'+custentity323Field+'</td></tr></table>';
              	xml += '<p></p>';
				xml += "<table border=\"1\" style=\"width:100%; font-family:'Aria', sans-serif\">";
				xml += '<tr><td align=\"center\" colspan=\"7\" color=\"#FFFFFF\" background-color=\"#346094\"><b>Accesorios</b></td></tr>';
              	xml += '<tr><td align=\"right\">'+checado(custentity326Check)+'</td><td><b>Cuenta de correo</b></td><td align=\"right\">'+checado(custentity328Check)+'</td><td><b>Diadema</b></td>';
              	xml += '<td align=\"right\">'+checado(custentity339Check)+'</td><td><b>Uniforme</b></td><td><b>Equipo: </b>'+custentity327Field+'</td></tr></table>';
				xml += '<p></p>';
				xml += "<table border=\"1\" style=\"width:100%; font-family:'Aria', sans-serif\">";
				xml += '<tr><td align=\"center\" colspan=\"3\" color=\"#FFFFFF\" background-color=\"#346094\"><b>Evaluación de Desempeño</b></td></tr>';
              	xml += '<tr style=\"height:100px\"><td align=\"left\"><b>Evaluación:</b><br/>'+custentity340Field+'</td>';
              	xml += '<td align=\"left\"><b>Aspectos a mejorar:</b><br/>'+custentity341Field+'</td><td align=\"left\"><b>Fecha Primera Rev.</b><br/>'+custentity347Field+'</td></tr></table>';
              	xml += '<p></p><p></p>';
                xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p></p>\n";
           		xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
           		xml += '<tr><td align=\"right\">'+valFecha+' <br/> <br/> </td></tr>';
              	xml += '<tr><td align=\"left\"><b>GRUPO KALONI Y EMPRESAS RELACIONADAS,</b> <br/> <br/> </td></tr>';
              	xml += '<tr><td align=\"left\">El (a) suscrito (a) <b><u>'+employeeField+'</u></b>, comisionado en el Centro de Trabajo denominado <b>Kaloni Holding Group S.C.</b>, ';
           		xml += 'en adelante \“LA EMPRESA\” por este medio manifiesto expresamente que me ha sido entregado un usuario y contraseña de Netsuite, la cual está estrictamente prohibido transferir a otras personas ya sea físicas o morales; manifiesto que tengo conocimiento que el usuario y contraseña mencionados me darán acceso a datos sensibles propiedad de la empresa y de terceros (pacientes, proveedores, consultores, médicos, entre otros) los cuales son propiedad única y exclusiva de \“LA EMPRESA\” por lo cual el (a) suscrito (a) se obliga a salvaguardar el estado confidencial de los mismos. <br/> <br/> Manifiesto que tengo pleno conocimiento de la responsabilidad que adquiero desde este momento, toda vez que de violentar, sustraer, utilizar, difundir, modificar y cualquiera otra conducta tendiente a menoscabar el patrimonio informativo y legal de \“LA EMPRESA\”, estaré incurriendo en un delito cuyas sanciones y medidas de seguridad serán impuestas por las Leyes Federales y locales correspondientes de los Estados Unidos Mexicanos además de las establecidas en el ACUERDO PRIVADO DE CONFIDENCIALIDAD Y NO DIVULGACIÓN DE LA INFORMACION firmado entre \“LA EMPRESA\” y el (a) suscrito (a) el día <b><u>'+valFecha+'</u></b>.</td></tr>';
              	xml += '<tr><td align=\"center\"> '+firmaEmp1+' ____________________________________</td></tr><tr><td align=\"center\"><b>NOMBRE Y FIRMA</b></td></tr></table>';
              	xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
                xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<p></p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td align=\"left\"><b>ACUERDO PRIVADO DE CONFIDENCIALIDAD Y NO DIVULGACIÓN DE INFORMACIÓN QUE CELEBRAN POR UNA PARTE, KALONI HOLDING GROUP, S.C., EN LO SUCESIVO \“EL TITULAR\”, REPRESENTADA EN ESTE ACTO POR, PAOLA ANGÉLICA ORTIZ GARCÍA EN CARÁCTER DE REPRESENTANTE LEGAL, Y POR LA OTRA <u>'+employeeField+'</u> A QUIEN EN LO SUCESIVO SE LE DENOMINARÁ \“EL RECEPTOR\”, AL TENOR DE LAS DECLARACIONES Y CLÁUSULAS SIGUIENTES:</b></td></tr></table>';
              	xml += '<p></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"17px\" align=\"center\"><b>DECLARACIONES</b></p>\n";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><b>I. Declara \“EL TITULAR\” que:</b></td></tr>';
              	xml += '<tr><td><br/>a) Es una sociedad civil debidamente constituida en apego a la legislación civil vigente en los Estados Unidos Mexicanos, lo cual consta en la Escritura Pública No. 57,771 de fecha 27 de abril del 2015, pasada ante la fe del Lic. Mauricio Martínez Rivera Notario Público No. 96 de la Ciudad de México.</td></tr><tr><td><br/>b) Su representante cuenta con la personalidad y capacidad jurídica suficiente para la celebración de este convenio y que dichas facultades no le han sido revocadas, limitadas ni modificadas en forma alguna.</td></tr><tr><td><br/>c) El domicilio que señala es el ubicado en Av. Vasco de Quiroga 3900, Torre B, Piso 4, Santa Fe, Cuajimalpa de Morelos, Ciudad de México C.P. 05348.</td></tr><tr><td><br/>d) Es su voluntad celebrar el presente acto jurídico a fin de garantizar la estricta confidencialidad de toda la información que, bajo los términos y condiciones contenidos en este instrumento, se proporcionará a \“EL RECEPTOR\”.<br/> <br/></td></tr>';
              	xml += '<tr><td><b>II. Declara \“EL RECEPTOR\” que:</b></td></tr>';
              	xml += '<tr><td><br/>a) Es su deseo celebrar el presente convenio con \“EL TITULAR\”, a fin de garantizar la estricta secrecía sobre la totalidad de la información a que tenga acceso o le sea proporcionada por ésta, obligándose en los términos y condiciones contenidos en el presente instrumento jurídico.</td></tr><tr><td><br/>b) El domicilio que señala para todos los efectos legales nacidos a partir de la celebración del presente instrumento jurídico es el ubicado en <u>'+defaultaddressField+'.</u> <br/><b>En atención a las declaraciones expuestas, las partes manifiestan su consentimiento en obligarse de conformidad con las siguientes:</b></td></tr></table>';
              	xml += '<p></p>';
                xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"17px\" align=\"center\"><b>CLÁUSULAS</b></p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><b>PRIMERA.-</b> Definiciones.-. Para todos los efectos legales a que haya lugar, así como para la interpretación del presente convenio, las partes están de acuerdo en que los conceptos utilizados en dicho instrumento jurídico, se entenderán con estricto apego a las siguientes definiciones:</td></tr><tr><td><br/>a) Secreto industrial. Se entenderá como toda información de aplicación industrial o comercial que guarde \“EL TITULAR\” con carácter confidencial, que le signifique obtener o mantener una ventaja competitiva o económica frente a terceros en la realización de actividades económicas y respecto de la cual haya adoptado los medios o sistemas suficientes para preservar su confidencialidad y el acceso restringido a la misma.</td></tr><tr><td><br/>Es así que, para todos los efectos legales derivados del presente instrumento, toda la información perteneciente a \“EL TITULAR\” será considerada como secreto industrial en términos de lo que previene el convenio en comento, así como por lo dispuesto en el Título Tercero de la Ley de la Propiedad Industrial, relativo al secreto industrial.</td></tr><tr><td><br/>b) Información Confidencial. Se entenderá por información aquella proporcionada por \“EL TITULAR\” a \“EL RECEPTOR\” a través de cualquier medio, ya sea de manera escrita, oral, electrónica, gráfica, visual o bien aquella que pueda ser recabada por \“el receptor\” cualquiera de los sentidos del ser humano, o contenida en medios escritos, electrónicos o electromagnéticos, lo que incluye de manera enunciativa más no limitativa, información de naturaleza operativa, médica, (incluyendo información personal y sensible contenida en expedientes clínicos de pacientes), técnica, jurídica, regulatoria, financiera, contable y comercial, al igual que información relativa a nombres de clientes, proveedores o socios actuales y potenciales, propuestas de negocios, reportes, planes, proyecciones de mercado, ideas, datos, conceptos, estudios, resúmenes, equipos, programas, estadísticas, folletos, los protocolos propiedad de \“EL TITULAR\” desarrollados para capacitación, el protocolo para uso e implementación de expediente clínico, protocolo de valoraciones, trasplante capilar y revisiones utilizado en la operación de \“EL TITULAR\”, las guías prácticas de operación para cada una de las funciones comisionadas en el centro de \“EL TITULAR\”, diseño de formatos, arte publicitario, instrumentos, dispositivos, políticas, y cualquier otra información, de cualquier índole, junto con fórmulas, mecanismos, patrones, métodos, técnicas, procesos de análisis, documentos de trabajo, compilaciones, investigaciones, comparaciones, estudios u otros instrumentos preparados que las partes se proporcionen o cualquiera de sus filiales o subsidiarias proporcione a \“EL RECEPTOR\”.</td></tr><tr><td><br/>Esta definición de Información Confidencial aplica para cualquiera que sea la fuente de información, ya sea \“EL TITULAR\” misma, sus clientes, alianzas, socios o cualquier otra entidad que esté vinculada de alguna manera con \“EL TITULAR\”.</td></tr></table>';
              	xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><br/>c) Conducta Ilícita. Se entenderá que \“EL RECEPTOR\” ha incurrido en una conducta ilícita cuando se apodere para sí o revele a cualquier tercero, sin que medie autorización por escrito de \“EL TITULAR\”, cualquier información que sea considerada como secreto industrial o información confidencial, o incurra de conformidad con la definición proporcionada en el presente convenio.</td></tr><tr><td><br/>d) Infracción. Se considerará que \“EL RECEPTOR\” ha incurrido en una infracción cuando cometa o realice cualquier conducta impropia, entendida ésta de acuerdo al concepto dado en la presente cláusula, cuando dicha conducta se ubique dentro de las hipótesis descritas en la cláusula séptima del presente convenio, así como cualesquiera de las establecidas por los artículos 213 al 222 del Capítulo II, Título Séptimo de la Ley de la Propiedad Industrial; así como, por los numerales 229 y 230 del Capítulo I, del Título XII de la Ley Federal de Derechos de Autor y demás normas aplicables.</td></tr><tr><td><br/>e) Delito. Se considerará que \“EL RECEPTOR\” ha incurrido en un delito cuando cometa o realice cualquier conducta ilícita, entendida ésta de acuerdo al concepto dado en la presente cláusula, cuando dicha conducta ilícita se ubique dentro de las hipótesis descritas en la cláusula octava del presente convenio, así como cualesquiera de las establecidas por los artículos 223 al 229 del Capítulo III, Título VII de la Ley de la Propiedad Industrial; así como por el numeral 213, Capítulo II, Título XIII del Código Penal del Distrito Federal y demás normas aplicables.</td></tr><tr><td><br/><b>SEGUNDA.-</b> Objeto.- \“EL RECEPTOR\” se compromete a guardar absoluta confidencialidad respecto de la información a que tenga acceso ya sea de forma oral, gráfica o escrita, con motivo de su prestación de servicios a \“EL TITULAR\”, relación de negocios, profesional, o cualquier actividad que cumpla en relación con \“EL TITULAR\” absteniéndose de revelarla sin que medie autorización por escrito de la misma.</td></tr><tr><td><br/>Queda expresamente entendido por \“EL RECEPTOR\” que la información confidencial a la que tenga acceso con autorización de \“EL TITULAR\” es propiedad exclusiva de la misma, ello con absoluta independencia de la vigencia del presente acuerdo de voluntades, de igual manera se considerará que toda aquella información generada por \“EL RECEPTOR\” con motivo de su relación de negocios o cualesquiera actividad que cumpla dentro de \“EL TITULAR\” será asimismo considerada propiedad exclusiva de ésta, por lo que este instrumento no otorga, de manera expresa o implícita, derecho intelectual o de propiedad industrial alguno, incluyendo, más no limitando, licencias de uso respecto de la información confidencial a favor de \“EL RECEPTOR\”.</td></tr><tr><td><br/><b>TERCERA.-</b> Confidencialidad.- \“EL RECEPTOR\” no podrá apoderarse para sí o revelar, en ningún momento y bajo ninguna modalidad, información de \“EL TITULAR\”, excepto cuando sea expresamente autorizado por escrito por éste. \“EL RECEPTOR\” que reciba la información será directamente responsable por las violaciones al secreto industrial o bien de secrecía de información</td></tr></table>';
              	xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
				xml += "<tr><td><br/>personal y /o sensible en las que incurra, con relación a la obligación de confidencialidad objeto del presente convenio.</td></tr><tr><td><br/>Asimismo, \“EL RECEPTOR\” no podrá utilizar la información de \“EL TITULAR\” con fines distintos a los estrictamente autorizados por \“EL TITULAR\” por escrito, así como a lo dispuesto en el presente instrumento sin la previa autorización del personal que cuente con los privilegios necesarios para otorgar dicha autorización por escrito.</td></tr><tr><td><br/><b>CUARTA.-</b> Requerimiento de autoridad judicial para revelar información.- \“EL RECEPTOR\” no podrá revelar información confidencial a ningún tercero sin el consentimiento previo y por escrito de \“EL TITULAR\”, salvo cuando medie orden judicial debidamente fundada y motivada dictada por la autoridad competente en que se requiera la entrega de información confidencial, en cuyo caso, \“EL RECEPTOR\” deberá, antes de proceder a revelar o entregar la misma, informar de manera inmediata a \“EL TITULAR\” de la existencia y pormenores de tal requerimiento, de tal suerte que ésta cuente con la posibilidad de hacer valer sus derechos ante las autoridades competentes.</td></tr><tr><td><br/><b>QUINTA.-</b> Devolución de la información.- \“EL RECEPTOR\” se encuentra obligado en los términos del presente convenio a entregar a \“EL TITULAR\”, una vez terminada la relación de cualquier naturaleza que ésta sea, toda la información que le haya sido proporcionada de manera escrita o en algún soporte físico o electrónico, para el desempeño de su función, de no ser así se entenderá que \“EL RECEPTOR\” incurre en una conducta ilícita, de conformidad a la definición contenida en la cláusula primera del presente convenio.</td></tr><tr><td><br/><b>SEXTA.-</b> De las infracciones.- Incurre en infracción \“EL RECEPTOR\” cuando su conducta, independientemente de las señaladas por las normas aplicables a cada caso, se ubique en cualquiera de las hipótesis que se enlistan a continuación:</td></tr><tr><td><br/>a) Use, sin consentimiento manifestado por escrito de \“EL TITULAR\”, una marca registrada o semejante en grado de confusión como elemento de un nombre comercial o de una denominación o razón social, o viceversa, siempre que dichos nombres, denominaciones o razones sociales estén relacionados con establecimientos que operen con los productos o servicios protegidos por la marca de \“EL TITULAR\”;</td></tr><tr><td><br/>b) Utilice una marca previamente registrada por \“EL TITULAR\” o semejante a ésta en grado de confusión como nombre comercial, denominación o razón social o como partes de éstos, para otra persona física o moral cuya actividad principal sea igual o similar a los que se aplican a la marca registrada de \“EL TITULAR\”, sin su consentimiento, debiendo ser éste último manifestado por escrito;</td></tr></table>";
              	xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><br/>c) Intente o logre el propósito de desprestigiar los productos, los servicios, la actividad industrial o comercial o el establecimiento de \“EL TITULAR\”.</td></tr><tr><td><br/>d) Ofrezca en venta o ponga en circulación productos que sean resultado de la utilización de procesos de \“EL TITULAR\”;</td></tr><tr><td><br/>e) Utilice un aviso comercial registrado o uno semejante en grado de confusión, sin el consentimiento de \“EL TITULAR\”, para anunciar bienes, servicios o establecimientos iguales o similares a los que se aplique el aviso;</td></tr><tr><td><br/>f) Utilice el nombre comercial de \“EL TITULAR\” o uno semejante en grado de confusión, sin la autorización respectiva de ésta, para amparar un establecimiento industrial, comercial o de servicios del mismo o similar giro al de \“EL TITULAR\”;</td></tr><tr><td><br/>g) Utilice una marca registrada de \“EL TITULAR\” en productos o servicios iguales o similares a los que la marca se aplique;</td></tr><tr><td><br/>h) Ofrezca en venta o ponga en circulación productos o servicios iguales o similares a los que se aplique una marca registrada de \“EL TITULAR\”, sin consentimiento de ésta;</td></tr><tr><td><br/>i) Ofrezca en venta o ponga en circulación productos o servicios como los que \“EL TITULAR\” ofrezca bajo su marca registrada;</td></tr><tr><td><br/>j) Ofrezca en venta, renta, arrendamiento o ponga en circulación productos a los que se aplique una marca registrada de \“EL TITULAR\”, después de haber alterado, sustituido o suprimido parcial o totalmente ésta;</td></tr><tr><td><br/>k) Utilice la combinación de signos distintivos, nombre comercial, elementos operativos y de imagen, que permitan identificar productos o servicios iguales o similares en grado de confusión a los de \“EL TITULAR\” y que por su uso causen o induzcan al público a confusión, error o engaño, por hacer creer o suponer la existencia de una relación entre \“EL TITULAR\” y un usuario no autorizado;</td></tr><tr><td><br/>l) Comunique o utilice públicamente una obra o información de \“EL TITULAR\” por cualquier medio, y de cualquier forma, sin la autorización previa y por escrito de ésta;</td></tr><tr><td><br/>m) Utilice la imagen de \“EL TITULAR\” sin su autorización;</td></tr></table>';
                xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><br/>n) Produzca, reproduzca, almacene, distribuya, transporte o comercialice copias de obras protegidas por los derechos de autor o por los derechos conexos, sin la autorización de \“EL TITULAR\”, titular de dichos derechos;</td></tr><tr><td><br/>o) Ofrezca en venta, almacene, transporte o ponga en circulación obras o información de \“EL TITULAR\” que hayan sido deformadas, modificadas o mutiladas sin su autorización;</td></tr><tr><td><br/>p) Importe, venda, arriende o realice cualquier acto que permita tener un dispositivo o sistema cuya finalidad sea desactivar los dispositivos electrónicos de protección de los programas de computación o software de \“EL TITULAR\”;</td></tr><tr><td><br/>q) Use, reproduzca o explote los programas de cómputo o software de \“EL TITULAR\”, sin que medie su consentimiento por escrito;</td></tr><tr><td><br/>r) Y demás infracciones establecidas por las leyes aplicables, siempre que no constituyan delitos.</td></tr><tr><td><br/><b>SÉPTIMA.-</b> Incumplimiento. Serán consideradas como incumplimiento las siguientes acciones:</td></tr><tr><td><br/>Inducir a cualquier proveedor y /o cliente de la empresa para que cancele o reduzca sus negocios con \“EL TITULAR\” y sus empresas relacionadas.</td></tr></table>';
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td align=\"right\" width=\"30%\"><br/>1. </td><td width=\"70%\"><br/>Atraer para sí o para beneficio de cualquier persona física o moral distinta a la de \“EL TITULAR\”, negocios de proveedor y/o cliente (el término proveedor significará cualquier persona física o moral que provea productos o servicios a \“EL TITULAR\” ya sea a cambio de dinero o permuta y, cliente significará cualquier persona física o moral que adquiera o haya adquirido servicios de \“EL TITULAR\”).</td></tr><tr><td align=\"right\" width=\"30%\"><br/>2. </td><td width=\"70%\"><br/>Inducir a cualquier empleado de \“EL TITULAR\”, ya sea contratado directamente por éste o comisionado a través de un tercero y/o cualquiera de sus empresas afiliadas, asociadas, subsidiarias o accionistas para que deje de trabajar para \“EL TITULAR\” y/o cualquiera de sus empresas afiliadas, asociadas, subsidiarias o accionistas.</td></tr><tr><td align=\"right\" width=\"30%\"><br/>3. </td><td width=\"70%\"><br/>Ocultar cualquier perjuicio en los intereses de la empresa receptora del servicio cuando de manera directa o indirecta pueda \“EL RECEPTOR\” tener conocimiento de ello, teniendo la obligación de informar inmediatamente a \“EL TITULAR\” señalando a las personas involucradas en dicha situación ya sean beneficiadas o no con dicha conducta.</td></tr></table>';
                xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td align=\"right\" width=\"30%\"><br/>4. </td><td width=\"70%\"><br/>Lesionar de manera personal y dolosa los intereses de \“EL TITULAR\” o de sus empresas relacionadas por negligencia u omisión.</td></tr><tr><td align=\"right\" width=\"30%\"><br/>5. </td><td width=\"70%\"><br/>Solicitar o aceptar dádivas en su favor o de terceras personas, ofrecidas por acciones u omisiones relacionadas con el desempeño de sus actividades.</td></tr><tr><td align=\"right\" width=\"30%\"><br/>6. </td><td width=\"70%\"><br/>Contactar posibles clientes, fuera de las actividades estrictamente derivadas de su relación con \“EL TITULAR\” durante los próximos 5 (cinco) años posteriores a la finalización de su relación con \“EL TITULAR\”.</td></tr></table>';
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><br/><b>OCTAVA.-</b> De los delitos.- Se entenderá que \“EL RECEPTOR\” ha incurrido en un delito cuando su conducta lo coloque a sí mismo en cualesquiera de las hipótesis enumeradas por el artículo 223 de la Ley de la Propiedad Industrial o en la descrita por el artículo 213 del Código Penal del Distrito Federal, así como en cualquiera de las que se enlistan a continuación:</td></tr><tr><td><br/>a) Copie o reproduzca total o parcialmente software, código fuente o información de una base de datos de \“EL TITULAR\” así como de la documentación contable y/o fiscal o de cualquiera de sus clientes, alianzas o entidades con quien \“EL TITULAR\” tuviera relación, con intereses de beneficio personal o de terceros distintos a \“EL TITULAR\”</td></tr><tr><td><br/>b) Falsifique, en forma dolosa y con fin de especulación comercial, marcas protegidas de \“EL TITULAR\”;</td></tr><tr><td><br/>c) Produzca, almacene, transporte, introduzca al país, distribuya o venda, en forma dolosa y con fin de especulación comercial, objetos que ostenten falsificaciones de marcas protegidas de \“EL TITULAR\”, así como aporte o provea de cualquier forma, a sabiendas, materias primas o insumos destinados a la producción de objetos que ostenten falsificaciones de marcas protegidas de \“EL TITULAR\”;</td></tr><tr><td><br/>d) Revele a un tercero un secreto industrial o información confidencial, personal y/o sensible contenida en expedientes médicos, que se conozca con motivo de su prestación de servicios, relación de negocios, sin consentimiento manifestado por escrito de \“EL TITULAR\”, habiendo sido prevenido de su confidencialidad, con el propósito de obtener un beneficio económico para sí o para el tercero o con el fin de causar un perjuicio a \“EL TITULAR\” o cualquier otro;</td></tr><tr><td><br/>e) Se apodere de un secreto industrial o información confidencial, personal y/o sensible contenida en expedientes médicos sin derecho y sin consentimiento de \“EL TITULAR\” para usarlo o revelarlo a un tercero, con el propósito de obtener un beneficio económico para sí o para el tercero o con el fin</td></tr></table>';
                xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><br/>de causar un perjuicio a ésta, y</td></tr>';
              	xml += '<tr><td><br/>f) Use o revele cualquier información de \“EL TITULAR\”, de alguno de los clientes, alianzas o socios de ésta, a la cual haya tenido acceso o le haya sido proporcionada por \“EL TITULAR\” con motivo de su relación de negocios, sin consentimiento manifestado por escrito de \“EL TITULAR\”, o que le haya sido revelado por uno de estos terceros antes mencionados, con el propósito de obtener un beneficio económico propio o de un tercero y/o causar un perjuicio de cualquier índole a \“EL TITULAR\”.</td></tr><tr><td><br/><b>NOVENA.-</b> De las sanciones.- Las infracciones enlistadas en la cláusula sexta serán sancionadas bajo los términos de lo señalado en el artículo 214 de la Ley de la Propiedad Industrial y de acuerdo con lo siguiente:</td></tr><tr><td><br/>a) Multa hasta por el importe de veinte mil días de salario mínimo general vigente en el Distrito Federal;</td></tr><tr><td><br/>b) Multa adicional hasta por el importe de quinientos días de salario mínimo general vigente en el Distrito Federal, por cada día que persista la infracción, y</td></tr><tr><td><br/>c) Arresto administrativo hasta por 36 horas.</td></tr><tr><td><br/>Asimismo, las sanciones descritas anteriormente que correspondan a la comisión de una conducta que constituya una infracción regulada tanto por la Ley Federal de Derechos de Autor, como por la Ley de la Propiedad Industrial o cualquiera de las enlistadas en la cláusula sexta del presente instrumento jurídico, serán impuestas por el Instituto Mexicano de la Propiedad Industrial, quién es la autoridad competente de conformidad con la legislación aplicable, por lo que bastará con que \“EL TITULAR\” formule la denuncia correspondiente ante dicho Instituto.</td></tr><tr><td><br/>Cabe señalar que de conformidad con el artículo 218 de la Ley de la Propiedad Industrial, para los casos de reincidencia se duplicarán las multas señaladas, para tal efecto se entenderá por reincidencia, cada una de las subsecuentes infracciones que cometa \“EL RECEPTOR\” a un mismo precepto.</td></tr><tr><td><br/>Por otra parte, \“EL RECEPTOR\” se da por enterado de que de incurrir en cualquiera de las conductas previstas en la cláusula séptima, se hará acreedor a la respectiva sanción penal, bajo los términos de lo señalado en los artículos 224 de la Ley de la Propiedad Industrial y 213 del Código Penal para el Distrito Federal, de conformidad con los cuales se impondrán de dos a seis años de</td></tr></table>';
              	xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><br/>prisión y multa por el importe de cien a diez mil días de salario mínimo general vigente en el Distrito Federal, a \“EL RECEPTOR\” que cometa alguno de los delitos que se señalan en los incisos a), d), e) y f) de la referida cláusula séptima. De la misma manera, para el caso de los delitos previstos en los incisos b) o c) de la cláusula aludida, se impondrán de tres a diez años de prisión y multa de dos mil a veinte mil días de salario mínimo general vigente en el Distrito Federal.</td></tr><tr><td><br/><b>DÉCIMA.-</b> Cláusula convencional.- Las partes acuerdan que en caso de incumplimiento a las obligaciones derivadas del presente acuerdo, \“EL RECEPTOR\” estará obligado a realizar el pago de una pena convencional de $4,000,000.00 MXN (cuatro millones de pesos mexicanos), independientemente de las sanciones administrativas y penales a que se haga acreedor por la comisión de cualesquiera de las infracciones o delitos señalados por la legislación aplicable.</td></tr><tr><td><br/><b>DÉCIMA PRIMERA.-</b> Legislación Aplicable y Solución de Controversias.- Las partes manifiestan que en caso de surgir alguna controversia relacionada con la celebración, cumplimiento, interpretación o alcance legal del presente convenio, tratarán de resolverla de común acuerdo, y que en caso de no conseguirlo se someterán a la jurisdicción de las leyes y tribunales de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios presentes o futuros o por cualquier otra causa.</td></tr><tr><td><br/><b>DÉCIMA SEGUNDA.-</b> Vigencia.- El presente convenio surtirá efectos a partir de la fecha de firma del mismo y tendrá una vigencia de dos (2) años. Las obligaciones de confidencialidad y no uso seguirán vigentes después de dicha terminación o expiración y continuarán vigentes durante un período de cinco (5) años después de finalizada la relación entre las partes. En caso de que \“EL TITULAR\” lo solicite, \“EL RECEPTOR\” tendrá la obligación de destruir todas las copias en papel de la Información confidencial.</td></tr><tr><td><br/><b>Enteradas las partes del contenido y alcance legal del presente convenio, lo firman de conformidad frente a dos testigos en la Ciudad de México el día <u>'+valFecha+'</u>.</b></td></tr></table>';
              	xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
              	xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += "<tr><td align=\"center\"><br/><b>\“EL TITULAR\”</b></td><td align=\"center\"><br/><b>\“EL RECEPTOR\”</b></td></tr>";
              	xml += "<tr><td align=\"center\"><b>Kaloni Holding Group, S.C.</b></td><td align=\"center\"></td></tr>";
              	xml += "<tr><td align=\"center\"></td><td align=\"center\">"+firmaEmp1+"</td></tr>";
              	xml += "<tr><td align=\"center\">__________________________</td><td align=\"center\">__________________________</td></tr>";
              	xml += '<tr><td align=\"center\"><b>Paola Angélica Ortiz García</b></td><td align=\"center\"><b>'+employeeField+'</b></td></tr>';
              	xml += "<tr><td align=\"center\"><b>Representante Legal</b></td><td align=\"center\"></td></tr>";
              	xml += "<tr><td align=\"center\" colspan=\"2\"> <br/> <br/> <br/> <br/> <br/> </td></tr>";
              	xml += "<tr><td align=\"center\">__________________________</td><td align=\"center\">__________________________</td></tr>";
              	xml += '<tr><td align=\"center\"><b>Testigo</b></td><td align=\"center\"><b>Testigo</b></td></tr></table>';
              	xml += '</body>\n</pdf>';
                var fileXMLtoPDF = nlapiXMLToPDF(xml);
                fileXMLtoPDF.setFolder(valfol);
                var fileId = nlapiSubmitFile(fileXMLtoPDF);
				var fileName = employeeField + '.pdf'

              	var filePDF = nlapiLoadFile(fileId);
                var dataCopyOld = filePDF.getValue();
                //var nameCopyOld = filePDF.getName();
                var folderIdCopyOld = filePDF.getFolder();
                var fileTypeCopyOld = filePDF.getType();
                nlapiDeleteFile(fileId);//delete the older file

                var newFile = nlapiCreateFile(fileName, fileTypeCopyOld, dataCopyOld);//create a new file with the same details
                newFile.setFolder(folderIdCopyOld);
                var newfileId = nlapiSubmitFile(newFile);//submit it

                var newfilePDF = nlapiLoadFile(newfileId);
    		    var urlFile = newfilePDF.getURL();
				empRecord.setFieldValue('custentity324', urlFile);
              	empRecord.setFieldValue('custentity335', 'ok_' + valfol + '_' + newfileId);
      		 	nlapiLogExecution('DEBUG', 'function actualizarPDF() ', 'Value FOLDER STATUS: ok_' + valfol + '_' + newfileId);
              	nlapiSubmitRecord(empRecord, false, true);
                nlapiLogExecution('DEBUG', 'function actualizarPDF() ', 'Submitted the Employee now redirecting...');
                nlapiSetRedirectURL('RECORD', 'employee', valid, false);
              	return true;
              }
    }
  	catch(error)
    {
      var msgError = error;
      nlapiLogExecution('ERROR', 'Error al actualizar PDF empleado', msgError);
      return false;
    }
}


function crearPDFEmpleado(valid, water, logo, noImage){
  	try
    {
	var empRecord = nlapiLoadRecord('employee', valid);
	var employeeField = empRecord.getFieldValue('entityid');
  	var supervisorField = empRecord.getFieldText('supervisor');
  	var titleField = empRecord.getFieldValue('title');

  	var imagefile = '';
  	var urlImage = '';
    var image_url1 = '';
    var extImg = '';
  	var imageField = empRecord.getFieldValue('image');
  	if(imageField !== '' && imageField !== null){
      imagefile = nlapiLoadFile(imageField);
      urlImage = imagefile.getURL(); // https://system.na2.netsuite.com
      image_url1 = imagefile.getValue();
      var typeImg = imagefile.getType();
      var subs = typeImg.substr(0,3);
      if(subs === 'png')
      	extImg = subs;
      if(subs === 'JPG' || subs === 'JPE')
      	extImg = 'jpg';
      var first = urlImage.substr(0,1);
      if(first === '/')
        urlImage = 'https://system.na2.netsuite.com' + urlImage;
    }
  	else{
      urlImage = noImage;
    }

  	// Email | Phone | Address
	var emailField = empRecord.getFieldValue('email');
  	var phoneField = empRecord.getFieldValue('phone');
  	var mobilephoneField = empRecord.getFieldValue('mobilephone');
  	var defaultaddressField = empRecord.getFieldValue('defaultaddress');
  	var custentity325Field = empRecord.getFieldValue('custentity325');

  	// Classification
  	var pais = empRecord.getFieldText('subsidiary');
  	var locationField = empRecord.getFieldText('location');
    var departmentField = empRecord.getFieldText('department');

  	// Human Resources
  	var birthdateField = empRecord.getFieldValue('birthdate');
  	var hiredateField = empRecord.getFieldValue('hiredate');
  	var custentity148Field = empRecord.getFieldValue('custentity148');
  	var socialsecuritynumberField = empRecord.getFieldValue('socialsecuritynumber');
  	var titleField = empRecord.getFieldValue('title');
  	var custentity324Field = empRecord.getFieldValue('custentity324');
    var custentity342Check = empRecord.getFieldValue('custentity342');
    var custentity340Field = empRecord.getFieldValue('custentity340');
    var custentity341Field = empRecord.getFieldValue('custentity341');
    var custentity343Field = empRecord.getFieldText('custentity343');
    var custentity346Check = empRecord.getFieldValue('custentity346');
    var custentity344Check = empRecord.getFieldValue('custentity344');
    var custentity345Check = empRecord.getFieldValue('custentity345');
    var custentity347Field = empRecord.getFieldValue('custentity347');
    var custentity350Field = empRecord.getFieldText('custentity350');
    var custentity351Field = empRecord.getFieldText('custentity351');

  	// Vacaciones
  	var custentity320Field = empRecord.getFieldValue('custentity320');
  	var custentity321Field = empRecord.getFieldValue('custentity321');
  	var custentity322Field = empRecord.getFieldValue('custentity322');
  	var custentity323Field = empRecord.getFieldValue('custentity323');

  	// Access
  	var giveaccessCheck = empRecord.getFieldValue('giveaccess');

  	// Periféricos
  	var custentity326Check = empRecord.getFieldValue('custentity326');
  	var custentity328Check = empRecord.getFieldValue('custentity328');
  	var custentity327Field = empRecord.getFieldText('custentity327');
    var custentity339Check =  empRecord.getFieldValue('custentity339');

	var valFecha = getFecha();
  	nlapiLogExecution('DEBUG', 'createFolder: ', 'Value Employee ID | SUBSIDIARY: ' + employeeField + ' | ' + pais);

  	// create folder
  	var folder = nlapiCreateRecord('folder');

      if (folder && employeeField !== '' && pais !== '') {
		 var resultFolPar = getFolderPar(pais);
         folder.setFieldValue('parent', resultFolPar); // create root level folder
         folder.setFieldValue('name', employeeField);
         var folderId = nlapiSubmitRecord(folder);

        	// create file
            if (folderId != null && folderId !== '') {
              	var xml = '<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n<pdf>\n<body background-image=\"'+nlapiEscapeXML(water)+'\" >\n'; // font-size=\"12\"
              	xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"20px\" align=\"center\">EXPEDIENTE EMPLEADO</p>\n";
           		xml += "<table border=\"1\" style=\"width:100%; font-family:'Aria', sans-serif\">";
           		xml += '<tr><td align=\"center\" colspan=\"3\" color=\"#FFFFFF\" background-color=\"#346094\"><b>Datos Generales</b></td></tr>';
              	if(imageField !== '' && imageField !== null)
           		  xml += '<tr><td><img src=\"data:image/'+extImg+';base64,'+nlapiEscapeXML(image_url1)+'\" width=\"100\" height=\"100\"></img></td>';
              	else
                  xml += '<tr><td><img src=\"'+nlapiEscapeXML(urlImage)+'\" width=\"100\" height=\"100\"></img></td>';
           		xml += '<td><b>Nombre: </b>'+employeeField+'<br/><b>Sucursal: </b>'+locationField+'<br/><b>Fecha de entrada: </b>'+hiredateField+'<br/>';
           		xml += '<b>Email: </b>'+emailField+'<br/><b>Empresa: </b>'+pais+'<br/><b>Edad: </b>'+custentity148Field+'</td>';
           		xml += '<td><b>Departamento: </b>'+departmentField+'<br/><b>Supervisor: </b>'+supervisorField+'<br/><b>Rol: </b>'+titleField+'<br/>';
              	xml += '<b>Fecha de Nacimiento: </b>'+birthdateField+'<br/><b>NSS: </b>'+socialsecuritynumberField+'<br/><b>Acceso: </b>'+giveaccessCheck+'</td></tr></table>';
              	xml += '<p></p>';
           		xml += "<table border=\"1\" style=\"width:100%; font-family:'Aria', sans-serif\">";
           		xml += '<tr><td align=\"center\" colspan=\"4\" color=\"#FFFFFF\" background-color=\"#346094\"><b>Dirección y Complementos</b></td></tr>';
           		xml += '<tr><td colspan=\"4\"><b>Dirección: </b>'+defaultaddressField+'</td></tr>';
           		xml += '<tr><td><b>Teléfono celular: </b>'+mobilephoneField+'</td><td><b>Ext: </b>'+custentity325Field+'</td><td><b>Estado civil: </b>'+custentity351Field+'</td><td><b>Género: </b>'+custentity350Field+'</td></tr></table>';
           		xml += '<p></p>';
              	xml += "<table border=\"1\" style=\"width:100%; font-family:'Aria', sans-serif\">";
				xml += '<tr><td align=\"center\" colspan=\"9\" color=\"#FFFFFF\" background-color=\"#346094\"><b>Nivel Académico</b></td></tr>';
              	xml += '<tr><td align=\"right\">'+checado(custentity346Check)+'</td><td><b>Español</b></td><td align=\"right\">'+checado(custentity342Check)+'</td><td><b>Inglés</b></td><td align=\"right\">'+checado(custentity344Check)+'</td><td><b>Portugués</b></td><td align=\"right\">'+checado(custentity345Check)+'</td><td><b>Alemán</b></td><td><b>Educación: </b>'+custentity343Field+'</td></tr></table>';
           		xml += '<p></p>';
				xml += "<table border=\"1\" style=\"width:100%; font-family:'Aria', sans-serif\">";
				xml += '<tr><td align=\"center\" colspan=\"3\" color=\"#FFFFFF\" background-color=\"#346094\"><b>Vacaciones</b></td></tr>';
           		xml += '<tr><td><b>Correspondientes: </b>'+custentity320Field+'</td><td><b>Usados: </b>'+custentity321Field+'</td>';
           		xml += '<td><b>Restantes: </b>'+custentity322Field+'</td></tr>';
           		xml += '<tr><td colspan=\"3\"><b>Comentarios: </b>'+custentity323Field+'</td></tr></table>';
              	xml += '<p></p>';
				xml += "<table border=\"1\" style=\"width:100%; font-family:'Aria', sans-serif\">";
				xml += '<tr><td align=\"center\" colspan=\"7\" color=\"#FFFFFF\" background-color=\"#346094\"><b>Accesorios</b></td></tr>';
              	xml += '<tr><td align=\"right\">'+checado(custentity326Check)+'</td><td><b>Cuenta de correo</b></td><td align=\"right\">'+checado(custentity328Check)+'</td><td><b>Diadema</b></td>';
              	xml += '<td align=\"right\">'+checado(custentity339Check)+'</td><td><b>Uniforme</b></td><td><b>Equipo: </b>'+custentity327Field+'</td></tr></table>';
				xml += '<p></p>';
				xml += "<table border=\"1\" style=\"width:100%; font-family:'Aria', sans-serif\">";
				xml += '<tr><td align=\"center\" colspan=\"3\" color=\"#FFFFFF\" background-color=\"#346094\"><b>Evaluación de Desempeño</b></td></tr>';
              	xml += '<tr style=\"height:100px\"><td align=\"left\"><b>Evaluación:</b><br/>'+custentity340Field+'</td>';
              	xml += '<td align=\"left\"><b>Aspectos a mejorar:</b><br/>'+custentity341Field+'</td><td align=\"left\"><b>Fecha Primera Rev.</b><br/>'+custentity347Field+'</td></tr></table>';
              	xml += '<p></p><p></p>';
                xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p></p>\n";
           		xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
           		xml += '<tr><td align=\"right\">'+valFecha+' <br/> <br/> </td></tr>';
              	xml += '<tr><td align=\"left\"><b>GRUPO KALONI Y EMPRESAS RELACIONADAS,</b> <br/> <br/> </td></tr>';
              	xml += '<tr><td align=\"left\">El (a) suscrito (a) <b><u>'+employeeField+'</u></b>, comisionado en el Centro de Trabajo denominado <b>Kaloni Holding Group S.C.</b>, ';
           		xml += 'en adelante \“LA EMPRESA\” por este medio manifiesto expresamente que me ha sido entregado un usuario y contraseña de Netsuite, la cual está estrictamente prohibido transferir a otras personas ya sea físicas o morales; manifiesto que tengo conocimiento que el usuario y contraseña mencionados me darán acceso a datos sensibles propiedad de la empresa y de terceros (pacientes, proveedores, consultores, médicos, entre otros) los cuales son propiedad única y exclusiva de \“LA EMPRESA\” por lo cual el (a) suscrito (a) se obliga a salvaguardar el estado confidencial de los mismos. <br/> <br/> Manifiesto que tengo pleno conocimiento de la responsabilidad que adquiero desde este momento, toda vez que de violentar, sustraer, utilizar, difundir, modificar y cualquiera otra conducta tendiente a menoscabar el patrimonio informativo y legal de \“LA EMPRESA\”, estaré incurriendo en un delito cuyas sanciones y medidas de seguridad serán impuestas por las Leyes Federales y locales correspondientes de los Estados Unidos Mexicanos además de las establecidas en el ACUERDO PRIVADO DE CONFIDENCIALIDAD Y NO DIVULGACIÓN DE LA INFORMACION firmado entre \“LA EMPRESA\” y el (a) suscrito (a) el día <b><u>'+valFecha+'</u></b>.</td></tr>';
              	xml += '<tr><td align=\"center\"> <br/> <br/> <br/> <br/> <br/> <br/> ____________________________________</td></tr><tr><td align=\"center\"><b>NOMBRE Y FIRMA</b></td></tr></table>';
              	xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
                xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<p></p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td align=\"left\"><b>ACUERDO PRIVADO DE CONFIDENCIALIDAD Y NO DIVULGACIÓN DE INFORMACIÓN QUE CELEBRAN POR UNA PARTE, KALONI HOLDING GROUP, S.C., EN LO SUCESIVO \“EL TITULAR\”, REPRESENTADA EN ESTE ACTO POR, PAOLA ANGÉLICA ORTIZ GARCÍA EN CARÁCTER DE REPRESENTANTE LEGAL, Y POR LA OTRA <u>'+employeeField+'</u> A QUIEN EN LO SUCESIVO SE LE DENOMINARÁ \“EL RECEPTOR\”, AL TENOR DE LAS DECLARACIONES Y CLÁUSULAS SIGUIENTES:</b></td></tr></table>';
              	xml += '<p></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"17px\" align=\"center\"><b>DECLARACIONES</b></p>\n";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><b>I. Declara \“EL TITULAR\” que:</b></td></tr>';
              	xml += '<tr><td><br/>a) Es una sociedad civil debidamente constituida en apego a la legislación civil vigente en los Estados Unidos Mexicanos, lo cual consta en la Escritura Pública No. 57,771 de fecha 27 de abril del 2015, pasada ante la fe del Lic. Mauricio Martínez Rivera Notario Público No. 96 de la Ciudad de México.</td></tr><tr><td><br/>b) Su representante cuenta con la personalidad y capacidad jurídica suficiente para la celebración de este convenio y que dichas facultades no le han sido revocadas, limitadas ni modificadas en forma alguna.</td></tr><tr><td><br/>c) El domicilio que señala es el ubicado en Av. Vasco de Quiroga 3900, Torre B, Piso 4, Santa Fe, Cuajimalpa de Morelos, Ciudad de México C.P. 05348.</td></tr><tr><td><br/>d) Es su voluntad celebrar el presente acto jurídico a fin de garantizar la estricta confidencialidad de toda la información que, bajo los términos y condiciones contenidos en este instrumento, se proporcionará a \“EL RECEPTOR\”.<br/> <br/></td></tr>';
              	xml += '<tr><td><b>II. Declara \“EL RECEPTOR\” que:</b></td></tr>';
              	xml += '<tr><td><br/>a) Es su deseo celebrar el presente convenio con \“EL TITULAR\”, a fin de garantizar la estricta secrecía sobre la totalidad de la información a que tenga acceso o le sea proporcionada por ésta, obligándose en los términos y condiciones contenidos en el presente instrumento jurídico.</td></tr><tr><td><br/>b) El domicilio que señala para todos los efectos legales nacidos a partir de la celebración del presente instrumento jurídico es el ubicado en <u>'+defaultaddressField+'.</u> <br/><b>En atención a las declaraciones expuestas, las partes manifiestan su consentimiento en obligarse de conformidad con las siguientes:</b></td></tr></table>';
              	xml += '<p></p>';
                xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"17px\" align=\"center\"><b>CLÁUSULAS</b></p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><b>PRIMERA.-</b> Definiciones.-. Para todos los efectos legales a que haya lugar, así como para la interpretación del presente convenio, las partes están de acuerdo en que los conceptos utilizados en dicho instrumento jurídico, se entenderán con estricto apego a las siguientes definiciones:</td></tr><tr><td><br/>a) Secreto industrial. Se entenderá como toda información de aplicación industrial o comercial que guarde \“EL TITULAR\” con carácter confidencial, que le signifique obtener o mantener una ventaja competitiva o económica frente a terceros en la realización de actividades económicas y respecto de la cual haya adoptado los medios o sistemas suficientes para preservar su confidencialidad y el acceso restringido a la misma.</td></tr><tr><td><br/>Es así que, para todos los efectos legales derivados del presente instrumento, toda la información perteneciente a \“EL TITULAR\” será considerada como secreto industrial en términos de lo que previene el convenio en comento, así como por lo dispuesto en el Título Tercero de la Ley de la Propiedad Industrial, relativo al secreto industrial.</td></tr><tr><td><br/>b) Información Confidencial. Se entenderá por información aquella proporcionada por \“EL TITULAR\” a \“EL RECEPTOR\” a través de cualquier medio, ya sea de manera escrita, oral, electrónica, gráfica, visual o bien aquella que pueda ser recabada por \“el receptor\” cualquiera de los sentidos del ser humano, o contenida en medios escritos, electrónicos o electromagnéticos, lo que incluye de manera enunciativa más no limitativa, información de naturaleza operativa, médica, (incluyendo información personal y sensible contenida en expedientes clínicos de pacientes), técnica, jurídica, regulatoria, financiera, contable y comercial, al igual que información relativa a nombres de clientes, proveedores o socios actuales y potenciales, propuestas de negocios, reportes, planes, proyecciones de mercado, ideas, datos, conceptos, estudios, resúmenes, equipos, programas, estadísticas, folletos, los protocolos propiedad de \“EL TITULAR\” desarrollados para capacitación, el protocolo para uso e implementación de expediente clínico, protocolo de valoraciones, trasplante capilar y revisiones utilizado en la operación de \“EL TITULAR\”, las guías prácticas de operación para cada una de las funciones comisionadas en el centro de \“EL TITULAR\”, diseño de formatos, arte publicitario, instrumentos, dispositivos, políticas, y cualquier otra información, de cualquier índole, junto con fórmulas, mecanismos, patrones, métodos, técnicas, procesos de análisis, documentos de trabajo, compilaciones, investigaciones, comparaciones, estudios u otros instrumentos preparados que las partes se proporcionen o cualquiera de sus filiales o subsidiarias proporcione a \“EL RECEPTOR\”.</td></tr><tr><td><br/>Esta definición de Información Confidencial aplica para cualquiera que sea la fuente de información, ya sea \“EL TITULAR\” misma, sus clientes, alianzas, socios o cualquier otra entidad que esté vinculada de alguna manera con \“EL TITULAR\”.</td></tr></table>';
              	xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><br/>c) Conducta Ilícita. Se entenderá que \“EL RECEPTOR\” ha incurrido en una conducta ilícita cuando se apodere para sí o revele a cualquier tercero, sin que medie autorización por escrito de \“EL TITULAR\”, cualquier información que sea considerada como secreto industrial o información confidencial, o incurra de conformidad con la definición proporcionada en el presente convenio.</td></tr><tr><td><br/>d) Infracción. Se considerará que \“EL RECEPTOR\” ha incurrido en una infracción cuando cometa o realice cualquier conducta impropia, entendida ésta de acuerdo al concepto dado en la presente cláusula, cuando dicha conducta se ubique dentro de las hipótesis descritas en la cláusula séptima del presente convenio, así como cualesquiera de las establecidas por los artículos 213 al 222 del Capítulo II, Título Séptimo de la Ley de la Propiedad Industrial; así como, por los numerales 229 y 230 del Capítulo I, del Título XII de la Ley Federal de Derechos de Autor y demás normas aplicables.</td></tr><tr><td><br/>e) Delito. Se considerará que \“EL RECEPTOR\” ha incurrido en un delito cuando cometa o realice cualquier conducta ilícita, entendida ésta de acuerdo al concepto dado en la presente cláusula, cuando dicha conducta ilícita se ubique dentro de las hipótesis descritas en la cláusula octava del presente convenio, así como cualesquiera de las establecidas por los artículos 223 al 229 del Capítulo III, Título VII de la Ley de la Propiedad Industrial; así como por el numeral 213, Capítulo II, Título XIII del Código Penal del Distrito Federal y demás normas aplicables.</td></tr><tr><td><br/><b>SEGUNDA.-</b> Objeto.- \“EL RECEPTOR\” se compromete a guardar absoluta confidencialidad respecto de la información a que tenga acceso ya sea de forma oral, gráfica o escrita, con motivo de su prestación de servicios a \“EL TITULAR\”, relación de negocios, profesional, o cualquier actividad que cumpla en relación con \“EL TITULAR\” absteniéndose de revelarla sin que medie autorización por escrito de la misma.</td></tr><tr><td><br/>Queda expresamente entendido por \“EL RECEPTOR\” que la información confidencial a la que tenga acceso con autorización de \“EL TITULAR\” es propiedad exclusiva de la misma, ello con absoluta independencia de la vigencia del presente acuerdo de voluntades, de igual manera se considerará que toda aquella información generada por \“EL RECEPTOR\” con motivo de su relación de negocios o cualesquiera actividad que cumpla dentro de \“EL TITULAR\” será asimismo considerada propiedad exclusiva de ésta, por lo que este instrumento no otorga, de manera expresa o implícita, derecho intelectual o de propiedad industrial alguno, incluyendo, más no limitando, licencias de uso respecto de la información confidencial a favor de \“EL RECEPTOR\”.</td></tr><tr><td><br/><b>TERCERA.-</b> Confidencialidad.- \“EL RECEPTOR\” no podrá apoderarse para sí o revelar, en ningún momento y bajo ninguna modalidad, información de \“EL TITULAR\”, excepto cuando sea expresamente autorizado por escrito por éste. \“EL RECEPTOR\” que reciba la información será directamente responsable por las violaciones al secreto industrial o bien de secrecía de información</td></tr></table>';
              	xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
				xml += "<tr><td><br/>personal y /o sensible en las que incurra, con relación a la obligación de confidencialidad objeto del presente convenio.</td></tr><tr><td><br/>Asimismo, \“EL RECEPTOR\” no podrá utilizar la información de \“EL TITULAR\” con fines distintos a los estrictamente autorizados por \“EL TITULAR\” por escrito, así como a lo dispuesto en el presente instrumento sin la previa autorización del personal que cuente con los privilegios necesarios para otorgar dicha autorización por escrito.</td></tr><tr><td><br/><b>CUARTA.-</b> Requerimiento de autoridad judicial para revelar información.- \“EL RECEPTOR\” no podrá revelar información confidencial a ningún tercero sin el consentimiento previo y por escrito de \“EL TITULAR\”, salvo cuando medie orden judicial debidamente fundada y motivada dictada por la autoridad competente en que se requiera la entrega de información confidencial, en cuyo caso, \“EL RECEPTOR\” deberá, antes de proceder a revelar o entregar la misma, informar de manera inmediata a \“EL TITULAR\” de la existencia y pormenores de tal requerimiento, de tal suerte que ésta cuente con la posibilidad de hacer valer sus derechos ante las autoridades competentes.</td></tr><tr><td><br/><b>QUINTA.-</b> Devolución de la información.- \“EL RECEPTOR\” se encuentra obligado en los términos del presente convenio a entregar a \“EL TITULAR\”, una vez terminada la relación de cualquier naturaleza que ésta sea, toda la información que le haya sido proporcionada de manera escrita o en algún soporte físico o electrónico, para el desempeño de su función, de no ser así se entenderá que \“EL RECEPTOR\” incurre en una conducta ilícita, de conformidad a la definición contenida en la cláusula primera del presente convenio.</td></tr><tr><td><br/><b>SEXTA.-</b> De las infracciones.- Incurre en infracción \“EL RECEPTOR\” cuando su conducta, independientemente de las señaladas por las normas aplicables a cada caso, se ubique en cualquiera de las hipótesis que se enlistan a continuación:</td></tr><tr><td><br/>a) Use, sin consentimiento manifestado por escrito de \“EL TITULAR\”, una marca registrada o semejante en grado de confusión como elemento de un nombre comercial o de una denominación o razón social, o viceversa, siempre que dichos nombres, denominaciones o razones sociales estén relacionados con establecimientos que operen con los productos o servicios protegidos por la marca de \“EL TITULAR\”;</td></tr><tr><td><br/>b) Utilice una marca previamente registrada por \“EL TITULAR\” o semejante a ésta en grado de confusión como nombre comercial, denominación o razón social o como partes de éstos, para otra persona física o moral cuya actividad principal sea igual o similar a los que se aplican a la marca registrada de \“EL TITULAR\”, sin su consentimiento, debiendo ser éste último manifestado por escrito;</td></tr></table>";
              	xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><br/>c) Intente o logre el propósito de desprestigiar los productos, los servicios, la actividad industrial o comercial o el establecimiento de \“EL TITULAR\”.</td></tr><tr><td><br/>d) Ofrezca en venta o ponga en circulación productos que sean resultado de la utilización de procesos de \“EL TITULAR\”;</td></tr><tr><td><br/>e) Utilice un aviso comercial registrado o uno semejante en grado de confusión, sin el consentimiento de \“EL TITULAR\”, para anunciar bienes, servicios o establecimientos iguales o similares a los que se aplique el aviso;</td></tr><tr><td><br/>f) Utilice el nombre comercial de \“EL TITULAR\” o uno semejante en grado de confusión, sin la autorización respectiva de ésta, para amparar un establecimiento industrial, comercial o de servicios del mismo o similar giro al de \“EL TITULAR\”;</td></tr><tr><td><br/>g) Utilice una marca registrada de \“EL TITULAR\” en productos o servicios iguales o similares a los que la marca se aplique;</td></tr><tr><td><br/>h) Ofrezca en venta o ponga en circulación productos o servicios iguales o similares a los que se aplique una marca registrada de \“EL TITULAR\”, sin consentimiento de ésta;</td></tr><tr><td><br/>i) Ofrezca en venta o ponga en circulación productos o servicios como los que \“EL TITULAR\” ofrezca bajo su marca registrada;</td></tr><tr><td><br/>j) Ofrezca en venta, renta, arrendamiento o ponga en circulación productos a los que se aplique una marca registrada de \“EL TITULAR\”, después de haber alterado, sustituido o suprimido parcial o totalmente ésta;</td></tr><tr><td><br/>k) Utilice la combinación de signos distintivos, nombre comercial, elementos operativos y de imagen, que permitan identificar productos o servicios iguales o similares en grado de confusión a los de \“EL TITULAR\” y que por su uso causen o induzcan al público a confusión, error o engaño, por hacer creer o suponer la existencia de una relación entre \“EL TITULAR\” y un usuario no autorizado;</td></tr><tr><td><br/>l) Comunique o utilice públicamente una obra o información de \“EL TITULAR\” por cualquier medio, y de cualquier forma, sin la autorización previa y por escrito de ésta;</td></tr><tr><td><br/>m) Utilice la imagen de \“EL TITULAR\” sin su autorización;</td></tr></table>';
                xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><br/>n) Produzca, reproduzca, almacene, distribuya, transporte o comercialice copias de obras protegidas por los derechos de autor o por los derechos conexos, sin la autorización de \“EL TITULAR\”, titular de dichos derechos;</td></tr><tr><td><br/>o) Ofrezca en venta, almacene, transporte o ponga en circulación obras o información de \“EL TITULAR\” que hayan sido deformadas, modificadas o mutiladas sin su autorización;</td></tr><tr><td><br/>p) Importe, venda, arriende o realice cualquier acto que permita tener un dispositivo o sistema cuya finalidad sea desactivar los dispositivos electrónicos de protección de los programas de computación o software de \“EL TITULAR\”;</td></tr><tr><td><br/>q) Use, reproduzca o explote los programas de cómputo o software de \“EL TITULAR\”, sin que medie su consentimiento por escrito;</td></tr><tr><td><br/>r) Y demás infracciones establecidas por las leyes aplicables, siempre que no constituyan delitos.</td></tr><tr><td><br/><b>SÉPTIMA.-</b> Incumplimiento. Serán consideradas como incumplimiento las siguientes acciones:</td></tr><tr><td><br/>Inducir a cualquier proveedor y /o cliente de la empresa para que cancele o reduzca sus negocios con \“EL TITULAR\” y sus empresas relacionadas.</td></tr></table>';
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td align=\"right\" width=\"30%\"><br/>1. </td><td width=\"70%\"><br/>Atraer para sí o para beneficio de cualquier persona física o moral distinta a la de \“EL TITULAR\”, negocios de proveedor y/o cliente (el término proveedor significará cualquier persona física o moral que provea productos o servicios a \“EL TITULAR\” ya sea a cambio de dinero o permuta y, cliente significará cualquier persona física o moral que adquiera o haya adquirido servicios de \“EL TITULAR\”).</td></tr><tr><td align=\"right\" width=\"30%\"><br/>2. </td><td width=\"70%\"><br/>Inducir a cualquier empleado de \“EL TITULAR\”, ya sea contratado directamente por éste o comisionado a través de un tercero y/o cualquiera de sus empresas afiliadas, asociadas, subsidiarias o accionistas para que deje de trabajar para \“EL TITULAR\” y/o cualquiera de sus empresas afiliadas, asociadas, subsidiarias o accionistas.</td></tr><tr><td align=\"right\" width=\"30%\"><br/>3. </td><td width=\"70%\"><br/>Ocultar cualquier perjuicio en los intereses de la empresa receptora del servicio cuando de manera directa o indirecta pueda \“EL RECEPTOR\” tener conocimiento de ello, teniendo la obligación de informar inmediatamente a \“EL TITULAR\” señalando a las personas involucradas en dicha situación ya sean beneficiadas o no con dicha conducta.</td></tr></table>';
                xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td align=\"right\" width=\"30%\"><br/>4. </td><td width=\"70%\"><br/>Lesionar de manera personal y dolosa los intereses de \“EL TITULAR\” o de sus empresas relacionadas por negligencia u omisión.</td></tr><tr><td align=\"right\" width=\"30%\"><br/>5. </td><td width=\"70%\"><br/>Solicitar o aceptar dádivas en su favor o de terceras personas, ofrecidas por acciones u omisiones relacionadas con el desempeño de sus actividades.</td></tr><tr><td align=\"right\" width=\"30%\"><br/>6. </td><td width=\"70%\"><br/>Contactar posibles clientes, fuera de las actividades estrictamente derivadas de su relación con \“EL TITULAR\” durante los próximos 5 (cinco) años posteriores a la finalización de su relación con \“EL TITULAR\”.</td></tr></table>';
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><br/><b>OCTAVA.-</b> De los delitos.- Se entenderá que \“EL RECEPTOR\” ha incurrido en un delito cuando su conducta lo coloque a sí mismo en cualesquiera de las hipótesis enumeradas por el artículo 223 de la Ley de la Propiedad Industrial o en la descrita por el artículo 213 del Código Penal del Distrito Federal, así como en cualquiera de las que se enlistan a continuación:</td></tr><tr><td><br/>a) Copie o reproduzca total o parcialmente software, código fuente o información de una base de datos de \“EL TITULAR\” así como de la documentación contable y/o fiscal o de cualquiera de sus clientes, alianzas o entidades con quien \“EL TITULAR\” tuviera relación, con intereses de beneficio personal o de terceros distintos a \“EL TITULAR\”</td></tr><tr><td><br/>b) Falsifique, en forma dolosa y con fin de especulación comercial, marcas protegidas de \“EL TITULAR\”;</td></tr><tr><td><br/>c) Produzca, almacene, transporte, introduzca al país, distribuya o venda, en forma dolosa y con fin de especulación comercial, objetos que ostenten falsificaciones de marcas protegidas de \“EL TITULAR\”, así como aporte o provea de cualquier forma, a sabiendas, materias primas o insumos destinados a la producción de objetos que ostenten falsificaciones de marcas protegidas de \“EL TITULAR\”;</td></tr><tr><td><br/>d) Revele a un tercero un secreto industrial o información confidencial, personal y/o sensible contenida en expedientes médicos, que se conozca con motivo de su prestación de servicios, relación de negocios, sin consentimiento manifestado por escrito de \“EL TITULAR\”, habiendo sido prevenido de su confidencialidad, con el propósito de obtener un beneficio económico para sí o para el tercero o con el fin de causar un perjuicio a \“EL TITULAR\” o cualquier otro;</td></tr><tr><td><br/>e) Se apodere de un secreto industrial o información confidencial, personal y/o sensible contenida en expedientes médicos sin derecho y sin consentimiento de \“EL TITULAR\” para usarlo o revelarlo a un tercero, con el propósito de obtener un beneficio económico para sí o para el tercero o con el fin</td></tr></table>';
                xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><br/>de causar un perjuicio a ésta, y</td></tr>';
              	xml += '<tr><td><br/>f) Use o revele cualquier información de \“EL TITULAR\”, de alguno de los clientes, alianzas o socios de ésta, a la cual haya tenido acceso o le haya sido proporcionada por \“EL TITULAR\” con motivo de su relación de negocios, sin consentimiento manifestado por escrito de \“EL TITULAR\”, o que le haya sido revelado por uno de estos terceros antes mencionados, con el propósito de obtener un beneficio económico propio o de un tercero y/o causar un perjuicio de cualquier índole a \“EL TITULAR\”.</td></tr><tr><td><br/><b>NOVENA.-</b> De las sanciones.- Las infracciones enlistadas en la cláusula sexta serán sancionadas bajo los términos de lo señalado en el artículo 214 de la Ley de la Propiedad Industrial y de acuerdo con lo siguiente:</td></tr><tr><td><br/>a) Multa hasta por el importe de veinte mil días de salario mínimo general vigente en el Distrito Federal;</td></tr><tr><td><br/>b) Multa adicional hasta por el importe de quinientos días de salario mínimo general vigente en el Distrito Federal, por cada día que persista la infracción, y</td></tr><tr><td><br/>c) Arresto administrativo hasta por 36 horas.</td></tr><tr><td><br/>Asimismo, las sanciones descritas anteriormente que correspondan a la comisión de una conducta que constituya una infracción regulada tanto por la Ley Federal de Derechos de Autor, como por la Ley de la Propiedad Industrial o cualquiera de las enlistadas en la cláusula sexta del presente instrumento jurídico, serán impuestas por el Instituto Mexicano de la Propiedad Industrial, quién es la autoridad competente de conformidad con la legislación aplicable, por lo que bastará con que \“EL TITULAR\” formule la denuncia correspondiente ante dicho Instituto.</td></tr><tr><td><br/>Cabe señalar que de conformidad con el artículo 218 de la Ley de la Propiedad Industrial, para los casos de reincidencia se duplicarán las multas señaladas, para tal efecto se entenderá por reincidencia, cada una de las subsecuentes infracciones que cometa \“EL RECEPTOR\” a un mismo precepto.</td></tr><tr><td><br/>Por otra parte, \“EL RECEPTOR\” se da por enterado de que de incurrir en cualquiera de las conductas previstas en la cláusula séptima, se hará acreedor a la respectiva sanción penal, bajo los términos de lo señalado en los artículos 224 de la Ley de la Propiedad Industrial y 213 del Código Penal para el Distrito Federal, de conformidad con los cuales se impondrán de dos a seis años de</td></tr></table>';
              	xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += '<tr><td><br/>prisión y multa por el importe de cien a diez mil días de salario mínimo general vigente en el Distrito Federal, a \“EL RECEPTOR\” que cometa alguno de los delitos que se señalan en los incisos a), d), e) y f) de la referida cláusula séptima. De la misma manera, para el caso de los delitos previstos en los incisos b) o c) de la cláusula aludida, se impondrán de tres a diez años de prisión y multa de dos mil a veinte mil días de salario mínimo general vigente en el Distrito Federal.</td></tr><tr><td><br/><b>DÉCIMA.-</b> Cláusula convencional.- Las partes acuerdan que en caso de incumplimiento a las obligaciones derivadas del presente acuerdo, \“EL RECEPTOR\” estará obligado a realizar el pago de una pena convencional de $4,000,000.00 MXN (cuatro millones de pesos mexicanos), independientemente de las sanciones administrativas y penales a que se haga acreedor por la comisión de cualesquiera de las infracciones o delitos señalados por la legislación aplicable.</td></tr><tr><td><br/><b>DÉCIMA PRIMERA.-</b> Legislación Aplicable y Solución de Controversias.- Las partes manifiestan que en caso de surgir alguna controversia relacionada con la celebración, cumplimiento, interpretación o alcance legal del presente convenio, tratarán de resolverla de común acuerdo, y que en caso de no conseguirlo se someterán a la jurisdicción de las leyes y tribunales de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios presentes o futuros o por cualquier otra causa.</td></tr><tr><td><br/><b>DÉCIMA SEGUNDA.-</b> Vigencia.- El presente convenio surtirá efectos a partir de la fecha de firma del mismo y tendrá una vigencia de dos (2) años. Las obligaciones de confidencialidad y no uso seguirán vigentes después de dicha terminación o expiración y continuarán vigentes durante un período de cinco (5) años después de finalizada la relación entre las partes. En caso de que \“EL TITULAR\” lo solicite, \“EL RECEPTOR\” tendrá la obligación de destruir todas las copias en papel de la Información confidencial.</td></tr><tr><td><br/><b>Enteradas las partes del contenido y alcance legal del presente convenio, lo firman de conformidad frente a dos testigos en la Ciudad de México el día <u>'+valFecha+'</u>.</b></td></tr></table>';
              	xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
              	xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10px\">Kaloni Holding Group S.C. <br/>Acuerdo Privado de Confidencialidad y No Divulgación de Información</p>";
              	xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
              	xml += "<tr><td align=\"center\"><br/><b>\“EL TITULAR\”</b></td><td align=\"center\"><br/><b>\“EL RECEPTOR\”</b></td></tr>";
              	xml += "<tr><td align=\"center\"><b>Kaloni Holding Group, S.C.</b></td><td align=\"center\"></td></tr>";
              	xml += "<tr><td align=\"center\" colspan=\"2\"> <br/> <br/> <br/> <br/> </td></tr>";
              	xml += "<tr><td align=\"center\">__________________________</td><td align=\"center\">__________________________</td></tr>";
              	xml += '<tr><td align=\"center\"><b>Paola Angélica Ortiz García</b></td><td align=\"center\"><b>'+employeeField+'</b></td></tr>';
              	xml += "<tr><td align=\"center\"><b>Representante Legal</b></td><td align=\"center\"></td></tr>";
              	xml += "<tr><td align=\"center\" colspan=\"2\"> <br/> <br/> <br/> <br/> <br/> </td></tr>";
              	xml += "<tr><td align=\"center\">__________________________</td><td align=\"center\">__________________________</td></tr>";
              	xml += '<tr><td align=\"center\"><b>Testigo</b></td><td align=\"center\"><b>Testigo</b></td></tr></table>';
              	xml += '</body>\n</pdf>';
                var fileXMLtoPDF = nlapiXMLToPDF(xml);
                fileXMLtoPDF.setFolder(folderId);
                var fileId = nlapiSubmitFile(fileXMLtoPDF);
				var fileName = employeeField + '.pdf'

              	var filePDF = nlapiLoadFile(fileId);
                var dataCopyOld = filePDF.getValue();
                //var nameCopyOld = filePDF.getName();
                var folderIdCopyOld = filePDF.getFolder();
                var fileTypeCopyOld = filePDF.getType();
                nlapiDeleteFile(fileId);//delete the older file

                var newFile = nlapiCreateFile(fileName, fileTypeCopyOld, dataCopyOld);//create a new file with the same details
                newFile.setFolder(folderIdCopyOld);
                var newfileId = nlapiSubmitFile(newFile);//submit it

                var newfilePDF = nlapiLoadFile(newfileId);
    		    var urlFile = newfilePDF.getURL();
				empRecord.setFieldValue('custentity324', urlFile);
              	empRecord.setFieldValue('custentity335', 'ok_' + folderId + '_' + newfileId);
      		 	nlapiLogExecution('DEBUG', 'function crearPDF() ', 'Value FOLDER STATUS: ok_' + folderId + '_' + newfileId);
              	nlapiSubmitRecord(empRecord, false, true);
                nlapiLogExecution('DEBUG', 'function crearPDF() ', 'Submitted the Employee now redirecting...');
                nlapiSetRedirectURL('RECORD', 'employee', valid, false);
              	return true;
              }
      }
    }
  	catch(error)
    {
      var msgError = error;
      nlapiLogExecution('ERROR', 'Error al crear PDF empleado', msgError);
      return false;
    }
}


	// *********************************************************************************************************
function changePOType(request, response)
{
  try
  {
	var id = request.getParameter('poid');
  	nlapiLogExecution('DEBUG', 'createFolder: ', 'Value request id parameter: ' + id);
	var empleRecord = nlapiLoadRecord('employee', id);

	var water = "https://system.na2.netsuite.com/core/media/media.nl?id=1167583&c=3559763&h=2826b41c8dcf7c5e80e0";
  	var logo = "https://system.na2.netsuite.com/core/media/media.nl?id=1586838&c=3559763&h=c9885abe8bc213e27887";
	var noImage = "https://system.na2.netsuite.com/core/media/media.nl?id=1592235&c=3559763&h=d43773cd215449144eab";

  	// PDF EMPLEADO
  	var custentity335Field = empleRecord.getFieldValue('custentity335'); // EXPEDIENTE EMPLEADO
  	if(custentity335Field !== null && custentity335Field != '')
    {
      var fields = custentity335Field.split('_');
      var valok = fields[0];
      var fol = fields[1];
	  var docEmpleado = fields[2];
      nlapiDeleteFile(docEmpleado);//delete the older file

      var result = actualizarPDFEmpleado(id, fol, water, logo, noImage);
      if(result === true)
      nlapiLogExecution('AUDIT', 'function actualizarPDFEmpleado(): ', 'Expediente actualizado correctamente!! Employee record id: ' + id);
      else
      nlapiLogExecution('ERROR', ' function actualizarPDFEmpleado(): ', 'Expediente no actualizado!! Employee record id: ' + id);
    }
  	else
    {
      var result = crearPDFEmpleado(id, water, logo, noImage);
      if(result === true)
      nlapiLogExecution('AUDIT', 'function crearPDFEmpleado(): ', 'Expediente creado correctamente!! Employee record id: ' + id);
      else
      nlapiLogExecution('ERROR', ' function crearPDFEmpleado(): ', 'Expediente no creado!! Employee record id: ' + id);
    }

    /* PDF CARTA RESPONSIVA
  	var custentity348Field = empleRecord.getFieldValue('custentity348'); // CARTA RESPONSIVA
  	if(custentity348Field !== null && custentity348Field != '')
    {
      var fields = custentity348Field.split('_');
      var valok = fields[0];
      var fol = fields[1];
	  var docEmpleado = fields[2];
      nlapiDeleteFile(docEmpleado);//delete the older file

      var result = actualizarCartaResp(id, fol, water, logo, noImage);
      if(result === true)
      nlapiLogExecution('AUDIT', 'function actualizarCartaResp(): ', 'Carta actualizada correctamente!! Employee record id: ' + id);
      else
      nlapiLogExecution('ERROR', ' function actualizarCartaResp(): ', 'Carta no actualizada!! Employee record id: ' + id);
    }
  	else
    {
      var result = crearCartaResp(id, water, logo, noImage);
      if(result === true)
      nlapiLogExecution('AUDIT', 'function crearCartaResp(): ', 'Carta creada correctamente!! Employee record id: ' + id);
      else
      nlapiLogExecution('ERROR', ' function crearCartaResp(): ', 'Carta no creada!! Employee record id: ' + id);
    }*/

  }
  catch(err)
  {
    var msgError = err;
	nlapiLogExecution('ERROR', 'Error changePOType function', msgError);
  }
}

/*
function crearCartaResp(valid, water, logo, noImage){
  	try
    {
	var empRecord = nlapiLoadRecord('employee', valid);
	var employeeField = empRecord.getFieldValue('entityid');
    var pais = empRecord.getFieldText('subsidiary');
    var folderEmp = empRecord.getFieldValue('custentity335');

    var valok_split = '';
    var fol_split = '';
	var docEmpleado_split = '';

    var folder = '';
    var folderId = '';

    if(folderEmp !== '' && folderEmp !== null)
    {
      var fields = folderEmp.split('_');
      valok_split = fields[0];
      fol_split = fields[1];
	  docEmpleado_split = fields[2];
    }
    else
    {
      folder = nlapiCreateRecord('folder');
      	if (folder && employeeField !== '' && pais !== ''){
          	 var resultFolPar = getFolderPar(pais);
             folder.setFieldValue('parent', resultFolPar); // create root level folder
             folder.setFieldValue('name', employeeField);
             folderId = nlapiSubmitRecord(folder);
        }
    }

      var valFecha = getFecha();
        	// create file
              	var xml = '<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n<pdf>\n<body background-image=\"'+nlapiEscapeXML(water)+'\" >\n'; // font-size=\"12\"
              	xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p></p>\n";
           		xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
           		xml += '<tr><td align=\"right\">'+valFecha+' <br/> <br/> </td></tr>';
              	xml += '<tr><td align=\"left\"><b>GRUPO KALONI Y EMPRESAS RELACIONADAS,</b> <br/> <br/> </td></tr>';
              	xml += '<tr><td align=\"left\">El (a) suscrito (a) <b>'+employeeField+'</b>, comisionado en el Centro de Trabajo denominado <b>Kaloni Holding Group S.C.</b>, ';
           		xml += 'en adelante \“LA EMPRESA\” por este medio manifiesto expresamente que me ha sido entregado un usuario y contraseña de Netsuite, la cual está estrictamente prohibido transferir a otras personas ya sea físicas o morales; manifiesto que tengo conocimiento que el usuario y contraseña mencionados me darán acceso a datos sensibles propiedad de la empresa y de terceros (pacientes, proveedores, consultores, médicos, entre otros) los cuales son propiedad única y exclusiva de \“LA EMPRESA\” por lo cual el (a) suscrito (a) se obliga a salvaguardar el estado confidencial de los mismos. <br/> <br/> Manifiesto que tengo pleno conocimiento de la responsabilidad que adquiero desde este momento, toda vez que de violentar, sustraer, utilizar, difundir, modificar y cualquiera otra conducta tendiente a menoscabar el patrimonio informativo y legal de \“LA EMPRESA\”, estaré incurriendo en un delito cuyas sanciones y medidas de seguridad serán impuestas por las Leyes Federales y locales correspondientes de los Estados Unidos Mexicanos además de las establecidas en el ACUERDO PRIVADO DE CONFIDENCIALIDAD Y NO DIVULGACIÓN DE LA INFORMACION firmado entre \“LA EMPRESA\” y el (a) suscrito (a) el día <b>'+valFecha+'</b>.</td></tr>';
              	xml += '<tr><td align=\"center\"> <br/> <br/> <br/> <br/> <br/> <br/> ____________________________________</td></tr><tr><td align=\"center\"><b>NOMBRE Y FIRMA</b></td></tr></table>';
              	xml += '</body>\n</pdf>';
                var fileXMLtoPDF = nlapiXMLToPDF(xml);
      			if(folderEmp !== '')
                	fileXMLtoPDF.setFolder(fol_split);
      			else
                  	fileXMLtoPDF.setFolder(folderId);
                var fileId = nlapiSubmitFile(fileXMLtoPDF);
				var fileName = 'Carta Responsiva ' + employeeField + '.pdf'

              	var filePDF = nlapiLoadFile(fileId);
                var dataCopyOld = filePDF.getValue();
                //var nameCopyOld = filePDF.getName();
                var folderIdCopyOld = filePDF.getFolder();
                var fileTypeCopyOld = filePDF.getType();
                nlapiDeleteFile(fileId);//delete the older file

                var newFile = nlapiCreateFile(fileName, fileTypeCopyOld, dataCopyOld);//create a new file with the same details
                newFile.setFolder(folderIdCopyOld);
                var newfileId = nlapiSubmitFile(newFile);//submit it

                var newfilePDF = nlapiLoadFile(newfileId);
    		    //var urlFile = newfilePDF.getURL();
				//empRecord.setFieldValue('custentity324', urlFile);
              	empRecord.setFieldValue('custentity348', 'ok_' + folderIdCopyOld + '_' + newfileId);
      		 	nlapiLogExecution('AUDIT', 'function crearCartaResp() ', 'Value FOLDER STATUS: ok_' + folderIdCopyOld + '_' + newfileId);
              	nlapiSubmitRecord(empRecord, false, true);
                nlapiLogExecution('AUDIT', 'function crearCartaResp() ', 'Submitted the Employee now redirecting...');
                nlapiSetRedirectURL('RECORD', 'employee', valid, false);
              	return true;
    }
  	catch(error)
    {
      var msgError = error;
      nlapiLogExecution('ERROR', 'Error al crear carta responsiva PDF empleado', msgError);
      return false;
    }
}

function actualizarCartaResp(valid, valfol, water, logo, noImage){
  try
  {
    nlapiLogExecution('AUDIT', 'function actualizarCartaResp() valid, valfol', 'valid: '+valid+', '+'valfol: '+valfol+', ');
    var empRecord = nlapiLoadRecord('employee', valid);
	var employeeField = empRecord.getFieldValue('entityid');
	var valFecha = getFecha();

  	      // create file
            if (valfol != null && valfol !== '') {
              	var xml = '<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n<pdf>\n<body background-image=\"'+nlapiEscapeXML(water)+'\" >\n'; // font-size=\"12\"
              	xml += '<p align=\"left\"><img src=\"'+nlapiEscapeXML(logo)+'\" width=\"150\" height=\"50\"></img></p>';
              	xml += "<p></p>\n";
           		xml += "<table border=\"0\" style=\"width:100%; font-family:'Aria', sans-serif\">";
           		xml += '<tr><td align=\"right\">'+valFecha+' <br/> <br/> </td></tr>';
              	xml += '<tr><td align=\"left\"><b>GRUPO KALONI Y EMPRESAS RELACIONADAS,</b> <br/> <br/> </td></tr>';
              	xml += '<tr><td align=\"left\">El (a) suscrito (a) <b>'+employeeField+'</b>, comisionado en el Centro de Trabajo denominado <b>Kaloni Holding Group S.C.</b>, ';
           		xml += 'en adelante \“LA EMPRESA\” por este medio manifiesto expresamente que me ha sido entregado un usuario y contraseña de Netsuite, la cual está estrictamente prohibido transferir a otras personas ya sea físicas o morales; manifiesto que tengo conocimiento que el usuario y contraseña mencionados me darán acceso a datos sensibles propiedad de la empresa y de terceros (pacientes, proveedores, consultores, médicos, entre otros) los cuales son propiedad única y exclusiva de \“LA EMPRESA\” por lo cual el (a) suscrito (a) se obliga a salvaguardar el estado confidencial de los mismos. <br/> <br/> Manifiesto que tengo pleno conocimiento de la responsabilidad que adquiero desde este momento, toda vez que de violentar, sustraer, utilizar, difundir, modificar y cualquiera otra conducta tendiente a menoscabar el patrimonio informativo y legal de \“LA EMPRESA\”, estaré incurriendo en un delito cuyas sanciones y medidas de seguridad serán impuestas por las Leyes Federales y locales correspondientes de los Estados Unidos Mexicanos además de las establecidas en el ACUERDO PRIVADO DE CONFIDENCIALIDAD Y NO DIVULGACIÓN DE LA INFORMACION firmado entre \“LA EMPRESA\” y el (a) suscrito (a) el día <b>'+valFecha+'</b>.</td></tr>';
              	xml += '<tr><td align=\"center\"> <br/> <br/> <br/> <br/> <br/> <br/> ____________________________________</td></tr><tr><td align=\"center\"><b>NOMBRE Y FIRMA</b></td></tr></table>';
              	xml += '</body>\n</pdf>';
                var fileXMLtoPDF = nlapiXMLToPDF(xml);
                fileXMLtoPDF.setFolder(valfol);
                var fileId = nlapiSubmitFile(fileXMLtoPDF);
				var fileName = 'Carta Responsiva ' + employeeField + '.pdf';

              	var filePDF = nlapiLoadFile(fileId);
                var dataCopyOld = filePDF.getValue();
                //var nameCopyOld = filePDF.getName();
                var folderIdCopyOld = filePDF.getFolder();
                var fileTypeCopyOld = filePDF.getType();
                nlapiDeleteFile(fileId);//delete the older file

                var newFile = nlapiCreateFile(fileName, fileTypeCopyOld, dataCopyOld);//create a new file with the same details
                newFile.setFolder(folderIdCopyOld);
                var newfileId = nlapiSubmitFile(newFile);//submit it

                var newfilePDF = nlapiLoadFile(newfileId);
    		    //var urlFile = newfilePDF.getURL();
				//empRecord.setFieldValue('custentity324', urlFile);
              	empRecord.setFieldValue('custentity348', 'ok_' + valfol + '_' + newfileId);
      		 	nlapiLogExecution('AUDIT', 'function actualizarCartaResp() ', 'Value CARTA RESPONSIVA: ok_' + valfol + '_' + newfileId);
              	nlapiSubmitRecord(empRecord, false, true);
                nlapiLogExecution('AUDIT', 'function actualizarCartaResp() ', 'Submitted the Employee now redirecting...');
                nlapiSetRedirectURL('RECORD', 'employee', valid, false);
              	return true;
              }
  		}
     	catch(error)
        {
          var msgError = error;
          nlapiLogExecution('ERROR', 'Error al actualizarCartaResp PDF', msgError);
          return false;
        }
}*/

	// *********************************************************************************************************
function getFolderPar(val){
  		 var folderParent = '';
         if(val === 'Mexico')
           folderParent = '1131962';
         if(val === 'Colombia')
           folderParent = '1131965';
         if(val === 'España')
           folderParent = '1131964';
         if(val === 'Brasil')
           folderParent = '1131963';
         if(val === 'Republica Dominicana')
           folderParent = '1131966';
         if(val === 'Hair Clinical Professional S.C.')
           folderParent = '1138802';
         if(val === 'Dr. Matiasek - Vienna')
           folderParent = '1138803';
         if(val === 'Juvenesse Clinic Professional S.C.')
           folderParent = '1138804';
         if(val === 'Kaloni USA')
           folderParent = '1138827';
         if(val === 'Kaloni USA No Usar.')
           folderParent = '1138829';
  return folderParent;
}

  function checado(checks) {
var check ="";
 if (checks == "T"){
     var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
     check ="<img height=\"15px\" width=\"15px\" src=\""+nlapiEscapeXML(path)+"\">probando</img>";
   }
  else {
    if(checks == "F") {
       var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
       check ="<img height=\"15px\" width=\"15px\" src=\""+nlapiEscapeXML(path2)+"\"/>";
       }else {
         if(checks == null){
           var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
           check ="<img height=\"15px\" width=\"15px\" src=\""+nlapiEscapeXML(path2)+"\"/>";
         }else{
           var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
           check ="<img height=\"15px\" width=\"15px\" src=\""+nlapiEscapeXML(path2)+"\"/>";
         }
       }
    }
   return check;
}

function getFecha(){
  var valFecha = '';
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    var f=new Date();
    valFecha = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
  return valFecha;
}