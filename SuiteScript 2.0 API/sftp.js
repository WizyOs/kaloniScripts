/**
 * SuiteScript module
 *
 * @private
 * @module N/sftp
 * @NApiVersion 2.x
 *
 */
function sftp() {}
/**
 *
 * Establishes a connection with a remote server and returns a connection object representing that connection
 *
 * @param {Object} options
 * @param {string} options.username - the username of remote account
 * @param {string} [options.passwordGuid] - the password guid for remote account
 * @param {string} [options.keyId] - id of the private key to use
 * @param {string} options.url - host of remote account
 * @param {number} [options.port] - port through which to connect to remote account, defaults to 22
 * @param {string} [options.directory] - remote directory of connection
 * @param {number} [options.timeout] - timeout to establish connection, defaults to Connection.MAX_CONNECT_TIMEOUT
 * @param {string} options.hostKey - hostKey for ssh server
 * @param {string} [options.hostKeyType] - hostKeyType for ssh server, one of rsa, dsa, ecdsa
 *
 * @returns {Connection} connection - an object that represents the connection
 *
 * @throws {SuiteScriptError} FTP_UNKNOWN_HOST - thrown when host cannot be found
 * @throws {SuiteScriptError} FTP_CONNECT_TIMEOUT_EXCEEDED - thrown when connection takes longer than options.timeout seconds
 * @throws {SuiteScriptError} FTP_CANNOT_ESTABLISH_CONNECTION - thrown when connection fails because of invalid username or password or no permission to access to directory
 * @throws {SuiteScriptError} FTP_INVALID_PORT_NUMBER - thrown when format of port number is invalid (e.g. negative or greater than 65535)
 * @throws {SuiteScriptError} FTP_INVALID_CONNECTION_TIMEOUT - thrown when timeout parameter is set greater than Connection.MAX_CONNECT_TIMEOUT (currently 20 seconds) or negative
 * @throws {SuiteScriptError} FTP_INVALID_DIRECTORY - thrown if directory does not exist on server
 * @throws {SuiteScriptError} FTP_INCORRECT_HOST_KEY - thrown if provided host key does not match remote server's presented host key
 * @throws {SuiteScriptError} FTP_INCORRECT_HOST_KEY_TYPE - thrown if the host key type does not match the type of the provided host key
 * @throws {SuiteScriptError} FTP_MALFORMED_HOST_KEY - thrown when host key is not of the correct format (e.g. base 64, 96+ bytes)
 * @throws {SuiteScriptError} FTP_PERMISSION_DENIED - thrown when user does not have access to a file or directory on the remote server
 * @throws {SuiteScriptError} FTP_UNSUPPORTED_ENCRYPTION_ALGORITHM - thrown when the remote server does not support one of NetSuite's approved algorithms
 */
sftp.prototype.createConnection = function(options) {};

/**
 *
 * Return new instance of SftpConnection used for performing operations over a connection
 *
 *
 */
