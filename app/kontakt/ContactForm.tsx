import Form from "./Form";
import ActionCall from "./ActionCall";

export default function ContactForm() {
  return (
    <div className="flex justify-between space-x-12 max-w-4xl mx-auto">
      <div className="w-1/2">
        <Form />
      </div>
      <div className="w-1/2">
        <ActionCall />
      </div>
    </div>
  );
}
