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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQtYmFja2VuZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXItaW4tbWVtb3J5LXdlYi1hcGkvaHR0cC1jbGllbnQtYmFja2VuZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUdMLFdBQVcsRUFDWCxVQUFVLEVBRVYsWUFBWSxFQUNaLGNBQWMsRUFDZCxVQUFVLEVBQ1gsTUFBTSxzQkFBc0IsQ0FBQztBQUc5QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTdDLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIseUJBQXlCLEVBQ3pCLGlCQUFpQixFQUVsQixNQUFNLGNBQWMsQ0FBQztBQUV0QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4Qm5ELE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxjQUFjOzs7Ozs7SUFFMUQsWUFDRSxjQUFpQyxFQUNVLE1BQWlDLEVBQ3BFO1FBRVIsS0FBSyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUZ0QixlQUFVLEdBQVYsVUFBVTtLQUduQjs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBcUI7UUFDMUIsSUFBSTtZQUNGLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUVoQztRQUFDLE9BQU8sS0FBSyxFQUFFOztZQUNkLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDOztZQUNuQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMscUJBQXFCLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3BHLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMvQztLQUNGOzs7OztJQUlTLFdBQVcsQ0FBQyxHQUFxQjtRQUN6QyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7S0FDakI7Ozs7O0lBRVMsZ0JBQWdCLENBQUMsR0FBcUI7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDNUM7Ozs7O0lBRVMsYUFBYSxDQUFDLE9BQXFDO1FBQzNELE9BQU8sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDakM7Ozs7O0lBRVMsY0FBYyxDQUFDLE1BQWM7O1FBQ3JDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO1FBQ3hDLElBQUksTUFBTSxFQUFFOztZQUNWLE1BQU0sTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsT0FBTyxHQUFHLENBQUM7S0FDWjs7Ozs7SUFFUyxtQ0FBbUMsQ0FBQyxXQUF3QztRQUNwRixPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBc0IsRUFBRSxFQUFFLENBQUMsSUFBSSxZQUFZLENBQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3ZGOzs7O0lBRVMscUJBQXFCO1FBQzdCLElBQUk7WUFDRixPQUFPLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM1QztRQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1gsRUFBRSxDQUFDLE9BQU8sR0FBRyxxQ0FBcUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7WUFDeEUsTUFBTSxFQUFFLENBQUM7U0FDVjtLQUNGOzs7WUF4REYsVUFBVTs7OztZQWpDVCxpQkFBaUI7WUFEakIseUJBQXlCLHVCQXVDdEIsTUFBTSxTQUFDLHFCQUFxQixjQUFHLFFBQVE7WUFqRDFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBIdHRwQmFja2VuZCxcbiAgSHR0cEV2ZW50LFxuICBIdHRwSGVhZGVycyxcbiAgSHR0cFBhcmFtcyxcbiAgSHR0cFJlcXVlc3QsXG4gIEh0dHBSZXNwb25zZSwgSHR0cFJlc3BvbnNlQmFzZSxcbiAgSHR0cFhockJhY2tlbmQsXG4gIFhockZhY3Rvcnlcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFNUQVRVUyB9IGZyb20gJy4vaHR0cC1zdGF0dXMtY29kZXMnO1xuXG5pbXBvcnQge1xuICBJbk1lbW9yeUJhY2tlbmRDb25maWcsXG4gIEluTWVtb3J5QmFja2VuZENvbmZpZ0FyZ3MsXG4gIEluTWVtb3J5RGJTZXJ2aWNlLFxuICBSZXNwb25zZU9wdGlvbnNcbn0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IHsgQmFja2VuZFNlcnZpY2UgfSBmcm9tICcuL2JhY2tlbmQuc2VydmljZSc7XG5cbi8qKlxuICogRm9yIEFuZ3VsYXIgYEh0dHBDbGllbnRgIHNpbXVsYXRlIHRoZSBiZWhhdmlvciBvZiBhIFJFU1R5IHdlYiBhcGlcbiAqIGJhY2tlZCBieSB0aGUgc2ltcGxlIGluLW1lbW9yeSBkYXRhIHN0b3JlIHByb3ZpZGVkIGJ5IHRoZSBpbmplY3RlZCBgSW5NZW1vcnlEYlNlcnZpY2VgLlxuICogQ29uZm9ybXMgbW9zdGx5IHRvIGJlaGF2aW9yIGRlc2NyaWJlZCBoZXJlOlxuICogaHR0cDovL3d3dy5yZXN0YXBpdHV0b3JpYWwuY29tL2xlc3NvbnMvaHR0cG1ldGhvZHMuaHRtbFxuICpcbiAqICMjIyBVc2FnZVxuICpcbiAqIENyZWF0ZSBhbiBpbi1tZW1vcnkgZGF0YSBzdG9yZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgYEluTWVtb3J5RGJTZXJ2aWNlYC5cbiAqIENhbGwgYGNvbmZpZ2Agc3RhdGljIG1ldGhvZCB3aXRoIHRoaXMgc2VydmljZSBjbGFzcyBhbmQgb3B0aW9uYWwgY29uZmlndXJhdGlvbiBvYmplY3Q6XG4gKiBgYGBcbiAqIC8vIG90aGVyIGltcG9ydHNcbiAqIGltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG4gKiBpbXBvcnQgeyBIdHRwQ2xpZW50SW5NZW1vcnlXZWJBcGlNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWluLW1lbW9yeS13ZWItYXBpJztcbiAqXG4gKiBpbXBvcnQgeyBJbk1lbUhlcm9TZXJ2aWNlLCBpbk1lbUNvbmZpZyB9IGZyb20gJy4uL2FwaS9pbi1tZW1vcnktaGVyby5zZXJ2aWNlJztcbiAqIEBOZ01vZHVsZSh7XG4gKiAgaW1wb3J0czogW1xuICogICAgSHR0cE1vZHVsZSxcbiAqICAgIEh0dHBDbGllbnRJbk1lbW9yeVdlYkFwaU1vZHVsZS5mb3JSb290KEluTWVtSGVyb1NlcnZpY2UsIGluTWVtQ29uZmlnKSxcbiAqICAgIC4uLlxuICogIF0sXG4gKiAgLi4uXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IC4uLiB9XG4gKiBgYGBcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHBDbGllbnRCYWNrZW5kU2VydmljZSBleHRlbmRzIEJhY2tlbmRTZXJ2aWNlIGltcGxlbWVudHMgSHR0cEJhY2tlbmQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGluTWVtRGJTZXJ2aWNlOiBJbk1lbW9yeURiU2VydmljZSxcbiAgICBASW5qZWN0KEluTWVtb3J5QmFja2VuZENvbmZpZykgQE9wdGlvbmFsKCkgY29uZmlnOiBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzLFxuICAgIHByaXZhdGUgeGhyRmFjdG9yeTogWGhyRmFjdG9yeVxuICAgICkge1xuICAgIHN1cGVyKGluTWVtRGJTZXJ2aWNlLCBjb25maWcpO1xuICB9XG5cbiAgaGFuZGxlKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdChyZXEpO1xuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVyciA9IGVycm9yLm1lc3NhZ2UgfHwgZXJyb3I7XG4gICAgICBjb25zdCByZXNPcHRpb25zID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucyhyZXEudXJsLCBTVEFUVVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLCBgJHtlcnJ9YCk7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXNwb25zZSQoKCkgPT4gcmVzT3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgLy8vLyAgcHJvdGVjdGVkIG92ZXJyaWRlcyAvLy8vL1xuXG4gIHByb3RlY3RlZCBnZXRKc29uQm9keShyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBhbnkge1xuICAgIHJldHVybiByZXEuYm9keTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRSZXF1ZXN0TWV0aG9kKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IHN0cmluZyB7XG4gICAgcmV0dXJuIChyZXEubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZUhlYWRlcnMoaGVhZGVyczogeyBbaW5kZXg6IHN0cmluZ106IHN0cmluZzsgfSk6IEh0dHBIZWFkZXJzIHtcbiAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKGhlYWRlcnMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVF1ZXJ5TWFwKHNlYXJjaDogc3RyaW5nKTogTWFwPHN0cmluZywgc3RyaW5nW10+IHtcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nW10+KCk7XG4gICAgaWYgKHNlYXJjaCkge1xuICAgICAgY29uc3QgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoe2Zyb21TdHJpbmc6IHNlYXJjaH0pO1xuICAgICAgcGFyYW1zLmtleXMoKS5mb3JFYWNoKHAgPT4gbWFwLnNldChwLCBwYXJhbXMuZ2V0QWxsKHApKSk7XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlUmVzcG9uc2UkZnJvbVJlc3BvbnNlT3B0aW9ucyQocmVzT3B0aW9ucyQ6IE9ic2VydmFibGU8UmVzcG9uc2VPcHRpb25zPik6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPGFueT4+IHtcbiAgICByZXR1cm4gcmVzT3B0aW9ucyQucGlwZShtYXAoKG9wdHM6IEh0dHBSZXNwb25zZUJhc2UpID0+IG5ldyBIdHRwUmVzcG9uc2U8YW55PihvcHRzKSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVBhc3NUaHJ1QmFja2VuZCgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG5ldyBIdHRwWGhyQmFja2VuZCh0aGlzLnhockZhY3RvcnkpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBleC5tZXNzYWdlID0gJ0Nhbm5vdCBjcmVhdGUgcGFzc1RocnU0MDQgYmFja2VuZDsgJyArIChleC5tZXNzYWdlIHx8ICcnKTtcbiAgICAgIHRocm93IGV4O1xuICAgIH1cbiAgfVxufVxuIl19