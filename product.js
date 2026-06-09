'use strict';

/* ── PRODUCT DATA ────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1, name: 'Blazer', col: 'NOIR', cat: 'Clothing', price: 380,
    desc: 'Power tailoring, deconstructed. Lapel-less construction in crisp technical wool — a silhouette that speaks before you do. Four-button front, structured shoulder, concealed pockets.',
    sizes: ['36','38','40','42','44'],
    details: [
      ['Material','90% wool, 10% silk blend, fully canvassed'],
      ['Fit','Structured — true to size'],
      ['Care','Dry clean only'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 2, name: 'Tailored Suit', col: 'NOIR', cat: 'Clothing', price: 480,
    desc: 'The NOIR house suit. Peak lapel, double-button closure, full canvas construction. Trousers with extended rise and pressed crease. Precision from first fitting.',
    sizes: ['36','38','40','42','44'],
    details: [
      ['Material','80% wool, 20% silk, half-canvas construction'],
      ['Fit','Tailored — size up for a relaxed shoulder'],
      ['Care','Dry clean only'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 3, name: 'Coat', col: 'NOIR', cat: 'Clothing', price: 420,
    desc: 'Long-form tailoring at its most considered. Dropped shoulder, oversized lapel, and a hem that grazes the floor. The coat that ends the conversation.',
    sizes: ['XS','S','M','L','XL'],
    details: [
      ['Material','85% boiled wool, 15% nylon, fully lined'],
      ['Fit','Oversized — true to size'],
      ['Care','Dry clean only'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 4, name: 'Trouser', col: 'NOIR', cat: 'Clothing', price: 240,
    desc: 'Wide-leg construction in technical crepe. Extended rise, side pockets, and a hem with deliberate weight. Pairs with everything. Needs nothing.',
    sizes: ['XS','S','M','L','XL'],
    details: [
      ['Material','98% cotton, 2% elastane twill'],
      ['Fit','High-rise, wide leg — true to size'],
      ['Care','Hand wash cold, hang to dry'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 5, name: 'Leather Gloves', col: 'NOIR', cat: 'Accessories', price: 120,
    desc: 'Full-grain nappa with cashmere lining. Unlined fingertips for precision. The finishing piece for those who consider every detail.',
    sizes: ['S','M','L'],
    details: [
      ['Material','Full-grain nappa leather, cashmere lining'],
      ['Fit','True to size — see sizing guide'],
      ['Care','Hand wash cold in mild soap, air dry flat'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 6, name: 'Hoodie', col: 'ECLIPSE', cat: 'Clothing', price: 180,
    desc: '340gsm French terry, oversized through the shoulder, with a kangaroo pocket wide enough to matter. The hoodie for people who know what it means.',
    sizes: ['XS','S','M','L','XL'],
    details: [
      ['Material','100% heavyweight cotton French terry (340gsm)'],
      ['Fit','Oversized — size down for a relaxed fit'],
      ['Care','Machine wash 30°C, reshape while damp'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 7, name: 'Turtleneck', col: 'ECLIPSE', cat: 'Clothing', price: 220,
    desc: 'Extra-fine merino in a doubled-over neck. Ribbed throughout — collar, cuff, hem. Slim through the body, clean through the line.',
    sizes: ['XS','S','M','L','XL'],
    details: [
      ['Material','100% extra-fine merino wool (17.5 micron)'],
      ['Fit','Slim — fits true to size'],
      ['Care','Hand wash cold, dry flat'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 8, name: 'Joggers', col: 'ECLIPSE', cat: 'Clothing', price: 160,
    desc: 'Technical joggers with a tapered hem and structured waistband. Worn in, worn out, worn everywhere. The movement piece.',
    sizes: ['XS','S','M','L','XL'],
    details: [
      ['Material','80% cotton, 20% polyester fleece'],
      ['Fit','Relaxed through thigh, tapered at ankle'],
      ['Care','Machine wash 30°C'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 9, name: 'Dress', col: 'IVORY', cat: 'Clothing', price: 340,
    desc: 'Bias-cut silk charmeuse in four studied shades. Empire waist, adjustable straps, hem that responds to every movement. From dinner to daylight.',
    sizes: ['XS','S','M','L','XL'],
    details: [
      ['Material','94% silk charmeuse, 6% elastane'],
      ['Fit','Slim bias cut — size up for more drape'],
      ['Care','Dry clean or hand wash cold in mesh bag'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 10, name: 'Robe', col: 'IVORY', cat: 'Clothing', price: 420,
    desc: 'Fluid silk charmeuse in six considered shades. Wrap tie, deep side pockets, and a hem that moves. Not a robe — a garment.',
    sizes: ['XS','S','M','L','XL'],
    details: [
      ['Material','100% silk charmeuse'],
      ['Fit','Relaxed wrap — fully adjustable tie'],
      ['Care','Dry clean only'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 11, name: 'Heels', col: 'IVORY', cat: 'Accessories', price: 280,
    desc: 'Block-heeled construction in vegetable-tanned leather. 7cm heel, square toe, padded insole. The shoe that lasts as long as the occasion demands.',
    sizes: ['36','37','38','39','40','41'],
    details: [
      ['Material','Vegetable-tanned leather upper, leather sole'],
      ['Heel height','7cm block heel'],
      ['Care','Leather conditioner monthly, store in dust bag'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 12, name: 'Sandals', col: 'IVORY', cat: 'Accessories', price: 195,
    desc: 'Minimal leather sandal in a squared silhouette. Adjustable ankle strap, cushioned footbed. The sandal worn until it isn\'t.',
    sizes: ['36','37','38','39','40','41'],
    details: [
      ['Material','Full-grain leather upper and footbed'],
      ['Sole','Natural rubber outsole'],
      ['Care','Wipe clean with damp cloth, condition monthly'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 13, name: 'Tote Bag', col: 'CHROME', cat: 'Accessories', price: 320,
    desc: 'Full-grain leather, structured base, chrome hardware. Interior suede lining with zip pocket. The bag built to outlast the trend.',
    sizes: null,
    details: [
      ['Material','Full-grain leather, suede lining, chrome hardware'],
      ['Dimensions','38cm × 28cm × 14cm'],
      ['Care','Leather conditioner monthly, avoid prolonged rain exposure'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 14, name: 'Luxury Bag', col: 'CHROME', cat: 'Accessories', price: 480,
    desc: 'A statement in seven shades. Structured silhouette in textured leather with gold hardware. Two interior sections, one exterior pocket.',
    sizes: null,
    details: [
      ['Material','Pebbled full-grain leather, gold-tone hardware'],
      ['Dimensions','30cm × 22cm × 10cm'],
      ['Care','Store stuffed in dust bag, condition seasonally'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 15, name: 'Belt', col: 'CHROME', cat: 'Accessories', price: 95,
    desc: 'Full-grain leather with a chrome-plate buckle. Available in three shades — black, blue, red. The finishing layer.',
    sizes: ['S','M','L','XL'],
    details: [
      ['Material','Full-grain leather, chrome-plate buckle'],
      ['Dimensions','Adjustable 64–100cm'],
      ['Care','Wipe clean with a soft dry cloth'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 16, name: 'Statement Earrings', col: 'OBSIDIAN', cat: 'Accessories', price: 180,
    desc: 'Hand-cast brass with an obsidian patina. Drop length 4.5cm. Each pair individually finished — the detail that changes the read of a look.',
    sizes: null,
    details: [
      ['Material','Hand-cast brass, obsidian patina finish'],
      ['Dimensions','4.5cm drop, 2cm width'],
      ['Care','Avoid water contact, polish with brass cloth'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 17, name: 'Statement Necklace', col: 'OBSIDIAN', cat: 'Accessories', price: 220,
    desc: 'Layered brass chains with hand-applied obsidian patina. Adjustable length from 40–60cm. The piece worn alone or over.',
    sizes: null,
    details: [
      ['Material','Solid brass, obsidian patina finish'],
      ['Dimensions','Adjustable 40–60cm'],
      ['Care','Avoid water contact, polish with brass cloth'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  },
  {
    id: 18, name: 'Statement Ring', col: 'OBSIDIAN', cat: 'Accessories', price: 145,
    desc: 'Solid brass statement ring with wide band. Hand-polished obsidian finish. Worn on any finger — the punctuation of a considered hand.',
    sizes: ['6','7','8','9','10'],
    details: [
      ['Material','Solid brass, obsidian patina finish'],
      ['Dimensions','10mm wide band'],
      ['Care','Avoid water contact, polish with brass cloth'],
      ['Shipping','Free worldwide on orders over £200. Standard 3–5 working days.']
    ]
  }
];

/* ── COLOR VARIANTS & IMAGES PER PRODUCT ─────────────────── */
const PRODUCT_COLORS = {
  1: [
    { name: 'Black',  hex: '#111111', img: 'background/NOIR/blazer/black coat.png' },
    { name: 'Blue',   hex: '#1a3d7a', img: 'background/NOIR/blazer/blue coat.png' },
    { name: 'Lemon',  hex: '#c0b820', img: 'background/NOIR/blazer/lemon coat.png' },
    { name: 'Pink',   hex: '#c84890', img: 'background/NOIR/blazer/pink coat.png' },
  ],
  2: [
    { name: 'Default', hex: '#1a1a1a', img: 'background/NOIR/blazer/suit.png' },
  ],
  3: [
    { name: 'Cream',  hex: '#e8dcc0', img: 'background/NOIR/coat/cream coat.png' },
    { name: 'Green',  hex: '#1a5c30', img: 'background/NOIR/coat/green coat.png' },
    { name: 'Purple', hex: '#4a1878', img: 'background/NOIR/coat/purple coat.png' },
    { name: 'Yellow', hex: '#c0a010', img: 'background/NOIR/coat/yellow coat.png' },
  ],
  4: [
    { name: 'Black',  hex: '#111111', img: 'background/NOIR/trouser/black trouser.png' },
    { name: 'Green',  hex: '#1a5c30', img: 'background/NOIR/trouser/green trouser.png' },
    { name: 'Purple', hex: '#4a1878', img: 'background/NOIR/trouser/purple trouser.png' },
  ],
  5: [
    { name: 'Default', hex: '#111111', img: 'background/obsidian(jeweries)/belt/glove.png' },
  ],
  6: [
    { name: 'Grey',   hex: '#686868', img: 'background/eclipse(street wares)/hoodies/grey hoodie no bg.png' },
    { name: 'Green',  hex: '#1a5c30', img: 'background/eclipse(street wares)/hoodies/green hoodie.png' },
    { name: 'Red',    hex: '#b01818', img: 'background/eclipse(street wares)/hoodies/red hoodie.png' },
    { name: 'Purple', hex: '#4a1878', img: 'background/eclipse(street wares)/hoodies/purple hoodie.png' },
    { name: 'Lemon',  hex: '#c0b018', img: 'background/eclipse(street wares)/hoodies/lemon hoodie.png' },
  ],
  7: [
    { name: 'Green',  hex: '#1a5c30', img: 'background/eclipse(street wares)/turtle neck/green turtle neck.png' },
    { name: 'Red',    hex: '#b01818', img: 'background/eclipse(street wares)/turtle neck/red turtle neck.png' },
    { name: 'Orange', hex: '#c04010', img: 'background/eclipse(street wares)/turtle neck/orange turtle neck.png' },
    { name: 'Purple', hex: '#4a1878', img: 'background/eclipse(street wares)/turtle neck/puerple turtle neck.png' },
  ],
  8: [
    { name: 'Default', hex: '#333333', img: 'background/eclipse(street wares)/joggers/jogginghose.jpg' },
  ],
  9: [
    { name: 'Cream',  hex: '#e8dcc0', img: 'background/IVORY(women dress)/DRESS/cream dress.png' },
    { name: 'Green',  hex: '#1a5c30', img: 'background/IVORY(women dress)/DRESS/green dress.png' },
    { name: 'Pink',   hex: '#d04880', img: 'background/IVORY(women dress)/DRESS/pink dress.png' },
    { name: 'Yellow', hex: '#c8a010', img: 'background/IVORY(women dress)/DRESS/yellow dress.png' },
  ],
  10: [
    { name: 'Black',  hex: '#111111', img: 'background/IVORY(women dress)/robe/black robe.png' },
    { name: 'Blue',   hex: '#1a3d7a', img: 'background/IVORY(women dress)/robe/blue robe.png' },
    { name: 'Green',  hex: '#1a5c30', img: 'background/IVORY(women dress)/robe/green robe.png' },
    { name: 'Orange', hex: '#c04010', img: 'background/IVORY(women dress)/robe/orange robe.png' },
    { name: 'Purple', hex: '#4a1878', img: 'background/IVORY(women dress)/robe/purple robe.png' },
    { name: 'Red',    hex: '#b01818', img: 'background/IVORY(women dress)/robe/red robe.png' },
  ],
  11: [
    { name: 'Black',  hex: '#111111', img: 'background/IVORY(women dress)/heels/black heels.png' },
    { name: 'Blue',   hex: '#1a3d7a', img: 'background/IVORY(women dress)/heels/blue heels.png' },
    { name: 'Brown',  hex: '#7a4818', img: 'background/IVORY(women dress)/heels/brown heels.png' },
    { name: 'Green',  hex: '#1a5c30', img: 'background/IVORY(women dress)/heels/green heels.png' },
    { name: 'Red',    hex: '#b01818', img: 'background/IVORY(women dress)/heels/red heels.png' },
    { name: 'White',  hex: '#e0e0e0', img: 'background/IVORY(women dress)/heels/white heels.png' },
  ],
  12: [
    { name: 'Black',  hex: '#111111', img: 'background/IVORY(women dress)/sandals/black sandals.png' },
    { name: 'Green',  hex: '#1a5c30', img: 'background/IVORY(women dress)/sandals/green sandals.png' },
    { name: 'Purple', hex: '#4a1878', img: 'background/IVORY(women dress)/sandals/purple sandals.png' },
    { name: 'Red',    hex: '#b01818', img: 'background/IVORY(women dress)/sandals/red sandals.png' },
  ],
  13: [
    { name: 'Black', hex: '#111111', img: 'background/chrome(BAGS)/hand bag/black bag.png' },
    { name: 'Red',   hex: '#b01818', img: 'background/chrome(BAGS)/hand bag/red bag.png' },
  ],
  14: [
    { name: 'Black',  hex: '#111111', img: 'background/chrome(BAGS)/luxury bag/black luxury bag.png' },
    { name: 'Blue',   hex: '#1a3d7a', img: 'background/chrome(BAGS)/luxury bag/blue luxury bag.png' },
    { name: 'Green',  hex: '#1a5c30', img: 'background/chrome(BAGS)/luxury bag/green luxury bag.png' },
    { name: 'Orange', hex: '#c04010', img: 'background/chrome(BAGS)/luxury bag/orange luxury bag.png' },
    { name: 'Purple', hex: '#4a1878', img: 'background/chrome(BAGS)/luxury bag/purple luxury bag.png' },
    { name: 'Red',    hex: '#b01818', img: 'background/chrome(BAGS)/luxury bag/red luxury bag.png' },
    { name: 'Yellow', hex: '#c8a010', img: 'background/chrome(BAGS)/luxury bag/yellow luxury bag.png' },
  ],
  15: [
    { name: 'Black', hex: '#111111', img: 'background/obsidian(jeweries)/belt/black belt.png' },
    { name: 'Blue',  hex: '#1a3d7a', img: 'background/obsidian(jeweries)/belt/blue belt.png' },
    { name: 'Red',   hex: '#b01818', img: 'background/obsidian(jeweries)/belt/red belt.png' },
  ],
  16: [
    { name: 'Default', hex: '#1a1a1a', img: 'background/obsidian(jeweries)/belt/earings.png' },
  ],
  17: [
    { name: 'Default', hex: '#1a1a1a', img: 'background/obsidian(jeweries)/belt/neck piece.png' },
  ],
  18: [
    { name: 'Default', hex: '#1a1a1a', img: 'background/obsidian(jeweries)/belt/ring.png' },
  ],
};

