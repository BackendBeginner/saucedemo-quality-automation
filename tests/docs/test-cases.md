# SauceDemo 登入功能測試案例

[English README](../README.md) | [繁體中文 README](../README.zh-TW.md)

## 1. 文件資訊

| 項目 | 內容 |
|---|---|
| 專案名稱 | SauceDemo Quality Automation |
| 測試模組 | Login 登入功能 |
| 測試類型 | UI 自動化測試、功能測試、負向測試 |
| 自動化工具 | Playwright + TypeScript |
| 測試環境 | Chromium、Firefox、WebKit |
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
- 補充結帳資料空白欄位驗證。
- 補充多商品結帳流程。
- 補充取消結帳流程。
- 補充訂單完成頁與 Back Home 導航驗證。

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
| TC-CHECKOUT-001 | 單一商品完成結帳 | High | End-to-End | Automated |
| TC-CHECKOUT-002 | 結帳時未填寫 First Name | High | Validation | Automated |
| TC-CHECKOUT-003 | 結帳時未填寫 Last Name | High | Validation | Automated |
| TC-CHECKOUT-004 | 結帳時未填寫 Postal Code | High | Validation | Automated |
| TC-CHECKOUT-005 | 訂單摘要顯示正確商品與金額 | High | Functional | Automated |
| TC-CHECKOUT-006 | 從結帳資料頁取消結帳 | Medium | Navigation | Automated |
| TC-CHECKOUT-007 | 從訂單摘要頁取消結帳 | Medium | Navigation | Automated |
| TC-CHECKOUT-008 | 訂單完成頁與 Back Home 導航 | High | End-to-End | Automated |
| TC-CHECKOUT-009 | 多商品完成結帳 | High | End-to-End | Automated |
| TC-CART-001 | 從商品頁移除商品 | High | Functional | Automated |
| TC-CART-002 | 從購物車移除商品 | High | Functional | Automated |
| TC-CART-003 | 移除唯一商品後購物車為空 | Medium | Functional | Automated |

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

## 6.2 Checkout 測試案例

### TC-CHECKOUT-001：單一商品完成結帳

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-001 |
| 優先級 | High |
| 測試類型 | End-to-End / Functional |
| 前置條件 | 使用者具備正常測試帳號，且商品頁可以正常載入 |
| 測試資料 | Username: `standard_user`、Password: `secret_sauce` |
| 商品資料 | Product: `Sauce Labs Backpack` |
| 結帳資料 | First Name: `Kai`、Last Name: `Cheng`、Zip/Postal Code: `10001` |

#### 測試步驟

1. 開啟 SauceDemo 登入頁面。
2. 輸入 Username `standard_user`。
3. 輸入 Password `secret_sauce`。
4. 點擊 `Login` 按鈕。
5. 確認使用者進入商品頁面。
6. 將 `Sauce Labs Backpack` 加入購物車。
7. 點擊購物車圖示。
8. 確認使用者進入購物車頁面。
9. 確認購物車中包含 `Sauce Labs Backpack`。
10. 點擊 `Checkout` 按鈕。
11. 在 First Name 欄位輸入 `Kai`。
12. 在 Last Name 欄位輸入 `Cheng`。
13. 在 Zip/Postal Code 欄位輸入 `10001`。
14. 點擊 `Continue` 按鈕。
15. 確認使用者進入訂單摘要頁面。
16. 確認訂單摘要中包含 `Sauce Labs Backpack`。
17. 點擊 `Finish` 按鈕。

#### 預期結果

- 使用者成功登入並進入 `/inventory.html`。
- `Sauce Labs Backpack` 成功加入購物車。
- 購物車數量顯示為 1。
- 使用者成功進入 `/cart.html`。
- 購物車頁面顯示 `Sauce Labs Backpack`。
- 使用者成功進入 `/checkout-step-one.html`。
- 結帳資料可以成功填寫。
- 使用者成功進入 `/checkout-step-two.html`。
- 訂單摘要頁面顯示正確商品。
- 使用者完成結帳後導向 `/checkout-complete.html`。
- 頁面顯示 `Thank you for your order!`。
- 訂單完成頁面不顯示錯誤訊息。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

