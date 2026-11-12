# テーブル入力ルール 配布ページ

静的サイト（HTML/CSS のみ）。GitHub Pages で無料公開する前提です。

```
table-rules-site/
├── index.html        トップ（機能・使い方・料金・制限事項・FAQ）
├── license.html      ライセンスキーの表示（決済完了後）と再発行フォーム
├── terms.html        利用規約
├── tokushoho.html    特定商取引法に基づく表記
├── privacy.html      プライバシーポリシー
├── style.css
├── site.config.js    支払いリンクURL・発行サーバーURL・連絡先（ここだけ直せば全ページに反映）
├── downloads/
│   └── table-rules-plugin.zip   プラグイン本体（プラグイン側で npm run release すると置かれる）
└── .nojekyll
```

## 公開前に埋めるところ

1. `site.config.js`
   - `paymentLink`：Stripe の支払いリンク
   - `licenseApi`：ライセンス発行サーバー（Worker）の URL
   - `contactEmail`：問い合わせ用メールアドレス（本名のメールでなくてよいが、確実に受信できるもの）
2. `tokushoho.html`・`terms.html`・`privacy.html` の `【氏名】`・`【屋号】`・`【制定日】`
   - 消費者庁の見解では、個人事業者でも **氏名（本名）の表示は省略できません**。住所と電話番号は「請求があったら遅滞なく開示します」と書けば省略できます（実際に請求があれば開示する必要あり）
3. `downloads/table-rules-plugin.zip`：プラグインのフォルダで `npm.cmd run release` を実行すると `dist/plugin.zip` がここにコピーされます

## GitHub Pages で公開する

```powershell
cd C:\workspace\kintone-plugins\table-rules-site
git init
git add .
git commit -m "配布ページ"
# GitHub で空のリポジトリ table-rules-site（Public）を作ってから
git remote add origin https://github.com/<ユーザー名>/table-rules-site.git
git push -u origin main
```

GitHub のリポジトリ → Settings → Pages → Source を「Deploy from a branch」、Branch を `main` / `(root)` にして保存。
数分後に `https://<ユーザー名>.github.io/table-rules-site/` で公開されます。

公開 URL が決まったら：

- Worker の `wrangler.toml` の `ALLOWED_ORIGIN` を `https://<ユーザー名>.github.io` にして再デプロイ
- Stripe の支払いリンクの「支払い後」のリダイレクト先を `https://<ユーザー名>.github.io/table-rules-site/license.html?session_id={CHECKOUT_SESSION_ID}` に
- Stripe の 設定 → 公開情報 に利用規約・プライバシーポリシーの URL、事業詳細に特商法ページの URL を登録
- プラグインの `manifest.json` の `homepage_url` にトップページの URL を入れて再ビルド

## 更新のしかた

ファイルを直して `git add . && git commit -m "..." && git push` で反映されます。
