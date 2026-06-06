import type { Employee } from '../models'
import type { EmployeeResponse } from '../api'

const normalizeEmployees = (data: EmployeeResponse[]): Employee[] =>
  data
    .map((item) => ({
      id: Number(item.id ?? 0),
      name: String(item.name ?? item.email ?? item.id ?? ''),
      email: String(item.email ?? ''),
      seatSeq: item.seatSeq == null ? null : Number(item.seatSeq),
    }))
    .filter((item): item is Employee => !Number.isNaN(item.id))

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await fetch('/api/employee')
  if (!response.ok) {
    throw new Error(`Fetch employee error ${response.status}`)
  }

  const data = (await response.json()) as EmployeeResponse[]
  return normalizeEmployees(data)
}
