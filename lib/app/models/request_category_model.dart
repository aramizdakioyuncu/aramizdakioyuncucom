import 'package:aramizdakioyuncucom/app/models/feedbacks_category_model.dart';

class AppChartRequest {
  final FeedbacksCategoryModel category;
  int? hourValue = 0;
  int? weeklyValue = 0;
  int? monthlyValue = 0;
  int? yearlyValue = 0;

  List<Map<String, int>>? hourly;
  List<Map<String, int>>? weekly;
  List<Map<String, int>>? monthly;
  List<Map<String, int>>? yearly;

  AppChartRequest({
    required this.category,
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
