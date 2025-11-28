"use client";

import { Group, Text, Button, Burger } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

export default function Header({
  opened,
  toggleSidebar,
}: {
  opened: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <Group justify="space-between" px="md" h="100%">
      <Group>
        {/* دکمه همبرگری فقط در موبایل دیده شود */}
        <Burger
          opened={opened}
          onClick={toggleSidebar}
          hiddenFrom="sm"
          size="sm"
        />

        <Text fw={700}>پنل مدیریت</Text>
      </Group>

      <Button variant="light" color="red" leftSection={<IconLogout size={16} />}>
        خروج
      </Button>
    </Group>
  );
}
