
//俄罗斯方块的行数
const tetrisRow = 16;
//俄罗斯方块的列数
const tetrisCol = 8;

export class Tetris {

    //当前速度
    public currentSpeed: number = 0;
    //当前分数
    public currentScore: number = 0;
    //最大分数
    public maxScore: number = 0;

    constructor(currentSpeed: number) {
        this.currentSpeed = currentSpeed;
    }
}