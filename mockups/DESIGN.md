# DDCR UI Design Guide
## デジタル庁デザインシステム準拠

DDCRのUIは[デジタル庁デザインシステムβ版](https://design.digital.go.jp/)に準拠して設計する。

### デザインシステムのリソース

| リソース | URL |
|---|---|
| 公式サイト | https://design.digital.go.jp/ |
| カラーパレット | https://design.digital.go.jp/dads/foundations/color/color-palette/ |
| タイポグラフィ | https://design.digital.go.jp/dads/foundations/typography/ |
| コンポーネント一覧 | https://design.digital.go.jp/dads/components/ |
| HTML版コードスニペット | https://github.com/digital-go-jp/design-system-example-components-html |
| HTML版 Storybook | https://design.digital.go.jp/dads/html/ |
| React版コードスニペット | https://github.com/digital-go-jp/design-system-example-components-react |
| Tailwind CSS プラグイン | https://github.com/digital-go-jp/tailwind-theme-plugin |
| Figma デザインデータ | https://www.figma.com/community/file/1377880368787735577 |

### カラートークン

CSS Custom Properties として `global.css` で定義。主要な色:

**プリミティブカラー（Primitive）:**
```css
/* Blue — プライマリ・リンク */
--color-primitive-blue-50: #e8f1fe;
--color-primitive-blue-200: #c5d7fb;
--color-primitive-blue-700: #264af4;
--color-primitive-blue-900: #0017c1;   /* ボタン等 */
--color-primitive-blue-1000: #00118f;  /* ホバー */

/* Green — 正常・充足 */
--color-primitive-green-50: #e6f5ec;
--color-primitive-green-700: #1d8b56;
--color-primitive-green-900: #115a36;

/* Yellow — 警告・注意 */
--color-primitive-yellow-50: #fbf5e0;
--color-primitive-yellow-300: #ffd43d;  /* フォーカスリング */
--color-primitive-yellow-700: #b78f00;

/* Red — 危機・エラー */
--color-primitive-red-50: #fdeeee;
--color-primitive-red-700: #fa0000;
--color-primitive-red-900: #bb0000;

/* Purple — データ矛盾（DDCR固有） */
--color-primitive-purple-50: #f3edf7;
--color-primitive-purple-700: #7b3baf;
--color-primitive-purple-900: #5b2587;
```

**ニュートラルカラー（墨 Sumi）:**
```css
--color-sumi-900: #1a1a1c;   /* 本文テキスト */
--color-sumi-500: #6e6e78;   /* 補足テキスト */
--color-sumi-300: #c0c1c5;   /* ボーダー・プレースホルダー */
--color-sumi-200: #d5d5d9;   /* 区切り線 */
--color-sumi-100: #e8e8eb;   /* 薄いボーダー */
--color-sumi-50: #f5f5f5;    /* カード背景・セクション背景 */
```

**セマンティックカラー:**
```css
--color-sea-600: #0031d8;    /* リンク・アクセント */
```

### タイポグラフィ

| 要素 | フォント | ウェイト | サイズ |
|---|---|---|---|
| 本文 | Noto Sans JP | 400 (Normal) | 14-16px |
| 見出し | Noto Sans JP | 700 (Bold) | 16-18px |
| 小見出し | Noto Sans JP | 700 (Bold) | 12-13px |
| 補足・タイムスタンプ | Noto Sans JP | 400 (Normal) | 11-12px |
| 行間（本文） | — | — | 1.7 (170%) |
| 行間（UI要素） | — | — | 1.0-1.3 |

### DDCRでの色の使い方

| 状態 | 色 | 用途 |
|---|---|---|
| 正常・充足 | Green-700 `#1d8b56` | 避難所ステータス正常、物資充足 |
| 警告・不足 | Yellow-700 `#b78f00` | 物資不足、収容率80%超 |
| 危機・超過 | Red-700/900 `#fa0000`/`#bb0000` | 収容超過、物資枯渇、通信途絶 |
| データ矛盾 | Purple-700 `#7b3baf` | 複数ソースの矛盾を示す（DDCR固有） |
| 情報・リンク | Sea-600 `#0031d8` | リンク、情報系アラート |

**注意: 紫色（Purple）はデジタル庁デザインシステムの標準的なセマンティックカラーではなく、DDCRが「データ矛盾」という独自の状態を表現するために使用している。**

### コンポーネントパターン

**ボタン（DADS `.dads-button` 準拠）:**
- `data-type="solid-fill"`: プライマリアクション
- `data-type="outline"`: セカンダリアクション
- フォーカス時: Yellow-300 (`#ffd43d`) のリング
- フォントサイズ: 13-16px, Bold

**テーブル（DADS `.dads-table` 準拠）:**
- ボーダー: `solid-gray-420`
- パディング: 12-20px
- ヘッダー: Bold

**通知バナー（DADS `.dads-notification-banner` 準拠）:**
- 左ボーダー 4px で色分け（critical=赤, conflict=紫, info=青）
- 背景: sumi-50

**入力フィールド（DADS `.dads-input-text` 準拠）:**
- ボーダー: sumi-300
- フォーカス: Yellow-300 リング（`box-shadow: 0 0 0 2px`)
- プレースホルダー: sumi-300

### アクセシビリティ

デジタル庁デザインシステムのコントラスト比要件に準拠:
- 本文テキスト: sumi-900 on white = 18.5:1（WCAG AAA）
- 補足テキスト: sumi-500 on white = 5.3:1（WCAG AA）
- ステータスカラー: 各 Primitive-700/900 は白背景に対してWCAG AA以上
