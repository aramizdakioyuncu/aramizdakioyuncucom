import 'package:aramizdakioyuncucom/app/models/feedbacks_category_model.dart';
import 'package:aramizdakioyuncucom/app/models/request_category_model.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

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

  static Widget asda(Rxn<AppChartRequest> chart) {
    return SizedBox(
      height: 210,
      child: Obx(
        () => chart.value == null
            ? const CupertinoActivityIndicator()
            : SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    //Hourly
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Container(
                        decoration: BoxDecoration(
                          color: chart.value!.category.color,
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
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        children: [
                                          Text(
                                            "${chart.value!.hourlyValue! > 1000000 ? "${(chart.value!.hourlyValue! / 1000000).toStringAsFixed(1)}M" : chart.value!.hourlyValue! > 1000 ? "${(chart.value!.hourlyValue! / 1000).toStringAsFixed(1)}K" : chart.value!.hourlyValue!}",
                                            style: const TextStyle(
                                              color: Colors.white,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 28,
                                            ),
                                          ),
                                          const Text(
                                            "(",
                                            style: TextStyle(
                                              color: Colors.yellow,
                                            ),
                                          ),
                                          Text(
                                            chart.value!.hourlypercentage
                                                .toString(),
                                            style: const TextStyle(
                                                fontWeight: FontWeight.bold,
                                                color: Colors.yellow),
                                          ),
                                          chart.value!.hourly!.last.values
                                                          .last! -
                                                      chart.value!.hourly!.first
                                                          .values.last! >
                                                  0
                                              ? const Icon(
                                                  Icons.arrow_upward_rounded,
                                                  color: Colors.yellow,
                                                  size: 15,
                                                )
                                              : const Icon(
                                                  Icons.arrow_downward_rounded,
                                                  color: Colors.yellow,
                                                  size: 15,
                                                ),
                                          const Text(
                                            ")",
                                            style: TextStyle(
                                              color: Colors.yellow,
                                            ),
                                          ),
                                        ],
                                      ),
                                      Text(
                                        chart.value!.category.name,
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
                                child: chart.value!.hourlyValue! == 0
                                    ? const Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.start,
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
                                          titlesData:
                                              const FlTitlesData(show: false),
                                          borderData: FlBorderData(show: false),
                                          minX: 0,
                                          minY: 0,
                                          lineTouchData: LineTouchData(
                                            touchTooltipData:
                                                LineTouchTooltipData(
                                              getTooltipItems:
                                                  (List<LineBarSpot>
                                                      touchedSpots) {
                                                return touchedSpots
                                                    .asMap()
                                                    .entries
                                                    .map((entry) {
                                                  // int index = entry.key; // Indeksi al

                                                  LineBarSpot spot =
                                                      entry.value; // Spot'u al

                                                  int indexval = spot.x.round();

                                                  return LineTooltipItem(
                                                    '${chart.value!.hourly![indexval].keys.first} \n${spot.y.toStringAsFixed(1)}',
                                                    const TextStyle(
                                                        color: Colors.white),
                                                  );
                                                }).toList();
                                              },
                                            ),
                                          ),
                                          lineBarsData: [
                                            LineChartBarData(
                                              spots: List.generate(
                                                chart.value!.hourly!.length,
                                                (index2) {
                                                  return FlSpot(
                                                      index2.toDouble(),
                                                      chart
                                                          .value!
                                                          .hourly![index2]
                                                          .values
                                                          .last!
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
                    ),
                    //Daily
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Container(
                        decoration: BoxDecoration(
                          color: chart.value!.category.color,
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
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        children: [
                                          Text(
                                            "${chart.value!.dailyValue! > 1000000 ? "${(chart.value!.dailyValue! / 1000000).toStringAsFixed(1)}M" : chart.value!.dailyValue! > 1000 ? "${(chart.value!.dailyValue! / 1000).toStringAsFixed(1)}K" : chart.value!.dailyValue!}",
                                            style: const TextStyle(
                                              color: Colors.white,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 28,
                                            ),
                                          ),
                                          const Text(
                                            "(",
                                            style: TextStyle(
                                              color: Colors.yellow,
                                            ),
                                          ),
                                          Text(
                                            chart.value!.dailypercentage
                                                .toString(),
                                            style: const TextStyle(
                                                fontWeight: FontWeight.bold,
                                                color: Colors.yellow),
                                          ),
                                          chart.value!.daily!.last.values
                                                          .last! -
                                                      chart.value!.daily!.first
                                                          .values.last! >
                                                  0
                                              ? const Icon(
                                                  Icons.arrow_upward_rounded,
                                                  color: Colors.yellow,
                                                  size: 15,
                                                )
                                              : const Icon(
                                                  Icons.arrow_downward_rounded,
                                                  color: Colors.yellow,
                                                  size: 15,
                                                ),
                                          const Text(
                                            ")",
                                            style: TextStyle(
                                              color: Colors.yellow,
                                            ),
                                          ),
                                        ],
                                      ),
                                      Text(
                                        chart.value!.category.name,
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
                                child: chart.value!.dailyValue! == 0
                                    ? const Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.start,
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
                                          titlesData:
                                              const FlTitlesData(show: false),
                                          borderData: FlBorderData(show: false),
                                          minX: 0,
                                          minY: 0,
                                          lineTouchData: LineTouchData(
                                            touchTooltipData:
                                                LineTouchTooltipData(
                                              getTooltipItems:
                                                  (List<LineBarSpot>
                                                      touchedSpots) {
                                                return touchedSpots
                                                    .asMap()
                                                    .entries
                                                    .map((entry) {
                                                  // int index = entry.key; // Indeksi al

                                                  LineBarSpot spot =
                                                      entry.value; // Spot'u al

                                                  int indexval = spot.x.round();

                                                  return LineTooltipItem(
                                                    '${chart.value!.daily![indexval].keys.first} \n${spot.y.toStringAsFixed(1)}',
                                                    const TextStyle(
                                                        color: Colors.white),
                                                  );
                                                }).toList();
                                              },
                                            ),
                                          ),
                                          lineBarsData: [
                                            LineChartBarData(
                                              spots: List.generate(
                                                chart.value!.daily!.length,
                                                (index2) {
                                                  return FlSpot(
                                                      index2.toDouble(),
                                                      chart
                                                          .value!
                                                          .daily![index2]
                                                          .values
                                                          .last!
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
                    ),

                    //Monthly
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Container(
                        decoration: BoxDecoration(
                          color: chart.value!.category.color,
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
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        children: [
                                          Text(
                                            "${chart.value!.monthlyValue! > 1000000 ? "${(chart.value!.monthlyValue! / 1000000).toStringAsFixed(1)}M" : chart.value!.monthlyValue! > 1000 ? "${(chart.value!.monthlyValue! / 1000).toStringAsFixed(1)}K" : chart.value!.monthlyValue!}",
                                            style: const TextStyle(
                                              color: Colors.white,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 28,
                                            ),
                                          ),
                                          const Text(
                                            "(",
                                            style: TextStyle(
                                              color: Colors.yellow,
                                            ),
                                          ),
                                          Text(
                                            chart.value!.monthlypercentage
                                                .toString(),
                                            style: const TextStyle(
                                                fontWeight: FontWeight.bold,
                                                color: Colors.yellow),
                                          ),
                                          chart.value!.monthly!.last.values
                                                          .last! -
                                                      chart.value!.monthly!
                                                          .first.values.last! >
                                                  0
                                              ? const Icon(
                                                  Icons.arrow_upward_rounded,
                                                  color: Colors.yellow,
                                                  size: 15,
                                                )
                                              : const Icon(
                                                  Icons.arrow_downward_rounded,
                                                  color: Colors.yellow,
                                                  size: 15,
                                                ),
                                          const Text(
                                            ")",
                                            style: TextStyle(
                                              color: Colors.yellow,
                                            ),
                                          ),
                                        ],
                                      ),
                                      Text(
                                        chart.value!.category.name,
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
                                child: chart.value!.monthlyValue! == 0
                                    ? const Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.start,
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
                                          titlesData:
                                              const FlTitlesData(show: false),
                                          borderData: FlBorderData(show: false),
                                          minX: 0,
                                          minY: 0,
                                          lineTouchData: LineTouchData(
                                            touchTooltipData:
                                                LineTouchTooltipData(
                                              getTooltipItems:
                                                  (List<LineBarSpot>
                                                      touchedSpots) {
                                                return touchedSpots
                                                    .asMap()
                                                    .entries
                                                    .map((entry) {
                                                  // int index = entry.key; // Indeksi al

                                                  LineBarSpot spot =
                                                      entry.value; // Spot'u al

                                                  int indexval = spot.x.round();

                                                  return LineTooltipItem(
                                                    '${chart.value!.monthly![indexval].keys.first} \n${spot.y.toStringAsFixed(1)}',
                                                    const TextStyle(
                                                        color: Colors.white),
                                                  );
                                                }).toList();
                                              },
                                            ),
                                          ),
                                          lineBarsData: [
                                            LineChartBarData(
                                              spots: List.generate(
                                                chart.value!.monthly!.length,
                                                (index2) {
                                                  return FlSpot(
                                                      index2.toDouble(),
                                                      chart
                                                          .value!
                                                          .monthly![index2]
                                                          .values
                                                          .last!
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
                    ),
                  ],
                ),
              ),
        // : ListView.builder(
        //     scrollDirection: Axis.horizontal,
        //     itemCount: 1,
        //     itemBuilder: (context, index) {
        //       int? categoryValue = chart.value!.hourValue;
        //       List<Map<String, int?>>? categoryData = chart.value!.hourly;
        //       // if (category == "yearly") {
        //       //   categoryValue = chart.value!.yearlyValue;
        //       //   categoryData = chart.value!.yearly;
        //       // } else if (category == "monthly") {
        //       //   categoryValue = chart.value!.monthlyValue;
        //       //   categoryData = chart.value!.monthly;
        //       // } else if (category == "weekly") {
        //       //   categoryValue = chart.value!.weeklyValue;
        //       //   categoryData = chart.value!.weekly;
        //       // }

        //       return Padding(
        //         padding: const EdgeInsets.all(8.0),
        //         child: Container(
        //           decoration: BoxDecoration(
        //             color: chart.value!.category.color,
        //             borderRadius: BorderRadius.circular(10),
        //           ),
        //           width: 300,
        //           child: Column(
        //             children: [
        //               Padding(
        //                 padding: const EdgeInsets.all(8.0),
        //                 child: Row(
        //                   children: [
        //                     Column(
        //                       crossAxisAlignment: CrossAxisAlignment.start,
        //                       children: [
        //                         Row(
        //                           children: [
        //                             Text(
        //                               "${categoryValue! > 1000000 ? "${(categoryValue / 1000000).toStringAsFixed(1)}M" : categoryValue > 1000 ? "${(categoryValue / 1000).toStringAsFixed(1)}K" : categoryValue}",
        //                               style: const TextStyle(
        //                                 color: Colors.white,
        //                                 fontWeight: FontWeight.bold,
        //                                 fontSize: 28,
        //                               ),
        //                             ),
        //                             const Text(
        //                               "(",
        //                               style: TextStyle(
        //                                 color: Colors.white,
        //                               ),
        //                             ),
        //                             Text(
        //                               calculatePercentageChange(
        //                                 categoryData!.first.values.last!
        //                                     .toDouble(),
        //                                 categoryData.last.values.last!
        //                                     .toDouble(),
        //                               ),
        //                               style: const TextStyle(
        //                                   fontWeight: FontWeight.bold,
        //                                   color: Colors.white),
        //                             ),
        //                             categoryData.last.values.last! -
        //                                         categoryData
        //                                             .first.values.last! >
        //                                     0
        //                                 ? const Icon(
        //                                     Icons.arrow_upward_rounded,
        //                                     color: Colors.white,
        //                                     size: 15,
        //                                   )
        //                                 : const Icon(
        //                                     Icons.arrow_downward_rounded,
        //                                     color: Colors.white,
        //                                     size: 15,
        //                                   ),
        //                             const Text(
        //                               ")",
        //                               style: TextStyle(
        //                                 color: Colors.white,
        //                               ),
        //                             ),
        //                           ],
        //                         ),
        //                         Text(
        //                           chart.value!.category.name,
        //                           style: const TextStyle(
        //                             color: Colors.white,
        //                             fontWeight: FontWeight.bold,
        //                           ),
        //                         ),
        //                       ],
        //                     ),
        //                     const Spacer(),
        //                     IconButton(
        //                       onPressed: () {},
        //                       icon: const Icon(
        //                         Icons.more_vert_sharp,
        //                         color: Colors.white,
        //                       ),
        //                     )
        //                   ],
        //                 ),
        //               ),
        //               SizedBox(
        //                 height: 118,
        //                 child: Padding(
        //                   padding: const EdgeInsets.only(top: 8.0),
        //                   child: chart.value!.hourValue! == 0
        //                       ? const Column(
        //                           mainAxisAlignment:
        //                               MainAxisAlignment.start,
        //                           children: [
        //                             Text(
        //                               "Veri yok",
        //                               style: TextStyle(
        //                                 color: Colors.white,
        //                                 fontWeight: FontWeight.bold,
        //                               ),
        //                             ),
        //                           ],
        //                         )
        //                       : LineChart(
        //                           LineChartData(
        //                             gridData: const FlGridData(
        //                               show: false,
        //                             ),
        //                             titlesData:
        //                                 const FlTitlesData(show: false),
        //                             borderData: FlBorderData(show: false),
        //                             minX: 0,
        //                             minY: 0,
        //                             lineTouchData: LineTouchData(
        //                               touchTooltipData:
        //                                   LineTouchTooltipData(
        //                                 getTooltipItems: (List<LineBarSpot>
        //                                     touchedSpots) {
        //                                   return touchedSpots
        //                                       .asMap()
        //                                       .entries
        //                                       .map((entry) {
        //                                     // int index = entry.key; // Indeksi al

        //                                     LineBarSpot spot =
        //                                         entry.value; // Spot'u al

        //                                     int indexval = spot.x.round();

        //                                     return LineTooltipItem(
        //                                       '${categoryData![indexval].keys.first} \n${spot.y.toStringAsFixed(1)}',
        //                                       const TextStyle(
        //                                           color: Colors.white),
        //                                     );
        //                                   }).toList();
        //                                 },
        //                               ),
        //                             ),
        //                             lineBarsData: [
        //                               LineChartBarData(
        //                                 spots: List.generate(
        //                                   categoryData.length,
        //                                   (index2) {
        //                                     return FlSpot(
        //                                         index2.toDouble(),
        //                                         categoryData![index2]
        //                                             .values
        //                                             .last!
        //                                             .toDouble());
        //                                   },
        //                                 ),
        //                                 isCurved: true,
        //                                 color: const Color.fromARGB(
        //                                     255, 255, 255, 255),
        //                                 dotData: const FlDotData(
        //                                   show: true,
        //                                 ),
        //                                 belowBarData: BarAreaData(
        //                                   show: true,
        //                                   color: Colors.white30,
        //                                 ),
        //                               ),
        //                             ],
        //                           ),
        //                           duration: Durations.medium1,
        //                         ),
        //                 ),
        //               ),
        //             ],
        //           ),
        //         ),
        //       );
        //     },
        //   ),
      ),
    );
  }
}
