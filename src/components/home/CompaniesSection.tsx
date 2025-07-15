import { Card, CardContent } from "@/components/ui/card";

export const CompaniesSection = () => {
  return (
    <section className="py-16 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-12">
          We help crack these
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {/* Google */}
          <div className="flex justify-center">
            <span className="text-4xl font-bold text-white tracking-wide">
              Google
            </span>
          </div>
          
          {/* Microsoft */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-3 h-3 bg-red-500"></div>
                <div className="w-3 h-3 bg-green-500"></div>
                <div className="w-3 h-3 bg-blue-500"></div>
                <div className="w-3 h-3 bg-yellow-500"></div>
              </div>
              <span className="text-2xl font-bold text-white">Microsoft</span>
            </div>
          </div>
          
          {/* Amazon */}
          <div className="flex justify-center">
            <span className="text-3xl font-bold text-white">
              amazon
            </span>
          </div>
          
          {/* IBM */}
          <div className="flex justify-center">
            <span className="text-3xl font-bold text-white tracking-widest">
              IBM
            </span>
          </div>
          
          {/* Oracle */}
          <div className="flex justify-center">
            <span className="text-2xl font-bold text-red-600">
              ORACLE
            </span>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400">
            And 500+ more leading companies worldwide
          </p>
        </div>
      </div>
    </section>
  );
};