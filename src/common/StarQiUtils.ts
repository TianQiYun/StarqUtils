/**
 * 一些通用工具函数
 */
export class StartQiUtils {

    /**
     * 防抖工具函数
     * @param fn 要防抖执行的函数
     * @param duration 防抖间隔时间(函数延迟执行时间), 默认500ms
     * @returns 防抖后的函数
     */
    debounce<T extends any[], R>(fn: (...args: T) => R, duration: number = 500): (...args: T) => void {
        let timer: NodeJS.Timeout | null = null;
        return (...args: T) => {
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args);
            }, duration);
        }
    }

    /**
     * 节流工具函数
     * @param fn 要节流执行的函数
     * @param duration 节流时间间隔，默认500ms
     * @param immediate 是否立即执行节流函数，默认false
     * @returns 节流后的函数
     */
    throttle<T extends any[], R>(fn: (...args: T) => R, duration: number = 500, 
        immediate: boolean = false): (...args: T) => void {
        // 使用时间戳实现的方式
        if (immediate) {
            let time = 0;
            return (...args: T) => {
                // 之前没有计时或计时时间已超过节流间隔时间
                if (!time || Date.now() - time >= duration) {
                    fn(...args);
                    time = Date.now();   // 得到当前时间戳
                }
            }
        }

        // 使用定时器实现的方式
        let timer: NodeJS.Timeout | null = null;
        return (...args: T) => {
            if (timer) return;
            timer = setTimeout(() => {
                fn(...args);
                timer && clearTimeout(timer);
                timer = null;
            }, duration);
        }
    }
}