// reportWebVitals.ts

interface PerformanceEntry {
  name: string;
  value: number;
}

type OnPerfEntry = (entry: PerformanceEntry) => void;

const reportWebVitals = (onPerfEntry?: OnPerfEntry): void => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;