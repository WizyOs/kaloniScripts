<?xml version="1.0"?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:n3="http://www.w3.org/1999/xhtml" 
	xmlns:n1="urn:hl7-org:v3" 
	xmlns:n2="urn:hl7-org:v3/meta/voc" 
	xmlns:voc="urn:hl7-org:v3/voc" 
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<xsl:output method="html" indent="yes" version="4.01" encoding="ISO-8859-1" doctype-public="-//W3C//DTD HTML 4.01//EN"/>

<!-- CDA document -->

<xsl:variable name="tableWidth">50%</xsl:variable>
<xsl:variable name="path">cda/</xsl:variable>

<xsl:variable name="title">
    <xsl:choose>
         <xsl:when test="/n1:ClinicalDocument/n1:title">
             <xsl:value-of select="/n1:ClinicalDocument/n1:title"/>
         </xsl:when>
             <xsl:otherwise>Documento Médico</xsl:otherwise>
    </xsl:choose>
</xsl:variable>

<xsl:template match="/">
<xsl:apply-templates select="n1:ClinicalDocument"/>
</xsl:template>

<xsl:template match="n1:ClinicalDocument">
        <html>
            <head>
		<!-- <meta name='Generator' content='&CDA-Stylesheet;'/> -->
                <xsl:comment>
                        Do NOT edit this HTML directly, it was generated via an XSLt
                        transformation from the original release 2 CDA Document.
                </xsl:comment>
                <title>
                     <xsl:value-of select="$title"/>
                </title>
		<link rel="stylesheet" type="text/css" >
			<xsl:attribute name="href">
				<xsl:value-of select="concat($path,'/v4/css/stylesheet.css')"/>
			</xsl:attribute>
		</link>
		<link rel="stylesheet" type="text/css" media="print" >
			<xsl:attribute name="href">
				<xsl:value-of select="concat($path,'/v4/css/stylesheet.css')"/>
			</xsl:attribute>
		</link>
                <style >
                /*Anexado a stylesheet.css*/
		/*.text { font-size:0.6em; display:none; }
		.text-only {}
		table {border-collapse: collapse; margin-bottom:10px; width:100%}
		table th { background: #b3f36d; font-weight: bold;}
		table td {border-bottom:1px solid black; }

		table.header td { padding:2px 3px; }*/
		.entry, .entryPBD {display:none;}

		/* Comentar de aqui para abajo para quitar las lineas y comentarios didacticos */
/*
		.IHE-R  { border: 2px solid #639a00; margin-bottom:3px; padding:0px 2px 2px 2px;}
		.IHE-R2 { border: 2px solid #a60800; margin-bottom:3px; padding:0px 2px 2px 2px;}
		.IHE-O  { border: 2px solid #a43dd4; margin-bottom:3px; padding:0px 2px 2px 2px;}
		.IHE-R::before
		{
		content:"Obligatorio";
		background-color:#639a00;
		font-weight:bold;
		} 
		.IHE-R2::before
		{
		content:"Obligatorio si hay datos";
		background-color:#a60800;
		font-weight:bold;
		} 
		.IHE-O::before
		{
		content:"Opcional";
		background-color:#a43dd4;
		font-weight:bold;
		} */
/*
		.text      {border: 1px solid #000;margin: 1px 0px; padding:1px; display:block;}
		.text::before {content:"Texto:"; font-weight:bold; display:block; margin-left:5px;}
		.text-only {}

                .entry, .entryPBD { background-color: #b165d4; font-size:8px; display:block;}
                .entry legend { background-color:#b4f63d; }
                .entry::before {
				content:"Entry";
				background-color:#b4f63d;
				font-weight:bold;
		} 
                .entryPBD::before {
				content:"Entry";
				background-color:#00ff00;
				font-weight:bold;
		} 
*/
                </style>
	    </head>
            <xsl:comment>				
              Derived from HL7 Finland R2 Tyylitiedosto: Tyyli_R2_B3_01.xslt
	      Updated by   Calvin E. Beebe,   Mayo Clinic - Rochester Mn.
	      Modificado por Miguel Ruiz Velasco Sobrino y Marco Antonio Sotomayor Sobrino
	      
            </xsl:comment>
            <body>            
           <div class="divTable">
          	
                <h2 align="center"><img alt="SAMIH"  height="81" width="266">
			<xsl:attribute name="src">
				<xsl:value-of select="concat($path,'/v4/images/logo_encabezado.png')"/>
			</xsl:attribute>                
                </img>
                </h2>
		                <h2 align="center"><xsl:value-of select="$title"/>
		                <xsl:text> </xsl:text>
		                <xsl:value-of select="/n1:ClinicalDocument/n1:id/@assigningAuthorityName"/>
		                <!-- <xsl:text> #</xsl:text><xsl:value-of select="/n1:ClinicalDocument/n1:id/@extension"/> -->
                </h2>

		<table width='100%' class="header">

		<tr>
                       <td width='18%' align='right'><b><xsl:text>Fecha de creación </xsl:text></b></td>
		       <td width='25%'><xsl:call-template name="formatDate">
   		                       <xsl:with-param name="date" 
 		                select="/n1:ClinicalDocument/n1:effectiveTime/@value"/>
                        </xsl:call-template>
                       </td>
		       <td width='18%' align='right'><b><xsl:text>Número de Docto </xsl:text></b></td>
		       <td width='25%'>
		       		<xsl:value-of select="/n1:ClinicalDocument/n1:id/@extension"/>
                       </td>
		   </tr>

		   <tr>
		       <td width='18%' align="right"><big><b><xsl:text>Paciente </xsl:text></b></big></td>
		       <td width='18%'><big><xsl:call-template name="getName">
   		                            <xsl:with-param name="name" 
 		                     select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:patient/n1:name"/>
                                 </xsl:call-template></big></td>
                       <td width='18%' align='right'><b>
                       <xsl:choose>
                       <xsl:when test="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:id[1]/@assigningAuthorityName">
                       <xsl:value-of select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:id[1]/@assigningAuthorityName"/>
                       </xsl:when>
                       <xsl:otherwise>
                       <xsl:text>Id del paciente </xsl:text>
                       </xsl:otherwise>
                       </xsl:choose>
                       </b></td>
		       <td width='18%'>
			<xsl:value-of select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:id[1]/@extension"/>
			</td>
		   </tr>

