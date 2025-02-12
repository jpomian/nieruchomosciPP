import { NextResponse } from "next/server"

const CORRECT_PASSWORD = "barhan" // Replace with your desired password

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password === CORRECT_PASSWORD) {
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ success: false }, { status: 401 })
  }
}

