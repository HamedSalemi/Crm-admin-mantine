"use client";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CustomerPage from "@/app/customers/customerPage";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [activePage, setActivePage] = useState("home");

  return (
    <div style={{ direction: "rtl" }}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 240,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Header opened={opened} toggleSidebar={toggle} />
        </AppShell.Header>

        <AppShell.Navbar p="md">
          {/* 👇 اینجا مشکل حل شد */}
     <Sidebar
  onSelect={setActivePage}
  closeSidebar={close}
  activePage={activePage}
/>
        </AppShell.Navbar>

        <AppShell.Main>
          {activePage === "home" && children}
          {activePage === "customers-list" && <CustomerPage />}
          {activePage === "customers-add" && <h1>افزودن مشتری</h1>}
          {activePage === "users-list" && <h1>لیست کاربران</h1>}
          {activePage === "users-add" && <h1>افزودن کاربر</h1>}
          {activePage === "settings" && <h1>تنظیمات</h1>}
        </AppShell.Main>
      </AppShell>
    </div>
  );
}
