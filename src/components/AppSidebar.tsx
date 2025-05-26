
import { Calendar, Home, BookOpen, Brain, Users, Settings, TrendingUp, Plus } from 'lucide-react';
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
} from '@/components/ui/sidebar';

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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar className="border-r border-gray-200/50 bg-white/50 backdrop-blur-sm">
      <SidebarHeader className="p-6">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FlashLearn
            </span>
            <p className="text-xs text-gray-500 font-medium">Smart Learning</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className="group hover:bg-blue-50 transition-all duration-200 rounded-lg"
                  >
                    <Link to={item.url} className="flex items-center space-x-3 px-3 py-2">
                      <item.icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                      <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 rounded-lg"
                  >
                    <Link to={item.url} className="flex items-center space-x-3 px-3 py-2">
                      <item.icon className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                      <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
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
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200/50">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Student</p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
