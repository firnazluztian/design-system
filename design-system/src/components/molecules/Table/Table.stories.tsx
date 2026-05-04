import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "./Table";
import type { TableVariant, TableColumn } from "./Table";
import { Button } from "../../atoms/Button";
import { Icon } from "../../atoms/Icons";
import { ErrorWrapper } from "../ErrorWrapper/ErrorWrapper";

const meta: Meta<typeof Table<User>> = {
  title: "Molecules/Table",
  component: Table,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

interface User {
  no: number;
  nama: string;
  email: string;
  nomorTelepon: string;
  jenisKelamin: string;
  kewarganegaraan: string;
  status: string;
  saldo: number;
  department?: string;
  position?: string;
  joinDate?: string;
  lastLogin?: string;
}

const sampleData: User[] = [
  {
    no: 1,
    nama: "Steve Jobs",
    email: "stevejobs@gmail.com",
    nomorTelepon: "081234567890",
    jenisKelamin: "Laki-laki",
    kewarganegaraan: "Indonesia",
    status: "Suspend",
    saldo: 1500000,
  },
  {
    no: 2,
    nama: "Bill Gates",
    email: "billgates@gmail.com",
    nomorTelepon: "081234567890",
    jenisKelamin: "Laki-laki",
    kewarganegaraan: "Indonesia",
    status: "Aktif",
    saldo: 2500000,
  },
  {
    no: 3,
    nama: "Kucing Persia",
    email: "kucingpersia@gmail.com",
    nomorTelepon: "081234567890",
    jenisKelamin: "Perempuan",
    kewarganegaraan: "Indonesia",
    status: "Aktif",
    saldo: 3500000,
  },
];

const schema: TableColumn<User>[] = [
  {
    name: "nama",
    label: "Nama",
    accessorKey: "nama",
    type: "string",
    sortable: true,
    align: "left",
    width: 200,
  },
  {
    name: "email",
    label: "Email",
    accessorKey: "email",
    type: "string",
    sortable: true,
    align: "left",
    width: 250,
  },
  {
    name: "nomorTelepon",
    label: "Nomor Telepon",
    accessorKey: "nomorTelepon",
    type: "string",
    align: "left",
    width: 150,
  },
  {
    name: "jenisKelamin",
    label: "Jenis Kelamin",
    accessorKey: "jenisKelamin",
    type: "string",
    align: "center",
    width: 120,
  },
  {
    name: "kewarganegaraan",
    label: "Kewarganegaraan",
    accessorKey: "kewarganegaraan",
    type: "string",
    align: "center",
    width: 140,
  },
  {
    name: "status",
    label: "Status",
    accessorKey: "status",
    type: "string",
    sortable: false,
    align: "center",
    width: 120,
  },
  {
    name: "saldo",
    label: "Saldo",
    accessorKey: "saldo",
    type: "number",
    sortable: true,
    align: "right",
    width: 150,
    render: (value: number) => <span>Rp {value.toLocaleString("id-ID")}</span>,
  },
];

export const Default: Story = {
  args: {
    schema,
    data: sampleData,
    showIndex: true,
    variant: "default",
  },
};

export const WithPagination: Story = {
  args: {
    schema,
    data: [
      {
        no: 1,
        nama: "Steve Jobs",
        email: "stevejobs@gmail.com",
        nomorTelepon: "081234567890",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "Indonesia",
        status: "Suspend",
        saldo: 1500000,
      },
      {
        no: 2,
        nama: "Bill Gates",
        email: "billgates@gmail.com",
        nomorTelepon: "081234567890",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "Indonesia",
        status: "Aktif",
        saldo: 2500000,
      },
      {
        no: 3,
        nama: "Kucing Persia",
        email: "kucingpersia@gmail.com",
        nomorTelepon: "081234567890",
        jenisKelamin: "Perempuan",
        kewarganegaraan: "Indonesia",
        status: "Aktif",
        saldo: 3500000,
      },
      {
        no: 4,
        nama: "Elon Musk",
        email: "elon.musk@gmail.com",
        nomorTelepon: "081234567891",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "South Africa",
        status: "Aktif",
        saldo: 5000000,
      },
      {
        no: 5,
        nama: "Jeff Bezos",
        email: "jeff.bezos@gmail.com",
        nomorTelepon: "081234567892",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 4500000,
      },
      {
        no: 6,
        nama: "Mark Zuckerberg",
        email: "mark.zuckerberg@gmail.com",
        nomorTelepon: "081234567893",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 4000000,
      },
      {
        no: 7,
        nama: "Tim Cook",
        email: "tim.cook@gmail.com",
        nomorTelepon: "081234567894",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 3800000,
      },
      {
        no: 8,
        nama: "Sundar Pichai",
        email: "sundar.pichai@gmail.com",
        nomorTelepon: "081234567895",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "India",
        status: "Aktif",
        saldo: 3200000,
      },
      {
        no: 9,
        nama: "Satya Nadella",
        email: "satya.nadella@gmail.com",
        nomorTelepon: "081234567896",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "India",
        status: "Aktif",
        saldo: 3000000,
      },
      {
        no: 10,
        nama: "Susan Wojcicki",
        email: "susan.wojcicki@gmail.com",
        nomorTelepon: "081234567897",
        jenisKelamin: "Perempuan",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 2800000,
      },
    ],
    showIndex: true,
    showPagination: true,
    meta: {
      current_page: 1,
      total_page: 5,
      total_data: 50,
      limit_number: 10,
    },
    onPageChange: (page) => console.log("Page changed:", page),
    onPageSizeChange: (size) => console.log("Page size changed:", size),
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story shows pagination with 10 rows. Notice how the header stays at the top and pagination stays at the bottom when scrolling through the content.",
      },
    },
  },
};

