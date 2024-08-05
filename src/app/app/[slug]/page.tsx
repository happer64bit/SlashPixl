"use client";

import Canvas from "@/components/Canvas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface TextOptions {
    text: string;
    rotation: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    opacity: number;
    fontSize: number;
    fontFamily: string;
    color: string;
}

export default function BlobPage({ params }: { params: { slug: string } }) {
    const { slug: encodedBlobUrl } = params;
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [texts, setTexts] = useState<TextOptions[]>([
        {
            text: "John",
            rotation: "top-right",
            opacity: 0.2,
            fontSize: 50,
            fontFamily: "Arial Black",
            color: "#000000"
        }
    ]);
    const router = useRouter();

    useEffect(() => {
        if (encodedBlobUrl) {
            try {
                const decodedBlobUrl = atob(encodedBlobUrl);
                setFileUrl(decodedBlobUrl);

                // Check if the file URL is valid
                fetch(decodedBlobUrl, { method: 'HEAD' })
                    .then(response => {
                        if (!response.ok) {
                            notFound();
                        }
                    })
                    .catch(() => {
                        notFound();
                    });
            } catch (error) {
                console.error("Error decoding blob URL:", error);
                notFound();
            }
        }
    }, [encodedBlobUrl]);

    const handleInputChange = (index: number, field: string, value: any) => {
        setTexts((prevTexts) =>
            prevTexts.map((text, i) =>
                i === index ? { ...text, [field]: value } : text
            )
        );
    };

    const saveImage = () => {
        const canvas = document.querySelector("canvas") as HTMLCanvasElement;
        if (canvas) {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "watermarked-image.png";
            link.click();
        }
    };

    const notFound = () => {
        router.push("/")
    }

    return (
        <div>
            <div className="max-w-3xl mx-auto my-10 space-y-4">
                {fileUrl ? (
                    <>
                        {fileUrl.endsWith(".mp4") ? (
                            <>
                                {/* <video controls src={fileUrl} className="w-full max-w-3xl" />
                                <Canvas fileUrl={fileUrl} texts={texts} />
                                <Button
                                    onClick={saveImage}
                                    className="w-full h-11"
                                    size={"lg"}
                                >
                                    Save Image
                                </Button> */}
                            </>
                        ) : (
                            <>
                                <Canvas fileUrl={fileUrl} texts={texts} />
                                <div className="space-y-4 mt-4">
                                    {texts.map((textOptions, index) => (
                                        <div key={index} className="space-y-2">
                                            <h3 className="text-lg font-bold">Text {index + 1}</h3>
                                            <label className="block">
                                                Text:
                                                <Input
                                                    type="text"
                                                    value={textOptions.text}
                                                    onChange={(e) =>
                                                        handleInputChange(index, "text", e.target.value)
                                                    }
                                                    className="mt-1"
                                                />
                                            </label>
                                            <label className="block">
                                                Rotation:
                                                <select
                                                    value={textOptions.rotation}
                                                    onChange={(e) =>
                                                        handleInputChange(index, "rotation", e.target.value)
                                                    }
                                                    className="mt-1"
                                                >
                                                    <option value="top-right">Top Right</option>
                                                    <option value="top-left">Top Left</option>
                                                    <option value="bottom-right">Bottom Right</option>
                                                    <option value="bottom-left">Bottom Left</option>
                                                </select>
                                            </label>
                                            <label className="block">
                                                Opacity
                                                <Input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="1"
                                                    value={textOptions.opacity}
                                                    onChange={(e) =>
                                                        handleInputChange(index, "opacity", parseFloat(e.target.value))
                                                    }
                                                    className="mt-1"
                                                />
                                            </label>
                                            <label className="block">
                                                Font Size:
                                                <Input
                                                    type="number"
                                                    value={textOptions.fontSize}
                                                    onChange={(e) =>
                                                        handleInputChange(index, "fontSize", parseInt(e.target.value, 10))
                                                    }
                                                    className="mt-1"
                                                />
                                            </label>
                                            <label className="block">
                                                Font Family:
                                                <Input
                                                    type="text"
                                                    value={textOptions.fontFamily}
                                                    onChange={(e) =>
                                                        handleInputChange(index, "fontFamily", e.target.value)
                                                    }
                                                    className="mt-1"
                                                />
                                            </label>
                                            <label className="block">
                                                Color:
                                                <Input
                                                    type="color"
                                                    value={textOptions.color}
                                                    onChange={(e) =>
                                                        handleInputChange(index, "color", e.target.value)
                                                    }
                                                    className="mt-1"
                                                />
                                            </label>
                                        </div>
                                    ))}
                                    <Button
                                        onClick={saveImage}
                                        className="w-full h-11"
                                        size={"lg"}
                                    >
                                        Save Image
                                    </Button>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
