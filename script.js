// 读取 URL 中 ?plan=single / triple / full
function getPlanFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const plan = params.get("plan");
  return plan || "single";
}

// 三个套餐的配置：名称、价格文本、PayPal 链接
const DESTINY_PRODUCTS = {
  single: {
    name: "Single written destiny reading",
    priceText: "$39.95 USD",
    paypalUrl: "https://paypal.me/suanmingfuwu/39.95"
  },
  triple: {
    name: "Three-question destiny reading",
    priceText: "$89.95 USD",
    paypalUrl: "https://paypal.me/suanmingfuwu/89.95"
  },
  full: {
    name: "Full destiny overview reading",
    priceText: "$129.95 USD",
    paypalUrl: "https://paypal.me/suanmingfuwu/129.95"
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const plan = getPlanFromUrl();
  const product = DESTINY_PRODUCTS[plan] || DESTINY_PRODUCTS.single;

  /* ---------- destiny.html：底部价格 + 按钮 ---------- */
  const destinyLabel = document.getElementById("destiny-price-label");
  const destinyAmount = document.getElementById("destiny-price-amount");
  const destinyPayBtn = document.getElementById("destiny-pay-btn");

  if (destinyLabel && destinyAmount && destinyPayBtn) {
    destinyLabel.textContent = product.name;
    destinyAmount.textContent = product.priceText;
    // 跳到 checkout.html 并把 plan 带过去
    destinyPayBtn.href = "checkout.html?plan=" + encodeURIComponent(plan);
  }

  /* ---------- checkout.html：订单摘要 + 付款按钮 ---------- */
  const coName = document.getElementById("checkout-product-name");
  const coPrice = document.getElementById("checkout-product-price");
  const coTotal = document.getElementById("checkout-total-price");
  const coPayBtn = document.getElementById("checkout-pay-button");

  if (coName && coPrice && coTotal && coPayBtn) {
    coName.textContent = product.name;
    coPrice.textContent = product.priceText;
    coTotal.textContent = product.priceText;

    // 点击按钮 -> 跳转到对应 PayPal 链接
    coPayBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = product.paypalUrl;
    });

    // 信用卡 / PayPal 面板切换（纯视觉）
    const radioCard = document.querySelector('input[name="paymethod"][value="card"]');
    const radioPayPal = document.querySelector('input[name="paymethod"][value="paypal"]');
    const panelCard = document.getElementById("pay-panel-card");
    const panelPayPal = document.getElementById("pay-panel-paypal");

    function updatePayPanels() {
      if (!panelCard || !panelPayPal) return;
      const useCard = radioCard && radioCard.checked;
      panelCard.classList.toggle("active", !!useCard);
      panelPayPal.classList.toggle("active", !useCard);
    }

    if (radioCard && radioPayPal) {
      radioCard.addEventListener("change", updatePayPanels);
      radioPayPal.addEventListener("change", updatePayPanels);
      updatePayPanels();
    }
  }
});
// Scroll reveal for home sections
document.addEventListener('DOMContentLoaded', function () {
  var blocks = document.querySelectorAll('.reveal-block');
  if (!blocks.length) return;

  // If IntersectionObserver is not supported, just show all blocks
  if (!('IntersectionObserver' in window)) {
    blocks.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  blocks.forEach(function (el) {
    observer.observe(el);
  });
});
