/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { HttpBackend, XhrFactory } from '@angular/common/http';
import { InMemoryBackendConfig, InMemoryDbService } from './interfaces';
import { HttpClientBackendService } from './http-client-backend.service';
/**
 * @param {?} dbService
 * @param {?} options
 * @param {?} xhrFactory
 * @return {?}
 */
export function httpClientInMemBackendServiceFactory(dbService, options, xhrFactory) {
    /** @type {?} */
    const backend = new HttpClientBackendService(dbService, options, xhrFactory);
    return backend;
}
export class HttpClientInMemoryWebApiModule {
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
     * @param {?=} options - Options for configuring the backend
     *
     * @return {?}
     */
    static forRoot(dbCreator, options) {
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
    }
    /**
     *
     * Enable and configure the in-memory web api in a lazy-loaded feature module.
     * Same as `forRoot`.
     * This is a feel-good method so you can follow the Angular style guide for lazy-loaded modules.
     * @param {?} dbCreator
     * @param {?=} options
     * @return {?}
     */
    static forFeature(dbCreator, options) {
        return HttpClientInMemoryWebApiModule.forRoot(dbCreator, options);
    }
}
HttpClientInMemoryWebApiModule.decorators = [
    { type: NgModule, args: [{},] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQtaW4tbWVtb3J5LXdlYi1hcGkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXItaW4tbWVtb3J5LXdlYi1hcGkvaHR0cC1jbGllbnQtaW4tbWVtb3J5LXdlYi1hcGkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsUUFBUSxFQUE2QixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRS9ELE9BQU8sRUFFTCxxQkFBcUIsRUFDckIsaUJBQWlCLEVBQ2xCLE1BQU0sY0FBYyxDQUFDO0FBRXRCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7Ozs7O0FBSXpFLE1BQU0sVUFBVSxvQ0FBb0MsQ0FDbEQsU0FBNEIsRUFDNUIsT0FBOEIsRUFDOUIsVUFBc0I7O0lBRXRCLE1BQU0sT0FBTyxHQUFRLElBQUksd0JBQXdCLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNsRixPQUFPLE9BQU8sQ0FBQztDQUNoQjtBQUdELE1BQU0sT0FBTyw4QkFBOEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0J6QyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQWtDLEVBQUUsT0FBbUM7UUFDcEYsT0FBTztZQUNMLFFBQVEsRUFBRSw4QkFBOEI7WUFDeEMsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFHLFFBQVEsRUFBRSxTQUFTLEVBQUU7Z0JBQ3BELEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7Z0JBRXJELEVBQUUsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLFVBQVUsRUFBRSxvQ0FBb0M7b0JBQ2hELElBQUksRUFBRSxDQUFDLGlCQUFpQixFQUFFLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxFQUFDO2FBQ2hFO1NBQ0YsQ0FBQztLQUNIOzs7Ozs7Ozs7O0lBT0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFrQyxFQUFFLE9BQW1DO1FBQ3ZGLE9BQU8sOEJBQThCLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNuRTs7O1lBdENGLFFBQVEsU0FBQyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLy8vLy8vIEh0dHBDbGllbnQtT25seSB2ZXJzaW9uIC8vLy9cblxuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBCYWNrZW5kLCBYaHJGYWN0b3J5IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQge1xuICBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzLFxuICBJbk1lbW9yeUJhY2tlbmRDb25maWcsXG4gIEluTWVtb3J5RGJTZXJ2aWNlXG59IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IEh0dHBDbGllbnRCYWNrZW5kU2VydmljZSB9IGZyb20gJy4vaHR0cC1jbGllbnQtYmFja2VuZC5zZXJ2aWNlJztcblxuLy8gSW50ZXJuYWwgLSBDcmVhdGVzIHRoZSBpbi1tZW0gYmFja2VuZCBmb3IgdGhlIEh0dHBDbGllbnQgbW9kdWxlXG4vLyBBb1QgcmVxdWlyZXMgZmFjdG9yeSB0byBiZSBleHBvcnRlZFxuZXhwb3J0IGZ1bmN0aW9uIGh0dHBDbGllbnRJbk1lbUJhY2tlbmRTZXJ2aWNlRmFjdG9yeShcbiAgZGJTZXJ2aWNlOiBJbk1lbW9yeURiU2VydmljZSxcbiAgb3B0aW9uczogSW5NZW1vcnlCYWNrZW5kQ29uZmlnLFxuICB4aHJGYWN0b3J5OiBYaHJGYWN0b3J5LFxuKTogSHR0cEJhY2tlbmQge1xuICBjb25zdCBiYWNrZW5kOiBhbnkgPSBuZXcgSHR0cENsaWVudEJhY2tlbmRTZXJ2aWNlKGRiU2VydmljZSwgb3B0aW9ucywgeGhyRmFjdG9yeSk7XG4gIHJldHVybiBiYWNrZW5kO1xufVxuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgSHR0cENsaWVudEluTWVtb3J5V2ViQXBpTW9kdWxlIHtcbiAgLyoqXG4gICogIFJlZGlyZWN0IHRoZSBBbmd1bGFyIGBIdHRwQ2xpZW50YCBYSFIgY2FsbHNcbiAgKiAgdG8gaW4tbWVtb3J5IGRhdGEgc3RvcmUgdGhhdCBpbXBsZW1lbnRzIGBJbk1lbW9yeURiU2VydmljZWAuXG4gICogIHdpdGggY2xhc3MgdGhhdCBpbXBsZW1lbnRzIEluTWVtb3J5RGJTZXJ2aWNlIGFuZCBjcmVhdGVzIGFuIGluLW1lbW9yeSBkYXRhYmFzZS5cbiAgKlxuICAqICBVc3VhbGx5IGltcG9ydGVkIGluIHRoZSByb290IGFwcGxpY2F0aW9uIG1vZHVsZS5cbiAgKiAgQ2FuIGltcG9ydCBpbiBhIGxhenkgZmVhdHVyZSBtb2R1bGUgdG9vLCB3aGljaCB3aWxsIHNoYWRvdyBtb2R1bGVzIGxvYWRlZCBlYXJsaWVyXG4gICpcbiAgKiBAcGFyYW0gZGJDcmVhdG9yIC0gQ2xhc3MgdGhhdCBjcmVhdGVzIHNlZWQgZGF0YSBmb3IgaW4tbWVtb3J5IGRhdGFiYXNlLiBNdXN0IGltcGxlbWVudCBJbk1lbW9yeURiU2VydmljZS5cbiAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIGNvbmZpZ3VyaW5nIHRoZSBiYWNrZW5kXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIEh0dHBJbk1lbW9yeVdlYkFwaU1vZHVsZS5mb3JSb290KGRiQ3JlYXRvcik7XG4gICogSHR0cEluTWVtb3J5V2ViQXBpTW9kdWxlLmZvclJvb3QoZGJDcmVhdG9yLCB7dXNlVmFsdWU6IHtkZWxheTo2MDB9fSk7XG4gICovXG4gIHN0YXRpYyBmb3JSb290KGRiQ3JlYXRvcjogVHlwZTxJbk1lbW9yeURiU2VydmljZT4sIG9wdGlvbnM/OiBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBIdHRwQ2xpZW50SW5NZW1vcnlXZWJBcGlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBJbk1lbW9yeURiU2VydmljZSwgIHVzZUNsYXNzOiBkYkNyZWF0b3IgfSxcbiAgICAgICAgeyBwcm92aWRlOiBJbk1lbW9yeUJhY2tlbmRDb25maWcsIHVzZVZhbHVlOiBvcHRpb25zIH0sXG5cbiAgICAgICAgeyBwcm92aWRlOiBIdHRwQmFja2VuZCxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBodHRwQ2xpZW50SW5NZW1CYWNrZW5kU2VydmljZUZhY3RvcnksXG4gICAgICAgICAgZGVwczogW0luTWVtb3J5RGJTZXJ2aWNlLCBJbk1lbW9yeUJhY2tlbmRDb25maWcsIFhockZhY3RvcnldfVxuICAgICAgXVxuICAgIH07XG4gIH1cbiAgICAvKipcbiAgICpcbiAgICogRW5hYmxlIGFuZCBjb25maWd1cmUgdGhlIGluLW1lbW9yeSB3ZWIgYXBpIGluIGEgbGF6eS1sb2FkZWQgZmVhdHVyZSBtb2R1bGUuXG4gICAqIFNhbWUgYXMgYGZvclJvb3RgLlxuICAgKiBUaGlzIGlzIGEgZmVlbC1nb29kIG1ldGhvZCBzbyB5b3UgY2FuIGZvbGxvdyB0aGUgQW5ndWxhciBzdHlsZSBndWlkZSBmb3IgbGF6eS1sb2FkZWQgbW9kdWxlcy5cbiAgICovXG4gIHN0YXRpYyBmb3JGZWF0dXJlKGRiQ3JlYXRvcjogVHlwZTxJbk1lbW9yeURiU2VydmljZT4sIG9wdGlvbnM/OiBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIEh0dHBDbGllbnRJbk1lbW9yeVdlYkFwaU1vZHVsZS5mb3JSb290KGRiQ3JlYXRvciwgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==