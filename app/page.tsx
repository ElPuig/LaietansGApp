"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulación de login - en una implementación real conectaríamos con la API
    if (email && password) {
      // Determinar si es admin o usuario normal (simulado)
      const isAdmin = email.includes("admin")

      if (isAdmin) {
        router.push("/admin/dashboard")
      } else {
        router.push("/user/dashboard")
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="mb-8 flex flex-col items-center">
        <div className="relative h-32 w-32 mb-4">
          <Image
            src="/placeholder.svg?height=128&width=128"
            alt="LaietansAPP Logo"
            width={128}
            height={128}
            className="rounded-full"
          />
        </div>
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl text-center text-[#7D2F2F]">
          LaietansAPP
        </h1>
        <p className="text-center text-muted-foreground mt-2">Gestión de la Colla Castellera</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">Accede a tu cuenta para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full bg-[#7D2F2F] hover:bg-[#6D1F1F]" type="submit">
              Acceder
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">¿Olvidaste tu contraseña? Contacta con el administrador</p>
        </CardFooter>
      </Card>
    </div>
  )
}