### TC-CHECKOUT-002：結帳時未填寫 First Name

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-002 |
| 優先級 | High |
| 測試類型 | Validation |
| 前置條件 | 使用者已登入，且購物車包含商品 |
| 測試資料 | Product: `Sauce Labs Backpack` |
| 結帳資料 | Last Name: `Cheng`、Zip/Postal Code: `10001` |

#### 測試步驟

1. 使用 `standard_user` 登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 進入購物車並點擊 `Checkout`。
4. 保持 First Name 欄位空白。
5. 在 Last Name 欄位輸入 `Cheng`。
6. 在 Zip/Postal Code 欄位輸入 `10001`。
7. 點擊 `Continue` 按鈕。

#### 預期結果

- 使用者仍停留在 `/checkout-step-one.html`。
- 顯示錯誤訊息：`Error: First Name is required`。
- 使用者不可進入訂單摘要頁面。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

### TC-CHECKOUT-003：結帳時未填寫 Last Name

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-003 |
| 優先級 | High |
| 測試類型 | Validation |
| 前置條件 | 使用者已登入，且購物車包含商品 |
| 測試資料 | Product: `Sauce Labs Backpack` |
| 結帳資料 | First Name: `Kai`、Zip/Postal Code: `10001` |

#### 測試步驟

1. 使用 `standard_user` 登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 進入購物車並點擊 `Checkout`。
4. 在 First Name 欄位輸入 `Kai`。
5. 保持 Last Name 欄位空白。
6. 在 Zip/Postal Code 欄位輸入 `10001`。
7. 點擊 `Continue` 按鈕。

#### 預期結果

- 使用者仍停留在 `/checkout-step-one.html`。
- 顯示錯誤訊息：`Error: Last Name is required`。
- 使用者不可進入訂單摘要頁面。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

### TC-CHECKOUT-004：結帳時未填寫 Postal Code

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-004 |
| 優先級 | High |
| 測試類型 | Validation |
| 前置條件 | 使用者已登入，且購物車包含商品 |
| 測試資料 | Product: `Sauce Labs Backpack` |
| 結帳資料 | First Name: `Kai`、Last Name: `Cheng` |

#### 測試步驟

1. 使用 `standard_user` 登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 進入購物車並點擊 `Checkout`。
4. 在 First Name 欄位輸入 `Kai`。
5. 在 Last Name 欄位輸入 `Cheng`。
6. 保持 Zip/Postal Code 欄位空白。
7. 點擊 `Continue` 按鈕。

#### 預期結果

- 使用者仍停留在 `/checkout-step-one.html`。
- 顯示錯誤訊息：`Error: Postal Code is required`。
- 使用者不可進入訂單摘要頁面。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

### TC-CHECKOUT-005：訂單摘要顯示正確商品與金額

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-005 |
| 優先級 | High |
| 測試類型 | Functional / Calculation |
| 前置條件 | 使用者已登入，且購物車包含一項商品 |
| 測試資料 | Product: `Sauce Labs Backpack` |
| 結帳資料 | First Name: `Kai`、Last Name: `Cheng`、Zip/Postal Code: `10001` |
| 預期金額 | Item total: `$29.99`、Tax: `$2.40`、Total: `$32.39` |

#### 測試步驟

1. 使用 `standard_user` 登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 進入購物車並點擊 `Checkout`。
4. 填寫 First Name、Last Name 與 Zip/Postal Code。
5. 點擊 `Continue` 進入訂單摘要頁。
6. 驗證商品名稱與商品數量。
7. 驗證 Item total、Tax 與 Total。

#### 預期結果

- 商品名稱為 `Sauce Labs Backpack`。
- 商品數量為 1。
- Item total 為 `$29.99`。
- Tax 為 `$2.40`。
- Total 為 `$32.39`。
- Total 等於 Item total 加上 Tax。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

### TC-CHECKOUT-006：從結帳資料頁取消結帳

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-006 |
| 優先級 | Medium |
| 測試類型 | Navigation |
| 前置條件 | 使用者已進入 Checkout Information 頁面 |
| 測試資料 | Product: `Sauce Labs Backpack` |

#### 測試步驟

1. 使用 `standard_user` 登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 進入購物車並點擊 `Checkout`。
4. 確認進入 Checkout Information 頁面。
5. 點擊 `Cancel` 按鈕。

#### 預期結果