export const WithSorting: Story = {
  args: {
    schema,
    data: sampleData,
    showIndex: true,
    onSortChange: (sort, sortBy) => console.log("Sort changed:", sort, sortBy),
  },
};

export const Loading: Story = {
  args: {
    schema,
    data: [],
    isLoading: true,
    showIndex: true,
  },
};

export const Empty: Story = {
  args: {
    schema,
    data: [],
    showIndex: true,
    emptyState: <ErrorWrapper variant="data-not-found" />,
  },
};

export const WideTableWithHorizontalScroll: Story = {
  args: {
    schema: [
      {
        name: "nama",
        label: "Nama Lengkap",
        accessorKey: "nama",
        type: "string",
        sortable: true,
        align: "left",
        width: 200,
        sticky: true,
        // stickyPosition: "left",
      },
      {
        name: "email",
        label: "Email Address",
        accessorKey: "email",
        type: "string",
        sortable: true,
        align: "left",
        width: 300,
      },
      {
        name: "nomorTelepon",
        label: "Phone Number",
        accessorKey: "nomorTelepon",
        type: "string",
        align: "left",
        width: 150,
      },
      {
        name: "jenisKelamin",
        label: "Gender",
        accessorKey: "jenisKelamin",
        type: "string",
        align: "center",
        width: 120,
      },
      {
        name: "kewarganegaraan",
        label: "Nationality",
        accessorKey: "kewarganegaraan",
        type: "string",
        align: "center",
        width: 140,
      },
      {
        name: "status",
        label: "Account Status",
        accessorKey: "status",
        type: "string",
        align: "center",
        width: 120,
      },
      {
        name: "saldo",
        label: "Account Balance",
        accessorKey: "saldo",
        type: "number",
        sortable: true,
        align: "right",
        width: 150,
        sticky: true,
        stickyPosition: "right",
      },
    ],
    data: [
      {
        no: 1,
        nama: "John Doe",
        email: "john.doe@example.com",
        nomorTelepon: "+1234567890",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 5000.0,
      },
      {
        no: 2,
        nama: "Jane Smith",
        email: "jane.smith@example.com",
        nomorTelepon: "+1987654321",
        jenisKelamin: "Perempuan",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 7500.0,
      },
      {
        no: 3,
        nama: "Bob Johnson",
        email: "bob.johnson@example.com",
        nomorTelepon: "+1122334455",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Suspend",
        saldo: 0.0,
      },
    ],
    showIndex: true,
    showIndexSticky: true,
    showPagination: false,
  },
};

