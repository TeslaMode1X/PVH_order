"use client"

import { useState, useEffect } from "react"
import { AppWindowIcon as Window, Plus, Search, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface WindowType {
  id: string
  name: string
  description: string
}

export default function WindowTypesPage() {
  const [windowTypes, setWindowTypes] = useState<WindowType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentWindowType, setCurrentWindowType] = useState<WindowType | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchWindowTypes()
  }, [])

  const fetchWindowTypes = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/window")
      if (!response.ok) {
        throw new Error("Failed to fetch window types")
      }
      const data = await response.json()
      setWindowTypes(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load window types",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (windowType?: WindowType) => {
    if (windowType) {
      setIsEditMode(true)
      setCurrentWindowType(windowType)
      setFormData({
        name: windowType.name,
        description: windowType.description,
      })
    } else {
      setIsEditMode(false)
      setCurrentWindowType(null)
      setFormData({
        name: "",
        description: "",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Window type name is required",
        variant: "destructive",
      })
      return
    }

    try {
      if (isEditMode && currentWindowType) {
        // Update existing window type
        const response = await fetch(`/api/window/${currentWindowType.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error("Failed to update window type")
        }

        const updatedWindowType = await response.json()
        setWindowTypes(windowTypes.map((type) => (type.id === currentWindowType.id ? updatedWindowType : type)))

        toast({
          title: "Success",
          description: "Window type updated successfully",
        })
      } else {
        // Create new window type
        const response = await fetch("/api/window", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error("Failed to create window type")
        }

        const newWindowType = await response.json()
        setWindowTypes([...windowTypes, newWindowType])

        toast({
          title: "Success",
          description: "Window type created successfully",
        })
      }

      setIsDialogOpen(false)
      setFormData({
        name: "",
        description: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: isEditMode ? "Failed to update window type" : "Failed to create window type",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const deleteWindowType = async (id: string) => {
    try {
      const response = await fetch(`/api/window/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete window type")
      }

      setWindowTypes(windowTypes.filter((type) => type.id !== id))

      toast({
        title: "Success",
        description: "Window type deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete window type",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const filteredWindowTypes = windowTypes.filter(
    (type) =>
      type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      type.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Window Types</h1>
          <p className="text-muted-foreground">Manage window types</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Window Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Window Type" : "Add New Window Type"}</DialogTitle>
              <DialogDescription>
                {isEditMode ? "Update the window type details." : "Enter the details for the new window type."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter window type name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>{isEditMode ? "Update" : "Create"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search window types..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredWindowTypes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWindowTypes.map((windowType) => (
            <Card key={windowType.id}>
              <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
                <CardTitle>{windowType.name}</CardTitle>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(windowType)}>
                    <Edit className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteWindowType(windowType.id)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-2">
                  {windowType.description || "No description provided"}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Window className="h-3 w-3" />
                  <span>ID: {windowType.id}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Window className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No window types found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "No window types match your search" : "There are no window types yet"}
          </p>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Add Window Type
          </Button>
        </div>
      )}
    </div>
  )
}

