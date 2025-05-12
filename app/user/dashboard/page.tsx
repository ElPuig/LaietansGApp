"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, CalendarDays, MapPin, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("events")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-[#7D2F2F] text-white px-4 py-3">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">LaietansAPP</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/user/profile">
              <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center">U</div>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 p-4 pt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Hola, Casteller</h2>
        </div>

        <Tabs defaultValue="events" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="formations">Mis Posiciones</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Próximos Eventos</CardTitle>
                <CardDescription>Confirma tu asistencia a ensayos y actuaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "Ensayo",
                      date: "15 Mayo, 2023",
                      time: "19:00 - 21:00",
                      location: "Local de ensayo",
                      confirmed: true,
                    },
                    {
                      type: "Actuación",
                      date: "26 Mayo, 2023",
                      time: "12:00 - 14:00",
                      location: "Plaza Mayor",
                      confirmed: false,
                    },
                    {
                      type: "Ensayo",
                      date: "29 Mayo, 2023",
                      time: "19:00 - 21:00",
                      location: "Local de ensayo",
                      confirmed: null,
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
                      <div className="flex items-center gap-2">
                        {event.confirmed === true ? (
                          <Badge className="bg-green-500">Confirmado</Badge>
                        ) : event.confirmed === false ? (
                          <Badge variant="outline" className="text-red-500 border-red-200">
                            No asistiré
                          </Badge>
                        ) : (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-500 hover:bg-green-50 text-green-500"
                            >
                              <Check className="h-4 w-4 mr-1" /> Asistiré
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-500 hover:bg-red-50 text-red-500">
                              <X className="h-4 w-4 mr-1" /> No asistiré
                            </Button>
                          </div>
                        )}
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
                <CardTitle>Mis Posiciones</CardTitle>
                <CardDescription>Consulta tus posiciones en próximas actuaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Actuación: 26 Mayo, 2023</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md bg-gray-50">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">3de7</span>
                          <Badge>Lateral</Badge>
                        </div>
                        <div className="relative h-[150px] bg-gray-100 rounded-md flex items-center justify-center">
                          <div className="text-center text-sm text-muted-foreground">
                            <span className="block">Esquema de la pinya</span>
                            <span className="text-xs">(Vista disponible cuando el técnico la confirme)</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 border rounded-md bg-gray-50">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">4de8</span>
                          <Badge>Contrafort</Badge>
                        </div>
                        <div className="relative h-[150px] bg-gray-100 rounded-md flex items-center justify-center">
                          <div className="text-center text-sm text-muted-foreground">
                            <span className="block">Esquema de la pinya</span>
                            <span className="text-xs">(Vista disponible cuando el técnico la confirme)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-amber-50">
                    <div className="flex items-center gap-2 text-amber-800">
                      <CalendarDays className="h-5 w-5" />
                      <span className="font-medium">Historial de posiciones</span>
                    </div>
                    <p className="text-sm text-amber-700 mt-1">
                      Puedes consultar el historial de tus posiciones en actuaciones anteriores.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-amber-200 text-amber-800 hover:bg-amber-100"
                    >
                      Ver historial
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>Comunicaciones del equipo técnico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Importante: Cambio de horario ensayo",
                      date: "10 Mayo, 2023",
                      content:
                        "El ensayo del miércoles 15 comenzará a las 19:00h en lugar de a las 18:30h habitual. No olvidéis confirmarnos asistencia.",
                    },
                    {
                      title: "Preparación para la actuación",
                      date: "8 Mayo, 2023",
                      content:
                        "Recordamos que es importante que todos los castellers confirmen asistencia para la próxima actuación del 26 de Mayo lo antes posible para poder preparar las formaciones.",
                    },
                    {
                      title: "Información equipaciones",
                      date: "5 Mayo, 2023",
                      content:
                        "Las nuevas camisetas ya están disponibles. Podéis pasar a recogerlas en el local durante los horarios de ensayo.",
                    },
                  ].map((notification, i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">{notification.date}</span>
                      </div>
                      <p className="text-sm">{notification.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