export const WithRowClick: Story = {
  args: {
    schema: [
      ...schema,
      {
        name: "actions",
        label: "Aksi",
        accessorKey: "no",
        type: "other",
        align: "center",
        render: (_, row: User) => (
          <div className="flex gap-2 justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                alert("Edit clicked for: " + row.nama);
              }}
            >
              <Icon icon="mdi:pencil" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                alert("Delete clicked for: " + row.nama);
              }}
            >
              <Icon icon="mdi:delete" />
            </Button>
          </div>
        ),
      },
    ],
    data: sampleData,
    showIndex: true,
    onRowClick: (row: User, index: number) => {
      alert("Row clicked: " + row.nama + " at index: " + index);
    },
  },
};

export const WithStickyColumns: Story = {
  args: {
    schema: [
      {
        name: "nama",
        label: "Nama Lengkap",
        accessorKey: "nama",
        type: "string",
        sortable: true,
        align: "left",
        width: 200,
        sticky: true,
        stickyPosition: "left",
      },
      {
        name: "email",
        label: "Email Address",
        accessorKey: "email",
        type: "string",
        sortable: true,
        align: "left",
        width: 300,
      },
      {
        name: "nomorTelepon",
        label: "Phone Number",
        accessorKey: "nomorTelepon",
        type: "string",
        align: "left",
        width: 150,
      },
      {
        name: "jenisKelamin",
        label: "Gender",
        accessorKey: "jenisKelamin",
        type: "string",
        align: "center",
        width: 120,
      },
      {
        name: "kewarganegaraan",
        label: "Nationality",
        accessorKey: "kewarganegaraan",
        type: "string",
        align: "center",
        width: 140,
      },
      {
        name: "status",
        label: "Account Status",
        accessorKey: "status",
        type: "string",
        align: "center",
        width: 120,
      },
      {
        name: "saldo",
        label: "Account Balance",
        accessorKey: "saldo",
        type: "number",
        sortable: true,
        align: "right",
        width: 150,
        sticky: true,
        stickyPosition: "right",
        render: (value: number) => (
          <span>Rp {value.toLocaleString("id-ID")}</span>
        ),
      },
    ],
    data: [
      {
        no: 1,
        nama: "John Doe",
        email: "john.doe@example.com",
        nomorTelepon: "+1234567890",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 5000.0,
      },
      {
        no: 2,
        nama: "Jane Smith",
        email: "jane.smith@example.com",
        nomorTelepon: "+1987654321",
        jenisKelamin: "Perempuan",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 7500.0,
      },
      {
        no: 3,
        nama: "Bob Johnson",
        email: "bob.johnson@example.com",
        nomorTelepon: "+1122334455",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Suspend",
        saldo: 0.0,
      },
      {
        no: 4,
        nama: "Alice Brown",
        email: "alice.brown@example.com",
        nomorTelepon: "+1555666777",
        jenisKelamin: "Perempuan",
        kewarganegaraan: "Canada",
        status: "Aktif",
        saldo: 12000.0,
      },
      {
        no: 5,
        nama: "Charlie Wilson",
        email: "charlie.wilson@example.com",
        nomorTelepon: "+1444555666",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "UK",
        status: "Aktif",
        saldo: 8500.0,
      },
    ],
    showIndex: true,
    showIndexSticky: true,
    showPagination: false,
  },
};

