const { Responsive } = P5Template;

let particles = [];
const r = 3;

function setup() {
  new Responsive().createResponsiveCanvas(800, 400, 'contain', true);
  background(0);
  colorMode(HSB);

  for (let idY = 0; idY < height; idY += 12) {
    for (let idX = 0; idX < width; idX += 12) {
      particles.push({
        x: idX,
        y: idY,
        vx: 0,
        vy: 0,
        colour: color(random(160, 255), 100, 100),
      });
    }
  }
}

function draw() {
  colorMode(HSB);
  background('black');
  noStroke();
  let minSpeed = map(mouseX, 0, width, 1, 3);
  let maxSpeed = map(mouseY, 0, height, 4, 6);
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];

    let Vx = map(
      noise(particle.x * 0.00001, particle.y * 0.0095, frameCount * 0.001),
      0,
      1,
      minSpeed,
      maxSpeed
    );
    let Vy = map(
      noise(
        particle.y * 0.00001,
        particle.x * 0.0095,
        frameCount * 0.01 + 1000
      ),
      0,
      1,
      minSpeed,
      maxSpeed
    );

    particle.vx += Vx - (minSpeed + maxSpeed) / 2;
    particle.vy += Vy - (minSpeed + maxSpeed) / 2;

    particle.x += particle.vx * 0.01;
    particle.y += particle.vy * 0.01;

    if (particle.x < r) {
      particle.x = r;
      particle.vx *= -0.7;
    }
    if (particle.x > width - r) {
      particle.x = width - r;
      particle.vx *= -0.7;
    }
    if (particle.y < r) {
      particle.y = r;
      particle.vy *= -0.7;
    }
    if (particle.y > height - r) {
      particle.y = height - r;
      particle.vy *= -0.7;
    }

    fill(particle.colour);
    let scale = random(0, 2);
    ellipse(particle.x, particle.y, scale);
  }
}
