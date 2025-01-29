import 'package:aramizdakioyuncucom/app/models/request_status_chart_model.dart';
import 'package:aramizdakioyuncucom/app/models/status_model.dart';

import 'package:flutter/material.dart';

class CardWidget {
  static Widget analysticcard(List<AppStatusChartRequest> list) {
    return SizedBox(
      height: 150,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: list.length,
        itemBuilder: (context, index) {
          return Padding(
            padding: const EdgeInsets.all(8.0),
            child: CardWidget.statusCardWidget(
              category: list[index].status.val,
              categoryvalue: list[index].hourValue.toString(),
              icon: list[index].status.icon,
              color: list[index].status.color,
              backgroundcolor: list[index].status.backgroundcolor,
            ),
          );
        },
      ),
    );
  }

  static Widget asdakslaandasd({
    required String title,
    required String subtitle,
    required Color background,
    required IconData icon,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(10),
      ),
      height: 180,
      width: 250,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Center(
          child: Column(
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 20,
                  color: Colors.white,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Icon(
                  icon,
                  color: Colors.white,
                  size: 50,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  subtitle,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 30,
                      color: Colors.white),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  static Widget statusCardWidget({
    required String category,
    required String categoryvalue,
    required Color color,
    required Color backgroundcolor,
    required IconData icon,
  }) {
    return Container(
      height: 100,
      width: 300,
      decoration: BoxDecoration(
        color: backgroundcolor,
        borderRadius: BorderRadius.circular(
          10,
        ),
      ),
      child: Row(
        children: [
          Icon(
            icon,
            size: 100,
            color: color,
          ),
          const Spacer(),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  categoryvalue,
                  style: TextStyle(
                    color: color,
                    fontWeight: FontWeight.bold,
                    fontSize: 30,
                  ),
                ),
                Text(
                  category,
                  style: TextStyle(
                    color: color,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
