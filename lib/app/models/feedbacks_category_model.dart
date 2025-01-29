import 'package:flutter/material.dart';

class FeedbacksCategoryModel {
  final int id;
  final String name;
  final String description;
  final Color color;
  final IconData icon;

  FeedbacksCategoryModel({
    required this.id,
    required this.name,
    required this.description,
    required this.color,
    required this.icon,
  });
}
