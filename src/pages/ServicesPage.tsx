import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useMemo } from "react";

interface Trainer {
  code: string;
  name: string;
  phone: string;
  email: string;
  subscriptions: number;
  sessions: number;
  sale: number;
  trainerShare: number;
}

interface Service {
  id: string;
  name: string;
  type: "trainingService" | "selfService";
  trainers: Trainer[];
  settings: {
    trainerCanReschedule: boolean;
    reschedulePast: boolean;
    rescheduleFuture: boolean;
    markPast: boolean;
    markFuture: boolean;
  };
}

const sampleTrainers: Trainer[] = [
  { code: "25002", name: "Trainer", phone: "+923056478517", email: "trainer@demogymf11.com", subscriptions: 0, sessions: 2, sale: 0, trainerShare: 0 },
  { code: "25068", name: "Wasi Ahmed", phone: "+923452577733", email: "asaedd@demogymf11.com", subscriptions: 0, sessions: 0, sale: 0, trainerShare: 0 },
  { code: "25107", name: "Ali khan", phone: "+923333333333", email: "ali@demogymf11.com", subscriptions: 0, sessions: 12, sale: 0, trainerShare: 0 },
  { code: "25108", name: "dummy trainer", phone: "+923333333333", email: "trainerr@demogymf11.com", subscriptions: 0, sessions: 4, sale: 0, trainerShare: 0 },
  { code: "25109", name: "zia jaan", phone: "+923562487545", email: "zia@demogymf11.com", subscriptions: 0, sessions: 0, sale: 0, trainerShare: 0 },
  { code: "25110", name: "adeel", phone: "+923433443245", email: "adeel@demogymf11.com", subscriptions: 0, sessions: 0, sale: 0, trainerShare: 0 },
];

