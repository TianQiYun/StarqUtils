
type GeneralResult = {
    code?: 0 | 1,
    message?: string,
    data?: any
};

/**
 * 统一返回对象
 */
export class ReturnResult {

    /** 失败状态码 */
    static CODE_FAIL: 0 = 0;

    /** 成功状态码 */
    static CODE_SUCCESS: 1 = 1;

    /**
     * 状态码
     * - 0: 失败
     * - 1: 成功
     */
    #code: 0 | 1;

    /** 提示信息 */
    #message: string;

    /** 携带的数据 */
    #data: any;

    /**
     * 私有构造函数，不建议使用
     * 
     * 建议使用`ReturnResult.success()`或`ReturnReuslt.fail()`创建实例
     * @constructor
     * @private 
     */
    private constructor() {
        this.#code = ReturnResult.CODE_FAIL;
        this.#message = '';
        this.#data = null;
    }

    /** 当前结果的状态码 */
    get code(): 0 | 1 { return this.#code; };
    /** 提示信息 */
    get message(): string { return this.#message; };
    /** 返回的数据 */
    get data(): any { return this.#data; };

    /**
     * 设置当前实例的状态码
     * @param {0 | 1} code 状态码
     * @returns 当前实例
     */
    #setCode(code: 0 | 1): ReturnResult {
        this.#code = code;
        return this;
    }

    /**
     * 设置当前返回结果携带的数据
     * @param {any} data 要设置的数据
     * @returns 当前实例this
     */
    setData(data: any): ReturnResult { 
        this.#data = data; 
        return this;
    }

    /**
     * 设置提示信息
     * @param {string} message 
     * @returns 当前实例this
     */
    setMessage(message: string): ReturnResult {
        this.#message = message;
        return this;
    }

    /**
     * 判断当前对象状态是否为成功状态
     * @return {boolean} true表示是成功状态，false表示不是
     */
    get isSuccess(): boolean {
        return this.#code == ReturnResult.CODE_SUCCESS;
    }

    /**
     * 判断当前对象状态是否为失败状态
     * @return {boolean} true表示是失败状态，false表示不是
     */
    get isFail(): boolean {
        return this.#code == ReturnResult.CODE_FAIL;
    }

    /**
     * 返回成功状态对象
     * @return {ReturnResult} 成功状态对象
     */
    static success(): ReturnResult {
        return new ReturnResult().#setCode(ReturnResult.CODE_SUCCESS);
    }

    /**
     * 返回失败状态对象
     * @return {ReturnResult} 失败状态对象
     */
    static fail(): ReturnResult {
        return new ReturnResult().#setCode(ReturnResult.CODE_FAIL);
    }

    /**
     * 将普通对象转为 ReturnResult 对象
     * @param {Object} obj 普通对象
     * @param {0 | 1} [obj.code] 状态码
     * @param {string} [obj.message] 提示信息
     * @param {any} [obj.data] 返回的数据
     * @returns {ReturnResult} ReturnResult 对象
     */
    static fromObj(obj: GeneralResult): ReturnResult {
        if (!obj) return ReturnResult.fail();
        return new ReturnResult()
            .#setCode(obj.code || ReturnResult.CODE_FAIL)
            .setMessage(obj.message || '')
            .setData(obj.data || null);
    }
}