export default {
    // 棋盘的逻辑坐标，表示一行多少格，一列多少格
    panelSize: {
        x: 16,
        y: 16
    },
    // 下一个方块的
    nextSize: {
        x: 6,
        y: 6
    },
    // 级别数组
    levels: [{ score: 0, duration: 1000 }, { score: 10, duration: 800 }, { score: 20, duration: 500 }]
}