export const WithStickyIndexColumn: Story = {
  args: {
    schema: [
      {
        name: "nama",
        label: "Nama Lengkap",
        accessorKey: "nama",
        type: "string",
        sortable: true,
        align: "left",
        width: 200,
      },
      {
        name: "email",
        label: "Email Address",
        accessorKey: "email",
        type: "string",
        sortable: true,
        align: "left",
        width: 300,
      },
      {
        name: "nomorTelepon",
        label: "Phone Number",
        accessorKey: "nomorTelepon",
        type: "string",
        align: "left",
        width: 150,
      },
      {
        name: "jenisKelamin",
        label: "Gender",
        accessorKey: "jenisKelamin",
        type: "string",
        align: "center",
        width: 120,
      },
      {
        name: "kewarganegaraan",
        label: "Nationality",
        accessorKey: "kewarganegaraan",
        type: "string",
        align: "center",
        width: 140,
      },
      {
        name: "status",
        label: "Account Status",
        accessorKey: "status",
        type: "string",
        align: "center",
        width: 120,
      },
      {
        name: "saldo",
        label: "Account Balance",
        accessorKey: "saldo",
        type: "number",
        sortable: true,
        align: "right",
        width: 150,
        render: (value: number) => (
          <span>Rp {value.toLocaleString("id-ID")}</span>
        ),
      },
    ],
    data: [
      {
        no: 1,
        nama: "John Doe",
        email: "john.doe@example.com",
        nomorTelepon: "+1234567890",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 5000.0,
      },
      {
        no: 2,
        nama: "Jane Smith",
        email: "jane.smith@example.com",
        nomorTelepon: "+1987654321",
        jenisKelamin: "Perempuan",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 7500.0,
      },
      {
        no: 3,
        nama: "Bob Johnson",
        email: "bob.johnson@example.com",
        nomorTelepon: "+1122334455",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Suspend",
        saldo: 0.0,
      },
      {
        no: 4,
        nama: "Alice Brown",
        email: "alice.brown@example.com",
        nomorTelepon: "+1555666777",
        jenisKelamin: "Perempuan",
        kewarganegaraan: "Canada",
        status: "Aktif",
        saldo: 12000.0,
      },
      {
        no: 5,
        nama: "Charlie Wilson",
        email: "charlie.wilson@example.com",
        nomorTelepon: "+1444555666",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "UK",
        status: "Aktif",
        saldo: 8500.0,
      },
    ],
    showIndex: true,
    showIndexSticky: true,
    showPagination: false,
  },
};

