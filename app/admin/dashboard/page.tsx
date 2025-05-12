"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Users, Calendar, MapPin, Bell } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Panel de Administración</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Enviar Notificación
            </Button>
            <Button size="sm" className="bg-[#7D2F2F] hover:bg-[#6D1F1F]">
              Acción Rápida
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="members">Miembros</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="formations">Formaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Miembros Totales</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">25</div>
                  <p className="text-xs text-muted-foreground">+2 en el último mes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Próximo Ensayo</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Miércoles 15</div>
                  <p className="text-xs text-muted-foreground">19:00h - Local de ensayo</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Próxima Actuación</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Domingo 26</div>
                  <p className="text-xs text-muted-foreground">12:00h - Plaza Mayor</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Asistencia Reciente</CardTitle>
                <CardDescription>Estadísticas de los últimos 5 ensayos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end gap-2">
                  {[65, 72, 58, 80, 75].map((attendance, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gray-100 rounded-t-md relative"
                      style={{ height: `${attendance}%` }}
                    >
                      <div
                        className="absolute bottom-0 w-full bg-[#7D2F2F] rounded-t-md"
                        style={{ height: `${attendance}%` }}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">
                          {attendance}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>5 May</span>
                  <span>8 May</span>
                  <span>12 May</span>
                  <span>15 May</span>
                  <span>19 May</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Miembros de la Colla</CardTitle>
                  <CardDescription>Gestiona los miembros del equipo</CardDescription>
                </div>
                <Button size="sm" className="bg-[#7D2F2F] hover:bg-[#6D1F1F]">
                  Añadir Miembro
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="text-left py-2 px-3 text-sm font-medium">Nombre</th>
                          <th className="text-left py-2 px-3 text-sm font-medium">Altura</th>
                          <th className="text-left py-2 px-3 text-sm font-medium">Peso</th>
                          <th className="text-left py-2 px-3 text-sm font-medium">Rol</th>
                          <th className="text-right py-2 px-3 text-sm font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "Marc Puig", height: "178cm", weight: "75kg", role: "Baix" },
                          { name: "Anna García", height: "165cm", weight: "60kg", role: "Agulla" },
                          { name: "Joan Martí", height: "182cm", weight: "85kg", role: "Lateral" },
                          { name: "Marta Soler", height: "170cm", weight: "65kg", role: "Contrafort" },
                          { name: "Pau Ferrer", height: "175cm", weight: "72kg", role: "Vent" },
                        ].map((member, i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="py-2 px-3 text-sm">{member.name}</td>
                            <td className="py-2 px-3 text-sm">{member.height}</td>
                            <td className="py-2 px-3 text-sm">{member.weight}</td>
                            <td className="py-2 px-3 text-sm">{member.role}</td>
                            <td className="py-2 px-3 text-sm text-right">
                              <Button variant="ghost" size="sm">
                                Editar
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Calendario de Eventos</CardTitle>
                  <CardDescription>Ensayos y actuaciones programadas</CardDescription>
                </div>
                <Button size="sm" className="bg-[#7D2F2F] hover:bg-[#6D1F1F]">
                  Nuevo Evento
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "Ensayo",
                      date: "15 Mayo, 2023",
                      time: "19:00 - 21:00",
                      location: "Local de ensayo",
                      attendance: 18,
                    },
                    {
                      type: "Actuación",
                      date: "26 Mayo, 2023",
                      time: "12:00 - 14:00",
                      location: "Plaza Mayor",
                      attendance: 22,
                    },
                    {
                      type: "Ensayo",
                      date: "29 Mayo, 2023",
                      time: "19:00 - 21:00",
                      location: "Local de ensayo",
                      attendance: 16,
                    },
                  ].map((event, i) => (
                    <div key={i} className="flex items-center justify-between border rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.type === "Ensayo" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                          }`}
                        >
                          {event.type === "Ensayo" ? (
                            <CalendarIcon className="h-5 w-5" />
                          ) : (
                            <MapPin className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">
                            {event.type}: {event.date}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {event.time} • {event.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-sm">
                          <span className="font-medium">{event.attendance}</span> asistentes
                        </div>
                        <Button variant="outline" size="sm">
                          Ver Detalle
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="formations" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Formaciones de Castells</CardTitle>
                <CardDescription>Gestiona las formaciones para próximas actuaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Actuación: 26 Mayo, 2023</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>3de7</span>
                        <Button variant="outline" size="sm">
                          Ver Formación
                        </Button>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>4de8</span>
                        <Button variant="outline" size="sm">
                          Ver Formación
                        </Button>
                      </div>
                      <div className="flex items-center justify-between pb-2">
                        <span>Pilar de 5</span>
                        <Button variant="outline" size="sm">
                          Ver Formación
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Plantillas</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>3de6</span>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>4de7</span>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                      <div className="flex items-center justify-between pb-2">
                        <span>Pilar de 4</span>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="bg-[#7D2F2F] hover:bg-[#6D1F1F]">Crear Nueva Formación</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
