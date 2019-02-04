/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Observable } from 'rxjs';
// Replaces use of RxJS delay. See v0.5.4.
/**
 * adds specified delay (in ms) to both next and error channels of the response observable
 * @template T
 * @param {?} response$
 * @param {?} delayMs
 * @return {?}
 */
export function delayResponse(response$, delayMs) {
    return new Observable((/**
     * @param {?} observer
     * @return {?}
     */
    observer => {
        /** @type {?} */
        let completePending = false;
        /** @type {?} */
        let nextPending = false;
        /** @type {?} */
        const subscription = response$.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            nextPending = true;
            setTimeout((/**
             * @return {?}
             */
            () => {
                observer.next(value);
                if (completePending) {
                    observer.complete();
                }
            }), delayMs);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => setTimeout((/**
         * @return {?}
         */
        () => observer.error(error)), delayMs)), (/**
         * @return {?}
         */
        () => {
            completePending = true;
            if (!nextPending) {
                observer.complete();
            }
        }));
        return (/**
         * @return {?}
         */
        () => {
            return subscription.unsubscribe();
        });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsYXktcmVzcG9uc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluLW1lbW9yeS13ZWItYXBpLyIsInNvdXJjZXMiOlsiZGVsYXktcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7OztBQUlsQyxNQUFNLFVBQVUsYUFBYSxDQUFJLFNBQXdCLEVBQUUsT0FBZTtJQUN4RSxPQUFPLElBQUksVUFBVTs7OztJQUFJLFFBQVEsQ0FBQyxFQUFFOztZQUM5QixlQUFlLEdBQUcsS0FBSzs7WUFDdkIsV0FBVyxHQUFHLEtBQUs7O2NBQ2pCLFlBQVksR0FBRyxTQUFTLENBQUMsU0FBUzs7OztRQUN0QyxLQUFLLENBQUMsRUFBRTtZQUNKLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDbkIsVUFBVTs7O1lBQUMsR0FBRyxFQUFFO2dCQUNoQixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixJQUFJLGVBQWUsRUFBRTtvQkFDbkIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNyQjtZQUNILENBQUMsR0FBRSxPQUFPLENBQUMsQ0FBQztRQUNkLENBQUM7Ozs7UUFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVU7OztRQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUUsT0FBTyxDQUFDOzs7UUFDekQsR0FBRyxFQUFFO1lBQ0gsZUFBZSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDckI7UUFDSCxDQUFDLEVBQ0Y7UUFDRDs7O1FBQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEMsQ0FBQyxFQUFDO0lBQ0osQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG4vLyBSZXBsYWNlcyB1c2Ugb2YgUnhKUyBkZWxheS4gU2VlIHYwLjUuNC5cbi8qKiBhZGRzIHNwZWNpZmllZCBkZWxheSAoaW4gbXMpIHRvIGJvdGggbmV4dCBhbmQgZXJyb3IgY2hhbm5lbHMgb2YgdGhlIHJlc3BvbnNlIG9ic2VydmFibGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxheVJlc3BvbnNlPFQ+KHJlc3BvbnNlJDogT2JzZXJ2YWJsZTxUPiwgZGVsYXlNczogbnVtYmVyKTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxUPihvYnNlcnZlciA9PiB7XG4gICAgbGV0IGNvbXBsZXRlUGVuZGluZyA9IGZhbHNlO1xuICAgIGxldCBuZXh0UGVuZGluZyA9IGZhbHNlO1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHJlc3BvbnNlJC5zdWJzY3JpYmUoXG4gICAgICB2YWx1ZSA9PiB7XG4gICAgICAgICAgbmV4dFBlbmRpbmcgPSB0cnVlO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgIGlmIChjb21wbGV0ZVBlbmRpbmcpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBkZWxheU1zKTtcbiAgICAgIH0sXG4gICAgICBlcnJvciA9PiBzZXRUaW1lb3V0KCgpID0+IG9ic2VydmVyLmVycm9yKGVycm9yKSwgZGVsYXlNcyksXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGNvbXBsZXRlUGVuZGluZyA9IHRydWU7XG4gICAgICAgIGlmICghbmV4dFBlbmRpbmcpIHtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gIH0pO1xufVxuIl19