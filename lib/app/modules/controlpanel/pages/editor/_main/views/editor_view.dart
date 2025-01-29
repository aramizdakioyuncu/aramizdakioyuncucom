import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/editor/_main/controllers/editor_controller.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/editor/pages/editor_forums_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/editor/pages/editor_gallery_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/editor/pages/editor_games_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/editor/pages/editor_groups_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/editor/pages/editor_home_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/editor/pages/editor_news_view.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class EditorView extends StatelessWidget {
  const EditorView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(EditorController());

    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          const Padding(
            padding: EdgeInsets.all(2.0),
            child: Text(
              "HOŞGELDİN EDİTÖR",
              style: TextStyle(
                fontSize: 30,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ARMOYU.widget.elevatedButton.costum1(
                  text: "Anasayfa",
                  onPressed: () {
                    controller.pageController.value.jumpToPage(0);
                  },
                  loadingStatus: false,
                ),
                ARMOYU.widget.elevatedButton.costum1(
                  text: "Gruplar",
                  onPressed: () {
                    controller.pageController.value.jumpToPage(1);
                  },
                  loadingStatus: false,
                ),
                ARMOYU.widget.elevatedButton.costum1(
                  text: "Oyunlar",
                  onPressed: () {
                    controller.pageController.value.jumpToPage(2);
                  },
                  loadingStatus: false,
                ),
                ARMOYU.widget.elevatedButton.costum1(
                  text: "Galeri",
                  onPressed: () {
                    controller.pageController.value.jumpToPage(3);
                  },
                  loadingStatus: false,
                ),
                ARMOYU.widget.elevatedButton.costum1(
                  text: "Haberler",
                  onPressed: () {
                    controller.pageController.value.jumpToPage(4);
                  },
                  loadingStatus: false,
                ),
                ARMOYU.widget.elevatedButton.costum1(
                  text: "Forum",
                  onPressed: () {
                    controller.pageController.value.jumpToPage(5);
                  },
                  loadingStatus: false,
                ),
              ],
            ),
          ),
          SizedBox(
            height: Get.height * 0.6,
            child: PageView(
              physics: const NeverScrollableScrollPhysics(),
              controller: controller.pageController.value,
              children: const [
                SingleChildScrollView(
                  child: EditorHomeView(),
                ),
                SingleChildScrollView(
                  child: EditorGroupsView(),
                ),
                SingleChildScrollView(
                  child: EditorGamesView(),
                ),
                SingleChildScrollView(
                  child: EditorGalleryView(),
                ),
                SingleChildScrollView(
                  child: EditorNewsView(),
                ),
                SingleChildScrollView(
                  child: EditorForumsView(),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
