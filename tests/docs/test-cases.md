# SauceDemo 登入功能測試案例

[English README](../README.md) | [繁體中文 README](../README.zh-TW.md)

## 1. 文件資訊

| 項目 | 內容 |
|---|---|
| 專案名稱 | SauceDemo Quality Automation |
| 測試模組 | Login 登入功能 |
| 測試類型 | UI 自動化測試、功能測試、負向測試 |
| 自動化工具 | Playwright + TypeScript |
| 測試環境 | Chromium |
| 測試網址 | https://www.saucedemo.com/ |
| 文件版本 | v1.0 |

## 2. 測試目標

驗證 SauceDemo 登入功能在正常與異常情境下的行為，確認使用者能否正確登入、系統是否能阻擋無法使用的帳號，以及錯誤訊息是否符合預期。

本文件中的測試案例會逐步轉換為 Playwright 自動化腳本，並透過 CI/CD 流程自動執行與產生測試報告。

## 3. 測試範圍

### 測試範圍內

- 正常帳號登入。
- 鎖定帳號登入。
- 錯誤帳號或密碼登入。
- 空白欄位驗證。
- 登入結果 URL 驗證。
- 登入錯誤訊息驗證。
- 商品頁標題與商品列表驗證。

### 測試範圍外

- 真實付款流程。
- 第三方支付整合。
- 真實訂單後端資料驗證。
- 壓力測試與大量流量測試。
- 生產環境部署測試。

## 4. 測試帳號

| 帳號類型 | Username | Password | 預期用途 |
|---|---|---|---|
| 正常帳號 | `standard_user` | `secret_sauce` | 驗證正常登入流程 |
| 鎖定帳號 | `locked_out_user` | `secret_sauce` | 驗證帳號鎖定流程 |
| 效能延遲帳號 | `performance_glitch_user` | `secret_sauce` | 驗證延遲情境 |
| 錯誤密碼 | `standard_user` | `wrong_password` | 驗證密碼錯誤流程 |
| 空白帳號 | 空白 | `secret_sauce` | 驗證帳號必填驗證 |

## 5. 測試案例總覽

| 測試案例 ID | 測試情境 | 優先級 | 測試類型 | 自動化狀態 |
|---|---|---|---|---|
| TC-LOGIN-001 | 正常帳號登入成功 | High | Positive | Automated |
| TC-LOGIN-002 | 鎖定帳號登入失敗 | High | Negative | Automated |
| TC-LOGIN-003 | 錯誤密碼登入失敗 | High | Negative | Automated |
| TC-LOGIN-004 | 空白帳號登入失敗 | Medium | Validation | Automated |
| TC-LOGIN-005 | 空白密碼登入失敗 | Medium | Validation | Automated |
| TC-LOGIN-006 | 正常登入後商品頁驗證 | High | Functional | Automated |
| TC-LOGIN-007 | 效能延遲帳號登入流程 | Medium | Performance | Automated |

## 6. 詳細測試案例

### TC-LOGIN-001：正常帳號登入成功

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-LOGIN-001 |
| 優先級 | High |
| 測試類型 | Positive / Smoke |
| 前置條件 | 使用者位於 SauceDemo 登入頁面 |
| 測試資料 | Username: `standard_user`、Password: `secret_sauce` |

#### 測試步驟

1. 開啟 SauceDemo 登入頁面。
2. 在 Username 欄位輸入 `standard_user`。
3. 在 Password 欄位輸入 `secret_sauce`。
4. 點擊 Login 按鈕。

#### 預期結果

- 登入成功。
- 使用者導向 `/inventory.html`。
- 頁面顯示 `Products` 標題。
- 商品列表正常顯示。
- 商品數量為 6 筆。

#### 自動化腳本

```text
tests/login.spec.ts
```

### TC-LOGIN-002：鎖定帳號登入失敗

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-LOGIN-002 |
| 優先級 | High |
| 測試類型 | Negative |
| 前置條件 | 使用者位於 SauceDemo 登入頁面 |
| 測試資料 | Username: `locked_out_user`、Password: `secret_sauce` |

#### 測試步驟

