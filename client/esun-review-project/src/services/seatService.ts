import type { Seat } from '../models'
import type { SeatResponse, SeatApplyRequest } from '../api'

const normalizeSeats = (data: SeatResponse[]): Seat[] =>
  data
    .map((item) => ({
      seatSeq: Number(item.seatSeq ?? NaN),
      floorNo: Number(item.floorNo ?? 0),
      seatNo: Number(item.seatNo ?? 0),
    }))
    .filter((item): item is Seat => !Number.isNaN(item.seatSeq))

export const getSeats = async (): Promise<Seat[]> => {
  const response = await fetch('/api/seats')
  if (!response.ok) {
    throw new Error(`Fetch seats error ${response.status}`)
  }

  const data = (await response.json()) as SeatResponse[]
  return normalizeSeats(data)
}

export const applySeatAssignments = async (payload: SeatApplyRequest): Promise<void> => {
  const response = await fetch('/api/seats/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Apply seats failed ${response.status}`)
  }
}
