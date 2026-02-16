/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'
import { RemoveBackground, RemoveImageState } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Image } from "lucide-react";
import { useActionState } from "react";
import LoadingSpinner from "../loading-spinner";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const initialState:RemoveImageState = {
    status: 'idle'
}

export default function BackgroundRemove() {

          const [state, formAction, pending] = useActionState(RemoveBackground, initialState)

          const handleDownload = () => {
            if(!state.processedImage){
                return
            }
            try{
               const base64Data = state.processedImage.split(',')[1]
               const blob = new Blob([Buffer.from(base64Data, 'base64')],
               {type: "image/png"}
            )

            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')

            link.href = url
            link.download = `removed.png`

            document.body.appendChild(link)
            link.click()

            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)

            toast.success("ダウンロード完了", {
                description: "画像のダウンロードが完了しました"
            })
            } catch(error){
                console.error("error", error)
                toast.error("エラー", {
                    description: "画像のダウンロードが失敗しました"
                })
            }
          }

  return (
    <div>
        <div className="space-y-3">
            <form action={formAction} className="space-y-4 max-w-xl">
            <div>
                <Label htmlFor="image" className="mb-3">ファイルをアップロード</Label>
                <Input 
                id="image"
                name="image"
                accept="image/*"
                required
                className="w-full max-w-xl"
                type="file"
                />
            </div>
            {/* submit button */}
             <Button 
             disabled={pending}
             type="submit"
             className={cn('w-full duration-200', pending && "bg-primary/80")}
             >
              {pending ? 
            <LoadingSpinner/>
            :
            <>
            <Image className="mr-2"/>
            背景を削除
            </>  
            }
                </Button>
            {/* image preview */}
            </form>
        </div>
        {state.processedImage && 
        <div className="space-y-4 mt-3">
            <div className="overflow-hidden rounded-lg boder bg-background">
                <div className="aspect-video relative">
                    <img 
                    src={state.processedImage} 
                    alt="Generate Image"
                    className="w-full h-full object-cover" 
                    />
                </div>
            </div>
            <Button
            className="w-full"
            variant={"outline"}
            onClick={handleDownload}
            >
                <Download className="mr-2"/>
                ダウンロード
            </Button>
        </div>
        }
    </div>
  )
}
