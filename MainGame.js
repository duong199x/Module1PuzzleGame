const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 35;
const COLOR_MAPPING = [
    'red',
    'orange',
    'green',
    'purple',
    'blue',
    'cyan',
    'yellow',
    'white',
];
const BRICK_LAYOUT = [
    [
        [
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7],
        ],
    ],
    [
        [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
        ],
        [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
    ]
]
const KEY_CODES = { // lưu hướng khi nhấn phím
    'LEFT': 'ArrowLeft',
    'RIGHT': 'ArrowRight',
    'DOWN': 'ArrowDown',
    'UP': 'ArrowUp'
} //
const WHILE_COLOR_ID = 7;
let canvas = document.getElementById('board');
let ctx = canvas.getContext('2d');
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// let newInfoPlayer = new TableInfo();
// newInfoPlayer.ShowAll();

class Board {// class vẽ bảng
    ctx;
    grid;
    score;
    gameOver;

    constructor(ctxInput) {
        this.ctx = ctxInput;
        this.grid = this.generateWhiteBoard()
        this.score = 0;
        this.gameOver = false;
    }

    generateWhiteBoard() {
        //tọa 1 bảng gồm nhiều 20 hàng từ một mảng cột có 10 giá trị là 7
        // return Array.from({length: ROWS}, function () {
        //     return Array(COLS).fill(WHILE_COLOR_ID)
        // })
        let arr = []
        for (let row = 0; row < ROWS; row++) {
            let arrCol = []
            for (let col = 0; col < COLS; col++) {
                arrCol.push(WHILE_COLOR_ID);
            }
            arr.push(arrCol)
        }
        return arr;
    }

    drawCell(xAxis, yAxis, colorId) { //hàm vẽ từng ô màu
        this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHILE_COLOR_ID]; //fillStyle biểu diễn màu theo phần tử color id
        this.ctx.fillRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE); //fillRect biểu diễn tọa độ  x, y và kích thước
        this.ctx.fillStyle = 'black';
        this.ctx.strokeRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)// vẽ 1 border với tọa độ truyền vào
    }

    drawBoard() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                this.drawCell(col, row, this.grid[row][col])
            }
        }
    }

    completeRow() {
        let latestGrid = board.grid.filter(function (row) { // lặp từng phần tử trong row
            return row.some(function (col) { //lặp lại các phần tử trong col xem có phần tử nào là 7 không
                return col === WHILE_COLOR_ID;
            })
        })
        let newScore = ROWS - latestGrid.length; // tổng hàng đã hoàn thành
        //console.log(newScore)
        let newRows = this.newRowOnTop(newScore);
        // Array.from({length: newScore}, function () {
        //     return Array(COLS).fill(WHILE_COLOR_ID)
        // })
        console.log('score', newScore)
        if (newScore) {
            board.grid = [...newRows, ...latestGrid];// dùng spread để thêm những hàng trắng lên đầu, sau đấy thêm các hàng còn lại xuống dưới
            this.handleScore(newScore * 10);
        }

    }

    newRowOnTop(Score) {// lặp để in ra số hàng trống theo số hàng mà điểm đã ăn
        let arr = [];
        for (let i = 0; i < Score; i++) {
            let arrRow = [];
            for (let row = 0; row < COLS; row++) {
                arrRow.push(WHILE_COLOR_ID);
            }
            arr.push(arrRow)
        }
        return arr;
    }


    handleScore(Score) { //hàm tính tăng điểm
        this.score += Score
        document.getElementById('score').innerHTML = this.score;
    }

    handleGameOver() {
        this.gameOver = true;
        alert('Game Over!!!');
        addPlayer();
    }

    reset() {
        this.gameOver = false;
        this.grid = this.generateWhiteBoard()
        this.score = 0;
        this.drawBoard();
    }
}

class Brick { // class gạch
    id;
    layout;
    activeIndex;
    colPos;
    rowPos;

    constructor(id) {
        this.id = id;
        this.layout = BRICK_LAYOUT[id]; // phần tử tại mảng BRICK_LAYOUT
        this.activeIndex = 0 // chỉ mục của phần tử trong mảng BRICK_LAYOUT
        this.colPos = 3; // vị trí của viên gạch
        this.rowPos = -2;
        this.gameOver = false;
    }

