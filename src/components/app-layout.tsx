'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Wallet,
  Tags,
  Bot,
  Landmark,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/expenses', label: 'Expenses', icon: Wallet },
  { href: '/categories', label: 'Categories', icon: Tags },
  { href: '/ai-advisor', label: 'AI Advisor', icon: Bot },
  { href: '/settings', label: 'Settings', icon: Settings },
];

function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 rounded-lg"
          >
            <Landmark className="size-6 text-primary" />
            <span className="sr-only">BudgetWise</span>
          </Button>
          <div
            className={cn(
              'flex flex-col whitespace-nowrap transition-opacity duration-200',
              state === 'collapsed' && 'opacity-0'
            )}
          >
            <h2 className="font-headline text-lg font-semibold">BudgetWise</h2>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: item.label }}
              >
                <Link 
                  href={item.href}
                  className="focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
                >
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <SidebarTrigger />
      </SidebarFooter>
    </>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('sidebar_state='))
      ?.split('=')[1];
    if (cookieValue) {
      setOpen(cookieValue === 'true');
    }
  }, []);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar variant="sidebar" collapsible="icon">
        <AppSidebar />
      </Sidebar>
      <SidebarInset className="min-h-screen">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6 lg:justify-end">
          <SidebarTrigger className="md:hidden" />
          {/* Header content like user menu can go here */}
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
