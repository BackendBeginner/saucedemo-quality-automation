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
| TC-INVENTORY-001 | 商品頁顯示六項商品 | High | Functional | Automated |
| TC-INVENTORY-002 | 商品依 A 到 Z 排序 | Medium | Functional | Automated |
| TC-INVENTORY-003 | 加入單一商品至購物車 | High | Functional | Automated |
| TC-INVENTORY-004 | 加入兩項商品至購物車 | High | Functional | Automated |
| TC-INVENTORY-005 | 開啟購物車並確認商品 | High | Functional | Automated |

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

#### 自動化腳本

```text
tests/login.spec.ts
```

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

#### 自動化腳本

```text
tests/login.spec.ts
```

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

#### 自動化腳本

```text
tests/login.spec.ts
```

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

#### 自動化腳本

```text
tests/login.spec.ts
```

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

#### 自動化腳本

```text
tests/login.spec.ts
```

### TC-LOGIN-007：效能延遲帳號登入流程

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-LOGIN-007 |
| 優先級 | Medium |
| 測試類型 | Performance / Functional |
| 前置條件 | 使用者位於 SauceDemo 登入頁面 |
| 測試資料 | Username: `performance_glitch_user`、Password: `secret_sauce` |
| 測試限制 | 登入流程應在 15 秒內完成 |

#### 測試步驟

1. 開啟 SauceDemo 登入頁面。
2. 在 Username 欄位輸入 `performance_glitch_user`。
3. 在 Password 欄位輸入 `secret_sauce`。
4. 點擊 Login 按鈕。
5. 等待商品頁面完成載入。

#### 預期結果

- 使用者可以成功登入。
- 使用者導向 `/inventory.html`。
- 頁面顯示 `Products` 標題。
- 即使登入流程存在延遲，測試仍應在 15 秒內完成。
- 不應顯示登入錯誤訊息。

#### 自動化腳本

```text
tests/login.spec.ts
```

## 6.1 Inventory 測試案例

### TC-INVENTORY-001：商品頁顯示六項商品

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-INVENTORY-001 |
| 優先級 | High |
| 測試類型 | Functional |
| 前置條件 | 使用 `standard_user` 成功登入 |
| 測試資料 | Username: `standard_user`、Password: `secret_sauce` |

#### 測試步驟

1. 使用正常帳號登入。
2. 進入商品頁面。
3. 取得商品列表。
4. 驗證商品數量。
5. 驗證指定商品是否顯示。

#### 預期結果

- URL 包含 `/inventory.html`。
- 頁面標題為 `Products`。
- 商品列表可見。
- 商品數量為 6 筆。
- `Sauce Labs Backpack` 顯示於商品列表中。
- `Sauce Labs Bike Light` 顯示於商品列表中。

#### 自動化腳本

```text
tests/inventory.spec.ts
```

### TC-INVENTORY-002：商品依 A 到 Z 排序

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-INVENTORY-002 |
| 優先級 | Medium |
| 測試類型 | Functional |
| 前置條件 | 使用者已登入商品頁面 |
| 測試資料 | Sort option: `Name (A to Z)` |

#### 測試步驟

1. 使用正常帳號登入。
2. 確認商品頁已載入。
3. 開啟商品排序下拉選單。
4. 選擇 `Name (A to Z)`。
5. 取得排序後的第一項商品。

#### 預期結果

- 商品排序選單成功切換至 `Name (A to Z)`。
- 商品仍維持 6 筆。
- 排序後第一項商品為 `Sauce Labs Backpack`。

#### 自動化腳本

```text
tests/inventory.spec.ts
```

### TC-INVENTORY-003：加入單一商品至購物車

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-INVENTORY-003 |
| 優先級 | High |
| 測試類型 | Functional |
| 前置條件 | 使用者已登入商品頁面 |
| 測試資料 | Product: `Sauce Labs Backpack` |

#### 測試步驟

1. 使用正常帳號登入。
2. 找到 `Sauce Labs Backpack`。
3. 點擊該商品的 `Add to cart` 按鈕。
4. 查看購物車圖示。

#### 預期結果

- 商品成功加入購物車。
- 商品按鈕變更為 `Remove`。
- 購物車數量顯示為 1。
- 不應加入其他商品。

#### 自動化腳本

```text
tests/inventory.spec.ts
```

### TC-INVENTORY-004：加入兩項商品至購物車

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-INVENTORY-004 |
| 優先級 | High |
| 測試類型 | Functional |
| 前置條件 | 使用者已登入商品頁面 |
| 測試資料 | Products: `Sauce Labs Backpack`、`Sauce Labs Bike Light` |

#### 測試步驟

1. 使用正常帳號登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 將 `Sauce Labs Bike Light` 加入購物車。
4. 查看購物車數量。

#### 預期結果

- 兩項商品都成功加入購物車。
- 購物車數量顯示為 2。
- 兩項商品的按鈕都變更為 `Remove`。

#### 自動化腳本

```text
tests/inventory.spec.ts
```

### TC-INVENTORY-005：開啟購物車並確認商品

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-INVENTORY-005 |
| 優先級 | High |
| 測試類型 | Functional |
| 前置條件 | 使用者已登入商品頁面 |
| 測試資料 | Product: `Sauce Labs Backpack` |

#### 測試步驟

1. 使用正常帳號登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 點擊購物車圖示。
4. 取得購物車頁面中的商品名稱。

#### 預期結果

- 使用者導向 `/cart.html`。
- 購物車頁面正常顯示。
- 購物車中包含 `Sauce Labs Backpack`。
- 購物車商品數量為 1。

#### 自動化腳本

```text
tests/inventory.spec.ts
```

## 7. 自動化執行方式

### 執行登入測試

```bash
npx playwright test tests/login.spec.ts --project=chromium
```

### 執行商品與購物車測試

```bash
npx playwright test tests/inventory.spec.ts --project=chromium
```

### 執行全部測試

```bash
npx playwright test --project=chromium
```

### 以有頭模式執行全部測試

```bash
npx playwright test --project=chromium --headed
```

### 使用 Playwright Inspector 除錯

```bash
npx playwright test tests/login.spec.ts --project=chromium --debug
```

### 列出所有測試

```bash
npx playwright test --list
```

### 開啟 HTML 測試報告

```bash
npx playwright show-report --port 0
```

## 8. 測試結果紀錄

| 執行日期 | 瀏覽器 | 測試範圍 | 通過 | 失敗 | 跳過 | 備註 |
|---|---|---|---:|---:|---:|---|
| 2026-08-12 | Chromium | Login | 7 | 0 | 0 | 已完成 |
| 2026-08-12 | Chromium | Inventory | 5 | 0 | 0 | 已完成 |
| 2026-08-12 | Chromium | All tests | 12 | 0 | 0 | 已完成 |

## 9. 風險與後續規劃

### 已完成

- 完成 Login 登入測試案例。
- 完成 LoginPage Page Object Model 重構。
- 完成 InventoryPage Page Object Model。
- 完成商品列表與購物車自動化測試。
- 集中管理登入流程與商品頁面操作。

### 後續規劃

- 補充購物車移除商品測試。
- 補充結帳資料必填欄位驗證。
- 補充結帳流程與訂單摘要驗證。
- 補充 Firefox 與 WebKit 跨瀏覽器測試。
- 使用 Playwright fixture 集中管理測試帳號與前置條件。
- 在 GitHub Actions 中自動執行測試並保存 HTML 報告。
- 分析 `performance_glitch_user` 的頁面載入與登入等待時間。
- 補充測試失敗時的 trace、screenshot 與 video 分析。
