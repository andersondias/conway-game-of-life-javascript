function WorldRenderer(world) {
  this.world = world;
  $('#game-of-life').append('<div id="world" />');
  this.render();
}

WorldRenderer.prototype.toggle = function(cell) {
  $('.cell[data-x=' + cell.x +'][data-y=' + cell.y+ ']').toggleClass('dead').toggleClass('live');
}

WorldRenderer.prototype.render = function() {
  var cellsDivs = '';
  world.cells.each(function(cell){
    cellsDivs += '<div class="cell ' + (cell.isDead() ? 'dead' : 'live') + '" data-x="' + cell.x +'" data-y="' + cell.y + '"></div>';
  });
  $('#game-of-life > #world').replaceWith('<div id="world">' + cellsDivs + '</div>');
}

