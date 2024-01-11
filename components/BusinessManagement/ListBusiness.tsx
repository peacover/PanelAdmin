import getAllBusiness from "@/server-actions/getAllBusiness";
import CardBusiness from "./CardBusiness";
import Link from "next/link";

const ListBusiness = async () => {
  const all_business: TBusiness[] = await getAllBusiness();
  return (
    <>
      <div className="border-4 border-blue-950 p-8 rounded-md">
        <div className="mb-4">
          <div className="flex justify-end space-x-4">
            <Link
              className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              href="/dashboard/businessManagement/addBusiness"
            >
              Add Business
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 py-6">
          {all_business.map((business: TBusiness) => (
            <CardBusiness key={business.id} bus={business} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ListBusiness;
