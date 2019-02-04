/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Observable } from 'rxjs';
/**
 * adds specified delay (in ms) to both next and error channels of the response observable
 * @template T
 * @param {?} response$
 * @param {?} delayMs
 * @return {?}
 */
export function delayResponse(response$, delayMs) {
    return new Observable(observer => {
        /** @type {?} */
        let completePending = false;
        /** @type {?} */
        let nextPending = false;
        /** @type {?} */
        const subscription = response$.subscribe(value => {
            nextPending = true;
            setTimeout(() => {
                observer.next(value);
                if (completePending) {
                    observer.complete();
                }
            }, delayMs);
        }, error => setTimeout(() => observer.error(error), delayMs), () => {
            completePending = true;
            if (!nextPending) {
                observer.complete();
            }
        });
        return () => {
            return subscription.unsubscribe();
        };
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsYXktcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYW5ndWxhci1pbi1tZW1vcnktd2ViLWFwaS9kZWxheS1yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7QUFJbEMsTUFBTSxVQUFVLGFBQWEsQ0FBSSxTQUF3QixFQUFFLE9BQWU7SUFDeEUsT0FBTyxJQUFJLFVBQVUsQ0FBSSxRQUFRLENBQUMsRUFBRTs7UUFDbEMsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDOztRQUM1QixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7O1FBQ3hCLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQ3RDLEtBQUssQ0FBQyxFQUFFO1lBQ0osV0FBVyxHQUFHLElBQUksQ0FBQztZQUNuQixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNoQixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixJQUFJLGVBQWUsRUFBRTtvQkFDbkIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNyQjthQUNGLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDYixFQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQ3pELEdBQUcsRUFBRTtZQUNILGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDaEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3JCO1NBQ0YsQ0FDRixDQUFDO1FBQ0YsT0FBTyxHQUFHLEVBQUU7WUFDVixPQUFPLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNuQyxDQUFDO0tBQ0gsQ0FBQyxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbi8vIFJlcGxhY2VzIHVzZSBvZiBSeEpTIGRlbGF5LiBTZWUgdjAuNS40LlxuLyoqIGFkZHMgc3BlY2lmaWVkIGRlbGF5IChpbiBtcykgdG8gYm90aCBuZXh0IGFuZCBlcnJvciBjaGFubmVscyBvZiB0aGUgcmVzcG9uc2Ugb2JzZXJ2YWJsZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlbGF5UmVzcG9uc2U8VD4ocmVzcG9uc2UkOiBPYnNlcnZhYmxlPFQ+LCBkZWxheU1zOiBudW1iZXIpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFQ+KG9ic2VydmVyID0+IHtcbiAgICBsZXQgY29tcGxldGVQZW5kaW5nID0gZmFsc2U7XG4gICAgbGV0IG5leHRQZW5kaW5nID0gZmFsc2U7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gcmVzcG9uc2UkLnN1YnNjcmliZShcbiAgICAgIHZhbHVlID0+IHtcbiAgICAgICAgICBuZXh0UGVuZGluZyA9IHRydWU7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgaWYgKGNvbXBsZXRlUGVuZGluZykge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGRlbGF5TXMpO1xuICAgICAgfSxcbiAgICAgIGVycm9yID0+IHNldFRpbWVvdXQoKCkgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpLCBkZWxheU1zKSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgY29tcGxldGVQZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFuZXh0UGVuZGluZykge1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZXR1cm4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgfSk7XG59XG4iXX0=