(function () {
  const colors = {
    blue: getComputedStyle(document.documentElement).getPropertyValue('--blue').trim(),
    amber: getComputedStyle(document.documentElement).getPropertyValue('--amber').trim(),
    rose: getComputedStyle(document.documentElement).getPropertyValue('--rose').trim(),
    sage: getComputedStyle(document.documentElement).getPropertyValue('--sage').trim(),
    panel: getComputedStyle(document.documentElement).getPropertyValue('--panel').trim(),
    grid: getComputedStyle(document.documentElement).getPropertyValue('--grid').trim()
  };
  const NS = 'http://www.w3.org/2000/svg';

  function rng(seed) {
    return function () {
      seed |= 0;
      seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function chartMarkup(type, random) {
    const width = 500, height = 300;
    let markup = `<svg viewBox="0 0 ${width} ${height}" role="presentation" xmlns="${NS}">`;
    if (type === 'line') {
      let y = 160, points = [];
      for (let i = 0; i < 24; i++) {
        y += (random() - 0.5) * 50;
        y = Math.max(50, Math.min(250, y));
        points.push(`${30 + i * 18.5},${y.toFixed(0)}`);
      }
      markup += `<path d="M30 30V270H470" fill="none" stroke="${colors.grid}" stroke-width="2"/>`;
      markup += `<polyline points="${points.join(' ')}" fill="none" stroke="${colors.rose}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else if (type === 'heat') {
      const cols = 14, rows = 8, cellWidth = 31, cellHeight = 28;
      for (let col = 0; col < cols; col++) for (let row = 0; row < rows; row++) {
        const opacity = (0.12 + random() * 0.88).toFixed(2);
        markup += `<rect x="${30 + col * 31}" y="${28 + row * 30}" width="${cellWidth}" height="${cellHeight}" rx="3" fill="${colors.sage}" opacity="${opacity}"/>`;
      }
    } else if (type === 'coffee') {
      markup += `<rect x="24" y="20" width="452" height="260" rx="18" fill="#efe3d2"/>`;
      markup += `<text x="48" y="55" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#5b3b22">COFFEE IMPORTS · 2015–2019</text>`;
      markup += `<rect x="48" y="72" width="190" height="122" rx="8" fill="#654321"/>`;
      markup += `<rect x="242" y="72" width="104" height="74" rx="8" fill="#8a6038"/>`;
      markup += `<rect x="350" y="72" width="102" height="74" rx="8" fill="#a87b4e"/>`;
      markup += `<rect x="242" y="152" width="98" height="92" rx="8" fill="#b38a58"/>`;
      markup += `<rect x="344" y="152" width="108" height="92" rx="8" fill="#795333"/>`;
      markup += `<rect x="48" y="202" width="92" height="42" rx="7" fill="#9a7047"/>`;
      markup += `<rect x="146" y="202" width="86" height="42" rx="7" fill="#c19a70"/>`;
    } else if (type === 'cowbell') {
      markup += `<rect x="24" y="20" width="452" height="260" rx="18" fill="#fff3d4"/>`;
      markup += `<path d="M222 74h56l25 120H197z" fill="#c9811b" stroke="#57340f" stroke-width="8" stroke-linejoin="round"/>`;
      markup += `<rect x="235" y="52" width="30" height="26" rx="7" fill="#c9811b" stroke="#57340f" stroke-width="7"/>`;
      markup += `<path d="M215 96l-12 75" stroke="#fff" stroke-opacity=".55" stroke-width="8" stroke-linecap="round"/>`;
      markup += `<ellipse cx="250" cy="197" rx="37" ry="8" fill="#57340f"/>`;
      markup += `<text x="135" y="250" text-anchor="middle" font-family="Arial,sans-serif" font-size="31" font-weight="700" fill="#d6361f">659</text>`;
      markup += `<text x="135" y="269" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="#7a6548">SONGS</text>`;
      markup += `<text x="365" y="250" text-anchor="middle" font-family="Arial,sans-serif" font-size="31" font-weight="700" fill="#d6361f">450</text>`;
      markup += `<text x="365" y="269" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="#7a6548">ARTISTS</text>`;
    } else if (type === 'turkey') {
      markup += `<rect x="24" y="20" width="452" height="260" rx="18" fill="#f7efe0"/>`;
      markup += `<rect x="24" y="20" width="452" height="68" rx="18" fill="#1f4d3a"/>`;
      markup += `<text x="48" y="64" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#e8a317">MINNESOTA TURKEY FACT SHEET</text>`;
      markup += `<text x="52" y="186" font-family="Arial,sans-serif" font-size="96" font-weight="700" fill="#b5400f">#1</text>`;
      markup += `<text x="58" y="218" font-family="Arial,sans-serif" font-size="15" font-weight="700" fill="#5a4636">39 MILLION BIRDS IN 2023</text>`;
      markup += `<rect x="278" y="128" width="148" height="28" rx="6" fill="#b5400f"/>`;
      markup += `<rect x="278" y="168" width="119" height="28" rx="6" fill="#e8a317"/>`;
      markup += `<rect x="278" y="208" width="82" height="28" rx="6" fill="#1f4d3a"/>`;
    } else if (type === 'app') {
      markup += `<rect x="28" y="24" width="444" height="252" rx="12" fill="${colors.panel}"/>`;
      markup += `<rect x="28" y="24" width="444" height="40" rx="12" fill="${colors.blue}"/>`;
      markup += `<circle cx="52" cy="44" r="5" fill="${colors.panel}"/><circle cx="70" cy="44" r="5" fill="${colors.panel}"/><circle cx="88" cy="44" r="5" fill="${colors.panel}"/>`;
      markup += `<rect x="50" y="86" width="112" height="166" rx="6" fill="${colors.grid}"/>`;
      markup += `<rect x="180" y="86" width="264" height="72" rx="6" fill="${colors.amber}" opacity=".8"/>`;
      markup += `<rect x="180" y="174" width="124" height="78" rx="6" fill="${colors.rose}" opacity=".8"/>`;
      markup += `<rect x="320" y="174" width="124" height="78" rx="6" fill="${colors.sage}" opacity=".8"/>`;
    } else if (type === 'spelling') {
      const letters = ['S', 'P', 'E', 'L', 'L'];
      const tiles = [colors.amber, colors.rose, colors.blue, colors.sage, colors.amber];
      markup += `<rect x="28" y="24" width="444" height="252" rx="18" fill="${colors.panel}"/>`;
      markup += `<rect x="52" y="48" width="140" height="14" rx="7" fill="${colors.blue}" opacity=".75"/>`;
      markup += `<rect x="52" y="78" width="230" height="8" rx="4" fill="${colors.grid}"/>`;
      letters.forEach(function (letter, index) {
        const x = 52 + index * 78;
        markup += `<rect x="${x}" y="112" width="64" height="74" rx="12" fill="${tiles[index]}"/>`;
        markup += `<text x="${x + 32}" y="162" text-anchor="middle" font-family="Arial,sans-serif" font-size="38" font-weight="700" fill="#ffffff">${letter}</text>`;
      });
      markup += `<rect x="52" y="210" width="190" height="14" rx="7" fill="${colors.grid}"/>`;
      markup += `<circle cx="416" cy="150" r="28" fill="${colors.blue}"/>`;
      markup += `<path d="M412 138v24m0-4a9 9 0 0 0 9-9v-5a9 9 0 0 0-18 0v5a9 9 0 0 0 9 9m-13-7a13 13 0 0 0 26 0" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>`;
    } else if (type === 'game') {
      markup += `<rect width="500" height="300" fill="${colors.blue}"/>`;
      markup += `<circle cx="390" cy="92" r="46" fill="${colors.amber}"/>`;
      markup += `<path d="M0 228 115 108l96 120 93-100 196 172H0Z" fill="${colors.sage}"/>`;
      markup += `<path d="M0 252 144 168l104 132H0Zm245 48 110-128 145 128Z" fill="${colors.rose}"/>`;
      markup += `<rect x="28" y="24" width="108" height="12" rx="6" fill="${colors.panel}" opacity=".8"/>`;
      markup += `<rect x="28" y="46" width="72" height="8" rx="4" fill="${colors.panel}" opacity=".55"/>`;
    }
    return markup + '</svg>';
  }

  document.querySelectorAll('[data-chart]').forEach(function (element) {
    const random = rng(Number(element.dataset.seed) || 1);
    element.innerHTML = chartMarkup(element.dataset.chart, random);
  });

  document.querySelectorAll('[data-year]').forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });
})();
