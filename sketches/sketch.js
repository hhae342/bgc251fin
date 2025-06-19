const { Responsive } = P5Template;

let particles = [];
const r = 3;

function setup() {
  new Responsive().createResponsiveCanvas(800, 800, 'contain', true);
  background(0);
  colorMode(HSB);

  for (let idY = 0; idY < height; idY += 20) {
    for (let idX = 0; idX < width; idX += 20) {
      particles.push({
        x: idX,
        y: idY,
        vx: 0,
        vy: 0,
        colour: color(random(200, 240), 100, 100),
      });
    }
  }
}

function draw() {
  colorMode(HSB);
  background('black');
  let minSpeed = map(mouseX, 0, width, 1, 2);
  let maxSpeed = map(mouseY, 0, height, 3, 6);

  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];

    let Vx = map(
      noise(particle.x * 0.00001, particle.y * 0.0008, frameCount * 0.01),
      0,
      1,
      minSpeed,
      maxSpeed
    );
    let Vy = map(
      noise(particle.y * 0.00001, particle.x * 0.0008, frameCount * 0.01 + 800),
      0,
      1,
      minSpeed,
      maxSpeed
    );

    particle.vx += Vx - (minSpeed + maxSpeed) / 2;
    particle.vy += Vy - (minSpeed + maxSpeed) / 2;

    particle.x += particle.vx * 0.02;
    particle.y += particle.vy * 0.02;

    if (particle.x < r) {
      particle.x = r;
      particle.vx *= -1.0;
    }
    if (particle.x > width - r) {
      particle.x = width - r;
      particle.vx *= -1.0;
    }
    if (particle.y < r) {
      particle.y = r;
      particle.vy *= -1.0;
    }
    if (particle.y > height - r) {
      particle.y = height - r;
      particle.vy *= -1.0;
    }

    fill(particle.colour);
    let scale = random(1, 5);
    ellipse(particle.x, particle.y, scale);
  }
}
