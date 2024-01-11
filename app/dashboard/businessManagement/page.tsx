import ListBusiness from "@/components/BusinessManagement/ListBusiness";

const businessManagement = () => {
  return (
    <div className="container p-8 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6">Business Management Page</h1>
      <ListBusiness />
    </div>
  );
};
export default businessManagement;
