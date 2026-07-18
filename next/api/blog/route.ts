import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        ok: true,
        env: process.env.NODE_ENV
    })
}

export async function POST(request: NextRequest) {
    const json = await request.json() // Ou.. 'formData()' si on en reçois
    const data = {
        name: json.get('name') /*
            - Pour récupérer les données
        */
    }

    return NextResponse.json({
        json: data
    })
}