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
    function (observer) {
        /** @type {?} */
        var completePending = false;
        /** @type {?} */
        var nextPending = false;
        /** @type {?} */
        var subscription = response$.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            nextPending = true;
            setTimeout((/**
             * @return {?}
             */
            function () {
                observer.next(value);
                if (completePending) {
                    observer.complete();
                }
            }), delayMs);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return setTimeout((/**
         * @return {?}
         */
        function () { return observer.error(error); }), delayMs); }), (/**
         * @return {?}
         */
        function () {
            completePending = true;
            if (!nextPending) {
                observer.complete();
            }
        }));
        return (/**
         * @return {?}
         */
        function () {
            return subscription.unsubscribe();
        });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsYXktcmVzcG9uc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluLW1lbW9yeS13ZWItYXBpLyIsInNvdXJjZXMiOlsiZGVsYXktcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7OztBQUlsQyxNQUFNLFVBQVUsYUFBYSxDQUFJLFNBQXdCLEVBQUUsT0FBZTtJQUN4RSxPQUFPLElBQUksVUFBVTs7OztJQUFJLFVBQUEsUUFBUTs7WUFDM0IsZUFBZSxHQUFHLEtBQUs7O1lBQ3ZCLFdBQVcsR0FBRyxLQUFLOztZQUNqQixZQUFZLEdBQUcsU0FBUyxDQUFDLFNBQVM7Ozs7UUFDdEMsVUFBQSxLQUFLO1lBQ0QsV0FBVyxHQUFHLElBQUksQ0FBQztZQUNuQixVQUFVOzs7WUFBQztnQkFDWCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixJQUFJLGVBQWUsRUFBRTtvQkFDbkIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNyQjtZQUNILENBQUMsR0FBRSxPQUFPLENBQUMsQ0FBQztRQUNkLENBQUM7Ozs7UUFDRCxVQUFBLEtBQUssSUFBSSxPQUFBLFVBQVU7OztRQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFyQixDQUFxQixHQUFFLE9BQU8sQ0FBQyxFQUFoRCxDQUFnRDs7O1FBQ3pEO1lBQ0UsZUFBZSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDckI7UUFDSCxDQUFDLEVBQ0Y7UUFDRDs7O1FBQU87WUFDTCxPQUFPLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxDQUFDLEVBQUM7SUFDSixDQUFDLEVBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbi8vIFJlcGxhY2VzIHVzZSBvZiBSeEpTIGRlbGF5LiBTZWUgdjAuNS40LlxuLyoqIGFkZHMgc3BlY2lmaWVkIGRlbGF5IChpbiBtcykgdG8gYm90aCBuZXh0IGFuZCBlcnJvciBjaGFubmVscyBvZiB0aGUgcmVzcG9uc2Ugb2JzZXJ2YWJsZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlbGF5UmVzcG9uc2U8VD4ocmVzcG9uc2UkOiBPYnNlcnZhYmxlPFQ+LCBkZWxheU1zOiBudW1iZXIpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFQ+KG9ic2VydmVyID0+IHtcbiAgICBsZXQgY29tcGxldGVQZW5kaW5nID0gZmFsc2U7XG4gICAgbGV0IG5leHRQZW5kaW5nID0gZmFsc2U7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gcmVzcG9uc2UkLnN1YnNjcmliZShcbiAgICAgIHZhbHVlID0+IHtcbiAgICAgICAgICBuZXh0UGVuZGluZyA9IHRydWU7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgaWYgKGNvbXBsZXRlUGVuZGluZykge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGRlbGF5TXMpO1xuICAgICAgfSxcbiAgICAgIGVycm9yID0+IHNldFRpbWVvdXQoKCkgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpLCBkZWxheU1zKSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgY29tcGxldGVQZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFuZXh0UGVuZGluZykge1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZXR1cm4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgfSk7XG59XG4iXX0=