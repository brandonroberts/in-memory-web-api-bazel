/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var HttpClientBackendService = /** @class */ (function (_super) {
    tslib_1.__extends(HttpClientBackendService, _super);
    function HttpClientBackendService(inMemDbService, config, xhrFactory) {
        var _this = _super.call(this, inMemDbService, config) || this;
        _this.xhrFactory = xhrFactory;
        return _this;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    HttpClientBackendService.prototype.handle = /**
     * @param {?} req
     * @return {?}
     */
    function (req) {
        try {
            return this.handleRequest(req);
        }
        catch (error) {
            /** @type {?} */
            var err = error.message || error;
            /** @type {?} */
            var resOptions_1 = this.createErrorResponseOptions(req.url, STATUS.INTERNAL_SERVER_ERROR, "" + err);
            return this.createResponse$((/**
             * @return {?}
             */
            function () { return resOptions_1; }));
        }
    };
    ////  protected overrides /////
    ////  protected overrides /////
    /**
     * @protected
     * @param {?} req
     * @return {?}
     */
    HttpClientBackendService.prototype.getJsonBody = 
    ////  protected overrides /////
    /**
     * @protected
     * @param {?} req
     * @return {?}
     */
    function (req) {
        return req.body;
    };
    /**
     * @protected
     * @param {?} req
     * @return {?}
     */
    HttpClientBackendService.prototype.getRequestMethod = /**
     * @protected
     * @param {?} req
     * @return {?}
     */
    function (req) {
        return (req.method || 'get').toLowerCase();
    };
    /**
     * @protected
     * @param {?} headers
     * @return {?}
     */
    HttpClientBackendService.prototype.createHeaders = /**
     * @protected
     * @param {?} headers
     * @return {?}
     */
    function (headers) {
        return new HttpHeaders(headers);
    };
    /**
     * @protected
     * @param {?} search
     * @return {?}
     */
    HttpClientBackendService.prototype.createQueryMap = /**
     * @protected
     * @param {?} search
     * @return {?}
     */
    function (search) {
        /** @type {?} */
        var map = new Map();
        if (search) {
            /** @type {?} */
            var params_1 = new HttpParams({ fromString: search });
            params_1.keys().forEach((/**
             * @param {?} p
             * @return {?}
             */
            function (p) { return map.set(p, params_1.getAll(p)); }));
        }
        return map;
    };
    /**
     * @protected
     * @param {?} resOptions$
     * @return {?}
     */
    HttpClientBackendService.prototype.createResponse$fromResponseOptions$ = /**
     * @protected
     * @param {?} resOptions$
     * @return {?}
     */
    function (resOptions$) {
        return resOptions$.pipe(map((/**
         * @param {?} opts
         * @return {?}
         */
        function (opts) { return new HttpResponse(opts); })));
    };
    /**
     * @protected
     * @return {?}
     */
    HttpClientBackendService.prototype.createPassThruBackend = /**
     * @protected
     * @return {?}
     */
    function () {
        try {
            return new HttpXhrBackend(this.xhrFactory);
        }
        catch (ex) {
            ex.message = 'Cannot create passThru404 backend; ' + (ex.message || '');
            throw ex;
        }
    };
    HttpClientBackendService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    HttpClientBackendService.ctorParameters = function () { return [
        { type: InMemoryDbService },
        { type: InMemoryBackendConfigArgs, decorators: [{ type: Inject, args: [InMemoryBackendConfig,] }, { type: Optional }] },
        { type: XhrFactory }
    ]; };
    return HttpClientBackendService;
}(BackendService));
export { HttpClientBackendService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    HttpClientBackendService.prototype.xhrFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQtYmFja2VuZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbi1tZW1vcnktd2ViLWFwaS8iLCJzb3VyY2VzIjpbImh0dHAtY2xpZW50LWJhY2tlbmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBR0wsV0FBVyxFQUNYLFVBQVUsRUFFVixZQUFZLEVBQ1osY0FBYyxFQUNkLFVBQVUsRUFDWCxNQUFNLHNCQUFzQixDQUFDO0FBRzlCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFN0MsT0FBTyxFQUNMLHFCQUFxQixFQUNyQix5QkFBeUIsRUFDekIsaUJBQWlCLEVBRWxCLE1BQU0sY0FBYyxDQUFDO0FBRXRCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCbkQ7SUFDOEMsb0RBQWM7SUFFMUQsa0NBQ0UsY0FBaUMsRUFDVSxNQUFpQyxFQUNwRSxVQUFzQjtRQUhoQyxZQUtFLGtCQUFNLGNBQWMsRUFBRSxNQUFNLENBQUMsU0FDOUI7UUFIUyxnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7SUFHaEMsQ0FBQzs7Ozs7SUFFRCx5Q0FBTTs7OztJQUFOLFVBQU8sR0FBcUI7UUFDMUIsSUFBSTtZQUNGLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUVoQztRQUFDLE9BQU8sS0FBSyxFQUFFOztnQkFDUixHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLOztnQkFDNUIsWUFBVSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxLQUFHLEdBQUssQ0FBQztZQUNuRyxPQUFPLElBQUksQ0FBQyxlQUFlOzs7WUFBQyxjQUFNLE9BQUEsWUFBVSxFQUFWLENBQVUsRUFBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztJQUVELCtCQUErQjs7Ozs7OztJQUVyQiw4Q0FBVzs7Ozs7OztJQUFyQixVQUFzQixHQUFxQjtRQUN6QyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDbEIsQ0FBQzs7Ozs7O0lBRVMsbURBQWdCOzs7OztJQUExQixVQUEyQixHQUFxQjtRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QyxDQUFDOzs7Ozs7SUFFUyxnREFBYTs7Ozs7SUFBdkIsVUFBd0IsT0FBcUM7UUFDM0QsT0FBTyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7Ozs7SUFFUyxpREFBYzs7Ozs7SUFBeEIsVUFBeUIsTUFBYzs7WUFDL0IsR0FBRyxHQUFHLElBQUksR0FBRyxFQUFvQjtRQUN2QyxJQUFJLE1BQU0sRUFBRTs7Z0JBQ0osUUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDO1lBQ25ELFFBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQTVCLENBQTRCLEVBQUMsQ0FBQztTQUMxRDtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Ozs7O0lBRVMsc0VBQW1DOzs7OztJQUE3QyxVQUE4QyxXQUF3QztRQUNwRixPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsSUFBc0IsSUFBSyxPQUFBLElBQUksWUFBWSxDQUFNLElBQUksQ0FBQyxFQUEzQixDQUEyQixFQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDOzs7OztJQUVTLHdEQUFxQjs7OztJQUEvQjtRQUNFLElBQUk7WUFDRixPQUFPLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM1QztRQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1gsRUFBRSxDQUFDLE9BQU8sR0FBRyxxQ0FBcUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7WUFDeEUsTUFBTSxFQUFFLENBQUM7U0FDVjtJQUNILENBQUM7O2dCQXhERixVQUFVOzs7O2dCQWpDVCxpQkFBaUI7Z0JBRGpCLHlCQUF5Qix1QkF1Q3RCLE1BQU0sU0FBQyxxQkFBcUIsY0FBRyxRQUFRO2dCQWpEMUMsVUFBVTs7SUFxR1osK0JBQUM7Q0FBQSxBQXpERCxDQUM4QyxjQUFjLEdBd0QzRDtTQXhEWSx3QkFBd0I7Ozs7OztJQUtqQyw4Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBIdHRwQmFja2VuZCxcbiAgSHR0cEV2ZW50LFxuICBIdHRwSGVhZGVycyxcbiAgSHR0cFBhcmFtcyxcbiAgSHR0cFJlcXVlc3QsXG4gIEh0dHBSZXNwb25zZSwgSHR0cFJlc3BvbnNlQmFzZSxcbiAgSHR0cFhockJhY2tlbmQsXG4gIFhockZhY3Rvcnlcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFNUQVRVUyB9IGZyb20gJy4vaHR0cC1zdGF0dXMtY29kZXMnO1xuXG5pbXBvcnQge1xuICBJbk1lbW9yeUJhY2tlbmRDb25maWcsXG4gIEluTWVtb3J5QmFja2VuZENvbmZpZ0FyZ3MsXG4gIEluTWVtb3J5RGJTZXJ2aWNlLFxuICBSZXNwb25zZU9wdGlvbnNcbn0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IHsgQmFja2VuZFNlcnZpY2UgfSBmcm9tICcuL2JhY2tlbmQuc2VydmljZSc7XG5cbi8qKlxuICogRm9yIEFuZ3VsYXIgYEh0dHBDbGllbnRgIHNpbXVsYXRlIHRoZSBiZWhhdmlvciBvZiBhIFJFU1R5IHdlYiBhcGlcbiAqIGJhY2tlZCBieSB0aGUgc2ltcGxlIGluLW1lbW9yeSBkYXRhIHN0b3JlIHByb3ZpZGVkIGJ5IHRoZSBpbmplY3RlZCBgSW5NZW1vcnlEYlNlcnZpY2VgLlxuICogQ29uZm9ybXMgbW9zdGx5IHRvIGJlaGF2aW9yIGRlc2NyaWJlZCBoZXJlOlxuICogaHR0cDovL3d3dy5yZXN0YXBpdHV0b3JpYWwuY29tL2xlc3NvbnMvaHR0cG1ldGhvZHMuaHRtbFxuICpcbiAqICMjIyBVc2FnZVxuICpcbiAqIENyZWF0ZSBhbiBpbi1tZW1vcnkgZGF0YSBzdG9yZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgYEluTWVtb3J5RGJTZXJ2aWNlYC5cbiAqIENhbGwgYGNvbmZpZ2Agc3RhdGljIG1ldGhvZCB3aXRoIHRoaXMgc2VydmljZSBjbGFzcyBhbmQgb3B0aW9uYWwgY29uZmlndXJhdGlvbiBvYmplY3Q6XG4gKiBgYGBcbiAqIC8vIG90aGVyIGltcG9ydHNcbiAqIGltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG4gKiBpbXBvcnQgeyBIdHRwQ2xpZW50SW5NZW1vcnlXZWJBcGlNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWluLW1lbW9yeS13ZWItYXBpJztcbiAqXG4gKiBpbXBvcnQgeyBJbk1lbUhlcm9TZXJ2aWNlLCBpbk1lbUNvbmZpZyB9IGZyb20gJy4uL2FwaS9pbi1tZW1vcnktaGVyby5zZXJ2aWNlJztcbiAqIEBOZ01vZHVsZSh7XG4gKiAgaW1wb3J0czogW1xuICogICAgSHR0cE1vZHVsZSxcbiAqICAgIEh0dHBDbGllbnRJbk1lbW9yeVdlYkFwaU1vZHVsZS5mb3JSb290KEluTWVtSGVyb1NlcnZpY2UsIGluTWVtQ29uZmlnKSxcbiAqICAgIC4uLlxuICogIF0sXG4gKiAgLi4uXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IC4uLiB9XG4gKiBgYGBcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHBDbGllbnRCYWNrZW5kU2VydmljZSBleHRlbmRzIEJhY2tlbmRTZXJ2aWNlIGltcGxlbWVudHMgSHR0cEJhY2tlbmQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGluTWVtRGJTZXJ2aWNlOiBJbk1lbW9yeURiU2VydmljZSxcbiAgICBASW5qZWN0KEluTWVtb3J5QmFja2VuZENvbmZpZykgQE9wdGlvbmFsKCkgY29uZmlnOiBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzLFxuICAgIHByaXZhdGUgeGhyRmFjdG9yeTogWGhyRmFjdG9yeVxuICAgICkge1xuICAgIHN1cGVyKGluTWVtRGJTZXJ2aWNlLCBjb25maWcpO1xuICB9XG5cbiAgaGFuZGxlKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdChyZXEpO1xuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVyciA9IGVycm9yLm1lc3NhZ2UgfHwgZXJyb3I7XG4gICAgICBjb25zdCByZXNPcHRpb25zID0gdGhpcy5jcmVhdGVFcnJvclJlc3BvbnNlT3B0aW9ucyhyZXEudXJsLCBTVEFUVVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLCBgJHtlcnJ9YCk7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXNwb25zZSQoKCkgPT4gcmVzT3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgLy8vLyAgcHJvdGVjdGVkIG92ZXJyaWRlcyAvLy8vL1xuXG4gIHByb3RlY3RlZCBnZXRKc29uQm9keShyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBhbnkge1xuICAgIHJldHVybiByZXEuYm9keTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRSZXF1ZXN0TWV0aG9kKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IHN0cmluZyB7XG4gICAgcmV0dXJuIChyZXEubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZUhlYWRlcnMoaGVhZGVyczogeyBbaW5kZXg6IHN0cmluZ106IHN0cmluZzsgfSk6IEh0dHBIZWFkZXJzIHtcbiAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKGhlYWRlcnMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVF1ZXJ5TWFwKHNlYXJjaDogc3RyaW5nKTogTWFwPHN0cmluZywgc3RyaW5nW10+IHtcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nW10+KCk7XG4gICAgaWYgKHNlYXJjaCkge1xuICAgICAgY29uc3QgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoe2Zyb21TdHJpbmc6IHNlYXJjaH0pO1xuICAgICAgcGFyYW1zLmtleXMoKS5mb3JFYWNoKHAgPT4gbWFwLnNldChwLCBwYXJhbXMuZ2V0QWxsKHApKSk7XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlUmVzcG9uc2UkZnJvbVJlc3BvbnNlT3B0aW9ucyQocmVzT3B0aW9ucyQ6IE9ic2VydmFibGU8UmVzcG9uc2VPcHRpb25zPik6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPGFueT4+IHtcbiAgICByZXR1cm4gcmVzT3B0aW9ucyQucGlwZShtYXAoKG9wdHM6IEh0dHBSZXNwb25zZUJhc2UpID0+IG5ldyBIdHRwUmVzcG9uc2U8YW55PihvcHRzKSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVBhc3NUaHJ1QmFja2VuZCgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG5ldyBIdHRwWGhyQmFja2VuZCh0aGlzLnhockZhY3RvcnkpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBleC5tZXNzYWdlID0gJ0Nhbm5vdCBjcmVhdGUgcGFzc1RocnU0MDQgYmFja2VuZDsgJyArIChleC5tZXNzYWdlIHx8ICcnKTtcbiAgICAgIHRocm93IGV4O1xuICAgIH1cbiAgfVxufVxuIl19