function Object(id, pos, col) {
  this.spec = id;
  this.col = col;
  this.place = objects.length;
  this.img = document.getElementById(id); 
  this.pos = pos;
  this.hb = new Hitbox(this.pos, this.img);

  this.move = function() {}
}

function CoinCube(id, pos, col) {
  Object.call(this, id, pos, col);

  this.speed = 0;
  this.anchor = this.pos.y;

  this.hit = function() {
    this.speed = -4;
    objects.push(new Coin("coin1", {x:this.pos.x, y: this.anchor-this.img.height-10}, false));
    coins++;
  }

  this.move = function() {
    this.pos.y += this.speed;

    if(this.anchor-this.pos.y>=10)
      this.speed = -this.speed;
    else if(this.anchor == this.pos.y)
      this.speed = 0;

    this.hb = new Hitbox(this.pos, this.img);
  }
}

function Coin(id, pos, col) {
  Object.call(this, id, pos, col);

  new sound("https://raw.githubusercontent.com/arthurkamienski/javascript-mario/master/sounds/coin.wav").play();

  this.spec = "coin";
  this.speed = -4;
  this.anchor = this.pos.y;
  this.ttl = 9;

  this.move = function() {
    this.pos.y += this.speed;

    if(this.anchor-this.pos.y>=20)
      this.speed = -this.speed;

    this.img = document.getElementById(this.spec + (this.ttl%4+1));
    this.hb = new Hitbox(this.pos, this.img);

    if(this.ttl-- == 0)
      removeObjFromList(objects, this);
  }
}