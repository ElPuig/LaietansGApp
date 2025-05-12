// Aquí definiremos los modelos de datos y las funciones de acceso a la base de datos

// Tipos de datos
export interface Member {
  id: string
  name: string
  email: string
  height: number // en cm
  weight: number // en kg
  role: string // usuario o administrador
  positions: string[] // posiciones que puede ocupar en un castell
}

export interface Event {
  id: string
  type: "ensayo" | "actuacion"
  date: Date
  time: string
  location: string
  description?: string
}

export interface Attendance {
  eventId: string
  memberId: string
  confirmed: boolean
}

export interface Position {
  name: string // baix, lateral, agulla, etc.
  description: string
}

export interface Formation {
  id: string
  eventId: string
  castellType: string // 3de7, 4de8, etc.
  positions: {
    positionId: string
    memberId: string
  }[]
}

// Base de datos simulada (en una implementación real usaríamos una base de datos real)
export const db = {
  members: [
    {
      id: "1",
      name: "Marc Puig",
      email: "marc@laietans.com",
      height: 178,
      weight: 75,
      role: "baix",
      positions: ["baix"],
    },
    {
      id: "2",
      name: "Anna García",
      email: "anna@laietans.com",
      height: 165,
      weight: 60,
      role: "agulla",
      positions: ["agulla"],
    },
    {
      id: "3",
      name: "Joan Martí",
      email: "joan@laietans.com",
      height: 182,
      weight: 85,
      role: "lateral",
      positions: ["lateral"],
    },
    {
      id: "4",
      name: "Marta Soler",
      email: "marta@laietans.com",
      height: 170,
      weight: 65,
      role: "contrafort",
      positions: ["contrafort"],
    },
    {
      id: "5",
      name: "Pau Ferrer",
      email: "pau@laietans.com",
      height: 175,
      weight: 72,
      role: "vent",
      positions: ["vent"],
    },
  ] as Member[],

  events: [
    {
      id: "1",
      type: "ensayo",
      date: new Date(2023, 4, 15),
      time: "19:00 - 21:00",
      location: "Local de ensayo",
      description: "Ensayo regular semanal",
    },
    {
      id: "2",
      type: "actuacion",
      date: new Date(2023, 4, 26),
      time: "12:00 - 14:00",
      location: "Plaza Mayor",
      description: "Actuación Fiesta Mayor",
    },
    {
      id: "3",
      type: "ensayo",
      date: new Date(2023, 4, 29),
      time: "19:00 - 21:00",
      location: "Local de ensayo",
      description: "Ensayo regular semanal",
    },
  ] as Event[],

  attendance: [
    { eventId: "1", memberId: "1", confirmed: true },
    { eventId: "1", memberId: "2", confirmed: true },
    { eventId: "1", memberId: "3", confirmed: false },
    { eventId: "2", memberId: "1", confirmed: true },
    { eventId: "2", memberId: "2", confirmed: true },
    { eventId: "2", memberId: "3", confirmed: true },
  ] as Attendance[],

  positions: [
    { name: "baix", description: "Base del castell" },
    { name: "lateral", description: "Posición lateral que da soporte a los bajos" },
    { name: "agulla", description: "Posición central que da soporte a la estructura" },
    { name: "contrafort", description: "Posición que refuerza laterales" },
    { name: "vent", description: "Posición externa que da estabilidad" },
    { name: "primeres mans", description: "Primera fila de la pinya" },
    { name: "segons", description: "Segunda fila de la pinya" },
  ] as Position[],

  formations: [
    {
      id: "1",
      eventId: "2",
      castellType: "3de7",
      positions: [
        { positionId: "baix", memberId: "1" },
        { positionId: "lateral", memberId: "3" },
        { positionId: "agulla", memberId: "2" },
      ],
    },
    {
      id: "2",
      eventId: "2",
      castellType: "4de8",
      positions: [
        { positionId: "baix", memberId: "1" },
        { positionId: "lateral", memberId: "3" },
        { positionId: "contrafort", memberId: "4" },
        { positionId: "vent", memberId: "5" },
      ],
    },
  ] as Formation[],
}

// Funciones CRUD para interactuar con la base de datos
export const getMembers = () => {
  return db.members
}

export const getMember = (id: string) => {
  return db.members.find((member) => member.id === id)
}

export const getEvents = () => {
  return db.events.sort((a, b) => a.date.getTime() - b.date.getTime())
}

export const getEvent = (id: string) => {
  return db.events.find((event) => event.id === id)
}

export const getAttendanceForEvent = (eventId: string) => {
  return db.attendance.filter((a) => a.eventId === eventId)
}

export const getFormationsForEvent = (eventId: string) => {
  return db.formations.filter((f) => f.eventId === eventId)
}

export const getMemberPositionsForEvent = (eventId: string, memberId: string) => {
  const formations = getFormationsForEvent(eventId)
  const positions: string[] = []

  formations.forEach((formation) => {
    formation.positions.forEach((position) => {
      if (position.memberId === memberId) {
        positions.push(position.positionId)
      }
    })
  })

  return positions
}

// En una implementación real, aquí tendríamos funciones para agregar, actualizar y eliminar datos
