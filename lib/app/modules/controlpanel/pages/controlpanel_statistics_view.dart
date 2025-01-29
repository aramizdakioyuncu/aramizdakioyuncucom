import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/controlpanel_statistics_controller.dart';
import 'package:aramizdakioyuncucom/app/widgets/card_widget.dart';
import 'package:aramizdakioyuncucom/app/widgets/chart.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ControlpanelStatisticsView extends StatelessWidget {
  const ControlpanelStatisticsView({super.key});

  @override
  Widget build(BuildContext context) {
    final ControlpanelStatisticsController controller = Get.put(
      ControlpanelStatisticsController(),
    );

    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          Obx(
            () => Visibility(
              visible: true,
              child: CardWidget.analysticcard(
                controller.categoryStatusList,
              ),
            ),
          ),
          Obx(
            () => Visibility(
              visible: controller.viewhourly.value,
              child: ChartWidget.asda(controller.categoryList, "hourly"),
            ),
          ),
          // Obx(
          //   () => Visibility(
          //     visible: controller.viewweekly.value,
          //     child: ChartWidget.asda(controller.categoryList, "weekly"),
          //   ),
          // ),
          // Obx(
          //   () => Visibility(
          //     visible: controller.viewmontly.value,
          //     child: ChartWidget.asda(controller.categoryList, "monthly"),
          //   ),
          // ),
          // Obx(
          //   () => Visibility(
          //     visible: controller.viewyearly.value,
          //     child: ChartWidget.asda(controller.categoryList, "yearly"),
          //   ),
          // ),
          const SizedBox(
            height: 40,
          ),
          const Text(
            "Genel Talep Grafiği",
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 30,
            ),
          ),
          SizedBox(
            height: 400,
            child: LineChart(
              LineChartData(
                  gridData: const FlGridData(
                    drawVerticalLine: false,
                    drawHorizontalLine: true,
                  ),
                  titlesData: const FlTitlesData(
                    topTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: false,
                      ),
                    ),
                    rightTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: false,
                      ),
                    ),
                    leftTitles: AxisTitles(
                      sideTitles: SideTitles(
                        reservedSize: 50,
                        showTitles: true,
                      ),
                    ),
                    bottomTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        reservedSize: 40,
                      ),
                    ),
                  ),
                  borderData: FlBorderData(show: false),
                  minX: 0,
                  minY: 0,
                  lineBarsData: List.generate(
                    controller.categoryList.length,
                    (index) {
                      return LineChartBarData(
                        spots: [
                          ...List.generate(
                            controller.categoryList[index].hourly!.length,
                            (index2) {
                              return FlSpot(
                                  index2.toDouble(),
                                  controller.categoryList[index].hourly![index2]
                                      .values.first
                                      .toDouble());
                            },
                          ),
                        ],
                        isCurved: true,
                        color: controller.categoryList[index].category.color,
                        dotData: const FlDotData(show: true),
                        belowBarData: BarAreaData(
                          show: true,
                          color: controller.categoryList[index].category.color
                              .withOpacity(0.2),
                        ),
                      );
                    },
                  )),
              duration: Durations.medium1,
            ),
          ),
        ],
      ),
    );
  }
}
