/**
 * Converts given time to milliseconds
 *
 * @class Time
 */
class Time {
  static seconds = ms => ms * 1000;
  static minutes = min => Time.seconds(min * 60);
  static hours = hr => Time.minutes(hr * 60);
  static days = days => Time.hours(days * 24);
  static weeks = weeks => Time.days(weeks * 7);
}

export default Time;
