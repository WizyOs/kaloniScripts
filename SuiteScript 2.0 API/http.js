/**
 * SuiteScript module
 *
 * @module N/http
 * @suiteScriptVersion 2.x
 *
 */
function http() {}
/**
 * Enum describing available HTTP methods.
 * @enum
 * @readonly
 */
function httpMethod() {
    this.GET = 'GET';
    this.POST = 'POST';
    this.PUT = 'PUT';
    this.DELETE = 'DELETE';
    this.HEAD = 'HEAD';
}
http.prototype.Method = httpMethod;

/**
 * Enum describing available Commerce API Cache Durations.
 * @enum
 * @readonly
 */
function httpCacheDuration() {
    this.UNIQUE = 'UNIQUE';
    this.SHORT = 'SHORT';
    this.MEDIUM = 'MEDIUM';
    this.LONG = 'LONG';
}
http.prototype.CacheDuration = httpCacheDuration;

/**
 * Send a HTTP GET request and return server response.
 *
 * @governance 10 units
 * @restriction Server SuiteScript only
 *
 * @param {Object} config
 * @param {string} config.url the HTTP URL being requested
 * @param {Object} config.headers (optional) request HTTP headers
 * @return {ClientResponse}
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing
 * @throws {SuiteScriptError} SSS_INVALID_URL if an incorrect protocol is used (ex: http in the HTTPS module)
 *
 * @since 2015.2
 */
http.prototype['get'] = function(options) {};
http['get'].promise = function(options) {};

/**
 * Send a HTTP POST request and return server response.
 *
 * @governance 10 units
 * @restriction Server SuiteScript only
 *
 * @param {Object} config
 * @param {string} config.url the HTTP URL being requested
 * @param {string|Object} config.body POST data
 * @param {Object} config.headers (optional) request HTTP headers
 * @return {ClientResponse}
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing
 * @throws {SuiteScriptError} SSS_INVALID_URL if an incorrect protocol is used (ex: http in the HTTPS module)
 *
 * @since 2015.2
 */
http.prototype.post = function(options) {};
http.post.promise = function(options) {};

/**
 * Send a HTTP PUT request and return server response.
 *
 * @governance 10 units
 * @restriction Server SuiteScript only
 *
 * @param {Object} config
 * @param {string} config.url the HTTP URL being requested
 * @param {string|Object} config.body PUT data
 * @param {Object} config.headers (optional) request HTTP headers
 * @return {ClientResponse}
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing
 * @throws {SuiteScriptError} SSS_INVALID_URL if an incorrect protocol is used (ex: http in the HTTPS module)
 *
 * @since 2015.2
 */
http.prototype.put = function(options) {};
http.put.promise = function(options) {};

/**
 * Send a HTTP DELETE request and return server response.
 *
 * @governance 10 units
 * @restriction Server SuiteScript only
 *
 * @param {Object} config
 * @param {string} config.url the HTTP URL being requested
 * @param {Object} config.headers (optional) request HTTP headers
 * @return {ClientResponse}
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing
 * @throws {SuiteScriptError} SSS_INVALID_URL if an incorrect protocol is used (ex: http in the HTTPS module)
 *
 * @since 2015.2
 */
http.prototype['delete'] = function(options) {};
http['delete'].promise = function(options) {};

/**
 * Send a HTTP request and return server response.
 *
 * @governance 10 units
 * @restriction Server SuiteScript only
 *
 * @param {Object} config
 * @param {http.Method} config.method HTTP method of the request
 * @param {string} config.url the HTTP URL being requested
 * @param {string|Object} config.body POST data; must be present if and only if method is POST
 * @param {Object} config.headers (optional) request HTTP headers
 * @return {ClientResponse}
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing
 * @throws {SuiteScriptError} SSS_INVALID_URL if an incorrect protocol is used (ex: http in the HTTPS module)
 *
 * @since 2015.2
 */
http.prototype.request = function(options) {};
http.request.promise = function(options) {};

/**
 * @enum
 */
function httpRedirectType() {
    this.RECORD = 'RECORD';
    this.SUITELET = 'SUITELET';
    this.RESTLET = 'RESTLET';
    this.MEDIA_ITEM = 'MEDIAITEM';
    this.TASK_LINK = 'TASKLINK';
}
http.prototype.RedirectType = httpRedirectType;

/**
 * Return a new instance of ClientResponse used to store the result of a HTTP request.
 *
 * @protected
 * @classDescription Encapsulation of the response returned by a web server as a response to our HTTP request.
 * @return {http.ClientResponse}
 * @constructor
 *
 * @since 2015.2
 */
function ClientResponse() {
    
    /**
     * Response code.
     * @name ClientResponse#code
     * @type number
     * @readonly
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted
     */    
    this.prototype.code = undefined;    
    /**
     * Response headers.
     * @name ClientResponse#headers
     * @type Object
     * @readonly
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted
     */    
    this.prototype.headers = undefined;    
    /**
     * Response body.
     * @name ClientResponse#body
     * @type string
     * @readonly
     * @throws {SuiteScriptError} READ_ONLY_PROPERTY when setting the property is attempted
     */    
    this.prototype.body = undefined;    
    /**
     * Returns the object type name (http.ClientResponse)
     *
     * @returns {string}
     */    
    this.prototype.toString = function() {};    
    
    /**
     * JSON.stringify() implementation.
     *
     * @returns {{type: string, code: *, headers: *, body: *}}
     */    
    this.prototype.toJSON = function() {};    
}

http = new http();
/**
 * @type {http}
 */
N.prototype.http = http;