/* ── RENDER ──────────────────────────────────────────────── */
(function () {
  const id = +new URLSearchParams(window.location.search).get('id');
  const p  = PRODUCTS.find(x => x.id === id);

  if (!p) {
    document.title = 'Not Found — SLUVET';
    document.querySelector('.pd-section').innerHTML =
      '<p style="padding:120px 6%;font-size:12px;color:rgba(240,237,232,0.4);letter-spacing:3px;text-transform:uppercase;">Product not found. <a href="shop.html" style="color:#c9a84c;text-decoration:none;">Return to shop →</a></p>';
    return;
  }

  document.title = `${p.name} — SLUVET`;
  document.getElementById('pdBreadColl').textContent = p.col;
  document.getElementById('pdBreadName').textContent = p.name;
  document.body.dataset.col = p.col.toLowerCase();

  const svgWrap    = document.getElementById('pdSvgWrap');
  const prodColors = PRODUCT_COLORS[p.id] || [];

  function showImg(colorName) {
    const c = prodColors.find(x => x.name === colorName) || prodColors[0];
    if (c && c.img) {
      svgWrap.innerHTML = `<img id="pdProductImg" src="${c.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:contain;display:block;">`;
      const tag = document.querySelector('.pd-3d-tag');
      if (tag) tag.style.display = 'none';
    }
  }
  showImg(prodColors.length ? prodColors[0].name : '');

  document.getElementById('pdColTag').textContent  = p.col + ' — ' + p.cat;
  document.getElementById('pdName').textContent    = p.name;
  document.getElementById('pdPrice').textContent   = '£' + p.price.toLocaleString();
  document.getElementById('pdDesc').textContent    = p.desc;

  /* Sizes */
  const sizeSection = document.getElementById('pdSizeSection');
  const sizesEl     = document.getElementById('pdSizes');
  let selectedSize  = 'One Size';

  if (p.sizes) {
    p.sizes.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.className = 'pd-size-btn' + (i === 0 ? ' active' : '');
      btn.textContent = s;
      if (i === 0) selectedSize = s;
      btn.addEventListener('click', () => {
        sizesEl.querySelectorAll('.pd-size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = s;
      });
      sizesEl.appendChild(btn);
    });
  } else {
    sizeSection.style.display = 'none';
  }

  /* Color swatches — only shown when 2+ variants exist */
  const colorSection = document.getElementById('pdColorSection');
  const colorNameEl  = document.getElementById('pdColorName');
  const colorsEl     = document.getElementById('pdColors');
  let selectedColor  = prodColors.length ? prodColors[0].name : 'One Size';

  if (prodColors.length <= 1) {
    colorSection.style.display = 'none';
  } else {
    colorNameEl.textContent = prodColors[0].name;
    prodColors.forEach((c, i) => {
      const btn = document.createElement('button');
      btn.className        = 'pd-color-btn' + (i === 0 ? ' active' : '');
      btn.style.background = c.hex;
      btn.dataset.color    = c.name.toLowerCase();
      btn.title            = c.name;
      btn.setAttribute('aria-label', c.name);
      btn.addEventListener('click', () => {
        colorsEl.querySelectorAll('.pd-color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedColor = c.name;
        colorNameEl.textContent = c.name;
        showImg(c.name);
      });
      colorsEl.appendChild(btn);
    });
  }

  /* Quantity */
  let qty = 1;
  const qtyEl  = document.getElementById('pdQtyNum');
  const minBtn = document.getElementById('pdQtyMinus');
  const plsBtn = document.getElementById('pdQtyPlus');

  minBtn.addEventListener('click', () => { if (qty > 1) { qty--; qtyEl.textContent = qty; } });
  plsBtn.addEventListener('click', () => { qty++; qtyEl.textContent = qty; });

  /* Add to cart */
  const addBtn = document.getElementById('pdAddBtn');
  addBtn.addEventListener('click', () => {
    if (!window.SLUVET?.addToCart) return;
    const cartName = prodColors.length > 1 ? `${p.name} — ${selectedColor}` : p.name;
    for (let i = 0; i < qty; i++) window.SLUVET.addToCart(cartName, p.price, selectedSize);
    const orig = addBtn.textContent;
    addBtn.textContent = 'Added ✓';
    addBtn.classList.add('added');
    setTimeout(() => { addBtn.textContent = orig; addBtn.classList.remove('added'); }, 2200);
  });

  /* Accordion */
  const acc = document.getElementById('pdAccordion');
  p.details.forEach(([label, value]) => {
    const row = document.createElement('div');
    row.className = 'pd-acc-row';
    row.innerHTML = `
      <button class="pd-acc-trigger">
        <span>${label}</span>
        <span class="pd-acc-icon">+</span>
      </button>
      <div class="pd-acc-body">${value}</div>
    `;
    row.querySelector('.pd-acc-trigger').addEventListener('click', () => {
      const isOpen = row.classList.contains('open');
      acc.querySelectorAll('.pd-acc-row').forEach(r => r.classList.remove('open'));
      if (!isOpen) row.classList.add('open');
    });
    acc.appendChild(row);
  });

  /* Related products — same collection */
  const related = PRODUCTS.filter(x => x.col === p.col && x.id !== p.id).slice(0, 3);
  const grid    = document.getElementById('pdRelatedGrid');

  if (!related.length) {
    document.querySelector('.pd-related').style.display = 'none';
  } else {
    related.forEach(r => {
      const rColors  = PRODUCT_COLORS[r.id] || [];
      const firstImg = rColors.length ? rColors[0].img : '';
      const card = document.createElement('div');
      card.className = 'product-card reveal';
      card.innerHTML = `
        <a href="product.html?id=${r.id}" class="product-card-link">
          <div class="product-card-img">
            ${firstImg ? `<img src="${firstImg}" alt="${r.name}" class="product-card-svg" style="object-fit:contain;">` : ''}
            <div class="product-card-hover">
              <button class="product-card-add" data-name="${r.name}" data-price="${r.price}">Quick Add</button>
            </div>
          </div>
          <div class="product-card-meta">
            <div class="product-card-top">
              <span class="product-card-coll">${r.col}</span>
              <span class="product-card-type">${r.cat}</span>
            </div>
            <p class="product-card-name">${r.name}</p>
            <p class="product-card-price">£${r.price.toLocaleString()}</p>
          </div>
        </a>
      `;
      card.querySelector('.product-card-add').addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        window.SLUVET?.addToCart(r.name, r.price, 'One Size');
        const btn = e.currentTarget;
        btn.textContent = 'Added ✓';
        setTimeout(() => { btn.textContent = 'Quick Add'; }, 2000);
      });
      grid.appendChild(card);
    });
  }
})();
