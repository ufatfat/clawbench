<template>
  <div>
    <div class="page-header">
      <h2>排行榜</h2>
      <span class="subtitle">基于相同模型，评测各 Claw 框架的综合能力</span>
    </div>

    <el-table :data="mockLeaderboard" style="width: 100%" stripe>
      <el-table-column label="排名" width="80" align="center">
        <template #default="{ row }">
          <span class="rank" :class="`rank-${row.rank}`">{{ row.rank }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Agent" min-width="160">
        <template #default="{ row }">
          <router-link :to="`/agents/${row.agent.id}`" class="agent-link">
            <span class="agent-name">{{ row.agent.name }}</span>
            <el-tag size="small" type="info">{{ row.agent.version }}</el-tag>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="总分" width="120" align="center" sortable prop="totalScore">
        <template #default="{ row }">
          <span class="total-score">{{ row.totalScore }}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-for="b in mockBenchmarks"
        :key="b.id"
        :label="b.name"
        align="center"
        width="140"
      >
        <template #default="{ row }">
          <el-progress
            :percentage="getScore(row, b.id)"
            :color="scoreColor(getScore(row, b.id))"
            :stroke-width="8"
            :show-text="true"
          />
        </template>
      </el-table-column>

      <el-table-column label="更新时间" width="140" align="center">
        <template #default="{ row }">
          <span class="time">{{ formatDate(row.lastUpdated) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
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
  return new Date(iso).toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.page-header { margin-bottom: 24px; }
.page-header h2 { margin: 0 0 4px; font-size: 24px; }
.subtitle { color: #909399; font-size: 14px; }
.rank { font-weight: 700; font-size: 16px; }
.rank-1 { color: #f5a623; }
.rank-2 { color: #9b9b9b; }
.rank-3 { color: #c47a2b; }
.agent-link { display: flex; align-items: center; gap: 8px; text-decoration: none; color: inherit; }
.agent-name { font-weight: 600; }
.total-score { font-size: 20px; font-weight: 700; color: #303133; }
.time { color: #909399; font-size: 13px; }
</style>
