import 'dart:developer' as log;

import 'package:aramizdakioyuncucom/app/models/feedbacks_category_model.dart';
import 'package:aramizdakioyuncucom/app/models/request_category_model.dart';
import 'package:aramizdakioyuncucom/app/models/request_model.dart';
import 'package:aramizdakioyuncucom/app/models/request_status_chart_model.dart';
import 'package:aramizdakioyuncucom/app/models/status_model.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/statistics/statistics_list.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:get/get.dart';

class ControlpanelStatisticsController extends GetxController {
  Rxn<AppChartRequest> categoryList = Rxn();
  var categoryStatusList = <AppStatusChartRequest>[].obs;
  var requestsList = <AppRequest>[].obs;

  var selectedIndex = 0.obs;

  var viewhourly = true.obs;
  var viewweekly = true.obs;
  var viewmontly = true.obs;
  var viewyearly = true.obs;

  var selectedTimeIndex = 0.obs;

  var viewallforms = false.obs;
  var viewrequestforms = false.obs;
  var viewcomplainforms = false.obs;
  var viewprojectstatment = false.obs;
  var viewinfoforms = false.obs;
  var viewihbar = false.obs;
  var viewthanks = false.obs;

  Rxn<AppChartRequest> chartactiveUserStats = Rxn();
  Rxn<AppChartRequest> chartevents = Rxn();
  Rxn<AppChartRequest> chartnewPlayer = Rxn();
  Rxn<AppChartRequest> chartsessionStats = Rxn();

  @override
  void onInit() {
    super.onInit();

    log.log("Anasayfaya Hoşgeldiniz");

    // -------*-----*------
    fetchFeedbackStatus();
    statusFilterRequestsByHours();
    // -------*-----*------

    fetchstatistics(chartactiveUserStats, FeedbackCategory.activeUserStats);
    fetchstatistics(chartevents, FeedbackCategory.events);
    fetchstatistics(chartnewPlayer, FeedbackCategory.newPlayer);
    fetchstatistics(chartsessionStats, FeedbackCategory.sessionStats);

    // //Saatlik
    // filterRequestsByHours();
    // //Haftalık
    // filterRequestsByWeek();
    // //Aylık
    // filterRequestsByMontly();
    // //Yıllık
    // filterRequestsByYear();
  }

  @override
  void onClose() {
    super.onClose();
    log.log("Anasayfadan Çıktınız");
  }

  Future<void> fetchstatistics(
      Rxn<AppChartRequest> chart, FeedbackCategory category) async {
    String categoryvalue = "oturumkayitlari";
    if (category == FeedbackCategory.activeUserStats) {
      categoryvalue = "aktifoyuncu";
    }
    if (category == FeedbackCategory.events) {
      categoryvalue = "etkinlikler";
    }
    if (category == FeedbackCategory.newPlayer) {
      categoryvalue = "yenioyuncu";
    }
    if (category == FeedbackCategory.sessionStats) {
      categoryvalue = "oturumkayitlari";
    }
    StatisticsListResponse response =
        await ARMOYU.service.statisticsServices.fetch(category: categoryvalue);

    if (!response.result.status) {
      return;
    }

    chart.value ??= AppChartRequest(category: category);

    for (APIStatisticsList element in response.response!) {
      //HOUR

      chart.value!.hourlypercentage = element.hours.percentage;
      chart.value!.hourlyValue = element.hours.totalValue;
      chart.value!.hourly = List.generate(
        element.hours.titles.length,
        (index) => {
          element.hours.titles[index]:
              int.parse(element.hours.values[index] ?? "0")
        },
      );
      log.log("-----------------------------");
      //Daily

      chart.value!.dailypercentage = element.days.percentage;
      chart.value!.dailyValue = element.days.totalValue;
      chart.value!.daily = List.generate(
        element.days.titles.length,
        (index) => {
          element.days.titles[index]:
              int.parse(element.days.values[index] ?? "0")
        },
      );
      log.log("-----------------------------");
      //Monthly

      chart.value!.monthlypercentage = element.month.percentage;
      chart.value!.monthlyValue = element.month.totalValue;
      chart.value!.monthly = List.generate(
        element.month.titles.length,
        (index) => {
          element.month.titles[index]:
              int.parse(element.month.values[index] ?? "0")
        },
      );
    }
  }

  void fetchFeedbackStatus() {
    categoryStatusList.clear();
    for (var fetchelement in AppStatus.values) {
      categoryStatusList.add(
        AppStatusChartRequest(status: fetchelement),
      );
    }
  }

  void statusFilterRequestsByHours() {
    for (var element in categoryStatusList) {
      DateTime datetime = DateTime.now();

      element.hourly = [];

      int totalcount = 0;
      for (var i = 0; i < datetime.hour; i++) {
        DateTime startDateTime =
            DateTime(datetime.year, datetime.month, datetime.day, 00 + i);
        DateTime endDateTime = startDateTime.add(const Duration(hours: 1));

        List data = requestsList
            .where(
              (element2) => ((element2.date.isAfter(startDateTime) &&
                      element2.date.isBefore(endDateTime)) &&
                  element2.status.val == element.status.val),
            )
            .toList();
        String? hourstartString;
        String? hourendString;
        if (startDateTime.hour < 10) {
          hourstartString = "0${startDateTime.hour}";
        } else {
          hourstartString = startDateTime.hour.toString();
        }
        if (endDateTime.hour < 10) {
          hourendString = "0${endDateTime.hour}";
        } else {
          hourendString = endDateTime.hour.toString();
        }
        element.hourly!.add({
          " $hourstartString - $hourendString": data.length,
        });
        totalcount += data.length;
        element.hourValue = totalcount;
      }
    }
  }
}
