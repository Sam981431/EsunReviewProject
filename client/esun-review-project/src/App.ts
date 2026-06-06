import { computed, defineComponent, onMounted, ref } from 'vue'
import type { Employee, Seat } from './models'
import type { SeatApplyRequest } from './api'
import { getEmployees } from './services/employeeService'
import { getSeats, applySeatAssignments } from './services/seatService'

export default defineComponent({
  setup() {
    const employees = ref<Employee[]>([])
    const currentEmployeeId = ref<number | null>(null)
    const seatList = ref<Seat[]>([])
    const assignments = ref<Record<number, number | null>>({})
    const originalEmployeeSeatSeq = ref<Record<number, number | null>>({})
    const loading = ref(true)
    const submitStatus = ref<string | null>(null)

    const currentEmployee = computed(
      () => employees.value.find((employee) => employee.id === currentEmployeeId.value) ?? null,
    )

    const originalAssignments = computed(() => {
      return Object.entries(originalEmployeeSeatSeq.value).reduce(
        (acc, [employeeId, seatSeq]) => {
          if (seatSeq != null) acc[seatSeq] = Number(employeeId)
          return acc
        },
        {} as Record<number, number | null>,
      )
    })

    const availableEmployees = computed(() =>
      employees.value.filter((employee) => employee.seatSeq == null),
    )

    const employeeCode = (employee: Employee) => String(employee.id).padStart(5, '0')

    const loadData = async () => {
      loading.value = true
      submitStatus.value = null

      try {
        const [employeeData, seatData] = await Promise.all([getEmployees(), getSeats()])

        employees.value = employeeData
        seatList.value = seatData

        assignments.value = seatList.value.reduce(
          (acc, seat) => {
            acc[seat.seatSeq] = null
            return acc
          },
          {} as Record<number, number | null>,
        )

        employees.value.forEach((employee) => {
          if (employee.seatSeq != null && assignments.value[employee.seatSeq] !== undefined) {
            assignments.value[employee.seatSeq] = employee.id
          }
        })

        originalEmployeeSeatSeq.value = employees.value.reduce(
          (acc, employee) => {
            acc[employee.id] = employee.seatSeq
            return acc
          },
          {} as Record<number, number | null>,
        )

        currentEmployeeId.value = null
      } catch (error) {
        console.error('載入員工或座位資料失敗', error)
        submitStatus.value = '載入員工或座位資料失敗，請稍後再試。'
      } finally {
        loading.value = false
      }
    }

    const assignSeat = (seatSeq: number) => {
      const ownerId = assignments.value[seatSeq]

      if (ownerId != null) {
        assignments.value[seatSeq] = null
        const employee = employees.value.find((item) => item.id === ownerId)
        if (employee) employee.seatSeq = null
        currentEmployeeId.value = null
        return
      }

      if (!currentEmployee.value) return

      const employeeId = currentEmployee.value.id
      if (currentEmployee.value.seatSeq != null) {
        assignments.value[currentEmployee.value.seatSeq] = null
      }

      assignments.value[seatSeq] = employeeId
      currentEmployee.value.seatSeq = seatSeq
      currentEmployeeId.value = null
    }

    const isSeatModified = (seatSeq: number) => {
      const ownerId = assignments.value[seatSeq] ?? null
      const originalOwnerId = originalAssignments.value[seatSeq] ?? null
      return ownerId !== originalOwnerId
    }

    const seatStatusClass = (seatSeq: number) => {
      const ownerId = assignments.value[seatSeq]
      if (ownerId != null && ownerId === currentEmployeeId.value) {
        return 'selected'
      }
      if (isSeatModified(seatSeq)) {
        return 'modified'
      }
      if (ownerId != null) {
        return currentEmployeeId.value === null ? 'occupiedNoSelect' : 'occupied'
      }
      return currentEmployeeId.value !== null ? 'available' : ''
    }

    const assignedEmployeeCode = (seatSeq: number) => {
      const employeeId = assignments.value[seatSeq]
      const employee = employees.value.find((item) => item.id === employeeId)
      return employee ? employeeCode(employee) : ''
    }

    const selectedCount = computed(() => Object.values(assignments.value).filter(Boolean).length)

    const submitAssignments = async () => {
      if (loading.value) return
      submitStatus.value = '送出中...'

      try {
        const payload: SeatApplyRequest = employees.value
          .filter((employee) => employee.seatSeq !== originalEmployeeSeatSeq.value[employee.id])
          .map((employee) => ({
            employeeId: employee.id,
            seatId: employee.seatSeq,
          }))

        await applySeatAssignments(payload)

        originalEmployeeSeatSeq.value = employees.value.reduce(
          (acc, employee) => {
            acc[employee.id] = employee.seatSeq
            return acc
          },
          {} as Record<number, number | null>,
        )

        submitStatus.value = '座位分配已送出。'
      } catch (error) {
        console.error('送出座位資料失敗', error)
        submitStatus.value = '送出失敗，請稍後再試。'
      }
    }

    onMounted(loadData)

    return {
      currentEmployeeId,
      loading,
      seatList,
      assignments,
      availableEmployees,
      employeeCode,
      seatStatusClass,
      assignSeat,
      assignedEmployeeCode,
      selectedCount,
      submitAssignments,
      submitStatus,
    }
  },
})
