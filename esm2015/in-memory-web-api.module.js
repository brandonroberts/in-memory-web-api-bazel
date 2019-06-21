/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
////// For apps with both Http and HttpClient ////
import { NgModule } from '@angular/core';
import { HttpBackend, XhrFactory } from '@angular/common/http';
import { InMemoryBackendConfig, InMemoryDbService } from './interfaces';
import { httpClientInMemBackendServiceFactory } from './http-client-in-memory-web-api.module';
export class InMemoryWebApiModule {
    /**
     *  Redirect BOTH Angular `Http` and `HttpClient` XHR calls
     *  to in-memory data store that implements `InMemoryDbService`.
     *  with class that implements InMemoryDbService and creates an in-memory database.
     *
     *  Usually imported in the root application module.
     *  Can import in a lazy feature module too, which will shadow modules loaded earlier
     *
     * \@example
     * InMemoryWebApiModule.forRoot(dbCreator);
     * InMemoryWebApiModule.forRoot(dbCreator, {useValue: {delay:600}});
     * @param {?} dbCreator - Class that creates seed data for in-memory database. Must implement InMemoryDbService.
     * @param {?=} options
     *
     * @return {?}
     */
    static forRoot(dbCreator, options) {
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
        return InMemoryWebApiModule.forRoot(dbCreator, options);
    }
}
InMemoryWebApiModule.decorators = [
    { type: NgModule, args: [{},] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW4tbWVtb3J5LXdlYi1hcGkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1pbi1tZW1vcnktd2ViLWFwaS8iLCJzb3VyY2VzIjpbImluLW1lbW9yeS13ZWItYXBpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBWSxRQUFRLEVBQTZCLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFL0QsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixpQkFBaUIsRUFDbEIsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFHOUYsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQi9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBa0MsRUFBRSxPQUFtQztRQUNwRixPQUFPO1lBQ0wsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUcsUUFBUSxFQUFFLFNBQVMsRUFBRTtnQkFDcEQsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtnQkFHckQsRUFBRSxPQUFPLEVBQUUsV0FBVztvQkFDcEIsVUFBVSxFQUFFLG9DQUFvQztvQkFDaEQsSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxDQUFDLEVBQUM7YUFDaEU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Ozs7Ozs7OztJQVFELE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBa0MsRUFBRSxPQUFtQztRQUN2RixPQUFPLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7O1lBeENGLFFBQVEsU0FBQyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLy8vLy8vIEZvciBhcHBzIHdpdGggYm90aCBIdHRwIGFuZCBIdHRwQ2xpZW50IC8vLy9cblxuaW1wb3J0IHsgSW5qZWN0b3IsIE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQmFja2VuZCwgWGhyRmFjdG9yeSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHtcbiAgSW5NZW1vcnlCYWNrZW5kQ29uZmlnQXJncyxcbiAgSW5NZW1vcnlCYWNrZW5kQ29uZmlnLFxuICBJbk1lbW9yeURiU2VydmljZVxufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBodHRwQ2xpZW50SW5NZW1CYWNrZW5kU2VydmljZUZhY3RvcnkgfSBmcm9tICcuL2h0dHAtY2xpZW50LWluLW1lbW9yeS13ZWItYXBpLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBJbk1lbW9yeVdlYkFwaU1vZHVsZSB7XG4gIC8qKlxuICAqICBSZWRpcmVjdCBCT1RIIEFuZ3VsYXIgYEh0dHBgIGFuZCBgSHR0cENsaWVudGAgWEhSIGNhbGxzXG4gICogIHRvIGluLW1lbW9yeSBkYXRhIHN0b3JlIHRoYXQgaW1wbGVtZW50cyBgSW5NZW1vcnlEYlNlcnZpY2VgLlxuICAqICB3aXRoIGNsYXNzIHRoYXQgaW1wbGVtZW50cyBJbk1lbW9yeURiU2VydmljZSBhbmQgY3JlYXRlcyBhbiBpbi1tZW1vcnkgZGF0YWJhc2UuXG4gICpcbiAgKiAgVXN1YWxseSBpbXBvcnRlZCBpbiB0aGUgcm9vdCBhcHBsaWNhdGlvbiBtb2R1bGUuXG4gICogIENhbiBpbXBvcnQgaW4gYSBsYXp5IGZlYXR1cmUgbW9kdWxlIHRvbywgd2hpY2ggd2lsbCBzaGFkb3cgbW9kdWxlcyBsb2FkZWQgZWFybGllclxuICAqXG4gICogQHBhcmFtIGRiQ3JlYXRvciAtIENsYXNzIHRoYXQgY3JlYXRlcyBzZWVkIGRhdGEgZm9yIGluLW1lbW9yeSBkYXRhYmFzZS4gTXVzdCBpbXBsZW1lbnQgSW5NZW1vcnlEYlNlcnZpY2UuXG4gICogQHBhcmFtIG9wdGlvbnNcbiAgKlxuICAqIEBleGFtcGxlXG4gICogSW5NZW1vcnlXZWJBcGlNb2R1bGUuZm9yUm9vdChkYkNyZWF0b3IpO1xuICAqIEluTWVtb3J5V2ViQXBpTW9kdWxlLmZvclJvb3QoZGJDcmVhdG9yLCB7dXNlVmFsdWU6IHtkZWxheTo2MDB9fSk7XG4gICovXG4gIHN0YXRpYyBmb3JSb290KGRiQ3JlYXRvcjogVHlwZTxJbk1lbW9yeURiU2VydmljZT4sIG9wdGlvbnM/OiBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBJbk1lbW9yeVdlYkFwaU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEluTWVtb3J5RGJTZXJ2aWNlLCAgdXNlQ2xhc3M6IGRiQ3JlYXRvciB9LFxuICAgICAgICB7IHByb3ZpZGU6IEluTWVtb3J5QmFja2VuZENvbmZpZywgdXNlVmFsdWU6IG9wdGlvbnMgfSxcblxuXG4gICAgICAgIHsgcHJvdmlkZTogSHR0cEJhY2tlbmQsXG4gICAgICAgICAgdXNlRmFjdG9yeTogaHR0cENsaWVudEluTWVtQmFja2VuZFNlcnZpY2VGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtJbk1lbW9yeURiU2VydmljZSwgSW5NZW1vcnlCYWNrZW5kQ29uZmlnLCBYaHJGYWN0b3J5XX1cbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEVuYWJsZSBhbmQgY29uZmlndXJlIHRoZSBpbi1tZW1vcnkgd2ViIGFwaSBpbiBhIGxhenktbG9hZGVkIGZlYXR1cmUgbW9kdWxlLlxuICAgKiBTYW1lIGFzIGBmb3JSb290YC5cbiAgICogVGhpcyBpcyBhIGZlZWwtZ29vZCBtZXRob2Qgc28geW91IGNhbiBmb2xsb3cgdGhlIEFuZ3VsYXIgc3R5bGUgZ3VpZGUgZm9yIGxhenktbG9hZGVkIG1vZHVsZXMuXG4gICAqL1xuICBzdGF0aWMgZm9yRmVhdHVyZShkYkNyZWF0b3I6IFR5cGU8SW5NZW1vcnlEYlNlcnZpY2U+LCBvcHRpb25zPzogSW5NZW1vcnlCYWNrZW5kQ29uZmlnQXJncyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiBJbk1lbW9yeVdlYkFwaU1vZHVsZS5mb3JSb290KGRiQ3JlYXRvciwgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==