- 使用者返回 `/cart.html`。
- 購物車頁面正常顯示。
- 購物車仍包含 `Sauce Labs Backpack`。
- 使用者未進入訂單摘要頁面。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

### TC-CHECKOUT-007：從訂單摘要頁取消結帳

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-007 |
| 優先級 | Medium |
| 測試類型 | Navigation |
| 前置條件 | 使用者已進入 Checkout Overview 頁面 |
| 測試資料 | Product: `Sauce Labs Backpack` |
| 結帳資料 | First Name: `Kai`、Last Name: `Cheng`、Zip/Postal Code: `10001` |

#### 測試步驟

1. 使用 `standard_user` 登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 進入購物車並點擊 `Checkout`。
4. 填寫完整結帳資料。
5. 點擊 `Continue` 進入訂單摘要頁。
6. 點擊 `Cancel` 按鈕。

#### 預期結果

- 使用者返回 `/inventory.html`。
- 頁面顯示 `Products`。
- 使用者未完成訂單。
- 不應顯示訂單完成訊息。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

### TC-CHECKOUT-008：訂單完成頁與 Back Home 導航

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-008 |
| 優先級 | High |
| 測試類型 | End-to-End / Navigation |
| 前置條件 | 使用者已登入，且購物車包含商品 |
| 測試資料 | Product: `Sauce Labs Backpack` |
| 結帳資料 | First Name: `Kai`、Last Name: `Cheng`、Zip/Postal Code: `10001` |

#### 測試步驟

1. 使用 `standard_user` 登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 進入購物車並點擊 `Checkout`。
4. 填寫完整結帳資料。
5. 點擊 `Continue` 進入訂單摘要頁。
6. 點擊 `Finish`。
7. 驗證訂單完成頁。
8. 點擊 `Back Home` 按鈕。

#### 預期結果

- 使用者導向 `/checkout-complete.html`。
- 頁面顯示 `Thank you for your order!`。
- 訂單完成頁正常顯示。
- 點擊 `Back Home` 後返回 `/inventory.html`。
- 商品頁顯示 `Products`。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

### TC-CHECKOUT-009：多商品完成結帳

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-009 |
| 優先級 | High |
| 測試類型 | End-to-End / Calculation |
| 前置條件 | 使用者已登入商品頁面 |
| 測試資料 | Products: `Sauce Labs Backpack`、`Sauce Labs Bike Light` |
| 結帳資料 | First Name: `Kai`、Last Name: `Cheng`、Zip/Postal Code: `10001` |
| 預期小計 | `$39.98` |
| 預期稅額 | `$3.20` |
| 預期總額 | `$43.18` |

#### 測試步驟

1. 使用 `standard_user` 登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 將 `Sauce Labs Bike Light` 加入購物車。
4. 確認購物車數量為 2。
5. 開啟購物車。
6. 確認兩項商品都顯示。
7. 點擊 `Checkout` 按鈕。
8. 填寫 First Name `Kai`。
9. 填寫 Last Name `Cheng`。
10. 填寫 Zip/Postal Code `10001`。
11. 點擊 `Continue` 按鈕。
12. 確認訂單摘要包含兩項商品。
13. 驗證商品數量為 2。
14. 驗證 Item total 為 `$39.98`。
15. 驗證 Tax 為 `$3.20`。
16. 驗證 Total 為 `$43.18`。
17. 點擊 `Finish` 按鈕。

#### 預期結果

- 兩項商品成功加入購物車。
- 購物車數量顯示為 2。
- Checkout Information 頁面可正常填寫。
- 訂單摘要顯示 `Sauce Labs Backpack`。
- 訂單摘要顯示 `Sauce Labs Bike Light`。
- 訂單摘要商品數量為 2。
- Item total 為 `$39.98`。
- Tax 為 `$3.20`。
- Total 為 `$43.18`。
- 使用者成功導向 `/checkout-complete.html`。
- 頁面顯示 `Thank you for your order!`。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

## 6.3 Cart 測試案例

### TC-CART-001：從商品頁移除商品

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CART-001 |
| 優先級 | High |
| 測試類型 | Functional |
| 前置條件 | 使用者已登入商品頁 |
| 測試資料 | Product: `Sauce Labs Backpack` |

#### 測試步驟

1. 使用 `standard_user` 登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 確認購物車 badge 顯示 1。
4. 點擊該商品的 `Remove` 按鈕。
5. 查看商品按鈕與購物車 badge。

