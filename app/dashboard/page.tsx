import { getUserId } from "@/lib/utils/getUserId";


export default async function Dashboard() {
  const myId = await getUserId();
  console.log(myId);

  return (
    <div>
      <h1>{myId}</h1>
      <h1>Dashboard Page</h1>
    </div>
  );
}
