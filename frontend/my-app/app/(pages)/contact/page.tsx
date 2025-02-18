import ContactForm from "@/app/components/ContactForm"

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">
            We're here to answer any questions you may have about our windows or services. Feel free to reach out to us
            using the contact information below or by filling out the form.
          </p>
          <div className="mb-4">
            <h3 className="font-semibold">Address:</h3>
            <p>123 Window Street, City, Country</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Phone:</h3>
            <p>+1 234 567 8900</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Email:</h3>
            <p>info@windowsales.com</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

