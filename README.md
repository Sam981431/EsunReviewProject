# 專案名稱 (Project Name)

玉山面試測試專案 - 員工座位配置系統

## 🚀 技術棧 (Tech Stack)

- **前端**: Vue 3 (Composition API), Vite
- **後端**: Spring Boot
- **資料庫**: MySQL 8.x
- **工具**: Maven, Node.js 18+

## 📂 專案結構

```text
/frontend  # Vue 3 前端 \n
/backend   # Spring Boot 後端
/sql       # 資料庫指令碼
```

## 🛠️ 快速開始

### 1. 資料庫

- db_name: esun_seat_db
- username: root
- password: mysql
- 請先引入所有Store_Procedure避免資料庫操作失敗。

### 2. 後端 (Spring Boot)

1. 配置 `application.yml` 的 JDBC 資訊。
2. 執行：`mvn spring-boot:run` (port 8080)

### 3. 前端 (Vue 3)

1. 進入 `frontend` 目錄。
2. 執行：`npm install`
3. 執行：`npm run dev`
