import ListUsers from "@/components/AdminManagement/ListUsers";

const adminManagement = () => {
  return (
    <div className="container p-8 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6">Admin Management Page</h1>
      <ListUsers />
    </div>
  );
};
export default adminManagement;
