import ListBusiness from "@/components/BusinessManagement/ListBusiness";

const businessManagement = async () => {
  return (
    <div className="border-4 border-blue-500">
      <h1>businessManagement Page</h1>
      <ListBusiness />
    </div>
  );
};
export default businessManagement;
