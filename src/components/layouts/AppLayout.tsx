
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Calendar, Home, Settings, Heart, Folder, Star, User, List } from "lucide-react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary h-8 w-8 rounded-md flex items-center justify-center">
                <span className="font-bold text-white text-lg">S</span>
              </div>
              <h1 className="text-xl font-bold">StepUp</h1>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/" || location.pathname === "/dashboard"}
                  tooltip="Dashboard"
                >
                  <Link to="/">
                    <Home size={18} />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/goals"}
                  tooltip="Goals Setup"
                >
                  <Link to="/goals">
                    <List size={18} />
                    <span>Goals Setup</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/garden"}
                  tooltip="Growth Garden"
                >
                  <Link to="/garden">
                    <Heart size={18} />
                    <span>Growth Garden</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/rewards"}
                  tooltip="Rewards & Penalties"
                >
                  <Link to="/rewards">
                    <Star size={18} />
                    <span>Rewards & Penalties</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/profile"}
                  tooltip="Profile & Settings"
                >
                  <Link to="/profile">
                    <User size={18} />
                    <span>Profile & Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/help"}
                  tooltip="Burnout & Help"
                >
                  <Link to="/help">
                    <Heart size={18} />
                    <span>Burnout & Help</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/community"}
                  tooltip="Community"
                >
                  <Link to="/community">
                    <Folder size={18} />
                    <span>Community</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/calendar"}
                  tooltip="Calendar"
                >
                  <Link to="/calendar">
                    <Calendar size={18} />
                    <span>Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t">
            <div className="flex items-center gap-2">
              <div className="bg-pastel-purple h-8 w-8 rounded-full flex items-center justify-center">
                <User size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">User Name</p>
                <p className="text-xs text-muted-foreground">7 day streak! 🔥</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <main className="container py-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
