"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Upload, X, Crop, RotateCw, ZoomIn } from "lucide-react"

interface ImageUploadModalProps {
  open: boolean
  onClose: () => void
  onUpload: (files: File[]) => void
  maxImages?: number
}

export function ImageUploadModal({ open, onClose, onUpload, maxImages = 4 }: ImageUploadModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const newFiles = [...selectedFiles, ...files].slice(0, maxImages)
    setSelectedFiles(newFiles)

    const urls = newFiles.map((file) => URL.createObjectURL(file))
    setPreviewUrls(urls)
  }

  const removeImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = () => {
    onUpload(selectedFiles)
    setSelectedFiles([])
    setPreviewUrls([])
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Images</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {previewUrls.length === 0 ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-16 cursor-pointer transition-colors hover:border-accent/50"
            >
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">Click to select images</p>
              <p className="text-sm text-muted-foreground mt-2">Up to {maxImages} images</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                {previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="group relative aspect-video rounded-lg overflow-hidden border border-border"
                  >
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors">
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                          <Crop className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                          <RotateCw className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedFiles.length < maxImages && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Add More Images ({selectedFiles.length}/{maxImages})
                </Button>
              )}
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
