<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, MapPin, User } from 'lucide-react'

interface ScheduleDemoProps {
  onBack: () => void
  onComplete: () => void
}

interface ClassPeriod {
  id: string
  time: string
  subject: string
  teacher: string
  room: string
  isCurrent: boolean
  isNext: boolean
}

const ScheduleDemo: React.FC<ScheduleDemoProps> = ({ onBack, onComplete }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentDay, setCurrentDay] = useState('Monday')

  // Real NYC high school schedule data
  const getCurrentDaySchedule = (day: string): ClassPeriod[] => {
    const daySchedules = {
      'Monday': [
        { id: '1', time: '07:50 AM - 08:00 AM', subject: 'Homeroom', teacher: 'Florez, Karla', room: '302', isCurrent: false, isNext: false },
        { id: '2', time: '08:03 AM - 08:43 AM', subject: 'British Lit ELA 10 Advanced', teacher: 'Camarda, Antoinette', room: '202', isCurrent: false, isNext: false },
        { id: '3', time: '08:45 AM - 09:25 AM', subject: 'Algebra II 10 Advanced', teacher: 'Rubin De Celis, Miguel', room: '304', isCurrent: true, isNext: false },
        { id: '4', time: '09:27 AM - 10:07 AM', subject: 'Chemistry 10 Advanced', teacher: 'Reyes, Jeremy', room: '301', isCurrent: false, isNext: true },
        { id: '5', time: '10:09 AM - 10:55 AM', subject: 'Global Studies II: The Modern Era Advanced', teacher: 'Follenius, David', room: '204', isCurrent: false, isNext: false },
        { id: '6', time: '10:57 AM - 11:31 AM', subject: 'Mass', teacher: 'Chapel', room: 'Chapel', isCurrent: false, isNext: false },
        { id: '7', time: '11:33 AM - 12:13 PM', subject: 'Phys Ed 10 Advanced', teacher: 'Tucker III, Menzo', room: 'Gym', isCurrent: false, isNext: false },
        { id: '8', time: '12:13 PM - 12:42 PM', subject: 'Lunch - Sophomore & Junior', teacher: 'Cafeteria', room: 'Cafeteria', isCurrent: false, isNext: false },
        { id: '9', time: '12:42 PM - 01:22 PM', subject: 'Spanish 10 Intermediate Advanced', teacher: 'Florez, Karla', room: '201', isCurrent: false, isNext: false },
        { id: '10', time: '01:24 PM - 02:04 PM', subject: 'Computer Science 10 Advanced', teacher: 'Rooney, Robert', room: '203', isCurrent: false, isNext: false },
        { id: '11', time: '02:06 PM - 02:46 PM', subject: 'Computer Science 10 Advanced', teacher: 'Rooney, Robert', room: '203', isCurrent: false, isNext: false }
      ],
      'Tuesday': [
        { id: '1', time: '07:50 AM - 08:00 AM', subject: 'Homeroom', teacher: 'Florez, Karla', room: '302', isCurrent: false, isNext: false },
        { id: '2', time: '08:03 AM - 08:43 AM', subject: 'Mass', teacher: 'Chapel', room: 'Chapel', isCurrent: false, isNext: false },
        { id: '3', time: '08:45 AM - 09:25 AM', subject: 'Intro to Sacred Script 10 Advanced', teacher: 'Neier, Steven', room: '305', isCurrent: true, isNext: false },
        { id: '4', time: '09:27 AM - 10:07 AM', subject: 'Intro to Sacred Script 10 Advanced', teacher: 'Neier, Steven', room: '305', isCurrent: false, isNext: true },
        { id: '5', time: '10:09 AM - 10:55 AM', subject: 'Algebra II 10 Advanced', teacher: 'Rubin De Celis, Miguel', room: '304', isCurrent: false, isNext: false },
        { id: '6', time: '10:57 AM - 11:31 AM', subject: 'Spanish 10 Intermediate Advanced', teacher: 'Florez, Karla', room: '201', isCurrent: false, isNext: false },
        { id: '7', time: '11:33 AM - 12:13 PM', subject: 'Chemistry 10 Advanced', teacher: 'Reyes, Jeremy', room: '301', isCurrent: false, isNext: false },
        { id: '8', time: '12:13 PM - 12:42 PM', subject: 'Lunch - Sophomore & Junior', teacher: 'Cafeteria', room: 'Cafeteria', isCurrent: false, isNext: false },
        { id: '9', time: '12:42 PM - 01:22 PM', subject: 'British Lit ELA 10 Advanced', teacher: 'Camarda, Antoinette', room: '202', isCurrent: false, isNext: false },
        { id: '10', time: '01:24 PM - 02:04 PM', subject: 'Spanish 10 Intermediate Advanced', teacher: 'Florez, Karla', room: '201', isCurrent: false, isNext: false },
        { id: '11', time: '02:06 PM - 02:46 PM', subject: 'Global Studies II: The Modern Era Advanced', teacher: 'Follenius, David', room: '204', isCurrent: false, isNext: false }
      ],
      'Wednesday': [
        { id: '1', time: '07:50 AM - 08:00 AM', subject: 'Homeroom', teacher: 'Florez, Karla', room: '302', isCurrent: false, isNext: false },
        { id: '2', time: '08:03 AM - 08:43 AM', subject: 'Intro to Sacred Script 10 Advanced', teacher: 'Neier, Steven', room: '305', isCurrent: false, isNext: false },
        { id: '3', time: '08:45 AM - 09:25 AM', subject: 'Intro to Sacred Script 10 Advanced', teacher: 'Neier, Steven', room: '305', isCurrent: true, isNext: false },
        { id: '4', time: '09:27 AM - 10:07 AM', subject: 'Chemistry 10 Advanced', teacher: 'Reyes, Jeremy', room: '301', isCurrent: false, isNext: true },
        { id: '5', time: '10:09 AM - 10:55 AM', subject: 'Chemistry 10 Advanced', teacher: 'Reyes, Jeremy', room: '301', isCurrent: false, isNext: false },
        { id: '6', time: '10:57 AM - 11:31 AM', subject: 'Mass', teacher: 'Chapel', room: 'Chapel', isCurrent: false, isNext: false },
        { id: '7', time: '11:33 AM - 12:13 PM', subject: 'Global Studies II: The Modern Era Advanced', teacher: 'Follenius, David', room: '204', isCurrent: false, isNext: false },
        { id: '8', time: '12:13 PM - 12:42 PM', subject: 'Lunch - Sophomore & Junior', teacher: 'Cafeteria', room: 'Cafeteria', isCurrent: false, isNext: false },
        { id: '9', time: '12:42 PM - 01:22 PM', subject: 'Algebra II 10 Advanced', teacher: 'Rubin De Celis, Miguel', room: '304', isCurrent: false, isNext: false },
        { id: '10', time: '01:24 PM - 02:04 PM', subject: 'British Lit ELA 10 Advanced', teacher: 'Camarda, Antoinette', room: '202', isCurrent: false, isNext: false },
        { id: '11', time: '02:06 PM - 02:46 PM', subject: 'Early Dismissal - Professional Development', teacher: 'N/A', room: 'N/A', isCurrent: false, isNext: false }
      ],
      'Thursday': [
        { id: '1', time: '07:50 AM - 08:00 AM', subject: 'Homeroom', teacher: 'Florez, Karla', room: '302', isCurrent: false, isNext: false },
        { id: '2', time: '08:03 AM - 08:43 AM', subject: 'Mass', teacher: 'Chapel', room: 'Chapel', isCurrent: false, isNext: false },
        { id: '3', time: '08:45 AM - 09:25 AM', subject: 'Phys Ed 10 Advanced', teacher: 'Tucker III, Menzo', room: 'Gym', isCurrent: true, isNext: false },
        { id: '4', time: '09:27 AM - 10:07 AM', subject: 'Global Studies II: The Modern Era Advanced', teacher: 'Follenius, David', room: '204', isCurrent: false, isNext: true },
        { id: '5', time: '10:09 AM - 10:55 AM', subject: 'British Lit ELA 10 Advanced', teacher: 'Camarda, Antoinette', room: '202', isCurrent: false, isNext: false },
        { id: '6', time: '10:57 AM - 11:31 AM', subject: 'Spanish 10 Intermediate Advanced', teacher: 'Florez, Karla', room: '201', isCurrent: false, isNext: false },
        { id: '7', time: '11:33 AM - 12:13 PM', subject: 'Chemistry 10 Advanced', teacher: 'Reyes, Jeremy', room: '301', isCurrent: false, isNext: false },
        { id: '8', time: '12:13 PM - 12:42 PM', subject: 'Lunch - Sophomore & Junior', teacher: 'Cafeteria', room: 'Cafeteria', isCurrent: false, isNext: false },
        { id: '9', time: '12:42 PM - 01:22 PM', subject: 'Algebra II 10 Advanced', teacher: 'Rubin De Celis, Miguel', room: '304', isCurrent: false, isNext: false },
        { id: '10', time: '01:24 PM - 02:04 PM', subject: 'Computer Science 10 Advanced', teacher: 'Rooney, Robert', room: '203', isCurrent: false, isNext: false },
        { id: '11', time: '02:06 PM - 02:46 PM', subject: 'Holy Hour', teacher: 'Chapel', room: 'Chapel', isCurrent: false, isNext: false }
      ],
      'Friday': [
        { id: '1', time: '07:50 AM - 08:00 AM', subject: 'Homeroom', teacher: 'Florez, Karla', room: '302', isCurrent: false, isNext: false },
        { id: '2', time: '08:03 AM - 08:43 AM', subject: 'Algebra II 10 Advanced', teacher: 'Rubin De Celis, Miguel', room: '304', isCurrent: false, isNext: false },
        { id: '3', time: '08:45 AM - 09:25 AM', subject: 'Chemistry 10 Advanced', teacher: 'Reyes, Jeremy', room: '301', isCurrent: true, isNext: false },
        { id: '4', time: '09:27 AM - 10:07 AM', subject: 'Guidance 10 Advanced', teacher: 'Nieves, Stacy', room: '303', isCurrent: false, isNext: true },
        { id: '5', time: '10:09 AM - 10:55 AM', subject: 'British Lit ELA 10 Advanced', teacher: 'Camarda, Antoinette', room: '202', isCurrent: false, isNext: false },
        { id: '6', time: '10:57 AM - 11:31 AM', subject: 'Mass', teacher: 'Chapel', room: 'Chapel', isCurrent: false, isNext: false },
        { id: '7', time: '11:33 AM - 12:13 PM', subject: 'Phys Ed 10 Advanced', teacher: 'Tucker III, Menzo', room: 'Gym', isCurrent: false, isNext: false },
        { id: '8', time: '12:13 PM - 12:42 PM', subject: 'Lunch - Sophomore & Junior', teacher: 'Cafeteria', room: 'Cafeteria', isCurrent: false, isNext: false },
        { id: '9', time: '12:42 PM - 01:22 PM', subject: 'Spanish 10 Intermediate Advanced', teacher: 'Florez, Karla', room: '201', isCurrent: false, isNext: false },
        { id: '10', time: '01:24 PM - 02:04 PM', subject: 'Global Studies II: The Modern Era Advanced', teacher: 'Follenius, David', room: '204', isCurrent: false, isNext: false },
        { id: '11', time: '02:06 PM - 02:46 PM', subject: 'Computer Science 10 Advanced', teacher: 'Rooney, Robert', room: '203', isCurrent: false, isNext: false }
      ]
    }
    
    return daySchedules[day as keyof typeof daySchedules] || daySchedules['Monday']
  }

  const schedule = getCurrentDaySchedule(currentDay)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const currentClass = schedule.find(period => period.isCurrent)
  const nextClass = schedule.find(period => period.isNext)

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      
      {/* Header */}
      <div className="relative z-10 p-4 sm:p-6">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span>Back to Setup</span>
        </motion.button>

        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Your Schedule Demo</h1>
            <p className="text-white/70">See how your schedule will look on any device</p>
          </motion.div>

          {/* Current Time and Day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Clock className="w-5 h-5 text-white/70" />
              <span className="text-2xl font-mono">{formatTime(currentTime)}</span>
            </div>
            
            {/* Day Selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <button
                  key={day}
                  onClick={() => setCurrentDay(day)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    currentDay === day
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
            
            <Badge variant="outline" className="border-white/20 text-white/80">
              {currentDay}
            </Badge>
          </motion.div>

          {/* Current Class Highlight */}
          {currentClass && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-white flex items-center justify-center gap-2">
                    <User className="w-5 h-5" />
                    Current Class
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{currentClass.subject}</h3>
                  <p className="text-white/70 mb-1">{currentClass.teacher}</p>
                  <div className="flex items-center justify-center gap-2 text-white/60">
                    <MapPin className="w-4 h-4" />
                    <span>{currentClass.room}</span>
                  </div>
                  <Badge className="mt-3 bg-green-500/20 text-green-400 border-green-500/30">
                    {currentClass.time}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Next Class */}
          {nextClass && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">Next: {nextClass.subject}</h4>
                      <p className="text-white/60 text-sm">{nextClass.time}</p>
                    </div>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      Upcoming
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Full Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-center">Full Schedule</CardTitle>
                <p className="text-white/60 text-sm text-center">
                  Real NYC high school schedule with actual teachers and room numbers
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schedule.map((period, index) => (
                    <motion.div
                      key={period.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className={`p-4 rounded-lg border transition-all ${
                        period.isCurrent
                          ? 'bg-green-500/20 border-green-500/30'
                          : period.isNext
                          ? 'bg-blue-500/20 border-blue-500/30'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className={`font-semibold ${
                            period.isCurrent ? 'text-green-400' : 
                            period.isNext ? 'text-blue-400' : 'text-white'
                          }`}>
                            {period.subject}
                          </h4>
                          <p className="text-white/60 text-sm">{period.teacher}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-white/50 text-xs">{period.room}</span>
                            <span className="text-white/50 text-xs">{period.time}</span>
                          </div>
                        </div>
                        {period.isCurrent && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Now
                          </Badge>
                        )}
                        {period.isNext && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            Next
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={onComplete}
              className="bg-white text-black hover:bg-white/90"
              size="lg"
            >
              Create My Schedule
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-black"
              size="lg"
            >
              Back to Setup
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleDemo
=======
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ScheduleDemoProps {
  onBack?: () => void;
}

export function ScheduleDemo({ onBack }: ScheduleDemoProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentClass, setCurrentClass] = useState('Loading...');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updateCurrentClass();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const updateCurrentClass = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeStr = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
    
    // Find current class based on time
    const schedule = getScheduleForDay('Monday'); // Default to Monday for demo
    const currentPeriod = findCurrentPeriod(currentTimeStr, schedule);
    setCurrentClass(currentPeriod || 'No class');
  };

  const findCurrentPeriod = (time: string, schedule: any[]) => {
    for (const period of schedule) {
      if (time >= period.startTime && time <= period.endTime) {
        return period.class;
      }
    }
    return null;
  };

  const getScheduleForDay = (day: string) => {
    const scheduleData = {
      Monday: [
        { period: 'Homeroom', startTime: '07:50', endTime: '08:00', class: 'HR-GV-1', room: '302', instructor: 'Florez, Karla' },
        { period: 'P1', startTime: '08:03', endTime: '08:43', class: '10BRILIT-A-1', room: '202', instructor: 'Camarda, Antoinette' },
        { period: 'P2', startTime: '08:45', endTime: '09:25', class: '10ALGII-A-1', room: '304', instructor: 'Rubin De Celis, Miguel' },
        { period: 'P3', startTime: '09:27', endTime: '10:07', class: '10CHEM-A-1', room: '301', instructor: 'Reyes, Jeremy' },
        { period: 'P4', startTime: '10:09', endTime: '10:55', class: '10GLOSTU-A-1', room: '204', instructor: 'Follenius, David' },
        { period: 'P5', startTime: '10:57', endTime: '11:31', class: 'Mass', room: '', instructor: '' },
        { period: 'P6', startTime: '11:33', endTime: '12:13', class: '10PHYED-A-1', room: 'Gym', instructor: 'Tucker III, Menzo' },
        { period: 'P7', startTime: '11:33', endTime: '12:00', class: 'Lunch - Freshmen & Senior', room: '', instructor: '' },
        { period: 'P8', startTime: '12:02', endTime: '12:42', class: '', room: '', instructor: '' },
        { period: 'P9', startTime: '12:13', endTime: '12:42', class: 'Lunch - Sophomore & Junior', room: '', instructor: '' },
        { period: 'P10', startTime: '12:42', endTime: '13:22', class: '10SPA-A-1', room: '201', instructor: 'Florez, Karla' },
        { period: 'P11', startTime: '13:24', endTime: '14:04', class: '10CPUSCI-A-1', room: '203', instructor: 'Rooney, Robert' },
        { period: 'P12', startTime: '14:06', endTime: '14:46', class: '10CPUSCI-A-1', room: '203', instructor: 'Rooney, Robert' }
      ]
    };
    return scheduleData[day as keyof typeof scheduleData] || [];
  };

  const getClassInfo = (classCode: string) => {
    const classMap: { [key: string]: { name: string, instructor: string } } = {
      'HR-GV-1': { name: 'The Guardian of Virtue', instructor: 'Florez, Karla' },
      '10BRILIT-A-1': { name: 'British Lit ELA 10 Advanced', instructor: 'Camarda, Antoinette' },
      '10ALGII-A-1': { name: 'Algebra II 10 Advanced', instructor: 'Rubin De Celis, Miguel' },
      '10CHEM-A-1': { name: 'Chemistry 10 Advanced', instructor: 'Reyes, Jeremy' },
      '10GLOSTU-A-1': { name: 'Global Studies II: The Modern Era Advanced', instructor: 'Follenius, David' },
      '10PHYED-A-1': { name: 'Phys Ed 10 Advanced', instructor: 'Tucker III, Menzo' },
      '10SPA-A-1': { name: 'Spanish 10 Intermediate Advanced', instructor: 'Florez, Karla' },
      '10CPUSCI-A-1': { name: 'Computer Science 10 Advanced', instructor: 'Rooney, Robert' },
      '10SACSCR-A-1': { name: 'Intro to Sacred Script 10 Advanced', instructor: 'Neier, Steven' },
      '10GUI-A-1': { name: 'Guidance 10 Advanced', instructor: 'Nieves, Stacy' }
    };
    return classMap[classCode] || { name: classCode, instructor: '' };
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const schedule = getScheduleForDay('Monday');

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        {onBack && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Button 
              variant="outline" 
              onClick={onBack}
              className="border-white/20 text-white bg-transparent hover:bg-white hover:text-black"
            >
              ← Back to Home
            </Button>
          </motion.div>
        )}
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Student Schedule</h1>
          <h2 className="text-2xl text-white/70 mb-4">Cathedral Prep Seminary</h2>
          <div className="flex justify-center items-center gap-4 mb-6">
            <Badge variant="outline" className="border-white/20 text-white/80">
              Ingram, Sebastian
            </Badge>
            <Badge variant="outline" className="border-white/20 text-white/80">
              Year: 2025-2026: Q1
            </Badge>
            <Badge variant="outline" className="border-white/20 text-white/80">
              Grade: 10
            </Badge>
          </div>
        </motion.div>

        {/* Current Class Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-center">Current Class</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-white mb-2">{currentClass}</div>
              <div className="text-white/70">
                {currentTime.toLocaleTimeString('en-US', { 
                  timeZone: 'America/New_York',
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                })} EST
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Schedule Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-center">Monday Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Time</th>
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Period</th>
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Class</th>
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Room</th>
                      <th className="text-left py-3 px-4 text-white/70 font-medium">Instructor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((period, index) => {
                      const classInfo = getClassInfo(period.class);
                      const isCurrentPeriod = currentTime.toLocaleTimeString('en-US', { 
                        timeZone: 'America/New_York',
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: false
                      }).replace(':', '') >= period.startTime && 
                      currentTime.toLocaleTimeString('en-US', { 
                        timeZone: 'America/New_York',
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: false
                      }).replace(':', '') <= period.endTime;

                      return (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                            isCurrentPeriod ? 'bg-white/10' : ''
                          }`}
                        >
                          <td className="py-3 px-4 text-white/80">
                            {formatTime(period.startTime)} - {formatTime(period.endTime)}
                          </td>
                          <td className="py-3 px-4 text-white/80">{period.period}</td>
                          <td className="py-3 px-4">
                            {period.class ? (
                              <div>
                                <div className="text-white font-medium">{classInfo.name}</div>
                                {period.class !== classInfo.name && (
                                  <div className="text-white/60 text-xs">{period.class}</div>
                                )}
                              </div>
                            ) : (
                              <span className="text-white/40">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-white/80">{period.room || '-'}</td>
                          <td className="py-3 px-4 text-white/80">{period.instructor || '-'}</td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timezone Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <div className="text-white/60 text-sm">
            New York (EST) • Chicago (CST) • Los Angeles (PST) • London (GMT)
          </div>
        </motion.div>
      </div>
    </div>
  );
}
>>>>>>> 85de23d685c9fa673d294792eae6519f6f7f0087
