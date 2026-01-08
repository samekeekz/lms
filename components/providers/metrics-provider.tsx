"use client"

import { useMetrics } from "@/hooks/use-metrics"

export function MetricsProvider() {
  useMetrics()
  return null
}

