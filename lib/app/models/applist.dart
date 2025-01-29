import 'package:aramizdakioyuncucom/app/models/feedbacks_category_model.dart';
import 'package:aramizdakioyuncucom/app/models/request_model.dart';
import 'package:aramizdakioyuncucom/app/models/status_model.dart';
import 'package:aramizdakioyuncucom/app/models/user.dart';
import 'package:flutter/material.dart';

class AppList {
  // static List<User> userList = [];

  static List<FeedbacksCategoryModel> requestcategoriesList = [
    FeedbacksCategoryModel(
      id: 1,
      name: "Yeni Oyuncu",
      description: "Yeni Oyuncu İstatistik",
      color: Colors.red,
      icon: Icons.feedback,
    ),
    FeedbacksCategoryModel(
      id: 2,
      name: "Oturum Açma İstatistik",
      description: "Oturum Açma İstatistik",
      color: Colors.red,
      icon: Icons.feedback,
    ),
    FeedbacksCategoryModel(
      id: 3,
      name: "Aktif Kullanıcı İstatistik",
      description: "Aktif Kullanıcı İstatistik",
      color: Colors.red,
      icon: Icons.feedback,
    ),
    FeedbacksCategoryModel(
      id: 4,
      name: "Etkinlikler",
      description: "Etkinlikler İstatistik",
      color: Colors.red,
      icon: Icons.feedback,
    ),
  ];
  // static List<PermissionModel> permissionsList = [];
  static List<AppRequest> requestsList = [
    AppRequest(
      id: 1,
      reportuser: User(),
      subject: "subject",
      category: requestcategoriesList[0],
      description: "description",
      status: AppStatus.completed,
      date: DateTime.now().add(
        const Duration(hours: -1),
      ),
      documents: [],
    ),
    AppRequest(
      id: 1,
      reportuser: User(),
      subject: "subject",
      category: FeedbacksCategoryModel(
        id: 1,
        name: "Yeni Oyuncu",
        description: "Yeni Oyuncu İstatistik",
        color: Colors.red,
        icon: Icons.feedback,
      ),
      description: "description",
      status: AppStatus.completed,
      date: DateTime.now().add(
        const Duration(hours: -1),
      ),
      documents: [],
    ),
    AppRequest(
      id: 1,
      reportuser: User(),
      subject: "subject",
      category: FeedbacksCategoryModel(
        id: 1,
        name: "Yeni Oyuncu",
        description: "Yeni Oyuncu İstatistik",
        color: Colors.red,
        icon: Icons.feedback,
      ),
      description: "description",
      status: AppStatus.completed,
      date: DateTime.now().add(
        const Duration(hours: -1),
      ),
      documents: [],
    ),
    AppRequest(
      id: 1,
      reportuser: User(),
      subject: "subject",
      category: FeedbacksCategoryModel(
        id: 1,
        name: "Yeni Oyuncu",
        description: "Yeni Oyuncu İstatistik",
        color: Colors.red,
        icon: Icons.feedback,
      ),
      description: "description",
      status: AppStatus.pending,
      date: DateTime.now().add(
        const Duration(hours: -1),
      ),
      documents: [],
    ),
  ];
}
