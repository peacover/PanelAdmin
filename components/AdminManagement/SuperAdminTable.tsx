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
import { AlertDialogAdmin } from "./AlertDialogAdmin";

// import useSWR from "swr";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

const SuperAdminTable: React.FC<{ users: TUser[]; role: Role }> = ({
  users,
  role,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <Table>
          <TableHeader >
            <TableColumn key="name">Name</TableColumn>
            <TableColumn key="email">Email</TableColumn>
            <TableColumn key="role">Role</TableColumn>
            <TableColumn key="last_signin">Last SignIn</TableColumn>
            {role === Role.SUPERADMIN ? (
              <TableColumn key="action">Action</TableColumn>
            ) : (
              <></>
            )}
          </TableHeader>
          <TableBody
            items={users ?? []}
            loadingContent={<Spinner />}
          >
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>

                <TableCell>{user.lastSignIn?.toLocaleString()}</TableCell>
                {role === Role.SUPERADMIN ? (
                  <TableCell>
                    <AlertDialogAdmin userId={user.id} />
                  </TableCell>
                ) : (
                  <></>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default SuperAdminTable;
