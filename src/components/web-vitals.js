'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  // Handler for web vitals
  const logWebVitals = (metric) => {
    console.log('Web Vitals metric:', metric)

    // Optional: send metrics to your analytics server
    // fetch('/api/web-vitals', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(metric),
    // }).catch((err) => {
    //   console.error('Failed to send Web Vitals:', err)
    // })
  }

  // Hook to report web vitals
  useReportWebVitals(logWebVitals)

  return null
}
