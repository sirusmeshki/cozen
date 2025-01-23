import { DataTable } from '@/components/data-table';

import AddUser from './add-user';
import DeleteUser from './delete-user';
import { columns, users } from './columns';

const UsersPage = () => {
  return (
    <section className="flex w-full flex-col gap-4">
      <nav className="flex w-full justify-between gap-2">
        <h1 className="text-3xl font-extrabold">Users</h1>
        <div className="flex flex-wrap justify-end gap-2">
          {/* Actions */}
          <AddUser />
          <DeleteUser />
        </div>
      </nav>
      {/* Table */}
      <DataTable columns={columns} data={users} searchQuery="phone_number" />
    </section>
  );
};

export default UsersPage;
