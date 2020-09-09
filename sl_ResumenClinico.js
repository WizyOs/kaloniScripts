/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

define(['N/record','N/log','N/search','N/xml','N/runtime','N/file','N/format','N/http','N/encode'],

function(record,log,search,xmlMod,runtime,file,format,http,encode) {

    function onRequest(context)
  	{
	  var dateMX = new Date();
      var mxDate = format.format({value: dateMX, type: format.Type.DATETIME, timezone: format.Timezone.AMERICA_MEXICO_CITY});
      var mxDate_Split = mxDate.split('/');
      var dia_MX = ('0' + mxDate_Split[0]).slice(-2);
      var mes_MX = ('0' + mxDate_Split[1]).slice(-2);
      var anio_MX = mxDate_Split[2].substring(0, 4);

      var mxHour_Split = mxDate_Split[2].split(' ');
      var hourAux = mxHour_Split[1].split(':');
      var hourAuxHH = hourAux[0].length > 1 ? hourAux[0] : "0"+hourAux[0];
      var hourAuxMM = hourAux[1].length > 1 ? hourAux[1] : "0"+hourAux[1];
      var hourAuxSS = hourAux[2].length > 1 ? hourAux[2] : "0"+hourAux[2];

      var recId = context.request.parameters.recordCustomerId;
      var customerRec = record.load({type: 'customer', id: recId}); // , isDynamic: true

      //	Encabezado del documento
      var oid_del_identificador_de_documento_1 = "--OID del identificador o sistema generador del documento--";
      var identificador_del_documento_2 = "-- Valor del identificador único del documento --";
      var nombre_corto_del_SIRES_generador_del_documento_3 = "--Nombre del Sistema--";
      var tipo_de_documento_4 = "34133-9 Nota resumen de episodio";
      var nombre_del_tipo_de_documento_5 = "Nota Resumen de Episodio";
      var título_del_documento_6 = "Resumen Clínico";
      var creacion_del_documento_7 = anio_MX + mes_MX + dia_MX + hourAuxHH + hourAuxMM + hourAuxSS;
      var valor_del_nivel_de_confidencialidad_8 = "V-Muy restringido";
      var nombre_del_nivel_de_confidencialidad_9 = "V";
      var oid_del_identificador_del_documento_base_10 = oid_del_identificador_de_documento_1;
      var identificador_del_documento_base_11 = identificador_del_documento_2;
      var nombre_del_sistema_generador_del_documento_base_12 = nombre_corto_del_SIRES_generador_del_documento_3;
      var numero_de_version_del_documento_13 = customerRec.getValue({fieldId: 'custentity399'});
      if(numero_de_version_del_documento_13 == null || numero_de_version_del_documento_13 === "")
        numero_de_version_del_documento_13 = 1;
      else
        numero_de_version_del_documento_13++;

      //	Identificación del paciente
      var oid_del_identificador_unico_de_paciente_14 = "---OID del Identificador único de paciente--";
      var valor_del_identificador_paciente_15 = customerRec.getValue({fieldId: 'entityid'});
      var nombre_del_identificador_del_paciente_16 = valor_del_identificador_paciente_15+" "+customerRec.getValue({fieldId: 'altname'});
      var curp_17 = customerRec.getValue({fieldId: 'custentity398'});
      var nacionalidad_del_paciente_21 = "";
      var nacionalidad_aux = customerRec.getText({fieldId: 'custentity397'});
      var nacionalidad_aux_split = nacionalidad_aux.split(' ');
      var nacionalidad_aux_length = nacionalidad_aux_split.length;
      var ultimaPos = nacionalidad_aux_split[nacionalidad_aux_length];
      if(ultimaPos != null && ultimaPos.length > 1)
        nacionalidad_del_paciente_21 = ultimaPos;
      else
        nacionalidad_del_paciente_21 = nacionalidad_aux_split[nacionalidad_aux_length-1];
      var edad_del_paciente_22 = customerRec.getText({fieldId: 'custentity299'});
      var domicilio_de_residencia_del_paciente_23 = customerRec.getValue({fieldId: 'defaultaddress'});
      var localidad_de_residencia_del_paciente_32 = "--Valor de Localidad de acuerdo al catálogo--"; // lista catalogo pendiente
      var municipio_de_residencia_del_paciente_33 = "--Valor de Municipio de acuerdo al catálogo--"; // lista catalogo pendiente
	  var entidad_de_residencia_del_paciente_34 = "--Valor de Entidad de acuerdo al catálogo--"; // lista catalogo pendiente
      var codigo_postal_de_residencia_del_paciente_35 = "--Valor de Código Postal de acuerdo al catálogo--"; // lista catalogo pendiente
      var pais_de_residencia_del_paciente_36 = "--País--"; // lista catalogo pendiente
      var nombre_del_paciente_39 = customerRec.getValue({fieldId: 'firstname'});
      var primer_apellido_del_paciente_40 = customerRec.getValue({fieldId: 'lastname'});
      var identificador_del_sexo_del_paciente_42 = customerRec.getValue({fieldId: 'custentity_sexo'});
      var descripcion_del_sexo_del_paciente_43 = "";
      if(identificador_del_sexo_del_paciente_42 == 2){
          identificador_del_sexo_del_paciente_42 = "F";
          descripcion_del_sexo_del_paciente_43 = "Femenino";
      }else if(identificador_del_sexo_del_paciente_42 == 1){
          identificador_del_sexo_del_paciente_42 = "M";
          descripcion_del_sexo_del_paciente_43 = "Masculino";
      }else if(identificador_del_sexo_del_paciente_42 == 3){
          identificador_del_sexo_del_paciente_42 = "U";
          descripcion_del_sexo_del_paciente_43 = "Sin diferenciar";
      }else if(identificador_del_sexo_del_paciente_42 == 4){
          identificador_del_sexo_del_paciente_42 = "UNK";
          descripcion_del_sexo_del_paciente_43 = "Se ignora";
      }
      var clave_de_la_entidad_de_nacimiento_del_paciente_51 = "--Valor de la Entidad de acuerdo al catálogo--"; // lista catalogo pendiente

      //	Persona responsable del paciente
	  var domicilio_de_residencia_del_responsable_del_paciente_54 = customerRec.getValue({fieldId: 'custentity400'});
      var localidad_de_residencia_del_responsable_del_paciente_63 = "--Valor de Localidad de acuerdo al catálogo--"; // lista catalogo pendiente
      var municipio_de_residencia_del_responsable_del_paciente_64 = "--Valor de Municipio de acuerdo al catálogo--"; // lista catalogo pendiente
      var entidad_de_residencia_del_responsable_del_paciente_65 = "--Valor de Entidad de acuerdo al catálogo--"; // lista catalogo pendiente
      var codigo_Postal_de_residencia_del_responsable_del_paciente_66 = "--Valor de Código Postal de acuerdo al catálogo--"; // lista catalogo pendiente
      var pais_de_residencia_del_responsable_del_paciente_67 = "--País--"; // lista catalogo pendiente
      var telefono_del_responsable_del_paciente_68 = customerRec.getValue({fieldId: 'custentity401'}); // Debe incluir la clave LADA completa, en formato “LADA Internacional + LADA Nacional + Número”.
      var nombre_del_responsable_del_paciente_70 = customerRec.getValue({fieldId: 'custentity402'});
      var primer_apellido_del_responsable_del_paciente_71 = customerRec.getValue({fieldId: 'custentity403'});

      //	Establecimiento de salud del paciente (opcional) ??
      //	Datos del destinatario del documento (opcional)
      var cedula_profesional_del_medico_solicitante_91 = customerRec.getValue({fieldId: 'custentity404'});
      var telefono_del_medico_solicitante_del_documento_92 = customerRec.getValue({fieldId: 'custentity405'});
      var localidad_de_la_organizacion_donde_se_encuentra_el_medico_solicitante_103 = "--Valor de Localidad de acuerdo al catálogo--"; // lista catalogo pendiente
      var municipio_de_la_organizacion_donde_se_encuentra_el_medico_solicitante_104 = "--Valor de Municipio de acuerdo al catálogo--"; // lista catalogo pendiente
      var entidad_federativa_de_la_organizacion_donde_se_encuentra_el_medico_solicitante_105 = "--Valor de Entidad de acuerdo al catálogo--"; // lista catalogo pendiente
      var codigo_Postal_de_la_organizacion_donde_se_encuentra_el_medico_solicitante_106 = "--Valor de Código Postal de acuerdo al catálogo--"; // lista catalogo pendiente
      var pais_de_la_organizacion_donde_se_encuentra_el_medico_solicitante_107 = "--País--"; // lista catalogo pendiente
      var nombre_del_medico_solicitante_del_documento_108 = customerRec.getValue({fieldId: 'custentity406'});
      var primer_apellido_del_medico_solicitante_del_documento_109 = customerRec.getValue({fieldId: 'custentity407'});
      var oid_de_unidad_organizacional_a_la_que_pertenece_el_medico_solicitante_111 = customerRec.getValue({fieldId: 'custentity408'});
      var clues_del_establecimiento_donde_se_encuentra_el_medico_solicitante_112 = customerRec.getValue({fieldId: 'custentity409'}); // lista catalogo pendiente

      //	Autoría del documento
      var momento_de_autoria_114 = creacion_del_documento_7;
      var oid_identificador_del_sistema_115 = "---OID del sistema que genera el CDA--";
      var nombre_del_software_dispositivo_116 = "--Software, Dispositivo,Producto--";
      var telefono_de_contacto_de_la_organizacion_responsable_de_generar_el_documento_electronico_118 = "525550221056";
      var correo_electronico_de_la_organizacion_responsable_de_generar_el_documento_electronico_119 = "legal@kaloni.com";
      var domicilio_de_la_organizacion_responsable_de_generar_el_documento_electronico_120 = "Avenida Vasco de Quiroga 3900, Interior 401, Col. Santa Fe, Delegación Cuajimalpa, C.P. 05348, Ciudad de México";
      var localidad_de_la_organizacion_responsable_de_generar_el_documento_electronico_129 = "0001";
      var municipio_de_la_organizacion_responsable_de_generar_el_documento_electronico_130 = "CUAJIMALPA DE MORELOS";
      var entidad_de_la_organizacion_responsable_de_generar_el_documento_electronico_131 = "09";
      var codigo_postal_de_la_organizacion_responsable_de_generar_el_documento_electronico_132 = "05348";
      var pais_de_la_organizacion_responsable_de_generar_el_documento_electronico_133 = "223";
      var oid_identificador_de_la_organizacion_responsable_de_generar_el_documento_electronico_134 = "-- OID de la Institución responsable de la autoría del documento electrónico --";
      var nombre_de_la_organizacion_responsable_de_generar_el_doocumento_electronico_135 = "Kaloni Holding Group SC";

      //	Capturista del documento
	  var momento_de_la_captura_de_informacion_136 = creacion_del_documento_7;
      var oid_del_tipo_de_identificador_unico_del_capturista_del_documento_137 = "--OID del sistema de identificador único del usuario capturista--";
      var identificador_unico_del_capturista_del_documento_138 = "--Valor del identificador único del usuario capturista--";
      var userObj = runtime.getCurrentUser();
      var employeeRec = record.load({type: 'employee', id: userObj.id, isDynamic: true});
      var firstName_Emp = employeeRec.getValue({fieldId: 'firstname'});
      var lastname_Emp = employeeRec.getValue({fieldId: 'lastname'});
      var nombre_del_capturista_139 = firstName_Emp;
      var primer_apellido_del_capturista_140 = lastname_Emp;

      //	Responsable del resguardo del documento
      var clues_del_establecimiento_que_custodia_el_documento_142 = "--Valor de la CLUES de acuerdo al catálogo--";
      var nombre_del_establecimiento_que_custodia_el_documento_143 = "KALONI HOLDING GROUP S.C.";
      var domicilio_de_la_organizacion_que_custodia_el_documento_146 = "Avenida Vasco de Quiroga 3900, Interior 401, Col. Santa Fe, Delegación Cuajimalpa, C.P. 05348, Ciudad de México";
      var localidad_de_la_organizacion_que_custodia_el_documento_155 = "0001";
      var municipio_de_la_organizacion_que_custodia_el_documento_156 = "CUAJIMALPA DE MORELOS";
      var entidad_de_la_organizacion_que_custodia_el_documento_157 = "09";
      var codigo_postal_de_la_organizacion_que_custodia_el_documento_158 = "05348";
      var pais_de_la_organizacion_que_custodia_el_documento_159 = "223";

      //	Responsable legal del documento
      var fecha_de_firma_del_responsable_legal_160 = creacion_del_documento_7;
      var codigo_de_firma_del_responsable_legal_161 = "X = Se requiere la firma"; // S = Firmado;
      var localidad_del_domicilio_del_responsable_legal_del_documento_172 = "0001";
      var municipio_del_domicilio_del_responsable_legal_del_documento_173 = "CUAJIMALPA DE MORELOS";
      var entidad_del_domicilio_del_responsable_legal_del_documento_174 = "09";
      var codigo_postal_del_domicilio_del_responsable_legal_del_documento_175 = "05348";
      var pais_del_domicilio_del_responsable_legal_del_documento_176 = "223";
      var nombre_del_responsable_legal_del_documento_179 = "Paola Angelica";
      var primer_apellido_del_responsable_legal_del_documento_180 = "Ortiz";

      //	Episodios de salud
	  var oid_del_identificador_del_episodio_182 = "-- OID del identificador de episodios que se esté ocupando --";
      var valor_de_identificador_unico_del_episodio_183 = "--Valor del Identificador único del episodio--";
      var clave_del_tipo_de_episodio_184 = "";
      var periodo_inicial_del_episodio_186 = "";
      var cedula_profesional_del_medico_responsable_del_episodio_188 = "";
      var nombre_del_medico_responsable_del_episodio_189 = "";
      var primer_apellido_del_medico_responsable_del_episodio_190 = "";
      var clues_del_establecimiento_responsable_del_episodio_192 = "";
      var licencia_sanitaria_del_establecimiento_responsable_del_episodio_193 = "";
      var nombre_del_establecimiento_responsable_del_episodio_194 = "KALONI HOLDING GROUP S.C.";
      var telefono_del_establecimiento_responsable_del_episodio_195 = "";

var myvar = '<?xml version="1.0" encoding="UTF-8"?>'+
'<?xml-stylesheet type="text/xsl" href="https://3559763.app.netsuite.com/core/media/media.nl?id=2586311&c=3559763&h=762f5d4d5c88ffde5e39&_xt=.xml"?>'+
'<ClinicalDocument xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:hl7-org:v3 cda/CDA.xsd" xmlns:mif="urn:hl7-org:v3/mif" xmlns="urn:hl7-org:v3">'+
'    <!--     '+
'     Referirse a la "Guía de Intercambio de Información en Salud para Documentos Clínicos Electrónicos GIIS-A001-CDAMX-01-01" para las definiciones de variables y normatividad a cumplir.'+
'      '+
'     Para conocer más detalle y los derechos de autor de los estándares favor de revisar dicha referencia en www.hl7.org'+
'     -->'+
'    '+
'    <!-- Código para realm de México-->'+
'    <realmCode code="MX"/>'+
'    '+
'    <!-- OID para documentos estándar "HL7 Registered RMIMs"-->'+
'    <typeId root="2.16.840.1.113883.1.3" extension="POCD_HD000040"/>'+
'    '+
'    <!-- Template para Documentos Clínicos en México [*]-->'+
'    <templateId root="2.16.840.1.113883.3.215.11.1.1"/>'+
'    '+

/*
// ________________________________


'    <!-- ******************************************************** ENCABEZADO DEL DOCUMENTO ******************************************************** -->'+
''+
'    <!-- Identificador único de este documento generado'+
'        - root: OID del sistema que genera el documento, o bien, del mecanismo de identificación de documentos que ocupe.'+
'        - extension: UUID o identificador único del documento generado por el sistema emisor.'+
'        - assigningAuthorityName: Nombre (corto) del sistema que está generado el documento (para mayor detalle ver <author>)'+
'    -->'+
'    <id root="'+oid_del_identificador_de_documento_1+'" extension="'+identificador_del_documento_2+'" assigningAuthorityName="'+nombre_corto_del_SIRES_generador_del_documento_3+'"/>'+
'    '+
'    <!-- Tipo de documento (tomar de valores seleccionados para México de LOINC)  -->'+
'    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="'+tipo_de_documento_4+'" displayName="'+nombre_del_tipo_de_documento_5+'"/>'+
'    '+
'    <!-- Título de acuerdo al tipo de CDA que se está generando -->'+
'    <title>'+título_del_documento_6+'</title>'+
'    '+
'    <!-- Momento de generación del CDA en formato aaaammddhhiiss-->'+
'    <effectiveTime value="'+creacion_del_documento_7+'"/>'+
'    '+
'    <!-- Nivel de confidencialidad de acuerdo al catálogo de HL7. Posibles códigos y valores: '+
'           L - Bajo'+
'           M - Moderado'+
'           N - Normal'+
'           R - Restringido'+
'           U - Irrestricto'+
'           V - Muy restringido'+
'    -->'+
'    <confidentialityCode codeSystem="2.16.840.1.113883.5.25" codeSystemName="Confidentiality" code="'+valor_del_nivel_de_confidencialidad_8+'" displayName="'+nombre_del_nivel_de_confidencialidad_9+'"/>'+
'    '+
'    <!-- Código del lenguaje en el que se genera el contenido del documento -->'+
'    <languageCode code="es-MX"/>'+
'    '+
'    <!-- Identificador del documento base (igual al id del documento en caso de la primera versión del mismo) -->'+
'    <setId root="'+oid_del_identificador_del_documento_base_10+'" extension="'+identificador_del_documento_base_11+'" assigningAuthorityName="'+nombre_del_sistema_generador_del_documento_base_12+'"/>'+
'    '+
'    <!-- Versión del documento -->'+
'    <versionNumber value="'+numero_de_version_del_documento_13+'"/>'+
'    '+


// ________________________________


'    <!-- Datos del paciente  -->'+
'    <recordTarget>'+
'        <patientRole>'+
'            <!-- Identificador ÚNICO del paciente en el sistema que genera el documento.'+
'             - root: OID del sistema de identificación.'+
'             - extension: identificador del paciente.'+
'             - assigningAuthorityName:  descripción legible del identificador-->'+
'            <id root="'+oid_del_identificador_unico_de_paciente_14+'" extension="'+valor_del_identificador_paciente_15+'" assigningAuthorityName="'+nombre_del_identificador_del_paciente_16+'"/>'+
'    '+
'            <!-- extension: CURP del paciente -->'+
'            <id root="2.16.840.1.113883.4.629" extension="'+curp_17+'" assigningAuthorityName="CURP"/>'+
'            '+
'            <!-- Otros identificadores relevantes-->'+
'            <id root="--OID Identificador adicional de paciente--" extension="--Identificador adicional de paciente--" assigningAuthorityName="--Nombre del identificador adicional de paciente--"/>'+
'            '+
'            <!-- Nacionalidad del paciente de acuerdo al catálogo de RENAPO-->'+
'            <id root="2.16.840.1.113883.3.215.12.15"  extension="'+nacionalidad_del_paciente_21+'" assigningAuthorityName="Nacionalidad" />'+
'            '+
'            <!-- Edad del paciente en años en el momento de la atención -->'+
'            <id root="2.16.840.1.113883.3.215.12.501" extension="'+edad_del_paciente_22+'" assigningAuthorityName="Edad"/>'+
'            '+
'            <!-- Domicilio de residencia del paciente. En caso de definirse más de un domicilio para el paciente, el de residencia debe ser el primero y con @use="HP"-->'+
'            <addr>'+
'                <!-- El texto del elemento tiene la dirección en formato legible-->'+
'                '+domicilio_de_residencia_del_paciente_23+
'                '+
'                <!--Tipo de vialidad de acuerdo al catálogo de INEGI-->'+
'                <streetNameType>--Valor de tipo de vialidad de acuerdo al catálogo--</streetNameType>'+
'                <!--Nombre de la vialidad -->'+
'                <streetName>--Nombre de la vialidad--</streetName>'+
'                <!--Número exterior (parte numérica)-->'+
'                <houseNumberNumeric>--Número exterior (Numérico)--</houseNumberNumeric>'+
'                <!--Número exterior (parte alfanumérica) -->'+
'                <houseNumber>--Número exterior parte alfanumérica--</houseNumber>'+
'                <!--Número interior (parte numérica) -->'+
'                <unitID>--Número interior (numérico)--</unitID>'+
'                <!--Número interior (parte alfanumérica) -->'+
'                <unitType>--Número interior (alfanumérico)--</unitType>'+
'                <!--Tipo de asentamiento de acuerdo al catálogo de INEGI-->'+
'                <deliveryInstallationType>--Valor de Tipo de asentamiento de acuerdo al catálogo--</deliveryInstallationType>'+
'                <!--Nombre de asentamiento de acuerdo al catálogo de INEGI-->'+
'                <deliveryInstallationArea>--Nombre del asentamiento--</deliveryInstallationArea>'+
'                <!--Localidad de acuerdo al catálogo de INEGI-->'+
'                <precinct>'+localidad_de_residencia_del_paciente_32+'</precinct>'+
'                <!--Muncipio de acuerdo al catálogo de INEGI -->'+
'                <county>'+municipio_de_residencia_del_paciente_33+'</county>'+
'                <!--Entidad de acuerdo al catálogo de INEGI-->'+
'                <state>'+entidad_de_residencia_del_paciente_34+'</state>'+
'                <!--Código Postal de acuerdo al catálogo de SEPOMEX-->'+
'                <postalCode>'+codigo_postal_de_residencia_del_paciente_35+'</postalCode>'+
'                <!--Clave del país de acuerdo al catálogo de nacionalidades-->'+
'                <country>'+pais_de_residencia_del_paciente_36+'</country>'+
'            </addr>'+
'            '+
'            <!--Medios de contacto del paciente, esto es, teléfonos,  correos electrónicos.'+
'             - value: utilizar el prefijo "tel:" para indicar que es un teléfono, "mailto:" para indicar e-mail.'+
'            -->'+
'            <telecom value="tel:--Número telefónico--"/>'+
'            <telecom value="mailto:--ejemplo@correo.com--"/>'+
'            '+
'            <patient>'+
'                <!-- Nombre completo del paciente (nombre y primer apellido)-->'+
'                <name>'+
'                    <!--Nombre(s) del paciente-->'+
'                    <given>'+nombre_del_paciente_39+'</given>'+
'                    <!--Primer apellido del paciente-->'+
'                    <family>'+primer_apellido_del_paciente_40+'</family>'+
'                    <!--Segundo apellido del paciente-->'+
'                    <family>--Segundo apellido--</family>'+
'                </name>'+
'                '+
'                <!-- Sexo del paciente  de acuerdo a catálogo de HL7 referido en el OID. Posibles valores: (F, M, U) o UNK si se desconce)-->'+
'                <administrativeGenderCode codeSystem="2.16.840.1.113883.5.1" codeSystemName="Administrative Gender" code="'+identificador_del_sexo_del_paciente_42+'" displayName="'+descripcion_del_sexo_del_paciente_43+'"/>'+
'                '+
'                <!-- Fecha o fecha-hora de nacimiento del paciente en formato aaaammddhhiiss-->'+
'                <birthTime value="--aaaammddhhiiss--"/>'+
'                '+
'                <!-- Estado civil de acuerdo al catálogo estándar de HL7 '+
'                D - Divorciado(a)'+
'                M - Casado(a)'+
'                U - Soltero(a)'+
'                W - Viudo(a)'+
'                T- Unión Libre'+
'                L - Separado(a)'+
'                -->'+
'                <maritalStatusCode codeSystem="2.16.840.1.113883.5.2" codeSystemName="MaritalStatus" code="--Valor del Estado civil de acuerdo a catálogo--" displayName="--Nombre del Estado civil de acuerdo a catálogo--"/>'+
'                '+
'                <!-- Religión de acuerdo al catálogo de INEGI-->'+
'                <religiousAffiliationCode codeSystem="2.16.840.1.113883.3.215.12.11" codeSystemName="Religiones INEGI" code="--Valor de la Religión de acuerdo a catálogo--" displayName="--Nombre de la Religión de acuerdo a catálogo--"/>'+
'                '+
'                <!-- Grupo étnico / lengua indígena de acuerdo al catálogo de INEGI-->'+
'                <ethnicGroupCode codeSystem="2.16.840.1.113883.3.215.12.10" codeSystemName="Lenguas Indígenas INEGI" code="--Valor de Lengua indígena de acuerdo a catálogo--" displayName="--Nombre de Lengua indígena de acuerdo a catálogo--"/>'+
'                <birthplace>'+
'                    <place>'+
'                        <addr>'+
'	             <!-- Clave de la Entidad federativa de nacimiento de acuerdo al catálogo de INEGI-->'+
'                            <state>'+clave_de_la_entidad_de_nacimiento_del_paciente_51+'</state>'+
'                        </addr>'+
'                    </place>'+
'                </birthplace>'+
'                '+
'                <!-- Datos del responsable legal del paciente (Padre, Tutor, Representante legal, etc.)-->'+
'                <guardian>'+
'                    <!-- Parentesco o relación con el paciente ver catálogo HL7: http://wiki.hl7.de/index.php/2.16.840.1.113883.5.111 -->'+
'                    <code codeSystem="2.16.840.1.113883.5.111" codeSystemName="Role Code" code="--Valor del Parentesco de acuerdo al catálogo--" displayName="--Nombre del Parentesco de acuerdo al catálogo--"/>'+
'                    '+
'                    <!-- Domicilio del responsable del paciente -->'+
'                    <addr>'+
'                        <!-- El texto del elemento tiene la dirección en formato legible-->'+
'                        '+domicilio_de_residencia_del_responsable_del_paciente_54+
'                        '+
'                        <!--Tipo de vialidad de acuerdo al catálogo de INEGI-->'+
'                        <streetNameType>--Valor de tipo de vialidad de acuerdo al catálogo--</streetNameType>'+
'                        <!--Nombre de la vialidad -->'+
'                        <streetName>--Nombre de la vialidad--</streetName>'+
'                        <!--Número exterior (parte numérica)-->'+
'                        <houseNumberNumeric>--Número exterior (Numérico)--</houseNumberNumeric>'+
'                        <!--Número exterior (parte alfanumérica) -->'+
'                        <houseNumber>--Número exterior parte alfanumérica--</houseNumber>'+
'                        <!--Número interior (parte numérica) -->'+
'                        <unitID>--Número interior (numérico)--</unitID>'+
'                        <!--Número interior (parte alfanumérica) -->'+
'                        <unitType>--Número interior (alfanumérico)--</unitType>'+
'                        <!--Tipo de asentamiento de acuerdo al catálogo de INEGI-->'+
'                        <deliveryInstallationType>--Valor de Tipo de asentamiento de acuerdo al catálogo--</deliveryInstallationType>'+
'                        <!--Nombre de asentamiento de acuerdo al catálogo de INEGI-->'+
'                        <deliveryInstallationArea>--Nombre del asentamiento--</deliveryInstallationArea>'+
'                        <!--Localidad de acuerdo al catálogo de INEGI-->'+
'                        <precinct>'+localidad_de_residencia_del_responsable_del_paciente_63+'</precinct>'+
'                        <!--Muncipio de acuerdo al catálogo de INEGI -->'+
'                        <county>'+municipio_de_residencia_del_responsable_del_paciente_64+'</county>'+
'                        <!--Entidad de acuerdo al catálogo de INEGI-->'+
'                        <state>'+entidad_de_residencia_del_responsable_del_paciente_65+'</state>'+
'                        <!--Código Postal de acuerdo al catálogo de SEPOMEX-->'+
'                        <postalCode>'+codigo_Postal_de_residencia_del_responsable_del_paciente_66+'</postalCode>'+
'                        <!--Clave del país de acuerdo al catálogo de nacionalidades-->'+
'                        <country>'+pais_de_residencia_del_responsable_del_paciente_67+'</country>'+
'                    </addr>'+
'                    '+
'                    <!-- Medios de contacto del responsable del paciente (1:N): teléfono, correo, etc. -->'+
'                    <telecom value="tel:'+telefono_del_responsable_del_paciente_68+'"/>'+
'                    <telecom value="mailto:--Correo electrónico--"/>'+
'		'+
'                    <guardianPerson>'+
'                        <!-- Nombre completo del responsable legal del paciente -->'+
'                        <name>'+
'                            <!--Nombre(s) del responsable del paciente-->'+
'                            <given>'+nombre_del_responsable_del_paciente_70+'</given>'+
'                            <!--Primer apellido del responsable del paciente-->'+
'                            <family>'+primer_apellido_del_responsable_del_paciente_71+'</family>'+
'                            <!--Segundo apellido del responsable del paciente-->'+
'                            <family>--Segundo apellido--</family>'+
'                        </name>'+
'                    </guardianPerson>'+
'                </guardian>'+
'            </patient>'+
'            '+


    // ________________________________


'            <!-- Datos de la unidad a la que pertenece el paciente-->'+
'            <providerOrganization>'+
'                <!-- Clave Única de Establecimiento de Salud de atención de acuerdo al catálogo de CLUES de la SS/DGIS-->'+
'                <id root="2.16.840.1.113883.4.631" extension="--Valor de la CLUES de acuerdo al catálogo--" assigningAuthorityName="CLUES"/>'+
'                <!-- Nombre del establecimiento de atención-->'+
'                <name>--Nombre del Establecimiento de salud de acuerdo al catálogo de CLUES--</name>'+
'                '+
'                <!-- Medios de contacto del establecimiento  -->'+
'                <telecom value="tel:--Número telefónico--"/>'+
'                <telecom value="mailto:--Correo electrónico--"/>'+
'                '+
'                <!-- Domicilio del establecimiento  -->'+
'                <addr>'+
'                    <!-- El texto del elemento tiene la dirección en formato legible-->'+
'                    -- Domicilio completo en texto libre--'+
'                    '+
'                    <!--Tipo de vialidad de acuerdo al catálogo de INEGI-->'+
'                    <streetNameType>--Valor de tipo de vialidad de acuerdo al catálogo--</streetNameType>'+
'                    <!--Nombre de la vialidad -->'+
'                    <streetName>--Nombre de la vialidad--</streetName>'+
'                    <!--Número exterior (parte numérica)-->'+
'                    <houseNumberNumeric>--Número exterior (Numérico)--</houseNumberNumeric>'+
'                    <!--Número exterior (parte alfanumérica) -->'+
'                    <houseNumber>--Número exterior parte alfanumérica--</houseNumber>'+
'                    <!--Número interior (parte numérica) -->'+
'                    <unitID>--Número interior (numérico)--</unitID>'+
'                    <!--Número interior (parte alfanumérica) -->'+
'                    <unitType>--Número interior (alfanumérico)--</unitType>'+
'                    <!--Tipo de asentamiento de acuerdo al catálogo de INEGI-->'+
'                    <deliveryInstallationType>--Valor de Tipo de asentamiento de acuerdo al catálogo--</deliveryInstallationType>'+
'                    <!--Nombre de asentamiento de acuerdo al catálogo de INEGI-->'+
'                    <deliveryInstallationArea>--Nombre del asentamiento--</deliveryInstallationArea>'+
'                    <!--Localidad de acuerdo al catálogo de INEGI-->'+
'                    <precinct>--Valor de Localidad de acuerdo al catálogo--</precinct>'+
'                    <!--Muncipio de acuerdo al catálogo de INEGI -->'+
'                    <county>--Valor de Municipio de acuerdo al catálogo--</county>'+
'                    <!--Entidad de acuerdo al catálogo de INEGI-->'+
'                    <state>--Valor de Entidad de acuerdo al catálogo--</state>'+
'                    <!--Código Postal de acuerdo al catálogo de SEPOMEX-->'+
'                    <postalCode>--Valor de Código Postal de acuerdo al catálogo--</postalCode>'+
'                    <!--Clave del país de acuerdo al catálogo de nacionalidades-->'+
'                    <country>--País--</country>'+
'                </addr>'+
'                '+
'            </providerOrganization>'+
'        </patientRole>'+
'    </recordTarget>'+
'    '+


	// ________________________________


'    <!-- Datos del destinatario del documento-->'+
'    <informationRecipient>'+
'        <intendedRecipient>'+
'            <!--extension: Cédula profesional del médico destinatario-->'+
'            <id root=\'2.16.840.1.113883.3.215.12.18\' extension="'+cedula_profesional_del_medico_solicitante_91+'"/>'+
'            <!-- Medios de contacto del destinatario del documento -->'+
'            <telecom value="tel:'+telefono_del_medico_solicitante_del_documento_92+'"/>'+
'            <telecom value="mailto:--Correo Electrónico--"/>'+
'            <!-- Ubicación del destinatario del documento -->'+
'            <addr>'+
'                <!-- El texto del elemento tiene la dirección en formato legible-->'+
'                -- Domicilio completo en texto libre--'+
'                '+
'                <!--Tipo de vialidad de acuerdo al catálogo de INEGI-->'+
'                <streetNameType>--Valor de tipo de vialidad de acuerdo al catálogo--</streetNameType>'+
'                <!--Nombre de la vialidad -->'+
'                <streetName>--Nombre de la vialidad--</streetName>'+
'                <!--Número exterior (parte numérica)-->'+
'                <houseNumberNumeric>--Número exterior (Numérico)--</houseNumberNumeric>'+
'                <!--Número exterior (parte alfanumérica) -->'+
'                <houseNumber>--Número exterior parte alfanumérica--</houseNumber>'+
'                <!--Número interior (parte numérica) -->'+
'                <unitID>--Número interior (numérico)--</unitID>'+
'                <!--Número interior (parte alfanumérica) -->'+
'                <unitType>--Número interior (alfanumérico)--</unitType>'+
'                <!--Tipo de asentamiento de acuerdo al catálogo de INEGI-->'+
'                <deliveryInstallationType>--Valor de Tipo de asentamiento de acuerdo al catálogo--</deliveryInstallationType>'+
'                <!--Nombre de asentamiento de acuerdo al catálogo de INEGI-->'+
'                <deliveryInstallationArea>--Nombre del asentamiento--</deliveryInstallationArea>'+
'                <!--Localidad de acuerdo al catálogo de INEGI-->'+
'                <precinct>'+localidad_de_la_organizacion_donde_se_encuentra_el_medico_solicitante_103+'</precinct>'+
'                <!--Muncipio de acuerdo al catálogo de INEGI -->'+
'                <county>'+municipio_de_la_organizacion_donde_se_encuentra_el_medico_solicitante_104+'</county>'+
'                <!--Entidad de acuerdo al catálogo de INEGI-->'+
'                <state>'+entidad_federativa_de_la_organizacion_donde_se_encuentra_el_medico_solicitante_105+'</state>'+
'                <!--Código Postal de acuerdo al catálogo de SEPOMEX-->'+
'                <postalCode>'+codigo_Postal_de_la_organizacion_donde_se_encuentra_el_medico_solicitante_106+'</postalCode>'+
'                <!--Clave del país de acuerdo al catálogo de nacionalidades-->'+
'                <country>'+pais_de_la_organizacion_donde_se_encuentra_el_medico_solicitante_107+'</country>'+
'            </addr>'+
'            <informationRecipient>'+
'                <!-- Nombre completo del destinatario (i.e. médico consultado) al que se dirige este CDA -->'+
'                <name>'+
'                    <!--Nombre(s) del destinatario del documento-->'+
'                    <given>'+nombre_del_medico_solicitante_del_documento_108+'</given>'+
'                    <!--Primer apellido del destinatario del documento-->'+
'                    <family>'+primer_apellido_del_medico_solicitante_del_documento_109+'</family>'+
'                    <!--Segundo apellido del destinatario del documento-->'+
'                    <family>--Segundo apellido--</family>'+
'                </name>'+
'            </informationRecipient>'+
'            <receivedOrganization>'+
'                <!-- OID de la institución a la que pertenece el destinatario -->'+
'                <id root="'+oid_de_unidad_organizacional_a_la_que_pertenece_el_medico_solicitante_111+'"/>'+
'                <!-- Clave Única de Establecimiento de Salud donde se encuentra el destinatario de acuerdo al catálogo de CLUES de la SS/DGIS-->'+
'                <id root="2.16.840.1.113883.4.631" extension="'+clues_del_establecimiento_donde_se_encuentra_el_medico_solicitante_112+'" assigningAuthorityName="CLUES"/>'+
'                <!-- Nombre de la institución a la que pertenece el destinatario -->'+
'                <name>--Nombre de la institución/organización/dependencia a la que pertenece el destinatario--</name>'+
'            </receivedOrganization>'+
'        </intendedRecipient>'+
'    </informationRecipient>'+
'    '+


	// ________________________________


'    <!-- Autor (Sistema que genera el CDA e institución) -->'+
'    <author>'+
'        <!-- Momento de generación del CDA, o bien, momento en el que se obtienen los datos para generarlo -->'+
'        <time value="'+momento_de_autoria_114+'"/>'+
'        <assignedAuthor>'+
'            <!-- OID del sistema que genera el CDA -->'+
'            <id root="'+oid_identificador_del_sistema_115+'"/>'+
'            <assignedAuthoringDevice>'+
'                <!-- Nombre del sistema (Fabricante, Producto, Versión) que genera el documento electrónico -->'+
'                <softwareName>'+nombre_del_software_dispositivo_116+'</softwareName>'+
'                <!-- Descripción (fabricante, modelo) del dispositivo que genera el documento electrónico -->'+
'                <manufacturerModelName>--Versión del software, modelo del dispositivo o producto--</manufacturerModelName>                '+
'            </assignedAuthoringDevice>'+
'            <!-- Medios de contacto de la institución responsable de la autoría del documento electrónico -->'+
'            <telecom value="tel:'+telefono_de_contacto_de_la_organizacion_responsable_de_generar_el_documento_electronico_118+'"/>'+
'            <telecom value="mailto:'+correo_electronico_de_la_organizacion_responsable_de_generar_el_documento_electronico_119+'"/>'+
'            <!-- Domicilio "legible" de la institución responsable de la autoría del documento electrónico -->'+
'            <addr>'+
'                <!-- El texto del elemento tiene la dirección en formato legible-->'+
'                '+domicilio_de_la_organizacion_responsable_de_generar_el_documento_electronico_120+
'                '+
'                <!--Tipo de vialidad de acuerdo al catálogo de INEGI-->'+
'                <streetNameType>--Valor de tipo de vialidad de acuerdo al catálogo--</streetNameType>'+
'                <!--Nombre de la vialidad -->'+
'                <streetName>--Nombre de la vialidad--</streetName>'+
'                <!--Número exterior (parte numérica)-->'+
'                <houseNumberNumeric>--Número exterior (Numérico)--</houseNumberNumeric>'+
'                <!--Número exterior (parte alfanumérica) -->'+
'                <houseNumber>--Número exterior parte alfanumérica--</houseNumber>'+
'                <!--Número interior (parte numérica) -->'+
'                <unitID>--Número interior (numérico)--</unitID>'+
'                <!--Número interior (parte alfanumérica) -->'+
'                <unitType>--Número interior (alfanumérico)--</unitType>'+
'                <!--Tipo de asentamiento de acuerdo al catálogo de INEGI-->'+
'                <deliveryInstallationType>--Valor de Tipo de asentamiento de acuerdo al catálogo--</deliveryInstallationType>'+
'                <!--Nombre de asentamiento de acuerdo al catálogo de INEGI-->'+
'                <deliveryInstallationArea>--Nombre del asentamiento--</deliveryInstallationArea>'+
'                <!--Localidad de acuerdo al catálogo de INEGI-->'+
'                <precinct>'+localidad_de_la_organizacion_responsable_de_generar_el_documento_electronico_129+'</precinct>'+
'                <!--Muncipio de acuerdo al catálogo de INEGI -->'+
'                <county>'+municipio_de_la_organizacion_responsable_de_generar_el_documento_electronico_130+'</county>'+
'                <!--Entidad de acuerdo al catálogo de INEGI-->'+
'                <state>'+entidad_de_la_organizacion_responsable_de_generar_el_documento_electronico_131+'</state>'+
'                <!--Código Postal de acuerdo al catálogo de SEPOMEX-->'+
'                <postalCode>'+codigo_postal_de_la_organizacion_responsable_de_generar_el_documento_electronico_132+'</postalCode>'+
'                <!--Clave del país de acuerdo al catálogo de nacionalidades-->'+
'                <country>'+pais_de_la_organizacion_responsable_de_generar_el_documento_electronico_133+'</country>'+
'            </addr>'+
'            <representedOrganization>'+
'                <!-- OID de la institución responsable de la autoría del documento electrónico -->'+
'                <id root="'+oid_identificador_de_la_organizacion_responsable_de_generar_el_documento_electronico_134+'"/>'+
'                <!-- Nombre de la institución responsable de la autoría del documento -->'+
'                <name>'+nombre_de_la_organizacion_responsable_de_generar_el_doocumento_electronico_135+'</name>'+
'            </representedOrganization>'+
'        </assignedAuthor>'+
'    </author>'+
'    '+


	// ________________________________


'    <!-- Datos de identificación del Capturista de los datos del documento electrónico -->'+
'    <dataEnterer>'+
'        <!-- Momento en que el usuario introdujo los datos del documento en el software. Formato de fecha aaaammddhhiiss-->'+
'        <time value="'+momento_de_la_captura_de_informacion_136+'"/>'+
'        <assignedEntity>'+
'            <!-- Identificador único del usuario que introduce los datos en el software'+
'             - root: OID del sistema de identificación de usuarios, puede ser uno propio o uno estándar como la cédula profesional'+
'             - extension: Valor del dentificador del usuario-->'+
'            <id root="'+oid_del_tipo_de_identificador_unico_del_capturista_del_documento_137+'" extension="'+identificador_unico_del_capturista_del_documento_138+'"/>'+
'            <assignedPerson>'+
'                    <!-- Nombre completo del usuario capturista de este documento -->'+
'                    <name>'+
'                    	<!--Nombre(s) del Capturista del documento-->'+
'                    	<given>'+nombre_del_capturista_139+'</given>'+
'                    	<!--Primer apellido del Capturista del documento-->'+
'                    	<family>'+primer_apellido_del_capturista_140+'</family>'+
'                    	<!--Segundo apellido del Capturista del documento-->'+
'                    	<family>--Segundo apellido--</family>'+
'                    </name>'+
'            </assignedPerson>'+
'        </assignedEntity>'+
'    </dataEnterer>'+
'    '+


// ________________________________


'    <!-- Responsable del archivamiento, esto es, resguardo del CDA y su documentación original -->'+
'    <custodian>'+
'        <assignedCustodian>'+
'            <representedCustodianOrganization>'+
'                <!-- Clave Única del Establecimiento de Salud de acuerdo al catálogo CLUES de la SS/DGIS donde se encuentra la documentación física respaldo de este documento electrónico -->'+
'                <id root="2.16.840.1.113883.4.631" extension="'+clues_del_establecimiento_que_custodia_el_documento_142+'" assigningAuthorityName="CLUES"/>'+
'                <!-- Nombre del establecimiento donde se encuentra la documentación física respaldo de este documento electrónico -->'+
'                <name>'+nombre_del_establecimiento_que_custodia_el_documento_143+'</name>'+
'                <!-- Medios de contacto del establecimiento donde se encuentra la documentación física respaldo de este documento electrónico -->'+
'                <telecom value="tel:--Número telefónico--"/>'+
'                <telecom value="mailto:--Correo Electrónico--"/>'+
'                '+
'                <!-- Domicilio del establecimiento que resguarda la información -->'+
'                <addr>'+
'                    <!-- El texto del elemento tiene la dirección en formato legible-->'+
'                    '+domicilio_de_la_organizacion_que_custodia_el_documento_146+
'                    '+
'                    <!--Tipo de vialidad de acuerdo al catálogo de INEGI-->'+
'                    <streetNameType>--Valor de tipo de vialidad de acuerdo al catálogo--</streetNameType>'+
'                    <!--Nombre de la vialidad -->'+
'                    <streetName>--Nombre de la vialidad--</streetName>'+
'                    <!--Número exterior (parte numérica)-->'+
'                    <houseNumberNumeric>--Número exterior (Numérico)--</houseNumberNumeric>'+
'                    <!--Número exterior (parte alfanumérica) -->'+
'                    <houseNumber>--Número exterior parte alfanumérica--</houseNumber>'+
'                    <!--Número interior (parte numérica) -->'+
'                    <unitID>--Número interior (numérico)--</unitID>'+
'                    <!--Número interior (parte alfanumérica) -->'+
'                    <unitType>--Número interior (alfanumérico)--</unitType>'+
'                    <!--Tipo de asentamiento de acuerdo al catálogo de INEGI-->'+
'                    <deliveryInstallationType>--Valor de Tipo de asentamiento de acuerdo al catálogo--</deliveryInstallationType>'+
'                    <!--Nombre de asentamiento de acuerdo al catálogo de INEGI-->'+
'                    <deliveryInstallationArea>--Nombre del asentamiento--</deliveryInstallationArea>'+
'                    <!--Localidad de acuerdo al catálogo de INEGI-->'+
'                    <precinct>'+localidad_de_la_organizacion_que_custodia_el_documento_155+'</precinct>'+
'                    <!--Muncipio de acuerdo al catálogo de INEGI -->'+
'                    <county>'+municipio_de_la_organizacion_que_custodia_el_documento_156+'</county>'+
'                    <!--Entidad de acuerdo al catálogo de INEGI-->'+
'                    <state>'+entidad_de_la_organizacion_que_custodia_el_documento_157+'</state>'+
'                    <!--Código Postal de acuerdo al catálogo de SEPOMEX-->'+
'                    <postalCode>'+codigo_postal_de_la_organizacion_que_custodia_el_documento_158+'</postalCode>'+
'                    <!--Clave del país de acuerdo al catálogo de nacionalidades-->'+
'                    <country>'+pais_de_la_organizacion_que_custodia_el_documento_159+'</country>'+
'                </addr>'+
'            </representedCustodianOrganization>'+
'        </assignedCustodian>'+
'    </custodian>'+
'    '+


// ________________________________


'    <!-- Responsable legal "firmante" de este documento -->'+
'    <legalAuthenticator>'+
'        <!-- Momento de firma del documento en formato "aaaammddhhiiss"-->'+
'        <time value="'+fecha_de_firma_del_responsable_legal_160+'"/>'+
'        <!--Código para determinar si el documento fué firmado y puede terner los siguientes valores:'+
'            S = Firmado.'+
'            X  = Se requiere la firma'+
'        -->'+
'        <signatureCode code="'+codigo_de_firma_del_responsable_legal_161+'"/>'+
'        <assignedEntity>'+
'            <!-- extension: Cédula profesional del médico responsable legal del documento -->'+
'            <id root="2.16.840.1.113883.3.215.12.18" extension="--Número de cédula profesional--"/>'+
'            <!-- Domicilio del responsable legal del documento -->'+
'            <addr>'+
'                <!-- El texto del elemento tiene la dirección en formato legible-->'+
'                -- Domicilio completo en texto libre--'+
'                '+
'                <!--Tipo de vialidad de acuerdo al catálogo de INEGI-->'+
'                <streetNameType>--Valor de tipo de vialidad de acuerdo al catálogo--</streetNameType>'+
'                <!--Nombre de la vialidad -->'+
'                <streetName>--Nombre de la vialidad--</streetName>'+
'                <!--Número exterior (parte numérica)-->'+
'                <houseNumberNumeric>--Número exterior (Numérico)--</houseNumberNumeric>'+
'                <!--Número exterior (parte alfanumérica) -->'+
'                <houseNumber>--Número exterior parte alfanumérica--</houseNumber>'+
'                <!--Número interior (parte numérica) -->'+
'                <unitID>--Número interior (numérico)--</unitID>'+
'                <!--Número interior (parte alfanumérica) -->'+
'                <unitType>--Número interior (alfanumérico)--</unitType>'+
'                <!--Tipo de asentamiento de acuerdo al catálogo de INEGI-->'+
'                <deliveryInstallationType>--Valor de Tipo de asentamiento de acuerdo al catálogo--</deliveryInstallationType>'+
'                <!--Nombre de asentamiento de acuerdo al catálogo de INEGI-->'+
'                <deliveryInstallationArea>--Nombre del asentamiento--</deliveryInstallationArea>'+
'                <!--Localidad de acuerdo al catálogo de INEGI-->'+
'                <precinct>'+localidad_del_domicilio_del_responsable_legal_del_documento_172+'</precinct>'+
'                <!--Muncipio de acuerdo al catálogo de INEGI -->'+
'                <county>'+municipio_del_domicilio_del_responsable_legal_del_documento_173+'</county>'+
'                <!--Entidad de acuerdo al catálogo de INEGI-->'+
'                <state>'+entidad_del_domicilio_del_responsable_legal_del_documento_174+'</state>'+
'                <!--Código Postal de acuerdo al catálogo de SEPOMEX-->'+
'                <postalCode>'+codigo_postal_del_domicilio_del_responsable_legal_del_documento_175+'</postalCode>'+
'                <!--Clave del país de acuerdo al catálogo de nacionalidades-->'+
'                <country>'+pais_del_domicilio_del_responsable_legal_del_documento_176+'</country>'+
'            </addr>'+
'            <!-- Medios de contacto del responsable legal del documento -->'+
'            <telecom value="tel:--Número telefónico--"/>'+
'            <telecom value="mailto:--Correo Electrónico--"/>'+
'            <assignedPerson>'+
'                <!-- Nombre completo del responsable legal que firma el documento -->'+
'                <name>'+
'                    <!--Nombre(s) del Responsable legal del documento-->'+
'                    <given>'+nombre_del_responsable_legal_del_documento_179+'</given>'+
'                    <!--Primer apellido del Responsable legal del documento-->'+
'                    <family>'+primer_apellido_del_responsable_legal_del_documento_180+'</family>'+
'                    <!--Segundo apellido del Responsable legal del documento-->'+
'                    <family>--Segundo apellido--</family>'+
'                </name>'+
'            </assignedPerson>'+
'        </assignedEntity>'+
'    </legalAuthenticator>'+
'    '+


// ________________________________
*/

'    <!-- Datos del "episodio" (periodo de tiempo con una o más atenciones relacionadas con un problema) que documenta este CDA -->'+
'    <documentationOf typeCode="DOC">'+
'        <serviceEvent classCode="PCPR">'+
'            <!-- Identificador único del "episodio" dentro del sistema que genera este documento'+
'             - root: OID del identificador de episodios que se esté ocupando'+
'             - extension: Valor del identificador -->'+
'            <id root="'+oid_del_identificador_del_episodio_182+'" extension="'+valor_de_identificador_unico_del_episodio_183+'"/>'+
'            <!-- Tipo de episodio que está documentando este CDA de acuerdo al catálogo de HL7'+
'             - Clave - Descripción del tipo de episodio:'+
'                 EMER - Emergencias'+
'                 IMP - Hospitalización'+
'                 AMB - Ambulatorio'+
'                 HH - Cuidados caseros'+
'                 ACUTE - Cuidados intensivos / Hospitalización aguda'+
'            -->'+
'            <code codeSystem="2.16.840.1.113883.5.4" codeSystemName="actCode" code="--Valor del Tipo de episodio de acuerdo al catálogo--" displayName="Nombre del Tipo de episodio de acuerdo al catálogo"/>'+
'			<!-- Periodo de tiempo que comprende el episodio -->'+
'            <effectiveTime>'+
'                <!-- Fecha (hora) en el formato "aaaammddhhiiss" de inicio del episodio copmrendido por este documento -->'+
'                <low value="--aaaammddhhiiss--"/>'+
'                <!-- Fecha (hora) en el formato "aaaammddhhiiss" de fin del episodio comprendido por este documento -->'+
'                <high value="--aaaammddhhiiss--"/>'+
'            </effectiveTime>'+
'            <!-- Datos del médico responsable'+
'                 (En caso de que se deseen incluir responsables adicionales al principal, modificar functionCode =\'PP\')'+
'                 Solo se tienen 3 valores permitidos:'+
'                 PP - Médico Responsable'+
'                 CP - Médico Consultado'+
'                 RP - Médico Referido.'+
'            -->'+
'            <performer typeCode="PRF">'+
'                <functionCode codeSystem="2.16.840.1.113883.12.443" codeSystemName="Provider Role" code="PP" displayName="Primary Care Provider"/>'+
'                <assignedEntity>'+
'                    <!-- extension: Cédula profesional del médico responsable -->'+
'                    <id root="2.16.840.1.113883.3.215.12.18" extension="--Valor de la Cédula profesional del médico responsable--"/>'+
'                    <assignedPerson>'+
'                        <name>'+
'                            <!-- Nombre completo del médico responsable-->'+
'                            <given>--Nombre(s)--</given>'+
'                            <!--Primer apellido del médico responsable-->'+
'                            <family>--Primer apellido--</family>'+
'                            <!--Segundo apellido del médico responsable-->'+
'                            <family>--Segundo apellido--</family>'+
'                        </name>'+
'                    </assignedPerson>'+
'                    <representedOrganization>'+
'                        <!-- extension: Clave Única del Establecimiento de Salud responsable del episodio, de acuerdo al catálogo de CLUES de la SS/DGIS -->'+
'                        <id root="2.16.840.1.113883.4.631" extension="--Clave CLUES de acuerdo al catálogo--" assigningAuthorityName="CLUES"/>'+
'                        <!-- extension: Licencia sanitaria del establecimiento responsable del episodio  -->'+
'                        <id root="2.16.840.1.113883.3.215.1.1" extension="--Valor de la Licencia Sanitaria--" assigningAuthorityName="Licencia Sanitaria"/>'+
'                        <!-- Nombre del establecimiento de salud responsable del episodio de acuerdo al catálogo de CLUES -->'+
'                        <name>--Nombre del establecimiento de salud responsable del episodio--</name>'+
'                        <!-- Medios de contacto del establecimiento responsable del episodio -->'+
'                        <telecom value="tel:--Número telefónico--"/>'+
'                        <telecom value="mailto:--Correo electrónico--"/>'+
'                        <!-- Dirección legible del establecimiento responsable del episodio -->'+
'                        <addr>'+
'                            <!-- El texto del elemento tiene la dirección en formato legible-->'+
'                            -- Domicilio completo en texto libre--'+
'                            '+
'                            <!--Tipo de vialidad de acuerdo al catálogo de INEGI-->'+
'                            <streetNameType>--Valor de tipo de vialidad de acuerdo al catálogo--</streetNameType>'+
'                            <!--Nombre de la vialidad -->'+
'                            <streetName>--Nombre de la vialidad--</streetName>'+
'                            <!--Número exterior (parte numérica)-->'+
'                            <houseNumberNumeric>--Número exterior (Numérico)--</houseNumberNumeric>'+
'                            <!--Número exterior (parte alfanumérica) -->'+
'                            <houseNumber>--Número exterior parte alfanumérica--</houseNumber>'+
'                            <!--Número interior (parte numérica) -->'+
'                            <unitID>--Número interior (numérico)--</unitID>'+
'                            <!--Número interior (parte alfanumérica) -->'+
'                            <unitType>--Número interior (alfanumérico)--</unitType>'+
'                            <!--Tipo de asentamiento de acuerdo al catálogo de INEGI-->'+
'                            <deliveryInstallationType>--Valor de Tipo de asentamiento de acuerdo al catálogo--</deliveryInstallationType>'+
'                            <!--Nombre de asentamiento de acuerdo al catálogo de INEGI-->'+
'                            <deliveryInstallationArea>--Nombre del asentamiento--</deliveryInstallationArea>'+
'                            <!--Localidad de acuerdo al catálogo de INEGI-->'+
'                            <precinct>--Valor de Localidad de acuerdo al catálogo--</precinct>'+
'                            <!--Muncipio de acuerdo al catálogo de INEGI -->'+
'                            <county>--Valor de Municipio de acuerdo al catálogo--</county>'+
'                            <!--Entidad de acuerdo al catálogo de INEGI-->'+
'                            <state>--Valor de Entidad de acuerdo al catálogo--</state>'+
'                            <!--Código Postal de acuerdo al catálogo de SEPOMEX-->'+
'                            <postalCode>--Valor de Código Postal de acuerdo al catálogo--</postalCode>'+
'                            <!--Clave del país de acuerdo al catálogo de nacionalidades-->'+
'                            <country>--País--</country>'+
'                        </addr>'+
'                    </representedOrganization>'+
'                </assignedEntity>'+
'            </performer>'+
'        </serviceEvent>'+
'    </documentationOf>'+
'    '+
    
    
    
    
    
'    <!-- Documentación del "encuentro".'+
'         Incluir si este CDA documenta únicamente una atención o parte de ella y los datos son diferentes a los del episodio completo.'+
'         Por ejemplo si esta es la nota RESULTANTE de una interconsulta o contrarreferencia.  -->'+
'    <componentOf>'+
'        <encompassingEncounter>'+
'            <!-- Identificador único del "encuentro" dentro del sistema que genera este documento: '+
'                         - root OID del identificador de encuentros que se esté ocupando'+
'                         - extension Valor del identificador -->'+
'            <id root="--OID del identificador de encuentros que se esté ocupando--" extension="--Valor del identificador de encuentros que se esté ocupando--"/>'+
'            <!-- Tipo de encuentro que está documentando este CDA (ActEncounterCode):'+
'                        AMB - Ambulatorio'+
'                        EMER - Emergencia'+
'                        IMP - Hospitalización'+
'                        SS - Corta Estancia'+
'                        HH - Casero'+
'                        FLD - Fuera del establecimiento de salud'+
'                        VR - Virtual (Telesalud)'+
'             -->'+
'            <code codeSystem="2.16.840.1.113883.5.4" codeSystemName="actCode" code="--Valor del Tipo de encuentro--" displayName="--Nombre del Tipo de encuentro--"/>'+
'            <!--Periodo de tiempo en el cual ocurrio el encuentro clínico registrado en el documento-->'+
'            <effectiveTime>'+
'                 <!-- Fecha (hora) de inicio del encuentro registrado en el documento en formato "aaaammddhhiiss"-->'+
'                <low value="--aaaammddhhiiss--"/>'+
'                <!-- Fecha (hora) de fin del encuentro registrado en el documento en formato "aaaammddhhiiss"-->'+
'                <high value="--aaaammddhhiiss--"/>'+
'            </effectiveTime>'+
'            '+
'            <!-- Datos del responsable del "encuentro", que pueden ser diferentes a los del episodio completo.-->'+
'            <responsibleParty>'+
'                <assignedEntity>'+
'                    <!-- extension: Cédula profesional del médico consultado -->'+
'                    <id root="2.16.840.1.113883.3.215.12.18" extension="--Valor de la cédula profesional del médico consultado--"/>'+
'                    <assignedPerson>'+
'                        <!-- Nombre completo del médico consutlado (Requerido, si se incluye la sección de "encuentro") -->'+
'                        <name>'+
'                            <!-- Nombre completo del médico responsable del encuentro-->'+
'                            <given>--Nombre(s)--</given>'+
'                            <!--Primer apellido del médico responsable del encuentro-->'+
'                            <family>--Primer apellido--</family>'+
'                            <!--Segundo apellido del médico responsable del encuentro-->'+
'                            <family>--Segundo apellido--</family>'+
'                        </name>'+
'                    </assignedPerson>'+
'                    <representedOrganization>'+
'                        <!-- root: OID de la organización consultada -->'+
'                        <id root="--OID de la organización consultada"/>'+
'                        <!-- Nombre de la organización consultada -->'+
'                        <name>--Nombre de la organización consultada--</name>'+
'                    </representedOrganization>'+
'                </assignedEntity>'+
'            </responsibleParty>'+
'            '+
'            <!-- Motivo del egreso del paciente para el encuentro en turno:'+
'                1 - Curación'+
'                2 - Mejoría'+
'                3 - Voluntario'+
'                4 - Pase a otro hospital'+
'                5 - Defunción'+
'                6 - Otro motivo'+
'            -->'+
'            <dischargeDispositionCode codeSystem="2.16.840.1.113883.12.112" codeSystemName="HL7 Discharge Disposition" code="--Código del motivo de egreso--" displayName="--Descripción del motivo del egreso--"/>'+
'                '+
'            <location>'+
'                <healthCareFacility>'+
'                    <!-- extension: Clave Única del Establecimiento de Salud donde se llevó a cabo el encuentro, de acuerdo al catálogo de CLUES -->'+
'                    <id root="2.16.840.1.113883.4.631" extension="--Clave CLUES de acuerdo al catálogo--" assigningAuthorityName="CLUES"/>'+
'                    <!-- extension: Licencia sanitaria del establecimiento consultado -->'+
'                    <id root="2.16.840.1.113883.3.215.1.1" extension="--Valor de la Licencia Sanitaria--" assigningAuthorityName="Licencia Sanitaria"/>'+
'                    <!-- Área en la que se realizó el encuentro:'+
'                            ACC       - Lugar del accidente'+
'                            AMB       - Ambulancia'+
'                            ER         - Sala de emergencias'+
'                            HOSP   - Hospitalización'+
'                            MOBL    - Unidad Móvil'+
'                            OF         - Servicios Ambulatorios'+
'                            PROFF - Consultorio médico'+
'                            PTRES - Hogar del paciente'+
'                    -->'+
'                    <code codeSystem=\'2.16.840.1.113883.5.111\' codeSystemName=\'RoleCode\' code=\'--Código del área del encuentro--\' displayName="--Nombre del área del encuentro--"/>'+
'                    <location>'+
'                        <!-- Nombre del establecimiento consultado -->'+
'                        <name>--Nombre del establecimiento de salud consultado--</name>'+
'                        <!-- Dirección legible del establecimiento responsable del episodio -->'+
'                        <addr>'+
'                            <!-- El texto del elemento tiene la dirección en formato legible-->'+
'                            -- Domicilio completo en texto libre--'+
'                            '+
'                            <!--Tipo de vialidad de acuerdo al catálogo de INEGI-->'+
'                            <streetNameType>--Valor de tipo de vialidad de acuerdo al catálogo--</streetNameType>'+
'                            <!--Nombre de la vialidad -->'+
'                            <streetName>--Nombre de la vialidad--</streetName>'+
'                            <!--Número exterior (parte numérica)-->'+
'                            <houseNumberNumeric>--Número exterior (Numérico)--</houseNumberNumeric>'+
'                            <!--Número exterior (parte alfanumérica) -->'+
'                            <houseNumber>--Número exterior parte alfanumérica--</houseNumber>'+
'                            <!--Número interior (parte numérica) -->'+
'                            <unitID>--Número interior (numérico)--</unitID>'+
'                            <!--Número interior (parte alfanumérica) -->'+
'                            <unitType>--Número interior (alfanumérico)--</unitType>'+
'                            <!--Tipo de asentamiento de acuerdo al catálogo de INEGI-->'+
'                            <deliveryInstallationType>--Valor de Tipo de asentamiento de acuerdo al catálogo--</deliveryInstallationType>'+
'                            <!--Nombre de asentamiento de acuerdo al catálogo de INEGI-->'+
'                            <deliveryInstallationArea>--Nombre del asentamiento--</deliveryInstallationArea>'+
'                            <!--Localidad de acuerdo al catálogo de INEGI-->'+
'                            <precinct>--Valor de Localidad de acuerdo al catálogo--</precinct>'+
'                            <!--Muncipio de acuerdo al catálogo de INEGI -->'+
'                            <county>--Valor de Municipio de acuerdo al catálogo--</county>'+
'                            <!--Entidad de acuerdo al catálogo de INEGI-->'+
'                            <state>--Valor de Entidad de acuerdo al catálogo--</state>'+
'                            <!--Código Postal de acuerdo al catálogo de SEPOMEX-->'+
'                            <postalCode>--Valor de Código Postal de acuerdo al catálogo--</postalCode>'+
'                            <!--Clave del país de acuerdo al catálogo de nacionalidades-->'+
'                            <country>--País--</country>'+
'                        </addr>'+
'                    </location>'+
'                </healthCareFacility>'+
'            </location>'+
'        </encompassingEncounter>'+
'    </componentOf>'+
''+
'    <!-- ******************************************* CUERPO DEL DOCUMENTO, ESTRUCTURADO EN SECCIONES ******************************************************** -->'+
'    <component>'+
'        <structuredBody>'+
'            '+
'            <!-- ************************   MOTIVO DEL ENVÍO ************************************** -->'+
'            <component>'+
'                <section>	     '+
'                    <templateId root="1.3.6.1.4.1.19376.1.5.3.1.3.1"/>'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="42349-1" displayName="Motivo de Referencia"/>'+
'                    <title>Motivo de la referencia</title>'+
'                    <!--Descripción del motivo de la referencia del paciente a otro prestador de servicios-->'+
'                    <text>--Detalle del motivo de la referencia--</text>'+
'                </section>'+
'            </component>'+
'            '+
'            <!-- ************************************** AFILIACIONES / PLANES DE ASEGURAMIENTO ************************************************* -->'+
'            <component>'+
'                <section>'+
'                    <templateId root="2.16.840.1.113883.10.20.22.2.18"/>'+
'                    <!--Identificador único de Planes de aseguramiento de acuerdo al catálogo LOINC-->'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="48768-6" displayName="Pagador"/>'+
'                    <title>Afiliaciones / Planes de aseguramiento</title>'+
'                    <text>'+
'                        <table border="1" width="100%">'+
'                            <thead>'+
'                                <tr>'+
'                                    <th>Inicio</th>'+
'                                    <th>Fin</th>'+
'                                    <th>Programa</th>'+
'                                    <th>Póliza</th>'+
'                                    <th>Folio</th>'+
'                                    <th>Tipo de beneficiario</th>'+
'                                </tr>'+
'                            </thead>'+
'                            <tbody>'+
'                                <tr>'+
'                                    <td>--Inicio de vigencia N--</td>'+
'                                    <td>--Fin de vigencia N--</td>'+
'                                    <td>--Nombre del programa N--</td>'+
'                                    <td>--Valor del identificador de la póliza N--</td>'+
'                                    <td>--Valor del identificador del beneficiario N--</td>'+
'                                    <td>--Valor del identificador del tipo de beneficiario N--</td>'+
'                                </tr>'+
'                            </tbody>'+
'                        </table>'+
'                    </text>'+
'                    <!-- Datos para cada afiliación / plan de aseguramiento del paciente -->'+
'                    <entry>'+
'                        <act classCode="ACT" moodCode="EVN">'+
'                            <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="48768-6" displayName="Fuentes de financiamiento"/>'+
'                            <statusCode code="completed"/>'+
'                            <entryRelationship typeCode="COMP">'+
'                                <act classCode="ACT" moodCode="EVN">'+
'                                    <!-- Programa / Plan de seguro'+
'                                        code: clave del programa'+
'                                        displayName: nombre del programa'+
'                                     -->'+
'                                    <code codeSystem="2.16.840.1.113883.5.110" codeSystemName="RoleClass" code="--Identificador/clave del programa--" displayName="--Nombre del programa--"/>'+
'                                    <statusCode code="completed"/>'+
'                                    <!-- Datos de la aseguradora -->'+
'                                    <performer typeCode="PRF">'+
'                                        <time nullFlavor="NA"/>'+
'                                        <assignedEntity>'+
'                                            <!-- Identificador de la dependencia / aseguradora pública o privada-->'+
'                                            <id root="--OID de la dependencia--"/>'+
'                                            <code code="PAYOR" codeSystem="2.16.840.1.113883.5.110" codeSystemName="HL7 RoleCode" />'+
'                                            <representedOrganization>'+
'                                                <name>-- Nombre de la dependencia u organización aseguradora --</name>'+
'                                            </representedOrganization>'+
'                                        </assignedEntity>'+
'                                    </performer>'+
'                                    <participant typeCode="COV">                                        '+
'                                        <time>'+
'                                            <!-- Inicio de vigencia de cobertura en el formato "aaaammddhhiiss"-->'+
'                                            <low value="--aaaammddhhiiss--"/>'+
'                                            <!-- Fin de vigencia de cobertura en el formato "aaaammddhhiiss"-->'+
'                                            <high value="--aaaammddhhiiss--"/>'+
'                                        </time>'+
'                                        <participantRole classCode="PAT">'+
'                                            <!-- Folio o identificador único del beneficiario en el programa-->'+
'                                            <id root="--OID del identificador de personas del programa dentro de la dependencia--" extension="--Identificador único de la persona dentro del programa--"/>'+
'                                            <!-- Tipo de beneficiario de acuerdo al catálogo de la DGIS -->'+
'                                            <code codeSystem="2.16.840.1.113883.3.215.12.16" codeSystemName="Tipos de beneficario" code="--Valor del identificador de tipo de beneficiario de acuerdo a catálogo--" displayName="--Tipo de beneficiario de acuerdo a catálogo--"/>'+
'                                        </participantRole>'+
'                                    </participant>'+
'                                    <participant typeCode="HLD">'+
'                                        <participantRole>'+
'                                            <!-- Identificador de la póliza de aseguramiento dentro de la organización aseguradora-->'+
'                                            <id root="2.16.840.1.113883.3.215.1.2" extension="--Identificador único de la persona dentro de la póliza--"/>'+
'                                        </participantRole>'+
'                                    </participant>'+
'                                </act>'+
'                            </entryRelationship>'+
'                        </act>'+
'                    </entry>'+
'                </section>'+
'            </component>'+
'            '+
'            <!-- ******************************************************** ALERGIAS (REQUERIDA) ******************************************************** -->'+
'            <component>'+
'                <section>'+
'                    <templateId root="2.16.840.1.113883.10.20.22.2.22"/>'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="48765-2" displayName="Alergias"/>'+
'                    <title>Alergias y reacciones adversas</title>'+
'                    <text>'+
'                        <table width="100%">'+
'                            <thead>'+
'                                <tr>'+
'                                    <th>Alergeno</th>'+
'                                    <th>Fecha inicial</th>'+
'                                    <th>Médico</th>'+
'                                    <th>Reacción</th>'+
'                                    <th>Estado actual</th>'+
'                                    <th>Observaciones</th>'+
'                                </tr>'+
'                            </thead>'+
'                            <tbody>'+
'                                <tr>'+
'                                    <td>--Nombre del alergeno al que tiene reacción el paciente--</td>		        '+
'                                    <td>--Fecha y hora en el cuál se realizó la detección en formato "aaaammddhhiiss"--</td>'+
'                                    <td>--Nombre del médico que realizó la detección--</td>'+
'                                    <td>--Descripción de la reacción producida por el alergeno en el paciente--</td>'+
'                                    <td>--Situación actual de la alergia--</td>'+
'                                    <td>--Otros comentarios acerca de la reacción que presenta el paciente--</td>'+
'                                </tr>'+
'                            </tbody>'+
'                        </table>'+
'                    </text>'+
'                </section>'+
'            </component>'+
'            '+
'            <!-- ******************************************************** ANTECEDENTES HEREDO-FAMILIARES *********************************************** -->'+
'            <component>'+
'                <section>'+
'                    <templateId root="2.16.840.1.113883.10.20.1.4"/>'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="10157-6" displayName="Antecedentes Familiares"/>'+
'                    <title>Antecedentes Heredo-Familiares</title>'+
'                    <text>'+
'                        <table width="100%">'+
'                            <thead>'+
'                                <tr>'+
'                                    <th>Hipertensión</th>'+
'                                    <th>Dislipidemias</th>'+
'                                    <th>Diabetes</th>'+
'                                </tr>'+
'                            </thead>'+
'                            <tbody>'+
'                                <tr>'+
'                                    <td>--Sí/No/Sin información--</td>'+
'                                    <td>--Sí/No/Sin información--</td>'+
'                                    <td>--Sí/No/Sin información--</td>'+
'                                </tr>'+
'                            </tbody>'+
'                        </table>'+
'                    </text>'+
'                    <!-- Plantilla para registrar información mínima sobre padecimientos obligatorios  -->'+
'                    <entry typeCode="DRIV">'+
'                        <organizer moodCode="EVN" classCode="CLUSTER">'+
'                            <statusCode code="completed" />'+
'                            <subject>'+
'                                <relatedSubject classCode="PRS">'+
'                                    <code codeSystem="2.16.840.1.113883.5.111" codeSystemName="HL7 FamilyMember" code="FAMMEMB" displayName="Familiar"/>'+
'                                </relatedSubject>'+
'                            </subject>'+
'                            <component>'+
'                                <!-- Debe haber una entrada para cada uno de los tres padecimientos -->'+
'                                '+
'                                <!-- PRESENCIA DE HIPERTENSIÓN: Incluir si algún familiar del paciente ha tenido el padecimiento.-->'+
'                                <observation classCode="OBS" moodCode="EVN">'+
'                                    <code codeSystem="2.16.840.1.113883.6.96"  codeSystemName="SNOMED CT" code="64572001" displayName="Condition"/>'+
'                                    <statusCode code="completed" />'+
'                                    <value xsi:type="CD" codeSystem="2.16.840.1.113883.6.3" codeSystemName="ICD-10" code="I10X" displayName="Hipertensión"/>'+
'                                </observation>'+
'                                '+
'                                <!-- AUSENCIA DE HIPERTENSIÓN: Incluir si se sabe que ningún familiar del paciente ha tenido el padecimiento.-->'+
'                                <observation classCode="OBS" moodCode="EVN" negationInd="true">'+
'                                    <code codeSystem="2.16.840.1.113883.6.96"  codeSystemName="SNOMED CT" code="64572001" displayName="Condition"/>'+
'                                    <statusCode code="completed" />'+
'                                    <value xsi:type="CD" codeSystem="2.16.840.1.113883.6.3" codeSystemName="ICD-10" code="I10X" displayName="Hipertensión"/>'+
'                                </observation>'+
'                                '+
'                                <!-- SIN INFORMACIÓN DE HIPERTENSIÓN: Incluir si no se cuenta con información sobre si algún familiar del paciente ha tenido el padecimiento.-->'+
'                                <observation classCode="OBS" moodCode="EVN" nullFlavor="NI">'+
'                                    <code codeSystem="2.16.840.1.113883.6.96"  codeSystemName="SNOMED CT" code="64572001" displayName="Condition"/>'+
'                                    <statusCode code="completed" />'+
'                                    <value xsi:type="CD" codeSystem="2.16.840.1.113883.6.3" codeSystemName="ICD-10" code="I10X" displayName="Hipertensión"/>'+
'                                </observation>'+
'                                '+
'                                '+
'                                '+
'                                '+
'                                <!-- PRESENCIA DE DISLIPIDEMIAS: Incluir si algún familiar del paciente ha tenido el padecimiento.-->'+
'                                <observation classCode="OBS" moodCode="EVN">'+
'                                    <code codeSystem="2.16.840.1.113883.6.96"  codeSystemName="SNOMED CT" code="64572001" displayName="Condition"/>'+
'                                    <statusCode code="completed" />'+
'                                    <value xsi:type="CD" codeSystem="2.16.840.1.113883.6.3" codeSystemName="ICD-10" code="E78" displayName="Dislipidemias"/>'+
'                                </observation>'+
'                                '+
'                                <!-- AUSENCIA DE DISLIPIDEMIAS: Incluir si se sabe que ningún familiar del paciente ha tenido el padecimiento.-->'+
'                                <observation classCode="OBS" moodCode="EVN" negationInd="true">'+
'                                    <code codeSystem="2.16.840.1.113883.6.96"  codeSystemName="SNOMED CT" code="64572001" displayName="Condition"/>'+
'                                    <statusCode code="completed" />'+
'                                    <value xsi:type="CD" codeSystem="2.16.840.1.113883.6.3" codeSystemName="ICD-10" code="E78" displayName="Dislipidemias"/>'+
'                                </observation>'+
'                                '+
'                                <!-- SIN INFORMACIÓN DE DISLIPIDEMIAS: Incluir si no se cuenta con información sobre si algún familiar del paciente ha tenido el padecimiento.-->'+
'                                <observation classCode="OBS" moodCode="EVN" nullFlavor="NI">'+
'                                    <code codeSystem="2.16.840.1.113883.6.96"  codeSystemName="SNOMED CT" code="64572001" displayName="Condition"/>'+
'                                    <statusCode code="completed" />'+
'                                    <value xsi:type="CD" codeSystem="2.16.840.1.113883.6.3" codeSystemName="ICD-10" code="E78" displayName="Dislipidemias"/>'+
'                                </observation>'+
'                                '+
'                                '+
'                                '+
'                                '+
'                                <!-- PRESENCIA DE DIABETES: Incluir si algún familiar del paciente ha tenido el padecimiento.-->'+
'                                <observation classCode="OBS" moodCode="EVN">'+
'                                    <code codeSystem="2.16.840.1.113883.6.96"  codeSystemName="SNOMED CT" code="64572001" displayName="Condition"/>'+
'                                    <statusCode code="completed" />'+
'                                    <value xsi:type="CD" codeSystem="2.16.840.1.113883.6.3" codeSystemName="ICD-10" code="E14" displayName="Diabetes"/>'+
'                                </observation>'+
'                                '+
'                                <!-- AUSENCIA DE DIABETES: Incluir si se sabe que ningún familiar del paciente ha tenido el padecimiento.-->'+
'                                <observation classCode="OBS" moodCode="EVN" negationInd="true">'+
'                                    <code codeSystem="2.16.840.1.113883.6.96"  codeSystemName="SNOMED CT" code="64572001" displayName="Condition"/>'+
'                                    <statusCode code="completed" />'+
'                                    <value xsi:type="CD" codeSystem="2.16.840.1.113883.6.3" codeSystemName="ICD-10" code="E14" displayName="Diabetes"/>'+
'                                </observation>'+
'                                '+
'                                <!-- SIN INFORMACIÓN DE DIABETES: Incluir si no se cuenta con información sobre si algún familiar del paciente ha tenido el padecimiento.-->'+
'                                <observation classCode="OBS" moodCode="EVN" nullFlavor="NI">'+
'                                    <code codeSystem="2.16.840.1.113883.6.96"  codeSystemName="SNOMED CT" code="64572001" displayName="Condition"/>'+
'                                    <statusCode code="completed" />'+
'                                    <value xsi:type="CD" codeSystem="2.16.840.1.113883.6.3" codeSystemName="ICD-10" code="E14" displayName="Diabetes"/>'+
'                                </observation>'+
''+
'                                <!-- PLANTILLA PARA AGREGAR OTROS ANTECEDENTES HEREDO-FAMILIARES (opcional 0:N) -->'+
'                                <!-- Repetir el elemento organizer para cada miembro familiar con el que se tenga antecedente patológico-->'+
'                                <organizer moodCode="EVN" classCode="CLUSTER">'+
'                                    <templateId root="2.16.840.1.113883.10.20.22.4.45" />'+
'                                    <statusCode code="completed" />'+
'                                    <subject>'+
'                                        <relatedSubject classCode="PRS">'+
'                                            <!--'+
'                                             Relación familiar'+
'                                             code: clave de la relación. Si no se conoce "FAMMEMB"  (ver 2.16.840.1.113883.1.11.19579 HL7V3 RoleCode dentro de FAMMEMB)'+
'                                             displayName: descripción de la relación'+
'                                             -->'+
'                                            <code codeSystem="2.16.840.1.113883.5.111" codeSystemName="HL7 FamilyMember" code="--Valor del identificador de la relación familiar con el paciente--" displayName="--Nombre de la relación familiar con el paciente--"/>'+
'                                        </relatedSubject>'+
'                                    </subject>'+
'                                    <component>'+
'                                        <!-- Agregar una observación para cada antecedente observado con ese familiar (1:N) -->'+
'                                        <observation classCode="OBS" moodCode="EVN">'+
'                                            <!-- Grado de juicio médico sobre el antecedente.'+
'                                                 Es posible sustituir code y displayName por el ValueSet 2.16.840.1.113883.3.88.12.3221.7.2'+
'                                             -->'+
'                                            <code codeSystem="2.16.840.1.113883.6.96"  codeSystemName="SNOMED CT" code="64572001" displayName="Condition"/>'+
'                                            '+
'                                            <!-- Enfermedad a la que se refiere este antecedente -->'+
'                                            <value xsi:type="CD" codeSystem="2.16.840.1.113883.6.3" codeSystemName="ICD-10" code="--Valor del identificador de diagnóstico de acuerdo a catálogo, codificado a 4 dígitos--" displayName="--Nombre de diagnóstico de acuerdo a catálogo--" />'+
'                                            '+
'                                            <!-- Especificación de que fue causa de muerte, omitir elemento completo si no causó muerte -->'+
'                                            <entryRelationship typeCode="CAUS">'+
'                                                <observation classCode="OBS" moodCode="EVN">'+
'                                                    <code codeSystem="2.16.840.1.113883.5.4" codeSystemName="HL7ActCode" code="ASSERTION"/>'+
'                                                    <statusCode code="completed"/>'+
'                                                    <value xsi:type="CD" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" code="419099009" displayName="Muerte"/>'+
'                                                </observation>'+
'                                            </entryRelationship>'+
'                                            '+
'                                            <!-- Especificación de edad en que el familiar presentó el padecimiento -->'+
'                                            <entryRelationship typeCode="SUBJ" inversionInd="true">'+
'                                                <observation classCode="OBS" moodCode="EVN">'+
'                                                    <code codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" code="397659008" displayName="Edad"/>'+
'                                                    <statusCode code="completed"/>'+
'                                                    <!-- value: Edad en años-->'+
'                                                    <value xsi:type="PQ" value="--Edad en años--" unit="a"/>'+
'                                                </observation>'+
'                                            </entryRelationship>'+
'                                        </observation>'+
'                                    </component>'+
'                                </organizer>'+
'                                '+
'                            </component>'+
'                        </organizer>'+
'                    </entry>'+
'                </section>'+
'            </component>'+
'            '+
'            <!-- ***************************** ANTECEDENTES PERSONALES NO PATOLÓGICOS  ******************************************************** -->'+
'            <component>'+
'                <section>'+
'                    <templateId root="2.16.840.1.113883.10.20.22.4.38"/>'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="29762-2" displayName="Antecedentes no patológicos"/>'+
'                    <title>Antecedentes personales no patológicos</title>'+
'                    <text>'+
'                        <paragraph>Tipo de Sangre: --Tipo de sangre--</paragraph>'+
'                        <paragraph/>'+
'                        '+
'                        <table width="100%">'+
'                            <thead>'+
'                                <tr>'+
'                                    <th colspan="6">Tabaquismo</th>'+
'                                </tr>'+
'                                <tr>'+
'                                    <th>Fecha de inicio</th>'+
'                                    <th>Fecha de fin</th>'+
'                                    <th>Cigarros por día</th>'+
'                                </tr>'+
'                            </thead>'+
'                            <tbody>'+
'                                <tr>'+
'                                    <td>--Fecha de inicio del hábito en formato "aaaammddhhiiss"--</td>'+
'                                    <td>--Fecha de termino del hábito en formato "aaaammddhhiiss"--</td>'+
'                                    <td>--Cantidad de cigarros consumido por día--</td>'+
'                                </tr>'+
'                            </tbody>'+
'                        </table>'+
'                        <paragraph/>'+
'                        <table width="100%">'+
'                            <thead>'+
'                                <tr>'+
'                                    <th colspan="6">Alcoholismo</th>'+
'                                </tr>'+
'                                <tr>'+
'                                    <th>Fecha de inicio</th>'+
'                                    <th>Fecha de fin</th>'+
'                                    <th>Consumo</th>'+
'                                </tr>'+
'                            </thead>'+
'                            <tbody>'+
'                                <tr>'+
'                                    <td>--Fecha de inicio del hábito en formato "aaaammddhhiiss"--</td>'+
'                                    <td>--Fecha de termino del hábito en formato "aaaammddhhiiss"--</td>'+
'                                    <td>--Cantidad de alcohol consumido por día--</td>'+
'                                </tr>'+
'                            </tbody>'+
'                        </table>'+
'                        <paragraph/>'+
'                        <table width="100%">'+
'                            <thead>'+
'                                <tr>'+
'                                    <th colspan="6">Consumo de otras sustancias</th>'+
'                                </tr>'+
'                                <tr>'+
'                                    <th>Fecha de inicio</th>'+
'                                    <th>Fecha de fin</th>'+
'                                    <th>Consumo</th>'+
'                                </tr>'+
'                            </thead>'+
'                            <tbody>'+
'                                <tr>'+
'                                    <td>--Fecha de inicio del hábito en formato "aaaammddhhiiss"--</td>'+
'                                    <td>--Fecha de termino del hábito en formato "aaaammddhhiiss"--</td>'+
'                                    <td>--Sustancia y cantidad de consumo por día--</td>'+
'                                </tr>'+
'                            </tbody>'+
'                        </table>'+
''+
'                        <paragraph>--Otros antecedentes personales no patológicos en texto libre--</paragraph>'+
'                        <paragraph/>'+
'                    </text>'+
'                    '+
'                    <!-- Tipo de sangre (una entrada)-->'+
'                    <entry>'+
'                        <observation classCode="OBS" moodCode="EVN"> '+
'                            <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="882-1" displayName="GRUPO ABO+RH"/>'+
'                            <!-- Fecha-hora en que se conoció el tipo de sangre en formato "aaaammddhhiiss" -->'+
'                            <effectiveTime value="--aaaammddhhiiss--"/>'+
'                            <!-- code: clave del tipo de sangre -->'+
'                            <value xsi:type="CS" code="--Tipo de sangre y factor RH--"/>'+
'                        </observation>'+
'                    </entry>'+
'                    '+
'                    <!-- Fumador (0:N)'+
'                        Incluir al menos una entrada si es o ha sido fumador. Es posible repetir para cada periodo de consumo.-->'+
'                    <entry typeCode="DRIV">'+
'                        <observation classCode="OBS" moodCode="EVN">'+
'                            <!-- Identificador único por cada periodo -->'+
'                            <id root="--identificador único por cada periodo de consumo de tabaco--" />'+
'                            <code codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" code="229819007" displayName="Uso y exposición al tabaco"/>'+
'                            <statusCode code="completed" />'+
'                            <effectiveTime>'+
'                                <!-- Año/fecha de inicio como fumador -->'+
'                                <low value="--Año de inicio como fumador--"/>'+
'                                <!-- Año/fecha de término como fumador-->'+
'                                <high value="--Año de término como fumador--"/>'+
'                            </effectiveTime>'+
'                            <!-- Descripción del Consumo -->'+
'                            <value xsi:type="ST">--Cantidad de cajetillas por día--</value>'+
'                        </observation>'+
'                    </entry>'+
'                    '+
'                    <!-- Alcohol (0:N)'+
'                        Incluir al menos una entrada si es o ha sido alochólico. Es posible repetir para cada periodo de consumo.-->'+
'                    <entry typeCode="DRIV">'+
'                        <observation classCode="OBS" moodCode="EVN">'+
'                            <!-- Identificador único por cada periodo -->'+
'                            <id root="--identificador único por cada periodo de consumo de alcohol--" />'+
'                            <code codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" code="160573003" displayName="Ingesta de Alcohol"/>'+
'                            <statusCode code="completed" />'+
'                            <effectiveTime>'+
'                                <!-- Año/fecha de inicio en el consumo de alcohol -->'+
'                                <low value="--Año de inicio en el consumo de alcohol--"/>'+
'                                <!-- Año/fecha de término/cambio en el consumo de alcohol -->'+
'                                <high value="--Año de término/cambio en el consumo de alcohol--"/>'+
'                            </effectiveTime>'+
'                            <!-- Descripción del Consumo -->'+
'                            <value xsi:type="ST">--Cantidad de consumo de alcohol por día--</value>'+
'                        </observation>'+
'                    </entry>'+
'                    '+
'                    <!-- Otras sustancias (0:N)'+
'                     Incluir al menos una entrada si es o ha consumido otras sustancias (e.g. drogas). Es posible repetir para cada periodo de consumo y sustancia.-->'+
'                    <entry typeCode="DRIV">'+
'                        <observation classCode="OBS" moodCode="EVN">'+
'                            <!-- Identificador único por cada periodo -->'+
'                            <id root="--identificador único por cada periodo de consumo de drogas--" />'+
'                            <code codeSystem="2.16.840.1.113883.6.96" code="363908000" displayName="Uso indebido de drogas"/>'+
'                            <statusCode code="completed" />'+
'                            <effectiveTime>'+
'                                <!-- Año/fecha de inicio en el consumo de drogas-->'+
'                                <low value="--Año de inicio en el consumo de drogas--"/>'+
'                                <!-- Año/fecha de término/cambio en el consumo de drogas-->'+
'                                <high value="--Año de término/cambio en el consumo de drogas--"/>'+
'                            </effectiveTime>'+
'                            <!-- Descripción del consumo de drogas-->'+
'                            <value xsi:type="ST">--Descripción del consumo de la sustancia--</value>'+
'                        </observation>'+
'                    </entry>'+
'                </section>'+
'            </component>'+
'            '+
'            <!-- ********************************** ANTECEDENTES PERSONALES PATOLÓGICOS  ******************************************************** -->'+
'            <component>'+
'                <section>'+
'                    <templateId root="2.16.840.1.113883.10.20.22.2.20"/>'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="11348-0" displayName="Antecedentes patológicos"/>'+
'                    <title>Antecedentes personales patológicos</title>'+
'                    <text>'+
'                        <paragraph> --Relación de antecedentes personales patológicos del paciente --</paragraph>'+
'                        <table>'+
'                            <tbody>'+
'                                <tr>'+
'                                    <th>Diabetes</th>'+
'                                    <td>Hipertensión</td>'+
'                                    <td>Hipertiroidismo</td>'+
'                                </tr>                                '+
'                                <tr>'+
'                                    <td>--Tiempo que el paciente lleva con Diabetes--</td>'+
'                                    <td>--Tiempo que el paciente lleva con Hipertensión--</td>'+
'                                    <td>--Tiempo que el paciente lleva con Hipertiroidismo--</td>'+
'                                </tr>'+
'                            </tbody>'+
'                        </table>'+
'                        '+
'                    </text>'+
'                    '+
'                    <!-- PRESENCIA DE DIABETES: Incluir al menos esta entrada, si el paciente ha presentado el padecimiento.-->'+
'                    <entry>'+
'                        <observation classCode="OBS" moodCode="EVN">'+
'                            <code codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" code="282291009" displayName="Diagnóstico"/>'+
'                            <statusCode code="completed"/>'+
'                            <effectiveTime>'+
'                                <!-- Año en que fue diagnosticado-->'+
'                                <low value="--aaaa--"/>'+
'                            </effectiveTime>'+
'                            <value xsi:type="CE" codeSystem="2.16.840.1.113883.6.3" codeSystemName="ICD-10" code="E14" displayName="Diabetes"/>'+
'                        </observation>'+
'                    </entry>'+
'                    '+
'                    <!-- PRESENCIA DE HIPERTENSIÓN: Incluir al menos esta entrada, si el paciente ha presentado el padecimiento.-->'+
'                    <entry>'+
'                        <observation classCode="OBS" moodCode="EVN">'+
'                            <code codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" code="282291009" displayName="Diagnóstico"/>'+
'                            <statusCode code="completed"/>'+
'                            <effectiveTime>'+
'                                <!-- Año en que fue diagnosticado-->'+
'                                <low value="aaaa"/>'+
'                            </effectiveTime>'+
'                            <value xsi:type="CE" codeSystem="2.16.840.1.113883.6.3" codeSystemName="ICD-10" code="I10X" displayName="Hipertensión"/>'+
'                        </observation>'+
'                    </entry>'+
'                    '+
'                    '+
'                    <!-- PRESENCIA DE HIPERTIROIDISMO: Incluir al menos esta entrada, si el paciente ha presentado el padecimiento.-->'+
'                    <entry>'+
'                        <observation classCode="OBS" moodCode="EVN">'+
'                            <code codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" code="282291009" displayName="Diagnóstico"/>'+
'                            <statusCode code="completed"/>'+
'                            <effectiveTime>'+
'                                <!-- Año en que fue diagnosticado-->'+
'                                <low value="aaaa"/>'+
'                            </effectiveTime>'+
'                            <value xsi:type="CE" codeSystem="2.16.840.1.113883.6.3" codeSystemName="ICD-10" code="E05" displayName="Hipertiroidismo"/>'+
'                        </observation>'+
'                    </entry>'+
'                    '+
'                    <!-- Repetir para cada padecimiento en la historia clínica del paciente previo al episodio actual (opcional, 0:N)-->'+
'                    <entry>'+
'                        <observation classCode="OBS" moodCode="EVN">'+
'                            <code codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" code="282291009" displayName="Diagnóstico"/>'+
'                            <!-- Diagnóstico (texto libre introducido)  -->'+
'                            <text>--Registro de diagnóstico en texto libre--</text>'+
'                            <statusCode code="completed"/>'+
'                            <effectiveTime>'+
'                                <!-- Fecha de diagnóstico del antecedente patológico en formato "aaaammddhhiiss" -->'+
'                                <low value="aaaammddhhiiss"/>                                '+
'                            </effectiveTime>'+
'                            <!-- Enfermedad'+
'                             code: código cie-10 de la enfermedad de acuerdo al catálogo del CEMECE'+
'                             displayName: descripción de acuerdoa CIE-10 de la enfermedad'+
'                             -->'+
'                            <value xsi:type="CE" codeSystem="2.16.840.1.113883.6.3" codeSystemName="ICD-10" code="--Valor del identificador del diagnóstico de acuerdo a catálogo--" displayName="--Nombre del diagnóstico de acuerdo a catálogo--"/>'+
'                        </observation>'+
'                    </entry>'+
'                    '+
'                </section>'+
'            </component>'+
''+
''+
'            <!-- **************************************** DISCAPACIDADES  ******************************************************** -->'+
'            <component>'+
'                <section>'+
'                    <templateId root=\'2.16.840.1.113883.10.20.22.2.14\'/>'+
'                    <code codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" code="21134002" displayName="Discapacidades"/>'+
'                    <title>Discapacidades</title>'+
'                    <text>'+
'                         --Descripción de discapacidades y estado del funcionamiento--'+
'                    </text>'+
'                    '+
'                    <!-- Repetir para cada discapacidad que presente el paciente (0:n)-->'+
'                    <entry typeCode="DRIV">'+
'                        <observation classCode="OBS" moodCode="EVN">'+
'                            <id root="--Identificador único de la discapacidad del paciente--"/>'+
'                            <code codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" code="248536006" displayName="Discapacidades"/>                            '+
'                            <statusCode code="completed"/>'+
'                            <!-- Discapacidad '+
'                             code: clave de la discapacidad de acuerdo a CIF'+
'                             displayName: descripción de la discapacidad correspondiente a code'+
'                             -->'+
'                            <value xsi:type="CD" codeSystem="2.16.840.1.113883.6.254" codeSystemName="CIF" code="--Valor del identificador de discapacidad de acuerdo a catálogo--"  displayName="--Nombre de discapacidad de acuerdo a catálogo--"/>'+
'                        </observation>'+
'                    </entry>'+
'                </section>'+
'            </component>'+
'            '+
'            '+
'            <!-- **************************************** MEDICAMENTOS PREVIOS Y ACTUALES******************************************************** -->'+
'            <component>'+
'                <section>'+
'                    <templateId root="2.16.840.1.113883.10.20.22.2.1"/>'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="10160-0" displayName="Antecedentes de medicamentos"/>'+
'                    <title>Historial farmacológico</title>'+
'                    <text>'+
'                        <table >'+
'                            <thead>'+
'                                <tr>'+
'                                    <th>Medicamento</th>'+
'                                    <th>Via de administración</th>'+
'                                    <th>Dosis</th>'+
'                                    <th>Fecha de inicio</th>'+
'                                    <th>Fecha de fin</th>'+
'                                    <th>Obs. prescripción</th>'+
'                                </tr>'+
'                            </thead>'+
'                            <tbody>'+
'                                <tr>'+
'                                    <td>--Nombre del medicamento/substancia activa--</td>'+
'                                    <td>--Vía de administración--</td>'+
'                                    <td>--Dosis por administrar--</td>'+
'                                    <td>--Fecha y hora de inicio de administración de medicamento--</td>'+
'                                    <td>--Fecha y hora de término de administración de medicamento--</td>'+
'                                    <td>--Observaciones adicionales acerca de la prescripción--</td>'+
'                                </tr>'+
'                            </tbody>'+
'                        </table>'+
'                    </text>'+
'                    '+
'                    <!-- Para cada medicamento relevante al episodio actual que el paciente consuma o haya consumido anteriormente (0:n)-->'+
'                    <entry>'+
'                        <substanceAdministration classCode="SBADM" moodCode="EVN" negationInd="false">'+
'                            <!-- Observaciones generales sobre la medicación *debe aparecer textual en el texto de la sección o referenciarlo* -->'+
'                            <text>--Observaciones generales del medicamento relevante al episodio--</text>'+
'                            <statusCode code="completed"/>                           '+
'                            <!--  Vía de administración de acuerdo con el catálogo del Cuadro Básico de Medicamentos -->'+
'                            <routeCode codeSystem="2.16.840.1.113883.3.215.12.12" codeSystemName="Vía de Administración CBM" code="--Valor del identificador de Vía de administración--" displayName="--Nombre de Vía de administración--"/>'+
'                            <!-- Dosis y frecuencia-->'+
'                            <doseQuantity>'+
'                                <center  value="--Cantidad administrada y frecuencia--"/>'+
'                            </doseQuantity>'+
'                            <effectiveTime>'+
'                                <!-- Fecha  de inicio de administración de medicamento en formato "aaaammddhhiiss"-->'+
'                                <low value="--aaaammddhhiiss--"/>'+
'                                <!-- Fecha  de término de administración de medicamento en formato "aaaammddhhiiss"-->'+
'                                <high value="--aaaammddhhiiss--"/>'+
'                            </effectiveTime>                            '+
'                            <consumable>'+
'                                <manufacturedProduct classCode="MANU">'+
'                                    <manufacturedMaterial>'+
'                                        <!-- Medicamento  de acuerdo con catálogo del Cuadro Básico de Medicamentos'+
'                                            code: clave en el Cuadro Básico'+
'                                            displayName: descripción del medicamento-->'+
'                                        <code codeSystem="2.16.840.1.113883.3.215.12.8" codeSystemName="Cuadro Básico de Medicamentos" code="--Valor del identificador del Medicamento de acuerdo a catálogo--"  displayName="--Nombre del medicamento de acuerdo a catálogo--"/>'+
'                                    </manufacturedMaterial>'+
'                                </manufacturedProduct>'+
'                            </consumable>'+
'                        </substanceAdministration>'+
'                    </entry>'+
'                </section>'+
'            </component>'+
'            '+
'            <!-- ******************************************************** Manifestaciones iniciales ****************************************************** -->'+
'            <component>'+
'                <section>'+
'                    <templateId root="1.3.6.1.4.1.19376.1.5.3.1.1.13.2.1"/>'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="10154-3" displayName="Manifestaciones Iniciales"/>'+
'                    <title>Manifestaciones iniciales</title>'+
'                    <!-- Sintomatología descrita por el paciente desde su aparición, por lo que se origina este episodio.-->'+
'                    <text>--Sintomatología que origina el episodio descrita por el paciente--</text>'+
'                </section>'+
'            </component>'+
'                '+
'                    '+
'            <!-- ******************************************************** Impresión diagnóstica  ******************************************************** -->'+
'            <component>'+
'                <section>'+
'                    <templateId root="2.16.840.1.113883.10.20.22.2.8"/>'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="51848-0" displayName="Impresión diagnóstica"/>'+
'                    <title>Impresión diagnóstica</title>'+
'                    <text>--Estado del paciente en evaluación inicial descrito por profesionale de la salud que lo recibió--</text>'+
'                </section>'+
'            </component>'+
'            '+
'            <!-- ******************************************************** DIAGNÓSTICOS  ******************************************************** -->'+
'            <component>'+
'                <section>'+
'                    <templateId root="2.16.840.1.113883.10.20.22.2.5"/>'+
'                    <templateId root="2.16.840.1.113883.10.20.22.2.5.1"/>'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="11450-4" displayName="Lista de Problemas"/>'+
'                    <title>Diagnósticos y problemas de salud</title>'+
'                    <text>'+
'                        <table width="100%">'+
'                            <thead>'+
'                                <tr>'+
'                                    <th>Tipo</th>'+
'                                    <th>Fecha</th>'+
'                                    <th>CIE</th>'+
'                                    <th>Diagnóstico</th>'+
'                                    <th>Observaciones</th>'+
'                                </tr>'+
'                            </thead>'+
'                            <tbody>'+
'                                <tr>'+
'                                    <td>--Tipo de diagnóstico--</td>'+
'                                    <td>--Fecha y hora en el cual se presentó el problema diagnosticado--</td>'+
'                                    <td>--Clave CIE 10 del diagnóstico de acuerdo a catálogo--</td>'+
'                                    <td>--Descripción de la diagnóstico escrito por el médico--</td>'+
'                                    <td>--Observaciones adicionales acerca del diagnóstico--</td>'+
'                                </tr>'+
'                            </tbody>'+
'                        </table>'+
'                    </text>'+
'                    '+
'                    <!-- Repetir para cada problema de salud registrado en el episodio que documenta este CDA (0:n) -->'+
'                    <entry typeCode="DRIV">'+
'                        <act classCode="ACT" moodCode="EVN">'+
'                            <code codeSystem="2.16.840.1.113883.5.6" code="CONC" displayName="Concern"/>'+
'                            <statusCode code="completed"/>'+
'                            <effectiveTime>'+
'                                <low value="--Fecha y hora de inicio de la afección / problema--"/>'+
'                                <high value="--Fecha y hora de término de la afección / problema--"/>'+
'                            </effectiveTime>'+
'                            <entryRelationship typeCode="SUBJ">'+
'                                <observation classCode="OBS" moodCode="EVN">'+
'                                    <!-- root: Identificador único '+
'                                         extension: Número de afección-->'+
'                                    <id root="--Identificador único de la afección--" extension="--Número de la afección--"/>'+
'                                    <!-- Tipo de diagnóstico. Indicar si se trata de la afección principal, comorbilidad, causa externa, etc. o diagnóstico en general.-->'+
'                                    <code codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" code="282291009" displayName="Diagnóstico"/>'+
'                                    <!-- Enfermedad (texto libre introducido) -->'+
'                                    <text>--Descripción en texto libre del diagnóstico introducido por el médico--</text>'+
'                                    <statusCode code="completed"/>'+
'                                    <!-- La codificación debe realizarse a 4 dígitos de acuerdo al catálogo CIE-10 del CEMECE -->'+
'                                    <value xsi:type="CE" codeSystem="2.16.840.1.113883.6.3" codeSystemName="ICD-10" code="--Valor del identificador del diagnóstico de acuerdo a catálogo--" displayName="--Nombre del diagnóstico de acuerdo a catálogo--"/>'+
'                                </observation>'+
'                            </entryRelationship>'+
'                        </act>'+
'                    </entry>'+
'                    '+
'                </section>'+
'            </component>'+
'            '+
'            <!-- ******************************************************** PROCEDIMIENTOS  ******************************************************** -->'+
'            <component>'+
'                <section>'+
'                    <templateId root="2.16.840.1.113883.10.20.1.12"/>'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="47519-4" displayName="Historial de procedimientos"/>'+
'                    <title>Procedimientos quirúrgicos y terapéuticos</title>'+
'                    <text>'+
'                        <table width="100%">'+
'                            <thead>'+
'                                <tr>'+
'                                    <th>CIE9-MC</th>'+
'                                    <th>Procedimiento</th>'+
'                                    <th>Estado</th>'+
'                                    <th>Activo</th>'+
'                                    <th>Observaciones</th>'+
'                                </tr>'+
'                            </thead>'+
'                            <tbody>'+
'                                <tr>'+
'                                               <td>--Valor del identificador del procedimiento de acuerdo a catálogo CIE9-MC --</td>'+
'                                               <td>--Nombre del procedimiento de acuerdo a catálogo CIE9-MC --</td>'+
'                                    <td>--Situación actual en la que se encuentra el procedimiento--</td>'+
'                                    <td>--Señalamiento si el procedimiento se encuentra activo (Si / No) --</td>'+
'                                    <td>--Observaciones adicionales acerca del procedimiento--</td>'+
'                                </tr>'+
'                            </tbody>'+
'                        </table>'+
'                    </text>'+
'                    '+
'                    <!-- Repetir para cada procedimiento realizado durante el episodio que documenta este CDA (0:n) -->'+
'                    <entry typeCode="DRIV">'+
'                        <procedure classCode="PROC" moodCode="EVN">'+
'                            <!-- Procedimiento'+
'                                code= Código CIE-9MC'+
'                                displayName= descripción de acuerdo al catálogo -->'+
'                            <code codeSystem="2.16.840.1.113883.6.2" codeSystemName="ICD-9CM" code="--Valor del identificador del procedimiento de acuerdo a catálogo--" displayName="--Nombre del procedimiento de acuerdo a catálogo--">'+
'                                <!-- Procedimiento en texto libre introducido por el médico -->'+
'                                <originalText>-- Procedimiento en texto libre introducido por el médico --</originalText>'+
'                            </code>'+
'                            <statusCode code="completed"/>'+
'                            <!-- Fecha o fecha-hora de la realización del procedimiento en formato "aaaammddhhiiss"-->'+
'                            <effectiveTime value="--aaaammddhhiiss--"/>'+
'                            <performer>'+
'                                <assignedEntity>'+
'                                    <!-- Cédula del médico responsable del procedimiento-->'+
'                                    <id root="2.16.840.1.113883.3.215.12.18" extension="--Número de cédula profesional del médico responsable del procedimiento--"/>'+
'                                    <assignedPerson>'+
'                                        <!-- Nombre completo del médico responsable del procedimiento -->'+
'                                        <name>'+
'                                            <given>--Nombre(s) del médico responsable del procedimiento--</given>'+
'                                            <family>--Primer apellido del médico responsable del procedimiento--</family>'+
'                                            <family>--Segundo apellido del médico responsable del procedimiento--</family>'+
'                                        </name>'+
'                                    </assignedPerson>'+
'                                </assignedEntity>'+
'                            </performer>'+
'                            <participant typeCode="LOC">'+
'                                <participantRole classCode="SDLOC">'+
'                                    <!-- Ubicación/Servicio donde se realizó el procedimiento -->'+
'                                    <code codeSystem="2.16.840.1.113883.6.259" codeSystemName="HealthcareServiceLocation"  code="--Clave de la ubicación (serivicio) donde se realizó el procedimiento--" displayName="--ubicación (serivicio) donde se realizó el procedimiento--"/>'+
'                                </participantRole>'+
'                            </participant>'+
'                        </procedure>'+
'                    </entry>'+
'                </section>'+
'            </component>'+
' '+
'            <!-- ******************************************************** MEDICAMENTOS ADMINISTRADOS DURANTE LA ATENCIÓN  ******************************************************** -->'+
'            <component>'+
'                <section>'+
'                    <templateId root="2.16.840.1.113883.10.20.22.2.38"/>'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="29549-3" displayName="Medicamentos administrados"/>'+
'                    <title>Terapéutica empleada</title>'+
'                    <text>'+
'                        <table>'+
'                            <thead>'+
'                                <tr>'+
'                                    <th>Medicamento</th>'+
'                                    <th>Via de administración</th>'+
'                                    <th>Dosis</th>'+
'                                    <th>Fecha de inicio</th>'+
'                                    <th>Fecha de fin</th>'+
'                                    <th>Obs. prescripción</th>'+
'                                </tr>'+
'                            </thead>'+
'                            <tbody>'+
'                                <tr>'+
'                                    <td>--Nombre del medicamento/substancia activa--</td>'+
'                                    <td>--Vía de administración--</td>'+
'                                    <td>--Dosis por administrar--</td>'+
'                                    <td>--Fecha y hora de inicio de administración de medicamento"--</td>'+
'                                    <td>--Fecha y hora de término de administración de medicamento"--</td>'+
'                                    <td>--Observaciones adicionales acerca de la prescripción--</td>'+
'                                </tr>'+
'                            </tbody>'+
'                        </table>'+
'                    </text>'+
'                    '+
'                    <!-- Para cada medicamento administrado durante el epsidoio documentado en este CDA (0:n)-->'+
'                    <entry>'+
'                        <substanceAdministration classCode="SBADM" moodCode="EVN" negationInd="false">'+
'                            <!-- Observaciones generales sobre la medicación *debe aparecer textual en el texto de la sección o referenciarlo* -->'+
'                            <text>--Observaciones generales del medicamento administrado--</text>'+
'                            <statusCode code="completed"/>'+
'                            <!--  Vía de administración de acuerdo con el catálogo del Cuadro Básico de Medicamentos -->'+
'                            <routeCode codeSystem="2.16.840.1.113883.3.215.12.12" codeSystemName="Vía de Administración CBM" code="--Valor del identificador de Vía de administración--" displayName="--Nombre de Vía de administración--"/>'+
'                            <!-- Dosis y frecuencia-->'+
'                            <doseQuantity>'+
'                                <center value="--Cantidad administrada y frecuencia--"/>'+
'                            </doseQuantity>'+
'                            <effectiveTime>'+
'                                <!-- Fecha  de inicio de administración de medicamento en formato "aaaammddhhiiss"-->'+
'                                <low value="--aaaammddhhiiss--"/>'+
'                                <!-- Fecha  de término de administración de medicamento en formato "aaaammddhhiiss"-->'+
'                                <high value="--aaaammddhhiiss--"/>'+
'                            </effectiveTime>'+
'                            <consumable>'+
'                                <manufacturedProduct classCode="MANU">'+
'                                    <manufacturedMaterial>'+
'                                        <!-- Medicamento  de acuerdo con catálogo del Cuadro Básico de Medicamentos'+
'                                         code: clave en el Cuadro Básico'+
'                                         displayName: descripción del medicamento-->'+
'                                        <code codeSystem="2.16.840.1.113883.3.215.12.8" codeSystemName="Cuadro Básico de Medicamentos" code="--Valor del identificador del Medicamento de acuerdo a catálogo--"  displayName="--Nombre del medicamento de acuerdo a catálogo--"/>'+
'                                    </manufacturedMaterial>'+
'                                </manufacturedProduct>'+
'                            </consumable>'+
'                        </substanceAdministration>'+
'                    </entry>'+
''+
'              </section>'+
'            </component>'+
'            '+
'            <!-- *************************************** Evolución durante la atención ******************************************************** -->'+
'            <component>'+
'                <section>'+
'                    <templateId root="1.3.6.1.4.1.19376.1.5.3.1.3.5"/>'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="8648-8" displayName="Evolución"/>'+
'                    <title>Evolución durante la atención</title>'+
'                    <text>'+
'                        --Narrativa describiendo brevemente la evolución que el paciente ha tenido durante esta atención médica--'+
'                    </text>'+
'                </section>'+
'            </component>'+
'            '+
'            <!-- *************************************** Signos vitales ******************************************************** -->'+
'            <component>'+
'                <section>'+
'                    <templateId root="2.16.840.1.113883.10.20.22.2.4"/>'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="8716-3" displayName="Signos Vitales"/>'+
'                    <title>Signos vitales</title>'+
'                    <text>'+
'                        <table width="100%">'+
'                            <thead>'+
'                                <tr>'+
'                                      <th>Fecha</th>'+
'                                      <th>Signo</th>'+
'                                      <th>Valor</th>'+
'                                      <th>Observaciones</th>'+
'                                </tr>'+
'                            </thead>'+
'                            <tbody>'+
'                                <tr>'+
'                                     <td>--Fecha y hora de la toma del signo vital en formato "aaaammddhhiiss"--</td>'+
'                                     <td>--Nombre / descripción del signo vital--</td>'+
'                                     <td>--Valor / resultado del signo vital--</td>'+
'                                     <td>--Observaciones generales acerca del resultado del signo vital--</td>'+
'                                </tr>'+
'                            </tbody>'+
'                        </table>'+
'                    </text>'+
'                    '+
'                    <entry>'+
'                        <organizer classCode="CLUSTER" moodCode="EVN">'+
'                            <code codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" code="46680005" displayName="Signos vitales"/>'+
'                            <statusCode code="completed"/>'+
'                            '+
'                            <!-- Repetir para cada signo/medición -->'+
'                            <component>'+
'                                <observation classCode="OBS" moodCode="EVN">'+
'                                    <!-- Signo vital'+
'                                        code: clave del signo vital'+
'                                        displayName: nombre del signo vital'+
'                                     -->'+
'                                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="--Valor del identificador del signo vital a medir--" displayName="--Nombre del signo vital a medir--"/>'+
'                                    <statusCode code="completed"/>'+
'                                    <!-- Fecha-hora de la toma del signo vital -->'+
'                                    <effectiveTime value="--aaaammddhhiiss--"/>'+
'                                    <!-- Valor'+
'                                        value: medición física'+
'                                        unit: unidades'+
'                                     -->'+
'                                    <value xsi:type="PQ" value="--Resultado de la medición--" unit="--Unidad de expresión del resultado--"/>'+
'                                </observation>'+
'                            </component>'+
'                        </organizer>'+
'                    </entry>'+
'                    '+
'                </section>'+
'            </component>'+
'            '+
'            <!-- ************************************************** Resultados de laboratorio  ******************************************************** -->'+
'            <component>'+
'                <section>'+
'                    <templateId root="2.16.840.1.113883.10.20.22.2.3.1"/>'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="30954-2" displayName="Estudios de Laboratorio"/>'+
'                    <title>Estudios de laboratorio</title>'+
'                    <text>'+
'                        <!-- Repetir para cada batería realizada en el episodio -->'+
'                        <paragraph>--Identificación de la batería de pruebas o estudios de laboratorio realizados--</paragraph>'+
'                        <table width="100%">'+
'                            <thead>'+
'                                <tr>'+
'                                    <th>Prueba</th>'+
'                                    <th>Fecha de resultado</th>'+
'                                    <th>Resultado</th>'+
'                                    <th>Rango</th>'+
'                                </tr>'+
'                            </thead>'+
'                            <tbody>'+
'                                <!-- Agregar tantos renglones como sea necesario, de acuerdo a la totalidad de resultados -->'+
'                                <tr>'+
'                                    <td>--Nombre de la prueba o analito--</td>'+
'                                    <td>--Fecha y hora del resultado--</td>'+
'                                    <td>--Valor y unidad del resultado--</td>'+
'                                    <td>--Rango de referencia para el resultado de acuerdo al perfil del paciente--</td>'+
'                                </tr>'+
'                            </tbody>'+
'                        </table>'+
'                        <!-- (fin de repetición de cada batería) -->'+
'                    </text>'+
'                    <entry>'+
'                        '+
'                        <!-- Repetir para cada batería realizada en el episodio (0:N) -->'+
'                        <organizer classCode="BATTERY" moodCode="EVN">'+
'                            <!-- Tipo de batería realizada -->'+
'                            <code codeSystem="--OID del sistema de codificación--" codeSystemName="--Nombre del sistema de codificación--" code="--Clave de la batería realizada--" displayName="--Nombre de la batería"/>'+
'                            <statusCode code="completed"/>'+
'                            '+
'                            <!-- Repetir para cada resultado obtenido de las pruebas o estudios de laboratorio de la batería (0:N) -->'+
'                            <component>'+
'                                <observation classCode="OBS" moodCode="EVN">'+
'                                    <!-- Tipo de prueba realizada -->'+
'                                    <code codeSystem="--OID del sistema de codificación--" codeSystemName="--Nombre del sistema de codificación--" code="--Clave de la prueba realizada--"  displayName="--Nombre de la prueba realizada--"/>'+
'                                    <statusCode code="completed"/>'+
'                                    <!-- Fecha-hora del resultado -->'+
'                                    <effectiveTime value="--aaaammddhhiiss--"/>'+
'                                    <!-- Valor del resultado -->'+
'                                    <value xsi:type="PQ" value="--Resultado de la medición--" unit="--Unidad de expresión del resultado--"/>'+
'                                    <referenceRange>'+
'                                        <observationRange>'+
'                                            <text>--Rango de referencia para el resultado--</text>'+
'                                        </observationRange>'+
'                                    </referenceRange>'+
'                                </observation>'+
'                            </component>'+
'                            '+
'                        </organizer>'+
'                        '+
'                    </entry>'+
'                </section>'+
'            </component>'+
'            '+
'            <!-- **************************************************  Plan de tratamiento  ******************************************************** -->'+
'            <component>'+
'                <section>'+
'                    <templateId root="2.16.840.1.113883.10.20.22.2.10"/>'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="18776-5" displayName="Plan de tratamiento"/>'+
'                    <title>Plan de tratamiento y recomendaciones terapéuticas</title>'+
'                    <text>'+
'                        -- Indicaciones generales que deben seguir el paciente y/o equipo de atención, así como un listado de los medicamentos prescritos al alta del paciente. --'+
'                    </text>'+
'              </section>'+
'            </component>'+
'            '+
'            <!-- *************************************** Pronóstico de salud ******************************************************** -->'+
'            <component>'+
'                <section>                  	'+
'                    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="47420-5" displayName="Evaluación del Estado Funcional"/>'+
'                    <title>Pronóstico de salud del paciente</title>'+
'                    <text>--Pronóstico de la salud del paciente en texto libre--</text>'+
'                </section>'+
'            </component>'+
'        </structuredBody>'+
'    </component>'+
'</ClinicalDocument>';

        customerRec.setValue({fieldId: "custentity399", value: numero_de_version_del_documento_13});
      	customerRec.save({enableSourcing: false, ignoreMandatoryFields: true});
      
		//store in an XML
		/*var xmlDocument = xmlMod.Parser.fromString({text : myvarXML});
        var xmlStringContent = xmlMod.Parser.toString({document : xmlDocument});*/
        //var xmlEscapedDocument = xmlMod.escape({xmlText : myvarXML});
        var fileObj = file.create({
            name: 'test.xml',
            fileType: file.Type.XMLDOC,
            contents: myvar,
            description: 'This is a xml file.',
            encoding: file.Encoding.UTF8,
            folder: -4,
            isOnline: false
        });

      var xml_fileId = fileObj.save();
      context.response.write(xml_fileId.toString());
    }

    return {
        onRequest: onRequest
    };
});
