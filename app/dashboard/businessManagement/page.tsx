import ListBusiness from "@/components/BusinessManagement/ListBusiness";
import getAllBusiness from "@/server-actions/getAllBusiness";

const businessManagement = async() => {
    const all_business = await getAllBusiness();
    return (
        <div className="border-4 border-blue-500">
        <h1>businessManagement Page</h1>
            <ListBusiness />
            {/* addBusiness component */}
        </div>
    );
}
export default businessManagement;