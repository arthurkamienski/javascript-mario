function Hitbox(pos, img) {
  this.t = pos.y-img.height;
  this.b = pos.y;
  this.l = pos.x-img.width/2;
  this.r = pos.x+img.width/2;
  this.tl = {x: this.l, y: this.t};
  this.tr = {x: this.r, y: this.t};
  this.bl = {x: this.l, y: this.b};
  this.br = {x: this.r, y: this.b};
}