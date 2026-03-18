<template>
  <div>
    <div class="page-header">
      <h2>🎯 测评场景</h2>
      <span class="subtitle">各测评维度的详细说明与实时对比</span>
    </div>

    <el-row :gutter="20">
      <el-col :span="12" v-for="b in mockBenchmarks" :key="b.id">
        <el-card class="benchmark-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="benchmark-name">{{ b.name }}</span>
              <el-tag type="primary" size="small">{{ b.metrics.length }} 项指标</el-tag>
            </div>
          </template>
          
          <p class="benchmark-desc">{{ b.description }}</p>
          
          <div class="metrics">
            <span class="metrics-label">评测指标</span>
            <div class="metrics-tags">
              <el-tag 
                v-for="m in b.metrics" 
                :key="m" 
                size="small" 
                effect="plain"
                type="info"
              >
                {{ m }}
              </el-tag>
            </div>
          </div>

          <el-divider />

          <div class="scores-section">
            <div class="section-title">各框架得分</div>
            <div class="scores-preview">
              <div v-for="entry in mockLeaderboard" :key="entry.agent.id" class="score-row">
                <div class="score-left">
                  <span class="agent-name">{{ entry.agent.name }}</span>
                  <span class="score-val">{{ getScore(entry, b.id) }}</span>
                </div>
                <el-progress
                  :percentage="getScore(entry, b.id)"
                  :color="scoreColor(getScore(entry, b.id))"
                  :stroke-width="10"
                  :show-text="false"
                  class="score-bar"
                />
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { mockBenchmarks, mockLeaderboard } from '../mock/data'
import type { LeaderboardEntry } from '../types'

function getScore(entry: LeaderboardEntry, benchmarkId: string): number {
  return entry.scores.find(s => s.benchmarkId === benchmarkId)?.score ?? 0
}

function scoreColor(score: number): string {
  if (score >= 90) return '#67c23a'
  if (score >= 75) return '#409eff'
  if (score >= 60) return '#e6a23c'
  return '#f56c6c'
}
</script>

<style scoped>
.page-header { 
  margin-bottom: 24px;
  padding: 24px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 12px;
  color: white;
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
.benchmark-card { 
  margin-bottom: 20px;
  border-radius: 12px;
  transition: all 0.3s;
}
.benchmark-card:hover {
  transform: translateY(-4px);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.benchmark-name { 
  font-weight: 700; 
  font-size: 17px;
}
.benchmark-desc { 
  color: #606266; 
  margin: 0 0 16px;
  line-height: 1.6;
}
.metrics { 
  margin-bottom: 12px;
}
.metrics-label { 
  display: block;
  color: #909399; 
  font-size: 13px; 
  margin-bottom: 8px;
  font-weight: 600;
}
.metrics-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.scores-section {
  margin-top: 8px;
}
.section-title {
  font-size: 13px;
  font-weight: 600;
  color: #606266;
  margin-bottom: 12px;
}
.score-row { 
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}
.score-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 140px;
}
.agent-name { 
  font-size: 14px; 
  font-weight: 600;
  color: #303133;
}
.score-val { 
  font-size: 16px; 
  font-weight: 700;
  color: #409eff;
}
.score-bar {
  flex: 1;
}
</style>
