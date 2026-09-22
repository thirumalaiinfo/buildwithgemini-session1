/* ==========================================================================
   scriptureseedsZerah - Application Logic & State Engine
   ========================================================================== */

// Product Catalog Data
const PRODUCTS = [
  {
    id: "book-1",
    type: "storybook",
    title: "The Tiny Seed's Big Journey",
    category: "Storybooks (Ages 0–5)",
    age: "0-2",
    ageLabel: "Ages 0–2 & 3–5",
    price: 16.00,
    image: "assets/hero_showcase.png",
    description: "A gentle tale of a little seed discovering God's purpose in the garden. Illustrated with warm watercolors.",
    scripture: "Matthew 13:31-32 • The kingdom of heaven is like a mustard seed...",
    sampleText: `<h3>Page 1-2</h3><p>"Deep in the cozy brown soil, Tiny Seed felt safe and warm. 'God has a big dream for you,' sang the gentle morning breeze."</p><br><h3>Page 3-4</h3><p>"Raindrops tapped tap-tap-tap on the dirt. Tiny Seed sprouted a teeny green shoot up toward the sun!"</p>`
  },
  {
    id: "book-2",
    type: "storybook",
    title: "Nightlight Blessings Bedtime Book",
    category: "Storybooks (Ages 0–5)",
    age: "0-2",
    ageLabel: "Ages 0–2 Bedtime",
    price: 18.00,
    image: "assets/hero_showcase.png",
    description: "Peaceful rhymes and soft bedtime prayers to tuck little ones in with the peace of God.",
    scripture: "Psalm 4:8 • In peace I will lie down and sleep, for You alone make me dwell in safety.",
    sampleText: `<h3>Page 1-2</h3><p>"Stars shimmer in the evening sky, as sleepy little heads sigh high. Goodnight moon, goodnight trees, wrapped in God's peaceful breeze."</p>`
  },
  {
    id: "book-3",
    type: "storybook",
    title: "God's Colorful World",
    category: "Storybooks (Ages 0–5)",
    age: "3-5",
    ageLabel: "Ages 3–5 Creation",
    price: 17.50,
    image: "assets/hero_showcase.png",
    description: "Explore colors, animals, and wonders created by God in a vibrant, interactive story format.",
    scripture: "Genesis 1:31 • God saw all that He had made, and it was very good.",
    sampleText: `<h3>Page 1-2</h3><p>"Yellow sunlit fields, deep sapphire seas, vibrant red cardinals perching in trees. God painted our world with love so bright!"</p>`
  },
  {
    id: "book-4",
    type: "storybook",
    title: "The Brave Little Lamb",
    category: "Storybooks (Ages 0–5)",
    age: "3-5",
    ageLabel: "Ages 3–5 Courage",
    price: 19.00,
    image: "assets/hero_showcase.png",
    description: "A story about trust and courage, following a curious lamb who learns the Shepherd is always near.",
    scripture: "Psalm 23:1 • The Lord is my shepherd; I lack nothing.",
    sampleText: `<h3>Page 1-2</h3><p>"Little Lamb heard a rustle in the grass. But then he remembered his Shepherd's kind voice: 'I am right here beside you!'"</p>`
  },
  {
    id: "toddler-diy-1",
    type: "toddler",
    title: "Toddler Finger Leather Stamp Kit",
    category: "Toddler Crafts (< 5)",
    age: "0-2",
    ageLabel: "Ages 2–5 Toddler DIY",
    price: 22.00,
    image: "assets/hero_showcase.png",
    description: "Non-toxic washable ink pads, soft pre-cut leather shapes (crosses, hearts, lambs) for safe toddler finger stamping.",
    scripture: "Safe parent-toddler crafting experience.",
    kitIncludes: ["4 Washable Ink Pads", "10 Soft Leather Cutouts", "Keepsake Display Frame"]
  },
  {
    id: "toddler-diy-2",
    type: "toddler",
    title: "Soft Leather & Felt Weaving Mat",
    category: "Toddler Crafts (< 5)",
    age: "3-5",
    ageLabel: "Ages 3–5 Fine Motor",
    price: 19.50,
    image: "assets/hero_showcase.png",
    description: "Pre-punched soft leather mats with colorful felt strips designed to develop toddlers' fine motor skills.",
    scripture: "Builds hand-eye coordination & creativity.",
    kitIncludes: ["Pre-punched Soft Leather Base", "12 Rainbow Felt Weaving Strips"]
  },
  {
    id: "toddler-diy-3",
    type: "toddler",
    title: "Bible Animal Leather Lacing Cards",
    category: "Toddler Crafts (< 5)",
    age: "3-5",
    ageLabel: "Ages 3–5 Lacing Set",
    price: 21.00,
    image: "assets/hero_showcase.png",
    description: "Chunky wooden animal shapes backed with full-grain leather and thick cotton lacing cords.",
    scripture: "Noah's Ark animal theme for toddlers.",
    kitIncludes: ["5 Leather & Wooden Cards (Lamb, Dove, Lion)", "4 Colorful Cotton Laces"]
  },
  {
    id: "leather-1",
    type: "leather",
    title: "Leather Bookmark DIY Craft Kit",
    category: "Leather DIY Kits",
    level: "beginner",
    levelLabel: "Beginner • 30 Mins",
    price: 24.00,
    image: "assets/hero_showcase.png",
    description: "Pre-cut full-grain cognac leather bookmark, waxed linen thread, 2 harness needles, brass rivet & alphabet stamp guide.",
    scripture: "Includes brass alphabet stamp set for custom monogram initials.",
    kitIncludes: ["Pre-cut Cognac Leather Strip", "Waxed Linen Thread", "Harness Needles", "Alphabet Stamping Tool"]
  },
  {
    id: "leather-2",
    type: "leather",
    title: "Passport Travel Wallet Craft Kit",
    category: "Leather DIY Kits",
    level: "intermediate",
    levelLabel: "Intermediate • 1.5 Hrs",
    price: 34.00,
    image: "assets/hero_showcase.png",
    description: "Craft a durable passport holder with pre-punched stitching holes, edge slicker, beeswax, and personalization guide.",
    scripture: "Heirloom grade full-grain leather that ages gracefully.",
    kitIncludes: ["Pre-punched Leather Wallet Sleeves", "Beeswax & Edge Slicker", "Polished Brass Hardware"]
  },
  {
    id: "leather-3",
    type: "leather",
    title: "Monogram Key Fob DIY Kit",
    category: "Leather DIY Kits",
    level: "beginner",
    levelLabel: "Beginner • 20 Mins",
    price: 18.00,
    image: "assets/hero_showcase.png",
    description: "A quick, satisfying craft! Hand-stitch and stamp your custom initials onto a classic leather keychain.",
    scripture: "Perfect gift set addition for crafters and parents.",
    kitIncludes: ["Leather Key Strap", "Solid Brass Key Ring", "Stitching Needle & Thread"]
  },
  {
    id: "leather-4",
    type: "leather",
    title: "Heritage Scripture Journal Cover Kit",
    category: "Leather DIY Kits",
    level: "intermediate",
    levelLabel: "Intermediate • 2 Hrs",
    price: 42.00,
    image: "assets/hero_showcase.png",
    description: "Custom leather cover kit designed to fit standard notebooks and bibles. Includes leather thong tie and punch tool.",
    scripture: "Personalize with custom scripture stamp on the spine.",
    kitIncludes: ["Thick Leather Journal Sleeve", "Leather Thong Binding", "Hole Puncher & Instructions"]
  }
];