export const WithStickyPagination: Story = {
  args: {
    schema,
    data: [
      {
        no: 1,
        nama: "John Doe",
        email: "john.doe@example.com",
        nomorTelepon: "+1234567890",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 5000.0,
      },
      {
        no: 2,
        nama: "Jane Smith",
        email: "jane.smith@example.com",
        nomorTelepon: "+1987654321",
        jenisKelamin: "Perempuan",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 7500.0,
      },
      {
        no: 3,
        nama: "Bob Johnson",
        email: "bob.johnson@example.com",
        nomorTelepon: "+1122334455",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Suspend",
        saldo: 0.0,
      },
      {
        no: 4,
        nama: "Alice Brown",
        email: "alice.brown@example.com",
        nomorTelepon: "+1555666777",
        jenisKelamin: "Perempuan",
        kewarganegaraan: "Canada",
        status: "Aktif",
        saldo: 12000.0,
      },
      {
        no: 5,
        nama: "Charlie Wilson",
        email: "charlie.wilson@example.com",
        nomorTelepon: "+1444555666",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "UK",
        status: "Aktif",
        saldo: 8500.0,
      },
      {
        no: 6,
        nama: "Diana Prince",
        email: "diana.prince@example.com",
        nomorTelepon: "+1333444555",
        jenisKelamin: "Perempuan",
        kewarganegaraan: "Greece",
        status: "Aktif",
        saldo: 15000.0,
      },
      {
        no: 7,
        nama: "Bruce Wayne",
        email: "bruce.wayne@example.com",
        nomorTelepon: "+1222333444",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 25000.0,
      },
      {
        no: 8,
        nama: "Clark Kent",
        email: "clark.kent@example.com",
        nomorTelepon: "+1111222333",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "Krypton",
        status: "Aktif",
        saldo: 30000.0,
      },
      {
        no: 9,
        nama: "Barry Allen",
        email: "barry.allen@example.com",
        nomorTelepon: "+1000111222",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 18000.0,
      },
      {
        no: 10,
        nama: "Arthur Curry",
        email: "arthur.curry@example.com",
        nomorTelepon: "+1999000111",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "Atlantis",
        status: "Aktif",
        saldo: 22000.0,
      },
      {
        no: 11,
        nama: "Victor Stone",
        email: "victor.stone@example.com",
        nomorTelepon: "+1888999000",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 35000.0,
      },
      {
        no: 12,
        nama: "Hal Jordan",
        email: "hal.jordan@example.com",
        nomorTelepon: "+1777888999",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 28000.0,
      },
      {
        no: 13,
        nama: "Oliver Queen",
        email: "oliver.queen@example.com",
        nomorTelepon: "+1666777888",
        jenisKelamin: "Laki-laki",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 20000.0,
      },
      {
        no: 14,
        nama: "Dinah Lance",
        email: "dinah.lance@example.com",
        nomorTelepon: "+1555666777",
        jenisKelamin: "Perempuan",
        kewarganegaraan: "USA",
        status: "Aktif",
        saldo: 16000.0,
      },
      {
        no: 15,
        nama: "Zatanna Zatara",
        email: "zatanna.zatara@example.com",
        nomorTelepon: "+1444555666",
        jenisKelamin: "Perempuan",
        kewarganegaraan: "Italy",
        status: "Aktif",
        saldo: 40000.0,
      },
    ],
    showIndex: true,
    showPagination: true,
    meta: {
      current_page: 1,
      total_page: 3,
      total_data: 45,
      limit_number: 15,
    },
    onPageChange: (page) => console.log("Page changed:", page),
    onPageSizeChange: (size) => console.log("Page size changed:", size),
    onSortChange: (sort, sortBy) => console.log("Sort changed:", sort, sortBy),
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the sticky pagination behavior. When the table has 10+ rows, the header stays at the top and pagination stays at the bottom while the content scrolls. Notice how the table has a maximum height and the content area scrolls independently.",
      },
    },
  },
};

