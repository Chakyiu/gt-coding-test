class Canvas {
  constructor(id, width, height, fps) {
    this.canvas = document.createElement("canvas");
    this.canvas.id = id;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d");
    this.fps = fps;
    this.interval = null;
    this.drawItem = [];
    document.getElementsByTagName("body")[0].append(this.canvas);
  }

  start = () => {
    this.interval = setInterval(() => this.draw(), 1000 / this.fps);
  };

  stop = () => {
    if (this.interval) clearInterval(this.interval);
  };

  add = (item) => {
    this.drawItem.push(item);
  };

  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawItem.forEach((item) => {
      this.ctx.drawImage(
        item.img,
        item.positionX,
        item.positionY,
        item.img.width * 5,
        ((item.img.height * this.canvas.height) / this.canvas.width) * 5
      );
      if (
        item.positionX < 0 ||
        item.positionX > this.canvas.width - item.width
      ) {
        item.velocityX = -(item.velocityX + Math.floor(Math.random() * 2));
      }
      if (
        item.positionY < 0 ||
        item.positionY > this.canvas.height - item.height
      ) {
        item.velocityY = -(item.velocityY + Math.floor(Math.random() * 2));
      }

      item.positionX += item.velocityX;
      item.positionY += item.velocityY;
    });
  };
}

class DrawObject {
  constructor(id, width, height, velocityX, velocityY, src) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.img = new Image();
    this.img.src = src;
    this.img.width = width;
    this.img.height = height;
    this.positionX = 0;
    this.positionY = 0;
  }
}

window.onload = () => {
  const canvas = new Canvas("can", 800, 600, 60);
  const obj_1 = new DrawObject(
    "o1",
    150,
    150,
    2,
    2,
    "http://upload.wikimedia.org/wikipedia/commons/d/d2/Svg_example_square.svg"
  );
  canvas.add(obj_1);
  canvas.start();
};
