import { useEffect, useRef } from "react";

interface TextOptions {
    text: string;
    rotation: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    opacity: number;
    fontSize: number;
    fontFamily: string;
    color: string;
}

interface CanvasProps {
    fileUrl: string;
    texts: TextOptions[];
}

export default function Canvas({ fileUrl, texts }: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (context) {
            const img = new Image();
            img.src = fileUrl;

            img.onload = () => {
                if (canvas) {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0);

                    texts.forEach((textOptions) => {
                        context.font = `${textOptions.fontSize}px ${textOptions.fontFamily}`;
                        context.fillStyle = `rgba(${hexToRgb(textOptions.color)}, ${textOptions.opacity})`;
                        context.textAlign = "center";
                        context.textBaseline = "middle";

                        const { text, rotation } = textOptions;

                        context.save(); // Save the current state
                        context.translate(canvas.width / 2, canvas.height / 2); // Move to the center

                        const rotationAngles: { [key: string]: number } = {
                            "top-right": Math.PI / 4,
                            "top-left": -Math.PI / 4,
                            "bottom-right": -3 * Math.PI / 4,
                            "bottom-left": 3 * Math.PI / 4,
                        };
                        const angle = rotationAngles[rotation] || 0;
                        context.rotate(angle); // Apply rotation

                        context.fillText(text, 0, 0); // Draw the text at the center
                        context.restore(); // Restore the original state
                    });
                }
            };

            img.onerror = (error) => {
                console.error("Error loading image:", error);
            };
        }
    }, [fileUrl, texts]);

    function hexToRgb(hex: string): string {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex.slice(1, 3), 16);
            g = parseInt(hex.slice(3, 5), 16);
            b = parseInt(hex.slice(5, 7), 16);
        }
        return `${r}, ${g}, ${b}`;
    }

    return <canvas ref={canvasRef} className="max-w-3xl" />;
}