function Connection() {
    
    /**
     * Constant representing the max time allowed for transferring data over connection
     * @name Connection#MAX_TRANSFER_TIMEOUT
     * @type number
     * @readonly
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted
     */    
    this.prototype.MAX_TRANSFER_TIMEOUT = undefined;    
    /**
     * Constant representing the max file size allowed to be transferred
     * @name Connection#MAX_FILE_SIZE
     * @type number
     * @readonly
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted
     */    
    this.prototype.MAX_FILE_SIZE = undefined;    
    /**
     * Uploads a file to a specified remote server
     *
     * @governance 100 points
     *
     * @param {Object} options
     * @param {string} [options.directory] - relative path to directory where file will be uploaded. defaults to current directory,
     * @param {string} [options.filename] - name to give uploaded file on server, defaults to filename of options.file parameter
    illegal characters will be automatically escaped
     * @param {File} options.file - file to upload
     * @param {number} [options.timeout] - timeout for data transfer, defaults to Connection.MAX_TRANSFER_TIMEOUT (very large number TBD)
     * @param {boolean} options.replaceExisting - if true, will replace file on server if a file with options.filename is found at options.directory,
     * if false, will throw an exception if a file with options.filename is found at options.directory,
     * defaults to false
     *
     *
     * @throws {SuiteScriptError} FTP_NO_SUCH_FILE_OR_DIRECTORY - thrown if directory does not exist on server
     * @throws {SuiteScriptError} FTP_TRANSFER_TIMEOUT_EXCEEDED - thrown if transfer takes longer than options.timeout seconds
     * @throws {SuiteScriptError} FTP_INVALID_TRANSFER_IMEOUT - thrown when timeout parameter is set greater than Connection.MAX_TRANSFER_TIMEOUT (currently 300 seconds) or negative
     * @throws {SuiteScriptError} FTP_FILE_ALREADY_EXISTS - thrown when replaceExisting is set to false and a file with the same name exists in remote directory
     * @throws {SuiteScriptError} FTP_PERMISSION_DENIED - thrown when user does not have access to a file or directory on the remote server
     *
     */    
    this.prototype.upload = function(options) {};    
    
    /**
     * Lists remote directory
     *
     * governance 10 points
     * @param {Object} options
     * @param {string} [options.path] - relative path to directory of file that will be downloaded. defaults to current directory,
     * @param {string} [options.sort] - sort option (values from Sort enum are accepted)
     *
     * @returns {Object[]} entries containing size, directory flag, last modification date,
     *
     * @throws {SuiteScriptError} FTP_INVALID_DIRECTORY - thrown if directory does not exist on server
     * @throws {SuiteScriptError} FTP_PERMISSION_DENIED - thrown when user does not have access to a file or directory on the remote server
     */    
    this.prototype.list = function(options) {};    
    
    /**
     * Moves a file or directory from one location to another
     *
     * governance 10 points
     * @param {Object} options
     * @param {string} [options.from] - relative path of file to be moved
     * @param {string} [options.to] - resulting path
     *
     *
     * @throws {SuiteScriptError} FTP_PERMISSION_DENIED - thrown when user does not have access to a file or directory on the remote server
     */    
    this.prototype.move = function(options) {};    
    
    /**
     * Removes a file
     *
     * governance 10 points
     * @param {Object} options
     * @param {string} [options.path] - relative path of file to be deleted
     *
     *
     * @throws {SuiteScriptError} FTP_PERMISSION_DENIED - thrown when user does not have access to a file or directory on the remote server
     */    
    this.prototype.removeFile = function(options) {};    
    
    /**
     * Removes an empty directory
     *
     * governance 10 points
     * @param {Object} options
     * @param {string} [options.path] - relative path of a directory to be deleted
     *
     *
     * @throws {SuiteScriptError} FTP_PERMISSION_DENIED - thrown when user does not have access to a file or directory on the remote server
     */    
    this.prototype.removeDirectory = function(options) {};    
    
    /**
     * Creates empty directory
     *
     * governance 10 points
     * @param {Object} options
     * @param {string} [options.path] - relative path of a directory to be created
     *
     *
     * @throws {SuiteScriptError} FTP_PERMISSION_DENIED - thrown when user does not have access to a file or directory on the remote server
     */    
    this.prototype.makeDirectory = function(options) {};    
    
    /**
     * Downloads a file from the remote server
     *
     * governance 100 points
     * @param {Object} options
     * @param {string} [options.directory] - relative path to directory of file that will be downloaded. defaults to current directory,
     * @param {string} options.filename - name of file to download to local machine
     * @param {number} [options.timeout] - timeout for data transfer, defaults to Connection.MAX_TRANSFER_TIMEOUT (currently 300 seconds)
     *
     * @returns {File} file
     *
     * @throws {SuiteScriptError} FTP_MAXIMUM_FILE_SIZE_EXCEEDED - thrown if file size is > max file size allowed by NetSuite
     * @throws {SuiteScriptError} FTP_NO_SUCH_FILE_OR_DIRECTORY - thrown if directory or file does not exist on server
     * @throws {SuiteScriptError} FTP_TRANSFER_TIMEOUT_EXCEEDED - thrown if transfer takes longer than options.timeout seconds
     * @throws {SuiteScriptError} FTP_INVALID_TRANSFER_TIMEOUT - thrown when timeout parameter is set greater than Connection.MAX_TRANSFER_TIMEOUT (currently 300 seconds) or negative
     * @throws {SuiteScriptError} FTP_PERMISSION_DENIED - thrown when user does not have access to a file or directory on the remote server
     */    
    this.prototype.download = function(options) {};    
}

sftp = new sftp();
/**
 * @type {sftp}
 */
N.prototype.sftp = sftp;