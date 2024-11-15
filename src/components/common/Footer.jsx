import Container from './Container'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">TravelAku</h3>
            <p className="text-gray-300">
              Temukan pengalaman perjalanan tak terlupakan bersama kami
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Jelajahi</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/activities" className="text-gray-300 hover:text-white">
                  Aktivitas
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Bantuan</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-white">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Facebook
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 TravelAku. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
} 