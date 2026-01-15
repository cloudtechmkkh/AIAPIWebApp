/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'
import { GenerateImage, GenerateImageState } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Image } from "lucide-react";
import { useActionState } from "react";
import LoadingSpinner from "../loading-spinner";
import { toast } from "sonner";

const initialState:GenerateImageState = {
    status: 'idle'
}

export default function ImageGenerator() {

          const [state, formAction, pending] = useActionState(GenerateImage, initialState)

          const handleDownload = () => {
            if(!state.imageUrl){
                return
            }
            try{
               const base64Data = state.imageUrl.split(',')[1]
               const blob = new Blob([Buffer.from(base64Data, 'base64')],
               {type: "image/png"}
            )

            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')

            link.href = url
            link.download = `${state.keyword}.png`

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
            <form action={formAction} className="space-y-4">
            <div>
                <Label htmlFor="keyword">キーワード</Label>
                <Input 
                id="keyword"
                name="keyword"
                placeholder="作成したい画像のキーワードを入力(例：海、山、都会、自然)"
                required
                className="mt-3 max-w-xl"
                />
            </div>
            {/* submit button */}
             <Button 
             disabled={pending}
             type="submit"
             >
              {pending ? 
            <LoadingSpinner/>
            :
            <>
            <Image className="mr-2"/>
            画像を生成
            </>  
            }
                </Button>
            {/* image preview */}
            </form>
        </div>
        {state.imageUrl && 
        <div className="space-y-4 mt-3">
            <div className="overflow-hidden rounded-lg boder bg-background">
                <div className="aspect-video relative">
                    <img 
                    src={state.imageUrl} 
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
