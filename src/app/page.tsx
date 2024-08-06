/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { UploadIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = (e) => {
        if (e.target?.result) {
          const blob = new Blob([e.target.result], { type: file.type });
          const blobUrl = URL.createObjectURL(blob);
          const encodedBlobUrl = btoa(blobUrl);
          router.push(`/app/${encodedBlobUrl}`);
        }
      };
    }
  };

  return (
    <main>
      <div className="flex items-center justify-center h-[80vh]">
        <div className="space-y-8">
          <div className="text-center">
            <p className="font-black text-5xl">
              Add <span className="text-red-500">Watermark</span> to your Image
            </p>
          </div>
          <div className="flex items-center justify-center gap-5">
            <Button size={"lg"} className="h-11 gap-3" onClick={handleFileUpload}>
              <UploadIcon />
              Upload Images
            </Button>
            <a
              href="https://www.producthunt.com/posts/slashpixl?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-slashpixl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=476818&theme=light"
                alt="SlashPixl - Add Watermark to Your Images and Videos Easily | Product Hunt"
                style={{ width: 'auto', height: '45px' }}
                width="auto"
                height="40"
              />
            </a>
            <input
              type="file"
              className="hidden"
              id="file-input"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple={false}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
