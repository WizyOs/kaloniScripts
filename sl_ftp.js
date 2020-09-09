/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 * 
 * @Note: This's a test script which will do: <br>
 *        1. Upload/Sent specific NS File Cabinet file to SFTP server.(NS ->
 *        SFTP)<br>
 *        2. Get a specific file from SFTP server to NS File Cabinet.(SFTP ->
 *        NS)
 */
define(
        [ 'N/error', 'N/sftp', 'N/file', 'N/runtime', 'N/search',
                'N/transaction', 'N/ui/serverWidget' ],
        /**
         * @param {error}
         *            error
         * @param {file}
         *            file
         * @param {runtime}
         *            runtime
         * @param {search}
         *            search
         * @param {transaction}
         *            transaction
         * @param {serverWidget}
         *            ui
         */
        function(error, sftp, file, runtime, search, transaction, ui) {

            /**
             * Definition of the Suitelet script trigger point.
             * 
             * @param {Object}
             *            context
             * @param {ServerRequest}
             *            context.request - Encapsulation of the incoming
             *            request
             * @param {ServerResponse}
             *            context.response - Encapsulation of the Suitelet
             *            response
             * @Since 2015.2
             */
            function onRequest(context) {

                var strSftpServerUrl = 'test.rebex.net';
                var strSftpDir = 'pub/example';
                // *nix command: ssh-keyscan -t rsa -p 22 123.112.249.93
                var strHostKey = "AAAAB3NzaC1yc2EAAAABJQAAAQEAkRM6RxDdi3uAGogR3nsQMpmt43X4WnwgMzs8VkwUCqikewxqk4U7EyUSOUeT3CoUNOtywrkNbH83e6/yQgzc3M8i/eDzYtXaNGcKyLfy3Ci6XOwiLLOx1z2AGvvTXln1RXtve+Tn1RTr1BhXVh2cUYbiuVtTWqbEgErT20n4GWD4wv7FhkDbLXNi8DX07F9v7+jH67i0kyGm+E3rE+SaCMRo3zXE6VO+ijcm9HdVxfltQwOYLfuPXM2t5aUSfa96KJcA0I4RCMzA/8Dl9hXGfbWdbD2hK1ZQ1pLvvpNPPyKKjPZcMpOznprbg+jIlsZMWIHt7mq2OJXSdruhRrGzZw==";
                var strHostKeyType = 'rsa';

                var objRequest = context.request;
                if (objRequest.method === 'GET') {

                    var form = ui.createForm({
                        title : 'SFTP Transfer Sample'
                    });

                    var objUserFld = form.addField({
                        id : 'custpage_username',
                        type : ui.FieldType.TEXT,
                        label : 'SFTP User Name'
                    });
                    objUserFld.breakType = ui.FieldBreakType.STARTCOL;
                    objUserFld.isMandatory = true;

                    form
                            .addCredentialField({
                                id : 'custpage_sftp_password_token',
                                label : 'SFTP Password',
                                restrictToScriptIds : [ 'customscript_pri_sl_sftptransfer_test' ],
                                restrictToDomains : [ strSftpServerUrl ],
                            });

                    form.addSubmitButton({
                        label : 'Submit'
                    });
                    context.response.writePage(form);

                } else if (objRequest.method === 'POST') {

                    var strSftpUserName = objRequest.parameters.custpage_username;
                    var passwordToken = objRequest.parameters.custpage_sftp_password_token;
                    log.debug({
                        title : 'New password token',
                        details : passwordToken + ', Sftp User: '
                                + strSftpUserName
                    });

                    var connection = sftp.createConnection({
                        username : strSftpUserName,
                        passwordGuid : passwordToken,
                        url : strSftpServerUrl,
                        port : 22,
                        directory : strSftpDir,
                        hostKey : strHostKey,
                        hostKeyType : strHostKeyType
                    });

                    /**
                     * [1] Uploading the file to the external SFTP server.
                     */
                    var myFileToUpload = file.load({
                        id : 1660585
                    });
                    // file.create({
                    // name : 'originalname.txt',
                    // fileType : file.Type.PLAINTEXT,
                    // contents : 'I am a test file. Hear me roar.'
                    // });
                    connection.upload({
                        // directory : 'Public/',
                        filename : 'folios DIAN.txt',
                        file : myFileToUpload,
                        replaceExisting : true
                    });

                    /**
                     * [2] Download sftp files to NetSuite FileCabinet
                     */
                    var downloadedFile = connection.download({
                        // directory : 'Public',
                        filename : 'readme.txt'
                    });
                    downloadedFile.folder = 1200659;
                    downloadedFile.save();

                    context.response
                            .write('1. Uploaded folios DIAN.txt to SFTP server("Public" folder). \n\r2. Downloaded "readme.txt" to fileCabinet("Attachments Received" folder).');
                    return true;
                }
            }

            return {
                onRequest : onRequest
            };

        });