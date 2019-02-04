/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 *  Minimum definition needed by base class
 * @record
 */
export function HeadersCore() { }
if (false) {
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    HeadersCore.prototype.set = function (name, value) { };
}
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
/////////////////////////////////
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
    // Adapted from parseuri package - http://blog.stevenlevithan.com/archives/parseuri
    // tslint:disable-next-line:max-line-length
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
if (false) {
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
}
/**
 * @record
 */
export function PassThruBackend() { }
if (false) {
    /**
     * Handle an HTTP request and return an Observable of HTTP response
     * Both the request type and the response type are determined by the supporting HTTP library.
     * @param {?} req
     * @return {?}
     */
    PassThruBackend.prototype.handle = function (req) { };
}
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
if (false) {
    /** @type {?} */
    RequestCore.prototype.url;
    /** @type {?|undefined} */
    RequestCore.prototype.urlWithParams;
}
/**
 * Interface for object w/ info about the current request url
 * extracted from an Http Request.
 * Also holds utility methods and configuration data from this service
 * @record
 */
export function RequestInfo() { }
if (false) {
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
}
/**
 * Interface for utility methods from this service instance.
 * Useful within an HTTP method override
 * @record
 */
export function RequestInfoUtilities() { }
if (false) {
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
     * @template T
     * @param {?} collection
     * @param {?} id
     * @return {?}
     */
    RequestInfoUtilities.prototype.findById = function (collection, id) { };
    /**
     * return the current, active configuration which is a blend of defaults and overrides
     * @return {?}
     */
    RequestInfoUtilities.prototype.getConfig = function () { };
    /**
     * Get the in-mem service's copy of the "database"
     * @return {?}
     */
    RequestInfoUtilities.prototype.getDb = function () { };
    /**
     * Get JSON body from the request object
     * @param {?} req
     * @return {?}
     */
    RequestInfoUtilities.prototype.getJsonBody = function (req) { };
    /**
     * Get location info from a url, even on server where `document` is not defined
     * @param {?} url
     * @return {?}
     */
    RequestInfoUtilities.prototype.getLocation = function (url) { };
    /**
     * Get (or create) the "real" backend
     * @return {?}
     */
    RequestInfoUtilities.prototype.getPassThruBackend = function () { };
    /**
     * return true if can determine that the collection's `item.id` is a number
     *
     * @template T
     * @param {?} collection
     * @param {?} collectionName
     * @return {?}
     */
    RequestInfoUtilities.prototype.isCollectionIdNumeric = function (collection, collectionName) { };
    /**
     * Parses the request URL into a `ParsedRequestUrl` object.
     * Parsing depends upon certain values of `config`: `apiBase`, `host`, and `urlRoot`.
     * @param {?} url
     * @return {?}
     */
    RequestInfoUtilities.prototype.parseRequestUrl = function (url) { };
}
/**
 * @record
 */
export function ResponseOptions() { }
if (false) {
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
}
/**
 * Interface of information about a Uri
 * @record
 */
