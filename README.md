# ClawBench

Agent 评测平台 - 用于评估和对比各类 AI Agent 的性能表现。

## 技术栈

### 后端
- Go 1.26+
- Gin (Web 框架)
- GORM (ORM)
- PostgreSQL (数据库)
- Redis (缓存)
- Zap (日志)

### 前端
- Vue 3
- TypeScript
- Vite
- Pinia (状态管理)

## 快速开始

### 1. 启动基础设施

```bash
docker-compose up -d
```

### 2. 配置后端

```bash
cd backend
cp .env.example .env
# 编辑 .env 文件，配置数据库连接等信息
```

### 3. 运行后端

```bash
cd backend
go run cmd/server/main.go
```

### 4. 运行前端

```bash
cd frontend
npm install
npm run dev
```

## 项目结构

```
ClawBench/
├── backend/              # Go 后端
│   ├── cmd/             # 命令行入口
│   ├── internal/        # 内部业务逻辑
│   ├── pkg/             # 公共包
│   └── migrations/      # 数据库迁移
├── frontend/            # Vue3 前端
│   └── src/
│       ├── components/  # 组件
│       ├── views/       # 页面
│       ├── stores/      # 状态管理
│       └── api/         # API 调用
└── docs/                # 文档
```

## 开发

- 后端 API: http://localhost:8080
- 前端开发服务器: http://localhost:5173
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## License

MIT
