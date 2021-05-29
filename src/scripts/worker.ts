import {fromEvent, of} from "rxjs";
import {finalize, mergeMap, switchMap, tap, toArray} from "rxjs/operators";
import {prime_factor_simple} from "./prime_factor";
import {fromWorker} from "observable-webworker";

export class WorkerSample {
    readonly normalLoopButton: HTMLButtonElement = document.getElementById("normal") as HTMLButtonElement
    readonly workerButton: HTMLButtonElement = document.getElementById("worker") as HTMLButtonElement
    readonly clearButton: HTMLButtonElement = document.getElementById("clear") as HTMLButtonElement
    readonly inElement = document.getElementById("in") as HTMLInputElement
    readonly outputElement = document.getElementById("out") as HTMLInputElement
    readonly buttons: HTMLButtonElement[]

    constructor() {
        this.buttons = [this.normalLoopButton, this.workerButton, this.clearButton]

        fromEvent(this.normalLoopButton, "click").pipe(
            tap(event => {
                console.log('start')
                this.buttons.forEach(b => b.disabled = true)
            }),
            tap(() => this.outputElement.value = ""),
            switchMap(() => {
                return prime_factor_simple(this.inElement.value).pipe(
                    toArray(),
                    finalize(() => {
                        console.log('complete')
                        this.buttons.forEach(b => b.disabled = false)
                    })
                )
            })
        ).subscribe({
            next: i => {
                this.outputElement.value = i.join(" * ")
            },
        })

        fromEvent(this.workerButton, "click").pipe(
            tap(event => {
                this.buttons.forEach(b => b.disabled = true)
            }),
            tap(() => this.outputElement.value = ""),
            mergeMap(event => {
                return fromWorker<any, bigint[]>(
                    () => new Worker(new URL('./worker.worker', import.meta.url), {type: 'module'}),
                    of(this.inElement.value)
                )
            })
        ).subscribe({
            next: i => {
                this.outputElement.value = i.join(" * ")
                console.log('complete')
                this.buttons.forEach(b => b.disabled = false)
            },
        })

        fromEvent(this.clearButton, 'click')
            .subscribe(() => {
                this.outputElement.value = ""
            })
    }
}
