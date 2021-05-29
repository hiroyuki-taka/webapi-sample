import {DoWork, runWorker} from "observable-webworker";
import {Observable} from "rxjs";
import {prime_factor_simple} from "./prime_factor";
import {finalize, switchMap, tap, toArray} from "rxjs/operators";

export class WorkerSampleWorker implements DoWork<any, bigint[]> {
    work(input$: Observable<any>): Observable<bigint[]> {
        return input$.pipe(
            tap(n => console.log(`[worker] n = ${n}`)),
            switchMap(n => prime_factor_simple(n).pipe(toArray())),
            finalize(() => {
                console.log('[worker] complete')
            })
        )
    }
}

runWorker(WorkerSampleWorker)
