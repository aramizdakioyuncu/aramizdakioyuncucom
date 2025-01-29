import 'package:aramizdakioyuncucom/app/models/feedbacks_category_model.dart';
import 'package:aramizdakioyuncucom/app/models/status_model.dart';
import 'package:aramizdakioyuncucom/app/models/user.dart';

class AppRequest {
  final int id;
  final User reportuser;
  final FeedbacksCategoryModel category;
  final String description;
  final String subject;
  final AppStatus status;
  FeedbackStatus? responseStatus;
  final DateTime date;
  List<String> documents = [];
  // final List<MessageModel>? messages;

  // final AddresModel adresses;

  AppRequest({
    required this.id,
    required this.reportuser,
    required this.subject,
    required this.category,
    required this.description,
    required this.status,
    this.responseStatus,
    required this.date,
    required this.documents,
    // required this.adresses,
    // this.messages,
  });
}
