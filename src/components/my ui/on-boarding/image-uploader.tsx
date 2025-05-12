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

export const ImageUpload = ({
  value,
  onChange,
  disabled = false,
  maxSize = 5, // 5MB default
  aspectRatio = 1, // Default to square (1:1)
  className,
  rounded = true,
  ...props
}: ImageUploadProps) => {
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
};
