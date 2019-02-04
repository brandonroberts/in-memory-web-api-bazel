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
 */
var BackendService = /** @class */ (function () {
    function BackendService(inMemDbService, config) {
        if (config === void 0) { config = {}; }
        this.inMemDbService = inMemDbService;
        this.config = new InMemoryBackendConfig();
        this.requestInfoUtils = this.getRequestInfoUtils();
        var loc = this.getLocation('/');
        this.config.host = loc.host; // default to app web server host
        this.config.rootPath = loc.path; // default to path when app is served (e.g.'/')
        Object.assign(this.config, config);
    }
    Object.defineProperty(BackendService.prototype, "dbReady", {
        ////  protected /////
        get: function () {
            if (!this.dbReadySubject) {
                // first time the service is called.
                this.dbReadySubject = new BehaviorSubject(false);
                this.resetDb();
            }
            return this.dbReadySubject.asObservable().pipe(first(function (r) { return r; }));
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
    BackendService.prototype.handleRequest = function (req) {
        var _this = this;
        //  handle the request when there is an in-memory database
        return this.dbReady.pipe(concatMap(function () { return _this.handleRequest_(req); }));
    };
    BackendService.prototype.handleRequest_ = function (req) {
        var _this = this;
        var url = req.urlWithParams ? req.urlWithParams : req.url;
        // Try override parser
        // If no override parser or it returns nothing, use default parser
        var parser = this.bind('parseRequestUrl');
        var parsed = (parser && parser(url, this.requestInfoUtils)) ||
            this.parseRequestUrl(url);
        var collectionName = parsed.collectionName;
        var collection = this.db[collectionName];
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
        var resOptions;
        if (/commands\/?$/i.test(reqInfo.apiBase)) {
            return this.commands(reqInfo);
        }
        var methodInterceptor = this.bind(reqInfo.method);
        if (methodInterceptor) {
            // InMemoryDbService intercepts this HTTP method.
            // if interceptor produced a response, return it.
            // else InMemoryDbService chose not to intercept; continue processing.
            var interceptorResponse = methodInterceptor(reqInfo);
            if (interceptorResponse) {
                return interceptorResponse;
            }
            ;
        }
        if (this.db[collectionName]) {
            // request is for a known collection of the InMemoryDbService
            return this.createResponse$(function () { return _this.collectionHandler(reqInfo); });
        }
        if (this.config.passThruUnknownUrl) {
            // unknown collection; pass request thru to a "real" backend.
            return this.getPassThruBackend().handle(req);
        }
        // 404 - can't handle this request
        resOptions = this.createErrorResponseOptions(url, STATUS.NOT_FOUND, "Collection '" + collectionName + "' not found");
        return this.createResponse$(function () { return resOptions; });
    };
    /**
     * Add configured delay to response observable unless delay === 0
     */
    BackendService.prototype.addDelay = function (response) {
        var d = this.config.delay;
        return d === 0 ? response : delayResponse(response, d || 500);
    };
    /**
     * Apply query/search parameters as a filter over the collection
     * This impl only supports RegExp queries on string properties of the collection
     * ANDs the conditions together
     */
    BackendService.prototype.applyQuery = function (collection, query) {
        // extract filtering conditions - {propertyName, RegExps) - from query/search parameters
        var conditions = [];
        var caseSensitive = this.config.caseSensitiveSearch ? undefined : 'i';
        query.forEach(function (value, name) {
            value.forEach(function (v) { return conditions.push({ name: name, rx: new RegExp(decodeURI(v), caseSensitive) }); });
        });
        var len = conditions.length;
        if (!len) {
            return collection;
        }
        // AND the RegExp conditions
        return collection.filter(function (row) {
            var ok = true;
            var i = len;
            while (ok && i) {
                i -= 1;
                var cond = conditions[i];
                ok = cond.rx.test(row[cond.name]);
            }
            return ok;
        });
    };
    /**
     * Get a method from the `InMemoryDbService` (if it exists), bound to that service
     */
    BackendService.prototype.bind = function (methodName) {
        var fn = this.inMemDbService[methodName];
        return fn ? fn.bind(this.inMemDbService) : undefined;
    };
    BackendService.prototype.bodify = function (data) {
        return this.config.dataEncapsulation ? { data: data } : data;
    };
    BackendService.prototype.clone = function (data) {
        return JSON.parse(JSON.stringify(data));
    };
    BackendService.prototype.collectionHandler = function (reqInfo) {
        // const req = reqInfo.req;
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
    BackendService.prototype.commands = function (reqInfo) {
        var _this = this;
        var command = reqInfo.collectionName.toLowerCase();
        var method = reqInfo.method;
        var resOptions = {
            url: reqInfo.url
        };
        switch (command) {
            case 'resetdb':
                resOptions.status = STATUS.NO_CONTENT;
                return this.resetDb(reqInfo).pipe(concatMap(function () { return _this.createResponse$(function () { return resOptions; }, false /* no latency delay */); }));
            case 'config':
                if (method === 'get') {
                    resOptions.status = STATUS.OK;
                    resOptions.body = this.clone(this.config);
                    // any other HTTP method is assumed to be a config update
                }
                else {
                    var body = this.getJsonBody(reqInfo.req);
                    Object.assign(this.config, body);
                    this.passThruBackend = undefined; // re-create when needed
                    resOptions.status = STATUS.NO_CONTENT;
                }
                break;
            default:
                resOptions = this.createErrorResponseOptions(reqInfo.url, STATUS.INTERNAL_SERVER_ERROR, "Unknown command \"" + command + "\"");
        }
        return this.createResponse$(function () { return resOptions; }, false /* no latency delay */);
    };
    BackendService.prototype.createErrorResponseOptions = function (url, status, message) {
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
    BackendService.prototype.createResponse$ = function (resOptionsFactory, withDelay) {
        if (withDelay === void 0) { withDelay = true; }
        var resOptions$ = this.createResponseOptions$(resOptionsFactory);
        var resp$ = this.createResponse$fromResponseOptions$(resOptions$);
        return withDelay ? this.addDelay(resp$) : resp$;
    };
    /**
     * Create a cold Observable of ResponseOptions.
     * @param resOptionsFactory - creates ResponseOptions when observable is subscribed
     */
    BackendService.prototype.createResponseOptions$ = function (resOptionsFactory) {
        var _this = this;
        return new Observable(function (responseObserver) {
            var resOptions;
            try {
                resOptions = resOptionsFactory();
            }
            catch (error) {
                var err = error.message || error;
                resOptions = _this.createErrorResponseOptions('', STATUS.INTERNAL_SERVER_ERROR, "" + err);
            }
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
            return function () { }; // unsubscribe function
        });
    };
    BackendService.prototype.delete = function (_a) {
        var collection = _a.collection, collectionName = _a.collectionName, headers = _a.headers, id = _a.id, url = _a.url;
        // tslint:disable-next-line:triple-equals
        if (id == undefined) {
            return this.createErrorResponseOptions(url, STATUS.NOT_FOUND, "Missing \"" + collectionName + "\" id");
        }
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
    BackendService.prototype.findById = function (collection, id) {
        return collection.find(function (item) { return item.id === id; });
    };
    /**
     * Generate the next available id for item in this collection
     * Use method from `inMemDbService` if it exists and returns a value,
     * else delegates to `genIdDefault`.
     * @param collection - collection of items with `id` key property
     */
    BackendService.prototype.genId = function (collection, collectionName) {
        var genId = this.bind('genId');
        if (genId) {
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
    BackendService.prototype.genIdDefault = function (collection, collectionName) {
        if (!this.isCollectionIdNumeric(collection, collectionName)) {
            throw new Error("Collection '" + collectionName + "' id type is non-numeric or unknown. Can only generate numeric ids.");
        }
        var maxId = 0;
        collection.reduce(function (prev, item) {
            maxId = Math.max(maxId, typeof item.id === 'number' ? item.id : maxId);
        }, undefined);
        return maxId + 1;
    };
    BackendService.prototype.get = function (_a) {
        var collection = _a.collection, collectionName = _a.collectionName, headers = _a.headers, id = _a.id, query = _a.query, url = _a.url;
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
    BackendService.prototype.getLocation = function (url) {
        if (!url.startsWith('http')) {
            // get the document iff running in browser
            var doc = (typeof document === 'undefined') ? undefined : document;
            // add host info to url before parsing.  Use a fake host when not in browser.
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
    BackendService.prototype.getPassThruBackend = function () {
        return this.passThruBackend ?
            this.passThruBackend :
            this.passThruBackend = this.createPassThruBackend();
    };
    /**
     * Get utility methods from this service instance.
     * Useful within an HTTP method override
     */
    BackendService.prototype.getRequestInfoUtils = function () {
        var _this = this;
        return {
            createResponse$: this.createResponse$.bind(this),
            findById: this.findById.bind(this),
            isCollectionIdNumeric: this.isCollectionIdNumeric.bind(this),
            getConfig: function () { return _this.config; },
            getDb: function () { return _this.db; },
            getJsonBody: this.getJsonBody.bind(this),
            getLocation: this.getLocation.bind(this),
            getPassThruBackend: this.getPassThruBackend.bind(this),
            parseRequestUrl: this.parseRequestUrl.bind(this),
        };
    };
    BackendService.prototype.indexOf = function (collection, id) {
        return collection.findIndex(function (item) { return item.id === id; });
    };
    /** Parse the id as a number. Return original value if not a number. */
    BackendService.prototype.parseId = function (collection, collectionName, id) {
        if (!this.isCollectionIdNumeric(collection, collectionName)) {
            // Can't confirm that `id` is a numeric type; don't parse as a number
            // or else `'42'` -> `42` and _get by id_ fails.
            return id;
        }
        var idNum = parseFloat(id);
        return isNaN(idNum) ? id : idNum;
    };
    /**
     * return true if can determine that the collection's `item.id` is a number
     * This implementation can't tell if the collection is empty so it assumes NO
     * */
    BackendService.prototype.isCollectionIdNumeric = function (collection, collectionName) {
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
    BackendService.prototype.parseRequestUrl = function (url) {
        try {
            var loc = this.getLocation(url);
            var drop = this.config.rootPath.length;
            var urlRoot = '';
            if (loc.host !== this.config.host) {
                // url for a server on a different host!
                // assume it's collection is actually here too.
                drop = 1; // the leading slash
                urlRoot = loc.protocol + '//' + loc.host + '/';
            }
            var path = loc.path.substring(drop);
            var pathSegments = path.split('/');
            var segmentIx = 0;
            // apiBase: the front part of the path devoted to getting to the api route
            // Assumes first path segment if no config.apiBase
            // else ignores as many path segments as are in config.apiBase
            // Does NOT care what the api base chars actually are.
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
            var collectionName = pathSegments[segmentIx++];
            // ignore anything after a '.' (e.g.,the "json" in "customers.json")
            collectionName = collectionName && collectionName.split('.')[0];
            var id = pathSegments[segmentIx++];
            var query = this.createQueryMap(loc.query);
            var resourceUrl = urlRoot + apiBase + collectionName + '/';
            return { apiBase: apiBase, collectionName: collectionName, id: id, query: query, resourceUrl: resourceUrl };
        }
        catch (err) {
            var msg = "unable to parse url '" + url + "'; original error: " + err.message;
            throw new Error(msg);
        }
    };
    // Create entity
    // Can update an existing entity too if post409 is false.
    BackendService.prototype.post = function (_a) {
        var collection = _a.collection, collectionName = _a.collectionName, headers = _a.headers, id = _a.id, req = _a.req, resourceUrl = _a.resourceUrl, url = _a.url;
        var item = this.clone(this.getJsonBody(req));
        // tslint:disable-next-line:triple-equals
        if (item.id == undefined) {
            try {
                item.id = id || this.genId(collection, collectionName);
            }
            catch (err) {
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
        var existingIx = this.indexOf(collection, id);
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
    BackendService.prototype.put = function (_a) {
        var collection = _a.collection, collectionName = _a.collectionName, headers = _a.headers, id = _a.id, req = _a.req, url = _a.url;
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
        var existingIx = this.indexOf(collection, id);
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
    BackendService.prototype.removeById = function (collection, id) {
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
    BackendService.prototype.resetDb = function (reqInfo) {
        var _this = this;
        this.dbReadySubject.next(false);
        var db = this.inMemDbService.createDb(reqInfo);
        var db$ = db instanceof Observable ? db :
            typeof db.then === 'function' ? from(db) :
                of(db);
        db$.pipe(first()).subscribe(function (d) {
            _this.db = d;
            _this.dbReadySubject.next(true);
        });
        return this.dbReady;
    };
    return BackendService;
}());
export { BackendService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2luLW1lbS9iYWNrZW5kLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxPQUFPLEVBSUwscUJBQXFCLEVBR3JCLFFBQVEsRUFFUixtQkFBbUIsRUFLcEIsTUFBTSxjQUFjLENBQUM7QUFFdEI7Ozs7OztHQU1HO0FBQ0g7SUFPRSx3QkFDWSxjQUFpQyxFQUMzQyxNQUFzQztRQUF0Qyx1QkFBQSxFQUFBLFdBQXNDO1FBRDVCLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQVBuQyxXQUFNLEdBQThCLElBQUkscUJBQXFCLEVBQUUsQ0FBQztRQUloRSxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQU10RCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBSyxpQ0FBaUM7UUFDbEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLCtDQUErQztRQUNoRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUdELHNCQUFj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em9CRCxJQXlvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgQmVoYXZpb3JTdWJqZWN0LCBvZiwgZnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY29uY2F0TWFwLCBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgZ2V0U3RhdHVzVGV4dCwgaXNTdWNjZXNzLCBTVEFUVVMgfSBmcm9tICcuL2h0dHAtc3RhdHVzLWNvZGVzJztcbmltcG9ydCB7IGRlbGF5UmVzcG9uc2UgfSBmcm9tICcuL2RlbGF5LXJlc3BvbnNlJztcblxuaW1wb3J0IHtcbiAgSGVhZGVyc0NvcmUsXG4gIFJlcXVlc3RJbmZvVXRpbGl0aWVzLFxuICBJbk1lbW9yeURiU2VydmljZSxcbiAgSW5NZW1vcnlCYWNrZW5kQ29uZmlnLFxuICBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzLFxuICBQYXJzZWRSZXF1ZXN0VXJsLFxuICBwYXJzZVVyaSxcbiAgUGFzc1RocnVCYWNrZW5kLFxuICByZW1vdmVUcmFpbGluZ1NsYXNoLFxuICBSZXF1ZXN0Q29yZSxcbiAgUmVxdWVzdEluZm8sXG4gIFJlc3BvbnNlT3B0aW9ucyxcbiAgVXJpSW5mb1xufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGluLW1lbW9yeSB3ZWIgYXBpIGJhY2stZW5kc1xuICogU2ltdWxhdGUgdGhlIGJlaGF2aW9yIG9mIGEgUkVTVHkgd2ViIGFwaVxuICogYmFja2VkIGJ5IHRoZSBzaW1wbGUgaW4tbWVtb3J5IGRhdGEgc3RvcmUgcHJvdmlkZWQgYnkgdGhlIGluamVjdGVkIGBJbk1lbW9yeURiU2VydmljZWAgc2VydmljZS5cbiAqIENvbmZvcm1zIG1vc3RseSB0byBiZWhhdmlvciBkZXNjcmliZWQgaGVyZTpcbiAqIGh0dHA6Ly93d3cucmVzdGFwaXR1dG9yaWFsLmNvbS9sZXNzb25zL2h0dHBtZXRob2RzLmh0bWxcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhY2tlbmRTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIGNvbmZpZzogSW5NZW1vcnlCYWNrZW5kQ29uZmlnQXJncyA9IG5ldyBJbk1lbW9yeUJhY2tlbmRDb25maWcoKTtcbiAgcHJvdGVjdGVkIGRiOiBPYmplY3Q7XG4gIHByb3RlY3RlZCBkYlJlYWR5U3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xuICBwcml2YXRlIHBhc3NUaHJ1QmFja2VuZDogUGFzc1RocnVCYWNrZW5kO1xuICBwcm90ZWN0ZWQgcmVxdWVzdEluZm9VdGlscyA9IHRoaXMuZ2V0UmVxdWVzdEluZm9VdGlscygpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBpbk1lbURiU2VydmljZTogSW5NZW1vcnlEYlNlcnZpY2UsXG4gICAgY29uZmlnOiBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzID0ge31cbiAgKSB7XG4gICAgY29uc3QgbG9jID0gdGhpcy5nZXRMb2NhdGlvbignLycpO1xuICAgIHRoaXMuY29uZmlnLmhvc3QgPSBsb2MuaG9zdDsgICAgIC8vIGRlZmF1bHQgdG8gYXBwIHdlYiBzZXJ2ZXIgaG9zdFxuICAgIHRoaXMuY29uZmlnLnJvb3RQYXRoID0gbG9jLnBhdGg7IC8vIGRlZmF1bHQgdG8gcGF0aCB3aGVuIGFwcCBpcyBzZXJ2ZWQgKGUuZy4nLycpXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZywgY29uZmlnKTtcbiAgfVxuXG4gIC8vLy8gIHByb3RlY3RlZCAvLy8vL1xuICBwcm90ZWN0ZWQgZ2V0IGRiUmVhZHkoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgaWYgKCF0aGlzLmRiUmVhZHlTdWJqZWN0KSB7XG4gICAgICAvLyBmaXJzdCB0aW1lIHRoZSBzZXJ2aWNlIGlzIGNhbGxlZC5cbiAgICAgIHRoaXMuZGJSZWFkeVN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgICAgIHRoaXMucmVzZXREYigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kYlJlYWR5U3ViamVjdC5hc09ic2VydmFibGUoKS5waXBlKGZpcnN0KChyOiBib29sZWFuKSA9PiByKSk7XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyBSZXF1ZXN0IGFuZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBIdHRwIFJlc3BvbnNlIG9iamVjdFxuICAgKiBpbiB0aGUgbWFubmVyIG9mIGEgUkVTVHkgd2ViIGFwaS5cbiAgICpcbiAgICogRXhwZWN0IFVSSSBwYXR0ZXJuIGluIHRoZSBmb3JtIDpiYXNlLzpjb2xsZWN0aW9uTmFtZS86aWQ/XG4gICAqIEV4YW1wbGVzOlxuICAgKiAgIC8vIGZvciBzdG9yZSB3aXRoIGEgJ2N1c3RvbWVycycgY29sbGVjdGlvblxuICAgKiAgIEdFVCBhcGkvY3VzdG9tZXJzICAgICAgICAgIC8vIGFsbCBjdXN0b21lcnNcbiAgICogICBHRVQgYXBpL2N1c3RvbWVycy80MiAgICAgICAvLyB0aGUgY2hhcmFjdGVyIHdpdGggaWQ9NDJcbiAgICogICBHRVQgYXBpL2N1c3RvbWVycz9uYW1lPV5qICAvLyAnaicgaXMgYSByZWdleDsgcmV0dXJucyBjdXN0b21lcnMgd2hvc2UgbmFtZSBzdGFydHMgd2l0aCAnaicgb3IgJ0onXG4gICAqICAgR0VUIGFwaS9jdXN0b21lcnMuanNvbi80MiAgLy8gaWdub3JlcyB0aGUgXCIuanNvblwiXG4gICAqXG4gICAqIEFsc28gYWNjZXB0cyBkaXJlY3QgY29tbWFuZHMgdG8gdGhlIHNlcnZpY2UgaW4gd2hpY2ggdGhlIGxhc3Qgc2VnbWVudCBvZiB0aGUgYXBpQmFzZSBpcyB0aGUgd29yZCBcImNvbW1hbmRzXCJcbiAgICogRXhhbXBsZXM6XG4gICAqICAgICBQT1NUIGNvbW1hbmRzL3Jlc2V0RGIsXG4gICAqICAgICBHRVQvUE9TVCBjb21tYW5kcy9jb25maWcgLSBnZXQgb3IgKHJlKXNldCB0aGUgY29uZmlnXG4gICAqXG4gICAqICAgSFRUUCBvdmVycmlkZXM6XG4gICAqICAgICBJZiB0aGUgaW5qZWN0ZWQgaW5NZW1EYlNlcnZpY2UgZGVmaW5lcyBhbiBIVFRQIG1ldGhvZCAobG93ZXJjYXNlKVxuICAgKiAgICAgVGhlIHJlcXVlc3QgaXMgZm9yd2FyZGVkIHRvIHRoYXQgbWV0aG9kIGFzIGluXG4gICAqICAgICBgaW5NZW1EYlNlcnZpY2UuZ2V0KHJlcXVlc3RJbmZvKWBcbiAgICogICAgIHdoaWNoIG11c3QgcmV0dXJuIGVpdGhlciBhbiBPYnNlcnZhYmxlIG9mIHRoZSByZXNwb25zZSB0eXBlXG4gICAqICAgICBmb3IgdGhpcyBodHRwIGxpYnJhcnkgb3IgbnVsbHx1bmRlZmluZWQgKHdoaWNoIG1lYW5zIFwia2VlcCBwcm9jZXNzaW5nXCIpLlxuICAgKi9cbiAgcHJvdGVjdGVkIGhhbmRsZVJlcXVlc3QocmVxOiBSZXF1ZXN0Q29yZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgLy8gIGhhbmRsZSB0aGUgcmVxdWVzdCB3aGVuIHRoZXJlIGlzIGFuIGluLW1lbW9yeSBkYXRhYmFzZVxuICAgIHJldHVybiB0aGlzLmRiUmVhZHkucGlwZShjb25jYXRNYXAoKCkgPT4gdGhpcy5oYW5kbGVSZXF1ZXN0XyhyZXEpKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFuZGxlUmVxdWVzdF8ocmVxOiBSZXF1ZXN0Q29yZSk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICBjb25zdCB1cmwgPSByZXEudXJsV2l0aFBhcmFtcyA/IHJlcS51cmxXaXRoUGFyYW1zIDogcmVxLnVybDtcblxuICAgIC8vIFRyeSBvdmVycmlkZSBwYXJzZXJcbiAgICAvLyBJZiBubyBvdmVycmlkZSBwYXJzZXIgb3IgaXQgcmV0dXJucyBub3RoaW5nLCB1c2UgZGVmYXVsdCBwYXJzZXJcbiAgICBjb25zdCBwYXJzZXIgPSB0aGlzLmJpbmQoJ3BhcnNlUmVxdWVzdFVybCcpO1xuICAgIGNvbnN0IHBhcnNlZDogUGFyc2VkUmVxdWVzdFVybCA9XG4gICAgICAoIHBhcnNlciAmJiBwYXJzZXIodXJsLCB0aGlzLnJlcXVlc3RJbmZvVXRpbHMpKSB8fFxuICAgICAgdGhpcy5wYXJzZVJlcXVlc3RVcmwodXJsKTtcblxuICAgIGNvbnN0IGNvbGxlY3Rpb25OYW1lID0gcGFyc2VkLmNvbGxlY3Rpb25OYW1lO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLmRiW2NvbGxlY3Rpb25OYW1lXTtcblxuICAgIGNvbnN0IHJlcUluZm86IFJlcXVlc3RJbmZvID0ge1xuICAgICAgcmVxOiByZXEsXG4gICAgICBhcGlCYXNlOiBwYXJzZWQuYXBpQmFzZSxcbiAgICAgIGNvbGxlY3Rpb246IGNvbGxlY3Rpb24sXG4gICAgICBjb2xsZWN0aW9uTmFtZTogY29sbGVjdGlvbk5hbWUsXG4gICAgICBoZWFkZXJzOiB0aGlzLmNyZWF0ZUhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pLFxuICAgICAgaWQ6IHRoaXMucGFyc2VJZChjb2xsZWN0aW9uLCBjb2xsZWN0aW9uTmFtZSwgcGFyc2VkLmlkKSxcbiAgICAgIG1ldGhvZDogdGhpcy5nZXRSZXF1ZXN0TWV0aG9kKHJlcSksXG4gICAgICBxdWVyeTogcGFyc2VkLnF1ZXJ5LFxuICAgICAgcmVzb3VyY2VVcmw6IHBhcnNlZC5yZXNvdXJjZVVybCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgdXRpbHM6IHRoaXMucmVxdWVzdEluZm9VdGlsc1xuICAgIH07XG5cbiAgICBsZXQgcmVzT3B0aW9uczogUmVzcG9uc2VPcHRpb25zO1xuXG4gICAgaWYgKC9jb21tYW5kc1xcLz8kL2kudGVzdChyZXFJbmZvLmFwaUJhc2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21tYW5kcyhyZXFJbmZvKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXRob2RJbnRlcmNlcHRvciA9IHRoaXMuYmluZChyZXFJbmZvLm1ldGhvZCk7XG4gICAgaWYgKG1ldGhvZEludGVyY2VwdG9yKSB7XG4gICAgICAvLyBJbk1lbW9yeURiU2VydmljZSBpbnRlcmNlcHRzIHRoaXMgSFRUUCBtZXRob2QuXG4gICAgICAvLyBpZiBpbnRlcmNlcHRvciBwcm9kdWNlZCBhIHJlc3BvbnNlLCByZXR1cm4gaXQuXG4gICAgICAvLyBlbHNlIEluTWVtb3J5RGJTZXJ2aWNlIGNob3NlIG5vdCB0byBpbnRlcmNlcHQ7IGNvbnRpbnVlIHByb2Nlc3NpbmcuXG4gICAgICBjb25zdCBpbnRlcmNlcHRvclJlc3BvbnNlID0gbWV0aG9kSW50ZXJjZXB0b3IocmVxSW5mbyk7XG4gICAgICBpZiAoaW50ZXJjZXB0b3JSZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gaW50ZXJjZXB0b3JSZXNwb25zZTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGJbY29sbGVjdGlvbk5hbWVdKSB7XG4gICAgICAvLyByZXF1ZXN0IGlzIGZvciBhIGtub3duIGNvbGxlY3Rpb24gb2YgdGhlIEluTWVtb3J5RGJTZXJ2aWNlXG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXNwb25zZSQoKCkgPT4gdGhpcy5jb2xsZWN0aW9uSGFuZGxlcihyZXFJbmZvKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLnBhc3NUaHJ1VW5rbm93blVybCkge1xuICAgICAgLy8gdW5rbm93biBjb2xsZWN0aW9uOyBwYXNzIHJlcXVlc3QgdGhydSB0byBhIFwicmVhbFwiIGJhY2tlbmQuXG4gICAgICByZXR1cm4gdGhpcy5nZXRQYXNzVGhydUJhY2tlbmQoKS5oYW5kbGUocmVxKTtcbiAgICB9XG5cbiAgICAvLyA0MDQgLSBjYW4ndCBoYW5kbGUgdGhpcyByZXF1ZXN0XG4gICAgcmVzT3B0aW9ucyA9IHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZU9wdGlvbnMoXG4gICAgICB1cmwsXG4gICAgICBTVEFUVVMuTk9UX0ZPVU5ELFxuICAgICAgYENvbGxlY3Rpb24gJyR7Y29sbGVjdGlvbk5hbWV9JyBub3QgZm91bmRgXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXNwb25zZSQoKCkgPT4gcmVzT3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGNvbmZpZ3VyZWQgZGVsYXkgdG8gcmVzcG9uc2Ugb2JzZXJ2YWJsZSB1bmxlc3MgZGVsYXkgPT09IDBcbiAgICovXG4gIHByb3RlY3RlZCBhZGREZWxheShyZXNwb25zZTogT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBkID0gdGhpcy5jb25maWcuZGVsYXk7XG4gICAgcmV0dXJuIGQgPT09IDAgPyByZXNwb25zZSA6IGRlbGF5UmVzcG9uc2UocmVzcG9uc2UsIGQgfHwgNTAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSBxdWVyeS9zZWFyY2ggcGFyYW1ldGVycyBhcyBhIGZpbHRlciBvdmVyIHRoZSBjb2xsZWN0aW9uXG4gICAqIFRoaXMgaW1wbCBvbmx5IHN1cHBvcnRzIFJlZ0V4cCBxdWVyaWVzIG9uIHN0cmluZyBwcm9wZXJ0aWVzIG9mIHRoZSBjb2xsZWN0aW9uXG4gICAqIEFORHMgdGhlIGNvbmRpdGlvbnMgdG9nZXRoZXJcbiAgICovXG4gIHByb3RlY3RlZCBhcHBseVF1ZXJ5KGNvbGxlY3Rpb246IGFueVtdLCBxdWVyeTogTWFwPHN0cmluZywgc3RyaW5nW10+KTogYW55W10ge1xuICAgIC8vIGV4dHJhY3QgZmlsdGVyaW5nIGNvbmRpdGlvbnMgLSB7cHJvcGVydHlOYW1lLCBSZWdFeHBzKSAtIGZyb20gcXVlcnkvc2VhcmNoIHBhcmFtZXRlcnNcbiAgICBjb25zdCBjb25kaXRpb25zOiB7IG5hbWU6IHN0cmluZywgcng6IFJlZ0V4cCB9W10gPSBbXTtcbiAgICBjb25zdCBjYXNlU2Vuc2l0aXZlID0gdGhpcy5jb25maWcuY2FzZVNlbnNpdGl2ZVNlYXJjaCA/IHVuZGVmaW5lZCA6ICdpJztcbiAgICBxdWVyeS5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nW10sIG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgdmFsdWUuZm9yRWFjaCh2ID0+IGNvbmRpdGlvbnMucHVzaCh7IG5hbWUsIHJ4OiBuZXcgUmVnRXhwKGRlY29kZVVSSSh2KSwgY2FzZVNlbnNpdGl2ZSkgfSkpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGVuID0gY29uZGl0aW9ucy5sZW5ndGg7XG4gICAgaWYgKCFsZW4pIHsgcmV0dXJuIGNvbGxlY3Rpb247IH1cblxuICAgIC8vIEFORCB0aGUgUmVnRXhwIGNvbmRpdGlvbnNcbiAgICByZXR1cm4gY29sbGVjdGlvbi5maWx0ZXIocm93ID0+IHtcbiAgICAgIGxldCBvayA9IHRydWU7XG4gICAgICBsZXQgaSA9IGxlbjtcbiAgICAgIHdoaWxlIChvayAmJiBpKSB7XG4gICAgICAgIGkgLT0gMTtcbiAgICAgICAgY29uc3QgY29uZCA9IGNvbmRpdGlvbnNbaV07XG4gICAgICAgIG9rID0gY29uZC5yeC50ZXN0KHJvd1tjb25kLm5hbWVdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvaztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBtZXRob2QgZnJvbSB0aGUgYEluTWVtb3J5RGJTZXJ2aWNlYCAoaWYgaXQgZXhpc3RzKSwgYm91bmQgdG8gdGhhdCBzZXJ2aWNlXG4gICAqL1xuICBwcm90ZWN0ZWQgYmluZDxUIGV4dGVuZHMgRnVuY3Rpb24+KG1ldGhvZE5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGZuID0gdGhpcy5pbk1lbURiU2VydmljZVttZXRob2ROYW1lXSBhcyBUO1xuICAgIHJldHVybiBmbiA/IDxUPiBmbi5iaW5kKHRoaXMuaW5NZW1EYlNlcnZpY2UpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJvdGVjdGVkIGJvZGlmeShkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZGF0YUVuY2Fwc3VsYXRpb24gPyB7IGRhdGEgfSA6IGRhdGE7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2xvbmUoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbGxlY3Rpb25IYW5kbGVyKHJlcUluZm86IFJlcXVlc3RJbmZvKTogUmVzcG9uc2VPcHRpb25zIHtcbiAgICAvLyBjb25zdCByZXEgPSByZXFJbmZvLnJlcTtcbiAgICAgIGxldCByZXNPcHRpb25zOiBSZXNwb25zZU9wdGlvbnM7XG4gICAgICBzd2l0Y2ggKHJlcUluZm8ubWV0aG9kKSB7XG4gICAgICAgIGNhc2UgJ2dldCc6XG4gICAgICAgICAgcmVzT3B0aW9ucyA9IHRoaXMuZ2V0KHJlcUluZm8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwb3N0JzpcbiAgICAgICAgICByZXNPcHRpb25zID0gdGhpcy5wb3N0KHJlcUluZm8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwdXQnOlxuICAgICAgICAgIHJlc09wdGlvbnMgPSB0aGlzLnB1dChyZXFJbmZvKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICByZXNPcHRpb25zID0gdGhpcy5kZWxldGUocmVxSW5mbyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmVzT3B0aW9ucyA9IHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZU9wdGlvbnMocmVxSW5mby51cmwsIFNUQVRVUy5NRVRIT0RfTk9UX0FMTE9XRUQsICdNZXRob2Qgbm90IGFsbG93ZWQnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgLy8gSWYgYGluTWVtRGJTZXJ2aWNlLnJlc3BvbnNlSW50ZXJjZXB0b3JgIGV4aXN0cywgbGV0IGl0IG1vcnBoIHRoZSByZXNwb25zZSBvcHRpb25zXG4gICAgICBjb25zdCBpbnRlcmNlcHRvciA9IHRoaXMuYmluZCgncmVzcG9uc2VJbnRlcmNlcHRvcicpO1xuICAgICAgcmV0dXJuIGludGVyY2VwdG9yID8gaW50ZXJjZXB0b3IocmVzT3B0aW9ucywgcmVxSW5mbykgOiByZXNPcHRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbW1hbmRzIHJlY29uZmlndXJlIHRoZSBpbi1tZW1vcnkgd2ViIGFwaSBzZXJ2aWNlIG9yIGV4dHJhY3QgaW5mb3JtYXRpb24gZnJvbSBpdC5cbiAgICogQ29tbWFuZHMgaWdub3JlIHRoZSBsYXRlbmN5IGRlbGF5IGFuZCByZXNwb25kIEFTQVAuXG4gICAqXG4gICAqIFdoZW4gdGhlIGxhc3Qgc2VnbWVudCBvZiB0aGUgYGFwaUJhc2VgIHBhdGggaXMgXCJjb21tYW5kc1wiLFxuICAgKiB0aGUgYGNvbGxlY3Rpb25OYW1lYCBpcyB0aGUgY29tbWFuZC5cbiAgICpcbiAgICogRXhhbXBsZSBVUkxzOlxuICAgKiAgIGNvbW1hbmRzL3Jlc2V0ZGIgKFBPU1QpIC8vIFJlc2V0IHRoZSBcImRhdGFiYXNlXCIgdG8gaXRzIG9yaWdpbmFsIHN0YXRlXG4gICAqICAgY29tbWFuZHMvY29uZmlnIChHRVQpICAgLy8gUmV0dXJuIHRoaXMgc2VydmljZSdzIGNvbmZpZyBvYmplY3RcbiAgICogICBjb21tYW5kcy9jb25maWcgKFBPU1QpICAvLyBVcGRhdGUgdGhlIGNvbmZpZyAoZS5nLiB0aGUgZGVsYXkpXG4gICAqXG4gICAqIFVzYWdlOlxuICAgKiAgIGh0dHAucG9zdCgnY29tbWFuZHMvcmVzZXRkYicsIHVuZGVmaW5lZCk7XG4gICAqICAgaHR0cC5nZXQoJ2NvbW1hbmRzL2NvbmZpZycpO1xuICAgKiAgIGh0dHAucG9zdCgnY29tbWFuZHMvY29uZmlnJywgJ3tcImRlbGF5XCI6MTAwMH0nKTtcbiAgICovXG4gIHByb3RlY3RlZCBjb21tYW5kcyhyZXFJbmZvOiBSZXF1ZXN0SW5mbyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgY29tbWFuZCA9IHJlcUluZm8uY29sbGVjdGlvbk5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBtZXRob2QgPSByZXFJbmZvLm1ldGhvZDtcblxuICAgIGxldCByZXNPcHRpb25zOiBSZXNwb25zZU9wdGlvbnMgPSB7XG4gICAgICB1cmw6IHJlcUluZm8udXJsXG4gICAgfTtcblxuICAgIHN3aXRjaCAoY29tbWFuZCkge1xuICAgICAgY2FzZSAncmVzZXRkYic6XG4gICAgICAgIHJlc09wdGlvbnMuc3RhdHVzID0gU1RBVFVTLk5PX0NPTlRFTlQ7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc2V0RGIocmVxSW5mbykucGlwZShcbiAgICAgICAgICBjb25jYXRNYXAoKCkgPT4gdGhpcy5jcmVhdGVSZXNwb25zZSQoKCkgPT4gcmVzT3B0aW9ucywgZmFsc2UgLyogbm8gbGF0ZW5jeSBkZWxheSAqLykpXG4gICAgICAgICk7XG5cbiAgICAgIGNhc2UgJ2NvbmZpZyc6XG4gICAgICAgIGlmIChtZXRob2QgPT09ICdnZXQnKSB7XG4gICAgICAgICAgcmVzT3B0aW9ucy5zdGF0dXMgPSBTVEFUVVMuT0s7XG4gICAgICAgICAgcmVzT3B0aW9ucy5ib2R5ID0gdGhpcy5jbG9uZSh0aGlzLmNvbmZpZyk7XG5cbiAgICAgICAgLy8gYW55IG90aGVyIEhUVFAgbWV0aG9kIGlzIGFzc3VtZWQgdG8gYmUgYSBjb25maWcgdXBkYXRlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgYm9keSA9IHRoaXMuZ2V0SnNvbkJvZHkocmVxSW5mby5yZXEpO1xuICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIGJvZHkpO1xuICAgICAgICAgIHRoaXMucGFzc1RocnVCYWNrZW5kID0gdW5kZWZpbmVkOyAvLyByZS1jcmVhdGUgd2hlbiBuZWVkZWRcblxuICAgICAgICAgIHJlc09wdGlvbnMuc3RhdHVzID0gU1RBVFVTLk5PX0NPTlRFTlQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlc09wdGlvbnMgPSB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2VPcHRpb25zKFxuICAgICAgICAgIHJlcUluZm8udXJsLFxuICAgICAgICAgIFNUQVRVUy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsXG4gICAgICAgICAgYFVua25vd24gY29tbWFuZCBcIiR7Y29tbWFuZH1cImBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXNwb25zZSQoKCkgPT4gcmVzT3B0aW9ucywgZmFsc2UgLyogbm8gbGF0ZW5jeSBkZWxheSAqLyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlRXJyb3JSZXNwb25zZU9wdGlvbnModXJsOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpOiBSZXNwb25zZU9wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICBib2R5OiB7IGVycm9yOiBgJHttZXNzYWdlfWAgfSxcbiAgICAgIHVybDogdXJsLFxuICAgICAgaGVhZGVyczogdGhpcy5jcmVhdGVIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KSxcbiAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgc3RhbmRhcmQgSFRUUCBoZWFkZXJzIG9iamVjdCBmcm9tIGhhc2ggbWFwIG9mIGhlYWRlciBzdHJpbmdzXG4gICAqIEBwYXJhbSBoZWFkZXJzXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlSGVhZGVycyhoZWFkZXJzOiB7W2luZGV4OiBzdHJpbmddOiBzdHJpbmd9KTogSGVhZGVyc0NvcmU7XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSB0aGUgZnVuY3Rpb24gdGhhdCBwYXNzZXMgdW5oYW5kbGVkIHJlcXVlc3RzIHRocm91Z2ggdG8gdGhlIFwicmVhbFwiIGJhY2tlbmQuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlUGFzc1RocnVCYWNrZW5kKCk6IFBhc3NUaHJ1QmFja2VuZDtcblxuICAvKipcbiAgICogcmV0dXJuIGEgc2VhcmNoIG1hcCBmcm9tIGEgbG9jYXRpb24gcXVlcnkvc2VhcmNoIHN0cmluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZVF1ZXJ5TWFwKHNlYXJjaDogc3RyaW5nKTogTWFwPHN0cmluZywgc3RyaW5nW10+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjb2xkIHJlc3BvbnNlIE9ic2VydmFibGUgZnJvbSBhIGZhY3RvcnkgZm9yIFJlc3BvbnNlT3B0aW9uc1xuICAgKiBAcGFyYW0gcmVzT3B0aW9uc0ZhY3RvcnkgLSBjcmVhdGVzIFJlc3BvbnNlT3B0aW9ucyB3aGVuIG9ic2VydmFibGUgaXMgc3Vic2NyaWJlZFxuICAgKiBAcGFyYW0gd2l0aERlbGF5IC0gaWYgdHJ1ZSAoZGVmYXVsdCksIGFkZCBzaW11bGF0ZWQgbGF0ZW5jeSBkZWxheSBmcm9tIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIHByb3RlY3RlZCBjcmVhdGVSZXNwb25zZSQocmVzT3B0aW9uc0ZhY3Rvcnk6ICgpID0+IFJlc3BvbnNlT3B0aW9ucywgd2l0aERlbGF5ID0gdHJ1ZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgcmVzT3B0aW9ucyQgPSB0aGlzLmNyZWF0ZVJlc3BvbnNlT3B0aW9ucyQocmVzT3B0aW9uc0ZhY3RvcnkpO1xuICAgIGxldCByZXNwJCA9IHRoaXMuY3JlYXRlUmVzcG9uc2UkZnJvbVJlc3BvbnNlT3B0aW9ucyQocmVzT3B0aW9ucyQpO1xuICAgIHJldHVybiB3aXRoRGVsYXkgPyB0aGlzLmFkZERlbGF5KHJlc3AkKSA6IHJlc3AkO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIFJlc3BvbnNlIG9ic2VydmFibGUgZnJvbSBSZXNwb25zZU9wdGlvbnMgb2JzZXJ2YWJsZS5cbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVSZXNwb25zZSRmcm9tUmVzcG9uc2VPcHRpb25zJChyZXNPcHRpb25zJDogT2JzZXJ2YWJsZTxSZXNwb25zZU9wdGlvbnM+KTogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjb2xkIE9ic2VydmFibGUgb2YgUmVzcG9uc2VPcHRpb25zLlxuICAgKiBAcGFyYW0gcmVzT3B0aW9uc0ZhY3RvcnkgLSBjcmVhdGVzIFJlc3BvbnNlT3B0aW9ucyB3aGVuIG9ic2VydmFibGUgaXMgc3Vic2NyaWJlZFxuICAgKi9cbiAgcHJvdGVjdGVkIGNyZWF0ZVJlc3BvbnNlT3B0aW9ucyQocmVzT3B0aW9uc0ZhY3Rvcnk6ICgpID0+IFJlc3BvbnNlT3B0aW9ucyk6IE9ic2VydmFibGU8UmVzcG9uc2VPcHRpb25zPiB7XG5cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8UmVzcG9uc2VPcHRpb25zPigocmVzcG9uc2VPYnNlcnZlcjogT2JzZXJ2ZXI8UmVzcG9uc2VPcHRpb25zPikgPT4ge1xuICAgICAgbGV0IHJlc09wdGlvbnM6IFJlc3BvbnNlT3B0aW9ucztcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc09wdGlvbnMgPSByZXNPcHRpb25zRmFjdG9yeSgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc3QgZXJyID0gZXJyb3IubWVzc2FnZSB8fCBlcnJvcjtcbiAgICAgICAgcmVzT3B0aW9ucyA9IHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZU9wdGlvbnMoJycsIFNUQVRVUy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsIGAke2Vycn1gKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RhdHVzID0gcmVzT3B0aW9ucy5zdGF0dXM7XG4gICAgICB0cnkge1xuICAgICAgICByZXNPcHRpb25zLnN0YXR1c1RleHQgPSBnZXRTdGF0dXNUZXh0KHN0YXR1cyk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIGlnbm9yZSBmYWlsdXJlICovfVxuICAgICAgaWYgKGlzU3VjY2VzcyhzdGF0dXMpKSB7XG4gICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIubmV4dChyZXNPcHRpb25zKTtcbiAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5lcnJvcihyZXNPcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoKSA9PiB7IH07IC8vIHVuc3Vic2NyaWJlIGZ1bmN0aW9uXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZGVsZXRlKHsgY29sbGVjdGlvbiwgY29sbGVjdGlvbk5hbWUsIGhlYWRlcnMsIGlkLCB1cmx9OiBSZXF1ZXN0SW5mbyk6IFJlc3BvbnNlT3B0aW9ucyB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnRyaXBsZS1lcXVhbHNcbiAgICBpZiAoaWQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucyh1cmwsIFNUQVRVUy5OT1RfRk9VTkQsIGBNaXNzaW5nIFwiJHtjb2xsZWN0aW9uTmFtZX1cIiBpZGApO1xuICAgIH1cbiAgICBjb25zdCBleGlzdHMgPSB0aGlzLnJlbW92ZUJ5SWQoY29sbGVjdGlvbiwgaWQpO1xuICAgIHJldHVybiB7XG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgc3RhdHVzOiAoZXhpc3RzIHx8ICF0aGlzLmNvbmZpZy5kZWxldGU0MDQpID8gU1RBVFVTLk5PX0NPTlRFTlQgOiBTVEFUVVMuTk9UX0ZPVU5EXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGZpcnN0IGluc3RhbmNlIG9mIGl0ZW0gaW4gY29sbGVjdGlvbiBieSBgaXRlbS5pZGBcbiAgICogQHBhcmFtIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIGlkXG4gICAqL1xuICBwcm90ZWN0ZWQgZmluZEJ5SWQ8VCBleHRlbmRzIHsgaWQ6IGFueSB9Pihjb2xsZWN0aW9uOiBUW10sIGlkOiBhbnkpOiBUIHtcbiAgICByZXR1cm4gY29sbGVjdGlvbi5maW5kKChpdGVtOiBUKSA9PiBpdGVtLmlkID09PSBpZCk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgdGhlIG5leHQgYXZhaWxhYmxlIGlkIGZvciBpdGVtIGluIHRoaXMgY29sbGVjdGlvblxuICAgKiBVc2UgbWV0aG9kIGZyb20gYGluTWVtRGJTZXJ2aWNlYCBpZiBpdCBleGlzdHMgYW5kIHJldHVybnMgYSB2YWx1ZSxcbiAgICogZWxzZSBkZWxlZ2F0ZXMgdG8gYGdlbklkRGVmYXVsdGAuXG4gICAqIEBwYXJhbSBjb2xsZWN0aW9uIC0gY29sbGVjdGlvbiBvZiBpdGVtcyB3aXRoIGBpZGAga2V5IHByb3BlcnR5XG4gICAqL1xuICBwcm90ZWN0ZWQgZ2VuSWQ8VCBleHRlbmRzIHsgaWQ6IGFueSB9Pihjb2xsZWN0aW9uOiBUW10sIGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IGdlbklkID0gdGhpcy5iaW5kKCdnZW5JZCcpO1xuICAgIGlmIChnZW5JZCkge1xuICAgICAgY29uc3QgaWQgPSBnZW5JZChjb2xsZWN0aW9uLCBjb2xsZWN0aW9uTmFtZSk7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dHJpcGxlLWVxdWFsc1xuICAgICAgaWYgKGlkICE9IHVuZGVmaW5lZCkgeyByZXR1cm4gaWQ7IH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2VuSWREZWZhdWx0KGNvbGxlY3Rpb24sIGNvbGxlY3Rpb25OYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGdlbmVyYXRvciBvZiB0aGUgbmV4dCBhdmFpbGFibGUgaWQgZm9yIGl0ZW0gaW4gdGhpcyBjb2xsZWN0aW9uXG4gICAqIFRoaXMgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiB3b3JrcyBvbmx5IGZvciBudW1lcmljIGlkcy5cbiAgICogQHBhcmFtIGNvbGxlY3Rpb24gLSBjb2xsZWN0aW9uIG9mIGl0ZW1zIHdpdGggYGlkYCBrZXkgcHJvcGVydHlcbiAgICogQHBhcmFtIGNvbGxlY3Rpb25OYW1lIC0gbmFtZSBvZiB0aGUgY29sbGVjdGlvblxuICAgKi9cbiAgcHJvdGVjdGVkIGdlbklkRGVmYXVsdDxUIGV4dGVuZHMgeyBpZDogYW55IH0+KGNvbGxlY3Rpb246IFRbXSwgY29sbGVjdGlvbk5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKCF0aGlzLmlzQ29sbGVjdGlvbklkTnVtZXJpYyhjb2xsZWN0aW9uLCBjb2xsZWN0aW9uTmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYENvbGxlY3Rpb24gJyR7Y29sbGVjdGlvbk5hbWV9JyBpZCB0eXBlIGlzIG5vbi1udW1lcmljIG9yIHVua25vd24uIENhbiBvbmx5IGdlbmVyYXRlIG51bWVyaWMgaWRzLmApO1xuICAgIH1cblxuICAgIGxldCBtYXhJZCA9IDA7XG4gICAgY29sbGVjdGlvbi5yZWR1Y2UoKHByZXY6IGFueSwgaXRlbTogYW55KSA9PiB7XG4gICAgICBtYXhJZCA9IE1hdGgubWF4KG1heElkLCB0eXBlb2YgaXRlbS5pZCA9PT0gJ251bWJlcicgPyBpdGVtLmlkIDogbWF4SWQpO1xuICAgIH0sIHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIG1heElkICsgMTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQoeyBjb2xsZWN0aW9uLCBjb2xsZWN0aW9uTmFtZSwgaGVhZGVycywgaWQsIHF1ZXJ5LCB1cmwgfTogUmVxdWVzdEluZm8pOiBSZXNwb25zZU9wdGlvbnMge1xuICAgIGxldCBkYXRhID0gY29sbGVjdGlvbjtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp0cmlwbGUtZXF1YWxzXG4gICAgaWYgKGlkICE9IHVuZGVmaW5lZCAmJiBpZCAhPT0gJycpIHtcbiAgICAgIGRhdGEgPSB0aGlzLmZpbmRCeUlkKGNvbGxlY3Rpb24sIGlkKTtcbiAgICB9IGVsc2UgaWYgKHF1ZXJ5KSB7XG4gICAgICBkYXRhID0gdGhpcy5hcHBseVF1ZXJ5KGNvbGxlY3Rpb24sIHF1ZXJ5KTtcbiAgICB9XG5cbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2VPcHRpb25zKHVybCwgU1RBVFVTLk5PVF9GT1VORCwgYCcke2NvbGxlY3Rpb25OYW1lfScgd2l0aCBpZD0nJHtpZH0nIG5vdCBmb3VuZGApO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgYm9keTogdGhpcy5ib2RpZnkodGhpcy5jbG9uZShkYXRhKSksXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgc3RhdHVzOiBTVEFUVVMuT0tcbiAgICB9O1xuICB9XG5cbiAgLyoqIEdldCBKU09OIGJvZHkgZnJvbSB0aGUgcmVxdWVzdCBvYmplY3QgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGdldEpzb25Cb2R5KHJlcTogYW55KTogYW55O1xuXG4gIC8qKlxuICAgKiBHZXQgbG9jYXRpb24gaW5mbyBmcm9tIGEgdXJsLCBldmVuIG9uIHNlcnZlciB3aGVyZSBgZG9jdW1lbnRgIGlzIG5vdCBkZWZpbmVkXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0TG9jYXRpb24odXJsOiBzdHJpbmcpOiBVcmlJbmZvIHtcbiAgICBpZiAoIXVybC5zdGFydHNXaXRoKCdodHRwJykpIHtcbiAgICAgIC8vIGdldCB0aGUgZG9jdW1lbnQgaWZmIHJ1bm5pbmcgaW4gYnJvd3NlclxuICAgICAgY29uc3QgZG9jOiBEb2N1bWVudCA9ICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSA/IHVuZGVmaW5lZCA6IGRvY3VtZW50O1xuICAgICAgLy8gYWRkIGhvc3QgaW5mbyB0byB1cmwgYmVmb3JlIHBhcnNpbmcuICBVc2UgYSBmYWtlIGhvc3Qgd2hlbiBub3QgaW4gYnJvd3Nlci5cbiAgICAgIGNvbnN0IGJhc2UgPSBkb2MgPyBkb2MubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgZG9jLmxvY2F0aW9uLmhvc3QgOiAnaHR0cDovL2Zha2UnO1xuICAgICAgdXJsID0gdXJsLnN0YXJ0c1dpdGgoJy8nKSA/IGJhc2UgKyB1cmwgOiBiYXNlICsgJy8nICsgdXJsO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VVcmkodXJsKTtcbiAgfTtcblxuICAvKipcbiAgICogZ2V0IG9yIGNyZWF0ZSB0aGUgZnVuY3Rpb24gdGhhdCBwYXNzZXMgdW5oYW5kbGVkIHJlcXVlc3RzXG4gICAqIHRocm91Z2ggdG8gdGhlIFwicmVhbFwiIGJhY2tlbmQuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0UGFzc1RocnVCYWNrZW5kKCk6IFBhc3NUaHJ1QmFja2VuZCB7XG4gICAgcmV0dXJuIHRoaXMucGFzc1RocnVCYWNrZW5kID9cbiAgICAgIHRoaXMucGFzc1RocnVCYWNrZW5kIDpcbiAgICAgIHRoaXMucGFzc1RocnVCYWNrZW5kID0gdGhpcy5jcmVhdGVQYXNzVGhydUJhY2tlbmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdXRpbGl0eSBtZXRob2RzIGZyb20gdGhpcyBzZXJ2aWNlIGluc3RhbmNlLlxuICAgKiBVc2VmdWwgd2l0aGluIGFuIEhUVFAgbWV0aG9kIG92ZXJyaWRlXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0UmVxdWVzdEluZm9VdGlscygpOiBSZXF1ZXN0SW5mb1V0aWxpdGllcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNyZWF0ZVJlc3BvbnNlJDogdGhpcy5jcmVhdGVSZXNwb25zZSQuYmluZCh0aGlzKSxcbiAgICAgIGZpbmRCeUlkOiB0aGlzLmZpbmRCeUlkLmJpbmQodGhpcyksXG4gICAgICBpc0NvbGxlY3Rpb25JZE51bWVyaWM6IHRoaXMuaXNDb2xsZWN0aW9uSWROdW1lcmljLmJpbmQodGhpcyksXG4gICAgICBnZXRDb25maWc6ICgpID0+IHRoaXMuY29uZmlnLFxuICAgICAgZ2V0RGI6ICgpID0+IHRoaXMuZGIsXG4gICAgICBnZXRKc29uQm9keTogdGhpcy5nZXRKc29uQm9keS5iaW5kKHRoaXMpLFxuICAgICAgZ2V0TG9jYXRpb246IHRoaXMuZ2V0TG9jYXRpb24uYmluZCh0aGlzKSxcbiAgICAgIGdldFBhc3NUaHJ1QmFja2VuZDogdGhpcy5nZXRQYXNzVGhydUJhY2tlbmQuYmluZCh0aGlzKSxcbiAgICAgIHBhcnNlUmVxdWVzdFVybDogdGhpcy5wYXJzZVJlcXVlc3RVcmwuYmluZCh0aGlzKSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiBjYW5vbmljYWwgSFRUUCBtZXRob2QgbmFtZSAobG93ZXJjYXNlKSBmcm9tIHRoZSByZXF1ZXN0IG9iamVjdFxuICAgKiBlLmcuIChyZXEubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuICAgKiBAcGFyYW0gcmVxIC0gcmVxdWVzdCBvYmplY3QgZnJvbSB0aGUgaHR0cCBjYWxsXG4gICAqXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0UmVxdWVzdE1ldGhvZChyZXE6IGFueSk6IHN0cmluZztcblxuICBwcm90ZWN0ZWQgaW5kZXhPZihjb2xsZWN0aW9uOiBhbnlbXSwgaWQ6IG51bWJlcikge1xuICAgIHJldHVybiBjb2xsZWN0aW9uLmZpbmRJbmRleCgoaXRlbTogYW55KSA9PiBpdGVtLmlkID09PSBpZCk7XG4gIH1cblxuICAvKiogUGFyc2UgdGhlIGlkIGFzIGEgbnVtYmVyLiBSZXR1cm4gb3JpZ2luYWwgdmFsdWUgaWYgbm90IGEgbnVtYmVyLiAqL1xuICBwcm90ZWN0ZWQgcGFyc2VJZChjb2xsZWN0aW9uOiBhbnlbXSwgY29sbGVjdGlvbk5hbWU6IHN0cmluZywgaWQ6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKCF0aGlzLmlzQ29sbGVjdGlvbklkTnVtZXJpYyhjb2xsZWN0aW9uLCBjb2xsZWN0aW9uTmFtZSkpIHtcbiAgICAgIC8vIENhbid0IGNvbmZpcm0gdGhhdCBgaWRgIGlzIGEgbnVtZXJpYyB0eXBlOyBkb24ndCBwYXJzZSBhcyBhIG51bWJlclxuICAgICAgLy8gb3IgZWxzZSBgJzQyJ2AgLT4gYDQyYCBhbmQgX2dldCBieSBpZF8gZmFpbHMuXG4gICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICAgIGNvbnN0IGlkTnVtID0gcGFyc2VGbG9hdChpZCk7XG4gICAgcmV0dXJuIGlzTmFOKGlkTnVtKSA/IGlkIDogaWROdW07XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJuIHRydWUgaWYgY2FuIGRldGVybWluZSB0aGF0IHRoZSBjb2xsZWN0aW9uJ3MgYGl0ZW0uaWRgIGlzIGEgbnVtYmVyXG4gICAqIFRoaXMgaW1wbGVtZW50YXRpb24gY2FuJ3QgdGVsbCBpZiB0aGUgY29sbGVjdGlvbiBpcyBlbXB0eSBzbyBpdCBhc3N1bWVzIE5PXG4gICAqICovXG4gIHByb3RlY3RlZCBpc0NvbGxlY3Rpb25JZE51bWVyaWM8VCBleHRlbmRzIHsgaWQ6IGFueSB9Pihjb2xsZWN0aW9uOiBUW10sIGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAvLyBjb2xsZWN0aW9uTmFtZSBub3QgdXNlZCBub3cgYnV0IG92ZXJyaWRlIG1pZ2h0IG1haW50YWluIGNvbGxlY3Rpb24gdHlwZSBpbmZvcm1hdGlvblxuICAgIC8vIHNvIHRoYXQgaXQgY291bGQga25vdyB0aGUgdHlwZSBvZiB0aGUgYGlkYCBldmVuIHdoZW4gdGhlIGNvbGxlY3Rpb24gaXMgZW1wdHkuXG4gICAgcmV0dXJuICEhKGNvbGxlY3Rpb24gJiYgY29sbGVjdGlvblswXSkgJiYgdHlwZW9mIGNvbGxlY3Rpb25bMF0uaWQgPT09ICdudW1iZXInO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgcmVxdWVzdCBVUkwgaW50byBhIGBQYXJzZWRSZXF1ZXN0VXJsYCBvYmplY3QuXG4gICAqIFBhcnNpbmcgZGVwZW5kcyB1cG9uIGNlcnRhaW4gdmFsdWVzIG9mIGBjb25maWdgOiBgYXBpQmFzZWAsIGBob3N0YCwgYW5kIGB1cmxSb290YC5cbiAgICpcbiAgICogQ29uZmlndXJpbmcgdGhlIGBhcGlCYXNlYCB5aWVsZHMgdGhlIG1vc3QgaW50ZXJlc3RpbmcgY2hhbmdlcyB0byBgcGFyc2VSZXF1ZXN0VXJsYCBiZWhhdmlvcjpcbiAgICogICBXaGVuIGFwaUJhc2U9dW5kZWZpbmVkIGFuZCB1cmw9J2h0dHA6Ly9sb2NhbGhvc3QvYXBpL2NvbGxlY3Rpb24vNDInXG4gICAqICAgICB7YmFzZTogJ2FwaS8nLCBjb2xsZWN0aW9uTmFtZTogJ2NvbGxlY3Rpb24nLCBpZDogJzQyJywgLi4ufVxuICAgKiAgIFdoZW4gYXBpQmFzZT0nc29tZS9hcGkvcm9vdC8nIGFuZCB1cmw9J2h0dHA6Ly9sb2NhbGhvc3Qvc29tZS9hcGkvcm9vdC9jb2xsZWN0aW9uJ1xuICAgKiAgICAge2Jhc2U6ICdzb21lL2FwaS9yb290LycsIGNvbGxlY3Rpb25OYW1lOiAnY29sbGVjdGlvbicsIGlkOiB1bmRlZmluZWQsIC4uLn1cbiAgICogICBXaGVuIGFwaUJhc2U9Jy8nIGFuZCB1cmw9J2h0dHA6Ly9sb2NhbGhvc3QvY29sbGVjdGlvbidcbiAgICogICAgIHtiYXNlOiAnLycsIGNvbGxlY3Rpb25OYW1lOiAnY29sbGVjdGlvbicsIGlkOiB1bmRlZmluZWQsIC4uLn1cbiAgICpcbiAgICogVGhlIGFjdHVhbCBhcGkgYmFzZSBzZWdtZW50IHZhbHVlcyBhcmUgaWdub3JlZC4gT25seSB0aGUgbnVtYmVyIG9mIHNlZ21lbnRzIG1hdHRlcnMuXG4gICAqIFRoZSBmb2xsb3dpbmcgYXBpIGJhc2Ugc3RyaW5ncyBhcmUgY29uc2lkZXJlZCBpZGVudGljYWw6ICdhL2InIH4gJ3NvbWUvYXBpLycgfiBgdHdvL3NlZ21lbnRzJ1xuICAgKlxuICAgKiBUbyByZXBsYWNlIHRoaXMgZGVmYXVsdCBtZXRob2QsIGFzc2lnbiB5b3VyIGFsdGVybmF0aXZlIHRvIHlvdXIgSW5NZW1EYlNlcnZpY2VbJ3BhcnNlUmVxdWVzdFVybCddXG4gICAqL1xuICBwcm90ZWN0ZWQgcGFyc2VSZXF1ZXN0VXJsKHVybDogc3RyaW5nKTogUGFyc2VkUmVxdWVzdFVybCB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGxvYyA9IHRoaXMuZ2V0TG9jYXRpb24odXJsKTtcbiAgICAgIGxldCBkcm9wID0gdGhpcy5jb25maWcucm9vdFBhdGgubGVuZ3RoO1xuICAgICAgbGV0IHVybFJvb3QgPSAnJztcbiAgICAgIGlmIChsb2MuaG9zdCAhPT0gdGhpcy5jb25maWcuaG9zdCkge1xuICAgICAgICAvLyB1cmwgZm9yIGEgc2VydmVyIG9uIGEgZGlmZmVyZW50IGhvc3QhXG4gICAgICAgIC8vIGFzc3VtZSBpdCdzIGNvbGxlY3Rpb24gaXMgYWN0dWFsbHkgaGVyZSB0b28uXG4gICAgICAgIGRyb3AgPSAxOyAvLyB0aGUgbGVhZGluZyBzbGFzaFxuICAgICAgICB1cmxSb290ID0gbG9jLnByb3RvY29sICsgJy8vJyArIGxvYy5ob3N0ICsgJy8nO1xuICAgICAgfVxuICAgICAgY29uc3QgcGF0aCA9IGxvYy5wYXRoLnN1YnN0cmluZyhkcm9wKTtcbiAgICAgIGNvbnN0IHBhdGhTZWdtZW50cyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICAgIGxldCBzZWdtZW50SXggPSAwO1xuXG4gICAgICAvLyBhcGlCYXNlOiB0aGUgZnJvbnQgcGFydCBvZiB0aGUgcGF0aCBkZXZvdGVkIHRvIGdldHRpbmcgdG8gdGhlIGFwaSByb3V0ZVxuICAgICAgLy8gQXNzdW1lcyBmaXJzdCBwYXRoIHNlZ21lbnQgaWYgbm8gY29uZmlnLmFwaUJhc2VcbiAgICAgIC8vIGVsc2UgaWdub3JlcyBhcyBtYW55IHBhdGggc2VnbWVudHMgYXMgYXJlIGluIGNvbmZpZy5hcGlCYXNlXG4gICAgICAvLyBEb2VzIE5PVCBjYXJlIHdoYXQgdGhlIGFwaSBiYXNlIGNoYXJzIGFjdHVhbGx5IGFyZS5cbiAgICAgIGxldCBhcGlCYXNlOiBzdHJpbmc7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dHJpcGxlLWVxdWFsc1xuICAgICAgaWYgKHRoaXMuY29uZmlnLmFwaUJhc2UgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFwaUJhc2UgPSBwYXRoU2VnbWVudHNbc2VnbWVudEl4KytdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXBpQmFzZSA9IHJlbW92ZVRyYWlsaW5nU2xhc2godGhpcy5jb25maWcuYXBpQmFzZS50cmltKCkpO1xuICAgICAgICBpZiAoYXBpQmFzZSkge1xuICAgICAgICAgIHNlZ21lbnRJeCA9IGFwaUJhc2Uuc3BsaXQoJy8nKS5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VnbWVudEl4ID0gMDsgLy8gbm8gYXBpIGJhc2UgYXQgYWxsOyB1bndpc2UgYnV0IGFsbG93ZWQuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFwaUJhc2UgKz0gJy8nO1xuXG4gICAgICBsZXQgY29sbGVjdGlvbk5hbWUgPSBwYXRoU2VnbWVudHNbc2VnbWVudEl4KytdO1xuICAgICAgLy8gaWdub3JlIGFueXRoaW5nIGFmdGVyIGEgJy4nIChlLmcuLHRoZSBcImpzb25cIiBpbiBcImN1c3RvbWVycy5qc29uXCIpXG4gICAgICBjb2xsZWN0aW9uTmFtZSA9IGNvbGxlY3Rpb25OYW1lICYmIGNvbGxlY3Rpb25OYW1lLnNwbGl0KCcuJylbMF07XG5cbiAgICAgIGNvbnN0IGlkID0gcGF0aFNlZ21lbnRzW3NlZ21lbnRJeCsrXTtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5jcmVhdGVRdWVyeU1hcChsb2MucXVlcnkpO1xuICAgICAgY29uc3QgcmVzb3VyY2VVcmwgPSB1cmxSb290ICsgYXBpQmFzZSArIGNvbGxlY3Rpb25OYW1lICsgJy8nO1xuICAgICAgcmV0dXJuIHsgYXBpQmFzZSwgY29sbGVjdGlvbk5hbWUsIGlkLCBxdWVyeSwgcmVzb3VyY2VVcmwgfTtcblxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc3QgbXNnID0gYHVuYWJsZSB0byBwYXJzZSB1cmwgJyR7dXJsfSc7IG9yaWdpbmFsIGVycm9yOiAke2Vyci5tZXNzYWdlfWA7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG4gIH1cblxuICAvLyBDcmVhdGUgZW50aXR5XG4gIC8vIENhbiB1cGRhdGUgYW4gZXhpc3RpbmcgZW50aXR5IHRvbyBpZiBwb3N0NDA5IGlzIGZhbHNlLlxuICBwcm90ZWN0ZWQgcG9zdCh7IGNvbGxlY3Rpb24sIGNvbGxlY3Rpb25OYW1lLCBoZWFkZXJzLCBpZCwgcmVxLCByZXNvdXJjZVVybCwgdXJsIH06IFJlcXVlc3RJbmZvKTogUmVzcG9uc2VPcHRpb25zIHtcbiAgICBjb25zdCBpdGVtID0gdGhpcy5jbG9uZSh0aGlzLmdldEpzb25Cb2R5KHJlcSkpO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnRyaXBsZS1lcXVhbHNcbiAgICBpZiAoaXRlbS5pZCA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGl0ZW0uaWQgPSBpZCB8fCB0aGlzLmdlbklkKGNvbGxlY3Rpb24sIGNvbGxlY3Rpb25OYW1lKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zdCBlbXNnOiBzdHJpbmcgPSBlcnIubWVzc2FnZSB8fCAnJztcbiAgICAgICAgaWYgKC9pZCB0eXBlIGlzIG5vbi1udW1lcmljLy50ZXN0KGVtc2cpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZU9wdGlvbnModXJsLCBTVEFUVVMuVU5QUk9DRVNTQUJMRV9FTlRSWSwgZW1zZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2VPcHRpb25zKHVybCwgU1RBVFVTLklOVEVSTkFMX1NFUlZFUl9FUlJPUixcbiAgICAgICAgICAgIGBGYWlsZWQgdG8gZ2VuZXJhdGUgbmV3IGlkIGZvciAnJHtjb2xsZWN0aW9uTmFtZX0nYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaWQgJiYgaWQgIT09IGl0ZW0uaWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2VPcHRpb25zKHVybCwgU1RBVFVTLkJBRF9SRVFVRVNULCBgUmVxdWVzdCBpZCBkb2VzIG5vdCBtYXRjaCBpdGVtLmlkYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkID0gaXRlbS5pZDtcbiAgICB9XG4gICAgY29uc3QgZXhpc3RpbmdJeCA9IHRoaXMuaW5kZXhPZihjb2xsZWN0aW9uLCBpZCk7XG4gICAgY29uc3QgYm9keSA9IHRoaXMuYm9kaWZ5KGl0ZW0pO1xuXG4gICAgaWYgKGV4aXN0aW5nSXggPT09IC0xKSB7XG4gICAgICBjb2xsZWN0aW9uLnB1c2goaXRlbSk7XG4gICAgICBoZWFkZXJzLnNldCgnTG9jYXRpb24nLCByZXNvdXJjZVVybCArICcvJyArIGlkKTtcbiAgICAgIHJldHVybiB7IGhlYWRlcnMsIGJvZHksIHN0YXR1czogU1RBVFVTLkNSRUFURUQgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLnBvc3Q0MDkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2VPcHRpb25zKHVybCwgU1RBVFVTLkNPTkZMSUNULFxuICAgICAgICBgJyR7Y29sbGVjdGlvbk5hbWV9JyBpdGVtIHdpdGggaWQ9JyR7aWR9IGV4aXN0cyBhbmQgbWF5IG5vdCBiZSB1cGRhdGVkIHdpdGggUE9TVDsgdXNlIFBVVCBpbnN0ZWFkLmApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb2xsZWN0aW9uW2V4aXN0aW5nSXhdID0gaXRlbTtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5wb3N0MjA0ID9cbiAgICAgICAgICB7IGhlYWRlcnMsIHN0YXR1czogU1RBVFVTLk5PX0NPTlRFTlQgfSA6IC8vIHN1Y2Nlc3NmdWw7IG5vIGNvbnRlbnRcbiAgICAgICAgICB7IGhlYWRlcnMsIGJvZHksIHN0YXR1czogU1RBVFVTLk9LIH07IC8vIHN1Y2Nlc3NmdWw7IHJldHVybiBlbnRpdHlcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgZXhpc3RpbmcgZW50aXR5XG4gIC8vIENhbiBjcmVhdGUgYW4gZW50aXR5IHRvbyBpZiBwdXQ0MDQgaXMgZmFsc2UuXG4gIHByb3RlY3RlZCBwdXQoeyBjb2xsZWN0aW9uLCBjb2xsZWN0aW9uTmFtZSwgaGVhZGVycywgaWQsIHJlcSwgdXJsIH06IFJlcXVlc3RJbmZvKTogUmVzcG9uc2VPcHRpb25zIHtcbiAgICBjb25zdCBpdGVtID0gdGhpcy5jbG9uZSh0aGlzLmdldEpzb25Cb2R5KHJlcSkpO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp0cmlwbGUtZXF1YWxzXG4gICAgaWYgKGl0ZW0uaWQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucyh1cmwsIFNUQVRVUy5OT1RfRk9VTkQsIGBNaXNzaW5nICcke2NvbGxlY3Rpb25OYW1lfScgaWRgKTtcbiAgICB9XG4gICAgaWYgKGlkICYmIGlkICE9PSBpdGVtLmlkKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucyh1cmwsIFNUQVRVUy5CQURfUkVRVUVTVCxcbiAgICAgICAgYFJlcXVlc3QgZm9yICcke2NvbGxlY3Rpb25OYW1lfScgaWQgZG9lcyBub3QgbWF0Y2ggaXRlbS5pZGApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZCA9IGl0ZW0uaWQ7XG4gICAgfVxuICAgIGNvbnN0IGV4aXN0aW5nSXggPSB0aGlzLmluZGV4T2YoY29sbGVjdGlvbiwgaWQpO1xuICAgIGNvbnN0IGJvZHkgPSB0aGlzLmJvZGlmeShpdGVtKTtcblxuICAgIGlmIChleGlzdGluZ0l4ID4gLTEpIHtcbiAgICAgIGNvbGxlY3Rpb25bZXhpc3RpbmdJeF0gPSBpdGVtO1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnB1dDIwNCA/XG4gICAgICAgICAgeyBoZWFkZXJzLCBzdGF0dXM6IFNUQVRVUy5OT19DT05URU5UIH0gOiAvLyBzdWNjZXNzZnVsOyBubyBjb250ZW50XG4gICAgICAgICAgeyBoZWFkZXJzLCBib2R5LCBzdGF0dXM6IFNUQVRVUy5PSyB9OyAvLyBzdWNjZXNzZnVsOyByZXR1cm4gZW50aXR5XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5wdXQ0MDQpIHtcbiAgICAgIC8vIGl0ZW0gdG8gdXBkYXRlIG5vdCBmb3VuZDsgdXNlIFBPU1QgdG8gY3JlYXRlIG5ldyBpdGVtIGZvciB0aGlzIGlkLlxuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZU9wdGlvbnModXJsLCBTVEFUVVMuTk9UX0ZPVU5ELFxuICAgICAgICBgJyR7Y29sbGVjdGlvbk5hbWV9JyBpdGVtIHdpdGggaWQ9JyR7aWR9IG5vdCBmb3VuZCBhbmQgbWF5IG5vdCBiZSBjcmVhdGVkIHdpdGggUFVUOyB1c2UgUE9TVCBpbnN0ZWFkLmApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjcmVhdGUgbmV3IGl0ZW0gZm9yIGlkIG5vdCBmb3VuZFxuICAgICAgY29sbGVjdGlvbi5wdXNoKGl0ZW0pO1xuICAgICAgcmV0dXJuIHsgaGVhZGVycywgYm9keSwgc3RhdHVzOiBTVEFUVVMuQ1JFQVRFRCB9O1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCByZW1vdmVCeUlkKGNvbGxlY3Rpb246IGFueVtdLCBpZDogbnVtYmVyKSB7XG4gICAgY29uc3QgaXggPSB0aGlzLmluZGV4T2YoY29sbGVjdGlvbiwgaWQpO1xuICAgIGlmIChpeCA+IC0xKSB7XG4gICAgICBjb2xsZWN0aW9uLnNwbGljZShpeCwgMSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlbGwgeW91ciBpbi1tZW0gXCJkYXRhYmFzZVwiIHRvIHJlc2V0LlxuICAgKiByZXR1cm5zIE9ic2VydmFibGUgb2YgdGhlIGRhdGFiYXNlIGJlY2F1c2UgcmVzZXR0aW5nIGl0IGNvdWxkIGJlIGFzeW5jXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVzZXREYihyZXFJbmZvPzogUmVxdWVzdEluZm8pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICB0aGlzLmRiUmVhZHlTdWJqZWN0Lm5leHQoZmFsc2UpO1xuICAgIGNvbnN0IGRiID0gdGhpcy5pbk1lbURiU2VydmljZS5jcmVhdGVEYihyZXFJbmZvKTtcbiAgICBjb25zdCBkYiQgPSBkYiBpbnN0YW5jZW9mIE9ic2VydmFibGUgPyBkYiA6XG4gICAgICAgICAgIHR5cGVvZiAoZGIgYXMgYW55KS50aGVuID09PSAnZnVuY3Rpb24nID8gZnJvbShkYiBhcyBQcm9taXNlPGFueT4pIDpcbiAgICAgICAgICAgb2YoZGIpO1xuICAgIGRiJC5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSgoZDoge30pID0+IHtcbiAgICAgIHRoaXMuZGIgPSBkO1xuICAgICAgdGhpcy5kYlJlYWR5U3ViamVjdC5uZXh0KHRydWUpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmRiUmVhZHk7XG4gIH1cblxufVxuIl19