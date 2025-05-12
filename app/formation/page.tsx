"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Member } from "@/lib/database"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Link from "next/link"
import { ChevronLeft, Save } from "lucide-react"

// Esta página es un ejemplo de cómo sería la interfaz para configurar la formación de un castell
// En una implementación real, tendríamos que integrar alguna librería para drag & drop

export default function FormationPage() {
  const [members, setMembers] = useState<Member[]>([
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
  ])

  const [selectedEvent, setSelectedEvent] = useState<string>("2")
  const [selectedCastell, setSelectedCastell] = useState<string>("3de7")
  const [assignedPositions, setAssignedPositions] = useState<{ [key: string]: string }>({})

  // En una implementación real, cargaríamos estas posiciones desde la base de datos
  const positions = [
    { id: "p1", name: "Baix 1", row: 0, col: 2 },
    { id: "p2", name: "Baix 2", row: 0, col: 3 },
    { id: "p3", name: "Baix 3", row: 0, col: 4 },
    { id: "p4", name: "Lateral 1", row: 1, col: 1 },
    { id: "p5", name: "Agulla", row: 1, col: 3 },
    { id: "p6", name: "Lateral 2", row: 1, col: 5 },
    { id: "p7", name: "Contrafort 1", row: 2, col: 0 },
    { id: "p8", name: "Contrafort 2", row: 2, col: 6 },
    { id: "p9", name: "Vent 1", row: 3, col: 0 },
    { id: "p10", name: "Vent 2", row: 3, col: 6 },
  ]

  // Función para manejar el drag & drop
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { draggableId, destination } = result
    const positionId = destination.droppableId

    setAssignedPositions((prev) => ({
      ...prev,
      [positionId]: draggableId,
    }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-[#7D2F2F] text-white px-4 py-3">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">LaietansAPP</h1>
            <span className="text-sm bg-white/20 px-2 py-0.5 rounded-md">Admin</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/admin/profile">
              <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center">A</div>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 p-4 pt-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight">Configurar Formación</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Detalles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Evento</label>
                  <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar evento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">Actuación: 26 Mayo, 2023</SelectItem>
                      <SelectItem value="3">Ensayo: 29 Mayo, 2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Castell</label>
                  <Select value={selectedCastell} onValueChange={setSelectedCastell}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar castell" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3de7">3de7</SelectItem>
                      <SelectItem value="4de8">4de8</SelectItem>
                      <SelectItem value="pilar5">Pilar de 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Castellers disponibles</h3>

                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="members" isDropDisabled={false}>
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                          {members
                            .filter((member) => !Object.values(assignedPositions).includes(member.id))
                            .map((member, index) => (
                              <Draggable key={member.id} draggableId={member.id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-2 border rounded-md bg-white flex items-center justify-between"
                                  >
                                    <div>
                                      <div>{member.name}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {member.height}cm, {member.weight}kg
                                      </div>
                                    </div>
                                    <div className="text-xs px-2 py-1 bg-gray-100 rounded">{member.positions[0]}</div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Pinya {selectedCastell}</CardTitle>
                <Button className="bg-[#7D2F2F] hover:bg-[#6D1F1F]">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Formación
                </Button>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="grid grid-cols-7 gap-2">
                      {/* Generamos una cuadrícula para representar la pinya */}
                      {Array.from({ length: 7 }).map((_, rowIndex) =>
                        Array.from({ length: 7 }).map((_, colIndex) => {
                          // Buscamos si hay una posición definida para esta celda
                          const position = positions.find((p) => p.row === rowIndex && p.col === colIndex)

                          if (!position) return <div key={`${rowIndex}-${colIndex}`} className="h-16"></div>

                          return (
                            <Droppable key={position.id} droppableId={position.id}>
                              {(provided, snapshot) => {
                                const assignedMember = members.find((m) => m.id === assignedPositions[position.id])

                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`h-16 border rounded-md flex flex-col items-center justify-center p-1 text-center
                                      ${
                                        snapshot.isDraggingOver
                                          ? "bg-green-50 border-green-300"
                                          : assignedMember
                                            ? "bg-blue-50 border-blue-300"
                                            : "bg-white"
                                      }
                                    `}
                                  >
                                    <div className="text-xs font-medium overflow-hidden text-ellipsis w-full">
                                      {position.name}
                                    </div>
                                    {assignedMember && (
                                      <div className="text-xs text-blue-800 font-medium mt-1">
                                        {assignedMember.name}
                                      </div>
                                    )}
                                    {provided.placeholder}
                                  </div>
                                )
                              }}
                            </Droppable>
                          )
                        }),
                      )}
                    </div>
                  </DragDropContext>
                </div>

                <div className="mt-6 p-4 border rounded-lg bg-amber-50">
                  <h3 className="font-medium text-amber-800">Sugerencias de posicionamiento</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    Basado en el historial de castells y características físicas, recomendamos:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Marc Puig como baix (alto y con experiencia)</li>
                    <li>• Anna García como agulla (peso ligero, buena técnica)</li>
                    <li>• Joan Martí como lateral (altura y peso adecuados)</li>
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 border-amber-200 text-amber-800 hover:bg-amber-100"
                  >
                    Aplicar sugerencias
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
