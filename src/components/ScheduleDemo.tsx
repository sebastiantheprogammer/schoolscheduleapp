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
