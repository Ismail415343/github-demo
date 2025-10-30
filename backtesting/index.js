const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

let currentIndex = 0;

function drawChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const visibleBars = barData.slice(0, currentIndex);
  const barWidth = 5;
  const maxBars = Math.floor(canvas.width / barWidth);

  const start = Math.max(0, visibleBars.length - maxBars);
  const displayedBars = visibleBars.slice(start);

  displayedBars.forEach((bar, i) => {
    const x = i * barWidth;
    const yOpen = canvas.height - bar.open * 3;
    const yClose = canvas.height - bar.close * 3;
    const yHigh = canvas.height - bar.high * 3;
    const yLow = canvas.height - bar.low * 3;

    ctx.beginPath();
    ctx.strokeStyle = bar.close > bar.open ? '#00ff00' : '#ff0000';
    ctx.moveTo(x + barWidth / 2, yHigh);
    ctx.lineTo(x + barWidth / 2, yLow);
    ctx.stroke();

    ctx.fillStyle = bar.close > bar.open ? '#00ff00' : '#ff0000';
    ctx.fillRect(x, Math.min(yOpen, yClose), barWidth, Math.abs(yClose - yOpen));
  });
}

function nextCandle() {
  if (currentIndex < barData.length) {
    currentIndex++;
    drawChart();
  }
}

document.getElementById('next').addEventListener('click', nextCandle);
document.getElementById('reset').addEventListener('click', () => {
  currentIndex = 0;
  drawChart();
});

drawChart();