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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsYXktcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvaW4tbWVtL2RlbGF5LXJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7OztBQUlsQyxNQUFNLFVBQVUsYUFBYSxDQUFJLFNBQXdCLEVBQUUsT0FBZTtJQUN4RSxPQUFPLElBQUksVUFBVSxDQUFJLFFBQVEsQ0FBQyxFQUFFOztRQUNsQyxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7O1FBQzVCLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQzs7UUFDeEIsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FDdEMsS0FBSyxDQUFDLEVBQUU7WUFDSixXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ25CLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksZUFBZSxFQUFFO29CQUNuQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ3JCO2FBQ0YsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNiLEVBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsRUFDekQsR0FBRyxFQUFFO1lBQ0gsZUFBZSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDckI7U0FDRixDQUNGLENBQUM7UUFDRixPQUFPLEdBQUcsRUFBRTtZQUNWLE9BQU8sWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ25DLENBQUM7S0FDSCxDQUFDLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuLy8gUmVwbGFjZXMgdXNlIG9mIFJ4SlMgZGVsYXkuIFNlZSB2MC41LjQuXG4vKiogYWRkcyBzcGVjaWZpZWQgZGVsYXkgKGluIG1zKSB0byBib3RoIG5leHQgYW5kIGVycm9yIGNoYW5uZWxzIG9mIHRoZSByZXNwb25zZSBvYnNlcnZhYmxlICovXG5leHBvcnQgZnVuY3Rpb24gZGVsYXlSZXNwb25zZTxUPihyZXNwb25zZSQ6IE9ic2VydmFibGU8VD4sIGRlbGF5TXM6IG51bWJlcik6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gbmV3IE9ic2VydmFibGU8VD4ob2JzZXJ2ZXIgPT4ge1xuICAgIGxldCBjb21wbGV0ZVBlbmRpbmcgPSBmYWxzZTtcbiAgICBsZXQgbmV4dFBlbmRpbmcgPSBmYWxzZTtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSByZXNwb25zZSQuc3Vic2NyaWJlKFxuICAgICAgdmFsdWUgPT4ge1xuICAgICAgICAgIG5leHRQZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICBpZiAoY29tcGxldGVQZW5kaW5nKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZGVsYXlNcyk7XG4gICAgICB9LFxuICAgICAgZXJyb3IgPT4gc2V0VGltZW91dCgoKSA9PiBvYnNlcnZlci5lcnJvcihlcnJvciksIGRlbGF5TXMpLFxuICAgICAgKCkgPT4ge1xuICAgICAgICBjb21wbGV0ZVBlbmRpbmcgPSB0cnVlO1xuICAgICAgICBpZiAoIW5leHRQZW5kaW5nKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJldHVybiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICB9KTtcbn1cbiJdfQ==