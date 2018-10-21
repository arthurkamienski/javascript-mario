function Character() {
  this.side = "right";
  this.state = "idle";
  this.standing = true;
  this.img = document.getElementById(this.state + "_" + this.side);
  this.pos = {x:canvas.width/2, y:ground};
  this.speed = {x:0, y:0};
  this.tick = 0;
  this.down = false;
  this.hb = new Hitbox(this.pos, this.img);

  this.move = function(dir) {
    switch(dir) {
      case "left":
        this.speed.x = -7;
        break;
      case "up":
        this.jump();
        break;
      case "right":
        this.speed.x = 7;
        break;
      case "down":
        this.down = true;
        break;
    }
  }

  this.jump = function() {
    if(this.standing) {
      this.speed.y = -20;
      new sound("https://raw.githubusercontent.com/arthurkamienski/javascript-mario/master/sounds/jump.wav").play();
    }
  }

  this.stop = function(dir) {
    if(dir == "left") {
      if(this.speed.x < 0) {
        this.speed.x = 0;
      }
    } else if(dir == "right") {
      if(this.speed.x > 0) {
        this.speed.x = 0;
      }
    }
  }

  this.updatePosition = function() {
    this.standing = false;
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;

    this.hb = new Hitbox(this.pos, this.img);

    if(this.hb.b >= ground) {
      this.pos.y = ground;
      this.speed.y = 0;
      this.standing = true;
      // this.speed.y = -this.speed.y/1.6;
    }

    if(this.hb.t <= 0) {
      this.pos.y = this.img.height;
      this.speed.y = -this.speed.y/1.3;
    }

    if(this.hb.r >= canvas.width) {
      this.pos.x = canvas.width-this.img.width/2;
      // this.speed.x = -this.speed.x/1.3;
    } else if(this.hb.l <= 0) {
      this.pos.x = this.img.width/2;
      // this.speed.x = -this.speed.x/1.3;
    }

    for (var i = objects.length - 1; i >= 0; i--) {
      var obj = objects[i];

      if(obj.col) {
        if(collision(this.hb, obj.hb)) {
          var side = getMinSideDist(this.hb, obj.hb);

          switch(side) {
            case "b":
              if(this.speed.y > 0){
                this.pos.y = obj.hb.t;
                this.standing = true;
                this.speed.y = 0;
              }
              break;
            case "t":
              if(this.speed.y < 0){
                this.pos.y = obj.hb.b+this.img.height;
                this.speed.y = -this.speed.y/1.3;
                if(obj.spec == "coin_cube") {
                  obj.hit();
                }
              }
              break
            case "r":
              if(this.speed.x > 0){
                this.pos.x = obj.hb.l-this.img.width/2;
              }
              break;
            case "l":
              if(this.speed.x < 0){
                this.pos.x = obj.hb.r+this.img.width/2;
              }
              break;
          }
        }
      }
    }

    this.hb = new Hitbox(this.pos, this.img);
  }

  this.updateState = function() { 
    this.tick++;
    this.tick %= 2;

    if(this.speed.x > 0)
      this.side = "right";
    else if(this.speed.x < 0)
      this.side = "left";

    if(this.standing) {
      if(this.speed.x != 0) {
        if(this.tick == 0) {
          if(this.state == "idle") { 
            this.state = "walk";
          } else {
            this.state = "idle";
          }
        }
      } else {
        if(this.down)
          this.state = "down";
        else
          this.state = "idle";
      }
    } else {
      if(this.speed.y < 0)
        this.state = "jump";
      else
        this.state = "fall";
    }

    this.img = document.getElementById(this.state + "_" + this.side);
    this.hb = new Hitbox(this.pos, this.img);
  }
}