/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
////// For apps with both Http and HttpClient ////
import { NgModule } from '@angular/core';
import { HttpBackend, XhrFactory } from '@angular/common/http';
import { InMemoryBackendConfig, InMemoryDbService } from './interfaces';
import { httpClientInMemBackendServiceFactory } from './http-client-in-memory-web-api.module';
var InMemoryWebApiModule = /** @class */ (function () {
    function InMemoryWebApiModule() {
    }
    /**
    *  Redirect BOTH Angular `Http` and `HttpClient` XHR calls
    *  to in-memory data store that implements `InMemoryDbService`.
    *  with class that implements InMemoryDbService and creates an in-memory database.
    *
    *  Usually imported in the root application module.
    *  Can import in a lazy feature module too, which will shadow modules loaded earlier
    *
    * @param {Type} dbCreator - Class that creates seed data for in-memory database. Must implement InMemoryDbService.
    * @param {InMemoryBackendConfigArgs} [options]
    *
    * @example
    * InMemoryWebApiModule.forRoot(dbCreator);
    * InMemoryWebApiModule.forRoot(dbCreator, {useValue: {delay:600}});
    */
    /**
     *  Redirect BOTH Angular `Http` and `HttpClient` XHR calls
     *  to in-memory data store that implements `InMemoryDbService`.
     *  with class that implements InMemoryDbService and creates an in-memory database.
     *
     *  Usually imported in the root application module.
     *  Can import in a lazy feature module too, which will shadow modules loaded earlier
     *
     *
     * \@example
     * InMemoryWebApiModule.forRoot(dbCreator);
     * InMemoryWebApiModule.forRoot(dbCreator, {useValue: {delay:600}});
     * @param {?} dbCreator
     * @param {?=} options
     * @return {?}
     */
    InMemoryWebApiModule.forRoot = /**
     *  Redirect BOTH Angular `Http` and `HttpClient` XHR calls
     *  to in-memory data store that implements `InMemoryDbService`.
     *  with class that implements InMemoryDbService and creates an in-memory database.
     *
     *  Usually imported in the root application module.
     *  Can import in a lazy feature module too, which will shadow modules loaded earlier
     *
     *
     * \@example
     * InMemoryWebApiModule.forRoot(dbCreator);
     * InMemoryWebApiModule.forRoot(dbCreator, {useValue: {delay:600}});
     * @param {?} dbCreator
     * @param {?=} options
     * @return {?}
     */
    function (dbCreator, options) {
        return {
            ngModule: InMemoryWebApiModule,
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
    InMemoryWebApiModule.forFeature = /**
     *
     * Enable and configure the in-memory web api in a lazy-loaded feature module.
     * Same as `forRoot`.
     * This is a feel-good method so you can follow the Angular style guide for lazy-loaded modules.
     * @param {?} dbCreator
     * @param {?=} options
     * @return {?}
     */
    function (dbCreator, options) {
        return InMemoryWebApiModule.forRoot(dbCreator, options);
    };
    InMemoryWebApiModule.decorators = [
        { type: NgModule, args: [{},] }
    ];
    return InMemoryWebApiModule;
}());
export { InMemoryWebApiModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW4tbWVtb3J5LXdlYi1hcGkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbi1tZW1vcnktd2ViLWFwaS8iLCJzb3VyY2VzIjpbImluLW1lbW9yeS13ZWItYXBpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBWSxRQUFRLEVBQTZCLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFL0QsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixpQkFBaUIsRUFDbEIsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFOUY7SUFBQTtJQXlDQSxDQUFDO0lBdkNDOzs7Ozs7Ozs7Ozs7OztNQWNFOzs7Ozs7Ozs7Ozs7Ozs7OztJQUNLLDRCQUFPOzs7Ozs7Ozs7Ozs7Ozs7O0lBQWQsVUFBZSxTQUFrQyxFQUFFLE9BQW1DO1FBQ3BGLE9BQU87WUFDTCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRyxRQUFRLEVBQUUsU0FBUyxFQUFFO2dCQUNwRCxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO2dCQUdyRCxFQUFFLE9BQU8sRUFBRSxXQUFXO29CQUNwQixVQUFVLEVBQUUsb0NBQW9DO29CQUNoRCxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxxQkFBcUIsRUFBRSxVQUFVLENBQUMsRUFBQzthQUNoRTtTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7Ozs7SUFDSSwrQkFBVTs7Ozs7Ozs7O0lBQWpCLFVBQWtCLFNBQWtDLEVBQUUsT0FBbUM7UUFDdkYsT0FBTyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFELENBQUM7O2dCQXhDRixRQUFRLFNBQUMsRUFBRTs7SUF5Q1osMkJBQUM7Q0FBQSxBQXpDRCxJQXlDQztTQXhDWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8vLy8gRm9yIGFwcHMgd2l0aCBib3RoIEh0dHAgYW5kIEh0dHBDbGllbnQgLy8vL1xuXG5pbXBvcnQgeyBJbmplY3RvciwgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBCYWNrZW5kLCBYaHJGYWN0b3J5IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQge1xuICBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzLFxuICBJbk1lbW9yeUJhY2tlbmRDb25maWcsXG4gIEluTWVtb3J5RGJTZXJ2aWNlXG59IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IGh0dHBDbGllbnRJbk1lbUJhY2tlbmRTZXJ2aWNlRmFjdG9yeSB9IGZyb20gJy4vaHR0cC1jbGllbnQtaW4tbWVtb3J5LXdlYi1hcGkubW9kdWxlJztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIEluTWVtb3J5V2ViQXBpTW9kdWxlIHtcbiAgLyoqXG4gICogIFJlZGlyZWN0IEJPVEggQW5ndWxhciBgSHR0cGAgYW5kIGBIdHRwQ2xpZW50YCBYSFIgY2FsbHNcbiAgKiAgdG8gaW4tbWVtb3J5IGRhdGEgc3RvcmUgdGhhdCBpbXBsZW1lbnRzIGBJbk1lbW9yeURiU2VydmljZWAuXG4gICogIHdpdGggY2xhc3MgdGhhdCBpbXBsZW1lbnRzIEluTWVtb3J5RGJTZXJ2aWNlIGFuZCBjcmVhdGVzIGFuIGluLW1lbW9yeSBkYXRhYmFzZS5cbiAgKlxuICAqICBVc3VhbGx5IGltcG9ydGVkIGluIHRoZSByb290IGFwcGxpY2F0aW9uIG1vZHVsZS5cbiAgKiAgQ2FuIGltcG9ydCBpbiBhIGxhenkgZmVhdHVyZSBtb2R1bGUgdG9vLCB3aGljaCB3aWxsIHNoYWRvdyBtb2R1bGVzIGxvYWRlZCBlYXJsaWVyXG4gICpcbiAgKiBAcGFyYW0ge1R5cGV9IGRiQ3JlYXRvciAtIENsYXNzIHRoYXQgY3JlYXRlcyBzZWVkIGRhdGEgZm9yIGluLW1lbW9yeSBkYXRhYmFzZS4gTXVzdCBpbXBsZW1lbnQgSW5NZW1vcnlEYlNlcnZpY2UuXG4gICogQHBhcmFtIHtJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzfSBbb3B0aW9uc11cbiAgKlxuICAqIEBleGFtcGxlXG4gICogSW5NZW1vcnlXZWJBcGlNb2R1bGUuZm9yUm9vdChkYkNyZWF0b3IpO1xuICAqIEluTWVtb3J5V2ViQXBpTW9kdWxlLmZvclJvb3QoZGJDcmVhdG9yLCB7dXNlVmFsdWU6IHtkZWxheTo2MDB9fSk7XG4gICovXG4gIHN0YXRpYyBmb3JSb290KGRiQ3JlYXRvcjogVHlwZTxJbk1lbW9yeURiU2VydmljZT4sIG9wdGlvbnM/OiBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBJbk1lbW9yeVdlYkFwaU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEluTWVtb3J5RGJTZXJ2aWNlLCAgdXNlQ2xhc3M6IGRiQ3JlYXRvciB9LFxuICAgICAgICB7IHByb3ZpZGU6IEluTWVtb3J5QmFja2VuZENvbmZpZywgdXNlVmFsdWU6IG9wdGlvbnMgfSxcblxuXG4gICAgICAgIHsgcHJvdmlkZTogSHR0cEJhY2tlbmQsXG4gICAgICAgICAgdXNlRmFjdG9yeTogaHR0cENsaWVudEluTWVtQmFja2VuZFNlcnZpY2VGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtJbk1lbW9yeURiU2VydmljZSwgSW5NZW1vcnlCYWNrZW5kQ29uZmlnLCBYaHJGYWN0b3J5XX1cbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEVuYWJsZSBhbmQgY29uZmlndXJlIHRoZSBpbi1tZW1vcnkgd2ViIGFwaSBpbiBhIGxhenktbG9hZGVkIGZlYXR1cmUgbW9kdWxlLlxuICAgKiBTYW1lIGFzIGBmb3JSb290YC5cbiAgICogVGhpcyBpcyBhIGZlZWwtZ29vZCBtZXRob2Qgc28geW91IGNhbiBmb2xsb3cgdGhlIEFuZ3VsYXIgc3R5bGUgZ3VpZGUgZm9yIGxhenktbG9hZGVkIG1vZHVsZXMuXG4gICAqL1xuICBzdGF0aWMgZm9yRmVhdHVyZShkYkNyZWF0b3I6IFR5cGU8SW5NZW1vcnlEYlNlcnZpY2U+LCBvcHRpb25zPzogSW5NZW1vcnlCYWNrZW5kQ29uZmlnQXJncyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiBJbk1lbW9yeVdlYkFwaU1vZHVsZS5mb3JSb290KGRiQ3JlYXRvciwgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==