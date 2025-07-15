import { HeroSection } from "@/components/home/HeroSection";
import { CompaniesSection } from "@/components/home/CompaniesSection";
import { SuccessStories } from "@/components/home/SuccessStories";
import { StatsSection } from "@/components/home/StatsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { Footer } from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Brain } from "lucide-react";

export const Home = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-900 sticky top-0 z-50 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-teal-400" />
            <h1 className="text-2xl font-bold text-white">INTERVIEW CRACKER</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-800">
              <Phone className="h-4 w-4 mr-2" />
              Contact Us
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-800">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat to Expert
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-800">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chatbot
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HeroSection />
        <CompaniesSection />
        <SuccessStories />
        <StatsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};