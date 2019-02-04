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
     *
     * \@example
     * HttpInMemoryWebApiModule.forRoot(dbCreator);
     * HttpInMemoryWebApiModule.forRoot(dbCreator, {useValue: {delay:600}});
     * @param {?} dbCreator
     * @param {?=} options
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQtaW4tbWVtb3J5LXdlYi1hcGkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbi1tZW1vcnktd2ViLWFwaS8iLCJzb3VyY2VzIjpbImh0dHAtY2xpZW50LWluLW1lbW9yeS13ZWItYXBpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxRQUFRLEVBQTZCLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFL0QsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixpQkFBaUIsRUFDbEIsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7OztBQUl6RSxNQUFNLFVBQVUsb0NBQW9DLENBQ2xELFNBQTRCLEVBQzVCLE9BQThCLEVBQzlCLFVBQXNCOztVQUVoQixPQUFPLEdBQVEsSUFBSSx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQztJQUNqRixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBR0QsTUFBTSxPQUFPLDhCQUE4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQnpDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBa0MsRUFBRSxPQUFtQztRQUNwRixPQUFPO1lBQ0wsUUFBUSxFQUFFLDhCQUE4QjtZQUN4QyxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUcsUUFBUSxFQUFFLFNBQVMsRUFBRTtnQkFDcEQsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtnQkFFckQsRUFBRSxPQUFPLEVBQUUsV0FBVztvQkFDcEIsVUFBVSxFQUFFLG9DQUFvQztvQkFDaEQsSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxDQUFDLEVBQUM7YUFDaEU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Ozs7Ozs7OztJQU9ELE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBa0MsRUFBRSxPQUFtQztRQUN2RixPQUFPLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7O1lBdENGLFFBQVEsU0FBQyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLy8vLy8vIEh0dHBDbGllbnQtT25seSB2ZXJzaW9uIC8vLy9cblxuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBCYWNrZW5kLCBYaHJGYWN0b3J5IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQge1xuICBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzLFxuICBJbk1lbW9yeUJhY2tlbmRDb25maWcsXG4gIEluTWVtb3J5RGJTZXJ2aWNlXG59IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IEh0dHBDbGllbnRCYWNrZW5kU2VydmljZSB9IGZyb20gJy4vaHR0cC1jbGllbnQtYmFja2VuZC5zZXJ2aWNlJztcblxuLy8gSW50ZXJuYWwgLSBDcmVhdGVzIHRoZSBpbi1tZW0gYmFja2VuZCBmb3IgdGhlIEh0dHBDbGllbnQgbW9kdWxlXG4vLyBBb1QgcmVxdWlyZXMgZmFjdG9yeSB0byBiZSBleHBvcnRlZFxuZXhwb3J0IGZ1bmN0aW9uIGh0dHBDbGllbnRJbk1lbUJhY2tlbmRTZXJ2aWNlRmFjdG9yeShcbiAgZGJTZXJ2aWNlOiBJbk1lbW9yeURiU2VydmljZSxcbiAgb3B0aW9uczogSW5NZW1vcnlCYWNrZW5kQ29uZmlnLFxuICB4aHJGYWN0b3J5OiBYaHJGYWN0b3J5LFxuKTogSHR0cEJhY2tlbmQge1xuICBjb25zdCBiYWNrZW5kOiBhbnkgPSBuZXcgSHR0cENsaWVudEJhY2tlbmRTZXJ2aWNlKGRiU2VydmljZSwgb3B0aW9ucywgeGhyRmFjdG9yeSk7XG4gIHJldHVybiBiYWNrZW5kO1xufVxuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgSHR0cENsaWVudEluTWVtb3J5V2ViQXBpTW9kdWxlIHtcbiAgLyoqXG4gICogIFJlZGlyZWN0IHRoZSBBbmd1bGFyIGBIdHRwQ2xpZW50YCBYSFIgY2FsbHNcbiAgKiAgdG8gaW4tbWVtb3J5IGRhdGEgc3RvcmUgdGhhdCBpbXBsZW1lbnRzIGBJbk1lbW9yeURiU2VydmljZWAuXG4gICogIHdpdGggY2xhc3MgdGhhdCBpbXBsZW1lbnRzIEluTWVtb3J5RGJTZXJ2aWNlIGFuZCBjcmVhdGVzIGFuIGluLW1lbW9yeSBkYXRhYmFzZS5cbiAgKlxuICAqICBVc3VhbGx5IGltcG9ydGVkIGluIHRoZSByb290IGFwcGxpY2F0aW9uIG1vZHVsZS5cbiAgKiAgQ2FuIGltcG9ydCBpbiBhIGxhenkgZmVhdHVyZSBtb2R1bGUgdG9vLCB3aGljaCB3aWxsIHNoYWRvdyBtb2R1bGVzIGxvYWRlZCBlYXJsaWVyXG4gICpcbiAgKiBAcGFyYW0ge1R5cGV9IGRiQ3JlYXRvciAtIENsYXNzIHRoYXQgY3JlYXRlcyBzZWVkIGRhdGEgZm9yIGluLW1lbW9yeSBkYXRhYmFzZS4gTXVzdCBpbXBsZW1lbnQgSW5NZW1vcnlEYlNlcnZpY2UuXG4gICogQHBhcmFtIHtJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzfSBbb3B0aW9uc11cbiAgKlxuICAqIEBleGFtcGxlXG4gICogSHR0cEluTWVtb3J5V2ViQXBpTW9kdWxlLmZvclJvb3QoZGJDcmVhdG9yKTtcbiAgKiBIdHRwSW5NZW1vcnlXZWJBcGlNb2R1bGUuZm9yUm9vdChkYkNyZWF0b3IsIHt1c2VWYWx1ZToge2RlbGF5OjYwMH19KTtcbiAgKi9cbiAgc3RhdGljIGZvclJvb3QoZGJDcmVhdG9yOiBUeXBlPEluTWVtb3J5RGJTZXJ2aWNlPiwgb3B0aW9ucz86IEluTWVtb3J5QmFja2VuZENvbmZpZ0FyZ3MpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEh0dHBDbGllbnRJbk1lbW9yeVdlYkFwaU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEluTWVtb3J5RGJTZXJ2aWNlLCAgdXNlQ2xhc3M6IGRiQ3JlYXRvciB9LFxuICAgICAgICB7IHByb3ZpZGU6IEluTWVtb3J5QmFja2VuZENvbmZpZywgdXNlVmFsdWU6IG9wdGlvbnMgfSxcblxuICAgICAgICB7IHByb3ZpZGU6IEh0dHBCYWNrZW5kLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IGh0dHBDbGllbnRJbk1lbUJhY2tlbmRTZXJ2aWNlRmFjdG9yeSxcbiAgICAgICAgICBkZXBzOiBbSW5NZW1vcnlEYlNlcnZpY2UsIEluTWVtb3J5QmFja2VuZENvbmZpZywgWGhyRmFjdG9yeV19XG4gICAgICBdXG4gICAgfTtcbiAgfVxuICAgIC8qKlxuICAgKlxuICAgKiBFbmFibGUgYW5kIGNvbmZpZ3VyZSB0aGUgaW4tbWVtb3J5IHdlYiBhcGkgaW4gYSBsYXp5LWxvYWRlZCBmZWF0dXJlIG1vZHVsZS5cbiAgICogU2FtZSBhcyBgZm9yUm9vdGAuXG4gICAqIFRoaXMgaXMgYSBmZWVsLWdvb2QgbWV0aG9kIHNvIHlvdSBjYW4gZm9sbG93IHRoZSBBbmd1bGFyIHN0eWxlIGd1aWRlIGZvciBsYXp5LWxvYWRlZCBtb2R1bGVzLlxuICAgKi9cbiAgc3RhdGljIGZvckZlYXR1cmUoZGJDcmVhdG9yOiBUeXBlPEluTWVtb3J5RGJTZXJ2aWNlPiwgb3B0aW9ucz86IEluTWVtb3J5QmFja2VuZENvbmZpZ0FyZ3MpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4gSHR0cENsaWVudEluTWVtb3J5V2ViQXBpTW9kdWxlLmZvclJvb3QoZGJDcmVhdG9yLCBvcHRpb25zKTtcbiAgfVxufVxuIl19