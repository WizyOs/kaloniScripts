/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/record', 'N/log', 'N/render', 'N/xml'],

  function (record, log, render, xmlMod) {

    function onRequest(context) {
      //log.debug('method: ', context.request.method);
      var recId = context.request.parameters.recordCaseId;
      var caso = record.load({ type: 'supportcase', id: recId });

      var companyId = caso.getValue({ fieldId: 'company' });
      var cliente = record.load({ type: 'customer', id: companyId }); // , isDynamic: true
      var numExpediente = cliente.getValue({ fieldId: 'entityid' });
      var altname = cliente.getValue({ fieldId: 'altname' });
      var sucursal = cliente.getValue({ fieldId: 'custentity25' });
      var sucursalText = cliente.getText({ fieldId: 'custentity25' });
      var subsidiaryText = cliente.getText({ fieldId: 'subsidiary' });
      var imageBack = getImageBackGround(sucursal);
      var sucReal = sucursalReal(sucursalText);


      var avisoPrivacidadbase64 = caso.getValue({ fieldId: 'custevent516' });
      if (avisoPrivacidadbase64 != "" && avisoPrivacidadbase64 != null) {
        if (avisoPrivacidadbase64.substring(0, 3) == "ok_")
          avisoPrivacidadbase64 = avisoPrivacidadbase64.substring(3, avisoPrivacidadbase64.length);
      }
      else {
        avisoPrivacidadbase64 = "#";
      }
      //caso.save();
      var fecha = new Date();
      fecha = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();

      var avisoMexico = '<p style="width:70%;color:#000000;font-family:Aria, sans-serif;align:center"><b>FORMULARIO DE EXCLUSIÓN DE FOTOGRAFÍA PARA EXPEDIENTE CLÍNICO ELECTRÓNICO</b></p>' +
        '<br/><p style="font-family:Aria, sans-serif; font-size:12px;">El expediente clínico electrónico es una fuente de información que amplía el dictamen médico experto, conformándose por una descripción médica aunado a documentos, imágenes, procedimientos, pruebas diversas, análisis e información de estudios practicados al paciente.</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;">Comprendo que el expediente clínico electrónico de manera integral, representa una base para conocer las condiciones de salud, los actos médicos, los diferentes procedimientos ejecutados por el equipo médico así como los resultados y progreso de mi tratamiento.</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;">Por tal motivo, entiendo que al denegar el permiso de toma de fotografías para integrar dicho expediente, los médicos no contarán con referencias gráficas para documentar el seguimiento completo de mi tratamiento.</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;">(Solo firme si rechaza el permiso)</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;">No otorgo autorización para la toma de fotografías y/o videos durante mi proceso de tratamiento en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p>' +

        '<p style="font-family:Aria, sans-serif; font-size: 12px;">Firmo la presente, en <b>' + sucReal + ' a ' + fecha + ' </b></p><br/>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;">Atentamente,</p>';


      var avisoColombia = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>AVISO DE PRIVACIDAD</b></p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">De conformidad con la Ley 1581 de 2012, artículo 10 del decreto reglamentario 1377 de 2013 y al artículo 20 del Decreto 0722 de 2013, <b>KALONI COLOMBIA S.A.S.</b>, en adelante Kaloni, sociedad comercial debidamente constituida bajo las leyes colombianas, con NIT. 900852763-1 con domicilio en Colombia en la ciudad de Bogotá D.C localizada en la Carrera 9 No. 113-52 Edificio Torres Unidas 2 Local 102, ponemos a su disposición nuestro Aviso de Privacidad y Política de Tratamiento de Datos Personales, la cual tiene como propósito informar las prácticas en relación con la búsqueda, tratamiento y comunicación de la información que nos sea proporcionada a través de este sitio web.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Qué datos personales recopilamos?</b></p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Dependiendo del uso que usted le dé a nuestra página web, recopilamos los siguientes datos: </p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;1. Para agendar una cita de valoración: nombre completo, correo electrónico, teléfono y sucursal donde será atendido.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;2. Para solicitar información de nuestros servicios a través de formulario: nombre completo, correo electrónico, teléfono,</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;ciudad de residencia y sucursal donde desea ser atendido.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cómo recolectamos sus datos?</b></p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">A través de formularios de registro, usted nos proporciona sus datos con la finalidad de agendar una cita o solicitar información acerca de los servicios de su interés.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">A través de su uso del sitio web obtenemos direcciones IP, datos de registros, tipo y preferencias de navegador, información de ubicación, identificadores en línea para habilitar «cookies» y tecnologías similares.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Al momento de utilizar el sitio, acepta los Términos de Uso de este sitio web y del presente aviso de privacidad. Parte de la información que usted envíe puede ser información de identificación o de carácter personal (es decir, información que únicamente puede estar relacionada con usted, como su nombre completo, domicilio, dirección de e-mail, número de teléfono). Al enviar sus datos a través de este sitio web, sean personales o no, está aceptando y, por consiguiente dando su consentimiento expreso de manera libre e inequívoca, para que dichos datos puedan ser objeto de búsqueda, tratamiento y comunicación de acuerdo con la presente Política de Tratamiento de Datos Personales.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Se informará sobre qué datos son obligatorios y cuales optativos.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Para qué usamos sus datos?</b></p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni utilizará los datos depositados en este sitio para transmitirle información (si la ha solicitado), realizar operaciones de marketing, realizar estudios y otras actividades con fines de comercialización y ofrecimiento de servicios y para cualquier otro fin especificado en el presente aviso.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si el tratamiento se basa en su consentimiento, usted tiene el derecho de retirar su consentimiento en cualquier momento. Esto no afectará a la validez del tratamiento anterior a la retirada del consentimiento.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Los datos que se le solicitan son los oportunos y estrictamente necesarios para la finalidad para la que se solicitan, y en ningún caso está usted obligado a facilitárnoslos. Así mismo, damos por correctos y ciertos todos los datos que nos facilita y que éstos son veraces y pertinentes para la finalidad por la que se lo solicitamos.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Seguridad de su información personal</b></p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Tenemos implementados en este sitio web estándares comerciales de tecnología y seguridad operacional para proteger a nuestros visitantes de accesos no autorizados, revelación, alteración o destrucción toda la información proporcionada.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cómo almacenamos sus datos?</b></p>';
      avisoColombia += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cuáles son mis derechos de protección de datos?</b></p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">La legislación vigente otorga al titular de los datos una serie de derechos que le invitamos a considerar detenidamente: </p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;- Conocer, actualizar, rectificar, suprimir y revocar los datos personales. Este derecho se podrá ejercer, entre otros, frente a </p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;datos parciales, inexactos, incompletos, fraccionados, que induzcan a error, o aquellos cuyo Tratamiento esté expresamente</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;prohibido o no haya sido autorizado.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;- Solicitar prueba de la autorización de Tratamiento otorgada.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;- Ser informado respecto del uso que el responsable le ha dado a los datos personales.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;- Presentar ante los organismos de control correspondientes, quejas por infracciones a lo dispuesto en la normativa vigente</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;y las demás normas que la modifiquen, adicionen o complementen.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;- Acceder en forma gratuita a los datos personales que hayan sido objeto de Tratamiento.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Quién es responsable de los datos personales recopilados?</b></p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni, sociedad comercial debidamente constituida bajo las leyes colombianas, con NIT. 900852763-1 con domicilio en Colombia en la ciudad de Bogotá D.C localizada en la Carrera 9 No. 113-52 Edificio Torres Unidas 2 Local 102, será el Responsable y/o Encargado del tratamiento de los datos personales de sus clientes, y clientes prospectivos obtenidos durante el uso este sitio web y sus actividades de negocio.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Con quién debo ponerme en contacto para realizar una consulta, notificar un problema o presentar una reclamación?</b></p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">En cualquier momento puede ejercer sus derechos en los términos establecidos legalmente, pudiendo dirigirse por escrito a KALONI COLOMBIA S.A.S., ubicada en Bogotá D.C., en la Carrera 9 No. 113-52 Edificio Torres Unidas 2 Local 102, o por correo electrónico a legal@kaloni.com .</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni validará la identificación, analizará, clasificará y emitirá la respuesta a la solicitud en los tiempos establecidos en la ley, y será enviada a través del medio por el cual se recibe la solicitud o por el medio que el titular especifique en su comunicación. La supresión de datos personales y/o revocación de autorización para tratamiento de la información no procederá cuando el titular tenga un deber legal o contractual de permanecer en las bases de datos de Kaloni.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Dichos requerimientos serán tramitados siempre y cuando cumplan con los siguientes requisitos:</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;1. La solicitud deberá ser dirigida a Kaloni;</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;2. Deberá contar con la identificación del titular, su causahabiente, representante o mandatario;</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;3. Habrá de contener la descripción de los hechos que dan lugar a su petición;</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;4. Datos de contacto para notificación de la respuesta;</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;5. Documentos y hechos soporte de su petición;</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">En caso de que el requerimiento resulte incompleto en cuanto a sus requisitos, el solicitante será requerido para que dentro de los cinco (5) días siguientes a la recepción del requerimiento subsane sus omisiones. Transcurridos dos (2) meses desde la fecha en que el solicitante fue requerido para subsanar su petición sin obtener la información requerida, se entenderá que ha desistido del reclamo.</p>';
      avisoColombia += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Transferencias de datos personales</b></p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si los datos personales se han transferido a otras empresas del grupo “Kaloni” y/o se ha autorizado su uso por parte de terceros autorizados que se encuentran fuera de su país, adoptaremos medidas organizativas, contractuales y jurídicas para garantizar que el tratamiento de sus datos personales sea exclusivamente para los fines mencionados arriba y que se implementen los niveles de protección adecuados para salvaguardar sus datos personales.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Al suministrar la información personal en este sitio web, estará autorizando de forma expresa, libre e inequívoca que la información recogida pueda ser integrada por Kaloni con otros datos obtenidos activamente, a no ser que especifiquemos otra finalidad al recogerlos. Finalmente, nos estará autorizando a ceder y/o suministrar la información personal suministrada en este sitio, a terceras partes que no son filiales ni agentes, pero únicamente en los siguientes casos:</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;I. A los contratistas que realizan labores de apoyo en nuestra empresa (como, por ejemplo: servicios logísticos, asistencia</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;técnica, servicios de entrega e instituciones financieras); en este caso, pediremos a estos terceros que traten la información</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;de acuerdo con esta Política de Privacidad y la usen con los mismos fines.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;II. Si lo solicitan las fuerzas de seguridad o lo requieren leyes, órdenes judiciales o normas gubernamentales.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">La búsqueda, tratamiento y comunicación de información contemplada en esta Política de Privacidad puede conllevar la comunicación de los datos a jurisdicciones fuera de su país de residencia donde es posible que no existan leyes y normas equivalentes sobre la información personal, circunstancia que acepta prestando su consentimiento de forma expresa, libre e inequívoca a esta política de privacidad.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cookies y tecnologías similares</b></p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni puede usar cookies y tecnologías similares con el objetivo de recopilar y almacenar información cuando visite la página web. Esto permitirá a la empresa identificar su navegador de Internet y recopilar datos sobre su uso del sitio web, qué páginas visita, la duración de sus visitas, e identificar esta información cuando vuelva para mejorar su experiencia de navegación del sitio web. Usted puede controlar y establecer sus preferencias de cookies en la configuración del navegador. Para obtener más información, consulte la Política y Guía de uso de Cookies.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cómo contactar a la autoridad apropiada?</b></p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si no está satisfecho con nuestro manejo de sus datos personales, también tiene derecho a presentar una queja ante la autoridad local correspondiente, le invitamos a conocer más información aquí.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cambios al presente Aviso de Privacidad</b></p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">El Aviso de Privacidad puede cambiar con el tiempo. Le recomendamos que revise regularmente esta sección para enterarse de posibles cambios.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Última modificación: 23 de mayo 2019.</p>';

      var avisoEspana = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>AVISO DE PRIVACIDAD</b></p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Para Kaloni Hair, S.L.U., en adelante Kaloni Hair Madrid, el secreto profesional, la confidencialidad, y la seguridad son valores imprescindibles, y en todo momento garantizamos nuestro compromiso con la privacidad del usuario o visitante en todas sus interacciones. En Kaloni Hair Madrid nos comprometemos a no recabar información innecesaria sobre el usuario, como también a tratar con extrema diligencia la información personal que el usuario pueda facilitar a través de nuestra página web.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">De conformidad con el Reglamento (UE) 2016/679 (Reglamento General de Protección de Datos), y la normativa relativa a la Protección de Datos de Carácter Personal, usted debe saber que la utilización de algunos servicios en nuestra página web, requiere que nos faciliten algunos de sus datos personales a través de formularios de registro o mediante el envío de mensajes de correo electrónico, y que estos datos podrán ser objeto de tratamientos e incorporación a los ficheros de Kaloni Hair Madrid, titular y responsable del mismo.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Qué datos personales recopilamos?</b></p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Dependiendo del uso que usted le dé a nuestra página web, recopilamos los siguientes datos: </p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;1. Para agendar una cita de valoración: nombre completo, correo electrónico, teléfono y sucursal donde será atendido.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;2. Para solicitar información de nuestros servicios a través de formulario: nombre completo, correo electrónico, teléfono,</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;ciudad de residencia y sucursal donde desea ser atendido.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cómo recolectamos sus datos?</b></p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">A través de formularios de registro, usted nos proporciona sus datos con la finalidad de agendar una cita o solicitar información acerca de los servicios de su interés.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">A través de su uso del sitio web obtenemos direcciones IP, datos de registros, tipo y preferencias de navegador, información de ubicación, identificadores en línea para habilitar «cookies» y tecnologías similares.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">El envío de los datos implica su autorización para incorporarlos a nuestros ficheros, siempre que Kaloni Hair Madrid lo considere conveniente, quedando regulados en todo caso por el presente Aviso de Privacidad. Kaloni Hair Madrid, se reserva el derecho de decidir la incorporación o no, de sus datos personales en nuestros ficheros.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Para qué usamos sus datos?</b></p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Procesamos sus datos personales para los fines siguientes: </p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Mantener la relación con usted;</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Dar contestación a sus consultas;</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Realizar el envío por medios tradicionales o electrónicos de información sobre nuestros servicios; </p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Brindar servicio de atención al cliente;</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Realizar encuestas de mercado y análisis de estrategias de marketing;</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">&nbsp;&nbsp;&nbsp;Ofrecer promociones a nuestros clientes;</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si el tratamiento se basa en su consentimiento, usted tiene el derecho de retirar su consentimiento en cualquier momento. Esto no afectará a la validez del tratamiento anterior a la retirada del consentimiento.</p>';
      avisoEspana += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Los datos que se le solicitan son los oportunos y estrictamente necesarios para la finalidad para la que se solicitan, y en ningún caso está usted obligado a facilitárnoslos. Así mismo, damos por correctos y ciertos todos los datos que nos facilita y que éstos son veraces y pertinentes para la finalidad por la que se lo solicitamos.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cuáles son mis derechos de protección de datos?</b></p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">La legislación vigente otorga al titular de los datos una serie de derechos que te invitamos a considerar detenidamente. Así dispones de los derechos de acceso, rectificación, supresión, limitación del tratamiento, recibir notificación en caso de rectificación o supresión de datos personales o limitación de tratamiento, portabilidad de los datos, oposición y a no ser objeto de una decisión automatizada, incluida la elaboración de perfiles, basada únicamente en el tratamiento automatizado. Kaloni Hair Madrid quiere asegurarse de que usted esté enterado de sus derechos: </p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho de acceso:</b> Usted tiene derecho a solicitar los datos personales relacionados con usted y que nos haya proporcionado.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho de rectificación:</b> Usted tiene el derecho a solicitar la corrección de los datos personales si usted cree que la información no es exacta. También tiene el derecho a solicitar que la empresa complemente aquellos datos que considere están incompletos.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho de supresión:</b> Usted tiene el derecho a solicitar la eliminación de los datos personales (una vez que ya no sean necesarios para una finalidad empresarial legítima, como completar una transacción comercial)</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho a restringir el tratamiento:</b> Usted tiene el derecho a solicitar la restricción de los datos personales siempre y cuando ya no sean necesarios para una finalidad empresarial legítima.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho a objetar el tratamiento:</b> Usted tiene el derecho a objetar el tratamiento de sus datos personal.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Derecho a la portabilidad de los datos:</b> Usted tiene el derecho a solicitar la transferencia de sus datos a otra parte, siempre que esto sea viable técnicamente.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Quién es responsable de los datos personales recopilados?</b></p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni Hair, S.L.U., C.I.F. B87595708, con domicilio en el Paseo de la Chopera nº 188 - Local, 28100, Alcobendas, Madrid, sociedad inscrita en el Registro Mercantil de Madrid, al Tomo 34.900, Folio 76, Sección 8, Hoja M-627637.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Con quién debo ponerme en contacto para realizar una consulta, notificar un problema o presentar una reclamación?</b></p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">En cualquier momento puede ejercer sus derechos en los términos establecidos legalmente, pudiendo dirigirse por carta a: Kaloni Hair, S.L.U., C.I.F. B87595708, con domicilio en el Paseo de la Chopera nº 188 - Local, 28100, Alcobendas, Madrid, sociedad inscrita en el Registro Mercantil de Madrid, al Tomo 34.900, Folio 76, Sección 8, Hoja M-627637 o por correo electrónico a legal@kaloni.com .</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Transferencias de datos personales</b></p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si los datos personales se han transferido a otras empresas del grupo “Kaloni” y/o se ha autorizado su uso por parte de terceros autorizados que se encuentran fuera de su país (esto incluye el área exterior al Espacio Económico Europeo), adoptaremos medidas organizativas, contractuales y jurídicas para garantizar que el tratamiento de sus datos personales sea exclusivamente para los fines mencionados arriba y que se implementen los niveles de protección adecuados para salvaguardar sus datos personales.</p>';
      avisoEspana += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cookies y tecnologías similares</b></p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Kaloni Hair Madrid puede usar cookies y tecnologías similares con el objetivo de recopilar y almacenar información cuando visite la página web. Esto permitirá a la empresa identificar su navegador de Internet y recopilar datos sobre su uso del sitio web, qué páginas visita, la duración de sus visitas, e identificar esta información cuando vuelva para mejorar su experiencia de navegación del sitio web. Usted puede controlar y establecer sus preferencias de cookies en la configuración del navegador. Para obtener más información, consulte la Política y Guía de uso de Cookies.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>¿Cómo contactar a la autoridad apropiada?</b></p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Si no está satisfecho con nuestro manejo de sus datos personales, también tiene derecho a presentar una queja ante una autoridad de supervisión de protección de datos de la UE. Puede encontrar los detalles de su autoridad de supervisión aplicable aquí.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Cambios al presente Aviso de Privacidad</b></p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">El Aviso de Privacidad puede cambiar con el tiempo. Le recomendamos que revise regularmente esta sección para enterarse de posibles cambios.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Última modificación: 23 de mayo 2019.</p>';

      var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n';
      xml += '<pdf>\n';
      xml += '<body background-image="' + xmlMod.escape({ xmlText: imageBack }) + '" >';

      xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
      if (subsidiaryText == "Mexico") {
        xml += avisoMexico;
      } else if (subsidiaryText == "Colombia") {
        xml += avisoColombia;
      } else if (subsidiaryText == "España") {
        xml += avisoEspana;
      } else {
        xml += avisoMexico;
      }

      xml += '<p style="align:center"><img src="' + avisoPrivacidadbase64 + '" width="100" height="100" /></p>';
      xml += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br/>FIRMA DEL PACIENTE</b><br/>' + altname + '</p>';

      xml += '</body></pdf>';
      context.response.renderPdf({ xmlString: xml });
    }

    function getImageBackGround(sucursal) {
      var imageBack = "";
      if (sucursal != "22" && sucursal != "35" && sucursal != "36" && sucursal != "23" && sucursal != "24" && sucursal != "25" && sucursal != "37" && sucursal != "21" && sucursal != "26" && sucursal != "27" && sucursal != "28") {
        imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
      }
      else {
        /*if(sucursal == "22") // Altavista KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5";
        if(sucursal == "35") // Can-Cun KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
        if(sucursal == "36") // Chihuahua KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa";
        if(sucursal == "23") // Guadalajara KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773";
        if(sucursal == "24") // Monterrey KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2";
        if(sucursal == "25") // Polanco KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7";
        if(sucursal == "37") // Puebla KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2";
        if(sucursal == "21") // Santa FE KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d";
        if(sucursal == "26") // Satelite KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4";
        if(sucursal == "27") // Tijuana KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7";
        if(sucursal == "28") // Veracruz KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20";
          */
        imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
      }
      return imageBack;
    }

    function sucursalReal(sucursalText) {
      var largoSucrusal = sucursalText.length;
      largoSucrusal = largoSucrusal - 4;
      var sucursalFinal = sucursalText.slice(0, largoSucrusal);
      return sucursalFinal;
    }


    return {
      onRequest: onRequest
    };

  });
