import Stat from "../../Components/ui/Stat";
import Table from "../../Components/ui/Table";
import AdminLessons from "./AdminLessons";
export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat title="Total Students" value="120" />
        <Stat title="Total Lessons" value="50" />
        <Stat title="Total Exams" value="30" />
        <Stat title="Revenue" value="$5000" />
      </div>
      <section>
        <AdminLessons/>
      </section>
    </div>
  );
}
