/**
 * DDCR mockup i18n module
 * Vanilla JS — no external libraries.
 * Default lang: ja. Supports ?lang=en|ja URL param + localStorage persistence.
 */
(function () {
  'use strict';

  /* ── Styles ────────────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    .lang-switcher {
      display: flex;
      gap: 4px;
      align-items: center;
    }
    .lang-switcher button {
      padding: 3px 10px;
      border-radius: 3px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      border: 1px solid var(--color-sumi-300, #c0c1c5);
      background: var(--color-neutral-white, #fff);
      color: var(--color-sumi-500, #6e6e78);
      font-family: var(--font-family-sans, sans-serif);
      transition: background 0.1s, color 0.1s;
    }
    .lang-switcher button[aria-pressed="true"] {
      background: var(--color-sea-600, #0031d8);
      color: #fff;
      border-color: var(--color-sea-600, #0031d8);
    }
    .lang-switcher button:hover:not([aria-pressed="true"]) {
      background: var(--color-sumi-50, #f5f5f5);
    }
  `;
  document.head.appendChild(style);

  /* ── Translation table ─────────────────────────────────────────── */
  const T = {
    ja: {
      // ── common ────────────────────────────────────────────────────
      'vs': 'VS',
      'badge.normalized': '正規化済',
      'badge.pending': 'レビュー待ち',
      'badge.conflict': '競合',
      'badge.unverified': '未検証',
      'badge.ai': 'AI処理済',

      // ── index ────────────────────────────────────────────────────
      'index.title': 'DDCR — 災害データコモンズ',
      'index.heading': 'DDCR — 災害データコモンズ',
      'index.subtitle': '災害情報統合のためのオープンソース AI 基盤',
      'index.card1.title': '災害状況統合ダッシュボード',
      'index.card1.desc': '複数ソースからのデータを統合した状況認識ダッシュボード。',
      'index.card2.title': '情報整合性確認ビュー',
      'index.card2.desc': '異なるベンダーシステム間の競合データを可視化・解消する。',
      'index.card3.title': '複数ソースデータ取込',
      'index.card3.desc': '異種データソースからのリアルタイム取込・正規化。',
      'index.open-link': 'モックアップを開く →',

      // ── cop-dashboard ─────────────────────────────────────────────
      'cop.title': 'DDCR — Common Operating Picture（モックアップ）',
      'cop.heading': 'Common Operating Picture',
      'cop.badge.drill': 'ドリルモード',
      'cop.live': 'ライブ',
      'cop.header.updated': '更新: 2026-01-01 06:45 JST',
      'cop.header.sources': 'ソース: 12 接続中',

      'cop.stat.evacuees': '避難者数（推計）',
      'cop.stat.shelters': '避難所 開設数',
      'cop.stat.supply': '物資不足',
      'cop.stat.conflicts': 'データ競合',
      'cop.stat.coverage': 'カバレッジ',
      'cop.stat.vulnerable': '要支援者',

      'cop.layer.label': 'レイヤー:',
      'cop.layer.shelters': '避難所',
      'cop.layer.flood': '浸水域',
      'cop.layer.roads': '通行不能道路',
      'cop.layer.supply': '物資拠点',

      'cop.query.heading': '自然言語クエリ',
      'cop.query.placeholder': '例: どの避難所で水が最も緊急に必要ですか？',
      'cop.query.btn': 'クエリ',
      'cop.cop.heading': 'COP サマリー',
      'cop.tag.known': '既知',
      'cop.tag.unknown': '未確認',
      'cop.tag.conflicting': '競合',
      'cop.summary.p1': ' 247か所中219か所の避難所からデータ受信（89%）。推計34,127名が避難中。',
      'cop.summary.p2': ' 28か所未報告。山北・箱根エリア — 通信途絶。',
      'cop.summary.p3': ' データ競合8件検出。最重要: 藤沢D市民センター。',
      'cop.ai.note': 'このサマリーはAI生成の参考情報です。意思決定前に信頼スコアと情報源を必ず確認してください。',
      'cop.alerts.heading': '要対応',

      'cop.alert1.title': '定員超過: 相模原C体育館',
      'cop.alert1.detail': '350名定員に412名収容中。転送が必要。',
      'cop.alert1.time': '06:45 — 出典: 相模原Excel → AI正規化',
      'cop.alert2.title': 'データ競合: 藤沢D市民センター',
      'cop.alert2.detail': '陸自(203) vs 市システム(147)。差: 56。',
      'cop.alert2.time': '06:35 — ',
      'cop.alert2.link': '競合詳細を見る',
      'cop.alert3.title': '物資枯渇: 小田原G避難所',
      'cop.alert3.detail': '水・食料・毛布すべて枯渇。NPO報告（信頼度: 低）',
      'cop.alert3.time': '06:30',
      'cop.alert4.title': '通信途絶: 山北エリア',
      'cop.alert4.detail': '3避難所が2時間以上未報告。衛星回線を推奨。',
      'cop.alert4.time': '06:00',

      'cop.coverage.heading': 'データカバレッジ — 何がわかっていないか',
      'cop.coverage.count': '28 / 33 自治体',
      'cop.coverage.reported.label': '報告済 (25)',
      'cop.cov.yokohama': '横浜市',
      'cop.cov.kawasaki': '川崎市',
      'cop.cov.sagamihara': '相模原市',
      'cop.cov.fujisawa': '藤沢市',
      'cop.cov.odawara': '小田原市',
      'cop.cov.more': '…他 20 自治体',
      'cop.coverage.partial.label': '一部報告 (3)',
      'cop.cov.ashigara': '足柄上郡',
      'cop.cov.ashigara.status': '一部のみ 06:20',
      'cop.cov.aiko': '愛甲郡',
      'cop.cov.aiko.status': '1/2 自治体 05:45',
      'cop.cov.miura': '三浦郡',
      'cop.cov.miura.status': '遅延 04:00',
      'cop.coverage.missing.label': '未報告 (5) — 要確認',
      'cop.cov.yamakita': '山北町',
      'cop.cov.hakone': '箱根町',
      'cop.cov.manazuru': '真鶴町',
      'cop.cov.yugawara': '湯河原町',
      'cop.cov.kiyokawa': '清川村',
      'cop.cov.badge.severed': '通信途絶',
      'cop.cov.badge.missing': '未報告',
      'cop.coverage.ai.note': '未報告自治体への確認手段: 衛星電話 / D-CERT 派遣 / ヘリ視察',

      'cop.footer.left': 'DDCR v0.1 | 神奈川県防災訓練 | 12 データソース接続中',
      'cop.footer.right': 'すべてのデータポイントはW3C PROV-O準拠の来歴メタデータを保持',

      // ── conflict-view ─────────────────────────────────────────────
      'cv.title': 'DDCR — 競合解消ビュー（モックアップ）',
      'cv.heading': 'Conflict Resolution',
      'cv.back': '← COP ダッシュボードへ',

      'cv.c1.title': '避難者数競合 — 藤沢D市民センター',
      'cv.c1.entity': 'ID: shelter:kanagawa-fujisawa-004',
      'cv.c1.badge': '要対応',
      'cv.src.a1.label': '情報源 A — 陸上自衛隊 第3連隊',
      'cv.src.a1.method.key': '手段:',
      'cv.src.a1.method.val': '現地観察（目視カウント）',
      'cv.src.a1.reported.key': '報告:',
      'cv.src.a1.reported.val': '2026-01-01 06:30 JST',
      'cv.src.a1.confidence.key': '信頼度:',
      'cv.src.a1.confidence.val': '高',
      'cv.src.b1.label': '情報源 B — 藤沢市災害システム',
      'cv.src.b1.method.val': 'システム入力（登録ベース）',
      'cv.src.b1.reported.val': '2026-01-01 05:00 JST',
      'cv.src.b1.confidence.val': '中',

      'cv.analysis1.heading': 'AI分析（参考）',
      'cv.analysis1.p1': '56名の差の推定原因: 情報源Aは06:30現地目視カウント、情報源Bは05:00登録ベースカウント。90分の時間差により早朝に新たな避難者が到着した可能性があります。また情報源Bは登録済み避難者のみカウント — 未登録の到着者（自主避難、深夜到着）が差を生んでいる可能性があります。',
      'cv.analysis1.p2': '推奨: より最近の現地観察である情報源A（203名）を暫定値として採用し、藤沢市に登録数の更新を要請。',
      'cv.ai.note1': 'この分析はAI生成の参考情報です。最終判断は権限を持つ担当者が行ってください。',

      'cv.decision1.heading': '判断記録',
      'cv.decision1.placeholder': '判断根拠を記録してください。例:「より最近の現地カウントとして陸自の203名（暫定）を採用。藤沢市に登録データの再確認を要請。」',
      'cv.decision1.note': 'この記録は変更不可です。誰がいつ、どの証拠に基づいて何を決定したかの監査証跡を作成します。',

      'cv.btn1.adopt.a': '情報源 A を採用 (203)',
      'cv.btn1.adopt.b': '情報源 B を採用 (147)',
      'cv.btn1.escalate': 'エスカレーション',
      'cv.btn1.hold': '保留（両方表示）',

      'cv.timeline1.heading': '競合検出タイムライン',
      'cv.tl1.e1': '藤沢市システムが147名を報告（登録ベース）',
      'cv.tl1.e2': '陸自第3連隊が203名を報告（現地目視カウント）',
      'cv.tl1.e3': 'DDCR競合検出器が競合を自動検出。差: 56名（38%）',
      'cv.tl1.e4': 'DDCR AI分析が推定原因と推奨を生成',
      'cv.tl1.e5': '判断待ち',

      'cv.c2.title': '避難者数競合 — 川崎H小学校',
      'cv.c2.entity': 'ID: shelter:kanagawa-kawasaki-008',
      'cv.c2.badge': '要確認',
      'cv.src.a2.label': '情報源 A — DMATチーム',
      'cv.src.a2.method.val': '巡回訪問',
      'cv.src.a2.reported.val': '06:00 JST',
      'cv.src.a2.confidence.val': '中',
      'cv.src.b2.label': '情報源 B — 川崎市集計システム',
      'cv.src.b2.method.val': '深夜集計（紙 → Excel）',
      'cv.src.b2.reported.val': '04:30 JST',
      'cv.src.b2.confidence.val': '低',

      'cv.analysis2.heading': 'AI分析（参考）',
      'cv.analysis2.p1': '差: 37名。情報源BはExcelに転記された深夜の紙集計 — 転記ミスや未反映の退去が考えられます。DMATの巡回は医療チームによる直接観察ですが、全フロアを確認したかは不明。',
      'cv.ai.note2': 'AI生成参考情報。最終判断は権限を持つ担当者が行ってください。',

      'cv.btn2.adopt.a': '情報源 A を採用 (95)',
      'cv.btn2.adopt.b': '情報源 B を採用 (132)',
      'cv.btn2.hold': '保留',

      // ── data-feed ─────────────────────────────────────────────────
      'df.title': 'DDCR — データフィード（モックアップ）',
      'df.heading': 'Data Feed',
      'df.back': '← COP へ戻る',
      'df.meta.sources': '12 ソース取込中',
      'df.meta.updated': '最終更新: 2秒前',

      'df.stats.total': '総報告数（1時間）',
      'df.stats.normalized': '正規化済',
      'df.stats.pending': 'レビュー待ち',
      'df.stats.conflicts': '競合',
      'df.stats.unverified': '未検証',

      'df.filter.source': '情報源タイプ',
      'df.filter.govt': ' 行政システム',
      'df.filter.staff': ' スタッフ報告',
      'df.filter.npo': ' NPO / パートナー組織',
      'df.filter.sns': ' SNS / 公開情報',
      'df.filter.ai': ' AI正規化',

      'df.filter.status': 'ステータス',
      'df.filter.status.normalized': ' 正規化済',
      'df.filter.status.pending': ' レビュー待ち',
      'df.filter.status.conflict': ' 競合検出',
      'df.filter.status.unverified': ' 未検証',

      'df.filter.confidence': '信頼度',
      'df.filter.conf.high': ' 高',
      'df.filter.conf.medium': ' 中',
      'df.filter.conf.low': ' 低',

      'df.feed.heading': 'ライブデータストリーム',
      'df.feed.count': '342件（直近1時間）',

      'df.item1.title': '横浜A小学校: 避難者147名',
      'df.item1.detail': '定員: 300 | 物資: 充足 | 状態: 開設中',
      'df.item1.prov': '横浜市災害システム → ファイルアダプター（CSV）',
      'df.item1.conf': '信頼度: 高',

      'df.item2.title': '相模原C体育館: 412名（定員超過）',
      'df.item2.detail': '定員: 350 | 水・食料不足 | 転送要請',
      'df.item2.prov': '県職員現地報告 → Excelアップロード',
      'df.item2.conf': '信頼度: 中',

      'df.item3.title': '藤沢D市民センター: 203名 ⚡ 競合',
      'df.item3.detail': '陸自第3連隊 現地観察 — 市システム（147名）と競合',
      'df.item3.detail2': '差: 56名（38%）。AI分析: 時間差 + 未登録到着者の可能性。',
      'df.item3.prov': '陸自現地報告 → 連絡官による手動入力',
      'df.item3.conf': '信頼度: 高',

      'df.item4.title': '藤沢D市民センター: 147名 ⚡ 競合',
      'df.item4.detail': '市災害システムによる登録ベースカウント',
      'df.item4.prov': '藤沢市システム → DBアダプター（読み取り専用）',
      'df.item4.conf': '信頼度: 中',

      'df.item5.title': '小田原G避難所: 物資枯渇アラート',
      'df.item5.detail': '水・食料・毛布すべて枯渇。避難者320名、定員250。',
      'df.item5.prov': 'ピースウィンズ・ジャパン（NPO） → 構造化報告フォーム',
      'df.item5.conf': '信頼度: 低',

      'df.item6.title': 'SNS: 「平塚の避難所で水が完全になくなった」',
      'df.item6.detail': '出典: Xユーザー @resident_hiratsuka — リツイート12件',
      'df.item6.detail2': '⚠ 未検証 — システム内に一致する避難所なし。AIがジオコーディングとマッチング処理中。',
      'df.item6.prov': 'X API → AI抽出 → ジオコードマッチング待ち',
      'df.item6.conf': '信頼度: 低',

      'df.item7.title': '鎌倉F体育館: 178名（FAXをAI正規化）',
      'df.item7.detail': '原本: 手書きFAX → OCR → スキーママッピング。毛布不足を記録。',
      'df.item7.detail2': ' 正規化信頼度: 84%。ルールベース検証: 合格。',
      'df.item7.prov': '鎌倉市FAX → OCRアダプター → 意味正規化パイプライン v0.3',
      'df.item7.conf': '信頼度: 中',

      'df.item8.title': '川崎H小学校: 95名（DMAT巡回）',
      'df.item8.detail': '医療チーム巡回カウント。要緊急対応3名特定。',
      'df.item8.prov': 'DMATチーム7 → タブレットによる構造化報告',
      'df.item8.conf': '信頼度: 中',

      'df.item9.title': 'SNS: 「茅ヶ崎駅付近で高齢者が倒れている」',
      'df.item9.detail': '出典: 写真付きXポスト — 画像メタデータから位置推定',
      'df.item9.detail2': '⚠ 未検証 — 最寄りのDMATチームに転送済み、確認依頼中',
      'df.item9.prov': 'X API → AI抽出 + ジオコード → DMAT派遣へ転送',
      'df.item9.conf': '信頼度: 低',

      'df.item10.title': '厚木E小学校: 56名',
      'df.item10.detail': '避難所スタッフがLINE Botで報告。物資充足。外国語対応ニーズ2名。',
      'df.item10.prov': 'LINE Bot → 構造化メッセージアダプター',
      'df.item10.conf': '信頼度: 中',

      'df.item11.title': '一括更新: 横浜市 — 45避難所',
      'df.item11.detail': 'スケジュールされたCSVエクスポートを取込。45件の避難所レコード更新。新たな競合2件検出。',
      'df.item11.prov': '横浜市災害システム → ファイルアダプター（スケジュール, 30分間隔）',
      'df.item11.conf': '信頼度: 高',
    },

    en: {
      // ── common ────────────────────────────────────────────────────
      'vs': 'VS',
      'badge.normalized': 'Normalized',
      'badge.pending': 'Pending Review',
      'badge.conflict': 'Conflict',
      'badge.unverified': 'Unverified',
      'badge.ai': 'AI Processed',

      // ── index ────────────────────────────────────────────────────
      'index.title': 'DDCR — Disaster Data Commons for Resilience',
      'index.heading': 'DDCR — Disaster Data Commons for Resilience',
      'index.subtitle': 'Open-source AI platform for disaster information integration',
      'index.card1.title': 'Common Operating Picture',
      'index.card1.desc': 'Unified situational awareness dashboard integrating data from multiple sources.',
      'index.card2.title': 'Conflict Resolution View',
      'index.card2.desc': 'Visualize and resolve conflicting data from different vendor systems.',
      'index.card3.title': 'Multi-Source Data Feed',
      'index.card3.desc': 'Real-time ingestion and normalization from heterogeneous data sources.',
      'index.open-link': 'Open mockup →',

      // ── cop-dashboard ─────────────────────────────────────────────
      'cop.title': 'DDCR — Common Operating Picture (Mockup)',
      'cop.heading': 'Common Operating Picture',
      'cop.badge.drill': 'Drill Mode',
      'cop.live': 'LIVE',
      'cop.header.updated': 'Updated: 2026-01-01 06:45 JST',
      'cop.header.sources': 'Sources: 12 connected',

      'cop.stat.evacuees': 'Evacuees (est.)',
      'cop.stat.shelters': 'Shelters Open',
      'cop.stat.supply': 'Supply Shortage',
      'cop.stat.conflicts': 'Data Conflicts',
      'cop.stat.coverage': 'Coverage',
      'cop.stat.vulnerable': 'Vulnerable',

      'cop.layer.label': 'Layer:',
      'cop.layer.shelters': 'Shelters',
      'cop.layer.flood': 'Flood Zone',
      'cop.layer.roads': 'Road Closures',
      'cop.layer.supply': 'Supply Points',

      'cop.query.heading': 'Natural Language Query',
      'cop.query.placeholder': 'e.g. Which shelters need water most urgently?',
      'cop.query.btn': 'Query',
      'cop.cop.heading': 'COP Summary',
      'cop.tag.known': 'Known',
      'cop.tag.unknown': 'Unknown',
      'cop.tag.conflicting': 'Conflicts',
      'cop.summary.p1': ' Data received from 219 of 247 shelters (89%). Estimated 34,127 evacuees.',
      'cop.summary.p2': ' 28 shelters unreported. Yamakita/Hakone area — communication severed.',
      'cop.summary.p3': ' 8 data conflicts detected. Most critical: Fujisawa-D Community Center.',
      'cop.ai.note': 'This summary is AI-generated reference information. Verify confidence scores and sources before making decisions.',
      'cop.alerts.heading': 'Action Required',

      'cop.alert1.title': 'Over capacity: Sagamihara-C Gymnasium',
      'cop.alert1.detail': '412 evacuees in 350-capacity shelter. Transfer needed.',
      'cop.alert1.time': '06:45 — Source: Sagamihara Excel → AI normalized',
      'cop.alert2.title': 'Data Conflict: Fujisawa-D Community Center',
      'cop.alert2.detail': 'JGSDF (203) vs City system (147). Gap: 56.',
      'cop.alert2.time': '06:35 — ',
      'cop.alert2.link': 'View conflict details',
      'cop.alert3.title': 'Supply depleted: Odawara-G Shelter',
      'cop.alert3.detail': 'Water, food, blankets all depleted. NPO report (confidence: low)',
      'cop.alert3.time': '06:30',
      'cop.alert4.title': 'Communication lost: Yamakita area',
      'cop.alert4.detail': '3 shelters unreported for 2+ hours. Satellite link recommended.',
      'cop.alert4.time': '06:00',

      'cop.coverage.heading': 'Data Coverage — What We Don\'t Know',
      'cop.coverage.count': '28 / 33 municipalities',
      'cop.coverage.reported.label': 'Reported (25)',
      'cop.cov.yokohama': 'Yokohama City',
      'cop.cov.kawasaki': 'Kawasaki City',
      'cop.cov.sagamihara': 'Sagamihara City',
      'cop.cov.fujisawa': 'Fujisawa City',
      'cop.cov.odawara': 'Odawara City',
      'cop.cov.more': '…and 20 more municipalities',
      'cop.coverage.partial.label': 'Partial (3)',
      'cop.cov.ashigara': 'Ashigara-Kami',
      'cop.cov.ashigara.status': 'Partial only 06:20',
      'cop.cov.aiko': 'Aiko',
      'cop.cov.aiko.status': '1/2 municipalities 05:45',
      'cop.cov.miura': 'Miura',
      'cop.cov.miura.status': 'Delayed 04:00',
      'cop.coverage.missing.label': 'Unreported (5) — Action Required',
      'cop.cov.yamakita': 'Yamakita Town',
      'cop.cov.hakone': 'Hakone Town',
      'cop.cov.manazuru': 'Manazuru Town',
      'cop.cov.yugawara': 'Yugawara Town',
      'cop.cov.kiyokawa': 'Kiyokawa Village',
      'cop.cov.badge.severed': 'Comm. Severed',
      'cop.cov.badge.missing': 'Unreported',
      'cop.coverage.ai.note': 'Verification methods for unreported municipalities: satellite phone / D-CERT dispatch / helicopter survey',

      'cop.footer.left': 'DDCR v0.1 | Kanagawa Prefecture Disaster Drill | 12 data sources connected',
      'cop.footer.right': 'All data points carry W3C PROV-O compliant provenance metadata',

      // ── conflict-view ─────────────────────────────────────────────
      'cv.title': 'DDCR — Conflict Resolution View (Mockup)',
      'cv.heading': 'Conflict Resolution',
      'cv.back': '← Back to COP Dashboard',

      'cv.c1.title': 'Evacuee Count Conflict — Fujisawa-D Community Center',
      'cv.c1.entity': 'ID: shelter:kanagawa-fujisawa-004',
      'cv.c1.badge': 'Action Required',
      'cv.src.a1.label': 'Source A — JGSDF 3rd Regiment',
      'cv.src.a1.method.key': 'Method:',
      'cv.src.a1.method.val': 'Field observation (visual count)',
      'cv.src.a1.reported.key': 'Reported:',
      'cv.src.a1.reported.val': '2026-01-01 06:30 JST',
      'cv.src.a1.confidence.key': 'Confidence:',
      'cv.src.a1.confidence.val': 'High',
      'cv.src.b1.label': 'Source B — Fujisawa City Disaster System',
      'cv.src.b1.method.val': 'System input (registration-based)',
      'cv.src.b1.reported.val': '2026-01-01 05:00 JST',
      'cv.src.b1.confidence.val': 'Medium',

      'cv.analysis1.heading': 'AI Analysis (Reference)',
      'cv.analysis1.p1': 'Estimated cause of 56-person gap: Source A is a 06:30 on-site visual count; Source B is a 05:00 registration-based count. The 90-minute time gap suggests new evacuees arrived in the early morning. Additionally, Source B only counts registered evacuees — unregistered arrivals (self-evacuated, late-night) likely account for the difference.',
      'cv.analysis1.p2': 'Recommendation: Adopt Source A (more recent field observation) as provisional value; request Fujisawa City to update registration count.',
      'cv.ai.note1': 'This analysis is AI-generated reference information. Final decisions must be made by authorized personnel.',

      'cv.decision1.heading': 'Decision Recorder',
      'cv.decision1.placeholder': "Record your rationale. e.g. 'Adopted 203 (JGSDF field count) as provisional — more recent. Requested Fujisawa City to re-verify registration data.'",
      'cv.decision1.note': 'This record is immutable. It creates an audit trail of who decided what, when, and based on which evidence.',

      'cv.btn1.adopt.a': 'Adopt Source A (203)',
      'cv.btn1.adopt.b': 'Adopt Source B (147)',
      'cv.btn1.escalate': 'Escalate',
      'cv.btn1.hold': 'Hold (show both)',

      'cv.timeline1.heading': 'Conflict Detection Timeline',
      'cv.tl1.e1': 'Fujisawa City System reported 147 (registration-based)',
      'cv.tl1.e2': 'JGSDF 3rd Regiment reported 203 (field visual count)',
      'cv.tl1.e3': 'DDCR Conflict Detector auto-detected conflict. Gap: 56 (38%)',
      'cv.tl1.e4': 'DDCR AI Analysis generated probable cause and recommendation',
      'cv.tl1.e5': 'Awaiting decision',

      'cv.c2.title': 'Evacuee Count Conflict — Kawasaki-H Elementary',
      'cv.c2.entity': 'ID: shelter:kanagawa-kawasaki-008',
      'cv.c2.badge': 'Review Needed',
      'cv.src.a2.label': 'Source A — DMAT Patrol Team',
      'cv.src.a2.method.val': 'Patrol visit',
      'cv.src.a2.reported.val': '06:00 JST',
      'cv.src.a2.confidence.val': 'Medium',
      'cv.src.b2.label': 'Source B — Kawasaki City Tally System',
      'cv.src.b2.method.val': 'Overnight tally (paper → Excel)',
      'cv.src.b2.reported.val': '04:30 JST',
      'cv.src.b2.confidence.val': 'Low',

      'cv.analysis2.heading': 'AI Analysis (Reference)',
      'cv.analysis2.p1': 'Gap: 37. Source B is an overnight paper tally transcribed to Excel — transcription errors or unreflected departures are likely. DMAT patrol is a direct medical team observation, but unclear if all floors were checked.',
      'cv.ai.note2': 'AI-generated reference. Final decisions must be made by authorized personnel.',

      'cv.btn2.adopt.a': 'Adopt Source A (95)',
      'cv.btn2.adopt.b': 'Adopt Source B (132)',
      'cv.btn2.hold': 'Hold',

      // ── data-feed ─────────────────────────────────────────────────
      'df.title': 'DDCR — Data Feed (Mockup)',
      'df.heading': 'Data Feed',
      'df.back': '← Back to COP',
      'df.meta.sources': 'Ingesting from 12 sources',
      'df.meta.updated': 'Last update: 2 sec ago',

      'df.stats.total': 'Total reports (1h)',
      'df.stats.normalized': 'Normalized',
      'df.stats.pending': 'Pending review',
      'df.stats.conflicts': 'Conflicts',
      'df.stats.unverified': 'Unverified',

      'df.filter.source': 'Source Type',
      'df.filter.govt': ' Government System',
      'df.filter.staff': ' Staff Report',
      'df.filter.npo': ' NPO / Partner Org',
      'df.filter.sns': ' SNS / Public Info',
      'df.filter.ai': ' AI Normalized',

      'df.filter.status': 'Status',
      'df.filter.status.normalized': ' Normalized',
      'df.filter.status.pending': ' Pending Review',
      'df.filter.status.conflict': ' Conflict Detected',
      'df.filter.status.unverified': ' Unverified',

      'df.filter.confidence': 'Confidence',
      'df.filter.conf.high': ' High',
      'df.filter.conf.medium': ' Medium',
      'df.filter.conf.low': ' Low',

      'df.feed.heading': 'Live Data Stream',
      'df.feed.count': '342 reports in last hour',

      'df.item1.title': 'Yokohama-A Elementary: 147 evacuees',
      'df.item1.detail': 'Capacity: 300 | Supplies: adequate | Status: open',
      'df.item1.prov': 'Yokohama City Disaster System → File adapter (CSV)',
      'df.item1.conf': 'Confidence: High',

      'df.item2.title': 'Sagamihara-C Gymnasium: 412 evacuees (over capacity)',
      'df.item2.detail': 'Capacity: 350 | Water & food shortage | Request for transfer',
      'df.item2.prov': 'Prefectural staff field report → Excel upload',
      'df.item2.conf': 'Confidence: Medium',

      'df.item3.title': 'Fujisawa-D Community Center: 203 evacuees ⚡ CONFLICT',
      'df.item3.detail': 'JGSDF 3rd Regiment field observation — conflicts with city system (147)',
      'df.item3.detail2': 'Gap: 56 evacuees (38%). AI analysis: time difference + unregistered arrivals likely.',
      'df.item3.prov': 'JGSDF field report → Manual entry by liaison officer',
      'df.item3.conf': 'Confidence: High',

      'df.item4.title': 'Fujisawa-D Community Center: 147 evacuees ⚡ CONFLICT',
      'df.item4.detail': 'Registration-based count from city disaster system',
      'df.item4.prov': 'Fujisawa City System → DB adapter (read-only)',
      'df.item4.conf': 'Confidence: Medium',

      'df.item5.title': 'Odawara-G Shelter: supply depletion alert',
      'df.item5.detail': 'Water, food, blankets all depleted. 320 evacuees, capacity 250.',
      'df.item5.prov': 'Peace Winds Japan (NPO) → Structured report form',
      'df.item5.conf': 'Confidence: Low',

      'df.item6.title': 'SNS: "Water completely gone at Hiratsuka shelter"',
      'df.item6.detail': 'Source: X (Twitter) post by @resident_hiratsuka — 12 retweets',
      'df.item6.detail2': '⚠ Unverified — no matching shelter in system. AI attempting to geocode and match.',
      'df.item6.prov': 'X API → AI extraction → Pending geocode match',
      'df.item6.conf': 'Confidence: Low',

      'df.item7.title': 'Kamakura-F Gymnasium: 178 evacuees (AI normalized from FAX)',
      'df.item7.detail': 'Original: handwritten FAX → OCR → schema mapping. Blanket shortage noted.',
      'df.item7.detail2': ' Normalization confidence: 84%. Rule-based validation: passed.',
      'df.item7.prov': 'Kamakura City FAX → OCR adapter → Semantic normalization pipeline v0.3',
      'df.item7.conf': 'Confidence: Medium',

      'df.item8.title': 'Kawasaki-H Elementary: 95 evacuees (DMAT patrol)',
      'df.item8.detail': 'Medical team patrol count. 3 persons requiring immediate care identified.',
      'df.item8.prov': 'DMAT Team 7 → Structured report via tablet',
      'df.item8.conf': 'Confidence: Medium',

      'df.item9.title': 'SNS: "Elderly person collapsed at Chigasaki station area"',
      'df.item9.detail': 'Source: X post with photo — location estimated from image metadata',
      'df.item9.detail2': '⚠ Unverified — forwarded to nearest DMAT team for confirmation',
      'df.item9.prov': 'X API → AI extraction + geocode → Forwarded to DMAT dispatch',
      'df.item9.conf': 'Confidence: Low',

      'df.item10.title': 'Atsugi-E Elementary: 56 evacuees',
      'df.item10.detail': 'Shelter staff report via LINE Bot. Supplies adequate. 2 non-Japanese speakers need translation support.',
      'df.item10.prov': 'LINE Bot → Structured message adapter',
      'df.item10.conf': 'Confidence: Medium',

      'df.item11.title': 'Bulk update: Yokohama City — 45 shelters',
      'df.item11.detail': 'Scheduled CSV export ingested. 45 shelter records updated. 2 new conflicts detected.',
      'df.item11.prov': 'Yokohama City Disaster System → File adapter (scheduled, 30min interval)',
      'df.item11.conf': 'Confidence: High',
    },
  };

  /* ── Core functions ────────────────────────────────────────────── */

  function applyLang(lang) {
    if (!T[lang]) lang = 'ja';
    const t = T[lang];

    // text content
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    // placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    // page title
    const titleKey = document.documentElement.getAttribute('data-page-title');
    if (titleKey && t[titleKey]) document.title = t[titleKey];

    // <html lang>
    document.documentElement.lang = lang;

    // switcher aria-pressed
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-set-lang') === lang ? 'true' : 'false');
    });

    // persist
    try { localStorage.setItem('ddcr-lang', lang); } catch (e) { /* ignore */ }

    // URL (replaceState, no reload)
    try {
      const url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url.toString());
    } catch (e) { /* ignore */ }
  }

  function initLang() {
    let lang = 'ja';
    try {
      const urlLang = new URLSearchParams(location.search).get('lang');
      const stored = localStorage.getItem('ddcr-lang');
      if (urlLang === 'en' || urlLang === 'ja') lang = urlLang;
      else if (stored === 'en' || stored === 'ja') lang = stored;
    } catch (e) { /* ignore */ }
    applyLang(lang);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(this.getAttribute('data-set-lang'));
      });
    });
    initLang();
  });

  window.ddcrI18n = { applyLang: applyLang, initLang: initLang };
})();
