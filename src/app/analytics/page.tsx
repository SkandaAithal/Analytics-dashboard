import AnalyticsDashBoard from "@/components/AnalyticsDashBoard";
import { analytics } from "@/utils/analytics";
import { getDate } from "../../utils/index";
import React from "react";

export default async function Analytics() {
  const TRACKING_DAYS = 7;
  const pageView = await analytics.retrievedays("pageview", 7);
  const totalPageViews = pageView.reduce((acc, curr) => {
    return (
      acc +
      curr.events.reduce((acc, curr) => {
        return acc + Object.values(curr)[0]!;
      }, 0)
    );
  }, 0);
  const avgVisitorPerday = (totalPageViews / TRACKING_DAYS).toFixed(1);
  const amtVisitorToday = pageView
    .filter((ev) => ev.date === getDate())
    .reduce((acc, curr) => {
      return (
        acc +
        curr.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0)
      );
    }, 0);

  const topCountries = new Map<string, number>();

  for (let i = 0; i < pageView.length; i++) {
    const day = pageView[i];
    if (!day) continue;

    for (let j = 0; j < day.events.length; j++) {
      const event = day.events[j];

      if (!event) continue;

      const key = Object.keys(event)[0]!;
      const value = Object.values(event)[0]!;

      const parsedkey = JSON.parse(key);
      const country = parsedkey?.country;
      if (country) {
        if (topCountries.has(country)) {
          const prevValue = topCountries.get(country)!;
          topCountries.set(country, prevValue + value);
        } else {
          topCountries.set(country, value);
        }
      }
    }
  }

  const topCountriesArray = [...topCountries.entries()]
    .sort((a, b) => {
      if (a[1] > b[1]) return -1;
      else return 1;
    })
    .slice(0, 5);
  return (
    <div className="min-h-screen w-full py-12 flex justify-center items-center ">
      <div className=" relative w-full max-w-6xl mx-auto text-white">
        <AnalyticsDashBoard
          avgVisitorPerday={avgVisitorPerday}
          amtVisitorToday={amtVisitorToday}
          timeSeriesPageView={pageView}
          topCountriesArray={topCountriesArray}
        />
      </div>
    </div>
  );
}
