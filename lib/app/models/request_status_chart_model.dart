import 'package:aramizdakioyuncucom/app/models/status_model.dart';

class AppStatusChartRequest {
  final AppStatus status;
  int? hourValue = 0;
  int? weeklyValue = 0;
  int? monthlyValue = 0;
  int? yearlyValue = 0;

  List<Map<String, int>>? hourly;
  List<Map<String, int>>? weekly;
  List<Map<String, int>>? monthly;
  List<Map<String, int>>? yearly;

  AppStatusChartRequest({
    required this.status,
    this.hourValue,
    this.weeklyValue,
    this.monthlyValue,
    this.yearlyValue,
    this.hourly,
    this.weekly,
    this.monthly,
    this.yearly,
  });
}
