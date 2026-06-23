"use client";

import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries, CandlestickData } from "lightweight-charts";

const data: CandlestickData[] = [
  { time: "2026-06-01", open: 29450, high: 29780, low: 29210, close: 29630 },
  { time: "2026-06-02", open: 29630, high: 29920, low: 29510, close: 29780 },
  { time: "2026-06-03", open: 29780, high: 30010, low: 29670, close: 29920 },
  { time: "2026-06-04", open: 29920, high: 30180, low: 29800, close: 30030 },
  { time: "2026-06-05", open: 30030, high: 30280, low: 29950, close: 30210 },
  { time: "2026-06-06", open: 30210, high: 30510, low: 30120, close: 30380 },
  { time: "2026-06-07", open: 30380, high: 30720, low: 30300, close: 30640 },
  { time: "2026-06-08", open: 30640, high: 30890, low: 30520, close: 30810 },
  { time: "2026-06-09", open: 30810, high: 31010, low: 30720, close: 30950 },
  { time: "2026-06-10", open: 30950, high: 31180, low: 30880, close: 31120 },
  { time: "2026-06-11", open: 31120, high: 31270, low: 30990, close: 31190 },
  { time: "2026-06-12", open: 31190, high: 31420, low: 31100, close: 31340 },
  { time: "2026-06-13", open: 31340, high: 31510, low: 31280, close: 31480 },
  { time: "2026-06-14", open: 31480, high: 31720, low: 31410, close: 31690 },
  { time: "2026-06-15", open: 31690, high: 31840, low: 31560, close: 31790 },
  { time: "2026-06-16", open: 31790, high: 31980, low: 31680, close: 31910 },
  { time: "2026-06-17", open: 31910, high: 32120, low: 31820, close: 32070 },
  { time: "2026-06-18", open: 32070, high: 32290, low: 32020, close: 32230 },
  { time: "2026-06-19", open: 32230, high: 32480, low: 32140, close: 32390 },
  { time: "2026-06-20", open: 32390, high: 32620, low: 32310, close: 32580 },
  { time: "2026-06-21", open: 32580, high: 32810, low: 32520, close: 32750 },
  { time: "2026-06-22", open: 32750, high: 32940, low: 32680, close: 32870 },
  { time: "2026-06-23", open: 32870, high: 33120, low: 32800, close: 33080 },
  { time: "2026-06-24", open: 33080, high: 33310, low: 33020, close: 33290 },
  { time: "2026-06-25", open: 33290, high: 33520, low: 33210, close: 33480 },
  { time: "2026-06-26", open: 33480, high: 33710, low: 33420, close: 33670 },
  { time: "2026-06-27", open: 33670, high: 33920, low: 33580, close: 33890 },
  { time: "2026-06-28", open: 33890, high: 34110, low: 33820, close: 34060 },
  { time: "2026-06-29", open: 34060, high: 34300, low: 33980, close: 34220 },
  { time: "2026-06-30", open: 34220, high: 34480, low: 34110, close: 34400 },
  { time: "2026-07-01", open: 34400, high: 34650, low: 34350, close: 34590 },
  { time: "2026-07-02", open: 34590, high: 34820, low: 34510, close: 34780 },
  { time: "2026-07-03", open: 34780, high: 34950, low: 34690, close: 34840 },
  { time: "2026-07-04", open: 34840, high: 35120, low: 34780, close: 35050 },
  { time: "2026-07-05", open: 35050, high: 35290, low: 34960, close: 35220 },
  { time: "2026-07-06", open: 35220, high: 35480, low: 35190, close: 35410 },
  { time: "2026-07-07", open: 35410, high: 35680, low: 35350, close: 35570 },
  { time: "2026-07-08", open: 35570, high: 35810, low: 35480, close: 35730 },
  { time: "2026-07-09", open: 35730, high: 35990, low: 35650, close: 35920 },
  { time: "2026-07-10", open: 35920, high: 36110, low: 35840, close: 36070 },
  { time: "2026-07-11", open: 36070, high: 36290, low: 36020, close: 36280 },
  { time: "2026-07-12", open: 36280, high: 36510, low: 36220, close: 36490 },
];

export default function HeroChart({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      layout: {
        background: { color: "rgba(4,14,28,0.85)" },
        textColor: "#d7dde8",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      crosshair: { mode: 0 },
      rightPriceScale: { visible: false },
      timeScale: { visible: false, borderVisible: false },
      handleScroll: false,
      handleScale: false,
      localization: { dateFormat: "yyyy-MM-dd" },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#33eab8",
      downColor: "#f5a623",
      borderVisible: false,
      wickUpColor: "#33eab8",
      wickDownColor: "#f5a623",
      borderUpColor: "#33eab8",
      borderDownColor: "#f5a623",
    });

    candleSeries.setData(data);

    const handleResize = () => {
      if (!containerRef.current) return;
      chart.applyOptions({ width: containerRef.current.clientWidth, height: containerRef.current.clientHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
