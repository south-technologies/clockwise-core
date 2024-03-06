import { AttendanceSystem } from '../src/AttendanceSystem';

describe('AttendanceSystem', () => {
  let attendanceSystem: AttendanceSystem;

  beforeEach(() => {
    attendanceSystem = new AttendanceSystem();
  });

  test('should process days correctly', () => {
    // Day 1
    const startDate1 = new Date('2024-03-05');
    attendanceSystem.startDay(startDate1);

    attendanceSystem.startSession('morning');
    attendanceSystem.endSession(new Date('2024-03-05T08:30:00'), new Date('2024-03-05T12:30:00'));

    attendanceSystem.startSession('afternoon');
    attendanceSystem.endSession(new Date('2024-03-05T13:30:00'), new Date('2024-03-05T17:30:00'));

    attendanceSystem.calculateDayHours(startDate1.toDateString());
    attendanceSystem.adjustTheoreticalHours(startDate1.toDateString());

    // Day 2
    const startDate2 = new Date('2024-03-06');
    attendanceSystem.startDay(startDate2);

    attendanceSystem.startSession('morning');
    attendanceSystem.endSession(new Date('2024-03-06T08:00:00'), new Date('2024-03-06T12:00:00'));

    attendanceSystem.startSession('afternoon');
    attendanceSystem.endSession(new Date('2024-03-06T13:00:00'), new Date('2024-03-06T17:00:00'));

    attendanceSystem.calculateDayHours(startDate2.toDateString());
    attendanceSystem.adjustTheoreticalHours(startDate2.toDateString());

    // Day 3
    const startDate3 = new Date('2024-03-07');
    attendanceSystem.startDay(startDate3);

    attendanceSystem.startSession('morning');
    attendanceSystem.endSession(new Date('2024-03-07T08:00:00'), new Date('2024-03-07T12:00:00'));

    attendanceSystem.startSession('afternoon');
    attendanceSystem.endSession(new Date('2024-03-07T13:10:00'), new Date('2024-03-07T17:00:00'));

    attendanceSystem.calculateDayHours(startDate3.toDateString());
    attendanceSystem.adjustTheoreticalHours(startDate3.toDateString());

    expect(attendanceSystem.toJSON()).toMatchSnapshot();
  });
});
