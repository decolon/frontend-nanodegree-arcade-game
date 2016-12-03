/*
This is the parent class for the Enemy and Player classes.  
It handles the functionality of rendering the entities and 
figuring out what the correct y location is based on the items
row.  It also holds the properties shared by enemies and the player.
*/
var Item = function() {
    this.x = 0;
    this.row = 0;
    this.sprite = 'images/grass-block.png';
};

Item.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.getY());
};

Item.prototype.getY = function() {
    switch (this.row) {
        case 1:
            return 63;
        case 2:
            return 145;
        case 3:
            return 225;
        case 4:
            return 310;
        case 5:
            return 390;
        default:
            return 0;
    };
};


/*
The Enemy runs across the screen and tries to make contact with
the Player.  Its only unique property is speed, a rondomly generated
number wich determines how fast the enemy will run across its row.  It
also implements an update function which tells the enemy to move to the
right.  
*/
var Enemy = function() {
    Item.call(this);
    this.speed = Math.floor(Math.random() * 500) + 100;
    this.row = Math.floor(Math.random() * 3) + 1;
    this.x = 0;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Item.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
    this.x = this.x + (dt * this.speed);
};


/*
The Player class represents the users character that must navigate
across the stones to the water.  It adds a column property to the base
Item class.
*/
var Player = function() {
    Item.call(this);
    this.row = 5;
    this.col = 2;
    this.sprite = 'images/char-princess-girl.png';
    this.x = this.getX();
};

Player.prototype = Object.create(Item.prototype);
Player.prototype.constructor = Player;

//Makes sure that the player moves when the column changes
Player.prototype.update = function() {
    this.x = this.getX();
};

//Tells the player what to do when there is a keyboard input
Player.prototype.handleInput = function(keyText) {
    switch (keyText) {
        case 'left':
            this._decrementCol();
            break;
        case 'down':
            this._incrementRow();
            break;
        case 'right':
            this._incrementCol();
            break;
        case 'up':
            this._decrementRow();
            break;
    };
};

//Convers the players col number to a valid x location
Player.prototype.getX = function() {
    return this.col * 101;
};

//Changes the players row.  Only acceps values of 1 and -1
//-1 makes the players move up a row, +1 moves the player down.
Player.prototype._changeRow = function(change) {
    if (change === -1) {
        if (this.row > 0)
            this.row--;
    } else if (change === 1) {
        if (this.row < 5)
            this.row++;
    }
};

//Changes the players col.  Only acceps values of 1 and -1
//-1 makes the players move left a col, +1 moves the player right.
Player.prototype._changeCol = function(change) {
    if (change === -1) {
        if (this.col > 0)
            this.col--;
    } else if (change === 1) {
        if (this.col < 4)
            this.col++;
    }
    this.x = this.getX();
}

//Convenience methods for moving the player around
Player.prototype._incrementRow = function() {
    this._changeRow(1);
};
Player.prototype._incrementCol = function() {
    this._changeCol(1);
};
Player.prototype._decrementRow = function() {
    this._changeRow(-1);
};
Player.prototype._decrementCol = function() {
    this._changeCol(-1);
};



//Create player and empty enemies array
var allEnemies = [];
allEnemies.push(new Enemy());
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});