import 'dart:developer';

import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/search/search_list.dart';
import 'package:armoyu_widgets/sources/searchbar/widgets/searchbar_widget.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SpotlightSearchWidget {
  static void showSpotlightDialog(BuildContext context) {
    final filteredItemsv2 = <APISearchDetail>[].obs;
    final allItemsv2 = <APISearchDetail>[].obs;
    var search = SearchController().obs;

    showDialog(
      context: context,
      barrierDismissible: true,
      builder: (BuildContext context) {
        return Center(
          child: Material(
            type: MaterialType.transparency,
            child: Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  ARMOYU.widget.searchBar.custom1(
                    allItems: allItemsv2,
                    filteredItems: filteredItemsv2,
                    searchController: search.value,
                    autofocus: true,
                    itemSelected: (id, val, username, type) {
                      log(id.toString());
                      log(val.toString());
                      log(username.toString());
                      log(type.toString());
                      if (type == ARMOYUSearchType.group) {
                        Functions.gotoPage(
                          "/gruplar/$username",
                          getnavgiate: true,
                        );
                        return;
                      }

                      Functions.gotoPage(
                        "/oyuncular/$username",
                        getnavgiate: true,
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