#### 預期結果

- 商品成功加入購物車。
- 點擊 `Remove` 後商品從購物車移除。
- 商品按鈕恢復為 `Add to cart`。
- 購物車 badge 消失。

#### 自動化腳本

```text
tests/cart.spec.ts
```

### TC-CART-002：從購物車移除商品

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CART-002 |
| 優先級 | High |
| 測試類型 | Functional |
| 前置條件 | 購物車中有兩項商品 |
| 測試資料 | Products: `Sauce Labs Backpack`、`Sauce Labs Bike Light` |

#### 測試步驟

1. 使用 `standard_user` 登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 將 `Sauce Labs Bike Light` 加入購物車。
4. 開啟購物車。
5. 點擊 `Sauce Labs Bike Light` 的 `Remove` 按鈕。
6. 查看購物車商品與 badge。

#### 預期結果

- `Sauce Labs Bike Light` 從購物車移除。
- `Sauce Labs Backpack` 仍然存在。
- 購物車商品數量從 2 變為 1。
- 購物車 badge 顯示 1。

#### 自動化腳本

```text
tests/cart.spec.ts
```

### TC-CART-003：移除唯一商品後購物車為空

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CART-003 |
| 優先級 | Medium |
| 測試類型 | Functional |
| 前置條件 | 購物車中有一項商品 |
| 測試資料 | Product: `Sauce Labs Backpack` |

#### 測試步驟

1. 使用 `standard_user` 登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 開啟購物車。
4. 點擊商品的 `Remove` 按鈕。
5. 查看購物車內容與 badge。

#### 預期結果

- 商品成功從購物車移除。
- 購物車沒有商品。
- 購物車 badge 消失。

#### 自動化腳本

```text
tests/cart.spec.ts
```

### TC-CHECKOUT-001：單一商品完成結帳

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-001 |
| 優先級 | High |
| 測試類型 | End-to-End / Functional |
| 前置條件 | 使用者具備正常測試帳號，且商品頁可以正常載入 |
| 測試資料 | Username: `standard_user`、Password: `secret_sauce` |
| 商品資料 | Product: `Sauce Labs Backpack` |
| 結帳資料 | First Name: `Kai`、Last Name: `Cheng`、Zip/Postal Code: `10001` |

#### 測試步驟

1. 開啟 SauceDemo 登入頁面。
2. 輸入 Username `standard_user`。
3. 輸入 Password `secret_sauce`。
4. 點擊 Login 按鈕。
5. 確認使用者進入商品頁面。
6. 將 `Sauce Labs Backpack` 加入購物車。
7. 點擊購物車圖示。
8. 確認使用者進入購物車頁面。
9. 確認購物車中包含 `Sauce Labs Backpack`。
10. 點擊 `Checkout` 按鈕。
11. 在 First Name 欄位輸入 `Kai`。
12. 在 Last Name 欄位輸入 `Cheng`。
13. 在 Zip/Postal Code 欄位輸入 `10001`。
14. 點擊 `Continue` 按鈕。
15. 確認使用者進入訂單摘要頁面。
16. 確認訂單摘要中包含 `Sauce Labs Backpack`。
17. 點擊 `Finish` 按鈕。

#### 預期結果

- 使用者成功登入並進入 `/inventory.html`。
- `Sauce Labs Backpack` 成功加入購物車。
- 購物車數量顯示為 1。
- 使用者成功進入 `/cart.html`。
- 購物車頁面顯示 `Sauce Labs Backpack`。
- 使用者成功進入 `/checkout-step-one.html`。
- 結帳資料可以成功填寫。
- 使用者成功進入 `/checkout-step-two.html`。
- 訂單摘要頁面顯示正確商品。
- 使用者完成結帳後導向 `/checkout-complete.html`。
- 頁面顯示 `Thank you for your order!`。
- 訂單完成頁面不應顯示錯誤訊息。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

### TC-CHECKOUT-002：結帳時未填寫 First Name

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-002 |
| 優先級 | High |
| 測試類型 | Validation |
| 前置條件 | 使用者已登入，且購物車包含商品 |
| 測試資料 | Last Name: `Cheng`、Zip/Postal Code: `10001` |

#### 測試步驟

