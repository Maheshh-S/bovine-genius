
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowUpFromLine, ImageIcon, Loader2 } from "lucide-react";

interface UploadImageProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

const UploadImage: React.FC<UploadImageProps> = ({ onUpload, isUploading }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };
  
  const validateAndProcessFile = (file: File) => {
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    // Check if the file size is less than 10MB
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Please upload an image smaller than 10MB');
      return;
    }
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Call the onUpload callback
    onUpload(file);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };
  
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="w-full animate-in">
      <Card className={`glass-card transition-all duration-300 ${isDragging ? 'border-primary shadow-lg' : ''}`}>
        <CardContent className="p-6">
          <div
            className={`
              flex flex-col items-center justify-center w-full rounded-lg 
              border-2 border-dashed p-10 text-center transition-all
              ${isDragging ? 'border-primary bg-primary/5' : 'border-muted'} 
              ${preview ? 'h-auto' : 'h-64 cursor-pointer hover:bg-muted/50'}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={preview ? undefined : handleClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            
            {preview ? (
              <div className="relative w-full">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-h-[500px] mx-auto rounded-md shadow-sm object-contain" 
                />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span className="font-medium">Analyzing image...</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="mb-4 rounded-full bg-muted/50 p-4">
                  <ImageIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Upload a cattle image</h3>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop an image or click to browse
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="mt-2"
                    disabled={isUploading}
                  >
                    <ArrowUpFromLine className="h-4 w-4 mr-2" />
                    Select Image
                  </Button>
                </div>
              </>
            )}
          </div>
          
          {preview && !isUploading && (
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={() => {
                  setPreview(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                variant="outline"
                className="mr-2"
              >
                Clear
              </Button>
              <Button onClick={handleClick}>
                Upload Different Image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadImage;
