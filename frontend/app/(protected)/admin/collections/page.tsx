import { DataTable } from '@/components/data-table';

import AddCollection from './add-collection';
import DeleteCollection from './delete-collection';
import { collections, columns } from './columns';

const CollectionPage = () => {
  return (
    <section className="flex w-full flex-col gap-4">
      {/* Actions */}
      <nav className="flex w-full justify-between gap-2">
        <h1 className="text-3xl font-extrabold">Collections</h1>
        <div className="flex flex-wrap justify-end gap-2">
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
