import fs from "fs/promises"
import path from "path"

export async function getFeedback() {
  const filePath = path.join(process.cwd(), "data", "feedback.json")
  try {
    const fileContent = await fs.readFile(filePath, "utf-8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error("Error reading feedback file:", error)
    return []
  }
}

