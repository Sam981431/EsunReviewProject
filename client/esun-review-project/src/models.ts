export type Employee = {
  id: number
  name: string
  email: string
  seatSeq: number | null
}

export type Seat = {
  seatSeq: number
  floorNo: number
  seatNo: number
}