// App State
let currentFilter = "all";
let currentAgeFilter = "all";
let cart = [];

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initCatalogFilters();
  renderProducts();
  initMonogramStudio();
  initBundleBuilder();
  initConciergeModal();
  initCartDrawer();
  initPaintingStudio();
  initMemoryGame();
});

/* Navigation & Smooth Scroll */
function initNavbar() {
  const navLinks = document.querySelectorAll(".nav-link[data-filter]");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      currentFilter = link.getAttribute("data-filter");
      renderProducts();
      document.getElementById("catalogSection").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function setCatalogFilter(filter) {
  currentFilter = filter;
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach(tab => {
    if (tab.getAttribute("data-filter") === filter) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
  renderProducts();
  document.getElementById("catalogSection").scrollIntoView({ behavior: "smooth" });
}

function scrollToToddlerZone() {
  document.getElementById("toddlerZone").scrollIntoView({ behavior: "smooth" });
}

/* Catalog Filtering & Rendering */
function initCatalogFilters() {
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentFilter = tab.getAttribute("data-filter");
      renderProducts();
    });
  });

  const ageSelect = document.getElementById("ageFilter");
  ageSelect.addEventListener("change", (e) => {
    currentAgeFilter = e.target.value;
    renderProducts();
  });
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  const filtered = PRODUCTS.filter(p => {
    // Type Filter
    if (currentFilter === "storybook" && p.type !== "storybook") return false;
    if (currentFilter === "leather" && p.type !== "leather") return false;
    if (currentFilter === "toddler" && p.type !== "toddler") return false;

    // Age / Level Sub-filter
    if (currentAgeFilter === "0-2" && p.age !== "0-2") return false;
    if (currentAgeFilter === "3-5" && p.age !== "3-5") return false;
    if (currentAgeFilter === "beginner" && p.level !== "beginner") return false;
    if (currentAgeFilter === "intermediate" && p.level !== "intermediate") return false;

    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No products match your selected filter criteria. Try selecting 'All Items'.</div>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    let badgeClass = "storybook";
    if (p.type === "leather") badgeClass = "leather";
    if (p.type === "toddler") badgeClass = "toddler";

    const badgeText = p.ageLabel || p.levelLabel;

    card.innerHTML = `
      <div class="product-image-container">
        <span class="product-tag ${badgeClass}">${badgeText}</span>
        <img src="${p.image}" alt="${p.title}" class="product-image">
      </div>
      <div class="product-body">
        <div class="product-meta">
          <span class="product-meta-item">
            <i class="fa-solid ${p.type === 'storybook' ? 'fa-book-open' : p.type === 'toddler' ? 'fa-icons' : 'fa-hammer'}"></i>
            ${p.category}
          </span>
        </div>
        <h3 class="product-title">${p.title}</h3>
        <p class="product-desc">${p.description}</p>
        
        <div class="scripture-chip">
          <i class="fa-solid fa-quote-left" style="margin-right: 4px; opacity: 0.7;"></i>
          ${p.scripture}
        </div>

        <div class="product-footer">
          <div class="product-price">$${p.price.toFixed(2)}</div>
          <div class="product-actions">
            ${p.type === 'storybook' ? `
              <button class="btn-sm-secondary" onclick="openSampleReader('${p.id}')">
                <i class="fa-solid fa-eye"></i> Read Sample
              </button>
            ` : `
              <button class="btn-sm-secondary" onclick="scrollToStudio()">
                <i class="fa-solid fa-pen"></i> Monogram
              </button>
            `}
            <button class="btn-sm-primary" onclick="addToCart('${p.id}')">
              <i class="fa-solid fa-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openSampleReader(id) {
  const item = PRODUCTS.find(p => p.id === id);
  if (!item) return;

  const modal = document.getElementById("sampleModal");
  document.getElementById("sampleModalTitle").innerText = item.title + " (Sample Pages)";
  document.getElementById("sampleModalContent").innerHTML = `
    <div style="font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--storybook-blue); margin-bottom: 12px;">
      ${item.title}
    </div>
    <div style="font-size: 0.85rem; color: var(--storybook-sage); font-weight: 700; margin-bottom: 20px;">
      Scripture Seed: ${item.scripture}
    </div>
    <div style="text-align: left; background: white; padding: 24px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); line-height: 1.8;">
      ${item.sampleText}
    </div>
    <button class="btn-primary" onclick="addToCart('${item.id}'); closeSampleModal();" style="margin-top: 24px; width: 100%; justify-content: center;">
      <i class="fa-solid fa-cart-plus"></i> Add Storybook to Basket ($${item.price.toFixed(2)})
    </button>
  `;
  modal.classList.add("active");
}

function closeSampleModal() {
  document.getElementById("sampleModal").classList.remove("active");
}

function scrollToStudio() {
  document.getElementById("studioSection").scrollIntoView({ behavior: "smooth" });
}

/* ==========================================================================
   TODDLER DIGITAL PAINTING STUDIO CANVAS (AGES 0-5)
   ========================================================================== */
function initPaintingStudio() {
  const canvas = document.getElementById("paintCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const swatches = document.querySelectorAll(".palette-swatch");
  const brushSizeInput = document.getElementById("brushSize");
  const clearBtn = document.getElementById("clearCanvasBtn");

  let painting = false;
  let currentColor = "#8B4513";
  let brushSize = 12;

  // Draw initial scene sketch outline (A little sprout seed!)
  resetCanvasOutline();

  function resetCanvasOutline() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw gentle background outline for toddler coloring
    ctx.strokeStyle = "#D1D5DB";
    ctx.lineWidth = 3;
    ctx.beginPath();
    // Soil line
    ctx.moveTo(40, 260);
    ctx.quadraticCurveTo(280, 240, 520, 260);
    // Sprout Stem
    ctx.moveTo(280, 250);
    ctx.quadraticCurveTo(280, 160, 280, 120);
    // Left leaf
    ctx.moveTo(280, 160);
    ctx.quadraticCurveTo(210, 130, 240, 190);
    ctx.quadraticCurveTo(260, 180, 280, 160);
    // Right leaf
    ctx.moveTo(280, 140);
    ctx.quadraticCurveTo(350, 110, 320, 170);
    ctx.quadraticCurveTo(300, 160, 280, 140);
    // Sun
    ctx.arc(450, 70, 35, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#9CA3AF";
    ctx.font = "14px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("🎨 Color 'The Tiny Seed' Sprout!", 20, 30);
  }

  swatches.forEach(s => {
    s.addEventListener("click", () => {
      swatches.forEach(sw => sw.classList.remove("active"));
      s.classList.add("active");
      currentColor = s.getAttribute("data-color");
    });
  });

  brushSizeInput.addEventListener("input", (e) => {
    brushSize = e.target.value;
  });

  clearBtn.addEventListener("click", resetCanvasOutline);

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function endPosition() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!painting) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mousemove", draw);

  canvas.addEventListener("touchstart", startPosition);
  canvas.addEventListener("touchend", endPosition);
  canvas.addEventListener("touchmove", draw);
}

/* ==========================================================================
   TODDLER SCRIPTURE MEMORY MATCHING GAME (AGES 0-5)
   ========================================================================== */
function initMemoryGame() {
  const grid = document.getElementById("memoryGrid");
  const scoreDisplay = document.getElementById("gameScore");
  const resetBtn = document.getElementById("resetGameBtn");
  if (!grid) return;

  const cardIcons = ["🌱", "🐑", "📖", "🕊️", "⭐", "🎨"];
  let cardsData = [...cardIcons, ...cardIcons]; // 12 cards (6 pairs)
  let flippedCards = [];
  let matchedPairs = 0;

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function buildBoard() {
    grid.innerHTML = "";
    flippedCards = [];
    matchedPairs = 0;
    scoreDisplay.innerText = "0";

    const shuffled = shuffle([...cardsData]);
    shuffled.forEach((icon, idx) => {
      const card = document.createElement("div");
      card.className = "memory-card";
      card.setAttribute("data-icon", icon);
      card.setAttribute("data-id", idx);
      card.innerText = "❓";

      card.addEventListener("click", () => handleCardClick(card));
      grid.appendChild(card);
    });
  }

  function handleCardClick(card) {
    if (card.classList.contains("flipped") || card.classList.contains("matched") || flippedCards.length === 2) {
      return;
    }

    card.classList.add("flipped");
    card.innerText = card.getAttribute("data-icon");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      if (card1.getAttribute("data-icon") === card2.getAttribute("data-icon")) {
        // Match!
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs += 1;
        scoreDisplay.innerText = matchedPairs;
        flippedCards = [];

        if (matchedPairs === 6) {
          setTimeout(() => {
            alert("🌟 Wonderful job! You matched all scripture seed animals!");
          }, 300);
        }
      } else {
        // No match
        setTimeout(() => {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1.innerText = "❓";
          card2.innerText = "❓";
          flippedCards = [];
        }, 900);
      }
    }
  }

  resetBtn.addEventListener("click", buildBoard);
  buildBoard();
}

/* Monogram Visualizer Studio */
function initMonogramStudio() {
  const inputInitials = document.getElementById("inputInitials");
  const selectScripture = document.getElementById("selectScripture");
  const canvasInitials = document.getElementById("canvasInitials");
  const canvasScripture = document.getElementById("canvasScripture");
  const canvas = document.getElementById("leatherCanvas");
  const swatches = document.querySelectorAll(".swatch-btn");

  inputInitials.addEventListener("input", (e) => {
    const val = e.target.value.toUpperCase() || "E.M.";
    canvasInitials.innerText = val;
  });

  selectScripture.addEventListener("change", (e) => {
    canvasScripture.innerText = e.target.value;
  });

  swatches.forEach(btn => {
    btn.addEventListener("click", () => {
      swatches.forEach(s => s.classList.remove("active"));
      btn.classList.add("active");
      const color = btn.getAttribute("data-color");
      canvas.style.background = `radial-gradient(circle at 30% 30%, ${color}, #1f0f05)`;
    });
  });
}