1. 登入 SauceDemo。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 進入購物車並點擊 `Checkout`。
4. 保持 First Name 空白。
5. 填寫 Last Name `Cheng`。
6. 填寫 Zip/Postal Code `10001`。
7. 點擊 `Continue`。

#### 預期結果

- 使用者仍停留在 `/checkout-step-one.html`。
- 顯示錯誤訊息：`Error: First Name is required`。
- 使用者不可進入訂單摘要頁面。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

### TC-CHECKOUT-003：結帳時未填寫 Last Name

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-003 |
| 優先級 | High |
| 測試類型 | Validation |
| 前置條件 | 使用者已登入，且購物車包含商品 |
| 測試資料 | First Name: `Kai`、Zip/Postal Code: `10001` |

#### 測試步驟

1. 登入 SauceDemo。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 進入購物車並點擊 `Checkout`。
4. 填寫 First Name `Kai`。
5. 保持 Last Name 空白。
6. 填寫 Zip/Postal Code `10001`。
7. 點擊 `Continue`。

#### 預期結果

- 使用者仍停留在 `/checkout-step-one.html`。
- 顯示錯誤訊息：`Error: Last Name is required`。
- 使用者不可進入訂單摘要頁面。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

### TC-CHECKOUT-004：結帳時未填寫 Postal Code

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-004 |
| 優先級 | High |
| 測試類型 | Validation |
| 前置條件 | 使用者已登入，且購物車包含商品 |
| 測試資料 | First Name: `Kai`、Last Name: `Cheng` |

#### 測試步驟

1. 登入 SauceDemo。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 進入購物車並點擊 `Checkout`。
4. 填寫 First Name `Kai`。
5. 填寫 Last Name `Cheng`。
6. 保持 Zip/Postal Code 空白。
7. 點擊 `Continue`。

#### 預期結果

- 使用者仍停留在 `/checkout-step-one.html`。
- 顯示錯誤訊息：`Error: Postal Code is required`。
- 使用者不可進入訂單摘要頁面。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

### TC-CHECKOUT-005：訂單摘要顯示正確商品與金額

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-005 |
| 優先級 | High |
| 測試類型 | Functional / Calculation |
| 前置條件 | 使用者已登入，且購物車包含一項商品 |
| 測試資料 | Product: `Sauce Labs Backpack` |
| 預期金額 | Item total: `$29.99`、Tax: `$2.40`、Total: `$32.39` |

#### 測試步驟

1. 使用 `standard_user` 登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 進入購物車並點擊 `Checkout`。
4. 填寫 First Name、Last Name 與 Zip/Postal Code。
5. 點擊 `Continue` 進入訂單摘要頁。
6. 驗證商品名稱與商品數量。
7. 驗證 Item total、Tax 與 Total。

#### 預期結果

- 商品名稱為 `Sauce Labs Backpack`。
- 商品數量為 1。
- Item total 為 `$29.99`。
- Tax 為 `$2.40`。
- Total 為 `$32.39`。
- Total 等於 Item total 加上 Tax。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

### TC-CHECKOUT-006：從結帳資料頁取消結帳

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-006 |
| 優先級 | Medium |
| 測試類型 | Navigation |
| 前置條件 | 使用者已進入 Checkout Information 頁面 |
| 測試資料 | Product: `Sauce Labs Backpack` |

#### 測試步驟

1. 使用 `standard_user` 登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 進入購物車並點擊 `Checkout`。
4. 確認進入 Checkout Information 頁面。
5. 點擊 `Cancel`。

#### 預期結果

- 使用者返回 `/cart.html`。
- 購物車頁面正常顯示。
- 購物車仍包含 `Sauce Labs Backpack`。
- 使用者未進入訂單摘要頁面。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

### TC-CHECKOUT-007：從訂單摘要頁取消結帳

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-007 |
| 優先級 | Medium |
| 測試類型 | Navigation |
| 前置條件 | 使用者已進入 Checkout Overview 頁面 |
| 測試資料 | Product: `Sauce Labs Backpack` |

#### 測試步驟

1. 使用 `standard_user` 登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 進入 Checkout Information 頁面。
4. 填寫完整結帳資料。
5. 點擊 `Continue` 進入訂單摘要頁。
6. 點擊 `Cancel`。

#### 預期結果

