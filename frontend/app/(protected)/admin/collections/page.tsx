import AddCollection from "./add-collection";
import DeleteCollection from "./delete-collection";

const CollectionPage = () => {
  return (
    <section>
      <h1>کالکشن ها</h1>
      {/* Actions */}
      <nav className="space-x-3 flex">
        <AddCollection />
        <DeleteCollection />
      </nav>

      {/* Table */}
    </section>
  );
};

export default CollectionPage;
