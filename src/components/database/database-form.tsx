"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Database, Server, Key, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const detailsFormSchema = z.object({
  host: z.string().min(1, { message: "Host is required" }),
  port: z.string().default("5432"),
  database: z.string().min(1, { message: "Database name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  sslMode: z.string().default("require"),
})

const connectionStringSchema = z.object({
  connectionString: z
    .string()
    .min(1, { message: "Connection string is required" })
    .refine((val) => val.startsWith("postgresql://") || val.startsWith("postgres://"), {
      message: "Must be a valid PostgreSQL connection string",
    }),
})

type DetailsFormValues = z.infer<typeof detailsFormSchema>
type ConnectionStringFormValues = z.infer<typeof connectionStringSchema>

export default function PostgresLoginForm() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const detailsForm = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsFormSchema),
    defaultValues: {
      host: "",
      port: "5432",
      database: "",
      username: "",
      password: "",
      sslMode: "require",
    },
  })

  const connectionStringForm = useForm<ConnectionStringFormValues>({
    resolver: zodResolver(connectionStringSchema),
    defaultValues: {
      connectionString: "",
    },
  })

  async function onDetailsSubmit(values: DetailsFormValues) {
    setIsConnecting(true)

    try {
      console.log("Connection details:", values)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Successfully connected to database!")
    } catch (error) {
      console.error("Connection error:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  async function onConnectionStringSubmit(values: ConnectionStringFormValues) {
    setIsConnecting(true)

    try {
      console.log("Connection string:", values.connectionString)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Successfully connected to database!")
    } catch (error) {
      console.error("Connection error:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md border-none shadow-lg">
        <div className="flex items-center gap-2 border-b p-6">
          <Database className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">PostgreSQL Connection</h2>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              <span>Connection Details</span>
            </TabsTrigger>
            <TabsTrigger value="string" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span>Connection String</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <CardContent className="p-6">
              <Form {...detailsForm}>
                <form onSubmit={detailsForm.handleSubmit(onDetailsSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={detailsForm.control}
                      name="host"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Host</FormLabel>
                          <FormControl>
                            <Input placeholder="db.example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={detailsForm.control}
                      name="port"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Port</FormLabel>
                          <FormControl>
                            <Input placeholder="5432" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={detailsForm.control}
                    name="database"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Database</FormLabel>
                        <FormControl>
                          <Input placeholder="my_database" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={detailsForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="postgres" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={detailsForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input type={showPassword ? "text" : "password"} {...field} />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={detailsForm.control}
                    name="sslMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SSL Mode</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select SSL mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="disable">Disable</SelectItem>
                            <SelectItem value="allow">Allow</SelectItem>
                            <SelectItem value="prefer">Prefer</SelectItem>
                            <SelectItem value="require">Require</SelectItem>
                            <SelectItem value="verify-ca">Verify CA</SelectItem>
                            <SelectItem value="verify-full">Verify Full</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isConnecting}>
                    {isConnecting ? "Connecting..." : "Connect to Database"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </TabsContent>

          <TabsContent value="string">
            <CardContent className="p-6">
              <Form {...connectionStringForm}>
                <form onSubmit={connectionStringForm.handleSubmit(onConnectionStringSubmit)} className="space-y-4">
                  <FormField
                    control={connectionStringForm.control}
                    name="connectionString"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Connection String</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="postgresql://username:password@host:port/database?sslmode=require"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="rounded-md bg-muted p-3 text-sm">
                    <p className="font-medium">Format:</p>
                    <code className="block mt-1 text-xs text-muted-foreground">
                      postgresql://username:password@host:port/database?sslmode=require
                    </code>
                  </div>

                  <Button type="submit" className="w-full" disabled={isConnecting}>
                    {isConnecting ? "Connecting..." : "Connect to Database"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </TabsContent>
        </Tabs>

        <div className="border-t p-4 text-center text-sm text-muted-foreground">
          Your credentials are securely transmitted and not stored.
        </div>
      </Card>
    </div>
  )
}

