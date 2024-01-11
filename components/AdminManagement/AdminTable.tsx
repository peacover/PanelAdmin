"use client";

import { TUser } from "@/lib/types/TUser";
import { Role } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { useFormStatus } from "react-dom";
// import useSWR from "swr";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

const AdminTable: React.FC<{ users: TUser[]; role: Role }> = ({
  users,
  role,
}) => {


  // const {data, isLoading} = useSWR(`https://swapi.py4e.com/api/people?page=${page}`, fetcher, {
  //   keepPreviousData: true,
  // });


  //   const loadingState =
  //     isLoading || data?.results.length === 0 ? "loading" : "idle";

  const { pending } = useFormStatus();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
    {isClient && (
    <Table aria-label="Basic table">
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="email">Email</TableColumn>
        <TableColumn key="role">Role</TableColumn>
        <TableColumn key="last_signin">Last SignIn</TableColumn>
      </TableHeader>
      <TableBody
        items={users ?? []}
        loadingContent={<Spinner />}
        // loadingState={loadingState}
      >
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.lastSignIn?.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    )}
    </>
  );
};

export default AdminTable;