export const LargeDatasetWithStickyColumns: Story = {
  args: {
    schema: [
      {
        name: "no",
        label: "No.",
        accessorKey: "no",
        type: "number",
        sortable: false,
        align: "center",
        width: 80,
        sticky: true,
        stickyPosition: "left",
      },
      {
        name: "nama",
        label: "Nama Lengkap",
        accessorKey: "nama",
        type: "string",
        sortable: true,
        align: "left",
        width: 200,
        sticky: true,
        stickyPosition: "left",
      },
      {
        name: "email",
        label: "Email Address",
        accessorKey: "email",
        type: "string",
        sortable: true,
        align: "left",
        width: 300,
      },
      {
        name: "nomorTelepon",
        label: "Phone Number",
        accessorKey: "nomorTelepon",
        type: "string",
        align: "left",
        width: 150,
      },
      {
        name: "jenisKelamin",
        label: "Gender",
        accessorKey: "jenisKelamin",
        type: "string",
        align: "center",
        width: 120,
      },
      {
        name: "kewarganegaraan",
        label: "Nationality",
        accessorKey: "kewarganegaraan",
        type: "string",
        align: "center",
        width: 140,
      },
      {
        name: "status",
        label: "Account Status",
        accessorKey: "status",
        type: "string",
        align: "center",
        width: 120,
      },
      {
        name: "department",
        label: "Department",
        accessorKey: "department",
        type: "string",
        align: "left",
        width: 150,
      },
      {
        name: "position",
        label: "Position",
        accessorKey: "position",
        type: "string",
        align: "left",
        width: 180,
      },
      {
        name: "joinDate",
        label: "Join Date",
        accessorKey: "joinDate",
        type: "date",
        align: "center",
        width: 120,
      },
      {
        name: "lastLogin",
        label: "Last Login",
        accessorKey: "lastLogin",
        type: "date",
        align: "center",
        width: 120,
      },
      {
        name: "saldo",
        label: "Account Balance",
        accessorKey: "saldo",
        type: "number",
        sortable: true,
        align: "right",
        width: 150,
        sticky: true,
        stickyPosition: "right",
        render: (value: number) => (
          <span>Rp {value.toLocaleString("id-ID")}</span>
        ),
      },
    ],
    data: Array.from({ length: 50 }, (_, index) => ({
      no: index + 1,
      nama: `User ${String(index + 1).padStart(2, "0")}`,
      email: `user${String(index + 1).padStart(2, "0")}@example.com`,
      nomorTelepon: `+628${String(
        Math.floor(Math.random() * 1000000000)
      ).padStart(10, "0")}`,
      jenisKelamin: Math.random() > 0.5 ? "Laki-laki" : "Perempuan",
      kewarganegaraan: [
        "Indonesia",
        "USA",
        "Singapore",
        "Malaysia",
        "Japan",
        "Korea",
        "Australia",
      ][Math.floor(Math.random() * 7)],
      status: Math.random() > 0.1 ? "Aktif" : "Suspend",
      department: [
        "Engineering",
        "Marketing",
        "Sales",
        "HR",
        "Finance",
        "Operations",
        "Support",
      ][Math.floor(Math.random() * 7)],
      position: [
        "Manager",
        "Senior",
        "Junior",
        "Lead",
        "Director",
        "Analyst",
        "Specialist",
      ][Math.floor(Math.random() * 7)],
      joinDate: new Date(
        2020 + Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toLocaleDateString("id-ID"),
      lastLogin: new Date(
        2024,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toLocaleDateString("id-ID"),
      saldo: Math.floor(Math.random() * 10000000) + 1000000,
    })),
    showPagination: true,
    meta: {
      current_page: 1,
      total_page: 5,
      total_data: 50,
      limit_number: 10,
    },
    onPageChange: (page) => console.log("Page changed:", page),
    onPageSizeChange: (size) => console.log("Page size changed:", size),
    onSortChange: (sort, sortBy) => console.log("Sort changed:", sort, sortBy),
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story showcases a large dataset with 50 rows and sticky columns. The first two columns (No. and Nama) are sticky on the left, and the last column (Account Balance) is sticky on the right. This allows users to always see the row identifier, name, and balance while scrolling horizontally through other columns. The table also has sticky pagination at the bottom for vertical scrolling.",
      },
    },
  },
};

export const Dark: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-[360px] bg-[#44444E] p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    schema,
    data: sampleData,
    variant: "dark",
    showIndex: true,
    showPagination: true,
    meta: {
      current_page: 1,
      total_page: 2,
      total_data: 10,
      limit_number: 5,
    },
    onPageChange: (page) => console.log("Page changed:", page),
    onPageSizeChange: (size) => console.log("Page size changed:", size),
    onSortChange: (sort, sortBy) => console.log("Sort changed:", sort, sortBy),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dark variant for dark-mode surfaces: gray header, striped body, and chrome matched to `bg-gray-900`. Shown on a dark canvas so contrast matches real usage.",
      },
    },
  },
};

export const WithVariants: Story = {
  render: () => {
    const variants: TableVariant[] = [
      "primary",
      "secondary",
      "warning",
      "danger",
      "ghost",
      "success",
      "default",
      "dark",
    ];

    return (
      <div className="space-y-8">
        {variants.map((variant) => (
          <div key={variant} className="space-y-2">
            <h3 className="text-lg font-semibold capitalize">
              {variant} Variant
            </h3>
            <Table<User>
              schema={schema}
              data={sampleData}
              variant={variant}
              showIndex
              showPagination
              meta={{
                current_page: 1,
                total_page: 2,
                total_data: 10,
                limit_number: 5,
              }}
              onPageChange={(page) => console.log("Page changed:", page)}
              onPageSizeChange={(size) =>
                console.log("Page size changed:", size)
              }
              onSortChange={(sort, sortBy) =>
                console.log("Sort changed:", sort, sortBy)
              }
              onRowClick={(row, index) =>
                console.log("Row clicked:", row.nama, "at index:", index)
              }
            />
          </div>
        ))}
      </div>
    );
  },
};
