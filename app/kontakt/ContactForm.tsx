import Form from "./Form"
import ActionCall from "./ActionCall"

export default function ContactForm() {

  return (
    <div className="flex justify-between space-x-12 max-w-4xl mx-auto">
      <Form />
      <ActionCall />      
    </div>
  )
}

