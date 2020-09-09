/**
 * Suitelet that changes the PO Form Type
 */
function crearFacturaCo(request, response)
{
  	/*var id = request.getParameter('paramInCo');
  	nlapiLogExecution('ERROR', 'crearFacturaCo: ', 'SL| Value request id parameter: ' + id);*/
  
  var valT = "POCD_HD000041";

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
'    <typeId root="2.16.840.1.113883.1.3" extension="'+
valT+'"/>'+
'    '+
'    <!-- Template para Documentos Clínicos en México [*]-->'+
'    <templateId root="2.16.840.1.113883.3.215.11.1.1"/>'+
'    '+
'    <!-- ******************************************************** ENCABEZADO DEL DOCUMENTO ******************************************************** -->'+
''+
'    <!-- Identificador único de este documento generado'+
'        - root: OID del sistema que genera el documento, o bien, del mecanismo de identificación de documentos que ocupe.'+
'        - extension: UUID o identificador único del documento generado por el sistema emisor.'+
'        - assigningAuthorityName: Nombre (corto) del sistema que está generado el documento (para mayor detalle ver <author>)'+
'    -->'+
'    <id root="--OID del identificador o sistema generador del documento--" extension="-- Valor del identificador único del documento --" assigningAuthorityName="--Nombre del Sistema--"/>'+
'    '+
'    <!-- Tipo de documento (tomar de valores seleccionados para México de LOINC)  -->'+
'    <code codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" code="34133-9" displayName="Nota Resumen de Episodio"/>'+
'    '+
'    <!-- Título de acuerdo al tipo de CDA que se está generando -->'+
'    <title>Resumen Clínico</title>'+
'    '+
'    <!-- Momento de generación del CDA en formato aaaammddhhiiss-->'+
'    <effectiveTime value="--aaaammddhhiiss--"/>'+
'    '+
'    <!-- Nivel de confidencialidad de acuerdo al catálogo de HL7. Posibles códigos y valores: '+
'           L - Bajo'+
'           M - Moderado'+
'           N - Normal'+
'           R - Restringido'+
'           U - Irrestricto'+
'           V - Muy restringido'+
'    -->'+
'    <confidentialityCode codeSystem="2.16.840.1.113883.5.25" codeSystemName="Confidentiality" code="--Valor del Nivel de confidencialidad de acuerdo al catálogo--" displayName="--Nombre del Nivel de confidencialidad de acuerdo al catálogo--"/>'+
'    '+
'    <!-- Código del lenguaje en el que se genera el contenido del documento -->'+
'    <languageCode code="es-MX"/>'+
'    '+
'    <!-- Identificador del documento base (igual al id del documento en caso de la primera versión del mismo) -->'+
'    <setId root="--OID de identificación del documento base del sistema--" extension="--Identificador único del documento base--" assigningAuthorityName="--Nombre del sistema generador del documento base--"/>'+
'    '+
'    <!-- Versión del documento -->'+
'    <versionNumber value="--Número de versión del documento--"/>'+
'    '+
'    <!-- Datos del paciente  -->'+
'    <recordTarget>'+
'        <patientRole>'+
'            <!-- Identificador ÚNICO del paciente en el sistema que genera el documento.'+
'             - root: OID del sistema de identificación.'+
'             - extension: identificador del paciente.'+
'             - assigningAuthorityName:  descripción legible del identificador-->'+
'            <id root="---OID del Identificador único de paciente--" extension="--Valor único del identificador de paciente--" assigningAuthorityName="--Nombre del identificador usado por el sistema--"/>'+
'    '+
'            <!-- extension: CURP del paciente -->'+
'            <id root="2.16.840.1.113883.4.629" extension="--Clave Unica de Registro de Población (CURP) del paciente--" assigningAuthorityName="CURP"/>'+
'            '+
'            <!-- Otros identificadores relevantes-->'+
'            <id root="--OID Identificador adicional de paciente--" extension="--Identificador adicional de paciente--" assigningAuthorityName="--Nombre del identificador adicional de paciente--"/>'+
'            '+
'            <!-- Nacionalidad del paciente de acuerdo al catálogo de RENAPO-->'+
'            <id root="2.16.840.1.113883.3.215.12.15"  extension="--Valor de nacionalidad de acuerdo a catálogo--" assigningAuthorityName="Nacionalidad" />'+
'            '+
'            <!-- Edad del paciente en años en el momento de la atención -->'+
'            <id root="2.16.840.1.113883.3.215.12.501" extension="--Edad del paciente--" assigningAuthorityName="Edad"/>'+
'            '+
'            <!-- Domicilio de residencia del paciente. En caso de definirse más de un domicilio para el paciente, el de residencia debe ser el primero y con @use="HP"-->'+
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
'                <precinct>--Valor de Localidad de acuerdo al catálogo--</precinct>'+
'                <!--Muncipio de acuerdo al catálogo de INEGI -->'+
'                <county>--Valor de Municipio de acuerdo al catálogo--</county>'+
'                <!--Entidad de acuerdo al catálogo de INEGI-->'+
'                <state>--Valor de Entidad de acuerdo al catálogo--</state>'+
'                <!--Código Postal de acuerdo al catálogo de SEPOMEX-->'+
'                <postalCode>--Valor de Código Postal de acuerdo al catálogo--</postalCode>'+
'                <!--Clave del país de acuerdo al catálogo de nacionalidades-->'+
'                <country>--País--</country>'+
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
'                    <given>--Nombre(s)--</given>'+
'                    <!--Primer apellido del paciente-->'+
'                    <family>--Primer apellido--</family>'+
'                    <!--Segundo apellido del paciente-->'+
'                    <family>--Segundo apellido--</family>'+
'                </name>'+
'                '+
'                <!-- Sexo del paciente  de acuerdo a catálogo de HL7 referido en el OID. Posibles valores: (F, M, U) o UNK si se desconce)-->'+
'                <administrativeGenderCode codeSystem="2.16.840.1.113883.5.1" codeSystemName="Administrative Gender" code="--Valor del Sexo de acuerdo a catálogo--" displayName="--Nombre del Sexo de acuerdo a catálogo--"/>'+
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
'                            <state>--Valor de la Entidad de acuerdo al catálogo--</state>'+
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
'                        -- Domicilio completo en texto libre--'+
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
'                        <precinct>--Valor de Localidad de acuerdo al catálogo--</precinct>'+
'                        <!--Muncipio de acuerdo al catálogo de INEGI -->'+
'                        <county>--Valor de Municipio de acuerdo al catálogo--</county>'+
'                        <!--Entidad de acuerdo al catálogo de INEGI-->'+
'                        <state>--Valor de Entidad de acuerdo al catálogo--</state>'+
'                        <!--Código Postal de acuerdo al catálogo de SEPOMEX-->'+
'                        <postalCode>--Valor de Código Postal de acuerdo al catálogo--</postalCode>'+
'                        <!--Clave del país de acuerdo al catálogo de nacionalidades-->'+
'                        <country>--País--</country>'+
'                    </addr>'+
'                    '+
'                    <!-- Medios de contacto del responsable del paciente (1:N): teléfono, correo, etc. -->'+
'                    <telecom value="tel:--Número telefónico--"/>'+
'                    <telecom value="mailto:--Correo electrónico--"/>'+
'		'+
'                    <guardianPerson>'+
'                        <!-- Nombre completo del responsable legal del paciente -->'+
'                        <name>'+
'                            <!--Nombre(s) del responsable del paciente-->'+
'                            <given>--Nombre(s)--</given>'+
'                            <!--Primer apellido del responsable del paciente-->'+
'                            <family>--Primer apellido--</family>'+
'                            <!--Segundo apellido del responsable del paciente-->'+
'                            <family>--Segundo apellido--</family>'+
'                        </name>'+
'                    </guardianPerson>'+
'                </guardian>'+
'            </patient>'+
'            '+
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
'    <!-- Datos del destinatario del documento-->'+
'    <informationRecipient>'+
'        <intendedRecipient>'+
'            <!--extension: Cédula profesional del médico destinatario-->'+
'            <id root=\'2.16.840.1.113883.3.215.12.18\' extension="--Número de cédula profesional--"/>'+
'            <!-- Medios de contacto del destinatario del documento -->'+
'            <telecom value="tel:--Número telefónico--"/>'+
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
'                <precinct>--Valor de Localidad de acuerdo al catálogo--</precinct>'+
'                <!--Muncipio de acuerdo al catálogo de INEGI -->'+
'                <county>--Valor de Municipio de acuerdo al catálogo--</county>'+
'                <!--Entidad de acuerdo al catálogo de INEGI-->'+
'                <state>--Valor de Entidad de acuerdo al catálogo--</state>'+
'                <!--Código Postal de acuerdo al catálogo de SEPOMEX-->'+
'                <postalCode>--Valor de Código Postal de acuerdo al catálogo--</postalCode>'+
'                <!--Clave del país de acuerdo al catálogo de nacionalidades-->'+
'                <country>--País--</country>'+
'            </addr>'+
'            <informationRecipient>'+
'                <!-- Nombre completo del destinatario (i.e. médico consultado) al que se dirige este CDA -->'+
'                <name>'+
'                    <!--Nombre(s) del destinatario del documento-->'+
'                    <given>--Nombre(s)--</given>'+
'                    <!--Primer apellido del destinatario del documento-->'+
'                    <family>--Primer apellido--</family>'+
'                    <!--Segundo apellido del destinatario del documento-->'+
'                    <family>--Segundo apellido--</family>'+
'                </name>'+
'            </informationRecipient>'+
'            <receivedOrganization>'+
'                <!-- OID de la institución a la que pertenece el destinatario -->'+
'                <id root="--OID de la institución/organización/dependencia a la que pertenece el destinatario"/>'+
'                <!-- Clave Única de Establecimiento de Salud donde se encuentra el destinatario de acuerdo al catálogo de CLUES de la SS/DGIS-->'+
'                <id root="2.16.840.1.113883.4.631" extension="--Valor de la CLUES de acuerdo al catálogo--" assigningAuthorityName="CLUES"/>'+
'                <!-- Nombre de la institución a la que pertenece el destinatario -->'+
'                <name>--Nombre de la institución/organización/dependencia a la que pertenece el destinatario--</name>'+
'            </receivedOrganization>'+
'        </intendedRecipient>'+
'    </informationRecipient>'+
'    '+
'    <!-- Autor (Sistema que genera el CDA e institución) -->'+
'    <author>'+
'        <!-- Momento de generación del CDA, o bien, momento en el que se obtienen los datos para generarlo -->'+
'        <time value="aaaammddhhiiss"/>'+
'        <assignedAuthor>'+
'            <!-- OID del sistema que genera el CDA -->'+
'            <id root="---OID del sistema que genera el CDA--"/>'+
'            <assignedAuthoringDevice>'+
'                <!-- Nombre del sistema (Fabricante, Producto, Versión) que genera el documento electrónico -->'+
'                <softwareName>--Software, Dispositivo,Producto--</softwareName>'+
'                <!-- Descripción (fabricante, modelo) del dispositivo que genera el documento electrónico -->'+
'                <manufacturerModelName>--Versión del software, modelo del dispositivo o producto--</manufacturerModelName>                '+
'            </assignedAuthoringDevice>'+
'            <!-- Medios de contacto de la institución responsable de la autoría del documento electrónico -->'+
'            <telecom value="tel:--Número telefónico--"/>'+
'            <telecom value="mailto:--Correo Electrónico--"/>'+
'            <!-- Domicilio "legible" de la institución responsable de la autoría del documento electrónico -->'+
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
'                <precinct>--Valor de Localidad de acuerdo al catálogo--</precinct>'+
'                <!--Muncipio de acuerdo al catálogo de INEGI -->'+
'                <county>--Valor de Municipio de acuerdo al catálogo--</county>'+
'                <!--Entidad de acuerdo al catálogo de INEGI-->'+
'                <state>--Valor de Entidad de acuerdo al catálogo--</state>'+
'                <!--Código Postal de acuerdo al catálogo de SEPOMEX-->'+
'                <postalCode>--Valor de Código Postal de acuerdo al catálogo--</postalCode>'+
'                <!--Clave del país de acuerdo al catálogo de nacionalidades-->'+
'                <country>--País--</country>'+
'            </addr>'+
'            <representedOrganization>'+
'                <!-- OID de la institución responsable de la autoría del documento electrónico -->'+
'                <id root="-- OID de la Institución responsable de la autoría del documento electrónico --"/>'+
'                <!-- Nombre de la institución responsable de la autoría del documento -->'+
'                <name>-- Nombre de la Institución responsable de la autoría del documento electrónico --</name>'+
'            </representedOrganization>'+
'        </assignedAuthor>'+
'    </author>'+
'    '+
'    <!-- Datos de identificación del Capturista de los datos del documento electrónico -->'+
'    <dataEnterer>'+
'        <!-- Momento en que el usuario introdujo los datos del documento en el software. Formato de fecha aaaammddhhiiss-->'+
'        <time value="--aaaammddhhiiss--"/>'+
'        <assignedEntity>'+
'            <!-- Identificador único del usuario que introduce los datos en el software'+
'             - root: OID del sistema de identificación de usuarios, puede ser uno propio o uno estándar como la cédula profesional'+
'             - extension: Valor del dentificador del usuario-->'+
'            <id root="--OID del sistema de identificador único del usuario capturista--" extension="--Valor del identificador único del usuario capturista--"/>'+
'            <assignedPerson>'+
'                    <!-- Nombre completo del usuario capturista de este documento -->'+
'                    <name>'+
'                    	<!--Nombre(s) del Capturista del documento-->'+
'                    	<given>--Nombre(s)--</given>'+
'                    	<!--Primer apellido del Capturista del documento-->'+
'                    	<family>--Primer apellido--</family>'+
'                    	<!--Segundo apellido del Capturista del documento-->'+
'                    	<family>--Segundo apellido--</family>'+
'                    </name>'+
'            </assignedPerson>'+
'        </assignedEntity>'+
'    </dataEnterer>'+
'    '+
'    <!-- Responsable del archivamiento, esto es, resguardo del CDA y su documentación original -->'+
'    <custodian>'+
'        <assignedCustodian>'+
'            <representedCustodianOrganization>'+
'                <!-- Clave Única del Establecimiento de Salud de acuerdo al catálogo CLUES de la SS/DGIS donde se encuentra la documentación física respaldo de este documento electrónico -->'+
'                <id root="2.16.840.1.113883.4.631" extension="--Valor de la CLUES de acuerdo al catálogo--" assigningAuthorityName="CLUES"/>'+
'                <!-- Nombre del establecimiento donde se encuentra la documentación física respaldo de este documento electrónico -->'+
'                <name>--Nombre del Establecimiento de salud de acuerdo al catálogo de CLUES--</name>'+
'                <!-- Medios de contacto del establecimiento donde se encuentra la documentación física respaldo de este documento electrónico -->'+
'                <telecom value="tel:--Número telefónico--"/>'+
'                <telecom value="mailto:--Correo Electrónico--"/>'+
'                '+
'                <!-- Domicilio del establecimiento que resguarda la información -->'+
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
'            </representedCustodianOrganization>'+
'        </assignedCustodian>'+
'    </custodian>'+
'    '+
'    <!-- Responsable legal "firmante" de este documento -->'+
'    <legalAuthenticator>'+
'        <!-- Momento de firma del documento en formato "aaaammddhhiiss"-->'+
'        <time value="--aaaammddhhiiss--"/>'+
'        <!--Código para determinar si el documento fué firmado y puede terner los siguientes valores:'+
'            S = Firmado.'+
'            X  = Se requiere la firma'+
'        -->'+
'        <signatureCode code="--Valor del código para determinar si la firma fue plasmada en el documento--"/>'+
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
'                <precinct>--Valor de Localidad de acuerdo al catálogo--</precinct>'+
'                <!--Muncipio de acuerdo al catálogo de INEGI -->'+
'                <county>--Valor de Municipio de acuerdo al catálogo--</county>'+
'                <!--Entidad de acuerdo al catálogo de INEGI-->'+
'                <state>--Valor de Entidad de acuerdo al catálogo--</state>'+
'                <!--Código Postal de acuerdo al catálogo de SEPOMEX-->'+
'                <postalCode>--Valor de Código Postal de acuerdo al catálogo--</postalCode>'+
'                <!--Clave del país de acuerdo al catálogo de nacionalidades-->'+
'                <country>--País--</country>'+
'            </addr>'+
'            <!-- Medios de contacto del responsable legal del documento -->'+
'            <telecom value="tel:--Número telefónico--"/>'+
'            <telecom value="mailto:--Correo Electrónico--"/>'+
'            <assignedPerson>'+
'                <!-- Nombre completo del responsable legal que firma el documento -->'+
'                <name>'+
'                    <!--Nombre(s) del Responsable legal del documento-->'+
'                    <given>--Nombre(s)--</given>'+
'                    <!--Primer apellido del Responsable legal del documento-->'+
'                    <family>--Primer apellido--</family>'+
'                    <!--Segundo apellido del Responsable legal del documento-->'+
'                    <family>--Segundo apellido--</family>'+
'                </name>'+
'            </assignedPerson>'+
'        </assignedEntity>'+
'    </legalAuthenticator>'+
'    '+
'    <!-- Datos del "episodio" (periodo de tiempo con una o más atenciones relacionadas con un problema) que documenta este CDA -->'+
'    <documentationOf typeCode="DOC">'+
'        <serviceEvent classCode="PCPR">'+
'            <!-- Identificador único del "episodio" dentro del sistema que genera este documento'+
'             - root: OID del identificador de episodios que se esté ocupando'+
'             - extension: Valor del identificador -->'+
'            <id root="-- OID del identificador de episodios que se esté ocupando --" extension="--Valor del Identificador único del episodio--"/>'+
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

    // Create File
    var file = nlapiCreateFile('searchresults123.xml', 'XMLDOC', myvar);
	file.setFolder(-4); // 1139356
    file.setEncoding('UTF-8');
    var fileId = nlapiSubmitFile(file);

    // You can either write result on the same page
    response.setContentType(file.getType());
    response.write(file.getValue());

	/*nlapiLogExecution('AUDIT', 'SL| invoke_ws(xml) response:', bodyResp);
    // create file
            if (valtranid != null && valtranid !== '' && valentity != null && valentity !== '' && respp == 'Archivo TXT cargado Correctamente') {
   					      var mesfolder = getMesFolder(month);
              		var newFile = nlapiCreateFile(fileName, 'PLAINTEXT', valTXT);
                    newFile.setFolder(mesfolder); // 1139356
                    newFile.setEncoding('UTF-8');
                    var fileId = nlapiSubmitFile(newFile);

              	  	inRecord.setFieldValue('custbody45', respp);
              		inRecord.setFieldValue('custbody33', 'Si');
              		inRecord.setFieldValue('custbody46', fileName + ' | ' + detalleFac);
      				nlapiLogExecution('AUDIT', 'SL| PROCESADO (INVOICECO): ', 'Value PROCESADO (INVOICECO): Si');
              		nlapiSubmitRecord(inRecord, false, true);
                    nlapiLogExecution('AUDIT', 'SL| crearFacturaCo(): ', 'Invoice redirecting...');
                    nlapiSetRedirectURL('RECORD', 'invoice', idparam, false);
              }
  			  else if(respp !== 'Archivo TXT cargado Correctamente'){
                    inRecord.setFieldValue('custbody45', respp);
              		inRecord.setFieldValue('custbody33', 'No');
      				nlapiLogExecution('AUDIT', 'SL| PROCESADO (INVOICECO): ', 'Value PROCESADO (INVOICECO): No');
              		nlapiSubmitRecord(inRecord, false, true);
                    nlapiLogExecution('AUDIT', 'SL| crearFacturaCo(): ', 'Invoice redirecting...');
                    nlapiSetRedirectURL('RECORD', 'invoice', idparam, false);
              }*/
}




function invoke_ws(xml){

    //Set up Headers
    var headers = new Array();
    headers['User-Agent-x'] = 'SuiteScript-Call';
    headers['Content-Type'] = 'text/xml; charset=utf-8';
  	headers['Content-Length']= 'length';
    headers['SOAPAction'] = 'http://tempuri.org/CargarTxt';
	var url = 'http://api.stupendo.co/ServicioCargaTxtColombia/WebServiceReceptaProceso.asmx'; // http://184.106.39.67/ServicioCargaTxtColombia/WebServiceReceptaProceso.asmx
    var resp = null;
    if (xml)  {
    	// blindly re-try upon error
    	try{
    		resp = nlapiRequestURL(url, xml, headers);
    	}catch(e){
    		resp = nlapiRequestURL(url, xml, headers);
    	}
    }
  	else{
    	resp = nlapiRequestURL(url, null , headers);
    }
    return resp.getBody();
}