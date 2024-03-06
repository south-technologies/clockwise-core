# clockwise-core Library
the core attendance system 

### Project Documentation
### Attendance System

The Attendance System is a TypeScript class that provides functionality for tracking employee attendance. It includes methods for starting a day, starting and ending sessions (e.g., morning, afternoon), calculating day hours, and adjusting theoretical hours. It also provides a method to convert the attendance data to a formatted JSON object.

#### Installation

To use the Attendance System in your TypeScript project, you can install it via npm:

```bash
npm install
```

#### Usage

```typescript
import { AttendanceSystem } from 'AttendanceSystem';

const attendanceSystem = new AttendanceSystem();

// Example usage
const startDate = new Date('2024-03-05');
attendanceSystem.startDay(startDate);

attendanceSystem.startSession('morning');
attendanceSystem.endSession(new Date('2024-03-05T08:30:00'), new Date('2024-03-05T12:30:00'));

attendanceSystem.calculateDayHours(startDate.toDateString());
attendanceSystem.adjustTheoreticalHours(startDate.toDateString());

console.log(JSON.stringify(attendanceSystem.toJSON(), null, 2));
```

### Tests

to run test use the following command:
```bash
npm test
```

#### API

- `startDay(date: Date): void`: Starts a new day with the given date.
- `startSession(session: string): void`: Starts a new session (e.g., morning, afternoon).
- `endSession(startTime: Date, endTime: Date): void`: Ends the current session with the given start and end times.
- `calculateDayHours(day: string): void`: Calculates the total hours worked for a given day.
- `adjustTheoreticalHours(day: string): void`: Adjusts the theoretical weekly attendance time based on the actual hours worked.
- `toJSON(): FormattedAttendanceData`: Converts the attendance data to a formatted JSON object.

#### Interfaces

- `Session`: Represents a session with start time, end time, and session hours.
- `FormattedSession`: Represents a formatted session with start time, end time, and session hours as a string.
- `FormattedAttendanceData`: Represents formatted attendance data for a day, including morning and afternoon sessions and daily hours.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

---

