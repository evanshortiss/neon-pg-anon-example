import React from "react";
import { Employee } from "./types";
import { EmployeeTable } from "@/components/employee-table";
import { neon } from "@neondatabase/serverless";
import Link from "next/link";

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing from process.env')
}

const sql = neon(process.env.DATABASE_URL, {
  arrayMode: false,
  fullResults: true
})

const getData = (async (page: number, limit = 15) => {
  if (page < 1) page = 1

  const result = await sql`
    SELECT e.id, e.first_name, e.last_name, e.hire_date, d.dept_name
    FROM employees.employee e
    JOIN employees.department_employee de ON e.id = de.employee_id
    JOIN employees.department d ON de.department_id = d.id
    OFFSET ${page === 1 ? 0 : page * limit}
    LIMIT ${limit};
  `;

  return result.rows as Employee[]
})

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let page = Number(searchParams.page)
  if (isNaN(page) || page < 1) {
    page = 1
  } else {
    // Force number to an integer
    page = page | 0
  }

  const employees = await getData(page)
  const prevDisabled = page <= 1

  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-12">
      <h1 className="text-xl dark:text-[#00e599]">Neon and PostgreSQL Anonymizer Demo</h1>
      <div className="divide-y w-full divide-solid divide-gray-500 mt-3 mb-5 w-1/2">
        <div></div>
        <div></div>
      </div>
      <div className="flex space-x-8 mb-6">
        <Link aria-disabled={prevDisabled} className={`dark:text-[#00e599] ${prevDisabled ? 'pointer-events-none dark:text-gray-500 text-gray-400' : ''}`} href={`/?page=${page - 1}`}>&#8592; Previous</Link>
        <div className="dark:text-gray-500 font-bold">|</div>
        <Link className="dark:text-[#00e599]" href={`/?page=${page + 1}`}>Next &#8594;</Link>
      </div>
      <EmployeeTable employees={employees}></EmployeeTable>
      <div className="fixed left-0 top-0 p-3 text-xs">
        <pre className="dark:text-gray-500">
          Environment: {process.env.VERCEL_ENV ? process.env.VERCEL_ENV : 'local'}
        </pre>

      </div>
    </main>
  )
}
