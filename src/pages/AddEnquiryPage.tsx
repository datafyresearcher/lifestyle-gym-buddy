import PageContainer from "@/components/PageContainer";
import { useState } from "react";
import { ArrowLeft, Plus, Save, User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useEnquiries } from "@/context/EnquiriesContext";

export default function AddEnquiryPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addEnquiry } = useEnquiries();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [comments, setComments] = useState("");
  const [interestLevel, setInterestLevel] = useState("Low");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+92");
  const [mobile, setMobile] = useState("");
  const [street, setStreet] = useState("");
  const [expectedJoiningDate, setExpectedJoiningDate] = useState("");
  const [enquiryDate] = useState(new Date().toLocaleDateString("en-GB"));

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    if (!mobile.trim()) errs.mobile = "Please enter mobile number.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const now = new Date();
    const formattedDate = now.toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
    });
    addEnquiry({
      name: name.trim(),
      mobile: `${countryCode}${mobile.trim()}`,
      enquiryDate: formattedDate,
      status: "Contacted",
      email: email.trim() || "---",
    });
    toast({ title: "Enquiry saved", description: `Enquiry for ${name} has been saved.` });
    navigate("/enquiries");
  };

  const handleNewForm = () => {
    setName(""); setGender(""); setComments(""); setInterestLevel("Low");
    setEmail(""); setMobile(""); setStreet(""); setExpectedJoiningDate("");
    setErrors({});
  };

  return (
    <PageContainer title="Add New Enquiry" breadcrumbs={[{ label: "Enquiry Management" }, { label: "All Enquiries" }, { label: "Add New Enquiry" }]}>
      <div className="bg-sidebar text-sidebar-foreground rounded-lg p-3 mb-6 flex items-center gap-3">
        <button onClick={() => navigate("/enquiries")} className="bg-sidebar-accent text-sidebar-accent-foreground px-4 py-2 rounded text-sm flex items-center gap-2">
          <ArrowLeft className="w-3 h-3" /> Go Back
        </button>
        <button onClick={handleNewForm} className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm flex items-center gap-2">
          <Plus className="w-3 h-3" /> New(F2)
        </button>
        <button onClick={handleSave} className="bg-success text-success-foreground px-4 py-2 rounded text-sm flex items-center gap-2">
          <Save className="w-3 h-3" /> Save
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Enquiry Date</h3>
          <div className="relative mb-6">
            <input type="text" value={enquiryDate} readOnly className="search-input w-full" />
            <Calendar className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>

          <h3 className="text-lg font-semibold mb-4">Member Details</h3>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-muted-foreground" />
              <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="search-input w-full border-2 border-border focus:border-primary" />
            </div>
            {errors.name && <p className="text-destructive text-sm ml-6">{errors.name}</p>}
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-2">Gender</h4>
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="gender" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} className="w-4 h-4" /> Male
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="gender" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} className="w-4 h-4" /> Female
              </label>
            </div>
          </div>

          <div className="mb-6">
            <input placeholder="Comments" value={comments} onChange={(e) => setComments(e.target.value)} className="search-input w-full border-b border-border" />
          </div>

          <div className="flex items-center gap-4">
            <span className="font-medium">Interest level:</span>
            <Select value={interestLevel} onValueChange={setInterestLevel}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
          <div className="mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="search-input w-full" />
          </div>
          <div className="mb-1 flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="+92">Pak (+92)</SelectItem>
                <SelectItem value="+1">US (+1)</SelectItem>
                <SelectItem value="+44">UK (+44)</SelectItem>
                <SelectItem value="+971">UAE (+971)</SelectItem>
              </SelectContent>
            </Select>
            <input placeholder="Mobile *" value={mobile} onChange={(e) => setMobile(e.target.value)} className="search-input w-full" />
          </div>
          {errors.mobile && <p className="text-destructive text-sm ml-6 mb-4">{errors.mobile}</p>}
          <div className="mb-4 flex items-center gap-2 mt-4">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <input placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} className="search-input w-full" />
          </div>
          <div className="relative">
            <input type="date" value={expectedJoiningDate} onChange={(e) => setExpectedJoiningDate(e.target.value)} className="search-input w-full" />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
