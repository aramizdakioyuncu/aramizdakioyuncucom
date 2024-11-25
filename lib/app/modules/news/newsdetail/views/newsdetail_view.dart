import 'package:aramizdakioyuncucom/app/widgets/body_widget.dart';
import 'package:flutter/material.dart';

class NewsdetailView extends StatelessWidget {
  const NewsdetailView({super.key});

  @override
  Widget build(Object context) {
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();

    return BodyWidget.custom1(
      context,
      scaffoldKey,
      body: [],
    );
  }
}
