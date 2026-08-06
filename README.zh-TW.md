[English](./README.md) | [繁體中文](./README.zh-TW.md)

# SauceDemo Quality Automation

這是一個使用 Playwright 與 TypeScript 建立的 QA 自動化測試作品，透過 SauceDemo 展示 Web UI 自動化、API 測試、SQL 資料驗證、效能測試與 CI/CD 整合能力。

## 專案目標

本專案用於展示以下測試能力：

- Playwright UI 自動化測試
- API 自動化測試
- SQL 資料驗證
- 壓力與效能測試
- 測試報告產生
- GitHub Actions CI/CD
- 測試結果部署

## 測試範圍

目前已完成：

- 正常帳號登入
- 登入結果驗證
- 商品列表驗證
- 商品數量驗證

後續預計加入：

- 鎖定帳號登入失敗
- 商品排序
- 加入購物車
- 結帳流程
- API 與 UI 資料一致性驗證
- SQL 訂單資料驗證
- k6 壓力測試

## 技術棧

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- SQL
- k6

## 專案結構

```text
.
├── tests/
│   └── login.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
└── .gitignore
```

## 安裝

```bash
npm ci
npx playwright install
```

## 執行測試

執行所有測試：

```bash
npx playwright test
```

執行 Chromium 測試：

```bash
npx playwright test --project=chromium
```

執行指定測試：

```bash
npx playwright test tests/login.spec.ts
```

以有頭模式執行：

```bash
npx playwright test --headed
```

## 開啟測試報告

```bash
npx playwright show-report
```

如果預設連接埠被使用，可以指定其他連接埠：

```bash
npx playwright show-report --port 0
```

## 測試設計

本專案使用測試步驟與明確斷言驗證登入結果：

1. 開啟 SauceDemo 登入頁面。
2. 輸入正常測試帳號。
3. 輸入密碼。
4. 點擊登入。
5. 驗證頁面 URL。
6. 驗證商品頁面標題。
7. 驗證商品列表數量。

## 測試報告

Playwright 會產生 HTML 測試報告，內容包含：

- 測試執行結果
- 測試步驟
- 執行時間
- 失敗截圖
- Trace 與影片（依設定產生）

## CI/CD

GitHub Actions 將自動執行：

1. 安裝 Node.js 與專案依賴。
2. 安裝 Playwright 瀏覽器。
3. 執行自動化測試。
4. 產生 HTML 測試報告。
5. 上傳測試結果。

## 測試帳號

本專案使用 SauceDemo 公開測試帳號：

```text
Username: standard_user
Password: secret_sauce
```

## 注意事項

本專案僅用於測試學習與作品展示，不包含任何公司內部程式碼、測試資料、API、帳號或商業邏輯。
