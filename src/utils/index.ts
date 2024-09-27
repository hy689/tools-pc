export const debounce = (func: Function, wait: number) => {
    let timeout:any = null
    return function (...args: any) {
        if (timeout) {
            clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
            func(...args)
        }, wait)
    }
}