/* Gift Bundle Builder */
function initBundleBuilder() {
  const bookSelect = document.getElementById("bundleBookSelect");
  const leatherSelect = document.getElementById("bundleLeatherSelect");
  const priceDisplay = document.getElementById("bundlePrice");
  const oldPriceDisplay = document.getElementById("bundleOldPrice");
  const addBundleBtn = document.getElementById("addBundleBtn");

  const books = PRODUCTS.filter(p => p.type === "storybook");
  const leathers = PRODUCTS.filter(p => p.type === "leather" || p.type === "toddler");

  books.forEach(b => {
    const opt = document.createElement("option");
    opt.value = b.id;
    opt.innerText = `${b.title} ($${b.price.toFixed(2)})`;
    bookSelect.appendChild(opt);
  });

  leathers.forEach(l => {
    const opt = document.createElement("option");
    opt.value = l.id;
    opt.innerText = `${l.title} ($${l.price.toFixed(2)})`;
    leatherSelect.appendChild(opt);
  });

  function recalculateBundle() {
    const b = PRODUCTS.find(p => p.id === bookSelect.value);
    const l = PRODUCTS.find(p => p.id === leatherSelect.value);
    if (b && l) {
      const origTotal = b.price + l.price;
      const discounted = origTotal * 0.8; // 20% discount
      priceDisplay.innerText = `$${discounted.toFixed(2)}`;
      oldPriceDisplay.innerText = `$${origTotal.toFixed(2)}`;
    }
  }

  bookSelect.addEventListener("change", recalculateBundle);
  leatherSelect.addEventListener("change", recalculateBundle);
  recalculateBundle();

  addBundleBtn.addEventListener("click", () => {
    const b = PRODUCTS.find(p => p.id === bookSelect.value);
    const l = PRODUCTS.find(p => p.id === leatherSelect.value);
    if (b && l) {
      const initials = document.getElementById("inputInitials").value || "E.M.";
      const bundleItem = {
        id: `bundle-${Date.now()}`,
        title: `Gift Set: ${b.title} + ${l.title}`,
        price: (b.price + l.price) * 0.8,
        image: b.image,
        details: `Includes custom monogram '${initials}' on leather kit.`,
        qty: 1
      };
      cart.push(bundleItem);
      updateCartUI();
      openCartDrawer();
    }
  });
}

