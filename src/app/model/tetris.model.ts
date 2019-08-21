
//俄罗斯方块的行数
const tetrisRow = 32;
//俄罗斯方块的列数
const tetrisCol = 16;

//空颜色
const color0 = "#FFFFFF";
const color1 = "#FFD306";
const color2 = "#00E3E3";
const color3 = "#F75000";
const color4 = "#8CEA00";
const color5 = "#FF0000";
const color6 = "#808040";
const color7 = "#484891";

//没有块的代码
const NoBlock = 0;
//所有形状
const allTetrisShape = [
    //z型
    [{ x: tetrisCol / 2 - 1, y: 0, color: color1 },
    { x: tetrisCol / 2, y: 0, color: color1 },
    { x: tetrisCol / 2, y: 1, color: color1 },
    { x: tetrisCol / 2 + 1, y: 1, color: color1 }],
    //反z型
    [{ x: tetrisCol / 2 + 1, y: 0, color: color2 },
    { x: tetrisCol / 2, y: 0, color: color2 },
    { x: tetrisCol / 2, y: 1, color: color2 },
    { x: tetrisCol / 2 - 1, y: 1, color: color2 }],
    //f型
    [{ x: tetrisCol / 2 + 1, y: 0, color: color3 },
    { x: tetrisCol / 2, y: 0, color: color3 },
    { x: tetrisCol / 2, y: 1, color: color3 },
    { x: tetrisCol / 2, y: 2, color: color3 }],
    //反f型
    [{ x: tetrisCol / 2 - 1, y: 0, color: color4 },
    { x: tetrisCol / 2, y: 0, color: color4 },
    { x: tetrisCol / 2, y: 1, color: color4 },
    { x: tetrisCol / 2, y: 2, color: color4 }],
    //长条型
    [{ x: tetrisCol / 2, y: 0, color: color5 },
    { x: tetrisCol / 2, y: 1, color: color5 },
    { x: tetrisCol / 2, y: 2, color: color5 },
    { x: tetrisCol / 2, y: 3, color: color5 }],
    //方形
    [{ x: tetrisCol / 2, y: 0, color: color6 },
    { x: tetrisCol / 2 + 1, y: 0, color: color6 },
    { x: tetrisCol / 2, y: 1, color: color6 },
    { x: tetrisCol / 2 + 1, y: 1, color: color6 },],
    //土型
    [{ x: tetrisCol / 2, y: 0, color: color7 },
    { x: tetrisCol / 2 - 1, y: 1, color: color7 },
    { x: tetrisCol / 2, y: 1, color: color7 },
    { x: tetrisCol / 2 + 1, y: 1, color: color7 }]
]

export class Tetris {

    //当前速度
    public currentSpeed: number = 0;
    //当前分数
    public currentScore: number = 0;
    //最大分数
    public maxScore: number = 0;

    private cellWidth = 0;
    //当前俄罗斯方块已经下落固定的方块情况
    private tetrisFixedBlockStatus = [];

    constructor(currentSpeed?: number) {
        if (currentSpeed != null) {
            this.currentSpeed = currentSpeed;
        }

        //初始化所有的固定块信息，填充无数据
        for (let row = 0; row < tetrisRow; row++) {
            this.tetrisFixedBlockStatus[row] = [];
            for (let col = 0; col < tetrisCol; col++) {
                this.tetrisFixedBlockStatus[row][col] = NoBlock;
            }
        }
    }

    get tetrisRowCount() {
        return tetrisRow;
    }

    get tetrisColCount() {
        return tetrisCol;
    }

    get tetrisCellWidth() {
        return this.cellWidth;
    }

    set tetrisCellWidth(cellWidth: number) {
        this.cellWidth = cellWidth;
    }
}