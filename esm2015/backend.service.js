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
export class BackendService {
    /**
     * @param {?} inMemDbService
     * @param {?=} config
     */
    constructor(inMemDbService, config = {}) {
        this.inMemDbService = inMemDbService;
        this.config = new InMemoryBackendConfig();
        this.requestInfoUtils = this.getRequestInfoUtils();
        /** @type {?} */
        const loc = this.getLocation('/');
        this.config.host = loc.host; // default to app web server host
        this.config.rootPath = loc.path; // default to path when app is served (e.g.'/')
        Object.assign(this.config, config);
    }
    ////  protected /////
    /**
     * @protected
     * @return {?}
     */
    get dbReady() {
        if (!this.dbReadySubject) {
            // first time the service is called.
            this.dbReadySubject = new BehaviorSubject(false);
            this.resetDb();
        }
        return this.dbReadySubject.asObservable().pipe(first((/**
         * @param {?} r
         * @return {?}
         */
        (r) => r)));
    }
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
    handleRequest(req) {
        //  handle the request when there is an in-memory database
        return this.dbReady.pipe(concatMap((/**
         * @return {?}
         */
        () => this.handleRequest_(req))));
    }
    /**
     * @protected
     * @param {?} req
     * @return {?}
     */
    handleRequest_(req) {
        /** @type {?} */
        const url = req.urlWithParams ? req.urlWithParams : req.url;
        // Try override parser
        // If no override parser or it returns nothing, use default parser
        /** @type {?} */
        const parser = this.bind('parseRequestUrl');
        /** @type {?} */
        const parsed = (parser && parser(url, this.requestInfoUtils)) ||
            this.parseRequestUrl(url);
        /** @type {?} */
        const collectionName = parsed.collectionName;
        /** @type {?} */
        const collection = this.db[collectionName];
        /** @type {?} */
        const reqInfo = {
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
        let resOptions;
        if (/commands\/?$/i.test(reqInfo.apiBase)) {
            return this.commands(reqInfo);
        }
        /** @type {?} */
        const methodInterceptor = this.bind(reqInfo.method);
        if (methodInterceptor) {
            // InMemoryDbService intercepts this HTTP method.
            // if interceptor produced a response, return it.
            // else InMemoryDbService chose not to intercept; continue processing.
            /** @type {?} */
            const interceptorResponse = methodInterceptor(reqInfo);
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
            () => this.collectionHandler(reqInfo)));
        }
        if (this.config.passThruUnknownUrl) {
            // unknown collection; pass request thru to a "real" backend.
            return this.getPassThruBackend().handle(req);
        }
        // 404 - can't handle this request
        resOptions = this.createErrorResponseOptions(url, STATUS.NOT_FOUND, `Collection '${collectionName}' not found`);
        return this.createResponse$((/**
         * @return {?}
         */
        () => resOptions));
    }
    /**
     * Add configured delay to response observable unless delay === 0
     * @protected
     * @param {?} response
     * @return {?}
     */
    addDelay(response) {
        /** @type {?} */
        const d = this.config.delay;
        return d === 0 ? response : delayResponse(response, d || 500);
    }
    /**
     * Apply query/search parameters as a filter over the collection
     * This impl only supports RegExp queries on string properties of the collection
     * ANDs the conditions together
     * @protected
     * @param {?} collection
     * @param {?} query
     * @return {?}
     */
    applyQuery(collection, query) {
        // extract filtering conditions - {propertyName, RegExps) - from query/search parameters
        /** @type {?} */
        const conditions = [];
        /** @type {?} */
        const caseSensitive = this.config.caseSensitiveSearch ? undefined : 'i';
        query.forEach((/**
         * @param {?} value
         * @param {?} name
         * @return {?}
         */
        (value, name) => {
            value.forEach((/**
             * @param {?} v
             * @return {?}
             */
            v => conditions.push({ name, rx: new RegExp(decodeURI(v), caseSensitive) })));
        }));
        /** @type {?} */
        const len = conditions.length;
        if (!len) {
            return collection;
        }
        // AND the RegExp conditions
        return collection.filter((/**
         * @param {?} row
         * @return {?}
         */
        row => {
            /** @type {?} */
            let ok = true;
            /** @type {?} */
            let i = len;
            while (ok && i) {
                i -= 1;
                /** @type {?} */
                const cond = conditions[i];
                ok = cond.rx.test(row[cond.name]);
            }
            return ok;
        }));
    }
    /**
     * Get a method from the `InMemoryDbService` (if it exists), bound to that service
     * @protected
     * @template T
     * @param {?} methodName
     * @return {?}
     */
    bind(methodName) {
        /** @type {?} */
        const fn = (/** @type {?} */ (this.inMemDbService[methodName]));
        return fn ? (/** @type {?} */ (fn.bind(this.inMemDbService))) : undefined;
    }
    /**
     * @protected
     * @param {?} data
     * @return {?}
     */
    bodify(data) {
        return this.config.dataEncapsulation ? { data } : data;
    }
    /**
     * @protected
     * @param {?} data
     * @return {?}
     */
    clone(data) {
        return JSON.parse(JSON.stringify(data));
    }
    /**
     * @protected
     * @param {?} reqInfo
     * @return {?}
     */
    collectionHandler(reqInfo) {
        // const req = reqInfo.req;
        /** @type {?} */
        let resOptions;
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
        const interceptor = this.bind('responseInterceptor');
        return interceptor ? interceptor(resOptions, reqInfo) : resOptions;
    }
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
    commands(reqInfo) {
        /** @type {?} */
        const command = reqInfo.collectionName.toLowerCase();
        /** @type {?} */
        const method = reqInfo.method;
        /** @type {?} */
        let resOptions = {
            url: reqInfo.url
        };
        switch (command) {
            case 'resetdb':
                resOptions.status = STATUS.NO_CONTENT;
                return this.resetDb(reqInfo).pipe(concatMap((/**
                 * @return {?}
                 */
                () => this.createResponse$((/**
                 * @return {?}
                 */
                () => resOptions), false /* no latency delay */))));
            case 'config':
                if (method === 'get') {
                    resOptions.status = STATUS.OK;
                    resOptions.body = this.clone(this.config);
                    // any other HTTP method is assumed to be a config update
                }
                else {
                    /** @type {?} */
                    const body = this.getJsonBody(reqInfo.req);
                    Object.assign(this.config, body);
                    this.passThruBackend = undefined; // re-create when needed
                    resOptions.status = STATUS.NO_CONTENT;
                }
                break;
            default:
                resOptions = this.createErrorResponseOptions(reqInfo.url, STATUS.INTERNAL_SERVER_ERROR, `Unknown command "${command}"`);
        }
        return this.createResponse$((/**
         * @return {?}
         */
        () => resOptions), false /* no latency delay */);
    }
    /**
     * @protected
     * @param {?} url
     * @param {?} status
     * @param {?} message
     * @return {?}
     */
    createErrorResponseOptions(url, status, message) {
        return {
            body: { error: `${message}` },
            url: url,
            headers: this.createHeaders({ 'Content-Type': 'application/json' }),
            status: status
        };
    }
    /**
     * Create a cold response Observable from a factory for ResponseOptions
     * @protected
     * @param {?} resOptionsFactory - creates ResponseOptions when observable is subscribed
     * @param {?=} withDelay - if true (default), add simulated latency delay from configuration
     * @return {?}
     */
    createResponse$(resOptionsFactory, withDelay = true) {
        /** @type {?} */
        const resOptions$ = this.createResponseOptions$(resOptionsFactory);
        /** @type {?} */
        let resp$ = this.createResponse$fromResponseOptions$(resOptions$);
        return withDelay ? this.addDelay(resp$) : resp$;
    }
    /**
     * Create a cold Observable of ResponseOptions.
     * @protected
     * @param {?} resOptionsFactory - creates ResponseOptions when observable is subscribed
     * @return {?}
     */
    createResponseOptions$(resOptionsFactory) {
        return new Observable((/**
         * @param {?} responseObserver
         * @return {?}
         */
        (responseObserver) => {
            /** @type {?} */
            let resOptions;
            try {
                resOptions = resOptionsFactory();
            }
            catch (error) {
                /** @type {?} */
                const err = error.message || error;
                resOptions = this.createErrorResponseOptions('', STATUS.INTERNAL_SERVER_ERROR, `${err}`);
            }
            /** @type {?} */
            const status = resOptions.status;
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
            () => { }); // unsubscribe function
        }));
    }
    /**
     * @protected
     * @param {?} __0
     * @return {?}
     */
    delete({ collection, collectionName, headers, id, url }) {
        // tslint:disable-next-line:triple-equals
        if (id == undefined) {
            return this.createErrorResponseOptions(url, STATUS.NOT_FOUND, `Missing "${collectionName}" id`);
        }
        /** @type {?} */
        const exists = this.removeById(collection, id);
        return {
            headers: headers,
            status: (exists || !this.config.delete404) ? STATUS.NO_CONTENT : STATUS.NOT_FOUND
        };
    }
    /**
     * Find first instance of item in collection by `item.id`
     * @protected
     * @template T
     * @param {?} collection
     * @param {?} id
     * @return {?}
     */
    findById(collection, id) {
        return collection.find((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.id === id));
    }
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
    genId(collection, collectionName) {
        /** @type {?} */
        const genId = this.bind('genId');
        if (genId) {
            /** @type {?} */
            const id = genId(collection, collectionName);
            // tslint:disable-next-line:triple-equals
            if (id != undefined) {
                return id;
            }
        }
        return this.genIdDefault(collection, collectionName);
    }
    /**
     * Default generator of the next available id for item in this collection
     * This default implementation works only for numeric ids.
     * @protected
     * @template T
     * @param {?} collection - collection of items with `id` key property
     * @param {?} collectionName - name of the collection
     * @return {?}
     */
    genIdDefault(collection, collectionName) {
        if (!this.isCollectionIdNumeric(collection, collectionName)) {
            throw new Error(`Collection '${collectionName}' id type is non-numeric or unknown. Can only generate numeric ids.`);
        }
        /** @type {?} */
        let maxId = 0;
        collection.reduce((/**
         * @param {?} prev
         * @param {?} item
         * @return {?}
         */
        (prev, item) => {
            maxId = Math.max(maxId, typeof item.id === 'number' ? item.id : maxId);
        }), undefined);
        return maxId + 1;
    }
    /**
     * @protected
     * @param {?} __0
     * @return {?}
     */
    get({ collection, collectionName, headers, id, query, url }) {
        /** @type {?} */
        let data = collection;
        // tslint:disable-next-line:triple-equals
        if (id != undefined && id !== '') {
            data = this.findById(collection, id);
        }
        else if (query) {
            data = this.applyQuery(collection, query);
        }
        if (!data) {
            return this.createErrorResponseOptions(url, STATUS.NOT_FOUND, `'${collectionName}' with id='${id}' not found`);
        }
        return {
            body: this.bodify(this.clone(data)),
            headers: headers,
            status: STATUS.OK
        };
    }
    /**
     * Get location info from a url, even on server where `document` is not defined
     * @protected
     * @param {?} url
     * @return {?}
     */
    getLocation(url) {
        if (!url.startsWith('http')) {
            // get the document iff running in browser
            /** @type {?} */
            const doc = (typeof document === 'undefined') ? undefined : document;
            // add host info to url before parsing.  Use a fake host when not in browser.
            /** @type {?} */
            const base = doc ? doc.location.protocol + '//' + doc.location.host : 'http://fake';
            url = url.startsWith('/') ? base + url : base + '/' + url;
        }
        return parseUri(url);
    }
    ;
    /**
     * get or create the function that passes unhandled requests
     * through to the "real" backend.
     * @protected
     * @return {?}
     */
    getPassThruBackend() {
        return this.passThruBackend ?
            this.passThruBackend :
            this.passThruBackend = this.createPassThruBackend();
    }
    /**
     * Get utility methods from this service instance.
     * Useful within an HTTP method override
     * @protected
     * @return {?}
     */
    getRequestInfoUtils() {
        return {
            createResponse$: this.createResponse$.bind(this),
            findById: this.findById.bind(this),
            isCollectionIdNumeric: this.isCollectionIdNumeric.bind(this),
            getConfig: (/**
             * @return {?}
             */
            () => this.config),
            getDb: (/**
             * @return {?}
             */
            () => this.db),
            getJsonBody: this.getJsonBody.bind(this),
            getLocation: this.getLocation.bind(this),
            getPassThruBackend: this.getPassThruBackend.bind(this),
            parseRequestUrl: this.parseRequestUrl.bind(this),
        };
    }
    /**
     * @protected
     * @param {?} collection
     * @param {?} id
     * @return {?}
     */
    indexOf(collection, id) {
        return collection.findIndex((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.id === id));
    }
    /**
     * Parse the id as a number. Return original value if not a number.
     * @protected
     * @param {?} collection
     * @param {?} collectionName
     * @param {?} id
     * @return {?}
     */
    parseId(collection, collectionName, id) {
        if (!this.isCollectionIdNumeric(collection, collectionName)) {
            // Can't confirm that `id` is a numeric type; don't parse as a number
            // or else `'42'` -> `42` and _get by id_ fails.
            return id;
        }
        /** @type {?} */
        const idNum = parseFloat(id);
        return isNaN(idNum) ? id : idNum;
    }
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
    isCollectionIdNumeric(collection, collectionName) {
        // collectionName not used now but override might maintain collection type information
        // so that it could know the type of the `id` even when the collection is empty.
        return !!(collection && collection[0]) && typeof collection[0].id === 'number';
    }
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
    parseRequestUrl(url) {
        try {
            /** @type {?} */
            const loc = this.getLocation(url);
            /** @type {?} */
            let drop = this.config.rootPath.length;
            /** @type {?} */
            let urlRoot = '';
            if (loc.host !== this.config.host) {
                // url for a server on a different host!
                // assume it's collection is actually here too.
                drop = 1; // the leading slash
                urlRoot = loc.protocol + '//' + loc.host + '/';
            }
            /** @type {?} */
            const path = loc.path.substring(drop);
            /** @type {?} */
            const pathSegments = path.split('/');
            /** @type {?} */
            let segmentIx = 0;
            // apiBase: the front part of the path devoted to getting to the api route
            // Assumes first path segment if no config.apiBase
            // else ignores as many path segments as are in config.apiBase
            // Does NOT care what the api base chars actually are.
            /** @type {?} */
            let apiBase;
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
            let collectionName = pathSegments[segmentIx++];
            // ignore anything after a '.' (e.g.,the "json" in "customers.json")
            collectionName = collectionName && collectionName.split('.')[0];
            /** @type {?} */
            const id = pathSegments[segmentIx++];
            /** @type {?} */
            const query = this.createQueryMap(loc.query);
            /** @type {?} */
            const resourceUrl = urlRoot + apiBase + collectionName + '/';
            return { apiBase, collectionName, id, query, resourceUrl };
        }
        catch (err) {
            /** @type {?} */
            const msg = `unable to parse url '${url}'; original error: ${err.message}`;
            throw new Error(msg);
        }
    }
    // Create entity
    // Can update an existing entity too if post409 is false.
    /**
     * @protected
     * @param {?} __0
     * @return {?}
     */
    post({ collection, collectionName, headers, id, req, resourceUrl, url }) {
        /** @type {?} */
        const item = this.clone(this.getJsonBody(req));
        // tslint:disable-next-line:triple-equals
        if (item.id == undefined) {
            try {
                item.id = id || this.genId(collection, collectionName);
            }
            catch (err) {
                /** @type {?} */
                const emsg = err.message || '';
                if (/id type is non-numeric/.test(emsg)) {
                    return this.createErrorResponseOptions(url, STATUS.UNPROCESSABLE_ENTRY, emsg);
                }
                else {
                    console.error(err);
                    return this.createErrorResponseOptions(url, STATUS.INTERNAL_SERVER_ERROR, `Failed to generate new id for '${collectionName}'`);
                }
            }
        }
        if (id && id !== item.id) {
            return this.createErrorResponseOptions(url, STATUS.BAD_REQUEST, `Request id does not match item.id`);
        }
        else {
            id = item.id;
        }
        /** @type {?} */
        const existingIx = this.indexOf(collection, id);
        /** @type {?} */
        const body = this.bodify(item);
        if (existingIx === -1) {
            collection.push(item);
            headers.set('Location', resourceUrl + '/' + id);
            return { headers, body, status: STATUS.CREATED };
        }
        else if (this.config.post409) {
            return this.createErrorResponseOptions(url, STATUS.CONFLICT, `'${collectionName}' item with id='${id} exists and may not be updated with POST; use PUT instead.`);
        }
        else {
            collection[existingIx] = item;
            return this.config.post204 ?
                { headers, status: STATUS.NO_CONTENT } : // successful; no content
                { headers, body, status: STATUS.OK }; // successful; return entity
        }
    }
    // Update existing entity
    // Can create an entity too if put404 is false.
    /**
     * @protected
     * @param {?} __0
     * @return {?}
     */
    put({ collection, collectionName, headers, id, req, url }) {
        /** @type {?} */
        const item = this.clone(this.getJsonBody(req));
        // tslint:disable-next-line:triple-equals
        if (item.id == undefined) {
            return this.createErrorResponseOptions(url, STATUS.NOT_FOUND, `Missing '${collectionName}' id`);
        }
        if (id && id !== item.id) {
            return this.createErrorResponseOptions(url, STATUS.BAD_REQUEST, `Request for '${collectionName}' id does not match item.id`);
        }
        else {
            id = item.id;
        }
        /** @type {?} */
        const existingIx = this.indexOf(collection, id);
        /** @type {?} */
        const body = this.bodify(item);
        if (existingIx > -1) {
            collection[existingIx] = item;
            return this.config.put204 ?
                { headers, status: STATUS.NO_CONTENT } : // successful; no content
                { headers, body, status: STATUS.OK }; // successful; return entity
        }
        else if (this.config.put404) {
            // item to update not found; use POST to create new item for this id.
            return this.createErrorResponseOptions(url, STATUS.NOT_FOUND, `'${collectionName}' item with id='${id} not found and may not be created with PUT; use POST instead.`);
        }
        else {
            // create new item for id not found
            collection.push(item);
            return { headers, body, status: STATUS.CREATED };
        }
    }
    /**
     * @protected
     * @param {?} collection
     * @param {?} id
     * @return {?}
     */
    removeById(collection, id) {
        /** @type {?} */
        const ix = this.indexOf(collection, id);
        if (ix > -1) {
            collection.splice(ix, 1);
            return true;
        }
        return false;
    }
    /**
     * Tell your in-mem "database" to reset.
     * returns Observable of the database because resetting it could be async
     * @protected
     * @param {?=} reqInfo
     * @return {?}
     */
    resetDb(reqInfo) {
        this.dbReadySubject.next(false);
        /** @type {?} */
        const db = this.inMemDbService.createDb(reqInfo);
        /** @type {?} */
        const db$ = db instanceof Observable ? db :
            typeof ((/** @type {?} */ (db))).then === 'function' ? from((/** @type {?} */ (db))) :
                of(db);
        db$.pipe(first()).subscribe((/**
         * @param {?} d
         * @return {?}
         */
        (d) => {
            this.db = d;
            this.dbReadySubject.next(true);
        }));
        return this.dbReady;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbi1tZW1vcnktd2ViLWFwaS8iLCJzb3VyY2VzIjpbImJhY2tlbmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxPQUFPLEVBSUwscUJBQXFCLEVBR3JCLFFBQVEsRUFFUixtQkFBbUIsRUFLcEIsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7OztBQVN0QixNQUFNLE9BQWdCLGNBQWM7Ozs7O0lBT2xDLFlBQ1ksY0FBaUMsRUFDM0MsU0FBb0MsRUFBRTtRQUQ1QixtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFQbkMsV0FBTSxHQUE4QixJQUFJLHFCQUFxQixFQUFFLENBQUM7UUFJaEUscUJBQWdCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7O2NBTWhELEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUssaUNBQWlDO1FBQ2xFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQywrQ0FBK0M7UUFDaEYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7OztJQUdELElBQWMsT0FBTztR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SUE0R2xILDBEQUE4Qzs7Ozs7Ozs7OztJQWtEOUMsK0RBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIEJlaGF2aW9yU3ViamVjdCwgb2YsIGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvbmNhdE1hcCwgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGdldFN0YXR1c1RleHQsIGlzU3VjY2VzcywgU1RBVFVTIH0gZnJvbSAnLi9odHRwLXN0YXR1cy1jb2Rlcyc7XG5pbXBvcnQgeyBkZWxheVJlc3BvbnNlIH0gZnJvbSAnLi9kZWxheS1yZXNwb25zZSc7XG5cbmltcG9ydCB7XG4gIEhlYWRlcnNDb3JlLFxuICBSZXF1ZXN0SW5mb1V0aWxpdGllcyxcbiAgSW5NZW1vcnlEYlNlcnZpY2UsXG4gIEluTWVtb3J5QmFja2VuZENvbmZpZyxcbiAgSW5NZW1vcnlCYWNrZW5kQ29uZmlnQXJncyxcbiAgUGFyc2VkUmVxdWVzdFVybCxcbiAgcGFyc2VVcmksXG4gIFBhc3NUaHJ1QmFja2VuZCxcbiAgcmVtb3ZlVHJhaWxpbmdTbGFzaCxcbiAgUmVxdWVzdENvcmUsXG4gIFJlcXVlc3RJbmZvLFxuICBSZXNwb25zZU9wdGlvbnMsXG4gIFVyaUluZm9cbn0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBpbi1tZW1vcnkgd2ViIGFwaSBiYWNrLWVuZHNcbiAqIFNpbXVsYXRlIHRoZSBiZWhhdmlvciBvZiBhIFJFU1R5IHdlYiBhcGlcbiAqIGJhY2tlZCBieSB0aGUgc2ltcGxlIGluLW1lbW9yeSBkYXRhIHN0b3JlIHByb3ZpZGVkIGJ5IHRoZSBpbmplY3RlZCBgSW5NZW1vcnlEYlNlcnZpY2VgIHNlcnZpY2UuXG4gKiBDb25mb3JtcyBtb3N0bHkgdG8gYmVoYXZpb3IgZGVzY3JpYmVkIGhlcmU6XG4gKiBodHRwOi8vd3d3LnJlc3RhcGl0dXRvcmlhbC5jb20vbGVzc29ucy9odHRwbWV0aG9kcy5odG1sXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYWNrZW5kU2VydmljZSB7XG4gIHByb3RlY3RlZCBjb25maWc6IEluTWVtb3J5QmFja2VuZENvbmZpZ0FyZ3MgPSBuZXcgSW5NZW1vcnlCYWNrZW5kQ29uZmlnKCk7XG4gIHByb3RlY3RlZCBkYjogT2JqZWN0O1xuICBwcm90ZWN0ZWQgZGJSZWFkeVN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPjtcbiAgcHJpdmF0ZSBwYXNzVGhydUJhY2tlbmQ6IFBhc3NUaHJ1QmFja2VuZDtcbiAgcHJvdGVjdGVkIHJlcXVlc3RJbmZvVXRpbHMgPSB0aGlzLmdldFJlcXVlc3RJbmZvVXRpbHMoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaW5NZW1EYlNlcnZpY2U6IEluTWVtb3J5RGJTZXJ2aWNlLFxuICAgIGNvbmZpZzogSW5NZW1vcnlCYWNrZW5kQ29uZmlnQXJncyA9IHt9XG4gICkge1xuICAgIGNvbnN0IGxvYyA9IHRoaXMuZ2V0TG9jYXRpb24oJy8nKTtcbiAgICB0aGlzLmNvbmZpZy5ob3N0ID0gbG9jLmhvc3Q7ICAgICAvLyBkZWZhdWx0IHRvIGFwcCB3ZWIgc2VydmVyIGhvc3RcbiAgICB0aGlzLmNvbmZpZy5yb290UGF0aCA9IGxvYy5wYXRoOyAvLyBkZWZhdWx0IHRvIHBhdGggd2hlbiBhcHAgaXMgc2VydmVkIChlLmcuJy8nKVxuICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIGNvbmZpZyk7XG4gIH1cblxuICAvLy8vICBwcm90ZWN0ZWQgLy8vLy9cbiAgcHJvdGVjdGVkIGdldCBkYlJlYWR5KCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGlmICghdGhpcy5kYlJlYWR5U3ViamVjdCkge1xuICAgICAgLy8gZmlyc3QgdGltZSB0aGUgc2VydmljZSBpcyBjYWxsZWQuXG4gICAgICB0aGlzLmRiUmVhZHlTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gICAgICB0aGlzLnJlc2V0RGIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGJSZWFkeVN1YmplY3QuYXNPYnNlcnZhYmxlKCkucGlwZShmaXJzdCgocjogYm9vbGVhbikgPT4gcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgUmVxdWVzdCBhbmQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgSHR0cCBSZXNwb25zZSBvYmplY3RcbiAgICogaW4gdGhlIG1hbm5lciBvZiBhIFJFU1R5IHdlYiBhcGkuXG4gICAqXG4gICAqIEV4cGVjdCBVUkkgcGF0dGVybiBpbiB0aGUgZm9ybSA6YmFzZS86Y29sbGVjdGlvbk5hbWUvOmlkP1xuICAgKiBFeGFtcGxlczpcbiAgICogICAvLyBmb3Igc3RvcmUgd2l0aCBhICdjdXN0b21lcnMnIGNvbGxlY3Rpb25cbiAgICogICBHRVQgYXBpL2N1c3RvbWVycyAgICAgICAgICAvLyBhbGwgY3VzdG9tZXJzXG4gICAqICAgR0VUIGFwaS9jdXN0b21lcnMvNDIgICAgICAgLy8gdGhlIGNoYXJhY3RlciB3aXRoIGlkPTQyXG4gICAqICAgR0VUIGFwaS9jdXN0b21lcnM/bmFtZT1eaiAgLy8gJ2onIGlzIGEgcmVnZXg7IHJldHVybnMgY3VzdG9tZXJzIHdob3NlIG5hbWUgc3RhcnRzIHdpdGggJ2onIG9yICdKJ1xuICAgKiAgIEdFVCBhcGkvY3VzdG9tZXJzLmpzb24vNDIgIC8vIGlnbm9yZXMgdGhlIFwiLmpzb25cIlxuICAgKlxuICAgKiBBbHNvIGFjY2VwdHMgZGlyZWN0IGNvbW1hbmRzIHRvIHRoZSBzZXJ2aWNlIGluIHdoaWNoIHRoZSBsYXN0IHNlZ21lbnQgb2YgdGhlIGFwaUJhc2UgaXMgdGhlIHdvcmQgXCJjb21tYW5kc1wiXG4gICAqIEV4YW1wbGVzOlxuICAgKiAgICAgUE9TVCBjb21tYW5kcy9yZXNldERiLFxuICAgKiAgICAgR0VUL1BPU1QgY29tbWFuZHMvY29uZmlnIC0gZ2V0IG9yIChyZSlzZXQgdGhlIGNvbmZpZ1xuICAgKlxuICAgKiAgIEhUVFAgb3ZlcnJpZGVzOlxuICAgKiAgICAgSWYgdGhlIGluamVjdGVkIGluTWVtRGJTZXJ2aWNlIGRlZmluZXMgYW4gSFRUUCBtZXRob2QgKGxvd2VyY2FzZSlcbiAgICogICAgIFRoZSByZXF1ZXN0IGlzIGZvcndhcmRlZCB0byB0aGF0IG1ldGhvZCBhcyBpblxuICAgKiAgICAgYGluTWVtRGJTZXJ2aWNlLmdldChyZXF1ZXN0SW5mbylgXG4gICAqICAgICB3aGljaCBtdXN0IHJldHVybiBlaXRoZXIgYW4gT2JzZXJ2YWJsZSBvZiB0aGUgcmVzcG9uc2UgdHlwZVxuICAgKiAgICAgZm9yIHRoaXMgaHR0cCBsaWJyYXJ5IG9yIG51bGx8dW5kZWZpbmVkICh3aGljaCBtZWFucyBcImtlZXAgcHJvY2Vzc2luZ1wiKS5cbiAgICovXG4gIHByb3RlY3RlZCBoYW5kbGVSZXF1ZXN0KHJlcTogUmVxdWVzdENvcmUpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vICBoYW5kbGUgdGhlIHJlcXVlc3Qgd2hlbiB0aGVyZSBpcyBhbiBpbi1tZW1vcnkgZGF0YWJhc2VcbiAgICByZXR1cm4gdGhpcy5kYlJlYWR5LnBpcGUoY29uY2F0TWFwKCgpID0+IHRoaXMuaGFuZGxlUmVxdWVzdF8ocmVxKSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZVJlcXVlc3RfKHJlcTogUmVxdWVzdENvcmUpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgY29uc3QgdXJsID0gcmVxLnVybFdpdGhQYXJhbXMgPyByZXEudXJsV2l0aFBhcmFtcyA6IHJlcS51cmw7XG5cbiAgICAvLyBUcnkgb3ZlcnJpZGUgcGFyc2VyXG4gICAgLy8gSWYgbm8gb3ZlcnJpZGUgcGFyc2VyIG9yIGl0IHJldHVybnMgbm90aGluZywgdXNlIGRlZmF1bHQgcGFyc2VyXG4gICAgY29uc3QgcGFyc2VyID0gdGhpcy5iaW5kKCdwYXJzZVJlcXVlc3RVcmwnKTtcbiAgICBjb25zdCBwYXJzZWQ6IFBhcnNlZFJlcXVlc3RVcmwgPVxuICAgICAgKCBwYXJzZXIgJiYgcGFyc2VyKHVybCwgdGhpcy5yZXF1ZXN0SW5mb1V0aWxzKSkgfHxcbiAgICAgIHRoaXMucGFyc2VSZXF1ZXN0VXJsKHVybCk7XG5cbiAgICBjb25zdCBjb2xsZWN0aW9uTmFtZSA9IHBhcnNlZC5jb2xsZWN0aW9uTmFtZTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gdGhpcy5kYltjb2xsZWN0aW9uTmFtZV07XG5cbiAgICBjb25zdCByZXFJbmZvOiBSZXF1ZXN0SW5mbyA9IHtcbiAgICAgIHJlcTogcmVxLFxuICAgICAgYXBpQmFzZTogcGFyc2VkLmFwaUJhc2UsXG4gICAgICBjb2xsZWN0aW9uOiBjb2xsZWN0aW9uLFxuICAgICAgY29sbGVjdGlvbk5hbWU6IGNvbGxlY3Rpb25OYW1lLFxuICAgICAgaGVhZGVyczogdGhpcy5jcmVhdGVIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KSxcbiAgICAgIGlkOiB0aGlzLnBhcnNlSWQoY29sbGVjdGlvbiwgY29sbGVjdGlvbk5hbWUsIHBhcnNlZC5pZCksXG4gICAgICBtZXRob2Q6IHRoaXMuZ2V0UmVxdWVzdE1ldGhvZChyZXEpLFxuICAgICAgcXVlcnk6IHBhcnNlZC5xdWVyeSxcbiAgICAgIHJlc291cmNlVXJsOiBwYXJzZWQucmVzb3VyY2VVcmwsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIHV0aWxzOiB0aGlzLnJlcXVlc3RJbmZvVXRpbHNcbiAgICB9O1xuXG4gICAgbGV0IHJlc09wdGlvbnM6IFJlc3BvbnNlT3B0aW9ucztcblxuICAgIGlmICgvY29tbWFuZHNcXC8/JC9pLnRlc3QocmVxSW5mby5hcGlCYXNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZHMocmVxSW5mbyk7XG4gICAgfVxuXG4gICAgY29uc3QgbWV0aG9kSW50ZXJjZXB0b3IgPSB0aGlzLmJpbmQocmVxSW5mby5tZXRob2QpO1xuICAgIGlmIChtZXRob2RJbnRlcmNlcHRvcikge1xuICAgICAgLy8gSW5NZW1vcnlEYlNlcnZpY2UgaW50ZXJjZXB0cyB0aGlzIEhUVFAgbWV0aG9kLlxuICAgICAgLy8gaWYgaW50ZXJjZXB0b3IgcHJvZHVjZWQgYSByZXNwb25zZSwgcmV0dXJuIGl0LlxuICAgICAgLy8gZWxzZSBJbk1lbW9yeURiU2VydmljZSBjaG9zZSBub3QgdG8gaW50ZXJjZXB0OyBjb250aW51ZSBwcm9jZXNzaW5nLlxuICAgICAgY29uc3QgaW50ZXJjZXB0b3JSZXNwb25zZSA9IG1ldGhvZEludGVyY2VwdG9yKHJlcUluZm8pO1xuICAgICAgaWYgKGludGVyY2VwdG9yUmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIGludGVyY2VwdG9yUmVzcG9uc2U7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRiW2NvbGxlY3Rpb25OYW1lXSkge1xuICAgICAgLy8gcmVxdWVzdCBpcyBmb3IgYSBrbm93biBjb2xsZWN0aW9uIG9mIHRoZSBJbk1lbW9yeURiU2VydmljZVxuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzcG9uc2UkKCgpID0+IHRoaXMuY29sbGVjdGlvbkhhbmRsZXIocmVxSW5mbykpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZy5wYXNzVGhydVVua25vd25VcmwpIHtcbiAgICAgIC8vIHVua25vd24gY29sbGVjdGlvbjsgcGFzcyByZXF1ZXN0IHRocnUgdG8gYSBcInJlYWxcIiBiYWNrZW5kLlxuICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFzc1RocnVCYWNrZW5kKCkuaGFuZGxlKHJlcSk7XG4gICAgfVxuXG4gICAgLy8gNDA0IC0gY2FuJ3QgaGFuZGxlIHRoaXMgcmVxdWVzdFxuICAgIHJlc09wdGlvbnMgPSB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2VPcHRpb25zKFxuICAgICAgdXJsLFxuICAgICAgU1RBVFVTLk5PVF9GT1VORCxcbiAgICAgIGBDb2xsZWN0aW9uICcke2NvbGxlY3Rpb25OYW1lfScgbm90IGZvdW5kYFxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzcG9uc2UkKCgpID0+IHJlc09wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjb25maWd1cmVkIGRlbGF5IHRvIHJlc3BvbnNlIG9ic2VydmFibGUgdW5sZXNzIGRlbGF5ID09PSAwXG4gICAqL1xuICBwcm90ZWN0ZWQgYWRkRGVsYXkocmVzcG9uc2U6IE9ic2VydmFibGU8YW55Pik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgZCA9IHRoaXMuY29uZmlnLmRlbGF5O1xuICAgIHJldHVybiBkID09PSAwID8gcmVzcG9uc2UgOiBkZWxheVJlc3BvbnNlKHJlc3BvbnNlLCBkIHx8IDUwMCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgcXVlcnkvc2VhcmNoIHBhcmFtZXRlcnMgYXMgYSBmaWx0ZXIgb3ZlciB0aGUgY29sbGVjdGlvblxuICAgKiBUaGlzIGltcGwgb25seSBzdXBwb3J0cyBSZWdFeHAgcXVlcmllcyBvbiBzdHJpbmcgcHJvcGVydGllcyBvZiB0aGUgY29sbGVjdGlvblxuICAgKiBBTkRzIHRoZSBjb25kaXRpb25zIHRvZ2V0aGVyXG4gICAqL1xuICBwcm90ZWN0ZWQgYXBwbHlRdWVyeShjb2xsZWN0aW9uOiBhbnlbXSwgcXVlcnk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPik6IGFueVtdIHtcbiAgICAvLyBleHRyYWN0IGZpbHRlcmluZyBjb25kaXRpb25zIC0ge3Byb3BlcnR5TmFtZSwgUmVnRXhwcykgLSBmcm9tIHF1ZXJ5L3NlYXJjaCBwYXJhbWV0ZXJzXG4gICAgY29uc3QgY29uZGl0aW9uczogeyBuYW1lOiBzdHJpbmcsIHJ4OiBSZWdFeHAgfVtdID0gW107XG4gICAgY29uc3QgY2FzZVNlbnNpdGl2ZSA9IHRoaXMuY29uZmlnLmNhc2VTZW5zaXRpdmVTZWFyY2ggPyB1bmRlZmluZWQgOiAnaSc7XG4gICAgcXVlcnkuZm9yRWFjaCgodmFsdWU6IHN0cmluZ1tdLCBuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIHZhbHVlLmZvckVhY2godiA9PiBjb25kaXRpb25zLnB1c2goeyBuYW1lLCByeDogbmV3IFJlZ0V4cChkZWNvZGVVUkkodiksIGNhc2VTZW5zaXRpdmUpIH0pKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxlbiA9IGNvbmRpdGlvbnMubGVuZ3RoO1xuICAgIGlmICghbGVuKSB7IHJldHVybiBjb2xsZWN0aW9uOyB9XG5cbiAgICAvLyBBTkQgdGhlIFJlZ0V4cCBjb25kaXRpb25zXG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uZmlsdGVyKHJvdyA9PiB7XG4gICAgICBsZXQgb2sgPSB0cnVlO1xuICAgICAgbGV0IGkgPSBsZW47XG4gICAgICB3aGlsZSAob2sgJiYgaSkge1xuICAgICAgICBpIC09IDE7XG4gICAgICAgIGNvbnN0IGNvbmQgPSBjb25kaXRpb25zW2ldO1xuICAgICAgICBvayA9IGNvbmQucngudGVzdChyb3dbY29uZC5uYW1lXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2s7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgbWV0aG9kIGZyb20gdGhlIGBJbk1lbW9yeURiU2VydmljZWAgKGlmIGl0IGV4aXN0cyksIGJvdW5kIHRvIHRoYXQgc2VydmljZVxuICAgKi9cbiAgcHJvdGVjdGVkIGJpbmQ8VCBleHRlbmRzIEZ1bmN0aW9uPihtZXRob2ROYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBmbiA9IHRoaXMuaW5NZW1EYlNlcnZpY2VbbWV0aG9kTmFtZV0gYXMgVDtcbiAgICByZXR1cm4gZm4gPyA8VD4gZm4uYmluZCh0aGlzLmluTWVtRGJTZXJ2aWNlKSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByb3RlY3RlZCBib2RpZnkoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmRhdGFFbmNhcHN1bGF0aW9uID8geyBkYXRhIH0gOiBkYXRhO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNsb25lKGRhdGE6IGFueSkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb2xsZWN0aW9uSGFuZGxlcihyZXFJbmZvOiBSZXF1ZXN0SW5mbyk6IFJlc3BvbnNlT3B0aW9ucyB7XG4gICAgLy8gY29uc3QgcmVxID0gcmVxSW5mby5yZXE7XG4gICAgICBsZXQgcmVzT3B0aW9uczogUmVzcG9uc2VPcHRpb25zO1xuICAgICAgc3dpdGNoIChyZXFJbmZvLm1ldGhvZCkge1xuICAgICAgICBjYXNlICdnZXQnOlxuICAgICAgICAgIHJlc09wdGlvbnMgPSB0aGlzLmdldChyZXFJbmZvKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncG9zdCc6XG4gICAgICAgICAgcmVzT3B0aW9ucyA9IHRoaXMucG9zdChyZXFJbmZvKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncHV0JzpcbiAgICAgICAgICByZXNPcHRpb25zID0gdGhpcy5wdXQocmVxSW5mbyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgcmVzT3B0aW9ucyA9IHRoaXMuZGVsZXRlKHJlcUluZm8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJlc09wdGlvbnMgPSB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2VPcHRpb25zKHJlcUluZm8udXJsLCBTVEFUVVMuTUVUSE9EX05PVF9BTExPV0VELCAnTWV0aG9kIG5vdCBhbGxvd2VkJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGBpbk1lbURiU2VydmljZS5yZXNwb25zZUludGVyY2VwdG9yYCBleGlzdHMsIGxldCBpdCBtb3JwaCB0aGUgcmVzcG9uc2Ugb3B0aW9uc1xuICAgICAgY29uc3QgaW50ZXJjZXB0b3IgPSB0aGlzLmJpbmQoJ3Jlc3BvbnNlSW50ZXJjZXB0b3InKTtcbiAgICAgIHJldHVybiBpbnRlcmNlcHRvciA/IGludGVyY2VwdG9yKHJlc09wdGlvbnMsIHJlcUluZm8pIDogcmVzT3B0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21tYW5kcyByZWNvbmZpZ3VyZSB0aGUgaW4tbWVtb3J5IHdlYiBhcGkgc2VydmljZSBvciBleHRyYWN0IGluZm9ybWF0aW9uIGZyb20gaXQuXG4gICAqIENvbW1hbmRzIGlnbm9yZSB0aGUgbGF0ZW5jeSBkZWxheSBhbmQgcmVzcG9uZCBBU0FQLlxuICAgKlxuICAgKiBXaGVuIHRoZSBsYXN0IHNlZ21lbnQgb2YgdGhlIGBhcGlCYXNlYCBwYXRoIGlzIFwiY29tbWFuZHNcIixcbiAgICogdGhlIGBjb2xsZWN0aW9uTmFtZWAgaXMgdGhlIGNvbW1hbmQuXG4gICAqXG4gICAqIEV4YW1wbGUgVVJMczpcbiAgICogICBjb21tYW5kcy9yZXNldGRiIChQT1NUKSAvLyBSZXNldCB0aGUgXCJkYXRhYmFzZVwiIHRvIGl0cyBvcmlnaW5hbCBzdGF0ZVxuICAgKiAgIGNvbW1hbmRzL2NvbmZpZyAoR0VUKSAgIC8vIFJldHVybiB0aGlzIHNlcnZpY2UncyBjb25maWcgb2JqZWN0XG4gICAqICAgY29tbWFuZHMvY29uZmlnIChQT1NUKSAgLy8gVXBkYXRlIHRoZSBjb25maWcgKGUuZy4gdGhlIGRlbGF5KVxuICAgKlxuICAgKiBVc2FnZTpcbiAgICogICBodHRwLnBvc3QoJ2NvbW1hbmRzL3Jlc2V0ZGInLCB1bmRlZmluZWQpO1xuICAgKiAgIGh0dHAuZ2V0KCdjb21tYW5kcy9jb25maWcnKTtcbiAgICogICBodHRwLnBvc3QoJ2NvbW1hbmRzL2NvbmZpZycsICd7XCJkZWxheVwiOjEwMDB9Jyk7XG4gICAqL1xuICBwcm90ZWN0ZWQgY29tbWFuZHMocmVxSW5mbzogUmVxdWVzdEluZm8pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IGNvbW1hbmQgPSByZXFJbmZvLmNvbGxlY3Rpb25OYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgbWV0aG9kID0gcmVxSW5mby5tZXRob2Q7XG5cbiAgICBsZXQgcmVzT3B0aW9uczogUmVzcG9uc2VPcHRpb25zID0ge1xuICAgICAgdXJsOiByZXFJbmZvLnVybFxuICAgIH07XG5cbiAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcbiAgICAgIGNhc2UgJ3Jlc2V0ZGInOlxuICAgICAgICByZXNPcHRpb25zLnN0YXR1cyA9IFNUQVRVUy5OT19DT05URU5UO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNldERiKHJlcUluZm8pLnBpcGUoXG4gICAgICAgICAgY29uY2F0TWFwKCgpID0+IHRoaXMuY3JlYXRlUmVzcG9uc2UkKCgpID0+IHJlc09wdGlvbnMsIGZhbHNlIC8qIG5vIGxhdGVuY3kgZGVsYXkgKi8pKVxuICAgICAgICApO1xuXG4gICAgICBjYXNlICdjb25maWcnOlxuICAgICAgICBpZiAobWV0aG9kID09PSAnZ2V0Jykge1xuICAgICAgICAgIHJlc09wdGlvbnMuc3RhdHVzID0gU1RBVFVTLk9LO1xuICAgICAgICAgIHJlc09wdGlvbnMuYm9keSA9IHRoaXMuY2xvbmUodGhpcy5jb25maWcpO1xuXG4gICAgICAgIC8vIGFueSBvdGhlciBIVFRQIG1ldGhvZCBpcyBhc3N1bWVkIHRvIGJlIGEgY29uZmlnIHVwZGF0ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmdldEpzb25Cb2R5KHJlcUluZm8ucmVxKTtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBib2R5KTtcbiAgICAgICAgICB0aGlzLnBhc3NUaHJ1QmFja2VuZCA9IHVuZGVmaW5lZDsgLy8gcmUtY3JlYXRlIHdoZW4gbmVlZGVkXG5cbiAgICAgICAgICByZXNPcHRpb25zLnN0YXR1cyA9IFNUQVRVUy5OT19DT05URU5UO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXNPcHRpb25zID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucyhcbiAgICAgICAgICByZXFJbmZvLnVybCxcbiAgICAgICAgICBTVEFUVVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLFxuICAgICAgICAgIGBVbmtub3duIGNvbW1hbmQgXCIke2NvbW1hbmR9XCJgXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzcG9uc2UkKCgpID0+IHJlc09wdGlvbnMsIGZhbHNlIC8qIG5vIGxhdGVuY3kgZGVsYXkgKi8pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZUVycm9yUmVzcG9uc2VPcHRpb25zKHVybDogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKTogUmVzcG9uc2VPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgYm9keTogeyBlcnJvcjogYCR7bWVzc2FnZX1gIH0sXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGhlYWRlcnM6IHRoaXMuY3JlYXRlSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSksXG4gICAgICBzdGF0dXM6IHN0YXR1c1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHN0YW5kYXJkIEhUVFAgaGVhZGVycyBvYmplY3QgZnJvbSBoYXNoIG1hcCBvZiBoZWFkZXIgc3RyaW5nc1xuICAgKiBAcGFyYW0gaGVhZGVyc1xuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZUhlYWRlcnMoaGVhZGVyczoge1tpbmRleDogc3RyaW5nXTogc3RyaW5nfSk6IEhlYWRlcnNDb3JlO1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgdGhlIGZ1bmN0aW9uIHRoYXQgcGFzc2VzIHVuaGFuZGxlZCByZXF1ZXN0cyB0aHJvdWdoIHRvIHRoZSBcInJlYWxcIiBiYWNrZW5kLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZVBhc3NUaHJ1QmFja2VuZCgpOiBQYXNzVGhydUJhY2tlbmQ7XG5cbiAgLyoqXG4gICAqIHJldHVybiBhIHNlYXJjaCBtYXAgZnJvbSBhIGxvY2F0aW9uIHF1ZXJ5L3NlYXJjaCBzdHJpbmdcbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVRdWVyeU1hcChzZWFyY2g6IHN0cmluZyk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgY29sZCByZXNwb25zZSBPYnNlcnZhYmxlIGZyb20gYSBmYWN0b3J5IGZvciBSZXNwb25zZU9wdGlvbnNcbiAgICogQHBhcmFtIHJlc09wdGlvbnNGYWN0b3J5IC0gY3JlYXRlcyBSZXNwb25zZU9wdGlvbnMgd2hlbiBvYnNlcnZhYmxlIGlzIHN1YnNjcmliZWRcbiAgICogQHBhcmFtIHdpdGhEZWxheSAtIGlmIHRydWUgKGRlZmF1bHQpLCBhZGQgc2ltdWxhdGVkIGxhdGVuY3kgZGVsYXkgZnJvbSBjb25maWd1cmF0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgY3JlYXRlUmVzcG9uc2UkKHJlc09wdGlvbnNGYWN0b3J5OiAoKSA9PiBSZXNwb25zZU9wdGlvbnMsIHdpdGhEZWxheSA9IHRydWUpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHJlc09wdGlvbnMkID0gdGhpcy5jcmVhdGVSZXNwb25zZU9wdGlvbnMkKHJlc09wdGlvbnNGYWN0b3J5KTtcbiAgICBsZXQgcmVzcCQgPSB0aGlzLmNyZWF0ZVJlc3BvbnNlJGZyb21SZXNwb25zZU9wdGlvbnMkKHJlc09wdGlvbnMkKTtcbiAgICByZXR1cm4gd2l0aERlbGF5ID8gdGhpcy5hZGREZWxheShyZXNwJCkgOiByZXNwJDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBSZXNwb25zZSBvYnNlcnZhYmxlIGZyb20gUmVzcG9uc2VPcHRpb25zIG9ic2VydmFibGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlUmVzcG9uc2UkZnJvbVJlc3BvbnNlT3B0aW9ucyQocmVzT3B0aW9ucyQ6IE9ic2VydmFibGU8UmVzcG9uc2VPcHRpb25zPik6IE9ic2VydmFibGU8YW55PjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgY29sZCBPYnNlcnZhYmxlIG9mIFJlc3BvbnNlT3B0aW9ucy5cbiAgICogQHBhcmFtIHJlc09wdGlvbnNGYWN0b3J5IC0gY3JlYXRlcyBSZXNwb25zZU9wdGlvbnMgd2hlbiBvYnNlcnZhYmxlIGlzIHN1YnNjcmliZWRcbiAgICovXG4gIHByb3RlY3RlZCBjcmVhdGVSZXNwb25zZU9wdGlvbnMkKHJlc09wdGlvbnNGYWN0b3J5OiAoKSA9PiBSZXNwb25zZU9wdGlvbnMpOiBPYnNlcnZhYmxlPFJlc3BvbnNlT3B0aW9ucz4ge1xuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFJlc3BvbnNlT3B0aW9ucz4oKHJlc3BvbnNlT2JzZXJ2ZXI6IE9ic2VydmVyPFJlc3BvbnNlT3B0aW9ucz4pID0+IHtcbiAgICAgIGxldCByZXNPcHRpb25zOiBSZXNwb25zZU9wdGlvbnM7XG4gICAgICB0cnkge1xuICAgICAgICByZXNPcHRpb25zID0gcmVzT3B0aW9uc0ZhY3RvcnkoKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IGVyciA9IGVycm9yLm1lc3NhZ2UgfHwgZXJyb3I7XG4gICAgICAgIHJlc09wdGlvbnMgPSB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2VPcHRpb25zKCcnLCBTVEFUVVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLCBgJHtlcnJ9YCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN0YXR1cyA9IHJlc09wdGlvbnMuc3RhdHVzO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzT3B0aW9ucy5zdGF0dXNUZXh0ID0gZ2V0U3RhdHVzVGV4dChzdGF0dXMpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBpZ25vcmUgZmFpbHVyZSAqL31cbiAgICAgIGlmIChpc1N1Y2Nlc3Moc3RhdHVzKSkge1xuICAgICAgICByZXNwb25zZU9ic2VydmVyLm5leHQocmVzT3B0aW9ucyk7XG4gICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIuZXJyb3IocmVzT3B0aW9ucyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKCkgPT4geyB9OyAvLyB1bnN1YnNjcmliZSBmdW5jdGlvblxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRlbGV0ZSh7IGNvbGxlY3Rpb24sIGNvbGxlY3Rpb25OYW1lLCBoZWFkZXJzLCBpZCwgdXJsfTogUmVxdWVzdEluZm8pOiBSZXNwb25zZU9wdGlvbnMge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp0cmlwbGUtZXF1YWxzXG4gICAgaWYgKGlkID09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZU9wdGlvbnModXJsLCBTVEFUVVMuTk9UX0ZPVU5ELCBgTWlzc2luZyBcIiR7Y29sbGVjdGlvbk5hbWV9XCIgaWRgKTtcbiAgICB9XG4gICAgY29uc3QgZXhpc3RzID0gdGhpcy5yZW1vdmVCeUlkKGNvbGxlY3Rpb24sIGlkKTtcbiAgICByZXR1cm4ge1xuICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIHN0YXR1czogKGV4aXN0cyB8fCAhdGhpcy5jb25maWcuZGVsZXRlNDA0KSA/IFNUQVRVUy5OT19DT05URU5UIDogU1RBVFVTLk5PVF9GT1VORFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRmluZCBmaXJzdCBpbnN0YW5jZSBvZiBpdGVtIGluIGNvbGxlY3Rpb24gYnkgYGl0ZW0uaWRgXG4gICAqIEBwYXJhbSBjb2xsZWN0aW9uXG4gICAqIEBwYXJhbSBpZFxuICAgKi9cbiAgcHJvdGVjdGVkIGZpbmRCeUlkPFQgZXh0ZW5kcyB7IGlkOiBhbnkgfT4oY29sbGVjdGlvbjogVFtdLCBpZDogYW55KTogVCB7XG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uZmluZCgoaXRlbTogVCkgPT4gaXRlbS5pZCA9PT0gaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIHRoZSBuZXh0IGF2YWlsYWJsZSBpZCBmb3IgaXRlbSBpbiB0aGlzIGNvbGxlY3Rpb25cbiAgICogVXNlIG1ldGhvZCBmcm9tIGBpbk1lbURiU2VydmljZWAgaWYgaXQgZXhpc3RzIGFuZCByZXR1cm5zIGEgdmFsdWUsXG4gICAqIGVsc2UgZGVsZWdhdGVzIHRvIGBnZW5JZERlZmF1bHRgLlxuICAgKiBAcGFyYW0gY29sbGVjdGlvbiAtIGNvbGxlY3Rpb24gb2YgaXRlbXMgd2l0aCBgaWRgIGtleSBwcm9wZXJ0eVxuICAgKi9cbiAgcHJvdGVjdGVkIGdlbklkPFQgZXh0ZW5kcyB7IGlkOiBhbnkgfT4oY29sbGVjdGlvbjogVFtdLCBjb2xsZWN0aW9uTmFtZTogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBnZW5JZCA9IHRoaXMuYmluZCgnZ2VuSWQnKTtcbiAgICBpZiAoZ2VuSWQpIHtcbiAgICAgIGNvbnN0IGlkID0gZ2VuSWQoY29sbGVjdGlvbiwgY29sbGVjdGlvbk5hbWUpO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnRyaXBsZS1lcXVhbHNcbiAgICAgIGlmIChpZCAhPSB1bmRlZmluZWQpIHsgcmV0dXJuIGlkOyB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdlbklkRGVmYXVsdChjb2xsZWN0aW9uLCBjb2xsZWN0aW9uTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogRGVmYXVsdCBnZW5lcmF0b3Igb2YgdGhlIG5leHQgYXZhaWxhYmxlIGlkIGZvciBpdGVtIGluIHRoaXMgY29sbGVjdGlvblxuICAgKiBUaGlzIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gd29ya3Mgb25seSBmb3IgbnVtZXJpYyBpZHMuXG4gICAqIEBwYXJhbSBjb2xsZWN0aW9uIC0gY29sbGVjdGlvbiBvZiBpdGVtcyB3aXRoIGBpZGAga2V5IHByb3BlcnR5XG4gICAqIEBwYXJhbSBjb2xsZWN0aW9uTmFtZSAtIG5hbWUgb2YgdGhlIGNvbGxlY3Rpb25cbiAgICovXG4gIHByb3RlY3RlZCBnZW5JZERlZmF1bHQ8VCBleHRlbmRzIHsgaWQ6IGFueSB9Pihjb2xsZWN0aW9uOiBUW10sIGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIGlmICghdGhpcy5pc0NvbGxlY3Rpb25JZE51bWVyaWMoY29sbGVjdGlvbiwgY29sbGVjdGlvbk5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBDb2xsZWN0aW9uICcke2NvbGxlY3Rpb25OYW1lfScgaWQgdHlwZSBpcyBub24tbnVtZXJpYyBvciB1bmtub3duLiBDYW4gb25seSBnZW5lcmF0ZSBudW1lcmljIGlkcy5gKTtcbiAgICB9XG5cbiAgICBsZXQgbWF4SWQgPSAwO1xuICAgIGNvbGxlY3Rpb24ucmVkdWNlKChwcmV2OiBhbnksIGl0ZW06IGFueSkgPT4ge1xuICAgICAgbWF4SWQgPSBNYXRoLm1heChtYXhJZCwgdHlwZW9mIGl0ZW0uaWQgPT09ICdudW1iZXInID8gaXRlbS5pZCA6IG1heElkKTtcbiAgICB9LCB1bmRlZmluZWQpO1xuICAgIHJldHVybiBtYXhJZCArIDE7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0KHsgY29sbGVjdGlvbiwgY29sbGVjdGlvbk5hbWUsIGhlYWRlcnMsIGlkLCBxdWVyeSwgdXJsIH06IFJlcXVlc3RJbmZvKTogUmVzcG9uc2VPcHRpb25zIHtcbiAgICBsZXQgZGF0YSA9IGNvbGxlY3Rpb247XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dHJpcGxlLWVxdWFsc1xuICAgIGlmIChpZCAhPSB1bmRlZmluZWQgJiYgaWQgIT09ICcnKSB7XG4gICAgICBkYXRhID0gdGhpcy5maW5kQnlJZChjb2xsZWN0aW9uLCBpZCk7XG4gICAgfSBlbHNlIGlmIChxdWVyeSkge1xuICAgICAgZGF0YSA9IHRoaXMuYXBwbHlRdWVyeShjb2xsZWN0aW9uLCBxdWVyeSk7XG4gICAgfVxuXG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucyh1cmwsIFNUQVRVUy5OT1RfRk9VTkQsIGAnJHtjb2xsZWN0aW9uTmFtZX0nIHdpdGggaWQ9JyR7aWR9JyBub3QgZm91bmRgKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGJvZHk6IHRoaXMuYm9kaWZ5KHRoaXMuY2xvbmUoZGF0YSkpLFxuICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIHN0YXR1czogU1RBVFVTLk9LXG4gICAgfTtcbiAgfVxuXG4gIC8qKiBHZXQgSlNPTiBib2R5IGZyb20gdGhlIHJlcXVlc3Qgb2JqZWN0ICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBnZXRKc29uQm9keShyZXE6IGFueSk6IGFueTtcblxuICAvKipcbiAgICogR2V0IGxvY2F0aW9uIGluZm8gZnJvbSBhIHVybCwgZXZlbiBvbiBzZXJ2ZXIgd2hlcmUgYGRvY3VtZW50YCBpcyBub3QgZGVmaW5lZFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldExvY2F0aW9uKHVybDogc3RyaW5nKTogVXJpSW5mbyB7XG4gICAgaWYgKCF1cmwuc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgICAvLyBnZXQgdGhlIGRvY3VtZW50IGlmZiBydW5uaW5nIGluIGJyb3dzZXJcbiAgICAgIGNvbnN0IGRvYzogRG9jdW1lbnQgPSAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykgPyB1bmRlZmluZWQgOiBkb2N1bWVudDtcbiAgICAgIC8vIGFkZCBob3N0IGluZm8gdG8gdXJsIGJlZm9yZSBwYXJzaW5nLiAgVXNlIGEgZmFrZSBob3N0IHdoZW4gbm90IGluIGJyb3dzZXIuXG4gICAgICBjb25zdCBiYXNlID0gZG9jID8gZG9jLmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGRvYy5sb2NhdGlvbi5ob3N0IDogJ2h0dHA6Ly9mYWtlJztcbiAgICAgIHVybCA9IHVybC5zdGFydHNXaXRoKCcvJykgPyBiYXNlICsgdXJsIDogYmFzZSArICcvJyArIHVybDtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlVXJpKHVybCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGdldCBvciBjcmVhdGUgdGhlIGZ1bmN0aW9uIHRoYXQgcGFzc2VzIHVuaGFuZGxlZCByZXF1ZXN0c1xuICAgKiB0aHJvdWdoIHRvIHRoZSBcInJlYWxcIiBiYWNrZW5kLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFBhc3NUaHJ1QmFja2VuZCgpOiBQYXNzVGhydUJhY2tlbmQge1xuICAgIHJldHVybiB0aGlzLnBhc3NUaHJ1QmFja2VuZCA/XG4gICAgICB0aGlzLnBhc3NUaHJ1QmFja2VuZCA6XG4gICAgICB0aGlzLnBhc3NUaHJ1QmFja2VuZCA9IHRoaXMuY3JlYXRlUGFzc1RocnVCYWNrZW5kKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHV0aWxpdHkgbWV0aG9kcyBmcm9tIHRoaXMgc2VydmljZSBpbnN0YW5jZS5cbiAgICogVXNlZnVsIHdpdGhpbiBhbiBIVFRQIG1ldGhvZCBvdmVycmlkZVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFJlcXVlc3RJbmZvVXRpbHMoKTogUmVxdWVzdEluZm9VdGlsaXRpZXMge1xuICAgIHJldHVybiB7XG4gICAgICBjcmVhdGVSZXNwb25zZSQ6IHRoaXMuY3JlYXRlUmVzcG9uc2UkLmJpbmQodGhpcyksXG4gICAgICBmaW5kQnlJZDogdGhpcy5maW5kQnlJZC5iaW5kKHRoaXMpLFxuICAgICAgaXNDb2xsZWN0aW9uSWROdW1lcmljOiB0aGlzLmlzQ29sbGVjdGlvbklkTnVtZXJpYy5iaW5kKHRoaXMpLFxuICAgICAgZ2V0Q29uZmlnOiAoKSA9PiB0aGlzLmNvbmZpZyxcbiAgICAgIGdldERiOiAoKSA9PiB0aGlzLmRiLFxuICAgICAgZ2V0SnNvbkJvZHk6IHRoaXMuZ2V0SnNvbkJvZHkuYmluZCh0aGlzKSxcbiAgICAgIGdldExvY2F0aW9uOiB0aGlzLmdldExvY2F0aW9uLmJpbmQodGhpcyksXG4gICAgICBnZXRQYXNzVGhydUJhY2tlbmQ6IHRoaXMuZ2V0UGFzc1RocnVCYWNrZW5kLmJpbmQodGhpcyksXG4gICAgICBwYXJzZVJlcXVlc3RVcmw6IHRoaXMucGFyc2VSZXF1ZXN0VXJsLmJpbmQodGhpcyksXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm4gY2Fub25pY2FsIEhUVFAgbWV0aG9kIG5hbWUgKGxvd2VyY2FzZSkgZnJvbSB0aGUgcmVxdWVzdCBvYmplY3RcbiAgICogZS5nLiAocmVxLm1ldGhvZCB8fCAnZ2V0JykudG9Mb3dlckNhc2UoKTtcbiAgICogQHBhcmFtIHJlcSAtIHJlcXVlc3Qgb2JqZWN0IGZyb20gdGhlIGh0dHAgY2FsbFxuICAgKlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGdldFJlcXVlc3RNZXRob2QocmVxOiBhbnkpOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIGluZGV4T2YoY29sbGVjdGlvbjogYW55W10sIGlkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gY29sbGVjdGlvbi5maW5kSW5kZXgoKGl0ZW06IGFueSkgPT4gaXRlbS5pZCA9PT0gaWQpO1xuICB9XG5cbiAgLyoqIFBhcnNlIHRoZSBpZCBhcyBhIG51bWJlci4gUmV0dXJuIG9yaWdpbmFsIHZhbHVlIGlmIG5vdCBhIG51bWJlci4gKi9cbiAgcHJvdGVjdGVkIHBhcnNlSWQoY29sbGVjdGlvbjogYW55W10sIGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpOiBhbnkge1xuICAgIGlmICghdGhpcy5pc0NvbGxlY3Rpb25JZE51bWVyaWMoY29sbGVjdGlvbiwgY29sbGVjdGlvbk5hbWUpKSB7XG4gICAgICAvLyBDYW4ndCBjb25maXJtIHRoYXQgYGlkYCBpcyBhIG51bWVyaWMgdHlwZTsgZG9uJ3QgcGFyc2UgYXMgYSBudW1iZXJcbiAgICAgIC8vIG9yIGVsc2UgYCc0MidgIC0+IGA0MmAgYW5kIF9nZXQgYnkgaWRfIGZhaWxzLlxuICAgICAgcmV0dXJuIGlkO1xuICAgIH1cbiAgICBjb25zdCBpZE51bSA9IHBhcnNlRmxvYXQoaWQpO1xuICAgIHJldHVybiBpc05hTihpZE51bSkgPyBpZCA6IGlkTnVtO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiB0cnVlIGlmIGNhbiBkZXRlcm1pbmUgdGhhdCB0aGUgY29sbGVjdGlvbidzIGBpdGVtLmlkYCBpcyBhIG51bWJlclxuICAgKiBUaGlzIGltcGxlbWVudGF0aW9uIGNhbid0IHRlbGwgaWYgdGhlIGNvbGxlY3Rpb24gaXMgZW1wdHkgc28gaXQgYXNzdW1lcyBOT1xuICAgKiAqL1xuICBwcm90ZWN0ZWQgaXNDb2xsZWN0aW9uSWROdW1lcmljPFQgZXh0ZW5kcyB7IGlkOiBhbnkgfT4oY29sbGVjdGlvbjogVFtdLCBjb2xsZWN0aW9uTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy8gY29sbGVjdGlvbk5hbWUgbm90IHVzZWQgbm93IGJ1dCBvdmVycmlkZSBtaWdodCBtYWludGFpbiBjb2xsZWN0aW9uIHR5cGUgaW5mb3JtYXRpb25cbiAgICAvLyBzbyB0aGF0IGl0IGNvdWxkIGtub3cgdGhlIHR5cGUgb2YgdGhlIGBpZGAgZXZlbiB3aGVuIHRoZSBjb2xsZWN0aW9uIGlzIGVtcHR5LlxuICAgIHJldHVybiAhIShjb2xsZWN0aW9uICYmIGNvbGxlY3Rpb25bMF0pICYmIHR5cGVvZiBjb2xsZWN0aW9uWzBdLmlkID09PSAnbnVtYmVyJztcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIHJlcXVlc3QgVVJMIGludG8gYSBgUGFyc2VkUmVxdWVzdFVybGAgb2JqZWN0LlxuICAgKiBQYXJzaW5nIGRlcGVuZHMgdXBvbiBjZXJ0YWluIHZhbHVlcyBvZiBgY29uZmlnYDogYGFwaUJhc2VgLCBgaG9zdGAsIGFuZCBgdXJsUm9vdGAuXG4gICAqXG4gICAqIENvbmZpZ3VyaW5nIHRoZSBgYXBpQmFzZWAgeWllbGRzIHRoZSBtb3N0IGludGVyZXN0aW5nIGNoYW5nZXMgdG8gYHBhcnNlUmVxdWVzdFVybGAgYmVoYXZpb3I6XG4gICAqICAgV2hlbiBhcGlCYXNlPXVuZGVmaW5lZCBhbmQgdXJsPSdodHRwOi8vbG9jYWxob3N0L2FwaS9jb2xsZWN0aW9uLzQyJ1xuICAgKiAgICAge2Jhc2U6ICdhcGkvJywgY29sbGVjdGlvbk5hbWU6ICdjb2xsZWN0aW9uJywgaWQ6ICc0MicsIC4uLn1cbiAgICogICBXaGVuIGFwaUJhc2U9J3NvbWUvYXBpL3Jvb3QvJyBhbmQgdXJsPSdodHRwOi8vbG9jYWxob3N0L3NvbWUvYXBpL3Jvb3QvY29sbGVjdGlvbidcbiAgICogICAgIHtiYXNlOiAnc29tZS9hcGkvcm9vdC8nLCBjb2xsZWN0aW9uTmFtZTogJ2NvbGxlY3Rpb24nLCBpZDogdW5kZWZpbmVkLCAuLi59XG4gICAqICAgV2hlbiBhcGlCYXNlPScvJyBhbmQgdXJsPSdodHRwOi8vbG9jYWxob3N0L2NvbGxlY3Rpb24nXG4gICAqICAgICB7YmFzZTogJy8nLCBjb2xsZWN0aW9uTmFtZTogJ2NvbGxlY3Rpb24nLCBpZDogdW5kZWZpbmVkLCAuLi59XG4gICAqXG4gICAqIFRoZSBhY3R1YWwgYXBpIGJhc2Ugc2VnbWVudCB2YWx1ZXMgYXJlIGlnbm9yZWQuIE9ubHkgdGhlIG51bWJlciBvZiBzZWdtZW50cyBtYXR0ZXJzLlxuICAgKiBUaGUgZm9sbG93aW5nIGFwaSBiYXNlIHN0cmluZ3MgYXJlIGNvbnNpZGVyZWQgaWRlbnRpY2FsOiAnYS9iJyB+ICdzb21lL2FwaS8nIH4gYHR3by9zZWdtZW50cydcbiAgICpcbiAgICogVG8gcmVwbGFjZSB0aGlzIGRlZmF1bHQgbWV0aG9kLCBhc3NpZ24geW91ciBhbHRlcm5hdGl2ZSB0byB5b3VyIEluTWVtRGJTZXJ2aWNlWydwYXJzZVJlcXVlc3RVcmwnXVxuICAgKi9cbiAgcHJvdGVjdGVkIHBhcnNlUmVxdWVzdFVybCh1cmw6IHN0cmluZyk6IFBhcnNlZFJlcXVlc3RVcmwge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBsb2MgPSB0aGlzLmdldExvY2F0aW9uKHVybCk7XG4gICAgICBsZXQgZHJvcCA9IHRoaXMuY29uZmlnLnJvb3RQYXRoLmxlbmd0aDtcbiAgICAgIGxldCB1cmxSb290ID0gJyc7XG4gICAgICBpZiAobG9jLmhvc3QgIT09IHRoaXMuY29uZmlnLmhvc3QpIHtcbiAgICAgICAgLy8gdXJsIGZvciBhIHNlcnZlciBvbiBhIGRpZmZlcmVudCBob3N0IVxuICAgICAgICAvLyBhc3N1bWUgaXQncyBjb2xsZWN0aW9uIGlzIGFjdHVhbGx5IGhlcmUgdG9vLlxuICAgICAgICBkcm9wID0gMTsgLy8gdGhlIGxlYWRpbmcgc2xhc2hcbiAgICAgICAgdXJsUm9vdCA9IGxvYy5wcm90b2NvbCArICcvLycgKyBsb2MuaG9zdCArICcvJztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhdGggPSBsb2MucGF0aC5zdWJzdHJpbmcoZHJvcCk7XG4gICAgICBjb25zdCBwYXRoU2VnbWVudHMgPSBwYXRoLnNwbGl0KCcvJyk7XG4gICAgICBsZXQgc2VnbWVudEl4ID0gMDtcblxuICAgICAgLy8gYXBpQmFzZTogdGhlIGZyb250IHBhcnQgb2YgdGhlIHBhdGggZGV2b3RlZCB0byBnZXR0aW5nIHRvIHRoZSBhcGkgcm91dGVcbiAgICAgIC8vIEFzc3VtZXMgZmlyc3QgcGF0aCBzZWdtZW50IGlmIG5vIGNvbmZpZy5hcGlCYXNlXG4gICAgICAvLyBlbHNlIGlnbm9yZXMgYXMgbWFueSBwYXRoIHNlZ21lbnRzIGFzIGFyZSBpbiBjb25maWcuYXBpQmFzZVxuICAgICAgLy8gRG9lcyBOT1QgY2FyZSB3aGF0IHRoZSBhcGkgYmFzZSBjaGFycyBhY3R1YWxseSBhcmUuXG4gICAgICBsZXQgYXBpQmFzZTogc3RyaW5nO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnRyaXBsZS1lcXVhbHNcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5hcGlCYXNlID09IHVuZGVmaW5lZCkge1xuICAgICAgICBhcGlCYXNlID0gcGF0aFNlZ21lbnRzW3NlZ21lbnRJeCsrXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFwaUJhc2UgPSByZW1vdmVUcmFpbGluZ1NsYXNoKHRoaXMuY29uZmlnLmFwaUJhc2UudHJpbSgpKTtcbiAgICAgICAgaWYgKGFwaUJhc2UpIHtcbiAgICAgICAgICBzZWdtZW50SXggPSBhcGlCYXNlLnNwbGl0KCcvJykubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlZ21lbnRJeCA9IDA7IC8vIG5vIGFwaSBiYXNlIGF0IGFsbDsgdW53aXNlIGJ1dCBhbGxvd2VkLlxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhcGlCYXNlICs9ICcvJztcblxuICAgICAgbGV0IGNvbGxlY3Rpb25OYW1lID0gcGF0aFNlZ21lbnRzW3NlZ21lbnRJeCsrXTtcbiAgICAgIC8vIGlnbm9yZSBhbnl0aGluZyBhZnRlciBhICcuJyAoZS5nLix0aGUgXCJqc29uXCIgaW4gXCJjdXN0b21lcnMuanNvblwiKVxuICAgICAgY29sbGVjdGlvbk5hbWUgPSBjb2xsZWN0aW9uTmFtZSAmJiBjb2xsZWN0aW9uTmFtZS5zcGxpdCgnLicpWzBdO1xuXG4gICAgICBjb25zdCBpZCA9IHBhdGhTZWdtZW50c1tzZWdtZW50SXgrK107XG4gICAgICBjb25zdCBxdWVyeSA9IHRoaXMuY3JlYXRlUXVlcnlNYXAobG9jLnF1ZXJ5KTtcbiAgICAgIGNvbnN0IHJlc291cmNlVXJsID0gdXJsUm9vdCArIGFwaUJhc2UgKyBjb2xsZWN0aW9uTmFtZSArICcvJztcbiAgICAgIHJldHVybiB7IGFwaUJhc2UsIGNvbGxlY3Rpb25OYW1lLCBpZCwgcXVlcnksIHJlc291cmNlVXJsIH07XG5cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnN0IG1zZyA9IGB1bmFibGUgdG8gcGFyc2UgdXJsICcke3VybH0nOyBvcmlnaW5hbCBlcnJvcjogJHtlcnIubWVzc2FnZX1gO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ3JlYXRlIGVudGl0eVxuICAvLyBDYW4gdXBkYXRlIGFuIGV4aXN0aW5nIGVudGl0eSB0b28gaWYgcG9zdDQwOSBpcyBmYWxzZS5cbiAgcHJvdGVjdGVkIHBvc3QoeyBjb2xsZWN0aW9uLCBjb2xsZWN0aW9uTmFtZSwgaGVhZGVycywgaWQsIHJlcSwgcmVzb3VyY2VVcmwsIHVybCB9OiBSZXF1ZXN0SW5mbyk6IFJlc3BvbnNlT3B0aW9ucyB7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuY2xvbmUodGhpcy5nZXRKc29uQm9keShyZXEpKTtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp0cmlwbGUtZXF1YWxzXG4gICAgaWYgKGl0ZW0uaWQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpdGVtLmlkID0gaWQgfHwgdGhpcy5nZW5JZChjb2xsZWN0aW9uLCBjb2xsZWN0aW9uTmFtZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc3QgZW1zZzogc3RyaW5nID0gZXJyLm1lc3NhZ2UgfHwgJyc7XG4gICAgICAgIGlmICgvaWQgdHlwZSBpcyBub24tbnVtZXJpYy8udGVzdChlbXNnKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2VPcHRpb25zKHVybCwgU1RBVFVTLlVOUFJPQ0VTU0FCTEVfRU5UUlksIGVtc2cpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucyh1cmwsIFNUQVRVUy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsXG4gICAgICAgICAgICBgRmFpbGVkIHRvIGdlbmVyYXRlIG5ldyBpZCBmb3IgJyR7Y29sbGVjdGlvbk5hbWV9J2ApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlkICYmIGlkICE9PSBpdGVtLmlkKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucyh1cmwsIFNUQVRVUy5CQURfUkVRVUVTVCwgYFJlcXVlc3QgaWQgZG9lcyBub3QgbWF0Y2ggaXRlbS5pZGApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZCA9IGl0ZW0uaWQ7XG4gICAgfVxuICAgIGNvbnN0IGV4aXN0aW5nSXggPSB0aGlzLmluZGV4T2YoY29sbGVjdGlvbiwgaWQpO1xuICAgIGNvbnN0IGJvZHkgPSB0aGlzLmJvZGlmeShpdGVtKTtcblxuICAgIGlmIChleGlzdGluZ0l4ID09PSAtMSkge1xuICAgICAgY29sbGVjdGlvbi5wdXNoKGl0ZW0pO1xuICAgICAgaGVhZGVycy5zZXQoJ0xvY2F0aW9uJywgcmVzb3VyY2VVcmwgKyAnLycgKyBpZCk7XG4gICAgICByZXR1cm4geyBoZWFkZXJzLCBib2R5LCBzdGF0dXM6IFNUQVRVUy5DUkVBVEVEIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5wb3N0NDA5KSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucyh1cmwsIFNUQVRVUy5DT05GTElDVCxcbiAgICAgICAgYCcke2NvbGxlY3Rpb25OYW1lfScgaXRlbSB3aXRoIGlkPScke2lkfSBleGlzdHMgYW5kIG1heSBub3QgYmUgdXBkYXRlZCB3aXRoIFBPU1Q7IHVzZSBQVVQgaW5zdGVhZC5gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29sbGVjdGlvbltleGlzdGluZ0l4XSA9IGl0ZW07XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcucG9zdDIwNCA/XG4gICAgICAgICAgeyBoZWFkZXJzLCBzdGF0dXM6IFNUQVRVUy5OT19DT05URU5UIH0gOiAvLyBzdWNjZXNzZnVsOyBubyBjb250ZW50XG4gICAgICAgICAgeyBoZWFkZXJzLCBib2R5LCBzdGF0dXM6IFNUQVRVUy5PSyB9OyAvLyBzdWNjZXNzZnVsOyByZXR1cm4gZW50aXR5XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlIGV4aXN0aW5nIGVudGl0eVxuICAvLyBDYW4gY3JlYXRlIGFuIGVudGl0eSB0b28gaWYgcHV0NDA0IGlzIGZhbHNlLlxuICBwcm90ZWN0ZWQgcHV0KHsgY29sbGVjdGlvbiwgY29sbGVjdGlvbk5hbWUsIGhlYWRlcnMsIGlkLCByZXEsIHVybCB9OiBSZXF1ZXN0SW5mbyk6IFJlc3BvbnNlT3B0aW9ucyB7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuY2xvbmUodGhpcy5nZXRKc29uQm9keShyZXEpKTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dHJpcGxlLWVxdWFsc1xuICAgIGlmIChpdGVtLmlkID09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZU9wdGlvbnModXJsLCBTVEFUVVMuTk9UX0ZPVU5ELCBgTWlzc2luZyAnJHtjb2xsZWN0aW9uTmFtZX0nIGlkYCk7XG4gICAgfVxuICAgIGlmIChpZCAmJiBpZCAhPT0gaXRlbS5pZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRXJyb3JSZXNwb25zZU9wdGlvbnModXJsLCBTVEFUVVMuQkFEX1JFUVVFU1QsXG4gICAgICAgIGBSZXF1ZXN0IGZvciAnJHtjb2xsZWN0aW9uTmFtZX0nIGlkIGRvZXMgbm90IG1hdGNoIGl0ZW0uaWRgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWQgPSBpdGVtLmlkO1xuICAgIH1cbiAgICBjb25zdCBleGlzdGluZ0l4ID0gdGhpcy5pbmRleE9mKGNvbGxlY3Rpb24sIGlkKTtcbiAgICBjb25zdCBib2R5ID0gdGhpcy5ib2RpZnkoaXRlbSk7XG5cbiAgICBpZiAoZXhpc3RpbmdJeCA+IC0xKSB7XG4gICAgICBjb2xsZWN0aW9uW2V4aXN0aW5nSXhdID0gaXRlbTtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5wdXQyMDQgP1xuICAgICAgICAgIHsgaGVhZGVycywgc3RhdHVzOiBTVEFUVVMuTk9fQ09OVEVOVCB9IDogLy8gc3VjY2Vzc2Z1bDsgbm8gY29udGVudFxuICAgICAgICAgIHsgaGVhZGVycywgYm9keSwgc3RhdHVzOiBTVEFUVVMuT0sgfTsgLy8gc3VjY2Vzc2Z1bDsgcmV0dXJuIGVudGl0eVxuICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcucHV0NDA0KSB7XG4gICAgICAvLyBpdGVtIHRvIHVwZGF0ZSBub3QgZm91bmQ7IHVzZSBQT1NUIHRvIGNyZWF0ZSBuZXcgaXRlbSBmb3IgdGhpcyBpZC5cbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2VPcHRpb25zKHVybCwgU1RBVFVTLk5PVF9GT1VORCxcbiAgICAgICAgYCcke2NvbGxlY3Rpb25OYW1lfScgaXRlbSB3aXRoIGlkPScke2lkfSBub3QgZm91bmQgYW5kIG1heSBub3QgYmUgY3JlYXRlZCB3aXRoIFBVVDsgdXNlIFBPU1QgaW5zdGVhZC5gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY3JlYXRlIG5ldyBpdGVtIGZvciBpZCBub3QgZm91bmRcbiAgICAgIGNvbGxlY3Rpb24ucHVzaChpdGVtKTtcbiAgICAgIHJldHVybiB7IGhlYWRlcnMsIGJvZHksIHN0YXR1czogU1RBVFVTLkNSRUFURUQgfTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVtb3ZlQnlJZChjb2xsZWN0aW9uOiBhbnlbXSwgaWQ6IG51bWJlcikge1xuICAgIGNvbnN0IGl4ID0gdGhpcy5pbmRleE9mKGNvbGxlY3Rpb24sIGlkKTtcbiAgICBpZiAoaXggPiAtMSkge1xuICAgICAgY29sbGVjdGlvbi5zcGxpY2UoaXgsIDEpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZWxsIHlvdXIgaW4tbWVtIFwiZGF0YWJhc2VcIiB0byByZXNldC5cbiAgICogcmV0dXJucyBPYnNlcnZhYmxlIG9mIHRoZSBkYXRhYmFzZSBiZWNhdXNlIHJlc2V0dGluZyBpdCBjb3VsZCBiZSBhc3luY1xuICAgKi9cbiAgcHJvdGVjdGVkIHJlc2V0RGIocmVxSW5mbz86IFJlcXVlc3RJbmZvKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgdGhpcy5kYlJlYWR5U3ViamVjdC5uZXh0KGZhbHNlKTtcbiAgICBjb25zdCBkYiA9IHRoaXMuaW5NZW1EYlNlcnZpY2UuY3JlYXRlRGIocmVxSW5mbyk7XG4gICAgY29uc3QgZGIkID0gZGIgaW5zdGFuY2VvZiBPYnNlcnZhYmxlID8gZGIgOlxuICAgICAgICAgICB0eXBlb2YgKGRiIGFzIGFueSkudGhlbiA9PT0gJ2Z1bmN0aW9uJyA/IGZyb20oZGIgYXMgUHJvbWlzZTxhbnk+KSA6XG4gICAgICAgICAgIG9mKGRiKTtcbiAgICBkYiQucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKGQ6IHt9KSA9PiB7XG4gICAgICB0aGlzLmRiID0gZDtcbiAgICAgIHRoaXMuZGJSZWFkeVN1YmplY3QubmV4dCh0cnVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5kYlJlYWR5O1xuICB9XG5cbn1cbiJdfQ==