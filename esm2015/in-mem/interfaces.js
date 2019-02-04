/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 *  Minimum definition needed by base class
 * @record
 */
export function HeadersCore() { }
/** @type {?} */
HeadersCore.prototype.set;
/**
 * Interface for a class that creates an in-memory database
 *
 * Its `createDb` method creates a hash of named collections that represents the database
 *
 * For maximum flexibility, the service may define HTTP method overrides.
 * Such methods must match the spelling of an HTTP method in lower case (e.g, "get").
 * If a request has a matching method, it will be called as in
 * `get(info: requestInfo, db: {})` where `db` is the database object described above.
 * @abstract
 */
export class InMemoryDbService {
}
if (false) {
    /**
     * Creates an in-memory "database" hash whose keys are collection names
     * and whose values are arrays of collection objects to return or update.
     *
     * returns Observable of the database because could have to create it asynchronously.
     *
     * This method must be safe to call repeatedly.
     * Each time it should return a new object with new arrays containing new item objects.
     * This condition allows the in-memory backend service to mutate the collections
     * and their items without touching the original source data.
     *
     * The in-mem backend service calls this method without a value the first time.
     * The service calls it with the `RequestInfo` when it receives a POST `commands/resetDb` request.
     * Your InMemoryDbService can adjust its behavior accordingly.
     * @abstract
     * @param {?=} reqInfo
     * @return {?}
     */
    InMemoryDbService.prototype.createDb = function (reqInfo) { };
}
/**
 * Interface for InMemoryBackend configuration options
 * @abstract
 */
export class InMemoryBackendConfigArgs {
}
if (false) {
    /**
     * The base path to the api, e.g, 'api/'.
     * If not specified than `parseRequestUrl` assumes it is the first path segment in the request.
     * @type {?}
     */
    InMemoryBackendConfigArgs.prototype.apiBase;
    /**
     * false (default) if search match should be case insensitive
     * @type {?}
     */
    InMemoryBackendConfigArgs.prototype.caseSensitiveSearch;
    /**
     * false (default) put content directly inside the response body.
     * true: encapsulate content in a `data` property inside the response body, `{ data: ... }`.
     * @type {?}
     */
    InMemoryBackendConfigArgs.prototype.dataEncapsulation;
    /**
     * delay (in ms) to simulate latency
     * @type {?}
     */
    InMemoryBackendConfigArgs.prototype.delay;
    /**
     * false (default) should 204 when object-to-delete not found; true: 404
     * @type {?}
     */
    InMemoryBackendConfigArgs.prototype.delete404;
    /**
     * host for this service, e.g., 'localhost'
     * @type {?}
     */
    InMemoryBackendConfigArgs.prototype.host;
    /**
     * false (default) should pass unrecognized request URL through to original backend; true: 404
     * @type {?}
     */
    InMemoryBackendConfigArgs.prototype.passThruUnknownUrl;
    /**
     * true (default) should NOT return the item (204) after a POST. false: return the item (200).
     * @type {?}
     */
    InMemoryBackendConfigArgs.prototype.post204;
    /**
     * false (default) should NOT update existing item with POST. false: OK to update.
     * @type {?}
     */
    InMemoryBackendConfigArgs.prototype.post409;
    /**
     * true (default) should NOT return the item (204) after a POST. false: return the item (200).
     * @type {?}
     */
    InMemoryBackendConfigArgs.prototype.put204;
    /**
     * false (default) if item not found, create as new item; false: should 404.
     * @type {?}
     */
    InMemoryBackendConfigArgs.prototype.put404;
    /**
     * root path _before_ any API call, e.g., ''
     * @type {?}
     */
    InMemoryBackendConfigArgs.prototype.rootPath;
}
/**
 *  InMemoryBackendService configuration options
 *  Usage:
 *    InMemoryWebApiModule.forRoot(InMemHeroService, {delay: 600})
 *
 *  or if providing separately:
 *    provide(InMemoryBackendConfig, {useValue: {delay: 600}}),
 */
export class InMemoryBackendConfig {
    /**
     * @param {?=} config
     */
    constructor(config = {}) {
        Object.assign(this, {
            // default config:
            caseSensitiveSearch: false,
            dataEncapsulation: false,
            // do NOT wrap content within an object with a `data` property
            delay: 500,
            // simulate latency by delaying response
            delete404: false,
            // don't complain if can't find entity to delete
            passThruUnknownUrl: false,
            // 404 if can't process URL
            post204: true,
            // don't return the item after a POST
            post409: false,
            // don't update existing item with that ID
            put204: true,
            // don't return the item after a PUT
            put404: false,
            // create new item if PUT item with that ID not found
            apiBase: undefined,
            // assumed to be the first path segment
            host: undefined,
            // default value is actually set in InMemoryBackendService ctor
            rootPath: undefined // default value is actually set in InMemoryBackendService ctor
        }, config);
    }
}
InMemoryBackendConfig.decorators = [
    { type: Injectable }
];
/** @nocollapse */
InMemoryBackendConfig.ctorParameters = () => [
    { type: InMemoryBackendConfigArgs }
];
/**
 * Return information (UriInfo) about a URI
 * @param {?} str
 * @return {?}
 */
