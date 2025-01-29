import 'package:aramizdakioyuncucom/app/models/request_category_model.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class ChartWidget {
  static String calculatePercentageChange(
      double initialValue, double finalValue) {
    if (initialValue == 0) {
      return ("??");
    }

    double change = finalValue - initialValue;
    double percentageChange = (change / initialValue) * 100;
    return "${percentageChange.toStringAsFixed(2)}%";
  }

  static Widget asda(List<AppChartRequest> list, String category) {
    return SizedBox(
      height: 210,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: list.length,
        itemBuilder: (context, index) {
          int? categoryValue = list[index].hourValue;
          List<Map<String, int>>? categoryData = list[index].hourly;
          if (category == "yearly") {
            categoryValue = list[index].yearlyValue;
            categoryData = list[index].yearly;
          } else if (category == "monthly") {
            categoryValue = list[index].monthlyValue;
            categoryData = list[index].monthly;
          } else if (category == "weekly") {
            categoryValue = list[index].weeklyValue;
            categoryData = list[index].weekly;
          }

          return Padding(
            padding: const EdgeInsets.all(8.0),
            child: Container(
              decoration: BoxDecoration(
                color: list[index].category.color,
                borderRadius: BorderRadius.circular(10),
              ),
              width: 300,
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Row(
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Text(
                                  "${categoryValue! > 1000000 ? "${(categoryValue / 1000000).toStringAsFixed(1)}M" : categoryValue > 1000 ? "${(categoryValue / 1000).toStringAsFixed(1)}K" : categoryValue}",
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 28,
                                  ),
                                ),
                                const Text(
                                  "(",
                                  style: TextStyle(
                                    color: Colors.white,
                                  ),
                                ),
                                Text(
                                  calculatePercentageChange(
                                    categoryData!.first.values.last.toDouble(),
                                    categoryData.last.values.last.toDouble(),
                                  ),
                                  style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                      color: Colors.white),
                                ),
                                categoryData.last.values.last -
                                            categoryData.first.values.last >
                                        0
                                    ? const Icon(
                                        Icons.arrow_upward_rounded,
                                        color: Colors.white,
                                        size: 15,
                                      )
                                    : const Icon(
                                        Icons.arrow_downward_rounded,
                                        color: Colors.white,
                                        size: 15,
                                      ),
                                const Text(
                                  ")",
                                  style: TextStyle(
                                    color: Colors.white,
                                  ),
                                ),
                              ],
                            ),
                            Text(
                              list[index].category.name,
                              style: const TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        const Spacer(),
                        IconButton(
                          onPressed: () {},
                          icon: const Icon(
                            Icons.more_vert_sharp,
                            color: Colors.white,
                          ),
                        )
                      ],
                    ),
                  ),
                  SizedBox(
                    height: 118,
                    child: Padding(
                      padding: const EdgeInsets.only(top: 8.0),
                      child: list[index].hourValue! == 0
                          ? const Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Text(
                                  "Veri yok",
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            )
                          : LineChart(
                              LineChartData(
                                gridData: const FlGridData(
                                  show: false,
                                ),
                                titlesData: const FlTitlesData(show: false),
                                borderData: FlBorderData(show: false),
                                minX: 0,
                                minY: 0,
                                lineTouchData: LineTouchData(
                                  touchTooltipData: LineTouchTooltipData(
                                    getTooltipItems:
                                        (List<LineBarSpot> touchedSpots) {
                                      return touchedSpots
                                          .asMap()
                                          .entries
                                          .map((entry) {
                                        // int index = entry.key; // Indeksi al

                                        LineBarSpot spot =
                                            entry.value; // Spot'u al

                                        int indexval = spot.x.round();

                                        return LineTooltipItem(
                                          '${categoryData![indexval].keys.first} \n${spot.y.toStringAsFixed(1)}',
                                          const TextStyle(color: Colors.white),
                                        );
                                      }).toList();
                                    },
                                  ),
                                ),
                                lineBarsData: [
                                  LineChartBarData(
                                    spots: List.generate(
                                      categoryData.length,
                                      (index2) {
                                        return FlSpot(
                                            index2.toDouble(),
                                            categoryData![index2]
                                                .values
                                                .last
                                                .toDouble());
                                      },
                                    ),
                                    isCurved: true,
                                    color: const Color.fromARGB(
                                        255, 255, 255, 255),
                                    dotData: const FlDotData(
                                      show: true,
                                    ),
                                    belowBarData: BarAreaData(
                                      show: true,
                                      color: Colors.white30,
                                    ),
                                  ),
                                ],
                              ),
                              duration: Durations.medium1,
                            ),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
