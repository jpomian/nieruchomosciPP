import ContactForm from "../components/ContactForm"
import Navbar2 from "../components/Navbar2"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Navbar2 />
      <h1 className="text-2xl font-bold mt-24 text-center">Daj znać!</h1>
      <ContactForm />
    </div>
  )
}
