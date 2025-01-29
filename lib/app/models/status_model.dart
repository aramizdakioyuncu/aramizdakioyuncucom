import 'package:flutter/material.dart';

extension StatusExtension on AppStatus {
  String get val {
    switch (this) {
      case AppStatus.pending:
        return "Bekleniyor";
      case AppStatus.completed:
        return "Tamamlandı";
      case AppStatus.inprogress:
        return "İşlemde";
    }
  }

  IconData get icon {
    switch (this) {
      case AppStatus.pending:
        return Icons.hourglass_top_sharp;
      case AppStatus.completed:
        return Icons.check_box;
      case AppStatus.inprogress:
        return Icons.work_history_outlined;
    }
  }

  Color get backgroundcolor {
    switch (this) {
      case AppStatus.pending:
        return Colors.red;
      case AppStatus.completed:
        return Colors.green;
      case AppStatus.inprogress:
        return Colors.amber;
    }
  }

  Color get color {
    switch (this) {
      case AppStatus.pending:
        return Colors.white;
      case AppStatus.completed:
        return Colors.white;
      case AppStatus.inprogress:
        return Colors.white;
    }
  }
}

enum AppStatus { completed, inprogress, pending }

extension StatusExtension2 on FeedbackStatus {
  String get val {
    switch (this) {
      case FeedbackStatus.approved:
        return "Onaylandı";
      case FeedbackStatus.denied:
        return "Reddedildi";
    }
  }

  IconData get icon {
    switch (this) {
      case FeedbackStatus.approved:
        return Icons.check;
      case FeedbackStatus.denied:
        return Icons.cancel_outlined;
    }
  }

  Color get color {
    switch (this) {
      case FeedbackStatus.approved:
        return Colors.green;
      case FeedbackStatus.denied:
        return Colors.red;
    }
  }
}

enum FeedbackStatus { denied, approved }
