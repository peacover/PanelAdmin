"use server";

import { db } from "@/lib/database/db";

const getBusPerDayInCurMonth = async () => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0);

  const endOfMonth = new Date();
  endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);

  const all_bus = await db.business.findMany({
    where: {
      updatedAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    select: {
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "asc",
    },
  });

  // console.log("all_bus", all_bus);
  // console.log("startOfMonth", startOfMonth);
  // console.log("endOfMonth", endOfMonth);

  const businessCountByDay = all_bus.reduce((acc: any, bus) => {
    const date: string = bus.updatedAt.toISOString().split("T")[0];
    acc[date] = acc[date] ? acc[date] + 1 : 1;
    return acc;
  }, {});
  const businessCountArray: Array<[string, number]> =
    Object.entries(businessCountByDay);
  const dateArr: string[] = businessCountArray.map(([date]) => date);
  const nbArr: number[] = businessCountArray.map(([, count]) => count);

  return { nbArr, dateArr, businessCountArray };
};

export default getBusPerDayInCurMonth;
