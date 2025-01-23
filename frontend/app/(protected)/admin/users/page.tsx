import { DataTable } from '@/components/data-table';
import AddUser from './add-user';
import DeleteUser from './delete-user';
import { columns, users } from './columns';

const UsersPage = () => {
  return (
    <section className="flex w-full flex-col gap-4">
      <nav className="flex w-full justify-between gap-2">
        <h1 className="text-3xl font-extrabold">Users</h1>
        <div className="space-x-2">
          {/* Actions */}
          <AddUser />
          <DeleteUser />
        </div>
      </nav>
      <DataTable columns={columns} data={users} searchQuery="phone_number" />
      {/* Table */}
    </section>
  );
};

export default UsersPage;
