import Stat from "../../Components/ui/Stat";
import Table from "../../Components/ui/Table";

const revenue = [
  { month: "Jan", value: 600 },
  { month: "Feb", value: 720 },
  { month: "Mar", value: 800 },
  { month: "Apr", value: 950 },
  { month: "May", value: 1100 },
  { month: "Jun", value: 1200 },
];

export default function Reports() {
  const total = revenue.reduce((s, r) => s + r.value, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold dark:text-zinc-100">Reports</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat
          title="MRR (June)"
          value={`$${revenue[revenue.length - 1].value}`}
          className="dark:text-zinc-100"
        />
        <Stat
          title="6-mo Revenue"
          value={`$${total}`}
          className="dark:text-zinc-100"
        />
        <Stat
          title="Active Lessons"
          value="50"
          className="dark:text-zinc-100"
        />
        <Stat
          title="Avg. Lesson Price"
          value="$18.5"
          className="dark:text-zinc-100"
        />
      </div>

      <section>
        <h2 className="font-semibold mb-3 dark:text-zinc-100">
          Revenue by Month
        </h2>
        <Table
          columns={["Month", "Revenue", "Progress"]}
          className="dark:text-zinc-100"
          rows={revenue.map((r) => [
            r.month,
            `$${r.value}`,
            <div
              key={r.month}
              className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div
                className="h-2 rounded-full bg-blue-600"
                style={{ width: `${(r.value / 1200) * 100}%` }}
              />
            </div>,
          ])}
        />
      </section>
    </div>
  );
}
