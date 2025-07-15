import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp, Users, Award, DollarSign } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '2,500+',
    label: 'Students Placed',
    color: 'text-blue-400'
  },
  {
    icon: DollarSign,
    value: '₹45 LPA',
    label: 'Average Package',
    color: 'text-green-400'
  },
  {
    icon: Award,
    value: '95%',
    label: 'Success Rate',
    color: 'text-purple-400'
  },
  {
    icon: TrendingUp,
    value: '300%',
    label: 'Salary Increase',
    color: 'text-teal-400'
  }
];

const featuredStudents = [
  {
    name: 'Priya Sharma',
    company: 'Google',
    package: '₹45 LPA',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Rahul Kumar',
    company: 'Microsoft',
    package: '₹52 LPA',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Sneha Patel',
    company: 'Amazon',
    package: '₹38 LPA',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Arjun Singh',
    company: 'Netflix',
    package: '₹42 LPA',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Ananya Reddy',
    company: 'Meta',
    package: '₹48 LPA',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Vikram Joshi',
    company: 'Flipkart',
    package: '₹35 LPA',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Kavya Nair',
    company: 'Adobe',
    package: '₹40 LPA',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Rohan Gupta',
    company: 'Uber',
    package: '₹43 LPA',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face'
  }
];

export const StatsSection = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of successful candidates who transformed their careers with InterviewCracker
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-slate-800 border-slate-700 text-center">
                <CardContent className="p-6">
                  <Icon className={`h-8 w-8 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Students */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Meet Our Top Performers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {featuredStudents.map((student, index) => (
              <div key={index} className="text-center">
                <Avatar className="h-16 w-16 mx-auto mb-3">
                  <AvatarImage src={student.image} alt={student.name} />
                  <AvatarFallback className="bg-teal-500 text-white text-sm">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h4 className="text-white font-semibold mb-1 text-sm">{student.name}</h4>
                <p className="text-gray-400 text-xs mb-1">{student.company}</p>
                <p className="text-teal-400 font-bold text-xs">{student.package}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};