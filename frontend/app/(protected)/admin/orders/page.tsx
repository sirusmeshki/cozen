import { DataTable } from '@/components/data-table';
import AddOrder from './add-order';
import { columns, orders } from './columns';

const OrderPage = () => {
  return (
    <section className="flex w-full flex-col gap-4">
      <nav className="flex w-full justify-between gap-2">
        <h1 className="text-3xl font-extrabold">Orders</h1>
        <div className="space-x-2">
          {/* Actions */}
          <AddOrder />
        </div>
      </nav>
      <DataTable columns={columns} data={orders} searchQuery="user_number" />
      {/* Table */}
    </section>
  );
};

export default OrderPage;
