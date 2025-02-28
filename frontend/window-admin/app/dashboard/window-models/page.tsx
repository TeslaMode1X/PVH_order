"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Trash2, Edit, Eye } from "lucide-react"
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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

interface WindowModel {
  id: string
  name: string
  material_id: string
  material_name: string
  system_id: string
  system_name: string
  type_id: string
  type_name: string
  small_image_path: string
  medium_image_path: string
  large_image_path: string
  characteristics: WindowModelCharacteristics
}

interface WindowModelCharacteristics {
  chambers: string
  executions: string[]
  falz_height: number
  frame_sash_height: number
  glass_type: string
  profile: string
  seal_colors: string[]
  seal_material: string[]
  thermal_resistance: number
  width: number
}

interface WindowType {
  id: string
  name: string
}

interface System {
  id: string
  name: string
}

interface Material {
  id: string
  name: string
}

export default function WindowModelsPage() {
  const [windowModels, setWindowModels] = useState<WindowModel[]>([])
  const [windowTypes, setWindowTypes] = useState<WindowType[]>([])
  const [systems, setSystems] = useState<System[]>([])
  const [materials, setMaterials] = useState<Material[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState<WindowModel | null>(null)

  const { toast } = useToast()

  useEffect(() => {
    fetchWindowModels()
    fetchWindowTypes()
    fetchSystems()
    fetchMaterials()
  }, [])

  const fetchWindowModels = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/window/model")
      if (!response.ok) {
        throw new Error("Failed to fetch window models")
      }
      const data = await response.json()
      setWindowModels(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load window models",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchWindowTypes = async () => {
    try {
      const response = await fetch("/api/window")
      if (!response.ok) {
        throw new Error("Failed to fetch window types")
      }
      const data = await response.json()
      setWindowTypes(data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchSystems = async () => {
    try {
      const response = await fetch("/api/systems")
      if (!response.ok) {
        throw new Error("Failed to fetch systems")
      }
      const data = await response.json()
      setSystems(data)
    } catch (error) {
      console.error(error)
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
      console.error(error)
    }
  }

  const deleteWindowModel = async (id: string) => {
    try {
      const response = await fetch(`/api/window/model/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete window model")
      }

      setWindowModels(windowModels.filter((model) => model.id !== id))

      toast({
        title: "Success",
        description: "Window model deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete window model",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const viewWindowModel = (model: WindowModel) => {
    setSelectedModel(model)
    setIsViewDialogOpen(true)
  }

  const filteredWindowModels = windowModels.filter(
    (model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.material_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.system_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.type_name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Window Models</h1>
          <p className="text-muted-foreground">Manage window models</p>
        </div>
        <Button asChild>
          <a href="/dashboard/window-models/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Window Model
          </a>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search window models..."
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
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredWindowModels.map((model) => (
            <Card key={model.id}>
              <CardHeader>
                <CardTitle>{model.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {model.small_image_path && (
                  <Image
                    src={model.small_image_path || "/placeholder.svg"}
                    alt={model.name}
                    width={200}
                    height={150}
                    className="rounded-md object-cover"
                  />
                )}
                <div className="text-sm text-muted-foreground">Material: {model.material_name}</div>
                <div className="text-sm text-muted-foreground">System: {model.system_name}</div>
                <div className="text-sm text-muted-foreground">Type: {model.type_name}</div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => viewWindowModel(model)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteWindowModel(model.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>View Window Model</DialogTitle>
            <DialogDescription>View detailed information about the selected window model.</DialogDescription>
          </DialogHeader>
          {selectedModel && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input type="text" id="name" value={selectedModel.name} readOnly className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="material" className="text-right">
                  Material
                </Label>
                <Input type="text" id="material" value={selectedModel.material_name} readOnly className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="system" className="text-right">
                  System
                </Label>
                <Input type="text" id="system" value={selectedModel.system_name} readOnly className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Input type="text" id="type" value={selectedModel.type_name} readOnly className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="chambers" className="text-right">
                  Chambers
                </Label>
                <Input
                  type="text"
                  id="chambers"
                  value={selectedModel.characteristics.chambers}
                  readOnly
                  className="col-span-3"
                />
              </div>
              {selectedModel.small_image_path && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Image
                  </Label>
                  <div className="col-span-3">
                    <Image
                      src={selectedModel.small_image_path || "/placeholder.svg"}
                      alt={selectedModel.name}
                      width={200}
                      height={150}
                      className="rounded-md object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