const initialServices: Service[] = [
  { id: "1", name: "training service", type: "trainingService", trainers: sampleTrainers, settings: { trainerCanReschedule: true, reschedulePast: true, rescheduleFuture: true, markPast: true, markFuture: true } },
  { id: "2", name: "Test Service", type: "trainingService", trainers: sampleTrainers.slice(0, 3), settings: { trainerCanReschedule: true, reschedulePast: true, rescheduleFuture: true, markPast: true, markFuture: true } },
  { id: "3", name: "Gold", type: "trainingService", trainers: sampleTrainers.slice(0, 2), settings: { trainerCanReschedule: true, reschedulePast: true, rescheduleFuture: true, markPast: true, markFuture: true } },
  { id: "4", name: "Platinum", type: "trainingService", trainers: sampleTrainers.slice(2, 5), settings: { trainerCanReschedule: true, reschedulePast: true, rescheduleFuture: true, markPast: true, markFuture: true } },
  { id: "5", name: "gold", type: "selfService", trainers: [], settings: { trainerCanReschedule: true, reschedulePast: true, rescheduleFuture: true, markPast: true, markFuture: true } },
  { id: "6", name: "gold", type: "trainingService", trainers: sampleTrainers.slice(0, 4), settings: { trainerCanReschedule: true, reschedulePast: true, rescheduleFuture: true, markPast: true, markFuture: true } },
  { id: "7", name: "gold", type: "selfService", trainers: [], settings: { trainerCanReschedule: true, reschedulePast: true, rescheduleFuture: true, markPast: true, markFuture: true } },
  { id: "8", name: "gold", type: "trainingService", trainers: sampleTrainers.slice(1, 3), settings: { trainerCanReschedule: true, reschedulePast: true, rescheduleFuture: true, markPast: true, markFuture: true } },
  { id: "9", name: "gold", type: "selfService", trainers: [], settings: { trainerCanReschedule: true, reschedulePast: true, rescheduleFuture: true, markPast: true, markFuture: true } },
  { id: "10", name: "self runing trademil", type: "selfService", trainers: [], settings: { trainerCanReschedule: true, reschedulePast: true, rescheduleFuture: true, markPast: true, markFuture: true } },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function ServiceCalendar({ trainers }: { trainers: Trainer[] }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1));
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

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
        week.push({ date: new Date(current), isCurrentMonth: current.getMonth() === month });
        current.setDate(current.getDate() + 1);
      }
      weeks.push(week);
      if (current > lastDay && current.getDay() === 0) break;
    }
    return weeks;
  }, [year, month]);

  // Generate trainer sessions for the first week of the month
  const getTrainersForDate = (date: Date) => {
    if (date.getMonth() !== month || date.getDate() > 7) return [];
    const dow = date.getDay();
    // Show trainers on weekdays, fewer on weekends
    if (dow === 0 || dow === 6) return trainers.slice(0, Math.min(2, trainers.length));
    return trainers.slice(0, Math.min(3, trainers.length));
  };

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-xl font-heading font-bold">{monthName}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>today</Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-border">
              {DAYS.map((d) => (
                <th key={d} className="px-1 py-2 text-center text-sm font-semibold text-muted-foreground w-[14.28%]">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendarWeeks.map((week, wi) => (
              <tr key={wi} className="border-b border-border last:border-b-0">
                {week.map((day, di) => {
                  const dayTrainers = getTrainersForDate(day.date);
                  const isToday = day.date.toDateString() === new Date().toDateString();
                  return (
                    <td key={di} className={`align-top p-1 h-24 border-r border-border last:border-r-0 ${!day.isCurrentMonth ? "bg-muted/30" : isToday ? "bg-warning/10" : ""}`}>
                      <div className={`text-right text-xs px-1 mb-1 ${!day.isCurrentMonth ? "text-muted-foreground/40" : day.date.getDay() === 6 ? "text-destructive font-semibold" : "text-foreground"}`}>
                        {day.date.getDate()}
                      </div>
                      <div className="space-y-0.5">
                        {dayTrainers.map((t, ti) => (
                          <div key={ti} className="w-full text-left text-[11px] px-1.5 py-0.5 rounded truncate bg-muted-foreground/60 text-white flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-info shrink-0" />
                            <span className="truncate">{t.name} ({t.sessions})</span>
                          </div>
                        ))}
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
  );
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceType, setNewServiceType] = useState<"trainingService" | "selfService">("trainingService");

  const handleAddService = () => {
    if (!newServiceName.trim()) return;
    const newService: Service = {
      id: String(Date.now()),
      name: newServiceName,
      type: newServiceType,
      trainers: [],
      settings: { trainerCanReschedule: true, reschedulePast: true, rescheduleFuture: true, markPast: true, markFuture: true },
    };
    setServices((prev) => [...prev, newService]);
    setNewServiceName("");
    setNewServiceType("trainingService");
    setAddDialogOpen(false);
  };

  const handleRemoveTrainer = (trainerCode: string) => {
    if (!selectedService) return;
    setSelectedService({
      ...selectedService,
      trainers: selectedService.trainers.filter((t) => t.code !== trainerCode),
    });
    setServices((prev) =>
      prev.map((s) =>
        s.id === selectedService.id ? { ...s, trainers: s.trainers.filter((t) => t.code !== trainerCode) } : s
      )
    );
  };

  const handleSettingChange = (key: keyof Service["settings"], value: boolean) => {
    if (!selectedService) return;
    const updated = { ...selectedService, settings: { ...selectedService.settings, [key]: value } };
    setSelectedService(updated);
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  // Services listing
  if (!selectedService) {
    return (
      <PageContainer title="Services" breadcrumbs={[{ label: "Services Listing" }]}>
        <div className="flex justify-end mb-6">
          <Button onClick={() => setAddDialogOpen(true)} className="bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/90 text-white">
            <Plus className="w-3 h-3 mr-1" /> Add Service
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="bg-muted rounded-lg p-6 hover:shadow-md transition-shadow text-left"
            >
              <h3 className="font-heading font-bold text-lg">{service.name}</h3>
              <p className="text-sm text-muted-foreground">{service.type}</p>
            </button>
          ))}
        </div>

        {/* Add Service Dialog */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading">Add Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Service Name</Label>
                <Input value={newServiceName} onChange={(e) => setNewServiceName(e.target.value)} placeholder="Enter service name" className="mt-1" />
              </div>
              <div>
                <Label>Service Type</Label>
                <Select value={newServiceType} onValueChange={(v) => setNewServiceType(v as "trainingService" | "selfService")}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trainingService">Training Service</SelectItem>
                    <SelectItem value="selfService">Self Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddService}>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageContainer>
    );
  }

  // Service detail view with tabs
  const totalSessions = selectedService.trainers.reduce((sum, t) => sum + t.sessions, 0);

  const statCards = [
    { label: "Available Trainers", value: selectedService.trainers.length, variant: "stat-card-dark" },
    { label: "Subscriptions Sold", value: selectedService.trainers.reduce((s, t) => s + t.subscriptions, 0), variant: "stat-card-success" },
    { label: "Total Subscriber", value: 0, variant: "stat-card-info" },
    { label: "Total Subscription Fee Collected", value: 0, variant: "stat-card-dark" },
    { label: "Sessions Sold", value: totalSessions, variant: "stat-card-warning" },
    { label: "Sessions Conducted", value: Math.floor(totalSessions * 0.1), variant: "stat-card-purple" },
    { label: "Sessions member No-Show", value: 0, variant: "stat-card-teal" },
    { label: "Sessions To Be Conducted", value: Math.ceil(totalSessions * 0.9), variant: "stat-card-danger" },
  ];

  return (
    <PageContainer title="" breadcrumbs={[{ label: "Services Listing" }, { label: selectedService.name }]}>
      <div className="mb-4">
        <Button variant="outline" size="sm" onClick={() => setSelectedService(null)}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Services
        </Button>
      </div>
      {/* Back navigation handled via breadcrumb click */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start h-auto p-0 mb-6">
          {["Details", "Trainers", "Calendar", "ACT Setting", "General Settings", "Report"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase().replace(/\s/g, "-")}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {statCards.map((card, i) => (
              <div key={i} className={`stat-card ${card.variant} text-center`}>
                <p className="text-[10px] leading-tight mb-2 opacity-80">{card.label}</p>
                <p className="text-2xl font-heading font-bold">{card.value}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-3">Trainer Performance</h3>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Trainer Code</th>
                    <th>Name</th>
                    <th>Subscriptions</th>
                    <th>Sessions</th>
                    <th>Sale</th>
                    <th>Trainer Share</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedService.trainers.map((t) => (
                    <tr key={t.code}>
                      <td>{t.code}</td>
                      <td className="text-primary font-medium">{t.name}</td>
                      <td>{t.subscriptions}</td>
                      <td>{t.sessions}</td>
                      <td className="text-[hsl(var(--success))]">{t.sale}</td>
                      <td>{t.trainerShare}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedService.trainers.length > 0 && (
                <div className="pagination-bar mt-0 text-sm">
                  <span>⏮</span> <span>◀</span> <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> <span>▶</span> <span>⏭</span>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Trainers Tab */}
        <TabsContent value="trainers">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User Code</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedService.trainers.map((t) => (
                  <tr key={t.code}>
                    <td>{t.code}</td>
                    <td className="text-primary font-medium">{t.name}</td>
                    <td>{t.phone}</td>
                    <td>{t.email}</td>
                    <td>
                      <Button variant="destructive" size="sm" onClick={() => handleRemoveTrainer(t.code)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedService.trainers.length > 0 && (
              <div className="pagination-bar mt-0 text-sm">
                <span>⏮</span> <span>◀</span> <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> <span>▶</span> <span>⏭</span>
              </div>
            )}
            {selectedService.trainers.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No trainers assigned to this service.</p>
            )}
          </div>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar">
          <ServiceCalendar trainers={selectedService.trainers} />
        </TabsContent>

        {/* ACT Setting Tab */}
        <TabsContent value="act-setting">
          <div className="border border-border rounded-lg min-h-[400px] p-6">
            <p className="text-muted-foreground text-center py-20">ACT Settings will appear here.</p>
          </div>
        </TabsContent>

        {/* General Settings Tab */}
        <TabsContent value="general-settings">
          <div className="border border-border rounded-lg p-6 space-y-6">
            <div>
              <h3 className="font-heading font-bold mb-4">Reschedule Permissions Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox checked={selectedService.settings.trainerCanReschedule} onCheckedChange={(v) => handleSettingChange("trainerCanReschedule", !!v)} />
                  <span className="text-sm">Trainers can reschedule his/her training sessions.</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Checkbox checked={selectedService.settings.reschedulePast} onCheckedChange={(v) => handleSettingChange("reschedulePast", !!v)} />
                    <span className="text-sm">Reschedule past training sessions.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox checked={selectedService.settings.rescheduleFuture} onCheckedChange={(v) => handleSettingChange("rescheduleFuture", !!v)} />
                    <span className="text-sm">Reschedule future training sessions.</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-heading font-bold mb-4">Attendance Permissions Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox checked={selectedService.settings.markPast} onCheckedChange={(v) => handleSettingChange("markPast", !!v)} />
                  <span className="text-sm">Trainers can mark past training sessions.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={selectedService.settings.markFuture} onCheckedChange={(v) => handleSettingChange("markFuture", !!v)} />
                  <span className="text-sm">Trainers can mark future training sessions.</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Report Tab */}
        <TabsContent value="report">
          <div className="border border-border rounded-lg min-h-[400px] p-6">
            <p className="text-muted-foreground text-center py-20">Reports will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
