import { useState } from "react";
import Button from "../../Components/ui/Button";
import Table from "../../Components/ui/Table";
import Alert from "../../Components/ui/Alert";
import { toast } from "react-toastify";

export default function Exams() {
  const [exams] = useState([
    {
      id: 1,
      title: "Math - Algebra I",
      duration: "30m",
      questions: 20,
      status: "available",
    },
    {
      id: 2,
      title: "Science - Biology Basics",
      duration: "45m",
      questions: 25,
      status: "available",
    },
    {
      id: 3,
      title: "English - Grammar",
      duration: "25m",
      questions: 18,
      status: "locked",
    },
  ]);

  const startExam = (exam) => {
    if (exam.status === "locked") {
      toast.error("This exam is locked.");
      return;
    }
    toast.success(`Starting "${exam.title}"`);
    // navigate(`/exams/${exam.id}`) — when you add exam detail routes
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold dark:text-zinc-100">Exams</h1>

      <Alert variant="info" title="Heads up">
        You can retry available exams anytime. Locked exams are restricted until
        you complete prerequisites.
      </Alert>

      <Table
        columns={["ID", "Title", "Duration", "Questions", "Status", "Actions"]}
        className="dark:text-zinc-100"
        rows={exams.map((e) => [
          `#${e.id}`,
          e.title,
          e.duration,
          e.questions,
          <span
            key={`s-${e.id}`}
            className={`dark:text-zinc-100 
              ${e.status === "locked" ? "text-red-600" : "text-green-600"}
            `}>
            {e.status}
          </span>,
          <div key={`a-${e.id}`} className="flex gap-2">
            <Button size="sm" variant="primary" onClick={() => startExam(e)}>
              Start
            </Button>
          </div>,
        ])}
      />
    </div>
  );
}
