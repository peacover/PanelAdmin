import LineChart from "@/components/Dashboard/LineChart";
import PieChart from "@/components/Dashboard/PieChart";
import useScroll from "@/lib/hooks/useScroll";
import { cn } from "@/lib/utils/utils"
import { getUserId } from "@/lib/utils/getUserId";
import { useSelectedLayoutSegment } from "next/navigation";

export default async function Dashboard() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[60rem]">
        <div className="bg-blue-950 p-4 rounded-md mb-10">
          <h2 className="text-lg font-semibold text-white mb-4">Line Chart</h2>
          <div className="bg-white p-4 rounded-md shadow-md">
            <LineChart />
          </div>
        </div>

        <div className="bg-blue-950 p-4 rounded-md w-[60rem]">
          <h2 className="text-lg font-semibold text-white mb-4">Pie Chart</h2>
          <div className="bg-white p-4 rounded-md shadow-md flex justify-center">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
}
