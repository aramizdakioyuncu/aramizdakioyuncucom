import 'package:aramizdakioyuncucom/app/modules/introduction/views/introduction_view.dart';
import 'package:aramizdakioyuncucom/app/modules/social/views/social_view.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:flutter/material.dart';

class HomeView extends StatelessWidget {
  const HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return Applist.currentUser.value == null
        ? const IntroductionView()
        : const SocialView();
  }
}
