import * as $ from 'jquery';

//俄罗斯方块的行数
export const tetrisRow = 24;
//俄罗斯方块的列数
export const tetrisCol = 24;

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
export const NoBlock = 0;
//所有形状
const allTetrisShape = [
    //z型
    [{ x: tetrisCol / 2 - 1, y: 0, color: color1 },
    { x: tetrisCol / 2, y: 0, color: color1 },
    { x: tetrisCol / 2, y: 1, color: color1 },
    { x: tetrisCol / 2 + 1, y: 1, color: color1 }],
    //反z型
    [{ x: tetrisCol / 2 - 1, y: 1, color: color2 },
    { x: tetrisCol / 2, y: 1, color: color2 },
    { x: tetrisCol / 2, y: 0, color: color2 },
    { x: tetrisCol / 2 + 1, y: 0, color: color2 }],
    //f型
    [{ x: tetrisCol / 2, y: 0, color: color3 },
    { x: tetrisCol / 2, y: 1, color: color3 },
    { x: tetrisCol / 2, y: 2, color: color3 },
    { x: tetrisCol / 2 + 1, y: 0, color: color3 }],
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
    { x: tetrisCol / 2, y: 1, color: color6 },
    { x: tetrisCol / 2 + 1, y: 0, color: color6 },
    { x: tetrisCol / 2 + 1, y: 1, color: color6 },],
    //土型
    [{ x: tetrisCol / 2 - 1, y: 1, color: color7 },
    { x: tetrisCol / 2, y: 0, color: color7 },
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
    //当前俄罗斯方块已经下落固定的方块情况，包括所有的固定格子内的，不包括下落的
    private tetrisFixedBlockStatus = [];

    //当前下落的方块，当下落方块触碰到底或是其他固定方块，则清空
    private currentFallBlock = [];

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

    changeFallenTetrisToFixTetris() {
        this.currentFallBlock.forEach(t => {
            let block = (<{ x: number, y: number, color: string }>t);
            this.tetrisFixedBlockStatus[block.y][block.x] = block.color;
        })
        this.currentFallBlock = [];
    }

    clearFallTetris(){
        this.currentFallBlock=[];
    }

    clearFixTetris(){
        for (let row = 0; row < tetrisRow; row++) {
            this.tetrisFixedBlockStatus[row] = [];
            for (let col = 0; col < tetrisCol; col++) {
                this.tetrisFixedBlockStatus[row][col] = NoBlock;
            }
        }
    }

    getFallTetris(): [{ x: number, y: number, color: string },
        { x: number, y: number, color: string },
        { x: number, y: number, color: string },
        { x: number, y: number, color: string }] {
        return <[{ x: number, y: number, color: string },
            { x: number, y: number, color: string },
            { x: number, y: number, color: string },
            { x: number, y: number, color: string }]>this.currentFallBlock;
    }

    //初始化的掉落方块信息
    initFallTetris() {
        let rand = parseInt((Math.random() * allTetrisShape.length).toString());
        this.currentFallBlock = [
            { x: allTetrisShape[rand][0].x, y: allTetrisShape[rand][0].y, color: allTetrisShape[rand][0].color },
            { x: allTetrisShape[rand][1].x, y: allTetrisShape[rand][1].y, color: allTetrisShape[rand][1].color },
            { x: allTetrisShape[rand][2].x, y: allTetrisShape[rand][2].y, color: allTetrisShape[rand][2].color },
            { x: allTetrisShape[rand][3].x, y: allTetrisShape[rand][3].y, color: allTetrisShape[rand][3].color }
        ];

        //判断是否和固定块重合，重合说明已经游戏失败了
        let success = true;
        for (let index = 0; index < this.currentFallBlock.length; index++) {
            let block = <{ x: number, y: number, color: string }>this.currentFallBlock[index];
            if (this.tetrisFixedBlockStatus[block.y][block.x] != NoBlock) {
                success = false;
                break;
            }
        }
        if (!success) {
            this.currentFallBlock = [];
        }
    }

    removeFixTetrisRow(row?: number) {
        let removeCount: number = 0;
        let rows = [];
        if (row == null) {
            //自动检查所有行，并删除后下移
            for (let row = 0; row < tetrisRow; row++) {
                let canRemove: boolean = true;
                for (let col = 0; col < tetrisCol; col++) {
                    if (this.tetrisFixedBlockStatus[row][col] == NoBlock) {
                        canRemove = false;
                        break;
                    }
                }
                if (canRemove) {
                    rows.push(row);
                }
            }
        }
        else {
            rows.push(row);
        }

        removeCount = rows.length;
        rows.forEach(t => {
            for (let index = t; index >= 0; index--) {
                let tmp = [];
                if (index - 1 >= 0) {
                    $.extend(true, tmp, this.tetrisFixedBlockStatus[index - 1]);
                    this.tetrisFixedBlockStatus[index] = tmp;
                }
                else {
                    for (let col = 0; col < tetrisCol; col++) {
                        this.tetrisFixedBlockStatus[index][col] = NoBlock;
                    }
                }
            }
        })

        //计算分数
        this.caculateScore(removeCount);
    }

    recordMaxScore(score?: number) {
        if (score == null) {
            score = this.currentScore;
        }
        if (score > this.maxScore) {
            this.maxScore = score;
        }


    }

    caculateScore(rowRemoveCount: number) {
        //等差求和，每行最低10分，多一行多10分，第一行10分，第二行20分
        let base = (this.currentSpeed + 1) * 10;
        this.currentScore += base * rowRemoveCount + rowRemoveCount * (rowRemoveCount - 1) / 2 * base;
    }

    canFallenTetrisChangeDirection(): boolean {
        //逆时针变换
        //let tmpFallBlock = this.currentFallBlock.concat();
        let tmpFallBlock = this.currentFallBlock.map((value: any, index: number, array: any[]) => {
            //console.log(value);      
            let tmp = <{ x: number, y: number, color: string }>value;
            //console.log(tmp);
            let res: { x: number, y: number, color: string } = { x: 0, y: 0, color: "" };
            // res.x = tmp.x;
            // res.y = tmp.y;
            // res.color = tmp.color;
            $.extend(true, res, tmp);
            return res;
        })

        this.changeFallenTetrisDirection();

        let findBlock = this.currentFallBlock.find(t => {
            let block = <{ x: number, y: number, color: string }>t;
            if (block.x < 0 || block.y < 0) {
                return true;
            }
            if (this.tetrisFixedBlockStatus[block.y][block.x] != NoBlock) {
                return true;
            }

            return false;
        });

        this.currentFallBlock = tmpFallBlock;
        if (findBlock != null) {
            return false;
        }
        return true;
    }

    changeFallenTetrisDirection() {
        for (let index = 0; index < this.currentFallBlock.length; index++) {
            let preX = this.currentFallBlock[index].x;
            let preY = this.currentFallBlock[index].y;
            if (index != 2) {
                this.currentFallBlock[index].x = this.currentFallBlock[2].x + preY - this.currentFallBlock[2].y;
                this.currentFallBlock[index].y = this.currentFallBlock[2].y + this.currentFallBlock[2].x - preX;
            }
        }
    }

    //获取所有固定的格子
    getFixTetris(): [][] {

        // let res: [{ x: number, y: number, color: string }];
        // let index = 0;
        // for (let row = 0; row < tetrisRow; row++) {
        //     //this.tetrisFixedBlockStatus[row] = [];
        //     for (let col = 0; col < tetrisCol; col++) {
        //         if (this.tetrisFixedBlockStatus[row][col] != NoBlock) {
        //             res[index++] = { x: row, y: col, color: this.tetrisFixedBlockStatus[row][col] };
        //         }
        //     }
        // }

        // return res;
        return this.tetrisFixedBlockStatus;
    }

    //当前是否有下落的方块
    get hasFallenTetris(): boolean {
        return this.currentFallBlock.length != 0;
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