import { execFile } from 'child_process';
import path from 'path';

/** 提取图标的工具Exe文件路径 */
const EXTRACT_TOOLS_FILE = '../lib/IconExtractor.exe';

/**
 * 文件相关操作工具类
 */
export class FileUtils {

    /** base64字符串的图片数据的开头 */
    static BASE64_IMAGE_PREFIX = 'data:image/png;base64,';

    /**
     * 从exe文件中提取图标
     * @param filePath 要提取的exe文件路径
     * @returns 提取成功，将图片数据以Base64字符串的形式返回；提取失败，返回空字符串
     */
    static async extractIconFromExeFile(filePath: string): Promise<string> {
        return new Promise((resolve) => {
            if (typeof filePath !== 'string' || filePath.length === 0 || !filePath.endsWith('.exe')) {
                resolve('');
                return;
            }
            execFile(path.join(__dirname, EXTRACT_TOOLS_FILE), [filePath], (_, result: string) => {
                resolve(result);
            });
        });
    }

    /**
     * 从文件路径中提取文件名
     * @param filePath 文件路径
     * @returns 文件名
     */
    extractFilename(filePath: string): string {
        if (!filePath) return '';
        return filePath.substring(filePath.lastIndexOf('\\') + 1);
    }
}