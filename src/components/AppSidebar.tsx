
import { Calendar, Home, BookOpen, Brain, Users, Settings, TrendingUp, Plus, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const mainNavItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Classes",
    url: "/classes",
    icon: BookOpen,
  },
];

const quickActions = [
  {
    title: "Create Class",
    url: "/classes",
    icon: Plus,
  },
  {
    title: "Study Progress",
    url: "/",
    icon: TrendingUp,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar className="border-r border-blue-100/60 bg-gradient-to-b from-blue-50/40 to-green-50/30 backdrop-blur-sm shadow-lg relative">
      {/* Middle Toggle Button - Always Visible */}
      <Button
        onClick={toggleSidebar}
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-50 w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-full shadow-lg flex items-center justify-center border-2 border-white hover:from-blue-600 hover:via-purple-600 hover:to-teal-600 transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        {state === "collapsed" ? (
          <Menu className="h-4 w-4 text-white" />
        ) : (
          <X className="h-4 w-4 text-white" />
        )}
      </Button>

      <SidebarHeader className="p-6">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="p-2 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              FlashLearn
            </span>
            <p className="text-xs text-gray-600 font-medium">ADHD-Optimized Learning</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2 group-data-[collapsible=icon]:hidden">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className={`group transition-all duration-200 rounded-lg ${
                      isActive(item.url) 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                        : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border hover:border-blue-200'
                    }`}
                  >
                    <Link to={item.url} className="flex items-center space-x-3 px-3 py-2">
                      <item.icon className={`h-5 w-5 transition-colors ${
                        isActive(item.url) 
                          ? 'text-white' 
                          : 'text-blue-600 group-hover:text-purple-600'
                      }`} />
                      <span className={`font-medium transition-colors group-data-[collapsible=icon]:hidden ${
                        isActive(item.url) 
                          ? 'text-white' 
                          : 'text-gray-700 group-hover:text-purple-700'
                      }`}>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4 bg-gradient-to-r from-blue-200 to-purple-200" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2 group-data-[collapsible=icon]:hidden">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className="group hover:bg-gradient-to-r hover:from-teal-50 hover:to-green-50 hover:border hover:border-teal-200 transition-all duration-200 rounded-lg"
                  >
                    <Link to={item.url} className="flex items-center space-x-3 px-3 py-2">
                      <item.icon className="h-4 w-4 text-teal-600 group-hover:text-green-600 transition-colors" />
                      <span className="text-sm text-gray-600 group-hover:text-green-700 transition-colors group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 via-purple-50 to-teal-50 border border-blue-200/50 shadow-sm">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
            <Users className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium text-gray-900 truncate">Student</p>
            <p className="text-xs text-teal-600 font-medium">Focus Mode</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
