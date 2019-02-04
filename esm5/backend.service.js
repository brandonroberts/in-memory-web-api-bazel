/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { concatMap, first } from 'rxjs/operators';
import { getStatusText, isSuccess, STATUS } from './http-status-codes';
import { delayResponse } from './delay-response';
import { InMemoryBackendConfig, parseUri, removeTrailingSlash } from './interfaces';
/**
 * Base class for in-memory web api back-ends
 * Simulate the behavior of a RESTy web api
 * backed by the simple in-memory data store provided by the injected `InMemoryDbService` service.
 * Conforms mostly to behavior described here:
 * http://www.restapitutorial.com/lessons/httpmethods.html
 * @abstract
 */
var /**
 * Base class for in-memory web api back-ends
 * Simulate the behavior of a RESTy web api
 * backed by the simple in-memory data store provided by the injected `InMemoryDbService` service.
 * Conforms mostly to behavior described here:
 * http://www.restapitutorial.com/lessons/httpmethods.html
 * @abstract
 */
BackendService = /** @class */ (function () {
    function BackendService(inMemDbService, config) {
        if (config === void 0) { config = {}; }
        this.inMemDbService = inMemDbService;
        this.config = new InMemoryBackendConfig();
        this.requestInfoUtils = this.getRequestInfoUtils();
        /** @type {?} */
        var loc = this.getLocation('/');
        this.config.host = loc.host; // default to app web server host
        this.config.rootPath = loc.path; // default to path when app is served (e.g.'/')
        Object.assign(this.config, config);
    }
    Object.defineProperty(BackendService.prototype, "dbReady", {
        ////  protected /////
        get: 
        ////  protected /////
        /**
         * @protected
         * @return {?}
         */
        function () {
            if (!this.dbReadySubject) {
                // first time the service is called.
                this.dbReadySubject = new BehaviorSubject(false);
                this.resetDb();
            }
            return this.dbReadySubject.asObservable().pipe(first((/**
             * @param {?} r
             * @return {?}
             */
            function (r) { return r; })));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Process Request and return an Observable of Http Response object
     * in the manner of a RESTy web api.
     *
     * Expect URI pattern in the form :base/:collectionName/:id?
     * Examples:
     *   // for store with a 'customers' collection
     *   GET api/customers          // all customers
     *   GET api/customers/42       // the character with id=42
     *   GET api/customers?name=^j  // 'j' is a regex; returns customers whose name starts with 'j' or 'J'
     *   GET api/customers.json/42  // ignores the ".json"
     *
     * Also accepts direct commands to the service in which the last segment of the apiBase is the word "commands"
     * Examples:
     *     POST commands/resetDb,
     *     GET/POST commands/config - get or (re)set the config
     *
     *   HTTP overrides:
     *     If the injected inMemDbService defines an HTTP method (lowercase)
     *     The request is forwarded to that method as in
     *     `inMemDbService.get(requestInfo)`
     *     which must return either an Observable of the response type
     *     for this http library or null|undefined (which means "keep processing").
     */
    /**
     * Process Request and return an Observable of Http Response object
     * in the manner of a RESTy web api.
     *
     * Expect URI pattern in the form :base/:collectionName/:id?
     * Examples:
     *   // for store with a 'customers' collection
     *   GET api/customers          // all customers
     *   GET api/customers/42       // the character with id=42
     *   GET api/customers?name=^j  // 'j' is a regex; returns customers whose name starts with 'j' or 'J'
     *   GET api/customers.json/42  // ignores the ".json"
     *
     * Also accepts direct commands to the service in which the last segment of the apiBase is the word "commands"
     * Examples:
     *     POST commands/resetDb,
     *     GET/POST commands/config - get or (re)set the config
     *
     *   HTTP overrides:
     *     If the injected inMemDbService defines an HTTP method (lowercase)
     *     The request is forwarded to that method as in
     *     `inMemDbService.get(requestInfo)`
     *     which must return either an Observable of the response type
     *     for this http library or null|undefined (which means "keep processing").
     * @protected
     * @param {?} req
     * @return {?}
     */
    BackendService.prototype.handleRequest = /**
     * Process Request and return an Observable of Http Response object
     * in the manner of a RESTy web api.
     *
     * Expect URI pattern in the form :base/:collectionName/:id?
     * Examples:
     *   // for store with a 'customers' collection
     *   GET api/customers          // all customers
     *   GET api/customers/42       // the character with id=42
     *   GET api/customers?name=^j  // 'j' is a regex; returns customers whose name starts with 'j' or 'J'
     *   GET api/customers.json/42  // ignores the ".json"
     *
     * Also accepts direct commands to the service in which the last segment of the apiBase is the word "commands"
     * Examples:
     *     POST commands/resetDb,
     *     GET/POST commands/config - get or (re)set the config
     *
     *   HTTP overrides:
     *     If the injected inMemDbService defines an HTTP method (lowercase)
     *     The request is forwarded to that method as in
     *     `inMemDbService.get(requestInfo)`
     *     which must return either an Observable of the response type
     *     for this http library or null|undefined (which means "keep processing").
     * @protected
     * @param {?} req
     * @return {?}
     */
    function (req) {
        var _this = this;
        //  handle the request when there is an in-memory database
        return this.dbReady.pipe(concatMap((/**
         * @return {?}
         */
        function () { return _this.handleRequest_(req); })));
    };
    /**
     * @protected
     * @param {?} req
     * @return {?}
     */
    BackendService.prototype.handleRequest_ = /**
     * @protected
     * @param {?} req
     * @return {?}
     */
    function (req) {
        var _this = this;
        /** @type {?} */
        var url = req.urlWithParams ? req.urlWithParams : req.url;
        // Try override parser
        // If no override parser or it returns nothing, use default parser
        /** @type {?} */
        var parser = this.bind('parseRequestUrl');
        /** @type {?} */
        var parsed = (parser && parser(url, this.requestInfoUtils)) ||
            this.parseRequestUrl(url);
        /** @type {?} */
        var collectionName = parsed.collectionName;
        /** @type {?} */
        var collection = this.db[collectionName];
        /** @type {?} */
        var reqInfo = {
            req: req,
            apiBase: parsed.apiBase,
            collection: collection,
            collectionName: collectionName,
            headers: this.createHeaders({ 'Content-Type': 'application/json' }),
            id: this.parseId(collection, collectionName, parsed.id),
            method: this.getRequestMethod(req),
            query: parsed.query,
            resourceUrl: parsed.resourceUrl,
            url: url,
            utils: this.requestInfoUtils
        };
        /** @type {?} */
        var resOptions;
        if (/commands\/?$/i.test(reqInfo.apiBase)) {
            return this.commands(reqInfo);
        }
        /** @type {?} */
        var methodInterceptor = this.bind(reqInfo.method);
        if (methodInterceptor) {
            // InMemoryDbService intercepts this HTTP method.
            // if interceptor produced a response, return it.
            // else InMemoryDbService chose not to intercept; continue processing.
            /** @type {?} */
            var interceptorResponse = methodInterceptor(reqInfo);
            if (interceptorResponse) {
                return interceptorResponse;
            }
            ;
        }
        if (this.db[collectionName]) {
            // request is for a known collection of the InMemoryDbService
            return this.createResponse$((/**
             * @return {?}
             */
            function () { return _this.collectionHandler(reqInfo); }));
        }
        if (this.config.passThruUnknownUrl) {
            // unknown collection; pass request thru to a "real" backend.
            return this.getPassThruBackend().handle(req);
        }
        // 404 - can't handle this request
        resOptions = this.createErrorResponseOptions(url, STATUS.NOT_FOUND, "Collection '" + collectionName + "' not found");
        return this.createResponse$((/**
         * @return {?}
         */
        function () { return resOptions; }));
    };
    /**
     * Add configured delay to response observable unless delay === 0
     */
    /**
     * Add configured delay to response observable unless delay === 0
     * @protected
     * @param {?} response
     * @return {?}
     */
    BackendService.prototype.addDelay = /**
     * Add configured delay to response observable unless delay === 0
     * @protected
     * @param {?} response
     * @return {?}
     */
    function (response) {
        /** @type {?} */
        var d = this.config.delay;
        return d === 0 ? response : delayResponse(response, d || 500);
    };
    /**
     * Apply query/search parameters as a filter over the collection
     * This impl only supports RegExp queries on string properties of the collection
     * ANDs the conditions together
     */
    /**
     * Apply query/search parameters as a filter over the collection
     * This impl only supports RegExp queries on string properties of the collection
     * ANDs the conditions together
     * @protected
     * @param {?} collection
     * @param {?} query
     * @return {?}
     */
    BackendService.prototype.applyQuery = /**
     * Apply query/search parameters as a filter over the collection
     * This impl only supports RegExp queries on string properties of the collection
     * ANDs the conditions together
     * @protected
     * @param {?} collection
     * @param {?} query
     * @return {?}
     */
    function (collection, query) {
        // extract filtering conditions - {propertyName, RegExps) - from query/search parameters
        /** @type {?} */
        var conditions = [];
        /** @type {?} */
        var caseSensitive = this.config.caseSensitiveSearch ? undefined : 'i';
        query.forEach((/**
         * @param {?} value
         * @param {?} name
         * @return {?}
         */
        function (value, name) {
            value.forEach((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return conditions.push({ name: name, rx: new RegExp(decodeURI(v), caseSensitive) }); }));
        }));
        /** @type {?} */
        var len = conditions.length;
        if (!len) {
            return collection;
        }
        // AND the RegExp conditions
        return collection.filter((/**
         * @param {?} row
         * @return {?}
         */
        function (row) {
            /** @type {?} */
            var ok = true;
            /** @type {?} */
            var i = len;
            while (ok && i) {
                i -= 1;
                /** @type {?} */
                var cond = conditions[i];
                ok = cond.rx.test(row[cond.name]);
            }
            return ok;
        }));
    };
    /**
     * Get a method from the `InMemoryDbService` (if it exists), bound to that service
     */
    /**
     * Get a method from the `InMemoryDbService` (if it exists), bound to that service
     * @protected
     * @template T
     * @param {?} methodName
     * @return {?}
     */
    BackendService.prototype.bind = /**
     * Get a method from the `InMemoryDbService` (if it exists), bound to that service
     * @protected
     * @template T
     * @param {?} methodName
     * @return {?}
     */
    function (methodName) {
        /** @type {?} */
        var fn = (/** @type {?} */ (this.inMemDbService[methodName]));
        return fn ? (/** @type {?} */ (fn.bind(this.inMemDbService))) : undefined;
    };
    /**
     * @protected
     * @param {?} data
     * @return {?}
     */
    BackendService.prototype.bodify = /**
     * @protected
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return this.config.dataEncapsulation ? { data: data } : data;
    };
    /**
     * @protected
     * @param {?} data
     * @return {?}
     */
    BackendService.prototype.clone = /**
     * @protected
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return JSON.parse(JSON.stringify(data));
    };
    /**
     * @protected
     * @param {?} reqInfo
     * @return {?}
     */
    BackendService.prototype.collectionHandler = /**
     * @protected
     * @param {?} reqInfo
     * @return {?}
     */
    function (reqInfo) {
        // const req = reqInfo.req;
        /** @type {?} */
        var resOptions;
        switch (reqInfo.method) {
            case 'get':
                resOptions = this.get(reqInfo);
                break;
            case 'post':
                resOptions = this.post(reqInfo);
                break;
            case 'put':
                resOptions = this.put(reqInfo);
                break;
            case 'delete':
                resOptions = this.delete(reqInfo);
                break;
            default:
                resOptions = this.createErrorResponseOptions(reqInfo.url, STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
                break;
        }
        // If `inMemDbService.responseInterceptor` exists, let it morph the response options
        /** @type {?} */
        var interceptor = this.bind('responseInterceptor');
        return interceptor ? interceptor(resOptions, reqInfo) : resOptions;
    };
    /**
     * Commands reconfigure the in-memory web api service or extract information from it.
     * Commands ignore the latency delay and respond ASAP.
     *
     * When the last segment of the `apiBase` path is "commands",
     * the `collectionName` is the command.
     *
     * Example URLs:
     *   commands/resetdb (POST) // Reset the "database" to its original state
     *   commands/config (GET)   // Return this service's config object
     *   commands/config (POST)  // Update the config (e.g. the delay)
     *
     * Usage:
     *   http.post('commands/resetdb', undefined);
     *   http.get('commands/config');
     *   http.post('commands/config', '{"delay":1000}');
     */
    /**
     * Commands reconfigure the in-memory web api service or extract information from it.
     * Commands ignore the latency delay and respond ASAP.
     *
     * When the last segment of the `apiBase` path is "commands",
     * the `collectionName` is the command.
     *
     * Example URLs:
     *   commands/resetdb (POST) // Reset the "database" to its original state
     *   commands/config (GET)   // Return this service's config object
     *   commands/config (POST)  // Update the config (e.g. the delay)
     *
     * Usage:
     *   http.post('commands/resetdb', undefined);
     *   http.get('commands/config');
     *   http.post('commands/config', '{"delay":1000}');
     * @protected
     * @param {?} reqInfo
     * @return {?}
     */
    BackendService.prototype.commands = /**
     * Commands reconfigure the in-memory web api service or extract information from it.
     * Commands ignore the latency delay and respond ASAP.
     *
     * When the last segment of the `apiBase` path is "commands",
     * the `collectionName` is the command.
     *
     * Example URLs:
     *   commands/resetdb (POST) // Reset the "database" to its original state
     *   commands/config (GET)   // Return this service's config object
     *   commands/config (POST)  // Update the config (e.g. the delay)
     *
     * Usage:
     *   http.post('commands/resetdb', undefined);
     *   http.get('commands/config');
     *   http.post('commands/config', '{"delay":1000}');
     * @protected
     * @param {?} reqInfo
     * @return {?}
     */
    function (reqInfo) {
        var _this = this;
        /** @type {?} */
        var command = reqInfo.collectionName.toLowerCase();
        /** @type {?} */
        var method = reqInfo.method;
        /** @type {?} */
        var resOptions = {
            url: reqInfo.url
        };
        switch (command) {
            case 'resetdb':
                resOptions.status = STATUS.NO_CONTENT;
                return this.resetDb(reqInfo).pipe(concatMap((/**
                 * @return {?}
                 */
                function () { return _this.createResponse$((/**
                 * @return {?}
                 */
                function () { return resOptions; }), false /* no latency delay */); })));
            case 'config':
                if (method === 'get') {
                    resOptions.status = STATUS.OK;
                    resOptions.body = this.clone(this.config);
                    // any other HTTP method is assumed to be a config update
                }
                else {
                    /** @type {?} */
                    var body = this.getJsonBody(reqInfo.req);
                    Object.assign(this.config, body);
                    this.passThruBackend = undefined; // re-create when needed
                    resOptions.status = STATUS.NO_CONTENT;
                }
                break;
            default:
                resOptions = this.createErrorResponseOptions(reqInfo.url, STATUS.INTERNAL_SERVER_ERROR, "Unknown command \"" + command + "\"");
        }
        return this.createResponse$((/**
         * @return {?}
         */
        function () { return resOptions; }), false /* no latency delay */);
    };
    /**
     * @protected
     * @param {?} url
     * @param {?} status
     * @param {?} message
     * @return {?}
     */
    BackendService.prototype.createErrorResponseOptions = /**
     * @protected
     * @param {?} url
     * @param {?} status
     * @param {?} message
     * @return {?}
     */
    function (url, status, message) {
        return {
            body: { error: "" + message },
            url: url,
            headers: this.createHeaders({ 'Content-Type': 'application/json' }),
            status: status
        };
    };
    /**
     * Create a cold response Observable from a factory for ResponseOptions
     * @param resOptionsFactory - creates ResponseOptions when observable is subscribed
     * @param withDelay - if true (default), add simulated latency delay from configuration
     */
    /**
     * Create a cold response Observable from a factory for ResponseOptions
     * @protected
     * @param {?} resOptionsFactory - creates ResponseOptions when observable is subscribed
     * @param {?=} withDelay - if true (default), add simulated latency delay from configuration
     * @return {?}
     */
    BackendService.prototype.createResponse$ = /**
     * Create a cold response Observable from a factory for ResponseOptions
     * @protected
     * @param {?} resOptionsFactory - creates ResponseOptions when observable is subscribed
     * @param {?=} withDelay - if true (default), add simulated latency delay from configuration
     * @return {?}
     */
    function (resOptionsFactory, withDelay) {
        if (withDelay === void 0) { withDelay = true; }
        /** @type {?} */
        var resOptions$ = this.createResponseOptions$(resOptionsFactory);
        /** @type {?} */
        var resp$ = this.createResponse$fromResponseOptions$(resOptions$);
        return withDelay ? this.addDelay(resp$) : resp$;
    };
    /**
     * Create a cold Observable of ResponseOptions.
     * @param resOptionsFactory - creates ResponseOptions when observable is subscribed
     */
    /**
     * Create a cold Observable of ResponseOptions.
     * @protected
     * @param {?} resOptionsFactory - creates ResponseOptions when observable is subscribed
     * @return {?}
     */
    BackendService.prototype.createResponseOptions$ = /**
     * Create a cold Observable of ResponseOptions.
     * @protected
     * @param {?} resOptionsFactory - creates ResponseOptions when observable is subscribed
     * @return {?}
     */
    function (resOptionsFactory) {
        var _this = this;
        return new Observable((/**
         * @param {?} responseObserver
         * @return {?}
         */
        function (responseObserver) {
            /** @type {?} */
            var resOptions;
            try {
                resOptions = resOptionsFactory();
            }
            catch (error) {
                /** @type {?} */
                var err = error.message || error;
                resOptions = _this.createErrorResponseOptions('', STATUS.INTERNAL_SERVER_ERROR, "" + err);
            }
            /** @type {?} */
            var status = resOptions.status;
            try {
                resOptions.statusText = getStatusText(status);
            }
            catch (e) { /* ignore failure */ }
            if (isSuccess(status)) {
                responseObserver.next(resOptions);
                responseObserver.complete();
            }
            else {
                responseObserver.error(resOptions);
            }
            return (/**
             * @return {?}
             */
            function () { }); // unsubscribe function
        }));
    };
    /**
     * @protected
     * @param {?} __0
     * @return {?}
     */
    BackendService.prototype.delete = /**
     * @protected
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var collection = _a.collection, collectionName = _a.collectionName, headers = _a.headers, id = _a.id, url = _a.url;
        // tslint:disable-next-line:triple-equals
        if (id == undefined) {
            return this.createErrorResponseOptions(url, STATUS.NOT_FOUND, "Missing \"" + collectionName + "\" id");
        }
        /** @type {?} */
        var exists = this.removeById(collection, id);
        return {
            headers: headers,
            status: (exists || !this.config.delete404) ? STATUS.NO_CONTENT : STATUS.NOT_FOUND
        };
    };
    /**
     * Find first instance of item in collection by `item.id`
     * @param collection
     * @param id
     */
    /**
     * Find first instance of item in collection by `item.id`
     * @protected
     * @template T
     * @param {?} collection
     * @param {?} id
     * @return {?}
     */
    BackendService.prototype.findById = /**
     * Find first instance of item in collection by `item.id`
     * @protected
     * @template T
     * @param {?} collection
     * @param {?} id
     * @return {?}
     */
    function (collection, id) {
        return collection.find((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.id === id; }));
    };
    /**
     * Generate the next available id for item in this collection
     * Use method from `inMemDbService` if it exists and returns a value,
     * else delegates to `genIdDefault`.
     * @param collection - collection of items with `id` key property
     */
    /**
     * Generate the next available id for item in this collection
     * Use method from `inMemDbService` if it exists and returns a value,
     * else delegates to `genIdDefault`.
     * @protected
     * @template T
     * @param {?} collection - collection of items with `id` key property
     * @param {?} collectionName
     * @return {?}
     */
    BackendService.prototype.genId = /**
     * Generate the next available id for item in this collection
     * Use method from `inMemDbService` if it exists and returns a value,
     * else delegates to `genIdDefault`.
     * @protected
     * @template T
     * @param {?} collection - collection of items with `id` key property
     * @param {?} collectionName
     * @return {?}
     */
    function (collection, collectionName) {
        /** @type {?} */
        var genId = this.bind('genId');
        if (genId) {
            /** @type {?} */
            var id = genId(collection, collectionName);
            // tslint:disable-next-line:triple-equals
            if (id != undefined) {
                return id;
            }
        }
        return this.genIdDefault(collection, collectionName);
    };
    /**
     * Default generator of the next available id for item in this collection
     * This default implementation works only for numeric ids.
     * @param collection - collection of items with `id` key property
     * @param collectionName - name of the collection
     */
    /**
     * Default generator of the next available id for item in this collection
     * This default implementation works only for numeric ids.
     * @protected
     * @template T
     * @param {?} collection - collection of items with `id` key property
     * @param {?} collectionName - name of the collection
     * @return {?}
     */
    BackendService.prototype.genIdDefault = /**
     * Default generator of the next available id for item in this collection
     * This default implementation works only for numeric ids.
     * @protected
     * @template T
     * @param {?} collection - collection of items with `id` key property
     * @param {?} collectionName - name of the collection
     * @return {?}
     */
    function (collection, collectionName) {
        if (!this.isCollectionIdNumeric(collection, collectionName)) {
            throw new Error("Collection '" + collectionName + "' id type is non-numeric or unknown. Can only generate numeric ids.");
        }
        /** @type {?} */
        var maxId = 0;
        collection.reduce((/**
         * @param {?} prev
         * @param {?} item
         * @return {?}
         */
        function (prev, item) {
            maxId = Math.max(maxId, typeof item.id === 'number' ? item.id : maxId);
        }), undefined);
        return maxId + 1;
    };
    /**
     * @protected
     * @param {?} __0
     * @return {?}
     */
    BackendService.prototype.get = /**
     * @protected
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var collection = _a.collection, collectionName = _a.collectionName, headers = _a.headers, id = _a.id, query = _a.query, url = _a.url;
        /** @type {?} */
        var data = collection;
        // tslint:disable-next-line:triple-equals
        if (id != undefined && id !== '') {
            data = this.findById(collection, id);
        }
        else if (query) {
            data = this.applyQuery(collection, query);
        }
        if (!data) {
            return this.createErrorResponseOptions(url, STATUS.NOT_FOUND, "'" + collectionName + "' with id='" + id + "' not found");
        }
        return {
            body: this.bodify(this.clone(data)),
            headers: headers,
            status: STATUS.OK
        };
    };
    /**
     * Get location info from a url, even on server where `document` is not defined
     */
    /**
     * Get location info from a url, even on server where `document` is not defined
     * @protected
     * @param {?} url
     * @return {?}
     */
    BackendService.prototype.getLocation = /**
     * Get location info from a url, even on server where `document` is not defined
     * @protected
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (!url.startsWith('http')) {
            // get the document iff running in browser
            /** @type {?} */
            var doc = (typeof document === 'undefined') ? undefined : document;
            // add host info to url before parsing.  Use a fake host when not in browser.
            /** @type {?} */
            var base = doc ? doc.location.protocol + '//' + doc.location.host : 'http://fake';
            url = url.startsWith('/') ? base + url : base + '/' + url;
        }
        return parseUri(url);
    };
    ;
    /**
     * get or create the function that passes unhandled requests
     * through to the "real" backend.
     */
    /**
     * get or create the function that passes unhandled requests
     * through to the "real" backend.
     * @protected
     * @return {?}
     */
    BackendService.prototype.getPassThruBackend = /**
     * get or create the function that passes unhandled requests
     * through to the "real" backend.
     * @protected
     * @return {?}
     */
    function () {
        return this.passThruBackend ?
            this.passThruBackend :
            this.passThruBackend = this.createPassThruBackend();
    };
    /**
     * Get utility methods from this service instance.
     * Useful within an HTTP method override
     */
    /**
     * Get utility methods from this service instance.
     * Useful within an HTTP method override
     * @protected
     * @return {?}
     */
    BackendService.prototype.getRequestInfoUtils = /**
     * Get utility methods from this service instance.
     * Useful within an HTTP method override
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        return {
            createResponse$: this.createResponse$.bind(this),
            findById: this.findById.bind(this),
            isCollectionIdNumeric: this.isCollectionIdNumeric.bind(this),
            getConfig: (/**
             * @return {?}
             */
            function () { return _this.config; }),
            getDb: (/**
             * @return {?}
             */
            function () { return _this.db; }),
            getJsonBody: this.getJsonBody.bind(this),
            getLocation: this.getLocation.bind(this),
            getPassThruBackend: this.getPassThruBackend.bind(this),
            parseRequestUrl: this.parseRequestUrl.bind(this),
        };
    };
    /**
     * @protected
     * @param {?} collection
     * @param {?} id
     * @return {?}
     */
    BackendService.prototype.indexOf = /**
     * @protected
     * @param {?} collection
     * @param {?} id
     * @return {?}
     */
    function (collection, id) {
        return collection.findIndex((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.id === id; }));
    };
    /** Parse the id as a number. Return original value if not a number. */
    /**
     * Parse the id as a number. Return original value if not a number.
     * @protected
     * @param {?} collection
     * @param {?} collectionName
     * @param {?} id
     * @return {?}
     */
    BackendService.prototype.parseId = /**
     * Parse the id as a number. Return original value if not a number.
     * @protected
     * @param {?} collection
     * @param {?} collectionName
     * @param {?} id
     * @return {?}
     */
    function (collection, collectionName, id) {
        if (!this.isCollectionIdNumeric(collection, collectionName)) {
            // Can't confirm that `id` is a numeric type; don't parse as a number
            // or else `'42'` -> `42` and _get by id_ fails.
            return id;
        }
        /** @type {?} */
        var idNum = parseFloat(id);
        return isNaN(idNum) ? id : idNum;
    };
    /**
     * return true if can determine that the collection's `item.id` is a number
     * This implementation can't tell if the collection is empty so it assumes NO
     * */
    /**
     * return true if can determine that the collection's `item.id` is a number
     * This implementation can't tell if the collection is empty so it assumes NO
     *
     * @protected
     * @template T
     * @param {?} collection
     * @param {?} collectionName
     * @return {?}
     */
    BackendService.prototype.isCollectionIdNumeric = /**
     * return true if can determine that the collection's `item.id` is a number
     * This implementation can't tell if the collection is empty so it assumes NO
     *
     * @protected
     * @template T
     * @param {?} collection
     * @param {?} collectionName
     * @return {?}
     */
    function (collection, collectionName) {
        // collectionName not used now but override might maintain collection type information
        // so that it could know the type of the `id` even when the collection is empty.
        return !!(collection && collection[0]) && typeof collection[0].id === 'number';
    };
    /**
     * Parses the request URL into a `ParsedRequestUrl` object.
     * Parsing depends upon certain values of `config`: `apiBase`, `host`, and `urlRoot`.
     *
     * Configuring the `apiBase` yields the most interesting changes to `parseRequestUrl` behavior:
     *   When apiBase=undefined and url='http://localhost/api/collection/42'
     *     {base: 'api/', collectionName: 'collection', id: '42', ...}
     *   When apiBase='some/api/root/' and url='http://localhost/some/api/root/collection'
     *     {base: 'some/api/root/', collectionName: 'collection', id: undefined, ...}
     *   When apiBase='/' and url='http://localhost/collection'
     *     {base: '/', collectionName: 'collection', id: undefined, ...}
     *
     * The actual api base segment values are ignored. Only the number of segments matters.
     * The following api base strings are considered identical: 'a/b' ~ 'some/api/' ~ `two/segments'
     *
     * To replace this default method, assign your alternative to your InMemDbService['parseRequestUrl']
     */
    /**
     * Parses the request URL into a `ParsedRequestUrl` object.
     * Parsing depends upon certain values of `config`: `apiBase`, `host`, and `urlRoot`.
     *
     * Configuring the `apiBase` yields the most interesting changes to `parseRequestUrl` behavior:
     *   When apiBase=undefined and url='http://localhost/api/collection/42'
     *     {base: 'api/', collectionName: 'collection', id: '42', ...}
     *   When apiBase='some/api/root/' and url='http://localhost/some/api/root/collection'
     *     {base: 'some/api/root/', collectionName: 'collection', id: undefined, ...}
     *   When apiBase='/' and url='http://localhost/collection'
     *     {base: '/', collectionName: 'collection', id: undefined, ...}
     *
     * The actual api base segment values are ignored. Only the number of segments matters.
     * The following api base strings are considered identical: 'a/b' ~ 'some/api/' ~ `two/segments'
     *
     * To replace this default method, assign your alternative to your InMemDbService['parseRequestUrl']
     * @protected
     * @param {?} url
     * @return {?}
     */
    BackendService.prototype.parseRequestUrl = /**
     * Parses the request URL into a `ParsedRequestUrl` object.
     * Parsing depends upon certain values of `config`: `apiBase`, `host`, and `urlRoot`.
     *
     * Configuring the `apiBase` yields the most interesting changes to `parseRequestUrl` behavior:
     *   When apiBase=undefined and url='http://localhost/api/collection/42'
     *     {base: 'api/', collectionName: 'collection', id: '42', ...}
     *   When apiBase='some/api/root/' and url='http://localhost/some/api/root/collection'
     *     {base: 'some/api/root/', collectionName: 'collection', id: undefined, ...}
     *   When apiBase='/' and url='http://localhost/collection'
     *     {base: '/', collectionName: 'collection', id: undefined, ...}
     *
     * The actual api base segment values are ignored. Only the number of segments matters.
     * The following api base strings are considered identical: 'a/b' ~ 'some/api/' ~ `two/segments'
     *
     * To replace this default method, assign your alternative to your InMemDbService['parseRequestUrl']
     * @protected
     * @param {?} url
     * @return {?}
     */
    function (url) {
        try {
            /** @type {?} */
            var loc = this.getLocation(url);
            /** @type {?} */
            var drop = this.config.rootPath.length;
            /** @type {?} */
            var urlRoot = '';
            if (loc.host !== this.config.host) {
                // url for a server on a different host!
                // assume it's collection is actually here too.
                drop = 1; // the leading slash
                urlRoot = loc.protocol + '//' + loc.host + '/';
            }
            /** @type {?} */
            var path = loc.path.substring(drop);
            /** @type {?} */
            var pathSegments = path.split('/');
            /** @type {?} */
            var segmentIx = 0;
            // apiBase: the front part of the path devoted to getting to the api route
            // Assumes first path segment if no config.apiBase
            // else ignores as many path segments as are in config.apiBase
            // Does NOT care what the api base chars actually are.
            /** @type {?} */
            var apiBase = void 0;
            // tslint:disable-next-line:triple-equals
            if (this.config.apiBase == undefined) {
                apiBase = pathSegments[segmentIx++];
            }
            else {
                apiBase = removeTrailingSlash(this.config.apiBase.trim());
                if (apiBase) {
                    segmentIx = apiBase.split('/').length;
                }
                else {
                    segmentIx = 0; // no api base at all; unwise but allowed.
                }
            }
            apiBase += '/';
            /** @type {?} */
            var collectionName = pathSegments[segmentIx++];
            // ignore anything after a '.' (e.g.,the "json" in "customers.json")
            collectionName = collectionName && collectionName.split('.')[0];
            /** @type {?} */
            var id = pathSegments[segmentIx++];
            /** @type {?} */
            var query = this.createQueryMap(loc.query);
            /** @type {?} */
            var resourceUrl = urlRoot + apiBase + collectionName + '/';
            return { apiBase: apiBase, collectionName: collectionName, id: id, query: query, resourceUrl: resourceUrl };
        }
        catch (err) {
            /** @type {?} */
            var msg = "unable to parse url '" + url + "'; original error: " + err.message;
            throw new Error(msg);
        }
    };
    // Create entity
    // Can update an existing entity too if post409 is false.
    // Create entity
    // Can update an existing entity too if post409 is false.
    /**
     * @protected
     * @param {?} __0
     * @return {?}
     */
    BackendService.prototype.post = 
    // Create entity
    // Can update an existing entity too if post409 is false.
    /**
     * @protected
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var collection = _a.collection, collectionName = _a.collectionName, headers = _a.headers, id = _a.id, req = _a.req, resourceUrl = _a.resourceUrl, url = _a.url;
        /** @type {?} */
        var item = this.clone(this.getJsonBody(req));
        // tslint:disable-next-line:triple-equals
        if (item.id == undefined) {
            try {
                item.id = id || this.genId(collection, collectionName);
            }
            catch (err) {
                /** @type {?} */
                var emsg = err.message || '';
                if (/id type is non-numeric/.test(emsg)) {
                    return this.createErrorResponseOptions(url, STATUS.UNPROCESSABLE_ENTRY, emsg);
                }
                else {
                    console.error(err);
                    return this.createErrorResponseOptions(url, STATUS.INTERNAL_SERVER_ERROR, "Failed to generate new id for '" + collectionName + "'");
                }
            }
        }
        if (id && id !== item.id) {
            return this.createErrorResponseOptions(url, STATUS.BAD_REQUEST, "Request id does not match item.id");
        }
        else {
            id = item.id;
        }
        /** @type {?} */
        var existingIx = this.indexOf(collection, id);
        /** @type {?} */
        var body = this.bodify(item);
        if (existingIx === -1) {
            collection.push(item);
            headers.set('Location', resourceUrl + '/' + id);
            return { headers: headers, body: body, status: STATUS.CREATED };
        }
        else if (this.config.post409) {
            return this.createErrorResponseOptions(url, STATUS.CONFLICT, "'" + collectionName + "' item with id='" + id + " exists and may not be updated with POST; use PUT instead.");
        }
        else {
            collection[existingIx] = item;
            return this.config.post204 ?
                { headers: headers, status: STATUS.NO_CONTENT } : // successful; no content
                { headers: headers, body: body, status: STATUS.OK }; // successful; return entity
        }
    };
    // Update existing entity
    // Can create an entity too if put404 is false.
    // Update existing entity
    // Can create an entity too if put404 is false.
    /**
     * @protected
     * @param {?} __0
     * @return {?}
     */
    BackendService.prototype.put = 
    // Update existing entity
    // Can create an entity too if put404 is false.
    /**
     * @protected
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var collection = _a.collection, collectionName = _a.collectionName, headers = _a.headers, id = _a.id, req = _a.req, url = _a.url;
        /** @type {?} */
        var item = this.clone(this.getJsonBody(req));
        // tslint:disable-next-line:triple-equals
        if (item.id == undefined) {
            return this.createErrorResponseOptions(url, STATUS.NOT_FOUND, "Missing '" + collectionName + "' id");
        }
        if (id && id !== item.id) {
            return this.createErrorResponseOptions(url, STATUS.BAD_REQUEST, "Request for '" + collectionName + "' id does not match item.id");
        }
        else {
            id = item.id;
        }
        /** @type {?} */
        var existingIx = this.indexOf(collection, id);
        /** @type {?} */
        var body = this.bodify(item);
        if (existingIx > -1) {
            collection[existingIx] = item;
            return this.config.put204 ?
                { headers: headers, status: STATUS.NO_CONTENT } : // successful; no content
                { headers: headers, body: body, status: STATUS.OK }; // successful; return entity
        }
        else if (this.config.put404) {
            // item to update not found; use POST to create new item for this id.
            return this.createErrorResponseOptions(url, STATUS.NOT_FOUND, "'" + collectionName + "' item with id='" + id + " not found and may not be created with PUT; use POST instead.");
        }
        else {
            // create new item for id not found
            collection.push(item);
            return { headers: headers, body: body, status: STATUS.CREATED };
        }
    };
    /**
     * @protected
     * @param {?} collection
     * @param {?} id
     * @return {?}
     */
    BackendService.prototype.removeById = /**
     * @protected
     * @param {?} collection
     * @param {?} id
     * @return {?}
     */
    function (collection, id) {
        /** @type {?} */
        var ix = this.indexOf(collection, id);
        if (ix > -1) {
            collection.splice(ix, 1);
            return true;
        }
        return false;
    };
    /**
     * Tell your in-mem "database" to reset.
     * returns Observable of the database because resetting it could be async
     */
    /**
     * Tell your in-mem "database" to reset.
     * returns Observable of the database because resetting it could be async
     * @protected
     * @param {?=} reqInfo
     * @return {?}
     */
    BackendService.prototype.resetDb = /**
     * Tell your in-mem "database" to reset.
     * returns Observable of the database because resetting it could be async
     * @protected
     * @param {?=} reqInfo
     * @return {?}
     */
    function (reqInfo) {
        var _this = this;
        this.dbReadySubject.next(false);
        /** @type {?} */
        var db = this.inMemDbService.createDb(reqInfo);
        /** @type {?} */
        var db$ = db instanceof Observable ? db :
            typeof ((/** @type {?} */ (db))).then === 'function' ? from((/** @type {?} */ (db))) :
                of(db);
        db$.pipe(first()).subscribe((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            _this.db = d;
            _this.dbReadySubject.next(true);
        }));
        return this.dbReady;
    };
    return BackendService;
}());
/**
 * Base class for in-memory web api back-ends
 * Simulate the behavior of a RESTy web api
 * backed by the simple in-memory data store provided by the injected `InMemoryDbService` service.
 * Conforms mostly to behavior described here:
 * http://www.restapitutorial.com/lessons/httpmethods.html
 * @abstract
 */