/* AI Concierge Chat Modal */
function initConciergeModal() {
  const modal = document.getElementById("chatModal");
  const openBtn = document.getElementById("openChatBtn");
  const closeBtn = document.getElementById("closeChatBtn");
  const sendBtn = document.getElementById("sendChatBtn");
  const input = document.getElementById("chatInput");
  const messagesContainer = document.getElementById("chatMessages");
  const closeSampleBtn = document.getElementById("closeSampleBtn");

  openBtn.addEventListener("click", () => modal.classList.add("active"));
  closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  closeSampleBtn.addEventListener("click", () => closeSampleModal());

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // Append User Message
    const userMsg = document.createElement("div");
    userMsg.className = "chat-message user";
    userMsg.innerText = text;
    messagesContainer.appendChild(userMsg);
    input.value = "";
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // AI Concierge Thinking & Response
    setTimeout(() => {
      const botMsg = document.createElement("div");
      botMsg.className = "chat-message bot";
      botMsg.innerHTML = getAIResponse(text);
      messagesContainer.appendChild(botMsg);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 600);
  }

  function getAIResponse(query) {
    const q = query.toLowerCase();

    if (q.includes("game") || q.includes("paint") || q.includes("color") || q.includes("toddler")) {
      return `🎨 Check out our new **Toddler Zone (Ages 0–5)**! Your child can paint storybook character outlines on our **Digital Painting Canvas** or play the **Scripture Seed Memory Matching Game** right on the site!`;
    } else if (q.includes("bedtime") || q.includes("sleep") || q.includes("night")) {
      return `For bedtime reading for children under 5, I highly recommend <strong>Nightlight Blessings Bedtime Book</strong> ($18.00). It features soft watercolor artwork and peaceful Psalm 4:8 bedtime prayers! 🌙 Pair it with a custom leather bookmark kit for the ideal gift bundle.`;
    } else if (q.includes("gift") || q.includes("bundle") || q.includes("under 40") || q.includes("$40")) {
      return `🎁 Our most popular gift bundle is <strong>The Tiny Seed's Big Journey</strong> ($16.00) paired with the <strong>Leather Bookmark DIY Kit</strong> ($24.00). Together with our 20% bundle discount, the total is just <strong>$32.00</strong>!`;
    } else if (q.includes("leather") || q.includes("craft") || q.includes("beginner")) {
      return `🧵 For little hands, try our <strong>Toddler Finger Leather Stamp Kit</strong> ($22.00) with non-toxic washables! For adults & older kids, our <strong>Handcrafted Leather Bookmark DIY Kit</strong> ($24.00) is beginner friendly.`;
    } else {
      return `Thank you for asking! Under **scriptureseedsZerah**, we craft wholesome storybooks for ages 0–5, toddler DIY craft kits, digital painting games, and personalized leathercraft kits.`;
    }
  }
}

