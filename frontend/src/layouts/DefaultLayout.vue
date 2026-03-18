<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="logo">
        <span class="logo-icon">🦞</span>
        <span class="logo-text">ClawBench</span>
      </div>
      <el-menu mode="horizontal" :router="true" :default-active="$route.path" class="nav">
        <el-menu-item index="/leaderboard">排行榜</el-menu-item>
        <el-menu-item index="/benchmarks">测评场景</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="main">
      <router-view />
    </el-main>
    <el-footer class="footer">ClawBench © 2026</el-footer>
  </el-container>
</template>

<script setup lang="ts">
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
  gap: 40px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: #303133;
  white-space: nowrap;
}
.logo-icon { font-size: 24px; }
.nav { flex: 1; border-bottom: none; }
.main { padding: 32px 40px; max-width: 1200px; margin: 0 auto; width: 100%; }
.footer { text-align: center; color: #909399; font-size: 13px; line-height: 60px; }
</style>
