// app/api/feedbacks/route.ts
import { getRedisClient } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const client = await getRedisClient()
    const keys = await client.keys('feedback:*')
    
    const feedbacks = await Promise.all(
      keys.map(async (key) => {
        const data = await client.hGetAll(key)
        return {
          id: key.replace('feedback:', ''),
          name: data.name || 'Anonymous',
          email: data.email || '',
          phone: data.phone || '',
          content: data.content || '',
          createdAt: data.createdAt || '0',
          status: data.status || 'new'
        }
      })
    )
    
    return NextResponse.json(feedbacks)
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch feedbacks' },
      { status: 500 }
    )
  }
}