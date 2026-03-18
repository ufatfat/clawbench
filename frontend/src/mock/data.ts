import type { LeaderboardEntry, Agent, Benchmark, TestRun } from '../types'

export const mockAgents: Agent[] = [
  { id: 'openclaw', name: 'OpenClaw', description: '全功能 AI 助手框架', version: 'v1.2.0', latestScore: 92, rank: 1 },
  { id: 'picoclaw', name: 'PicoClaw', description: '轻量级 Claw 实现', version: 'v0.8.1', latestScore: 78, rank: 2 },
  { id: 'zeroclaw', name: 'ZeroClaw', description: '极简 Claw 实现', version: 'v0.3.0', latestScore: 65, rank: 3 },
]

export const mockBenchmarks: Benchmark[] = [
  { id: 'tool-calling', name: 'Tool Calling', description: '工具调用准确性测评', metrics: ['accuracy', 'latency'] },
  { id: 'task-completion', name: 'Task Completion', description: '多步任务完成率测评', metrics: ['completion_rate', 'steps'] },
  { id: 'error-recovery', name: 'Error Recovery', description: '错误恢复能力测评', metrics: ['recovery_rate', 'attempts'] },
  { id: 'skill-execution', name: 'Skill Execution', description: 'Agent Skill 执行质量测评', metrics: ['quality', 'efficiency'] },
]

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    agent: mockAgents[0],
    totalScore: 92,
    scores: [
      { benchmarkId: 'tool-calling', benchmarkName: 'Tool Calling', score: 95, maxScore: 100 },
      { benchmarkId: 'task-completion', benchmarkName: 'Task Completion', score: 90, maxScore: 100 },
      { benchmarkId: 'error-recovery', benchmarkName: 'Error Recovery', score: 88, maxScore: 100 },
      { benchmarkId: 'skill-execution', benchmarkName: 'Skill Execution', score: 94, maxScore: 100 },
    ],
    lastUpdated: '2026-03-18T10:00:00Z',
  },
  {
    rank: 2,
    agent: mockAgents[1],
    totalScore: 78,
    scores: [
      { benchmarkId: 'tool-calling', benchmarkName: 'Tool Calling', score: 82, maxScore: 100 },
      { benchmarkId: 'task-completion', benchmarkName: 'Task Completion', score: 75, maxScore: 100 },
      { benchmarkId: 'error-recovery', benchmarkName: 'Error Recovery', score: 70, maxScore: 100 },
      { benchmarkId: 'skill-execution', benchmarkName: 'Skill Execution', score: 85, maxScore: 100 },
    ],
    lastUpdated: '2026-03-18T10:00:00Z',
  },
  {
    rank: 3,
    agent: mockAgents[2],
    totalScore: 65,
    scores: [
      { benchmarkId: 'tool-calling', benchmarkName: 'Tool Calling', score: 70, maxScore: 100 },
      { benchmarkId: 'task-completion', benchmarkName: 'Task Completion', score: 60, maxScore: 100 },
      { benchmarkId: 'error-recovery', benchmarkName: 'Error Recovery', score: 58, maxScore: 100 },
      { benchmarkId: 'skill-execution', benchmarkName: 'Skill Execution', score: 72, maxScore: 100 },
    ],
    lastUpdated: '2026-03-18T10:00:00Z',
  },
]

export const mockTestRuns: TestRun[] = [
  {
    id: '1', agentId: 'openclaw', agentName: 'OpenClaw', model: 'claude-sonnet-4-6',
    totalScore: 92,
    scores: mockLeaderboard[0].scores,
    createdAt: '2026-03-18T10:00:00Z',
  },
  {
    id: '2', agentId: 'openclaw', agentName: 'OpenClaw', model: 'claude-sonnet-4-6',
    totalScore: 89,
    scores: [
      { benchmarkId: 'tool-calling', benchmarkName: 'Tool Calling', score: 91, maxScore: 100 },
      { benchmarkId: 'task-completion', benchmarkName: 'Task Completion', score: 87, maxScore: 100 },
      { benchmarkId: 'error-recovery', benchmarkName: 'Error Recovery', score: 85, maxScore: 100 },
      { benchmarkId: 'skill-execution', benchmarkName: 'Skill Execution', score: 92, maxScore: 100 },
    ],
    createdAt: '2026-03-17T10:00:00Z',
  },
  {
    id: '3', agentId: 'openclaw', agentName: 'OpenClaw', model: 'claude-sonnet-4-6',
    totalScore: 85,
    scores: [
      { benchmarkId: 'tool-calling', benchmarkName: 'Tool Calling', score: 88, maxScore: 100 },
      { benchmarkId: 'task-completion', benchmarkName: 'Task Completion', score: 82, maxScore: 100 },
      { benchmarkId: 'error-recovery', benchmarkName: 'Error Recovery', score: 80, maxScore: 100 },
      { benchmarkId: 'skill-execution', benchmarkName: 'Skill Execution', score: 89, maxScore: 100 },
    ],
    createdAt: '2026-03-16T10:00:00Z',
  },
]