/* Cart & Checkout Logic */
function initCartDrawer() {
  const cartBtn = document.getElementById("cartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const drawer = document.getElementById("cartDrawer");
  const checkoutBtn = document.getElementById("checkoutBtn");

  cartBtn.addEventListener("click", () => openCartDrawer());
  closeCartBtn.addEventListener("click", () => drawer.classList.remove("active"));

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your basket is empty! Add items from our catalog or gift bundle builder.");
      return;
    }
    alert("🎉 Order Submitted! Thank you for choosing scriptureseedsZerah. Your customized storybooks, games & leather craft kits are being prepared with love.");
    cart = [];
    updateCartUI();
    drawer.classList.remove("active");
  });
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      details: product.ageLabel || product.levelLabel,
      qty: 1
    });
  }
  updateCartUI();
  openCartDrawer();
}

function openCartDrawer() {
  document.getElementById("cartDrawer").classList.add("active");
}

function updateCartUI() {
  const countBadge = document.getElementById("cartCount");
  const list = document.getElementById("cartItemsList");
  const totalDisplay = document.getElementById("cartTotal");

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  countBadge.innerText = totalQty;

  if (cart.length === 0) {
    list.innerHTML = `<div style="text-align: center; color: var(--text-muted); margin-top: 40px;">Your basket is currently empty.</div>`;
    totalDisplay.innerText = "$0.00";
    return;
  }

  list.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    totalPrice += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" style="width: 54px; height: 54px; border-radius: 8px; object-fit: cover;">
      <div style="flex-grow: 1;">
        <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-dark);">${item.title}</div>
        <div style="font-size: 0.78rem; color: var(--text-muted);">${item.details}</div>
        <div style="font-weight: 700; color: var(--cognac-dark); font-size: 0.88rem; margin-top: 2px;">
          ${item.qty} x $${item.price.toFixed(2)}
        </div>
      </div>
      <button onclick="removeFromCart(${index})" style="background: transparent; border: none; color: #b91c1c; cursor: pointer;">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
    list.appendChild(div);
  });

  totalDisplay.innerText = `$${totalPrice.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}
