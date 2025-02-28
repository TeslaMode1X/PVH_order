"use client"

import { useState, useEffect } from "react"
import { Layers, Plus, Search, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface System {
  id: string
  name: string
  material_name: string
}

interface Material {
  id: string
  name: string
}

export default function SystemsPage() {
  const [systems, setSystems] = useState<System[]>([])
  const [materials, setMaterials] = useState<Material[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentSystem, setCurrentSystem] = useState<System | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    material_name: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchSystems()
    fetchMaterials()
  }, [])

  const fetchSystems = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/systems")
      if (!response.ok) {
        throw new Error("Failed to fetch systems")
      }
      const data = await response.json()
      setSystems(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load systems",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMaterials = async () => {
    try {
      const response = await fetch("/api/materials")
      if (!response.ok) {
        throw new Error("Failed to fetch materials")
      }
      const data = await response.json()
      setMaterials(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load materials",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const handleOpenDialog = (system?: System) => {
    if (system) {
      setIsEditMode(true)
      setCurrentSystem(system)
      setFormData({
        name: system.name,
        material_name: system.material_name,
      })
    } else {
      setIsEditMode(false)
      setCurrentSystem(null)
      setFormData({
        name: "",
        material_name: "",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.material_name) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      })
      return
    }

    try {
      if (isEditMode && currentSystem) {
        // Update existing system
        const response = await fetch(`/api/systems/${currentSystem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error("Failed to update system")
        }

        const updatedSystem = await response.json()
        setSystems(systems.map((system) => (system.id === currentSystem.id ? updatedSystem : system)))

        toast({
          title: "Success",
          description: "System updated successfully",
        })
      } else {
        // Create new system
        const response = await fetch("/api/systems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error("Failed to create system")
        }

        const newSystem = await response.json()
        setSystems([...systems, newSystem])

        toast({
          title: "Success",
          description: "System created successfully",
        })
      }

      setIsDialogOpen(false)
      setFormData({
        name: "",
        material_name: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: isEditMode ? "Failed to update system" : "Failed to create system",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const deleteSystem = async (id: string) => {
    try {
      const response = await fetch(`/api/systems/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete system")
      }

      setSystems(systems.filter((system) => system.id !== id))

      toast({
        title: "Success",
        description: "System deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete system",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const filteredSystems = systems.filter(
    (system) =>
      system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      system.material_name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Systems</h1>
          <p className="text-muted-foreground">Manage window systems</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add System
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit System" : "Add New System"}</DialogTitle>
              <DialogDescription>
                {isEditMode ? "Update the system details." : "Enter the details for the new system."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">System Name</Label>
                <Input
                  id="name"
                  placeholder="Enter system name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Select
                  value={formData.material_name}
                  onValueChange={(value) => setFormData({ ...formData, material_name: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((material) => (
                      <SelectItem key={material.id} value={material.name}>
                        {material.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            placeholder="Search systems..."
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
      ) : filteredSystems.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSystems.map((system) => (
            <Card key={system.id}>
              <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
                <CardTitle>{system.name}</CardTitle>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(system)}>
                    <Edit className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteSystem(system.id)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Layers className="h-4 w-4" />
                  <span>Material: {system.material_name}</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">System ID: {system.id}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Layers className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No systems found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "No systems match your search" : "There are no systems yet"}
          </p>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Add System
          </Button>
        </div>
      )}
    </div>
  )
}

