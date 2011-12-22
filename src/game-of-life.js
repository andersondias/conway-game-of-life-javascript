Array.prototype.each = function(callback) {
  var i = 0;
  while (i < this.length) {
    callback.call(this, this[i]);
    i++;
  }
  return this;
};

Array.prototype.map = function(callback) {
  var i = this.length;
  var found = []
  while (i--) {
    if(callback.call(this, this[i])) {
      found.push(this[i]);
    }
  }
  return found;
};

Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};

Array.prototype.remove = function(element) {
  for(var i=0; i<this.length;i++ ) {
    if(this[i]==element) {
      this.splice(i,1);
      break;
    }
  }
};

function World(width, heigth) {
  this.width = width;
  this.heigth = heigth;

  var i = width * heigth;
  var x, y;

  this.cells = [];
  while(i--) {
    x = Math.floor(i / width);
    y = i - (x * width);
    this.cells.unshift(new Cell(this, x, y));
  }
}

World.prototype.getCell = function(x, y) {
  return this.cells[(x * this.width) + y];
}

World.prototype.tick = function() {
  var affected = [];
  this.cells.each(function(currentCell){
    var liveNeighboursCount = currentCell.liveNeighbours().length;
    if(currentCell.isLive()){
      if (liveNeighboursCount < 2) {
        affected.unshift(currentCell);
      } else if(liveNeighboursCount > 3) {
        affected.unshift(currentCell);
      }
    } else {
      if(liveNeighboursCount == 3) {
        affected.unshift(currentCell);
      }
    }
  });

  affected.each(function(cell){
    cell.toggle();
  })
}

function Cell(world, x, y) {
  this.world = world;
  this.x = x;
  this.y = y;
  this.dead = true;
}

Cell.prototype.neighbours = function() {
  var neighbourX, neighbourY, realX, realY;
  var found = [];
  neighbourX = this.x - 1;
  while(neighbourX <= this.x + 1) {
    realX = neighbourX;
    if(neighbourX == -1) {
      realX = this.world.heigth - 1;
    } else if(neighbourX == this.world.heigth) {
      realX = 0;
    }
    neighbourY = this.y - 1;
    while(neighbourY <= this.y + 1) {
      realY = neighbourY;
      if(neighbourY == -1) {
        realY = this.world.width - 1;
      } else if(neighbourY == this.world.width) {
        realY = 0;
      }
      if(realX != this.x || realY != this.y) {
        found.push(this.world.getCell(realX, realY));
      }
      neighbourY++;
    }
    neighbourX++;
  }
  return found;
}

Cell.prototype.liveNeighbours = function() {
  return this.neighbours().map(function(cell){
    return cell.isLive();
  });
}

Cell.prototype.die = function() {
  return this.dead = true;
}

Cell.prototype.isDead = function() {
  return this.dead;
}

Cell.prototype.live = function() {
  return this.dead = false;
}

Cell.prototype.isLive = function() {
  return !this.isDead();
}

Cell.prototype.toggle = function() {
  this.dead = !this.dead;
  return this.dead;
}
