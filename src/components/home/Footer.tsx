import { Separator } from "@/components/ui/separator";
import { Facebook, Github, Linkedin, Youtube, Twitter, MapPin, Clock, Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Interview Cracker</h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Bhopal, Madhya Pradesh</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="h-4 w-4 mr-2" />
                <span>Mon-Fri: 9 am - 6 pm</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@interviewcracker.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91 12345 67890</span>
              </div>
            </div>
          </div>
          
          {/* About Us */}
          <div>
            <h4 className="text-lg font-semibold mb-6">About Us</h4>
            <p className="text-gray-300 mb-4">AI-powered interview preparation platform helping students crack their dream jobs at top companies.</p>
            <div className="space-y-2">
              <div><a href="#" className="text-gray-300 hover:text-teal-400">Our Mission</a></div>
              <div><a href="#" className="text-gray-300 hover:text-teal-400">Success Stories</a></div>
              <div><a href="#" className="text-gray-300 hover:text-teal-400">Careers</a></div>
              <div><a href="#" className="text-gray-300 hover:text-teal-400">Privacy Policy</a></div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <div className="space-y-2">
              <div><a href="#" className="text-gray-300 hover:text-teal-400">Home</a></div>
              <div><a href="#" className="text-gray-300 hover:text-teal-400">Dashboard</a></div>
              <div><a href="#" className="text-gray-300 hover:text-teal-400">Assessments</a></div>
              <div><a href="#" className="text-gray-300 hover:text-teal-400">Resume Upload</a></div>
              <div><a href="#" className="text-gray-300 hover:text-teal-400">Contact Us</a></div>
              <div><a href="#" className="text-gray-300 hover:text-teal-400">Help & Support</a></div>
            </div>
          </div>
          
          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Follow Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <a href="https://www.facebook.com/share/g/1B9U7Ldh7c/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                  <Facebook className="h-5 w-5 mr-3 text-blue-500" />
                  Facebook
                </a>
              </div>
              <div className="flex items-center">
                <a href="https://github.com/BulbKun" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-gray-400 transition-colors">
                  <Github className="h-5 w-5 mr-3 text-gray-400" />
                  GitHub
                </a>
              </div>
              <div className="flex items-center">
                <a href="https://www.linkedin.com/in/bundela-deepak-74505823a/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                  <Linkedin className="h-5 w-5 mr-3 text-blue-600" />
                  LinkedIn
                </a>
              </div>
              <div className="flex items-center">
                <a href="https://www.youtube.com/@DpekJ" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-red-400 transition-colors">
                  <Youtube className="h-5 w-5 mr-3 text-red-500" />
                  YouTube
                </a>
              </div>
              <div className="flex items-center">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                  <Twitter className="h-5 w-5 mr-3 text-blue-400" />
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-700" />
        
        <div className="text-center text-gray-400">
          <p>© 2024 Interview Cracker. All rights reserved. Made with ❤️ for aspiring professionals.</p>
        </div>
      </div>
    </footer>
  );
};