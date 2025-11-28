// app/page.tsx
import DashboardLayout from "../components/DashboardLayout";
import { Card, Text } from "@mantine/core";

export default function Page() {
  return (
    <DashboardLayout>
      <Card withBorder shadow="sm" radius="md">
        <Text fw={700} mb="sm">داشبورد</Text>
        <Text c="dimmed">این محتوای اصلی داخل Layout نمایش داده می‌شود.</Text>
      </Card>
    </DashboardLayout>
  );
}