    draw() { // vẽ ra khối gạch
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) { // lặp qua các phần tử đầu tiên
            for (let col = 0; col < this.layout[this.activeIndex][row].length; col++) { // lặp qua các phần tử con của 1 phần tử
                if (this.layout[this.activeIndex][row][col] !== WHILE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, this.id)
                }
            }
        }
    }

    clear() { // xóa vị trí cũ khi di chuyển
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][row].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHILE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, WHILE_COLOR_ID)
                }
            }
        }
    }

    moveLeft() {
        if (!this.checkCollission(this.rowPos, this.colPos - 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPos--;
            this.draw();
        }

    }

    moveRight() {
        if (!this.checkCollission(this.rowPos, this.colPos + 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPos++;
            this.draw();
        }
    }

    moveDown() {
        if (!this.checkCollission(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
            this.clear();
            this.rowPos++;
            this.draw();
            return;
        }
        this.handleLanded();
        if (!board.gameOver) {
            genNewBrick();
        }

    }

    rotate() { // xoay hướng
        if (!this.checkCollission(this.rowPos + 1, this.colPos, this.layout[(this.activeIndex + 1) % 4])) {
            this.clear()
            this.activeIndex = (this.activeIndex + 1) % 4
            this.draw()
        }
    }

    checkCollission(nextRow, nextCol, nextLayout) { // kiểm tra va chạm khi vào mép, nextRow,nextCol là các vị trí tương lai,nextLayout
        for (let row = 0; row < nextLayout.length; row++) {
            for (let col = 0; col < nextLayout[row].length; col++) {
                if (nextLayout[row][col] !== WHILE_COLOR_ID && nextRow >= 0) {
                    if ((col + nextCol < 0) ||
                        (col + nextCol >= COLS) ||
                        (row + nextRow >= ROWS) ||
                        board.grid[row + nextRow][col + nextCol] !== WHILE_COLOR_ID) // nếu khối gạch chạm vào điểm khác màu trắng sẽ dừng lại
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    handleLanded() { // hàm kiểm tra hạ cánh, khi hạ cánh sẽ được gán bằng id và vẽ lại hính mới
        if (this.rowPos <= 0) {
            board.handleGameOver();
            return;
        }
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][row].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHILE_COLOR_ID) {
                    board.grid[row + this.rowPos][col + this.colPos] = this.id;
                }
            }
        }
        board.completeRow();
        board.drawBoard();
    }
}


function genNewBrick() { // tự động tạo 1 khối gạch mới
    brick = new Brick(Math.floor(Math.random() * 8) % BRICK_LAYOUT.length)
}

//in bảng ra màn hình
let board = new Board(ctx);
board.drawBoard();

//console.table(board.grid)

function playGame() {
    board.reset();
    genNewBrick();
    let refresh = setInterval(function () { // gạch tự động đi xuống sau vài giây
        if (!board.gameOver) {
            brick.moveDown();
            //console.log(brick.gameOver)
        } else {
            clearInterval(refresh);
            //console.log(brick.gameOver)
        }
    }, 1000);
}

addEventListener('keydown', function (event) {
    if (!board.gameOver) {
        //console.log(event)
        switch (event.code) {
            case KEY_CODES.LEFT:
                brick.moveLeft();
                break;
            case KEY_CODES.RIGHT:
                brick.moveRight();
                break;
            case KEY_CODES.DOWN:
                brick.moveDown();
                break;
            case KEY_CODES.UP:
                brick.rotate();
                break;
            default:
                break;
        }
    }

})
//hiển thị player
//localStorage.setItem('listProduct',JSON.stringify([]))
let historygame = JSON.parse(localStorage.getItem('listProduct'));
console.log(historygame)

function addPlayer() {

    historygame.push(
        {
            id: '',
            namePlayer: document.getElementById('addPlayer').value,
            scorePlayer: board.score
        }
    )
    localStorage.setItem('listProduct', JSON.stringify(historygame));
    ShowAll()
}

function ShowAll() {
    let str = '';
    for (let i = 0; i < historygame.length; i++) {
        str += `
        <tr>
            <td>${i + 1}</td>
            <td>${historygame[i].namePlayer}</td>
            <td>${historygame[i].scorePlayer}</td>
        </tr>`
    }
    document.getElementById('table-player-score').innerHTML = str;
    historygame = JSON.parse(localStorage.getItem('listProduct'));
}

ShowAll();
