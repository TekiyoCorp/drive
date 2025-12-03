"use client";

import { Download, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useVendreForm } from "@/contexts/vendre-form-context";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

const ImageUpload = () => {
  const { setImageCount } = useVendreForm();
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxImages = 4;
  const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

  // Update context when images change
  useEffect(() => {
    setImageCount(uploadedImages.length);
  }, [uploadedImages.length, setImageCount]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    files.forEach((file) => {
      // Check file type
      if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
        alert("Seuls les fichiers JPG et PNG sont acceptés.");
        return;
      }

      // Check file size
      if (file.size > maxFileSize) {
        alert("La taille du fichier ne peut pas dépasser 5MB.");
        return;
      }

      // Check if we can add more images
      if (uploadedImages.length >= maxImages) {
        alert(`Vous ne pouvez télécharger que ${maxImages} images maximum.`);
        return;
      }

      const id =
        Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const preview = URL.createObjectURL(file);

      setUploadedImages((prev) => {
        if (prev.length < maxImages) {
          return [...prev, { id, file, preview }];
        }
        return prev;
      });
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (id: string) => {
    setUploadedImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const triggerFileInput = () => {
    if (uploadedImages.length < maxImages) {
      fileInputRef.current?.click();
    }
  };

  // Create array of 4 slots
  const imageSlots = Array.from({ length: maxImages }, (_, index) => {
    const uploadedImage = uploadedImages[index];
    return { index, uploadedImage };
  });

  return (
    <div className="bg-transparent py-4 px-6 min-w-[335px] w-full">
      {/* Header section */}
      <div className="flex flex-col lg:items-center lg:justify-between mb-4">
        <div className="flex items-center mb-2 lg:mb-0">
          <h3 className="text-white text-base font-medium">
            Télécharger des images (5Mo max)
          </h3>
          <button
            onClick={triggerFileInput}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            disabled={uploadedImages.length >= maxImages}
          >
            <Download className="w-4 h-4 text-white" />
          </button>
        </div>

        <p className="text-white/60 text-xs text-center lg:text-right">
          JPG/PNG - ≤5 Mo
        </p>
      </div>

      {/* Image slots grid */}
      <div className="flex flex-wrap lg:flex-nowrap gap-3 justify-center lg:justify-start">
        {imageSlots.map(({ index, uploadedImage }) => (
          <div
            key={index}
            className="relative w-16 h-16 lg:w-16 lg:h-16 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-xl border border-white/20 group cursor-pointer hover:border-white/40 transition-all"
            onClick={!uploadedImage ? triggerFileInput : undefined}
          >
            {uploadedImage ? (
              <>
                <Image
                  src={uploadedImage.preview}
                  alt={`Uploaded image ${index + 1}`}
                  fill
                  className="object-cover rounded-xl"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(uploadedImage.id);
                  }}
                  className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10 shadow-lg"
                >
                  <X className="size-2 text-white" />
                </button>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center group-hover:bg-white/5 transition-all">
                <Download className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