1. 開啟 SauceDemo 登入頁面。
2. 在 Username 欄位輸入 `locked_out_user`。
3. 在 Password 欄位輸入 `secret_sauce`。
4. 點擊 Login 按鈕。

#### 預期結果

- 登入失敗。
- 使用者仍停留在登入頁面。
- 頁面顯示錯誤訊息：`Epic sadface: Sorry, this user has been locked out.`
- 使用者不可進入商品頁面。

### TC-LOGIN-003：錯誤密碼登入失敗

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-LOGIN-003 |
| 優先級 | High |
| 測試類型 | Negative |
| 前置條件 | 使用者位於 SauceDemo 登入頁面 |
| 測試資料 | Username: `standard_user`、Password: `wrong_password` |

#### 測試步驟

1. 開啟 SauceDemo 登入頁面。
2. 輸入正常帳號 `standard_user`。
3. 輸入錯誤密碼 `wrong_password`。
4. 點擊 Login 按鈕。

#### 預期結果

- 登入失敗。
- 使用者不可進入商品頁面。
- 頁面顯示帳號或密碼錯誤訊息。

### TC-LOGIN-004：空白帳號登入失敗

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-LOGIN-004 |
| 優先級 | Medium |
| 測試類型 | Validation |
| 前置條件 | 使用者位於 SauceDemo 登入頁面 |
| 測試資料 | Username: 空白、Password: `secret_sauce` |

#### 測試步驟

1. 開啟 SauceDemo 登入頁面。
2. 不輸入 Username。
3. 在 Password 欄位輸入 `secret_sauce`。
4. 點擊 Login 按鈕。

#### 預期結果

- 登入失敗。
- 顯示 Username 必填相關錯誤訊息。
- 使用者仍停留在登入頁面。

### TC-LOGIN-005：空白密碼登入失敗

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-LOGIN-005 |
| 優先級 | Medium |
| 測試類型 | Validation |
| 前置條件 | 使用者位於 SauceDemo 登入頁面 |
| 測試資料 | Username: `standard_user`、Password: 空白 |

#### 測試步驟

1. 開啟 SauceDemo 登入頁面。
2. 在 Username 欄位輸入 `standard_user`。
3. 不輸入 Password。
4. 點擊 Login 按鈕。

#### 預期結果

- 登入失敗。
- 顯示 Password 必填相關錯誤訊息。
- 使用者仍停留在登入頁面。

### TC-LOGIN-006：正常登入後商品頁驗證

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-LOGIN-006 |
| 優先級 | High |
| 測試類型 | Functional |
| 前置條件 | 使用者具備正常測試帳號 |
| 測試資料 | Username: `standard_user`、Password: `secret_sauce` |

#### 測試步驟

1. 使用正常帳號登入。
2. 等待商品頁面完成載入。
3. 取得頁面標題。
4. 取得商品列表。
5. 驗證頁面 URL、標題與商品數量。

#### 預期結果

- URL 包含 `/inventory.html`。
- 頁面標題為 `Products`。
- 商品列表可見。
- 商品數量為 6 筆。

## 7. 自動化執行方式

執行所有登入測試：

```bash
npx playwright test tests/login.spec.ts --project=chromium
```

以有頭模式執行：

```bash
npx playwright test tests/login.spec.ts --project=chromium --headed
```

使用 Playwright Inspector 除錯：

```bash
npx playwright test tests/login.spec.ts --project=chromium --debug
```

開啟 HTML 測試報告：

```bash
npx playwright show-report --port 0
```

## 8. 測試結果紀錄

| 執行日期 | 瀏覽器 | 通過 | 失敗 | 跳過 | 備註 |
|---|---|---:|---:|---:|---|
| YYYY-MM-DD | Chromium | - | - | - | 待執行 |

## 9. 風險與後續規劃

- 補充商品列表、商品排序與購物車測試。
- 補充結帳流程與訂單摘要驗證。
- 補充 Firefox 與 WebKit 跨瀏覽器測試。
- 將登入流程抽離為 Page Object Model。
- 使用 fixture 集中管理測試帳號與登入前置條件。
- 在 GitHub Actions 中自動執行測試並保存 HTML 報告。
- 分析 performance_glitch_user 的頁面載入與登入等待時間。
