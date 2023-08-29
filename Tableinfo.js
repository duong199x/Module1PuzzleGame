class TableInfo {
    historygame;

    constructor() {
        this.historygame = JSON.parse(localStorage.getItem('listProduct'));
    }

    addPlayer() {
        this.historygame.push(
            {
                id: '',
                namePlayer: document.getElementById('addPlayer').value,
                scorePlayer: board.score
            }
        )
        localStorage.setItem('listProduct', JSON.stringify(this.historygame));
        this.ShowAll()
    }

    ShowAll() {
        let str = '';
        for (let i = 0; i < this.historygame.length; i++) {
            str += `        
        <tr>
            <td>${i + 1}</td>
            <td>${this.historygame[i].namePlayer}</td>
            <td>${this.historygame[i].scorePlayer}</td>
        </tr>`
        }
        document.getElementById('table-player-score').innerHTML = str;
        this.historygame = JSON.parse(localStorage.getItem('listProduct'));
    }
}