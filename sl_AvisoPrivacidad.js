/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/record'],

    function (widget, record) {

        function onRequest(context) {
            var recordCase_Id = context.request.parameters.recordCaseId;
            var compaId = context.request.parameters.compaId;
            var objRecord = record.load({ type: 'customer', id: compaId, isDynamic: true });
            var caso = record.load({ type: 'supportcase', id: recordCase_Id, isDynamic: true });
            var subsidiaryText = objRecord.getText({ fieldId: 'subsidiary' });
            var subsidiaryId = objRecord.getValue({ fieldId: 'subsidiary' });
            var background = '';
            if (subsidiaryId == '19') {
                background = 'https://3559763.app.netsuite.com/core/media/media.nl?id=4036340&c=3559763&h=aada0ca1d6f77144a462';
            } else {
                background = 'https://soportekaloni.com/consentimiento/kaloni.png';
            }
            //var sucursal = objRecord.getText({ fieldId: 'custentity25' });
            var sucursal = caso.getText({ fieldId: 'custevent2' });
            var nombrePaciente = objRecord.getText({ fieldId: 'altname' });
            var sucReal = sucursalReal(sucursal);

            var fecha = new Date();
            fecha = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();

            var field_firmaNula = 'data:image/png;base64,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';

            var headPDF = '<body>' +
                '<div align="" style="background: url(' + background + ') no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
                '<div id="scroll"><div id="notices">' +
                '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 200px;margin-top:20px">' +
                '<h1 id="titulo">AVISO DE PRIVACIDAD</h1>';

            var footerPDF = '<center><img id="myImgFirma" src="' + field_firmaNula + '" width="200" height="200"></center><br/>' +
                '<center><b>_________________________________________________________</b></center><br/>' +
                '<center><b>FIRMA DEL PACIENTE</b></center><br/>' +
                '<center><p style="font-size: large;"><b>' + nombrePaciente + '</b></p></center><br/>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</body>';

            var avisoAlbya = '<br/><p id="texto">Albya S.C., (“Albya”) es la persona moral con domicilio fiscal en Avenida Vasco de Quiroga 3900, Interior 401, Col. Santa Fe, Delegación Cuajimalpa, C.P. 05348, Ciudad de México, quien es Responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:</p><br/>' +

                '<p id="texto"><b>¿Qué datos suyos tenemos?</b>' +
                '<br/>Su nombre completo, domicilio, números telefónicos, fecha de nacimiento, correo electrónico, fotografías varias según el procedimiento o tratamiento que se realice y datos sobre su historial médico por ejemplo qué medicamentos toma actualmente, si padece alergias, etc.</p><br/>' +

                '<p id="texto"><b>¿Para qué fines utilizaremos sus datos personales?</b>' +
                '<br/>Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:</p><br/>' +

                '<p id="texto">A)	Para brindarle servicio de atención al cliente y dar contestación a sus consultas;</p>' +
                '<p id="texto">B)   Para proveer los servicios y productos que ha solicitado y para mantenerlo informado sobre cambios en los mismos;</p>' +
                '<p id="texto">C)	Para dar estrecho seguimiento al procedimiento efectuado y, evaluar la calidad del servicio que le brindamos.</p><br/>' +
                '<p id="texto">De manera adicional, utilizaremos su información personal para las siguientes finalidades que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:</p><br/>' +
                '<p id="texto">D)	Realizar el envío por medios tradicionales o electrónicos de información sobre nuestros servicios;</p>' +
                '<p id="texto">E)   Realizar encuestas de mercado y análisis de estrategias de marketing;</p>' +
                '<p id="texto">F)   Ofrecer promociones a nuestros clientes;</p>' +
                '<p id="texto">G)	Mantener la relación con usted.</p><br/>' +

                '<p id="texto"><b>¿Cuáles son mis derechos de protección de datos?</b>' +
                '<br/>Usted tiene el derecho de acceder a sus datos personales, rectificarlos, y cancelarlos, así como de oponerse al tratamiento que les demos conforme lo descrito en el presente aviso. Usted puede ejercer sus derechos en los términos establecidos legalmente, dirigiéndose por escrito a: Albya, S.C., con domicilio en Avenida Vasco de Quiroga 3900, Torre B, Piso 4, Int 401, Col. Santa Fe Cuajimalpa, Del. Cuajimalpa de Morelos, C.P. 05348, Ciudad de México o por correo electrónico a legal@albya.com.</p><br/>' +

                '<p id="texto">La negativa para el uso de sus datos personales para estas finalidades no será un motivo para que le neguemos los servicios y productos que solicita o contrata con nosotros.</p><br/>' +

                '<p id="texto"><b>Seguridad de su información personal.</b>' +
                '<br/>Albya otorga la máxima importancia a la confidencialidad y debida protección de la información personal que le es confiada, por lo tanto se compromete a implementar las medidas de seguridad físicas, administrativas y técnicas necesarias para proteger su información personal contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.<br/>Asimismo, Albya y sus empleados, encargados y en general usuarios que tengan acceso a datos personales en el ejercicio de sus funciones o intervengan en cualquier fase del tratamiento se comprometen a guardar confidencialidad respecto de su información personal, incluso después de finalizada la relación con usted o con la empresa.</p><br/>' +

                '<p id="texto"><b>¿Dónde puedo consultar la política de privacidad integral?</b>' +
                '<br/>PPara conocer mayor información sobre el tratamiento de sus datos personales y la forma en que podrá ejercer sus derechos ARCO, puede consultar nuestro sito web https://albya.com/web/legal.php</p><br/>' +

                '<p id="texto"><b>Transferencia de datos</b>' +
                '<br/>No realizamos transferencias de sus datos personales con alguna otra empresa.</p><br/>' +

                '<p id="texto"><b>Cambios al aviso de privacidad</b>' +
                '<br/>Albya podrá modificar el presente aviso de privacidad y sus prácticas en torno al manejo de su información personal; cualquier modificación será publicada en https://albya.com/web/legal.php. Fecha de última actualización [01/11/2019]</p><br/>' +

                '<p style="font-size: medium;">En prueba de conformidad firmo la presente, en <b>' + sucReal + ' a ' + fecha + ' </b></p><br/><br/>';

            var avisoMexico = '<br/><p id="texto">Kaloni Holding Group S.C., (“Kaloni”) es la persona moral con domicilio fiscal en Avenida Vasco de Quiroga 3900, Interior 401, Col. Santa Fe, Delegación Cuajimalpa, C.P. 05348, Ciudad de México, quien es Responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:</p><br/>' +

                '<p id="texto"><b>¿Qué datos suyos tenemos?</b>' +
                '<br/>Su nombre completo, domicilio, números telefónicos, fecha de nacimiento, correo electrónico, fotografías varias según el procedimiento o tratamiento que se realice y datos sobre su historial médico por ejemplo qué medicamentos toma actualmente, si padece alergias, etc.</p><br/>' +

                '<p id="texto"><b>¿Para qué fines utilizaremos sus datos personales?</b>' +
                '<br/>Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:</p><br/>' +

                '<p id="texto">A)	Para brindarle servicio de atención al cliente y dar contestación a sus consultas;</p>' +
                '<p id="texto">B)    Para proveer los servicios y productos que ha solicitado y para mantenerlo informado sobre cambios en los mismos;</p>' +
                '<p id="texto">C)	Para dar estrecho seguimiento al procedimiento efectuado y, evaluar la calidad del servicio que le brindamos.</p><br/>' +
                '<p id="texto">De manera adicional, utilizaremos su información personal para las siguientes finalidades que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:</p><br/>' +
                '<p id="texto">D)	Realizar el envío por medios tradicionales o electrónicos de información sobre nuestros servicios;</p>' +
                '<p id="texto">E)    Realizar encuestas de mercado y análisis de estrategias de marketing</p>' +
                '<p id="texto">F)     Ofrecer promociones a nuestros clientes;</p>' +
                '<p id="texto">G)	Mantener la relación con usted.</p><br/>' +

                '<p id="texto"><b>¿Cuáles son mis derechos de protección de datos?</b>' +
                '<br/>Usted tiene el derecho de acceder a sus datos personales, rectificarlos, y cancelarlos, así como de oponerse al tratamiento que les demos conforme lo descrito en el presente aviso. Usted puede ejercer sus derechos en los términos establecidos legalmente, dirigiéndose por escrito a: Kaloni Holding Group, S.C., con domicilio en Avenida Vasco de Quiroga 3900, Torre B, Piso 4, Int 401, Col. Santa Fe Cuajimalpa, Del. Cuajimalpa de Morelos, C.P. 05348, Ciudad de México o por correo electrónico a legal@kaloni.com.</p><br/>' +

                '<p id="texto">La negativa para el uso de sus datos personales para estas finalidades no será un motivo para que le neguemos los servicios y productos que solicita o contrata con nosotros.</p><br/>' +

                '<p id="texto"><b>Seguridad de su información personal.</b>' +
                '<br/>Kaloni otorga la máxima importancia a la confidencialidad y debida protección de la información personal que le es confiada, por lo tanto se compromete a implementar las medidas de seguridad físicas, administrativas y técnicas necesarias para proteger su información personal contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.</p><br/>' +

                '<p id="texto"><b>¿Dónde puedo consultar la política de privacidad integral?</b>' +
                '<br/>Para conocer mayor información sobre el tratamiento de sus datos personales y la forma en que podrá ejercer sus derechos ARCO, puede consultar nuestro sito web https://kaloni.mx/legal.html.</p><br/>' +

                '<p id="texto"><b>Transferencia de datos</b>' +
                '<br/>No realizamos transferencias de sus datos personales con alguna otra empresa.</p><br/>' +

                '<p id="texto"><b>Cambios al aviso de privacidad</b>' +
                '<br/>Kaloni podrá modificar el presente aviso de privacidad y sus prácticas en torno al manejo de su información personal; cualquier modificación será publicada en https://kaloni.mx/legal.html. Fecha de última actualización [22/08/2019]</p><br/>' +

                '<p style="font-size: medium;">En prueba de conformidad firmo la presente, en <b>' + sucReal + ' a ' + fecha + ' </b></p><br/><br/>';

            var avisoColombia = '<p id="texto">De conformidad con la Ley 1581 de 2012, artículo 10 del decreto reglamentario 1377 de 2013 y al artículo 20 del Decreto 0722 de 2013, <b>KALONI COLOMBIA S.A.S.</b>, en adelante Kaloni, sociedad comercial debidamente constituida bajo las leyes colombianas, con NIT. 900852763-1 con domicilio en Colombia en la ciudad de Bogotá D.C localizada en la Carrera 9 No. 113-52 Edificio Torres Unidas 2 Local 102, ponemos a su disposición nuestro Aviso de Privacidad y Política de Tratamiento de Datos Personales, la cual tiene como propósito informar las prácticas en relación con la búsqueda, tratamiento y comunicación de la información que nos sea proporcionada a través de este sitio web. </p><br/>' +

                '<p id="texto"><b>¿Qué datos personales recopilamos?</b></p><br/>' +

                '<p id="texto">Dependiendo del uso que usted le dé a nuestra página web, recopilamos los siguientes datos: </p><br/>' +

                '<ul id="texto">1. Para agendar una cita de valoración: nombre completo, correo electrónico, teléfono y sucursal donde será atendido.</ul>' +
                '<ul id="texto">2. Para solicitar información de nuestros servicios a través de formulario: nombre completo, correo electrónico, teléfono, ciudad de residencia y sucursal donde desea ser atendido.</ul><br/>' +

                '<p id="texto"><b>¿Cómo recolectamos sus datos?</b></p><br/>' +

                '<p id="texto">A través de formularios de registro, usted nos proporciona sus datos con la finalidad de agendar una cita o solicitar información acerca de los servicios de su interés. </p><br/>' +

                '<p id="texto">A través de su uso del sitio web obtenemos direcciones IP, datos de registros, tipo y preferencias de navegador, información de ubicación, identificadores en línea para habilitar «cookies» y tecnologías similares. </p><br/>' +

                '<p id="texto">Al momento de utilizar el sitio, acepta los Términos de Uso de este sitio web y del presente aviso de privacidad. Parte de la información que usted envíe puede ser información de identificación o de carácter personal (es decir, información que únicamente puede estar relacionada con usted, como su nombre completo, domicilio, dirección de e-mail, número de teléfono). Al enviar sus datos a través de este sitio web, sean personales o no, está aceptando y, por consiguiente dando su consentimiento expreso de manera libre e inequívoca, para que dichos datos puedan ser objeto de búsqueda, tratamiento y comunicación de acuerdo con la presente Política de Tratamiento de Datos Personales. </p><br/>' +

                '<p id="texto">Se informará sobre qué datos son obligatorios y cuales optativos.</p><br/>' +

                '<p id="texto"><b>¿Para qué usamos sus datos?</b></p><br/>' +

                '<p id="texto">Kaloni utilizará los datos depositados en este sitio para transmitirle información (si la ha solicitado), realizar operaciones de marketing, realizar estudios y otras actividades con fines de comercialización y ofrecimiento de servicios y para cualquier otro fin especificado en el presente aviso. </p><br/>' +

                '<p id="texto">Si el tratamiento se basa en su consentimiento, usted tiene el derecho de retirar su consentimiento en cualquier momento. Esto no afectará a la validez del tratamiento anterior a la retirada del consentimiento. </p><br/>' +

                '<p id="texto">Los datos que se le solicitan son los oportunos y estrictamente necesarios para la finalidad para la que se solicitan, y en ningún caso está usted obligado a facilitárnoslos. Así mismo, damos por correctos y ciertos todos los datos que nos facilita y que éstos son veraces y pertinentes para la finalidad por la que se lo solicitamos. </p><br/>' +

                '<p id="texto"><b>Seguridad de su información personal</b></p><br/>' +

                '<p id="texto">Tenemos implementados en este sitio web estándares comerciales de tecnología y seguridad operacional para proteger a nuestros visitantes de accesos no autorizados, revelación, alteración o destrucción toda la información proporcionada. </p><br/>' +

                '<p id="texto"><b>¿Cómo almacenamos sus datos?</b></p><br/>' +
                '<p id="texto"><b>¿Cuáles son mis derechos de protección de datos?</b></p><br/>' +

                '<p id="texto">La legislación vigente otorga al titular de los datos una serie de derechos que le invitamos a considerar detenidamente: </p><br/>' +
                '<ul id="texto">- Conocer, actualizar, rectificar, suprimir y revocar los datos personales. Este derecho se podrá ejercer, entre otros, frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a error, o aquellos cuyo Tratamiento esté expresamente prohibido o no haya sido autorizado. </ul>' +
                '<ul id="texto">- Solicitar prueba de la autorización de Tratamiento otorgada. </ul>' +
                '<ul id="texto">- Ser informado respecto del uso que el responsable le ha dado a los datos personales. </ul>' +
                '<ul id="texto">- Presentar ante los organismos de control correspondientes, quejas por infracciones a lo dispuesto en la normativa vigente y las demás normas que la modifiquen, adicionen o complementen. </ul>' +
                '<ul id="texto">- Acceder en forma gratuita a los datos personales que hayan sido objeto de Tratamiento.</ul><br/>' +

                '<p id="texto"><b>¿Quién es responsable de los datos personales recopilados?</b></p><br/>' +
                '<p id="texto">Kaloni, sociedad comercial debidamente constituida bajo las leyes colombianas, con NIT. 900852763-1 con domicilio en Colombia en la ciudad de Bogotá D.C localizada en la Carrera 9 No. 113-52 Edificio Torres Unidas 2 Local 102, será el Responsable y/o Encargado del tratamiento de los datos personales de sus clientes, y clientes prospectivos obtenidos durante el uso este sitio web y sus actividades de negocio. </p><br/>' +

                '<p id="texto"><b>¿Con quién debo ponerme en contacto para realizar una consulta, notificar un problema o presentar una reclamación?</b></p><br/>' +
                '<p id="texto">En cualquier momento puede ejercer sus derechos en los términos establecidos legalmente, pudiendo dirigirse por escrito a <b>KALONI COLOMBIA S.A.S.</b>, ubicada en Bogotá D.C., en la Carrera 9 No. 113-52 Edificio Torres Unidas 2 Local 102, o por correo electrónico a legal@kaloni.com </p><br/>' +
                '<p id="texto">Kaloni validará la identificación, analizará, clasificará y emitirá la respuesta a la solicitud en los tiempos establecidos en la ley, y será enviada a través del medio por el cual se recibe la solicitud o por el medio que el titular especifique en su comunicación. La supresión de datos personales y/o revocación de autorización para tratamiento de la información no procederá cuando el titular tenga un deber legal o contractual de permanecer en las bases de datos de Kaloni. </p><br/>' +
                '<p id="texto">Dichos requerimientos serán tramitados siempre y cuando cumplan con los siguientes requisitos: </p><br/>' +
                '<ul id="texto">1. La solicitud deberá ser dirigida a Kaloni;</ul>' +
                '<ul id="texto">2. Deberá contar con la identificación del titular, su causahabiente, representante o mandatario;</ul>' +
                '<ul id="texto">3. Habrá de contener la descripción de los hechos que dan lugar a su petición;</ul>' +
                '<ul id="texto">4. Datos de contacto para notificación de la respuesta;</ul>' +
                '<ul id="texto">5. Documentos y hechos soporte de su petición;</ul><br/>' +

                '<p id="texto">En caso de que el requerimiento resulte incompleto en cuanto a sus requisitos, el solicitante será requerido para que dentro de los cinco (5) días siguientes a la recepción del requerimiento subsane sus omisiones. Transcurridos dos (2) meses desde la fecha en que el solicitante fue requerido para subsanar su petición sin obtener la información requerida, se entenderá que ha desistido del reclamo. </p><br/>' +

                '<p id="texto"><b>Transferencias de datos personales</b></p><br/>' +
                '<p id="texto">Si los datos personales se han transferido a otras empresas del grupo “Kaloni” y/o se ha autorizado su uso por parte de terceros autorizados que se encuentran fuera de su país, adoptaremos medidas organizativas, contractuales y jurídicas para garantizar que el tratamiento de sus datos personales sea exclusivamente para los fines mencionados arriba y que se implementen los niveles de protección adecuados para salvaguardar sus datos personales. </p><br/>' +
                '<p id="texto">Al suministrar la información personal en este sitio web, estará autorizando de forma expresa, libre e inequívoca que la información recogida pueda ser integrada por Kaloni con otros datos obtenidos activamente, a no ser que especifiquemos otra finalidad al recogerlos. Finalmente, nos estará autorizando a ceder y/o suministrar la información personal suministrada en este sitio, a terceras partes que no son filiales ni agentes, pero únicamente en los siguientes casos: </p><br/>' +

                '<ul id="texto">I. A los contratistas que realizan labores de apoyo en nuestra empresa (como, por ejemplo: servicios logísticos, asistencia técnica, servicios de entrega e instituciones financieras); en este caso, pediremos a estos terceros que traten la información de acuerdo con esta Política de Privacidad y la usen con los mismos fines.</ul>' +
                '<ul id="texto">II. Si lo solicitan las fuerzas de seguridad o lo requieren leyes, órdenes judiciales o normas gubernamentales.</ul><br/>' +

                '<p id="texto">La búsqueda, tratamiento y comunicación de información contemplada en esta Política de Privacidad puede conllevar la comunicación de los datos a jurisdicciones fuera de su país de residencia donde es posible que no existan leyes y normas equivalentes sobre la información personal, circunstancia que acepta prestando su consentimiento de forma expresa, libre e inequívoca a esta política de privacidad.</p><br/>' +

                '<p id="texto"><b>Cookies y tecnologías similares</b></p><br/>' +
                '<p id="texto">Kaloni puede usar cookies y tecnologías similares con el objetivo de recopilar y almacenar información cuando visite la página web. Esto permitirá a la empresa identificar su navegador de Internet y recopilar datos sobre su uso del sitio web, qué páginas visita, la duración de sus visitas, e identificar esta información cuando vuelva para mejorar su experiencia de navegación del sitio web. Usted puede controlar y establecer sus preferencias de cookies en la configuración del navegador. Para obtener más información, consulte la Política y Guía de uso de Cookies.</p><br/>' +

                '<p id="texto"><b>¿Cómo contactar a la autoridad apropiada?</b></p><br/>' +
                '<p id="texto">Si no está satisfecho con nuestro manejo de sus datos personales, también tiene derecho a presentar una queja ante la autoridad local correspondiente, le invitamos a conocer más información aquí.</p><br/>' +

                '<p id="texto"><b>Cambios al presente Aviso de Privacidad</b></p><br/>' +
                '<p id="texto">El Aviso de Privacidad puede cambiar con el tiempo. Le recomendamos que revise regularmente esta sección para enterarse de posibles cambios. </p><br/>' +
                '<p id="texto">Última modificación: 23 de mayo 2019. </p><br/>';

            var avisoEspaña = '<p id="texto">Para Kaloni Hair, S.L.U., en adelante Kaloni Hair Madrid, el secreto profesional, la confidencialidad, y la seguridad son valores imprescindibles, y en todo momento garantizamos nuestro compromiso con la privacidad del usuario o visitante en todas sus interacciones. En Kaloni Hair Madrid nos comprometemos a no recabar información innecesaria sobre el usuario, como también a tratar con extrema diligencia la información personal que el usuario pueda facilitar a través de nuestra página web.</p><br/>' +

                '<p id="texto">De conformidad con el Reglamento (UE) 2016/679 (Reglamento General de Protección de Datos), y la normativa relativa a la Protección de Datos de Carácter Personal, usted debe saber que la utilización de algunos servicios en nuestra página web, requiere que nos faciliten algunos de sus datos personales a través de formularios de registro o mediante el envío de mensajes de correo electrónico, y que estos datos podrán ser objeto de tratamientos e incorporación a los ficheros de Kaloni Hair Madrid, titular y responsable del mismo. </p><br/>' +

                '<p id="texto"><b>¿Qué datos personales recopilamos?</b></p><br/>' +

                '<p id="texto">Dependiendo del uso que usted le dé a nuestra página web, recopilamos los siguientes datos: </p><br/>' +

                '<ul id="texto">1. Para agendar una cita de valoración: nombre completo, correo electrónico, teléfono y sucursal donde será atendido.</ul>' +
                '<ul id="texto">2. Para solicitar información de nuestros servicios a través de formulario: nombre completo, correo electrónico, teléfono, ciudad de residencia y sucursal donde desea ser atendido.</ul><br/>' +

                '<p id="texto"><b>¿Cómo recolectamos sus datos?</b></p><br/>' +

                '<p id="texto">A través de formularios de registro, usted nos proporciona sus datos con la finalidad de agendar una cita o solicitar información acerca de los servicios de su interés. </p><br/>' +

                '<p id="texto">A través de su uso del sitio web obtenemos direcciones IP, datos de registros, tipo y preferencias de navegador, información de ubicación, identificadores en línea para habilitar «cookies» y tecnologías similares. </p><br/>' +

                '<p id="texto">El envío de los datos implica su autorización para incorporarlos a nuestros ficheros, siempre que Kaloni Hair Madrid lo considere conveniente, quedando regulados en todo caso por el presente Aviso de Privacidad. Kaloni Hair Madrid, se reserva el derecho de decidir la incorporación o no, de sus datos personales en nuestros ficheros.</p><br/>' +

                '<p id="texto"><b>¿Para qué usamos sus datos?</b></p><br/>' +

                '<p id="texto">Procesamos sus datos personales para los fines siguientes: </p><br/>' +
                '<ul id="texto">Mantener la relación con usted; </ul>' +
                '<ul id="texto">Dar contestación a sus consultas; </ul>' +
                '<ul id="texto">Realizar el envío por medios tradicionales o electrónicos de información sobre nuestros servicios; </ul>' +
                '<ul id="texto">Brindar servicio de atención al cliente;</ul>' +
                '<ul id="texto">Realizar encuestas de mercado y análisis de estrategias de marketing;</ul>' +
                '<ul id="texto">Ofrecer promociones a nuestros clientes;</ul><br/>' +

                '<p id="texto">Si el tratamiento se basa en su consentimiento, usted tiene el derecho de retirar su consentimiento en cualquier momento. Esto no afectará a la validez del tratamiento anterior a la retirada del consentimiento. </p><br/>' +

                '<p id="texto">Los datos que se le solicitan son los oportunos y estrictamente necesarios para la finalidad para la que se solicitan, y en ningún caso está usted obligado a facilitárnoslos. Así mismo, damos por correctos y ciertos todos los datos que nos facilita y que éstos son veraces y pertinentes para la finalidad por la que se lo solicitamos. </p><br/>' +

                '<p id="texto"><b>¿Cuáles son mis derechos de protección de datos?</b></p><br/>' +

                '<p id="texto">La legislación vigente otorga al titular de los datos una serie de derechos que te invitamos a considerar detenidamente. Así dispones de los derechos de acceso, rectificación, supresión, limitación del tratamiento, recibir notificación en caso de rectificación o supresión de datos personales o limitación de tratamiento, portabilidad de los datos, oposición y a no ser objeto de una decisión automatizada, incluida la elaboración de perfiles, basada únicamente en el tratamiento automatizado. Kaloni Hair Madrid quiere asegurarse de que usted esté enterado de sus derechos: </p><br/>' +

                '<p id="texto"><b>Derecho de acceso:</b> Usted tiene derecho a solicitar los datos personales relacionados con usted y que nos haya proporcionado. </p><br/>' +
                '<p id="texto"><b>Derecho de rectificación:</b> Usted tiene el derecho a solicitar la corrección de los datos personales si usted cree que la información no es exacta. También tiene el derecho a solicitar que la empresa complemente aquellos datos que considere están incompletos. </p><br/>' +
                '<p id="texto"><b>Derecho de supresión:</b> Usted tiene el derecho a solicitar la eliminación de los datos personales (una vez que ya no sean necesarios para una finalidad empresarial legítima, como completar una transacción comercial) </p><br/>' +
                '<p id="texto"><b>Derecho a restringir el tratamiento:</b> Usted tiene el derecho a solicitar la restricción de los datos personales siempre y cuando ya no sean necesarios para una finalidad empresarial legítima. </p><br/>' +
                '<p id="texto"><b>Derecho a objetar el tratamiento:</b> Usted tiene el derecho a objetar el tratamiento de sus datos personal. </p><br/>' +
                '<p id="texto"><b>Derecho a la portabilidad de los datos:</b> Usted tiene el derecho a solicitar la transferencia de sus datos a otra parte, siempre que esto sea viable técnicamente</p><br/>' +

                '<p id="texto"><b>¿Quién es responsable de los datos personales recopilados?</b></p><br/>' +
                '<p id="texto">Kaloni Hair, S.L.U., C.I.F. B87595708, con domicilio en el Paseo de la Chopera nº 188 - Local, 28100, Alcobendas, Madrid, sociedad inscrita en el Registro Mercantil de Madrid, al Tomo 34.900, Folio 76, Sección 8, Hoja M-627637.</p><br/>' +

                '<p id="texto"><b>¿Con quién debo ponerme en contacto para realizar una consulta, notificar un problema o presentar una reclamación?</b></p><br/>' +
                '<p id="texto">En cualquier momento puede ejercer sus derechos en los términos establecidos legalmente, pudiendo dirigirse por carta a: Kaloni Hair, S.L.U., C.I.F. B87595708, con domicilio en el Paseo de la Chopera nº 188 - Local, 28100, Alcobendas, Madrid, sociedad inscrita en el Registro Mercantil de Madrid, al Tomo 34.900, Folio 76, Sección 8, Hoja M-627637 o por correo electrónico a legal@kaloni.com . </p><br/>' +

                '<p id="texto"><b>Transferencias de datos personales</b></p><br/>' +
                '<p id="texto">Si los datos personales se han transferido a otras empresas del grupo “Kaloni” y/o se ha autorizado su uso por parte de terceros autorizados que se encuentran fuera de su país (esto incluye el área exterior al Espacio Económico Europeo), adoptaremos medidas organizativas, contractuales y jurídicas para garantizar que el tratamiento de sus datos personales sea exclusivamente para los fines mencionados arriba y que se implementen los niveles de protección adecuados para salvaguardar sus datos personales. </p><br/>' +

                '<p id="texto"><b>Cookies y tecnologías similares</b></p><br/>' +
                '<p id="texto">Kaloni Hair Madrid puede usar cookies y tecnologías similares con el objetivo de recopilar y almacenar información cuando visite la página web. Esto permitirá a la empresa identificar su navegador de Internet y recopilar datos sobre su uso del sitio web, qué páginas visita, la duración de sus visitas, e identificar esta información cuando vuelva para mejorar su experiencia de navegación del sitio web. Usted puede controlar y establecer sus preferencias de cookies en la configuración del navegador. Para obtener más información, consulte la Política y Guía de uso de Cookies. </p><br/>' +

                '<p id="texto"><b>¿Cómo contactar a la autoridad apropiada?</b></p><br/>' +
                '<p id="texto">Si no está satisfecho con nuestro manejo de sus datos personales, también tiene derecho a presentar una queja ante una autoridad de supervisión de protección de datos de la UE. Puede encontrar los detalles de su autoridad de supervisión aplicable aquí. </p><br/>' +

                '<p id="texto"><b>Cambios al presente Aviso de Privacidad</b></p><br/>' +
                '<p id="texto">El Aviso de Privacidad puede cambiar con el tiempo. Le recomendamos que revise regularmente esta sección para enterarse de posibles cambios. </p><br/>' +
                '<p id="texto">Última modificación: 23 de mayo 2019.</p><br/>';

            var formulario = widget.createForm({ title: 'Aviso de Privacidad' });
            var pdfDoc = formulario.addField({ id: 'custpage_pdfdoc', label: 'PdfDoc', type: 'inlinehtml' });
            var firma = formulario.addField({ id: 'custpage_firmacliente', label: 'FirmaCliente', type: 'inlinehtml' });

            if (subsidiaryText == "Mexico") {
                pdfDoc.defaultValue = headPDF + avisoMexico + footerPDF;
            } else if (subsidiaryText == "Colombia") {
                pdfDoc.defaultValue = headPDF + avisoColombia + footerPDF;
            } else if (subsidiaryText == "España") {
                pdfDoc.defaultValue = headPDF + avisoEspaña + footerPDF;
            } else if (subsidiaryText == 'Albya') {
                pdfDoc.defaultValue = headPDF + avisoAlbya + footerPDF;
            } else {
                pdfDoc.defaultValue = headPDF + avisoMexico + footerPDF;
            }

            firma.defaultValue = '<style type="text/css">' +
                '@media only screen and (min-width: 576px) {' +
                '    #texto{' +
                '    text-align: justify;' +
                'font-size:12px;' +
                '    }' +
                '    #fondo{' +
                'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
                'background-size: contain;' +
                'background-repeat: no-repeat;' +
                'margin-left: 40px!important;' +
                'margin-right: 40px!important;' +
                'margin-bottom: 40px;' +
                'padding-bottom: 50px;' +
                'margin-top:10px' +
                '    }' +
                '}' +
                '@media only screen and (min-width: 768px) {' +
                '    #texto{' +
                '    text-align: justify;' +
                'font-size:12px;' +
                '    }' +
                '    #fondo{' +
                'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
                'background-size: contain;' +
                'background-repeat: no-repeat;' +
                'margin-left: 40px!important;' +
                'margin-right: 40px!important;' +
                'margin-bottom: 40px;' +
                'padding-bottom: 50px;' +
                'margin-top:10px' +
                '    }' +
                '    #titulo{' +
                '    padding-top: 180px;' +
                '    }' +
                '}' +
                '@media only screen and (min-width: 768px) {' +
                '    #texto{' +
                '    text-align: justify;' +
                'font-size:12px;' +
                '    }' +
                '    #fondo{' +
                'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
                'background-size: contain;' +
                'background-repeat: no-repeat;' +
                'margin-left: 40px!important;' +
                'margin-right: 40px!important;' +
                'margin-bottom: 40px;' +
                'padding-bottom: 50px;' +
                'margin-top:10px;' +
                '    }' +
                '    #titulo{' +
                '    padding-top: 180px;' +
                '    }' +
                '}' +
                '@media only screen and (min-width: 992px) {' +
                '    #texto{' +
                '    text-align: justify;' +
                'font-size:16px;' +
                '    }' +
                '    #fondo{' +
                'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
                'background-size: cover;' +
                'margin-left: 40px!important;' +
                'margin-right: 40px!important;' +
                'margin-bottom: 40px;' +
                'padding-bottom: 50px;' +
                'margin-top:10px;' +
                '    }' +
                '    #titulo{' +
                '    padding-top: 120px;' +
                '    }' +
                '}' +
                '@media only screen and (min-width: 1200px) {' +
                '    #texto{' +
                '    text-align: justify;' +
                'font-size:16px;' +
                '    }' +
                '    #fondo{' +
                'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
                'background-size: cover;' +
                'margin-left: 40px!important;' +
                'margin-right: 40px!important;' +
                'margin-bottom: 40px;' +
                'padding-bottom: 50px;' +
                'margin-top:10px;' +
                '    }' +
                '    #titulo{' +
                '    padding-top: 120px;' +
                '    }' +
                '}' +

                'footer {' +
                '  color: #5D6975;' +
                '  width: 100%;' +
                '  height: 30px;' +
                '  position: absolute;' +
                '  bottom: 0;' +
                '  border-top: 1px solid #C1CED9;' +
                '  padding: 8px 0;' +
                '  text-align: center;' +
                '}' +
                'body {font-family: Arial, Helvetica, sans-serif;}' +
                '.modal {' +
                '  display: none;' +
                '  position: fixed;' +
                '  z-index: 1; ' +
                '  padding-top: 100px; ' +
                '  left: 0;' +
                '  top: 0;' +
                '  width: 100%; ' +
                '  height: 100%;' +
                '  overflow: auto; ' +
                '  background-color: rgba(0,0,0,0.4);' +
                '}' +
                '' +
                '.modal-content {' +
                '  background-color: #fefefe;' +
                '  margin: auto;' +
                '  padding: 10px;' +
                '  border: 1px solid #888;' +
                '  width: 528px;' +
                '  height: 560px;' +
                '}' +

                'h1 {' +
                '  border-bottom: 1px solid  #5D6975;' +
                '  color: #5D6975;' +
                '  font-size: 2.4em;' +
                '  line-height: 1.4em;' +
                '  font-weight: normal;' +
                '  text-align: center;' +
                '  margin: 0 0 20px 0;' +
                '}' +

                '#notices .notice {' +
                '  color: #5D6975;' +
                '  font-size: 1.2em;' +
                '}' +

/*                 '#scroll {' +
                'border: 1px solid black;' +
                '  overflow-y: auto;' +
                '}' + */

                '</style>' +

                '<div id="myModal" class="modal">' +
                '<div class="modal-content">' +
                '<canvas id="sig-canvas2" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
                '<br /> <b><center>FIRMA DEL PACIENTE<br /></center></b>' +
                '<button id="btn_cerrarFirmaPaciente">Terminar</button>' +
                '</div>' +
                '</div>' +

                '<script type="application/javascript">' +
                'document.addEventListener("touchmove", function(e) {' +
                '  e.preventDefault();' +
                '},' +
                '{ passive: true });' +

                '(function() {' +
                '' +
                '    window.requestAnimFrame = (function (callback) {' +
                '        return window.requestAnimationFrame || ' +
                '                    window.webkitRequestAnimationFrame ||' +
                '                    window.mozRequestAnimationFrame ||' +
                '                    window.oRequestAnimationFrame ||' +
                '                    window.msRequestAnimaitonFrame ||' +
                '                    function (callback) {' +
                '                        window.setTimeout(callback, 1000/60);' +
                '                    };' +

                '    })();' +
                '' +
                '    var canvas2 = document.getElementById("sig-canvas2");' +
                '    var ctx2 = canvas2.getContext("2d");' +
                '    ctx2.strokeStyle = "#222222";' +
                '    ctx2.lineWith = 2;' +
                '' +
                '    var drawing2 = false;' +
                '    var mousePos2 = { x:0, y:0 };' +
                '    var lastPos2 = mousePos2;' +
                '' +
                '    canvas2.addEventListener("mousedown", function (e) {' +
                '        drawing2 = true;' +
                '        lastPos2 = getMousePos(canvas2, e);' +
                '    }, false);' +
                '' +
                '    canvas2.addEventListener("mouseup", function (e) {' +
                '        drawing2 = false;' +
                '    }, false);' +
                '' +
                '    canvas2.addEventListener("mousemove", function (e) {' +
                '        mousePos2 = getMousePos(canvas2, e);' +
                '    }, false);' +
                '' +
                '    canvas2.addEventListener("touchstart", function (e) {' +
                '        mousePos2 = getTouchPos(canvas2, e);' +
                '        var touch = e.touches[0];' +
                '        var mouseEvent = new MouseEvent("mousedown", {' +
                '            clientX: touch.clientX,' +
                '            clientY: touch.clientY' +
                '        });' +
                '        canvas2.dispatchEvent(mouseEvent);' +
                '    }, false);' +
                '' +
                '    canvas2.addEventListener("touchend", function (e) {' +
                '        var mouseEvent = new MouseEvent("mouseup", {});' +
                '        canvas2.dispatchEvent(mouseEvent);' +
                '    }, false);' +
                '' +
                '    canvas2.addEventListener("touchmove", function (e) {' +
                '        var touch = e.touches[0];' +
                '        var mouseEvent = new MouseEvent("mousemove", {' +
                '            clientX: touch.clientX,' +
                '            clientY: touch.clientY' +
                '        });' +
                '        canvas2.dispatchEvent(mouseEvent);' +
                '    }, false);' +
                '' +
                '    document.body.addEventListener("touchstart", function (e) {' +
                '        if (e.target == canvas2) {' +
                '            e.preventDefault();' +
                '        }' +
                '    }, false);' +
                '' +
                '    document.body.addEventListener("touchend", function (e) {' +
                '        if (e.target == canvas2) {' +
                '            e.preventDefault();' +
                '        }' +
                '    }, false);' +
                '' +
                '    document.body.addEventListener("touchmove", function (e) {' +
                '        if (e.target == canvas2) {' +
                '            e.preventDefault();' +
                '        }' +
                '    }, false);' +
                '' +
                '    function getMousePos(canvasDom, mouseEvent) {' +
                '        var rect = canvasDom.getBoundingClientRect();' +
                '        return {' +
                '            x: mouseEvent.clientX - rect.left,' +
                '            y: mouseEvent.clientY - rect.top' +
                '        };' +
                '    }' +
                '' +
                '    function getTouchPos(canvasDom, touchEvent) {' +
                '        var rect = canvasDom.getBoundingClientRect();' +
                '        return {' +
                '            x: touchEvent.touches[0].clientX - rect.left,' +
                '            y: touchEvent.touches[0].clientY - rect.top' +
                '        };' +
                '    }' +
                '' +
                '    function renderCanvas() {' +
                '        if (drawing2) {' +
                '            ctx2.moveTo(lastPos2.x, lastPos2.y);' +
                '            ctx2.lineTo(mousePos2.x, mousePos2.y);' +
                '            ctx2.stroke();' +
                '            lastPos2 = mousePos2;' +
                '        }' +
                '    }' +
                '' +
                '    (function drawLoop() {' +
                '        requestAnimFrame(drawLoop);' +
                '        renderCanvas();' +
                '    })();' +
                '' +
                '})();' +
                '</script>';

            var fieldrecordCaseId = formulario.addField({ id: 'custpage_case', label: 'recordCase', type: 'inlinehtml' });
            fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';

            formulario.addButton({ id: 'custpage_01', label: 'Enviar firma', functionName: 'enviarFirma' });
            formulario.addButton({ id: 'custpage_0111', label: 'Limpiar firma', functionName: 'limpiarFirmaCli' });
            formulario.addButton({ id: 'custpage_0112', label: 'Firmar', functionName: 'abrirModal' });
            formulario.clientScriptFileId = '2106498';

            context.response.writePage(formulario);
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