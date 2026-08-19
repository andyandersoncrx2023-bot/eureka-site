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

  /* ========== 图片占位：加载成功→可放大；失败→占位框 ==========
     只用图片自身事件驱动，不用探测 Image，避免竞态导致已加载图片被替换 */
  function setupImage(img, placeholderNode) {
    var shown = false;
    var showPlaceholder = function () {
      if (shown) return;
      shown = true;
      img.replaceWith(placeholderNode);
    };
    img.addEventListener('load', function () { bindZoom(img); });
    img.addEventListener('error', showPlaceholder);
    // 脚本运行时图片可能已完成加载/失败（缓存等），补一次检查
    if (img.complete) {
      if (img.naturalWidth > 0) bindZoom(img);
      else showPlaceholder();
    }
  }

  function makePlaceholder(icon, text, codeName) {
    var box = document.createElement('div');
    box.className = 'shot-placeholder';
    box.innerHTML =
      '<div class="ph-icon">' + icon + '</div>' +
      text +
      (codeName ? '<div><small>把图片保存为 <code>' + codeName + '</code> 即可显示</small></div>' : '');
    return box;
  }

  // 为什么选择：界面截图位（img/shots/why-N.png）
  document.querySelectorAll('.why-shot img').forEach(function (img) {
    setupImage(
      img,
      makePlaceholder(
        '🖼️',
        '界面截图占位',
        'img/shots/' + (img.getAttribute('data-name') || 'why-N.png')
      )
    );
  });

  // 赞助：微信 / 支付宝赞赏码（img/sponsor-*.png），未上传时显示占位；点击可放大
  document.querySelectorAll('.qr-img').forEach(function (img) {
    var ph = document.createElement('div');
    ph.className = 'shot-placeholder';
    ph.style.cssText =
      'width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;' +
      'gap:6px;color:var(--text-soft);font-size:13px;text-align:center;padding:12px;';
    ph.innerHTML =
      '<div>📱 ' + (img.getAttribute('data-placeholder') || '赞赏码') + '</div>' +
      '<div><small>待开发者上传二维码</small></div>';
    setupImage(img, ph);
  });

  // 下载按钮统计提示（纯前端，无后端）
  document.querySelectorAll('a[download]').forEach(function (a) {
    a.addEventListener('click', function () {
      console.log('[Eureka] 开始下载：' + a.getAttribute('download'));
    });
  });
})();
