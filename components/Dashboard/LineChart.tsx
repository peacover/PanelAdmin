import getAmountUsers from "@/server-actions/getAmountUsers";
import getBusPerDayInCurMonth from "@/server-actions/getBusPerDayInCurMonth";

const LineChart = async () => {
    const { nbArr, dateArr, businessCountArray } = await getBusPerDayInCurMonth();
    return (
        <div className="border-2 border-black">
            <h1>Date of Bus : {dateArr} </h1>
            <h1>Number Per Bus : {nbArr} </h1>
            <h1>LineChart</h1>
        </div>
    );
}

export default LineChart;