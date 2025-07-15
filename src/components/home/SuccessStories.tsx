import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin } from 'lucide-react';

const successStories = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Software Engineer',
    company: 'Google',
    package: '₹45 LPA',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    story: 'InterviewCracker helped me crack Google with their AI-powered mock interviews. The behavioral questions were spot-on!',
    skills: ['React', 'Node.js', 'System Design']
  },
  {
    id: 2,
    name: 'Rahul Kumar',
    role: 'Senior Developer',
    company: 'Microsoft',
    package: '₹52 LPA',
    location: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    story: 'The technical assessments prepared me perfectly for Microsoft\'s coding rounds. Got my dream job in 3 months!',
    skills: ['Python', 'Azure', 'Machine Learning']
  },
  {
    id: 3,
    name: 'Sneha Patel',
    role: 'Product Manager',
    company: 'Amazon',
    package: '₹38 LPA',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    story: 'The managerial assessment module was game-changing. Helped me transition from developer to PM role at Amazon.',
    skills: ['Product Strategy', 'Analytics', 'Leadership']
  },
  {
    id: 4,
    name: 'Arjun Singh',
    role: 'DevOps Engineer',
    company: 'Netflix',
    package: '₹42 LPA',
    location: 'Pune',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    story: 'Resume analysis feature identified my weak points. Improved my profile and landed at Netflix within 2 months!',
    skills: ['AWS', 'Docker', 'Kubernetes']
  },
  {
    id: 5,
    name: 'Ananya Reddy',
    role: 'Data Scientist',
    company: 'Meta',
    package: '₹48 LPA',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    story: 'The AI-powered interview prep was incredible. Meta\'s data science rounds felt like practice sessions!',
    skills: ['Python', 'TensorFlow', 'Statistics']
  },
  {
    id: 6,
    name: 'Vikram Joshi',
    role: 'Full Stack Developer',
    company: 'Flipkart',
    package: '₹35 LPA',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    story: 'From college to Flipkart in 6 months! The structured preparation path made all the difference.',
    skills: ['JavaScript', 'React', 'MongoDB']
  }
];

export const SuccessStories = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Success Stories
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real students, real success stories. See how InterviewCracker helped them land their dream jobs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story) => (
            <Card key={story.id} className="bg-slate-800 border-slate-700 hover:border-teal-500 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={story.image} alt={story.name} />
                    <AvatarFallback className="bg-teal-500 text-white text-lg">
                      {story.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold text-lg">{story.name}</h3>
                      <Badge className="bg-teal-500 text-white">{story.package}</Badge>
                    </div>
                    <div className="text-gray-400 mb-3">
                      <div className="flex items-center justify-center mb-1">
                        <Building className="h-4 w-4 mr-1" />
                        <span>{story.role} at {story.company}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{story.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4 italic text-sm">"{story.story}"</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {story.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="border-slate-600 text-gray-300 text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};