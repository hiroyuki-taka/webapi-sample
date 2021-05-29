import {Observable} from "rxjs";

export function prime_factor_simple(x): Observable<bigint> {
    let n: bigint = typeof x == 'bigint' ? x : BigInt(x)

    return new Observable<bigint>(subscriber => {
        console.log('[function] start')
        for (let i = 2n; i * i <= n; i++) {
            if (n % i != 0n) {
                continue
            }
            while (n % i == 0n) {
                console.log(i)
                subscriber.next(i)
                n /= i
            }
        }
        if (n != 1n) {
            console.log(n)
            subscriber.next(n)
        }
        console.log('[function] complete')
        subscriber.complete()
    })
}

