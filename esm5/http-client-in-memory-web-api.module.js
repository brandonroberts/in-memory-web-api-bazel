/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
////// HttpClient-Only version ////
import { NgModule } from '@angular/core';
import { HttpBackend, XhrFactory } from '@angular/common/http';
import { InMemoryBackendConfig, InMemoryDbService } from './interfaces';
import { HttpClientBackendService } from './http-client-backend.service';
// Internal - Creates the in-mem backend for the HttpClient module
// AoT requires factory to be exported
/**
 * @param {?} dbService
 * @param {?} options
 * @param {?} xhrFactory
 * @return {?}
 */
export function httpClientInMemBackendServiceFactory(dbService, options, xhrFactory) {
    /** @type {?} */
    var backend = new HttpClientBackendService(dbService, options, xhrFactory);
    return backend;
}
var HttpClientInMemoryWebApiModule = /** @class */ (function () {
    function HttpClientInMemoryWebApiModule() {
    }
    /**
    *  Redirect the Angular `HttpClient` XHR calls
    *  to in-memory data store that implements `InMemoryDbService`.
    *  with class that implements InMemoryDbService and creates an in-memory database.
    *
    *  Usually imported in the root application module.
    *  Can import in a lazy feature module too, which will shadow modules loaded earlier
    *
    * @param dbCreator - Class that creates seed data for in-memory database. Must implement InMemoryDbService.
    * @param options
    *
    * @example
    * HttpInMemoryWebApiModule.forRoot(dbCreator);
    * HttpInMemoryWebApiModule.forRoot(dbCreator, {useValue: {delay:600}});
    */
    /**
     *  Redirect the Angular `HttpClient` XHR calls
     *  to in-memory data store that implements `InMemoryDbService`.
     *  with class that implements InMemoryDbService and creates an in-memory database.
     *
     *  Usually imported in the root application module.
     *  Can import in a lazy feature module too, which will shadow modules loaded earlier
     *
     * \@example
     * HttpInMemoryWebApiModule.forRoot(dbCreator);
     * HttpInMemoryWebApiModule.forRoot(dbCreator, {useValue: {delay:600}});
     * @param {?} dbCreator - Class that creates seed data for in-memory database. Must implement InMemoryDbService.
     * @param {?=} options
     *
     * @return {?}
     */
    HttpClientInMemoryWebApiModule.forRoot = /**
     *  Redirect the Angular `HttpClient` XHR calls
     *  to in-memory data store that implements `InMemoryDbService`.
     *  with class that implements InMemoryDbService and creates an in-memory database.
     *
     *  Usually imported in the root application module.
     *  Can import in a lazy feature module too, which will shadow modules loaded earlier
     *
     * \@example
     * HttpInMemoryWebApiModule.forRoot(dbCreator);
     * HttpInMemoryWebApiModule.forRoot(dbCreator, {useValue: {delay:600}});
     * @param {?} dbCreator - Class that creates seed data for in-memory database. Must implement InMemoryDbService.
     * @param {?=} options
     *
     * @return {?}
     */
    function (dbCreator, options) {
        return {
            ngModule: HttpClientInMemoryWebApiModule,
            providers: [
                { provide: InMemoryDbService, useClass: dbCreator },
                { provide: InMemoryBackendConfig, useValue: options },
                { provide: HttpBackend,
                    useFactory: httpClientInMemBackendServiceFactory,
                    deps: [InMemoryDbService, InMemoryBackendConfig, XhrFactory] }
            ]
        };
    };
    /**
   *
   * Enable and configure the in-memory web api in a lazy-loaded feature module.
   * Same as `forRoot`.
   * This is a feel-good method so you can follow the Angular style guide for lazy-loaded modules.
   */
    /**
     *
     * Enable and configure the in-memory web api in a lazy-loaded feature module.
     * Same as `forRoot`.
     * This is a feel-good method so you can follow the Angular style guide for lazy-loaded modules.
     * @param {?} dbCreator
     * @param {?=} options
     * @return {?}
     */
    HttpClientInMemoryWebApiModule.forFeature = /**
     *
     * Enable and configure the in-memory web api in a lazy-loaded feature module.
     * Same as `forRoot`.
     * This is a feel-good method so you can follow the Angular style guide for lazy-loaded modules.
     * @param {?} dbCreator
     * @param {?=} options
     * @return {?}
     */
    function (dbCreator, options) {
        return HttpClientInMemoryWebApiModule.forRoot(dbCreator, options);
    };
    HttpClientInMemoryWebApiModule.decorators = [
        { type: NgModule, args: [{},] }
    ];
    return HttpClientInMemoryWebApiModule;
}());
export { HttpClientInMemoryWebApiModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQtaW4tbWVtb3J5LXdlYi1hcGkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbi1tZW1vcnktd2ViLWFwaS8iLCJzb3VyY2VzIjpbImh0dHAtY2xpZW50LWluLW1lbW9yeS13ZWItYXBpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxRQUFRLEVBQTZCLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFL0QsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixpQkFBaUIsRUFDbEIsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7OztBQUl6RSxNQUFNLFVBQVUsb0NBQW9DLENBQ2xELFNBQTRCLEVBQzVCLE9BQThCLEVBQzlCLFVBQXNCOztRQUVoQixPQUFPLEdBQVEsSUFBSSx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQztJQUNqRixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQ7SUFBQTtJQXVDQSxDQUFDO0lBckNDOzs7Ozs7Ozs7Ozs7OztNQWNFOzs7Ozs7Ozs7Ozs7Ozs7OztJQUNLLHNDQUFPOzs7Ozs7Ozs7Ozs7Ozs7O0lBQWQsVUFBZSxTQUFrQyxFQUFFLE9BQW1DO1FBQ3BGLE9BQU87WUFDTCxRQUFRLEVBQUUsOEJBQThCO1lBQ3hDLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRyxRQUFRLEVBQUUsU0FBUyxFQUFFO2dCQUNwRCxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO2dCQUVyRCxFQUFFLE9BQU8sRUFBRSxXQUFXO29CQUNwQixVQUFVLEVBQUUsb0NBQW9DO29CQUNoRCxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxxQkFBcUIsRUFBRSxVQUFVLENBQUMsRUFBQzthQUNoRTtTQUNGLENBQUM7SUFDSixDQUFDO0lBQ0M7Ozs7O0tBS0M7Ozs7Ozs7Ozs7SUFDSSx5Q0FBVTs7Ozs7Ozs7O0lBQWpCLFVBQWtCLFNBQWtDLEVBQUUsT0FBbUM7UUFDdkYsT0FBTyw4QkFBOEIsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7O2dCQXRDRixRQUFRLFNBQUMsRUFBRTs7SUF1Q1oscUNBQUM7Q0FBQSxBQXZDRCxJQXVDQztTQXRDWSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8vLy8gSHR0cENsaWVudC1Pbmx5IHZlcnNpb24gLy8vL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEJhY2tlbmQsIFhockZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7XG4gIEluTWVtb3J5QmFja2VuZENvbmZpZ0FyZ3MsXG4gIEluTWVtb3J5QmFja2VuZENvbmZpZyxcbiAgSW5NZW1vcnlEYlNlcnZpY2Vcbn0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IHsgSHR0cENsaWVudEJhY2tlbmRTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLWNsaWVudC1iYWNrZW5kLnNlcnZpY2UnO1xuXG4vLyBJbnRlcm5hbCAtIENyZWF0ZXMgdGhlIGluLW1lbSBiYWNrZW5kIGZvciB0aGUgSHR0cENsaWVudCBtb2R1bGVcbi8vIEFvVCByZXF1aXJlcyBmYWN0b3J5IHRvIGJlIGV4cG9ydGVkXG5leHBvcnQgZnVuY3Rpb24gaHR0cENsaWVudEluTWVtQmFja2VuZFNlcnZpY2VGYWN0b3J5KFxuICBkYlNlcnZpY2U6IEluTWVtb3J5RGJTZXJ2aWNlLFxuICBvcHRpb25zOiBJbk1lbW9yeUJhY2tlbmRDb25maWcsXG4gIHhockZhY3Rvcnk6IFhockZhY3RvcnksXG4pOiBIdHRwQmFja2VuZCB7XG4gIGNvbnN0IGJhY2tlbmQ6IGFueSA9IG5ldyBIdHRwQ2xpZW50QmFja2VuZFNlcnZpY2UoZGJTZXJ2aWNlLCBvcHRpb25zLCB4aHJGYWN0b3J5KTtcbiAgcmV0dXJuIGJhY2tlbmQ7XG59XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBIdHRwQ2xpZW50SW5NZW1vcnlXZWJBcGlNb2R1bGUge1xuICAvKipcbiAgKiAgUmVkaXJlY3QgdGhlIEFuZ3VsYXIgYEh0dHBDbGllbnRgIFhIUiBjYWxsc1xuICAqICB0byBpbi1tZW1vcnkgZGF0YSBzdG9yZSB0aGF0IGltcGxlbWVudHMgYEluTWVtb3J5RGJTZXJ2aWNlYC5cbiAgKiAgd2l0aCBjbGFzcyB0aGF0IGltcGxlbWVudHMgSW5NZW1vcnlEYlNlcnZpY2UgYW5kIGNyZWF0ZXMgYW4gaW4tbWVtb3J5IGRhdGFiYXNlLlxuICAqXG4gICogIFVzdWFsbHkgaW1wb3J0ZWQgaW4gdGhlIHJvb3QgYXBwbGljYXRpb24gbW9kdWxlLlxuICAqICBDYW4gaW1wb3J0IGluIGEgbGF6eSBmZWF0dXJlIG1vZHVsZSB0b28sIHdoaWNoIHdpbGwgc2hhZG93IG1vZHVsZXMgbG9hZGVkIGVhcmxpZXJcbiAgKlxuICAqIEBwYXJhbSBkYkNyZWF0b3IgLSBDbGFzcyB0aGF0IGNyZWF0ZXMgc2VlZCBkYXRhIGZvciBpbi1tZW1vcnkgZGF0YWJhc2UuIE11c3QgaW1wbGVtZW50IEluTWVtb3J5RGJTZXJ2aWNlLlxuICAqIEBwYXJhbSBvcHRpb25zXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIEh0dHBJbk1lbW9yeVdlYkFwaU1vZHVsZS5mb3JSb290KGRiQ3JlYXRvcik7XG4gICogSHR0cEluTWVtb3J5V2ViQXBpTW9kdWxlLmZvclJvb3QoZGJDcmVhdG9yLCB7dXNlVmFsdWU6IHtkZWxheTo2MDB9fSk7XG4gICovXG4gIHN0YXRpYyBmb3JSb290KGRiQ3JlYXRvcjogVHlwZTxJbk1lbW9yeURiU2VydmljZT4sIG9wdGlvbnM/OiBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBIdHRwQ2xpZW50SW5NZW1vcnlXZWJBcGlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBJbk1lbW9yeURiU2VydmljZSwgIHVzZUNsYXNzOiBkYkNyZWF0b3IgfSxcbiAgICAgICAgeyBwcm92aWRlOiBJbk1lbW9yeUJhY2tlbmRDb25maWcsIHVzZVZhbHVlOiBvcHRpb25zIH0sXG5cbiAgICAgICAgeyBwcm92aWRlOiBIdHRwQmFja2VuZCxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBodHRwQ2xpZW50SW5NZW1CYWNrZW5kU2VydmljZUZhY3RvcnksXG4gICAgICAgICAgZGVwczogW0luTWVtb3J5RGJTZXJ2aWNlLCBJbk1lbW9yeUJhY2tlbmRDb25maWcsIFhockZhY3RvcnldfVxuICAgICAgXVxuICAgIH07XG4gIH1cbiAgICAvKipcbiAgICpcbiAgICogRW5hYmxlIGFuZCBjb25maWd1cmUgdGhlIGluLW1lbW9yeSB3ZWIgYXBpIGluIGEgbGF6eS1sb2FkZWQgZmVhdHVyZSBtb2R1bGUuXG4gICAqIFNhbWUgYXMgYGZvclJvb3RgLlxuICAgKiBUaGlzIGlzIGEgZmVlbC1nb29kIG1ldGhvZCBzbyB5b3UgY2FuIGZvbGxvdyB0aGUgQW5ndWxhciBzdHlsZSBndWlkZSBmb3IgbGF6eS1sb2FkZWQgbW9kdWxlcy5cbiAgICovXG4gIHN0YXRpYyBmb3JGZWF0dXJlKGRiQ3JlYXRvcjogVHlwZTxJbk1lbW9yeURiU2VydmljZT4sIG9wdGlvbnM/OiBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIEh0dHBDbGllbnRJbk1lbW9yeVdlYkFwaU1vZHVsZS5mb3JSb290KGRiQ3JlYXRvciwgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==