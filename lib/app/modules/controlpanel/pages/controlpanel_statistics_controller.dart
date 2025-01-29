import 'dart:developer' as log;

import 'package:aramizdakioyuncucom/app/models/applist.dart';
import 'package:aramizdakioyuncucom/app/models/feedbacks_category_model.dart';
import 'package:aramizdakioyuncucom/app/models/request_category_model.dart';
import 'package:aramizdakioyuncucom/app/models/request_status_chart_model.dart';
import 'package:aramizdakioyuncucom/app/models/status_model.dart';
import 'package:get/get.dart';

class ControlpanelStatisticsController extends GetxController {
  var appList = AppList.requestsList.obs;
  var categoryList = <AppChartRequest>[].obs;
  var categoryStatusList = <AppStatusChartRequest>[].obs;

  var selectedIndex = 0.obs;

  var viewhourly = true.obs;
  var viewweekly = false.obs;
  var viewmontly = false.obs;
  var viewyearly = false.obs;

  var selectedTimeIndex = 0.obs;

  var viewallforms = false.obs;
  var viewrequestforms = false.obs;
  var viewcomplainforms = false.obs;
  var viewprojectstatment = false.obs;
  var viewinfoforms = false.obs;
  var viewihbar = false.obs;
  var viewthanks = false.obs;

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

        List data = AppList.requestsList
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

//CATEGORYFILTER
  void fetchFeedbackCategories() {
    categoryList.clear();
    for (FeedbacksCategoryModel fetchelement in AppList.requestcategoriesList) {
      categoryList.add(
        AppChartRequest(category: fetchelement),
      );
    }
  }

  void filterRequestsByHours() {
    for (var element in categoryList) {
      DateTime datetime = DateTime.now();

      element.hourly = [];

      int totalcount = 0;
      for (var i = 0; i < datetime.hour; i++) {
        DateTime startDateTime =
            DateTime(datetime.year, datetime.month, datetime.day, 00 + i);
        DateTime endDateTime = startDateTime.add(const Duration(hours: 1));

        List data = AppList.requestsList
            .where(
              (element2) => ((element2.date.isAfter(startDateTime) &&
                      element2.date.isBefore(endDateTime)) &&
                  element2.category == element.category),
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

      log.log("element.hourly ${element.hourly}");
    }
  }

  void filterRequestsByWeek() {
    for (var element in categoryList) {
      DateTime datetime = DateTime.now();

      int datetimeweekday = datetime.weekday; //haftanın kaçıncı günü
      log.log("haftanın kaçıncı Günü $datetimeweekday");
      element.weekly = [];

      int totalcount = 0;
      for (var i = 0; i < datetimeweekday; i++) {
        DateTime startDateTime = DateTime(
            datetime.year, datetime.month, datetime.day - datetimeweekday + i);
        DateTime endDateTime = datetime;

        List data = AppList.requestsList
            .where(
              (element2) => ((element2.date.isAfter(startDateTime) &&
                      element2.date.isBefore(endDateTime)) &&
                  element2.category == element.category),
            )
            .toList();

        element.weekly!.add({
          " ${startDateTime.day}": data.length,
        });
        totalcount += data.length;
        element.weeklyValue = totalcount;
      }
    }
  }

  void filterRequestsByMontly() {
    for (var element in categoryList) {
      DateTime datetime = DateTime.now();

      element.monthly = [];

      int totalcount = 0;
      for (var i = 0; i < datetime.day; i++) {
        DateTime startDateTime = DateTime(datetime.year, datetime.month, i + 1);
        DateTime endDateTime =
            DateTime(datetime.year, datetime.month, i + 1, 23, 59);

        List data = AppList.requestsList
            .where(
              (element2) => ((element2.date.isAfter(startDateTime) &&
                      element2.date.isBefore(endDateTime)) &&
                  element2.category == element.category),
            )
            .toList();

        element.monthly!.add({
          " ${i + 1}": data.length,
        });
        totalcount += data.length;
        element.monthlyValue = totalcount;
      }
    }
  }

  void filterRequestsByYear() {
    for (var element in categoryList) {
      DateTime datetime = DateTime.now();

      element.yearly = [];

      int totalcount = 0;
      for (var i = 0; i < datetime.month; i++) {
        DateTime startDateTime = DateTime(datetime.year, i + 1, 1);
        DateTime endDateTime = DateTime(datetime.year, i + 2, 1);

        List data = AppList.requestsList
            .where(
              (element2) => ((element2.date.isAfter(startDateTime) &&
                      element2.date.isBefore(endDateTime)) &&
                  element2.category == element.category),
            )
            .toList();

        element.yearly!.add({
          " ${startDateTime.day}": data.length,
        });
        totalcount += data.length;
        element.yearlyValue = totalcount;
      }
    }
  }

  @override
  void onInit() {
    super.onInit();

    log.log("Anasayfaya Hoşgeldiniz");

    fetchFeedbackCategories();
    filterRequestsByHours();
    // filterRequestsByWeek();
    // filterRequestsByMontly();
    // filterRequestsByYear();

    // -------*-----*------
    fetchFeedbackStatus();
    statusFilterRequestsByHours();
  }

  @override
  void onClose() {
    super.onClose();
    categoryList.clear();
    log.log("Anasayfadan Çıktınız");
  }

  void updateSelectedIndex(int index) {
    selectedIndex.value = index;

    viewhourly.value = false;
    viewweekly.value = false;
    viewmontly.value = false;
    viewyearly.value = false;
    if (index == 0) {
      viewhourly.value = true;
    } else if (index == 1) {
      viewweekly.value = true;
    } else if (index == 2) {
      viewhourly.value = true;
    } else if (index == 3) {
      viewmontly.value = true;
    } else if (index == 4) {
      viewyearly.value = true;
    }
  }

  void updateTimeSelectedIndex(int index) {
    selectedTimeIndex.value = index;
    viewallforms.value = false;
    viewrequestforms.value = false;
    viewcomplainforms.value = false;
    viewprojectstatment.value = false;
    viewinfoforms.value = false;
    viewihbar.value = false;
    viewthanks.value = false;
    if (index == 0) {
      viewallforms.value = true;
    } else if (index == 1) {
      viewrequestforms.value = true;
    } else if (index == 2) {
      viewcomplainforms.value = true;
    } else if (index == 3) {
      viewprojectstatment.value = true;
    } else if (index == 4) {
      viewinfoforms.value = true;
    } else if (index == 5) {
      viewihbar.value = true;
    } else if (index == 6) {
      viewthanks.value = true;
    }
  }
}
