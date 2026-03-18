<template>
  <div v-if="agent">
    <div class="page-header">
      <el-button link @click="$router.back()">← 返回</el-button>
      <h2>{{ agent.name }} <el-tag>{{ agent.version }}</el-tag></h2>
      <p class="desc">{{ agent.description }}</p>
    </div>

    <!-- 总分卡片 -->
    <el-row :gutter="24" class="stat-row">
      <el-col :span="6" v-for="s in entry?.scores" :key="s.benchmarkId">
        <el-card shadow="never" class="stat-card">
          <div class="stat-label">{{ s.benchmarkName }}</div>
          <div class="stat-value" :style="{ color: scoreColor(s.score) }">{{ s.score }}</div>
          <el-progress :percentage="s.score" :color="scoreColor(s.score)" :show-text="false" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 历史记录 -->
    <el-card style="margin-top: 24px">
      <template #header><span>历史测评记录</span></template>
      <el-table :data="agentRuns" stripe>
        <el-table-column label="时间" prop="createdAt" width="160">
          <template #default="{ row }">{{ formatDate(row.createdAt) }}</template>
        </el-table-column>
        <el-table-column label="模型" prop="model" width="180" />
        <el-table-column label="总分" prop="totalScore" width="100" align="center">
          <template #default="{ row }">
            <span class="total-score">{{ row.totalScore }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-for="b in mockBenchmarks"
          :key="b.id"
          :label="b.name"
          align="center"
        >
          <template #default="{ row }">
            {{ row.scores.find((s: any) => s.benchmarkId === b.id)?.score ?? '-' }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

  <el-empty v-else description="Agent 不存在" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('zh-CN')
}
</script>

<style scoped>
.page-header { margin-bottom: 24px; }
.page-header h2 { margin: 8px 0 4px; font-size: 24px; display: flex; align-items: center; gap: 10px; }
.desc { color: #909399; margin: 0; }
.stat-card { text-align: center; }
.stat-label { font-size: 13px; color: #909399; margin-bottom: 8px; }
.stat-value { font-size: 36px; font-weight: 700; margin-bottom: 8px; }
.total-score { font-weight: 700; font-size: 16px; }
</style>
