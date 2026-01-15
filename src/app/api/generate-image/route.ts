import axios from "axios";
import { NextResponse } from 'next/server';
import FormData from "form-data";//ここを忘れないで
import sharp from "sharp";

export async function POST(req: Request) {

    const {keyword} = await req.json()

    try {
        const payload = {
            prompt: `A photorealistic photo of ${keyword}, shallow depth of field, soft natural lighting, 4k resolution`,
            output_format: "png"
        };

        const response = await axios.postForm(
            `https://api.stability.ai/v2beta/stable-image/generate/core`,
            axios.toFormData(payload, new FormData()),
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
        .png({quality:80, compressionLevel:9})
        .toBuffer()

        const base64Image = optimizedImage.toString('base64')
        const imageUrl = `data:image/png;base64, ${base64Image}`

        return NextResponse.json({imageUrl})
    } catch (error) {
        console.error("error", error)
        return NextResponse.json({
            error: 'Faild to generate Image'
        },
        {status: 500}
    )
    }
}