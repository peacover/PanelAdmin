import getAmountUsers from "@/server-actions/getAmountUsers";

const PieChart = async () => {
    const {nb_admin , nb_super_admin} = await getAmountUsers();
    return (
        <div className="border-2 border-black">
            <h1>Amount Admin : {nb_admin}</h1>
            <h1>Amount Super Admin : {nb_super_admin}</h1>
            <h1>PieChart</h1>
        </div>
    );
}

export default PieChart;