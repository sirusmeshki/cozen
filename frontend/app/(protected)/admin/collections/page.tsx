import AddCollection from './add-collection';
import DeleteCollection from './delete-collection';

import { collections, columns } from './columns';
import { DataTable } from '@/components/data-table';

const CollectionPage = () => {
  return (
    <section className="flex w-full flex-col gap-4">
      {/* Actions */}
      <nav className="flex w-full justify-between gap-2">
        <h1 className="text-3xl font-extrabold">Collections</h1>
        <div className="space-x-2">
          <AddCollection />
          <DeleteCollection />
        </div>
      </nav>

      {/* Table */}
      <DataTable
        searchQuery="collabration_with"
        columns={columns}
        data={collections}
      />
    </section>
  );
};

export default CollectionPage;
