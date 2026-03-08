import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TrainingSession {
  id: string;
  memberName: string;
  trainer: string;
  date: string; // YYYY-MM-DD
  status: "UNMARKED" | "PRESENT" | "ABSENT";
  performance: string;
  exerciseTypes: string[];
}

const PERFORMANCE_OPTIONS = [
  "Average Progress",
  "Committed",
  "Excellent Progress",
  "Good Progress",
  "Inconsistent Effort",
  "Needs Improvement",
];

const EXERCISE_TYPES = [
  "Arms",
  "Back",
  "Chest",
  "Core",
  "Legs",
  "Shoulders",
  "Cardio",
  "Stretching",
];

// Generate sample data
function generateSampleSessions(): TrainingSession[] {
  const members = [
    { name: "adeell", trainer: "Kashif Khan" },
    { name: "Ali", trainer: "Kashif Khan" },
    { name: "Raja Rehan", trainer: "Kashif Khan" },
    { name: "Uzair ali", trainer: "Kashif Khan" },
  ];

  const sessions: TrainingSession[] = [];
  const year = 2026;
  const month = 2; // March (0-indexed)

  members.forEach((member) => {
    for (let day = 1; day <= 31; day++) {
      const date = new Date(year, month, day);
      if (date.getMonth() !== month) continue;
      // Skip some days for variety
      if (member.name === "adeell" && day > 5) continue;
      if (member.name === "Ali" && day > 5) continue;
      if (member.name === "Raja Rehan" && day > 7) continue;

      sessions.push({
        id: `${member.name}-${day}`,
        memberName: member.name,
        trainer: member.trainer,
        date: `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        status: "UNMARKED",
        performance: "",
        exerciseTypes: [],
      });
    }
  });

  return sessions;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function TrainingSessionsPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1));
  const [sessions, setSessions] = useState<TrainingSession[]>(generateSampleSessions);
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reschedule, setReschedule] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarWeeks = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDow = firstDay.getDay();

    const weeks: { date: Date; isCurrentMonth: boolean }[][] = [];
    let current = new Date(firstDay);
    current.setDate(current.getDate() - startDow);

    while (current <= lastDay || current.getDay() !== 0) {
      const week: { date: Date; isCurrentMonth: boolean }[] = [];
      for (let i = 0; i < 7; i++) {
        week.push({
          date: new Date(current),
          isCurrentMonth: current.getMonth() === month,
        });
        current.setDate(current.getDate() + 1);
      }
      weeks.push(week);
      if (current > lastDay && current.getDay() === 0) break;
    }
    return weeks;
  }, [year, month]);

  const getSessionsForDate = (date: Date) => {
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return sessions.filter((s) => s.date === key);
  };

  const handleSessionClick = (session: TrainingSession) => {
    setSelectedSession({ ...session });
    setReschedule(false);
    setDialogOpen(true);
  };

  const handleMarkAttendance = (status: "PRESENT" | "ABSENT") => {
    if (!selectedSession) return;
    setSessions((prev) =>
      prev.map((s) =>
        s.id === selectedSession.id
          ? { ...s, status, performance: selectedSession.performance, exerciseTypes: selectedSession.exerciseTypes }
          : s
      )
    );
    setDialogOpen(false);
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PRESENT": return "bg-[hsl(var(--success))] text-white";
      case "ABSENT": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted-foreground/60 text-white";
    }
  };

  return (
    <PageContainer title="" breadcrumbs={[{ label: "Training Sessions" }]}>
      <div className="space-y-0">
        {/* Header bar */}
        <div className="page-header rounded-t-lg">
          <span className="text-sm font-semibold">Training Sessions</span>
        </div>

        <div className="border border-border rounded-b-lg bg-card overflow-hidden">
          {/* Month nav */}
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-xl font-heading font-bold">{monthName}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToday}>today</Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Calendar grid */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-border">
                  {DAYS.map((d) => (
                    <th key={d} className="px-1 py-2 text-center text-sm font-semibold text-muted-foreground w-[14.28%]">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calendarWeeks.map((week, wi) => (
                  <tr key={wi} className="border-b border-border last:border-b-0">
                    {week.map((day, di) => {
                      const daySessions = getSessionsForDate(day.date);
                      const isToday =
                        day.date.toDateString() === new Date().toDateString();
                      return (
                        <td
                          key={di}
                          className={`align-top p-1 h-24 border-r border-border last:border-r-0 ${
                            !day.isCurrentMonth ? "bg-muted/30" : isToday ? "bg-warning/10" : ""
                          }`}
                        >
                          <div className={`text-right text-xs px-1 mb-1 ${
                            !day.isCurrentMonth ? "text-muted-foreground/40" : 
                            day.date.getDay() === 6 ? "text-destructive font-semibold" : "text-foreground"
                          }`}>
                            {day.date.getDate()}
                          </div>
                          <div className="space-y-0.5">
                            {daySessions.slice(0, 4).map((session) => (
                              <button
                                key={session.id}
                                onClick={() => handleSessionClick(session)}
                                className={`w-full text-left text-[11px] px-1.5 py-0.5 rounded truncate flex items-center gap-1 hover:opacity-80 transition-opacity ${getStatusColor(session.status)}`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-info shrink-0" />
                                <span className="truncate">{session.memberName}</span>
                              </button>
                            ))}
                            {daySessions.length > 4 && (
                              <div className="text-[10px] text-muted-foreground px-1">
                                +{daySessions.length - 4} more
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Session Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Training Sessions</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Reschedule */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="reschedule"
                checked={reschedule}
                onCheckedChange={(v) => setReschedule(!!v)}
              />
              <label htmlFor="reschedule" className="text-sm font-medium">
                Reschedule
              </label>
            </div>

            {/* Member Name */}
            <div>
              <label className="text-sm text-muted-foreground">Member Name</label>
              <Input
                value={selectedSession?.memberName ?? ""}
                readOnly
                className="mt-1 bg-muted/30"
              />
            </div>

            {/* Trainer */}
            <div>
              <label className="text-sm text-muted-foreground">Trainer</label>
              <Input
                value={selectedSession?.trainer ?? ""}
                readOnly
                className="mt-1 bg-muted/30"
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm text-muted-foreground">Status</label>
              <Input
                value={selectedSession?.status ?? ""}
                readOnly
                className="mt-1 bg-muted/30"
              />
            </div>

            {/* Performance */}
            <div>
              <label className="text-sm text-muted-foreground">Performance:</label>
              <Select
                value={selectedSession?.performance || ""}
                onValueChange={(v) =>
                  setSelectedSession((prev) => prev ? { ...prev, performance: v } : prev)
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {PERFORMANCE_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Exercise Type */}
            <div>
              <label className="text-sm text-muted-foreground">Exercise Type:</label>
              <div className="mt-1 border border-input rounded-md p-2 max-h-40 overflow-y-auto space-y-2">
                {EXERCISE_TYPES.map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <Checkbox
                      id={`ex-${type}`}
                      checked={selectedSession?.exerciseTypes.includes(type) ?? false}
                      onCheckedChange={(checked) => {
                        setSelectedSession((prev) => {
                          if (!prev) return prev;
                          const types = checked
                            ? [...prev.exerciseTypes, type]
                            : prev.exerciseTypes.filter((t) => t !== type);
                          return { ...prev, exerciseTypes: types };
                        });
                      }}
                    />
                    <label htmlFor={`ex-${type}`} className="text-sm">{type}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1 bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/90 text-white"
                onClick={() => handleMarkAttendance("PRESENT")}
              >
                Present
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => handleMarkAttendance("ABSENT")}
              >
                Absent
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
