import LineChart from "@/components/Dashboard/LineChart";
import PieChart from "@/components/Dashboard/PieChart";
import { getUserId } from "@/lib/utils/getUserId";


export default async function Dashboard() {
  const myId = await getUserId();

  return (
    <div>
      <h1>{myId}</h1>
      <h1>Dashboard Page</h1>
      <PieChart />
      <LineChart />
    </div>
  );
}
