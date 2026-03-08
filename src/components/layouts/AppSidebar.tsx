"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import {
  Calendar,
  ChartArea,
  CircleUser,
  Dumbbell,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";

const AppSidebar = () => {
  const pathname = usePathname();
  const { signOut } = useAuth();

  const { UserProfile } = useAuth();
  const { data } = UserProfile;

  const user = data?.user;
  const projects = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Planner",
      url: "/planner",
      icon: Calendar,
    },
    {
      name: "Workout",
      url: "/workout",
      icon: Dumbbell,
    },
    {
      name: "Reports",
      url: "/reports",
      icon: ChartArea,
    },
    {
      name: "Profile",
      url: "/profile",
      icon: CircleUser,
    },
  ];
  const { toggleSidebar, open } = useSidebar();
  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarHeader className="min-h-15 flex justify-center">
        <div
          className={`flex w-full  ${open ? "justify-end" : "justify-center"}`}
        >
          <div
            className={`${open ? "flex" : "hidden"} items-center mr-auto gap-3 px-2`}
          >
            <strong className="border h-full p-2 bg-[#3579E5] rounded-md">
              <Dumbbell color="white" />
            </strong>
            <div className="flex flex-col text-2xl text-nowrap">
              <b>SCIFIT</b>
            </div>
          </div>
          {open ? (
            <X onClick={toggleSidebar} />
          ) : (
            <Menu onClick={toggleSidebar} />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-2 items-center p-3">
        <SidebarMenu className="flex items-center">
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <SidebarMenuButton
                key={idx}
                asChild
                isActive={pathname === project.url}
                className="data-[active=true]:bg-[#3579E5]/10 data-[active=true]:text-[#3579E5]"
              >
                <Link href={project.url} className="p-5">
                  <Icon />
                  <span>{project.name}</span>
                </Link>
              </SidebarMenuButton>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-black/10">
        <div className="flex gap-3 items-center w-full">
          <Avatar className="border">
            <AvatarImage src={user?.avatarUrl} alt={user?.fullName} />
            <AvatarFallback>
              {user?.fullName ? user.fullName[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex items-center justify-between w-full gap-3 overflow-hidden">
            <div className="flex flex-col min-w-0 flex-1">
              <h1 className="text-sm font-bold truncate">
                {user?.fullName?.split(" ")[0] || "Guest"}
              </h1>
              <p className="opacity-50 text-[10px] uppercase tracking-wider font-semibold">
                Beginner
              </p>
            </div>

            <Button
              onClick={signOut}
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 opacity-70 hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
