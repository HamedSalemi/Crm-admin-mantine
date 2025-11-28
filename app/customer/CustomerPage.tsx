// app/customers/page.tsx

"use client";

import { useEffect, useState } from "react";
import {
  Table,
  Pagination,
  Select,
  Button,
  Group,
  Card,
  ActionIcon,
  Text,
  Flex,
  Divider,
  Box,
} from "@mantine/core";
import { CustomerService } from "@/services/UserService";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";

interface Customer {
  id: number;
  fullName: string;
  mobile: string;
  address: string;
}

interface CustomerResponse {
  items: Customer[];
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
  firstIndex: number;
  lastIndex: number;
}

export default function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const fetchCustomers = (pageNumber: number, size: number) => {
    CustomerService.list({ page: pageNumber, pageSize: size }).then((res) => {
      const response: CustomerResponse = res.data.data;
      setCustomers(response.items);
      setPage(response.page);
      setPageSize(response.pageSize);
      setTotal(response.total);
      setPageCount(response.pageCount);
    });
  };

  useEffect(() => {
    fetchCustomers(page, pageSize);
  }, [page, pageSize]);

  const handleEdit = (id: number) => {
    console.log("ویرایش مشتری:", id);
  };

  const handleDelete = (id: number) => {
    console.log("حذف مشتری:", id);
  };

  const handleAdd = () => {
    console.log("افزودن مشتری جدید");
  };

  return (
    <Card shadow="md" radius="md" withBorder p="lg">
      {/* هدر صفحه */}
      <Flex justify="space-between" align="center" mb="md">
        <Text fw={700} size="lg">لیست مشتریان</Text>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={handleAdd}
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
        >
          افزودن مشتری
        </Button>
      </Flex>

      <Divider mb="md" />

      {/* جدول مشتریان */}
<Table
  striped
  highlightOnHover
  withTableBorder
  withColumnBorders
  style={{ direction: "rtl" }}
>
  <thead>
    <tr>
      <th style={{ width: 60, textAlign: "center" }}>شناسه</th>
      <th style={{ width: 180, textAlign: "right" }}>نام</th>
      <th style={{ width: 160, textAlign: "right" }}>موبایل</th>
      <th style={{ width: 240, textAlign: "right" }}>آدرس</th>
      <th style={{ width: 120, textAlign: "center" }}>عملیات</th>
    </tr>
  </thead>

  <tbody>
    {customers.map((c) => (
      <tr key={c.id}>
        <td style={{ textAlign: "center" }}>{c.id}</td>
        <td style={{ textAlign: "right" }}>{c.fullName}</td>
        <td style={{ textAlign: "right" }}>{c.mobile}</td>
        <td style={{ textAlign: "right" }}>{c.address ?? "-"}</td>
        <td>
          <Group justify="center" gap="xs">
            <ActionIcon variant="subtle" color="blue">
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="red">
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    ))}
  </tbody>
</Table>



      {/* کنترل‌های پایین */}
      <Flex justify="space-between" align="center" mt="lg">
        <Select
          label="تعداد رکورد در هر صفحه"
          value={String(pageSize)}
          onChange={(value) => setPageSize(Number(value))}
          data={["5", "10", "20", "50"]}
          w={160}
        />

        <Box>
          <Pagination value={page} onChange={setPage} total={pageCount} />
          <Text size="sm" c="dimmed" mt="xs" ta="center">
            نمایش {customers.length > 0 ? `${customers[0].id} تا ${customers[customers.length - 1].id}` : "0"} از {total} رکورد
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}
