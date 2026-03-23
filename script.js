// 只做：图片弹窗（打开/关闭/左右切换），保持精简
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = document.querySelector('.close-modal');

  let imgs = [];      // 当前可切换的图片列表
  let idx = 0;        // 当前索引

  function show(i) {
    if (!imgs.length) return;
    idx = (i + imgs.length) % imgs.length;
    const el = imgs[idx];
    modalImg.src = el.src;
    modalCaption.textContent = el.alt || '图片预览';
    modal.style.display = 'block';
  }

  function close() {
    if (!modal) return;
    modal.style.display = 'none';
  }

  // 给 star.html 调用：openImageModal(src, alt, imgElementsArray)
  window.openImageModal = function (src, alt, imgElementsArray) {
    imgs = (imgElementsArray || []).map(x => ({ src: x.src, alt: x.alt }));
    const found = imgs.findIndex(x => x.src === src);
    show(found >= 0 ? found : 0);
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      close();
    });
  }

  if (modal) {
    // 点遮罩关闭
    modal.addEventListener('click', function (e) {
      if (e.target === modal) close();
    });

    // 左右热区
    const prev = modal.querySelector('.modal-nav.prev');
    const next = modal.querySelector('.modal-nav.next');
    if (prev) prev.addEventListener('click', e => { e.stopPropagation(); show(idx - 1); });
    if (next) next.addEventListener('click', e => { e.stopPropagation(); show(idx + 1); });

    // 键盘：ESC / ← / →
    document.addEventListener('keydown', function (e) {
      if (modal.style.display !== 'block') return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }
});
