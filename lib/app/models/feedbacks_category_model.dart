import 'package:flutter/material.dart';

extension FeedbackCategoryExtension on FeedbackCategory {
  int get id {
    switch (this) {
      case FeedbackCategory.newPlayer:
        return 1;
      case FeedbackCategory.sessionStats:
        return 2;
      case FeedbackCategory.activeUserStats:
        return 3;
      case FeedbackCategory.events:
        return 4;
    }
  }

  String get name {
    switch (this) {
      case FeedbackCategory.newPlayer:
        return "Yeni Oyuncu";
      case FeedbackCategory.sessionStats:
        return "Oturum Açma İstatistik";
      case FeedbackCategory.activeUserStats:
        return "Aktif Kullanıcı İstatistik";
      case FeedbackCategory.events:
        return "Etkinlikler";
    }
  }

  String get description {
    switch (this) {
      case FeedbackCategory.newPlayer:
        return "Yeni Oyuncu İstatistik";
      case FeedbackCategory.sessionStats:
        return "Oturum Açma İstatistik";
      case FeedbackCategory.activeUserStats:
        return "Aktif Kullanıcı İstatistik";
      case FeedbackCategory.events:
        return "Etkinlikler İstatistik";
    }
  }

  Color get color {
    switch (this) {
      case FeedbackCategory.newPlayer:
        return Colors.blue;
      case FeedbackCategory.sessionStats:
        return Colors.red;
      case FeedbackCategory.activeUserStats:
        return Colors.green;
      case FeedbackCategory.events:
        return Colors.purple;
    }
  }

  IconData get icon {
    switch (this) {
      case FeedbackCategory.newPlayer:
        return Icons.feedback;
      case FeedbackCategory.sessionStats:
        return Icons.feedback;
      case FeedbackCategory.activeUserStats:
        return Icons.feedback;
      case FeedbackCategory.events:
        return Icons.feedback;
    }
  }
}

// Enum
enum FeedbackCategory {
  newPlayer,
  sessionStats,
  activeUserStats,
  events,
}

// Model
class FeedbacksCategoryModel {
  final int id;
  final String name;
  final String description;
  final Color color;
  final IconData icon;

  const FeedbacksCategoryModel({
    required this.id,
    required this.name,
    required this.description,
    required this.color,
    required this.icon,
  });

  static const Map<FeedbackCategory, FeedbacksCategoryModel> categories = {
    FeedbackCategory.newPlayer: FeedbacksCategoryModel(
      id: 1,
      name: "Yeni Oyuncu",
      description: "Yeni Oyuncu İstatistik",
      color: Colors.red,
      icon: Icons.feedback,
    ),
    FeedbackCategory.sessionStats: FeedbacksCategoryModel(
      id: 2,
      name: "Oturum Açma İstatistik",
      description: "Oturum Açma İstatistik",
      color: Colors.red,
      icon: Icons.feedback,
    ),
    FeedbackCategory.activeUserStats: FeedbacksCategoryModel(
      id: 3,
      name: "Aktif Kullanıcı İstatistik",
      description: "Aktif Kullanıcı İstatistik",
      color: Colors.red,
      icon: Icons.feedback,
    ),
    FeedbackCategory.events: FeedbacksCategoryModel(
      id: 4,
      name: "Etkinlikler",
      description: "Etkinlikler İstatistik",
      color: Colors.red,
      icon: Icons.feedback,
    ),
  };
}
