/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/ifLgHymfHp8
 */
import { Employee } from "@/app/types"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import React from "react"

export const EmployeeTable: React.FC<{ employees: Employee[] }> = ({ employees }) => {
  const rows = employees.map((e) => {
    return (
      <TableRow key={e.id}>
        <TableCell>{e.id}</TableCell>
        <TableCell>{e.first_name}</TableCell>
        <TableCell>{e.last_name}</TableCell>
        <TableCell>{new Date(e.hire_date).toLocaleDateString()}</TableCell>
        <TableCell>{e.dept_name}</TableCell>
      </TableRow>
    )
  });
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="dark:border-gray-500 border">
        <Table>
          <TableHeader>
            <TableRow className="dark:bg-[#00e599] dark:hover:bg-[#00e599]">
              <TableHead>ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Hire Date</TableHead>
              <TableHead>Department</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
