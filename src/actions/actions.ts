'use server'

export type GenerateImageState = {
    imageUrl?: string
    error?: string
    status: "idle" | "success" | "error"
    keyword?: string
}

export type RemoveImageState = {
    originalImage?: string
    processedImage?: string
    error?: string
    status: "idle" | "success" | "error"
}

export async function GenerateImage(
    prevState: GenerateImageState,
    formData: FormData
): Promise<GenerateImageState> {
    const keyword = formData.get("keyword")

    if (!keyword || typeof keyword !== 'string') {
        return {
            status: 'error',
            error: 'キーワードを入力してください'
        }
    }

    try {
        const response = await fetch(`${process.env.BASE_URL}/api/generate-image`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ keyword })
            }
        )

        const data = await response.json()

        return {
            status: 'success',
            imageUrl: data.imageUrl,
            keyword: keyword
        }
    } catch (error) {
        console.error("error", error)
        return {
            status: 'error',
            error: "画像の生成に失敗しました"
        }
    }
}

export async function RemoveBackground(
    prevState: RemoveImageState,
    formData: FormData
): Promise<RemoveImageState> {
    const image = formData.get('image') as File

    if (!image) {
        return {
            status: 'error',
            error: '画像ファイルを選択してください'
        }
    }

    try {
        const response = await fetch(`${process.env.BASE_URL}/api/remove-background`,
            {
                method: 'POST',
                body: formData
            }
        )

        if (!response.ok) {
            return {
                status: "error",
                error: "画像の生成に失敗しました"
            }
        }

        const data = await response.json()

        return {
            status: 'success',
            processedImage: data.imageUrl,
        }
    } catch (error) {
        console.error("error", error)
        return {
            status: 'error',
            error: "背景の削除に失敗しました"
        }
    }
}