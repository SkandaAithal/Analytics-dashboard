"use-client";
import ReactCountryFlag from "react-country-flag";
import { analytics } from "@/utils/analytics";
import { BarChart, Card } from "@tremor/react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
interface AnalyticsDashBoardProps {
  avgVisitorPerday: string;
  amtVisitorToday: number;
  timeSeriesPageView: Awaited<ReturnType<typeof analytics.retrievedays>>;
  topCountriesArray: [string, number][];
}

const Badge = ({ percentage }: { percentage: number }) => {
  const isPositive = percentage > 0;
  const isNeutral = percentage === 0;
  const isNegative = percentage < 0;

  if (isNaN(percentage)) return null;
  const positiveClassName = " bg-green-900/25 text-green-400 ring-green-400/25";
  const negativeClassName = "bg-zinc-900/25 text-zinc-400 ring-zinc-400/25";
  const neutralClassName = "bg-red-900/25 text-red-400 ring-red-400/25";
  return (
    <span
      className={`inline-flex gap-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        isPositive
          ? positiveClassName
          : isNeutral
          ? neutralClassName
          : negativeClassName
      }`}
    >
      {isPositive && <ArrowUpRight className=" h-3 w-3" />}
      {isNeutral && <ArrowRight className=" h-3 w-3" />}
      {isNegative && (
        <ArrowDownRight
          className=" h-3
       w-3"
        />
      )}
      {percentage.toFixed(0)}%
    </span>
  );
};
export default function AnalyticsDashBoard({
  avgVisitorPerday,
  amtVisitorToday,
  timeSeriesPageView,
  topCountriesArray,
}: AnalyticsDashBoardProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className=" w-full mx-auto max-w-xs">
          <p className=" text-dark-tremor-content ">Avg. Visitors / day</p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {avgVisitorPerday}
          </p>
        </Card>
        <Card className=" w-full mx-auto max-w-xs">
          <p className=" text-dark-tremor-content ">
            {" "}
            Visitors Today{" "}
            <Badge
              percentage={
                (amtVisitorToday / Number(avgVisitorPerday) - 1) * 100
              }
            />
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {amtVisitorToday}
          </p>
        </Card>
      </div>
      <Card className="flex flex-col sm:grid grid-cols-4 gap-6">
        <h2 className=" w-full text-dark-tremor-content-strong text-center sm:text-left font-semibold text-xl ">
          This weeks top visitors
        </h2>

        <div className=" col-span-3 flex items-center justify-between flex-wrap gap-8">
          {topCountriesArray?.map(([countryCode, number]) => {
            return (
              <div
                key={countryCode}
                className=" flex items-center gap-3 text-dark-tremor-background-emphasis "
              >
                <p className=" hidden sm:block text-tremor-content">
                  {countryCode}
                </p>
                <ReactCountryFlag
                  className="text-5xl sm:tex3xl"
                  svg
                  countryCode={countryCode}
                />
                <p className="text-tremor-content sm:text-dark-tremor-content-strong">
                  {number}
                </p>
              </div>
            );
          })}
        </div>
      </Card>
      <Card>
        {timeSeriesPageView ? (
          <BarChart
            allowDecimals={false}
            showAnimation
            data={timeSeriesPageView.map((day) => ({
              name: day.date,
              Visitors: day.events.reduce((acc, curr) => {
                return acc + Object.values(curr)[0]!;
              }, 0),
            }))}
            categories={["Visitors"]}
            index="name"
          />
        ) : null}
      </Card>
    </div>
  );
}
