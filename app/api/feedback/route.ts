import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(request: Request) {
  const feedback = await request.json()
  const id = Date.now().toString()
  feedback.id = id

  const filePath = path.join(process.cwd(), "data", "feedback.json")

  try {
    let feedbacks = []
    try {
      const fileContent = await fs.readFile(filePath, "utf-8")
      feedbacks = JSON.parse(fileContent)
    } catch (error) {
      console.log('Could not add feedback. Error message: %s', error)
    }

    feedbacks.push(feedback)
    await fs.writeFile(filePath, JSON.stringify(feedbacks, null, 2))

    return NextResponse.json({ message: "Feedback submitted successfully", id }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Failed to submit feedback" }, { status: 500 })
  }
}

