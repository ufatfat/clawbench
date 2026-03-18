<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="logo">
        <span class="logo-icon">🦞</span>
        <span class="logo-text">ClawBench</span>
        <el-tag size="small" type="warning" effect="dark">Beta</el-tag>
      </div>
      <el-menu mode="horizontal" :router="true" :default-active="$route.path" class="nav">
        <el-menu-item index="/leaderboard">
          <el-icon><TrophyBase /></el-icon>
          排行榜
        </el-menu-item>
        <el-menu-item index="/benchmarks">
          <el-icon><DataAnalysis /></el-icon>
          测评场景
        </el-menu-item>
      </el-menu>
      <div class="header-actions">
        <el-button type="primary" size="small" link>
          <el-icon><Document /></el-icon>
          文档
        </el-button>
        <el-button type="primary" size="small" link>
          <el-icon><Link /></el-icon>
          GitHub
        </el-button>
      </div>
    </el-header>
    <el-main class="main">
      <router-view />
    </el-main>
    <el-footer class="footer">
      <div class="footer-content">
        <span>ClawBench © 2026</span>
        <span class="footer-links">
          <a href="#">关于</a>
          <a href="#">API</a>
          <a href="#">反馈</a>
        </span>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { TrophyBase, DataAnalysis, Document, Link } from '@element-plus/icons-vue'
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background: #f5f7fa;
}
.header {
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 40px;
  gap: 32px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  color: #303133;
  white-space: nowrap;
}
.logo-icon { 
  font-size: 28px;
  animation: wave 2s ease-in-out infinite;
}
@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}
.nav { 
  flex: 1; 
  border-bottom: none;
}
.header-actions {
  display: flex;
  gap: 8px;
}
.main { 
  padding: 32px 40px; 
  max-width: 1400px; 
  margin: 0 auto; 
  width: 100%;
}
.footer { 
  background: white;
  border-top: 1px solid #e4e7ed;
  padding: 0 40px;
}
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  color: #909399;
  font-size: 13px;
}
.footer-links {
  display: flex;
  gap: 20px;
}
.footer-links a {
  color: #909399;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-links a:hover {
  color: #409eff;
}
</style>
