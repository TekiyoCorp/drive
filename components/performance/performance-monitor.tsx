"use client";

import { useEffect, useState } from "react";

interface PerformanceMetrics {
  lcp: number | null;
  fcp: number | null;
  cls: number | null;
  fid: number | null;
  ttfb: number | null;
}

interface PerformanceMonitorProps {
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
  showDebugInfo?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  onMetricsUpdate,
  showDebugInfo = false,
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fcp: null,
    cls: null,
    fid: null,
    ttfb: null,
  });

  useEffect(() => {
    if (!("PerformanceObserver" in window)) return;

    const updateMetrics = (newMetrics: Partial<PerformanceMetrics>) => {
      setMetrics((prev) => {
        const updated = { ...prev, ...newMetrics };
        onMetricsUpdate?.(updated);
        return updated;
      });
    };

    // LCP Observer
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
        startTime: number;
      };
      updateMetrics({ lcp: lastEntry.startTime });
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

    // FCP Observer
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      updateMetrics({ fcp: entries[0].startTime });
    });
    fcpObserver.observe({ type: "first-contentful-paint", buffered: true });

    // CLS Observer
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as PerformanceEntry & {
          value: number;
          hadRecentInput: boolean;
        };
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value;
        }
      }
      updateMetrics({ cls: clsValue });
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });

    // FID Observer
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fidEntry = entries[0] as PerformanceEntry & {
        processingStart: number;
        startTime: number;
      };
      updateMetrics({ fid: fidEntry.processingStart - fidEntry.startTime });
    });
    fidObserver.observe({ type: "first-input", buffered: true });

    // TTFB Calculation
    const navigationEntry = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      updateMetrics({
        ttfb: navigationEntry.responseStart - navigationEntry.requestStart,
      });
    }

    return () => {
      lcpObserver.disconnect();
      fcpObserver.disconnect();
      clsObserver.disconnect();
      fidObserver.disconnect();
    };
  }, [onMetricsUpdate]);

  const getMetricStatus = (
    metric: keyof PerformanceMetrics,
    value: number | null
  ) => {
    if (value === null) return "pending";

    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fcp: { good: 1800, poor: 3000 },
      cls: { good: 0.1, poor: 0.25 },
      fid: { good: 100, poor: 300 },
      ttfb: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[metric];
    if (value <= threshold.good) return "good";
    if (value <= threshold.poor) return "needs-improvement";
    return "poor";
  };

  const formatMetric = (value: number | null, unit: string = "ms") => {
    if (value === null) return "Measuring...";
    return `${value.toFixed(1)}${unit}`;
  };

  if (!showDebugInfo) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "10px",
        borderRadius: "8px",
        fontSize: "12px",
        fontFamily: "monospace",
        zIndex: 9999,
        minWidth: "200px",
      }}
    >
      <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
        Performance Metrics
      </div>

      <div style={{ display: "grid", gap: "4px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>LCP:</span>
          <span
            style={{
              color:
                getMetricStatus("lcp", metrics.lcp) === "good"
                  ? "#10b981"
                  : getMetricStatus("lcp", metrics.lcp) === "needs-improvement"
                  ? "#f59e0b"
                  : "#ef4444",
            }}
          >
            {formatMetric(metrics.lcp)}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>FCP:</span>
          <span
            style={{
              color:
                getMetricStatus("fcp", metrics.fcp) === "good"
                  ? "#10b981"
                  : getMetricStatus("fcp", metrics.fcp) === "needs-improvement"
                  ? "#f59e0b"
                  : "#ef4444",
            }}
          >
            {formatMetric(metrics.fcp)}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>CLS:</span>
          <span
            style={{
              color:
                getMetricStatus("cls", metrics.cls) === "good"
                  ? "#10b981"
                  : getMetricStatus("cls", metrics.cls) === "needs-improvement"
                  ? "#f59e0b"
                  : "#ef4444",
            }}
          >
            {formatMetric(metrics.cls, "")}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>FID:</span>
          <span
            style={{
              color:
                getMetricStatus("fid", metrics.fid) === "good"
                  ? "#10b981"
                  : getMetricStatus("fid", metrics.fid) === "needs-improvement"
                  ? "#f59e0b"
                  : "#ef4444",
            }}
          >
            {formatMetric(metrics.fid)}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>TTFB:</span>
          <span
            style={{
              color:
                getMetricStatus("ttfb", metrics.ttfb) === "good"
                  ? "#10b981"
                  : getMetricStatus("ttfb", metrics.ttfb) ===
                    "needs-improvement"
                  ? "#f59e0b"
                  : "#ef4444",
            }}
          >
            {formatMetric(metrics.ttfb)}
          </span>
        </div>
      </div>

      <div style={{ marginTop: "8px", fontSize: "10px", opacity: 0.7 }}>
        🟢 Good | 🟡 Needs Improvement | 🔴 Poor
      </div>
    </div>
  );
};

export default PerformanceMonitor;
