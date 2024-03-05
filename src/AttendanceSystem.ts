interface Session {
    startTime: Date;
    endTime: Date;
    sessionHours: number;
  }
  
  interface FormattedSession {
    startTime: Date;
    endTime: Date;
    sessionHours: string;
  }
  
  interface FormattedAttendanceData {
    [date: string]: {
      morning: FormattedSession | null;
      afternoon: FormattedSession | null;
      dailyHours: string | null;
    };
  }
  
export  class AttendanceSystem {
    attendanceData: { [date: string]: { morning: Session | null; afternoon: Session | null; dailyHours: number | null } };
    currentDay: string ;
    currentSession: string | null;
    creditBalance: number;
    debitBalance: number;
    theoreticalWeeklyAttendanceTime: number;
    dailyHours: number;
  
    constructor() {
      this.attendanceData = {};
      this.currentDay = "";
      this.currentSession = null;
      this.creditBalance = 0;
      this.debitBalance = 0;
      this.theoreticalWeeklyAttendanceTime = 0;
      this.dailyHours = 0;
    }
  
    formatTime(hours: number): string {
      const hoursFormatted = Math.floor(hours);
      const minutesFormatted = Math.floor((hours - hoursFormatted) * 60);
      return `${hoursFormatted.toString().padStart(2, '0')}:${minutesFormatted.toString().padStart(2, '0')}`;
    }
  
    startDay(date: Date): void {
      const formattedDate = date.toDateString();
      this.attendanceData[formattedDate] = { morning: null, afternoon: null, dailyHours: null };
      this.currentDay = formattedDate;
    }
  
    startSession(session: string): void {
      this.currentSession = session;
    }
  
    endSession(startTime: Date, endTime: Date): void {
        if (!this.attendanceData[this.currentDay]) {
          this.attendanceData[this.currentDay] = { morning: null, afternoon: null, dailyHours: 0 };
        }
        const sessionHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        const currentDayData = this.attendanceData[this.currentDay] as { morning: Session | null; afternoon: Session | null; dailyHours: number };
        currentDayData[this.currentSession!] = { startTime, endTime, sessionHours };
        currentDayData.dailyHours += sessionHours;
    }
    
    
    calculateDayHours(day: string): void {
        const sessions = this.attendanceData[day];
        const morningDiff = sessions.morning!.endTime.getTime() - sessions.morning!.startTime.getTime();
        const afternoonDiff = sessions.afternoon!.endTime.getTime() - sessions.afternoon!.startTime.getTime();
        const totalHours = (morningDiff + afternoonDiff) / (1000 * 60 * 60);
    
        if (totalHours >= 8) {
          this.creditBalance += totalHours - 8;
        } else {
          this.debitBalance += 8 - totalHours;
        }
    }
    
  
    adjustTheoreticalHours(day: string): void {
      this.theoreticalWeeklyAttendanceTime += 8;
      const adjustment = this.creditBalance - 8;
      if (adjustment > 0) {
        this.theoreticalWeeklyAttendanceTime -= adjustment;
        this.creditBalance -= adjustment;
      }
    }

    toJSON(): {
      attendanceData: FormattedAttendanceData;
      creditBalance: string;
      debitBalance: string;
      CDBalance: string;
      theoreticalWeeklyAttendanceTime: number;
    } {
      const formattedAttendanceData: FormattedAttendanceData = {};
  
      for (const date in this.attendanceData) {
        const sessions = this.attendanceData[date];
        const formattedSessions: { morning: FormattedSession | null; afternoon: FormattedSession | null; dailyHours: string | null } = {
          morning: null,
          afternoon: null,
          dailyHours: null,
        };
  
        for (const sessionType in sessions) {
          const session = sessions[sessionType];
          if (session && session.sessionHours) {
            formattedSessions[sessionType] = {
              startTime: session.startTime,
              endTime: session.endTime,
              sessionHours: this.formatTime(session.sessionHours),
            };
          }
        }
  
        formattedAttendanceData[date] = {
          ...formattedSessions,
          dailyHours: this.formatTime(sessions.dailyHours! || 0), // Provide default value of 0 if dailyHours is null
        };
      }
  
      const creditHours = Math.floor(this.creditBalance);
      const creditMinutes = Math.floor((this.creditBalance - creditHours) * 60);
  
      const debitHours = Math.floor(this.debitBalance);
      const debitMinutes = Math.floor((this.debitBalance - debitHours) * 60);
  
      let CDBalanceHours = Math.floor(this.debitBalance - this.creditBalance);
      let CDBalanceMinutes = Math.abs(Math.floor((this.debitBalance - this.creditBalance) * 60));
  
      if (CDBalanceHours < 0 || (CDBalanceHours === 0 && this.creditBalance < this.debitBalance)) {
        CDBalanceHours *= -1;
        CDBalanceMinutes *= -1;
      }
  
      return {
        attendanceData: formattedAttendanceData,
        creditBalance: `${creditHours.toString().padStart(2, '0')}:${creditMinutes.toString().padStart(2, '0')}`,
        debitBalance: `-${debitHours.toString().padStart(2, '0')}:${debitMinutes.toString().padStart(2, '0')}`,
        CDBalance: `${CDBalanceHours.toString().padStart(2, '0')}:${CDBalanceMinutes.toString().padStart(2, '0')}`,
        theoreticalWeeklyAttendanceTime: this.theoreticalWeeklyAttendanceTime,
      };
    }
  }
  