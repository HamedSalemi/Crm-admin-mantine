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
  Modal,
  TextInput,
  Loader,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { CustomerService } from "@/services/customerService";

interface Customer {
  id: number;
  fullName: string;
  mobile: string;
  address?: string;
  deleted?: string | null;
}

export default function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);

  // بررسی وضعیت شبکه
  useEffect(() => {
    const handleOffline = () => {
      notifications.show({
        title: "عدم اتصال به اینترنت",
        message: "شبکه شما قطع شده است. لطفا اتصال اینترنت خود را بررسی کنید.",
        color: "red",
      });
    };
    const handleOnline = () => {
      notifications.show({
        title: "اتصال برقرار شد",
        message: "شبکه شما دوباره متصل شد.",
        color: "green",
      });
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const fetchCustomers = async (pageNumber: number, size: number) => {
    setLoading(true);
    try {
      const res = await CustomerService.list({ page: pageNumber, pageSize: size });
      const response = res.data.data;
      const safeCustomers = response.items.map((c) => ({ ...c, address: c.address ?? "" }));
      setCustomers(safeCustomers);
      setPage(response.page);
      setTotal(response.total);
      setPageCount(response.pageCount);
    } catch (err) {
      console.error(err);
      notifications.show({
        title: "خطا در اتصال به سرور",
        message: "امکان دریافت داده‌ها از سرور وجود ندارد. لطفا وضعیت سرور یا اتصال اینترنت را بررسی کنید.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(page, pageSize);
  }, [page, pageSize]);

  const form = useForm({
    initialValues: { fullName: "", mobile: "", address: "" },
    validate: {
      fullName: (value) => (value.length < 3 ? "نام باید حداقل ۳ کاراکتر باشد" : null),
      mobile: (value) =>
        !/^\d{10,11}$/.test(value) ? "موبایل باید ۱۰ یا ۱۱ رقم باشد" : null,
    },
  });

  const handleAdd = () => {
    setEditingCustomer(null);
    form.reset();
    setModalOpened(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    form.setValues({
      fullName: customer.fullName,
      mobile: customer.mobile,
      address: customer.address ?? "",
    });
    setModalOpened(true);
  };

  const handleDelete = (id: number) => {
    modals.openConfirmModal({
      title: "تأیید حذف",
      centered: true,
      children: <Text>آیا مطمئن هستید که می‌خواهید این مشتری حذف شود؟</Text>,
      labels: { confirm: "حذف", cancel: "انصراف" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        try {
          await CustomerService.delete(id);
          fetchCustomers(page, pageSize);
          notifications.show({ title: "موفقیت", message: "مشتری حذف شد", color: "green" });
        } catch (err) {
          console.error(err);
          notifications.show({
            title: "خطا در اتصال به سرور",
            message: "امکان حذف مشتری وجود ندارد.",
            color: "red",
          });
        }
      },
    });
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (editingCustomer) {
        await CustomerService.update(editingCustomer.id, values);
        setModalOpened(false);
        fetchCustomers(page, pageSize);
        notifications.show({ title: "موفقیت", message: "مشتری به‌روزرسانی شد", color: "green" });
      } else {
        await CustomerService.create(values);
        setModalOpened(false);
        fetchCustomers(page, pageSize);
        form.reset();
        notifications.show({ title: "موفقیت", message: "مشتری ثبت شد", color: "green" });
      }
    } catch (err) {
      console.error(err);
      notifications.show({
        title: "خطا در اتصال به سرور",
        message: "امکان ثبت یا به‌روزرسانی مشتری وجود ندارد.",
        color: "red",
      });
    }
  };

  return (
    <Card shadow="md" radius="md" withBorder p="lg">
      <Flex justify="space-between" align="center" mb="md">
        <Text fw={700} size="lg">لیست مشتریان</Text>
        <Button leftSection={<IconPlus size={16} />} onClick={handleAdd} variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
          افزودن مشتری
        </Button>
      </Flex>

      <Divider mb="md" />

      {loading ? (
        <Center style={{ minHeight: 200 }}><Loader size="lg" variant="dots" /></Center>
      ) : (
        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          verticalSpacing="md"
          horizontalSpacing="md"
          style={{ direction: "rtl", borderRadius: 8, overflow: "hidden" }}
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
          <tbody style={{ borderTop: "1px solid #e9ecef" }}>
            {customers.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #e9ecef" }}>
                <td style={{ textAlign: "center" }}>{c.id}</td>
                <td style={{ textAlign: "right" }}>{c.fullName}</td>
                <td style={{ textAlign: "right" }}>{c.mobile}</td>
                <td style={{ textAlign: "right" }}>{c.address}</td>
                <td>
                  <Group justify="center" gap="xs">
                    <ActionIcon variant="subtle" color="blue" onClick={() => handleEdit(c)}>
                      <IconEdit size={18} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red" onClick={() => handleDelete(c.id)}>
                      <IconTrash size={18} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

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

      <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title={editingCustomer ? "ویرایش مشتری" : "افزودن مشتری جدید"} centered>
        <form onSubmit={form.onSubmit(handleSubmit)} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <TextInput label="نام کامل" placeholder="نام مشتری" {...form.getInputProps("fullName")} />
          <TextInput label="موبایل" placeholder="مثال: 09121234567" {...form.getInputProps("mobile")} />
          <TextInput label="آدرس" placeholder="آدرس مشتری" {...form.getInputProps("address")} />
          <Button type="submit" variant="gradient" gradient={{ from: "teal", to: "cyan" }}>
            {editingCustomer ? "به‌روزرسانی" : "ثبت مشتری"}
          </Button>
        </form>
      </Modal>
    </Card>
  );
}
