/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpHeaders, HttpParams, HttpResponse, HttpXhrBackend, XhrFactory } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { STATUS } from './http-status-codes';
import { InMemoryBackendConfig, InMemoryBackendConfigArgs, InMemoryDbService } from './interfaces';
import { BackendService } from './backend.service';
/**
 * For Angular `HttpClient` simulate the behavior of a RESTy web api
 * backed by the simple in-memory data store provided by the injected `InMemoryDbService`.
 * Conforms mostly to behavior described here:
 * http://www.restapitutorial.com/lessons/httpmethods.html
 *
 * ### Usage
 *
 * Create an in-memory data store class that implements `InMemoryDbService`.
 * Call `config` static method with this service class and optional configuration object:
 * ```
 * // other imports
 * import { HttpClientModule } from '\@angular/common/http';
 * import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
 *
 * import { InMemHeroService, inMemConfig } from '../api/in-memory-hero.service';
 * \@NgModule({
 *  imports: [
 *    HttpModule,
 *    HttpClientInMemoryWebApiModule.forRoot(InMemHeroService, inMemConfig),
 *    ...
 *  ],
 *  ...
 * })
 * export class AppModule { ... }
 * ```
 */
export class HttpClientBackendService extends BackendService {
    /**
     * @param {?} inMemDbService
     * @param {?} config
     * @param {?} xhrFactory
     */
    constructor(inMemDbService, config, xhrFactory) {
        super(inMemDbService, config);
        this.xhrFactory = xhrFactory;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    handle(req) {
        try {
            return this.handleRequest(req);
        }
        catch (error) {
            /** @type {?} */
            const err = error.message || error;
            /** @type {?} */
            const resOptions = this.createErrorResponseOptions(req.url, STATUS.INTERNAL_SERVER_ERROR, `${err}`);
            return this.createResponse$(() => resOptions);
        }
    }
    /**
     * @param {?} req
     * @return {?}
     */
    getJsonBody(req) {
        return req.body;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    getRequestMethod(req) {
        return (req.method || 'get').toLowerCase();
    }
    /**
     * @param {?} headers
     * @return {?}
     */
    createHeaders(headers) {
        return new HttpHeaders(headers);
    }
    /**
     * @param {?} search
     * @return {?}
     */
    createQueryMap(search) {
        /** @type {?} */
        const map = new Map();
        if (search) {
            /** @type {?} */
            const params = new HttpParams({ fromString: search });
            params.keys().forEach(p => map.set(p, params.getAll(p)));
        }
        return map;
    }
    /**
     * @param {?} resOptions$
     * @return {?}
     */
    createResponse$fromResponseOptions$(resOptions$) {
        return resOptions$.pipe(map((opts) => new HttpResponse(opts)));
    }
    /**
     * @return {?}
     */
    createPassThruBackend() {
        try {
            return new HttpXhrBackend(this.xhrFactory);
        }
        catch (ex) {
            ex.message = 'Cannot create passThru404 backend; ' + (ex.message || '');
            throw ex;
        }
    }
}
HttpClientBackendService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HttpClientBackendService.ctorParameters = () => [
    { type: InMemoryDbService },
    { type: InMemoryBackendConfigArgs, decorators: [{ type: Inject, args: [InMemoryBackendConfig,] }, { type: Optional }] },
    { type: XhrFactory }
];
if (false) {
    /** @type {?} */
    HttpClientBackendService.prototype.xhrFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQtYmFja2VuZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2luLW1lbS9odHRwLWNsaWVudC1iYWNrZW5kLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBR0wsV0FBVyxFQUNYLFVBQVUsRUFFVixZQUFZLEVBQ1osY0FBYyxFQUNkLFVBQVUsRUFDWCxNQUFNLHNCQUFzQixDQUFDO0FBRzlCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFN0MsT0FBTyxFQUNMLHFCQUFxQixFQUNyQix5QkFBeUIsRUFDekIsaUJBQWlCLEVBRWxCLE1BQU0sY0FBYyxDQUFDO0FBRXRCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCbkQsTUFBTSxPQUFPLHdCQUF5QixTQUFRLGNBQWM7Ozs7OztJQUUxRCxZQUNFLGNBQWlDLEVBQ1UsTUFBaUMsRUFDcEU7UUFFUixLQUFLLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRnRCLGVBQVUsR0FBVixVQUFVO0tBR25COzs7OztJQUVELE1BQU0sQ0FBQyxHQUFxQjtRQUMxQixJQUFJO1lBQ0YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBRWhDO1FBQUMsT0FBTyxLQUFLLEVBQUU7O1lBQ2QsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUM7O1lBQ25DLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDcEcsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQy9DO0tBQ0Y7Ozs7O0lBSVMsV0FBVyxDQUFDLEdBQXFCO1FBQ3pDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztLQUNqQjs7Ozs7SUFFUyxnQkFBZ0IsQ0FBQyxHQUFxQjtRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUM1Qzs7Ozs7SUFFUyxhQUFhLENBQUMsT0FBcUM7UUFDM0QsT0FBTyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNqQzs7Ozs7SUFFUyxjQUFjLENBQUMsTUFBYzs7UUFDckMsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7UUFDeEMsSUFBSSxNQUFNLEVBQUU7O1lBQ1YsTUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxPQUFPLEdBQUcsQ0FBQztLQUNaOzs7OztJQUVTLG1DQUFtQyxDQUFDLFdBQXdDO1FBQ3BGLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFzQixFQUFFLEVBQUUsQ0FBQyxJQUFJLFlBQVksQ0FBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdkY7Ozs7SUFFUyxxQkFBcUI7UUFDN0IsSUFBSTtZQUNGLE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzVDO1FBQUMsT0FBTyxFQUFFLEVBQUU7WUFDWCxFQUFFLENBQUMsT0FBTyxHQUFHLHFDQUFxQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN4RSxNQUFNLEVBQUUsQ0FBQztTQUNWO0tBQ0Y7OztZQXhERixVQUFVOzs7O1lBakNULGlCQUFpQjtZQURqQix5QkFBeUIsdUJBdUN0QixNQUFNLFNBQUMscUJBQXFCLGNBQUcsUUFBUTtZQWpEMUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEh0dHBCYWNrZW5kLFxuICBIdHRwRXZlbnQsXG4gIEh0dHBIZWFkZXJzLFxuICBIdHRwUGFyYW1zLFxuICBIdHRwUmVxdWVzdCxcbiAgSHR0cFJlc3BvbnNlLCBIdHRwUmVzcG9uc2VCYXNlLFxuICBIdHRwWGhyQmFja2VuZCxcbiAgWGhyRmFjdG9yeVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgU1RBVFVTIH0gZnJvbSAnLi9odHRwLXN0YXR1cy1jb2Rlcyc7XG5cbmltcG9ydCB7XG4gIEluTWVtb3J5QmFja2VuZENvbmZpZyxcbiAgSW5NZW1vcnlCYWNrZW5kQ29uZmlnQXJncyxcbiAgSW5NZW1vcnlEYlNlcnZpY2UsXG4gIFJlc3BvbnNlT3B0aW9uc1xufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBCYWNrZW5kU2VydmljZSB9IGZyb20gJy4vYmFja2VuZC5zZXJ2aWNlJztcblxuLyoqXG4gKiBGb3IgQW5ndWxhciBgSHR0cENsaWVudGAgc2ltdWxhdGUgdGhlIGJlaGF2aW9yIG9mIGEgUkVTVHkgd2ViIGFwaVxuICogYmFja2VkIGJ5IHRoZSBzaW1wbGUgaW4tbWVtb3J5IGRhdGEgc3RvcmUgcHJvdmlkZWQgYnkgdGhlIGluamVjdGVkIGBJbk1lbW9yeURiU2VydmljZWAuXG4gKiBDb25mb3JtcyBtb3N0bHkgdG8gYmVoYXZpb3IgZGVzY3JpYmVkIGhlcmU6XG4gKiBodHRwOi8vd3d3LnJlc3RhcGl0dXRvcmlhbC5jb20vbGVzc29ucy9odHRwbWV0aG9kcy5odG1sXG4gKlxuICogIyMjIFVzYWdlXG4gKlxuICogQ3JlYXRlIGFuIGluLW1lbW9yeSBkYXRhIHN0b3JlIGNsYXNzIHRoYXQgaW1wbGVtZW50cyBgSW5NZW1vcnlEYlNlcnZpY2VgLlxuICogQ2FsbCBgY29uZmlnYCBzdGF0aWMgbWV0aG9kIHdpdGggdGhpcyBzZXJ2aWNlIGNsYXNzIGFuZCBvcHRpb25hbCBjb25maWd1cmF0aW9uIG9iamVjdDpcbiAqIGBgYFxuICogLy8gb3RoZXIgaW1wb3J0c1xuICogaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbiAqIGltcG9ydCB7IEh0dHBDbGllbnRJbk1lbW9yeVdlYkFwaU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItaW4tbWVtb3J5LXdlYi1hcGknO1xuICpcbiAqIGltcG9ydCB7IEluTWVtSGVyb1NlcnZpY2UsIGluTWVtQ29uZmlnIH0gZnJvbSAnLi4vYXBpL2luLW1lbW9yeS1oZXJvLnNlcnZpY2UnO1xuICogQE5nTW9kdWxlKHtcbiAqICBpbXBvcnRzOiBbXG4gKiAgICBIdHRwTW9kdWxlLFxuICogICAgSHR0cENsaWVudEluTWVtb3J5V2ViQXBpTW9kdWxlLmZvclJvb3QoSW5NZW1IZXJvU2VydmljZSwgaW5NZW1Db25maWcpLFxuICogICAgLi4uXG4gKiAgXSxcbiAqICAuLi5cbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgLi4uIH1cbiAqIGBgYFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cENsaWVudEJhY2tlbmRTZXJ2aWNlIGV4dGVuZHMgQmFja2VuZFNlcnZpY2UgaW1wbGVtZW50cyBIdHRwQmFja2VuZCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgaW5NZW1EYlNlcnZpY2U6IEluTWVtb3J5RGJTZXJ2aWNlLFxuICAgIEBJbmplY3QoSW5NZW1vcnlCYWNrZW5kQ29uZmlnKSBAT3B0aW9uYWwoKSBjb25maWc6IEluTWVtb3J5QmFja2VuZENvbmZpZ0FyZ3MsXG4gICAgcHJpdmF0ZSB4aHJGYWN0b3J5OiBYaHJGYWN0b3J5XG4gICAgKSB7XG4gICAgc3VwZXIoaW5NZW1EYlNlcnZpY2UsIGNvbmZpZyk7XG4gIH1cblxuICBoYW5kbGUocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHJlcSk7XG5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgZXJyID0gZXJyb3IubWVzc2FnZSB8fCBlcnJvcjtcbiAgICAgIGNvbnN0IHJlc09wdGlvbnMgPSB0aGlzLmNyZWF0ZUVycm9yUmVzcG9uc2VPcHRpb25zKHJlcS51cmwsIFNUQVRVUy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsIGAke2Vycn1gKTtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc3BvbnNlJCgoKSA9PiByZXNPcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICAvLy8vICBwcm90ZWN0ZWQgb3ZlcnJpZGVzIC8vLy8vXG5cbiAgcHJvdGVjdGVkIGdldEpzb25Cb2R5KHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IGFueSB7XG4gICAgcmV0dXJuIHJlcS5ib2R5O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFJlcXVlc3RNZXRob2QocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHJlcS5tZXRob2QgfHwgJ2dldCcpLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlSGVhZGVycyhoZWFkZXJzOiB7IFtpbmRleDogc3RyaW5nXTogc3RyaW5nOyB9KTogSHR0cEhlYWRlcnMge1xuICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoaGVhZGVycyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlUXVlcnlNYXAoc2VhcmNoOiBzdHJpbmcpOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4ge1xuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmdbXT4oKTtcbiAgICBpZiAoc2VhcmNoKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcyh7ZnJvbVN0cmluZzogc2VhcmNofSk7XG4gICAgICBwYXJhbXMua2V5cygpLmZvckVhY2gocCA9PiBtYXAuc2V0KHAsIHBhcmFtcy5nZXRBbGwocCkpKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVSZXNwb25zZSRmcm9tUmVzcG9uc2VPcHRpb25zJChyZXNPcHRpb25zJDogT2JzZXJ2YWJsZTxSZXNwb25zZU9wdGlvbnM+KTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8YW55Pj4ge1xuICAgIHJldHVybiByZXNPcHRpb25zJC5waXBlKG1hcCgob3B0czogSHR0cFJlc3BvbnNlQmFzZSkgPT4gbmV3IEh0dHBSZXNwb25zZTxhbnk+KG9wdHMpKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlUGFzc1RocnVCYWNrZW5kKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IEh0dHBYaHJCYWNrZW5kKHRoaXMueGhyRmFjdG9yeSk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGV4Lm1lc3NhZ2UgPSAnQ2Fubm90IGNyZWF0ZSBwYXNzVGhydTQwNCBiYWNrZW5kOyAnICsgKGV4Lm1lc3NhZ2UgfHwgJycpO1xuICAgICAgdGhyb3cgZXg7XG4gICAgfVxuICB9XG59XG4iXX0=