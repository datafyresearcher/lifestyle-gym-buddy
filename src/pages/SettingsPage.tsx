import { useState, useRef } from "react";
import PageContainer from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Users, Building2, Building, Settings, Shield, Lock, ClipboardCheck, Plus, Pencil, Trash2, Search, Camera, Upload, X, User, Phone, Eye, EyeOff, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// ─── User Management ───
function UserManagement() {
  const users = [
    { id: 1, name: "Admin User", email: "admin@lifestylereset.com", role: "Admin", status: "Active", lastLogin: "2026-03-08" },
    { id: 2, name: "John Manager", email: "john@lifestylereset.com", role: "Manager", status: "Active", lastLogin: "2026-03-07" },
    { id: 3, name: "Sara Trainer", email: "sara@lifestylereset.com", role: "Trainer", status: "Active", lastLogin: "2026-03-06" },
    { id: 4, name: "Ali Receptionist", email: "ali@lifestylereset.com", role: "Receptionist", status: "Inactive", lastLogin: "2026-02-20" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-9" />
        </div>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Add User</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell><Badge variant="secondary">{u.role}</Badge></TableCell>
                  <TableCell><Badge variant={u.status === "Active" ? "default" : "destructive"}>{u.status}</Badge></TableCell>
                  <TableCell>{u.lastLogin}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon"><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Branch Management ───
function BranchManagement() {
  const branches = [
    { id: 1, name: "Main Branch", address: "123 Fitness St, Karachi", phone: "+92-300-1234567", manager: "John Manager", status: "Active" },
    { id: 2, name: "North Branch", address: "456 Health Ave, Lahore", phone: "+92-301-7654321", manager: "Sara Trainer", status: "Active" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Branches</h3>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Add Branch</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {branches.map((b) => (
          <Card key={b.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{b.name}</CardTitle>
                <Badge>{b.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              <p><span className="font-medium text-foreground">Address:</span> {b.address}</p>
              <p><span className="font-medium text-foreground">Phone:</span> {b.phone}</p>
              <p><span className="font-medium text-foreground">Manager:</span> {b.manager}</p>
              <div className="flex gap-2 pt-3">
                <Button variant="outline" size="sm"><Pencil className="w-3 h-3 mr-1" /> Edit</Button>
                <Button variant="outline" size="sm" className="text-destructive"><Trash2 className="w-3 h-3 mr-1" /> Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Company Management ───
function CompanyManagement() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="text-base">Company Information</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input defaultValue="Lifestyle Reset Gym" />
          </div>
          <div className="space-y-2">
            <Label>Registration Number</Label>
            <Input defaultValue="REG-2024-001" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue="info@lifestylereset.com" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue="+92-304-2451070" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Address</Label>
            <Input defaultValue="123 Fitness Street, Karachi, Pakistan" />
          </div>
          <div className="space-y-2">
            <Label>Tax ID / NTN</Label>
            <Input defaultValue="1234567-8" />
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select defaultValue="PKR">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="PKR">PKR - Pakistani Rupee</SelectItem>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="AED">AED - UAE Dirham</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}

// ─── Global Settings ───
function GlobalSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="text-base">General</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground text-sm">Enable Notifications</p>
              <p className="text-xs text-muted-foreground">Send email and SMS notifications</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground text-sm">Auto-generate Member ID</p>
              <p className="text-xs text-muted-foreground">Automatically assign membership numbers</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground text-sm">Allow Guest Check-in</p>
              <p className="text-xs text-muted-foreground">Enable visitors to check in without membership</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground text-sm">Maintenance Mode</p>
              <p className="text-xs text-muted-foreground">Temporarily disable member access</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Business Hours</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Opening Time</Label>
            <Input type="time" defaultValue="06:00" />
          </div>
          <div className="space-y-2">
            <Label>Closing Time</Label>
            <Input type="time" defaultValue="23:00" />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  );
}

// ─── Roles Management ───
function RolesManagement() {
  const roles = [
    { id: 1, name: "Admin", users: 1, permissions: "Full Access" },
    { id: 2, name: "Manager", users: 2, permissions: "Members, Reports, Sales" },
    { id: 3, name: "Trainer", users: 5, permissions: "Members, Attendance, Training" },
    { id: 4, name: "Receptionist", users: 3, permissions: "Members, Visitors, Attendance" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Roles</h3>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Add Role</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Users Assigned</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell><Badge variant="secondary">{r.users}</Badge></TableCell>
                  <TableCell className="text-muted-foreground text-sm">{r.permissions}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon"><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Permissions Management ───
function PermissionsManagement() {
  const modules = ["Dashboard", "Members", "Visitors", "Enquiries", "Attendance", "Reports", "Sales", "Purchasing", "Products", "Settings"];
  const permissions = ["View", "Create", "Edit", "Delete"];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Permission Matrix</h3>
        <Select defaultValue="Admin">
          <SelectTrigger className="w-48"><SelectValue placeholder="Select Role" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
            <SelectItem value="Trainer">Trainer</SelectItem>
            <SelectItem value="Receptionist">Receptionist</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                {permissions.map((p) => <TableHead key={p} className="text-center">{p}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {modules.map((m) => (
                <TableRow key={m}>
                  <TableCell className="font-medium">{m}</TableCell>
                  {permissions.map((p) => (
                    <TableCell key={p} className="text-center">
                      <Switch defaultChecked={m === "Dashboard" || p === "View"} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button>Save Permissions</Button>
      </div>
    </div>
  );
}

// ─── Attendance Management ───
function AttendanceManagement() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="text-base">Attendance Settings</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground text-sm">Biometric Check-in</p>
              <p className="text-xs text-muted-foreground">Enable fingerprint or face recognition</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground text-sm">QR Code Check-in</p>
              <p className="text-xs text-muted-foreground">Allow members to scan QR code at entry</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground text-sm">Auto Check-out</p>
              <p className="text-xs text-muted-foreground">Automatically mark checkout after hours</p>
            </div>
            <Switch />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Auto Check-out After (hours)</Label>
              <Input type="number" defaultValue="3" />
            </div>
            <div className="space-y-2">
              <Label>Grace Period (minutes)</Label>
              <Input type="number" defaultValue="15" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground text-sm">Send Late Arrival Alerts</p>
              <p className="text-xs text-muted-foreground">Notify managers of staff late arrivals</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  );
}

// ─── Tabs config ───
const settingsTabs = [
  { value: "users", label: "User Management", icon: Users, component: UserManagement },
  { value: "branches", label: "Branch Management", icon: Building2, component: BranchManagement },
  { value: "company", label: "Company Management", icon: Building, component: CompanyManagement },
  { value: "global", label: "Global Settings", icon: Settings, component: GlobalSettings },
  { value: "roles", label: "Roles Management", icon: Shield, component: RolesManagement },
  { value: "permissions", label: "Permissions Management", icon: Lock, component: PermissionsManagement },
  { value: "attendance", label: "Attendance Management", icon: ClipboardCheck, component: AttendanceManagement },
];

export default function SettingsPage() {
  return (
    <PageContainer title="Settings" breadcrumbs={[{ label: "Settings" }]}>
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1">
          {settingsTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-1.5 text-xs sm:text-sm">
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {settingsTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <tab.component />
          </TabsContent>
        ))}
      </Tabs>
    </PageContainer>
  );
}