- 使用者返回 `/inventory.html`。
- 頁面顯示 `Products`。
- 使用者未完成訂單。
- 不應顯示訂單完成訊息。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

### TC-CHECKOUT-008：訂單完成頁與 Back Home 導航

| 項目 | 內容 |
|---|---|
| 測試案例 ID | TC-CHECKOUT-008 |
| 優先級 | High |
| 測試類型 | End-to-End / Navigation |
| 前置條件 | 使用者已登入，且購物車包含商品 |
| 測試資料 | Product: `Sauce Labs Backpack` |

#### 測試步驟

1. 使用 `standard_user` 登入。
2. 將 `Sauce Labs Backpack` 加入購物車。
3. 進入購物車並點擊 `Checkout`。
4. 填寫完整結帳資料。
5. 點擊 `Continue` 進入訂單摘要頁。
6. 點擊 `Finish`。
7. 驗證訂單完成頁。
8. 點擊 `Back Home`。

#### 預期結果

- 使用者導向 `/checkout-complete.html`。
- 頁面顯示 `Thank you for your order!`。
- 訂單完成頁正常顯示。
- 點擊 `Back Home` 後返回 `/inventory.html`。
- 商品頁顯示 `Products`。

#### 自動化腳本

```text
tests/checkout.spec.ts
```

## 7. 自動化執行方式

### 執行 Login 測試

```bash
npx playwright test tests/login.spec.ts --project=chromium --workers=2
```

### 執行 Inventory 測試

```bash
npx playwright test tests/inventory.spec.ts --project=chromium --workers=2
```

### 執行 Cart 測試

```bash
npx playwright test tests/cart.spec.ts --project=chromium --workers=2
```

### 執行 Checkout 測試

```bash
npx playwright test tests/checkout.spec.ts --project=chromium --workers=2
```

### 執行 Chromium 全部測試

```bash
npx playwright test --project=chromium --workers=2
```

### 執行三個瀏覽器全部測試

```bash
npx playwright test \
  --project=chromium \
  --project=firefox \
  --project=webkit \
  --workers=2
```

### TypeScript 型別檢查

```bash
npx tsc -p tsconfig.json --noEmit
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
npx playwright show-report playwright-report
```

## 8. 測試結果紀錄

| 執行日期 | 瀏覽器 | 測試範圍 | 通過 | 失敗 | 跳過 | Flaky | 備註 |
|---|---|---|---:|---:|---:|---:|---|
| 2026-08-15 | Chromium | All tests | 24 | 0 | 0 | 0 | workers=2，已完成 |
| 2026-08-15 | Firefox | All tests | 24 | 0 | 0 | 1 | workers=2，1 個測試經 retry 後通過 |
| 2026-08-15 | WebKit | All tests | 24 | 0 | 0 | 0 | workers=2，已完成 |
| 2026-08-15 | All browsers | All tests | 72 | 0 | 0 | 1 | workers=2，全部最終通過 |

## 9. 風險與後續規劃

### 已完成

- 完成 Login 登入測試案例。
- 完成 LoginPage、InventoryPage、CartPage 與 CheckoutPage。
- 完成 Playwright fixture 登入前置流程。
- 完成商品列表、排序與購物車新增／移除測試。
- 完成結帳流程與結帳資料必填欄位驗證。
- 完成訂單摘要商品、數量、小計、稅額與總金額驗證。
- 完成結帳取消流程驗證。
- 完成多商品結帳流程。
- 完成訂單完成頁與 Back Home 導航驗證。
- 啟用 Chromium、Firefox 與 WebKit 跨瀏覽器測試。
- 建立 GitHub Actions CI。
- 保存 HTML report、trace、screenshot 與 video。
- 設定每個失敗測試重試一次。
- 使用 workers=2 執行三個瀏覽器的完整測試。

### 風險

- 高平行度執行時，登入頁初始載入偶爾可能出現 flaky。
- 目前透過每個失敗案例 retry 一次降低偶發環境錯誤的影響。
- SauceDemo 為外部測試網站，網路或服務狀態可能影響測試結果。

### 後續規劃

- 分析 `performance_glitch_user` 的頁面載入與登入等待時間。
- 補充 API 自動化測試。
- 補充 SQL 資料驗證。
- 整合 CI/CD 測試報告與部署流程。
- 建立跨瀏覽器 flaky rate 趨勢追蹤。