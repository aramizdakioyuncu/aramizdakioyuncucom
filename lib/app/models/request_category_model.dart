import 'package:aramizdakioyuncucom/app/models/feedbacks_category_model.dart';

class AppChartRequest {
  final FeedbackCategory category;
  int? hourlyValue = 0;
  double? hourlypercentage = 0;

  int? dailyValue = 0;
  double? dailypercentage = 0;

  int? monthlyValue = 0;
  double? monthlypercentage = 0;

  int? yearlyValue = 0;
  double? yearlypercentage = 0;

  List<Map<String, int?>>? hourly;
  List<Map<String, int?>>? daily;
  List<Map<String, int?>>? monthly;
  List<Map<String, int?>>? yearly;

  AppChartRequest({
    required this.category,
    this.hourlyValue,
    this.hourlypercentage,
    this.dailyValue,
    this.dailypercentage,
    this.monthlyValue,
    this.monthlypercentage,
    this.yearlyValue,
    this.yearlypercentage,
    this.hourly,
    this.daily,
    this.monthly,
    this.yearly,
  });
}
