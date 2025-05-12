"use client";

import * as React from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import {
  X,
  Upload,
  LinkIcon,
  Loader2,
  ZoomIn,
  ZoomOut,
  Check,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import Cropper from "react-easy-crop";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Slider } from "@/src/components/ui/slider";

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  maxSize?: number; // in MB
  aspectRatio?: number;
  className?: string;
  rounded?: boolean;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function ImageUpload({
  value,
  onChange,
  disabled = false,
  maxSize = 5, // 5MB default
  aspectRatio = 1, // Default to square (1:1)
  className,
  rounded = true,
  ...props
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [urlInput, setUrlInput] = React.useState("");
  const [urlError, setUrlError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [cropDialogOpen, setCropDialogOpen] = React.useState(false);
  const [imageToCrop, setImageToCrop] = React.useState<string | null>(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    React.useState<CropArea | null>(null);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (disabled) return;

      const file = acceptedFiles[0];
      if (!file) return;

      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size must be less than ${maxSize}MB`);
        return;
      }

      setIsUploading(true);

      // Create a data URL for the cropper
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageToCrop(event.target.result as string);
          setCropDialogOpen(true);
          setOpen(false);
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    },
    [disabled, maxSize],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles: 1,
    disabled: isUploading || disabled,
  });

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError("");

    if (!urlInput.trim()) {
      setUrlError("Please enter a URL");
      return;
    }

    // Basic URL validation
    try {
      new URL(urlInput);
    } catch (err) {
      setUrlError("Please enter a valid URL");
      return;
    }

    setIsUploading(true);

    // For URL images, we'll load them first to make sure they're valid
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setImageToCrop(urlInput);
      setCropDialogOpen(true);
      setOpen(false);
      setIsUploading(false);
      setUrlInput("");
    };
    img.onerror = () => {
      setUrlError("Could not load image from this URL");
      setIsUploading(false);
    };
    img.src = urlInput;
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChange) {
      onChange("");
    }
  };

  const onCropComplete = (
    croppedArea: unknown,
    croppedAreaPixels: CropArea,
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const createCroppedImage = async () => {
    if (!imageToCrop || !croppedAreaPixels) return;

    try {
      const image = new Image();
      image.src = imageToCrop;

      await new Promise((resolve) => {
        image.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas dimensions to the cropped size
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      // Draw the cropped image onto the canvas
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
      );

      // Convert canvas to data URL
      const croppedImageUrl = canvas.toDataURL("image/jpeg");

      if (onChange) {
        onChange(croppedImageUrl);
      }

      setCropDialogOpen(false);
      setImageToCrop(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    } catch (e) {
      console.error("Error creating cropped image:", e);
    }
  };

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className={cn(
              "relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-zinc-800 bg-zinc-950 p-4 text-center transition-colors hover:bg-zinc-900/50",
              disabled && "cursor-not-allowed opacity-60",
              rounded && "overflow-hidden rounded-full",
            )}
          >
            {value ? (
              <div
                className={cn(
                  "relative aspect-square h-full w-full overflow-hidden",
                  rounded ? "rounded-full" : "rounded-md",
                )}
              >
                <Image
                  src={value || "/placeholder.svg"}
                  alt="Uploaded image"
                  fill
                  className="object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={handleRemove}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 p-4">
                <Upload className="h-8 w-8 text-zinc-500" />
                <div className="text-sm font-medium text-zinc-400">
                  Click to upload an image or use a URL
                </div>
                <div className="text-xs text-zinc-500">
                  SVG, PNG, JPG or GIF (max. {maxSize}MB)
                </div>
              </div>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="border-zinc-800 bg-zinc-950 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload an image</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="upload">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="mt-4">
              <div
                {...getRootProps()}
                className={cn(
                  "flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-zinc-800 bg-zinc-950 p-4 text-center transition-colors",
                  isDragActive && "border-violet-500 bg-violet-950/20",
                  isUploading && "pointer-events-none opacity-60",
                )}
              >
                <input {...getInputProps()} />
                {isUploading ? (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
                    <div className="text-sm font-medium text-zinc-400">
                      Uploading...
                    </div>
                  </div>
                ) : isDragActive ? (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-8 w-8 text-violet-500" />
                    <div className="text-sm font-medium text-zinc-400">
                      Drop the file here
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-8 w-8 text-zinc-500" />
                    <div className="text-sm font-medium text-zinc-400">
                      Drag & drop a file here, or click to select
                    </div>
                    <div className="text-xs text-zinc-500">
                      SVG, PNG, JPG or GIF (max. {maxSize}MB)
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="url" className="mt-4">
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="image-url"
                    className="text-sm font-medium text-zinc-200"
                  >
                    Image URL
                  </Label>
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <LinkIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                      <Input
                        id="image-url"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="border-zinc-800 bg-zinc-900 pl-10 text-white placeholder:text-zinc-400 focus-visible:ring-violet-600"
                        disabled={isUploading}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isUploading}
                      className="bg-violet-600 text-white hover:bg-violet-700"
                    >
                      {isUploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Use URL"
                      )}
                    </Button>
                  </div>
                  {urlError && (
                    <p className="text-xs text-red-500">{urlError}</p>
                  )}
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Crop Dialog */}
      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-950 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
          </DialogHeader>

          <div className="relative h-[300px] w-full">
            {imageToCrop && (
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape={rounded ? "round" : "rect"}
                showGrid={false}
                classes={{
                  containerClassName: "cropper-container",
                  cropAreaClassName: rounded ? "rounded-full" : "rounded-md",
                }}
              />
            )}
          </div>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-zinc-200">
                  Zoom
                </Label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 border-zinc-800"
                    onClick={() => setZoom(Math.max(1, zoom - 0.1))}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 border-zinc-800"
                    onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.01}
                onValueChange={(value) => setZoom(value[0])}
                className="py-2"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setCropDialogOpen(false);
                setImageToCrop(null);
                setCrop({ x: 0, y: 0 });
                setZoom(1);
              }}
              className="border-zinc-800 text-zinc-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={createCroppedImage}
              className="bg-violet-600 text-white hover:bg-violet-700"
            >
              <Check className="mr-2 h-4 w-4" />
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
