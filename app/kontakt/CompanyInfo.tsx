import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

export default function SocialMediaCTA() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-b from-sky-50 to-sky-100">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-sky-900">
            Connect With Us on Social Media
          </h2>
          <p className="max-w-[600px] text-sky-800 md:text-xl">
            Stay updated with our latest news, projects, and behind-the-scenes moments!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="https://www.instagram.com/youraccount"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Follow on Instagram
            </Link>
            <Link
              href="https://www.facebook.com/youraccount"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              <Facebook className="mr-2 h-5 w-5" />
              Like us on Facebook
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

