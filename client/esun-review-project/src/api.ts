export type EmployeeResponse = {
  id: number | string
  name?: string | null
  email?: string | null
  seatSeq?: number | null
}

export type SeatResponse = {
  seatSeq: number | string
  floorNo?: number | string
  seatNo?: number | string
}

export type SeatApplyRequestItem = {
  employeeId: number
  seatId: number | null
}

export type SeatApplyRequest = SeatApplyRequestItem[]
