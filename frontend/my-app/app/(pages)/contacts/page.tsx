import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Контакты</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Наши контакты</h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Телефон</h3>
                <p>8 (800) 302-20-05</p>
                <p className="text-sm text-gray-600">Круглосуточно, бесплатно</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p>info@veka.ru</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Адрес</h3>
                <p>Россия, Москва</p>
                <p className="text-sm text-gray-600">Головной офис VEKA Rus</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Напишите нам</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">
                Имя
              </label>
              <input type="text" id="name" className="w-full px-3 py-2 border rounded-md" required />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input type="email" id="email" className="w-full px-3 py-2 border rounded-md" required />
            </div>

            <div>
              <label htmlFor="message" className="block mb-1">
                Сообщение
              </label>
              <textarea id="message" rows={4} className="w-full px-3 py-2 border rounded-md" required></textarea>
            </div>

            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

