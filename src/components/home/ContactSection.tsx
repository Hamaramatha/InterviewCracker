import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Phone, Mail, Users } from "lucide-react";

export const ContactSection = () => {
  return (
    <section className="py-16 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-400">
            Ready to start your interview preparation journey? We're here to help!
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <MessageCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Live Chat</h3>
              <p className="text-gray-400 mb-4">
                Get instant help from our support team
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Start Chat
              </Button>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Chat with Expert</h3>
              <p className="text-gray-400 mb-4">
                Connect with our interview experts
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Book Session
              </Button>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <Mail className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Contact Us</h3>
              <p className="text-gray-400 mb-4">
                Send us your questions and feedback
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};