export function parseUri(str) {
    /** @type {?} */
    const URL_REGEX = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
    /** @type {?} */
    const m = URL_REGEX.exec(str);
    /** @type {?} */
    const uri = {
        source: '',
        protocol: '',
        authority: '',
        userInfo: '',
        user: '',
        password: '',
        host: '',
        port: '',
        relative: '',
        path: '',
        directory: '',
        file: '',
        query: '',
        anchor: ''
    };
    /** @type {?} */
    const keys = Object.keys(uri);
    /** @type {?} */
    let i = keys.length;
    while (i--) {
        uri[keys[i]] = m[i] || '';
    }
    return uri;
}
/**
 *
 * Interface for the result of the `parseRequestUrl` method:
 *   Given URL "http://localhost:8080/api/customers/42?foo=1 the default implementation returns
 *     base: 'api/'
 *     collectionName: 'customers'
 *     id: '42'
 *     query: this.createQuery('foo=1')
 *     resourceUrl: 'http://localhost/api/customers/'
 * @record
 */
export function ParsedRequestUrl() { }
/** @type {?} */
ParsedRequestUrl.prototype.apiBase;
/** @type {?} */
ParsedRequestUrl.prototype.collectionName;
/** @type {?} */
ParsedRequestUrl.prototype.id;
/** @type {?} */
ParsedRequestUrl.prototype.query;
/** @type {?} */
ParsedRequestUrl.prototype.resourceUrl;
/**
 * @record
 */
export function PassThruBackend() { }
/**
 * Handle an HTTP request and return an Observable of HTTP response
 * Both the request type and the response type are determined by the supporting HTTP library.
 * @type {?}
 */
PassThruBackend.prototype.handle;
/**
 * @param {?} path
 * @return {?}
 */
export function removeTrailingSlash(path) {
    return path.replace(/\/$/, '');
}
/**
 *  Minimum definition needed by base class
 * @record
 */
export function RequestCore() { }
/** @type {?} */
RequestCore.prototype.url;
/** @type {?|undefined} */
RequestCore.prototype.urlWithParams;
/**
 * Interface for object w/ info about the current request url
 * extracted from an Http Request.
 * Also holds utility methods and configuration data from this service
 * @record
 */
export function RequestInfo() { }
/** @type {?} */
RequestInfo.prototype.req;
/** @type {?} */
RequestInfo.prototype.apiBase;
/** @type {?} */
RequestInfo.prototype.collectionName;
/** @type {?} */
RequestInfo.prototype.collection;
/** @type {?} */
RequestInfo.prototype.headers;
/** @type {?} */
RequestInfo.prototype.method;
/** @type {?} */
RequestInfo.prototype.id;
/** @type {?} */
RequestInfo.prototype.query;
/** @type {?} */
RequestInfo.prototype.resourceUrl;
/** @type {?} */
RequestInfo.prototype.url;
/** @type {?} */
RequestInfo.prototype.utils;
/**
 * Interface for utility methods from this service instance.
 * Useful within an HTTP method override
 * @record
 */
export function RequestInfoUtilities() { }
/**
 * Create a cold response Observable from a factory for ResponseOptions
 * the same way that the in-mem backend service does.
 * \@param resOptionsFactory - creates ResponseOptions when observable is subscribed
 * \@param withDelay - if true (default), add simulated latency delay from configuration
 * @type {?}
 */
RequestInfoUtilities.prototype.createResponse$;
/**
 * Find first instance of item in collection by `item.id`
 * \@param collection
 * \@param id
 * @type {?}
 */
RequestInfoUtilities.prototype.findById;
/**
 * return the current, active configuration which is a blend of defaults and overrides
 * @type {?}
 */
RequestInfoUtilities.prototype.getConfig;
/**
 * Get the in-mem service's copy of the "database"
 * @type {?}
 */
RequestInfoUtilities.prototype.getDb;
/**
 * Get JSON body from the request object
 * @type {?}
 */
RequestInfoUtilities.prototype.getJsonBody;
/**
 * Get location info from a url, even on server where `document` is not defined
 * @type {?}
 */
RequestInfoUtilities.prototype.getLocation;
/**
 * Get (or create) the "real" backend
 * @type {?}
 */
RequestInfoUtilities.prototype.getPassThruBackend;
/**
 * return true if can determine that the collection's `item.id` is a number
 *
 * @type {?}
 */
RequestInfoUtilities.prototype.isCollectionIdNumeric;
/**
 * Parses the request URL into a `ParsedRequestUrl` object.
 * Parsing depends upon certain values of `config`: `apiBase`, `host`, and `urlRoot`.
 * @type {?}
 */
RequestInfoUtilities.prototype.parseRequestUrl;
/** @typedef {?} */
var ResponseInterceptor;
export { ResponseInterceptor };
/**
 * @record
 */
export function ResponseOptions() { }
/**
 * String, Object, ArrayBuffer or Blob representing the body of the {\@link Response}.
 * @type {?|undefined}
 */
ResponseOptions.prototype.body;
/**
 * Response headers
 * @type {?|undefined}
 */
ResponseOptions.prototype.headers;
/**
 * Http {\@link http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html status code}
 * associated with the response.
 * @type {?|undefined}
 */
ResponseOptions.prototype.status;
/**
 * Status text for the status code
 * @type {?|undefined}
 */
ResponseOptions.prototype.statusText;
/**
 * request url
 * @type {?|undefined}
 */
ResponseOptions.prototype.url;
/**
 * Interface of information about a Uri
 * @record
 */
