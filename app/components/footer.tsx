
export default function Footer() {
    return (
        <footer className="mt-auto sticky bg-black p-4 text-center">
            <div className="mx-auto">
                <div>
                    <h2 className=" text-lg font-bold text-mist-50"> Internet Movies Rental Company </h2>

                    <p className="text-sm text-gray-300">For your movie renting needs.</p>
                </div>

                <div>
                    <h2 className=" text-lg font-bolf text-mist-50">Contact Us</h2>

                    <p className="text-sm text-gray-300">Email: support@internetmovierental.com</p>
                    <p className="text-sm text-gray-300">Phone: (123) 098-5674</p>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                    <p className="text-sm text-gray-400">© 2026 Internet Movies Rental Company - IMR</p>
                </div>
            </div>
        </footer>
    )
}
