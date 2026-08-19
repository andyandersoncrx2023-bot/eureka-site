/* Eureka 官网交互：图片灯箱、界面截图占位、赞助二维码占位 */
(function () {
  'use strict';

  /* ========== 图片灯箱（点击放大） ========== */
  var lightbox = null;
  function openLightbox(src, alt) {
    closeLightbox();
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    var img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    var closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.type = 'button';
    closeBtn.textContent = '✕';
    closeBtn.title = '关闭';
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(img);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.body.appendChild(lightbox);
    document.addEventListener('keydown', onLightboxKey);
  }
  function closeLightbox() {
    if (lightbox) {
      lightbox.remove();
      lightbox = null;
    }
    document.removeEventListener('keydown', onLightboxKey);
  }
  function onLightboxKey(e) {
    if (e.key === 'Escape') closeLightbox();
  }
  function bindZoom(img) {
    if (!img || img.dataset.zoom) return;
    img.dataset.zoom = '1';
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      openLightbox(img.src, img.alt);
    });
  }
  // 暴露给外部（便于测试/扩展）
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;

  /* ========== 图片缺失时显示占位框 ========== */
  function placeholderFor(img, icon, text, codeName) {
    var shown = false;
    var show = function () {
      if (shown) return;
      shown = true;
      var box = document.createElement('div');
      box.className = 'shot-placeholder';
      box.innerHTML =
        '<div class="ph-icon">' + icon + '</div>' +
        text +
        (codeName ? '<div><small>把图片保存为 <code>' + codeName + '</code> 即可显示</small></div>' : '');
      img.replaceWith(box);
    };
    img.addEventListener('error', show);
    img.addEventListener('load', function () { bindZoom(img); });
    var src = img.getAttribute('src');
    if (src) {
      var probe = new Image();
      probe.onload = function () {
        if (!img.complete || img.naturalWidth === 0) show();
        else bindZoom(img);
      };
      probe.onerror = show;
      probe.src = src;
    }
  }

  // 为什么选择：界面截图位（img/shots/why-N.png）
  document.querySelectorAll('.why-shot img').forEach(function (img) {
    placeholderFor(
      img,
      '🖼️',
      '界面截图占位',
      'img/shots/' + (img.getAttribute('data-name') || 'why-N.png')
    );
  });

  // 赞助：微信 / 支付宝赞赏码（img/sponsor-*.png），未上传时显示占位；点击可放大
  document.querySelectorAll('.qr-img').forEach(function (img) {
    var ph = document.createElement('div');
    ph.className = 'qr-placeholder';
    ph.style.cssText =
      'width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;' +
      'gap:6px;color:var(--text-soft);font-size:13px;text-align:center;padding:12px;';
    ph.innerHTML =
      '<div>📱 ' + (img.getAttribute('data-placeholder') || '赞赏码') + '</div>' +
      '<div><small>待开发者上传二维码</small></div>';
    var shown = false;
    img.addEventListener('error', function () {
      if (shown) return;
      shown = true;
      img.replaceWith(ph);
    });
    img.addEventListener('load', function () { bindZoom(img); });
    var src = img.getAttribute('src');
    if (src) {
      var probe = new Image();
      probe.onerror = function () {
        if (!img.complete || img.naturalWidth === 0) {
          img.dispatchEvent(new Event('error'));
        }
      };
      probe.onload = function () {
        if (img.complete && img.naturalWidth > 0) bindZoom(img);
      };
      probe.src = src;
    }
  });

  // 下载按钮统计提示（纯前端，无后端）
  document.querySelectorAll('a[download]').forEach(function (a) {
    a.addEventListener('click', function () {
      console.log('[Eureka] 开始下载：' + a.getAttribute('download'));
    });
  });
})();
