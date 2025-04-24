
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { Calendar, Home, Settings, Heart, Folder, Star, User, List, Edit } from "lucide-react";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon: Icon, label, isActive }: NavItemProps) => {
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={`w-full justify-start gap-2 mb-1 ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar 
        className="border-r border-border bg-background transition-all duration-300"
        style={{ width: isSidebarOpen ? '240px' : '80px' }}
      >
        <SidebarHeader className="p-4 flex items-center justify-between">
          <div className={`flex items-center gap-2 ${!isSidebarOpen && 'flex-col'}`}>
            <div className="bg-primary h-8 w-8 rounded-md flex items-center justify-center">
              <span className="font-bold text-white text-lg">S</span>
            </div>
            {isSidebarOpen && (
              <h1 className="text-xl font-bold">StepUp</h1>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            )}
          </Button>
        </SidebarHeader>
        
        <SidebarContent className="p-4">
          <nav className="space-y-1">
            <NavItem
              to="/"
              icon={Home}
              label="Dashboard"
              isActive={location.pathname === "/" || location.pathname === "/dashboard"}
            />
            <NavItem
              to="/goals"
              icon={List}
              label="Goals Setup"
              isActive={location.pathname === "/goals"}
            />
            <NavItem
              to="/garden"
              icon={Heart}
              label="Growth Garden"
              isActive={location.pathname === "/garden"}
            />
            <NavItem
              to="/rewards"
              icon={Star}
              label="Rewards & Penalties"
              isActive={location.pathname === "/rewards"}
            />
            <NavItem
              to="/profile"
              icon={User}
              label="Profile & Settings"
              isActive={location.pathname === "/profile"}
            />
            <NavItem
              to="/help"
              icon={Heart}
              label="Burnout & Help"
              isActive={location.pathname === "/help"}
            />
            <NavItem
              to="/community"
              icon={Folder}
              label="Community"
              isActive={location.pathname === "/community"}
            />
            <NavItem
              to="/calendar"
              icon={Calendar}
              label="Calendar"
              isActive={location.pathname === "/calendar"}
            />
          </nav>
        </SidebarContent>
        
        <SidebarFooter className="p-4 border-t">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="bg-pastel-purple h-8 w-8 rounded-full flex items-center justify-center">
                <User size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">User Name</p>
                <p className="text-xs text-muted-foreground">7 day streak! 🔥</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="bg-pastel-purple h-8 w-8 rounded-full flex items-center justify-center">
                <User size={18} className="text-primary" />
              </div>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="container py-6">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
