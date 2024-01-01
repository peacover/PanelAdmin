import getAllBusiness from "@/server-actions/getAllBusiness";
import CardBusiness from "./CardBusiness";
import Link from "next/link";

const ListBusiness = async () => {
  const all_business: TBusiness[] = await getAllBusiness();
  return (
    <>
      <h1>List Business</h1>
      <Link href="/dashboard/businessManagement/addBusiness">Add Business</Link>
      {all_business.map((business: TBusiness) => (
        <CardBusiness key={business.id} bus={business} />
      ))}
    </>
  );
};

export default ListBusiness;