export function UriInfo() { }
if (false) {
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItaW4tbWVtb3J5LXdlYi1hcGkvIiwic291cmNlcyI6WyJpbnRlcmZhY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQU0zQyxpQ0FFQzs7Ozs7OztJQURDLHVEQUE2Qzs7Ozs7Ozs7Ozs7OztBQWEvQyxNQUFNLE9BQWdCLGlCQUFpQjtDQWlCdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBREMsOERBQTRFOzs7Ozs7QUFNOUUsTUFBTSxPQUFnQix5QkFBeUI7Q0FtRDlDOzs7Ozs7O0lBOUNDLDRDQUFpQjs7Ozs7SUFJakIsd0RBQThCOzs7Ozs7SUFLOUIsc0RBQTRCOzs7OztJQUk1QiwwQ0FBZTs7Ozs7SUFJZiw4Q0FBb0I7Ozs7O0lBSXBCLHlDQUFjOzs7OztJQUlkLHVEQUE2Qjs7Ozs7SUFJN0IsNENBQWtCOzs7OztJQUlsQiw0Q0FBa0I7Ozs7O0lBSWxCLDJDQUFpQjs7Ozs7SUFJakIsMkNBQWlCOzs7OztJQUlqQiw2Q0FBa0I7Ozs7Ozs7Ozs7O0FBYXBCLE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUFDaEMsWUFBWSxTQUFvQyxFQUFFO1FBQ2hELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFOztZQUVsQixtQkFBbUIsRUFBRSxLQUFLO1lBQzFCLGlCQUFpQixFQUFFLEtBQUs7O1lBQ3hCLEtBQUssRUFBRSxHQUFHOztZQUNWLFNBQVMsRUFBRSxLQUFLOztZQUNoQixrQkFBa0IsRUFBRSxLQUFLOztZQUN6QixPQUFPLEVBQUUsSUFBSTs7WUFDYixPQUFPLEVBQUUsS0FBSzs7WUFDZCxNQUFNLEVBQUUsSUFBSTs7WUFDWixNQUFNLEVBQUUsS0FBSzs7WUFDYixPQUFPLEVBQUUsU0FBUzs7WUFDbEIsSUFBSSxFQUFFLFNBQVM7O1lBQ2YsUUFBUSxFQUFFLFNBQVMsQ0FBQywrREFBK0Q7U0FDcEYsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNiLENBQUM7OztZQWxCRixVQUFVOzs7O1lBRVcseUJBQXlCOzs7Ozs7O0FBb0IvQyxNQUFNLFVBQVUsUUFBUSxDQUFDLEdBQVc7Ozs7VUFHNUIsU0FBUyxHQUFHLGtNQUFrTTs7VUFDOU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOztVQUN2QixHQUFHLEdBQVk7UUFDbkIsTUFBTSxFQUFFLEVBQUU7UUFDVixRQUFRLEVBQUUsRUFBRTtRQUNaLFNBQVMsRUFBRSxFQUFFO1FBQ2IsUUFBUSxFQUFFLEVBQUU7UUFDWixJQUFJLEVBQUUsRUFBRTtRQUNSLFFBQVEsRUFBRSxFQUFFO1FBQ1osSUFBSSxFQUFFLEVBQUU7UUFDUixJQUFJLEVBQUUsRUFBRTtRQUNSLFFBQVEsRUFBRSxFQUFFO1FBQ1osSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsRUFBRTtRQUNiLElBQUksRUFBRSxFQUFFO1FBQ1IsS0FBSyxFQUFFLEVBQUU7UUFDVCxNQUFNLEVBQUUsRUFBRTtLQUNYOztVQUNLLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7UUFDekIsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNO0lBRW5CLE9BQU8sQ0FBQyxFQUFFLEVBQUU7UUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUFFO0lBQzFDLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQzs7Ozs7Ozs7Ozs7O0FBWUQsc0NBTUM7OztJQUxDLG1DQUFnQjs7SUFDaEIsMENBQXVCOztJQUN2Qiw4QkFBVzs7SUFDWCxpQ0FBNkI7O0lBQzdCLHVDQUFvQjs7Ozs7QUFHdEIscUNBTUM7Ozs7Ozs7O0lBREMsc0RBQWtDOzs7Ozs7QUFHcEMsTUFBTSxVQUFVLG1CQUFtQixDQUFDLElBQVk7SUFDOUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNqQyxDQUFDOzs7OztBQUtELGlDQUdDOzs7SUFGQywwQkFBWTs7SUFDWixvQ0FBdUI7Ozs7Ozs7O0FBUXpCLGlDQVlDOzs7SUFYQywwQkFBaUI7O0lBQ2pCLDhCQUFnQjs7SUFDaEIscUNBQXVCOztJQUN2QixpQ0FBZ0I7O0lBQ2hCLDhCQUFxQjs7SUFDckIsNkJBQWU7O0lBQ2YseUJBQVE7O0lBQ1IsNEJBQTZCOztJQUM3QixrQ0FBb0I7O0lBQ3BCLDBCQUFZOztJQUNaLDRCQUE0Qjs7Ozs7OztBQU85QiwwQ0F5Q0M7Ozs7Ozs7OztJQWxDQywrQ0FBK0U7Ozs7Ozs7O0lBTy9FLHdFQUE2RDs7Ozs7SUFHN0QsMkRBQXVDOzs7OztJQUd2Qyx1REFBWTs7Ozs7O0lBR1osZ0VBQTJCOzs7Ozs7SUFHM0IsZ0VBQWtDOzs7OztJQUdsQyxvRUFBc0M7Ozs7Ozs7OztJQUt0QyxpR0FBK0Y7Ozs7Ozs7SUFNL0Ysb0VBQStDOzs7OztBQVNqRCxxQ0F5QkM7Ozs7OztJQXJCQywrQkFBNEM7Ozs7O0lBSzVDLGtDQUFzQjs7Ozs7O0lBTXRCLGlDQUFnQjs7Ozs7SUFLaEIscUNBQW9COzs7OztJQUlwQiw4QkFBYTs7Ozs7O0FBSWYsNkJBZUM7OztJQWRDLHlCQUFlOztJQUNmLDJCQUFpQjs7SUFDakIsNEJBQWtCOztJQUNsQiwyQkFBaUI7O0lBQ2pCLHVCQUFhOztJQUNiLDJCQUFpQjs7SUFDakIsdUJBQWE7O0lBQ2IsdUJBQWE7O0lBQ2IsMkJBQWlCOztJQUNqQix1QkFBYTs7SUFDYiw0QkFBa0I7O0lBQ2xCLHVCQUFhOztJQUNiLHdCQUFjOztJQUNkLHlCQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqICBNaW5pbXVtIGRlZmluaXRpb24gbmVlZGVkIGJ5IGJhc2UgY2xhc3NcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBIZWFkZXJzQ29yZSB7XG4gIHNldChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHwgYW55O1xufVxuXG4vKipcbiogSW50ZXJmYWNlIGZvciBhIGNsYXNzIHRoYXQgY3JlYXRlcyBhbiBpbi1tZW1vcnkgZGF0YWJhc2VcbipcbiogSXRzIGBjcmVhdGVEYmAgbWV0aG9kIGNyZWF0ZXMgYSBoYXNoIG9mIG5hbWVkIGNvbGxlY3Rpb25zIHRoYXQgcmVwcmVzZW50cyB0aGUgZGF0YWJhc2VcbipcbiogRm9yIG1heGltdW0gZmxleGliaWxpdHksIHRoZSBzZXJ2aWNlIG1heSBkZWZpbmUgSFRUUCBtZXRob2Qgb3ZlcnJpZGVzLlxuKiBTdWNoIG1ldGhvZHMgbXVzdCBtYXRjaCB0aGUgc3BlbGxpbmcgb2YgYW4gSFRUUCBtZXRob2QgaW4gbG93ZXIgY2FzZSAoZS5nLCBcImdldFwiKS5cbiogSWYgYSByZXF1ZXN0IGhhcyBhIG1hdGNoaW5nIG1ldGhvZCwgaXQgd2lsbCBiZSBjYWxsZWQgYXMgaW5cbiogYGdldChpbmZvOiByZXF1ZXN0SW5mbywgZGI6IHt9KWAgd2hlcmUgYGRiYCBpcyB0aGUgZGF0YWJhc2Ugb2JqZWN0IGRlc2NyaWJlZCBhYm92ZS5cbiovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW5NZW1vcnlEYlNlcnZpY2Uge1xuICAvKipcbiAgKiBDcmVhdGVzIGFuIGluLW1lbW9yeSBcImRhdGFiYXNlXCIgaGFzaCB3aG9zZSBrZXlzIGFyZSBjb2xsZWN0aW9uIG5hbWVzXG4gICogYW5kIHdob3NlIHZhbHVlcyBhcmUgYXJyYXlzIG9mIGNvbGxlY3Rpb24gb2JqZWN0cyB0byByZXR1cm4gb3IgdXBkYXRlLlxuICAqXG4gICogcmV0dXJucyBPYnNlcnZhYmxlIG9mIHRoZSBkYXRhYmFzZSBiZWNhdXNlIGNvdWxkIGhhdmUgdG8gY3JlYXRlIGl0IGFzeW5jaHJvbm91c2x5LlxuICAqXG4gICogVGhpcyBtZXRob2QgbXVzdCBiZSBzYWZlIHRvIGNhbGwgcmVwZWF0ZWRseS5cbiAgKiBFYWNoIHRpbWUgaXQgc2hvdWxkIHJldHVybiBhIG5ldyBvYmplY3Qgd2l0aCBuZXcgYXJyYXlzIGNvbnRhaW5pbmcgbmV3IGl0ZW0gb2JqZWN0cy5cbiAgKiBUaGlzIGNvbmRpdGlvbiBhbGxvd3MgdGhlIGluLW1lbW9yeSBiYWNrZW5kIHNlcnZpY2UgdG8gbXV0YXRlIHRoZSBjb2xsZWN0aW9uc1xuICAqIGFuZCB0aGVpciBpdGVtcyB3aXRob3V0IHRvdWNoaW5nIHRoZSBvcmlnaW5hbCBzb3VyY2UgZGF0YS5cbiAgKlxuICAqIFRoZSBpbi1tZW0gYmFja2VuZCBzZXJ2aWNlIGNhbGxzIHRoaXMgbWV0aG9kIHdpdGhvdXQgYSB2YWx1ZSB0aGUgZmlyc3QgdGltZS5cbiAgKiBUaGUgc2VydmljZSBjYWxscyBpdCB3aXRoIHRoZSBgUmVxdWVzdEluZm9gIHdoZW4gaXQgcmVjZWl2ZXMgYSBQT1NUIGBjb21tYW5kcy9yZXNldERiYCByZXF1ZXN0LlxuICAqIFlvdXIgSW5NZW1vcnlEYlNlcnZpY2UgY2FuIGFkanVzdCBpdHMgYmVoYXZpb3IgYWNjb3JkaW5nbHkuXG4gICovXG4gIGFic3RyYWN0IGNyZWF0ZURiKHJlcUluZm8/OiBSZXF1ZXN0SW5mbyk6IHt9IHwgT2JzZXJ2YWJsZTx7fT4gfCBQcm9taXNlPHt9Pjtcbn1cblxuLyoqXG4qIEludGVyZmFjZSBmb3IgSW5NZW1vcnlCYWNrZW5kIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzIHtcbiAgLyoqXG4gICAqIFRoZSBiYXNlIHBhdGggdG8gdGhlIGFwaSwgZS5nLCAnYXBpLycuXG4gICAqIElmIG5vdCBzcGVjaWZpZWQgdGhhbiBgcGFyc2VSZXF1ZXN0VXJsYCBhc3N1bWVzIGl0IGlzIHRoZSBmaXJzdCBwYXRoIHNlZ21lbnQgaW4gdGhlIHJlcXVlc3QuXG4gICAqL1xuICBhcGlCYXNlPzogc3RyaW5nO1xuICAvKipcbiAgICogZmFsc2UgKGRlZmF1bHQpIGlmIHNlYXJjaCBtYXRjaCBzaG91bGQgYmUgY2FzZSBpbnNlbnNpdGl2ZVxuICAgKi9cbiAgY2FzZVNlbnNpdGl2ZVNlYXJjaD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBmYWxzZSAoZGVmYXVsdCkgcHV0IGNvbnRlbnQgZGlyZWN0bHkgaW5zaWRlIHRoZSByZXNwb25zZSBib2R5LlxuICAgKiB0cnVlOiBlbmNhcHN1bGF0ZSBjb250ZW50IGluIGEgYGRhdGFgIHByb3BlcnR5IGluc2lkZSB0aGUgcmVzcG9uc2UgYm9keSwgYHsgZGF0YTogLi4uIH1gLlxuICAgKi9cbiAgZGF0YUVuY2Fwc3VsYXRpb24/OiBib29sZWFuO1xuICAvKipcbiAgICogZGVsYXkgKGluIG1zKSB0byBzaW11bGF0ZSBsYXRlbmN5XG4gICAqL1xuICBkZWxheT86IG51bWJlcjtcbiAgLyoqXG4gICAqIGZhbHNlIChkZWZhdWx0KSBzaG91bGQgMjA0IHdoZW4gb2JqZWN0LXRvLWRlbGV0ZSBub3QgZm91bmQ7IHRydWU6IDQwNFxuICAgKi9cbiAgZGVsZXRlNDA0PzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIGhvc3QgZm9yIHRoaXMgc2VydmljZSwgZS5nLiwgJ2xvY2FsaG9zdCdcbiAgICovXG4gIGhvc3Q/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBmYWxzZSAoZGVmYXVsdCkgc2hvdWxkIHBhc3MgdW5yZWNvZ25pemVkIHJlcXVlc3QgVVJMIHRocm91Z2ggdG8gb3JpZ2luYWwgYmFja2VuZDsgdHJ1ZTogNDA0XG4gICAqL1xuICBwYXNzVGhydVVua25vd25Vcmw/OiBib29sZWFuO1xuICAvKipcbiAgICogdHJ1ZSAoZGVmYXVsdCkgc2hvdWxkIE5PVCByZXR1cm4gdGhlIGl0ZW0gKDIwNCkgYWZ0ZXIgYSBQT1NULiBmYWxzZTogcmV0dXJuIHRoZSBpdGVtICgyMDApLlxuICAgKi9cbiAgcG9zdDIwND86IGJvb2xlYW47XG4gIC8qKlxuICAqIGZhbHNlIChkZWZhdWx0KSBzaG91bGQgTk9UIHVwZGF0ZSBleGlzdGluZyBpdGVtIHdpdGggUE9TVC4gZmFsc2U6IE9LIHRvIHVwZGF0ZS5cbiAgKi9cbiAgcG9zdDQwOT86IGJvb2xlYW47XG4gIC8qKlxuICAqIHRydWUgKGRlZmF1bHQpIHNob3VsZCBOT1QgcmV0dXJuIHRoZSBpdGVtICgyMDQpIGFmdGVyIGEgUE9TVC4gZmFsc2U6IHJldHVybiB0aGUgaXRlbSAoMjAwKS5cbiAgKi9cbiAgcHV0MjA0PzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIGZhbHNlIChkZWZhdWx0KSBpZiBpdGVtIG5vdCBmb3VuZCwgY3JlYXRlIGFzIG5ldyBpdGVtOyBmYWxzZTogc2hvdWxkIDQwNC5cbiAgICovXG4gIHB1dDQwND86IGJvb2xlYW47XG4gIC8qKlxuICAgKiByb290IHBhdGggX2JlZm9yZV8gYW55IEFQSSBjYWxsLCBlLmcuLCAnJ1xuICAgKi9cbiAgcm9vdFBhdGg/OiBzdHJpbmc7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLyoqXG4qICBJbk1lbW9yeUJhY2tlbmRTZXJ2aWNlIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuKiAgVXNhZ2U6XG4qICAgIEluTWVtb3J5V2ViQXBpTW9kdWxlLmZvclJvb3QoSW5NZW1IZXJvU2VydmljZSwge2RlbGF5OiA2MDB9KVxuKlxuKiAgb3IgaWYgcHJvdmlkaW5nIHNlcGFyYXRlbHk6XG4qICAgIHByb3ZpZGUoSW5NZW1vcnlCYWNrZW5kQ29uZmlnLCB7dXNlVmFsdWU6IHtkZWxheTogNjAwfX0pLFxuKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbk1lbW9yeUJhY2tlbmRDb25maWcgaW1wbGVtZW50cyBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzIHtcbiAgY29uc3RydWN0b3IoY29uZmlnOiBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHtcbiAgICAgIC8vIGRlZmF1bHQgY29uZmlnOlxuICAgICAgY2FzZVNlbnNpdGl2ZVNlYXJjaDogZmFsc2UsXG4gICAgICBkYXRhRW5jYXBzdWxhdGlvbjogZmFsc2UsIC8vIGRvIE5PVCB3cmFwIGNvbnRlbnQgd2l0aGluIGFuIG9iamVjdCB3aXRoIGEgYGRhdGFgIHByb3BlcnR5XG4gICAgICBkZWxheTogNTAwLCAvLyBzaW11bGF0ZSBsYXRlbmN5IGJ5IGRlbGF5aW5nIHJlc3BvbnNlXG4gICAgICBkZWxldGU0MDQ6IGZhbHNlLCAvLyBkb24ndCBjb21wbGFpbiBpZiBjYW4ndCBmaW5kIGVudGl0eSB0byBkZWxldGVcbiAgICAgIHBhc3NUaHJ1VW5rbm93blVybDogZmFsc2UsIC8vIDQwNCBpZiBjYW4ndCBwcm9jZXNzIFVSTFxuICAgICAgcG9zdDIwNDogdHJ1ZSwgLy8gZG9uJ3QgcmV0dXJuIHRoZSBpdGVtIGFmdGVyIGEgUE9TVFxuICAgICAgcG9zdDQwOTogZmFsc2UsIC8vIGRvbid0IHVwZGF0ZSBleGlzdGluZyBpdGVtIHdpdGggdGhhdCBJRFxuICAgICAgcHV0MjA0OiB0cnVlLCAgLy8gZG9uJ3QgcmV0dXJuIHRoZSBpdGVtIGFmdGVyIGEgUFVUXG4gICAgICBwdXQ0MDQ6IGZhbHNlLCAvLyBjcmVhdGUgbmV3IGl0ZW0gaWYgUFVUIGl0ZW0gd2l0aCB0aGF0IElEIG5vdCBmb3VuZFxuICAgICAgYXBpQmFzZTogdW5kZWZpbmVkLCAvLyBhc3N1bWVkIHRvIGJlIHRoZSBmaXJzdCBwYXRoIHNlZ21lbnRcbiAgICAgIGhvc3Q6IHVuZGVmaW5lZCwgICAgLy8gZGVmYXVsdCB2YWx1ZSBpcyBhY3R1YWxseSBzZXQgaW4gSW5NZW1vcnlCYWNrZW5kU2VydmljZSBjdG9yXG4gICAgICByb290UGF0aDogdW5kZWZpbmVkIC8vIGRlZmF1bHQgdmFsdWUgaXMgYWN0dWFsbHkgc2V0IGluIEluTWVtb3J5QmFja2VuZFNlcnZpY2UgY3RvclxuICAgIH0sIGNvbmZpZyk7XG4gIH1cbn1cblxuLyoqIFJldHVybiBpbmZvcm1hdGlvbiAoVXJpSW5mbykgYWJvdXQgYSBVUkkgICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVcmkoc3RyOiBzdHJpbmcpOiBVcmlJbmZvIHtcbiAgLy8gQWRhcHRlZCBmcm9tIHBhcnNldXJpIHBhY2thZ2UgLSBodHRwOi8vYmxvZy5zdGV2ZW5sZXZpdGhhbi5jb20vYXJjaGl2ZXMvcGFyc2V1cmlcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICBjb25zdCBVUkxfUkVHRVggPSAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShbXjpcXC8/Iy5dKyk6KT8oPzpcXC9cXC8pPygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS87XG4gIGNvbnN0IG0gPSBVUkxfUkVHRVguZXhlYyhzdHIpO1xuICBjb25zdCB1cmk6IFVyaUluZm8gPSB7XG4gICAgc291cmNlOiAnJyxcbiAgICBwcm90b2NvbDogJycsXG4gICAgYXV0aG9yaXR5OiAnJyxcbiAgICB1c2VySW5mbzogJycsXG4gICAgdXNlcjogJycsXG4gICAgcGFzc3dvcmQ6ICcnLFxuICAgIGhvc3Q6ICcnLFxuICAgIHBvcnQ6ICcnLFxuICAgIHJlbGF0aXZlOiAnJyxcbiAgICBwYXRoOiAnJyxcbiAgICBkaXJlY3Rvcnk6ICcnLFxuICAgIGZpbGU6ICcnLFxuICAgIHF1ZXJ5OiAnJyxcbiAgICBhbmNob3I6ICcnXG4gIH07XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh1cmkpO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuXG4gIHdoaWxlIChpLS0pIHsgdXJpW2tleXNbaV1dID0gbVtpXSB8fCAnJzsgfVxuICByZXR1cm4gdXJpO1xufVxuXG4vKipcbiAqXG4gKiBJbnRlcmZhY2UgZm9yIHRoZSByZXN1bHQgb2YgdGhlIGBwYXJzZVJlcXVlc3RVcmxgIG1ldGhvZDpcbiAqICAgR2l2ZW4gVVJMIFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9jdXN0b21lcnMvNDI/Zm9vPTEgdGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gcmV0dXJuc1xuICogICAgIGJhc2U6ICdhcGkvJ1xuICogICAgIGNvbGxlY3Rpb25OYW1lOiAnY3VzdG9tZXJzJ1xuICogICAgIGlkOiAnNDInXG4gKiAgICAgcXVlcnk6IHRoaXMuY3JlYXRlUXVlcnkoJ2Zvbz0xJylcbiAqICAgICByZXNvdXJjZVVybDogJ2h0dHA6Ly9sb2NhbGhvc3QvYXBpL2N1c3RvbWVycy8nXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGFyc2VkUmVxdWVzdFVybCB7XG4gIGFwaUJhc2U6IHN0cmluZzsgICAgICAgICAgIC8vIHRoZSBzbGFzaC10ZXJtaW5hdGVkIFwiYmFzZVwiIGZvciBhcGkgcmVxdWVzdHMgKGUuZy4gYGFwaS9gKVxuICBjb2xsZWN0aW9uTmFtZTogc3RyaW5nOyAvLyB0aGUgbmFtZSBvZiB0aGUgY29sbGVjdGlvbiBvZiBkYXRhIGl0ZW1zIChlLmcuLGBjdXN0b21lcnNgKVxuICBpZDogc3RyaW5nOyAgICAgICAgICAgICAvLyB0aGUgKG9wdGlvbmFsKSBpZCBvZiB0aGUgaXRlbSBpbiB0aGUgY29sbGVjdGlvbiAoZS5nLiwgYDQyYClcbiAgcXVlcnk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjsgLy8gdGhlIHF1ZXJ5IHBhcmFtZXRlcnM7XG4gIHJlc291cmNlVXJsOiBzdHJpbmc7ICAgIC8vIHRoZSBlZmZlY3RpdmUgVVJMIGZvciB0aGUgcmVzb3VyY2UgKGUuZy4sICdodHRwOi8vbG9jYWxob3N0L2FwaS9jdXN0b21lcnMvJylcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXNzVGhydUJhY2tlbmQge1xuICAvKipcbiAgICogSGFuZGxlIGFuIEhUVFAgcmVxdWVzdCBhbmQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgSFRUUCByZXNwb25zZVxuICAgKiBCb3RoIHRoZSByZXF1ZXN0IHR5cGUgYW5kIHRoZSByZXNwb25zZSB0eXBlIGFyZSBkZXRlcm1pbmVkIGJ5IHRoZSBzdXBwb3J0aW5nIEhUVFAgbGlicmFyeS5cbiAgICovXG4gIGhhbmRsZShyZXE6IGFueSk6IE9ic2VydmFibGU8YW55Pjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVRyYWlsaW5nU2xhc2gocGF0aDogc3RyaW5nKSB7XG4gIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLyQvLCAnJyk7XG59XG5cbi8qKlxuICogIE1pbmltdW0gZGVmaW5pdGlvbiBuZWVkZWQgYnkgYmFzZSBjbGFzc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RDb3JlIHtcbiAgdXJsOiBzdHJpbmc7IC8vIHJlcXVlc3QgVVJMXG4gIHVybFdpdGhQYXJhbXM/OiBzdHJpbmc7IC8vIHJlcXVlc3QgVVJMIHdpdGggcXVlcnkgcGFyYW1ldGVycyBhZGRlZCBieSBgSHR0cFBhcmFtc2Bcbn1cblxuLyoqXG4qIEludGVyZmFjZSBmb3Igb2JqZWN0IHcvIGluZm8gYWJvdXQgdGhlIGN1cnJlbnQgcmVxdWVzdCB1cmxcbiogZXh0cmFjdGVkIGZyb20gYW4gSHR0cCBSZXF1ZXN0LlxuKiBBbHNvIGhvbGRzIHV0aWxpdHkgbWV0aG9kcyBhbmQgY29uZmlndXJhdGlvbiBkYXRhIGZyb20gdGhpcyBzZXJ2aWNlXG4qL1xuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0SW5mbyB7XG4gIHJlcTogUmVxdWVzdENvcmU7IC8vIGNvbmNyZXRlIHR5cGUgZGVwZW5kcyB1cG9uIHRoZSBIdHRwIGxpYnJhcnlcbiAgYXBpQmFzZTogc3RyaW5nO1xuICBjb2xsZWN0aW9uTmFtZTogc3RyaW5nO1xuICBjb2xsZWN0aW9uOiBhbnk7XG4gIGhlYWRlcnM6IEhlYWRlcnNDb3JlO1xuICBtZXRob2Q6IHN0cmluZztcbiAgaWQ6IGFueTtcbiAgcXVlcnk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcbiAgcmVzb3VyY2VVcmw6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7IC8vIHJlcXVlc3QgVVJMXG4gIHV0aWxzOiBSZXF1ZXN0SW5mb1V0aWxpdGllcztcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIHV0aWxpdHkgbWV0aG9kcyBmcm9tIHRoaXMgc2VydmljZSBpbnN0YW5jZS5cbiAqIFVzZWZ1bCB3aXRoaW4gYW4gSFRUUCBtZXRob2Qgb3ZlcnJpZGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0SW5mb1V0aWxpdGllcyB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjb2xkIHJlc3BvbnNlIE9ic2VydmFibGUgZnJvbSBhIGZhY3RvcnkgZm9yIFJlc3BvbnNlT3B0aW9uc1xuICAgKiB0aGUgc2FtZSB3YXkgdGhhdCB0aGUgaW4tbWVtIGJhY2tlbmQgc2VydmljZSBkb2VzLlxuICAgKiBAcGFyYW0gcmVzT3B0aW9uc0ZhY3RvcnkgLSBjcmVhdGVzIFJlc3BvbnNlT3B0aW9ucyB3aGVuIG9ic2VydmFibGUgaXMgc3Vic2NyaWJlZFxuICAgKiBAcGFyYW0gd2l0aERlbGF5IC0gaWYgdHJ1ZSAoZGVmYXVsdCksIGFkZCBzaW11bGF0ZWQgbGF0ZW5jeSBkZWxheSBmcm9tIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIGNyZWF0ZVJlc3BvbnNlJDogKHJlc09wdGlvbnNGYWN0b3J5OiAoKSA9PiBSZXNwb25zZU9wdGlvbnMpID0+IE9ic2VydmFibGU8YW55PjtcblxuICAvKipcbiAgICogRmluZCBmaXJzdCBpbnN0YW5jZSBvZiBpdGVtIGluIGNvbGxlY3Rpb24gYnkgYGl0ZW0uaWRgXG4gICAqIEBwYXJhbSBjb2xsZWN0aW9uXG4gICAqIEBwYXJhbSBpZFxuICAgKi9cbiAgZmluZEJ5SWQ8VCBleHRlbmRzIHsgaWQ6IGFueSB9Pihjb2xsZWN0aW9uOiBUW10sIGlkOiBhbnkpOiBUO1xuXG4gIC8qKiByZXR1cm4gdGhlIGN1cnJlbnQsIGFjdGl2ZSBjb25maWd1cmF0aW9uIHdoaWNoIGlzIGEgYmxlbmQgb2YgZGVmYXVsdHMgYW5kIG92ZXJyaWRlcyAqL1xuICBnZXRDb25maWcoKTogSW5NZW1vcnlCYWNrZW5kQ29uZmlnQXJncztcblxuICAvKiogR2V0IHRoZSBpbi1tZW0gc2VydmljZSdzIGNvcHkgb2YgdGhlIFwiZGF0YWJhc2VcIiAqL1xuICBnZXREYigpOiB7fTtcblxuICAvKiogR2V0IEpTT04gYm9keSBmcm9tIHRoZSByZXF1ZXN0IG9iamVjdCAqL1xuICBnZXRKc29uQm9keShyZXE6IGFueSk6IGFueTtcblxuICAvKiogR2V0IGxvY2F0aW9uIGluZm8gZnJvbSBhIHVybCwgZXZlbiBvbiBzZXJ2ZXIgd2hlcmUgYGRvY3VtZW50YCBpcyBub3QgZGVmaW5lZCAqL1xuICBnZXRMb2NhdGlvbih1cmw6IHN0cmluZyk6IFVyaUluZm87XG5cbiAgLyoqIEdldCAob3IgY3JlYXRlKSB0aGUgXCJyZWFsXCIgYmFja2VuZCAqL1xuICBnZXRQYXNzVGhydUJhY2tlbmQoKTogUGFzc1RocnVCYWNrZW5kO1xuXG4gIC8qKlxuICAgKiByZXR1cm4gdHJ1ZSBpZiBjYW4gZGV0ZXJtaW5lIHRoYXQgdGhlIGNvbGxlY3Rpb24ncyBgaXRlbS5pZGAgaXMgYSBudW1iZXJcbiAgICogKi9cbiAgaXNDb2xsZWN0aW9uSWROdW1lcmljPFQgZXh0ZW5kcyB7IGlkOiBhbnkgfT4oY29sbGVjdGlvbjogVFtdLCBjb2xsZWN0aW9uTmFtZTogc3RyaW5nKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogUGFyc2VzIHRoZSByZXF1ZXN0IFVSTCBpbnRvIGEgYFBhcnNlZFJlcXVlc3RVcmxgIG9iamVjdC5cbiAgICogUGFyc2luZyBkZXBlbmRzIHVwb24gY2VydGFpbiB2YWx1ZXMgb2YgYGNvbmZpZ2A6IGBhcGlCYXNlYCwgYGhvc3RgLCBhbmQgYHVybFJvb3RgLlxuICAgKi9cbiAgcGFyc2VSZXF1ZXN0VXJsKHVybDogc3RyaW5nKTogUGFyc2VkUmVxdWVzdFVybDtcbn1cblxuLyoqXG4gKiBQcm92aWRlIGEgYHJlc3BvbnNlSW50ZXJjZXB0b3JgIG1ldGhvZCBvZiB0aGlzIHR5cGUgaW4geW91ciBgaW5NZW1EYlNlcnZpY2VgIHRvXG4gKiBtb3JwaCB0aGUgcmVzcG9uc2Ugb3B0aW9ucyBjcmVhdGVkIGluIHRoZSBgY29sbGVjdGlvbkhhbmRsZXJgLlxuICovXG5leHBvcnQgdHlwZSBSZXNwb25zZUludGVyY2VwdG9yID0gKHJlczogUmVzcG9uc2VPcHRpb25zLCByaTogUmVxdWVzdEluZm8pID0+IFJlc3BvbnNlT3B0aW9ucztcblxuZXhwb3J0IGludGVyZmFjZSBSZXNwb25zZU9wdGlvbnMge1xuICAvKipcbiAgICogU3RyaW5nLCBPYmplY3QsIEFycmF5QnVmZmVyIG9yIEJsb2IgcmVwcmVzZW50aW5nIHRoZSBib2R5IG9mIHRoZSB7QGxpbmsgUmVzcG9uc2V9LlxuICAgKi9cbiAgYm9keT86IHN0cmluZyB8IE9iamVjdCB8IEFycmF5QnVmZmVyIHwgQmxvYjtcblxuICAvKipcbiAgICogUmVzcG9uc2UgaGVhZGVyc1xuICAgKi9cbiAgaGVhZGVycz86IEhlYWRlcnNDb3JlO1xuXG4gIC8qKlxuICAgKiBIdHRwIHtAbGluayBodHRwOi8vd3d3LnczLm9yZy9Qcm90b2NvbHMvcmZjMjYxNi9yZmMyNjE2LXNlYzEwLmh0bWwgc3RhdHVzIGNvZGV9XG4gICAqIGFzc29jaWF0ZWQgd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAqL1xuICBzdGF0dXM/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFN0YXR1cyB0ZXh0IGZvciB0aGUgc3RhdHVzIGNvZGVcbiAgICovXG4gIHN0YXR1c1RleHQ/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiByZXF1ZXN0IHVybFxuICAgKi9cbiAgdXJsPzogc3RyaW5nO1xufVxuXG4vKiogSW50ZXJmYWNlIG9mIGluZm9ybWF0aW9uIGFib3V0IGEgVXJpICAqL1xuZXhwb3J0IGludGVyZmFjZSBVcmlJbmZvIHtcbiAgc291cmNlOiBzdHJpbmc7XG4gIHByb3RvY29sOiBzdHJpbmc7XG4gIGF1dGhvcml0eTogc3RyaW5nO1xuICB1c2VySW5mbzogc3RyaW5nO1xuICB1c2VyOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG4gIGhvc3Q6IHN0cmluZztcbiAgcG9ydDogc3RyaW5nO1xuICByZWxhdGl2ZTogc3RyaW5nO1xuICBwYXRoOiBzdHJpbmc7XG4gIGRpcmVjdG9yeTogc3RyaW5nO1xuICBmaWxlOiBzdHJpbmc7XG4gIHF1ZXJ5OiBzdHJpbmc7XG4gIGFuY2hvcjogc3RyaW5nO1xufVxuIl19