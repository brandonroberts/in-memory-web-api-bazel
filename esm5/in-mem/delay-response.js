import { Observable } from 'rxjs';
// Replaces use of RxJS delay. See v0.5.4.
/** adds specified delay (in ms) to both next and error channels of the response observable */
export function delayResponse(response$, delayMs) {
    return new Observable(function (observer) {
        var completePending = false;
        var nextPending = false;
        var subscription = response$.subscribe(function (value) {
            nextPending = true;
            setTimeout(function () {
                observer.next(value);
                if (completePending) {
                    observer.complete();
                }
            }, delayMs);
        }, function (error) { return setTimeout(function () { return observer.error(error); }, delayMs); }, function () {
            completePending = true;
            if (!nextPending) {
                observer.complete();
            }
        });
        return function () {
            return subscription.unsubscribe();
        };
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsYXktcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvaW4tbWVtL2RlbGF5LXJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbEMsMENBQTBDO0FBQzFDLDhGQUE4RjtBQUM5RixNQUFNLFVBQVUsYUFBYSxDQUFJLFNBQXdCLEVBQUUsT0FBZTtJQUN4RSxPQUFPLElBQUksVUFBVSxDQUFJLFVBQUEsUUFBUTtRQUMvQixJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQ3RDLFVBQUEsS0FBSztZQUNELFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDbkIsVUFBVSxDQUFDO2dCQUNYLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksZUFBZSxFQUFFO29CQUNuQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ3JCO1lBQ0gsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2QsQ0FBQyxFQUNELFVBQUEsS0FBSyxJQUFJLE9BQUEsVUFBVSxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFyQixDQUFxQixFQUFFLE9BQU8sQ0FBQyxFQUFoRCxDQUFnRCxFQUN6RDtZQUNFLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDaEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3JCO1FBQ0gsQ0FBQyxDQUNGLENBQUM7UUFDRixPQUFPO1lBQ0wsT0FBTyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG4vLyBSZXBsYWNlcyB1c2Ugb2YgUnhKUyBkZWxheS4gU2VlIHYwLjUuNC5cbi8qKiBhZGRzIHNwZWNpZmllZCBkZWxheSAoaW4gbXMpIHRvIGJvdGggbmV4dCBhbmQgZXJyb3IgY2hhbm5lbHMgb2YgdGhlIHJlc3BvbnNlIG9ic2VydmFibGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxheVJlc3BvbnNlPFQ+KHJlc3BvbnNlJDogT2JzZXJ2YWJsZTxUPiwgZGVsYXlNczogbnVtYmVyKTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxUPihvYnNlcnZlciA9PiB7XG4gICAgbGV0IGNvbXBsZXRlUGVuZGluZyA9IGZhbHNlO1xuICAgIGxldCBuZXh0UGVuZGluZyA9IGZhbHNlO1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHJlc3BvbnNlJC5zdWJzY3JpYmUoXG4gICAgICB2YWx1ZSA9PiB7XG4gICAgICAgICAgbmV4dFBlbmRpbmcgPSB0cnVlO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgIGlmIChjb21wbGV0ZVBlbmRpbmcpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBkZWxheU1zKTtcbiAgICAgIH0sXG4gICAgICBlcnJvciA9PiBzZXRUaW1lb3V0KCgpID0+IG9ic2VydmVyLmVycm9yKGVycm9yKSwgZGVsYXlNcyksXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGNvbXBsZXRlUGVuZGluZyA9IHRydWU7XG4gICAgICAgIGlmICghbmV4dFBlbmRpbmcpIHtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gIH0pO1xufVxuIl19