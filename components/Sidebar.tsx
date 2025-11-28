"use client";

import { useState } from "react";
import { NavLink, ScrollArea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconHome,
  IconUsers,
  IconUserPlus,
  IconUserCog,
  IconSettings,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";

export default function Sidebar({
  onSelect,
  closeSidebar,
  activePage,
}: {
  onSelect: (page: string) => void;
  closeSidebar: () => void;
  activePage: string;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const handleClick = (page: string) => {
    onSelect(page);
    if (isMobile) closeSidebar(); // بستن سایدبار در موبایل
  };

  return (
    <ScrollArea h="100%" pr={10}>
      <NavLink
        label="داشبورد"
        active={activePage === "home"}
        leftSection={<IconHome size={18} />}
        onClick={() => handleClick("home")}
      />

      {/* زیرمنوی مشتریان */}
      <NavLink
        label="مشتریان"
        leftSection={<IconUsers size={18} />}
        rightSection={userMenuOpened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
        opened={userMenuOpened}
        onClick={() => setUserMenuOpened((o) => !o)}
      >
        <NavLink
          label="لیست مشتریان"
          active={activePage === "customers-list"}
          leftSection={<IconUsers size={16} />}
          onClick={() => handleClick("customers-list")}
        />
        <NavLink
          label="افزودن مشتری"
          active={activePage === "customers-add"}
          leftSection={<IconUserPlus size={16} />}
          onClick={() => handleClick("customers-add")}
        />
      </NavLink>

      {/* زیرمنوی کاربران */}
      <NavLink
        label="کاربران"
        leftSection={<IconUserCog size={18} />}
        opened={false}
      >
        <NavLink
          label="لیست کاربران"
          active={activePage === "users-list"}
          onClick={() => handleClick("users-list")}
        />
        <NavLink
          label="افزودن کاربر"
          active={activePage === "users-add"}
          onClick={() => handleClick("users-add")}
        />
      </NavLink>

      <NavLink
        label="تنظیمات"
        active={activePage === "settings"}
        leftSection={<IconSettings size={18} />}
        onClick={() => handleClick("settings")}
      />
    </ScrollArea>
  );
}
