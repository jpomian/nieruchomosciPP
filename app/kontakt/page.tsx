import ContactForm from "./ContactForm"
import Navbar2 from "../components/Navbar2"
import Entry from "./Entry"

export default function Home() {
  return (
    <div className="mx-auto">
      <Navbar2 />
      <Entry />
      <h1 className="text-3xl font-bold text-center mb-4">Formularz</h1>
      <ContactForm />
      <div className="h-6"></div>
    </div>
  )
}
