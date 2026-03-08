import { createContext, useContext, useState, ReactNode } from "react";

export interface Enquiry {
  name: string;
  mobile: string;
  enquiryDate: string;
  status: string;
  email: string;
}

const initialEnquiries: Enquiry[] = [
  { name: "Ali khan", mobile: "+923335855855", enquiryDate: "Mar 7, 2026, 5:10:19 PM", status: "Contacted", email: "---" },
  { name: "Shehzad Khan", mobile: "3354545892", enquiryDate: "Mar 3, 2026, 1:26:22 PM", status: "Contacted", email: "---" },
  { name: "Hussain", mobile: "3354626237", enquiryDate: "Mar 3, 2026, 1:05:26 PM", status: "Contacted", email: "---" },
  { name: "Alii", mobile: "+923558558555", enquiryDate: "Feb 17, 2026, 5:30:19 PM", status: "Contacted", email: "---" },
  { name: "adeel", mobile: "+923333333333", enquiryDate: "Jan 8, 2026, 5:55:44 PM", status: "Contacted", email: "---" },
  { name: "shahana", mobile: "+92553637377", enquiryDate: "Jan 8, 2026, 2:16:58 PM", status: "Contacted", email: "---" },
  { name: "sana", mobile: "+92243566879", enquiryDate: "Dec 11, 2025, 5:25:37 PM", status: "Contacted", email: "---" },
  { name: "ahsan", mobile: "+92788888888", enquiryDate: "Dec 9, 2025, 11:13:59 AM", status: "Contacted", email: "---" },
  { name: "Ali Hamza", mobile: "+923432521212", enquiryDate: "Jul 25, 2025, 4:33:54 PM", status: "Contacted", email: "ali_hamza@gmail.com" },
  { name: "Sana Khan", mobile: "03437068981", enquiryDate: "Jul 25, 2025, 4:33:31 PM", status: "Contacted", email: "sanakhan@gmail.com" },
  { name: "Palwasha Khan", mobile: "+923338745216", enquiryDate: "Jul 16, 2025, 11:25:27 AM", status: "Contacted", email: "palwasha@gmail.com" },
];

interface EnquiriesContextType {
  enquiries: Enquiry[];
  addEnquiry: (enquiry: Enquiry) => void;
  updateEnquiry: (index: number, enquiry: Enquiry) => void;
  removeEnquiry: (index: number) => void;
}

const EnquiriesContext = createContext<EnquiriesContextType | undefined>(undefined);

export function EnquiriesProvider({ children }: { children: ReactNode }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);

  const addEnquiry = (enquiry: Enquiry) => {
    setEnquiries((prev) => [enquiry, ...prev]);
  };

  const updateEnquiry = (index: number, enquiry: Enquiry) => {
    setEnquiries((prev) => prev.map((e, i) => (i === index ? enquiry : e)));
  };

  const removeEnquiry = (index: number) => {
    setEnquiries((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <EnquiriesContext.Provider value={{ enquiries, addEnquiry, updateEnquiry, removeEnquiry }}>
      {children}
    </EnquiriesContext.Provider>
  );
}

export function useEnquiries() {
  const ctx = useContext(EnquiriesContext);
  if (!ctx) throw new Error("useEnquiries must be used within EnquiriesProvider");
  return ctx;
}