<tr>
		   	<td width='18%' align="right"><b><xsl:text>CURP </xsl:text></b></td>
		       <td width='18%'><xsl:value-of select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:id[@root='2.16.840.1.113883.4.629']/@extension"/></td>
		       <td width='18%' align='right'><b><xsl:text>Género </xsl:text></b></td>
		   	   <td width='18%'><xsl:variable name="sex" 
                                select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:patient/n1:administrativeGenderCode/@code"/>
                           <xsl:choose>
                               <xsl:when test="$sex='M'">Hombre</xsl:when>
                               <xsl:when test="$sex='F'">Mujer</xsl:when>
                           </xsl:choose>
                </td>
</tr>

   <tr>
		   	<td width='18%' align="right"><b><xsl:text>Fecha de nacimiento </xsl:text></b></td>
                       <td width='18%'><xsl:call-template name="formatDate">
   		                       <xsl:with-param name="date" 
 		                select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:patient/n1:birthTime/@value"/>
                              </xsl:call-template>
                        <!-- Edad -->
			<!-- <xsl:if test="//n1:section[n1:code/@code='10157-6' and n1:code/@codeSystem='2.16.840.1.113883.6.1']/n1:entry/n1:organizer/n1:component/n1:observation[n1:code/@code='445518008' and n1:code/@codeSystem='2.16.840.1.113883.6.96']/n1:value/@value">
			(<xsl:value-of select="//n1:section[n1:code/@code='10157-6' and n1:code/@codeSystem='2.16.840.1.113883.6.1']/n1:entry/n1:organizer/n1:component/n1:observation[n1:code/@code='445518008' and n1:code/@codeSystem='2.16.840.1.113883.6.96']/n1:value/@value"/>)
			</xsl:if> -->
			<xsl:if test="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:id[@root='2.16.840.1.113883.3.215.5.9.1.1.0.19.9.9.9']">
			(<xsl:value-of select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:id[@root='2.16.840.1.113883.3.215.5.9.1.1.0.19.9.9.9']/@extension"/> años)
			</xsl:if>
		</td>
           <td width='18%' align='right'><b><xsl:text>Nacionalidad</xsl:text></b></td>
		   <td width='18%'>
		   <xsl:choose>
		   <xsl:when test="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:id[@root='2.16.840.1.113883.3.215.12.15']/@extension">
			<xsl:value-of
                                select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:id[@root='2.16.840.1.113883.3.215.12.15']/@extension"/>
		   </xsl:when>
		   <xsl:otherwise>
		   	<xsl:call-template name="nullFlavor">
			   	<xsl:with-param name="value" select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:id[@root='2.16.840.1.113883.3.215.12.15']/@nullFlavor"/>
		   	</xsl:call-template>
		   </xsl:otherwise>
		   
		   </xsl:choose>
                        
		   </td>
   </tr>

	<tr>
           <td width='18%' align='right'><b><xsl:text>Estado civil</xsl:text></b></td>
		   <td width='18%'>
			<xsl:call-template name="CS">
				<xsl:with-param name="node" select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:patient/n1:maritalStatusCode" />
			</xsl:call-template>
		   </td>
           <td width='18%' align='right'><b><xsl:text>Religión</xsl:text></b></td>
		   <td width='18%'>
			<xsl:call-template name="CS">
				<xsl:with-param name="node" select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:patient/n1:religiousAffiliationCode" />
			</xsl:call-template>
                        
		   </td>
	</tr>
	<tr>
           <td width='18%' align='right'><b><xsl:text>Etnia</xsl:text></b></td>
		   <td width='18%'>
			<xsl:call-template name="CS">
				<xsl:with-param name="node" select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:patient/n1:ethnicGroupCode" />
			</xsl:call-template>
                        
		   </td>
<!--           <td width='18%' align='right'><b><xsl:text>Raza</xsl:text></b></td>
		   <td width='18%'>
			<xsl:call-template name="CS">
				<xsl:with-param name="node" select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:patient/n1:raceCode" />
			</xsl:call-template>
		   </td>-->
	</tr>



                   <tr><td width='18%' align="right"><b><xsl:text>Médico </xsl:text></b></td>
		       <td width='25%'>

                          <xsl:choose>
                               <xsl:when test="/n1:ClinicalDocument/n1:responsibleParty/n1:assignedEntity/n1:assignedPerson/n1:name">
                               <xsl:call-template name="getName">
        		               <xsl:with-param name="name" 
        		                    select="/n1:ClinicalDocument/n1:responsibleParty/n1:assignedEntity/n1:assignedPerson/n1:name"/>
                               </xsl:call-template> /  
                               <xsl:call-template name="getName">
        		               <xsl:with-param name="name" 
        		                    select="/n1:ClinicalDocument/n1:responsibleParty/n1:assignedEntity/n1:representedOrganization/n1:name"/>
                               </xsl:call-template> / 
                               <xsl:call-template name="getName">
        		               <xsl:with-param name="name" 
        		                    select="/n1:ClinicalDocument/n1:responsibleParty/n1:assignedEntity/n1:representedOrganization/n1:name[2]"/>
                               </xsl:call-template>
                               </xsl:when>
                               <xsl:otherwise>
                                  <xsl:call-template name="getName">
        		               <xsl:with-param name="name" 
        		                    select="/n1:ClinicalDocument/n1:author/n1:assignedAuthor/n1:assignedPerson/n1:name"/>
                               </xsl:call-template>  
				<xsl:if test="/n1:ClinicalDocument/n1:author/n1:assignedAuthor/n1:id/@extension">
				Ced.Prof.<xsl:value-of select="/n1:ClinicalDocument/n1:author/n1:assignedAuthor/n1:id/@extension" />
				</xsl:if>
                               </xsl:otherwise>
                          </xsl:choose>

			       <xsl:if test="/n1:ClinicalDocument/n1:documentationOf/n1:serviceEvent/n1:performer/n1:assignedEntity/n1:assignedPerson">
			       <xsl:call-template name="getName">
				       <xsl:with-param name="name" 
					    select="/n1:ClinicalDocument/n1:documentationOf/n1:serviceEvent/n1:performer/n1:assignedEntity/n1:assignedPerson/n1:name"/>
			       </xsl:call-template> 
				
				</xsl:if>
			  
			  </td>
                       <td width='18%' align='right'><b><xsl:text>Cédula</xsl:text></b></td>
		       <td width='25%'>
		      	 <xsl:if test="/n1:ClinicalDocument/n1:documentationOf/n1:serviceEvent/n1:performer/n1:assignedEntity/n1:id">
					<xsl:value-of select="/n1:ClinicalDocument/n1:documentationOf/n1:serviceEvent/n1:performer/n1:assignedEntity/n1:id[@root='2.16.840.1.113883.3.215.5.9.4.2']/@extension"/>
				 </xsl:if>
		       </td>
		   </tr>
		   

		   
                   <tr>
		       <td width='18%' align="right" ><b><xsl:text>Establecimiento de salud</xsl:text></b></td>
		       <td width='25%'>


			       <xsl:call-template name="getName">
				       <xsl:with-param name="name" 
					    select="/n1:ClinicalDocument/n1:documentationOf/n1:serviceEvent/n1:performer/n1:assignedEntity/n1:representedOrganization/n1:name"/>
			       </xsl:call-template>  
			       <br/>
				
			       <xsl:call-template name="AD">
			       	<xsl:with-param name="addr" select="/n1:ClinicalDocument/n1:documentationOf/n1:serviceEvent/n1:performer/n1:assignedEntity/n1:representedOrganization/n1:addr" />
			       </xsl:call-template>
			       <xsl:value-of select="/n1:ClinicalDocument/n1:documentationOf/n1:serviceEvent/n1:performer/n1:assignedEntity/n1:representedOrganization/n1:telecom/@value"/>
			       
					<xsl:for-each select="/n1:ClinicalDocument/n1:documentationOf/n1:serviceEvent/n1:performer/n1:assignedEntity/n1:representedOrganization/n1:id[@displayable='true']">
						<br/>
						<xsl:value-of select="./@assigningAuthorityName" /><xsl:text>: </xsl:text>
						<xsl:value-of select="./@extension" />
						
					</xsl:for-each>
<!-- 			       CLUES: <xsl:value-of select="/n1:ClinicalDocument/n1:documentationOf/n1:serviceEvent/n1:performer/n1:assignedEntity/n1:representedOrganization/n1:id[@root='2.16.840.1.113883.4.631']/@extension"/> -->
<!-- 			       Lic. SSA: <xsl:value-of select="/n1:ClinicalDocument/n1:documentationOf/n1:serviceEvent/n1:performer/n1:assignedEntity/n1:representedOrganization/n1:id[@root='2.16.840.1.113883.2.38.2.1']/@extension"/> -->

		       </td>

                   <td width='18%' align='right'><b><xsl:text>Prestador de servicios de salud</xsl:text></b></td>
		       <td width='25%'>
				<xsl:call-template name="getName">
				       <xsl:with-param name="name" 
					    select="/n1:ClinicalDocument/n1:author/n1:assignedAuthor/n1:representedOrganization"/>
			       </xsl:call-template>  
			       <br/>
			       <xsl:value-of select="/n1:ClinicalDocument/n1:author/n1:assignedAuthor/n1:addr"/>
			       <xsl:value-of select="/n1:ClinicalDocument/n1:author/n1:assignedAuthor/n1:telecom/@value"/>
<!--
		       <xsl:call-template name="getName">
			       <xsl:with-param name="name" 
				    select="/n1:ClinicalDocument/n1:custodian/n1:assignedCustodian/n1:assignedPerson/n1:name"/>
		       </xsl:call-template>
		       <xsl:call-template name="getName">
			       <xsl:with-param name="name" 
				    select="/n1:ClinicalDocument/n1:custodian/n1:assignedCustodian/n1:representedCustodianOrganization/n1:name"/>
		       </xsl:call-template> 
		       <br/>
		       <xsl:value-of select="/n1:ClinicalDocument/n1:custodian/n1:assignedCustodian/n1:representedCustodianOrganization/n1:addr"/>
-->
<!--
                          <xsl:choose>
                               <xsl:when test="/n1:ClinicalDocument/n1:custodian/n1:assignedCustodian/n1:assignedPerson/n1:name">
                               <xsl:call-template name="getName">
        		               <xsl:with-param name="name" 
        		                    select="/n1:ClinicalDocument/n1:custodian/n1:assignedCustodian/n1:assignedPerson/n1:name"/>
                               </xsl:call-template> /  
                               <xsl:call-template name="getName">
        		               <xsl:with-param name="name" 
        		                    select="/n1:ClinicalDocument/n1:responsibleParty/n1:assignedEntity/n1:representedOrganization/n1:name"/>
                               </xsl:call-template> / 
                               <xsl:call-template name="getName">
        		               <xsl:with-param name="name" 
        		                    select="/n1:ClinicalDocument/n1:responsibleParty/n1:assignedEntity/n1:representedOrganization/n1:name[2]"/>
                               </xsl:call-template>
                               </xsl:when>
                               <xsl:otherwise>
                                  <xsl:call-template name="getName">
        		               <xsl:with-param name="name" 
        		                    select="/n1:ClinicalDocument/n1:legalAuthenticator/n1:assignedEntity/n1:assignedPerson/n1:name"/>
                               </xsl:call-template>  
                               </xsl:otherwise>
                          </xsl:choose>
-->
                          </td>
     
		   </tr>

                   <tr>
		       <td width='18%' align="right" ><b><xsl:text>Inicio de atención</xsl:text></b></td>
		       <td width='18%'><xsl:call-template name="formatDate">
   		                       <xsl:with-param name="date" 
 		                select="/n1:ClinicalDocument/n1:documentationOf/n1:serviceEvent/n1:effectiveTime/n1:low/@value"/>
 		                </xsl:call-template></td>
 		       <td width='18%' align="right" ><b><xsl:text>Fin de atención</xsl:text></b></td>
 		       <td width='18%'>
 		       <xsl:if test="string-length(/n1:ClinicalDocument/n1:documentationOf/n1:serviceEvent/n1:effectiveTime/n1:high/@value)>0">
				<xsl:call-template name="formatDate">
   		                       <xsl:with-param name="date" 
 		                select="/n1:ClinicalDocument/n1:documentationOf/n1:serviceEvent/n1:effectiveTime/n1:high/@value"/>
                        </xsl:call-template>
               </xsl:if>
                        </td>                        
	   </tr>

	   <tr>
	           <td width='18%' align='right'><b><xsl:text>Responsable del paciente</xsl:text></b></td>
		   <td width='18%'>
		<xsl:for-each select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:patient/n1:guardian">
		   <xsl:choose>
		   <xsl:when test="./@nullFlavor">
		   	<xsl:call-template name="nullFlavor">
			   	<xsl:with-param name="value" select="/n1:ClinicalDocument/n1:recordTarget/n1:patientRole/n1:patient/n1:guardian/@nullFlavor"/>
		   	</xsl:call-template>
		   </xsl:when>
		   <xsl:otherwise>
		   	<xsl:call-template name="getName">
				<xsl:with-param name="name" 
		                    select="./n1:guardianPerson/n1:name"/>
                        </xsl:call-template>
			<br/>
			<xsl:value-of select="./n1:addr"/>
			<br/>
			<xsl:for-each select="./n1:telecom">
				<xsl:value-of select="@value"/><xsl:text>  </xsl:text>
			</xsl:for-each>
		   </xsl:otherwise>
		   
		   </xsl:choose>
		   </xsl:for-each>                        
		   </td>

           <td width='18%' align='right'><b><xsl:text> </xsl:text></b></td>
		   <td width='18%'>
		   </td>
	   </tr>
		   
		</table>
		</div>
		
		
		<div style="clear:both;"/>
                <div class="divTable1">  
		<xsl:apply-templates select="n1:component/n1:structuredBody"/> 
		<xsl:call-template name="bottomline"/>
		</div>
            </body>
        </html>
</xsl:template>
    
<!-- Get a Name  -->
<xsl:template name="getName">
    <xsl:param name="name"/>
    <xsl:choose>
         <xsl:when test="$name/n1:family">
              <xsl:value-of select="$name/n1:given"/>
              <xsl:text> </xsl:text>
              <xsl:for-each select="$name/n1:family">
		      <xsl:value-of select="."/> 
		      <xsl:text> </xsl:text>
              </xsl:for-each>
              <xsl:text> </xsl:text>
              <xsl:if test="$name/n1:suffix">
                  <xsl:text>, </xsl:text>
                  <xsl:value-of select="$name/n1:suffix"/>
              </xsl:if>
          </xsl:when>
          <xsl:otherwise>
               <xsl:value-of select="$name"/>
          </xsl:otherwise>
    </xsl:choose>
</xsl:template>

<!--  Format Date 
    
      outputs a date in Month Day, Year form
      e.g., 19991207  ==> December 07, 1999
-->
<xsl:template name="formatDate">
        <xsl:param name="date"/>
        <xsl:variable name="month" select="substring ($date, 5, 2)"/>
        <xsl:choose>
                <xsl:when test='substring ($date, 7, 1)="0"'>
                        <xsl:value-of select="substring ($date, 8, 1)"/>
                </xsl:when>
                <xsl:otherwise>
                        <xsl:value-of select="substring ($date, 7, 2)"/>
                </xsl:otherwise>
        </xsl:choose>
        <xsl:text> de </xsl:text>
        <xsl:choose>
                <xsl:when test="$month='01'">
                        <xsl:text>Enero</xsl:text>
                </xsl:when>
                <xsl:when test="$month='02'">
                        <xsl:text>Febrero</xsl:text>
                </xsl:when>
                <xsl:when test="$month='03'">
                        <xsl:text>Marzo</xsl:text>
                </xsl:when>
                <xsl:when test="$month='04'">
                        <xsl:text>Abril</xsl:text>
                </xsl:when>
                <xsl:when test="$month='05'">
                        <xsl:text>Mayo</xsl:text>
                </xsl:when>
                <xsl:when test="$month='06'">
                        <xsl:text>Junio</xsl:text>
                </xsl:when>
                <xsl:when test="$month='07'">
                        <xsl:text>Julio</xsl:text>
                </xsl:when>
                <xsl:when test="$month='08'">
                        <xsl:text>Agosto</xsl:text>
                </xsl:when>
                <xsl:when test="$month='09'">
                        <xsl:text>Septiembre</xsl:text>
                </xsl:when>
                <xsl:when test="$month='10'">
                        <xsl:text>Octubre</xsl:text>
                </xsl:when>
                <xsl:when test="$month='11'">
                        <xsl:text>Noviembre</xsl:text>
                </xsl:when>
                <xsl:when test="$month='12'">
                        <xsl:text>Diciembre</xsl:text>
                </xsl:when>
        </xsl:choose>
	<xsl:text> de </xsl:text>
        <xsl:value-of select="substring ($date, 1, 4)"/>
        
        
        <xsl:if test="substring ($date, 9, 2)">
        <xsl:text>  </xsl:text>
        <xsl:value-of select="substring ($date, 9, 2)"/>
        
        <xsl:if test="substring ($date, 11, 2)">
        	<xsl:text>:</xsl:text>
	        <xsl:value-of select="substring ($date, 11, 2)"/>
	        
        <xsl:if test="substring ($date, 13, 2)">
	        <xsl:text>:</xsl:text>
	        <xsl:value-of select="substring ($date, 13, 2)"/>
	        
	        
	        
        </xsl:if>	        
        </xsl:if>
        </xsl:if>
        
</xsl:template>

<!-- StructuredBody -->
<xsl:template match="n1:component/n1:structuredBody">
<!-- XSLT 2.0
	<xsl:for-each-group select="n1:component/n1:section" group-by="n1:templateId/@root">
	un grupo<br/>
	</xsl:for-each-group>
-->
<!--<h1>Este es el general</h1>-->
	<div class="toc"><h2>Tabla de contenido</h2>
	<ul class="toc"><xsl:apply-templates select="n1:component/n1:section" mode="toc"/></ul>
	</div>
	<xsl:apply-templates select="n1:component/n1:section"/>

	<br/>
</xsl:template>








<!-- Muenchian sorting and grouping
<xsl:template match="n1:component/n1:section">
	<Division value="{n1:templateId/@root}">
	    <xsl:for-each select="key('division', @Division)">
		<User>
		    <id><xsl:value-of select="@id" /></id>
		    <name><xsl:value-of select="@name" /></name>
		</User>
	    </xsl:for-each>
	</Division>
</xsl:template> -->

<xsl:template match="n1:component/n1:section" mode="toc" name="section-toc">
	<li><a href="#{generate-id()}">
		<xsl:value-of select="./n1:title"/>
	</a></li>
</xsl:template>
<!-- Component/Section identified -->    
<xsl:template match="n1:component/n1:section" mode="identified" name="section">
	<!--<xsl:apply-templates select="n1:title"/>-->
	<a name="{generate-id()}"/>
	<xsl:choose>
<!-- TODO luego se reactiva, hay que saber porque no pone el texto -->
	<xsl:when test="n1:entry">
		
		<div class="text-only">
		<xsl:apply-templates select="n1:text"/> 
		</div>
		<xsl:apply-templates select="n1:entry"/>
	</xsl:when>
	<xsl:otherwise>
		<div class="text-only">
		<xsl:apply-templates select="n1:text"/>
 		</div>
	</xsl:otherwise>
	</xsl:choose>	

        <xsl:apply-templates select="n1:component/n1:section"/>
	<hr/>
</xsl:template>

<!-- Component/Section -->    
<xsl:template match="n1:component/n1:section">
	<div class="IHE-R">
	<xsl:apply-templates select="n1:title"/>
	<xsl:call-template name="section" />	
	</div>
</xsl:template>




<xsl:template match="n1:entry">
	<!-- TODO reactivar esto -->
	 <div class="entryPBD">
		<xsl:call-template name="author" />
		<xsl:apply-templates select="child::node()" />
	 </div> 
	
</xsl:template>
<xsl:template match="n1:entry/n1:organizer/n1:component">
	<!-- TODO reactivar esto -->
	 <div class="entryPBD">
		<!-- <xsl:call-template name="author" /> -->
		<xsl:apply-templates select="child::node()" />
	 </div> 
	
</xsl:template>


<xsl:template name="author">
      <xsl:if test="count(ancestor-or-self::*/n1:author)>0">
      <xsl:text> </xsl:text>
	<img class="autor">
		<xsl:attribute name="src">
			<xsl:value-of select="concat($path,'/v4/images/briefcase.png')"/>
		</xsl:attribute>                
      <xsl:for-each select="ancestor-or-self::*/n1:author" >
		<xsl:attribute name="title">
			<xsl:call-template name="getName">
        		        <xsl:with-param name="name" 
        		                    select="./n1:assignedAuthor/n1:assignedPerson/n1:name" />
                        </xsl:call-template>  
<!-- 		<xsl:value-of select="./n1:assignedAuthor/n1:assignedPerson/n1:name" /> -->
<!-- 		<xsl:apply-templates select="child::node()" /> -->
		</xsl:attribute>
<!-- 		Autor -->
      </xsl:for-each>
      </img>
      </xsl:if>
</xsl:template>


<!--   Title  -->
<xsl:template match="n1:title">
	<h2><span style=" color:red;">
	<xsl:value-of select="."></xsl:value-of>
	</span>
	<xsl:call-template name="author" />
	</h2>
</xsl:template>

<!--   Text   -->
<xsl:template match="n1:text">	
	<xsl:apply-templates />	
</xsl:template>

<!--   paragraph  -->
<xsl:template match="n1:paragraph">
	<xsl:apply-templates/>
	<br/>
</xsl:template>

<xsl:template match="n1:code">
	<xsl:value-of select="./@displayName" />
	
</xsl:template>

<xsl:template match="n1:effectiveTime" name="effectiveTime">

<xsl:if test="./@value">
<xsl:call-template name="formatDate">
	<xsl:with-param name="date" 
	select="./@value"/>
</xsl:call-template>
</xsl:if>

<xsl:choose>
<xsl:when test="./n1:low/@nullFlavor">
<xsl:call-template name="nullFlavor">
	<xsl:with-param name="value" select="./n1:low/@nullFlavor"/>
</xsl:call-template>
</xsl:when>
<xsl:when test="./n1:low/@value">
<xsl:text></xsl:text>
  <xsl:call-template name="formatDate">
	  <xsl:with-param name="date" 
	  select="./n1:low/@value"/>
  </xsl:call-template>
</xsl:when>
</xsl:choose>


<xsl:if test="./n1:high/@value"><xsl:text> - </xsl:text>
<xsl:call-template name="formatDate">
	<xsl:with-param name="date" 
	select="./n1:high/@value"/>
</xsl:call-template>
</xsl:if>

</xsl:template>

<xsl:template name="nullFlavor">
	<xsl:param name="value" select="'DEF'"/>
	<xsl:choose>
		<xsl:when test="$value='NI'">Sin información</xsl:when>
		<xsl:when test="$value='NA'">No disponible</xsl:when>
		<xsl:when test="$value='UNK'">Desconocido</xsl:when>
		<xsl:when test="$value='AUNK'">Preguntado y desconocido</xsl:when>
	<xsl:otherwise>
		Sin info (<xsl:value-of select="$value"/>)
	</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="severity">
	<xsl:param name="severity"/>
<!-- 	<xsl:value-of select="$severity"/> -->
	<xsl:choose>
		<xsl:when test="$severity='H'">Alta</xsl:when>
		<xsl:when test="$severity='M'">Media</xsl:when>
		<xsl:when test="$severity='L'">Baja</xsl:when>
	</xsl:choose>
</xsl:template>

<!--     Content w/ deleted text is hidden -->
<xsl:template match="n1:content[@revised='delete']"/>

<!--   content  -->
<xsl:template match="n1:content">
	<xsl:apply-templates/>
</xsl:template>


<!--   list  -->
<xsl:template match="n1:list">
    <xsl:if test="n1:caption">
        <span style="font-weight:bold; ">
        <xsl:apply-templates select="n1:caption"/>
        </span>
    </xsl:if>
   <ul>
    <xsl:for-each select="n1:item">
	<li>
          <xsl:apply-templates />
	</li>
     </xsl:for-each>
    </ul>	
</xsl:template>

<xsl:template match="n1:list[@listType='ordered']">
    <xsl:if test="n1:caption">
        <span style="font-weight:bold; ">
        <xsl:apply-templates select="n1:caption"/>
        </span>
    </xsl:if>
   <ol>
    <xsl:for-each select="n1:item">
	<li>
          <xsl:apply-templates />
	</li>
     </xsl:for-each>
    </ol>	
</xsl:template>
	

<!--   caption  -->
<xsl:template match="n1:caption">  
	<xsl:apply-templates/>
	<xsl:text>: </xsl:text>
</xsl:template>

	
	<!--      Tables   -->
	<xsl:template match="n1:table/@*|n1:thead/@*|n1:tfoot/@*|n1:tbody/@*|n1:colgroup/@*|n1:col/@*|n1:tr/@*|n1:th/@*|n1:td/@*">
		<xsl:copy>
			<xsl:apply-templates/>
		</xsl:copy>
	</xsl:template>

	<xsl:template match="n1:table">
		<table>	
			<xsl:apply-templates/>
		</table>	
	</xsl:template>
	
	<xsl:template match="n1:thead">
		<thead>	
			<xsl:apply-templates/>
		</thead>	
	</xsl:template>

	<xsl:template match="n1:tfoot">
		<tfoot>	
			<xsl:apply-templates/>
		</tfoot>	
	</xsl:template>

	<xsl:template match="n1:tbody">
		<tbody>	
			<xsl:apply-templates/>
		</tbody>	
	</xsl:template>

	<xsl:template match="n1:colgroup">
		<colgroup>	
			<xsl:apply-templates/>
		</colgroup>	
	</xsl:template>

	<xsl:template match="n1:col">
		<col>	
			<xsl:apply-templates/>
		</col>	
	</xsl:template>

	<xsl:template match="n1:tr">
		<tr>	
			<xsl:apply-templates/>
		</tr>	
	</xsl:template>

	<xsl:template match="n1:th">
		<th>	
			<xsl:apply-templates/>
		</th>	
	</xsl:template>

	<xsl:template match="n1:td">
		<td>	
			<xsl:apply-templates/>
		</td>	
	</xsl:template>

	<xsl:template match="n1:table/n1:caption">
		<span style="font-weight:bold; ">	
			<xsl:apply-templates/>
		</span>	
	</xsl:template>

<!--   RenderMultiMedia 

         this currently only handles GIF's and JPEG's.  It could, however,
	 be extended by including other image MIME types in the predicate
	 and/or by generating <object> or <applet> tag with the correct
	 params depending on the media type  @ID  =$imageRef     referencedObject
 -->
     <xsl:template match="n1:renderMultiMedia">
	<xsl:variable name="imageRef" select="@referencedObject"/>
        <xsl:choose>
             <xsl:when test="//n1:regionOfInterest[@ID=$imageRef]">
             <!-- Here is where the Region of Interest image referencing goes -->
                  <xsl:if test='//n1:regionOfInterest[@ID=$imageRef]//n1:observationMedia/n1:value[@mediaType="image/gif" or @mediaType="image/jpeg"]'>
			<br clear='all'/>
		       <xsl:element name='img'>
			    <xsl:attribute name='src'>graphics/
				<xsl:value-of select='//n1:regionOfInterest[@ID=$imageRef]//n1:observationMedia/n1:value/n1:reference/@value'/>
			    </xsl:attribute>
		       </xsl:element>
	          </xsl:if>
             </xsl:when>
             <xsl:otherwise>
             <!-- Here is where the direct MultiMedia image referencing goes -->
                  <xsl:if test='//n1:observationMedia[@ID=$imageRef]/n1:value[@mediaType="image/gif" or @mediaType="image/jpeg"]'>
			<br clear='all'/>
		       <xsl:element name='img'>
			    <xsl:attribute name='src'>graphics/
				<xsl:value-of select='//n1:observationMedia[@ID=$imageRef]/n1:value/n1:reference/@value'/>
			    </xsl:attribute>
		       </xsl:element>
	          </xsl:if>              
             </xsl:otherwise>
        </xsl:choose>	
     </xsl:template>

<!-- 	Stylecode processing   
	  Supports Bold, Underline and Italics display

-->

	<xsl:template match="//n1:*[@styleCode]">

	<xsl:if test="@styleCode='Bold'">
	     <xsl:element name='b'>				
	          <xsl:apply-templates/>
	     </xsl:element>	
	</xsl:if> 

	<xsl:if test="@styleCode='Italics'">
	     <xsl:element name='i'>				
	          <xsl:apply-templates/>
	     </xsl:element>	
	</xsl:if>

	<xsl:if test="@styleCode='Underline'">
	     <xsl:element name='u'>				
	          <xsl:apply-templates/>
	     </xsl:element>	
	</xsl:if>

	   <xsl:if test="contains(@styleCode,'Bold') and contains(@styleCode,'Italics') and not (contains(@styleCode, 'Underline'))">
	     <xsl:element name='b'>
		<xsl:element name='i'>				
	          <xsl:apply-templates/>
		</xsl:element>
	     </xsl:element>	
	   </xsl:if>

	   <xsl:if test="contains(@styleCode,'Bold') and contains(@styleCode,'Underline') and not (contains(@styleCode, 'Italics'))">
	     <xsl:element name='b'>
		<xsl:element name='u'>				
	          <xsl:apply-templates/>
		</xsl:element>
	     </xsl:element>	
	   </xsl:if>

	   <xsl:if test="contains(@styleCode,'Italics') and contains(@styleCode,'Underline') and not (contains(@styleCode, 'Bold'))">
	     <xsl:element name='i'>
		<xsl:element name='u'>				
	          <xsl:apply-templates/>
		</xsl:element>
	     </xsl:element>	
	   </xsl:if>

	   <xsl:if test="contains(@styleCode,'Italics') and contains(@styleCode,'Underline') and contains(@styleCode, 'Bold')">
	     	<xsl:element name='b'>
		<xsl:element name='i'>
		<xsl:element name='u'>				
	            <xsl:apply-templates/>
		</xsl:element>
		</xsl:element>
	     	</xsl:element>	
	   </xsl:if>

	</xsl:template>

<!-- 	Superscript or Subscript   -->
	<xsl:template match="n1:sup">
	     <xsl:element name='sup'>				
	          <xsl:apply-templates/>
	     </xsl:element>	
	</xsl:template>
	<xsl:template match="n1:sub">
	     <xsl:element name='sub'>				
	          <xsl:apply-templates/>
	     </xsl:element>	
	</xsl:template>

	<!--  Bottomline  -->
     <xsl:template name="bottomline">
     <hr/>
     <b><xsl:text>Generado por: </xsl:text></b>
     	<xsl:text> </xsl:text>
     		<xsl:value-of select="/n1:ClinicalDocument/n1:id/@assigningAuthorityName"/> - 
     		<xsl:value-of select="/n1:ClinicalDocument/n1:author/n1:assignedAuthor/n1:assignedAuthoringDevice/n1:softwareName/@codeSystemName"/>
     	<xsl:text> </xsl:text>
<!--     <b><xsl:text>Firmado por: </xsl:text></b>
	<xsl:call-template name="getName">
           <xsl:with-param name="name" 
                select="/n1:ClinicalDocument/n1:author/n1:assignedAuthor/n1:assignedPerson/n1:name"/>
</xsl:call-template> (<xsl:value-of select="/n1:ClinicalDocument/n1:author/n1:assignedAuthor/n1:id/@extension"/>)
        <xsl:text> el </xsl:text>
	       <xsl:call-template name="formatDate">
   	           <xsl:with-param name="date" 
 	               select="//n1:ClinicalDocument/n1:author/n1:time/@value"/>
        </xsl:call-template>
        -->
      </xsl:template>


	<xsl:template name="CS">
		<xsl:param name="node"/>
	   <xsl:choose>
	   <xsl:when test="$node/@displayName">
		<xsl:value-of
			select="$node/@displayName"/>
	   </xsl:when>
	   <xsl:when test="$node/@code">
				<xsl:value-of
					   select="@node/@code"/>
	   </xsl:when>
	   <xsl:otherwise>
		<xsl:call-template name="nullFlavor">
			<xsl:with-param name="value" select="$node/@nullFlavor"/>
		</xsl:call-template>
	   </xsl:otherwise>

	   </xsl:choose>

	</xsl:template>

	<xsl:template name="AD">
		<xsl:param name="addr"/>
		<xsl:for-each select="$addr/text()">
			<xsl:value-of select="." />
		</xsl:for-each>
	</xsl:template>

	<xsl:template match="n1:text">
		<xsl:apply-templates />
	</xsl:template>
	<xsl:template match="n1:h1">
		<h1>
			<xsl:apply-templates select="child::node()" />
		</h1>
	</xsl:template>
	<xsl:template match="n1:h2">
		<h2>
			<xsl:apply-templates select="child::node()" />
		</h2>
	</xsl:template>
	<xsl:template match="n1:h3">
		<h3>
			<xsl:apply-templates select="child::node()" />
		</h3>
	</xsl:template>
	<xsl:template match="n1:pre">
		<pre>
			<xsl:apply-templates select="child::node()" />
		</pre>
	</xsl:template>
	<xsl:template match="@colspan">
		<xsl:copy>
<!-- 			<xsl:apply-templates select="child::node()" /> -->
		</xsl:copy>
	</xsl:template>

</xsl:stylesheet>
