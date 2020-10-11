function getRandomValue (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },
    watch: {
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0) {
                console.log('draw');
                this.winner = 'draw';
            } else if (value <= 0) {
                console.log('you lost!');
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <=0) {
                console.log('draw');
                this.winner = 'draw';
            } else if (value <= 0 ) {
                console.log('you won!')
                this.winner = 'player';

            }
        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return {width: '0%'};
            } else {
                return {width: this.monsterHealth + '%'};
            }
        },
        playerBarStyles() {
            if (this.playerHealth < 0 ) {
                return {width: '0%'};
            } else {
                return {width: this.playerHealth + '%'}
            }
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null,
            this.logMessages = []
        },
        attackMonster()  {
            this.currentRound++
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLogMessage('player', 'attack', attackValue);
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttack() {
            this.currentRound++
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLogMessage('player', 'specialAttack', attackValue);
        },
        healtButton() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            console.log(healValue);
            if(this.playerHealth + healValue > 100) {
                this.playerHealth = 100
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
            this.addLogMessage('player', 'heal', healValue)
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});

app.mount("#game")