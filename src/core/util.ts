// 所有工具函数


/** 得到随机数（取不到最大值） */
export function getRamdom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}