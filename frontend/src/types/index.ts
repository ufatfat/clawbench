export interface Agent {
  id: string
  name: string
  description: string
  version: string
  latestScore: number
  rank: number
}

export interface BenchmarkScore {
  benchmarkId: string
  benchmarkName: string
  score: number
  maxScore: number
}

export interface TestRun {
  id: string
  agentId: string
  agentName: string
  model: string
  totalScore: number
  scores: BenchmarkScore[]
  createdAt: string
}

export interface LeaderboardEntry {
  rank: number
  agent: Agent
  totalScore: number
  scores: BenchmarkScore[]
  lastUpdated: string
}

export interface Benchmark {
  id: string
  name: string
  description: string
  metrics: string[]
}
