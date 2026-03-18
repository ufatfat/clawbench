<template>
  <div>
    <div class="page-header">
      <h2>测评场景</h2>
      <span class="subtitle">各测评维度的详细说明</span>
    </div>

    <el-row :gutter="24">
      <el-col :span="12" v-for="b in mockBenchmarks" :key="b.id">
        <el-card class="benchmark-card" shadow="hover">
          <template #header>
            <span class="benchmark-name">{{ b.name }}</span>
          </template>
          <p class="benchmark-desc">{{ b.description }}</p>
          <div class="metrics">
            <span class="metrics-label">评测指标：</span>
            <el-tag v-for="m in b.metrics" :key="m" size="small" style="margin-right: 6px">{{ m }}</el-tag>
          </div>
          <el-divider />
          <div class="scores-preview">
            <div v-for="entry in mockLeaderboard" :key="entry.agent.id" class="score-row">
              <span class="agent-name">{{ entry.agent.name }}</span>
              <el-progress
                :percentage="getScore(entry, b.id)"
                :color="scoreColor(getScore(entry, b.id))"
                :stroke-width="8"
                style="flex: 1; margin: 0 12px"
              />
              <span class="score-val">{{ getScore(entry, b.id) }}</span>
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
.page-header { margin-bottom: 24px; }
.page-header h2 { margin: 0 0 4px; font-size: 24px; }
.subtitle { color: #909399; font-size: 14px; }
.benchmark-card { margin-bottom: 24px; }
.benchmark-name { font-weight: 700; font-size: 16px; }
.benchmark-desc { color: #606266; margin: 0 0 12px; }
.metrics { display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }
.metrics-label { color: #909399; font-size: 13px; margin-right: 4px; }
.score-row { display: flex; align-items: center; margin-bottom: 10px; }
.agent-name { width: 90px; font-size: 13px; font-weight: 600; }
.score-val { width: 30px; text-align: right; font-size: 13px; font-weight: 700; }
</style>
