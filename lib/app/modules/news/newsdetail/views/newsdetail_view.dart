import 'dart:developer';

import 'package:aramizdakioyuncucom/app/modules/news/newsdetail/controllers/newsdetail_controller.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/news/news_list.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';

class NewsdetailView extends StatelessWidget {
  const NewsdetailView({super.key});

  @override
  Widget build(Object context) {
    final controller = Get.put(NewsdetailController());

    return Obx(
      () => BodyWidget.custom1(
        bgImage: controller.newsInfo.value?.media.mediaURL.minURL,
        context,
        body: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 180),
            child: Container(
              color: Get.theme.scaffoldBackgroundColor,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      children: [
                        controller.newsList.value == null
                            ? const SizedBox(
                                height: 400,
                                child: Center(
                                  child: CupertinoActivityIndicator(),
                                ),
                              )
                            : CachedNetworkImage(
                                height: 400,
                                width: double.infinity,
                                fit: BoxFit.cover,
                                imageUrl: controller
                                    .newsInfo.value!.media.mediaURL.minURL,
                              ),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 40.0),
                          child: Column(
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Row(
                                  children: [
                                    Container(
                                      decoration: BoxDecoration(
                                        color: Colors.amber,
                                        borderRadius: BorderRadius.circular(5),
                                      ),
                                      child: const Padding(
                                        padding: EdgeInsets.symmetric(
                                          vertical: 8.0,
                                          horizontal: 25,
                                        ),
                                        child: Text("Kategori"),
                                      ),
                                    ),
                                    const Spacer(),
                                    Container(
                                      decoration: BoxDecoration(
                                        color: Colors.amber,
                                        borderRadius: BorderRadius.circular(5),
                                      ),
                                      child: const Padding(
                                        padding: EdgeInsets.symmetric(
                                          vertical: 8.0,
                                          horizontal: 25,
                                        ),
                                        child: Text("YORUM"),
                                      ),
                                    ),
                                    const Spacer(),
                                    Container(
                                      decoration: BoxDecoration(
                                        color: Colors.amber,
                                        borderRadius: BorderRadius.circular(5),
                                      ),
                                      child: const Padding(
                                        padding: EdgeInsets.symmetric(
                                          vertical: 8.0,
                                          horizontal: 25,
                                        ),
                                        child: Text("Görüntülenme"),
                                      ),
                                    ),
                                    const Spacer(),
                                    Container(
                                      decoration: BoxDecoration(
                                        color: Colors.amber,
                                        borderRadius: BorderRadius.circular(5),
                                      ),
                                      child: const Padding(
                                        padding: EdgeInsets.symmetric(
                                          vertical: 8.0,
                                          horizontal: 25,
                                        ),
                                        child: Text("Tarih"),
                                      ),
                                    ),
                                    const Spacer(),
                                  ],
                                ),
                              ),
                              Row(
                                children: [
                                  IconButton(
                                    onPressed: () {},
                                    icon: const Icon(Icons.print),
                                  ),
                                  IconButton(
                                    onPressed: () {
                                      Functions.gotoPage(
                                        "https://twitter.com/intent/tweet?text=https://aramizdakioyuncu.com/haberler/fatsada-turk-halk-muzigi-ekinligi-yapildi",
                                        newTab: true,
                                      );
                                    },
                                    icon: const Icon(FontAwesomeIcons.xTwitter),
                                  ),
                                  IconButton(
                                    onPressed: () {
                                      Functions.gotoPage(
                                        "https://www.facebook.com/sharer.php?u=https://aramizdakioyuncu.com/haberler/fatsada-turk-halk-muzigi-ekinligi-yapildi",
                                        newTab: true,
                                      );
                                    },
                                    icon: const Icon(FontAwesomeIcons.facebook),
                                  ),
                                  IconButton(
                                    onPressed: () {
                                      Functions.gotoPage(
                                        "whatsapp://send/?text=https://aramizdakioyuncu.com/haberler/fatsada-turk-halk-muzigi-ekinligi-yapildi",
                                        newTab: true,
                                      );
                                    },
                                    icon: const Icon(FontAwesomeIcons.whatsapp),
                                  ),
                                ],
                              ),
                              const Text("Yazar"),
                              Row(
                                children: [
                                  ClipOval(
                                    child: CachedNetworkImage(
                                      height: 100,
                                      imageUrl:
                                          "https://aramizdakioyuncu.com/galeri/profilresimleri/1profilresim1734874339.jpg",
                                    ),
                                  ),
                                  const Expanded(
                                    child: Column(
                                      children: [
                                        Text("naber şekerim"),
                                        Text("Yazılarım : 0")
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                              controller.newsList.value == null
                                  ? const CupertinoActivityIndicator()
                                  : Text(controller.newsInfo.value!.content!),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(
                    width: 300,
                    child: controller.newsList.value == null
                        ? const SizedBox(
                            height: double.infinity,
                            child: Center(
                              child: CupertinoActivityIndicator(),
                            ),
                          )
                        : Container(
                            color: Colors.green,
                            child: Column(
                              children: List.generate(
                                controller.newsList.value!.length,
                                (index) {
                                  APINewsDetail newsInfo =
                                      controller.newsList.value![index];
                                  return Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: InkWell(
                                      onTap: () {
                                        log("");
                                      },
                                      child: Column(
                                        children: [
                                          CachedNetworkImage(
                                            height: 120,
                                            imageUrl:
                                                newsInfo.media.mediaURL.minURL,
                                            fit: BoxFit.cover,
                                          ),
                                          Text(newsInfo.title),
                                        ],
                                      ),
                                    ),
                                  );
                                },
                              ),
                            ),
                          ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
