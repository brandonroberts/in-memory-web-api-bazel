////// For apps with both Http and HttpClient ////
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { HttpBackend, XhrFactory } from '@angular/common/http';
import { InMemoryBackendConfig, InMemoryDbService } from './interfaces';
import { httpClientInMemBackendServiceFactory } from './http-client-in-memory-web-api.module';
var InMemoryWebApiModule = /** @class */ (function () {
    function InMemoryWebApiModule() {
    }
    InMemoryWebApiModule_1 = InMemoryWebApiModule;
    /**
    *  Redirect BOTH Angular `Http` and `HttpClient` XHR calls
    *  to in-memory data store that implements `InMemoryDbService`.
    *  with class that implements InMemoryDbService and creates an in-memory database.
    *
    *  Usually imported in the root application module.
    *  Can import in a lazy feature module too, which will shadow modules loaded earlier
    *
    * @param dbCreator - Class that creates seed data for in-memory database. Must implement InMemoryDbService.
    * @param options - Options for configuring the backend
    *
    * @example
    * InMemoryWebApiModule.forRoot(dbCreator);
    * InMemoryWebApiModule.forRoot(dbCreator, {useValue: {delay:600}});
    */
    InMemoryWebApiModule.forRoot = function (dbCreator, options) {
        return {
            ngModule: InMemoryWebApiModule_1,
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
    InMemoryWebApiModule.forFeature = function (dbCreator, options) {
        return InMemoryWebApiModule_1.forRoot(dbCreator, options);
    };
    var InMemoryWebApiModule_1;
    InMemoryWebApiModule = InMemoryWebApiModule_1 = __decorate([
        NgModule({})
    ], InMemoryWebApiModule);
    return InMemoryWebApiModule;
}());
export { InMemoryWebApiModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW4tbWVtb3J5LXdlYi1hcGkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2luLW1lbS9pbi1tZW1vcnktd2ViLWFwaS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEOzs7Ozs7O0FBRWxELE9BQU8sRUFBWSxRQUFRLEVBQTZCLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFL0QsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixpQkFBaUIsRUFDbEIsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFHOUY7SUFBQTtJQXdDQSxDQUFDOzZCQXhDWSxvQkFBb0I7SUFDL0I7Ozs7Ozs7Ozs7Ozs7O01BY0U7SUFDSyw0QkFBTyxHQUFkLFVBQWUsU0FBa0MsRUFBRSxPQUFtQztRQUNwRixPQUFPO1lBQ0wsUUFBUSxFQUFFLHNCQUFvQjtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUcsUUFBUSxFQUFFLFNBQVMsRUFBRTtnQkFDcEQsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtnQkFHckQsRUFBRSxPQUFPLEVBQUUsV0FBVztvQkFDcEIsVUFBVSxFQUFFLG9DQUFvQztvQkFDaEQsSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxDQUFDLEVBQUM7YUFDaEU7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksK0JBQVUsR0FBakIsVUFBa0IsU0FBa0MsRUFBRSxPQUFtQztRQUN2RixPQUFPLHNCQUFvQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7SUF2Q1Usb0JBQW9CO1FBRGhDLFFBQVEsQ0FBQyxFQUFFLENBQUM7T0FDQSxvQkFBb0IsQ0F3Q2hDO0lBQUQsMkJBQUM7Q0FBQSxBQXhDRCxJQXdDQztTQXhDWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8vLy8gRm9yIGFwcHMgd2l0aCBib3RoIEh0dHAgYW5kIEh0dHBDbGllbnQgLy8vL1xuXG5pbXBvcnQgeyBJbmplY3RvciwgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBCYWNrZW5kLCBYaHJGYWN0b3J5IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQge1xuICBJbk1lbW9yeUJhY2tlbmRDb25maWdBcmdzLFxuICBJbk1lbW9yeUJhY2tlbmRDb25maWcsXG4gIEluTWVtb3J5RGJTZXJ2aWNlXG59IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IGh0dHBDbGllbnRJbk1lbUJhY2tlbmRTZXJ2aWNlRmFjdG9yeSB9IGZyb20gJy4vaHR0cC1jbGllbnQtaW4tbWVtb3J5LXdlYi1hcGkubW9kdWxlJztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIEluTWVtb3J5V2ViQXBpTW9kdWxlIHtcbiAgLyoqXG4gICogIFJlZGlyZWN0IEJPVEggQW5ndWxhciBgSHR0cGAgYW5kIGBIdHRwQ2xpZW50YCBYSFIgY2FsbHNcbiAgKiAgdG8gaW4tbWVtb3J5IGRhdGEgc3RvcmUgdGhhdCBpbXBsZW1lbnRzIGBJbk1lbW9yeURiU2VydmljZWAuXG4gICogIHdpdGggY2xhc3MgdGhhdCBpbXBsZW1lbnRzIEluTWVtb3J5RGJTZXJ2aWNlIGFuZCBjcmVhdGVzIGFuIGluLW1lbW9yeSBkYXRhYmFzZS5cbiAgKlxuICAqICBVc3VhbGx5IGltcG9ydGVkIGluIHRoZSByb290IGFwcGxpY2F0aW9uIG1vZHVsZS5cbiAgKiAgQ2FuIGltcG9ydCBpbiBhIGxhenkgZmVhdHVyZSBtb2R1bGUgdG9vLCB3aGljaCB3aWxsIHNoYWRvdyBtb2R1bGVzIGxvYWRlZCBlYXJsaWVyXG4gICpcbiAgKiBAcGFyYW0gZGJDcmVhdG9yIC0gQ2xhc3MgdGhhdCBjcmVhdGVzIHNlZWQgZGF0YSBmb3IgaW4tbWVtb3J5IGRhdGFiYXNlLiBNdXN0IGltcGxlbWVudCBJbk1lbW9yeURiU2VydmljZS5cbiAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIGNvbmZpZ3VyaW5nIHRoZSBiYWNrZW5kXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIEluTWVtb3J5V2ViQXBpTW9kdWxlLmZvclJvb3QoZGJDcmVhdG9yKTtcbiAgKiBJbk1lbW9yeVdlYkFwaU1vZHVsZS5mb3JSb290KGRiQ3JlYXRvciwge3VzZVZhbHVlOiB7ZGVsYXk6NjAwfX0pO1xuICAqL1xuICBzdGF0aWMgZm9yUm9vdChkYkNyZWF0b3I6IFR5cGU8SW5NZW1vcnlEYlNlcnZpY2U+LCBvcHRpb25zPzogSW5NZW1vcnlCYWNrZW5kQ29uZmlnQXJncyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogSW5NZW1vcnlXZWJBcGlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBJbk1lbW9yeURiU2VydmljZSwgIHVzZUNsYXNzOiBkYkNyZWF0b3IgfSxcbiAgICAgICAgeyBwcm92aWRlOiBJbk1lbW9yeUJhY2tlbmRDb25maWcsIHVzZVZhbHVlOiBvcHRpb25zIH0sXG5cblxuICAgICAgICB7IHByb3ZpZGU6IEh0dHBCYWNrZW5kLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IGh0dHBDbGllbnRJbk1lbUJhY2tlbmRTZXJ2aWNlRmFjdG9yeSxcbiAgICAgICAgICBkZXBzOiBbSW5NZW1vcnlEYlNlcnZpY2UsIEluTWVtb3J5QmFja2VuZENvbmZpZywgWGhyRmFjdG9yeV19XG4gICAgICBdXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBFbmFibGUgYW5kIGNvbmZpZ3VyZSB0aGUgaW4tbWVtb3J5IHdlYiBhcGkgaW4gYSBsYXp5LWxvYWRlZCBmZWF0dXJlIG1vZHVsZS5cbiAgICogU2FtZSBhcyBgZm9yUm9vdGAuXG4gICAqIFRoaXMgaXMgYSBmZWVsLWdvb2QgbWV0aG9kIHNvIHlvdSBjYW4gZm9sbG93IHRoZSBBbmd1bGFyIHN0eWxlIGd1aWRlIGZvciBsYXp5LWxvYWRlZCBtb2R1bGVzLlxuICAgKi9cbiAgc3RhdGljIGZvckZlYXR1cmUoZGJDcmVhdG9yOiBUeXBlPEluTWVtb3J5RGJTZXJ2aWNlPiwgb3B0aW9ucz86IEluTWVtb3J5QmFja2VuZENvbmZpZ0FyZ3MpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4gSW5NZW1vcnlXZWJBcGlNb2R1bGUuZm9yUm9vdChkYkNyZWF0b3IsIG9wdGlvbnMpO1xuICB9XG59XG4iXX0=