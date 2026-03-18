<template>
  <div v-if="agent">
    <el-page-header @back="$router.back()" class="page-header">
      <template #content>
        <div class="header-content">
          <h2>{{ agent.name }} <el-tag type="primary">{{ agent.version }}</el-tag></h2>
          <p class="desc">{{ agent.description }}</p>
        </div>
      </template>
      <template #extra>
        <el-tag size="large" :type="rankTagType(entry?.rank)">
          排名 #{{ entry?.rank }}
        </el-tag>
      </template>
    </el-page-header>

    <!-- 总分展示 -->
    <el-card shadow="never" class="summary-card">
      <div class="summary-content">
        <div class="total-score-section">
          <div class="label">综合得分</div>
          <div class="value" :style="{ color: scoreColor(entry?.totalScore ?? 0) }">
            {{ entry?.totalScore }}
          </div>
          <div class="sublabel">满分 100</div>
        </div>
        <el-divider direction="vertical" style="height: 80px" />
        <div class="scores-grid">
          <div v-for="s in entry?.scores" :key="s.benchmarkId" class="score-item">
            <div class="score-name">{{ s.benchmarkName }}</div>
            <div class="score-value" :style="{ color: scoreColor(s.score) }">{{ s.score }}</div>
            <el-progress 
              :percentage="s.score" 
              :color="scoreColor(s.score)" 
              :show-text="false"
              :stroke-width="6"
            />
          </div>
        </div>
      </div>
    </el-card>

    <!-- 历史记录 -->
    <el-card shadow="never" class="history-card">
      <template #header>
        <div class="card-header">
          <span class="card-title">📈 历史测评记录</span>
          <el-tag type="info">共 {{ agentRuns.length }} 次测评</el-tag>
        </div>
      </template>
      <el-table :data="agentRuns" stripe>
        <el-table-column label="时间" prop="createdAt" width="180">
          <template #default="{ row }">
            <el-icon><Clock /></el-icon>
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="模型" prop="model" width="200">
          <template #default="{ row }">
            <el-tag size="small" type="info">{{ row.model }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="总分" prop="totalScore" width="100" align="center">
          <template #default="{ row }">
            <span class="table-score" :style="{ color: scoreColor(row.totalScore) }">
              {{ row.totalScore }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          v-for="b in mockBenchmarks"
          :key="b.id"
          :label="b.name"
          align="center"
          width="120"
        >
          <template #default="{ row }">
            <span class="benchmark-score">
              {{ row.scores.find((s: any) => s.benchmarkId === b.id)?.score ?? '-' }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

  <el-empty v-else description="Agent 不存在" :image-size="200" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Clock } from '@element-plus/icons-vue'
import { mockAgents, mockLeaderboard, mockTestRuns, mockBenchmarks } from '../mock/data'

const route = useRoute()
const id = route.params.id as string

const agent = computed(() => mockAgents.find(a => a.id === id))
const entry = computed(() => mockLeaderboard.find(e => e.agent.id === id))
const agentRuns = computed(() => mockTestRuns.filter(r => r.agentId === id))

function scoreColor(score: number): string {
  if (score >= 90) return '#67c23a'
  if (score >= 75) return '#409eff'
  if (score >= 60) return '#e6a23c'
  return '#f56c6c'
}

function rankTagType(rank?: number): string {
  if (!rank) return 'info'
  if (rank === 1) return 'success'
  if (rank === 2) return 'warning'
  if (rank === 3) return 'danger'
  return 'info'
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('zh-CN', {
    year: 'numeric',
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
  padding: 20px 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.header-content h2 { 
  margin: 0 0 8px; 
  font-size: 26px; 
  display: flex; 
  align-items: center; 
  gap: 12px;
}
.desc { 
  color: #606266; 
  margin: 0;
  font-size: 14px;
}
.summary-card {
  margin-bottom: 24px;
  border-radius: 12px;
}
.summary-content {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 16px 0;
}
.total-score-section {
  text-align: center;
  padding: 0 32px;
}
.total-score-section .label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}
.total-score-section .value {
  font-size: 56px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 4px;
}
.total-score-section .sublabel {
  font-size: 12px;
  color: #c0c4cc;
}
.scores-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.score-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.score-name {
  font-size: 13px;
  color: #909399;
  font-weight: 500;
}
.score-value {
  font-size: 28px;
  font-weight: 700;
}
.history-card {
  border-radius: 12px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-title {
  font-weight: 600;
  font-size: 16px;
}
.table-score { 
  font-weight: 700; 
  font-size: 18px;
}
.benchmark-score {
  font-weight: 600;
  color: #606266;
}
</style>
