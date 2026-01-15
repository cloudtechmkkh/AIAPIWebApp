import axios from "axios";
import { NextResponse } from 'next/server';
import FormData from "form-data";//ここを忘れないで
import sharp from "sharp";

export async function POST(req: Request) {

    const formData = await req.formData()
    const file = formData.get('image') as File

    if (!file) {
        return NextResponse.json({ error: '画像ファイルを選択してください' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const optimizedInput = await sharp(buffer)
        .resize(1200, 720)
        .png({ quality: 80, compressionLevel: 9 })
        .toBuffer()

    

    try {

         const formData = new FormData()
         formData.append('image', optimizedInput, {filename: 'image.png', contentType: 'image/png'})
         formData.append('output_format', 'png')

        const response = await axios.post(
            `https://api.stability.ai/v2beta/stable-image/edit/remove-background`,
            formData,
            {
                validateStatus: undefined,
                responseType: "arraybuffer",
                headers: {
                    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
                    Accept: "image/*"
                },
            },
        );

        if (response.status !== 200) {
            throw Error(`API error: ${response.status}`)
        }

        const optimizedImage = await sharp(response.data)
            .resize(1200, 720)
            .png({ quality: 80, compressionLevel: 9 })
            .toBuffer()

        const base64Image = optimizedImage.toString('base64')
        const imageUrl = `data:image/png;base64,${base64Image}`

        return NextResponse.json({ imageUrl })
    } catch (error) {
        console.error("error", error)
        return NextResponse.json({
            error: 'Faild to generate Image'
        },
            { status: 500 }
        )
    }
}