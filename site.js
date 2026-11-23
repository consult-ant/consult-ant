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
      markup += `<rect width="500" height="300" fill="#bf9f7a"/>`;
      markup += `<rect x="20" y="12" width="460" height="276" fill="#dcc4a6"/>`;
      markup += `<text x="36" y="39" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="#6b4423">Top Coffee Importing</text>`;
      markup += `<text x="36" y="61" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="#6b4423">Countries <tspan font-size="11">from 2015–2019</tspan></text>`;
      markup += `<path d="M37 78L115 108L145 143L37 198Z" fill="#b38a58"/>`;
      markup += `<path d="M75 91L148 132" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/>`;
      markup += `<circle cx="250" cy="170" r="95" fill="#fff"/>`;
      markup += `<clipPath id="coffee-map-clip"><circle cx="250" cy="170" r="84"/></clipPath>`;
      markup += `<g clip-path="url(#coffee-map-clip)" stroke="#d9c1a0" stroke-width="1.5">`;
      markup += `<path d="M154 76H218L228 111L193 132L157 120Z" fill="#9a7047"/>`;
      markup += `<path d="M218 76L263 76L276 111L249 128L228 111Z" fill="#654321"/>`;
      markup += `<path d="M263 76H347L345 126L306 145L276 111Z" fill="#8a6038"/>`;
      markup += `<path d="M347 76H352V171L326 181L306 145L345 126Z" fill="#a87b4e"/>`;
      markup += `<path d="M154 76L157 120L177 151L151 184L145 145Z" fill="#b38a58"/>`;
      markup += `<path d="M157 120L193 132L214 166L194 211L151 184L177 151Z" fill="#795333"/>`;
      markup += `<path d="M193 132L228 111L249 128L261 159L245 195L214 166Z" fill="#c19a70"/>`;
      markup += `<path d="M249 128L276 111L306 145L326 181L292 204L261 159Z" fill="#795333"/>`;
      markup += `<path d="M151 184L194 211L206 257H145Z" fill="#9a7047"/>`;
      markup += `<path d="M194 211L214 166L245 195L257 246L206 257Z" fill="#654321"/>`;
      markup += `<path d="M245 195L261 159L292 204L326 181L345 257H257Z" fill="#8a6038"/>`;
      markup += `<path d="M326 181L352 171V257H345Z" fill="#b38a58"/>`;
      markup += `<text x="187" y="161" text-anchor="middle" stroke="none" fill="#fff" font-family="Arial,sans-serif" font-size="7" font-weight="700">Germany</text>`;
      markup += `<text x="251" y="185" text-anchor="middle" stroke="none" fill="#fff" font-family="Arial,sans-serif" font-size="7" font-weight="700">United States</text>`;
      markup += `<text x="299" y="133" text-anchor="middle" stroke="none" fill="#fff" font-family="Arial,sans-serif" font-size="7" font-weight="700">Italy</text>`;
      markup += `<text x="233" y="101" text-anchor="middle" stroke="none" fill="#fff" font-family="Arial,sans-serif" font-size="7" font-weight="700">United Kingdom</text>`;
      markup += `<text x="282" y="228" text-anchor="middle" stroke="none" fill="#fff" font-family="Arial,sans-serif" font-size="7" font-weight="700">Spain</text>`;
      markup += `</g>`;
      markup += `<text x="427" y="226" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="700" fill="#6b4423">2018</text>`;
      markup += `<rect x="170" y="265" width="160" height="15" rx="8" fill="#fff"/>`;
      markup += `<path d="M190 272.5H309" stroke="#6b4423" stroke-width="3" stroke-linecap="round"/>`;
      markup += `<circle cx="286" cy="272.5" r="4" fill="#6b4423"/>`;
      markup += `<text x="36" y="268" font-family="Arial,sans-serif" font-size="8" font-weight="700" fill="#6b4423">Sized by 60-kg bags</text>`;
    } else if (type === 'cowbell') {
      markup += `<rect width="500" height="300" fill="#fff6dc"/>`;
      markup += `<text x="20" y="23" font-family="Arial,sans-serif" font-size="7" font-weight="700" letter-spacing="1.3" fill="#7a6548">MUSIC MARATHON 2026 · WEEK 40</text>`;
      markup += `<text x="20" y="48" font-family="Impact,Arial Black,sans-serif" font-size="23" fill="#2b1a0a">THE GREAT <tspan fill="#d6361f">COWBELL</tspan></text>`;
      markup += `<text x="20" y="70" font-family="Impact,Arial Black,sans-serif" font-size="23" fill="#2b1a0a">CENSUS</text>`;
      markup += `<path d="M439 26h19l9 35h-37z" fill="#c9811b" stroke="#2b1a0a" stroke-width="4" stroke-linejoin="round"/>`;
      markup += `<rect x="444" y="18" width="10" height="9" rx="3" fill="#c9811b" stroke="#2b1a0a" stroke-width="3"/>`;
      markup += `<circle cx="448" cy="64" r="4" fill="#c9811b" stroke="#2b1a0a" stroke-width="2"/>`;
      markup += `<rect x="16" y="80" width="468" height="48" rx="8" fill="#fffdf4" stroke="#2b1a0a" stroke-width="1.5"/>`;
      markup += `<path d="M172 85V123M328 85V123" stroke="#e6d3a3" stroke-width="1"/>`;
      [['659', 'unique songs', 94], ['450', 'different artists', 250], ['76%', 'played once', 406]].forEach(function (stat) {
        markup += `<text x="${stat[2]}" y="105" text-anchor="middle" font-family="Impact,Arial Black,sans-serif" font-size="20" fill="#d6361f">${stat[0]}</text>`;
        markup += `<text x="${stat[2]}" y="119" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="#7a6548">${stat[1]}</text>`;
      });
      markup += `<rect x="16" y="137" width="468" height="150" rx="8" fill="#fffdf4" stroke="#2b1a0a" stroke-width="1.5"/>`;
      markup += `<text x="27" y="154" font-family="Impact,Arial Black,sans-serif" font-size="13" fill="#2b1a0a">COWBELL HALL OF FAME</text>`;
      markup += `<text x="27" y="165" font-family="Arial,sans-serif" font-size="6.5" fill="#7a6548">Most-played artists · one bell = one song</text>`;
      [['Kiss', 9], ['Beatles', 8], ['Rush', 7], ['Allman Bros.', 7], ['Guns N’ Roses', 6]].forEach(function (artist, index) {
        const y = 181 + index * 20;
        markup += `<text x="27" y="${y + 3}" font-family="Arial,sans-serif" font-size="8" font-weight="700" fill="#2b1a0a">${artist[0]}</text>`;
        for (let bell = 0; bell < Math.min(artist[1], 7); bell++) {
          const x = 132 + bell * 17;
          markup += `<path d="M${x} ${y - 6}h6l3 11h-12z" fill="#c9811b" stroke="#57340f" stroke-width="1"/>`;
          markup += `<rect x="${x + 1.5}" y="${y - 8}" width="3" height="3" rx="1" fill="#c9811b" stroke="#57340f" stroke-width=".8"/>`;
        }
        markup += `<text x="260" y="${y + 3}" font-family="Arial,sans-serif" font-size="8" font-weight="700" fill="#d6361f">${artist[1]}</text>`;
      });
    } else if (type === 'cowbell-story') {
      markup += `<rect width="500" height="300" fill="#fff6dc"/>`;
      markup += `<path d="M0 49H500" stroke="#2b1a0a" stroke-width="1"/>`;
      for (let bell = 0; bell < 8; bell++) {
        const x = 179 + bell * 20;
        markup += `<path d="M${x} 12h7l4 14h-14z" fill="${bell === 0 ? '#c9811b' : '#e3d2a2'}" stroke="#2b1a0a" stroke-width="1"/>`;
        markup += `<rect x="${x + 2}" y="8" width="3" height="4" rx="1" fill="#c9811b" stroke="#2b1a0a" stroke-width=".8"/>`;
      }
      markup += `<path d="M220 98h60l25 86h-110z" fill="#c9811b" stroke="#2b1a0a" stroke-width="7" stroke-linejoin="round"/>`;
      markup += `<rect x="238" y="80" width="24" height="20" rx="6" fill="#c9811b" stroke="#2b1a0a" stroke-width="6"/>`;
      markup += `<circle cx="250" cy="187" r="8" fill="#c9811b" stroke="#2b1a0a" stroke-width="4"/>`;
      markup += `<text x="250" y="222" text-anchor="middle" font-family="Impact,Arial Black,sans-serif" font-size="27" fill="#2b1a0a">THE <tspan fill="#d6361f">COWBELL</tspan> CHRONICLES</text>`;
      markup += `<text x="250" y="241" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="#7a6548">A scroll through 659 songs that all needed a little more bell.</text>`;
      markup += `<text x="250" y="269" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="700" fill="#2b1a0a">SCROLL TO RING ↓</text>`;
    } else if (type === 'turkey') {
      markup += `<rect width="500" height="300" fill="#f7efe0"/>`;
      markup += `<rect x="28" y="14" width="444" height="130" rx="2" fill="#1f4d3a"/>`;
      markup += `<text x="51" y="34" font-family="Arial,sans-serif" font-size="7" font-weight="700" letter-spacing="1.3" fill="#e8a317">MINNESOTA TURKEY FACT SHEET</text>`;
      markup += `<text x="47" y="108" font-family="Arial,sans-serif" font-size="86" font-weight="700" fill="#e8a317">#1</text>`;
      markup += `<text x="198" y="76" font-family="Arial,sans-serif" font-size="21" font-weight="700" fill="#f7efe0">in the U.S. for</text>`;
      markup += `<text x="198" y="100" font-family="Arial,sans-serif" font-size="21" font-weight="700" fill="#f7efe0">turkeys raised</text>`;
      markup += `<text x="198" y="119" font-family="Arial,sans-serif" font-size="8" fill="#e6dcc6">39 million birds raised in 2023</text>`;
      markup += `<text x="48" y="168" font-family="Arial,sans-serif" font-size="7" font-weight="700" letter-spacing="1" fill="#b5400f">01 · BY THE NUMBERS</text>`;
      markup += `<text x="48" y="185" font-family="Arial,sans-serif" font-size="13" font-weight="700" fill="#2a1810">Minnesota’s turkey industry</text>`;
      [['39M', '#b5400f'], ['+5.4%', '#e8a317'], ['18%', '#b5400f'], ['$1B+', '#b5400f']].forEach(function (metric, index) {
        const x = 48 + index * 106;
        markup += `<rect x="${x}" y="196" width="98" height="49" rx="7" fill="${index === 1 ? '#1f4d3a' : '#fffbf2'}" stroke="#e5d5b8" stroke-width="1"/>`;
        markup += `<text x="${x + 9}" y="222" font-family="Arial,sans-serif" font-size="17" font-weight="700" fill="${index === 1 ? '#e8a317' : metric[1]}">${metric[0]}</text>`;
        markup += `<path d="M${x + 9} 231h${index === 0 ? 66 : 52}" stroke="#c9b99d" stroke-width="2"/>`;
      });
      markup += `<text x="48" y="266" font-family="Arial,sans-serif" font-size="7" font-weight="700" letter-spacing="1" fill="#b5400f">02 · POULTRY MIX</text>`;
      markup += `<rect x="48" y="273" width="404" height="11" rx="5" fill="#e5d5b8"/>`;
      markup += `<path d="M53 278.5h242" stroke="#b5400f" stroke-width="11"/><path d="M295 278.5h103" stroke="#e8a317" stroke-width="11"/><path d="M398 278.5h51" stroke="#1f4d3a" stroke-width="11"/>`;
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
