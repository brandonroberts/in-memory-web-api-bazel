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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsYXktcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYW5ndWxhci1pbi1tZW1vcnktd2ViLWFwaS9kZWxheS1yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWxDLDBDQUEwQztBQUMxQyw4RkFBOEY7QUFDOUYsTUFBTSxVQUFVLGFBQWEsQ0FBSSxTQUF3QixFQUFFLE9BQWU7SUFDeEUsT0FBTyxJQUFJLFVBQVUsQ0FBSSxVQUFBLFFBQVE7UUFDL0IsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsU0FBUyxDQUN0QyxVQUFBLEtBQUs7WUFDRCxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ25CLFVBQVUsQ0FBQztnQkFDWCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixJQUFJLGVBQWUsRUFBRTtvQkFDbkIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNyQjtZQUNILENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNkLENBQUMsRUFDRCxVQUFBLEtBQUssSUFBSSxPQUFBLFVBQVUsQ0FBQyxjQUFNLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBckIsQ0FBcUIsRUFBRSxPQUFPLENBQUMsRUFBaEQsQ0FBZ0QsRUFDekQ7WUFDRSxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNyQjtRQUNILENBQUMsQ0FDRixDQUFDO1FBQ0YsT0FBTztZQUNMLE9BQU8sWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuLy8gUmVwbGFjZXMgdXNlIG9mIFJ4SlMgZGVsYXkuIFNlZSB2MC41LjQuXG4vKiogYWRkcyBzcGVjaWZpZWQgZGVsYXkgKGluIG1zKSB0byBib3RoIG5leHQgYW5kIGVycm9yIGNoYW5uZWxzIG9mIHRoZSByZXNwb25zZSBvYnNlcnZhYmxlICovXG5leHBvcnQgZnVuY3Rpb24gZGVsYXlSZXNwb25zZTxUPihyZXNwb25zZSQ6IE9ic2VydmFibGU8VD4sIGRlbGF5TXM6IG51bWJlcik6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gbmV3IE9ic2VydmFibGU8VD4ob2JzZXJ2ZXIgPT4ge1xuICAgIGxldCBjb21wbGV0ZVBlbmRpbmcgPSBmYWxzZTtcbiAgICBsZXQgbmV4dFBlbmRpbmcgPSBmYWxzZTtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSByZXNwb25zZSQuc3Vic2NyaWJlKFxuICAgICAgdmFsdWUgPT4ge1xuICAgICAgICAgIG5leHRQZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICBpZiAoY29tcGxldGVQZW5kaW5nKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZGVsYXlNcyk7XG4gICAgICB9LFxuICAgICAgZXJyb3IgPT4gc2V0VGltZW91dCgoKSA9PiBvYnNlcnZlci5lcnJvcihlcnJvciksIGRlbGF5TXMpLFxuICAgICAgKCkgPT4ge1xuICAgICAgICBjb21wbGV0ZVBlbmRpbmcgPSB0cnVlO1xuICAgICAgICBpZiAoIW5leHRQZW5kaW5nKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJldHVybiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICB9KTtcbn1cbiJdfQ==