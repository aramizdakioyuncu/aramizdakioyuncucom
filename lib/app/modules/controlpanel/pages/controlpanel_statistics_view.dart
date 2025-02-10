import 'package:aramizdakioyuncucom/app/models/feedbacks_category_model.dart';
import 'package:aramizdakioyuncucom/app/models/request_category_model.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/controlpanel_statistics_controller.dart';
import 'package:aramizdakioyuncucom/app/widgets/card_widget.dart';
import 'package:aramizdakioyuncucom/app/widgets/chart.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/cupertino.dart';
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
          CardWidget.analysticcard(controller.categoryStatusList),
          ChartWidget.asda(controller.chartactiveUserStats),
          ChartWidget.asda(controller.chartevents),
          ChartWidget.asda(controller.chartnewPlayer),
          ChartWidget.asda(controller.chartsessionStats),
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
            child: Obx(
              () => controller.chartnewPlayer.value == null
                  ? const CupertinoActivityIndicator()
                  : LineChart(
                      LineChartData(
                        gridData: const FlGridData(
                          drawVerticalLine: false,
                          drawHorizontalLine: true,
                        ),
                        titlesData: FlTitlesData(
                          topTitles: const AxisTitles(
                            sideTitles: SideTitles(
                              showTitles: false,
                            ),
                          ),
                          rightTitles: const AxisTitles(
                            sideTitles: SideTitles(
                              showTitles: false,
                            ),
                          ),
                          leftTitles: const AxisTitles(
                            sideTitles: SideTitles(
                              reservedSize: 50,
                              showTitles: true,
                            ),
                          ),
                          bottomTitles: AxisTitles(
                            sideTitles: SideTitles(
                              showTitles: true,
                              reservedSize: 40,
                              interval: 1, // 🔥
                              getTitlesWidget: (value, meta) {
                                // 12 aylık liste
                                List<String> months = [
                                  "Oca",
                                  "Şub",
                                  "Mar",
                                  "Nis",
                                  "May",
                                  "Haz",
                                  "Tem",
                                  "Ağu",
                                  "Eyl",
                                  "Eki",
                                  "Kas",
                                  "Ara"
                                ];

                                int index = value.toInt();
                                if (index >= 0 && index < months.length) {
                                  return SideTitleWidget(
                                    axisSide: meta.axisSide,
                                    space: 8,
                                    child: Text(
                                      months[index], // Ay ismini yazdır
                                      style: const TextStyle(fontSize: 12),
                                    ),
                                  );
                                }

                                return const SizedBox.shrink();
                              },
                            ),
                          ),
                        ),
                        borderData: FlBorderData(show: false),
                        minX: 0,
                        minY: 0,
                        lineTouchData: LineTouchData(
                          touchTooltipData: LineTouchTooltipData(
                            maxContentWidth: 200,
                            getTooltipItems: (List<LineBarSpot> touchedSpots) {
                              return touchedSpots.asMap().entries.map((entry) {
                                // int index = entry.key; // Indeksi al

                                LineBarSpot spot = entry.value; // Spot'u al

                                int indexval = spot.x.round();
                                String title = "";
                                Color? color;
                                // barIndex'e göre uygun başlığı seç
                                switch (spot.barIndex) {
                                  case 0:
                                    title = "Aktif Kullanıcı";
                                    color = controller.chartactiveUserStats
                                        .value!.category.color;
                                    break;
                                  case 1:
                                    title = "Etkinlik Sayısı";
                                    color = controller
                                        .chartevents.value!.category.color;
                                    break;
                                  case 2:
                                    title = "Yeni Oyuncu";
                                    color = controller
                                        .chartnewPlayer.value!.category.color;
                                    break;
                                  case 3:
                                    title = "Oturum Sayısı";
                                    color = controller.chartsessionStats.value!
                                        .category.color;
                                    break;
                                  default:
                                    title = "Bilinmeyen";
                                    color = Colors.white;
                                }

                                return LineTooltipItem(
                                  ' $title: ${spot.y.toStringAsFixed(1)}',
                                  TextStyle(color: color),
                                );
                              }).toList();
                            },
                          ),
                        ),
                        lineBarsData: List.generate(
                          4,
                          (index) {
                            AppChartRequest chartINFO =
                                controller.chartnewPlayer.value!;

                            if (index == 0) {
                              chartINFO =
                                  controller.chartactiveUserStats.value!;
                            } else if (index == 1) {
                              chartINFO = controller.chartevents.value!;
                            } else if (index == 2) {
                              chartINFO = controller.chartnewPlayer.value!;
                            } else if (index == 3) {
                              chartINFO = controller.chartsessionStats.value!;
                            }
                            return LineChartBarData(
                              spots: [
                                ...List.generate(
                                  chartINFO.monthly!.length,
                                  (index2) {
                                    return FlSpot(
                                      index2.toDouble(),
                                      chartINFO.monthly![index2].values.first!
                                          .toDouble(),
                                    );
                                  },
                                ),
                              ],
                              isCurved: true,
                              curveSmoothness:
                                  0.2, // 🔥 Eğriliği azalt (0.0 - 1.0 arasında olabilir)
                              color: chartINFO.category.color,
                              dotData: const FlDotData(show: true),
                              belowBarData: BarAreaData(
                                show: true,
                                color:
                                    chartINFO.category.color.withOpacity(0.2),
                              ),
                            );
                          },
                        ),
                      ),
                      duration: Durations.medium1,
                    ),
            ),
          ),
        ],
      ),
    );
  }
}