export { BackendService };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    BackendService.prototype.config;
    /**
     * @type {?}
     * @protected
     */
    BackendService.prototype.db;
    /**
     * @type {?}
     * @protected
     */
    BackendService.prototype.dbReadySubject;
    /**
     * @type {?}
     * @private
     */
    BackendService.prototype.passThruBackend;
    /**
     * @type {?}
     * @protected
     */
    BackendService.prototype.requestInfoUtils;
    /**
     * @type {?}
     * @protected
     */
    BackendService.prototype.inMemDbService;
    /* Skipping unhandled member: ;*/
    /**
     * Create standard HTTP headers object from hash map of header strings
     * @abstract
     * @protected
     * @param {?} headers
     * @return {?}
     */
    BackendService.prototype.createHeaders = function (headers) { };
    /**
     * create the function that passes unhandled requests through to the "real" backend.
     * @abstract
     * @protected
     * @return {?}
     */
    BackendService.prototype.createPassThruBackend = function () { };
    /**
     * return a search map from a location query/search string
     * @abstract
     * @protected
     * @param {?} search
     * @return {?}
     */
    BackendService.prototype.createQueryMap = function (search) { };
    /**
     * Create a Response observable from ResponseOptions observable.
     * @abstract
     * @protected
     * @param {?} resOptions$
     * @return {?}
     */
    BackendService.prototype.createResponse$fromResponseOptions$ = function (resOptions$) { };
    /**
     * Get JSON body from the request object
     * @abstract
     * @protected
     * @param {?} req
     * @return {?}
     */
    BackendService.prototype.getJsonBody = function (req) { };
    /**
     * return canonical HTTP method name (lowercase) from the request object
     * e.g. (req.method || 'get').toLowerCase();
     * @abstract
     * @protected
     * @param {?} req - request object from the http call
     *
     * @return {?}
     */
    BackendService.prototype.getRequestMethod = function (req) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbi1tZW1vcnktd2ViLWFwaS8iLCJzb3VyY2VzIjpbImJhY2tlbmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxPQUFPLEVBSUwscUJBQXFCLEVBR3JCLFFBQVEsRUFFUixtQkFBbUIsRUFLcEIsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7OztBQVN0Qjs7Ozs7Ozs7O0lBT0Usd0JBQ1ksY0FBaUMsRUFDM0MsTUFBc0M7UUFBdEMsdUJBQUEsRUFBQSxXQUFzQztRQUQ1QixtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFQbkMsV0FBTSxHQUE4QixJQUFJLHFCQUFxQixFQUFFLENBQUM7UUFJaEUscUJBQWdCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7O1lBTWhELEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUssaUNBQWlDO1FBQ2xFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQywrQ0FBK0M7UUFDaEYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFHRCxzQkFBYyxtQ0FB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R3RELHdDQUEyQzs7Ozs7Ozs7O0lBc1E3QyxnRUFBa0Y7Ozs7Ozs7SUFLbEYsaUVBQTREOzs7Ozs7OztJQUs1RCxnRUFBeUU7Ozs7Ozs7O0lBZ0J6RSwwRkFBa0g7Ozs7Ozs7O0lBNEdsSCwwREFBOEM7Ozs7Ozs7Ozs7SUFrRDlDLCtEQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBCZWhhdmlvclN1YmplY3QsIG9mLCBmcm9tIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb25jYXRNYXAsIGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBnZXRTdGF0dXNUZXh0LCBpc1N1Y2Nlc3MsIFNUQVRVUyB9IGZyb20gJy4vaHR0cC1zdGF0dXMtY29kZXMnO1xuaW1wb3J0IHsgZGVsYXlSZXNwb25zZSB9IGZyb20gJy4vZGVsYXktcmVzcG9uc2UnO1xuXG5pbXBvcnQge1xuICBIZWFkZXJzQ29yZSxcbiAgUmVxdWVzdEluZm9VdGlsaXRpZXMsXG4gIEluTWVtb3J5RGJTZXJ2aWNlLFxuICBJbk1lbW9yeUJhY2tlbmRDb25maWcsXG4gIEluTWVtb3J5QmFja2VuZENvbmZpZ0FyZ3MsXG4gIFBhcnNlZFJlcXVlc3RVcmwsXG4gIHBhcnNlVXJpLFxuICBQYXNzVGhydUJhY2tlbmQsXG4gIHJlbW92ZVRyYWlsaW5nU2xhc2gsXG4gIFJlcXVlc3RDb3JlLFxuICBSZXF1ZXN0SW5mbyxcbiAgUmVzcG9uc2VPcHRpb25zLFxuICBVcmlJbmZvXG59IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgaW4tbWVtb3J5IHdlYiBhcGkgYmFjay1lbmRzXG4gKiBTaW11bGF0ZSB0aGUgYmVoYXZpb3Igb2YgYSBSRVNUeSB3ZWIgYXBpXG4gKiBiYWNrZWQgYnkgdGhlIHNpbXBsZSBpbi1tZW1vcnkgZGF0YSBzdG9yZSBwcm92aWRlZCBieSB0aGUgaW5qZWN0ZWQgYEluTWVtb3J5RGJTZXJ2aWNlYCBzZXJ2aWNlLlxuICogQ29uZm9ybXMgbW9zdGx5IHRvIGJlaGF2aW9yIGRlc2NyaWJlZCBoZXJlOlxuICogaHR0cDovL3d3dy5yZXN0YXBpdHV0b3JpYWwuY29tL2xlc3NvbnMvaHR0cG1ldGhvZHMuaHRtbFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFja2VuZFNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgY29uZmlnOiBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzID0gbmV3IEluTWVtb3J5QmFja2VuZENvbmZpZygpO1xuICBwcm90ZWN0ZWQgZGI6IE9iamVjdDtcbiAgcHJvdGVjdGVkIGRiUmVhZHlTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj47XG4gIHByaXZhdGUgcGFzc1RocnVCYWNrZW5kOiBQYXNzVGhydUJhY2tlbmQ7XG4gIHByb3RlY3RlZCByZXF1ZXN0SW5mb1V0aWxzID0gdGhpcy5nZXRSZXF1ZXN0SW5mb1V0aWxzKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGluTWVtRGJTZXJ2aWNlOiBJbk1lbW9yeURiU2VydmljZSxcbiAgICBjb25maWc6IEluTWVtb3J5QmFja2VuZENvbmZpZ0FyZ3MgPSB7fVxuICApIHtcbiAgICBjb25zdCBsb2MgPSB0aGlzLmdldExvY2F0aW9uKCcvJyk7XG4gICAgdGhpcy5jb25maWcuaG9zdCA9IGxvYy5ob3N0OyAgICAgLy8gZGVmYXVsdCB0byBhcHAgd2ViIHNlcnZlciBob3N0XG4gICAgdGhpcy5jb25maWcucm9vdFBhdGggPSBsb2MucGF0aDsgLy8gZGVmYXVsdCB0byBwYXRoIHdoZW4gYXBwIGlzIHNlcnZlZCAoZS5nLicvJylcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBjb25maWcpO1xuICB9XG5cbiAgLy8vLyAgcHJvdGVjdGVkIC8vLy8vXG4gIHByb3RlY3RlZCBnZXQgZGJSZWFkeSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBpZiAoIXRoaXMuZGJSZWFkeVN1YmplY3QpIHtcbiAgICAgIC8vIGZpcnN0IHRpbWUgdGhlIHNlcnZpY2UgaXMgY2FsbGVkLlxuICAgICAgdGhpcy5kYlJlYWR5U3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICAgICAgdGhpcy5yZXNldERiKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRiUmVhZHlTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpLnBpcGUoZmlyc3QoKHI6IGJvb2xlYW4pID0+IHIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIFJlcXVlc3QgYW5kIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIEh0dHAgUmVzcG9uc2Ugb2JqZWN0XG4gICAqIGluIHRoZSBtYW5uZXIgb2YgYSBSRVNUeSB3ZWIgYXBpLlxuICAgKlxuICAgKiBFeHBlY3QgVVJJIHBhdHRlcm4gaW4gdGhlIGZvcm0gOmJhc2UvOmNvbGxlY3Rpb25OYW1lLzppZD9cbiAgICogRXhhbXBsZXM6XG4gICAqICAgLy8gZm9yIHN0b3JlIHdpdGggYSAnY3VzdG9tZXJzJyBjb2xsZWN0aW9uXG4gICAqICAgR0VUIGFwaS9jdXN0b21lcnMgICAgICAgICAgLy8gYWxsIGN1c3RvbWVyc1xuICAgKiAgIEdFVCBhcGkvY3VzdG9tZXJzLzQyICAgICAgIC8vIHRoZSBjaGFyYWN0ZXIgd2l0aCBpZD00MlxuICAgKiAgIEdFVCBhcGkvY3VzdG9tZXJzP25hbWU9XmogIC8vICdqJyBpcyBhIHJlZ2V4OyByZXR1cm5zIGN1c3RvbWVycyB3aG9zZSBuYW1lIHN0YXJ0cyB3aXRoICdqJyBvciAnSidcbiAgICogICBHRVQgYXBpL2N1c3RvbWVycy5qc29uLzQyICAvLyBpZ25vcmVzIHRoZSBcIi5qc29uXCJcbiAgICpcbiAgICogQWxzbyBhY2NlcHRzIGRpcmVjdCBjb21tYW5kcyB0byB0aGUgc2VydmljZSBpbiB3aGljaCB0aGUgbGFzdCBzZWdtZW50IG9mIHRoZSBhcGlCYXNlIGlzIHRoZSB3b3JkIFwiY29tbWFuZHNcIlxuICAgKiBFeGFtcGxlczpcbiAgICogICAgIFBPU1QgY29tbWFuZHMvcmVzZXREYixcbiAgICogICAgIEdFVC9QT1NUIGNvbW1hbmRzL2NvbmZpZyAtIGdldCBvciAocmUpc2V0IHRoZSBjb25maWdcbiAgICpcbiAgICogICBIVFRQIG92ZXJyaWRlczpcbiAgICogICAgIElmIHRoZSBpbmplY3RlZCBpbk1lbURiU2VydmljZSBkZWZpbmVzIGFuIEhUVFAgbWV0aG9kIChsb3dlcmNhc2UpXG4gICAqICAgICBUaGUgcmVxdWVzdCBpcyBmb3J3YXJkZWQgdG8gdGhhdCBtZXRob2QgYXMgaW5cbiAgICogICAgIGBpbk1lbURiU2VydmljZS5nZXQocmVxdWVzdEluZm8pYFxuICAgKiAgICAgd2hpY2ggbXVzdCByZXR1cm4gZWl0aGVyIGFuIE9ic2VydmFibGUgb2YgdGhlIHJlc3BvbnNlIHR5cGVcbiAgICogICAgIGZvciB0aGlzIGh0dHAgbGlicmFyeSBvciBudWxsfHVuZGVmaW5lZCAod2hpY2ggbWVhbnMgXCJrZWVwIHByb2Nlc3NpbmdcIikuXG4gICAqL1xuICBwcm90ZWN0ZWQgaGFuZGxlUmVxdWVzdChyZXE6IFJlcXVlc3RDb3JlKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAvLyAgaGFuZGxlIHRoZSByZXF1ZXN0IHdoZW4gdGhlcmUgaXMgYW4gaW4tbWVtb3J5IGRhdGFiYXNlXG4gICAgcmV0dXJuIHRoaXMuZGJSZWFkeS5waXBlKGNvbmNhdE1hcCgoKSA9PiB0aGlzLmhhbmRsZVJlcXVlc3RfKHJlcSkpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVSZXF1ZXN0XyhyZXE6IFJlcXVlc3RDb3JlKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgIGNvbnN0IHVybCA9IHJlcS51cmxXaXRoUGFyYW1zID8gcmVxLnVybFdpdGhQYXJhbXMgOiByZXEudXJsO1xuXG4gICAgLy8gVHJ5IG92ZXJyaWRlIHBhcnNlclxuICAgIC8vIElmIG5vIG92ZXJyaWRlIHBhcnNlciBvciBpdCByZXR1cm5zIG5vdGhpbmcsIHVzZSBkZWZhdWx0IHBhcnNlclxuICAgIGNvbnN0IHBhcnNlciA9IHRoaXMuYmluZCgncGFyc2VSZXF1ZXN0VXJsJyk7XG4gICAgY29uc3QgcGFyc2VkOiBQYXJzZWRSZXF1ZXN0VXJsID1cbiAgICAgICggcGFyc2VyICYmIHBhcnNlcih1cmwsIHRoaXMucmVxdWVzdEluZm9VdGlscykpIHx8XG4gICAgICB0aGlzLnBhcnNlUmVxdWVzdFVybCh1cmwpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbk5hbWUgPSBwYXJzZWQuY29sbGVjdGlvbk5hbWU7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXMuZGJbY29sbGVjdGlvbk5hbWVdO1xuXG4gICAgY29uc3QgcmVxSW5mbzogUmVxdWVzdEluZm8gPSB7XG4gICAgICByZXE6IHJlcSxcbiAgICAgIGFwaUJhc2U6IHBhcnNlZC5hcGlCYXNlLFxuICAgICAgY29sbGVjdGlvbjogY29sbGVjdGlvbixcbiAgICAgIGNvbGxlY3Rpb25OYW1lOiBjb2xsZWN0aW9uTmFtZSxcbiAgICAgIGhlYWRlcnM6IHRoaXMuY3JlYXRlSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSksXG4gICAgICBpZDogdGhpcy5wYXJzZUlkKGNvbGxlY3Rpb24sIGNvbGxlY3Rpb25OYW1lLCBwYXJzZWQuaWQpLFxuICAgICAgbWV0aG9kOiB0aGlzLmdldFJlcXVlc3RNZXRob2QocmVxKSxcbiAgICAgIHF1ZXJ5OiBwYXJzZWQucXVlcnksXG4gICAgICByZXNvdXJjZVVybDogcGFyc2VkLnJlc291cmNlVXJsLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICB1dGlsczogdGhpcy5yZXF1ZXN0SW5mb1V0aWxzXG4gICAgfTtcblxuICAgIGxldCByZXNPcHRpb25zOiBSZXNwb25zZU9wdGlvbnM7XG5cbiAgICBpZiAoL2NvbW1hbmRzXFwvPyQvaS50ZXN0KHJlcUluZm8uYXBpQmFzZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbW1hbmRzKHJlcUluZm8pO1xuICAgIH1cblxuICAgIGNvbnN0IG1ldGhvZEludGVyY2VwdG9yID0gdGhpcy5iaW5kKHJlcUluZm8ubWV0aG9kKTtcbiAgICBpZiAobWV0aG9kSW50ZXJjZXB0b3IpIHtcbiAgICAgIC8vIEluTWVtb3J5RGJTZXJ2aWNlIGludGVyY2VwdHMgdGhpcyBIVFRQIG1ldGhvZC5cbiAgICAgIC8vIGlmIGludGVyY2VwdG9yIHByb2R1Y2VkIGEgcmVzcG9uc2UsIHJldHVybiBpdC5cbiAgICAgIC8vIGVsc2UgSW5NZW1vcnlEYlNlcnZpY2UgY2hvc2Ugbm90IHRvIGludGVyY2VwdDsgY29udGludWUgcHJvY2Vzc2luZy5cbiAgICAgIGNvbnN0IGludGVyY2VwdG9yUmVzcG9uc2UgPSBtZXRob2RJbnRlcmNlcHRvcihyZXFJbmZvKTtcbiAgICAgIGlmIChpbnRlcmNlcHRvclJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiBpbnRlcmNlcHRvclJlc3BvbnNlO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kYltjb2xsZWN0aW9uTmFtZV0pIHtcbiAgICAgIC8vIHJlcXVlc3QgaXMgZm9yIGEga25vd24gY29sbGVjdGlvbiBvZiB0aGUgSW5NZW1vcnlEYlNlcnZpY2VcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc3BvbnNlJCgoKSA9PiB0aGlzLmNvbGxlY3Rpb25IYW5kbGVyKHJlcUluZm8pKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcucGFzc1RocnVVbmtub3duVXJsKSB7XG4gICAgICAvLyB1bmtub3duIGNvbGxlY3Rpb247IHBhc3MgcmVxdWVzdCB0aHJ1IHRvIGEgXCJyZWFsXCIgYmFja2VuZC5cbiAgICAgIHJldHVybiB0aGlzLmdldFBhc3NUaHJ1QmFja2VuZCgpLmhhbmRsZShyZXEpO1xuICAgIH1cblxuICAgIC8vIDQwNCAtIGNhbid0IGhhbmRsZSB0aGlzIHJlcXVlc3RcbiAgICByZXNPcHRpb25zID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucyhcbiAgICAgIHVybCxcbiAgICAgIFNUQVRVUy5OT1RfRk9VTkQsXG4gICAgICBgQ29sbGVjdGlvbiAnJHtjb2xsZWN0aW9uTmFtZX0nIG5vdCBmb3VuZGBcbiAgICApO1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc3BvbnNlJCgoKSA9PiByZXNPcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY29uZmlndXJlZCBkZWxheSB0byByZXNwb25zZSBvYnNlcnZhYmxlIHVubGVzcyBkZWxheSA9PT0gMFxuICAgKi9cbiAgcHJvdGVjdGVkIGFkZERlbGF5KHJlc3BvbnNlOiBPYnNlcnZhYmxlPGFueT4pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IGQgPSB0aGlzLmNvbmZpZy5kZWxheTtcbiAgICByZXR1cm4gZCA9PT0gMCA/IHJlc3BvbnNlIDogZGVsYXlSZXNwb25zZShyZXNwb25zZSwgZCB8fCA1MDApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHF1ZXJ5L3NlYXJjaCBwYXJhbWV0ZXJzIGFzIGEgZmlsdGVyIG92ZXIgdGhlIGNvbGxlY3Rpb25cbiAgICogVGhpcyBpbXBsIG9ubHkgc3VwcG9ydHMgUmVnRXhwIHF1ZXJpZXMgb24gc3RyaW5nIHByb3BlcnRpZXMgb2YgdGhlIGNvbGxlY3Rpb25cbiAgICogQU5EcyB0aGUgY29uZGl0aW9ucyB0b2dldGhlclxuICAgKi9cbiAgcHJvdGVjdGVkIGFwcGx5UXVlcnkoY29sbGVjdGlvbjogYW55W10sIHF1ZXJ5OiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4pOiBhbnlbXSB7XG4gICAgLy8gZXh0cmFjdCBmaWx0ZXJpbmcgY29uZGl0aW9ucyAtIHtwcm9wZXJ0eU5hbWUsIFJlZ0V4cHMpIC0gZnJvbSBxdWVyeS9zZWFyY2ggcGFyYW1ldGVyc1xuICAgIGNvbnN0IGNvbmRpdGlvbnM6IHsgbmFtZTogc3RyaW5nLCByeDogUmVnRXhwIH1bXSA9IFtdO1xuICAgIGNvbnN0IGNhc2VTZW5zaXRpdmUgPSB0aGlzLmNvbmZpZy5jYXNlU2Vuc2l0aXZlU2VhcmNoID8gdW5kZWZpbmVkIDogJ2knO1xuICAgIHF1ZXJ5LmZvckVhY2goKHZhbHVlOiBzdHJpbmdbXSwgbmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKHYgPT4gY29uZGl0aW9ucy5wdXNoKHsgbmFtZSwgcng6IG5ldyBSZWdFeHAoZGVjb2RlVVJJKHYpLCBjYXNlU2Vuc2l0aXZlKSB9KSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBsZW4gPSBjb25kaXRpb25zLmxlbmd0aDtcbiAgICBpZiAoIWxlbikgeyByZXR1cm4gY29sbGVjdGlvbjsgfVxuXG4gICAgLy8gQU5EIHRoZSBSZWdFeHAgY29uZGl0aW9uc1xuICAgIHJldHVybiBjb2xsZWN0aW9uLmZpbHRlcihyb3cgPT4ge1xuICAgICAgbGV0IG9rID0gdHJ1ZTtcbiAgICAgIGxldCBpID0gbGVuO1xuICAgICAgd2hpbGUgKG9rICYmIGkpIHtcbiAgICAgICAgaSAtPSAxO1xuICAgICAgICBjb25zdCBjb25kID0gY29uZGl0aW9uc1tpXTtcbiAgICAgICAgb2sgPSBjb25kLnJ4LnRlc3Qocm93W2NvbmQubmFtZV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9rO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIG1ldGhvZCBmcm9tIHRoZSBgSW5NZW1vcnlEYlNlcnZpY2VgIChpZiBpdCBleGlzdHMpLCBib3VuZCB0byB0aGF0IHNlcnZpY2VcbiAgICovXG4gIHByb3RlY3RlZCBiaW5kPFQgZXh0ZW5kcyBGdW5jdGlvbj4obWV0aG9kTmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZm4gPSB0aGlzLmluTWVtRGJTZXJ2aWNlW21ldGhvZE5hbWVdIGFzIFQ7XG4gICAgcmV0dXJuIGZuID8gPFQ+IGZuLmJpbmQodGhpcy5pbk1lbURiU2VydmljZSkgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgYm9kaWZ5KGRhdGE6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5kYXRhRW5jYXBzdWxhdGlvbiA/IHsgZGF0YSB9IDogZGF0YTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjbG9uZShkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29sbGVjdGlvbkhhbmRsZXIocmVxSW5mbzogUmVxdWVzdEluZm8pOiBSZXNwb25zZU9wdGlvbnMge1xuICAgIC8vIGNvbnN0IHJlcSA9IHJlcUluZm8ucmVxO1xuICAgICAgbGV0IHJlc09wdGlvbnM6IFJlc3BvbnNlT3B0aW9ucztcbiAgICAgIHN3aXRjaCAocmVxSW5mby5tZXRob2QpIHtcbiAgICAgICAgY2FzZSAnZ2V0JzpcbiAgICAgICAgICByZXNPcHRpb25zID0gdGhpcy5nZXQocmVxSW5mbyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Bvc3QnOlxuICAgICAgICAgIHJlc09wdGlvbnMgPSB0aGlzLnBvc3QocmVxSW5mbyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3B1dCc6XG4gICAgICAgICAgcmVzT3B0aW9ucyA9IHRoaXMucHV0KHJlcUluZm8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdkZWxldGUnOlxuICAgICAgICAgIHJlc09wdGlvbnMgPSB0aGlzLmRlbGV0ZShyZXFJbmZvKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXNPcHRpb25zID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucyhyZXFJbmZvLnVybCwgU1RBVFVTLk1FVEhPRF9OT1RfQUxMT1dFRCwgJ01ldGhvZCBub3QgYWxsb3dlZCcpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBgaW5NZW1EYlNlcnZpY2UucmVzcG9uc2VJbnRlcmNlcHRvcmAgZXhpc3RzLCBsZXQgaXQgbW9ycGggdGhlIHJlc3BvbnNlIG9wdGlvbnNcbiAgICAgIGNvbnN0IGludGVyY2VwdG9yID0gdGhpcy5iaW5kKCdyZXNwb25zZUludGVyY2VwdG9yJyk7XG4gICAgICByZXR1cm4gaW50ZXJjZXB0b3IgPyBpbnRlcmNlcHRvcihyZXNPcHRpb25zLCByZXFJbmZvKSA6IHJlc09wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogQ29tbWFuZHMgcmVjb25maWd1cmUgdGhlIGluLW1lbW9yeSB3ZWIgYXBpIHNlcnZpY2Ugb3IgZXh0cmFjdCBpbmZvcm1hdGlvbiBmcm9tIGl0LlxuICAgKiBDb21tYW5kcyBpZ25vcmUgdGhlIGxhdGVuY3kgZGVsYXkgYW5kIHJlc3BvbmQgQVNBUC5cbiAgICpcbiAgICogV2hlbiB0aGUgbGFzdCBzZWdtZW50IG9mIHRoZSBgYXBpQmFzZWAgcGF0aCBpcyBcImNvbW1hbmRzXCIsXG4gICAqIHRoZSBgY29sbGVjdGlvbk5hbWVgIGlzIHRoZSBjb21tYW5kLlxuICAgKlxuICAgKiBFeGFtcGxlIFVSTHM6XG4gICAqICAgY29tbWFuZHMvcmVzZXRkYiAoUE9TVCkgLy8gUmVzZXQgdGhlIFwiZGF0YWJhc2VcIiB0byBpdHMgb3JpZ2luYWwgc3RhdGVcbiAgICogICBjb21tYW5kcy9jb25maWcgKEdFVCkgICAvLyBSZXR1cm4gdGhpcyBzZXJ2aWNlJ3MgY29uZmlnIG9iamVjdFxuICAgKiAgIGNvbW1hbmRzL2NvbmZpZyAoUE9TVCkgIC8vIFVwZGF0ZSB0aGUgY29uZmlnIChlLmcuIHRoZSBkZWxheSlcbiAgICpcbiAgICogVXNhZ2U6XG4gICAqICAgaHR0cC5wb3N0KCdjb21tYW5kcy9yZXNldGRiJywgdW5kZWZpbmVkKTtcbiAgICogICBodHRwLmdldCgnY29tbWFuZHMvY29uZmlnJyk7XG4gICAqICAgaHR0cC5wb3N0KCdjb21tYW5kcy9jb25maWcnLCAne1wiZGVsYXlcIjoxMDAwfScpO1xuICAgKi9cbiAgcHJvdGVjdGVkIGNvbW1hbmRzKHJlcUluZm86IFJlcXVlc3RJbmZvKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBjb21tYW5kID0gcmVxSW5mby5jb2xsZWN0aW9uTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IG1ldGhvZCA9IHJlcUluZm8ubWV0aG9kO1xuXG4gICAgbGV0IHJlc09wdGlvbnM6IFJlc3BvbnNlT3B0aW9ucyA9IHtcbiAgICAgIHVybDogcmVxSW5mby51cmxcbiAgICB9O1xuXG4gICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICBjYXNlICdyZXNldGRiJzpcbiAgICAgICAgcmVzT3B0aW9ucy5zdGF0dXMgPSBTVEFUVVMuTk9fQ09OVEVOVDtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzZXREYihyZXFJbmZvKS5waXBlKFxuICAgICAgICAgIGNvbmNhdE1hcCgoKSA9PiB0aGlzLmNyZWF0ZVJlc3BvbnNlJCgoKSA9PiByZXNPcHRpb25zLCBmYWxzZSAvKiBubyBsYXRlbmN5IGRlbGF5ICovKSlcbiAgICAgICAgKTtcblxuICAgICAgY2FzZSAnY29uZmlnJzpcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ2dldCcpIHtcbiAgICAgICAgICByZXNPcHRpb25zLnN0YXR1cyA9IFNUQVRVUy5PSztcbiAgICAgICAgICByZXNPcHRpb25zLmJvZHkgPSB0aGlzLmNsb25lKHRoaXMuY29uZmlnKTtcblxuICAgICAgICAvLyBhbnkgb3RoZXIgSFRUUCBtZXRob2QgaXMgYXNzdW1lZCB0byBiZSBhIGNvbmZpZyB1cGRhdGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBib2R5ID0gdGhpcy5nZXRKc29uQm9keShyZXFJbmZvLnJlcSk7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZywgYm9keSk7XG4gICAgICAgICAgdGhpcy5wYXNzVGhydUJhY2tlbmQgPSB1bmRlZmluZWQ7IC8vIHJlLWNyZWF0ZSB3aGVuIG5lZWRlZFxuXG4gICAgICAgICAgcmVzT3B0aW9ucy5zdGF0dXMgPSBTVEFUVVMuTk9fQ09OVEVOVDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzT3B0aW9ucyA9IHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZU9wdGlvbnMoXG4gICAgICAgICAgcmVxSW5mby51cmwsXG4gICAgICAgICAgU1RBVFVTLklOVEVSTkFMX1NFUlZFUl9FUlJPUixcbiAgICAgICAgICBgVW5rbm93biBjb21tYW5kIFwiJHtjb21tYW5kfVwiYFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc3BvbnNlJCgoKSA9PiByZXNPcHRpb25zLCBmYWxzZSAvKiBubyBsYXRlbmN5IGRlbGF5ICovKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucyh1cmw6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZyk6IFJlc3BvbnNlT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJvZHk6IHsgZXJyb3I6IGAke21lc3NhZ2V9YCB9LFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBoZWFkZXJzOiB0aGlzLmNyZWF0ZUhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pLFxuICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBzdGFuZGFyZCBIVFRQIGhlYWRlcnMgb2JqZWN0IGZyb20gaGFzaCBtYXAgb2YgaGVhZGVyIHN0cmluZ3NcbiAgICogQHBhcmFtIGhlYWRlcnNcbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVIZWFkZXJzKGhlYWRlcnM6IHtbaW5kZXg6IHN0cmluZ106IHN0cmluZ30pOiBIZWFkZXJzQ29yZTtcblxuICAvKipcbiAgICogY3JlYXRlIHRoZSBmdW5jdGlvbiB0aGF0IHBhc3NlcyB1bmhhbmRsZWQgcmVxdWVzdHMgdGhyb3VnaCB0byB0aGUgXCJyZWFsXCIgYmFja2VuZC5cbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVQYXNzVGhydUJhY2tlbmQoKTogUGFzc1RocnVCYWNrZW5kO1xuXG4gIC8qKlxuICAgKiByZXR1cm4gYSBzZWFyY2ggbWFwIGZyb20gYSBsb2NhdGlvbiBxdWVyeS9zZWFyY2ggc3RyaW5nXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlUXVlcnlNYXAoc2VhcmNoOiBzdHJpbmcpOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGNvbGQgcmVzcG9uc2UgT2JzZXJ2YWJsZSBmcm9tIGEgZmFjdG9yeSBmb3IgUmVzcG9uc2VPcHRpb25zXG4gICAqIEBwYXJhbSByZXNPcHRpb25zRmFjdG9yeSAtIGNyZWF0ZXMgUmVzcG9uc2VPcHRpb25zIHdoZW4gb2JzZXJ2YWJsZSBpcyBzdWJzY3JpYmVkXG4gICAqIEBwYXJhbSB3aXRoRGVsYXkgLSBpZiB0cnVlIChkZWZhdWx0KSwgYWRkIHNpbXVsYXRlZCBsYXRlbmN5IGRlbGF5IGZyb20gY29uZmlndXJhdGlvblxuICAgKi9cbiAgcHJvdGVjdGVkIGNyZWF0ZVJlc3BvbnNlJChyZXNPcHRpb25zRmFjdG9yeTogKCkgPT4gUmVzcG9uc2VPcHRpb25zLCB3aXRoRGVsYXkgPSB0cnVlKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCByZXNPcHRpb25zJCA9IHRoaXMuY3JlYXRlUmVzcG9uc2VPcHRpb25zJChyZXNPcHRpb25zRmFjdG9yeSk7XG4gICAgbGV0IHJlc3AkID0gdGhpcy5jcmVhdGVSZXNwb25zZSRmcm9tUmVzcG9uc2VPcHRpb25zJChyZXNPcHRpb25zJCk7XG4gICAgcmV0dXJuIHdpdGhEZWxheSA/IHRoaXMuYWRkRGVsYXkocmVzcCQpIDogcmVzcCQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgUmVzcG9uc2Ugb2JzZXJ2YWJsZSBmcm9tIFJlc3BvbnNlT3B0aW9ucyBvYnNlcnZhYmxlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZVJlc3BvbnNlJGZyb21SZXNwb25zZU9wdGlvbnMkKHJlc09wdGlvbnMkOiBPYnNlcnZhYmxlPFJlc3BvbnNlT3B0aW9ucz4pOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGNvbGQgT2JzZXJ2YWJsZSBvZiBSZXNwb25zZU9wdGlvbnMuXG4gICAqIEBwYXJhbSByZXNPcHRpb25zRmFjdG9yeSAtIGNyZWF0ZXMgUmVzcG9uc2VPcHRpb25zIHdoZW4gb2JzZXJ2YWJsZSBpcyBzdWJzY3JpYmVkXG4gICAqL1xuICBwcm90ZWN0ZWQgY3JlYXRlUmVzcG9uc2VPcHRpb25zJChyZXNPcHRpb25zRmFjdG9yeTogKCkgPT4gUmVzcG9uc2VPcHRpb25zKTogT2JzZXJ2YWJsZTxSZXNwb25zZU9wdGlvbnM+IHtcblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxSZXNwb25zZU9wdGlvbnM+KChyZXNwb25zZU9ic2VydmVyOiBPYnNlcnZlcjxSZXNwb25zZU9wdGlvbnM+KSA9PiB7XG4gICAgICBsZXQgcmVzT3B0aW9uczogUmVzcG9uc2VPcHRpb25zO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzT3B0aW9ucyA9IHJlc09wdGlvbnNGYWN0b3J5KCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zdCBlcnIgPSBlcnJvci5tZXNzYWdlIHx8IGVycm9yO1xuICAgICAgICByZXNPcHRpb25zID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucygnJywgU1RBVFVTLklOVEVSTkFMX1NFUlZFUl9FUlJPUiwgYCR7ZXJyfWApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzdGF0dXMgPSByZXNPcHRpb25zLnN0YXR1cztcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc09wdGlvbnMuc3RhdHVzVGV4dCA9IGdldFN0YXR1c1RleHQoc3RhdHVzKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogaWdub3JlIGZhaWx1cmUgKi99XG4gICAgICBpZiAoaXNTdWNjZXNzKHN0YXR1cykpIHtcbiAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5uZXh0KHJlc09wdGlvbnMpO1xuICAgICAgICByZXNwb25zZU9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNwb25zZU9ic2VydmVyLmVycm9yKHJlc09wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuICgpID0+IHsgfTsgLy8gdW5zdWJzY3JpYmUgZnVuY3Rpb25cbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZWxldGUoeyBjb2xsZWN0aW9uLCBjb2xsZWN0aW9uTmFtZSwgaGVhZGVycywgaWQsIHVybH06IFJlcXVlc3RJbmZvKTogUmVzcG9uc2VPcHRpb25zIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dHJpcGxlLWVxdWFsc1xuICAgIGlmIChpZCA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2VPcHRpb25zKHVybCwgU1RBVFVTLk5PVF9GT1VORCwgYE1pc3NpbmcgXCIke2NvbGxlY3Rpb25OYW1lfVwiIGlkYCk7XG4gICAgfVxuICAgIGNvbnN0IGV4aXN0cyA9IHRoaXMucmVtb3ZlQnlJZChjb2xsZWN0aW9uLCBpZCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICBzdGF0dXM6IChleGlzdHMgfHwgIXRoaXMuY29uZmlnLmRlbGV0ZTQwNCkgPyBTVEFUVVMuTk9fQ09OVEVOVCA6IFNUQVRVUy5OT1RfRk9VTkRcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgZmlyc3QgaW5zdGFuY2Ugb2YgaXRlbSBpbiBjb2xsZWN0aW9uIGJ5IGBpdGVtLmlkYFxuICAgKiBAcGFyYW0gY29sbGVjdGlvblxuICAgKiBAcGFyYW0gaWRcbiAgICovXG4gIHByb3RlY3RlZCBmaW5kQnlJZDxUIGV4dGVuZHMgeyBpZDogYW55IH0+KGNvbGxlY3Rpb246IFRbXSwgaWQ6IGFueSk6IFQge1xuICAgIHJldHVybiBjb2xsZWN0aW9uLmZpbmQoKGl0ZW06IFQpID0+IGl0ZW0uaWQgPT09IGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSB0aGUgbmV4dCBhdmFpbGFibGUgaWQgZm9yIGl0ZW0gaW4gdGhpcyBjb2xsZWN0aW9uXG4gICAqIFVzZSBtZXRob2QgZnJvbSBgaW5NZW1EYlNlcnZpY2VgIGlmIGl0IGV4aXN0cyBhbmQgcmV0dXJucyBhIHZhbHVlLFxuICAgKiBlbHNlIGRlbGVnYXRlcyB0byBgZ2VuSWREZWZhdWx0YC5cbiAgICogQHBhcmFtIGNvbGxlY3Rpb24gLSBjb2xsZWN0aW9uIG9mIGl0ZW1zIHdpdGggYGlkYCBrZXkgcHJvcGVydHlcbiAgICovXG4gIHByb3RlY3RlZCBnZW5JZDxUIGV4dGVuZHMgeyBpZDogYW55IH0+KGNvbGxlY3Rpb246IFRbXSwgY29sbGVjdGlvbk5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgZ2VuSWQgPSB0aGlzLmJpbmQoJ2dlbklkJyk7XG4gICAgaWYgKGdlbklkKSB7XG4gICAgICBjb25zdCBpZCA9IGdlbklkKGNvbGxlY3Rpb24sIGNvbGxlY3Rpb25OYW1lKTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp0cmlwbGUtZXF1YWxzXG4gICAgICBpZiAoaWQgIT0gdW5kZWZpbmVkKSB7IHJldHVybiBpZDsgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZW5JZERlZmF1bHQoY29sbGVjdGlvbiwgY29sbGVjdGlvbk5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgZ2VuZXJhdG9yIG9mIHRoZSBuZXh0IGF2YWlsYWJsZSBpZCBmb3IgaXRlbSBpbiB0aGlzIGNvbGxlY3Rpb25cbiAgICogVGhpcyBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHdvcmtzIG9ubHkgZm9yIG51bWVyaWMgaWRzLlxuICAgKiBAcGFyYW0gY29sbGVjdGlvbiAtIGNvbGxlY3Rpb24gb2YgaXRlbXMgd2l0aCBgaWRgIGtleSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0gY29sbGVjdGlvbk5hbWUgLSBuYW1lIG9mIHRoZSBjb2xsZWN0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2VuSWREZWZhdWx0PFQgZXh0ZW5kcyB7IGlkOiBhbnkgfT4oY29sbGVjdGlvbjogVFtdLCBjb2xsZWN0aW9uTmFtZTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoIXRoaXMuaXNDb2xsZWN0aW9uSWROdW1lcmljKGNvbGxlY3Rpb24sIGNvbGxlY3Rpb25OYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgQ29sbGVjdGlvbiAnJHtjb2xsZWN0aW9uTmFtZX0nIGlkIHR5cGUgaXMgbm9uLW51bWVyaWMgb3IgdW5rbm93bi4gQ2FuIG9ubHkgZ2VuZXJhdGUgbnVtZXJpYyBpZHMuYCk7XG4gICAgfVxuXG4gICAgbGV0IG1heElkID0gMDtcbiAgICBjb2xsZWN0aW9uLnJlZHVjZSgocHJldjogYW55LCBpdGVtOiBhbnkpID0+IHtcbiAgICAgIG1heElkID0gTWF0aC5tYXgobWF4SWQsIHR5cGVvZiBpdGVtLmlkID09PSAnbnVtYmVyJyA/IGl0ZW0uaWQgOiBtYXhJZCk7XG4gICAgfSwgdW5kZWZpbmVkKTtcbiAgICByZXR1cm4gbWF4SWQgKyAxO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCh7IGNvbGxlY3Rpb24sIGNvbGxlY3Rpb25OYW1lLCBoZWFkZXJzLCBpZCwgcXVlcnksIHVybCB9OiBSZXF1ZXN0SW5mbyk6IFJlc3BvbnNlT3B0aW9ucyB7XG4gICAgbGV0IGRhdGEgPSBjb2xsZWN0aW9uO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnRyaXBsZS1lcXVhbHNcbiAgICBpZiAoaWQgIT0gdW5kZWZpbmVkICYmIGlkICE9PSAnJykge1xuICAgICAgZGF0YSA9IHRoaXMuZmluZEJ5SWQoY29sbGVjdGlvbiwgaWQpO1xuICAgIH0gZWxzZSBpZiAocXVlcnkpIHtcbiAgICAgIGRhdGEgPSB0aGlzLmFwcGx5UXVlcnkoY29sbGVjdGlvbiwgcXVlcnkpO1xuICAgIH1cblxuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZU9wdGlvbnModXJsLCBTVEFUVVMuTk9UX0ZPVU5ELCBgJyR7Y29sbGVjdGlvbk5hbWV9JyB3aXRoIGlkPScke2lkfScgbm90IGZvdW5kYCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBib2R5OiB0aGlzLmJvZGlmeSh0aGlzLmNsb25lKGRhdGEpKSxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICBzdGF0dXM6IFNUQVRVUy5PS1xuICAgIH07XG4gIH1cblxuICAvKiogR2V0IEpTT04gYm9keSBmcm9tIHRoZSByZXF1ZXN0IG9iamVjdCAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0SnNvbkJvZHkocmVxOiBhbnkpOiBhbnk7XG5cbiAgLyoqXG4gICAqIEdldCBsb2NhdGlvbiBpbmZvIGZyb20gYSB1cmwsIGV2ZW4gb24gc2VydmVyIHdoZXJlIGBkb2N1bWVudGAgaXMgbm90IGRlZmluZWRcbiAgICovXG4gIHByb3RlY3RlZCBnZXRMb2NhdGlvbih1cmw6IHN0cmluZyk6IFVyaUluZm8ge1xuICAgIGlmICghdXJsLnN0YXJ0c1dpdGgoJ2h0dHAnKSkge1xuICAgICAgLy8gZ2V0IHRoZSBkb2N1bWVudCBpZmYgcnVubmluZyBpbiBicm93c2VyXG4gICAgICBjb25zdCBkb2M6IERvY3VtZW50ID0gKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpID8gdW5kZWZpbmVkIDogZG9jdW1lbnQ7XG4gICAgICAvLyBhZGQgaG9zdCBpbmZvIHRvIHVybCBiZWZvcmUgcGFyc2luZy4gIFVzZSBhIGZha2UgaG9zdCB3aGVuIG5vdCBpbiBicm93c2VyLlxuICAgICAgY29uc3QgYmFzZSA9IGRvYyA/IGRvYy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyBkb2MubG9jYXRpb24uaG9zdCA6ICdodHRwOi8vZmFrZSc7XG4gICAgICB1cmwgPSB1cmwuc3RhcnRzV2l0aCgnLycpID8gYmFzZSArIHVybCA6IGJhc2UgKyAnLycgKyB1cmw7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZVVyaSh1cmwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBnZXQgb3IgY3JlYXRlIHRoZSBmdW5jdGlvbiB0aGF0IHBhc3NlcyB1bmhhbmRsZWQgcmVxdWVzdHNcbiAgICogdGhyb3VnaCB0byB0aGUgXCJyZWFsXCIgYmFja2VuZC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRQYXNzVGhydUJhY2tlbmQoKTogUGFzc1RocnVCYWNrZW5kIHtcbiAgICByZXR1cm4gdGhpcy5wYXNzVGhydUJhY2tlbmQgP1xuICAgICAgdGhpcy5wYXNzVGhydUJhY2tlbmQgOlxuICAgICAgdGhpcy5wYXNzVGhydUJhY2tlbmQgPSB0aGlzLmNyZWF0ZVBhc3NUaHJ1QmFja2VuZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB1dGlsaXR5IG1ldGhvZHMgZnJvbSB0aGlzIHNlcnZpY2UgaW5zdGFuY2UuXG4gICAqIFVzZWZ1bCB3aXRoaW4gYW4gSFRUUCBtZXRob2Qgb3ZlcnJpZGVcbiAgICovXG4gIHByb3RlY3RlZCBnZXRSZXF1ZXN0SW5mb1V0aWxzKCk6IFJlcXVlc3RJbmZvVXRpbGl0aWVzIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3JlYXRlUmVzcG9uc2UkOiB0aGlzLmNyZWF0ZVJlc3BvbnNlJC5iaW5kKHRoaXMpLFxuICAgICAgZmluZEJ5SWQ6IHRoaXMuZmluZEJ5SWQuYmluZCh0aGlzKSxcbiAgICAgIGlzQ29sbGVjdGlvbklkTnVtZXJpYzogdGhpcy5pc0NvbGxlY3Rpb25JZE51bWVyaWMuYmluZCh0aGlzKSxcbiAgICAgIGdldENvbmZpZzogKCkgPT4gdGhpcy5jb25maWcsXG4gICAgICBnZXREYjogKCkgPT4gdGhpcy5kYixcbiAgICAgIGdldEpzb25Cb2R5OiB0aGlzLmdldEpzb25Cb2R5LmJpbmQodGhpcyksXG4gICAgICBnZXRMb2NhdGlvbjogdGhpcy5nZXRMb2NhdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgZ2V0UGFzc1RocnVCYWNrZW5kOiB0aGlzLmdldFBhc3NUaHJ1QmFja2VuZC5iaW5kKHRoaXMpLFxuICAgICAgcGFyc2VSZXF1ZXN0VXJsOiB0aGlzLnBhcnNlUmVxdWVzdFVybC5iaW5kKHRoaXMpLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIGNhbm9uaWNhbCBIVFRQIG1ldGhvZCBuYW1lIChsb3dlcmNhc2UpIGZyb20gdGhlIHJlcXVlc3Qgb2JqZWN0XG4gICAqIGUuZy4gKHJlcS5tZXRob2QgfHwgJ2dldCcpLnRvTG93ZXJDYXNlKCk7XG4gICAqIEBwYXJhbSByZXEgLSByZXF1ZXN0IG9iamVjdCBmcm9tIHRoZSBodHRwIGNhbGxcbiAgICpcbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBnZXRSZXF1ZXN0TWV0aG9kKHJlcTogYW55KTogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBpbmRleE9mKGNvbGxlY3Rpb246IGFueVtdLCBpZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uZmluZEluZGV4KChpdGVtOiBhbnkpID0+IGl0ZW0uaWQgPT09IGlkKTtcbiAgfVxuXG4gIC8qKiBQYXJzZSB0aGUgaWQgYXMgYSBudW1iZXIuIFJldHVybiBvcmlnaW5hbCB2YWx1ZSBpZiBub3QgYSBudW1iZXIuICovXG4gIHByb3RlY3RlZCBwYXJzZUlkKGNvbGxlY3Rpb246IGFueVtdLCBjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBpZDogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoIXRoaXMuaXNDb2xsZWN0aW9uSWROdW1lcmljKGNvbGxlY3Rpb24sIGNvbGxlY3Rpb25OYW1lKSkge1xuICAgICAgLy8gQ2FuJ3QgY29uZmlybSB0aGF0IGBpZGAgaXMgYSBudW1lcmljIHR5cGU7IGRvbid0IHBhcnNlIGFzIGEgbnVtYmVyXG4gICAgICAvLyBvciBlbHNlIGAnNDInYCAtPiBgNDJgIGFuZCBfZ2V0IGJ5IGlkXyBmYWlscy5cbiAgICAgIHJldHVybiBpZDtcbiAgICB9XG4gICAgY29uc3QgaWROdW0gPSBwYXJzZUZsb2F0KGlkKTtcbiAgICByZXR1cm4gaXNOYU4oaWROdW0pID8gaWQgOiBpZE51bTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm4gdHJ1ZSBpZiBjYW4gZGV0ZXJtaW5lIHRoYXQgdGhlIGNvbGxlY3Rpb24ncyBgaXRlbS5pZGAgaXMgYSBudW1iZXJcbiAgICogVGhpcyBpbXBsZW1lbnRhdGlvbiBjYW4ndCB0ZWxsIGlmIHRoZSBjb2xsZWN0aW9uIGlzIGVtcHR5IHNvIGl0IGFzc3VtZXMgTk9cbiAgICogKi9cbiAgcHJvdGVjdGVkIGlzQ29sbGVjdGlvbklkTnVtZXJpYzxUIGV4dGVuZHMgeyBpZDogYW55IH0+KGNvbGxlY3Rpb246IFRbXSwgY29sbGVjdGlvbk5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIC8vIGNvbGxlY3Rpb25OYW1lIG5vdCB1c2VkIG5vdyBidXQgb3ZlcnJpZGUgbWlnaHQgbWFpbnRhaW4gY29sbGVjdGlvbiB0eXBlIGluZm9ybWF0aW9uXG4gICAgLy8gc28gdGhhdCBpdCBjb3VsZCBrbm93IHRoZSB0eXBlIG9mIHRoZSBgaWRgIGV2ZW4gd2hlbiB0aGUgY29sbGVjdGlvbiBpcyBlbXB0eS5cbiAgICByZXR1cm4gISEoY29sbGVjdGlvbiAmJiBjb2xsZWN0aW9uWzBdKSAmJiB0eXBlb2YgY29sbGVjdGlvblswXS5pZCA9PT0gJ251bWJlcic7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHRoZSByZXF1ZXN0IFVSTCBpbnRvIGEgYFBhcnNlZFJlcXVlc3RVcmxgIG9iamVjdC5cbiAgICogUGFyc2luZyBkZXBlbmRzIHVwb24gY2VydGFpbiB2YWx1ZXMgb2YgYGNvbmZpZ2A6IGBhcGlCYXNlYCwgYGhvc3RgLCBhbmQgYHVybFJvb3RgLlxuICAgKlxuICAgKiBDb25maWd1cmluZyB0aGUgYGFwaUJhc2VgIHlpZWxkcyB0aGUgbW9zdCBpbnRlcmVzdGluZyBjaGFuZ2VzIHRvIGBwYXJzZVJlcXVlc3RVcmxgIGJlaGF2aW9yOlxuICAgKiAgIFdoZW4gYXBpQmFzZT11bmRlZmluZWQgYW5kIHVybD0naHR0cDovL2xvY2FsaG9zdC9hcGkvY29sbGVjdGlvbi80MidcbiAgICogICAgIHtiYXNlOiAnYXBpLycsIGNvbGxlY3Rpb25OYW1lOiAnY29sbGVjdGlvbicsIGlkOiAnNDInLCAuLi59XG4gICAqICAgV2hlbiBhcGlCYXNlPSdzb21lL2FwaS9yb290LycgYW5kIHVybD0naHR0cDovL2xvY2FsaG9zdC9zb21lL2FwaS9yb290L2NvbGxlY3Rpb24nXG4gICAqICAgICB7YmFzZTogJ3NvbWUvYXBpL3Jvb3QvJywgY29sbGVjdGlvbk5hbWU6ICdjb2xsZWN0aW9uJywgaWQ6IHVuZGVmaW5lZCwgLi4ufVxuICAgKiAgIFdoZW4gYXBpQmFzZT0nLycgYW5kIHVybD0naHR0cDovL2xvY2FsaG9zdC9jb2xsZWN0aW9uJ1xuICAgKiAgICAge2Jhc2U6ICcvJywgY29sbGVjdGlvbk5hbWU6ICdjb2xsZWN0aW9uJywgaWQ6IHVuZGVmaW5lZCwgLi4ufVxuICAgKlxuICAgKiBUaGUgYWN0dWFsIGFwaSBiYXNlIHNlZ21lbnQgdmFsdWVzIGFyZSBpZ25vcmVkLiBPbmx5IHRoZSBudW1iZXIgb2Ygc2VnbWVudHMgbWF0dGVycy5cbiAgICogVGhlIGZvbGxvd2luZyBhcGkgYmFzZSBzdHJpbmdzIGFyZSBjb25zaWRlcmVkIGlkZW50aWNhbDogJ2EvYicgfiAnc29tZS9hcGkvJyB+IGB0d28vc2VnbWVudHMnXG4gICAqXG4gICAqIFRvIHJlcGxhY2UgdGhpcyBkZWZhdWx0IG1ldGhvZCwgYXNzaWduIHlvdXIgYWx0ZXJuYXRpdmUgdG8geW91ciBJbk1lbURiU2VydmljZVsncGFyc2VSZXF1ZXN0VXJsJ11cbiAgICovXG4gIHByb3RlY3RlZCBwYXJzZVJlcXVlc3RVcmwodXJsOiBzdHJpbmcpOiBQYXJzZWRSZXF1ZXN0VXJsIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbG9jID0gdGhpcy5nZXRMb2NhdGlvbih1cmwpO1xuICAgICAgbGV0IGRyb3AgPSB0aGlzLmNvbmZpZy5yb290UGF0aC5sZW5ndGg7XG4gICAgICBsZXQgdXJsUm9vdCA9ICcnO1xuICAgICAgaWYgKGxvYy5ob3N0ICE9PSB0aGlzLmNvbmZpZy5ob3N0KSB7XG4gICAgICAgIC8vIHVybCBmb3IgYSBzZXJ2ZXIgb24gYSBkaWZmZXJlbnQgaG9zdCFcbiAgICAgICAgLy8gYXNzdW1lIGl0J3MgY29sbGVjdGlvbiBpcyBhY3R1YWxseSBoZXJlIHRvby5cbiAgICAgICAgZHJvcCA9IDE7IC8vIHRoZSBsZWFkaW5nIHNsYXNoXG4gICAgICAgIHVybFJvb3QgPSBsb2MucHJvdG9jb2wgKyAnLy8nICsgbG9jLmhvc3QgKyAnLyc7XG4gICAgICB9XG4gICAgICBjb25zdCBwYXRoID0gbG9jLnBhdGguc3Vic3RyaW5nKGRyb3ApO1xuICAgICAgY29uc3QgcGF0aFNlZ21lbnRzID0gcGF0aC5zcGxpdCgnLycpO1xuICAgICAgbGV0IHNlZ21lbnRJeCA9IDA7XG5cbiAgICAgIC8vIGFwaUJhc2U6IHRoZSBmcm9udCBwYXJ0IG9mIHRoZSBwYXRoIGRldm90ZWQgdG8gZ2V0dGluZyB0byB0aGUgYXBpIHJvdXRlXG4gICAgICAvLyBBc3N1bWVzIGZpcnN0IHBhdGggc2VnbWVudCBpZiBubyBjb25maWcuYXBpQmFzZVxuICAgICAgLy8gZWxzZSBpZ25vcmVzIGFzIG1hbnkgcGF0aCBzZWdtZW50cyBhcyBhcmUgaW4gY29uZmlnLmFwaUJhc2VcbiAgICAgIC8vIERvZXMgTk9UIGNhcmUgd2hhdCB0aGUgYXBpIGJhc2UgY2hhcnMgYWN0dWFsbHkgYXJlLlxuICAgICAgbGV0IGFwaUJhc2U6IHN0cmluZztcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp0cmlwbGUtZXF1YWxzXG4gICAgICBpZiAodGhpcy5jb25maWcuYXBpQmFzZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXBpQmFzZSA9IHBhdGhTZWdtZW50c1tzZWdtZW50SXgrK107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcGlCYXNlID0gcmVtb3ZlVHJhaWxpbmdTbGFzaCh0aGlzLmNvbmZpZy5hcGlCYXNlLnRyaW0oKSk7XG4gICAgICAgIGlmIChhcGlCYXNlKSB7XG4gICAgICAgICAgc2VnbWVudEl4ID0gYXBpQmFzZS5zcGxpdCgnLycpLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWdtZW50SXggPSAwOyAvLyBubyBhcGkgYmFzZSBhdCBhbGw7IHVud2lzZSBidXQgYWxsb3dlZC5cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXBpQmFzZSArPSAnLyc7XG5cbiAgICAgIGxldCBjb2xsZWN0aW9uTmFtZSA9IHBhdGhTZWdtZW50c1tzZWdtZW50SXgrK107XG4gICAgICAvLyBpZ25vcmUgYW55dGhpbmcgYWZ0ZXIgYSAnLicgKGUuZy4sdGhlIFwianNvblwiIGluIFwiY3VzdG9tZXJzLmpzb25cIilcbiAgICAgIGNvbGxlY3Rpb25OYW1lID0gY29sbGVjdGlvbk5hbWUgJiYgY29sbGVjdGlvbk5hbWUuc3BsaXQoJy4nKVswXTtcblxuICAgICAgY29uc3QgaWQgPSBwYXRoU2VnbWVudHNbc2VnbWVudEl4KytdO1xuICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLmNyZWF0ZVF1ZXJ5TWFwKGxvYy5xdWVyeSk7XG4gICAgICBjb25zdCByZXNvdXJjZVVybCA9IHVybFJvb3QgKyBhcGlCYXNlICsgY29sbGVjdGlvbk5hbWUgKyAnLyc7XG4gICAgICByZXR1cm4geyBhcGlCYXNlLCBjb2xsZWN0aW9uTmFtZSwgaWQsIHF1ZXJ5LCByZXNvdXJjZVVybCB9O1xuXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBtc2cgPSBgdW5hYmxlIHRvIHBhcnNlIHVybCAnJHt1cmx9Jzsgb3JpZ2luYWwgZXJyb3I6ICR7ZXJyLm1lc3NhZ2V9YDtcbiAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbiAgfVxuXG4gIC8vIENyZWF0ZSBlbnRpdHlcbiAgLy8gQ2FuIHVwZGF0ZSBhbiBleGlzdGluZyBlbnRpdHkgdG9vIGlmIHBvc3Q0MDkgaXMgZmFsc2UuXG4gIHByb3RlY3RlZCBwb3N0KHsgY29sbGVjdGlvbiwgY29sbGVjdGlvbk5hbWUsIGhlYWRlcnMsIGlkLCByZXEsIHJlc291cmNlVXJsLCB1cmwgfTogUmVxdWVzdEluZm8pOiBSZXNwb25zZU9wdGlvbnMge1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmNsb25lKHRoaXMuZ2V0SnNvbkJvZHkocmVxKSk7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dHJpcGxlLWVxdWFsc1xuICAgIGlmIChpdGVtLmlkID09IHVuZGVmaW5lZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaXRlbS5pZCA9IGlkIHx8IHRoaXMuZ2VuSWQoY29sbGVjdGlvbiwgY29sbGVjdGlvbk5hbWUpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnN0IGVtc2c6IHN0cmluZyA9IGVyci5tZXNzYWdlIHx8ICcnO1xuICAgICAgICBpZiAoL2lkIHR5cGUgaXMgbm9uLW51bWVyaWMvLnRlc3QoZW1zZykpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucyh1cmwsIFNUQVRVUy5VTlBST0NFU1NBQkxFX0VOVFJZLCBlbXNnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZU9wdGlvbnModXJsLCBTVEFUVVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLFxuICAgICAgICAgICAgYEZhaWxlZCB0byBnZW5lcmF0ZSBuZXcgaWQgZm9yICcke2NvbGxlY3Rpb25OYW1lfSdgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpZCAmJiBpZCAhPT0gaXRlbS5pZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZU9wdGlvbnModXJsLCBTVEFUVVMuQkFEX1JFUVVFU1QsIGBSZXF1ZXN0IGlkIGRvZXMgbm90IG1hdGNoIGl0ZW0uaWRgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWQgPSBpdGVtLmlkO1xuICAgIH1cbiAgICBjb25zdCBleGlzdGluZ0l4ID0gdGhpcy5pbmRleE9mKGNvbGxlY3Rpb24sIGlkKTtcbiAgICBjb25zdCBib2R5ID0gdGhpcy5ib2RpZnkoaXRlbSk7XG5cbiAgICBpZiAoZXhpc3RpbmdJeCA9PT0gLTEpIHtcbiAgICAgIGNvbGxlY3Rpb24ucHVzaChpdGVtKTtcbiAgICAgIGhlYWRlcnMuc2V0KCdMb2NhdGlvbicsIHJlc291cmNlVXJsICsgJy8nICsgaWQpO1xuICAgICAgcmV0dXJuIHsgaGVhZGVycywgYm9keSwgc3RhdHVzOiBTVEFUVVMuQ1JFQVRFRCB9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcucG9zdDQwOSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZU9wdGlvbnModXJsLCBTVEFUVVMuQ09ORkxJQ1QsXG4gICAgICAgIGAnJHtjb2xsZWN0aW9uTmFtZX0nIGl0ZW0gd2l0aCBpZD0nJHtpZH0gZXhpc3RzIGFuZCBtYXkgbm90IGJlIHVwZGF0ZWQgd2l0aCBQT1NUOyB1c2UgUFVUIGluc3RlYWQuYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbGxlY3Rpb25bZXhpc3RpbmdJeF0gPSBpdGVtO1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnBvc3QyMDQgP1xuICAgICAgICAgIHsgaGVhZGVycywgc3RhdHVzOiBTVEFUVVMuTk9fQ09OVEVOVCB9IDogLy8gc3VjY2Vzc2Z1bDsgbm8gY29udGVudFxuICAgICAgICAgIHsgaGVhZGVycywgYm9keSwgc3RhdHVzOiBTVEFUVVMuT0sgfTsgLy8gc3VjY2Vzc2Z1bDsgcmV0dXJuIGVudGl0eVxuICAgIH1cbiAgfVxuXG4gIC8vIFVwZGF0ZSBleGlzdGluZyBlbnRpdHlcbiAgLy8gQ2FuIGNyZWF0ZSBhbiBlbnRpdHkgdG9vIGlmIHB1dDQwNCBpcyBmYWxzZS5cbiAgcHJvdGVjdGVkIHB1dCh7IGNvbGxlY3Rpb24sIGNvbGxlY3Rpb25OYW1lLCBoZWFkZXJzLCBpZCwgcmVxLCB1cmwgfTogUmVxdWVzdEluZm8pOiBSZXNwb25zZU9wdGlvbnMge1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmNsb25lKHRoaXMuZ2V0SnNvbkJvZHkocmVxKSk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnRyaXBsZS1lcXVhbHNcbiAgICBpZiAoaXRlbS5pZCA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2VPcHRpb25zKHVybCwgU1RBVFVTLk5PVF9GT1VORCwgYE1pc3NpbmcgJyR7Y29sbGVjdGlvbk5hbWV9JyBpZGApO1xuICAgIH1cbiAgICBpZiAoaWQgJiYgaWQgIT09IGl0ZW0uaWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2VPcHRpb25zKHVybCwgU1RBVFVTLkJBRF9SRVFVRVNULFxuICAgICAgICBgUmVxdWVzdCBmb3IgJyR7Y29sbGVjdGlvbk5hbWV9JyBpZCBkb2VzIG5vdCBtYXRjaCBpdGVtLmlkYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkID0gaXRlbS5pZDtcbiAgICB9XG4gICAgY29uc3QgZXhpc3RpbmdJeCA9IHRoaXMuaW5kZXhPZihjb2xsZWN0aW9uLCBpZCk7XG4gICAgY29uc3QgYm9keSA9IHRoaXMuYm9kaWZ5KGl0ZW0pO1xuXG4gICAgaWYgKGV4aXN0aW5nSXggPiAtMSkge1xuICAgICAgY29sbGVjdGlvbltleGlzdGluZ0l4XSA9IGl0ZW07XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcucHV0MjA0ID9cbiAgICAgICAgICB7IGhlYWRlcnMsIHN0YXR1czogU1RBVFVTLk5PX0NPTlRFTlQgfSA6IC8vIHN1Y2Nlc3NmdWw7IG5vIGNvbnRlbnRcbiAgICAgICAgICB7IGhlYWRlcnMsIGJvZHksIHN0YXR1czogU1RBVFVTLk9LIH07IC8vIHN1Y2Nlc3NmdWw7IHJldHVybiBlbnRpdHlcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLnB1dDQwNCkge1xuICAgICAgLy8gaXRlbSB0byB1cGRhdGUgbm90IGZvdW5kOyB1c2UgUE9TVCB0byBjcmVhdGUgbmV3IGl0ZW0gZm9yIHRoaXMgaWQuXG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucyh1cmwsIFNUQVRVUy5OT1RfRk9VTkQsXG4gICAgICAgIGAnJHtjb2xsZWN0aW9uTmFtZX0nIGl0ZW0gd2l0aCBpZD0nJHtpZH0gbm90IGZvdW5kIGFuZCBtYXkgbm90IGJlIGNyZWF0ZWQgd2l0aCBQVVQ7IHVzZSBQT1NUIGluc3RlYWQuYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNyZWF0ZSBuZXcgaXRlbSBmb3IgaWQgbm90IGZvdW5kXG4gICAgICBjb2xsZWN0aW9uLnB1c2goaXRlbSk7XG4gICAgICByZXR1cm4geyBoZWFkZXJzLCBib2R5LCBzdGF0dXM6IFNUQVRVUy5DUkVBVEVEIH07XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHJlbW92ZUJ5SWQoY29sbGVjdGlvbjogYW55W10sIGlkOiBudW1iZXIpIHtcbiAgICBjb25zdCBpeCA9IHRoaXMuaW5kZXhPZihjb2xsZWN0aW9uLCBpZCk7XG4gICAgaWYgKGl4ID4gLTEpIHtcbiAgICAgIGNvbGxlY3Rpb24uc3BsaWNlKGl4LCAxKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogVGVsbCB5b3VyIGluLW1lbSBcImRhdGFiYXNlXCIgdG8gcmVzZXQuXG4gICAqIHJldHVybnMgT2JzZXJ2YWJsZSBvZiB0aGUgZGF0YWJhc2UgYmVjYXVzZSByZXNldHRpbmcgaXQgY291bGQgYmUgYXN5bmNcbiAgICovXG4gIHByb3RlY3RlZCByZXNldERiKHJlcUluZm8/OiBSZXF1ZXN0SW5mbyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHRoaXMuZGJSZWFkeVN1YmplY3QubmV4dChmYWxzZSk7XG4gICAgY29uc3QgZGIgPSB0aGlzLmluTWVtRGJTZXJ2aWNlLmNyZWF0ZURiKHJlcUluZm8pO1xuICAgIGNvbnN0IGRiJCA9IGRiIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSA/IGRiIDpcbiAgICAgICAgICAgdHlwZW9mIChkYiBhcyBhbnkpLnRoZW4gPT09ICdmdW5jdGlvbicgPyBmcm9tKGRiIGFzIFByb21pc2U8YW55PikgOlxuICAgICAgICAgICBvZihkYik7XG4gICAgZGIkLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKChkOiB7fSkgPT4ge1xuICAgICAgdGhpcy5kYiA9IGQ7XG4gICAgICB0aGlzLmRiUmVhZHlTdWJqZWN0Lm5leHQodHJ1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuZGJSZWFkeTtcbiAgfVxuXG59XG4iXX0=