<template>
  <div>
    <div class="page-header">
      <div class="header-content">
        <div>
          <h2>🏆 排行榜</h2>
          <span class="subtitle">基于相同模型，评测各 Claw 框架的综合能力</span>
        </div>
        <el-tag type="info" size="large">
          <el-icon><Clock /></el-icon>
          最后更新: {{ formatDate(mockLeaderboard[0]?.lastUpdated) }}
        </el-tag>
      </div>
    </div>

    <el-card shadow="never" class="leaderboard-card">
      <el-table :data="mockLeaderboard" style="width: 100%">
        <el-table-column label="排名" width="100" align="center">
          <template #default="{ row }">
            <div class="rank-badge" :class="`rank-${row.rank}`">
              <span v-if="row.rank === 1">🥇</span>
              <span v-else-if="row.rank === 2">🥈</span>
              <span v-else-if="row.rank === 3">🥉</span>
              <span v-else class="rank-num">#{{ row.rank }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Agent" min-width="200">
          <template #default="{ row }">
            <router-link :to="`/agents/${row.agent.id}`" class="agent-link">
              <div class="agent-info">
                <span class="agent-name">{{ row.agent.name }}</span>
                <span class="agent-desc">{{ row.agent.description }}</span>
              </div>
              <el-tag size="small" type="info">{{ row.agent.version }}</el-tag>
            </router-link>
          </template>
        </el-table-column>

        <el-table-column label="总分" width="140" align="center" sortable prop="totalScore">
          <template #default="{ row }">
            <div class="score-cell">
              <span class="total-score" :style="{ color: scoreColor(row.totalScore) }">
                {{ row.totalScore }}
              </span>
              <span class="score-max">/100</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-for="b in mockBenchmarks"
          :key="b.id"
          :label="b.name"
          align="center"
          width="150"
        >
          <template #default="{ row }">
            <div class="benchmark-score">
              <el-progress
                :percentage="getScore(row, b.id)"
                :color="scoreColor(getScore(row, b.id))"
                :stroke-width="6"
              />
              <span class="score-text">{{ getScore(row, b.id) }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 图表对比 -->
    <el-card shadow="never" class="chart-card" style="margin-top: 24px">
      <template #header>
        <span class="card-title">📊 能力雷达图</span>
      </template>
      <div class="radar-placeholder">
        <el-empty description="图表功能开发中" :image-size="120" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Clock } from '@element-plus/icons-vue'
import { mockLeaderboard, mockBenchmarks } from '../mock/data'
import type { LeaderboardEntry } from '../types'

function getScore(row: LeaderboardEntry, benchmarkId: string): number {
  return row.scores.find(s => s.benchmarkId === benchmarkId)?.score ?? 0
}

function scoreColor(score: number): string {
  if (score >= 90) return '#67c23a'
  if (score >= 75) return '#409eff'
  if (score >= 60) return '#e6a23c'
  return '#f56c6c'
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('zh-CN', { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>

<style scoped>
.page-header { 
  margin-bottom: 24px; 
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-header h2 { 
  margin: 0 0 8px; 
  font-size: 28px; 
  font-weight: 700;
}
.subtitle { 
  font-size: 14px; 
  opacity: 0.9;
}
.leaderboard-card {
  border-radius: 12px;
  overflow: hidden;
}
.rank-badge { 
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rank-num {
  font-size: 18px;
  font-weight: 700;
  color: #909399;
}
.agent-link { 
  display: flex; 
  align-items: center; 
  gap: 12px; 
  text-decoration: none; 
  color: inherit;
  transition: all 0.2s;
}
.agent-link:hover {
  color: #409eff;
}
.agent-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.agent-name { 
  font-weight: 600; 
  font-size: 15px;
}
.agent-desc {
  font-size: 12px;
  color: #909399;
}
.score-cell {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
}
.total-score { 
  font-size: 24px; 
  font-weight: 700;
}
.score-max {
  font-size: 14px;
  color: #909399;
}
.benchmark-score {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
}
.score-text {
  font-size: 13px;
  font-weight: 600;
  color: #606266;
}
.chart-card {
  border-radius: 12px;
}
.card-title {
  font-weight: 600;
  font-size: 16px;
}
.radar-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
