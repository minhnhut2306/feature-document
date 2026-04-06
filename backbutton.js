(function(){
  const s = document.createElement('style');
  s.textContent = `
    #__back-btn {
      position: fixed;
      top: 14px;
      left: 16px;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px 6px 10px;
      background: rgba(17, 22, 34, 0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(77, 159, 255, 0.25);
      border-radius: 20px;
      color: #4d9fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: background .15s, border-color .15s, transform .15s;
      box-shadow: 0 2px 12px rgba(0,0,0,.3);
      user-select: none;
    }
    #__back-btn:hover {
      background: rgba(77, 159, 255, 0.12);
      border-color: rgba(77, 159, 255, 0.5);
      transform: translateX(-2px);
    }
    #__back-btn .arr {
      font-size: 14px;
      line-height: 1;
      transition: transform .15s;
      display: inline-block;
    }
    #__back-btn:hover .arr {
      transform: translateX(-2px);
    }
  `;
  document.head.appendChild(s);

  const btn = document.createElement('div');
  btn.id = '__back-btn';
  btn.innerHTML = '<span class="arr">←</span> Quay lại';
  btn.onclick = function() {
    if (document.referrer && document.referrer !== window.location.href) {
      history.back();
    } else {
      // fallback: tìm index.html từ root
      const depth = location.pathname.split('/').length - 2;
      const root = depth > 0 ? '../'.repeat(depth) : './';
      window.location.href = root + 'index.html';
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    document.body.appendChild(btn);
  });

  // nếu DOMContentLoaded đã qua rồi
  if (document.readyState !== 'loading') {
    document.body.appendChild(btn);
  }
})();