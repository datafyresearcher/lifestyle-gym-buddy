import PageContainer from "@/components/PageContainer";
import { Plus } from "lucide-react";

const services = [
  { name: "Training Service", type: "trainingService" },
  { name: "Test Service", type: "trainingService" },
  { name: "Gold", type: "trainingService" },
  { name: "Platinum", type: "trainingService" },
  { name: "Gold", type: "selfService" },
  { name: "Gold", type: "trainingService" },
  { name: "Gold", type: "selfService" },
  { name: "Gold", type: "trainingService" },
  { name: "Gold", type: "selfService" },
  { name: "Self Running Treadmill", type: "selfService" },
];

export default function ServicesPage() {
  return (
    <PageContainer title="Services" breadcrumbs={[{ label: "Services Listing" }]}>
      <div className="flex justify-end mb-6">
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-medium flex items-center gap-2">
          <Plus className="w-3 h-3" /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {services.map((service, i) => (
          <div key={i} className="bg-muted rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="font-heading font-bold text-lg">{service.name}</h3>
            <p className="text-sm text-muted-foreground">{service.type}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
