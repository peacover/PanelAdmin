import getAllBusiness from "@/server-actions/getAllBusiness";
import CardBusiness from "./CardBusiness";

const ListBusiness = async () => {
  const all_business: TBusiness[] = await getAllBusiness();
  return (
    <>
      <h1>List Business</h1>
      {all_business.map((business: TBusiness) => (
        <CardBusiness key={business.id} bus={business} />
      ))}
    </>
  );
};

export default ListBusiness;