export function UriInfo() { }
/** @type {?} */
UriInfo.prototype.source;
/** @type {?} */
UriInfo.prototype.protocol;
/** @type {?} */
UriInfo.prototype.authority;
/** @type {?} */
UriInfo.prototype.userInfo;
/** @type {?} */
UriInfo.prototype.user;
/** @type {?} */
UriInfo.prototype.password;
/** @type {?} */
UriInfo.prototype.host;
/** @type {?} */
UriInfo.prototype.port;
/** @type {?} */
UriInfo.prototype.relative;
/** @type {?} */
UriInfo.prototype.path;
/** @type {?} */
UriInfo.prototype.directory;
/** @type {?} */
UriInfo.prototype.file;
/** @type {?} */
UriInfo.prototype.query;
/** @type {?} */
UriInfo.prototype.anchor;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9pbi1tZW0vaW50ZXJmYWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CM0MsTUFBTSxPQUFnQixpQkFBaUI7Q0FpQnRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtELE1BQU0sT0FBZ0IseUJBQXlCO0NBbUQ5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVlELE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUFDaEMsWUFBWSxTQUFvQyxFQUFFO1FBQ2hELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFOztZQUVsQixtQkFBbUIsRUFBRSxLQUFLO1lBQzFCLGlCQUFpQixFQUFFLEtBQUs7O1lBQ3hCLEtBQUssRUFBRSxHQUFHOztZQUNWLFNBQVMsRUFBRSxLQUFLOztZQUNoQixrQkFBa0IsRUFBRSxLQUFLOztZQUN6QixPQUFPLEVBQUUsSUFBSTs7WUFDYixPQUFPLEVBQUUsS0FBSzs7WUFDZCxNQUFNLEVBQUUsSUFBSTs7WUFDWixNQUFNLEVBQUUsS0FBSzs7WUFDYixPQUFPLEVBQUUsU0FBUzs7WUFDbEIsSUFBSSxFQUFFLFNBQVM7O1lBQ2YsUUFBUSxFQUFFLFNBQVM7U0FDcEIsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNaOzs7WUFsQkYsVUFBVTs7OztZQUVXLHlCQUF5Qjs7Ozs7OztBQW9CL0MsTUFBTSxVQUFVLFFBQVEsQ0FBQyxHQUFXOztJQUdsQyxNQUFNLFNBQVMsR0FBRyxrTUFBa00sQ0FBQzs7SUFDck4sTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7SUFDOUIsTUFBTSxHQUFHLEdBQVk7UUFDbkIsTUFBTSxFQUFFLEVBQUU7UUFDVixRQUFRLEVBQUUsRUFBRTtRQUNaLFNBQVMsRUFBRSxFQUFFO1FBQ2IsUUFBUSxFQUFFLEVBQUU7UUFDWixJQUFJLEVBQUUsRUFBRTtRQUNSLFFBQVEsRUFBRSxFQUFFO1FBQ1osSUFBSSxFQUFFLEVBQUU7UUFDUixJQUFJLEVBQUUsRUFBRTtRQUNSLFFBQVEsRUFBRSxFQUFFO1FBQ1osSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsRUFBRTtRQUNiLElBQUksRUFBRSxFQUFFO1FBQ1IsS0FBSyxFQUFFLEVBQUU7UUFDVCxNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUM7O0lBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7SUFDOUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUVwQixPQUFPLENBQUMsRUFBRSxFQUFFO1FBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7S0FBRTtJQUMxQyxPQUFPLEdBQUcsQ0FBQztDQUNaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxJQUFZO0lBQzlDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDaEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogIE1pbmltdW0gZGVmaW5pdGlvbiBuZWVkZWQgYnkgYmFzZSBjbGFzc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEhlYWRlcnNDb3JlIHtcbiAgc2V0KG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQgfCBhbnk7XG59XG5cbi8qKlxuKiBJbnRlcmZhY2UgZm9yIGEgY2xhc3MgdGhhdCBjcmVhdGVzIGFuIGluLW1lbW9yeSBkYXRhYmFzZVxuKlxuKiBJdHMgYGNyZWF0ZURiYCBtZXRob2QgY3JlYXRlcyBhIGhhc2ggb2YgbmFtZWQgY29sbGVjdGlvbnMgdGhhdCByZXByZXNlbnRzIHRoZSBkYXRhYmFzZVxuKlxuKiBGb3IgbWF4aW11bSBmbGV4aWJpbGl0eSwgdGhlIHNlcnZpY2UgbWF5IGRlZmluZSBIVFRQIG1ldGhvZCBvdmVycmlkZXMuXG4qIFN1Y2ggbWV0aG9kcyBtdXN0IG1hdGNoIHRoZSBzcGVsbGluZyBvZiBhbiBIVFRQIG1ldGhvZCBpbiBsb3dlciBjYXNlIChlLmcsIFwiZ2V0XCIpLlxuKiBJZiBhIHJlcXVlc3QgaGFzIGEgbWF0Y2hpbmcgbWV0aG9kLCBpdCB3aWxsIGJlIGNhbGxlZCBhcyBpblxuKiBgZ2V0KGluZm86IHJlcXVlc3RJbmZvLCBkYjoge30pYCB3aGVyZSBgZGJgIGlzIHRoZSBkYXRhYmFzZSBvYmplY3QgZGVzY3JpYmVkIGFib3ZlLlxuKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbk1lbW9yeURiU2VydmljZSB7XG4gIC8qKlxuICAqIENyZWF0ZXMgYW4gaW4tbWVtb3J5IFwiZGF0YWJhc2VcIiBoYXNoIHdob3NlIGtleXMgYXJlIGNvbGxlY3Rpb24gbmFtZXNcbiAgKiBhbmQgd2hvc2UgdmFsdWVzIGFyZSBhcnJheXMgb2YgY29sbGVjdGlvbiBvYmplY3RzIHRvIHJldHVybiBvciB1cGRhdGUuXG4gICpcbiAgKiByZXR1cm5zIE9ic2VydmFibGUgb2YgdGhlIGRhdGFiYXNlIGJlY2F1c2UgY291bGQgaGF2ZSB0byBjcmVhdGUgaXQgYXN5bmNocm9ub3VzbHkuXG4gICpcbiAgKiBUaGlzIG1ldGhvZCBtdXN0IGJlIHNhZmUgdG8gY2FsbCByZXBlYXRlZGx5LlxuICAqIEVhY2ggdGltZSBpdCBzaG91bGQgcmV0dXJuIGEgbmV3IG9iamVjdCB3aXRoIG5ldyBhcnJheXMgY29udGFpbmluZyBuZXcgaXRlbSBvYmplY3RzLlxuICAqIFRoaXMgY29uZGl0aW9uIGFsbG93cyB0aGUgaW4tbWVtb3J5IGJhY2tlbmQgc2VydmljZSB0byBtdXRhdGUgdGhlIGNvbGxlY3Rpb25zXG4gICogYW5kIHRoZWlyIGl0ZW1zIHdpdGhvdXQgdG91Y2hpbmcgdGhlIG9yaWdpbmFsIHNvdXJjZSBkYXRhLlxuICAqXG4gICogVGhlIGluLW1lbSBiYWNrZW5kIHNlcnZpY2UgY2FsbHMgdGhpcyBtZXRob2Qgd2l0aG91dCBhIHZhbHVlIHRoZSBmaXJzdCB0aW1lLlxuICAqIFRoZSBzZXJ2aWNlIGNhbGxzIGl0IHdpdGggdGhlIGBSZXF1ZXN0SW5mb2Agd2hlbiBpdCByZWNlaXZlcyBhIFBPU1QgYGNvbW1hbmRzL3Jlc2V0RGJgIHJlcXVlc3QuXG4gICogWW91ciBJbk1lbW9yeURiU2VydmljZSBjYW4gYWRqdXN0IGl0cyBiZWhhdmlvciBhY2NvcmRpbmdseS5cbiAgKi9cbiAgYWJzdHJhY3QgY3JlYXRlRGIocmVxSW5mbz86IFJlcXVlc3RJbmZvKToge30gfCBPYnNlcnZhYmxlPHt9PiB8IFByb21pc2U8e30+O1xufVxuXG4vKipcbiogSW50ZXJmYWNlIGZvciBJbk1lbW9yeUJhY2tlbmQgY29uZmlndXJhdGlvbiBvcHRpb25zXG4qL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEluTWVtb3J5QmFja2VuZENvbmZpZ0FyZ3Mge1xuICAvKipcbiAgICogVGhlIGJhc2UgcGF0aCB0byB0aGUgYXBpLCBlLmcsICdhcGkvJy5cbiAgICogSWYgbm90IHNwZWNpZmllZCB0aGFuIGBwYXJzZVJlcXVlc3RVcmxgIGFzc3VtZXMgaXQgaXMgdGhlIGZpcnN0IHBhdGggc2VnbWVudCBpbiB0aGUgcmVxdWVzdC5cbiAgICovXG4gIGFwaUJhc2U/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBmYWxzZSAoZGVmYXVsdCkgaWYgc2VhcmNoIG1hdGNoIHNob3VsZCBiZSBjYXNlIGluc2Vuc2l0aXZlXG4gICAqL1xuICBjYXNlU2Vuc2l0aXZlU2VhcmNoPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIGZhbHNlIChkZWZhdWx0KSBwdXQgY29udGVudCBkaXJlY3RseSBpbnNpZGUgdGhlIHJlc3BvbnNlIGJvZHkuXG4gICAqIHRydWU6IGVuY2Fwc3VsYXRlIGNvbnRlbnQgaW4gYSBgZGF0YWAgcHJvcGVydHkgaW5zaWRlIHRoZSByZXNwb25zZSBib2R5LCBgeyBkYXRhOiAuLi4gfWAuXG4gICAqL1xuICBkYXRhRW5jYXBzdWxhdGlvbj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBkZWxheSAoaW4gbXMpIHRvIHNpbXVsYXRlIGxhdGVuY3lcbiAgICovXG4gIGRlbGF5PzogbnVtYmVyO1xuICAvKipcbiAgICogZmFsc2UgKGRlZmF1bHQpIHNob3VsZCAyMDQgd2hlbiBvYmplY3QtdG8tZGVsZXRlIG5vdCBmb3VuZDsgdHJ1ZTogNDA0XG4gICAqL1xuICBkZWxldGU0MDQ/OiBib29sZWFuO1xuICAvKipcbiAgICogaG9zdCBmb3IgdGhpcyBzZXJ2aWNlLCBlLmcuLCAnbG9jYWxob3N0J1xuICAgKi9cbiAgaG9zdD86IHN0cmluZztcbiAgLyoqXG4gICAqIGZhbHNlIChkZWZhdWx0KSBzaG91bGQgcGFzcyB1bnJlY29nbml6ZWQgcmVxdWVzdCBVUkwgdGhyb3VnaCB0byBvcmlnaW5hbCBiYWNrZW5kOyB0cnVlOiA0MDRcbiAgICovXG4gIHBhc3NUaHJ1VW5rbm93blVybD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiB0cnVlIChkZWZhdWx0KSBzaG91bGQgTk9UIHJldHVybiB0aGUgaXRlbSAoMjA0KSBhZnRlciBhIFBPU1QuIGZhbHNlOiByZXR1cm4gdGhlIGl0ZW0gKDIwMCkuXG4gICAqL1xuICBwb3N0MjA0PzogYm9vbGVhbjtcbiAgLyoqXG4gICogZmFsc2UgKGRlZmF1bHQpIHNob3VsZCBOT1QgdXBkYXRlIGV4aXN0aW5nIGl0ZW0gd2l0aCBQT1NULiBmYWxzZTogT0sgdG8gdXBkYXRlLlxuICAqL1xuICBwb3N0NDA5PzogYm9vbGVhbjtcbiAgLyoqXG4gICogdHJ1ZSAoZGVmYXVsdCkgc2hvdWxkIE5PVCByZXR1cm4gdGhlIGl0ZW0gKDIwNCkgYWZ0ZXIgYSBQT1NULiBmYWxzZTogcmV0dXJuIHRoZSBpdGVtICgyMDApLlxuICAqL1xuICBwdXQyMDQ/OiBib29sZWFuO1xuICAvKipcbiAgICogZmFsc2UgKGRlZmF1bHQpIGlmIGl0ZW0gbm90IGZvdW5kLCBjcmVhdGUgYXMgbmV3IGl0ZW07IGZhbHNlOiBzaG91bGQgNDA0LlxuICAgKi9cbiAgcHV0NDA0PzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIHJvb3QgcGF0aCBfYmVmb3JlXyBhbnkgQVBJIGNhbGwsIGUuZy4sICcnXG4gICAqL1xuICByb290UGF0aD86IHN0cmluZztcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vKipcbiogIEluTWVtb3J5QmFja2VuZFNlcnZpY2UgY29uZmlndXJhdGlvbiBvcHRpb25zXG4qICBVc2FnZTpcbiogICAgSW5NZW1vcnlXZWJBcGlNb2R1bGUuZm9yUm9vdChJbk1lbUhlcm9TZXJ2aWNlLCB7ZGVsYXk6IDYwMH0pXG4qXG4qICBvciBpZiBwcm92aWRpbmcgc2VwYXJhdGVseTpcbiogICAgcHJvdmlkZShJbk1lbW9yeUJhY2tlbmRDb25maWcsIHt1c2VWYWx1ZToge2RlbGF5OiA2MDB9fSksXG4qL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEluTWVtb3J5QmFja2VuZENvbmZpZyBpbXBsZW1lbnRzIEluTWVtb3J5QmFja2VuZENvbmZpZ0FyZ3Mge1xuICBjb25zdHJ1Y3Rvcihjb25maWc6IEluTWVtb3J5QmFja2VuZENvbmZpZ0FyZ3MgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgICAgLy8gZGVmYXVsdCBjb25maWc6XG4gICAgICBjYXNlU2Vuc2l0aXZlU2VhcmNoOiBmYWxzZSxcbiAgICAgIGRhdGFFbmNhcHN1bGF0aW9uOiBmYWxzZSwgLy8gZG8gTk9UIHdyYXAgY29udGVudCB3aXRoaW4gYW4gb2JqZWN0IHdpdGggYSBgZGF0YWAgcHJvcGVydHlcbiAgICAgIGRlbGF5OiA1MDAsIC8vIHNpbXVsYXRlIGxhdGVuY3kgYnkgZGVsYXlpbmcgcmVzcG9uc2VcbiAgICAgIGRlbGV0ZTQwNDogZmFsc2UsIC8vIGRvbid0IGNvbXBsYWluIGlmIGNhbid0IGZpbmQgZW50aXR5IHRvIGRlbGV0ZVxuICAgICAgcGFzc1RocnVVbmtub3duVXJsOiBmYWxzZSwgLy8gNDA0IGlmIGNhbid0IHByb2Nlc3MgVVJMXG4gICAgICBwb3N0MjA0OiB0cnVlLCAvLyBkb24ndCByZXR1cm4gdGhlIGl0ZW0gYWZ0ZXIgYSBQT1NUXG4gICAgICBwb3N0NDA5OiBmYWxzZSwgLy8gZG9uJ3QgdXBkYXRlIGV4aXN0aW5nIGl0ZW0gd2l0aCB0aGF0IElEXG4gICAgICBwdXQyMDQ6IHRydWUsICAvLyBkb24ndCByZXR1cm4gdGhlIGl0ZW0gYWZ0ZXIgYSBQVVRcbiAgICAgIHB1dDQwNDogZmFsc2UsIC8vIGNyZWF0ZSBuZXcgaXRlbSBpZiBQVVQgaXRlbSB3aXRoIHRoYXQgSUQgbm90IGZvdW5kXG4gICAgICBhcGlCYXNlOiB1bmRlZmluZWQsIC8vIGFzc3VtZWQgdG8gYmUgdGhlIGZpcnN0IHBhdGggc2VnbWVudFxuICAgICAgaG9zdDogdW5kZWZpbmVkLCAgICAvLyBkZWZhdWx0IHZhbHVlIGlzIGFjdHVhbGx5IHNldCBpbiBJbk1lbW9yeUJhY2tlbmRTZXJ2aWNlIGN0b3JcbiAgICAgIHJvb3RQYXRoOiB1bmRlZmluZWQgLy8gZGVmYXVsdCB2YWx1ZSBpcyBhY3R1YWxseSBzZXQgaW4gSW5NZW1vcnlCYWNrZW5kU2VydmljZSBjdG9yXG4gICAgfSwgY29uZmlnKTtcbiAgfVxufVxuXG4vKiogUmV0dXJuIGluZm9ybWF0aW9uIChVcmlJbmZvKSBhYm91dCBhIFVSSSAgKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVVyaShzdHI6IHN0cmluZyk6IFVyaUluZm8ge1xuICAvLyBBZGFwdGVkIGZyb20gcGFyc2V1cmkgcGFja2FnZSAtIGh0dHA6Ly9ibG9nLnN0ZXZlbmxldml0aGFuLmNvbS9hcmNoaXZlcy9wYXJzZXVyaVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gIGNvbnN0IFVSTF9SRUdFWCA9IC9eKD86KD8hW146QF0rOlteOkBcXC9dKkApKFteOlxcLz8jLl0rKTopPyg/OlxcL1xcLyk/KCg/OigoW146QF0qKSg/OjooW146QF0qKSk/KT9AKT8oW146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcbiAgY29uc3QgbSA9IFVSTF9SRUdFWC5leGVjKHN0cik7XG4gIGNvbnN0IHVyaTogVXJpSW5mbyA9IHtcbiAgICBzb3VyY2U6ICcnLFxuICAgIHByb3RvY29sOiAnJyxcbiAgICBhdXRob3JpdHk6ICcnLFxuICAgIHVzZXJJbmZvOiAnJyxcbiAgICB1c2VyOiAnJyxcbiAgICBwYXNzd29yZDogJycsXG4gICAgaG9zdDogJycsXG4gICAgcG9ydDogJycsXG4gICAgcmVsYXRpdmU6ICcnLFxuICAgIHBhdGg6ICcnLFxuICAgIGRpcmVjdG9yeTogJycsXG4gICAgZmlsZTogJycsXG4gICAgcXVlcnk6ICcnLFxuICAgIGFuY2hvcjogJydcbiAgfTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHVyaSk7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG5cbiAgd2hpbGUgKGktLSkgeyB1cmlba2V5c1tpXV0gPSBtW2ldIHx8ICcnOyB9XG4gIHJldHVybiB1cmk7XG59XG5cbi8qKlxuICpcbiAqIEludGVyZmFjZSBmb3IgdGhlIHJlc3VsdCBvZiB0aGUgYHBhcnNlUmVxdWVzdFVybGAgbWV0aG9kOlxuICogICBHaXZlbiBVUkwgXCJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL2N1c3RvbWVycy80Mj9mb289MSB0aGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiByZXR1cm5zXG4gKiAgICAgYmFzZTogJ2FwaS8nXG4gKiAgICAgY29sbGVjdGlvbk5hbWU6ICdjdXN0b21lcnMnXG4gKiAgICAgaWQ6ICc0MidcbiAqICAgICBxdWVyeTogdGhpcy5jcmVhdGVRdWVyeSgnZm9vPTEnKVxuICogICAgIHJlc291cmNlVXJsOiAnaHR0cDovL2xvY2FsaG9zdC9hcGkvY3VzdG9tZXJzLydcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQYXJzZWRSZXF1ZXN0VXJsIHtcbiAgYXBpQmFzZTogc3RyaW5nOyAgICAgICAgICAgLy8gdGhlIHNsYXNoLXRlcm1pbmF0ZWQgXCJiYXNlXCIgZm9yIGFwaSByZXF1ZXN0cyAoZS5nLiBgYXBpL2ApXG4gIGNvbGxlY3Rpb25OYW1lOiBzdHJpbmc7IC8vIHRoZSBuYW1lIG9mIHRoZSBjb2xsZWN0aW9uIG9mIGRhdGEgaXRlbXMgKGUuZy4sYGN1c3RvbWVyc2ApXG4gIGlkOiBzdHJpbmc7ICAgICAgICAgICAgIC8vIHRoZSAob3B0aW9uYWwpIGlkIG9mIHRoZSBpdGVtIGluIHRoZSBjb2xsZWN0aW9uIChlLmcuLCBgNDJgKVxuICBxdWVyeTogTWFwPHN0cmluZywgc3RyaW5nW10+OyAvLyB0aGUgcXVlcnkgcGFyYW1ldGVycztcbiAgcmVzb3VyY2VVcmw6IHN0cmluZzsgICAgLy8gdGhlIGVmZmVjdGl2ZSBVUkwgZm9yIHRoZSByZXNvdXJjZSAoZS5nLiwgJ2h0dHA6Ly9sb2NhbGhvc3QvYXBpL2N1c3RvbWVycy8nKVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhc3NUaHJ1QmFja2VuZCB7XG4gIC8qKlxuICAgKiBIYW5kbGUgYW4gSFRUUCByZXF1ZXN0IGFuZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBIVFRQIHJlc3BvbnNlXG4gICAqIEJvdGggdGhlIHJlcXVlc3QgdHlwZSBhbmQgdGhlIHJlc3BvbnNlIHR5cGUgYXJlIGRldGVybWluZWQgYnkgdGhlIHN1cHBvcnRpbmcgSFRUUCBsaWJyYXJ5LlxuICAgKi9cbiAgaGFuZGxlKHJlcTogYW55KTogT2JzZXJ2YWJsZTxhbnk+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlVHJhaWxpbmdTbGFzaChwYXRoOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwvJC8sICcnKTtcbn1cblxuLyoqXG4gKiAgTWluaW11bSBkZWZpbml0aW9uIG5lZWRlZCBieSBiYXNlIGNsYXNzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdENvcmUge1xuICB1cmw6IHN0cmluZzsgLy8gcmVxdWVzdCBVUkxcbiAgdXJsV2l0aFBhcmFtcz86IHN0cmluZzsgLy8gcmVxdWVzdCBVUkwgd2l0aCBxdWVyeSBwYXJhbWV0ZXJzIGFkZGVkIGJ5IGBIdHRwUGFyYW1zYFxufVxuXG4vKipcbiogSW50ZXJmYWNlIGZvciBvYmplY3Qgdy8gaW5mbyBhYm91dCB0aGUgY3VycmVudCByZXF1ZXN0IHVybFxuKiBleHRyYWN0ZWQgZnJvbSBhbiBIdHRwIFJlcXVlc3QuXG4qIEFsc28gaG9sZHMgdXRpbGl0eSBtZXRob2RzIGFuZCBjb25maWd1cmF0aW9uIGRhdGEgZnJvbSB0aGlzIHNlcnZpY2VcbiovXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RJbmZvIHtcbiAgcmVxOiBSZXF1ZXN0Q29yZTsgLy8gY29uY3JldGUgdHlwZSBkZXBlbmRzIHVwb24gdGhlIEh0dHAgbGlicmFyeVxuICBhcGlCYXNlOiBzdHJpbmc7XG4gIGNvbGxlY3Rpb25OYW1lOiBzdHJpbmc7XG4gIGNvbGxlY3Rpb246IGFueTtcbiAgaGVhZGVyczogSGVhZGVyc0NvcmU7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBpZDogYW55O1xuICBxdWVyeTogTWFwPHN0cmluZywgc3RyaW5nW10+O1xuICByZXNvdXJjZVVybDogc3RyaW5nO1xuICB1cmw6IHN0cmluZzsgLy8gcmVxdWVzdCBVUkxcbiAgdXRpbHM6IFJlcXVlc3RJbmZvVXRpbGl0aWVzO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgdXRpbGl0eSBtZXRob2RzIGZyb20gdGhpcyBzZXJ2aWNlIGluc3RhbmNlLlxuICogVXNlZnVsIHdpdGhpbiBhbiBIVFRQIG1ldGhvZCBvdmVycmlkZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RJbmZvVXRpbGl0aWVzIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIGNvbGQgcmVzcG9uc2UgT2JzZXJ2YWJsZSBmcm9tIGEgZmFjdG9yeSBmb3IgUmVzcG9uc2VPcHRpb25zXG4gICAqIHRoZSBzYW1lIHdheSB0aGF0IHRoZSBpbi1tZW0gYmFja2VuZCBzZXJ2aWNlIGRvZXMuXG4gICAqIEBwYXJhbSByZXNPcHRpb25zRmFjdG9yeSAtIGNyZWF0ZXMgUmVzcG9uc2VPcHRpb25zIHdoZW4gb2JzZXJ2YWJsZSBpcyBzdWJzY3JpYmVkXG4gICAqIEBwYXJhbSB3aXRoRGVsYXkgLSBpZiB0cnVlIChkZWZhdWx0KSwgYWRkIHNpbXVsYXRlZCBsYXRlbmN5IGRlbGF5IGZyb20gY29uZmlndXJhdGlvblxuICAgKi9cbiAgY3JlYXRlUmVzcG9uc2UkOiAocmVzT3B0aW9uc0ZhY3Rvcnk6ICgpID0+IFJlc3BvbnNlT3B0aW9ucykgPT4gT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIC8qKlxuICAgKiBGaW5kIGZpcnN0IGluc3RhbmNlIG9mIGl0ZW0gaW4gY29sbGVjdGlvbiBieSBgaXRlbS5pZGBcbiAgICogQHBhcmFtIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIGlkXG4gICAqL1xuICBmaW5kQnlJZDxUIGV4dGVuZHMgeyBpZDogYW55IH0+KGNvbGxlY3Rpb246IFRbXSwgaWQ6IGFueSk6IFQ7XG5cbiAgLyoqIHJldHVybiB0aGUgY3VycmVudCwgYWN0aXZlIGNvbmZpZ3VyYXRpb24gd2hpY2ggaXMgYSBibGVuZCBvZiBkZWZhdWx0cyBhbmQgb3ZlcnJpZGVzICovXG4gIGdldENvbmZpZygpOiBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzO1xuXG4gIC8qKiBHZXQgdGhlIGluLW1lbSBzZXJ2aWNlJ3MgY29weSBvZiB0aGUgXCJkYXRhYmFzZVwiICovXG4gIGdldERiKCk6IHt9O1xuXG4gIC8qKiBHZXQgSlNPTiBib2R5IGZyb20gdGhlIHJlcXVlc3Qgb2JqZWN0ICovXG4gIGdldEpzb25Cb2R5KHJlcTogYW55KTogYW55O1xuXG4gIC8qKiBHZXQgbG9jYXRpb24gaW5mbyBmcm9tIGEgdXJsLCBldmVuIG9uIHNlcnZlciB3aGVyZSBgZG9jdW1lbnRgIGlzIG5vdCBkZWZpbmVkICovXG4gIGdldExvY2F0aW9uKHVybDogc3RyaW5nKTogVXJpSW5mbztcblxuICAvKiogR2V0IChvciBjcmVhdGUpIHRoZSBcInJlYWxcIiBiYWNrZW5kICovXG4gIGdldFBhc3NUaHJ1QmFja2VuZCgpOiBQYXNzVGhydUJhY2tlbmQ7XG5cbiAgLyoqXG4gICAqIHJldHVybiB0cnVlIGlmIGNhbiBkZXRlcm1pbmUgdGhhdCB0aGUgY29sbGVjdGlvbidzIGBpdGVtLmlkYCBpcyBhIG51bWJlclxuICAgKiAqL1xuICBpc0NvbGxlY3Rpb25JZE51bWVyaWM8VCBleHRlbmRzIHsgaWQ6IGFueSB9Pihjb2xsZWN0aW9uOiBUW10sIGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIHJlcXVlc3QgVVJMIGludG8gYSBgUGFyc2VkUmVxdWVzdFVybGAgb2JqZWN0LlxuICAgKiBQYXJzaW5nIGRlcGVuZHMgdXBvbiBjZXJ0YWluIHZhbHVlcyBvZiBgY29uZmlnYDogYGFwaUJhc2VgLCBgaG9zdGAsIGFuZCBgdXJsUm9vdGAuXG4gICAqL1xuICBwYXJzZVJlcXVlc3RVcmwodXJsOiBzdHJpbmcpOiBQYXJzZWRSZXF1ZXN0VXJsO1xufVxuXG4vKipcbiAqIFByb3ZpZGUgYSBgcmVzcG9uc2VJbnRlcmNlcHRvcmAgbWV0aG9kIG9mIHRoaXMgdHlwZSBpbiB5b3VyIGBpbk1lbURiU2VydmljZWAgdG9cbiAqIG1vcnBoIHRoZSByZXNwb25zZSBvcHRpb25zIGNyZWF0ZWQgaW4gdGhlIGBjb2xsZWN0aW9uSGFuZGxlcmAuXG4gKi9cbmV4cG9ydCB0eXBlIFJlc3BvbnNlSW50ZXJjZXB0b3IgPSAocmVzOiBSZXNwb25zZU9wdGlvbnMsIHJpOiBSZXF1ZXN0SW5mbykgPT4gUmVzcG9uc2VPcHRpb25zO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3BvbnNlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBTdHJpbmcsIE9iamVjdCwgQXJyYXlCdWZmZXIgb3IgQmxvYiByZXByZXNlbnRpbmcgdGhlIGJvZHkgb2YgdGhlIHtAbGluayBSZXNwb25zZX0uXG4gICAqL1xuICBib2R5Pzogc3RyaW5nIHwgT2JqZWN0IHwgQXJyYXlCdWZmZXIgfCBCbG9iO1xuXG4gIC8qKlxuICAgKiBSZXNwb25zZSBoZWFkZXJzXG4gICAqL1xuICBoZWFkZXJzPzogSGVhZGVyc0NvcmU7XG5cbiAgLyoqXG4gICAqIEh0dHAge0BsaW5rIGh0dHA6Ly93d3cudzMub3JnL1Byb3RvY29scy9yZmMyNjE2L3JmYzI2MTYtc2VjMTAuaHRtbCBzdGF0dXMgY29kZX1cbiAgICogYXNzb2NpYXRlZCB3aXRoIHRoZSByZXNwb25zZS5cbiAgICovXG4gIHN0YXR1cz86IG51bWJlcjtcblxuICAvKipcbiAgICogU3RhdHVzIHRleHQgZm9yIHRoZSBzdGF0dXMgY29kZVxuICAgKi9cbiAgc3RhdHVzVGV4dD86IHN0cmluZztcbiAgLyoqXG4gICAqIHJlcXVlc3QgdXJsXG4gICAqL1xuICB1cmw/OiBzdHJpbmc7XG59XG5cbi8qKiBJbnRlcmZhY2Ugb2YgaW5mb3JtYXRpb24gYWJvdXQgYSBVcmkgICovXG5leHBvcnQgaW50ZXJmYWNlIFVyaUluZm8ge1xuICBzb3VyY2U6IHN0cmluZztcbiAgcHJvdG9jb2w6IHN0cmluZztcbiAgYXV0aG9yaXR5OiBzdHJpbmc7XG4gIHVzZXJJbmZvOiBzdHJpbmc7XG4gIHVzZXI6IHN0cmluZztcbiAgcGFzc3dvcmQ6IHN0cmluZztcbiAgaG9zdDogc3RyaW5nO1xuICBwb3J0OiBzdHJpbmc7XG4gIHJlbGF0aXZlOiBzdHJpbmc7XG4gIHBhdGg6IHN0cmluZztcbiAgZGlyZWN0b3J5OiBzdHJpbmc7XG4gIGZpbGU6IHN0cmluZztcbiAgcXVlcnk6IHN0cmluZztcbiAgYW5jaG9yOiBzdHJpbmc7XG59XG4iXX0=