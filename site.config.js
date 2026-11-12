// 配布ページの設定（ここだけ書き換えれば各ページに反映されます）
window.SITE_CONFIG = {
  // Stripe の支払いリンク（ダッシュボード → 支払いリンク → コピー）
  paymentLink: 'https://buy.stripe.com/__PAYMENT_LINK__',
  // ライセンス発行サーバー（Cloudflare Worker）の URL。末尾のスラッシュなし
  licenseApi: 'https://table-rules-license.__ACCOUNT__.workers.dev',
  // 問い合わせ先メールアドレス
  contactEmail: 'magonote.plugins@gmail.com',
  // プラグインの zip（downloads/ に置く）
  downloadPath: 'downloads/table-rules-plugin.zip',
  // 表示用のバージョン（manifest.json の version と合わせる）
  version: '1',
};

// data-config="paymentLink" のような属性を持つ要素に設定値を流し込む
document.addEventListener('DOMContentLoaded', function () {
  var cfg = window.SITE_CONFIG;
  document.querySelectorAll('[data-config]').forEach(function (el) {
    var key = el.getAttribute('data-config');
    var val = cfg[key];
    if (val === undefined) return;
    if (el.tagName === 'A') {
      el.href = key === 'contactEmail' ? 'mailto:' + val : val;
      if (!el.textContent.trim()) el.textContent = val;
    } else {
      el.textContent = val;
    }
  });
});
